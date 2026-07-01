// Medique · Acceso de profesionales (sub-cuentas por clínica) · Vercel Serverless Function
// Permite que el DUEÑO de una clínica cree/revoque cuentas de login para sus profesionales.
// Cada profesional inicia sesión con su propio correo; carga la MISMA clínica del dueño y el
// panel le aplica sus permisos (perms). Usa Firebase Admin SDK (el cliente no puede crear usuarios).
//
// Variables de entorno (Vercel):
//   FIREBASE_SERVICE_ACCOUNT_JSON  = JSON de la cuenta de servicio (el mismo de super-ops)
//   FIREBASE_PROJECT_ID            = (default 'medique-8dbf6')

import crypto from "node:crypto";

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "medique-8dbf6";
const ALLOWED_ORIGINS = ["https://medique.cl", "https://www.medique.cl", "https://portal.medique.cl", "https://admin.medique.cl", "https://jcmedical.cl", "https://www.jcmedical.cl"];

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
