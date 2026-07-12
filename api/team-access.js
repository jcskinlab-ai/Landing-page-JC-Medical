// Medique · Gestión de accesos (sub-cuentas de profesionales + PORTAL DEL PACIENTE) · Vercel Function
// 1) El DUEÑO de una clínica crea/revoca cuentas de login para sus profesionales (acciones create/
//    revoke, con Firebase Admin SDK). También genera links de pago (pay-link).
// 2) PORTAL DEL PACIENTE (acciones "portal-*", fusionadas aquí para no exceder el límite de 12
//    funciones de Vercel en plan Hobby): el paciente entra con RUT + clave propia y ve SOLO su ficha;
//    el admin autoriza el acceso (portal-activate/revoke/status), el paciente crea su clave desde un
//    link (portal-verify-token/register), inicia sesión (portal-login), lee su ficha (portal-me) y
//    recupera su clave con 3 preguntas (portal-recover-start/verify). El navegador del paciente NUNCA
//    toca Firestore: todo pasa por aquí, que filtra server-side.
//
// Variables de entorno (Vercel):
//   FIREBASE_SERVICE_ACCOUNT_JSON  = JSON de la cuenta de servicio (el mismo de super-ops)
//   FIREBASE_PROJECT_ID            = (default 'medique-8dbf6')
//   PORTAL_SECRET                  = secreto aleatorio largo (firma los tokens del portal del paciente)
//   WHATSAPP_TOKEN, WHATSAPP_PHONE_ID = (opcional) envío automático del link de activación por WhatsApp
//   PORTAL_BASE                    = (opcional) base del portal, default 'https://pacientes.medique.cl'

import crypto from "node:crypto";

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "medique-8dbf6";
const ALLOWED_ORIGINS = ["https://pacientes.medique.cl", "https://medique.cl", "https://www.medique.cl", "https://portal.medique.cl", "https://admin.medique.cl", "https://jcmedical.cl", "https://www.jcmedical.cl"];
// Base del PORTAL DEL PACIENTE (link de activación) y API de WhatsApp Cloud.
const PORTAL_BASE = process.env.PORTAL_BASE || "https://pacientes.medique.cl";
const GRAPH = "https://graph.facebook.com/v21.0";

// ── Firebase Admin SDK ──
let _svc = null;
async function getAdmin() {
  if (_svc) return _svc;
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!svcJson) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON no configurado");
  const { initializeApp, cert, getApps } = await import("firebase-admin/app");
  const { getAuth } = await import("firebase-admin/auth");
  const { getFirestore } = await import("firebase-admin/firestore");
  const appName = "team-access";
  const app = getApps().find(a => a.name === appName) || initializeApp({ credential: cert(JSON.parse(svcJson)) }, appName);
  _svc = { auth: getAuth(app), db: getFirestore(app) };
  return _svc;
}

// ── Verificación del ID token de Firebase ──
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
async function verifyToken(token) {
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

function isEmail(s) { return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()); }

/* ═══════════════ PORTAL DEL PACIENTE (fusionado aquí para no exceder el límite de 12 funciones
   de Vercel en plan Hobby — mismo criterio que pay-link). El paciente entra con RUT + una clave
   que él mismo crea y ve SOLO su propia ficha; el acceso lo autoriza el admin. El navegador del
   paciente NUNCA toca Firestore: todo pasa por aquí (acciones "portal-*"), que filtra server-side.
   Requiere env var PORTAL_SECRET. ═══════════════ */

