/* jcm_shared.js — JC Medical v2 · Módulo compartido (datos, auth, noticias, YouTube) */
'use strict';

// ── WhatsApp: en COMPUTADOR forzar WhatsApp WEB (web.whatsapp.com) en vez de abrir la app de
// escritorio. Se reescriben al vuelo tanto los window.open(...) como los <a href> hacia wa.me /
// api.whatsapp.com, sin tocar los ~15 sitios que generan links. En el TELÉFONO se deja wa.me
// (abre la app nativa), detectado por el user-agent. ──
(function () {
  try {
    var ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
    var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
    // Helper público para construir el link directo a WhatsApp Web (computador) o app (móvil).
    window.jcmWaUrl = function (phone, text) {
      var num = ('' + (phone == null ? '' : phone)).replace(/\D/g, '');
      var u = isMobile ? ('https://wa.me/' + num) : ('https://web.whatsapp.com/send?phone=' + num);
      if (text) u += (isMobile ? '?text=' : '&text=') + encodeURIComponent(text);
      return u;
    };
    if (isMobile) return; // en móvil no se reescribe nada (se abre la app)
    function toWeb(url) {
      if (!url || typeof url !== 'string') return url;
      var m = url.match(/wa\.me\/(\d+)(?:\?text=([^&#]*))?/i);
      if (m) { var u = 'https://web.whatsapp.com/send?phone=' + m[1]; if (m[2]) u += '&text=' + m[2]; return u; }
      if (/api\.whatsapp\.com\/send/i.test(url)) return url.replace(/https?:\/\/api\.whatsapp\.com\/send/i, 'https://web.whatsapp.com/send');
      return url;
    }
    var _open = window.open;
    window.open = function (u, name, feat) { return _open.call(window, toWeb(u), name, feat); };
    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('click', function (e) {
        var t = e.target;
        var a = (t && t.closest) ? t.closest('a[href]') : null;
        if (!a) return;
        var href = a.getAttribute('href') || '';
        if (/wa\.me\/|api\.whatsapp\.com\/send/i.test(href)) {
          var web = toWeb(href);
          if (web && web !== href) a.setAttribute('href', web);
        }
      }, true);
    }
  } catch (e) {}
})();

// ── CAPA DE DATOS (localStorage compartida entre app y admin) ──────────────
const DB = {
  _k: k => 'jcm_' + k,
  get(k)    { try { return JSON.parse(localStorage.getItem(this._k(k))); } catch(e) { return null; } },
  set(k, v) {
    try { localStorage.setItem(this._k(k), JSON.stringify(v)); return v; }
    catch(e) {
      // C-06: NO fallar en silencio. Antes se avisaba UNA sola vez (_storageWarned) → tras el primer
      // fallo todo guardado siguiente era 100% mudo y el "✓ Guardado" salía igual, con el dato perdido
      // (cuota llena / navegación privada). Ahora se avisa en CADA fallo (con un throttle corto para
      // no spamear el alert) para que el usuario SIEMPRE sepa que ese dato NO quedó guardado.
      try { console.error('[JCM] No se pudo guardar "' + k + '" en este dispositivo:', e); } catch(_) {}
      try {
        var _t = Date.now();
        if (typeof window !== 'undefined' && window.alert && (_t - (this._lastStorageWarn || 0) > 4000)) {
          this._lastStorageWarn = _t;
          window.alert('⚠ No se pudo guardar "' + k + '" en este dispositivo (almacenamiento lleno o navegación privada). El dato NO quedó guardado: anótalo y reintenta, o usa otro navegador.');
        }
      } catch(_) {}
      return null;
    }
  },
  del(k)    { localStorage.removeItem(this._k(k)); },
  cfg()     {
    const def = {
      pts_start:   500,
      pts_daily_cap: 2000,
      reward_cost: 60000,
      // Datos de la clínica: vacíos por defecto (cada clínica carga los suyos en el onboarding/Configuración).
      // JC Medical (clínica base) recibe sus datos reales sembrados al entrar (ver scopeClinicData).
      clinic_name: '',
      wa_number:   '',
      clinic_addr: '',
      clinic_hours:'',
      yt_api_key:  '',  // YouTube Data API v3 — para estadísticas reales de videos
      firebase_config: '',  // Config web de Firebase (JSON) — activa la base de datos compartida en la nube
      // Plantillas de mensajes de WhatsApp propias de la clínica (editables en el panel móvil,
      // Reportes → Plantillas de mensajes). Vacías = se usa el texto predeterminado (ver más abajo).
      msg_tpl_confirm: '',
      msg_tpl_asist: ''
    };
    // Combina con lo guardado para que claves nuevas siempre tengan default.
    return Object.assign(def, this.get('config') || {});
  }
};

// ── PLANTILLAS DE MENSAJES DE WHATSAPP (editables por clínica) ─────────────────────────────
// Cada clínica puede escribir su propio texto (panel móvil, Reportes → Plantillas de mensajes),
// guardado en DB.cfg().msg_tpl_confirm / msg_tpl_asist. Si no hay uno guardado se usa este texto
// por defecto — MISMO texto para portal de escritorio y panel móvil (una sola fuente de verdad).
const DEFAULT_TPL_CONFIRM = "Hola {primernombre} 👋\n\nTu cita en {clinica} quedó confirmada:\n\n🗓️ Fecha: {fecha}\n⏰ Hora: {hora} hrs\n💉 Tratamiento: {tratamiento}\n👨‍⚕️ Profesional: {profesional}\n📍 Dirección: {direccion}\n\n🏥 Cómo llegar: {mapa}\n\nRecuerda llegar 5 min antes. Si necesitas reagendar, avísanos con 24 h de anticipación.{politica}\n\n¡Nos vemos pronto!";
const DEFAULT_TPL_ASIST = "Hola {primernombre}!\n\nTe escribimos de {clinica} para confirmar tu asistencia a tu cita el {fecha} a las {hora} hrs ({tratamiento}).\n\n¿Nos confirmas? Responde *SÍ* para confirmar o *NO* si necesitas reagendar\n\nCómo llegar: {mapa}\n\n¡Te esperamos!";
// Campaña de re-cita (Pacientes → Campañas de re-cita por WhatsApp, portal de escritorio): invita a
// renovar toxina/Sculptra/rinomodelación cuando se cumple el plazo. {precio_linea} es una sola
// frase opcional ya armada (viene vacía si el procedimiento no tiene precio, ej. rinomodelación) —
// no hace falta escribirla, se arma sola con el precio real y el descuento configurado en
// Configuración → Plantillas → "Descuento de re-cita".
const DEFAULT_TPL_RECITA = "Hola {primernombre}, te saludamos de {clinica}. {mensaje}.{precio_linea} ¿Te gustaría gestionar tu hora?";
// Tokens disponibles por plantilla, para mostrarlos en el editor (panel móvil).
const TPL_TOKENS = {
  msg_tpl_confirm: [
    { k: "nombre",       d: "Nombre completo del paciente" },
    { k: "primernombre", d: "Solo el primer nombre (más personal)" },
    { k: "clinica",      d: "Nombre de la clínica" },
    { k: "fecha",        d: "Fecha (Sáb 11 Jul)" },
    { k: "hora",         d: "Hora (13:45)" },
    { k: "tratamiento",  d: "Tratamiento" },
    { k: "profesional",  d: "Profesional" },
    { k: "direccion",    d: "Dirección de la clínica" },
    { k: "mapa",         d: "Link “Cómo llegar”" },
    { k: "politica",     d: "Política de reagendamiento pagado (se agrega sola solo en controles — no hace falta escribirla)" }
  ],
  msg_tpl_asist: [
    { k: "nombre",       d: "Nombre completo del paciente" },
    { k: "primernombre", d: "Solo el primer nombre (más personal)" },
    { k: "clinica", d: "Nombre de la clínica" },
    { k: "fecha",   d: "Fecha (sábado 11 de julio)" },
    { k: "hora",    d: "Hora (13:45)" },
    { k: "tratamiento", d: "Tratamiento" },
    { k: "mapa",    d: "Link “Cómo llegar”" }
  ],
  msg_tpl_recita: [
    { k: "primernombre", d: "Solo el primer nombre" },
    { k: "clinica",      d: "Nombre de la clínica" },
    { k: "mensaje",      d: "Frase del procedimiento (ej. \"Tu siguiente sesión de Sculptra…\") — se arma sola" },
    { k: "precio_linea", d: "Frase con el precio y el descuento — se arma sola (vacía si el procedimiento no tiene precio, ej. rinomodelación)" }
  ]
};
// Rellena una plantilla: reemplaza cada {token} por su valor (string vacío si no viene).
function fillMsgTpl(tpl, vars) {
  return String(tpl == null ? "" : tpl).replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : ""));
}
window.DEFAULT_TPL_CONFIRM = DEFAULT_TPL_CONFIRM;
window.DEFAULT_TPL_ASIST = DEFAULT_TPL_ASIST;
window.DEFAULT_TPL_RECITA = DEFAULT_TPL_RECITA;
window.TPL_TOKENS = TPL_TOKENS;
window.fillMsgTpl = fillMsgTpl;

// ── SEGURIDAD ──────────────────────────────────────────────────────────────
const _JCM_SALT = 'jcm_medical_talca_2026_v2';

// Hash NUEVO: genera un salt aleatorio por usuario y lo devuelve junto al hash (formato v:2).
async function jcmHashNew(password) {
  try {
    const enc = new TextEncoder();
    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    const saltB64 = btoa(String.fromCharCode(...saltBytes));
    const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: saltBytes, iterations: 100000, hash: 'SHA-256' },
      key, 256
    );
    const hash = btoa(String.fromCharCode(...new Uint8Array(bits)));
    return { hash, salt: saltB64, v: 2 };
  } catch(e) { return null; }
}

