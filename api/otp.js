// Medique · 2FA por email en dispositivo nuevo (Vercel Serverless Function)
// Diseño SIN estado (HMAC) y SIN dependencias: el código de 6 dígitos se envía por email; el
// servidor firma {uid|code|exp} con OTP_SECRET y el cliente guarda solo la firma (no el código).
// Al verificar, el servidor recomputa la firma. Si el dispositivo ya fue verificado, guarda un
// "device token" firmado (30 días) y no vuelve a pedir código en ese dispositivo.
//
// Variables de entorno (Vercel) — mientras falten, el endpoint responde 503 y el 2FA queda inactivo:
//   OTP_SECRET        = secreto aleatorio largo (firma los códigos y los device tokens)
//   RESEND_API_KEY    = (opcional) para enviar el email vía Resend; o usa n8n (abajo)
//   OTP_FROM          = (opcional) remitente, ej. "Medique <noreply@medique.cl>"
//   N8N_OTP_URL       = (opcional) webhook n8n que envía el email {type:'otp', email, code}
//   FIREBASE_PROJECT_ID = (opcional) por defecto 'medique-8dbf6'
//
// NOTA de seguridad: la verificación es sin estado (no limita reintentos por sí sola). El código
// vence en 5 min y el endpoint exige token de Firebase + CORS propio; App Check (cuando se active)
// bloquea peticiones que no vengan de la app. Para límite de reintentos estricto, se puede migrar
// a almacenar el OTP en Firestore con Admin SDK (mejora futura).

import crypto from "node:crypto";

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

function hmac(secret, msg) { return crypto.createHmac('sha256', secret).update(msg).digest('hex'); }

async function sendEmail(to, code) {
  // Preferir Resend si está configurado; si no, usar n8n.
  if (process.env.RESEND_API_KEY) {
    const from = process.env.OTP_FROM || 'Medique <noreply@medique.cl>';
    const html = '<div style="font-family:Arial,sans-serif;color:#1a1a14"><p>Tu código de acceso a Medique es:</p>' +
      '<p style="font-size:30px;font-weight:bold;letter-spacing:4px;color:#1A2740">' + code + '</p>' +
      '<p style="color:#666;font-size:13px">Vence en 5 minutos. Si no intentaste entrar, ignora este correo.</p></div>';
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { 'Authorization': 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: from, to: to, subject: 'Tu código de acceso a Medique', html: html })
    });
    return r.ok;
  }
  const hook = process.env.N8N_OTP_URL || process.env.N8N_WEBHOOK_URL;
  if (hook) {
    const r = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'otp', email: to, code: code }) });
    return r.ok;
  }
  return false;
}

export default async function handler(req, res) {
  const ALLOWED_ORIGINS = ['https://medique.cl', 'https://www.medique.cl', 'https://jcmedical.cl', 'https://www.jcmedical.cl'];
  const origin = req.headers.origin || '';
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  const SECRET = process.env.OTP_SECRET;
  if (!SECRET) return res.status(503).json({ ok: false, configured: false, error: "2FA no configurado (falta OTP_SECRET)." });

  const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'medique-8dbf6';
  const authz = req.headers['authorization'] || '';
  const idToken = authz.indexOf('Bearer ') === 0 ? authz.slice(7) : '';
  let user;
  try { user = await verifyFirebaseToken(idToken, PROJECT_ID); }
  catch (e) { return res.status(401).json({ ok: false, error: "Sesión inválida." }); }
  const uid = user.sub, email = user.email || '';
  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const action = body.action;
  const now = Date.now();

  // ¿Este dispositivo ya fue verificado? (device token firmado, 30 días)
  if (action === 'check') {
    const dev = String(body.device || ''); const parts = dev.split('.');
    if (parts.length === 2) {
      const exp = parseInt(parts[1], 10) || 0;
      if (exp > now && hmac(SECRET, uid + '|device|' + exp) === parts[0]) return res.status(200).json({ ok: true, trusted: true });
    }
    return res.status(200).json({ ok: true, trusted: false, hasEmail: !!email });
  }

  // Enviar código al correo de la cuenta.
  if (action === 'send') {
    if (!email) return res.status(400).json({ ok: false, error: "Tu cuenta no tiene un correo para enviar el código." });
    const code = '' + Math.floor(100000 + Math.random() * 900000);
    const exp = now + 5 * 60 * 1000;
    const sig = hmac(SECRET, uid + '|' + code + '|' + exp);
    const sent = await sendEmail(email, code);
    if (!sent) return res.status(502).json({ ok: false, error: "No se pudo enviar el código. Intenta de nuevo." });
    const masked = email.replace(/^(.)[^@]*(@.*)$/, '$1•••$2');
    return res.status(200).json({ ok: true, exp: exp, sig: sig, email: masked });
  }

  // Verificar el código → emitir device token de confianza.
  if (action === 'verify') {
    const code = String(body.code || '').trim();
    const exp = parseInt(body.exp, 10) || 0;
    const sig = String(body.sig || '');
    if (exp <= now) return res.status(400).json({ ok: false, error: "El código expiró. Pide uno nuevo." });
    if (!/^\d{6}$/.test(code)) return res.status(400).json({ ok: false, error: "El código debe tener 6 dígitos." });
    const expected = hmac(SECRET, uid + '|' + code + '|' + exp);
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig.length === expected.length ? sig : expected))) {
      return res.status(400).json({ ok: false, error: "Código incorrecto." });
    }
    if (sig !== expected) return res.status(400).json({ ok: false, error: "Código incorrecto." });
    const dexp = now + 30 * 24 * 60 * 60 * 1000; // confianza por 30 días
    const device = hmac(SECRET, uid + '|device|' + dexp) + '.' + dexp;
    return res.status(200).json({ ok: true, device: device });
  }

  return res.status(400).json({ ok: false, error: "Acción no válida." });
}
