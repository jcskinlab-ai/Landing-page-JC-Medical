// Medique · Webhook de WhatsApp (Vercel Serverless Function)
// El "cerebro" del agente IA en WhatsApp: recibe los mensajes que escriben los pacientes,
// responde con Groq y, cuando reúne los datos, CREA la reserva en el sistema (Firestore),
// que aparece sola en la agenda del panel (mismo pipe que la reserva del sitio).
//
// FLUJO:  paciente escribe → Meta → este webhook → Groq decide → ¿reservar? → Firestore → responde por WhatsApp
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   WHATSAPP_TOKEN          = token de la WhatsApp Cloud API (System User, permanente)
//   WHATSAPP_PHONE_ID       = Phone Number ID del número de WhatsApp
//   WHATSAPP_VERIFY_TOKEN   = una palabra secreta que tú inventas (la misma que pongas en Meta al verificar el webhook)
//   GROQ_API_KEY            = clave de Groq (el cerebro IA)
// Opcionales:
//   GROQ_MODEL              = modelo (default "llama-3.3-70b-versatile")
//   WA_CLINIC_ID            = clínica a la que entran las reservas de este número (default abajo)
//   WA_CLINIC_NAME          = nombre de la clínica para el contexto del bot
//   FIREBASE_PROJECT_ID     = (default "medique-8dbf6")
//   FIREBASE_API_KEY        = clave web pública de Firebase (default abajo) — para crear la reserva vía REST
//   WHATSAPP_APP_SECRET     = si se define, valida la firma X-Hub-Signature-256 de Meta

import crypto from "node:crypto";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GRAPH = "https://graph.facebook.com/v21.0";

// ── Memoria de conversación por teléfono (en memoria; se reinicia en cold start).
// Suficiente para una reserva corta. Si se pierde, el bot simplemente vuelve a preguntar.
const _sessions = new Map();
const SESSION_TTL = 30 * 60 * 1000; // 30 min
function getSession(phone) {
  const now = Date.now();
  let s = _sessions.get(phone);
  if (!s || (now - s.at) > SESSION_TTL) s = { msgs: [], at: now };
  s.at = now;
  _sessions.set(phone, s);
  if (_sessions.size > 2000) { for (const [k, v] of _sessions) { if (now - v.at > SESSION_TTL) _sessions.delete(k); } }
  return s;
}

function todayCL() {
  // Fecha de hoy en zona de Chile (America/Santiago) en formato YYYY-MM-DD.
  try {
    const f = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" });
    return f.format(new Date());
  } catch (e) { return new Date().toISOString().slice(0, 10); }
}

// ── Llama a Groq y devuelve el texto de la respuesta ──
async function askGroq(messages) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("falta GROQ_API_KEY");
  const r = await fetch(GROQ_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages, temperature: 0.4, max_tokens: 350,
      response_format: { type: "json_object" }
    })
  });
  if (!r.ok) { const t = await r.text().catch(() => ""); throw new Error("Groq " + r.status + " " + t); }
  const data = await r.json();
  return (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
}

function parseJson(s) {
  try { return JSON.parse(s); } catch (e) {}
  // por si viene envuelto en ```json … ``` o con texto alrededor
  const m = String(s).match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch (e) {} }
  return null;
}

// ── Crea la reserva en Firestore (REST, regla pública de bookings — sin login) ──
async function crearReserva(clinicId, b) {
  const pid = process.env.FIREBASE_PROJECT_ID || "medique-8dbf6";
  const apiKey = process.env.FIREBASE_API_KEY || "AIzaSyCIG19u0_T6rldljMq_St-WJ-XX8JkAsM4";
  const url = `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/tenants/${encodeURIComponent(clinicId)}/bookings?key=${apiKey}`;
  // Campos EXACTOS permitidos por firestore.rules para bookings (hasOnly).
  const fields = {
    name: { stringValue: (b.nombre || "").slice(0, 119) },
    phone: { stringValue: (b.phone || "").slice(0, 29) },
    email: { stringValue: "" },
    proc: { stringValue: (b.proc || "Evaluación").slice(0, 120) },
    fecha: { stringValue: b.fecha || "" },
    time: { stringValue: b.hora || "" },
    dur: { stringValue: "" },
    note: { stringValue: "Reserva por WhatsApp (agente IA)" },
    source: { stringValue: "whatsapp" },
    procs: { arrayValue: { values: [] } },
    createdAt: { integerValue: String(Date.now()) }
  };
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fields }) });
  if (!r.ok) { const t = await r.text().catch(() => ""); throw new Error("Firestore " + r.status + " " + t); }
  return true;
}