// Hash de verificación. Con saltB64 (cuentas v:2) usa ese salt; sin él, usa el salt fijo legacy
// para seguir validando cuentas creadas antes de este cambio (retrocompatibilidad).
async function jcmHash(password, saltB64) {
  try {
    const enc = new TextEncoder();
    const saltBytes = saltB64
      ? Uint8Array.from(atob(saltB64), c => c.charCodeAt(0))
      : enc.encode(_JCM_SALT);
    const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: saltBytes, iterations: 100000, hash: 'SHA-256' },
      key, 256
    );
    return btoa(String.fromCharCode(...new Uint8Array(bits)));
  } catch(e) { return null; }
}

function jcmSanitize(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ── RUT CHILENO (formato 20.090.534-2 + validación módulo 11) ───────────────
// Formatea progresivamente mientras se escribe: solo dígitos + K como verificador.
function jcmFmtRut(v) {
  // Solo dígitos y las letras K y X (dígito verificador K · X para RUT provisorio/extranjero).
  let s = (v || '').toString().toUpperCase().replace(/[^0-9KX]/g, '');
  if (!s) return '';
  if (s.length > 9) s = s.slice(0, 9); // 8 dígitos cuerpo + 1 verificador
  const dv = s.slice(-1);
  let cuerpo = s.slice(0, -1);
  if (!cuerpo) return dv; // aún escribiendo el primer dígito
  // Puntos cada 3 desde la derecha.
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return cuerpo + '-' + dv;
}
// Valida un RUT chileno completo (con o sin formato). Devuelve true/false.
function jcmValidRut(v) {
  const s = (v || '').toString().toUpperCase().replace(/[^0-9K]/g, '');
  if (s.length < 2) return false;
  const cuerpo = s.slice(0, -1), dv = s.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;
  let suma = 0, mul = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) { suma += parseInt(cuerpo[i], 10) * mul; mul = mul === 7 ? 2 : mul + 1; }
  const res = 11 - (suma % 11);
  const dvCalc = res === 11 ? '0' : res === 10 ? 'K' : String(res);
  return dvCalc === dv;
}
if (typeof window !== 'undefined') { window.jcmFmtRut = jcmFmtRut; window.jcmValidRut = jcmValidRut; }

// ── IMPRESIÓN CONFIABLE (imprime SIEMPRE el documento, nunca la pantalla) ─────
// Recibe un documento HTML completo y lo imprime. En iOS/iPadOS un iframe oculto
// hace que Safari imprima la PÁGINA PADRE (la app) en lugar del documento; por eso
// en iOS abrimos el documento en una pestaña nueva (gesto del usuario) y disparamos
// la impresión dentro de esa pestaña, que es lo único confiable en Safari móvil.
function jcmIsIOS() {
  try {
    const ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS se reporta como Mac
  } catch (e) { return false; }
}
function jcmPrintHTML(html) {
  // iOS / iPadOS → pestaña nueva con auto-impresión (evita imprimir la app)
  if (jcmIsIOS()) {
    try {
      const w = window.open('', '_blank');
      if (w) {
        const withPrint = /<\/body>/i.test(html)
          ? html.replace(/<\/body>/i, "<script>window.onload=function(){setTimeout(function(){window.focus();window.print();},350);};<\/script></body>")
          : html + "<script>window.onload=function(){setTimeout(function(){window.focus();window.print();},350);};<\/script>";
        w.document.open(); w.document.write(withPrint); w.document.close();
        return true;
      }
    } catch (e) {}
    // si el navegador bloqueó la pestaña, cae al método iframe de abajo
  }
  try {
    const clean = html.replace(/<script[\s\S]*?<\/script>/gi, ''); // el print lo disparamos nosotros
    const ifr = document.createElement('iframe');
    ifr.setAttribute('aria-hidden', 'true');
    ifr.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;';
    document.body.appendChild(ifr);
    const doc = ifr.contentWindow.document;
    doc.open(); doc.write(clean); doc.close();
    const fire = () => { try { ifr.contentWindow.focus(); ifr.contentWindow.print(); } catch (e) {} setTimeout(() => { try { document.body.removeChild(ifr); } catch (e) {} }, 1500); };
    if (ifr.contentWindow.document.readyState === 'complete') setTimeout(fire, 300);
    else ifr.onload = () => setTimeout(fire, 300);
    return true;
  } catch (e) {
    try { const w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); return true; } } catch (_) {}
    return false;
  }
}
if (typeof window !== 'undefined') { window.jcmPrintHTML = jcmPrintHTML; window.jcmIsIOS = jcmIsIOS; }

