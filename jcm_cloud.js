/* ════════════════════════════════════════════════════════════════════════
 * jcm_cloud.js — Base de datos COMPARTIDA en la nube (Firebase Firestore)
 *
 * Sincroniza window.DB (localStorage) entre todos los dispositivos:
 * reservas, usuarios, Glow Points, canjes, opiniones, récords, config y horarios.
 *
 * ACTIVACIÓN: pega tu configuración web de Firebase en el panel
 *   (App JC Medical → Integraciones → "Base de datos en la nube").
 * Sin configuración, NO hace nada: la app sigue funcionando solo con localStorage.
 *
 * Cómo obtener la config (gratis, ~5 min):
 *   1) console.firebase.google.com → "Agregar proyecto".
 *   2) Build → Firestore Database → "Crear base de datos" (modo producción).
 *   3) ⚙ Configuración del proyecto → "Tus apps" → ícono Web (</>) → registra la app.
 *   4) Copia el objeto firebaseConfig { apiKey, authDomain, projectId, ... } y pégalo en el panel.
 *   5) Reglas de Firestore (pestaña "Reglas"): permite lectura/escritura del doc compartido.
 * ════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (!window.DB) return;

  // Claves de negocio que se comparten entre dispositivos (NO la sesión ni la clave del panel).
  var SHARED_KEYS = ['bookings', 'users', 'redeems', 'feedback', 'config', 'horarios_v1', 'horarios_dates', 'records', 'action_pts', 'appointments'];

  function getCfg() {
    try {
      var c = window.DB.cfg().firebase_config;
      if (!c) return null;
      return typeof c === 'string' ? JSON.parse(c) : c;
    } catch (e) { return null; }
  }
  var fb = getCfg();
  if (!fb || !fb.projectId) { return; } // no configurado → solo localStorage

  var DOC = null, ready = false, pushTimer = null, applyingRemote = false;

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  function snapshotLocal() {
    var o = {};
    SHARED_KEYS.forEach(function (k) { var v = window.DB.get(k); if (v != null) o[k] = v; });
    o._ts = Date.now();
    return o;
  }

  // Escribe en localStorage las claves remotas que difieran. Devuelve true si cambió algo.
  function applyRemote(data) {
    if (!data) return false;
    var changed = false;
    applyingRemote = true;
    SHARED_KEYS.forEach(function (k) {
      if (data[k] == null) return;
      var localStr = JSON.stringify(window.DB.get(k));
      var remoteStr = JSON.stringify(data[k]);
      if (localStr !== remoteStr) { window.DB.set(k, data[k]); changed = true; }
    });
    applyingRemote = false;
    return changed;
  }

  function pushNow() { if (ready && DOC) { try { DOC.set(snapshotLocal(), { merge: true }); } catch (e) {} } }
  function schedulePush() { clearTimeout(pushTimer); pushTimer = setTimeout(pushNow, 800); }

  // Envolver DB.set / DB.del para empujar a la nube cuando cambian claves compartidas.
  var _set = window.DB.set.bind(window.DB);
  window.DB.set = function (k, v) { var r = _set(k, v); if (!applyingRemote && SHARED_KEYS.indexOf(k) >= 0) schedulePush(); return r; };
  var _del = window.DB.del.bind(window.DB);
  window.DB.del = function (k) { var r = _del(k); if (!applyingRemote && SHARED_KEYS.indexOf(k) >= 0) schedulePush(); return r; };

  // Recarga UNA vez por sesión tras la bajada inicial (para que React lea datos frescos).
  function reloadOnce() {
    try { if (sessionStorage.getItem('jcm_cloud_pulled')) return; sessionStorage.setItem('jcm_cloud_pulled', '1'); } catch (e) {}
    location.reload();
  }

  Promise.all([
    loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js'),
    loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js')
  ]).then(function () {
    try {
      firebase.initializeApp(fb);
      var fs = firebase.firestore();
      DOC = fs.collection('jcm_shared').doc('db');

      DOC.get().then(function (snap) {
        ready = true;
        if (snap.exists) {
          if (applyRemote(snap.data())) reloadOnce();
        } else {
          pushNow(); // primera vez: sembrar la nube con lo que haya local
        }
        // Cambios en vivo desde otros dispositivos.
        DOC.onSnapshot(function (s) {
          if (!s.exists) return;
          if (s.metadata && s.metadata.hasPendingWrites) return; // ignora el eco de mis propios writes
          if (applyRemote(s.data())) {
            try { sessionStorage.removeItem('jcm_cloud_pulled'); } catch (e) {}
            location.reload();
          }
        });
      }).catch(function () { ready = true; });

      window.JCM_CLOUD = { on: true, push: pushNow, keys: SHARED_KEYS };
    } catch (e) { /* config inválida → seguimos con localStorage */ }
  }).catch(function () { /* sin red / SDK no cargó → localStorage */ });
})();
