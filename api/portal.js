// Medique · Portal del paciente · Vercel Serverless Function (endpoint único, enrutado por `action`)
// ─────────────────────────────────────────────────────────────────────────────────────────────
// El paciente entra con RUT + una clave que él mismo crea y ve SOLO su propia ficha. La seguridad:
//   • Acceso PRE-AUTORIZADO por el admin de la clínica (no hay auto-registro).
//   • La clave la crea el paciente desde un link de un solo uso enviado a su WhatsApp
//     (prueba de posesión del teléfono en la activación).
//   • Login = RUT + clave (el teléfono solo se usa una vez, al activar).
//   • El navegador del paciente NUNCA toca Firestore: todo pasa por este endpoint, que filtra
//     server-side y devuelve solo el registro de ESE paciente (nunca el array completo).
//   • El material de autenticación (hash, salt, preguntas) vive en una colección server-only
//     `tenants/{clinicId}/portalauth/{rutKey}`, FUERA del array `patients` que se sincroniza a los
//     navegadores del staff. El servidor JAMÁS escribe el array de pacientes (evita clobbering).
//   • Índice global server-only `portalIndex/{rutKey}` → { clinicId } para resolver la clínica al
//     hacer login solo con el RUT (multi-clínica).
//   • Rate-limit en login/recuperación + errores genéricos (anti-enumeración).
//
// Un solo archivo por el límite de funciones serverless de Vercel (ver team-access.js).
//
// Variables de entorno (Vercel):
//   PORTAL_SECRET                 = secreto aleatorio largo (firma tokens de activación y de sesión)
//   FIREBASE_SERVICE_ACCOUNT_JSON = JSON de la cuenta de servicio (mismo de team-access / super-ops)
//   FIREBASE_PROJECT_ID           = (default 'medique-8dbf6')
//   WHATSAPP_TOKEN, WHATSAPP_PHONE_ID = (opcional) para enviar el link automático por WhatsApp;
//                                   si faltan, el endpoint devuelve el link para que el admin lo copie
//   PORTAL_BASE                   = (opcional) base del portal, default 'https://pacientes.medique.cl'

import crypto from "node:crypto";

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "medique-8dbf6";
const PORTAL_BASE = process.env.PORTAL_BASE || "https://pacientes.medique.cl";
const GRAPH = "https://graph.facebook.com/v21.0";
const ALLOWED_ORIGINS = ["https://pacientes.medique.cl", "https://medique.cl", "https://www.medique.cl", "https://portal.medique.cl", "https://admin.medique.cl", "https://jcmedical.cl", "https://www.jcmedical.cl"];

// ── Firebase Admin SDK (lazy) ──
let _svc = null;
async function getAdmin() {
  if (_svc) return _svc;
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!svcJson) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON no configurado");
  const { initializeApp, cert, getApps } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  const appName = "portal";
  const app = getApps().find(a => a.name === appName) || initializeApp({ credential: cert(JSON.parse(svcJson)) }, appName);
  _svc = { db: getFirestore(app) };
  return _svc;
}

// ── Verificación del ID token de Firebase (solo acciones del admin) ──
const CERTS_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
let _certCache = { at: 0, certs: null };
async function googleCerts() {
  const now = Date.now();
  if (_certCache.certs && now - _certCache.at < 3600000) return _certCache.certs;
  const r = await fetch(CERTS_URL);
  _certCache = { at: now, certs: await r.json() };
  return _certCache.certs;
}
function b64buf(s) { s = String(s).replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return Buffer.from(s, "base64"); }
async function verifyFirebaseToken(token) {
  const parts = (token || "").split(".");
  if (parts.length !== 3) throw new Error("token mal formado");
  const header = JSON.parse(b64buf(parts[0]).toString("utf8"));
  if (header.alg !== "RS256" || !header.kid) throw new Error("alg/kid inválido");
  const certs = await googleCerts();
  const pem = certs[header.kid];
  if (!pem) throw new Error("kid desconocido");
  const pub = new crypto.X509Certificate(pem).publicKey;
  if (!crypto.createVerify("RSA-SHA256").update(parts[0] + "." + parts[1]).verify(pub, b64buf(parts[2]))) throw new Error("firma inválida");
  const p = JSON.parse(b64buf(parts[1]).toString("utf8"));
  const now = Math.floor(Date.now() / 1000);
  if (!p.exp || p.exp <= now) throw new Error("token expirado");
  if (p.aud !== PROJECT_ID) throw new Error("aud inválido");
  if (!p.sub) throw new Error("sub vacío");
  return p;
}