// ── IDs ÚNICOS (UUID) ────────────────────────────────────────────────────────
// Identificador único y a prueba de colisiones para cada entidad (paciente, cita,
// servicio, etc.). Usa crypto.randomUUID cuando está disponible; si no, timestamp + azar.
function jcmUid(prefix) {
  var id;
  try { if (window.crypto && crypto.randomUUID) id = crypto.randomUUID(); } catch (e) {}
  if (!id) id = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
  return (prefix ? prefix + '_' : '') + id;
}
if (typeof window !== 'undefined') window.jcmUid = jcmUid;

/* Dominio público para enlaces (reserva/colaboración/reseña): el panel vive en
 * portal.medique.cl y el admin en admin.medique.cl, pero esas páginas públicas viven
 * en medique.cl. Desde esos subdominios devolvemos medique.cl; en el resto, el origen actual. */
if (typeof window !== 'undefined') window.jcmPubBase = function () {
  try { var h = location.hostname; return (h === 'portal.medique.cl' || h === 'admin.medique.cl') ? 'https://medique.cl' : location.origin; }
  catch (e) { return (typeof location !== 'undefined') ? location.origin : ''; }
};

// ── FEEDBACK GLOBAL (toasts de guardado + errores en modo debug) ─────────────
// jcmToast(texto, tipo) → 'ok' | 'error' | 'info'. Confirmación visual reutilizable
// desde cualquier vista. En errores muestra el mensaje/código exacto (fase de pruebas).
function jcmToast(text, type) {
  try {
    if (typeof document === 'undefined') return;
    var host = document.getElementById('jcm-toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'jcm-toast-host';
      host.setAttribute('aria-live', 'polite');
      host.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:99999;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none;max-width:92vw';
      document.body.appendChild(host);
    }
    var ok = type === 'error' ? false : true;
    var bg = type === 'error' ? '#C0285A' : (type === 'info' ? '#324657' : '#1F8A5B');
    var el = document.createElement('div');
    el.style.cssText = 'pointer-events:auto;font-family:Jost,system-ui,sans-serif;font-size:13.5px;color:#fff;background:' + bg + ';border-radius:10px;padding:12px 18px;box-shadow:0 8px 28px -8px rgba(0,0,0,.5);opacity:0;transform:translateY(8px);transition:opacity .25s,transform .25s;max-width:520px;line-height:1.4';
    el.textContent = (ok ? '✓ ' : '⚠ ') + text;
    host.appendChild(el);
    requestAnimationFrame(function () { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
    setTimeout(function () { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; setTimeout(function () { try { host.removeChild(el); } catch (e) {} }, 300); }, type === 'error' ? 6000 : 2600);
  } catch (e) {}
}
// jcmError(contexto, err) → toast de error con el detalle exacto (código/mensaje).
function jcmError(context, err) {
  var detail = '';
  try { detail = err ? (err.code || err.message || (typeof err === 'string' ? err : JSON.stringify(err))) : ''; } catch (e) { detail = String(err); }
  try { console.error('[Medique] ' + context, err); } catch (e) {}
  jcmToast(context + (detail ? ' — ' + detail : ''), 'error');
}
if (typeof window !== 'undefined') { window.jcmToast = jcmToast; window.jcmError = jcmError; }

// ── DIÁLOGO DE CONFIRMACIÓN PERSONALIZADO ─────────────────────────────────────
// jcmConfirm(msg, opts?) → Promise<boolean>
// opts: { title, okText, cancelText, danger }
function jcmConfirm(msg, opts) {
  opts = opts || {};
  return new Promise(function(resolve) {
    try {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:99998;display:flex;align-items:center;justify-content:center;background:rgba(7,7,7,.70);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);opacity:1;transition:opacity .18s';
      var box = document.createElement('div');
      box.style.cssText = 'background:#17171a;border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:26px 26px 20px;width:min(340px,92vw);font-family:\'Jost\',-apple-system,BlinkMacSystemFont,sans-serif;box-shadow:0 24px 64px -16px rgba(0,0,0,.75);transform:translateY(0);transition:transform .18s,opacity .18s';
      if (opts.title) {
        var h = document.createElement('div');
        h.style.cssText = 'font-size:15px;font-weight:600;color:#f0ede8;margin-bottom:8px;letter-spacing:.01em';
        h.textContent = opts.title;
        box.appendChild(h);
      }
      var p = document.createElement('div');
      p.style.cssText = 'font-size:13.5px;color:rgba(240,237,232,.65);line-height:1.55;margin-bottom:22px';
      p.textContent = msg;
      box.appendChild(p);
      var btns = document.createElement('div');
      btns.style.cssText = 'display:flex;gap:10px;justify-content:flex-end';
      var cancel = document.createElement('button');
      cancel.textContent = opts.cancelText || 'Cancelar';
      cancel.style.cssText = 'padding:9px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:transparent;color:rgba(240,237,232,.7);font-family:Jost,inherit;font-size:13px;font-weight:400;cursor:pointer;transition:background .15s';
      cancel.onmouseover = function(){this.style.background='rgba(255,255,255,.07)'};
      cancel.onmouseout = function(){this.style.background='transparent'};
      var ok = document.createElement('button');
      ok.textContent = opts.okText || (opts.danger ? 'Eliminar' : 'Confirmar');
      var okBg = opts.danger ? '#9B1C3A' : '#2E6B52';
      ok.style.cssText = 'padding:9px 22px;border-radius:10px;border:none;background:'+okBg+';color:#fff;font-family:Jost,inherit;font-size:13px;font-weight:500;cursor:pointer;letter-spacing:.02em;transition:filter .15s';
      ok.onmouseover = function(){this.style.filter='brightness(1.18)'};
      ok.onmouseout = function(){this.style.filter='none'};
      function cleanup(result) {
        try { overlay.style.opacity = '0'; setTimeout(function(){ try { document.body.removeChild(overlay); } catch(e){} }, 200); } catch(e) {}
        resolve(result);
      }
      cancel.onclick = function(){ cleanup(false); };
      ok.onclick = function(){ cleanup(true); };
      overlay.onclick = function(e){ if (e.target === overlay) cleanup(false); };
      function onKey(e) {
        if (e.key === 'Escape'){ document.removeEventListener('keydown', onKey); cleanup(false); }
        if (e.key === 'Enter'){ document.removeEventListener('keydown', onKey); cleanup(true); }
      }
      document.addEventListener('keydown', onKey);
      btns.appendChild(cancel);
      btns.appendChild(ok);
      box.appendChild(btns);
      overlay.appendChild(box);
      document.body.appendChild(overlay);
      setTimeout(function(){ ok.focus(); }, 60);
    } catch(e) { resolve(window.confirm(msg)); }
  });
}
if (typeof window !== 'undefined') window.jcmConfirm = jcmConfirm;

// ── CLIENTE DEL AGENTE IA (Groq vía /api/ai; la key vive en el servidor) ─────
// Devuelve una promesa con la respuesta sugerida del asistente. Si no está configurado
// (sin GROQ_API_KEY en el servidor) resuelve { ok:false, configured:false }.
// opts (opcional): { system: '<prompt propio>', max_tokens: <n> } — p.ej. el Copiloto de evaluación facial.
function mediqueAI(messages, clinic, opts) {
  try {
    opts = opts || {};
    if (typeof opts === 'string') opts = { system: opts }; // permite pasar el system directo como 3er arg
    var headers = { 'Content-Type': 'application/json' };
    if (typeof window !== 'undefined' && window.JCM_API_KEY) headers['x-jcm-key'] = window.JCM_API_KEY;
    // El endpoint exige el ID token de Firebase del usuario logueado (no es secreto, dura 1h).
    var tokP = (typeof window !== 'undefined' && window.JCSAAS && window.JCSAAS.idToken) ? window.JCSAAS.idToken() : Promise.resolve(null);
    return Promise.resolve(tokP).then(function (tok) {
      if (tok) headers['Authorization'] = 'Bearer ' + tok;
      var payload = { messages: messages || [], clinic: clinic || {} };
      if (opts.system) payload.system = opts.system;
      if (opts.max_tokens) payload.max_tokens = opts.max_tokens;
      return fetch('/api/ai', { method: 'POST', headers: headers, body: JSON.stringify(payload) });
    }).then(function (r) { return r.json().catch(function () { return { ok: false, error: 'Respuesta inválida' }; }); })
      .catch(function (e) { return { ok: false, error: (e && e.message) || 'sin conexión' }; });
  } catch (e) { return Promise.resolve({ ok: false, error: 'sin conexión' }); }
}
if (typeof window !== 'undefined') window.mediqueAI = mediqueAI;

// ── CLIENTE DE CORREO (/api/email; envío real vía Resend, key en el servidor) ──
// mediqueEmail({ to, subject, text, replyTo?, clinic? }) → Promise { ok, id } | { ok:false, error, configured? }
// Si no está configurado (sin RESEND_API_KEY) resuelve { ok:false, configured:false }.
function mediqueEmail(opts) {
  try {
    opts = opts || {};
    var tokP = (typeof window !== 'undefined' && window.JCSAAS && window.JCSAAS.idToken) ? window.JCSAAS.idToken() : Promise.resolve(null);
    return Promise.resolve(tokP).then(function (tok) {
      var headers = { 'Content-Type': 'application/json' };
      if (tok) headers['Authorization'] = 'Bearer ' + tok;
      if (typeof window !== 'undefined' && window.JCM_API_KEY) headers['x-jcm-key'] = window.JCM_API_KEY;
      // Adjunta el nombre de la clínica para la plantilla, si está disponible.
      var clinic = opts.clinic || (function () { try { return { name: (window.DB && DB.cfg().clinic_name) || '' }; } catch (e) { return {}; } })();
      var body = { to: opts.to, subject: opts.subject, text: opts.text, replyTo: opts.replyTo, clinic: clinic };
      if (opts.attachments) body.attachments = opts.attachments;
      return fetch('/api/email', { method: 'POST', headers: headers, body: JSON.stringify(body) });
    }).then(function (r) { return r.json().catch(function () { return { ok: false, error: 'Respuesta inválida' }; }); })
      .catch(function (e) { return { ok: false, error: (e && e.message) || 'sin conexión' }; });
  } catch (e) { return Promise.resolve({ ok: false, error: 'sin conexión' }); }
}
if (typeof window !== 'undefined') window.mediqueEmail = mediqueEmail;

// ── CLIENTE META ADS (/api/meta; lee gasto/leads/campañas reales con el token de la clínica) ──
// mediqueMeta({ preset?, campaigns? }) → Promise { ok, spend, reach, leads, campaigns:[...] } | { ok:false, configured?, error }
// Usa las credenciales guardadas por clínica en DB 'meta_creds' (token ads_read + cuenta act_…).
function mediqueMeta(opts) {
  try {
    opts = opts || {};
    var creds = {}; try { creds = (typeof window !== 'undefined' && window.DB && window.DB.get('meta_creds')) || {}; } catch (e) {}
    var tokP = (typeof window !== 'undefined' && window.JCSAAS && window.JCSAAS.idToken) ? window.JCSAAS.idToken() : Promise.resolve(null);
    return Promise.resolve(tokP).then(function (tok) {
      var headers = { 'Content-Type': 'application/json' };
      if (tok) headers['Authorization'] = 'Bearer ' + tok;
      var payload = { preset: opts.preset || 'this_month' };
      if (opts.campaigns) payload.campaigns = true;
      if (creds.token && creds.account) { payload.token = creds.token; payload.account = creds.account; }
      return fetch('/api/meta', { method: 'POST', headers: headers, body: JSON.stringify(payload) });
    }).then(function (r) { return r.json().catch(function () { return { ok: false, error: 'Respuesta inválida' }; }); })
      .catch(function (e) { return { ok: false, error: (e && e.message) || 'sin conexión' }; });
  } catch (e) { return Promise.resolve({ ok: false, error: 'sin conexión' }); }
}
if (typeof window !== 'undefined') window.mediqueMeta = mediqueMeta;

// ── CLIENTE CALENDARIO SUSCRIBIBLE (/api/calendar) ──
// Pide al servidor las URLs de suscripción del calendario de la clínica — una por categoría
// (procedimiento/evaluación), para que cada una se pueda colorear distinto en Google/Apple/Outlook.
// → Promise { ok, categorias: { procedimiento:{label,url,webcal}, evaluacion:{...} } } | { ok:false, configured?, error }
function mediqueCalendarLink() {
  try {
    var cid = (typeof window !== 'undefined' && window.JCSAAS && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId()) || '';
    var tokP = (typeof window !== 'undefined' && window.JCSAAS && window.JCSAAS.idToken) ? window.JCSAAS.idToken() : Promise.resolve(null);
    return Promise.resolve(tokP).then(function (tok) {
      var headers = { 'Content-Type': 'application/json' };
      if (tok) headers['Authorization'] = 'Bearer ' + tok;
      return fetch('/api/calendar', { method: 'POST', headers: headers, body: JSON.stringify({ clinicId: cid }) });
    }).then(function (r) { return r.json().catch(function () { return { ok: false, error: 'Respuesta inválida' }; }); })
      .catch(function (e) { return { ok: false, error: (e && e.message) || 'sin conexión' }; });
  } catch (e) { return Promise.resolve({ ok: false, error: 'sin conexión' }); }
}
if (typeof window !== 'undefined') window.mediqueCalendarLink = mediqueCalendarLink;

// ── CLIENTE 2FA por email (/api/otp). Envía el ID token de Firebase del usuario. ──
function mediqueOtp(action, extra) {
  try {
    var tokP = (typeof window !== 'undefined' && window.JCSAAS && window.JCSAAS.idToken) ? window.JCSAAS.idToken() : Promise.resolve(null);
    return Promise.resolve(tokP).then(function (tok) {
      var headers = { 'Content-Type': 'application/json' };
      if (tok) headers['Authorization'] = 'Bearer ' + tok;
      var body = Object.assign({ action: action }, extra || {});
      return fetch('/api/otp', { method: 'POST', headers: headers, body: JSON.stringify(body) });
    }).then(function (r) { return r.json().catch(function () { return { ok: false, error: 'Respuesta inválida' }; }); })
      .catch(function (e) { return { ok: false, error: (e && e.message) || 'sin conexión' }; });
  } catch (e) { return Promise.resolve({ ok: false, error: 'sin conexión' }); }
}
if (typeof window !== 'undefined') window.mediqueOtp = mediqueOtp;

// ── CLIENTE PORTAL DEL PACIENTE · acciones del ADMIN (activate/revoke/status). Envía el ID token de
// Firebase. El endpoint vive fusionado en /api/team-access (acciones "portal-*") para no exceder el
// límite de funciones de Vercel. → Promise { ok, ... } | { ok:false, error, configured? }
function mediquePortal(action, extra) {
  try {
    var tokP = (typeof window !== 'undefined' && window.JCSAAS && window.JCSAAS.idToken) ? window.JCSAAS.idToken() : Promise.resolve(null);
    return Promise.resolve(tokP).then(function (tok) {
      var headers = { 'Content-Type': 'application/json' };
      if (tok) headers['Authorization'] = 'Bearer ' + tok;
      var body = Object.assign({ action: 'portal-' + action }, extra || {});
      return fetch('/api/team-access', { method: 'POST', headers: headers, body: JSON.stringify(body) });
    }).then(function (r) { return r.json().catch(function () { return { ok: false, error: 'Respuesta inválida' }; }); })
      .catch(function (e) { return { ok: false, error: (e && e.message) || 'sin conexión' }; });
  } catch (e) { return Promise.resolve({ ok: false, error: 'sin conexión' }); }
}
if (typeof window !== 'undefined') window.mediquePortal = mediquePortal;

// ── SESIÓN (8 h de TTL) ────────────────────────────────────────────────────
const _SESS_KEY = 'jcm_session';
const _SESS_TTL = 8 * 3600 * 1000;

function jcmGetSession() {
  try {
    const s = JSON.parse(sessionStorage.getItem(_SESS_KEY));
    if (s && Date.now() - s._ts < _SESS_TTL) return s;
    sessionStorage.removeItem(_SESS_KEY);
  } catch(e) {}
  return null;
}

function jcmSaveSession(user) {
  const s = { ...user, _ts: Date.now() };
  delete s.hash;
  sessionStorage.setItem(_SESS_KEY, JSON.stringify(s));
  return s;
}

function jcmEndSession() { sessionStorage.removeItem(_SESS_KEY); }

// ── AUTENTICACIÓN ──────────────────────────────────────────────────────────
// Contador en sessionStorage: persiste a través de refrescos del tab (evita bypass
// trivial de brute-force reiniciando la página). Se limpia al cerrar el navegador.
const _loginAttempts = {};
function _attGet(key) {
  try { return JSON.parse(sessionStorage.getItem('jcm_att_' + key) || 'null') || { n: 0, t: 0 }; } catch (e) { return { n: 0, t: 0 }; }
}
function _attSet(key, v) {
  try { sessionStorage.setItem('jcm_att_' + key, JSON.stringify(v)); } catch (e) { _loginAttempts[key] = v; }
}
function _attReset(key) {
  try { sessionStorage.removeItem('jcm_att_' + key); } catch (e) {} delete _loginAttempts[key];
}

// Normaliza un teléfono a solo dígitos (identificador de cuenta).
function jcmPhoneKey(p) { return (p || '').replace(/\D/g, ''); }

// Registro con TELÉFONO + contraseña (el correo es opcional).
async function jcmRegister(name, phone, password, email) {
  if (!name || name.trim().length < 2)       return { ok:false, msg:'Ingresa tu nombre completo.' };
  const ph = jcmPhoneKey(phone);
  if (ph.length < 8)                         return { ok:false, msg:'Ingresa un número de teléfono válido (al menos 8 dígitos).' };
  if (!password || password.length < 6)      return { ok:false, msg:'La contraseña debe tener al menos 6 caracteres.' };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok:false, msg:'El correo no es válido (o déjalo en blanco).' };

  const em    = (email || '').toLowerCase().trim();
  const users = DB.get('users') || [];
  if (users.find(u => jcmPhoneKey(u.phone) === ph)) return { ok:false, msg:'Este teléfono ya está registrado. ¿Quieres iniciar sesión?' };

  const h = await jcmHashNew(password);
  if (!h) return { ok:false, msg:'Error interno. Intenta nuevamente.' };

  const cfg  = DB.cfg();
  const user = {
    id:          Date.now().toString(36) + Math.random().toString(36).substr(2,4),
    name:        name.trim(),
    phone:       phone.trim(),
    email:       em,
    hash:        h.hash,
    salt:        h.salt,
    v:           h.v,
    points:      cfg.pts_start || 500,
    bonus_given: true,
    created:     new Date().toISOString(),
    redeems:     []
  };
  users.push(user);
  DB.set('users', users);
  // Enviar a Firestore para que el panel lo vea (requiere regla Firestore en appusers)
  try { if (window.JCSAAS && window.JCSAAS.submitAppUser) window.JCSAAS.submitAppUser({ name: user.name, phone: user.phone, email: user.email, points: user.points, created: user.created }); } catch (e) {}
  return { ok:true, user };
}