// Tokens propios del portal (HMAC sin estado, tipo JWT mínimo). NO usan Firebase (el paciente se
// identifica por RUT, no por email). El payload va embebido en el token para que el servidor lo lea.
function pHmac(secret, msg) { return crypto.createHmac("sha256", secret).update(msg).digest("hex"); }
function pB64url(buf) { return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function pSignToken(secret, payload) { const body = pB64url(JSON.stringify(payload)); return body + "." + pHmac(secret, body); }
function pReadToken(secret, token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = pHmac(secret, body);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  let p; try { p = JSON.parse(b64buf(body).toString("utf8")); } catch (e) { return null; }
  if (!p.exp || p.exp <= Date.now()) return null;
  return p;
}
// Hash de contraseñas / respuestas (PBKDF2-SHA256, salt por valor).
function pPbkdf2(value, saltB64) {
  const salt = saltB64 ? Buffer.from(saltB64, "base64") : crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(String(value), salt, 100000, 32, "sha256").toString("base64");
  return { hash, salt: salt.toString("base64") };
}
function pPbkdf2Verify(value, hash, saltB64) {
  if (!hash || !saltB64) return false;
  const got = crypto.pbkdf2Sync(String(value), Buffer.from(saltB64, "base64"), 100000, 32, "sha256").toString("base64");
  return got.length === hash.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(hash));
}
function pRutKey(rut) { return String(rut || "").replace(/[^0-9kK]/g, "").toUpperCase(); }
function pNormAnswer(a) { return String(a || "").trim().toLowerCase().replace(/\s+/g, " "); }
function pWaPhone(p) { let d = String(p || "").replace(/\D/g, ""); if (d && d[0] === "9" && d.length === 9) d = "56" + d; return d; }
// Rate limit en memoria (rutKey|acción). Se reinicia en cold starts; suficiente con la
// pre-autorización del admin y el vencimiento de tokens. Tope: 6 intentos / 15 min.
const _pAtt = new Map();
function pTooMany(key) {
  const now = Date.now(); let r = _pAtt.get(key);
  if (!r || now - r.ts > 900000) r = { ts: now, count: 0 };
  r.count++; _pAtt.set(key, r);
  if (_pAtt.size > 5000) for (const [k, v] of _pAtt) if (now - v.ts > 900000) _pAtt.delete(k);
  return r.count > 6;
}
function pAttReset(key) { _pAtt.delete(key); }
// Envío de WhatsApp (Cloud API). Devuelve true/false; nunca lanza (fallback = link manual).
async function pSendWhats(to, body) {
  const token = process.env.WHATSAPP_TOKEN, phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) return false;
  try {
    const r = await fetch(`${GRAPH}/${phoneId}/messages`, {
      method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: String(body).slice(0, 4000) } })
    });
    if (!r.ok) { console.error("[portal] WhatsApp", r.status, await r.text().catch(() => "")); return false; }
    return true;
  } catch (e) { console.error("[portal] WhatsApp err", e.message || e); return false; }
}
// Lectura de un kv de la clínica (el array se guarda como JSON string en el campo `v`).
async function pReadKv(db, clinicId, key) {
  const doc = await db.collection("tenants").doc(clinicId).collection("kv").doc(key).get();
  if (!doc.exists) return null;
  try { const d = doc.data(); return d && d.v != null ? JSON.parse(d.v) : null; } catch (e) { return null; }
}
// Campos SEGUROS del historial que el paciente puede ver (nunca cobro, notas internas, lote…).
function pSafeHistory(history) {
  return (Array.isArray(history) ? history : []).map(h => ({
    date: h.date || "", proc: h.proc || "", proName: h.proName || "",
    resumen: h.resumen || "", recomendados: h.recomendados || "", units: h.units || ""
  })).filter(h => h.proc);
}

