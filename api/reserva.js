// JC Medical · API de reservas (Vercel Serverless Function)
// Recibe una reserva del sitio y la reenvía al webhook de n8n (WhatsApp/notificaciones).
// Variable de entorno requerida: N8N_WEBHOOK_URL (URL del webhook "jcm-reserva" de n8n).
//
// Es OPCIONAL: el sitio sigue funcionando sin esto (guarda en localStorage). Esta función
// añade la capa de backend para disparar notificaciones reales por WhatsApp vía n8n.

export default async function handler(req, res) {
  // CORS restringido a los dominios propios (lo llaman pacientes sin login, pero solo desde el sitio).
  const ALLOWED_ORIGINS = ['https://medique.cl', 'https://www.medique.cl', 'https://portal.medique.cl', 'https://admin.medique.cl', 'https://jcmedical.cl', 'https://www.jcmedical.cl'];
  const origin = req.headers.origin || '';
  const safeOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", safeOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Método no permitido" });

  const { nombre, telefono, proc, fecha, hora } = req.body || {};
  // Validación mínima
  if (!nombre || !telefono || !fecha) {
    return res.status(400).json({ ok: false, error: "Faltan datos: nombre, telefono y fecha son obligatorios." });
  }
  const phone = String(telefono).replace(/[^0-9]/g, "");
  if (phone.length < 8) return res.status(400).json({ ok: false, error: "Teléfono inválido." });

  const hook = process.env.N8N_WEBHOOK_URL;
  if (!hook) return res.status(500).json({ ok: false, error: "Falta configurar N8N_WEBHOOK_URL." });

  try {
    const r = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, telefono: phone, proc: proc || "Evaluación", fecha, hora: hora || "" })
    });
    if (!r.ok) throw new Error("n8n respondió " + r.status);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Error reenviando a n8n:", e);
    return res.status(502).json({ ok: false, error: "No se pudo notificar la reserva." });
  }
}