// Login con TELÉFONO + contraseña (acepta correo de cuentas antiguas).
async function jcmLogin(phone, password) {
  const ph  = jcmPhoneKey(phone);
  const em  = (phone || '').toLowerCase().trim();
  const key = ph || em;
  const att = _attGet(key);

  if (att.n >= 5 && Date.now() - att.t < 15 * 60 * 1000)
    return { ok:false, msg:'Demasiados intentos fallidos. Espera 15 minutos.' };

  const users = DB.get('users') || [];
  const user  = users.find(u => (ph && jcmPhoneKey(u.phone) === ph) || (em && u.email === em));
  if (!user) {
    _attSet(key, { n: att.n + 1, t: Date.now() });
    return { ok:false, msg:'Teléfono no registrado.' };
  }

  const hash = await jcmHash(password, user.v === 2 ? user.salt : null);
  if (!hash || hash !== user.hash) {
    _attSet(key, { n: att.n + 1, t: Date.now() });
    return { ok:false, msg:'Contraseña incorrecta.' };
  }

  _attReset(key);
  // Sincronizar con Firestore en cada login (sube usuarios existentes que nunca llegaron)
  try { if (window.JCSAAS && window.JCSAAS.submitAppUser) window.JCSAAS.submitAppUser({ name: user.name, phone: user.phone, email: user.email, points: user.points, created: user.created }); } catch (e) {}
  return { ok:true, user };
}

