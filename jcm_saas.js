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
  var PUBLIC_TRIGGER = { config: 1, horarios_v1: 1, services_over: 1, services_custom: 1, collab_form: 1 };
  var pubTimer = null;

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
      state.kvEmpty = snap.empty;
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
      horarios: (window.DB && window.DB.get('horarios_v1')) || null,
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
      loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-firestore-compat.js')
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
  var ready;
  if (!CONFIGURED) {
    ready = Promise.resolve(false); // modo local (mono-clínica) como hoy
  } else if (urlC) {
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
    access: access,
    migrateLocal: migrateLocal,
    hasLegacyData: hasLegacyData,
    isFreshClinic: function () { return state.kvEmpty; },
    getPublic: function () { return state.publicProfile || null; },
    publishProfile: publishProfile,
    bookingLink: function (cid) { return location.origin + '/reservar?c=' + (cid || state.clinicId || ''); },
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
    collabLink: function (cid) { return location.origin + '/colaborar.html?c=' + (cid || state.clinicId || ''); },
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
    // ── RESEÑAS (formulario público por clínica) ──
    reviewLink: function (cid) { return location.origin + '/review.html?c=' + (cid || state.clinicId || ''); },
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