// Acciones PÚBLICAS del portal (sin Firebase; identidad por RUT / token propio).
async function portalPublic(req, res, action, body, db, SECRET) {
  const ipKey = (req.headers["x-forwarded-for"] || "ip").toString().split(",")[0].trim();

  if (action === "portal-verify-token") {
    const p = pReadToken(SECRET, body.token);
    if (!p || p.typ !== "activate") return res.status(400).json({ ok: false, error: "El enlace no es válido o venció. Pídele a la clínica que lo reenvíe." });
    const aDoc = await db.collection("tenants").doc(p.clinicId).collection("portalauth").doc(p.rutKey).get();
    const a = aDoc.exists ? aDoc.data() : null;
    if (!a || !a.authorized) return res.status(403).json({ ok: false, error: "El acceso no está autorizado por la clínica." });
    return res.status(200).json({ ok: true, name: a.name || "", alreadySet: a.status === "active" });
  }

  if (action === "portal-register") {
    const p = pReadToken(SECRET, body.token);
    if (!p || p.typ !== "activate") return res.status(400).json({ ok: false, error: "El enlace no es válido o venció." });
    const aRef = db.collection("tenants").doc(p.clinicId).collection("portalauth").doc(p.rutKey);
    const aDoc = await aRef.get();
    const a = aDoc.exists ? aDoc.data() : null;
    if (!a || !a.authorized) return res.status(403).json({ ok: false, error: "El acceso no está autorizado por la clínica." });
    const password = String(body.password || "");
    if (password.length < 6) return res.status(400).json({ ok: false, error: "La clave debe tener al menos 6 caracteres." });
    const questions = Array.isArray(body.questions) ? body.questions.map(q => String(q || "").trim().slice(0, 160)) : [];
    const answers = Array.isArray(body.answers) ? body.answers.map(pNormAnswer) : [];
    if (questions.length !== 3 || answers.length !== 3 || questions.some(q => !q) || answers.some(a2 => a2.length < 2))
      return res.status(400).json({ ok: false, error: "Define las 3 preguntas de seguridad con sus respuestas." });
    const pw = pPbkdf2(password);
    const secQ = questions.map((q, i) => { const h = pPbkdf2(answers[i]); return { q, hash: h.hash, salt: h.salt }; });
    await aRef.set({ hash: pw.hash, salt: pw.salt, secQ, status: "active", registeredAt: Date.now() }, { merge: true });
    return res.status(200).json({ ok: true });
  }

  if (action === "portal-login") {
    const rk = pRutKey(body.rut);
    const genericErr = { ok: false, error: "RUT o clave incorrectos." };
    if (!rk) return res.status(400).json(genericErr);
    if (pTooMany("login|" + rk) || pTooMany("loginip|" + ipKey)) return res.status(429).json({ ok: false, error: "Demasiados intentos. Espera unos minutos." });
    const idxDoc = await db.collection("portalIndex").doc(rk).get();
    const clinicId = idxDoc.exists ? idxDoc.data().clinicId : null;
    if (!clinicId) return res.status(401).json(genericErr);
    const aDoc = await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).get();
    const a = aDoc.exists ? aDoc.data() : null;
    if (!a || !a.authorized || a.status !== "active" || !a.hash) return res.status(401).json(genericErr);
    if (!pPbkdf2Verify(body.password, a.hash, a.salt)) return res.status(401).json(genericErr);
    pAttReset("login|" + rk);
    const token = pSignToken(SECRET, { clinicId, patientId: a.patientId, rutKey: rk, typ: "sess", exp: Date.now() + 24 * 60 * 60 * 1000 });
    return res.status(200).json({ ok: true, token, name: a.name || "" });
  }

  if (action === "portal-me") {
    const p = pReadToken(SECRET, body.token);
    if (!p || p.typ !== "sess") return res.status(401).json({ ok: false, error: "Sesión expirada. Inicia sesión de nuevo." });
    const patients = (await pReadKv(db, p.clinicId, "patients")) || [];
    const pat = patients.find(x => x.id === p.patientId);
    if (!pat) return res.status(404).json({ ok: false, error: "Ficha no encontrada." });
    // El historial NO vive dentro del array patients (índice liviano): se guarda aparte en
    // phist_<id> (documento propio, para no topar el límite de 1MB). Lo leemos de ahí; si es una
    // ficha en formato antiguo (historial inline), usamos pat.history como respaldo.
    let hist = [];
    try { const ph = await pReadKv(db, p.clinicId, "phist_" + p.patientId); if (Array.isArray(ph)) hist = ph; } catch (e) {}
    if (!hist.length && Array.isArray(pat.history)) hist = pat.history;
    let nextAppt = null;
    try {
      const appts = (await pReadKv(db, p.clinicId, "appointments")) || [];
      const todayISO = new Date().toISOString().slice(0, 10);
      const fut = appts.filter(x => x.patId === p.patientId && x.fecha && x.fecha >= todayISO && x.status !== "anulada" && x.status !== "cancelada")
        .sort((x, y) => ((x.fecha || "") + (x.time || "")).localeCompare((y.fecha || "") + (y.time || "")));
      if (fut[0]) nextAppt = { fecha: fut[0].fecha, time: fut[0].time || "", proc: fut[0].proc || "" };
    } catch (e) {}
    let clinicName = "";
    try { const pub = await db.collection("tenants").doc(p.clinicId).collection("public").doc("profile").get(); if (pub.exists) clinicName = (pub.data().clinic_name || pub.data().name || ""); } catch (e) {}
    return res.status(200).json({ ok: true, name: pat.name || "", clinicName, history: pSafeHistory(hist), nextAppt });
  }

  if (action === "portal-recover-start") {
    const rk = pRutKey(body.rut);
    if (!rk || pTooMany("recover|" + rk) || pTooMany("recoverip|" + ipKey)) return res.status(429).json({ ok: false, error: "Demasiados intentos. Espera unos minutos." });
    const idxDoc = await db.collection("portalIndex").doc(rk).get();
    const clinicId = idxDoc.exists ? idxDoc.data().clinicId : null;
    if (!clinicId) return res.status(404).json({ ok: false, error: "No hay una cuenta activa para ese RUT." });
    const aDoc = await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).get();
    const a = aDoc.exists ? aDoc.data() : null;
    if (!a || !a.authorized || !Array.isArray(a.secQ) || a.secQ.length !== 3) return res.status(404).json({ ok: false, error: "No hay una cuenta activa para ese RUT." });
    return res.status(200).json({ ok: true, questions: a.secQ.map(q => q.q) });
  }

  if (action === "portal-recover-verify") {
    const rk = pRutKey(body.rut);
    if (!rk || pTooMany("recover2|" + rk) || pTooMany("recoverip|" + ipKey)) return res.status(429).json({ ok: false, error: "Demasiados intentos. Espera unos minutos." });
    const answers = Array.isArray(body.answers) ? body.answers.map(pNormAnswer) : [];
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
    const allOk = a.secQ.every((q, i) => pPbkdf2Verify(answers[i], q.hash, q.salt));
    if (!allOk) return res.status(401).json({ ok: false, error: "Alguna respuesta no coincide." });
    const pw = pPbkdf2(newPassword);
    await aRef.set({ hash: pw.hash, salt: pw.salt, recoveredAt: Date.now() }, { merge: true });
    pAttReset("recover|" + rk); pAttReset("recover2|" + rk);
    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ ok: false, error: "Acción no válida." });
}

