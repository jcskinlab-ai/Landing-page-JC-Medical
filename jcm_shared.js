/* jcm_shared.js — JC Medical v2 · Módulo compartido (datos, auth, noticias, YouTube) */
'use strict';

// ── CAPA DE DATOS (localStorage compartida entre app y admin) ──────────────
const DB = {
  _k: k => 'jcm_' + k,
  get(k)    { try { return JSON.parse(localStorage.getItem(this._k(k))); } catch(e) { return null; } },
  set(k, v) {
    try { localStorage.setItem(this._k(k), JSON.stringify(v)); return v; }
    catch(e) {
      // No fallar en silencio: un intake/ficha que no se guarda es un dato perdido.
      try { console.error('[JCM] No se pudo guardar "' + k + '" en este dispositivo:', e); } catch(_) {}
      try {
        if (!this._storageWarned && typeof window !== 'undefined' && window.alert) {
          this._storageWarned = true;
          window.alert('No se pudo guardar la información en este dispositivo (almacenamiento lleno o navegación privada). Anota los datos y reintenta o usa otro navegador.');
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
      firebase_config: ''  // Config web de Firebase (JSON) — activa la base de datos compartida en la nube
    };
    // Combina con lo guardado para que claves nuevas siempre tengan default.
    return Object.assign(def, this.get('config') || {});
  }
};

// ── SEGURIDAD ──────────────────────────────────────────────────────────────
const _JCM_SALT = 'jcm_medical_talca_2026_v2';

async function jcmHash(password) {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: enc.encode(_JCM_SALT), iterations: 100000, hash: 'SHA-256' },
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
  let s = (v || '').toString().toUpperCase().replace(/[^0-9K]/g, '');
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

// ── IMPRESIÓN CONFIABLE (iframe oculto; evita bloqueadores de pop-ups) ───────
// Recibe un documento HTML completo y lo imprime sin abrir una ventana nueva.
function jcmPrintHTML(html) {
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
if (typeof window !== 'undefined') window.jcmPrintHTML = jcmPrintHTML;

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
const _loginAttempts = {};

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

  const hash = await jcmHash(password);
  if (!hash) return { ok:false, msg:'Error interno. Intenta nuevamente.' };

  const cfg  = DB.cfg();
  const user = {
    id:          Date.now().toString(36) + Math.random().toString(36).substr(2,4),
    name:        name.trim(),
    phone:       phone.trim(),
    email:       em,
    hash,
    points:      cfg.pts_start || 500,
    bonus_given: true,
    created:     new Date().toISOString(),
    redeems:     []
  };
  users.push(user);
  DB.set('users', users);
  return { ok:true, user };
}

// Login con TELÉFONO + contraseña (acepta correo de cuentas antiguas).
async function jcmLogin(phone, password) {
  const ph  = jcmPhoneKey(phone);
  const em  = (phone || '').toLowerCase().trim();
  const key = ph || em;
  const att = _loginAttempts[key] || { n:0, t:0 };

  if (att.n >= 5 && Date.now() - att.t < 15 * 60 * 1000)
    return { ok:false, msg:'Demasiados intentos fallidos. Espera 15 minutos.' };

  const users = DB.get('users') || [];
  const user  = users.find(u => (ph && jcmPhoneKey(u.phone) === ph) || (em && u.email === em));
  if (!user) {
    att.n++; att.t = Date.now(); _loginAttempts[key] = att;
    return { ok:false, msg:'Teléfono no registrado.' };
  }

  const hash = await jcmHash(password);
  if (!hash || hash !== user.hash) {
    att.n++; att.t = Date.now(); _loginAttempts[key] = att;
    return { ok:false, msg:'Contraseña incorrecta.' };
  }

  _loginAttempts[key] = { n:0, t:0 };
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
let _adminAtt = { n: 0, t: 0 };

function jcmAdminHasPass() { try { return !!DB.get('admin_pass'); } catch (e) { return false; } }
function jcmAdminUser() { try { const r = DB.get('admin_pass'); return (r && r.user) || ''; } catch (e) { return ''; } }

// Crea/actualiza las credenciales del panel: usuario + contraseña (solo hash).
async function jcmAdminSetPass(pass, user) {
  if (!user || user.trim().length < 3) return { ok: false, msg: 'El usuario debe tener al menos 3 caracteres.' };
  if (!pass || pass.length < 8) return { ok: false, msg: 'La contraseña debe tener al menos 8 caracteres.' };
  const hash = await jcmHash(pass);
  if (!hash) return { ok: false, msg: 'Error interno. Intenta nuevamente.' };
  DB.set('admin_pass', { user: user.trim(), hash, created: new Date().toISOString() });
  jcmAdminStartSession();
  return { ok: true };
}

async function jcmAdminCheck(user, pass) {
  if (_adminAtt.n >= 5 && Date.now() - _adminAtt.t < 15 * 60 * 1000)
    return { ok: false, msg: 'Demasiados intentos. Espera 15 minutos.' };
  const rec = DB.get('admin_pass');
  const hash = await jcmHash(pass || '');
  const userOk = !rec || !rec.user || (user || '').trim().toLowerCase() === (rec.user || '').toLowerCase();
  if (!rec || !hash || hash !== rec.hash || !userOk) {
    _adminAtt.n++; _adminAtt.t = Date.now();
    return { ok: false, msg: 'Usuario o contraseña incorrectos.' };
  }
  _adminAtt = { n: 0, t: 0 };
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
      })).filter(it => it.h);

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