function jcmUpdatePoints(userId, newPoints) {
  const users = DB.get('users') || [];
  const i = users.findIndex(u => u.id === userId);
  if (i >= 0) { users[i].points = Math.max(0, newPoints); DB.set('users', users); }
}

// ── ACCESO AL PANEL MÁSTER ──────────────────────────────────────────────────
// La contraseña no se guarda en claro: solo su hash PBKDF2 en localStorage.
// La primera vez que se abre el panel se pide crear la contraseña (mín. 8).
const _ADMIN_SESS_KEY = 'jcm_admin_sess';
const _ADMIN_SESS_TTL = 4 * 3600 * 1000;   // 4 h
const _ADMIN_ATT_KEY  = 'jcm_adm_att';
function _adminAttGet() { try { return JSON.parse(sessionStorage.getItem(_ADMIN_ATT_KEY) || 'null') || { n: 0, t: 0 }; } catch (e) { return { n: 0, t: 0 }; } }
function _adminAttSet(v) { try { sessionStorage.setItem(_ADMIN_ATT_KEY, JSON.stringify(v)); } catch (e) {} }
function _adminAttReset() { try { sessionStorage.removeItem(_ADMIN_ATT_KEY); } catch (e) {} }

function jcmAdminHasPass() { try { return !!DB.get('admin_pass'); } catch (e) { return false; } }
function jcmAdminUser() { try { const r = DB.get('admin_pass'); return (r && r.user) || ''; } catch (e) { return ''; } }