// Acciones del ADMIN sobre el portal (con el clinicId ya resuelto por el flujo autenticado).
async function portalAdmin(res, action, body, db, clinicId, callerUid, caller, SECRET) {
  const patients = (await pReadKv(db, clinicId, "patients")) || [];
  const pat = patients.find(p => p.id === body.patientId);
  if (!pat) return res.status(404).json({ ok: false, error: "Paciente no encontrado." });
  const rk = pRutKey(pat.rut);

  if (action === "portal-status") {
    if (!rk) return res.status(200).json({ ok: true, status: "no_rut" });
    const aDoc = await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).get();
    const a = aDoc.exists ? aDoc.data() : null;
    if (!a || !a.authorized) return res.status(200).json({ ok: true, status: "inactive" });
    return res.status(200).json({ ok: true, status: a.status || "pending", activatedAt: a.activatedAt || null });
  }

  if (action === "portal-revoke") {
    if (!rk) return res.status(400).json({ ok: false, error: "El paciente no tiene RUT." });
    await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).set({ authorized: false, status: "revoked", revokedAt: Date.now(), revokedBy: callerUid }, { merge: true });
    return res.status(200).json({ ok: true, status: "revoked" });
  }

  // action === "portal-activate"
  if (!rk) return res.status(400).json({ ok: false, error: "El paciente no tiene RUT registrado. Agrégalo en su ficha antes de activar el portal." });
  const phone = pWaPhone(pat.phone);
  await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).set({
    clinicId, patientId: pat.id, name: pat.name || "", authorized: true, status: "pending",
    activatedBy: callerUid, activatedAt: Date.now()
  }, { merge: true });
  await db.collection("portalIndex").doc(rk).set({ clinicId });
  const exp = Date.now() + 48 * 60 * 60 * 1000;
  const token = pSignToken(SECRET, { clinicId, rutKey: rk, patientId: pat.id, typ: "activate", exp });
  const link = PORTAL_BASE + "/?activar=" + encodeURIComponent(token);
  const clinicName = (caller && caller.clinicName) || "tu clínica";
  const msg = "Hola " + ((pat.name || "").split(" ")[0] || "") + ", activaste el acceso a tu ficha en " + clinicName +
    ". Crea tu clave aquí (el enlace vence en 48 h): " + link;
  const sent = phone ? await pSendWhats(phone, msg) : false;
  return res.status(200).json({ ok: true, sent, link, phone: phone ? ("+" + phone) : null, status: "pending" });
}

