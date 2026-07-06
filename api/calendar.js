// Medique · Calendario suscribible (Vercel Serverless Function)
// Expone las citas de una clínica como un feed .ics que Google/Apple/Outlook Calendar puede
// SUSCRIBIR por URL (se actualiza solo, sin descargar nada). Lectura server-side de Firestore.
//
// FLUJO:
//   1) El panel (autenticado) hace POST { clinicId } → devuelve la URL de suscripción (con token HMAC).
//   2) El usuario la pega en Google Calendar → "Otros calendarios → Suscribirse desde URL".
//   3) Google hace GET ?c=<clinicId>&token=<hmac> cada varias horas → este endpoint devuelve el .ics.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   FIREBASE_SERVICE_ACCOUNT = JSON de la cuenta de servicio de Firebase (la genera el dueño en
//                              Firebase Console → Configuración del proyecto → Cuentas de servicio →
//                              Generar nueva clave privada). Necesaria para leer las citas server-side.
//   FIREBASE_PROJECT_ID      = (opcional) por defecto "medique-8dbf6".
//
// Hasta que FIREBASE_SERVICE_ACCOUNT exista, el endpoint responde "no configurado" sin romper.

import crypto from "node:crypto";

const ALLOWED_ORIGINS = ['https://medique.cl', 'https://www.medique.cl', 'https://portal.medique.cl', 'https://admin.medique.cl', 'https://jcmedical.cl', 'https://www.jcmedical.cl'];
const CERTS_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

// ── Cuenta de servicio (clave para leer Firestore protegido) ──
function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.GOOGLE_SERVICE_ACCOUNT || "";
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) { return null; }
}

function b64url(buf) { return Buffer.from(buf).toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function b64urlToBuf(s) { s = String(s).replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return Buffer.from(s, 'base64'); }

// HMAC del clinicId con una clave derivada de la cuenta de servicio (token de suscripción inadivinable).
function calToken(sa, clinicId) {
  const key = crypto.createHash("sha256").update(sa.private_key).digest();
  return crypto.createHmac("sha256", key).update(String(clinicId)).digest("hex").slice(0, 32);
}

// ── Verificación del ID token de Firebase (para el POST que genera el link, solo usuarios logueados) ──
let _certCache = { at: 0, certs: null };
async function googleCerts() {
  const now = Date.now();
  if (_certCache.certs && (now - _certCache.at) < 3600000) return _certCache.certs;
  const r = await fetch(CERTS_URL);
  const certs = await r.json();
  _certCache = { at: now, certs };
  return certs;
}
async function verifyFirebaseToken(token, projectId) {
  if (!token) throw new Error('sin token');
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('token mal formado');
  const header = JSON.parse(b64urlToBuf(parts[0]).toString('utf8'));
  if (header.alg !== 'RS256' || !header.kid) throw new Error('alg/kid inválido');
  const certs = await googleCerts();
  const certPem = certs[header.kid];
  if (!certPem) throw new Error('kid desconocido');
  const pub = new crypto.X509Certificate(certPem).publicKey;
  const ok = crypto.createVerify('RSA-SHA256').update(parts[0] + '.' + parts[1]).verify(pub, b64urlToBuf(parts[2]));
  if (!ok) throw new Error('firma inválida');
  const p = JSON.parse(b64urlToBuf(parts[1]).toString('utf8'));
  const now = Math.floor(Date.now() / 1000);
  if (!p.exp || p.exp <= now) throw new Error('token expirado');
  if (p.aud !== projectId) throw new Error('aud inválido');
  if (p.iss !== 'https://securetoken.google.com/' + projectId) throw new Error('iss inválido');
  if (!p.sub) throw new Error('sub vacío');
  return p;
}

// ── Access token de la cuenta de servicio (JWT → OAuth2) para leer Firestore ──
async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email, scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600
  }));
  const signer = crypto.createSign("RSA-SHA256"); signer.update(header + "." + claim);
  const assertion = header + "." + claim + "." + b64url(signer.sign(sa.private_key));
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=" + encodeURIComponent(assertion)
  });
  const d = await r.json();
  if (!d.access_token) throw new Error("sin access_token");
  return d.access_token;
}

