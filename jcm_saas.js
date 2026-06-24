/* ════════════════════════════════════════════════════════════════════════
 * jcm_saas.js — Capa MULTI-CLÍNICA (Firebase Auth + Firestore)
 *
 * Convierte el panel mono-clínica en un SaaS vendible a varias clínicas:
 *   · Cada clínica tiene su login (Auth email+contraseña).
 *   · Cada clínica tiene sus datos AISLADOS (Firestore + reglas de seguridad).
 *   · Auto-registro con PRUEBA gratis (14 días) → luego se activa el plan.
 *
 * No requiere servidor propio ni manejar secretos: usa UN proyecto Firebase
 * (config pública en jcm_saas_config.js) y Reglas de Firestore para el
 * aislamiento. Toda la app sigue usando window.DB.get/set; aquí solo cambia
 * DÓNDE persiste: cada clínica obtiene su propio espacio (namespace) en
 * localStorage + Firestore.
 *
 * Modos:
 *   · STAFF  (panel): requiere login; clinicId sale de users/{uid}.clinicId.
 *   · (Fase 3) PUBLIC (app/reserva): ?c=clinicId → solo lectura de datos públicos.
 *
 * API pública: window.JCSAAS = {
 *   enabled, ready (Promise), mode,
 *   register({clinicName,email,password}), login(email,password), logout(),
 *   resetPassword(email), onAuth(cb), currentClinic(), access(), migrateLocal()
 * }
 * Eventos: window dispatches 'jcsaas:auth' (detail: {user, clinic}) y 'jcsaas:data'.
 * ════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var cfg = window.JCSAAS_CONFIG || {};
  var CONFIGURED = !!(cfg && cfg.apiKey && cfg.projectId);
  var TRIAL_DAYS = 14;

  // Claves de window.DB que NO se sincronizan (sesión/seguridad local).
  var NO_SYNC = { session: 1, admin_pass: 1, cloud_pulled: 1, saas_ns: 1 };

  // ── Estado interno ────────────────────────────────────────────────────
  var fb = null, auth = null, db = null;
  var state = {
    enabled: CONFIGURED,
    mode: 'staff',
    user: null,       // Firebase user
    clinicId: null,
    clinic: null,     // doc de la clínica
    bound: false      // window.DB ya re-namespaceado a esta clínica
  };
  var authCbs = [];
  var pushTimers = {};
  var applyingRemote = false;
  var unsubKv = null;

  // ── window.DB: namespace por clínica + sincronización ─────────────────
  // Guardamos la implementación original de _k para poder anteponer el clinicId.
  var origK = null;
  function nsKey(k) { return 'jcm_' + (state.clinicId ? state.clinicId + '_' : '') + k; }

  function bindDB() {
    if (!window.DB || state.bound || !state.clinicId) return;
    origK = window.DB._k.bind(window.DB);
    window.DB._k = nsKey;                 // todas las lecturas/escrituras quedan namespaced
    var origSet = window.DB.set.bind(window.DB);
    window.DB.set = function (k, v) {
      var r = origSet(k, v);
      if (!applyingRemote && !NO_SYNC[k]) pushKey(k, v);
      return r;
    };
    var origDel = window.DB.del.bind(window.DB);
    window.DB.del = function (k) { origDel(k); if (!NO_SYNC[k]) pushKey(k, null); };
    state.bound = true;
  }

  function pushKey(k, v) {
    if (!db || !state.clinicId) return;
    clearTimeout(pushTimers[k]);
    pushTimers[k] = setTimeout(function () {
      try {
        var ref = db.collection('tenants').doc(state.clinicId).collection('kv').doc(k);
        if (v == null) ref.delete().catch(noop);
        else ref.set({ v: JSON.stringify(v), _ts: Date.now() }).catch(noop);
      } catch (e) { noop(e); }
    }, 600);
  }

  // Trae todos los kv de la clínica → localStorage namespaced (para que DB.get síncrono funcione).
  function pullAll() {
    if (!db || !state.clinicId) return Promise.resolve();
    return db.collection('tenants').doc(state.clinicId).collection('kv').get().then(function (snap) {
      applyingRemote = true;
      snap.forEach(function (doc) {
        try {
          var data = doc.data();
          var val = data && data.v != null ? JSON.parse(data.v) : null;
          localStorage.setItem(nsKey(doc.id), JSON.stringify(val));
        } catch (e) { noop(e); }
      });
      applyingRemote = false;
      emit('jcsaas:data', {});
    }).catch(function (e) { applyingRemote = false; noop(e); });
  }

  // Escucha cambios en vivo desde otros dispositivos de la misma clínica.
  function liveKv() {
    if (!db || !state.clinicId) return;
    if (unsubKv) { try { unsubKv(); } catch (e) {} }
    unsubKv = db.collection('tenants').doc(state.clinicId).collection('kv')
      .onSnapshot(function (snap) {
        var changed = false;
        applyingRemote = true;
        snap.docChanges().forEach(function (ch) {
          if (ch.type === 'removed') { localStorage.removeItem(nsKey(ch.doc.id)); changed = true; return; }
          try {
            var data = ch.doc.data();
            var val = data && data.v != null ? JSON.parse(data.v) : null;
            var cur = localStorage.getItem(nsKey(ch.doc.id));
            var next = JSON.stringify(val);
            if (cur !== next) { localStorage.setItem(nsKey(ch.doc.id), next); changed = true; }
          } catch (e) { noop(e); }
        });
        applyingRemote = false;
        if (changed) emit('jcsaas:data', {});
      }, noop);
  }

  // ── Carga del SDK de Firebase (compat, vía CDN — sin build) ───────────
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  var V = '10.12.2';
  function initFirebase() {
    return Promise.all([
      loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-app-compat.js'),
      loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-auth-compat.js'),
      loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-firestore-compat.js')
    ]).then(function () {
      fb = window.firebase;
      fb.initializeApp(cfg);
      auth = fb.auth();
      db = fb.firestore();
      try { auth.setPersistence(fb.auth.Auth.Persistence.LOCAL); } catch (e) {}
    });
  }

  // ── Resolver clínica activa tras login ────────────────────────────────
  function loadUserClinic(user) {
    return db.collection('users').doc(user.uid).get().then(function (uDoc) {
      if (!uDoc.exists) return null;
      var u = uDoc.data();
      return db.collection('clinics').doc(u.clinicId).get().then(function (cDoc) {
        return { clinicId: u.clinicId, role: u.role || 'staff', clinic: cDoc.exists ? cDoc.data() : null };
      });
    });
  }

  function onAuthChange(user) {
    if (!user) {
      teardown();
      state.user = null; state.clinicId = null; state.clinic = null;
      authCbs.forEach(function (cb) { try { cb(null); } catch (e) {} });
      emit('jcsaas:auth', { user: null, clinic: null });
      return;
    }
    state.user = user;
    loadUserClinic(user).then(function (info) {
      if (!info) { // usuario auth sin clínica (registro incompleto) → cerrar sesión
        authCbs.forEach(function (cb) { try { cb({ user: user, clinic: null, incomplete: true }); } catch (e) {} });
        return;
      }
      state.clinicId = info.clinicId;
      state.clinic = info.clinic;
      bindDB();
      pullAll().then(function () {
        liveKv();
        var payload = { user: user, clinicId: info.clinicId, clinic: info.clinic, role: info.role };
        authCbs.forEach(function (cb) { try { cb(payload); } catch (e) {} });
        emit('jcsaas:auth', payload);
      });
    }).catch(function (e) { noop(e); });
  }

  function teardown() {
    if (unsubKv) { try { unsubKv(); } catch (e) {} unsubKv = null; }
    state.bound = false; // se re-bindea al próximo login (el namespace cambia)
    // Nota: no restauramos DB._k porque al cerrar sesión se vuelve a la pantalla de login.
  }

  // ── API: registro / login ─────────────────────────────────────────────
  function slug(s) {
    return (s || 'clinica').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 28) || 'clinica';
  }

  function register(opts) {
    opts = opts || {};
    var name = (opts.clinicName || '').trim();
    var email = (opts.email || '').trim().toLowerCase();
    var pass = opts.password || '';
    if (name.length < 2) return Promise.reject({ msg: 'Ingresa el nombre de la clínica.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Promise.reject({ msg: 'Correo no válido.' });
    if (pass.length < 6) return Promise.reject({ msg: 'La contraseña debe tener al menos 6 caracteres.' });

    return ready.then(function () {
      return auth.createUserWithEmailAndPassword(email, pass);
    }).then(function (cred) {
      var uid = cred.user.uid;
      var clinicId = slug(name) + '-' + uid.slice(0, 6);
      var now = Date.now();
      var clinic = {
        id: clinicId, name: name, ownerUid: uid, ownerEmail: email,
        plan: 'trial', trialEnds: now + TRIAL_DAYS * 86400000,
        createdAt: now, branding: { name: name }
      };
      return db.collection('clinics').doc(clinicId).set(clinic).then(function () {
        return db.collection('users').doc(uid).set({ clinicId: clinicId, role: 'owner', email: email, createdAt: now });
      }).then(function () {
        return { clinicId: clinicId, clinic: clinic };
      });
    });
  }

  function login(email, password) {
    return ready.then(function () {
      return auth.signInWithEmailAndPassword((email || '').trim().toLowerCase(), password || '');
    });
  }
  function logout() { return ready.then(function () { return auth.signOut(); }); }
  function resetPassword(email) {
    return ready.then(function () { return auth.sendPasswordResetEmail((email || '').trim().toLowerCase()); });
  }
  function onAuth(cb) { if (typeof cb === 'function') { authCbs.push(cb); } }

  // Estado de acceso (prueba / activo / vencido) — para gatear el panel.
  function access() {
    var c = state.clinic;
    if (!c) return { ok: false, status: 'none' };
    if (c.plan === 'active' || c.plan === 'comp') return { ok: true, status: 'active', plan: c.plan };
    if (c.plan === 'trial') {
      var left = Math.ceil(((c.trialEnds || 0) - Date.now()) / 86400000);
      if (left > 0) return { ok: true, status: 'trial', daysLeft: left };
      return { ok: false, status: 'trial_expired' };
    }
    if (c.plan === 'suspended') return { ok: false, status: 'suspended' };
    return { ok: false, status: c.plan || 'unknown' };
  }

  // Migra los datos locales actuales (clínica mono-tenant "jcm_*" sin namespace)
  // al espacio de la clínica recién creada, y los sube a Firestore. Úsalo una vez
  // tras el primer registro del dueño original (JC Medical).
  function migrateLocal() {
    if (!state.clinicId) return Promise.reject({ msg: 'Inicia sesión primero.' });
    var moved = 0;
    try {
      Object.keys(localStorage).forEach(function (full) {
        if (full.indexOf('jcm_') !== 0) return;
        var k = full.slice(4);
        // Saltar las que ya tienen prefijo de clínica o claves locales/sesión.
        if (k.indexOf(state.clinicId + '_') === 0) return;
        if (NO_SYNC[k]) return;
        var raw = localStorage.getItem(full);
        localStorage.setItem(nsKey(k), raw);
        try { pushKey(k, JSON.parse(raw)); } catch (e) {}
        moved++;
      });
    } catch (e) { return Promise.reject(e); }
    emit('jcsaas:data', {});
    return Promise.resolve({ moved: moved });
  }

  // ── Utilidades ────────────────────────────────────────────────────────
  function emit(name, detail) { try { window.dispatchEvent(new CustomEvent(name, { detail: detail })); } catch (e) {} }
  function noop(e) { if (e) { try { console.warn('[JCSAAS]', e.code || e.message || e); } catch (_) {} } }

  // ── Arranque ──────────────────────────────────────────────────────────
  var ready;
  if (!CONFIGURED) {
    ready = Promise.resolve(false); // modo local (mono-clínica) como hoy
  } else {
    ready = initFirebase().then(function () {
      auth.onAuthStateChanged(onAuthChange);
      return true;
    }).catch(function (e) { noop(e); state.enabled = false; return false; });
  }

  window.JCSAAS = {
    get enabled() { return state.enabled; },
    get mode() { return state.mode; },
    ready: ready,
    register: register,
    login: login,
    logout: logout,
    resetPassword: resetPassword,
    onAuth: onAuth,
    currentClinic: function () { return state.clinic; },
    currentClinicId: function () { return state.clinicId; },
    access: access,
    migrateLocal: migrateLocal
  };
})();
