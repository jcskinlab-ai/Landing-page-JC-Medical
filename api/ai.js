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

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

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
