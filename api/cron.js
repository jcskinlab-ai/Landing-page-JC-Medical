// Medique · Cron de recordatorios por correo (Vercel Cron + Firebase service account)
// Corre 1×/día (lo dispara Vercel según vercel.json) AUNQUE NADIE ABRA EL PANEL. Recorre TODAS las
// clínicas, arma los recordatorios de cita por correo (r24 = mañana, rmorning = hoy), SALTA las
// canceladas/no-show, no duplica (dedup en kv/auto_email_sent) y los envía vía Resend.
//
// Variables de entorno (Vercel):
//   FIREBASE_SERVICE_ACCOUNT = JSON de la cuenta de servicio (Firebase Console → Cuentas de servicio)
//   RESEND_API_KEY           = clave de Resend (ya está)
//   FIREBASE_PROJECT_ID      = (default "medique-8dbf6")
//   CRON_SECRET              = (opcional) si se define, Vercel lo manda como Authorization: Bearer <CRON_SECRET>
//   MAIL_FROM / OTP_FROM     = remitente (default "Medique <noreply@medique.cl>")

import crypto from "node:crypto";

const RESEND_URL = "https://api.resend.com/emails";

function getSA() { const raw = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.GOOGLE_SERVICE_ACCOUNT || ""; if (!raw) return null; try { return JSON.parse(raw); } catch (e) { return null; } }
function b64url(buf) { return Buffer.from(buf).toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
async function saToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/datastore", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const signer = crypto.createSign("RSA-SHA256"); signer.update(header + "." + claim);
  const assertion = header + "." + claim + "." + b64url(signer.sign(sa.private_key));
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=" + encodeURIComponent(assertion) });
  const d = await r.json(); if (!d.access_token) throw new Error("sin access_token"); return d.access_token;
}
function dayCL(offset) {
  const d = new Date(); d.setDate(d.getDate() + (offset || 0));
  try { return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).format(d); }
  catch (e) { return d.toISOString().slice(0, 10); }
}
function isEmail(s) { return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()); }
function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// Lee un doc kv (tenants/{cid}/kv/{key}) → su valor JSON (o def).
async function kvGet(pid, token, cid, key, def) {
  const url = `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/tenants/${encodeURIComponent(cid)}/kv/${encodeURIComponent(key)}`;
  try { const r = await fetch(url, { headers: { Authorization: "Bearer " + token } }); if (!r.ok) return def; const doc = await r.json(); const v = doc && doc.fields && doc.fields.v && doc.fields.v.stringValue; return v ? (JSON.parse(v)) : def; } catch (e) { return def; }
}
async function kvSet(pid, token, cid, key, value) {
  const url = `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/tenants/${encodeURIComponent(cid)}/kv/${encodeURIComponent(key)}`;
  const body = { fields: { v: { stringValue: JSON.stringify(value).slice(0, 900000) }, _ts: { integerValue: String(Date.now()) } } };
  await fetch(url, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }, body: JSON.stringify(body) }).catch(() => {});
}

async function sendEmail(from, to, replyTo, subject, text) {
  const key = process.env.RESEND_API_KEY; if (!key) return false;
  const html = `<!doctype html><html><body style="margin:0;background:#f4f5f7;padding:24px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif"><table role="presentation" width="100%"><tr><td align="center"><table role="presentation" width="100%" style="max-width:520px;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e6e8ec"><tr><td style="padding:28px;color:#222;font-size:15px;line-height:1.6">${esc(text).replace(/\n/g, "<br>")}</td></tr><tr><td style="padding:16px 28px;border-top:1px solid #eee;color:#8a92a0;font-size:12px">Enviado con Medique</td></tr></table></td></tr></table></body></html>`;
  const r = await fetch(RESEND_URL, { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + key }, body: JSON.stringify({ from, to: [to], subject, html, text, ...(isEmail(replyTo) ? { reply_to: replyTo } : {}) }) });
  return r.ok;
}

