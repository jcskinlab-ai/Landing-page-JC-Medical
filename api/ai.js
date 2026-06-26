// Medique · Agente IA (Vercel Serverless Function)
// Proxy hacia Groq (Llama 3.3 70B). La API key vive SOLO en el servidor.
// Incluye rate limiting por usuario (30 req/min, 500 req/día) para evitar
// que una clínica queme el cupo de todas.
//
// Variable de entorno requerida (Vercel → Settings → Environment Variables):
//   GROQ_API_KEY = la clave que genera el dueño en su cuenta de Groq (https://console.groq.com/keys)
// Opcional:
//   GROQ_MODEL   = modelo a usar (por defecto "openai/gpt-oss-120b"; llama-3.3-70b-versatile quedó deprecado en jun-2026)

import crypto from "node:crypto";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// ── Rate limiting en memoria (se reinicia en cold starts, es suficiente para limitar abusos) ──
// Mapa: uid → { min: { ts, count }, day: { ts, count } }
const _rl = new Map();
const RL_PER_MIN  = 30;
const RL_PER_DAY  = 500;

function checkRateLimit(uid) {
  const now = Date.now();
  let r = _rl.get(uid) || { min: { ts: now, count: 0 }, day: { ts: now, count: 0 } };
  // Reiniciar ventana de 1 minuto
  if (now - r.min.ts > 60000) r.min = { ts: now, count: 0 };
  // Reiniciar ventana de 24 horas
  if (now - r.day.ts > 86400000) r.day = { ts: now, count: 0 };
  if (r.min.count >= RL_PER_MIN) return { ok: false, error: "Límite de velocidad alcanzado. Espera un momento." };
  if (r.day.count >= RL_PER_DAY) return { ok: false, error: "Límite diario de mensajes IA alcanzado." };
  r.min.count++;
  r.day.count++;
  _rl.set(uid, r);
  // Limpiar uids inactivos (más de 25 horas sin actividad)
  if (_rl.size > 5000) {
    for (const [k, v] of _rl) { if (now - v.day.ts > 90000000) _rl.delete(k); }
  }
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

  // Rate limiting por uid (evita que una clínica queme el cupo de todas).
  const uid = tokenPayload.sub;
  const rl = checkRateLimit(uid);
  if (!rl.ok) return res.status(429).json({ ok: false, error: rl.error });

  // Clave interna opcional adicional.
  const internalKey = process.env.JCM_API_KEY;
  if (internalKey && req.headers['x-jcm-key'] !== internalKey) {
    return res.status(403).json({ ok: false, error: "No autorizado." });
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return res.status(503).json({ ok: false, error: "Agente IA no configurado: falta GROQ_API_KEY en el servidor.", configured: false });
  }

  const body = req.body || {};

  // ── Modo VISIÓN: leer una factura/boleta y extraer sus productos ──────────────
  // El cliente envía { task:'scan_invoice', image:<dataURL base64 de la foto> }.
  // Usa un modelo de visión de Groq (Llama 4 Scout) y devuelve { ok, items:[...] }.
  if (body.task === "scan_invoice" && typeof body.image === "string" && body.image.startsWith("data:image")) {
    const visionModel = process.env.GROQ_VISION_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct";
    const prompt = [
      "Eres un lector experto de facturas y boletas chilenas (formato SII). Analiza la imagen y extrae SOLO los productos del DETALLE de la compra.",
      "NO incluyas como producto: despachos, fletes, descuentos, ni los totales de la factura (Monto Neto, IVA, Total).",
      "El IVA en Chile es 19%. Necesito el COSTO UNITARIO CON IVA INCLUIDO de cada producto.",
      "Para cada producto entrega exactamente: name (nombre del producto tal como aparece), qty (cantidad, número entero), priceUnit (costo de UNA unidad CON IVA incluido, en pesos chilenos enteros, sin puntos, comas ni símbolos), cat ('Insumo clínico', 'Fungible', 'Medicamento' u 'Otro').",
      "Cálculo de priceUnit: el detalle suele mostrar valores NETOS. Toma el total NETO de la línea, divídelo por la cantidad y multiplícalo por 1.19 para incluir el IVA. Si la factura ya muestra precios con IVA, úsalos directamente. Redondea a entero.",
      "Responde ÚNICAMENTE con JSON válido, sin texto extra ni markdown, con esta forma EXACTA:",
      '{"items":[{"name":"Botox 100 UI","qty":15,"priceUnit":140000,"cat":"Insumo clínico"}]}'
    ].join("\n");
    try {
      const r = await fetch(GROQ_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
        body: JSON.stringify({
          model: visionModel,
          messages: [{ role: "user", content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: body.image } }
          ] }],
          temperature: 0.1,
          max_tokens: 1500
        })
      });
      if (!r.ok) {
        const txt = await r.text().catch(() => "");
        console.error("Groq vision error", r.status, txt);
        return res.status(502).json({ ok: false, error: "No se pudo leer la factura (IA " + r.status + "). Intenta con una foto más nítida." });
      }
      const data = await r.json();
      let content = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
      let parsed = null;
      try { parsed = JSON.parse(content); } catch (e) {
        const m = content.match(/\{[\s\S]*\}/); // por si vino con texto alrededor
        if (m) { try { parsed = JSON.parse(m[0]); } catch (_) {} }
      }
      let items = parsed && Array.isArray(parsed.items) ? parsed.items : (Array.isArray(parsed) ? parsed : []);
      items = (items || []).map(it => ({
        name: String(it.name || it.nombre || "").trim().slice(0, 120),
        qty: parseInt(String(it.qty != null ? it.qty : (it.cantidad != null ? it.cantidad : "1")).replace(/[^\d]/g, ""), 10) || 1,
        price: parseInt(String(it.priceUnit != null ? it.priceUnit : (it.price != null ? it.price : "0")).replace(/[^\d]/g, ""), 10) || 0,
        cat: String(it.cat || it.categoria || "Insumo clínico").trim().slice(0, 40)
      })).filter(it => it.name.length > 1);
      return res.status(200).json({ ok: true, items: items });
    } catch (e) {
      console.error("Error visión Groq:", e);
      return res.status(502).json({ ok: false, error: "No se pudo contactar al lector de facturas." });
    }
  }

  const userMessages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
  if (!userMessages.length) return res.status(400).json({ ok: false, error: "Faltan mensajes." });

  const clinic = body.clinic || {};
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

  const MAX_CONTENT = 4000;
  const messages = [{ role: "system", content: system }].concat(
    userMessages.map(m => ({
      role: m.role === "out" || m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || m.t || "").slice(0, MAX_CONTENT)
    }))
  );

  try {
    const r = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
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