// ── Tokens propios del portal (HMAC sin estado, tipo JWT mínimo) ──
function hmac(secret, msg) { return crypto.createHmac("sha256", secret).update(msg).digest("hex"); }
function b64url(buf) { return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function signToken(secret, payload) { const body = b64url(JSON.stringify(payload)); return body + "." + hmac(secret, body); }
function readToken(secret, token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = hmac(secret, body);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  let p; try { p = JSON.parse(b64buf(body).toString("utf8")); } catch (e) { return null; }
  if (!p.exp || p.exp <= Date.now()) return null;
  return p;
}

// ── Hash de contraseñas / respuestas (PBKDF2-SHA256, salt por valor) ──
function pbkdf2(value, saltB64) {
  const salt = saltB64 ? Buffer.from(saltB64, "base64") : crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(String(value), salt, 100000, 32, "sha256").toString("base64");
  return { hash, salt: salt.toString("base64") };
}
function pbkdf2Verify(value, hash, saltB64) {
  if (!hash || !saltB64) return false;
  const got = crypto.pbkdf2Sync(String(value), Buffer.from(saltB64, "base64"), 100000, 32, "sha256").toString("base64");
  return got.length === hash.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(hash));
}

// ── RUT → clave normalizada (solo dígitos + K final en mayúscula) ──
function rutKeyOf(rut) { return String(rut || "").replace(/[^0-9kK]/g, "").toUpperCase(); }
function normAnswer(a) { return String(a || "").trim().toLowerCase().replace(/\s+/g, " "); }

// ── Rate limit en memoria (rutKey|action). Se reinicia en cold starts; suficiente combinado con la
//    pre-autorización del admin y el vencimiento de tokens. Tope: 6 intentos / 15 min. ──
const _att = new Map();
const ATT_MAX = 6, ATT_WINDOW = 15 * 60 * 1000;
function tooMany(key) {
  const now = Date.now();
  let r = _att.get(key);
  if (!r || now - r.ts > ATT_WINDOW) r = { ts: now, count: 0 };
  r.count++; _att.set(key, r);
  if (_att.size > 5000) for (const [k, v] of _att) if (now - v.ts > ATT_WINDOW) _att.delete(k);
  return r.count > ATT_MAX;
}
function attReset(key) { _att.delete(key); }