export default async function handler(req, res) {
  // M-CRON: CRON_SECRET OBLIGATORIO. Antes, si la env var no estaba seteada el endpoint quedaba
  // PÚBLICO → cualquiera disparaba el recorrido de TODAS las clínicas y quemaba cuota de Resend.
  // Ahora: sin la env var → 503 (no configurado), no corre. Con la env var → exige que el request
  // la traiga (Authorization: Bearer <secret>, que es como Vercel Cron lo manda vía vercel.json, o
  // ?key=<secret>) y responde 401 si no coincide.
  const secret = process.env.CRON_SECRET;
  if (!secret) return res.status(503).json({ ok: false, configured: false, error: "CRON_SECRET no configurado." });
  // SEG · Solo por cabecera. Se retiró el respaldo ?key=<secret>: un secreto en la query string
  // queda registrado en los logs de acceso, en el historial y en la cabecera Referer.
  // La comparación es en tiempo constante (evita distinguir el secreto byte a byte por tiempos).
  const given = Buffer.from((req.headers["authorization"] || "").toString());
  const want = Buffer.from("Bearer " + secret);
  const authOk = given.length === want.length && crypto.timingSafeEqual(given, want);
  if (!authOk) return res.status(401).json({ ok: false, error: "no autorizado" });

  const sa = getSA();
  if (!sa) return res.status(503).json({ ok: false, configured: false, error: "Falta FIREBASE_SERVICE_ACCOUNT." });
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ ok: false, error: "Falta RESEND_API_KEY." });

  const pid = process.env.FIREBASE_PROJECT_ID || "medique-8dbf6";
  const from = process.env.MAIL_FROM || process.env.OTP_FROM || "Medique <noreply@medique.cl>";
  const hoyISO = dayCL(0), manISO = dayCL(1);

  let token;
  try { token = await saToken(sa); } catch (e) { return res.status(502).json({ ok: false, error: "No se pudo autenticar la cuenta de servicio." }); }

  // Lista todas las clínicas registradas (colección 'clinics').
  let clinics = [];
  try {
    const r = await fetch(`https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/clinics?pageSize=500`, { headers: { Authorization: "Bearer " + token } });
    const d = await r.json();
    (d.documents || []).forEach(doc => {
      const id = (doc.name || "").split("/").pop();
      const f = doc.fields || {};
      if (id) clinics.push({ id, name: (f.name && f.name.stringValue) || "tu clínica", ownerEmail: (f.ownerEmail && f.ownerEmail.stringValue) || "" });
    });
  } catch (e) { return res.status(502).json({ ok: false, error: "No se pudo listar las clínicas." }); }

  let totalSent = 0, clinicsConActividad = 0;
  for (const c of clinics) {
    try {
      const automations = await kvGet(pid, token, c.id, "automations", []);
      const rules = {}; (Array.isArray(automations) ? automations : []).forEach(r => { rules[r.id] = r.on; });
      const r24on = rules.r24 !== false, rmornOn = rules.rmorning !== false;
      if (!r24on && !rmornOn) continue;

      const appts = await kvGet(pid, token, c.id, "appointments", []);
      if (!Array.isArray(appts) || !appts.length) continue;
      const patients = await kvGet(pid, token, c.id, "patients", []);
      const cfg = await kvGet(pid, token, c.id, "config", {}) || {};
      const sent = await kvGet(pid, token, c.id, "auto_email_sent", {}) || {};
      const clinicName = cfg.clinic_name || c.name || "tu clínica";
      const replyTo = isEmail(cfg.clinic_email) ? cfg.clinic_email : (isEmail(c.ownerEmail) ? c.ownerEmail : undefined);

      let changed = false, sentThis = 0;
      for (const a of appts) {
        if (!a || a.status === "anulada" || a.status === "cancelada" || a.status === "no_asistio") continue;
        const esMan = a.fecha === manISO, esHoy = a.fecha === hoyISO;
        if (!(r24on && esMan) && !(rmornOn && esHoy)) continue;
        const p = (Array.isArray(patients) ? patients : []).find(x => x.id === a.patId);
        const email = (p && p.email) || a.email;
        if (!isEmail(email)) continue;
        const ruleId = esMan ? "r24" : "rmorning";
        const key = ruleId + ":" + (a.id || ((a.patId || "") + a.fecha + (a.time || ""))) + ":" + a.fecha;
        if (sent[key]) continue;
        const nombre = (((p && p.name) || a.name || "").split(" ")[0]) || "";
        const cuando = esMan ? "mañana" : "hoy";
        const text = "Hola " + nombre + ",\n\nTe recordamos tu cita en " + clinicName + " " + cuando + (a.time ? " a las " + a.time : "") + (a.proc ? " (" + a.proc + ")" : "") + ".\n\nSi necesitas reprogramar, respóndenos este correo.\n\n— " + clinicName;
        const okSent = await sendEmail(from, email.trim(), replyTo, "Recordatorio de tu cita · " + clinicName, text);
        if (okSent) { sent[key] = true; changed = true; sentThis++; totalSent++; }
      }

      // ── Automatizaciones de correo PROPIAS de la clínica (custom_automations) ──
      const customAutos = await kvGet(pid, token, c.id, "custom_automations", []);
      if (Array.isArray(customAutos) && customAutos.length) {
        const fmtVars = (s, a, p) => ("" + (s || ""))
          .replace(/\{nombre\}/g, ((((p && p.name) || a.name || "") + "").split(" ")[0]) || "")
          .replace(/\{fecha\}/g, a.fecha || "")
          .replace(/\{hora\}/g, a.time || "")
          .replace(/\{tratamiento\}/g, a.proc || "tu tratamiento")
          .replace(/\{clinica\}/g, clinicName);
        for (const au of customAutos) {
          if (!au || au.on === false || !au.subject || !au.body) continue;
          const n = parseInt(au.days, 10) || 0;
          const targetDate = au.dir === "after" ? dayCL(-n) : dayCL(n);
          for (const a of appts) {
            if (!a || a.status === "anulada" || a.status === "cancelada" || a.status === "no_asistio") continue;
            if (a.fecha !== targetDate) continue;
            const p = (Array.isArray(patients) ? patients : []).find(x => x.id === a.patId);
            const email = (p && p.email) || a.email;
            if (!isEmail(email)) continue;
            const key = "custom:" + au.id + ":" + (a.id || ((a.patId || "") + a.fecha + (a.time || ""))) + ":" + a.fecha;
            if (sent[key]) continue;
            const okSent = await sendEmail(from, email.trim(), replyTo, fmtVars(au.subject, a, p), fmtVars(au.body, a, p));
            if (okSent) { sent[key] = true; changed = true; sentThis++; totalSent++; }
          }
        }
      }
      if (changed) { await kvSet(pid, token, c.id, "auto_email_sent", sent); clinicsConActividad++; }
    } catch (e) { /* una clínica que falle no frena al resto */ }
  }

  return res.status(200).json({ ok: true, fecha: hoyISO, clinicas: clinics.length, recordatorios_enviados: totalSent, clinicas_con_envios: clinicsConActividad });
}