// ── Envía un mensaje de texto por la WhatsApp Cloud API ──
async function sendWhats(to, body) {
  const token = process.env.WHATSAPP_TOKEN, phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) throw new Error("falta WHATSAPP_TOKEN / WHATSAPP_PHONE_ID");
  const r = await fetch(`${GRAPH}/${phoneId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: body.slice(0, 4000) } })
  });
  if (!r.ok) { const t = await r.text().catch(() => ""); console.error("WhatsApp send error", r.status, t); }
}

export default async function handler(req, res) {
  // ── Verificación del webhook (Meta hace un GET al configurarlo) ──
  if (req.method === "GET") {
    const q = req.query || {};
    const mode = q["hub.mode"], token = q["hub.verify_token"], challenge = q["hub.challenge"];
    if (mode === "subscribe" && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send("forbidden");
  }
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  // ── (Opcional) Validar firma de Meta si hay app secret ──
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (appSecret) {
    try {
      const sig = req.headers["x-hub-signature-256"] || "";
      const raw = JSON.stringify(req.body || {});
      const expected = "sha256=" + crypto.createHmac("sha256", appSecret).update(raw).digest("hex");
      if (sig !== expected) return res.status(401).send("bad signature");
    } catch (e) { /* si falla la validación de firma, no bloqueamos el v1 */ }
  }

  // Responder 200 rápido a Meta y procesar (Meta reintenta si no recibe 200).
  let msg = null, from = "";
  try {
    const entry = req.body && req.body.entry && req.body.entry[0];
    const change = entry && entry.changes && entry.changes[0];
    const value = change && change.value;
    const m = value && value.messages && value.messages[0];
    if (m && m.type === "text" && m.from) { from = m.from; msg = (m.text && m.text.body) || ""; }
  } catch (e) {}

  if (!msg) return res.status(200).json({ ok: true }); // estados de entrega, no-texto, etc.

  const clinicId = process.env.WA_CLINIC_ID || "jc-medical-qI9deP";
  const clinicName = process.env.WA_CLINIC_NAME || "la clínica";
  const sys = [
    "Eres el asistente de WhatsApp de " + clinicName + " (medicina estética).",
    "Responde en español de Chile, breve, cercano y profesional. Nunca des diagnósticos ni dosis.",
    "Tu objetivo es ayudar y, cuando el paciente quiera agendar, reunir: nombre, procedimiento/servicio, fecha y hora.",
    "Hoy es " + todayCL() + ". Interpreta 'mañana', 'el viernes', etc. respecto a esa fecha. Las horas en formato 24h.",
    "Los procedimientos son actos médicos: confirma siempre que la hora queda sujeta a una evaluación previa.",
    "",
    "RESPONDE SIEMPRE en JSON válido (sin texto fuera del JSON), con UNA de estas formas:",
    '{"action":"reply","reply":"<tu mensaje al paciente>"}',
    '{"action":"book","nombre":"<nombre>","proc":"<servicio>","fecha":"YYYY-MM-DD","hora":"HH:MM","reply":"<confirmación al paciente>"}',
    'Usa "book" SOLO cuando ya tengas los 4 datos (nombre, servicio, fecha y hora) y el paciente haya confirmado. Si falta algo, usa "reply" para pedirlo.'
  ].join("\n");

  const session = getSession(from);
  session.msgs.push({ role: "user", content: String(msg).slice(0, 1000) });
  session.msgs = session.msgs.slice(-12); // memoria corta

  try {
    const raw = await askGroq([{ role: "system", content: sys }].concat(session.msgs));
    const out = parseJson(raw) || { action: "reply", reply: raw };
    let reply = out.reply || "¿Te ayudo a agendar una hora?";

    if (out.action === "book" && out.nombre && out.fecha && out.hora) {
      try {
        await crearReserva(clinicId, { nombre: out.nombre, phone: from, proc: out.proc, fecha: out.fecha, hora: out.hora });
        reply = out.reply || ("¡Listo " + out.nombre + "! Tu reserva quedó solicitada para el " + out.fecha + " a las " + out.hora + ". Te confirmamos a la brevedad.");
        session.msgs = []; // reset tras reservar
      } catch (e) {
        console.error("No se pudo crear la reserva:", e);
        reply = "Tomé tus datos, pero tuve un problema al registrar la reserva. Una persona del equipo te contactará para confirmar.";
      }
    }

    session.msgs.push({ role: "assistant", content: reply });
    await sendWhats(from, reply);
  } catch (e) {
    console.error("Error procesando mensaje WA:", e);
    try { await sendWhats(from, "Disculpa, tuve un problema para responder. Intenta de nuevo en un momento 🙏"); } catch (_) {}
  }

  return res.status(200).json({ ok: true });
}