// Crea/actualiza las credenciales del panel: usuario + contraseña (solo hash).
async function jcmAdminSetPass(pass, user) {
  if (!user || user.trim().length < 3) return { ok: false, msg: 'El usuario debe tener al menos 3 caracteres.' };
  if (!pass || pass.length < 8) return { ok: false, msg: 'La contraseña debe tener al menos 8 caracteres.' };
  const h = await jcmHashNew(pass);
  if (!h) return { ok: false, msg: 'Error interno. Intenta nuevamente.' };
  DB.set('admin_pass', { user: user.trim(), hash: h.hash, salt: h.salt, v: h.v, created: new Date().toISOString() });
  jcmAdminStartSession();
  return { ok: true };
}

async function jcmAdminCheck(user, pass) {
  const att = _adminAttGet();
  if (att.n >= 5 && Date.now() - att.t < 15 * 60 * 1000)
    return { ok: false, msg: 'Demasiados intentos. Espera 15 minutos.' };
  const rec = DB.get('admin_pass');
  const hash = await jcmHash(pass || '', (rec && rec.v === 2) ? rec.salt : null);
  const userOk = !rec || !rec.user || (user || '').trim().toLowerCase() === (rec.user || '').toLowerCase();
  if (!rec || !hash || hash !== rec.hash || !userOk) {
    _adminAttSet({ n: att.n + 1, t: Date.now() });
    return { ok: false, msg: 'Usuario o contraseña incorrectos.' };
  }
  _adminAttReset();
  jcmAdminStartSession();
  return { ok: true };
}

function jcmAdminStartSession() { try { sessionStorage.setItem(_ADMIN_SESS_KEY, String(Date.now())); } catch (e) {} }
function jcmAdminHasSession() {
  try { const t = parseInt(sessionStorage.getItem(_ADMIN_SESS_KEY) || '0', 10); return t > 0 && Date.now() - t < _ADMIN_SESS_TTL; } catch (e) { return false; }
}
function jcmAdminEndSession() { try { sessionStorage.removeItem(_ADMIN_SESS_KEY); } catch (e) {} }
async function jcmAdminChangePass(oldPass, newPass) {
  const user = jcmAdminUser();
  const chk = await jcmAdminCheck(user, oldPass);
  if (!chk.ok) return chk;
  return jcmAdminSetPass(newPass, user);
}

// ── MIGRACIÓN: sube todos los usuarios del localStorage a Firestore appusers ──
// Se ejecuta una vez por dispositivo/browser cuando la app paciente está lista.
// Así los usuarios registrados antes del canal appusers aparecen en el panel.
(function () {
  var FLAG = 'jcm_appusers_pushed_v1';
  function push() {
    try {
      if (localStorage.getItem(FLAG)) return;
      if (!window.JCSAAS || !window.JCSAAS.submitAppUser) return;
      var users = (window.DB && window.DB.get('users')) || [];
      if (!users.length) return;
      users.forEach(function (u) {
        if (u.name || u.phone) {
          try { window.JCSAAS.submitAppUser({ name: u.name, phone: u.phone, email: u.email, points: u.points || 0, created: u.created }); } catch (e) {}
        }
      });
      localStorage.setItem(FLAG, String(Date.now()));
    } catch (e) {}
  }
  window.addEventListener('jcsaas:public', push, { once: true });
})();

