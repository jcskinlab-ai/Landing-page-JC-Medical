// Medique · Agente IA (Vercel Serverless Function)
// Proxy hacia Groq (Llama 3.3 70B). La API key vive SOLO en el servidor (variable de entorno),
// nunca en el código del navegador. El cliente envía el contexto de la conversación; aquí se
// llama a Groq y se devuelve la respuesta del asistente.
//
// Variable de entorno requerida (Vercel → Settings → Environment Variables):
//   GROQ_API_KEY = la clave que genera el dueño en su cuenta de Groq (https://console.groq.com/keys)
// Opcional:
//   GROQ_MODEL   = modelo a usar (por defecto "llama-3.3-70b-versatile")
//
// Mientras GROQ_API_KEY no esté configurada, el endpoint responde 503 con un mensaje claro
// y el panel sigue funcionando en modo manual (sin auto-respuesta de IA).

import crypto from "node:crypto";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// ── Verificación del ID token de Firebase del usuario logueado (sin Admin SDK) ──
// Valida la firma RS256 contra las llaves públicas de Google + aud/iss/exp.
// El projectId es público (no es secreto). Así solo usuarios autenticados usan el agente.
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
  if (header.alg !== 'RS256' || !header.kid) throw new Error('alg/kid inválido'); // evita confusión de algoritmo
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
  // CORS restringido a los dominios propios (no wildcard).
  const ALLOWED_ORIGINS = ['https://medique.cl', 'https://www.medique.cl', 'https://jcmedical.cl', 'https://www.jcmedical.cl'];
  const origin = req.headers.origin || '';
  const safeOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", safeOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-jcm-key, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  // Solo usuarios autenticados (panel con sesión Firebase): verifica el ID token. Evita que
  // cualquiera en internet llame al endpoint y queme los créditos de Groq.
  const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'medique-8dbf6';
  const authz = req.headers['authorization'] || '';
  const idToken = authz.indexOf('Bearer ') === 0 ? authz.slice(7) : '';
  try {
    await verifyFirebaseToken(idToken, PROJECT_ID);
  } catch (e) {
    return res.status(401).json({ ok: false, error: "No autorizado: inicia sesión en el panel." });
  }

  // Llave interna opcional adicional (si JCM_API_KEY está configurada).
  const internalKey = process.env.JCM_API_KEY;
  if (internalKey && req.headers['x-jcm-key'] !== internalKey) {
    return res.status(403).json({ ok: false, error: "No autorizado." });
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return res.status(503).json({ ok: false, error: "Agente IA no configurado: falta GROQ_API_KEY en el servidor.", configured: false });
  }

  const body = req.body || {};
  // El cliente envía: { messages:[{role,content}], clinic:{name,services,hours,address}, model? }
  const userMessages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
  if (!userMessages.length) return res.status(400).json({ ok: false, error: "Faltan mensajes." });

  const clinic = body.clinic || {};
  // Prompt de sistema con el contexto de la clínica (cada clínica tiene el suyo).
  const system = [
    "Eres el asistente de WhatsApp de " + (clinic.name || "una clínica de medicina estética") + ".",
    "Responde en español de Chile, con cercanía y profesionalismo, mensajes breves.",
    clinic.address ? "Dirección: " + clinic.address + "." : "",
    clinic.hours ? "Horario: " + clinic.hours + "." : "",
    Array.isArray(clinic.services) && clinic.services.length
      ? "Servicios y precios: " + clinic.services.map(s => s.name + " ($" + (s.price || 0) + ")").join(", ") + "."
      : "",
    "Los procedimientos son actos médicos: para confirmar una hora siempre se requiere una evaluación previa.",
    "Nunca des diagnósticos ni dosis. Si te piden algo clínico delicado, ofrece agendar una evaluación.",
    "Si el paciente quiere agendar, pide su nombre y propón coordinar día y hora."
  ].filter(Boolean).join("\n");

  const messages = [{ role: "system", content: system }].concat(
    userMessages.map(m => ({ role: m.role === "out" || m.role === "assistant" ? "assistant" : "user", content: String(m.content || m.t || "") }))
  );

  try {
    const r = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.6,
        max_tokens: 400
      })
    });
    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      console.error("Groq error", r.status, txt);
      return res.status(502).json({ ok: false, error: "El agente no pudo responder (Groq " + r.status + ")." });
    }
    const data = await r.json();
    const reply = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    return res.status(200).json({ ok: true, reply: (reply || "").trim() });
  } catch (e) {
    console.error("Error llamando a Groq:", e);
    return res.status(502).json({ ok: false, error: "No se pudo contactar al agente de IA." });
  }
}
