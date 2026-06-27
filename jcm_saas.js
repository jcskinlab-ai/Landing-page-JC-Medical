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
  // Clínica para modo PÚBLICO (app de pacientes / reserva): por ?c=clinicId en la URL,
  // o por dominio (window.JCSAAS_HOSTS mapea hostname → clinicId, p. ej. jcmedical.cl → su clínica).
  var urlC = (function () {
    try {
      var p = new URLSearchParams(location.search).get('c');
      if (p) return p;
      var hosts = window.JCSAAS_HOSTS || {};
      return hosts[location.hostname] || null;
    } catch (e) { return null; }
  })();
  // Claves cuyo cambio re-publica el perfil público de la clínica.
  var PUBLIC_TRIGGER = { config: 1, horarios_v1: 1, horarios_dates: 1, services_over: 1, services_custom: 1, collab_form: 1 };
  var pubTimer = null;

  // Claves de window.DB que NO se sincronizan (sesión/seguridad local).
  var NO_SYNC = { session: 1, admin_pass: 1, cloud_pulled: 1, saas_ns: 1 };

  // ── Estado interno ────────────────────────────────────────────────────
  var fb = null, auth = null, db = null, storage = null;
  var state = {
    enabled: CONFIGURED,
    mode: 'staff',
    user: null,       // Firebase user
    clinicId: null,
    clinic: null,     // doc de la clínica
    bound: false,     // window.DB ya re-namespaceado a esta clínica
    kvEmpty: false,   // true si la clínica no tenía datos en Firestore al entrar
    publicProfile: null // perfil público cargado (modo pacientes/reserva)
  };
  var authCbs = [];
  var settled = false, lastPayload = null; // para "replay" a quien se suscriba tarde
  var pushTimers = {};
  var applyingRemote = false;
  var unsubKv = null;

  // ── window.DB: namespace por clínica + sincronización ─────────────────
  // Guardamos la implementación original de _k para poder anteponer el clinicId.
  var origK = null;
  function nsKey(k) { return 'jcm_' + (state.clinicId ? state.clinicId + '_' : '') + k; }

  // ── Registro de claves SIN SINCRONIZAR (persistente en localStorage) ──────────
  // Si un push a la nube falla (sin conexión, App Check, doc grande), la clave queda
  // marcada como "dirty". Mientras esté dirty, la sincronización remota (pullAll /
  // liveKv) NO la sobrescribe — ni siquiera tras recargar la página — para no perder
  // datos guardados localmente (p. ej. un consentimiento recién firmado).
  function dirtyAll() { try { return JSON.parse(localStorage.getItem(nsKey('__dirty__')) || '{}') || {}; } catch (e) { return {}; } }
  function dirtySave(m) { try { localStorage.setItem(nsKey('__dirty__'), JSON.stringify(m)); } catch (e) {} }
  function setDirty(k, on) { var m = dirtyAll(); if (on) { if (!m[k]) { m[k] = Date.now(); dirtySave(m); } } else if (m[k]) { delete m[k]; dirtySave(m); } }
  function isDirty(k) { return dirtyAll()[k] != null; }
  // Reintenta subir todas las claves pendientes (al iniciar sesión, al reconectar, etc.).
  function flushDirty() {
    var m = dirtyAll();
    Object.keys(m).forEach(function (k) {
      var raw = null; try { raw = localStorage.getItem(nsKey(k)); } catch (e) {}
      var v = null; try { v = raw == null ? null : JSON.parse(raw); } catch (e) { v = null; }
      pushKey(k, v);
    });
  }

  function bindDB() {
    if (!window.DB || state.bound || !state.clinicId) return;
    origK = window.DB._k.bind(window.DB);
    window.DB._k = nsKey;                 // todas las lecturas/escrituras quedan namespaced
    var origSet = window.DB.set.bind(window.DB);
    window.DB.set = function (k, v) {
      var r = origSet(k, v);
      if (!applyingRemote && !NO_SYNC[k]) pushKey(k, v);
      if (!applyingRemote && PUBLIC_TRIGGER[k]) { clearTimeout(pubTimer); pubTimer = setTimeout(publishProfile, 900); }
      return r;
    };
    var origDel = window.DB.del.bind(window.DB);
    window.DB.del = function (k) { origDel(k); if (!NO_SYNC[k]) pushKey(k, null); };
    state.bound = true;
  }

  // Claves con escritura local pendiente o fallida: NO deben ser sobrescritas por
  // la sincronización remota (evita perder datos como consentimientos si el push falla).
  var pendingPush = {}; // k -> JSON del valor local más reciente aún no confirmado en la nube
  var syncErrors = {};  // k -> { code, at } del último error de subida (para el diagnóstico)
  var lastSyncOk = 0;   // timestamp del último push confirmado

  function pushKey(k, v, attempt) {
    if (!db || !state.clinicId) return;
    attempt = attempt || 0;
    pendingPush[k] = JSON.stringify(v == null ? null : v); // marca: hay cambio local sin confirmar
    setDirty(k, true); // persiste el "sin sincronizar" para que sobreviva a recargas
    clearTimeout(pushTimers[k]);
    pushTimers[k] = setTimeout(function () {
      try {
        var snapshot = pendingPush[k]; // valor que estamos intentando subir
        var ref = db.collection('tenants').doc(state.clinicId).collection('kv').doc(k);
        var op = v == null ? ref.delete() : ref.set({ v: JSON.stringify(v), _ts: Date.now() });
        op.then(function () {
          // Confirmado en la nube: si no hubo otro cambio local entretanto, deja de protegerla.
          if (pendingPush[k] === snapshot) { delete pendingPush[k]; setDirty(k, false); }
          lastSyncOk = Date.now(); delete syncErrors[k];
        }).catch(function (e) {
          noop(e);
          var code = (e && e.code) || 'unknown';
          syncErrors[k] = { code: code, at: Date.now() };
          // La data sigue a salvo en localStorage y protegida de sobrescritura. Reintentamos.
          if (attempt < 5) {
            setTimeout(function () { if (pendingPush[k] === snapshot) pushKey(k, v, attempt + 1); }, Math.min(2000 * (attempt + 1), 15000));
          }
          // Aviso suave y tranquilizador (sin spam: 1 por tipo de error). NO se pierde nada.
          if (!pushKey._warnedCodes) pushKey._warnedCodes = {};
          if (!pushKey._warnedCodes[code]) {
            pushKey._warnedCodes[code] = true;
            var msg = 'Los datos están guardados en tu dispositivo local.';
            if (window.jcmToast) window.jcmToast(msg, 'info');
            else if (window.jcmError) window.jcmError(msg);
            setTimeout(function () { if (pushKey._warnedCodes) delete pushKey._warnedCodes[code]; }, 30000);
          }
        });
      } catch (e) { noop(e); }
    }, 600);
  }

  // Trae todos los kv de la clínica → localStorage namespaced (para que DB.get síncrono funcione).
  function pullAll() {
    if (!db || !state.clinicId) return Promise.resolve();
    return db.collection('tenants').doc(state.clinicId).collection('kv').get().then(function (snap) {
      state.kvEmpty = snap.empty;
      applyingRemote = true;
      snap.forEach(function (doc) {
        if (pendingPush[doc.id] != null || isDirty(doc.id)) return; // conserva cambios locales sin sincronizar (también tras recargar)
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
          // No sobrescribir una clave con cambios locales pendientes o sin sincronizar (p. ej. un
          // consentimiento recién firmado): evita perder datos por el rollback de Firestore o tras recargar.
          if (pendingPush[ch.doc.id] != null || isDirty(ch.doc.id)) return;
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

  // Publica un perfil PÚBLICO y curado de la clínica (lo lee la app de pacientes
  // y la página de reserva). Solo datos públicos: nombre, marca, dirección,
  // horarios y precios; nunca pacientes/caja ni llaves/API.
  function publishProfile() {
    if (!db || !state.clinicId) return;
    var c = state.clinic || {};
    var cf = (window.DB && window.DB.cfg) ? window.DB.cfg() : {};
    var prof = {
      clinicId: state.clinicId,
      name: c.name || cf.clinic_name || 'Clínica',
      branding: c.branding || { name: c.name || 'Clínica' },
      addr: cf.clinic_addr || '',
      hours: cf.clinic_hours || '',
      wa: cf.wa_number || '',
      // Datos de transferencia que la clínica configura en el panel (se muestran en la reserva).
      pago: { banco: cf.pay_banco || '', titular: cf.pay_titular || '', rut: cf.pay_rut || '', tipo: cf.pay_tipo || '', numero: cf.pay_numero || '', email: cf.pay_email || '' },
      horarios: (window.DB && window.DB.get('horarios_v1')) || null,
      horariosDates: (window.DB && window.DB.get('horarios_dates')) || null,
      servicesOver: (window.DB && window.DB.get('services_over')) || null,
      // Servicios PROPIOS de la clínica (catálogo base si es la clínica base, o sus servicios creados).
      // La reserva directa (agendar.html) muestra SOLO estos, no el catálogo de otra clínica.
      services: (typeof window.clinicServiceList === 'function') ? window.clinicServiceList() : [],
      collabForm: (window.DB && window.DB.get('collab_form')) || null,
      updatedAt: Date.now()
    };
    try {
      db.collection('tenants').doc(state.clinicId).collection('public').doc('profile').set(prof).catch(noop);
    } catch (e) { noop(e); }
  }

  // Modo PÚBLICO: carga el perfil de una clínica por su id (sin login).
  function loadPublic(clinicId) {
    return db.collection('tenants').doc(clinicId).collection('public').doc('profile').get()
      .then(function (snap) {
        state.publicProfile = snap.exists ? snap.data() : null;
        state.clinicId = clinicId;
        // Aplicar horarios semanales y por fecha al JCDATA local para que buildSchedule los use
        if (state.publicProfile) {
          var p = state.publicProfile;
          if (p.horarios && window.DB) {
            try { window.DB.set('horarios_v1', p.horarios); } catch (e) {}
          }
          if (p.horariosDates && window.DB) {
            try { window.DB.set('horarios_dates', p.horariosDates); } catch (e) {}
          }
          // Reconstruir el calendario con los datos recién aplicados
          if (window.JCDATA && window.JCDATA.rebuildSchedule) {
            try { window.JCDATA.rebuildSchedule(); } catch (e) {}
          }
        }
        emit('jcsaas:public', { clinicId: clinicId, profile: state.publicProfile });
        return state.publicProfile;
      }).catch(function (e) { noop(e); return null; });
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
    var scripts = [
      loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-app-compat.js'),
      loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-auth-compat.js'),
      loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-firestore-compat.js'),
      loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-storage-compat.js')
    ];
    // App Check (anti-abuso): solo se carga/activa si hay site key de reCAPTCHA v3 en la config.
    // El site key es público (va en el cliente). Mientras no exista, todo sigue igual.
    if (cfg && cfg.appCheckKey) scripts.push(loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-app-check-compat.js'));
    return Promise.all(scripts).then(function () {
      fb = window.firebase;
      fb.initializeApp(cfg);
      if (cfg && cfg.appCheckKey) {
        try { fb.appCheck().activate(cfg.appCheckKey, true); } catch (e) { noop(e); }
      }
      auth = fb.auth();
      db = fb.firestore();
      try { storage = fb.storage(); } catch (e) { noop(e); }
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

  function loadUserClinicRetry(user, tries) {
    return loadUserClinic(user).then(function (info) {
      if (!info && tries > 0) {
        return new Promise(function (res) { setTimeout(res, 700); }).then(function () {
          return loadUserClinicRetry(user, tries - 1);
        });
      }
      return info;
    });
  }

  function onAuthChange(user) {
    if (!user) {
      teardown();
      state.user = null; state.clinicId = null; state.clinic = null;
      fire(null);
      return;
    }
    state.user = user;
    // Reintenta: al registrarse, Auth avisa del usuario ANTES de que se escriban
    // los docs clinics/{}/users/{}; reintentamos unas veces para no marcar "incompleto".
    loadUserClinicRetry(user, 5).then(function (info) {
      if (!info) { // usuario auth sin clínica (registro realmente incompleto)
        fire({ user: user, clinic: null, incomplete: true });
        return;
      }
      state.clinicId = info.clinicId;
      state.clinic = info.clinic;
      bindDB();
      pullAll().then(function () {
        liveKv();
        flushDirty(); // reintenta subir lo que quedó sin sincronizar en sesiones anteriores
        setTimeout(publishProfile, 1500); // publica/actualiza el perfil público de la clínica
        fire({ user: user, clinicId: info.clinicId, clinic: info.clinic, role: info.role });
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
        // La cuenta nace PENDIENTE: no puede usar el panel hasta que el super-admin la apruebe
        // desde /admin. La prueba (trial) recién arranca al aprobar. Evita registros ilimitados.
        plan: 'pending', trialEnds: 0,
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
  function fire(payload) {
    settled = true; lastPayload = payload;
    authCbs.forEach(function (cb) { try { cb(payload); } catch (e) {} });
    emit('jcsaas:auth', payload || { user: null, clinic: null });
  }
  function onAuth(cb) {
    if (typeof cb !== 'function') return;
    authCbs.push(cb);
    if (settled) setTimeout(function () { try { cb(lastPayload); } catch (e) {} }, 0);
  }

  // Estado de acceso (prueba / activo / vencido) — para gatear el panel.
  function access() {
    var c = state.clinic;
    if (!c) return { ok: false, status: 'none' };
    if (c.plan === 'pending') return { ok: false, status: 'pending' }; // esperando aprobación del super-admin
    if (c.plan === 'rejected') return { ok: false, status: 'rejected' };
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

  // ¿Hay datos de una clínica guardados en este equipo SIN namespace (de la
  // época mono-clínica)? Sirve para ofrecer migrarlos al entrar por primera vez.
  function hasLegacyData() {
    var keys = ['appointments', 'patients', 'config', 'bookings', 'inventory', 'cash_moves', 'consents', 'services_over', 'team', 'horarios_v1'];
    for (var i = 0; i < keys.length; i++) {
      var v = localStorage.getItem('jcm_' + keys[i]);
      if (v && v !== 'null' && v !== '{}' && v !== '[]' && v !== '""') return true;
    }
    return false;
  }

  // ── Utilidades ────────────────────────────────────────────────────────
  function emit(name, detail) { try { window.dispatchEvent(new CustomEvent(name, { detail: detail })); } catch (e) {} }
  function noop(e) { if (e) { try { console.warn('[JCSAAS]', e.code || e.message || e); } catch (_) {} } }

  // ── Arranque ──────────────────────────────────────────────────────────
  // El panel móvil del equipo (/movil) trae ?c= para saber la clínica, pero NECESITA login:
  // no es modo público. Sin esta excepción se quedaba pegado en "Entrando…".
  var isTeamPanel = (function () { try { return /^\/movil(\/|$)/.test(location.pathname || ''); } catch (e) { return false; } })();
  var ready;
  if (!CONFIGURED) {
    ready = Promise.resolve(false); // modo local (mono-clínica) como hoy
  } else if (urlC && !isTeamPanel) {
    // App de pacientes / reserva de una clínica concreta (solo lectura, sin login).
    state.mode = 'public';
    ready = initFirebase().then(function () { return loadPublic(urlC); }).then(function () { return true; })
      .catch(function (e) { noop(e); state.enabled = false; return false; });
  } else {
    ready = initFirebase().then(function () {
      auth.onAuthStateChanged(onAuthChange);
      return true;
    }).catch(function (e) { noop(e); state.enabled = false; return false; });
  }
  // Al recuperar conexión, reintenta subir lo que quedó sin sincronizar.
  if (typeof window !== 'undefined') window.addEventListener('online', function () { try { if (state.clinicId) flushDirty(); } catch (e) {} });

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
    // ID token de Firebase del usuario logueado (para autenticar llamadas a /api/*). Corto (1h), no es secreto.
    idToken: function () { try { return (auth && auth.currentUser) ? auth.currentUser.getIdToken() : Promise.resolve(null); } catch (e) { return Promise.resolve(null); } },
    // Verifica la contraseña de la cuenta (re-autenticación) para confirmar acciones sensibles
    // (p. ej. borrar un movimiento de Caja). No cambia la sesión; solo valida. Devuelve Promise<bool>.
    verifyPassword: function (pass) {
      try {
        if (!auth || !auth.currentUser || !auth.currentUser.email || !pass) return Promise.resolve(false);
        var cred = fb.auth.EmailAuthProvider.credential(auth.currentUser.email, pass);
        return auth.currentUser.reauthenticateWithCredential(cred).then(function () { return true; }).catch(function () { return false; });
      } catch (e) { return Promise.resolve(false); }
    },
    access: access,
    migrateLocal: migrateLocal,
    hasLegacyData: hasLegacyData,
    // ── Diagnóstico de sincronización ──────────────────────────────────────────
    // Tamaño de cada bloque de datos, cuáles están pendientes de subir y por qué.
    syncStatus: function () {
      var pre = 'jcm_' + (state.clinicId ? state.clinicId + '_' : '');
      var sizes = {}, errors = {};
      try {
        Object.keys(localStorage).forEach(function (full) {
          if (full.indexOf(pre) !== 0) return;
          var k = full.slice(pre.length);
          if (NO_SYNC[k] || k.indexOf('__dirty__') === 0) return;
          sizes[k] = (localStorage.getItem(full) || '').length; // bytes aprox (1 char ≈ 1 byte)
        });
      } catch (e) {}
      Object.keys(syncErrors).forEach(function (k) { errors[k] = syncErrors[k]; });
      return { clinicId: state.clinicId, dirty: Object.keys(dirtyAll()), errors: errors, sizes: sizes, lastOk: lastSyncOk, online: (typeof navigator !== 'undefined' ? navigator.onLine : true), limit: 1048576 };
    },
    // Reintenta subir TODO lo que quedó pendiente (seguro: solo empuja, no borra).
    retrySync: function () { try { flushDirty(); return true; } catch (e) { return false; } },
    isFreshClinic: function () { return state.kvEmpty; },
    getPublic: function () { return state.publicProfile || null; },
    publishProfile: publishProfile,
    bookingLink: function (cid) { return (window.jcmPubBase ? window.jcmPubBase() : location.origin) + '/reservar?c=' + (cid || state.clinicId || ''); },
    // Panel móvil del EQUIPO: usa el MISMO dominio del admin (location.origin, p. ej.
    // portal.medique.cl), no el público — así el login/App Check ya está habilitado y
    // la sesión iniciada se comparte (entra directo sin volver a iniciar sesión).
    mobileLink: function (cid) { return location.origin + '/movil?c=' + (cid || state.clinicId || ''); },
    // ── FIREBASE STORAGE: subida de imágenes clínicas ──
    // dataUrl: string "data:image/jpeg;base64,…" (ya comprimida/resized).
    // path:    ruta relativa dentro de la clínica, p. ej. "pId/imTimestamp.jpg".
    // Devuelve Promise<string> con la URL pública permanente de descarga.
    uploadImage: function (dataUrl, path) {
      if (!storage || !state.clinicId) return Promise.reject(new Error('Storage no disponible'));
      try {
        var parts = dataUrl.split(',');
        var mime = (parts[0].match(/:(.*?);/) || [])[1] || 'image/jpeg';
        var raw = atob(parts[1]), len = raw.length, arr = new Uint8Array(len);
        while (len--) arr[len] = raw.charCodeAt(len);
        var blob = new Blob([arr], { type: mime });
        var ref = storage.ref(state.clinicId + '/patients/' + path);
        // Reintenta ante fallos TRANSITORIOS (red); no reintenta si es de permiso (reglas de Storage).
        function attempt(n) {
          return ref.put(blob).then(function () { return ref.getDownloadURL(); })
            .catch(function (e) {
              var code = (e && e.code) || '';
              var permanent = code.indexOf('unauthorized') >= 0 || code.indexOf('unauthenticated') >= 0 || code.indexOf('invalid-argument') >= 0;
              if (n > 0 && !permanent) {
                return new Promise(function (res) { setTimeout(res, 1200); }).then(function () { return attempt(n - 1); });
              }
              throw e;
            });
        }
        return attempt(2);
      } catch (e) { return Promise.reject(e); }
    },
    deleteImage: function (path) {
      if (!storage || !state.clinicId) return Promise.resolve();
      try { return storage.ref(state.clinicId + '/patients/' + path).delete().catch(noop); } catch (e) { return Promise.resolve(); }
    },
    // La página de reserva (sin login) deja la reserva en la clínica activa (modo público).
    submitBooking: function (data) {
      if (!db || !state.clinicId) return Promise.reject({ msg: 'Clínica no disponible.' });
      var doc = { name: '', phone: '', email: '', proc: '', fecha: '', time: '', dur: '', procs: [], note: '', source: 'web', createdAt: Date.now() };
      Object.keys(data || {}).forEach(function (k) { if (k in doc) doc[k] = data[k]; });
      return db.collection('tenants').doc(state.clinicId).collection('bookings').add(doc);
    },
    // La clínica (logueada) lee las reservas web PENDIENTES (no las ya importadas).
    fetchBookings: function () {
      if (!db || !state.clinicId) return Promise.resolve([]);
      return db.collection('tenants').doc(state.clinicId).collection('bookings').orderBy('createdAt', 'desc').limit(100).get()
        .then(function (s) { var a = []; s.forEach(function (d) { var b = d.data(); if (b.imported) return; a.push(Object.assign({ _id: d.id }, b)); }); return a; })
        .catch(function (e) { noop(e); return []; });
    },
    // Importa las reservas web a la agenda de la clínica (como citas pendiente_pago).
    // En vez de BORRARLAS (riesgo de pérdida si falla a mitad), las MARCA como importadas
    // y se filtran en lecturas futuras. Así nunca se pierde una reserva.
    importWebBookings: function () {
      if (!db || !state.clinicId || !window.DB) return Promise.resolve(0);
      var col = db.collection('tenants').doc(state.clinicId).collection('bookings');
      return col.orderBy('createdAt', 'asc').get().then(function (s) {
        if (s.empty) return 0;
        var appts = window.DB.get('appointments') || [];
        var seen = {}; appts.forEach(function (a) { if (a._bk) seen[a._bk] = 1; });
        var added = 0, toMark = [];
        s.forEach(function (d) {
          var b = d.data();
          if (b.imported) return;        // ya importada en una corrida anterior → ignorar
          toMark.push(d.id);             // marcar como importada (no borrar)
          if (seen[d.id]) return;        // ya está en la agenda (dedup por _bk) → marcar sin re-agregar
          var dayOff = 0;
          try { dayOff = Math.round((new Date(b.fecha + 'T00:00:00') - new Date().setHours(0, 0, 0, 0)) / 86400000); } catch (e) {}
          appts.push({
            id: 'web' + d.id, _bk: d.id, name: b.name || '', phone: b.phone || '', email: b.email || '',
            proc: b.proc || '', dur: b.dur || '', durMin: parseInt(b.dur) || 0, fecha: b.fecha || '', time: b.time || '',
            day: dayOff, status: 'pendiente_pago', origen: 'Reserva web', ts: new Date(b.createdAt || Date.now()).toISOString()
          });
          added++;
        });
        if (added) window.DB.set('appointments', appts);
        toMark.forEach(function (id) { col.doc(id).update({ imported: true, importedAt: Date.now() }).catch(noop); });
        return added;
      }).catch(function (e) { noop(e); return 0; });
    },
    // ── COLABORACIONES (formulario público por clínica) ──
    collabLink: function (cid) { return (window.jcmPubBase ? window.jcmPubBase() : location.origin) + '/colaborar.html?c=' + (cid || state.clinicId || ''); },
    submitCollab: function (data) {
      if (!db || !state.clinicId) return Promise.reject({ msg: 'Clínica no disponible.' });
      var doc = { name: '', email: '', phone: '', kind: '', ig: '', tiktok: '', ciudad: '', redPrincipal: '', reach: '', views: '', audiencia: '', ofrece: '', proc: '', message: '', createdAt: Date.now() };
      Object.keys(data || {}).forEach(function (k) { if (k in doc) doc[k] = data[k]; });
      return db.collection('tenants').doc(state.clinicId).collection('collabs').add(doc);
    },
    // Importa colaboraciones web al panel (DB 'collabs'), dedup por id, sin borrarlas del servidor.
    importWebCollabs: function () {
      if (!db || !state.clinicId || !window.DB) return Promise.resolve(0);
      var col = db.collection('tenants').doc(state.clinicId).collection('collabs');
      return col.orderBy('createdAt', 'desc').limit(200).get().then(function (s) {
        if (s.empty) return 0;
        var list = window.DB.get('collabs') || [];
        var seen = {}; list.forEach(function (r) { if (r._wid) seen[r._wid] = 1; });
        var added = 0;
        s.forEach(function (d) {
          if (seen[d.id]) return;
          var b = d.data();
          list.unshift({ id: 'wc' + d.id, _wid: d.id, name: b.name || '', email: b.email || '', phone: b.phone || '', kind: b.kind || b.redPrincipal || 'Colaboración', ig: b.ig || '', tiktok: b.tiktok || '', ciudad: b.ciudad || '', redPrincipal: b.redPrincipal || '', reach: b.reach || '', views: b.views || '', audiencia: b.audiencia || '', ofrece: b.ofrece || '', proc: b.proc || '', message: b.message || '', status: 'nueva', ts: new Date(b.createdAt || Date.now()).toISOString() });
          added++;
        });
        if (added) window.DB.set('collabs', list);
        return added;
      }).catch(function (e) { noop(e); return 0; });
    },
    // ── APP USERS (pacientes registrados en la app de la clínica) ──
    submitAppUser: function (data) {
      if (!db || !state.clinicId) return Promise.resolve(null);
      var safe = { name: data.name || '', phone: data.phone || '', email: data.email || '', points: data.points || 0, created: data.created || new Date().toISOString(), createdAt: Date.now() };
      return db.collection('tenants').doc(state.clinicId).collection('appusers').add(safe).catch(noop);
    },
    importWebAppUsers: function () {
      if (!db || !state.clinicId || !window.DB) return Promise.resolve(0);
      return db.collection('tenants').doc(state.clinicId).collection('appusers').orderBy('createdAt', 'asc').limit(500).get()
        .then(function (s) {
          if (s.empty) return 0;
          var users = window.DB.get('users') || [];
          var byPhone = {}; users.forEach(function (u) { var p = (u.phone || '').replace(/\D/g, ''); if (p.length >= 8) byPhone[p] = 1; });
          var added = 0;
          s.forEach(function (d) {
            var b = d.data();
            var ph = (b.phone || '').replace(/\D/g, '');
            if (ph.length >= 8 && byPhone[ph]) return;
            users.push({ id: d.id, name: b.name || '', phone: b.phone || '', email: b.email || '', points: b.points || 0, created: b.created || '', createdAt: b.createdAt || Date.now(), _source: 'web' });
            if (ph.length >= 8) byPhone[ph] = 1;
            added++;
          });
          if (added) window.DB.set('users', added > 0 ? users : (window.DB.get('users') || []));
          return added;
        }).catch(function (e) { noop(e); return 0; });
    },
    // ── RESEÑAS (formulario público por clínica) ──
    reviewLink: function (cid) { return (window.jcmPubBase ? window.jcmPubBase() : location.origin) + '/review.html?c=' + (cid || state.clinicId || ''); },
    submitReview: function (data) {
      if (!db || !state.clinicId) return Promise.reject({ msg: 'Clínica no disponible.' });
      var doc = { name: '', phone: '', stars: 0, comment: '', createdAt: Date.now() };
      Object.keys(data || {}).forEach(function (k) { if (k in doc) doc[k] = data[k]; });
      doc.stars = parseInt(doc.stars, 10) || 0;
      return db.collection('tenants').doc(state.clinicId).collection('reviews').add(doc);
    },
    importWebReviews: function () {
      if (!db || !state.clinicId || !window.DB) return Promise.resolve(0);
      var col = db.collection('tenants').doc(state.clinicId).collection('reviews');
      return col.orderBy('createdAt', 'desc').limit(200).get().then(function (s) {
        if (s.empty) return 0;
        var list = window.DB.get('reviews') || [];
        var seen = {}; list.forEach(function (r) { if (r._wid) seen[r._wid] = 1; });
        var added = 0;
        s.forEach(function (d) {
          if (seen[d.id]) return;
          var b = d.data();
          list.unshift({ id: 'wr' + d.id, _wid: d.id, name: b.name || '', phone: b.phone || '', stars: b.stars || 0, comment: b.comment || '', ts: new Date(b.createdAt || Date.now()).toISOString() });
          added++;
        });
        if (added) window.DB.set('reviews', list);
        return added;
      }).catch(function (e) { noop(e); return 0; });
    }
  };
})();