// Lee tenants/{cid}/kv/appointments (formato kv: fields.v.stringValue = JSON del arreglo).
async function readAppointments(sa, projectId, clinicId) {
  const token = await getAccessToken(sa);
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/tenants/${encodeURIComponent(clinicId)}/kv/appointments`;
  const r = await fetch(url, { headers: { Authorization: "Bearer " + token } });
  if (!r.ok) return [];
  const doc = await r.json();
  const v = doc && doc.fields && doc.fields.v && doc.fields.v.stringValue;
  if (!v) return [];
  try { return JSON.parse(v) || []; } catch (e) { return []; }
}

// Misma convención que ya usa el resto del código (mobile: consentPendingM, jc-data.js procMin):
// "evaluación" se identifica por texto libre en a.proc, no hay categoría estructurada en los datos.
const esEvaluacion = proc => /evaluaci/i.test(proc || "");

// Colores de cada categoría (RFC 7986 COLOR, nombres CSS extendidos por compatibilidad amplia).
// Apple Calendar (iOS 16+/macOS Ventura+) SÍ lee este color por evento; Google/Outlook lo ignoran
// y muestran un solo color por calendario suscrito (por eso además se separan en dos feeds/enlaces:
// así cada uno se puede colorear una vez, distinto, y funciona igual en Android que en iPhone).
const CAT_META = {
  procedimiento: { label: "Procedimientos", color: "steelblue" },
  evaluacion: { label: "Evaluaciones", color: "darkorange" }
};

// Genera el .ics (citas desde hace 30 días en adelante, excluye anuladas). Las horas van en UTC
// explícito (con "Z"): la hora del panel es hora de Chile (America/Santiago); la convertimos al
// instante UTC real (calculando el offset, incl. horario de verano) para que el calendario la
// muestre BIEN en cualquier zona. Antes iba sin zona → Google la tomaba como UTC y la corría ~4 h.
// `cat` (opcional): "procedimiento" | "evaluacion" — filtra y colorea; sin valor = todas (compat
// con links ya suscritos antes de que existiera la separación por categoría).
function buildICS(appts, clinicName, cat) {
  const TZ = "America/Santiago";
  const pad = n => ("0" + n).slice(-2);
  const esc = s => ("" + (s == null ? "" : s)).replace(/([\\;,])/g, "\\$1").replace(/\n/g, "\\n");
  // Minutos que la zona va respecto a UTC en ese instante (Chile: -240 o -180 en verano).
  function offMin(d) {
    const dtf = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const m = {}; dtf.formatToParts(d).forEach(p => { m[p.type] = p.value; });
    const asUTC = Date.UTC(+m.year, +m.month - 1, +m.day, +m.hour, +m.minute, +m.second);
    return (asUTC - d.getTime()) / 60000;
  }
  // Hora-pared (fecha YYYY-MM-DD, time HH:MM) en Chile → instante UTC en ms.
  function startMs(fecha, time) {
    const p = (fecha || "").split("-"); const t = (time || "09:00").split(":");
    const guess = Date.UTC(+p[0], (+p[1] || 1) - 1, (+p[2] || 1), parseInt(t[0] || 9, 10), parseInt(t[1] || 0, 10));
    if (isNaN(guess)) return NaN;
    return guess - offMin(new Date(guess)) * 60000;
  }
  const fmtZ = ms => { const d = new Date(ms); return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z"; };
  const desdeMs = Date.now() - 30 * 86400000;
  const stamp = fmtZ(Date.now());
  const meta = CAT_META[cat];
  const calName = "Reservas · " + (clinicName || "Medique") + (meta ? " — " + meta.label : "");
  let ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Medique//Agenda//ES\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n";
  ics += "X-WR-CALNAME:" + esc(calName) + "\r\nX-WR-TIMEZONE:" + TZ + "\r\n";
  if (meta) ics += "COLOR:" + meta.color + "\r\n"; // RFC 7986: color del calendario completo (Apple lo respeta al suscribir)
  (Array.isArray(appts) ? appts : []).forEach((a, i) => {
    if (!a || !a.fecha || a.status === "anulada") return; // una cita cancelada no debe aparecer en el celular
    if (cat === "procedimiento" && esEvaluacion(a.proc)) return;
    if (cat === "evaluacion" && !esEvaluacion(a.proc)) return;
    const s = startMs(a.fecha, a.time);
    if (isNaN(s) || s < desdeMs) return;
    const dur = parseInt(a.dur, 10) || a.durMin || 30;
    ics += "BEGIN:VEVENT\r\nUID:" + (a.id || ("apt" + i)) + "@medique.cl\r\nDTSTAMP:" + stamp +
      "\r\nDTSTART:" + fmtZ(s) + "\r\nDTEND:" + fmtZ(s + dur * 60000) +
      "\r\nSUMMARY:" + esc((a.proc || "Cita") + (a.name ? " · " + a.name : "")) +
      "\r\nDESCRIPTION:" + esc("Cita en " + (clinicName || "Medique") + (a.phone ? " · " + a.phone : "")) +
      (meta ? "\r\nCOLOR:" + meta.color : "") + // RFC 7986: color por evento (best-effort; Google/Outlook lo ignoran)
      "\r\nEND:VEVENT\r\n";
  });
  ics += "END:VCALENDAR\r\n";
  return ics;
}

export default async function handler(req, res) {
  const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'medique-8dbf6';
  const sa = getServiceAccount();

  // ── POST: el panel (autenticado) pide su URL de suscripción ──
  if (req.method === "POST") {
    const origin = req.headers.origin || '';
    const safeOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    res.setHeader("Access-Control-Allow-Origin", safeOrigin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const authz = req.headers['authorization'] || '';
    const idToken = authz.startsWith('Bearer ') ? authz.slice(7) : '';
    try { await verifyFirebaseToken(idToken, PROJECT_ID); }
    catch (e) { return res.status(401).json({ ok: false, error: "No autorizado: inicia sesión en el panel." }); }
    if (!sa) return res.status(503).json({ ok: false, configured: false, error: "Calendario no configurado aún: falta la clave de servicio de Firebase (FIREBASE_SERVICE_ACCOUNT)." });
    const body = req.body || {};
    const clinicId = (body.clinicId || "").toString().trim();
    if (!clinicId) return res.status(400).json({ ok: false, error: "Falta clinicId." });
    // Un link por categoría (procedimiento/evaluación): mismo token — no es secreto per-categoría,
    // "cat" solo filtra qué citas trae el feed. Cada uno se suscribe como un calendario aparte, así
    // se puede colorear distinto en Google/Apple/Outlook por igual (no es un truco solo de iPhone).
    const token = calToken(sa, clinicId);
    const base = "https://medique.cl/api/calendar?c=" + encodeURIComponent(clinicId) + "&token=" + token;
    const categorias = {};
    Object.keys(CAT_META).forEach(cat => {
      const httpsUrl = base + "&cat=" + cat;
      categorias[cat] = { label: CAT_META[cat].label, url: httpsUrl, webcal: httpsUrl.replace(/^https:/, "webcal:") };
    });
    return res.status(200).json({ ok: true, categorias });
  }

  // ── OPTIONS (preflight del POST) ──
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS[0]);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(204).end();
  }

  // ── GET: lo llama el calendario del usuario (Google/Apple/Outlook). Público + token HMAC. ──
  if (req.method !== "GET") return res.status(405).send("Método no permitido");
  if (!sa) { res.setHeader("Content-Type", "text/plain; charset=utf-8"); return res.status(503).send("Calendario no configurado todavía."); }
  const clinicId = (req.query.c || "").toString();
  const token = (req.query.token || "").toString();
  if (!clinicId || !token) return res.status(400).send("Faltan parámetros.");
  let expected;
  try { expected = calToken(sa, clinicId); } catch (e) { return res.status(500).send("Error de configuración."); }
  // Comparación en tiempo constante.
  const a = Buffer.from(token), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(403).send("Token inválido.");
  try {
    const appts = await readAppointments(sa, PROJECT_ID, clinicId);
    const clinicName = (req.query.n || "Medique").toString().slice(0, 80);
    const catRaw = (req.query.cat || "").toString();
    const cat = CAT_META[catRaw] ? catRaw : undefined; // valor desconocido o ausente = todas (compat con links viejos)
    const ics = buildICS(appts, clinicName, cat);
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Content-Disposition", 'inline; filename="medique.ics"');
    return res.status(200).send(ics);
  } catch (e) {
    console.error("Error generando calendario:", e);
    return res.status(502).send("No se pudo generar el calendario.");
  }
}
