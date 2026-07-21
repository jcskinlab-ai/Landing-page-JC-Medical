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
// SEG · Rate-limit PERSISTENTE (Firestore). El Map de arriba vive en memoria: se reinicia en cada
// cold start y es por-instancia, así que en Vercel se evadía lanzando peticiones en paralelo. Con
// eso, forzar por fuerza bruta las 3 respuestas de seguridad (entropía baja: mascota, ciudad natal)
// era viable y daba acceso al historial clínico del paciente. Este contador es común a todas las
// instancias y sobrevive a los cold starts. Se usa ADEMÁS del de memoria, no en su lugar.
function pThrottleRef(db, key) {
  return db.collection("portalThrottle").doc(String(key).replace(/[^\w|.-]/g, "_").slice(0, 400));
}
async function pTooManyDb(db, key) {
  try {
    return await db.runTransaction(async (tx) => {
      const ref = pThrottleRef(db, key);
      const snap = await tx.get(ref);
      const now = Date.now();
      const d = snap.exists ? snap.data() : null;
      const fresh = !d || (now - (d.ts || 0)) > 900000; // ventana de 15 min
      const count = (fresh ? 0 : (d.count || 0)) + 1;
      tx.set(ref, { ts: fresh ? now : (d.ts || now), count, at: now });
      return count > 6;
    });
  } catch (e) {
    // Si Firestore falla no bloqueamos al paciente legítimo: queda el contador en memoria.
    console.error("[portal] throttle", e.message || e);
    return false;
  }
}
async function pAttResetDb(db, key) { try { await pThrottleRef(db, key).delete(); } catch (e) {} }
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
// Campos que el paciente puede ver de cada procedimiento: profesional que lo realizó, lote del
// producto, vencimiento, temperatura, el resumen de la aplicación y las recomendaciones del
// profesional. NO se envían unidades/dosis, dilución, cobro ni notas internas.
function pSafeHistory(history) {
  return (Array.isArray(history) ? history : []).map(h => ({
    date: h.date || "", proc: h.proc || "", proName: h.proName || "",
    lote: h.lote || "", venc: h.venc || "", temp: h.temp || "",
    resumen: h.resumen || "", recomendados: h.recomendados || ""
  })).filter(h => h.proc);
}

/* ══════════ PURE-DENTAL-START · Portal dental (Fase G) ══════════
   Funciones PURAS (sin Firestore, sin req/res) para que se puedan probar en un harness.
   Todo lo que sale hacia el paciente pasa por una ALLOWLIST explícita, igual que pSafeHistory:
   se construye un objeto nuevo campo por campo, NUNCA se borran campos de uno existente. El
   `precio` del plano es interno (es lo que la clínica cobra, y el plano trae además abonos,
   aprobación y notas) y no debe salir jamás por aquí. */

// Mismo orden clínico que jc-dental.jsx: dolor/infección → funcional → estético.
const P_PLAN_PESO = { alta: 0, media: 1, baja: 2 };
function pPlanPrio(v) {
  const k = String(v == null ? "" : v).toLowerCase();
  return Object.prototype.hasOwnProperty.call(P_PLAN_PESO, k) ? k : "media";
}

// Tratamientos PENDIENTES del plano, ordenados por urgencia. Solo {proc, prioridad, estado}.
// Los `estado === "hecho"` se excluyen (ya no son una decisión pendiente del paciente).
export function pSafePlanItems(presupuesto) {
  const items = (presupuesto && Array.isArray(presupuesto.items)) ? presupuesto.items : [];
  return items
    .map((it, i) => ({ it, i }))
    .filter(x => x.it && typeof x.it === "object" && String(x.it.estado || "pendiente") !== "hecho" && String(x.it.proc || "").trim())
    .sort((a, b) => {
      const d = P_PLAN_PESO[pPlanPrio(a.it.prioridad)] - P_PLAN_PESO[pPlanPrio(b.it.prioridad)];
      return d !== 0 ? d : a.i - b.i; // estable dentro de cada prioridad
    })
    .map(x => ({
      proc: String(x.it.proc || "").trim().slice(0, 120),
      prioridad: pPlanPrio(x.it.prioridad),
      estado: String(x.it.estado || "pendiente") === "encurso" ? "encurso" : "pendiente"
    }));
}

