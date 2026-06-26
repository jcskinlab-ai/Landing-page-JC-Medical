// Medique · Envío de correo (Vercel Serverless Function)
// Envía correos reales (recordatorios, confirmaciones, seguimientos) vía Resend.
// La API key vive SOLO en el servidor. Solo usuarios con sesión Firebase pueden enviar.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  = clave de https://resend.com/api-keys (free: 3.000 correos/mes)
// Opcional:
//   MAIL_FROM       = remitente, p.ej. "Medique <hola@medique.cl>". Por defecto reusa OTP_FROM
//                     o "Medique <noreply@medique.cl>" (dominio ya verificado del 2FA), así envía
//                     a cualquier destinatario. (onboarding@resend.dev solo sirve en sandbox.)

import crypto from "node:crypto";

const RESEND_URL = "https://api.resend.com/emails";

// ── Rate limiting en memoria (anti-abuso / control de costo) ──
const _rl = new Map();
const RL_PER_MIN = 20;
const RL_PER_DAY = 300;
function checkRateLimit(uid) {
  const now = Date.now();
  let r = _rl.get(uid) || { min: { ts: now, count: 0 }, day: { ts: now, count: 0 } };
  if (now - r.min.ts > 60000) r.min = { ts: now, count: 0 };
  if (now - r.day.ts > 86400000) r.day = { ts: now, count: 0 };
  if (r.min.count >= RL_PER_MIN) return { ok: false, error: "Demasiados correos seguidos. Espera un momento." };
  if (r.day.count >= RL_PER_DAY) return { ok: false, error: "Límite diario de correos alcanzado." };
  r.min.count++; r.day.count++;
  _rl.set(uid, r);
  if (_rl.size > 5000) { for (const [k, v] of _rl) { if (now - v.day.ts > 90000000) _rl.delete(k); } }
  return { ok: true };
}

// ── Verificación del ID token de Firebase del usuario logueado (sin Admin SDK) ──
const CERTS_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
let _certCache = { at: 0, certs: null };
async function googleCerts() {
  const now = Date.now();
  if (_certCache.certs && (now - _certCache.at) < 3600000) return _certCache.certs;
  const r = await fetch(CERTS_URL);
  const certs = await r.json();
  _certCache = { at: now, certs };
  return certs;
}
function b64urlToBuf(s) { s = String(s).replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return Buffer.from(s, 'base64'); }
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

function isEmail(s) { return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()); }
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

// Envuelve el texto/cuerpo en una plantilla HTML simple con la marca Medique.
function brandHtml(bodyHtml, clinicName) {
  const name = esc(clinicName || 'Medique');
  return `<!doctype html><html><body style="margin:0;background:#f4f5f7;padding:24px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e6e8ec">
      <tr><td style="background:#10151F;padding:20px 28px;color:#F2EFE9;font-size:18px;letter-spacing:.04em">${name}</td></tr>
      <tr><td style="padding:28px;color:#222;font-size:15px;line-height:1.6">${bodyHtml}</td></tr>
      <tr><td style="padding:18px 28px;border-top:1px solid #eee;color:#8a92a0;font-size:12px">Enviado con Medique · gestión para clínicas de medicina estética</td></tr>
    </table>
  </td></tr></table></body></html>`;
}

export default async function handler(req, res) {
  const ALLOWED_ORIGINS = ['https://medique.cl', 'https://www.medique.cl', 'https://portal.medique.cl', 'https://admin.medique.cl', 'https://jcmedical.cl', 'https://www.jcmedical.cl'];
  const origin = req.headers.origin || '';
  const safeOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", safeOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-jcm-key, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  // Solo usuarios autenticados (panel con sesión Firebase).
  const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'medique-8dbf6';
  const authz = req.headers['authorization'] || '';
  const idToken = authz.startsWith('Bearer ') ? authz.slice(7) : '';
  let tokenPayload;
  try {
    tokenPayload = await verifyFirebaseToken(idToken, PROJECT_ID);
  } catch (e) {
    return res.status(401).json({ ok: false, error: "No autorizado: inicia sesión en el panel." });
  }

  const rl = checkRateLimit(tokenPayload.sub);
  if (!rl.ok) return res.status(429).json({ ok: false, error: rl.error });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return res.status(503).json({ ok: false, error: "Correo no configurado: falta RESEND_API_KEY en el servidor.", configured: false });
  }
  // Reusa el remitente del dominio verificado (el mismo del 2FA), así envía a cualquier paciente.
  // onboarding@resend.dev solo sirve en sandbox (solo al dueño de la cuenta), por eso NO se usa por defecto.
  const from = process.env.MAIL_FROM || process.env.OTP_FROM || "Medique <noreply@medique.cl>";

  const body = req.body || {};
  const to = (body.to || "").toString().trim();
  const subject = (body.subject || "").toString().trim().slice(0, 200);
  const text = (body.text || "").toString().slice(0, 5000);
  const replyTo = isEmail(body.replyTo) ? body.replyTo.trim() : undefined;
  const clinicName = (body.clinic && body.clinic.name) || "Medique";

  if (!isEmail(to)) return res.status(400).json({ ok: false, error: "Correo de destino inválido." });
  if (!subject) return res.status(400).json({ ok: false, error: "Falta el asunto." });
  if (!text.trim()) return res.status(400).json({ ok: false, error: "El correo está vacío." });

  // El cuerpo lo envía el cliente como texto plano; lo convertimos a HTML seguro (escapado).
  const bodyHtml = esc(text).replace(/\n/g, "<br>");
  const html = brandHtml(bodyHtml, clinicName);

  try {
    const r = await fetch(RESEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
      body: JSON.stringify({ from, to: [to], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) })
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error("Resend error", r.status, data);
      const detail = (data && (data.message || data.name)) || ("Resend " + r.status);
      return res.status(502).json({ ok: false, error: "No se pudo enviar el correo: " + detail });
    }
    return res.status(200).json({ ok: true, id: data && data.id });
  } catch (e) {
    console.error("Error enviando correo:", e);
    return res.status(502).json({ ok: false, error: "No se pudo contactar el servicio de correo." });
  }
}
