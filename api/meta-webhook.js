// Medique · Webhook de Instagram + Facebook (Messenger) — Vercel Serverless Function
// Hermano de wa-webhook.js, pero para DMs de Instagram y mensajes de Facebook Messenger.
// FLUJO: paciente escribe en IG/FB → Meta → este webhook → Groq responde/agenda → guarda en la
//        bandeja del panel (Agente IA) → responde por el mismo canal.
//
// Variables de entorno (Vercel):
//   META_VERIFY_TOKEN       = palabra secreta para verificar el webhook en Meta (la inventas)
//   META_PAGE_TOKENS        = JSON {"<page_id>":"<page_access_token>"}  (token de cada Página)
//   META_PAGE_TOKEN         = (alternativa mono-página) token único de la Página
//   META_PAGE_MAP           = JSON {"<page_id>":"<clinicId>"}  → cada Página/cuenta IG a su clínica
//   META_CLINIC_ID          = (fallback mono-clínica) clínica destino
//   META_CLINIC_NAME        = nombre de la clínica para el contexto del bot
//   GROQ_API_KEY [, GROQ_MODEL]   = cerebro IA (mismo que WhatsApp; modelo intercambiable)
//   FIREBASE_PROJECT_ID, FIREBASE_API_KEY        = para crear la reserva (REST público de bookings)
//   FIREBASE_SERVICE_ACCOUNT                      = para guardar la conversación en la bandeja del panel
//   META_APP_SECRET         = (opcional) valida la firma X-Hub-Signature-256

import crypto from "node:crypto";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GRAPH = "https://graph.facebook.com/v21.0";

const _sessions = new Map();
const SESSION_TTL = 30 * 60 * 1000;
function getSession(id) {
  const now = Date.now();
  let s = _sessions.get(id);
  if (!s || (now - s.at) > SESSION_TTL) s = { msgs: [], at: now };
  s.at = now; _sessions.set(id, s);
  if (_sessions.size > 2000) { for (const [k, v] of _sessions) { if (now - v.at > SESSION_TTL) _sessions.delete(k); } }
  return s;
}
function todayCL() { try { return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); } catch (e) { return new Date().toISOString().slice(0, 10); } }
function _hora() { try { return new Intl.DateTimeFormat("es-CL", { timeZone: "America/Santiago", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()); } catch (e) { return ""; } }

async function askGroq(messages) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("falta GROQ_API_KEY");
  const r = await fetch(GROQ_URL, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key }, body: JSON.stringify({ model: process.env.GROQ_MODEL || "openai/gpt-oss-120b", messages, temperature: 0.4, max_tokens: 350, response_format: { type: "json_object" } }) });
  if (!r.ok) { const t = await r.text().catch(() => ""); throw new Error("Groq " + r.status + " " + t); }
  const data = await r.json();
  return (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
}
function parseJson(s) { try { return JSON.parse(s); } catch (e) {} const m = String(s).match(/\{[\s\S]*\}/); if (m) { try { return JSON.parse(m[0]); } catch (e) {} } return null; }

async function crearReserva(clinicId, b, source) {
  const pid = process.env.FIREBASE_PROJECT_ID || "medique-8dbf6";
  const apiKey = process.env.FIREBASE_API_KEY || "AIzaSyCIG19u0_T6rldljMq_St-WJ-XX8JkAsM4";
  const url = `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/tenants/${encodeURIComponent(clinicId)}/bookings?key=${apiKey}`;
  const fields = {
    name: { stringValue: (b.nombre || "").slice(0, 119) }, phone: { stringValue: (b.phone || "").slice(0, 29) }, email: { stringValue: "" },
    proc: { stringValue: (b.proc || "Evaluación").slice(0, 120) }, fecha: { stringValue: b.fecha || "" }, time: { stringValue: b.hora || "" },
    dur: { stringValue: "" }, note: { stringValue: "Reserva por " + (source || "redes") + " (agente IA)" }, source: { stringValue: source || "meta" },
    procs: { arrayValue: { values: [] } }, createdAt: { integerValue: String(Date.now()) }
  };
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fields }) });
  if (!r.ok) { const t = await r.text().catch(() => ""); throw new Error("Firestore " + r.status + " " + t); }
  return true;
}