// Procedimientos que cuentan como profilaxis/limpieza en el historial.
const P_LIMPIEZA_RE = /limpieza|profilaxis|destartraje|tartrectom|higiene\s+(oral|bucal|dental)/i;
function pIsoValid(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ""));
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  if (mo < 1 || mo > 12 || d < 1) return null;
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return { y, mo, d };
}
// Suma meses a una fecha ISO recortando al último día del mes destino (31-ago +6 → 28/29-feb).
export function pAddMonthsISO(iso, n) {
  const v = pIsoValid(iso);
  if (!v) return null;
  const t = (v.mo - 1) + n;
  const ny = v.y + Math.floor(t / 12);
  const nmo = ((t % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(ny, nmo + 1, 0)).getUTCDate();
  const nd = Math.min(v.d, lastDay);
  return ny + "-" + String(nmo + 1).padStart(2, "0") + "-" + String(nd).padStart(2, "0");
}
// Recordatorio de profilaxis: +6 meses desde la ÚLTIMA limpieza registrada en el historial.
// Si no hay ninguna limpieza (o no tiene fecha ISO usable) devuelve null: NO se inventan fechas.
export function pNextProfilaxis(history) {
  const hs = Array.isArray(history) ? history : [];
  let last = "";
  for (const h of hs) {
    if (!h || typeof h !== "object") continue;
    if (!P_LIMPIEZA_RE.test(String(h.proc || ""))) continue;
    const iso = String(h.date || "");
    if (!pIsoValid(iso)) continue;
    if (iso > last) last = iso;
  }
  if (!last) return null;
  const proxima = pAddMonthsISO(last, 6);
  return proxima ? { ultima: last, proxima } : null;
}

// Bloque dental que se agrega al payload de portal-me. SOLO se llama si la clínica es dental.
export function pDentalExtras(patient, history) {
  const pendientes = pSafePlanItems(patient && patient.presupuesto);
  return {
    dental: true,
    pendientes,
    nextStep: pendientes[0] || null, // ya viene ordenado: alta → media → baja
    profilaxis: pNextProfilaxis(history)
  };
}
// La vertical vive en el config de la clínica (config.vertical === "dental").
export function pIsDental(cfg) {
  return !!cfg && String(cfg.vertical || "").toLowerCase() === "dental";
}
/* ══════════ PURE-DENTAL-END ══════════ */

// Acciones PÚBLICAS del portal (sin Firebase; identidad por RUT / token propio).
async function portalPublic(req, res, action, body, db, SECRET) {
  // SEG · La IP real la agrega el proxy al FINAL de X-Forwarded-For; la PRIMERA entrada la controla
  // el cliente, así que tomarla dejaba el tope por IP totalmente evadible (una IP distinta por
  // request). Vercel expone la real en x-real-ip; si falta, se usa la ÚLTIMA entrada del XFF.
  const _xff = (req.headers["x-forwarded-for"] || "").toString().split(",").map(s => s.trim()).filter(Boolean);
  const ipKey = ((req.headers["x-real-ip"] || "").toString().trim()) || _xff[_xff.length - 1] || "ip";

  if (action === "portal-verify-token") {
    const p = pReadToken(SECRET, body.token);
    if (!p || p.typ !== "activate") return res.status(400).json({ ok: false, error: "El enlace no es válido o venció. Pídele a la clínica que lo reenvíe." });
    const aDoc = await db.collection("tenants").doc(p.clinicId).collection("portalauth").doc(p.rutKey).get();
    const a = aDoc.exists ? aDoc.data() : null;
    if (!a || !a.authorized) return res.status(403).json({ ok: false, error: "El acceso no está autorizado por la clínica." });
    // SEG · un solo uso: el enlace deja de servir apenas se consume (ver portal-register).
    if (!a.activateJti || p.jti !== a.activateJti) return res.status(400).json({ ok: false, error: "Este enlace ya se usó o venció. Pídele a la clínica que lo reenvíe." });
    return res.status(200).json({ ok: true, name: a.name || "", alreadySet: a.status === "active" });
  }

  if (action === "portal-register") {
    const p = pReadToken(SECRET, body.token);
    if (!p || p.typ !== "activate") return res.status(400).json({ ok: false, error: "El enlace no es válido o venció." });
    const aRef = db.collection("tenants").doc(p.clinicId).collection("portalauth").doc(p.rutKey);
    const aDoc = await aRef.get();
    const a = aDoc.exists ? aDoc.data() : null;
    if (!a || !a.authorized) return res.status(403).json({ ok: false, error: "El acceso no está autorizado por la clínica." });
    // SEG · UN SOLO USO. El comentario original decía "link de un solo uso" pero nada lo hacía
    // cumplir: el token seguía sirviendo sus 48 h completas aunque el paciente ya lo hubiera usado,
    // así que cualquiera con el enlace (WhatsApp reenviado, teléfono prestado, captura, historial)
    // podía redefinir clave y preguntas y quedarse con la cuenta. Ahora el jti del token tiene que
    // coincidir con el guardado, y se invalida al consumirlo.
    if (!a.activateJti || p.jti !== a.activateJti) return res.status(400).json({ ok: false, error: "Este enlace ya se usó o venció. Pídele a la clínica que lo reenvíe." });
    const password = String(body.password || "");
    if (password.length < 6) return res.status(400).json({ ok: false, error: "La clave debe tener al menos 6 caracteres." });
    const questions = Array.isArray(body.questions) ? body.questions.map(q => String(q || "").trim().slice(0, 160)) : [];
    const answers = Array.isArray(body.answers) ? body.answers.map(pNormAnswer) : [];
    if (questions.length !== 3 || answers.length !== 3 || questions.some(q => !q) || answers.some(a2 => a2.length < 2))
      return res.status(400).json({ ok: false, error: "Define las 3 preguntas de seguridad con sus respuestas." });
    const pw = pPbkdf2(password);
    const secQ = questions.map((q, i) => { const h = pPbkdf2(answers[i]); return { q, hash: h.hash, salt: h.salt }; });
    // activateJti a null = enlace consumido. tokenVer sube para invalidar sesiones anteriores.
    await aRef.set({ hash: pw.hash, salt: pw.salt, secQ, status: "active", registeredAt: Date.now(), activateJti: null, tokenVer: (a.tokenVer || 0) + 1 }, { merge: true });
    return res.status(200).json({ ok: true });
  }

  if (action === "portal-login") {
    const rk = pRutKey(body.rut);
    const genericErr = { ok: false, error: "RUT o clave incorrectos." };
    if (!rk) return res.status(400).json(genericErr);
    if (pTooMany("login|" + rk) || pTooMany("loginip|" + ipKey) || await pTooManyDb(db, "login|" + rk)) return res.status(429).json({ ok: false, error: "Demasiados intentos. Espera unos minutos." });
    const idxDoc = await db.collection("portalIndex").doc(rk).get();
    const clinicId = idxDoc.exists ? idxDoc.data().clinicId : null;
    if (!clinicId) return res.status(401).json(genericErr);
    const aDoc = await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).get();
    const a = aDoc.exists ? aDoc.data() : null;
    if (!a || !a.authorized || a.status !== "active" || !a.hash) return res.status(401).json(genericErr);
    if (!pPbkdf2Verify(body.password, a.hash, a.salt)) return res.status(401).json(genericErr);
    pAttReset("login|" + rk); await pAttResetDb(db, "login|" + rk);
    // `ver` permite invalidar sesiones vivas: si la clínica revoca el acceso (o el paciente cambia
    // la clave), tokenVer sube y los tokens emitidos antes dejan de validar en portal-me.
    const token = pSignToken(SECRET, { clinicId, patientId: a.patientId, rutKey: rk, typ: "sess", ver: (a.tokenVer || 0), exp: Date.now() + 24 * 60 * 60 * 1000 });
    return res.status(200).json({ ok: true, token, name: a.name || "" });
  }

  if (action === "portal-me") {
    const p = pReadToken(SECRET, body.token);
    if (!p || p.typ !== "sess") return res.status(401).json({ ok: false, error: "Sesión expirada. Inicia sesión de nuevo." });
    // SEG · Revalidar contra portalauth en CADA lectura. Antes solo se comprobaba la firma y el exp
    // del token, así que `portal-revoke` no surtía efecto hasta 24 h después: la clínica creía haber
    // cortado el acceso y el token seguía entregando la ficha clínica completa.
    const sAuthDoc = await db.collection("tenants").doc(p.clinicId).collection("portalauth").doc(p.rutKey).get();
    const sAuth = sAuthDoc.exists ? sAuthDoc.data() : null;
    if (!sAuth || !sAuth.authorized || sAuth.status !== "active" || (sAuth.tokenVer || 0) !== (p.ver || 0))
      return res.status(401).json({ ok: false, error: "Sesión expirada. Inicia sesión de nuevo." });
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
    let clinicName = "", clinicWhats = "", clinicCfg = null;
    try { const pub = await db.collection("tenants").doc(p.clinicId).collection("public").doc("profile").get(); if (pub.exists) { clinicName = (pub.data().clinic_name || pub.data().name || ""); clinicWhats = String(pub.data().wa_number || pub.data().whatsapp || "").replace(/\D/g, ""); } } catch (e) {}
    // El número de WhatsApp de la clínica vive en su config (privada); el servidor sí puede leerla.
    // De ahí sale también la vertical (config.vertical): en el servidor no existe window.isDental().
    try { const cfg = await pReadKv(db, p.clinicId, "config"); if (cfg) { clinicCfg = cfg; if (!clinicName) clinicName = cfg.clinic_name || ""; if (!clinicWhats) clinicWhats = String(cfg.wa_number || cfg.whatsapp || "").replace(/\D/g, ""); } } catch (e) {}
    const out = { ok: true, name: pat.name || "", clinicName, clinicWhats, history: pSafeHistory(hist), nextAppt };
    // Extras dentales (plano de tratamiento + profilaxis). En una clínica ESTÉTICA no se agrega
    // ninguna clave: el payload queda byte a byte igual que antes de la Fase G.
    if (pIsDental(clinicCfg)) Object.assign(out, pDentalExtras(pat, hist));
    return res.status(200).json(out);
  }

  if (action === "portal-recover-start") {
    const rk = pRutKey(body.rut);
    if (!rk || pTooMany("recover|" + rk) || pTooMany("recoverip|" + ipKey) || await pTooManyDb(db, "recover|" + rk)) return res.status(429).json({ ok: false, error: "Demasiados intentos. Espera unos minutos." });
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
    if (!rk || pTooMany("recover2|" + rk) || pTooMany("recoverip|" + ipKey) || await pTooManyDb(db, "recover2|" + rk)) return res.status(429).json({ ok: false, error: "Demasiados intentos. Espera unos minutos." });
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
    // tokenVer sube: un cambio de clave invalida las sesiones abiertas con la clave anterior.
    await aRef.set({ hash: pw.hash, salt: pw.salt, recoveredAt: Date.now(), tokenVer: (a.tokenVer || 0) + 1 }, { merge: true });
    pAttReset("recover|" + rk); pAttReset("recover2|" + rk);
    await pAttResetDb(db, "recover|" + rk); await pAttResetDb(db, "recover2|" + rk);
    // SEG · Avisar al WhatsApp registrado. La recuperación es puramente knowledge-based (RUT + 3
    // respuestas adivinables), así que este aviso es la red de seguridad: si no fue el paciente,
    // se entera y puede pedirle a la clínica que revoque. No reemplaza a un 2º factor real.
    try {
      const pats = (await pReadKv(db, clinicId, "patients")) || [];
      const pat2 = pats.find(x => x.id === a.patientId);
      const ph2 = pWaPhone(pat2 && pat2.phone);
      if (ph2) await pSendWhats(ph2, "Se acaba de cambiar la clave de tu portal de paciente. Si no fuiste tú, avísale a tu clínica de inmediato.");
    } catch (e) {}
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
    const rRef = db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk);
    const rDoc = await rRef.get();
    const rPrev = rDoc.exists ? rDoc.data() : null;
    // SEG · tokenVer sube e invalida las sesiones ya emitidas (portal-me lo comprueba). Antes la
    // revocación no cortaba nada: el token vivía sus 24 h y seguía entregando la ficha.
    // activateJti a null: un enlace de activación pendiente tampoco debe seguir sirviendo.
    await rRef.set({ authorized: false, status: "revoked", revokedAt: Date.now(), revokedBy: callerUid, activateJti: null, tokenVer: ((rPrev && rPrev.tokenVer) || 0) + 1 }, { merge: true });
    return res.status(200).json({ ok: true, status: "revoked" });
  }

  // action === "portal-activate"
  if (!rk) return res.status(400).json({ ok: false, error: "El paciente no tiene RUT registrado. Agrégalo en su ficha antes de activar el portal." });
  const phone = pWaPhone(pat.phone);
  // SEG · portalIndex es un índice GLOBAL de RUT → clínica. Antes se sobrescribía sin mirar, así
  // que si otra clínica activaba el portal para el mismo RUT (paciente atendido en dos clínicas
  // Medique, o a propósito), el paciente original quedaba fuera de su portal. Ahora no se pisa una
  // activación vigente ajena: la clínica anterior debe revocar primero.
  const idxRef = db.collection("portalIndex").doc(rk);
  const idxPrev = await idxRef.get();
  const prevClinic = idxPrev.exists ? (idxPrev.data() || {}).clinicId : null;
  if (prevClinic && prevClinic !== clinicId) {
    const oDoc = await db.collection("tenants").doc(prevClinic).collection("portalauth").doc(rk).get();
    const o = oDoc.exists ? oDoc.data() : null;
    if (o && o.authorized) return res.status(409).json({ ok: false, error: "Ese RUT ya tiene un portal activo en otra clínica. Debe revocarlo allí antes de activarlo aquí." });
  }
  // jti: nonce que hace el enlace de activación de un solo uso (ver portal-register).
  const jti = crypto.randomBytes(16).toString("hex");
  await db.collection("tenants").doc(clinicId).collection("portalauth").doc(rk).set({
    clinicId, patientId: pat.id, name: pat.name || "", authorized: true, status: "pending",
    activatedBy: callerUid, activatedAt: Date.now(), activateJti: jti
  }, { merge: true });
  await idxRef.set({ clinicId });
  const exp = Date.now() + 48 * 60 * 60 * 1000;
  const token = pSignToken(SECRET, { clinicId, rutKey: rk, patientId: pat.id, typ: "activate", jti, exp });
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

    // SEG · "pay-link" estaba AQUÍ, antes de resolver la clínica: bastaba cualquier cuenta del
    // proyecto para generar links de cobro ilimitados contra las credenciales de pasarela de la
    // PLATAFORMA. Se movió más abajo, después de exigir clínica con plan vigente.

    const { auth, db } = await getAdmin();

    // El llamante debe ser DUEÑO de una clínica.
    const callerDoc = await db.collection("users").doc(callerUid).get();
    const caller = callerDoc.exists ? callerDoc.data() : null;
    if (!caller || !caller.clinicId) return res.status(403).json({ ok: false, error: "Tu cuenta no está asociada a una clínica." });
    const clinicId = caller.clinicId;

    // ── Generar link de pago ──
    // Va DESPUÉS de resolver la clínica: exige pertenecer a una con plan vigente. No exige ser
    // dueño (recepción también cobra), pero ya no lo puede llamar cualquier cuenta del proyecto.
    if (preBody.action === "pay-link") {
      const cDoc0 = await db.collection("clinics").doc(clinicId).get();
      const plan0 = cDoc0.exists ? ((cDoc0.data() || {}).plan || "") : "";
      if (["active", "comp", "trial"].indexOf(plan0) < 0) return res.status(403).json({ ok: false, error: "Tu clínica no tiene un plan vigente." });
      const provider = ("" + (preBody.provider || "")).toLowerCase();
      const amount = Math.round(parseFloat(preBody.amount) || 0);
      const desc = ("" + (preBody.desc || "Atención")).slice(0, 120);
      if (amount < 100) return res.status(400).json({ ok: false, error: "Monto inválido." });
      if (amount > 20000000) return res.status(400).json({ ok: false, error: "Monto fuera de rango." });
      let pr;
      if (provider.indexOf("mercado") >= 0) pr = await mercadoPago(amount, desc, safeOrigin);
      else if (provider.indexOf("flow") >= 0) pr = await flow(amount, desc, safeOrigin);
      else return res.status(400).json({ ok: false, error: "Proveedor no soportado aún. Usa Mercado Pago o Flow." });
      return res.status(pr.ok ? 200 : 502).json(pr);
    }

    // SEG · La autorización NO puede depender de users/{uid}.role: ese doc lo escribe el PROPIO
    // usuario (firestore.rules permite el update de su mapeo), así que un profesional podía
    // ponerse role:'owner' — o borrar el campo, porque el fallback era "owner" — y pasar por aquí.
    // La fuente de verdad es clinics/{clinicId}.ownerUid, que las reglas congelan en el update.
    const clinicDoc = await db.collection("clinics").doc(clinicId).get();
    const ownerUid = clinicDoc.exists ? ((clinicDoc.data() || {}).ownerUid || "") : "";
    if (ownerUid) {
      if (ownerUid !== callerUid) return res.status(403).json({ ok: false, error: "Solo el dueño de la clínica puede gestionar accesos." });
    } else {
      // Clínicas antiguas sin ownerUid: se cae al chequeo por rol (débil, pero mitigado porque las
      // reglas ya congelan role/perms). Rama a ELIMINAR cuando se rellene ownerUid en todas.
      if ((caller.role || "owner") === "professional") return res.status(403).json({ ok: false, error: "Solo el dueño de la clínica puede gestionar accesos." });
    }

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
        // SEG · FAIL-CLOSED. Antes el guard era `if (ex && ex.clinicId && ex.clinicId !== clinicId)`:
        // una cuenta SIN doc users/{uid} — o con doc sin clinicId — no lo activaba y caía al camino
        // de abajo, que le REESCRIBE la contraseña. Las cuentas super-admin no pertenecen a ninguna
        // clínica, así que cualquier dueño podía apropiarse de la cuenta maestra del SaaS enviando
        // su correo. Ahora solo se toca una cuenta que YA es demostrablemente de esta clínica.
        const exDoc = await db.collection("users").doc(existing.uid).get();
        const ex = exDoc.exists ? exDoc.data() : null;
        if (!ex || ex.clinicId !== clinicId) {
          return res.status(409).json({ ok: false, error: "Ese correo ya tiene una cuenta y no pertenece a tu clínica." });
        }
        // Nunca por esta vía: la cuenta del dueño (evita que un miembro le cambie la clave y lo
        // degrade) ni una cuenta con privilegios de plataforma.
        if (ownerUid && existing.uid === ownerUid) {
          return res.status(409).json({ ok: false, error: "La cuenta del dueño no se gestiona desde aquí." });
        }
        if (existing.customClaims && existing.customClaims.superAdmin === true) {
          return res.status(409).json({ ok: false, error: "Esa cuenta no se puede gestionar desde aquí." });
        }
        // Miembro de esta clínica: actualiza clave + perms y lo deja como profesional.
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