// ── NOTICIAS RSS (caché 1 h) ───────────────────────────────────────────────
const _RSS_FEEDS = [
  'https://www.infosalus.com/rss/noticias.xml',
  'https://www.20minutos.es/rss/salud/'
];
const _RSS_API  = 'https://api.rss2json.com/v1/api.json?rss_url=';
const _NEWS_TTL = 3600000;

async function jcmFetchNews() {
  const cache = DB.get('news_cache');
  if (cache && Date.now() - cache.ts < _NEWS_TTL) return cache.items;

  for (const feed of _RSS_FEEDS) {
    try {
      const ctrl    = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 6000);
      const r       = await fetch(_RSS_API + encodeURIComponent(feed), { signal: ctrl.signal });
      clearTimeout(timeout);
      if (!r.ok) continue;

      const data = await r.json();
      if (!data.items?.length) continue;

      const items = data.items.slice(0, 10).map(item => ({
        cat:  'Novedades',
        tag:  jcmSanitize(item.categories?.[0] || 'Salud'),
        eyb:  'Actualidad',
        h:    jcmSanitize(item.title || ''),
        sub:  jcmSanitize((item.description || '').replace(/<[^>]*>/g,'').slice(0,150)),
        meta: (() => { try { return new Date(item.pubDate).toLocaleDateString('es-CL',{day:'numeric',month:'short'}); } catch(e) { return 'Hoy'; } })(),
        link: item.link || '#',
        img:  item.thumbnail || item.enclosure?.link ||
              ((item.description||'').match(/<img[^>]+src=["']([^"']+)["']/)||[])[1] || null
      }))
      .filter(it => it.h)
      // bloquear hrefs con esquemas peligrosos (javascript:, data:, vbscript:)
      .map(it => ({ ...it, link: /^https?:\/\//i.test(it.link || '') ? it.link : '#' }));

      if (items.length) {
        DB.set('news_cache', { ts: Date.now(), items });
        return items;
      }
    } catch(e) { continue; }
  }
  return null;
}

// ── YOUTUBE ───────────────────────────────────────────────────────────────
function jcmYtId(url) {
  if (!url) return null;
  const m = (url+'').match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

// Estadísticas reales de YouTube (views/likes) vía YouTube Data API v3.
// Necesita una API key (se configura en el panel admin). Cachea 24 h en
// jcm_yt_stats para no gastar cuota. Devuelve { id: {views, likes} } o null.
async function jcmYTStats(ids, apiKey) {
  if (!apiKey || !ids || !ids.length) return null;
  ids = ids.filter(Boolean);
  const c = DB.get('yt_stats');
  if (c && c.map && (Date.now() - c.ts) < 86400000 && ids.every(id => c.map[id] != null)) return c.map;
  const map = (c && c.map) ? Object.assign({}, c.map) : {};
  try {
    for (let i = 0; i < ids.length; i += 50) {
      const batch = ids.slice(i, i + 50).join(',');
      const r = await fetch('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + batch + '&key=' + encodeURIComponent(apiKey));
      if (!r.ok) return (c && c.map) || null;     // clave inválida / cuota: usa lo que haya
      const d = await r.json();
      (d.items || []).forEach(it => {
        map[it.id] = {
          views: +(it.statistics && it.statistics.viewCount || 0),
          likes: +(it.statistics && it.statistics.likeCount || 0)  // puede venir oculto (0) si el autor lo ocultó
        };
      });
    }
    DB.set('yt_stats', { ts: Date.now(), map });
    return map;
  } catch (e) { return (c && c.map) || null; }
}

// ── DATOS SEMILLA (solo si DB vacía) ──────────────────────────────────────
const _UNSP = id => 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=640&q=70';
const JCM_DEFAULT_ARTICLES = [
  {cat:'Novedades',tag:'Tendencias',eyb:'Actualidad · HOLA',h:'Las 6 tendencias de la medicina estética del futuro',sub:'De la prevención a los tratamientos exprés: lo que marca la pauta.',meta:'5 MIN',link:'https://www.hola.com/belleza/20251110865817/medicina-estetica-nuevos-tratamientos/',img:_UNSP('1512290923902-8a9f81dc236c')},
  {cat:'Novedades',tag:'Regeneración',eyb:'Investigación · Multiestética',h:'Exosomas: el nuevo elixir que revoluciona la belleza',sub:'Reparación celular, colágeno y elastina: qué dice la ciencia.',meta:'6 MIN',link:'https://www.multiestetica.com/articulos/exosomas/exosomas-el-nuevo-elixir-de-la-juventud-que-revoluciona-la-belleza-y-la-ciencia',img:_UNSP('1581594693702-fbdc51b2763b')},
  {cat:'Botox',tag:'Naturalidad',eyb:'Tendencia · Dr. Varela',h:'Botox suave: naturalidad, tecnología y prevención',sub:'Potenciar rasgos y mantener la expresión, sin congelar la cara.',meta:'4 MIN',link:'https://www.drjonathanvarela.com/%F0%9F%8C%9F-tendencias-en-medicina-estetica-2025-naturalidad-tecnologia-y-prevencion/',img:_UNSP('1570172619644-dfd03ed5d881')},
  {cat:'Botox',tag:'Más solicitados',eyb:'Procedimiento · Medivas',h:'Los tratamientos más solicitados del año',sub:'Ácido hialurónico, hilos tensores y bótox suave lideran.',meta:'4 MIN',link:'https://clinicamedivas.es/tratamientos-de-medicina-estetica-mas-solicitados-en-2025',img:_UNSP('1583001931096-959e9a1a6223')},
  {cat:'Colágeno',tag:'Sculptra',eyb:'Bioestimulación · El Vocero',h:'Bioestimuladores: rejuvenecer sin cirugía',sub:'Estimulan tu propio colágeno de forma progresiva y natural.',meta:'5 MIN',link:'https://www.elvocero.com/escenario/moda-y-belleza/bioestimuladores-de-col-geno-la-revoluci-n-en-el-rejuvenecimiento-facial-sin-cirug-a/article_a9efe629-1be0-4aff-bfd2-c51ce3ffc574.html',img:_UNSP('1598440947619-2c35fc9aa908')},
  {cat:'Colágeno',tag:'ADN de salmón',eyb:'Regeneración · Chic Magazine',h:'Polinucleótidos y exosomas: regenerar de adentro',sub:'Cómo combinar ambos activos para una piel más firme.',meta:'4 MIN',link:'https://www.chicmagazine.com.mx/estilo-de-vida/wellness/polinucleotidos-y-exosomas-en-medicina-estetica',img:_UNSP('1556228578-8c89e6adf883')},
  {cat:'Skincare',tag:'Rutina',eyb:'Skincare · ISDIN',h:'Rutina de skincare paso a paso',sub:'La constancia gana a la complejidad: esquema minimalista efectivo.',meta:'3 MIN',link:'https://www.isdin.com/es/blog/rutina-piel-sensible/',img:_UNSP('1556228720-195a672e8a03')},
  {cat:'Skincare',tag:'SPF',eyb:'Skincare · HOLA',h:'La técnica del "sunscreen sandwich"',sub:'Cómo aplicar el SPF para que realmente proteja tu piel.',meta:'3 MIN',link:'https://www.hola.com/us-es/belleza/20260526903709/tecnica-sunscreen-sandwich-aplicacion-proteccion-solar-spf/',img:_UNSP('1556228453-efd6c1ff04f6')}
];

// likes/views = engagement aproximado (curado). Solo se muestran videos con
// más de 10.000 me gusta y 10.000 reproducciones (ver buildVideos en JC_App).
const JCM_DEFAULT_VIDEOS = [
  {title:'Tratamiento de medicina estética con Bótox',src:'Medicina Estética',sub:'Resultados casi inmediatos, sin tiempo de recuperación.',url:'https://www.youtube.com/shorts/Dz-QVr00Br4',likes:18400,views:542000},
  {title:'Mi evolución real con Botox #glowup',src:'Estética Facial',sub:'Antes y después honesto: resultados reales 2025.',url:'https://www.youtube.com/shorts/FKQhF2FfgAY',likes:25100,views:803000},
  {title:'Botox: resultados antes y después',src:'Medicina Estética',sub:'Cómo se ve un bótox bien aplicado y natural.',url:'https://www.youtube.com/shorts/kRPGIoiFZwE',likes:12700,views:214000},
  {title:'Tendencias medicina estética 2025',src:'Educativo',sub:'Medicina regenerativa como nuevo pilar fundamental.',url:'https://www.youtube.com/shorts/5oiNrYASvD4',likes:31200,views:1240000},
  {title:'Botox vs Ácido Hialurónico',src:'Educativo',sub:'Diferencias clave para elegir bien tu tratamiento.',url:'https://www.youtube.com/shorts/L1ga2Khq32I',likes:47600,views:1610000},
  {title:'La nueva cara de la belleza · DW Documental',src:'Documental',sub:'El boom del ácido hialurónico — ciencia y contexto.',url:'https://www.youtube.com/watch?v=5n-kWpf0SOU',likes:14300,views:392000},
  {title:'Rejuvenecimiento facial con Botox',src:'Procedimiento',sub:'Antes y después con criterio clínico.',url:'https://www.youtube.com/watch?v=6wkDdsoELZE',likes:11200,views:163000},
  {title:'Beneficios de la Toxina Botulínica',src:'Educativo',sub:'Todo lo que debes saber sobre el procedimiento.',url:'https://www.youtube.com/watch?v=AqBjJzzzVng',likes:22800,views:611000},
  {title:'Rejuvenecimiento con Ácido Hialurónico + EGF',src:'Procedimiento',sub:'Combinación de activos para regeneración facial.',url:'https://www.youtube.com/watch?v=13fbO8iyFZs',likes:16400,views:284000},
  {title:'Antes y después de Botox: experiencia real',src:'Testimonio',sub:'Qué esperar, cómo se ve y cuánto dura.',url:'https://www.youtube.com/watch?v=6531ox1IFl0',likes:13100,views:241000}
];

// Sube esta versión cada vez que cambies los artículos/videos por defecto
// para refrescar el contenido en navegadores que ya tenían datos sembrados.
const JCM_SEED_VERSION = 4;

function jcmSeedIfEmpty() {
  const v = DB.get('seed_version') || 0;
  // Primera vez: sembrar todo.
  if (!DB.get('seeded')) {
    DB.set('articles', JCM_DEFAULT_ARTICLES);
    DB.set('videos',   JCM_DEFAULT_VIDEOS);
    DB.set('seeded', true);
    DB.set('seed_version', JCM_SEED_VERSION);
    return;
  }
  // Ya sembrado pero con contenido antiguo: refrescar defaults.
  // Solo refresca si el contenido actual NO fue editado por el admin
  // (lo detectamos comparando contra los defaults previos del propio seed).
  if (v < JCM_SEED_VERSION) {
    const arts = DB.get('articles');
    // Refresca si eran los antiguos (link '#') o si aún no tienen imagen.
    if (!arts || arts.length === 0 || arts.every(a => !a.link || a.link === '#') || arts.every(a => !a.img)) {
      DB.set('articles', JCM_DEFAULT_ARTICLES);
    }
    const vids = DB.get('videos');
    // Refresca si no tenían URL (antiguos) o si aún no traen métricas (views).
    if (!vids || vids.length === 0 || vids.every(x => !x.url) || vids.every(x => x.views == null)) {
      DB.set('videos', JCM_DEFAULT_VIDEOS);
    }
    DB.set('news_cache', null); // forzar recarga de noticias RSS
    DB.set('seed_version', JCM_SEED_VERSION);
  }
}

// Exponer DB en window para los componentes React (const no se adjunta solo).
try { window.DB = DB; } catch (e) {}

// ── Antiautocompletado de contactos de Chrome ─────────────────────────────
// Chrome rellena solo el correo/contacto en campos de texto sueltos (notas, montos,
// concepto…). Apagamos su autofill en TODO input/textarea, salvo los que declaran
// explícitamente su autocomplete (login/registro: usuario, correo, contraseña) y los
// de tipo password. Cubre los campos que React monta dinámicamente vía MutationObserver.
(function () {
  function harden(el) {
    if (!el || el.nodeType !== 1) return;
    var tag = el.tagName;
    if (tag !== 'INPUT' && tag !== 'TEXTAREA') return;
    if (el.type === 'password') return;            // credenciales: las gestiona el navegador
    if (el.hasAttribute('autocomplete')) return;   // ya lo define el componente (login/correo)
    el.setAttribute('autocomplete', 'off');
    el.setAttribute('autocorrect', 'off');
    el.setAttribute('autocapitalize', el.getAttribute('autocapitalize') || 'off');
  }
  function scan(root) {
    try {
      if (!root) return;
      harden(root);
      if (root.querySelectorAll) { var ns = root.querySelectorAll('input,textarea'); for (var i = 0; i < ns.length; i++) harden(ns[i]); }
    } catch (e) {}
  }
  function start() {
    scan(document.body || document.documentElement);
    try {
      var mo = new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) {
          var an = muts[i].addedNodes; if (!an) continue;
          for (var j = 0; j < an.length; j++) scan(an[j]);
        }
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