// ── Persistencia en la bandeja del panel (cuenta de servicio) ──
function _getSA() { const raw = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.GOOGLE_SERVICE_ACCOUNT || ""; if (!raw) return null; try { return JSON.parse(raw); } catch (e) { return null; } }
function _b64url(buf) { return Buffer.from(buf).toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
async function _saToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = _b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = _b64url(JSON.stringify({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/datastore", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const signer = crypto.createSign("RSA-SHA256"); signer.update(header + "." + claim);
  const assertion = header + "." + claim + "." + _b64url(signer.sign(sa.private_key));
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=" + encodeURIComponent(assertion) });
  const d = await r.json(); if (!d.access_token) throw new Error("sin access_token"); return d.access_token;
}
async function appendInbox(clinicId, channel, contactId, name, inboundText, replyText) {
  const sa = _getSA(); if (!sa) return;
  const pid = process.env.FIREBASE_PROJECT_ID || "medique-8dbf6";
  const base = `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/tenants/${encodeURIComponent(clinicId)}/kv/wa_conversations`;
  const token = await _saToken(sa);
  let convs = [];
  try { const g = await fetch(base, { headers: { Authorization: "Bearer " + token } }); if (g.ok) { const doc = await g.json(); const v = doc && doc.fields && doc.fields.v && doc.fields.v.stringValue; if (v) convs = JSON.parse(v) || []; } } catch (e) {}
  const tid = channel + ":" + contactId;
  let t = convs.find(c => c.id === tid);
  if (!t) { t = { id: tid, channel: channel, name: name || contactId, phone: contactId, msgs: [] }; convs.unshift(t); }
  const h = _hora();
  if (inboundText) t.msgs.push({ f: "in", t: String(inboundText).slice(0, 2000), h });
  if (replyText) t.msgs.push({ f: "out", t: String(replyText).slice(0, 2000), h });
  t.msgs = t.msgs.slice(-200);
  // M-WACONV: podar por CANTIDAD, no por caracteres. Antes: JSON.stringify(convs).slice(0, 900000)
  // cortaba el string a la mitad de un objeto al superar el tope → JSON.parse fallaba y la bandeja
  // "Agente IA" dejaba de sincronizar. Ahora conservamos las últimas N conversaciones (las nuevas
  // van al frente por unshift, así que .slice(0, N) mantiene las más recientes) y limitamos los
  // mensajes por conversación; si aún excede el presupuesto de bytes, descartamos las
  // conversaciones más viejas (del final) de a una. El JSON resultante SIEMPRE queda válido.
  const MAX_CONVS = 500, MAX_MSGS = 200, MAX_BYTES = 900000;
  if (convs.length > MAX_CONVS) convs = convs.slice(0, MAX_CONVS);
  convs.forEach(c => { if (c && Array.isArray(c.msgs) && c.msgs.length > MAX_MSGS) c.msgs = c.msgs.slice(-MAX_MSGS); });
  let payload = JSON.stringify(convs);
  while (payload.length > MAX_BYTES && convs.length > 1) { convs.pop(); payload = JSON.stringify(convs); }
  const body = { fields: { v: { stringValue: payload }, _ts: { integerValue: String(Date.now()) } } };
  await fetch(base, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }, body: JSON.stringify(body) }).catch(() => {});
}

// Envía un mensaje por Messenger/Instagram (Send API de la Página).
async function sendMeta(pageId, psid, text) {
  let token = process.env.META_PAGE_TOKEN || "";
  try { const m = JSON.parse(process.env.META_PAGE_TOKENS || "{}"); if (pageId && m[pageId]) token = m[pageId]; } catch (e) {}
  if (!token) { console.error("falta META_PAGE_TOKEN(S)"); return; }
  const r = await fetch(`${GRAPH}/me/messages?access_token=${encodeURIComponent(token)}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipient: { id: psid }, messaging_type: "RESPONSE", message: { text: String(text).slice(0, 1900) } })
  });
  if (!r.ok) { const t = await r.text().catch(() => ""); console.error("Meta send error", r.status, t); }
}

function clinicFor(pageId) {
  let clinicId = process.env.META_CLINIC_ID || "jc-medical-qI9deP";
  try { const map = JSON.parse(process.env.META_PAGE_MAP || "{}"); if (pageId && map[pageId]) clinicId = map[pageId]; } catch (e) {}
  return clinicId;
}

export default async function handler(req, res) {
  // Verificación del webhook (GET de Meta al configurarlo).
  if (req.method === "GET") {
    const q = req.query || {};
    if (q["hub.mode"] === "subscribe" && q["hub.verify_token"] && q["hub.verify_token"] === process.env.META_VERIFY_TOKEN) return res.status(200).send(q["hub.challenge"]);
    return res.status(403).send("forbidden");
  }
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  const appSecret = process.env.META_APP_SECRET;
  if (appSecret) {
    try { const sig = req.headers["x-hub-signature-256"] || ""; const expected = "sha256=" + crypto.createHmac("sha256", appSecret).update(JSON.stringify(req.body || {})).digest("hex"); if (sig !== expected) return res.status(401).send("bad signature"); } catch (e) {}
  }

  // Canal según el objeto: "instagram" = IG DM · "page" = Facebook Messenger.
  const channel = (req.body && req.body.object === "instagram") ? "instagram" : "facebook";
  // Recolecta los mensajes de texto entrantes (puede venir más de uno por batch).
  const jobs = [];
  try {
    (req.body && req.body.entry || []).forEach(entry => {
      const pageId = entry.id || "";
      (entry.messaging || []).forEach(ev => {
        const psid = ev.sender && ev.sender.id;
        const text = ev.message && ev.message.text;
        if (psid && text && !(ev.message && ev.message.is_echo)) jobs.push({ pageId, psid, text });
      });
    });
  } catch (e) {}

  if (!jobs.length) return res.status(200).json({ ok: true });

  // Procesa cada mensaje (responde + agenda + guarda). 200 a Meta igual.
  for (const j of jobs) {
    const clinicId = clinicFor(j.pageId);
    const clinicName = process.env.META_CLINIC_NAME || "la clínica";
    const sys = [
      "Eres el asistente de " + (channel === "instagram" ? "Instagram" : "Facebook") + " de " + clinicName + " (medicina estética).",
      "Responde en español de Chile, breve, cercano y profesional. Nunca des diagnósticos ni dosis.",
      "Tu objetivo es ayudar y, cuando el paciente quiera agendar, reunir: nombre, procedimiento/servicio, fecha y hora.",
      "Hoy es " + todayCL() + ". Interpreta 'mañana', 'el viernes', etc. respecto a esa fecha. Horas en 24h.",
      "Los procedimientos son actos médicos: la hora queda sujeta a una evaluación previa.",
      "",
      "RESPONDE SIEMPRE en JSON válido (sin texto fuera del JSON), con UNA de estas formas:",
      '{"action":"reply","reply":"<tu mensaje>"}',
      '{"action":"book","nombre":"<nombre>","proc":"<servicio>","fecha":"YYYY-MM-DD","hora":"HH:MM","reply":"<confirmación>"}',
      'Usa "book" SOLO con los 4 datos y confirmación del paciente; si falta algo, usa "reply".'
    ].join("\n");
    const session = getSession(channel + ":" + j.psid);
    session.msgs.push({ role: "user", content: String(j.text).slice(0, 1000) });
    session.msgs = session.msgs.slice(-12);
    try {
      const raw = await askGroq([{ role: "system", content: sys }].concat(session.msgs));
      const out = parseJson(raw) || { action: "reply", reply: raw };
      let reply = out.reply || "¿Te ayudo a agendar una hora?";
      if (out.action === "book" && out.nombre && out.fecha && out.hora) {
        try { await crearReserva(clinicId, { nombre: out.nombre, phone: j.psid, proc: out.proc, fecha: out.fecha, hora: out.hora }, channel); reply = out.reply || ("¡Listo " + out.nombre + "! Tu reserva quedó solicitada para el " + out.fecha + " a las " + out.hora + ". Te confirmamos a la brevedad."); session.msgs = []; }
        catch (e) { console.error("No se pudo crear la reserva (meta):", e); reply = "Tomé tus datos, pero tuve un problema al registrar la reserva. Una persona del equipo te contactará."; }
      }
      session.msgs.push({ role: "assistant", content: reply });
      await sendMeta(j.pageId, j.psid, reply);
      try { await appendInbox(clinicId, channel, j.psid, "", j.text, reply); } catch (e) { console.error("appendInbox meta:", e); }
    } catch (e) {
      console.error("Error procesando mensaje meta:", e);
      try { await sendMeta(j.pageId, j.psid, "Disculpa, tuve un problema para responder. Intenta de nuevo en un momento 🙏"); } catch (_) {}
    }
  }
  return res.status(200).json({ ok: true });
}
