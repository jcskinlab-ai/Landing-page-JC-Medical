/*
 * Medique · Banner de consentimiento de cookies
 * ───────────────────────────────────────────────
 * Bloquea cualquier cookie/tecnología NO esencial (ej. Google Analytics) hasta que el
 * visitante elige explícitamente "Aceptar todas". Las cookies técnicas necesarias para
 * que la plataforma funcione (sesión, reCAPTCHA/App Check para prevenir fraude) no
 * requieren este consentimiento — están cubiertas como "interés legítimo/seguridad" en
 * la Política de Privacidad (sección 06 · Cookies y tecnologías).
 *
 * Uso en cada página pública: <script src="/cookie-consent.js?v=1"></script> antes de
 * </body>. Para gatear un script no esencial (ej. Google Analytics) cuando se agregue:
 *
 *   window.MedConsent.onAccept('analytics', function () {
 *     // cargar gtag/GA aquí — solo se ejecuta si el visitante aceptó "todas"
 *   });
 *
 * Si el visitante ya había aceptado en una visita anterior, el callback se dispara de
 * inmediato (no hace falta esperar a que vuelva a aparecer el banner).
 */
(function () {
  'use strict';
  var KEY = 'medique_cookie_consent';
  var pending = []; // callbacks registrados antes de que el usuario decida

  function readConsent() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function writeConsent(level) {
    try { localStorage.setItem(KEY, JSON.stringify({ level: level, ts: Date.now() })); } catch (e) {}
  }

  function runPending(level) {
    if (level !== 'all') return; // "essential" nunca dispara callbacks de analítica
    pending.forEach(function (fn) { try { fn(); } catch (e) {} });
    pending = [];
  }

  var current = readConsent();

  function injectStyle() {
    if (document.getElementById('med-consent-style')) return;
    var css =
      '#med-consent{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;justify-content:center;' +
      'padding:16px;font-family:Jost,ui-sans-serif,system-ui,sans-serif;animation:medConsentIn .35s ease both}' +
      '@keyframes medConsentIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}' +
      '#med-consent .box{width:100%;max-width:720px;background:#111113;color:#f7f3ec;border:1px solid rgba(244,239,232,.16);' +
      'border-radius:16px;padding:18px 20px;box-shadow:0 24px 60px -20px rgba(0,0,0,.6);display:flex;flex-direction:column;gap:14px}' +
      '@media(min-width:640px){#med-consent .box{flex-direction:row;align-items:center;gap:20px}}' +
      '#med-consent p{margin:0;font-size:13.5px;line-height:1.55;color:rgba(244,239,232,.82);font-weight:300;flex:1}' +
      '#med-consent a{color:#b6cadd;text-decoration:underline;text-underline-offset:2px}' +
      '#med-consent .btns{display:flex;gap:8px;flex-shrink:0}' +
      '#med-consent button{font-family:inherit;font-size:12.5px;font-weight:600;letter-spacing:.02em;padding:10px 16px;' +
      'border-radius:9px;cursor:pointer;white-space:nowrap;border:1px solid transparent}' +
      '#med-consent .accept{background:linear-gradient(180deg,#f6f2ea,#e4dccd);color:#12130f}' +
      '#med-consent .accept:hover{opacity:.92}' +
      '#med-consent .essential{background:transparent;border-color:rgba(244,239,232,.26);color:#f7f3ec}' +
      '#med-consent .essential:hover{background:rgba(255,255,255,.06)}';
    var style = document.createElement('style');
    style.id = 'med-consent-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function hideBanner() {
    var el = document.getElementById('med-consent');
    if (el) el.remove();
  }

  function showBanner() {
    if (document.getElementById('med-consent')) return;
    injectStyle();
    var el = document.createElement('div');
    el.id = 'med-consent';
    el.innerHTML =
      '<div class="box" role="dialog" aria-label="Preferencias de cookies">' +
        '<p>Usamos cookies técnicas necesarias para que Medique funcione. Con tu autorización, también usamos cookies de análisis para entender el uso del sitio. Puedes leer más en la <a href="/privacidad#cookies">Política de Privacidad</a>.</p>' +
        '<div class="btns">' +
          '<button class="essential" type="button">Solo esenciales</button>' +
          '<button class="accept" type="button">Aceptar todas</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);
    el.querySelector('.accept').onclick = function () { current = { level: 'all', ts: Date.now() }; writeConsent('all'); hideBanner(); runPending('all'); };
    el.querySelector('.essential').onclick = function () { current = { level: 'essential', ts: Date.now() }; writeConsent('essential'); hideBanner(); };
  }

  // Solo se muestra si no hay una decisión previa guardada.
  if (!current) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner);
    else showBanner();
  }

  window.MedConsent = {
    // Nivel actual: "all" | "essential" | null (aún no decide)
    level: function () { return current ? current.level : null; },
    // Registra fn para que se ejecute SOLO si el visitante aceptó "todas" (ahora o más
    // adelante). category se deja como referencia legible (ej. "analytics"), hoy no
    // segmenta por categoría — todo lo no esencial cae bajo el mismo nivel "all".
    onAccept: function (category, fn) {
      if (typeof fn !== 'function') { fn = category; }
      if (current && current.level === 'all') { try { fn(); } catch (e) {} return; }
      pending.push(fn);
    },
    // Reabre el banner para que el visitante cambie su elección (ej. desde un link
    // "Preferencias de cookies" en el pie de página).
    openPreferences: function () { hideBanner(); showBanner(); }
  };
})();
