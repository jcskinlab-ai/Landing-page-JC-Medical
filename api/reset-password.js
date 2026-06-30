// Medique · Recuperar contraseña (Vercel Serverless Function)
// El usuario está DESLOGUEADO, así que este endpoint NO exige sesión (a diferencia de api/email.js).
// Genera el link de restablecimiento con Firebase Admin SDK y lo envía con Resend (marca propia,
// mejor entregabilidad que el correo por defecto de Firebase, que suele caer en spam).
// Anti-abuso: rate limiting por IP y por correo. Nunca revela si un correo existe o no.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   FIREBASE_SERVICE_ACCOUNT_JSON  = JSON de la cuenta de servicio (el mismo de super-ops)
//   RESEND_API_KEY                 = clave de Resend
//   MAIL_FROM / OTP_FROM           = remitente verificado (por defecto "Medique <noreply@medique.cl>")

const RESEND_URL = "https://api.resend.com/emails";
const ALLOWED_ORIGINS = ["https://medique.cl", "https://www.medique.cl", "https://portal.medique.cl", "https://admin.medique.cl", "https://jcmedical.cl", "https://www.jcmedical.cl"];

// ── Firebase Admin SDK (lazy init reutilizable) ──
let _svc = null;
async function getAuthAdmin() {
  if (_svc) return _svc;
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!svcJson) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON no configurado");
  const { initializeApp, cert, getApps } = await import("firebase-admin/app");
  const { getAuth } = await import("firebase-admin/auth");
  const appName = "reset-pass";
  const app = getApps().find(a => a.name === appName) || initializeApp({ credential: cert(JSON.parse(svcJson)) }, appName);
  _svc = getAuth(app);
  return _svc;
}

// ── Rate limiting en memoria (por IP y por correo) ──
const _rl = new Map();
function rlHit(keyId, perMin, perDay) {
  const now = Date.now();
  let r = _rl.get(keyId) || { min: { ts: now, n: 0 }, day: { ts: now, n: 0 } };
  if (now - r.min.ts > 60000) r.min = { ts: now, n: 0 };
  if (now - r.day.ts > 86400000) r.day = { ts: now, n: 0 };
  if (r.min.n >= perMin || r.day.n >= perDay) { _rl.set(keyId, r); return false; }
  r.min.n++; r.day.n++; _rl.set(keyId, r);
  if (_rl.size > 8000) { for (const [k, v] of _rl) { if (now - v.day.ts > 90000000) _rl.delete(k); } }
  return true;
}

function isEmail(s) { return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()); }

function resetHtml(link, email) {
  return `<!doctype html><html><body style="margin:0;background:#f4f5f7;padding:24px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e6e8ec">
      <tr><td style="background:#10151F;padding:20px 28px;color:#F2EFE9;font-size:18px;letter-spacing:.04em">Medique</td></tr>
      <tr><td style="padding:28px;color:#222;font-size:15px;line-height:1.6">
        <h2 style="margin:0 0 12px;color:#222;font-weight:600">Restablece tu contraseña</h2>
        <p style="margin:0 0 18px">Recibimos una solicitud para restablecer la contraseña de la cuenta <b>${email}</b> en el panel Medique. Pulsa el botón para crear una nueva contraseña:</p>
        <p style="margin:0 0 22px"><a href="${link}" style="display:inline-block;background:#54707F;color:#fff;text-decoration:none;padding:13px 26px;border-radius:8px;font-weight:600">Crear nueva contraseña</a></p>
        <p style="margin:0 0 6px;color:#8a92a0;font-size:13px">Si no fuiste tú, puedes ignorar este correo: tu contraseña no cambiará.</p>
        <p style="margin:0;color:#8a92a0;font-size:12px;word-break:break-all">O copia este enlace: ${link}</p>
      </td></tr>
      <tr><td style="padding:18px 28px;border-top:1px solid #eee;color:#8a92a0;font-size:12px">Enviado con Medique · gestión para clínicas de medicina estética</td></tr>
    </table>
  </td></tr></table></body></html>`;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const safeOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", safeOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  const body = req.body || {};
  const email = (body.email || "").toString().trim().toLowerCase();
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Correo inválido." });

  // Anti-abuso: por IP (5/min, 50/día) y por correo (3/min, 8/día).
  const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() || "ip?";
  if (!rlHit("ip:" + ip, 5, 50) || !rlHit("em:" + email, 3, 8)) {
    return res.status(429).json({ ok: false, error: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo." });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return res.status(503).json({ ok: false, error: "Correo no configurado en el servidor.", configured: false });
  const from = process.env.MAIL_FROM || process.env.OTP_FROM || "Medique <noreply@medique.cl>";

  try {
    const auth = await getAuthAdmin();
    let link;
    try {
      link = await auth.generatePasswordResetLink(email);
    } catch (e) {
      // Si el correo no está registrado, NO revelar (anti-enumeración): responder ok sin enviar.
      if (e && (e.code === "auth/user-not-found" || /no user record/i.test(e.message || ""))) {
        return res.status(200).json({ ok: true });
      }
      throw e;
    }
    const r = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: "Bearer " + resendKey, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [email], subject: "Restablece tu contraseña de Medique", html: resetHtml(link, email) })
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      console.error("[reset-password] Resend", r.status, d);
      return res.status(502).json({ ok: false, error: "No se pudo enviar el correo de recuperación." });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("[reset-password]", e.message || e);
    return res.status(500).json({ ok: false, error: "No se pudo procesar la solicitud. Intenta más tarde." });
  }
}