// ── Envío de WhatsApp (Cloud API). Devuelve true/false; nunca lanza (fallback = link manual). ──
async function sendWhats(to, body) {
  const token = process.env.WHATSAPP_TOKEN, phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) return false;
  try {
    const r = await fetch(`${GRAPH}/${phoneId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: String(body).slice(0, 4000) } })
    });
    if (!r.ok) { console.error("[portal] WhatsApp send", r.status, await r.text().catch(() => "")); return false; }
    return true;
  } catch (e) { console.error("[portal] WhatsApp send err", e.message || e); return false; }
}
function waPhone(p) { let d = String(p || "").replace(/\D/g, ""); if (d && d[0] === "9" && d.length === 9) d = "56" + d; return d; }

// ── Lectura de un kv de la clínica (el array se guarda como JSON string en el campo `v`) ──
async function readKv(db, clinicId, key) {
  const doc = await db.collection("tenants").doc(clinicId).collection("kv").doc(key).get();
  if (!doc.exists) return null;
  try { const d = doc.data(); return d && d.v != null ? JSON.parse(d.v) : null; } catch (e) { return null; }
}

// Campos SEGUROS del historial que el paciente puede ver (nunca cobro, notas internas, lote, etc.).
function safeHistory(history) {
  return (Array.isArray(history) ? history : []).map(h => ({
    date: h.date || "", proc: h.proc || "", proName: h.proName || "",
    resumen: h.resumen || "", recomendados: h.recomendados || "", units: h.units || ""
  })).filter(h => h.proc);
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  const SECRET = process.env.PORTAL_SECRET;
  if (!SECRET) return res.status(503).json({ ok: false, configured: false, error: "El portal del paciente no está configurado (falta PORTAL_SECRET)." });

  const body = (req.body && typeof req.body === "object") ? req.body : {};
  const action = body.action;
  const ipKey = (req.headers["x-forwarded-for"] || "ip").toString().split(",")[0].trim();

  try {
    const { db } = await getAdmin();

    // ══════════ ACCIONES DEL ADMIN (requieren ID token de Firebase) ══════════
    if (action === "activate" || action === "revoke" || action === "status") {
      const idToken = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
      let caller;
      try { caller = await verifyFirebaseToken(idToken); }
      catch (e) { return res.status(401).json({ ok: false, error: "Sesión inválida." }); }
      const callerDoc = await db.collection("users").doc(caller.sub).get();
      const cu = callerDoc.exists ? callerDoc.data() : null;
      if (!cu || !cu.clinicId) return res.status(403).json({ ok: false, error: "Tu cuenta no está asociada a una clínica." });
      if ((cu.role || "owner") === "professional") return res.status(403).json({ ok: false, error: "Solo el dueño o el staff pueden gestionar el portal del paciente." });
      const clinicId = cu.clinicId;

      // Datos autoritativos del paciente desde el array de la clínica (no confiamos en el cliente).
      const patients = (await readKv(db, clinicId, "patients")) || [];
      const pat = patients.find(p => p.id === body.patientId);
      if (!pat) return res.status(404).json({ ok: false, error: "Paciente no encontrado." });
      const rk = rutKeyOf(pat.rut);

      if (action === "status") {
        if (!rk) return res.status(200).json({ ok: true, status: "no_rut" });
        const aDoc = await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).get();
        const a = aDoc.exists ? aDoc.data() : null;
        if (!a || !a.authorized) return res.status(200).json({ ok: true, status: "inactive" });
        return res.status(200).json({ ok: true, status: a.status || "pending", activatedAt: a.activatedAt || null });
      }

      if (action === "revoke") {
        if (!rk) return res.status(400).json({ ok: false, error: "El paciente no tiene RUT." });
        await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).set({ authorized: false, status: "revoked", revokedAt: Date.now(), revokedBy: caller.sub }, { merge: true });
        return res.status(200).json({ ok: true, status: "revoked" });
      }

      // action === "activate"
      if (!rk) return res.status(400).json({ ok: false, error: "El paciente no tiene RUT registrado. Agrégalo en su ficha antes de activar el portal." });
      const phone = waPhone(pat.phone);
      // Crea/actualiza la autorización (merge: no borra hash/preguntas si se re-activa).
      await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).set({
        clinicId, patientId: pat.id, name: pat.name || "", authorized: true, status: "pending",
        activatedBy: caller.sub, activatedAt: Date.now()
      }, { merge: true });
      await db.collection("portalIndex").doc(rk).set({ clinicId });
      // Token de activación (48 h) → link de un solo uso.
      const exp = Date.now() + 48 * 60 * 60 * 1000;
      const token = signToken(SECRET, { clinicId, rutKey: rk, patientId: pat.id, typ: "activate", exp });
      const link = PORTAL_BASE + "/?activar=" + encodeURIComponent(token);
      const clinicName = (cu.clinicName || "tu clínica");
      const msg = "Hola " + ((pat.name || "").split(" ")[0] || "") + ", activaste el acceso a tu ficha en " + clinicName +
        ". Crea tu clave aquí (el enlace vence en 48 h): " + link;
      const sent = phone ? await sendWhats(phone, msg) : false;
      return res.status(200).json({ ok: true, sent, link, phone: phone ? ("+" + phone) : null, status: "pending" });
    }

    // ══════════ ACCIONES DEL PACIENTE (sin Firebase; identidad por RUT/token propio) ══════════

    // Validar el token del link de activación (público).
    if (action === "verify-token") {
      const p = readToken(SECRET, body.token);
      if (!p || p.typ !== "activate") return res.status(400).json({ ok: false, error: "El enlace no es válido o venció. Pídele a la clínica que lo reenvíe." });
      const aDoc = await db.collection("tenants").doc(p.clinicId).collection("portalauth").doc(p.rutKey).get();
      const a = aDoc.exists ? aDoc.data() : null;
      if (!a || !a.authorized) return res.status(403).json({ ok: false, error: "El acceso no está autorizado por la clínica." });
      return res.status(200).json({ ok: true, name: a.name || "", alreadySet: a.status === "active" });
    }

    // Fijar clave + 3 preguntas de seguridad (con token de activación válido).
    if (action === "register") {
      const p = readToken(SECRET, body.token);
      if (!p || p.typ !== "activate") return res.status(400).json({ ok: false, error: "El enlace no es válido o venció." });
      const aRef = db.collection("tenants").doc(p.clinicId).collection("portalauth").doc(p.rutKey);
      const aDoc = await aRef.get();
      const a = aDoc.exists ? aDoc.data() : null;
      if (!a || !a.authorized) return res.status(403).json({ ok: false, error: "El acceso no está autorizado por la clínica." });
      const password = String(body.password || "");
      if (password.length < 6) return res.status(400).json({ ok: false, error: "La clave debe tener al menos 6 caracteres." });
      const questions = Array.isArray(body.questions) ? body.questions.map(q => String(q || "").trim().slice(0, 160)) : [];
      const answers = Array.isArray(body.answers) ? body.answers.map(normAnswer) : [];
      if (questions.length !== 3 || answers.length !== 3 || questions.some(q => !q) || answers.some(a2 => a2.length < 2))
        return res.status(400).json({ ok: false, error: "Define las 3 preguntas de seguridad con sus respuestas." });
      const pw = pbkdf2(password);
      const secQ = questions.map((q, i) => { const h = pbkdf2(answers[i]); return { q, hash: h.hash, salt: h.salt }; });
      await aRef.set({ hash: pw.hash, salt: pw.salt, secQ, status: "active", registeredAt: Date.now() }, { merge: true });
      return res.status(200).json({ ok: true });
    }

    // Login por RUT + clave → token de sesión (24 h).
    if (action === "login") {
      const rk = rutKeyOf(body.rut);
      const genericErr = { ok: false, error: "RUT o clave incorrectos." };
      if (!rk || tooMany("login|" + rk) || tooMany("loginip|" + ipKey)) return res.status(rk ? 429 : 400).json(rk ? { ok: false, error: "Demasiados intentos. Espera unos minutos." } : genericErr);
      const idxDoc = await db.collection("portalIndex").doc(rk).get();
      const clinicId = idxDoc.exists ? idxDoc.data().clinicId : null;
      if (!clinicId) return res.status(401).json(genericErr);
      const aDoc = await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).get();
      const a = aDoc.exists ? aDoc.data() : null;
      if (!a || !a.authorized || a.status !== "active" || !a.hash) return res.status(401).json(genericErr);
      if (!pbkdf2Verify(body.password, a.hash, a.salt)) return res.status(401).json(genericErr);
      attReset("login|" + rk);
      const token = signToken(SECRET, { clinicId, patientId: a.patientId, rutKey: rk, typ: "sess", exp: Date.now() + 24 * 60 * 60 * 1000 });
      return res.status(200).json({ ok: true, token, name: a.name || "" });
    }

    // Devolver la ficha del paciente logueado (solo campos seguros).
    if (action === "me") {
      const p = readToken(SECRET, body.token);
      if (!p || p.typ !== "sess") return res.status(401).json({ ok: false, error: "Sesión expirada. Inicia sesión de nuevo." });
      const patients = (await readKv(db, p.clinicId, "patients")) || [];
      const pat = patients.find(x => x.id === p.patientId);
      if (!pat) return res.status(404).json({ ok: false, error: "Ficha no encontrada." });
      // Próxima cita (opcional).
      let nextAppt = null;
      try {
        const appts = (await readKv(db, p.clinicId, "appointments")) || [];
        const todayISO = new Date().toISOString().slice(0, 10);
        const fut = appts.filter(x => x.patId === p.patientId && x.fecha && x.fecha >= todayISO && x.status !== "anulada" && x.status !== "cancelada")
          .sort((x, y) => ((x.fecha || "") + (x.time || "")).localeCompare((y.fecha || "") + (y.time || "")));
        if (fut[0]) nextAppt = { fecha: fut[0].fecha, time: fut[0].time || "", proc: fut[0].proc || "" };
      } catch (e) {}
      // Nombre público de la clínica (si existe).
      let clinicName = "";
      try { const pub = await db.collection("tenants").doc(p.clinicId).collection("public").doc("profile").get(); if (pub.exists) clinicName = (pub.data().clinic_name || pub.data().name || ""); } catch (e) {}
      return res.status(200).json({ ok: true, name: pat.name || "", clinicName, history: safeHistory(pat.history), nextAppt });
    }

    // Recuperación: paso 1 → devolver las 3 preguntas.
    if (action === "recover-start") {
      const rk = rutKeyOf(body.rut);
      if (!rk || tooMany("recover|" + rk) || tooMany("recoverip|" + ipKey)) return res.status(429).json({ ok: false, error: "Demasiados intentos. Espera unos minutos." });
      const idxDoc = await db.collection("portalIndex").doc(rk).get();
      const clinicId = idxDoc.exists ? idxDoc.data().clinicId : null;
      if (!clinicId) return res.status(404).json({ ok: false, error: "No hay una cuenta activa para ese RUT." });
      const aDoc = await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).get();
      const a = aDoc.exists ? aDoc.data() : null;
      if (!a || !a.authorized || !Array.isArray(a.secQ) || a.secQ.length !== 3) return res.status(404).json({ ok: false, error: "No hay una cuenta activa para ese RUT." });
      return res.status(200).json({ ok: true, questions: a.secQ.map(q => q.q) });
    }

    // Recuperación: paso 2 → verificar respuestas y fijar clave nueva.
    if (action === "recover-verify") {
      const rk = rutKeyOf(body.rut);
      if (!rk || tooMany("recover2|" + rk) || tooMany("recoverip|" + ipKey)) return res.status(429).json({ ok: false, error: "Demasiados intentos. Espera unos minutos." });
      const answers = Array.isArray(body.answers) ? body.answers.map(normAnswer) : [];
      const newPassword = String(body.newPassword || "");
      if (answers.length !== 3) return res.status(400).json({ ok: false, error: "Responde las 3 preguntas." });
      if (newPassword.length < 6) return res.status(400).json({ ok: false, error: "La nueva clave debe tener al menos 6 caracteres." });
      const idxDoc = await db.collection("portalIndex").doc(rk).get();
      const clinicId = idxDoc.exists ? idxDoc.data().clinicId : null;
      if (!clinicId) return res.status(400).json({ ok: false, error: "No se pudo verificar. Revisa tus respuestas." });
      const aRef = db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk);
      const aDoc = await aRef.get();
      const a = aDoc.exists ? aDoc.data() : null;
      if (!a || !a.authorized || !Array.isArray(a.secQ) || a.secQ.length !== 3) return res.status(400).json({ ok: false, error: "No se pudo verificar. Revisa tus respuestas." });
      const allOk = a.secQ.every((q, i) => pbkdf2Verify(answers[i], q.hash, q.salt));
      if (!allOk) return res.status(401).json({ ok: false, error: "Alguna respuesta no coincide." });
      const pw = pbkdf2(newPassword);
      await aRef.set({ hash: pw.hash, salt: pw.salt, recoveredAt: Date.now() }, { merge: true });
      attReset("recover|" + rk); attReset("recover2|" + rk);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ ok: false, error: "Acción no válida." });
  } catch (e) {
    console.error("[portal]", (e && e.message) || e);
    return res.status(500).json({ ok: false, error: "No se pudo procesar la solicitud." });
  }
}
