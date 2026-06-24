// Medique · Meta Ads insights (Vercel Serverless Function)
// Proxy hacia la Graph API de Meta para traer gasto/leads reales de las campañas.
// El access token vive SOLO en el servidor (variable de entorno), nunca en el navegador.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   META_ACCESS_TOKEN  = token de acceso del System User / app de Meta (lo genera el dueño)
//   META_AD_ACCOUNT_ID = id de la cuenta publicitaria, formato "act_1234567890"
// Opcional:
//   META_API_VERSION   = versión de la Graph API (por defecto "v21.0")

import crypto from "node:crypto";

const ALLOWED_ORIGINS = ['https://medique.cl', 'https://www.medique.cl', 'https://jcmedical.cl', 'https://www.jcmedical.cl'];
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

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const safeOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", safeOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  // Solo usuarios autenticados pueden usar este proxy.
  const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'medique-8dbf6';
  const authz = req.headers['authorization'] || '';
  const idToken = authz.startsWith('Bearer ') ? authz.slice(7) : '';
  try {
    await verifyFirebaseToken(idToken, PROJECT_ID);
  } catch (e) {
    return res.status(401).json({ ok: false, error: "No autorizado: inicia sesión en el panel." });
  }

  const ver = process.env.META_API_VERSION || "v21.0";
  const body = (req.method === "POST" && req.body) ? req.body : {};
  const preset = (typeof body.preset === 'string' && /^[a-z_]+$/.test(body.preset)) ? body.preset : "this_month";
  const fields = "spend,impressions,reach,clicks,actions";

  // Opción B (Meta por clínica, AISLADO): si la clínica envía SU propio token+cuenta —guardados
  // en su Firestore 'meta_creds'— se usan esos; si no, caen a las variables de ENV (clínica base).
  // El request ya viene autenticado con el ID token de Firebase; el token de Meta nunca se loguea.
  const bodyTok = (typeof body.token === 'string' && body.token.trim()) ? body.token.trim() : '';
  const bodyAcct = (typeof body.account === 'string' && body.account.trim()) ? body.account.trim() : '';
  const token = bodyTok || process.env.META_ACCESS_TOKEN;
  const acctRaw = bodyAcct || process.env.META_AD_ACCOUNT_ID;
  if (!token || !acctRaw) {
    return res.status(503).json({ ok: false, configured: false, error: "Meta Ads no configurado: falta token o cuenta publicitaria." });
  }
  // El id de cuenta se concatena en la URL → validación estricta: solo "act_<dígitos>", coma-separado.
  const accounts = acctRaw.split(",").map(a => a.trim()).filter(Boolean);
  if (!accounts.length || !accounts.every(a => /^act_\d+$/.test(a))) {
    return res.status(400).json({ ok: false, error: "Cuenta publicitaria inválida (formato act_1234567890)." });
  }

  async function fetchAccount(acct) {
    const url = "https://graph.facebook.com/" + ver + "/" + acct +
      "/insights?fields=" + encodeURIComponent(fields) +
      "&date_preset=" + encodeURIComponent(preset) +
      "&access_token=" + encodeURIComponent(token);
    const r = await fetch(url);
    const data = await r.json();
    if (!r.ok || data.error) {
      const msg = (data.error && data.error.message) || r.status;
      throw new Error(acct + ": " + msg);
    }
    return (data.data && data.data[0]) || {};
  }

  try {
    const totals = { spend: 0, reach: 0, impressions: 0, clicks: 0, leads: 0 };
    const errors = [];
    const rows = await Promise.all(accounts.map(a => fetchAccount(a).catch(e => { errors.push(e.message); return null; })));
    rows.forEach(row => {
      if (!row) return;
      totals.spend += parseFloat(row.spend || 0);
      totals.reach += parseInt(row.reach, 10) || 0;
      totals.impressions += parseInt(row.impressions, 10) || 0;
      totals.clicks += parseInt(row.clicks, 10) || 0;
      (row.actions || []).forEach(a => { if (/lead/i.test(a.action_type)) totals.leads += parseInt(a.value, 10) || 0; });
    });
    if (errors.length === accounts.length) {
      console.error("Meta error (todas las cuentas)", errors);
      return res.status(502).json({ ok: false, error: "Meta respondió con error.", detail: errors.join(" · ") });
    }
    return res.status(200).json({
      ok: true,
      spend: Math.round(totals.spend),
      reach: totals.reach,
      impressions: totals.impressions,
      clicks: totals.clicks,
      leads: totals.leads,
      accounts: accounts.length,
      partialErrors: errors.length ? errors : undefined
    });
  } catch (e) {
    console.error("Error llamando a Meta:", e);
    return res.status(502).json({ ok: false, error: "No se pudo contactar a Meta Ads." });
  }
}
