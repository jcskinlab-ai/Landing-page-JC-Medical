// Medique · Generar link de pago (Vercel Serverless Function)
// Crea un link de cobro en línea con la pasarela de la clínica. Las credenciales (secretas)
// viven SOLO en el servidor (variables de entorno), nunca en el navegador.
//
// Variables de entorno (Vercel → Settings → Environment Variables), según el proveedor:
//   Mercado Pago:  MP_ACCESS_TOKEN
//   Flow:          FLOW_API_KEY, FLOW_SECRET   (Flow producción: https://www.flow.cl/api)
//   Khipu:         KHIPU_RECEIVER_ID, KHIPU_SECRET
// El request debe venir autenticado con el ID token de Firebase del usuario logueado.

import crypto from "node:crypto";

const ALLOWED_ORIGINS = ['https://medique.cl', 'https://www.medique.cl', 'https://portal.medique.cl', 'https://admin.medique.cl', 'https://jcmedical.cl', 'https://www.jcmedical.cl'];
const CERTS_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
let _certCache = { at: 0, certs: null };
async function googleCerts() {
  const now = Date.now();
  if (_certCache.certs && (now - _certCache.at) < 3600000) return _certCache.certs;
  const r = await fetch(CERTS_URL); const certs = await r.json(); _certCache = { at: now, certs }; return certs;
}
function b64urlToBuf(s) { s = String(s).replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return Buffer.from(s, 'base64'); }
async function verifyFirebaseToken(token, projectId) {
  if (!token) throw new Error('sin token');
  const parts = token.split('.'); if (parts.length !== 3) throw new Error('token mal formado');
  const header = JSON.parse(b64urlToBuf(parts[0]).toString('utf8'));
  if (header.alg !== 'RS256' || !header.kid) throw new Error('alg/kid inválido');
  const certs = await googleCerts(); const certPem = certs[header.kid]; if (!certPem) throw new Error('kid desconocido');
  const pub = new crypto.X509Certificate(certPem).publicKey;
  if (!crypto.createVerify('RSA-SHA256').update(parts[0] + '.' + parts[1]).verify(pub, b64urlToBuf(parts[2]))) throw new Error('firma inválida');
  const p = JSON.parse(b64urlToBuf(parts[1]).toString('utf8')); const now = Math.floor(Date.now() / 1000);
  if (!p.exp || p.exp <= now) throw new Error('token expirado');
  if (p.aud !== projectId) throw new Error('aud inválido');
  return p;
}

// ── Mercado Pago: crea una preferencia y devuelve init_point ──
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
// ── Flow: firma HMAC-SHA256 de parámetros y crea el pago ──
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
  const origin = req.headers.origin || '';
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });
  const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'medique-8dbf6';
  try {
    const authz = req.headers.authorization || '';
    await verifyFirebaseToken(authz.startsWith('Bearer ') ? authz.slice(7) : '', PROJECT_ID);
  } catch (e) { return res.status(401).json({ ok: false, error: "No autorizado: inicia sesión en el panel." }); }

  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const provider = ("" + (body.provider || "")).toLowerCase();
  const amount = Math.round(parseFloat(body.amount) || 0);
  const desc = ("" + (body.desc || "Atención")).slice(0, 120);
  const back = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  if (amount < 100) return res.status(400).json({ ok: false, error: "Monto inválido." });
  try {
    let r;
    if (provider.indexOf("mercado") >= 0) r = await mercadoPago(amount, desc, back);
    else if (provider.indexOf("flow") >= 0) r = await flow(amount, desc, back);
    else return res.status(400).json({ ok: false, error: "Proveedor no soportado aún. Usa Mercado Pago o Flow." });
    return res.status(r.ok ? 200 : 502).json(r);
  } catch (e) {
    console.error("[pay-link]", e.message || e);
    return res.status(502).json({ ok: false, error: "No se pudo generar el link de pago." });
  }
}
