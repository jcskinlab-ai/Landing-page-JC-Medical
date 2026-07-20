// JC Medical · API de reservas (Vercel Serverless Function)
// Recibe una reserva del sitio y la reenvía al webhook de n8n (WhatsApp/notificaciones).
// Variable de entorno requerida: N8N_WEBHOOK_URL (URL del webhook "jcm-reserva" de n8n).
//
// Es OPCIONAL: el sitio sigue funcionando sin esto (guarda en localStorage). Esta función
// añade la capa de backend para disparar notificaciones reales por WhatsApp vía n8n.

// SEG · Rate-limit por IP en memoria. Este endpoint es público por diseño y no tenía ningún tope:
// se podía inundar el webhook de n8n (y con él los WhatsApp que dispara). El contador se reinicia
// en cold starts — frena el abuso trivial, no a un atacante decidido; para eso haría falta un
// store compartido (Firestore/KV).
const _rl = new Map();
function tooMany(ip) {
  const now = Date.now();
  let r = _rl.get(ip);
  if (!r || now - r.ts > 60000) r = { ts: now, count: 0 };
  r.count++; _rl.set(ip, r);
  if (_rl.size > 5000) for (const [k, v] of _rl) if (now - v.ts > 60000) _rl.delete(k);
  return r.count > 6; // 6 reservas por minuto y por IP
}
const clip = (v, n) => String(v == null ? "" : v).slice(0, n);

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

  // La IP real va al FINAL del X-Forwarded-For; Vercel la expone en x-real-ip.
  const _xff = (req.headers["x-forwarded-for"] || "").toString().split(",").map(s => s.trim()).filter(Boolean);
  const ip = ((req.headers["x-real-ip"] || "").toString().trim()) || _xff[_xff.length - 1] || "ip";
  if (tooMany(ip)) return res.status(429).json({ ok: false, error: "Demasiadas solicitudes. Espera un momento." });

  const { nombre, telefono, proc, fecha, hora } = req.body || {};
  // Validación mínima
  if (!nombre || !telefono || !fecha) {
    return res.status(400).json({ ok: false, error: "Faltan datos: nombre, telefono y fecha son obligatorios." });
  }
  const phone = String(telefono).replace(/[^0-9]/g, "");
  if (phone.length < 8) return res.status(400).json({ ok: false, error: "Teléfono inválido." });
  // SEG · Los campos se reenviaban a n8n sin truncar ni validar formato: permitía inyectar
  // contenido arbitrario (y de cualquier tamaño) en los mensajes que n8n genera.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(fecha))) return res.status(400).json({ ok: false, error: "Fecha inválida (formato AAAA-MM-DD)." });
  if (hora && !/^\d{1,2}:\d{2}$/.test(String(hora))) return res.status(400).json({ ok: false, error: "Hora inválida (formato HH:MM)." });
  const safeNombre = clip(nombre, 120);
  const safeProc = clip(proc, 120) || "Evaluación";
  const safeHora = clip(hora, 5);

  const hook = process.env.N8N_WEBHOOK_URL;
  if (!hook) return res.status(500).json({ ok: false, error: "Falta configurar N8N_WEBHOOK_URL." });

  try {
    const r = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: safeNombre, telefono: phone, proc: safeProc, fecha: String(fecha), hora: safeHora })
    });
    if (!r.ok) throw new Error("n8n respondió " + r.status);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Error reenviando a n8n:", e);
    return res.status(502).json({ ok: false, error: "No se pudo notificar la reserva." });
  }
}
