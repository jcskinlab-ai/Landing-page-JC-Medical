// Medique · Meta Ads insights (Vercel Serverless Function)
// Proxy hacia la Graph API de Meta para traer gasto/leads reales de las campañas.
// El access token vive SOLO en el servidor (variable de entorno), nunca en el navegador.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   META_ACCESS_TOKEN  = token de acceso del System User / app de Meta (lo genera el dueño)
//   META_AD_ACCOUNT_ID = id de la cuenta publicitaria, formato "act_1234567890"
// Opcional:
//   META_API_VERSION   = versión de la Graph API (por defecto "v21.0")
//
// Mientras no estén configuradas, responde 503 con un mensaje claro y el panel usa el gasto
// que el dueño cargó manualmente (config.meta_spend_mes).
//
// NOTA: este proyecto también puede usar las herramientas MCP de Meta Ads directamente desde
// el asistente; esta función queda como punto de integración HTTP para el panel en producción.

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  // Credenciales: si vienen en el cuerpo (token/account de UNA clínica), se usan esas;
  // si no, se cae a las variables de entorno (cuenta de la clínica base / JC Medical).
  // El token de cada clínica es de solo lectura (ads_read) y vive aislado en su propio tenant.
  const body = (req.method === "POST" && req.body) ? req.body : {};
  const token = body.token || process.env.META_ACCESS_TOKEN;
  const acctRaw = body.account || process.env.META_AD_ACCOUNT_ID;
  if (!token || !acctRaw) {
    return res.status(503).json({ ok: false, configured: false, error: "Meta Ads no configurado: falta token o cuenta publicitaria." });
  }

  const ver = process.env.META_API_VERSION || "v21.0";
  // datePreset: this_month por defecto (configurable por query ?preset=...)
  const preset = (req.query && req.query.preset) || "this_month";
  const fields = "spend,impressions,reach,clicks,actions";
  // META_AD_ACCOUNT_ID admite UNA o VARIAS cuentas separadas por coma (ej. "act_111,act_222").
  // Se consultan todas y se SUMAN, para ver el gasto/leads total de todos tus portafolios.
  const accounts = acctRaw.split(",").map(a => a.trim()).filter(Boolean);

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
    // Si TODAS las cuentas fallaron, es un error real; si solo algunas, devolvemos el total parcial.
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