// ── Pagos online (fusionado desde pay-link para no exceder el límite de funciones de Vercel) ──
// Genera un link de cobro con la pasarela de la clínica. Credenciales SOLO en el servidor.
//   Mercado Pago: MP_ACCESS_TOKEN   ·   Flow: FLOW_API_KEY + FLOW_SECRET (+ FLOW_BASE opcional)
async function mercadoPago(amount, desc, back) {
  const tok = process.env.MP_ACCESS_TOKEN;
  if (!tok) return { ok: false, configured: false, error: "Falta MP_ACCESS_TOKEN en el servidor." };
  const r = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tok },
    body: JSON.stringify({ items: [{ title: desc || "Atención", quantity: 1, unit_price: amount, currency_id: "CLP" }], back_urls: { success: back, pending: back, failure: back }, auto_return: "approved" })
  });
  const d = await r.json();
  if (!r.ok || !(d.init_point || d.sandbox_init_point)) return { ok: false, error: (d.message || "Mercado Pago rechazó la solicitud.") };
  return { ok: true, url: d.init_point || d.sandbox_init_point, id: d.id };
}
async function flow(amount, desc, back) {
  const apiKey = process.env.FLOW_API_KEY, secret = process.env.FLOW_SECRET;
  if (!apiKey || !secret) return { ok: false, configured: false, error: "Faltan FLOW_API_KEY / FLOW_SECRET en el servidor." };
  const base = process.env.FLOW_BASE || "https://www.flow.cl/api";
  const params = { apiKey, commerceOrder: "MQ" + Date.now(), subject: (desc || "Atención").slice(0, 80), currency: "CLP", amount: Math.round(amount), email: "pagos@medique.cl", urlConfirmation: back, urlReturn: back };
  const toSign = Object.keys(params).sort().map(k => k + params[k]).join("");
  const s = crypto.createHmac("sha256", secret).update(toSign).digest("hex");
  const body = new URLSearchParams({ ...params, s }).toString();
  const r = await fetch(base + "/payment/create", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  const d = await r.json();
  if (!r.ok || !d.url || !d.token) return { ok: false, error: (d.message || "Flow rechazó la solicitud.") };
  return { ok: true, url: d.url + "?token=" + d.token };
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const safeOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", safeOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  // ── PORTAL DEL PACIENTE · acciones PÚBLICAS (sin token de Firebase; el paciente se identifica por
  //    RUT / token propio). Se atienden ANTES de la verificación del ID token para no exigirlo. ──
  const _action = (req.body && typeof req.body === "object") ? req.body.action : undefined;
  const PORTAL_PUBLIC = ["portal-verify-token", "portal-register", "portal-login", "portal-me", "portal-recover-start", "portal-recover-verify"];
  if (PORTAL_PUBLIC.indexOf(_action) >= 0) {
    const SECRET = process.env.PORTAL_SECRET;
    if (!SECRET) return res.status(503).json({ ok: false, configured: false, error: "El portal del paciente no está configurado (falta PORTAL_SECRET)." });
    try {
      const { db } = await getAdmin();
      return await portalPublic(req, res, _action, req.body || {}, db, SECRET);
    } catch (e) { console.error("[portal-public]", (e && e.message) || e); return res.status(500).json({ ok: false, error: "No se pudo procesar la solicitud." }); }
  }

  try {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!token) return res.status(401).json({ ok: false, error: "Sin sesión." });
    const payload = await verifyToken(token);
    const callerUid = payload.sub;

    const preBody = req.body && typeof req.body === "object" ? req.body : {};

    // ── Generar link de pago (cualquier usuario del panel; no requiere Admin SDK) ──
    if (preBody.action === "pay-link") {
      const provider = ("" + (preBody.provider || "")).toLowerCase();
      const amount = Math.round(parseFloat(preBody.amount) || 0);
      const desc = ("" + (preBody.desc || "Atención")).slice(0, 120);
      if (amount < 100) return res.status(400).json({ ok: false, error: "Monto inválido." });
      let pr;
      if (provider.indexOf("mercado") >= 0) pr = await mercadoPago(amount, desc, safeOrigin);
      else if (provider.indexOf("flow") >= 0) pr = await flow(amount, desc, safeOrigin);
      else return res.status(400).json({ ok: false, error: "Proveedor no soportado aún. Usa Mercado Pago o Flow." });
      return res.status(pr.ok ? 200 : 502).json(pr);
    }

    const { auth, db } = await getAdmin();

    // El llamante debe ser DUEÑO de una clínica.
    const callerDoc = await db.collection("users").doc(callerUid).get();
    const caller = callerDoc.exists ? callerDoc.data() : null;
    if (!caller || !caller.clinicId) return res.status(403).json({ ok: false, error: "Tu cuenta no está asociada a una clínica." });
    if ((caller.role || "owner") === "professional") return res.status(403).json({ ok: false, error: "Solo el dueño de la clínica puede gestionar accesos." });
    const clinicId = caller.clinicId;

    const body = req.body || {};
    const action = body.action;

    // ── PORTAL DEL PACIENTE · acciones del ADMIN (con el clinicId ya resuelto arriba) ──
    if (action === "portal-activate" || action === "portal-revoke" || action === "portal-status") {
      const SECRET = process.env.PORTAL_SECRET;
      if (!SECRET) return res.status(503).json({ ok: false, configured: false, error: "El portal del paciente no está configurado (falta PORTAL_SECRET)." });
      return await portalAdmin(res, action, body, db, clinicId, callerUid, caller, SECRET);
    }

    // ── Crear cuenta de acceso para un profesional ──
    if (action === "create") {
      const email = (body.email || "").toString().trim().toLowerCase();
      const password = (body.password || "").toString();
      const name = (body.name || "").toString().trim().slice(0, 80);
      const perms = (body.perms && typeof body.perms === "object") ? body.perms : {};
      if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Correo inválido." });
      if (password.length < 6) return res.status(400).json({ ok: false, error: "La clave debe tener al menos 6 caracteres." });

      // ¿Ya existe ese correo en Auth?
      let existing = null;
      try { existing = await auth.getUserByEmail(email); } catch (e) { existing = null; }
      if (existing) {
        // Si ya tiene cuenta y pertenece a OTRA clínica, no la tocamos.
        const exDoc = await db.collection("users").doc(existing.uid).get();
        const ex = exDoc.exists ? exDoc.data() : null;
        if (ex && ex.clinicId && ex.clinicId !== clinicId) {
          return res.status(409).json({ ok: false, error: "Ese correo ya tiene una cuenta en otra clínica." });
        }
        // Mismo clínica (o sin doc): actualiza clave + perms y lo deja como profesional.
        await auth.updateUser(existing.uid, { password: password });
        await db.collection("users").doc(existing.uid).set({ clinicId, role: "professional", perms, name, createdBy: callerUid, updatedAt: Date.now() }, { merge: true });
        return res.status(200).json({ ok: true, uid: existing.uid, email, updated: true });
      }

      const userRecord = await auth.createUser({ email, password, displayName: name || undefined });
      await db.collection("users").doc(userRecord.uid).set({ clinicId, role: "professional", perms, name, createdBy: callerUid, createdAt: Date.now() });
      return res.status(200).json({ ok: true, uid: userRecord.uid, email });
    }

    // ── Revocar acceso de un profesional ──
    if (action === "revoke") {
      const uid = (body.uid || "").toString();
      if (!uid) return res.status(400).json({ ok: false, error: "Falta el identificador del usuario." });
      // Solo se puede revocar a alguien de TU misma clínica y que sea profesional (no a otro dueño).
      const tDoc = await db.collection("users").doc(uid).get();
      const t = tDoc.exists ? tDoc.data() : null;
      if (!t || t.clinicId !== clinicId) return res.status(403).json({ ok: false, error: "No puedes revocar este usuario." });
      if ((t.role || "") !== "professional") return res.status(403).json({ ok: false, error: "Solo se pueden revocar cuentas de profesional." });
      await auth.deleteUser(uid).catch(() => {});
      await db.collection("users").doc(uid).delete().catch(() => {});
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ ok: false, error: "Acción desconocida." });
  } catch (e) {
    console.error("[team-access]", e.message || e);
    const msg = e.message || "";
    const friendly = /email-already-exists/i.test(msg) ? "Ese correo ya está en uso."
      : /invalid-email/i.test(msg) ? "El correo no es válido."
      : /weak-password|password/i.test(msg) ? "La clave es muy débil (mínimo 6 caracteres)."
      : "No se pudo procesar la solicitud.";
    return res.status(500).json({ ok: false, error: friendly });
  }
}
