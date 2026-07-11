/* ═══════════ JC Medical · Panel Móvil v3 (rediseño "Everest") ═══════════
   Fondo fijo con la foto del Everest (retrato) + tarjetas glass translúcidas,
   estilo editorial oscuro (referencia del usuario, look Apple/SaaS enterprise).
   Dedicado a teléfono — no se optimiza para iPad/tablet. */

// Gate del rediseño (mismo criterio que jc-admin.jsx): reconoce a Los Medique por el ownerEmail
// de la clínica activa o por el correo de la sesión. Este bundle no carga jc-admin.jsx, así que
// se duplica aquí (mismo email) en vez de depender de un archivo que no está presente.
var LOS_MEDIQUE_EMAIL = "makikarenina06@gmail.com";
function isLosMedique() {
  // PUSH GLOBAL (2026-07-02): rediseño liberado para todas las clínicas. Revertir = quitar `return true;`.
  return true;
  try {
    if (!(window.JCSAAS && window.JCSAAS.enabled)) return false;
    var owner = (((window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || {}).ownerEmail || "").toString().trim().toLowerCase();
    var sess = (window.JCSAAS.userEmail && window.JCSAAS.userEmail()) || "";
    return owner === LOS_MEDIQUE_EMAIL || sess === LOS_MEDIQUE_EMAIL;
  } catch (e) { return false; }
}
// Acento navy del rediseño (mismos valores que jc-admin.jsx), aplicado solo a Los Medique. En modo
// local (sin SaaS) no aplica — isLosMedique() ya devuelve false ahí, así se prueba con el tema real.
function jcmMobileTheme(base) {
  if (!isLosMedique()) return base;
  var nav = base.dark
    ? { accent: "#7891A6", accentDeep: "#61798E", accentSoft: "rgba(120,145,166,.14)", gold: "#9AA6B2" }
    : { accent: "#5C7488", accentDeep: "#495F6D", accentSoft: "rgba(92,116,136,.12)", gold: "#8A929B" };
  return Object.assign({}, base, nav);
}

const HALF_HOURS = (() => {
  const s = [];
  for (let h = 8; h < 20; h++) { s.push((h<10?"0":"")+h+":00"); s.push((h<10?"0":"")+h+":30"); }
  return s;
})();
const QUARTER_HOURS = (() => {
  const s = [];
  for (let h = 8; h < 20; h++) { ["00","15","30","45"].forEach(m => s.push((h<10?"0":"")+h+":"+m)); }
  return s;
})();
// ¿Es la clínica BASE (JC Medical, dueña de la plataforma)? Mismo criterio que scopeClinicData()
// en jc-admin.jsx (window.JCM_BASE) — se duplica aquí porque ese archivo no carga en el móvil, así
// que window.JCM_BASE nunca queda seteado en este bundle.
function clinicSeededM() {
  try {
    if (!(window.JCSAAS && window.JCSAAS.enabled)) return true; // modo local (sin SaaS) → clínica base
    const clinic = (window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || {};
    return clinic.isBase === true || ((clinic.ownerEmail||"").toLowerCase() === "jc.skinlab@gmail.com");
  } catch (e) { return false; }
}
// Intervalo de la agenda: cada 15 min para JC Medical (pedido — "en mi clínica agendo cada 15
// minutos"), cada 30 min para el resto de las clínicas del SaaS. Mismo criterio que adminSlots()
// en jc-admin.jsx (portal de escritorio), para que ambos coincidan.
function slotsM() { return clinicSeededM() ? QUARTER_HOURS : HALF_HOURS; }
const WDS = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const MESES_LARGOS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DOW_FULL = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

/* ═══ Mensajes de WhatsApp — EXACTOS a los del portal de escritorio (jcmCitaConfirmMsg /
   jcmConfirmAsistMsg en jc-admin.jsx) ═══ replicados aquí porque ese bundle no carga en el móvil. */
// Link "inteligente" de mapa (P11 en el portal): usa el link propio de la clínica si lo guardó,
// si no lo arma desde la dirección — en iPhone/Android abre la app nativa de Maps.
function clinicMapsLinkM() {
  try { const m = window.DB && window.DB.cfg && window.DB.cfg().clinic_maps; if (m && (""+m).trim()) return (""+m).trim(); } catch(e) {}
  let addr = "";
  try { const d = window.DB && window.DB.cfg && window.DB.cfg().clinic_addr; addr = (d && (""+d).trim()) || ""; } catch(e) {}
  if (!addr) return "";
  // Link CORTO (pedido, igual que en el portal): con clínica identificada, ir.html resuelve la
  // dirección desde el perfil público en Firestore por id — mucho más corto que la dirección
  // completa codificada en la URL.
  let cid = ""; try { cid = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId()) || ""; } catch(e) {}
  return cid ? ("https://www.medique.cl/ir?c="+encodeURIComponent(cid)) : ("https://www.medique.cl/ir?to="+encodeURIComponent(addr));
}
// ¿Es un "control" (evaluación post-procedimiento)? Misma lógica que el portal de escritorio
// (esControlPostProc en jc-admin.jsx): la cita es una evaluación Y el paciente ya tiene al menos
// una sesión de un procedimiento real (no otra evaluación) en su historial de ficha.
function esControlPostProcM(proc, pat) {
  if (!/evaluaci/i.test(proc || "")) return false;
  const hist = (pat && Array.isArray(pat.history)) ? pat.history : [];
  return hist.some(h => h && h.proc && !/evaluaci/i.test(h.proc));
}
// Mensaje de confirmación al CREAR una cita nueva — usa la plantilla propia de la clínica
// (DB.cfg().msg_tpl_confirm, editable en Reportes → Plantillas de mensajes) si existe; si no,
// el texto predeterminado (jcm_shared.js — la MISMA plantilla que usa el portal de escritorio).
// esControl (opcional): si es true, agrega la política de reagendamiento pagado del control post-procedimiento.
// Primer nombre (token {primernombre} de las plantillas): más personal que el nombre completo.
function jcmFirstNameM(name) { return (""+(name||"")).trim().split(/\s+/)[0] || ""; }
function jcmCitaConfirmMsgM(name, iso, time, proc, prof, clinNombre, clinDir, esControl) {
  const d = new Date(iso+"T12:00:00");
  const wd = WDS[d.getDay()], dd = d.getDate(), mm = MESES[d.getMonth()];
  const maps = clinicMapsLinkM();
  let tpl = ""; try { tpl = window.DB && window.DB.cfg && window.DB.cfg().msg_tpl_confirm; } catch(e) {}
  tpl = (tpl && (""+tpl).trim()) || window.DEFAULT_TPL_CONFIRM;
  const politica = esControl ? " El primer reagendamiento es gratuito; desde el segundo tiene un costo de $10.000." : "";
  return window.fillMsgTpl(tpl, { nombre:name, primernombre:jcmFirstNameM(name), clinica:clinNombre, fecha: wd+" "+dd+" "+mm, hora:time, tratamiento:proc, profesional:prof||"", direccion:clinDir||"", mapa:maps||"", politica });
}
// Mensaje del botón "Confirmar asistencia" — usa la plantilla propia de la clínica
// (DB.cfg().msg_tpl_asist) si existe; si no, el texto predeterminado (jcm_shared.js).
function jcmConfirmAsistMsgM(a, clinNombre) {
  const maps = clinicMapsLinkM();
  let fecha = "";
  try { if (a.fecha) fecha = new Date(a.fecha+"T00:00:00").toLocaleDateString("es-CL", { weekday:"long", day:"numeric", month:"long" }); } catch(e) {}
  let tpl = ""; try { tpl = window.DB && window.DB.cfg && window.DB.cfg().msg_tpl_asist; } catch(e) {}
  tpl = (tpl && (""+tpl).trim()) || window.DEFAULT_TPL_ASIST;
  return window.fillMsgTpl(tpl, { nombre:a.name||"", primernombre:jcmFirstNameM(a.name), clinica:clinNombre, fecha:fecha||"", hora:a.time||"", tratamiento:a.proc||"", mapa:maps||"" });
}

function minsM(t) { if (!t) return 0; const [h,m] = t.split(":"); return parseInt(h)*60+parseInt(m||0); }
// Estados OFICIALES de una cita (pedido explícito del usuario): Agendado · Confirmado · Atendido ·
// No asistió · Cancelada. "Agendado" es el estado por defecto (antes se mostraba "Pendiente").
const STATUS_STEPS = [
  { key: "pendiente",   label: "Agendado" },
  { key: "confirmada",  label: "Confirmado" },
  { key: "atendida",    label: "Atendido" },
  { key: "no_asistio",  label: "No asistió" },
  { key: "anulada",     label: "Cancelar" }
];
// Colores de estado tonificados para leer sobre la foto OSCURA del panel móvil (los del escritorio
// —#1A50A3, #B8860B— quedaban muy apagados sobre el fondo). Mismo mapeo de colores que el portal
// (pedido): Agendado=azul, Confirmado=verde, Atendido=dorado, No asistió=rojo.
function apptStateM(a, T) {
  // Color de la BARRA lateral y el punto (tokens del MD: verde/amarillo/rojo/azul).
  // Fix (revisión post-audit): usaba T.textFaint — un token de baja opacidad pensado para texto
  // secundario, no para pintar una píldora — que además cambia de opacidad por tema. Sobre el
  // fondo fijo #141B26 de la píldora, texto y fondo quedaban casi del mismo tono → invisible.
  // T.mutedPill es un gris SÓLIDO (#5B6570, igual en ambos temas), como el resto de los estados.
  if (a.status === "anulada")        return { label: "Cancelada",   color: T.mutedPill };
  if (a.status === "no_asistio")     return { label: "No asistió",  color: "#FF6B7D" };
  if (a.attended || a.status === "atendida") return { label: "Atendida", color: "#F5B93D" };
  if (a.status === "confirmada")     return { label: "Confirmada",  color: "#46D27A" };
  if (a.status === "pendiente_pago") return { label: "⏳ Transferencia", color: "#F5B93D" };
  // "Agendado" (pendiente de confirmar) = azul, como en el portal.
  return { label: "Agendado", color: "#6EA8E8" };
}
// PRUEBA (rama movil-diseno-portal): tarjeta de cita "tintada" por estado — mismo lenguaje que el
// portal de escritorio (jc-admin.jsx, vista semanal "v2 Medilink barra"), que tiñe TODA la tarjeta
// con el color del estado (glass esmerilado, deja ver la foto detrás) en vez de solo un punto de
// color. Reemplaza el punto lateral: el tinte + el badge de procedimiento ya bastan para leer el
// estado de un vistazo (misma razón que documenta jc-admin.jsx).
function apptCardTintM(color) {
  // PRUEBA: mismo tinte PLANO (sin degradado) que usa el portal en sus tarjetas de cita "v2 lux"
  // (jc-admin.jsx: accentColor+"1e" fondo, glassBlur.small, accentColor+"2a" borde) — antes tenía
  // un degradado propio del móvil que se veía forzado, igual que glassPanel/glassChip.
  return {
    background: color + "1e",
    backdropFilter: "blur(12px) saturate(1.25)", WebkitBackdropFilter: "blur(12px) saturate(1.25)",
    border: "1px solid " + color + "2a"
  };
}
// Usa hora local del dispositivo, NO UTC (evita el desfase de zona horaria)
function localISO(d) {
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}
function todayISO() { return localISO(new Date()); }
function offToISO(off) { const d = new Date(); d.setDate(d.getDate()+off); return localISO(d); }
function isoToDayOff(iso) { const d = new Date(iso+"T00:00:00"), t = new Date(); t.setHours(0,0,0,0); return Math.round((d-t)/86400000); }
// Mes calendario ACTUAL (real, no el que se esté navegando en la agenda) — pedido: al buscar por
// procedimiento, solo sirve para planear stock del mes en curso; un match de mes pasado o futuro
// ensucia esa lectura. Los matches por nombre/RUT (buscar una cita puntual) no usan esto.
function inCurrentMonth(iso) {
  const now = new Date(), d = new Date(iso+"T00:00:00");
  return d.getFullYear()===now.getFullYear() && d.getMonth()===now.getMonth();
}
// Etiqueta de día relativa (Hoy/Mañana/Ayer) o "Jue 9 Jul" para el resto — compartida por el
// buscador de Agenda y los divisores de día de "Próximas citas" en Inicio.
function dayLabelM(iso) {
  const off = isoToDayOff(iso);
  if (off === 0) return "Hoy";
  if (off === 1) return "Mañana";
  if (off === -1) return "Ayer";
  const d = new Date(iso+"T00:00:00");
  return WDS[d.getDay()] + " " + d.getDate() + " " + MESES[d.getMonth()];
}
// Desplaza una fecha ISO ±N días (para los steppers ‹ › del prototipo, en la hoja de cita y Nueva cita).
function shiftDateM(iso, delta) { const d = new Date((iso||todayISO())+"T12:00:00"); d.setDate(d.getDate()+delta); return localISO(d); }
// Hora de término de una cita = inicio + duración (o el campo end si viene). Solo para PRESENTACIÓN
// (línea "hora fin" bajo la hora en las tarjetas del prototipo); no toca datos ni horarios.
function apptEndM(a) {
  if (a && a.end) return a.end;
  if (!a || !a.time) return "";
  const start = minsM(a.time);
  const dur = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
  const e = start + dur, h = Math.floor(e/60), m = e%60;
  return (h<10?"0":"")+h+":"+(m<10?"0":"")+m;
}
function procList() { try { return window.JCDATA.catalog.reduce((a,s) => { s.groups.forEach(g => g.items.forEach(it => a.push(it.n))); return a; }, []); } catch(e) { return []; } }
function durOf(a) { const d = a.dur || (window.JCDATA&&window.JCDATA.procMin ? window.JCDATA.procMin(a.proc)+" min" : "30 min"); return (""+d).replace(/\s*minutos?\b/i, " min").trim(); }
// Hora de término de una cita (HH:MM) = inicio + duración real. Para la columna derecha de la
// tarjeta de cita en la lista de Agenda/Inicio (prototipo: hora inicio grande + hora fin chica).
function endTimeM(a) {
  const start = minsM(a.time);
  const dur = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
  const e = start + dur, hh = Math.floor(e/60)%24, mm = ((e%60)+60)%60;
  return (hh<10?"0":"")+hh+":"+(mm<10?"0":"")+mm;
}

/* ─── Semana (lunes a domingo) que CONTIENE la fecha dada ───
   Reemplaza los antiguos "7 días fijos desde hoy": aquella lista nunca incluía un día elegido
   desde la vista Mes si caía fuera de esa ventana (pasado, u otro mes) — el selector de días
   no tenía ningún botón que marcar como seleccionado y parecía "bugeado". Ahora la tira siempre
   se recalcula a partir del día seleccionado, así que cualquier fecha (pasada, futura, de otro
   mes) queda representada y marcada correctamente; deslizar la tira avanza/retrocede semana. */
/* ─── Fondo Everest + glass (referencia: iOS 26 "liquid glass") ───
   El panel móvil vive SIEMPRE sobre la foto (wallpaper de iPhone), que es oscura. Por eso se fuerza
   una paleta "sobre foto": texto claro + glass translúcido de verdad (frost, deja ver la montaña),
   sin importar el tema día/noche del resto del sistema. photoTheme() lo aplica una sola vez en los
   entry points y TODA la app hereda el mismo lenguaje. */
const ON_PHOTO = { text: "#F5F7FB", mute: "rgba(235,242,252,.72)", faint: "rgba(235,242,252,.5)" };
// Fuente sans del panel móvil = Jost (la del prototipo aprobado "Claude Design", 10-jul-2026).
// Reemplaza a SF Pro: el mockup nuevo usa Jost en todo el cuerpo/labels/botones y Fraunces en
// títulos/números/nombres (ver FRAUNCES más abajo). Cargada en JC_Mobile.html junto a Fraunces.
const JOST = "'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Roboto, sans-serif";
// Fraunces — serif de marca del prototipo aprobado, la MISMA serif real del portal de escritorio
// (navyAccent). En el mockup nuevo se usa en TODOS los títulos grandes, números (KPIs, hora de
// citas, días de calendario) y nombres de paciente — no solo los 3 puntos puntuales de antes.
const FRAUNCES = "'Fraunces', Georgia, serif";
/* ═══ Sistema de tema claro/oscuro del panel móvil (rediseño v2 "Medique") ═══
   Dos paletas completas + un builder que arma el objeto T según el modo. Reemplaza al antiguo
   photoTheme() que forzaba oscuro-sobre-foto. El modo se persiste en localStorage y se eleva a los
   entry points (MobileAdmin/MobileSaasGate) para que TODO el árbol reciba el T correcto. */
const MOBILE_THEME_KEY = "jcm_mobile_theme";
function readMobileMode() { try { return localStorage.getItem(MOBILE_THEME_KEY) === "light" ? "light" : "dark"; } catch (e) { return "dark"; } }
function writeMobileMode(m) { try { localStorage.setItem(MOBILE_THEME_KEY, m); } catch (e) {} }

// Constantes compartidas (idénticas en ambos temas) — colores de estado/acción del portal.
const THEME_SHARED = {
  gold: "#D8B36A", goldText: "#241C0E", red: "#CC5B54", redText: "#FFFFFF",
  mutedPill: "#A9B4BE", onAccent: "#10181F", green: "#4CAF78",
  serif: FRAUNCES, sans: JOST,
};
const THEME_DARK = {
  dark: true, bg: "#05080F",
  bgRadial: "radial-gradient(130% 90% at 50% -12%, #16304F 0%, #0B1524 55%, #05080F 100%)",
  heroBg: "linear-gradient(180deg, rgba(9,13,22,.55) 0%, rgba(9,13,22,.92) 100%), radial-gradient(90% 55% at 78% 6%, rgba(120,145,166,.22), transparent 55%), radial-gradient(150% 120% at 50% -18%, #1c3552 0%, #0e1c2f 42%, #05080f 82%)",
  text: "#F2F5F8", text2: "rgba(242,245,248,.62)", text3: "rgba(242,245,248,.58)",
  accent: "#7891A6", accentStrong: "#9DB2C3", accentSoft: "rgba(120,145,166,.16)", accentBorder: "rgba(120,145,166,.55)",
  glassFill: "rgba(21,29,44,.62)", glassHl: "rgba(255,255,255,.07)", glassBorder: "rgba(255,255,255,.1)",
  glassShadow: "0 24px 55px -22px rgba(3,6,12,.72)",
  flatFill: "rgba(255,255,255,.045)", flatBorder: "rgba(255,255,255,.08)", divider: "rgba(255,255,255,.1)",
  inputFill: "rgba(255,255,255,.055)", inputBorder: "rgba(255,255,255,.09)", navFill: "rgba(18,25,38,.6)",
};
const THEME_LIGHT = {
  dark: false, bg: "#D2D9DE",
  bgRadial: "radial-gradient(130% 90% at 50% -12%, #EEF2F5 0%, #E1E6EA 55%, #D2D9DE 100%)",
  heroBg: "linear-gradient(180deg, rgba(255,255,255,.35) 0%, rgba(222,229,234,.88) 100%), radial-gradient(90% 55% at 78% 6%, rgba(92,116,136,.16), transparent 55%), radial-gradient(150% 120% at 50% -18%, #EEF2F5 0%, #E1E6EA 45%, #C9D1D7 85%)",
  text: "#1B2430", text2: "rgba(27,36,48,.62)", text3: "rgba(27,36,48,.74)",
  accent: "#5C7488", accentStrong: "#3F5163", accentSoft: "rgba(92,116,136,.14)", accentBorder: "rgba(92,116,136,.5)",
  glassFill: "rgba(255,255,255,.68)", glassHl: "rgba(255,255,255,.7)", glassBorder: "rgba(20,30,45,.1)",
  glassShadow: "0 18px 40px -20px rgba(20,30,45,.25)",
  flatFill: "rgba(20,30,45,.035)", flatBorder: "rgba(20,30,45,.08)", divider: "rgba(20,30,45,.1)",
  inputFill: "rgba(20,30,45,.045)", inputBorder: "rgba(20,30,45,.09)", navFill: "rgba(255,255,255,.6)",
};
// Arma el objeto de tema T; mapea también los tokens LEGACY que ya usa el código (textMute/textFaint/
// line/lineSoft) a los nuevos, para no tener que tocar cada referencia antigua.
function buildMobileTheme(mode) {
  const base = mode === "light" ? THEME_LIGHT : THEME_DARK;
  const t = Object.assign({}, THEME_SHARED, base);
  t.textMute = t.text2; t.textFaint = t.text3;
  t.line = t.glassBorder; t.lineSoft = t.divider;
  return t;
}
// Glass NAVY del prototipo aprobado ("Claude Design", 10-jul-2026) — reemplaza al tinte blanco
// plano que se replicó del portal de escritorio. El mockup nuevo usa un tinte navy oscuro marcado
// (rgba(21,29,44,…)) con blur(28px) saturate(1.3), no un frost casi transparente. glassPanel es
// para superficies grandes (tarjetas, overlays); glassChip usa el mismo tinte algo más sutil para
// superficies chicas (pills, botones circulares). El inset-highlight se sube un poco de opacidad
// para que siga siendo perceptible sobre el tinte navy (antes calibrado para el tinte blanco).
function glassPanel(T, radius) {
  return {
    background: T.glassFill,
    backdropFilter: "blur(28px) saturate(1.3)", WebkitBackdropFilter: "blur(28px) saturate(1.3)",
    border: "1px solid " + T.glassBorder, borderTop: "1px solid " + T.glassHl,
    borderRadius: radius==null?20:radius,
    boxShadow: T.glassShadow
  };
}
function glassChip(T) {
  return {
    background: T.glassFill,
    backdropFilter: "blur(28px) saturate(1.3)", WebkitBackdropFilter: "blur(28px) saturate(1.3)",
    border: "1px solid " + T.glassBorder, borderTop: "1px solid " + T.glassHl,
    boxShadow: T.glassShadow
  };
}
// Fondo del panel: gradiente del TEMA en TODAS las pantallas (la foto Everest ya solo vive en el
// login). hero=true usa el gradiente hero (Inicio); si no, el radial base (overlays, menú, raíz).
function PhotoBgLayers({ T, hero }) {
  return <div style={{ position:"absolute", inset:0, background: hero ? T.heroBg : T.bgRadial }} />;
}
// Fondo de la pantalla de LOGIN: foto del Everest (evapp, pedido del usuario 10-jul) NÍTIDA para
// que se vea la montaña + velo navy en degradado (más suave arriba, donde está el cielo, y más
// denso hacia el centro/abajo donde vive el formulario) para mantener el texto/los inputs legibles.
// Esta foto vive SOLO en el login; el resto del panel usa su propio fondo (PhotoBgLayers).
function LoginVideoBg({ children }) {
  const overlay = "linear-gradient(180deg, rgba(9,11,15,.42) 0%, rgba(9,11,15,.62) 45%, rgba(9,11,15,.82) 100%)";
  return (
    <div style={{ position:"relative", minHeight:"100dvh", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"30px 24px", backgroundColor:"#070707" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"url('/assets/evapp-login.jpg?v=1')", backgroundSize:"cover", backgroundPosition:"center top", backgroundRepeat:"no-repeat" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:overlay }} />
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:340, display:"flex", flexDirection:"column", alignItems:"center" }}>{children}</div>
    </div>
  );
}

/* ─── Pacientes (helpers de datos — este bundle no carga jc-admin.jsx) ─── */
// Consentimientos pendientes — misma lógica que window.jcmConsentPending del portal (jc-admin-b.jsx),
// replicada aquí porque ese bundle NO carga en el móvil. Pacientes SIN consentimiento firmado que
// tienen una cita activa próxima (no evaluación, no anulada/atendida/no_asistió). Matchea por
// id/nombre/RUT/teléfono para no perder citas creadas desde la agenda.
function consentPendingM(patients, appts) {
  appts = appts || [];
  const rutN = r => ("" + (r || "")).replace(/[^0-9kK]/g, "").toLowerCase();
  const telN = t => ("" + (t || "")).replace(/\D/g, "").slice(-8);
  const needId = new Set(), needNm = new Set(), needRut = new Set(), needTel = new Set();
  appts.forEach(a => {
    if (["anulada","cancelada","no_asistio","atendida"].indexOf(a.status) >= 0 || a.attended) return;
    if (/evaluaci/i.test(a.proc || "")) return;
    if (a.patId) needId.add(a.patId);
    const nm = (a.name || "").toLowerCase().trim(); if (nm) needNm.add(nm);
    const r = rutN(a.rut); if (r.length >= 6) needRut.add(r);
    const t = telN(a.phone); if (t.length === 8) needTel.add(t);
  });
  return (patients || []).filter(p => {
    if (p.consent) return false;
    if (needId.has(p.id)) return true;
    if (needNm.has((p.name || "").toLowerCase().trim())) return true;
    const r = rutN(p.rut); if (r.length >= 6 && needRut.has(r)) return true;
    const t = telN(p.phone); if (t.length === 8 && needTel.has(t)) return true;
    return false;
  });
}
function patientsAll() { try { return (window.DB && window.DB.get("patients")) || []; } catch (e) { return []; } }
function savePatientsM(list) { try { window.DB && window.DB.set("patients", list); } catch (e) {} }
function addPatientM(p) {
  const np = { id: "p" + Date.now().toString(36) + Math.random().toString(36).slice(2,5), name: "", rut: "", phone: "", email: "", age: 0, notas: "", ...p };
  savePatientsM([...patientsAll(), np]);
  return np;
}
function updatePatientM(id, patch) { savePatientsM(patientsAll().map(x => x.id === id ? { ...x, ...patch } : x)); }
// Mismo criterio que el panel de escritorio: nombre exacto primero (más confiable que el teléfono,
// que puede compartirse entre familiares), luego teléfono, luego nombre parcial.
function matchPatientForApptM(appt, patients) {
  const clean = s => (s||"").replace(/\D/g,"");
  const an = (appt.name||"").toLowerCase().trim();
  let found = patients.find(x => (x.name||"").toLowerCase().trim() === an);
  if (found) return found;
  const ap = clean(appt.phone||"");
  if (ap.length >= 8) found = patients.find(x => { const xp = clean(x.phone||""); return xp.length >= 8 && xp.slice(-8) === ap.slice(-8); });
  if (found) return found;
  if (an.length >= 4) found = patients.find(x => { const xn = (x.name||"").toLowerCase(); return xn.startsWith(an.split(" ")[0]) || an.startsWith(xn.split(" ")[0]); });
  return found || null;
}

/* ─── Login ─── */
function LoginScreen({ T, onAuth }) {
  const setup = !window.jcmAdminHasPass || !window.jcmAdminHasPass();
  const [user, setUser] = useState(setup ? "admin" : "");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit() {
    if (!pass.trim()) return;
    setBusy(true); setErr("");
    try {
      const storedUser = (window.jcmAdminUser && window.jcmAdminUser()) || user || "admin";
      const r = setup ? await window.jcmAdminSetPass(pass, user||"admin") : await window.jcmAdminCheck(storedUser, pass);
      if (!r.ok) { setErr(r.msg); setBusy(false); return; }
      window.jcmAdminStartSession && window.jcmAdminStartSession();
      onAuth();
    } catch(e) { setErr("Error de conexión"); setBusy(false); }
  }
  // Aspecto IDÉNTICO al login del portal de escritorio (SaasGate, jc-admin.jsx): sin logo, eyebrow
  // en el color de acento, serif fina, inputs opacos con radio 6 (no glass translúcido).
  const SERIF = FRAUNCES; // la serif real del portal (Fraunces), no Marcellus
  const inp = { width:"100%", fontFamily:T.sans, fontSize:16, padding:"14px 16px", borderRadius:6, border:"1px solid rgba(255,255,255,.14)", background:"rgba(20,22,28,.85)", color:"#fff", outline:"none", boxSizing:"border-box" };
  const btnSober = { width:"100%", background:"rgba(235,238,242,.92)", color:"#15181D", fontFamily:T.sans, fontSize:12, fontWeight:500, letterSpacing:".14em", textTransform:"uppercase", border:"none", borderRadius:6, padding:"14px", cursor:"pointer", marginTop:4 };
  return (
    <LoginVideoBg>
      <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".28em", textTransform:"uppercase", color:T.accent, textAlign:"center" }}>Medique · Panel móvil</div>
      <h1 style={{ fontFamily:SERIF, fontWeight:300, fontSize:34, color:"#fff", textAlign:"center", margin:"12px 0 6px", lineHeight:1.05 }}>Acceso privado</h1>
      <p style={{ fontFamily:T.sans, fontSize:12.5, color:ON_PHOTO.mute, textAlign:"center", lineHeight:1.6, margin:"0 0 22px" }}>Accede al panel de tu clínica.</p>
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:11 }}>
        {setup && <input placeholder="Usuario" value={user} onChange={e=>setUser(e.target.value)} style={inp} />}
        <input type="password" placeholder="Contraseña del panel" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} style={inp} />
        {err && <div style={{ fontFamily:T.sans, fontSize:12, color:T.red, textAlign:"center" }}>{err}</div>}
        <button onClick={submit} disabled={busy} style={{ ...btnSober, opacity:busy?.6:1 }}>
          {busy?"…":(setup?"Crear acceso":"Entrar")}
        </button>
      </div>
    </LoginVideoBg>
  );
}

/* ═══════════ Hoja de acciones de una cita (ApptSheet) ═══════════
   Reemplaza el antiguo acordeón inline: se abre al tocar CUALQUIER cita (Inicio, Agenda) y permite
   cambiar entre los 5 estados oficiales, editar, comentar, restaurar si está cancelada y abrir la
   ficha del paciente. Un solo componente para toda la app — nada de lógica duplicada. */
function ApptSheet({ T, appt:a, patients, onClose, updateAppt, cancelAppt, restoreAppt, confirmPago, onOpenFicha }) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [editCom, setEditCom] = useState(false);
  const [comTxt, setComTxt] = useState(a.comentario||"");
  const [edit, setEdit] = useState(false);
  const [ef, setEf] = useState({ fecha: a.fecha || todayISO(), time: a.time || "10:00", dur: (parseInt(a.dur) || 30) + "", proc: a.proc || "" });
  const procOpts = (() => { try { return (window.JCDATA && window.JCDATA.catalog ? procList() : []) || []; } catch (e) { return []; } })();
  const isPend = a.status === "pendiente_pago";
  const isAnulada = a.status === "anulada";
  const st = apptStateM(a, T);
  const clinNombre = (() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return (n && (""+n).trim()) || "la clínica"; } catch(e) { return "la clínica"; } })();
  const clinDir = (() => { try { const d = window.DB && window.DB.cfg && window.DB.cfg().clinic_addr; return (d && (""+d).trim()) || ""; } catch(e) { return ""; } })();
  const rawPhone = (a.phone||"").replace(/\D/g,"");
  const waPhone = rawPhone.length>=8 ? rawPhone : "";
  const durLabel = durOf(a);
  const matched = useMemo(() => matchPatientForApptM(a, patients||[]), [a, patients]);

  function setStatus(key) {
    if (key === "anulada") { setConfirmCancel(true); return; }
    updateAppt(a.id, { status: key === "pendiente" ? "pendiente" : key, attended: key === "atendida" });
    onClose();
  }

  // Bottom-sheet del prototipo v2 (líneas ~717-799): hoja que sube desde abajo sobre T.bgRadial,
  // radio 24 24 0 0, handle arriba. Toda la lógica real se conserva; solo cambia la composición.
  const sheet = { width:"100%", maxWidth:480, maxHeight:"84dvh", overflowY:"auto", background:T.bgRadial, borderRadius:"24px 24px 0 0", padding:"10px 20px calc(28px + env(safe-area-inset-bottom,0px))", boxSizing:"border-box", boxShadow:"0 -20px 50px rgba(0,0,0,.4)", borderTop:"1px solid "+T.glassBorder };
  const inp = { width:"100%", boxSizing:"border-box", fontFamily:T.sans, fontSize:13, padding:"8px 10px", borderRadius:8, border:"1px solid "+T.glassBorder, background:T.glassFill, color:T.text, outline:"none" };
  const initials = (a.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase();
  // Stepper circular ‹ / › (prototipo) para desplazar la fecha en el editor.
  // Touch target mínimo 44×44 (audit P2): el círculo visual queda en 28px, el hit-area invisible
  // llega a 44px (mismo patrón ya usado en otros botones icon-only del archivo).
  const stepBtn = (dir, onClick) => (
    <button onClick={onClick} aria-label={dir<0?"Día anterior":"Día siguiente"} style={{ width:44, height:44, borderRadius:"50%", background:"none", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
      <span style={{ width:28, height:28, borderRadius:"50%", background:T.glassFill, border:"1px solid "+T.glassBorder, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d={dir<0?"M15 5l-7 7 7 7":"M9 5l7 7-7 7"}/></svg>
      </span>
    </button>
  );

  return (
    <div onMouseDown={e=>{ if (e.target===e.currentTarget) onClose(); }} style={{ position:"fixed", inset:0, zIndex:300, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(2,4,8,.6)" }}>
      <div onClick={e=>e.stopPropagation()} className="no-sb" style={sheet}>
        <div style={{ width:36, height:5, borderRadius:100, background:T.divider, margin:"0 auto 16px" }} />
        <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:"50%", background:T.accentSoft, border:"1px solid "+T.accentBorder, color:T.accentStrong, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.serif, fontSize:14, fontWeight:600, flexShrink:0 }}>
            {initials}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:T.serif, fontSize:19, fontWeight:600, color:T.text, lineHeight:1.2 }}>{a.name}</div>
            <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute, marginTop:2 }}>{a.time} · {a.proc||"—"} · {durLabel}</div>
            {matched && <button onClick={()=>onOpenFicha(matched.id)} style={{ marginTop:6, background:"none", border:"none", padding:0, cursor:"pointer", fontFamily:T.sans, fontSize:12, color:T.accentStrong }}>Ver ficha del paciente →</button>}
          </div>
          {/* Touch target 44×44 (audit P2): antes 32×32. */}
          <button onClick={onClose} aria-label="Cerrar" style={{ flexShrink:0, width:44, height:44, borderRadius:"50%", border:"none", background:"none", color:T.textMute, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginRight:-6, marginTop:-6 }}>
            <span style={{ width:32, height:32, borderRadius:"50%", border:"1px solid "+T.flatBorder, background:T.flatFill, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>
            </span>
          </button>
        </div>

        {isPend && (
          <button onClick={()=>{ confirmPago(a.id); onClose(); }}
            style={{ width:"100%", background:"#1F8A5B", color:"#fff", fontFamily:T.sans, fontSize:12.5, letterSpacing:".08em", textTransform:"uppercase", border:"none", borderRadius:12, padding:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:16 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            Confirmar transferencia
          </button>
        )}

        {isAnulada ? (
          <div style={{ marginTop:20 }}>
            <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.textMute, marginBottom:10, lineHeight:1.5 }}>Esta cita está cancelada. Restaurarla la vuelve a dejar agendada y ocupa el horario nuevamente.</div>
            <button onClick={()=>{ restoreAppt(a.id); onClose(); }} style={{ width:"100%", background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:14, fontWeight:600, border:"none", borderRadius:14, padding:"14px", cursor:"pointer" }}>Restaurar cita</button>
          </div>
        ) : (
          <div>
            <div style={{ fontFamily:T.sans, fontWeight:500, fontSize:10.5, letterSpacing:".1em", textTransform:"uppercase", color:T.textFaint, margin:"20px 0 10px" }}>Estado de la cita</div>
            {/* Grilla 2col de los 4 estados; "Cancelar" va en su propia fila roja (prototipo). El
                color OFICIAL del estado activo (apptStateM) marca el botón seleccionado. */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
              {STATUS_STEPS.filter(s=>s.key!=="anulada").map(s => {
                const on = (s.key==="pendiente" ? (a.status==="pendiente"||!a.status) : a.status===s.key) || (s.key==="atendida" && a.attended);
                const stColor = apptStateM(s.key==="atendida"?{attended:true}:{status:s.key}, T).color;
                return (
                  <button key={s.key} onClick={()=>setStatus(s.key)}
                    style={{ textAlign:"center", padding:"13px 8px", borderRadius:14, cursor:"pointer",
                      background: on ? stColor+"26" : T.flatFill,
                      border:"1.4px solid "+(on ? stColor : T.flatBorder),
                      fontFamily:T.sans, fontWeight:600, fontSize:13, color: on ? stColor : T.text }}>
                    {s.label}
                  </button>
                );
              })}
            </div>
            {!confirmCancel ? (
              <button onClick={()=>setConfirmCancel(true)} style={{ display:"block", width:"100%", marginTop:9, textAlign:"center", padding:"13px 8px", borderRadius:14, border:"1.4px solid "+T.red, background:"transparent", cursor:"pointer", fontFamily:T.sans, fontWeight:600, fontSize:13, color:T.red }}>Cancelar</button>
            ) : (
              <div style={{ display:"flex", gap:9, marginTop:9 }}>
                <button onClick={()=>setConfirmCancel(false)} style={{ flex:1, padding:"13px", borderRadius:14, border:"1px solid "+T.line, background:"transparent", color:T.textMute, fontFamily:T.sans, fontSize:13, cursor:"pointer" }}>Volver</button>
                <button onClick={()=>{ cancelAppt(a.id); onClose(); }} style={{ flex:1, padding:"13px", borderRadius:14, border:"none", background:T.red, color:"#fff", fontFamily:T.sans, fontSize:13, fontWeight:600, cursor:"pointer" }}>Sí, cancelar</button>
              </div>
            )}
          </div>
        )}

        {/* Agregar comentario (togglea textarea; guarda el comentario real al perder el foco). */}
        <button onClick={()=>{ setComTxt(a.comentario||""); setEditCom(v=>!v); }} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", marginTop:14, padding:"13px 14px", borderRadius:14, background:T.flatFill, border:"1px solid "+T.flatBorder, cursor:"pointer", textAlign:"left" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v12H8l-4 4V4Z"/></svg>
          <span style={{ fontFamily:T.sans, fontSize:13.5, color:a.comentario?T.text:T.text, flex:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{editCom ? "Agregar comentario" : (a.comentario || "Agregar comentario")}</span>
        </button>
        {editCom && (
          <textarea value={comTxt} onChange={e=>setComTxt(e.target.value)} onBlur={()=>updateAppt(a.id,{comentario:comTxt.trim()||undefined})} placeholder="Escribe una nota interna…" autoFocus rows={2}
            style={{ width:"100%", boxSizing:"border-box", marginTop:8, minHeight:64, borderRadius:12, background:T.flatFill, border:"1px solid "+T.flatBorder, color:T.text, fontFamily:T.sans, fontSize:13, padding:"10px 12px", resize:"none", outline:"none" }} />
        )}

        {/* Editar fecha, hora, duración o procedimiento (togglea el editor real con steppers ‹ ›). */}
        <button onClick={()=>{ if(!edit) setEf({ fecha:a.fecha||todayISO(), time:a.time||"10:00", dur:(parseInt(a.dur)||30)+"", proc:a.proc||"" }); setEdit(v=>!v); }} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", marginTop:9, padding:"13px 14px", borderRadius:14, background:T.flatFill, border:"1px solid "+T.flatBorder, cursor:"pointer", textAlign:"left" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l4-1 10-10-3-3L5 16l-1 4Z"/></svg>
          <span style={{ fontFamily:T.sans, fontSize:13.5, color:T.text, flex:1 }}>Editar fecha, hora, duración o procedimiento</span>
        </button>
        {edit && (
          <div style={{ marginTop:8, padding:14, borderRadius:14, background:T.flatFill, border:"1px solid "+T.flatBorder, display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Fecha</span>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                {stepBtn(-1, ()=>setEf(f=>({...f, fecha:shiftDateM(f.fecha,-1)})))}
                <span style={{ fontFamily:T.sans, fontWeight:500, fontSize:12.5, color:T.text, minWidth:88, textAlign:"center" }}>{dayLabelM(ef.fecha)}</span>
                {stepBtn(1, ()=>setEf(f=>({...f, fecha:shiftDateM(f.fecha,1)})))}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Hora</span>
              <input type="time" value={ef.time} onChange={e=>setEf(f=>({...f,time:e.target.value}))} style={{ ...inp, width:"auto" }} />
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Duración</span>
              <select value={ef.dur} onChange={e=>setEf(f=>({...f,dur:e.target.value}))} style={{ ...inp, width:"auto" }}>{["15","30","45","60","90","120"].map(d=><option key={d} value={d}>{d} min</option>)}</select>
            </div>
            <div>
              <span style={{ fontFamily:T.sans, fontSize:12, color:T.textMute, display:"block", marginBottom:6 }}>Procedimiento</span>
              {procOpts.length
                ? <select value={ef.proc} onChange={e=>setEf(f=>({...f,proc:e.target.value}))} style={inp}>{[ef.proc, ...procOpts.filter(p=>p!==ef.proc)].filter(Boolean).map(p=><option key={p} value={p}>{p}</option>)}</select>
                : <input value={ef.proc} onChange={e=>setEf(f=>({...f,proc:e.target.value}))} placeholder="Procedimiento" style={inp} />}
            </div>
            <button onClick={()=>{ updateAppt(a.id,{ fecha:ef.fecha, day:isoToDayOff(ef.fecha), time:ef.time, dur:ef.dur+" minutos", proc:ef.proc }); setEdit(false); }} style={{ height:44, borderRadius:12, border:"none", background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:14, fontWeight:600, cursor:"pointer" }}>Guardar cambios</button>
          </div>
        )}

        {waPhone && (
          // Mismo mensaje que el botón "Confirmar asistencia" del portal de escritorio
          // (jcmConfirmAsistMsg): pide responder SÍ/NO, con fecha/hora en español y cómo llegar.
          <a href={"https://wa.me/56"+waPhone.replace(/^(56|0)/,"")+"?text="+encodeURIComponent(jcmConfirmAsistMsgM(a, clinNombre))}
            target="_blank" rel="noopener"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:16, padding:"14px 8px", borderRadius:14, background:T.green+"24", border:"1.4px solid "+T.green+"80", textDecoration:"none", color:T.green, fontFamily:T.sans, fontSize:13.5, fontWeight:600 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L4 20l1.05-4.5A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8.5 10.5c.3 2.5 2.5 4.7 5 5"/></svg>
            Confirmar asistencia por WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

/* ═══════════ Home (tab "Citas") ═══════════ */
// Tasa de ocupación REAL de un día (no un número inventado): slots con cita ÷ slots trabajables.
// Reusa la misma lógica de HorariosTab (horario semanal + bloqueos por fecha + duración de cada cita).
function occupancyForOff(appts, off) {
  try {
    const iso = offToISO(off);
    const wd = new Date(iso + "T12:00:00").getDay();
    let weekly = slotsM().slice();
    const h = window.DB && window.DB.get("horarios_v1");
    if (h && h[wd]) { weekly = h[wd].open === false ? [] : (h[wd].slots || slotsM().slice()); }
    const map = (window.DB && window.DB.get("horarios_dates")) || {};
    const avail = map[iso] != null ? map[iso] : weekly;
    const occupied = new Set();
    appts.filter(a => a.status !== "anulada" && (a.fecha || offToISO(a.day || 0)) === iso).forEach(a => {
      if (!a.time) return;
      const start = minsM(a.time);
      const dur = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
      slotsM().forEach(s => { const m = minsM(s); if (m >= start && m < start + dur) occupied.add(s); });
    });
    const cap = new Set([...avail, ...occupied]).size;
    return cap ? Math.round(occupied.size / cap * 100) : 0;
  } catch (e) { return 0; }
}
// Cápsula-resumen del día: • verde confirmadas · • azul pendientes (agendadas) · • rojo no asistió
// — mismos colores que el resto del panel y el portal.
function DaySummary({ T, c, p, na, prefix, bars }) {
  const dot = (color, txt) => (
    <span style={{ display:"flex", alignItems:"center", gap:6, whiteSpace:"nowrap" }}>
      <span style={{ width:7, height:7, borderRadius:"50%", background:color, flexShrink:0 }} />
      <span style={{ fontFamily:T.sans, fontSize:bars?12:10.5, color:T.textMute }}>{txt}</span>
    </span>
  );
  // Separador entre los tres estados: barra vertical en Agenda (referencia), "·" en Home.
  const sep = bars
    ? <span style={{ width:1, height:14, background:T.divider }} />
    : <span style={{ fontFamily:T.sans, fontSize:11, color:T.textFaint }}>·</span>;
  return (
    <div style={{ ...glassChip(T), borderRadius: bars?14:12, padding: bars?"11px 10px":"9px 12px", display:"flex", alignItems:"center", justifyContent: bars?"space-around":"center", gap:8, flexWrap:"wrap" }}>
      {dot("#46D27A", (prefix?prefix+" ":"") + c + " confirmada" + (c===1?"":"s"))}
      {sep}
      {dot("#6EA8E8", p + " pendiente" + (p===1?"":"s"))}
      {sep}
      {dot("#FF6B7D", na + " no asistió")}
    </div>
  );
}
function HomeTab({ T, appts, patients, onOpenAppt, goTab, openOverlay, openNotif, bellCount }) {
  const today = todayISO();
  const yestISO = offToISO(-1);
  const active = appts.filter(a => a.status !== "anulada");
  // Buscador (pedido): mismo buscador que ya existe en Agenda — busca en TODAS las citas activas
  // (pasadas y futuras) por nombre/apellido o RUT. El match por PROCEDIMIENTO en cambio se acota al
  // MES ACTUAL (pedido): sirve para planear stock del mes en curso, así que un "sculptra" de otro
  // mes solo ensuciaría el conteo — buscar un paciente por nombre sigue funcionando sin esa acotación.
  const [q, setQ] = useState("");
  const ql = q.trim().toLowerCase();
  const searchMatches = !ql ? [] : active
    .filter(a => (a.name||"").toLowerCase().includes(ql) || (a.rut||"").toLowerCase().includes(ql)
      || ((a.proc||"").toLowerCase().includes(ql) && inCurrentMonth(a.fecha||offToISO(a.day||0))));
  // El conteo total (searchMatches.length) se muestra siempre, aunque la lista renderizada se
  // recorte — sin esto, buscar un procedimiento frecuente no serviría para saber "cuántos hay".
  const searchResults = searchMatches
    .map(a => ({ a, off: isoToDayOff(a.fecha||offToISO(a.day||0)) }))
    .sort((x,y) => { const dx=Math.abs(x.off), dy=Math.abs(y.off); return dx!==dy ? dx-dy : y.off-x.off; })
    .slice(0, 40)
    .map(x => x.a);
  const todayAppts = active.filter(a => (a.fecha||offToISO(a.day||0)) === today).sort((a,b)=>minsM(a.time)-minsM(b.time));
  const yestCount = active.filter(a => (a.fecha||offToISO(a.day||0)) === yestISO).length;
  const confirmadas = todayAppts.filter(a => a.status==="confirmada" || a.status==="atendida" || a.attended).length;
  const pendientes = todayAppts.filter(a => !(a.status==="confirmada"||a.status==="atendida"||a.attended||a.status==="anulada")).length;
  // Delta vs ayer en CONTEO ABSOLUTO, no en porcentaje: con volúmenes chicos de clínica un
  // "+500%" es ruido engañoso (ayer 1 → hoy 6). "+5 vs ayer" es honesto y legible (principio
  // PRODUCT.md: textos sin hipérbole). Ocupación sí es un % real, su delta va en puntos (pts).
  const delta = todayAppts.length - yestCount;
  const pct = n => todayAppts.length ? Math.round(n/todayAppts.length*100) : 0;
  // Tasa de ocupación real de hoy y su variación vs ayer (puntos porcentuales).
  const ocup = occupancyForOff(appts, 0);
  const ocupDelta = ocup - occupancyForOff(appts, -1);
  const vsAyer = (n, unit) => n>0 ? "+"+n+(unit||"")+" vs ayer" : n<0 ? "−"+Math.abs(n)+(unit||"")+" vs ayer" : "igual que ayer";
  // Desglose del día para la cápsula-resumen.
  const cToday  = todayAppts.filter(a => a.status==="confirmada" || a.status==="atendida" || a.attended).length;
  const naToday = todayAppts.filter(a => a.status==="no_asistio").length;
  const pToday  = todayAppts.length - cToday - naToday;

  const upcoming = active
    .filter(a => (a.fecha||offToISO(a.day||0)) >= today)
    .sort((a,b) => { const fa=a.fecha||offToISO(a.day||0), fb=b.fecha||offToISO(b.day||0); return fa<fb?-1:fa>fb?1:minsM(a.time)-minsM(b.time); })
    .slice(0, 8);
  // Agrupa por día para los divisores de "Próximas citas" — upcoming ya viene ordenado por fecha,
  // así que los mismos días quedan contiguos y basta comparar contra el último grupo abierto.
  const upcomingByDay = [];
  upcoming.forEach(a => {
    const f = a.fecha || offToISO(a.day||0);
    const g = upcomingByDay[upcomingByDay.length-1];
    if (g && g.fecha === f) g.items.push(a);
    else upcomingByDay.push({ fecha: f, items: [a] });
  });

  const clinNombre = (() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return (n && (""+n).trim()) || ""; } catch(e) { return ""; } })();
  const fechaLarga = (() => { const d = new Date(); const s = DOW_FULL[d.getDay()]+", "+d.getDate()+" de "+MESES_LARGOS[d.getMonth()].toLowerCase(); return s.charAt(0).toUpperCase()+s.slice(1); })();

  // Saludo (prototipo): primer nombre de la clínica/profesional + avatar (foto guardada o iniciales).
  const primerNombre = (clinNombre||"").trim().split(/\s+/)[0] || "";
  const avatarSrc = (() => { try { return localStorage.getItem("jcm_admin_photo") || ""; } catch(e) { return ""; } })();
  const ini = (clinNombre||"JC").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase();

  // KPI (composición del prototipo): 3 tarjetas glass — valor Fraunces 21 + label + subtítulo.
  const kpiCard = (label, val, sub, onClick) => (
    <button onClick={onClick} style={{ ...glassPanel(T,16), display:"flex", flexDirection:"column", alignItems:"flex-start", gap:0, padding:"12px 10px", textAlign:"left", cursor:"pointer" }}>
      <div style={{ fontFamily:T.serif, fontWeight:600, fontSize:21, color:T.text, lineHeight:1.1 }}>{val}</div>
      <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textMute, marginTop:5, lineHeight:1.25 }}>{label}</div>
      {sub && <div style={{ fontFamily:T.sans, fontSize:10, color:T.textFaint, marginTop:2, lineHeight:1.2 }}>{sub}</div>}
    </button>
  );

  // Mosaico de acceso rápido (composición del prototipo): ícono centrado arriba + label debajo.
  // "Nueva cita" destaca con el círculo de acento relleno; los demás llevan el ícono en stroke accent.
  const tile = (icon, label, onClick, primary) => (
    <button onClick={onClick} style={{ ...glassPanel(T,16), display:"flex", flexDirection:"column", alignItems:"center", gap:7, padding:"12px 4px", cursor:"pointer", minWidth:0 }}>
      {primary
        ? <div style={{ width:34, height:34, borderRadius:"50%", background:T.accent, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 6px 14px -6px "+T.accent }}>{icon}</div>
        : <div style={{ width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", color:T.accent, flexShrink:0 }}>{icon}</div>}
      <span style={{ fontFamily:T.sans, fontSize:10, fontWeight:500, color:T.text, textAlign:"center", lineHeight:1.15 }}>{label}</span>
    </button>
  );

  // Barra de búsqueda (pedido: misma que ya existe en Agenda) — mismo chip glass + ícono lupa,
  // vive fija bajo los accesos rápidos. Mientras se busca, reemplaza la lista de "Próximas citas".
  const searchBar = (
    <div style={{ display:"flex", alignItems:"center", gap:10, ...glassChip(T), borderRadius:13, padding:"0 14px" }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por nombre, RUT o procedimiento…" style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.text, fontFamily:T.sans, fontSize:13.5, padding:"11px 0" }} />
      {/* Objetivo táctil mínimo 44px: antes el hit area real era ~23px (icono 15px + 4px de padding). */}
      {q && <button onClick={()=>setQ("")} aria-label="Limpiar búsqueda" style={{ flexShrink:0, width:44, height:44, margin:"0 -12px 0 -6px", background:"none", border:"none", color:T.textMute, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>}
    </div>
  );
  const searchResultsBody = (
    <div style={{ flex:1, minHeight:0, overflowY:"auto", WebkitOverflowScrolling:"touch", paddingBottom:14 }}>
      {searchMatches.length===0 && <div style={{ ...glassPanel(T,14), padding:"22px 16px", textAlign:"center", fontFamily:T.sans, fontSize:12.5, color:T.textMute }}>Sin resultados para "{q.trim()}".</div>}
      {searchMatches.length>0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
          {/* Conteo total (pedido): buscar un procedimiento sirve para saber CUÁNTOS hay agendados,
              no solo para navegar a uno — por eso el total va siempre visible, aunque la lista
              renderizada se recorte a 40 filas por rendimiento. */}
          <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textMute, padding:"0 2px 2px" }}>{searchMatches.length} {searchMatches.length===1?"resultado":"resultados"} para "{q.trim()}"</div>
          {searchResults.map(a => {
            const st = apptStateM(a, T);
            return (
              <button key={a.id} onClick={()=>onOpenAppt(a)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", cursor:"pointer", borderRadius:12, overflow:"hidden", padding:"10px 12px", ...apptCardTintM(st.color) }}>
                <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:11, color:T.textMute, minWidth:78 }}>{dayLabelM(a.fecha||offToISO(a.day||0))} {a.time}</span>
                <span style={{ flex:1, minWidth:0, fontFamily:T.sans, fontSize:13, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.name}</span>
                <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:10, fontWeight:700, color:st.color, background:"color-mix(in srgb, "+st.color+" 18%, #141B26)", borderRadius:6, padding:"3px 7px" }}>{abbrevProcM(a.proc)}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    // Composición del prototipo: saludo + accesos rápidos + buscador quedan FIJOS; solo la lista
    // de "Próximas citas" scrollea. El header propio de la pestaña Inicio es esta tarjeta de
    // saludo (el prototipo no tiene barra superior separada en Inicio).
    <div style={{ height:"100%", display:"flex", flexDirection:"column", padding:"calc(14px + env(safe-area-inset-top,0px)) 16px 0", background:T.heroBg }}>
      {/* Bloque FIJO: saludo + accesos rápidos + buscador. */}
      <div style={{ flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>
        {/* Tarjeta de saludo (prototipo): avatar + "Hola, {nombre}" + fecha larga + campana. */}
        <div style={{ ...glassPanel(T,20), display:"flex", alignItems:"center", gap:12, padding:"14px 16px", minHeight:70 }}>
          {avatarSrc
            ? <img src={avatarSrc} alt="" style={{ width:42, height:42, borderRadius:"50%", objectFit:"cover", flexShrink:0, border:"1px solid "+T.accent }} />
            : <div style={{ width:42, height:42, borderRadius:"50%", background:T.accentSoft, border:"1px solid "+T.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontFamily:T.serif, fontWeight:600, fontSize:15, color:T.accent }}>{ini}</span>
              </div>}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:T.serif, fontWeight:600, fontSize:19, color:T.text, lineHeight:1.25, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{primerNombre ? "Hola, "+primerNombre : "Hola"}</div>
            <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute, lineHeight:1.4, marginTop:3 }}>{fechaLarga}</div>
          </div>
          <button onClick={openNotif} aria-label="Notificaciones" style={{ position:"relative", width:38, height:38, borderRadius:"50%", background:T.flatFill, border:"1px solid "+T.flatBorder, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>
            {bellCount>0 && <span style={{ position:"absolute", top:6, right:7, width:8, height:8, borderRadius:"50%", background:T.accent, border:"1.5px solid "+T.glassFill }} />}
          </button>
        </div>

        {/* Pedido del usuario (10-jul): fuera los KPIs y la cápsula-resumen "Hoy: confirmadas/…"
            de Inicio — esa métrica vive solo en Reportes. Inicio deja saludo + accesos + buscador
            para dar protagonismo a "Próximas citas". */}

        {/* Accesos rápidos: 4 mosaicos (único acceso a Bloquear horario y a Reportes/Pacientes con nav de 3 pestañas). */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:9 }}>
          {tile(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>, "Nueva cita", ()=>goTab("nueva"), true)}
          {tile(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, "Pacientes", ()=>openOverlay("pacientes"))}
          {tile(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, "Bloquear horario", ()=>goTab("horarios"))}
          {tile(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4"/></svg>, "Reportes", ()=>openOverlay("reportes"))}
        </div>

        {searchBar}
      </div>

      {/* Próximas citas: el título queda fijo, solo la LISTA scrollea. Mientras se busca (pedido),
          esta sección entera se reemplaza por los resultados de la búsqueda. */}
      <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", marginTop:12 }}>
        {ql ? searchResultsBody : (<>
        <div style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <span style={{ fontFamily:T.serif, fontSize:17, fontWeight:600, color:T.text }}>Próximas citas</span>
          <button onClick={()=>goTab("agenda")} style={{ background:"none", border:"none", padding:0, cursor:"pointer", fontFamily:T.sans, fontSize:12, fontWeight:600, color:T.accent, display:"flex", alignItems:"center", gap:3 }}>Ver agenda <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
        {/* Pedido del usuario (10-jul): con pocas citas, dejar la lista pegada arriba dejaba un
            hueco vacío grande y parejo abajo (feo/"roto"). Cuando la lista es corta (cabe sin
            scroll) se CENTRA verticalmente en el espacio disponible en vez de anclarla arriba —
            reparte el espacio libre arriba y abajo en vez de amontonarlo todo abajo. Con muchas
            citas (no cabe) se mantiene el anclaje arriba + scroll de siempre (sin riesgo de que
            el centrado corte el principio de la lista). */}
        <div style={{ flex:1, minHeight:0, overflowY:"auto", WebkitOverflowScrolling:"touch", paddingBottom:14, display:"flex", flexDirection:"column", justifyContent: upcoming.length<=4 ? "center" : "flex-start" }}>
          {upcoming.length===0 && (
            <div style={{ ...glassPanel(T,14), padding:"26px 18px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:11 }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:T.flatFill, border:"1px solid "+T.flatBorder, display:"flex", alignItems:"center", justifyContent:"center", color:T.textMute }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </div>
              <div style={{ fontFamily:T.sans, fontSize:13, color:T.textMute, lineHeight:1.5 }}>No tienes próximas citas.<br/>Agenda la primera para empezar el día.</div>
              <button onClick={()=>goTab("nueva")} style={{ display:"inline-flex", alignItems:"center", gap:6, ...glassChip(T), borderRadius:10, padding:"9px 15px", color:T.text, fontFamily:T.sans, fontSize:12.5, fontWeight:600, cursor:"pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                Nueva cita
              </button>
            </div>
          )}
          {/* Tarjeta del prototipo: IZQ nombre + procedimiento + píldora de estado (apptStateM);
              divisor vertical; DER hora en Fraunces con color del estado + hora fin. Agrupadas por
              día con el eyebrow accent uppercase. onClick abre la ApptSheet (misma función). */}
          {upcoming.length>0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {upcomingByDay.map(g => (
              <div key={g.fecha}>
                <div style={{ fontFamily:T.sans, fontSize:11, letterSpacing:".12em", textTransform:"uppercase", color:T.accent, fontWeight:600, padding:"0 0 8px" }}>{dayLabelM(g.fecha)}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {g.items.map(a => {
                    const st = apptStateM(a, T);
                    return (
                      <button key={a.id} onClick={()=>onOpenAppt(a)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", cursor:"pointer", background:T.flatFill, border:"1px solid "+T.flatBorder, borderRadius:14, padding:"12px 14px" }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontFamily:T.sans, fontWeight:500, fontSize:13.5, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.name}</div>
                          <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginTop:2 }}>{a.proc||"—"}</div>
                          <span style={{ display:"inline-block", marginTop:7, fontFamily:T.sans, fontWeight:600, fontSize:9.5, letterSpacing:".06em", textTransform:"uppercase", padding:"3px 8px", borderRadius:100, background:"color-mix(in srgb, "+st.color+" 16%, #141B26)", color:st.color }}>{st.label}</span>
                        </div>
                        <div style={{ width:1, alignSelf:"stretch", background:T.divider }} />
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <div style={{ fontFamily:T.serif, fontWeight:600, fontSize:15, color:st.color }}>{a.time}</div>
                          <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textFaint, marginTop:1 }}>{apptEndM(a)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          )}
          {/* Pedido del usuario (10-jul): con pocas citas próximas, la lista corta dejaba un
              hueco vacío grande antes de la barra inferior y se sentía "roto". No hay contenido
              real con qué llenarlo (no se inventan citas) — en vez de eso, se cierra la lista con
              una nota sobria (mismo patrón que Calendar/Fantastical) para que el espacio restante
              se lea como "estás al día", no como una pantalla incompleta. Solo aparece cuando la
              lista mostrada es exhaustiva (no truncada por el tope de 8) — si hay más citas de las
              que caben, no correspondería decir "eso es todo". */}
          {upcoming.length>0 && upcoming.length<8 && (
            <div style={{ textAlign:"center", padding:"20px 0 4px", display:"flex", flexDirection:"column", alignItems:"center", gap:7, opacity:.7 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.3l2.4 2.4 4.6-5.2"/></svg>
              <div style={{ fontFamily:T.sans, fontSize:12, color:T.textFaint }}>Estás al día — sin más citas próximas.</div>
            </div>
          )}
        </div>
        </>)}
      </div>
    </div>
  );
}

/* ─── Tab Horarios (sin cambios de lógica, solo glass) ─── */
function HorariosTab({ T, appts }) {
  const today = todayISO();
  // Tira de días CONTINUA (mismo patrón que Agenda): antes solo mostraba los próximos 14 días
  // fijos, así que no se podía bloquear/liberar un horario más allá de 2 semanas (bug reportado:
  // no se podía tocar un sábado de fin de mes). Ahora cubre ~2.5 meses hacia adelante y 2 semanas
  // hacia atrás, scrolleable de forma directa — igual disponibilidad que desde el portal.
  const [selDay, setSelDay] = useState(today);
  const stripDays = useMemo(() => {
    const arr = [];
    for (let i=-14; i<=60; i++) {
      const d = new Date(); d.setDate(d.getDate()+i);
      const iso = localISO(d);
      arr.push({ iso, wd: WDS[d.getDay()], dd: d.getDate(), isToday: iso===today });
    }
    return arr;
  }, [today]);
  const dayBtnRefs = useRef({});
  useEffect(() => {
    const el = dayBtnRefs.current[selDay];
    if (el && el.scrollIntoView) el.scrollIntoView({ inline:"center", block:"nearest" });
  }, [selDay]);
  const [slotsMap, setSlotsMap] = useState(()=>(window.DB && window.DB.get('horarios_dates')) || {});
  useEffect(() => {
    function reload() { setSlotsMap((window.DB && window.DB.get('horarios_dates')) || {}); }
    window.addEventListener('jcsaas:data', reload);
    return () => window.removeEventListener('jcsaas:data', reload);
  }, []);
  const weeklySlots = (() => {
    try { var h = window.DB && window.DB.get('horarios_v1'); var wd = new Date(selDay + 'T12:00:00').getDay(); if (h && h[wd] && h[wd].open !== false) return h[wd].slots || slotsM().slice(); if (h && h[wd] && h[wd].open === false) return []; } catch(e) {}
    return slotsM().slice();
  })();
  const avail = slotsMap[selDay]!=null ? slotsMap[selDay] : weeklySlots;
  const occupied = new Set();
  appts
    .filter(a => a.status !== "anulada" && (a.fecha ? a.fecha === selDay : offToISO(a.day || 0) === selDay))
    .forEach(a => {
      if (!a.time) return;
      const startMin = minsM(a.time);
      const durMin = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
      slotsM().forEach(slot => {
        const slotMin = minsM(slot);
        if (slotMin >= startMin && slotMin < startMin + durMin) occupied.add(slot);
      });
    });

  function saveMap(map) {
    if (window.DB) window.DB.set('horarios_dates', map);
    else { try { localStorage.setItem("jcm_horarios_dates", JSON.stringify(map)); } catch(e){} }
    setSlotsMap({...map});
  }
  function toggle(slot) {
    if (occupied.has(slot)) return;
    const map = (window.DB && window.DB.get('horarios_dates')) || {};
    const cur = map[selDay]!=null ? [...map[selDay]] : weeklySlots.slice();
    map[selDay] = cur.includes(slot) ? cur.filter(s=>s!==slot) : [...cur,slot].sort();
    saveMap(map);
  }
  function blockAll() { const m=(window.DB && window.DB.get('horarios_dates')) || {}; m[selDay]=[]; saveMap(m); }
  function openAll()  { const m=(window.DB && window.DB.get('horarios_dates')) || {}; delete m[selDay]; saveMap(m); }

  const availCount = avail.filter(s=>!occupied.has(s)).length;
  const blockedCount = slotsM().filter(s=>!avail.includes(s)&&!occupied.has(s)).length;

  // Etiqueta de fecha del día seleccionado (prototipo): "Miércoles 10 de julio".
  const dateLabel = (() => { try { return new Date(selDay+"T12:00:00").toLocaleDateString("es-CL",{weekday:"long",day:"numeric",month:"long"}); } catch(e) { return selDay; } })();

  return (
    <div style={{ padding:"6px 16px 90px" }}>
      {/* Fecha del día seleccionado (el título "Bloquear horarios" vive en el header de la pestaña). */}
      <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute, textTransform:"capitalize", padding:"0 2px 8px" }}>{dateLabel}</div>
      <div className="no-sb" style={{ overflowX:"auto" }}>
        <div style={{ display:"flex", gap:5, padding:"2px 2px 12px", minWidth:"max-content" }}>
          {stripDays.map(d=>{
            const isSel = d.iso===selDay;
            return (
              <button key={d.iso} ref={el=>{ dayBtnRefs.current[d.iso]=el; }} onClick={()=>setSelDay(d.iso)}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"7px 9px 5px", borderRadius:12, minWidth:42, cursor:"pointer",
                  background: isSel ? T.accentSoft : "transparent", border:"1px solid "+(isSel ? T.accentBorder : "transparent") }}>
                <span style={{ fontFamily:T.sans, fontSize:10.5, fontWeight:500, color:isSel?T.accentStrong:T.textMute }}>{d.isToday?"Hoy":d.wd}</span>
                <span style={{ fontFamily:T.serif, fontSize:16, fontWeight:600, color:T.text }}>{d.dd}</span>
                <div style={{ width:5, height:5, borderRadius:"50%", background:isSel?T.accent:"transparent" }} />
              </button>
            );
          })}
        </div>
      </div>
      {/* Tarjeta glass: línea-resumen + botones "Abrir todo" (borde accent) / "Bloquear todo" (borde rojo). */}
      <div style={{ ...glassPanel(T,16), padding:"14px 16px", marginBottom:14 }}>
        <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute, marginBottom:12 }}>
          <span style={{ color:T.green, fontWeight:600 }}>{availCount}</span> disponibles · <span style={{ color:T.textFaint }}>{blockedCount}</span> bloqueadas · <span style={{ color:T.gold, fontWeight:600 }}>{occupied.size}</span> con cita
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={openAll} style={{ flex:1, textAlign:"center", padding:9, borderRadius:100, border:"1.4px solid "+T.accent, background:"transparent", color:T.accentStrong, fontFamily:T.sans, fontWeight:600, fontSize:12, cursor:"pointer" }}>Abrir todo</button>
          <button onClick={blockAll} style={{ flex:1, textAlign:"center", padding:9, borderRadius:100, border:"1.4px solid "+T.red, background:"transparent", color:T.red, fontFamily:T.sans, fontWeight:600, fontSize:12, cursor:"pointer" }}>Bloquear todo</button>
        </div>
      </div>
      {/* Leyenda 3 puntos (prototipo): Disponible=verde, Bloqueado=rojo, Con cita=dorado. */}
      <div style={{ display:"flex", gap:16, padding:"0 2px 14px" }}>
        {[[T.green,"Disponible"],[T.red,"Bloqueado"],[T.gold,"Con cita"]].map(([c,l])=>(
          <div key={l} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />
            <span style={{ fontFamily:T.sans, fontSize:11, color:T.textMute }}>{l}</span>
          </div>
        ))}
      </div>
      {/* Grilla de 4 columnas: cada slot verde(disponible)/rojo(bloqueado)/dorado(con cita). Tocar
          alterna disponible↔bloqueado salvo los que tienen cita (se cablea a la lógica real toggle). */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
        {slotsM().map(slot=>{
          const isOcc = occupied.has(slot);
          const isAvail = avail.includes(slot);
          const color = isOcc ? T.gold : isAvail ? T.green : T.red;
          return (
            <button key={slot} onClick={()=>toggle(slot)} disabled={isOcc}
              style={{ textAlign:"center", padding:"10px 4px", borderRadius:12, border:"1.4px solid "+color,
                fontFamily:T.sans, fontSize:12, fontWeight:600, cursor:isOcc?"default":"pointer",
                background:color+"1e", color:color }}>
              {slot}
              {isOcc&&<div style={{ fontFamily:T.sans, fontSize:9, marginTop:2, color:color }}>cita</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Tab Agenda (calendario estilo iPhone) ─── */
// BUG corregido (histórico): con 90px/hora + altura mínima forzada de 76px, dos citas seguidas
// de 30 min se superponían — el mínimo forzado era MAYOR que el espacio real entre sus horas de
// inicio. La regla que evita que vuelva a pasar: la altura de una tarjeta SIEMPRE es proporcional
// a su duración real (nunca forzada por encima de eso), así nunca puede invadir el tramo siguiente.
// Densidad (pedido del usuario: alejar más la vista para que quepan más citas sin scroll):
// bajado de 90 a 60px/hora. A esta densidad, 30 y 45 min ya se muestran en el layout compacto de
// una línea (por debajo del umbral "rico" de 56px); solo 60+ min mantiene el layout rico de 2
// columnas. El piso de seguridad (ver heightPx) baja a 13px para que nunca exceda el espacio real
// de una cita de 15 min (15px), el caso más corto — si no, volvería a superponerse.
const CAL_PX_HOUR = 60; // píxeles por hora
const CAL_START   = 8;  // primera hora visible
const CAL_END     = 20; // última hora visible
const CAL_HOURS   = Array.from({length: CAL_END - CAL_START + 1}, (_,i) => CAL_START + i);

// Nombre abreviado (pedido del usuario): con nombres muy largos, en vez de cortar con "…" a mitad
// de una palabra, se muestra nombre + primer apellido + SOLO LA INICIAL del segundo apellido.
// Convención chilena: los últimos 2 términos son los apellidos; todo lo anterior es el nombre.
// Con 2 palabras o menos (nombre + un apellido) no hay nada que abreviar, se deja tal cual.
function abbrevNameM(name) {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return name || "";
  const given = words.slice(0, -2).join(" ");
  const s1 = words[words.length - 2], s2 = words[words.length - 1];
  return given + " " + s1 + " " + s2[0].toUpperCase() + ".";
}
// Normaliza nombres de procedimiento "viejos" al nombre actual del catálogo — hoy solo
// Bioestimulación → Sculptra — para que citas antiguas y nuevas del mismo procedimiento se
// agrupen y cuenten juntas (Reportes → Procedimientos del mes) en vez de aparecer por separado.
function normalizeProcM(proc) {
  return (proc || "").replace(/bioestimulaci[oó]n/i, "Sculptra");
}
// Procedimiento abreviado: códigos fijos para los más frecuentes (pedido original del usuario);
// cualquier otro procedimiento cae a la inicial (no el nombre completo) — esta abreviación se
// usa SIEMPRE en tarjetas de una sola línea (Home/Agenda), donde el nombre completo desbordaría.
function abbrevProcM(proc) {
  const p = (proc || "").toLowerCase();
  if (p.includes("botox") && p.includes("3 zona")) return "B3Z";
  if (p.includes("botox") && (p.includes("full face") || p.includes("8 zona"))) return "BFF";
  if (p.includes("rinomodela")) return "R";
  // "bioestim" cubre citas antiguas guardadas antes de renombrar el catálogo a Sculptra — mismo
  // procedimiento, incluso si el texto guardado en esa cita sigue diciendo "Bioestimulación".
  if (p.includes("sculptra") || p.includes("bioestim")) return "S";
  if (p.includes("evaluaci")) return "EV";
  if (p.includes("quemador")) return "Q";
  if (!proc) return "—";
  return proc.trim().charAt(0).toUpperCase();
}

function AgendaTab({ T, appts, onOpenAppt, goTab, showAnuladas, setShowAnuladas }) {
  const today = todayISO();
  const [selDay, setSelDay] = useState(today);
  // Buscador de pacientes (pedido): evita scrollear día por día para encontrar una cita. Busca en
  // TODAS las citas (pasadas y futuras, pedido) por nombre/apellido (mismo campo) o RUT. El match
  // por PROCEDIMIENTO en cambio se acota al MES ACTUAL (pedido): sirve para planear stock del mes
  // en curso, un "sculptra" de otro mes solo ensuciaría el conteo.
  const [q, setQ] = useState("");
  const ql = q.trim().toLowerCase();
  const searchMatches = !ql ? [] : appts
    .filter(a => (a.name||"").toLowerCase().includes(ql) || (a.rut||"").toLowerCase().includes(ql)
      || ((a.proc||"").toLowerCase().includes(ql) && inCurrentMonth(a.fecha||offToISO(a.day||0))));
  // El conteo total (searchMatches.length) se muestra siempre, aunque la lista renderizada se
  // recorte — sin esto, buscar un procedimiento frecuente no serviría para saber "cuántos hay".
  const searchResults = searchMatches
    // Más relevante primero: la cita más cercana a hoy (antes o después), no solo cronológica.
    .map(a => ({ a, off: isoToDayOff(a.fecha||offToISO(a.day||0)) }))
    .sort((x,y) => { const dx=Math.abs(x.off), dy=Math.abs(y.off); return dx!==dy ? dx-dy : y.off-x.off; })
    .slice(0, 40)
    .map(x => x.a);
  // Tira de días CONTINUA (pedido): scrolleable de forma directa (scroll nativo), no paginada
  // semana por semana. Hacia atrás solo llega hasta el día 1 del mes actual (pedido) — hacia
  // adelante, un rango amplio fijo (60 días) para navegar cómodo sin ser infinito.
  const stripDays = useMemo(() => {
    const now = new Date(); now.setHours(0,0,0,0);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysFromStart = Math.round((now - monthStart) / 86400000);
    const arr = [];
    for (let i=-daysFromStart; i<=60; i++) {
      const d = new Date(); d.setDate(d.getDate()+i);
      const iso = localISO(d);
      arr.push({ iso, wd: WDS[d.getDay()], dd: d.getDate(), isToday: iso===today });
    }
    return arr;
  }, [today]);
  const [view, setView] = useState("dia");
  // Vista del día (prototipo): "list" = lista de tarjetas de cita (por defecto, como la foto del
  // usuario) · "cal" = horarios en calendario (línea de tiempo). Toggle "Ver horarios disponibles".
  const [dayMode, setDayMode] = useState("list");
  const [monthCur, setMonthCur] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const dayRef = useMemo(() => React.createRef(), []);
  // Centra automáticamente el día seleccionado en la tira (al entrar y al elegir uno desde Mes).
  const stripRef = useRef(null);
  const dayBtnRefs = useRef({});
  useEffect(() => {
    const el = dayBtnRefs.current[selDay];
    if (el && el.scrollIntoView) el.scrollIntoView({ inline:"center", block:"nearest" });
  }, [selDay]);
  const apptCountByDate = useMemo(() => {
    const map = {};
    appts.forEach(a => { if (a.status === "anulada") return; const f = a.fecha || offToISO(a.day || 0); map[f] = (map[f] || 0) + 1; });
    return map;
  }, [appts]);
  const monthGrid = useMemo(() => {
    const first = new Date(monthCur.y, monthCur.m, 1);
    const startDow = (first.getDay() + 6) % 7;
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(monthCur.y, monthCur.m, 1 - startDow + i);
      cells.push({ iso: localISO(d), dd: d.getDate(), inMonth: d.getMonth() === monthCur.m });
    }
    return cells;
  }, [monthCur]);

  const dayAppts = appts
    .filter(a => { const f = a.fecha || offToISO(a.day||0); return f === selDay && (showAnuladas ? a.status === "anulada" : a.status !== "anulada"); })
    .sort((a,b) => minsM(a.time) - minsM(b.time));
  const anuladasCount = appts.filter(a => (a.fecha||offToISO(a.day||0))===selDay && a.status==="anulada").length;
  // Desglose del día seleccionado para la cápsula-resumen (igual que en Home).
  const selActive = appts.filter(a => (a.fecha||offToISO(a.day||0))===selDay && a.status!=="anulada");
  const cSel  = selActive.filter(a => a.status==="confirmada"||a.status==="atendida"||a.attended).length;
  const naSel = selActive.filter(a => a.status==="no_asistio").length;
  const pSel  = selActive.length - cSel - naSel;

  useEffect(() => {
    if (!dayRef.current) return;
    const firstMin = dayAppts.length ? minsM(dayAppts[0].time) : CAL_START * 60;
    const targetPx = Math.max(0, (firstMin - CAL_START * 60 - 30) * (CAL_PX_HOUR / 60));
    dayRef.current.scrollTop = targetPx;
  }, [selDay, showAnuladas]);

  // Pedido del usuario: deslizar hacia la izq/der sobre la pantalla de Agenda (lista u horarios)
  // avanza/retrocede el día automáticamente, sin tener que tocar un día puntual en la tira.
  // Guardas: (1) toques que empiezan a ≤30px del borde izquierdo se ignoran — ese rango es del
  // gesto global de "volver atrás" (onRootTouchStart/End en MobileShell), no debe disparar los dos
  // a la vez; (2) exige que el gesto sea claramente horizontal (dx grande, dy chico) para no
  // interferir con el scroll vertical normal de la lista.
  const daySwipeRef = useRef(null);
  function onDaySwipeStart(e) {
    if (!e.touches || e.touches.length !== 1) { daySwipeRef.current = null; return; }
    const t = e.touches[0];
    if (t.clientX <= 30) { daySwipeRef.current = null; return; }
    daySwipeRef.current = { x: t.clientX, y: t.clientY };
  }
  function onDaySwipeEnd(e) {
    const start = daySwipeRef.current; daySwipeRef.current = null;
    if (!start || !e.changedTouches || !e.changedTouches.length) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x, dy = t.clientY - start.y;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
    setSelDay(d => shiftDateM(d, dx < 0 ? 1 : -1));
  }

  // Tarjeta de cita en el timeline (fidelidad a la referencia): glass card con barra de color a
  // la izquierda + badge de estado a la derecha — igual lenguaje que las tarjetas de Home, no un
  // bloque plano con solo borde superior. Alto proporcional a la duración real (más correcto que
  // la referencia, que muestra alturas fijas) — mantiene la utilidad real del timeline.
  function apptBlock(a) {
    const startMin = minsM(a.time);
    const durMin = parseInt(a.dur) || (window.JCDATA&&window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
    const topPx   = (startMin - CAL_START * 60) * (CAL_PX_HOUR / 60);
    // Altura SIEMPRE proporcional a la duración real (sin mínimo forzado por encima de eso):
    // así nunca puede invadir el tramo de la cita siguiente. Solo un piso de seguridad mínimo
    // (28px) para datos corruptos con duración ~0, que en la práctica nunca ocurre.
    const heightPx = Math.max(durMin * (CAL_PX_HOUR / 60), 15);
    const st = apptStateM(a, T);
    const isAnulada = a.status === "anulada";
    return (
      <button key={a.id} onClick={()=>onOpenAppt(a)} style={{
        position:"absolute", top: topPx, left: 0, right: 0, height: heightPx,
        display:"flex", alignItems:"center", gap:8, textAlign:"left", cursor:"pointer",
        borderRadius:10, padding:"0 0 0 12px", overflow:"hidden", boxSizing:"border-box", opacity:isAnulada?.55:1,
        ...apptCardTintM(st.color)
      }}>
        {/* PRUEBA (rama movil-diseno-portal): mismo lenguaje que el portal — tinte de la tarjeta +
            badge de procedimiento ya bastan para leer el estado, sin punto lateral aparte. */}
        <span style={{ flexShrink:0, fontFamily:FRAUNCES, fontSize:11.5, fontWeight:500, color:st.color }}>{a.time}</span>
        <span style={{ flex:1, minWidth:0, fontFamily:T.sans, fontSize:12.5, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", textDecoration:isAnulada?"line-through":"none" }}>{abbrevNameM(a.name)}</span>
        {/* Se deja en 10px (no 11) a propósito: este badge vive en el bloque de la línea de tiempo,
            que puede medir solo 15px de alto en una cita de 15 min — a 11px se recortaría. Coincide
            con el mismo badge en Inicio/búsqueda (10px), donde sí hay espacio de sobra. */}
        <span style={{ flexShrink:0, marginRight:10, fontFamily:T.sans, fontSize:10, fontWeight:700, color:st.color, background:"color-mix(in srgb, "+st.color+" 18%, #141B26)", borderRadius:5, padding:"2px 6px" }}>{abbrevProcM(a.proc)}</span>
      </button>
    );
  }

  // Segmentado Día/Mes (el filtro de canceladas ahora vive en el icono del header, como la referencia).
  // Pedido: más chico, para dejar más protagonismo a la tira de días y las citas.
  const toggleRow = (
    <div style={{ display:"flex", gap:5, padding:"5px 14px 4px", flexShrink:0 }}>
      <div style={{ display:"flex", flex:1, gap:3, padding:3, borderRadius:11, ...glassChip(T) }}>
        {[["dia","Día"],["mes","Mes"]].map(([k,l])=>(
          // Pedido: al tocar "Día" siempre vuelve al día de HOY automáticamente (no se queda en
          // el último día que se haya elegido).
          <button key={k} onClick={()=>{ setView(k); if (k==="dia") setSelDay(today); }} style={{ flex:1, fontFamily:T.sans, fontSize:12, fontWeight:view===k?600:500, padding:"6px", borderRadius:8, cursor:"pointer",
            ...(view===k
              ? { background:T.accentSoft, color:T.accentStrong, border:"1px solid "+T.accentBorder }
              : { background:"transparent", color:T.textMute, border:"1px solid transparent" }) }}>{l}</button>
        ))}
      </div>
      {showAnuladas && view==="dia" && <span style={{ alignSelf:"center", fontFamily:T.sans, fontSize:10.5, color:T.red, whiteSpace:"nowrap" }}>Canceladas ({anuladasCount})</span>}
    </div>
  );

  // Barra de búsqueda (pedido): mismo chip glass + ícono lupa que ya usa el buscador de Pacientes,
  // para no introducir un lenguaje visual nuevo. Vive siempre debajo del segmentado Día/Mes, en
  // ambas vistas — buscar no depende de qué vista esté abierta.
  const searchBar = (
    <div style={{ padding:"0 14px 5px", flexShrink:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, ...glassChip(T), borderRadius:13, padding:"0 14px" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por nombre, RUT o procedimiento…" style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.text, fontFamily:T.sans, fontSize:13.5, padding:"11px 0" }} />
        {/* Objetivo táctil mínimo 44px: antes el hit area real era ~23px (icono 15px + 4px de padding). */}
      {q && <button onClick={()=>setQ("")} aria-label="Limpiar búsqueda" style={{ flexShrink:0, width:44, height:44, margin:"0 -12px 0 -6px", background:"none", border:"none", color:T.textMute, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>}
      </div>
    </div>
  );

  // Resultados de búsqueda (pedido): reemplaza la vista Día/Mes mientras se busca — al tocar un
  // resultado se abre la ficha de la cita directamente (misma ApptSheet que el resto del panel; no
  // depende de que la fecha esté dentro del rango visible de la tira de días).
  const searchResultsBody = (
    <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"0 14px 16px" }}>
      {searchMatches.length===0 && <div style={{ ...glassPanel(T,14), padding:"22px 16px", textAlign:"center", fontFamily:T.sans, fontSize:12.5, color:T.textMute }}>Sin resultados para "{q.trim()}".</div>}
      {searchMatches.length>0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
          {/* Conteo total (pedido): buscar un procedimiento sirve para saber CUÁNTOS hay agendados
              (incluye anuladas, tachadas abajo, para no inflar el número con las que sí cuentan). */}
          <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textMute, padding:"0 2px 2px" }}>{searchMatches.length} {searchMatches.length===1?"resultado":"resultados"} para "{q.trim()}"</div>
          {searchResults.map(a => {
            const st = apptStateM(a, T);
            const isAnulada = a.status === "anulada";
            return (
              <button key={a.id} onClick={()=>onOpenAppt(a)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", cursor:"pointer", borderRadius:12, overflow:"hidden", padding:"10px 12px", opacity:isAnulada?.6:1, ...apptCardTintM(st.color) }}>
                <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:11, color:T.textMute, minWidth:78 }}>{dayLabelM(a.fecha||offToISO(a.day||0))} {a.time}</span>
                <span style={{ flex:1, minWidth:0, fontFamily:T.sans, fontSize:13, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", textDecoration:isAnulada?"line-through":"none" }}>{a.name}</span>
                <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:10, fontWeight:700, color:st.color, background:"color-mix(in srgb, "+st.color+" 18%, #141B26)", borderRadius:6, padding:"3px 7px" }}>{abbrevProcM(a.proc)}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  // FAB con el mismo nivel de "Liquid Glass" que la pantalla principal (pedido): brillo superior +
  // blur/saturación más altos, no solo un tinte plano. zIndex alto: siempre queda SOBRE la lista de
  // citas que scrollea detrás — nunca la tapa a ella, pero ella tampoco lo tapa a él.
  const fab = (
    <button onClick={()=>goTab("nueva")} title="Nueva cita" aria-label="Nueva cita"
      style={{ position:"absolute", right:16, bottom:16+"px", width:56, height:56, borderRadius:"50%",
        background:T.accent, border:"none", color:T.onAccent, cursor:"pointer",
        boxShadow:"0 12px 28px -10px rgba(10,25,55,.5)",
        display:"flex", alignItems:"center", justifyContent:"center", zIndex:6 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
    </button>
  );

  if (view === "mes") {
    const WD = ["L","M","M","J","V","S","D"];
    return (
      <div style={{ position:"relative", display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
        {toggleRow}
        {searchBar}
        {ql ? searchResultsBody : (<>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 16px 8px", flexShrink:0 }}>
            <button onClick={()=>setMonthCur(c=>{ const m=c.m-1; return m<0?{y:c.y-1,m:11}:{y:c.y,m}; })} style={{ width:44, height:44, borderRadius:999, ...glassChip(T), color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>‹</button>
            <div style={{ fontFamily:T.sans, fontSize:19, fontWeight:600, color:T.text }}><span style={{ fontFamily:FRAUNCES, fontStyle:"italic", color:T.accent }}>{MESES_LARGOS[monthCur.m]}</span> {monthCur.y}</div>
            <button onClick={()=>setMonthCur(c=>{ const m=c.m+1; return m>11?{y:c.y+1,m:0}:{y:c.y,m}; })} style={{ width:44, height:44, borderRadius:999, ...glassChip(T), color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>›</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", padding:"0 10px 4px", flexShrink:0 }}>
            {WD.map((w,i)=><div key={i} style={{ textAlign:"center", fontFamily:T.sans, fontSize:10, letterSpacing:".08em", color:T.textMute }}>{w}</div>)}
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"0 10px 16px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
              {monthGrid.map(c=>{
                const n = apptCountByDate[c.iso] || 0;
                const isToday = c.iso === today;
                return (
                  <button key={c.iso} onClick={()=>{ setSelDay(c.iso); setView("dia"); }} style={{ aspectRatio:"1/1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, borderRadius:10, cursor:"pointer",
                    background: isToday ? T.accent+"22" : (n?glassChip(T).background:"transparent"),
                    border:"1px solid "+(isToday?T.accent:(n?T.flatBorder:"transparent")),
                    opacity: c.inMonth?1:.32 }}>
                    <span style={{ fontFamily:T.serif, fontSize:14, fontWeight:600, color:isToday?T.accent:T.text }}>{c.dd}</span>
                    {n>0 && <span style={{ display:"flex", gap:2 }}>{Array.from({length:Math.min(n,3)}).map((_,i)=><span key={i} style={{ width:5, height:5, borderRadius:"50%", background:T.accent }} />)}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </>)}
        {fab}
      </div>
    );
  }

  return (
    <div style={{ position:"relative", display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      {toggleRow}
      {searchBar}
      {ql ? searchResultsBody : (<>
        {/* Tira de días continua (pedido): scroll horizontal nativo y directo, sin paginar por semana.
            Esta zona y los botones de arriba quedan FIJOS — solo la lista de citas más abajo scrollea. */}
        <div ref={stripRef} style={{ overflowX:"auto", flexShrink:0, WebkitOverflowScrolling:"touch" }}>
          <div style={{ display:"flex", padding:"5px 10px 3px", minWidth:"max-content", gap:2 }}>
            {stripDays.map(d => {
              const isSel = d.iso === selDay;
              const hasApts = (apptCountByDate[d.iso]||0) > 0;
              return (
                <button key={d.iso} ref={el=>{ dayBtnRefs.current[d.iso]=el; }} onClick={()=>setSelDay(d.iso)}
                  style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"6px 8px 5px", borderRadius:14, minWidth:44, cursor:"pointer",
                    background:"transparent", border:"1.4px solid "+(isSel ? T.accent : "transparent") }}>
                  <span style={{ fontFamily:T.sans, fontSize:10, fontWeight:500, color: T.textFaint }}>{d.wd}</span>
                  <span style={{ fontFamily:T.serif, fontSize:16, fontWeight:600, color: isSel ? T.accent : (d.isToday ? T.text : T.textMute), lineHeight:1.15 }}>{d.dd}</span>
                  <div style={{ width:5, height:5, borderRadius:"50%", background: isSel ? T.accent : (hasApts ? T.textFaint : "transparent") }} />
                </button>
              );
            })}
          </div>
        </div>
        {/* Toggle "Ver horarios disponibles" ↔ "Ver lista de citas" (prototipo): la lista de tarjetas
            es la vista por defecto; al tocar, se ve la agenda en calendario (línea de tiempo por horas). */}
        {/* <button> real (audit P2): antes era un <div onClick> sin role/tabIndex, inalcanzable por teclado. */}
        <button onClick={()=>setDayMode(m=>m==="list"?"cal":"list")} style={{ margin:"6px 16px 6px", flexShrink:0, width:"calc(100% - 32px)", background:T.flatFill, border:"1px solid "+T.flatBorder, borderRadius:16, padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>
            <span style={{ fontFamily:T.sans, fontWeight:500, fontSize:13, color:T.text }}>{dayMode==="list"?"Ver horarios disponibles":"Ver lista de citas"}</span>
          </div>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={T.textFaint} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {dayMode==="list" ? (
          <div onTouchStart={onDaySwipeStart} onTouchEnd={onDaySwipeEnd} className="no-sb" style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"0 16px 8px", display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ fontFamily:T.sans, fontSize:12.5, fontWeight:500, color:T.text }}>{(() => { const d=new Date(selDay+"T12:00:00"); return selDay===today ? "Hoy · "+DOW_FULL[d.getDay()] : DOW_FULL[d.getDay()]+" "+d.getDate()+" de "+MESES_LARGOS[d.getMonth()].toLowerCase(); })()}</div>
            {dayAppts.map(a => {
              const st = apptStateM(a, T);
              const isAnulada = a.status === "anulada";
              return (
                <button key={a.id} onClick={()=>onOpenAppt(a)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", cursor:"pointer", background:T.flatFill, border:"1px solid "+T.flatBorder, borderRadius:14, padding:"12px 14px", opacity:isAnulada?.6:1 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"inline-block", fontFamily:T.sans, fontWeight:700, fontSize:9.5, letterSpacing:".06em", textTransform:"uppercase", padding:"3px 8px", borderRadius:100, color:st.color, background:"color-mix(in srgb, "+st.color+" 16%, #141B26)", marginBottom:7 }}>{st.label}</div>
                    <div style={{ fontFamily:T.sans, fontWeight:500, fontSize:13.5, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", textDecoration:isAnulada?"line-through":"none" }}>{a.name}</div>
                    <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textMute, marginTop:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.proc||"—"}</div>
                  </div>
                  <div style={{ width:1, alignSelf:"stretch", background:T.divider }} />
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontFamily:FRAUNCES, fontWeight:600, fontSize:15, color:st.color }}>{a.time}</div>
                    <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textFaint, marginTop:1 }}>{endTimeM(a)}</div>
                  </div>
                </button>
              );
            })}
            {dayAppts.length === 0 && (
              <div style={{ textAlign:"center", padding:"34px 0", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ fontFamily:T.serif, fontSize:18, color:T.textMute }}>{showAnuladas?"Sin citas canceladas este día":"Sin citas este día"}</div>
                {!showAnuladas && <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Toca + para agendar una cita.</div>}
              </div>
            )}
            {/* <button> real (audit P2): antes era un <div onClick> sin role/tabIndex. */}
            {!showAnuladas && anuladasCount>0 && (
              <button onClick={()=>setShowAnuladas(true)} style={{ width:"100%", background:"none", border:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"12px 0 4px", cursor:"pointer", fontFamily:"inherit" }}>
                <span style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Ver citas anuladas</span>
                <span style={{ fontFamily:T.sans, fontSize:12, color:T.textFaint }}>({anuladasCount})</span>
              </button>
            )}
            <div style={{ height:88, flexShrink:0 }} />
          </div>
        ) : (
        <div ref={dayRef} onTouchStart={onDaySwipeStart} onTouchEnd={onDaySwipeEnd} style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch" }}>
          <div style={{ position:"relative", marginLeft:48, paddingRight:12 }}>
            {CAL_HOURS.map(h => (
              <div key={h} style={{ position:"absolute", left:-48, right:0, top: (h - CAL_START) * CAL_PX_HOUR, display:"flex", alignItems:"flex-start", zIndex:1 }}>
                <span style={{ fontFamily:T.sans, fontSize:10, color:T.textFaint, width:42, textAlign:"right", paddingRight:8, lineHeight:1, transform:"translateY(-5px)", flexShrink:0 }}>{h<10?"0"+h:""+h}:00</span>
                <div style={{ flex:1, borderTop:"1px solid "+T.divider, marginTop:0 }} />
              </div>
            ))}
            <div style={{ position:"relative", minHeight: (CAL_END - CAL_START) * CAL_PX_HOUR + 40 }}>
              {dayAppts.map(a => apptBlock(a))}
            </div>
            {dayAppts.length === 0 && (
              <div style={{ position:"absolute", top:"46%", left:0, right:0, transform:"translateY(-50%)", textAlign:"center", pointerEvents:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ fontFamily:T.serif, fontSize:18, color:T.textMute }}>{showAnuladas?"Sin citas canceladas este día":"Sin citas este día"}</div>
                {!showAnuladas && <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Toca + para agendar una cita.</div>}
              </div>
            )}
          </div>
        </div>
        )}
      </>)}
      {fab}
    </div>
  );
}

/* ═══════════ Nueva cita — formulario overlay de una sola vista (prototipo v2) ═══════════ */
// Nueva cita — formulario overlay de UNA sola vista (prototipo v2, líneas ~638-687), conservando la
// capacidad real de crear un PACIENTE NUEVO (toggle segmentado existente/nuevo con RUT validado). El
// guardado usa la lógica real: addAppt (status pendiente), addPatient si es nuevo, y el flujo real de
// WhatsApp de confirmación (jcmCitaConfirmMsgM). Reemplaza al antiguo asistente de 3 pasos.
function NuevaWizard({ T, appts, patients, addAppt, addPatient, onDone }) {
  const [tipo, setTipo] = useState("existente"); // existente | nuevo
  const [pid, setPid] = useState("");
  const [pq, setPq] = useState(""); // buscador de paciente existente (por nombre/RUT)
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const PHONE_PFX = "+56 9 ";
  const [phone, setPhone] = useState(PHONE_PFX);
  function onPhone(v) { const digits = v.startsWith(PHONE_PFX) ? v.slice(PHONE_PFX.length).replace(/\D/g, "") : v.replace(/\D/g, "").replace(/^569?/, ""); setPhone(PHONE_PFX + digits.slice(0, 8)); }
  const phoneOk = phone.replace(/\D/g, "").length >= 11;
  // RUT obligatorio para paciente nuevo (pedido), salvo que sea extranjero/sin RUT (pedido): se
  // formatea al escribir y se valida con módulo 11 (mismos helpers que el portal, jcm_shared.js).
  function onRut(v) { setRut(window.jcmFmtRut ? window.jcmFmtRut(v) : v); }
  const rutOk = window.jcmValidRut ? window.jcmValidRut(rut) : (rut||"").replace(/[^0-9kK]/g,"").length >= 2;
  const [sinRut, setSinRut] = useState(false);
  const [email, setEmail] = useState("");
  // Detalles de la cita
  const procs = procList();
  const [fecha, setFecha] = useState(todayISO());
  const [time,  setTime]  = useState("10:00");
  const [proc,    setProc]    = useState(procs[0]||"Evaluación general");
  const [dur,     setDur]     = useState("30 minutos");
  const [comment, setComment] = useState("");
  const [notifyWa, setNotifyWa] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (window.JCDATA && window.JCDATA.procMin) setDur(window.JCDATA.procMin(proc) + " minutos"); }, [proc]);

  // Opciones del select "Paciente existente" (prototipo): pacientes ordenados por nombre.
  const patientOptions = patients.slice().sort((a,b)=>(a.name||"").localeCompare(b.name||""));
  const selectedPatient = patients.find(p=>p.id===pid) || null;

  const finalName = tipo==="existente" ? (selectedPatient?selectedPatient.name:"") : name;
  const finalPhone = tipo==="existente" ? (selectedPatient?selectedPatient.phone:"") : phone;
  const finalRut = tipo==="existente" ? (selectedPatient?selectedPatient.rut:"") : rut;
  const finalEmail = tipo==="existente" ? (selectedPatient?selectedPatient.email:"") : email;

  const patientOk = tipo==="existente" ? !!selectedPatient : (name.trim() && (sinRut || rutOk) && phoneOk);
  const canSave = patientOk && !!proc && !!fecha && !!time;

  const slotsMap = (window.DB && window.DB.get('horarios_dates')) || {};
  const weeklyDef = (() => {
    try { var h = window.DB && window.DB.get('horarios_v1'); var wd = new Date(fecha + 'T12:00:00').getDay(); if (h && h[wd] && h[wd].open !== false) return h[wd].slots || slotsM().slice(); if (h && h[wd] && h[wd].open === false) return []; } catch(e) {}
    return slotsM().slice();
  })();
  const avail = slotsMap[fecha]!=null ? slotsMap[fecha] : weeklyDef;
  const occupied = new Set(appts.filter(a=>a.fecha===fecha && a.status!=="anulada").map(a=>a.time));
  const freeSlots = avail.filter(s=>!occupied.has(s));

  function confirm() {
    if (!canSave || saved) return;
    let patId = pid;
    if (tipo === "nuevo") {
      const np = addPatient({ name: name.trim(), rut: sinRut ? "" : rut.trim(), phone: phone.trim(), email: email.trim(), age: 0 });
      patId = np.id;
    }
    // Pedido del usuario: crear la cita NO debe dejarla "Confirmada" — solo "Agendado" (pendiente).
    // Confirmar la asistencia del paciente es un paso aparte, que se hace desde la hoja de la cita.
    addAppt({ id:Date.now().toString(36), patId, name:finalName.trim(), rut:(finalRut||"").trim(), phone:(finalPhone||"").trim(), email:(finalEmail||"").trim(), proc, dur, time, fecha, day:isoToDayOff(fecha), status:"pendiente", source:"movil", comentario:comment.trim()||undefined, createdAt:new Date().toISOString() });
    if (notifyWa && finalPhone) {
      const waP = (finalPhone||"").replace(/\D/g,"");
      if (waP.length>=8) {
        // Mismo mensaje que el portal de escritorio (jcmCitaConfirmMsg): fecha, hora, tratamiento,
        // profesional, dirección y "cómo llegar" con el link inteligente de mapa.
        const clinNombre = (() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return (n && (""+n).trim()) || "la clínica"; } catch(e) { return "la clínica"; } })();
        const clinDir = (() => { try { const d = window.DB && window.DB.cfg && window.DB.cfg().clinic_addr; return (d && (""+d).trim()) || ""; } catch(e) { return ""; } })();
        const clinPro = (() => { try { const p = window.DB && window.DB.cfg && window.DB.cfg().professional; return (p && (""+p).trim()) || (((window.JCDATA||{}).contact||{}).pro || ""); } catch(e) { return ""; } })();
        const msg = jcmCitaConfirmMsgM(finalName, fecha, time, proc, clinPro, clinNombre, clinDir, esControlPostProcM(proc, selectedPatient));
        setTimeout(()=>window.open("https://wa.me/56"+waP.replace(/^(56|0)/,"")+"?text="+encodeURIComponent(msg), "_blank", "noopener"), 300);
      }
    }
    setSaved(true);
    setTimeout(()=>{ setSaved(false); onDone(); }, 900);
  }

  const inp = { width:"100%", boxSizing:"border-box", fontFamily:T.sans, fontSize:14, padding:"11px 12px", borderRadius:12, border:"1px solid "+T.inputBorder, background:T.inputFill, color:T.text, outline:"none" };
  const lbl = { fontFamily:T.sans, fontSize:11.5, color:T.textMute, marginBottom:6 };
  // Stepper circular ‹ / › (prototipo) para la fecha.
  // Touch target mínimo 44×44 (audit P2): el círculo visual queda en 28px.
  const stepBtn = (dir, onClick) => (
    <button onClick={onClick} aria-label={dir<0?"Día anterior":"Día siguiente"} style={{ width:44, height:44, borderRadius:"50%", background:"none", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
      <span style={{ width:28, height:28, borderRadius:"50%", background:T.glassFill, border:"1px solid "+T.glassBorder, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d={dir<0?"M15 5l-7 7 7 7":"M9 5l7 7-7 7"}/></svg>
      </span>
    </button>
  );

  return (
    // El título "Nueva cita" ya vive en el header de la pestaña; aquí va el formulario del prototipo.
    <div style={{ padding:"14px 16px 90px", display:"flex", flexDirection:"column", gap:14 }}>
      {/* Toggle segmentado existente / nuevo (conserva la creación de paciente nuevo con RUT). */}
      <div style={{ display:"flex", gap:8 }}>
        {[["existente","Paciente existente"],["nuevo","Paciente nuevo"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTipo(k)} style={{ flex:1, fontFamily:T.sans, fontSize:12, fontWeight:tipo===k?700:500, padding:"11px 6px", borderRadius:10, cursor:"pointer",
            border:"1px solid "+(tipo===k?T.accent:T.inputBorder), background:tipo===k?T.accentSoft:"transparent", color:tipo===k?T.accentStrong:T.textMute }}>{l}</button>
        ))}
      </div>

      {tipo==="existente" ? (
        <div>
          <div style={lbl}>Paciente</div>
          {selectedPatient ? (
            // Paciente elegido: tarjeta con datos + botón para cambiar (limpia la selección).
            <div style={{ display:"flex", alignItems:"center", gap:10, background:T.flatFill, border:"1px solid "+T.accentBorder, borderRadius:12, padding:"11px 13px" }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:T.accentSoft, border:"1px solid "+T.accentBorder, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontFamily:T.serif, fontWeight:600, fontSize:12, color:T.accentStrong }}>{(selectedPatient.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</span>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:T.sans, fontWeight:600, fontSize:13.5, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{selectedPatient.name}</div>
                <div style={{ fontFamily:T.sans, fontSize:11, color:T.textMute }}>{[selectedPatient.rut, selectedPatient.phone].filter(Boolean).join(" · ")}</div>
              </div>
              <button onClick={()=>{ setPid(""); setPq(""); }} aria-label="Cambiar paciente" style={{ flexShrink:0, background:"none", border:"none", color:T.textMute, cursor:"pointer", fontFamily:T.sans, fontSize:12 }}>Cambiar</button>
            </div>
          ) : (<>
            {/* Buscador por nombre/RUT (pedido: elegir entre tantos pacientes con un select es lento). */}
            <div style={{ display:"flex", alignItems:"center", gap:10, background:T.inputFill, border:"1px solid "+T.inputBorder, borderRadius:12, padding:"0 12px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.7" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M20 20l-5-5"/></svg>
              <input value={pq} onChange={e=>setPq(e.target.value)} placeholder="Buscar por nombre o RUT…" autoFocus style={{ flex:1, background:"none", border:"none", outline:"none", color:T.text, fontFamily:T.sans, fontSize:14, padding:"11px 0", minWidth:0 }} />
            </div>
            {(() => {
              const q = pq.trim().toLowerCase();
              const res = q.length>=1
                ? patientOptions.filter(p => (p.name||"").toLowerCase().includes(q) || (p.rut||"").toLowerCase().includes(q)).slice(0,8)
                : patientOptions.slice(0,8);
              if (!res.length) return <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute, padding:"9px 2px 0" }}>Sin coincidencias. Prueba con "Paciente nuevo".</div>;
              return (
                <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:6, maxHeight:214, overflowY:"auto" }} className="no-sb">
                  {res.map(p => (
                    <button key={p.id} onClick={()=>{ setPid(p.id); }} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", cursor:"pointer", background:T.flatFill, border:"1px solid "+T.flatBorder, borderRadius:11, padding:"10px 12px" }}>
                      <div style={{ width:30, height:30, borderRadius:"50%", background:T.accentSoft, border:"1px solid "+T.accentBorder, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontFamily:T.serif, fontWeight:600, fontSize:11, color:T.accentStrong }}>{(p.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</span>
                      </div>
                      <div style={{ minWidth:0 }}>
                        <div style={{ fontFamily:T.sans, fontSize:13, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                        {p.rut && <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textMute }}>{p.rut}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })()}
          </>)}
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div><div style={lbl}>Nombre completo</div><input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre y apellido" style={inp} /></div>
          <div><div style={lbl}>RUT</div><input value={rut} onChange={e=>onRut(e.target.value)} disabled={sinRut} inputMode="numeric" placeholder={sinRut?"Sin RUT":"12.345.678-9"} style={{...inp, opacity:sinRut?.5:1, borderColor: (sinRut || rutOk || !rut) ? T.inputBorder : T.red}} /></div>
          {!sinRut && rut && !rutOk && <div style={{ fontFamily:T.sans, fontSize:11, color:T.red, marginTop:-6 }}>Revisa el RUT: el dígito verificador no coincide.</div>}
          <label style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", marginTop:-4 }}>
            <input type="checkbox" checked={sinRut} onChange={e=>{ setSinRut(e.target.checked); if (e.target.checked) setRut(""); }} />
            <span style={{ fontFamily:T.sans, fontSize:12.5, color:T.textMute }}>Paciente extranjero / sin RUT</span>
          </label>
          <div><div style={lbl}>Teléfono</div><input type="tel" inputMode="numeric" value={phone} onChange={e=>onPhone(e.target.value)} style={{...inp, borderColor: phoneOk?T.inputBorder:T.red}} /></div>
          {!phoneOk && phone.length>PHONE_PFX.length && <div style={{ fontFamily:T.sans, fontSize:11, color:T.red, marginTop:-6 }}>Ingresa los 8 dígitos del teléfono.</div>}
          <div><div style={lbl}>Correo (opcional)</div><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="correo@ejemplo.com" style={inp} /></div>
        </div>
      )}

      <div>
        <div style={lbl}>Procedimiento</div>
        <select value={proc} onChange={e=>setProc(e.target.value)} style={inp}>
          <option>Evaluación general</option>
          {procs.map(p=><option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Fecha con steppers ‹ › (prototipo). */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={lbl}>Fecha</span>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {stepBtn(-1, ()=>setFecha(f=>shiftDateM(f,-1)))}
          <span style={{ fontFamily:T.sans, fontWeight:500, fontSize:12.5, color:T.text, minWidth:100, textAlign:"center" }}>{dayLabelM(fecha)}</span>
          {stepBtn(1, ()=>setFecha(f=>shiftDateM(f,1)))}
        </div>
      </div>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={lbl}>Hora</span>
        <select value={time} onChange={e=>setTime(e.target.value)} style={{ ...inp, width:"auto" }}>
          {(() => { const base = freeSlots.length ? freeSlots : slotsM(); const opts = base.indexOf(time)>=0 ? base : [time, ...base]; return opts.map(s=><option key={s} value={s}>{s} hrs</option>); })()}
        </select>
      </div>
      {freeSlots.length===0 && <div style={{ fontFamily:T.sans, fontSize:11, color:T.red, marginTop:-8 }}>No hay horas marcadas como disponibles para este día.</div>}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={lbl}>Duración</span>
        <select value={dur} onChange={e=>setDur(e.target.value)} style={{ ...inp, width:"auto" }}>
          {["15 minutos","30 minutos","45 minutos","60 minutos","75 minutos","90 minutos","120 minutos"].map(d=><option key={d}>{d}</option>)}
        </select>
      </div>

      <div><div style={lbl}>Comentario (opcional)</div>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Ej. Control, seguimiento, evaluación…" rows={2} style={{...inp, resize:"none"}} />
      </div>

      <label style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", padding:"11px 13px", borderRadius:12, background:T.flatFill, border:"1px solid "+T.flatBorder }}>
        <input type="checkbox" checked={notifyWa} onChange={e=>setNotifyWa(e.target.checked)} />
        <span style={{ fontFamily:T.sans, fontSize:12.5, color:T.text }}>Notificar al paciente por WhatsApp</span>
      </label>

      <button onClick={confirm} disabled={!canSave||saved} style={{ marginTop:4, height:50, borderRadius:14, border:"none", background:saved?T.green:T.accent, color:saved?"#fff":T.onAccent, fontFamily:T.sans, fontSize:15, fontWeight:600, cursor:(canSave&&!saved)?"pointer":"not-allowed", opacity:(canSave||saved)?1:.5, transition:"background .3s" }}>{saved?"✓ Cita guardada":"Guardar cita"}</button>
    </div>
  );
}

/* ═══════════ Overlay: Pacientes ═══════════ */
function PacientesOverlay({ T, patients, appts, onBack, onOpenFicha, addPatient }) {
  const [q, setQ] = useState("");
  const [nuevo, setNuevo] = useState(false);
  const [f, setF] = useState({ name:"", rut:"", phone:"+56 9 ", email:"" });
  const ql = q.trim().toLowerCase();
  // Orden por más reciente (pedido), igual que el portal de escritorio (PacientesView, jc-admin-b.jsx):
  // por última vez que se abrió la ficha (pat_opened, misma clave — así abrir un paciente en el
  // portal también lo sube en el móvil), no alfabético. Antes ordenaba solo por nombre.
  const opened = (() => { try { return (window.DB && window.DB.get("pat_opened")) || {}; } catch (e) { return {}; } })();
  const list = (ql ? patients.filter(p => (p.name||"").toLowerCase().includes(ql) || (p.rut||"").toLowerCase().includes(ql) || (p.phone||"").includes(ql)) : patients)
    .slice().sort((a,b)=>(opened[b.id]||0)-(opened[a.id]||0));
  function openFicha(id) {
    try { const m = (window.DB && window.DB.get("pat_opened")) || {}; m[id] = Date.now(); window.DB && window.DB.set("pat_opened", m); } catch (e) {}
    onOpenFicha(id);
  }
  // Paginado (pedido): antes se pintaban TODOS los pacientes de una sola vez en el DOM — con una
  // clínica de cientos de pacientes eso vuelve la lista lenta al scrollear (el mismo problema que
  // la skill marca como "ScrollView en vez de FlatList", aquí sin librería de virtualización).
  // Se muestra una primera tanda y "Mostrar más" carga el resto de a poco.
  const PAGE = 60;
  const [visibleCount, setVisibleCount] = useState(PAGE);
  useEffect(() => { setVisibleCount(PAGE); }, [ql]);
  const visible = list.slice(0, visibleCount);
  const inp = { width:"100%", fontFamily:T.sans, fontSize:14, padding:"11px 13px", borderRadius:9, border:"1px solid "+T.inputBorder, background:T.inputFill, color:T.text, outline:"none", boxSizing:"border-box" };

  function saveNuevo() {
    if (!f.name.trim()) return;
    const np = addPatient({ name:f.name.trim(), rut:f.rut.trim(), phone:f.phone.trim(), email:f.email.trim(), age:0 });
    setNuevo(false); setF({ name:"", rut:"", phone:"+56 9 ", email:"" });
    openFicha(np.id);
  }

  return (
    <OverlayShell T={T} title="Pacientes" onBack={onBack}>
      <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        <div style={{ display:"flex", gap:10 }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:10, ...glassChip(T), borderRadius:13, padding:"0 14px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por nombre, RUT o teléfono…" style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.text, fontFamily:T.sans, fontSize:14, padding:"13px 0" }} />
          </div>
          <button onClick={()=>setNuevo(v=>!v)} aria-label="Nuevo paciente" style={{ flexShrink:0, width:50, borderRadius:13, border:"none", background:T.accent, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 20px -8px "+T.accent }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
        </div>
        {nuevo && (
          <div style={{ ...glassPanel(T,12), padding:"13px 14px", display:"flex", flexDirection:"column", gap:9 }}>
            <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:T.accent }}>Nuevo paciente</div>
            <input value={f.name} onChange={e=>setF(s=>({...s,name:e.target.value}))} placeholder="Nombre completo" style={inp} />
            <input value={f.rut} onChange={e=>setF(s=>({...s,rut:e.target.value}))} placeholder="RUT (opcional)" style={inp} />
            <input value={f.phone} onChange={e=>setF(s=>({...s,phone:e.target.value}))} placeholder="+56 9 1234 5678" style={inp} />
            <input value={f.email} onChange={e=>setF(s=>({...s,email:e.target.value}))} placeholder="Correo (opcional)" style={inp} />
            <button onClick={saveNuevo} disabled={!f.name.trim()} style={{ background:T.accent, color:T.onAccent, border:"none", borderRadius:9, padding:"12px", fontFamily:T.sans, fontSize:12, fontWeight:600, cursor:"pointer", opacity:f.name.trim()?1:.5 }}>Guardar paciente</button>
          </div>
        )}
        {/* Lista PLANA (pedido: más minimalista) — UN solo contenedor glass, filas separadas por
            línea fina (como Contactos de iOS), no una tarjeta individual por paciente. */}
        <div style={{ ...glassPanel(T,18), display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {list.length===0 && <div style={{ textAlign:"center", padding:"30px 0", fontFamily:T.sans, fontSize:12.5, color:T.textMute }}>Sin pacientes{ql?" que coincidan":""}.</div>}
          {visible.map((p,i) => {
            const nextA = appts.filter(a=>(a.patId===p.id || a.name===p.name) && a.status!=="anulada" && (a.fecha||offToISO(a.day||0))>=todayISO()).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""))[0];
            return (
              <button key={p.id} onClick={()=>openFicha(p.id)} style={{ display:"flex", alignItems:"center", gap:12, width:"100%", textAlign:"left", background:"none", border:"none", borderBottom: i===visible.length-1?"none":"1px solid "+T.divider, padding:"11px 14px", cursor:"pointer" }}>
                <div style={{ width:36, height:36, borderRadius:"50%", flexShrink:0, background:T.accentSoft, color:T.accentStrong, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:12.5, fontWeight:600 }}>{(p.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:T.serif, fontSize:15.5, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                  <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginTop:1 }}>{[p.rut,p.phone].filter(Boolean).join(" · ")}</div>
                </div>
                {nextA && <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:11.5, color:T.accentStrong }}>{nextA.fecha===todayISO()?"Hoy "+nextA.time:(()=>{ const d=new Date((nextA.fecha||"")+"T00:00:00"); return isNaN(d.getTime())?nextA.fecha:d.getDate()+" "+MESES[d.getMonth()].toLowerCase(); })()}</span>}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0 }}><path d="M9 18l6-6-6-6"/></svg>
              </button>
            );
          })}
        </div>
        {list.length > visibleCount && (
          <button onClick={()=>setVisibleCount(c=>c+PAGE)} style={{ ...glassChip(T), borderRadius:12, padding:"12px", color:T.text, fontFamily:T.sans, fontSize:13, fontWeight:600, cursor:"pointer" }}>
            Mostrar más ({list.length-visibleCount} restantes)
          </button>
        )}
      </div>
    </OverlayShell>
  );
}

/* ═══════════ Overlay: Ficha del paciente (vista + edición básica) ═══════════ */
function FichaOverlay({ T, patientId, patients, appts, onBack, updatePatient }) {
  const p = patients.find(x=>x.id===patientId);
  const [edit, setEdit] = useState(false);
  const [f, setF] = useState({ phone:p?p.phone||"":"", email:p?p.email||"":"", notas:p?p.notas||"":"" });
  useEffect(()=>{ if(p) setF({ phone:p.phone||"", email:p.email||"", notas:p.notas||"" }); }, [patientId]);
  if (!p) return <OverlayShell T={T} title="Ficha" onBack={onBack}><div style={{ padding:30, textAlign:"center", fontFamily:T.sans, color:T.textMute }}>Paciente no encontrado.</div></OverlayShell>;

  const mine = appts.filter(a => a.patId===p.id || a.name===p.name);
  const today = todayISO();
  const proximas = mine.filter(a=>a.status!=="anulada" && (a.fecha||offToISO(a.day||0))>=today).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""));
  const pasadas = mine.filter(a=>(a.fecha||offToISO(a.day||0))<today || a.status==="atendida").sort((a,b)=>(b.fecha||"").localeCompare(a.fecha||""));
  // Procedimientos registrados en el portal (pedido): el panel móvil no los registra, pero sí debe
  // mostrarlos — es el mismo campo patient.history que usa la ficha clínica del portal, así queda
  // el mismo registro visible en ambos lados sin duplicar la captura.
  const sesiones = (p.history || []).slice().sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  const inp = { width:"100%", fontFamily:T.sans, fontSize:14, padding:"11px 13px", borderRadius:9, border:"1px solid "+T.inputBorder, background:T.inputFill, color:T.text, outline:"none", boxSizing:"border-box" };

  function save() { updatePatient(p.id, { phone:f.phone.trim(), email:f.email.trim(), notas:f.notas.trim() }); setEdit(false); }

  return (
    <OverlayShell T={T} title="Ficha del paciente" onBack={onBack}>
      <div style={{ padding:"14px 16px 40px", display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:13 }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:T.accentSoft, border:"1px solid "+T.accentBorder, color:T.accentStrong, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:19, fontWeight:700, flexShrink:0 }}>{(p.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontFamily:T.serif, fontSize:19, color:T.text }}>{p.name}</div>
            <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>{[p.rut, p.age?p.age+" años":""].filter(Boolean).join(" · ")}</div>
          </div>
        </div>

        <div style={{ ...glassPanel(T,12), padding:"13px 14px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:9 }}>
            <span style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:T.textMute }}>Contacto</span>
            {!edit && <button onClick={()=>setEdit(true)} style={{ background:"none", border:"none", color:T.accent, fontFamily:T.sans, fontSize:11.5, fontWeight:600, cursor:"pointer" }}>Editar</button>}
          </div>
          {edit ? (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <input value={f.phone} onChange={e=>setF(s=>({...s,phone:e.target.value}))} placeholder="Teléfono" style={inp} />
              <input value={f.email} onChange={e=>setF(s=>({...s,email:e.target.value}))} placeholder="Correo" style={inp} />
              <textarea value={f.notas} onChange={e=>setF(s=>({...s,notas:e.target.value}))} placeholder="Notas (alergias, preferencias, etc.)" rows={2} style={{...inp, resize:"none"}} />
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>{ setEdit(false); setF({phone:p.phone||"",email:p.email||"",notas:p.notas||""}); }} style={{ flex:1, height:38, borderRadius:8, border:"1px solid "+T.line, background:"transparent", color:T.textMute, fontFamily:T.sans, fontSize:12, cursor:"pointer" }}>Cancelar</button>
                <button onClick={save} style={{ flex:2, height:38, borderRadius:8, border:"none", background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, fontWeight:600, cursor:"pointer" }}>Guardar</button>
              </div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <div style={{ fontFamily:T.sans, fontSize:13, color:T.text }}>{p.phone || "Sin teléfono"}</div>
              <div style={{ fontFamily:T.sans, fontSize:13, color:T.text }}>{p.email || "Sin correo"}</div>
              {p.notas && <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.textMute, marginTop:3, fontStyle:"italic" }}>{p.notas}</div>}
            </div>
          )}
        </div>

        {p.phone && (
          <a href={"https://wa.me/56"+p.phone.replace(/\D/g,"").replace(/^(56|0)/,"")} target="_blank" rel="noopener"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:"#1F8A5B22", border:"1px solid #1F8A5B55", borderRadius:9, padding:"12px", textDecoration:"none", color:"#1F8A5B", fontFamily:T.sans, fontSize:12.5, fontWeight:500 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#1F8A5B"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z"/></svg>
            Escribir por WhatsApp
          </a>
        )}

        <div>
          <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:T.textMute, marginBottom:8 }}>Próximas citas ({proximas.length})</div>
          {proximas.length===0 && <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Sin próximas citas.</div>}
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {proximas.map(a => (
              <div key={a.id} style={{ ...glassChip(T), borderRadius:9, padding:"9px 12px" }}>
                <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.text }}>{a.fecha} · {a.time} hrs</div>
                <div style={{ fontFamily:T.sans, fontSize:11, color:T.textMute }}>{a.proc||"—"}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:T.textMute, marginBottom:8 }}>Historial ({pasadas.length})</div>
          {pasadas.length===0 && <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Sin atenciones registradas.</div>}
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {pasadas.slice(0,20).map(a => (
              <div key={a.id} style={{ ...glassChip(T), borderRadius:9, padding:"9px 12px", opacity:a.status==="anulada"?.55:1 }}>
                <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.text }}>{a.fecha} · {a.proc||"—"}</div>
                <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textMute }}>{apptStateM(a,T).label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Procedimientos del portal (pedido): solo lectura — el panel móvil no registra sesiones
            clínicas, pero muestra las que ya se cargaron desde el portal para tener el mismo registro
            visible en ambas partes. */}
        <div>
          <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:T.textMute, marginBottom:8 }}>Procedimientos del portal ({sesiones.length})</div>
          {sesiones.length===0 && <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Sin procedimientos registrados en el portal.</div>}
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {sesiones.slice(0,20).map((h,i) => (
              <div key={i} style={{ ...glassChip(T), borderRadius:9, padding:"9px 12px" }}>
                <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.text }}>{h.date||"—"} · {h.proc||"—"}{h.units ? " · "+h.units : ""}</div>
                {h.resumen && <div style={{ fontFamily:T.sans, fontSize:11, color:T.textMute, marginTop:3, lineHeight:1.4 }}>{h.resumen}</div>}
                {h.proName && <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textFaint, fontStyle:"italic", marginTop:3 }}>Realizado por {h.proName}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </OverlayShell>
  );
}

/* ═══════════ Overlay: Reportes (solo datos reales de citas — este bundle no tiene acceso a caja) ═══════════ */
function ReportesOverlay({ T, appts, onBack, onOpenAppt }) {
  const [expanded, setExpanded] = useState(null); // nombre del procedimiento abierto, o null
  const now = new Date();
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - ((now.getDay()+6)%7)); weekStart.setHours(0,0,0,0);
  // BUG corregido: faltaba el límite superior de la semana — sin "weekEnd" el filtro contaba TODAS
  // las citas desde el lunes de esta semana en adelante (incluidas semanas futuras), no solo las
  // 7 fechas de la semana actual.
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 6); weekEnd.setHours(23,59,59,999);
  const monthKey = now.getFullYear()+"-"+now.getMonth();
  const inWeek = a => { const f = a.fecha||offToISO(a.day||0); const d = new Date(f+"T00:00:00"); return d >= weekStart && d <= weekEnd; };
  const inMonth = a => { const f = a.fecha||offToISO(a.day||0); const d = new Date(f+"T00:00:00"); return (d.getFullYear()+"-"+d.getMonth())===monthKey; };
  const weekAppts = appts.filter(inWeek);
  const monthAppts = appts.filter(inMonth);
  const countBy = (list, pred) => list.filter(pred).length;
  const noShowRate = weekAppts.length ? Math.round(countBy(weekAppts, a=>a.status==="no_asistio") / weekAppts.filter(a=>a.status!=="anulada").length * 100) || 0 : 0;
  // Desglose agendados vs realizados por procedimiento (pedido): antes solo se veía el total del
  // mes, que en la práctica se leía como "lo ya hecho" — para prever stock hace falta saber cuántos
  // de cada procedimiento quedan AGENDADOS (aún no atendidos) además de los ya realizados. Las
  // "no_asistio" no consumen insumo, así que no cuentan en ninguna de las dos columnas. Se guarda
  // la lista completa de citas (no solo el conteo) para poder mostrar DE QUIÉN es cada una al tocar
  // la fila (pedido: "no sé de qué paciente es").
  const porProc = {};
  monthAppts.forEach(a => {
    if (a.status==="anulada" || a.status==="no_asistio") return;
    // normalizeProcM une citas antiguas ("Bioestimulación...") con las nuevas ("Sculptra...") del
    // mismo procedimiento en una sola fila, en vez de contarlas por separado.
    const k = normalizeProcM(a.proc)||"Sin especificar";
    (porProc[k] || (porProc[k] = [])).push(a);
  });
  const topProc = Object.keys(porProc)
    .map(k => {
      const list = porProc[k].slice().sort((a,b)=> (a.fecha||"").localeCompare(b.fecha||"") || minsM(a.time)-minsM(b.time));
      const real = list.filter(a=>a.status==="atendida"||a.attended).length;
      return { name:k, list, real, pend:list.length-real, n:list.length };
    })
    .sort((a,b)=>b.n-a.n).slice(0,5);
  const maxProc = topProc[0] ? topProc[0].n : 1;

  // Resumen del día (prototipo, líneas ~410-428): barras verticales por estado de las citas de HOY,
  // con los colores OFICIALES de apptStateM (agendado azul · confirmada verde · atendida dorado ·
  // no asistió rojo) y su conteo debajo. Excluye canceladas (no consumen agenda).
  const todayIso = todayISO();
  const todayA = appts.filter(a => (a.fecha||offToISO(a.day||0))===todayIso && a.status!=="anulada");
  const dayBars = [
    { label:"Agendadas",  color:"#6EA8E8", count: todayA.filter(a=>!(a.status==="confirmada"||a.status==="atendida"||a.attended||a.status==="no_asistio")).length },
    { label:"Confirmadas",color:"#46D27A", count: todayA.filter(a=>a.status==="confirmada").length },
    { label:"Atendidas",  color:"#F5B93D", count: todayA.filter(a=>a.status==="atendida"||a.attended).length },
    { label:"No asistió", color:"#FF6B7D", count: todayA.filter(a=>a.status==="no_asistio").length },
  ];
  const dayMax = Math.max(1, ...dayBars.map(b=>b.count));
  const todayLabelStr = (() => { const d=new Date(); return WDS[d.getDay()]+" "+d.getDate()+" "+MESES[d.getMonth()]; })();
  const weekTotal = Math.max(1, weekAppts.filter(a=>a.status!=="anulada").length);

  // Fila con ícono en círculo de color + valor coloreado + barra de progreso (prototipo reportRows).
  const RIC = {
    cal:  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    check:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>,
    user: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a6 6 0 0 1 12 0v1"/></svg>,
    xmark:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg>,
    pct:  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="12" r="9"/><path d="M8 15l8-6"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/></svg>
  };
  const row = (icon, iconColor, label, val, valColor, last, barPct) => (
    <div style={{ padding:"12px 0", borderBottom: last ? "none" : "1px solid "+T.divider }}>
      <div style={{ display:"flex", alignItems:"center", gap:13 }}>
        <div style={{ width:38, height:38, borderRadius:11, flexShrink:0, background:iconColor+"22", color:iconColor, display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
        <span style={{ flex:1, fontFamily:T.sans, fontSize:15, color:T.text }}>{label}</span>
        <span style={{ fontFamily:T.sans, fontSize:17, fontWeight:700, color:valColor||T.text }}>{val}</span>
      </div>
      {barPct!=null && (
        <div style={{ height:6, borderRadius:100, background:T.divider, overflow:"hidden", marginTop:9 }}>
          <div style={{ height:"100%", borderRadius:100, width:Math.max(0,Math.min(100,barPct))+"%", background:iconColor }} />
        </div>
      )}
    </div>
  );

  // Las plantillas de mensajes YA NO viven aquí (pedido: "no es un reporte") — ahora son su propio
  // overlay ("plantillas"), accesible desde Más y el menú lateral.
  return (
    <OverlayShell T={T} title="Reportes" onBack={onBack}>
      <div style={{ padding:"14px 16px 40px", display:"flex", flexDirection:"column", gap:16 }}>
        {/* Resumen del día (prototipo): barras verticales por estado + conteos. */}
        <div style={{ ...glassPanel(T,16), padding:"14px 16px" }}>
          <div style={{ fontFamily:T.sans, fontWeight:500, fontSize:11.5, color:T.textMute, marginBottom:10, textTransform:"capitalize" }}>Resumen del día · {todayLabelStr}</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:16, height:44 }}>
            {dayBars.map(b => (
              <div key={b.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1, height:"100%", justifyContent:"flex-end" }}>
                <div style={{ width:16, borderRadius:"5px 5px 2px 2px", background:b.color, height:Math.round(b.count/dayMax*100)+"%", minHeight:4 }} />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:16, marginTop:8 }}>
            {dayBars.map(b => (
              <div key={b.label} style={{ flex:1, textAlign:"center" }}>
                <div style={{ fontFamily:T.serif, fontWeight:600, fontSize:14, color:T.text }}>{b.count}</div>
                <div style={{ fontFamily:T.sans, fontSize:9, color:T.textFaint, marginTop:1 }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...glassPanel(T,20), padding:"6px 16px 8px" }}>
          <div style={{ fontFamily:T.sans, fontSize:11, letterSpacing:".12em", textTransform:"uppercase", color:T.accent, fontWeight:600, padding:"14px 0 6px" }}>Esta semana</div>
          {row(RIC.cal,   "#7FA8E8", "Citas totales", weekAppts.filter(a=>a.status!=="anulada").length, null, false, 100)}
          {row(RIC.check, "#46D27A", "Confirmadas", countBy(weekAppts, a=>a.status==="confirmada"||a.status==="atendida"), "#46D27A", false, countBy(weekAppts, a=>a.status==="confirmada"||a.status==="atendida")/weekTotal*100)}
          {row(RIC.user,  T.accentStrong, "Atendidas", countBy(weekAppts, a=>a.status==="atendida"||a.attended), T.accentStrong, false, countBy(weekAppts, a=>a.status==="atendida"||a.attended)/weekTotal*100)}
          {row(RIC.user,  "#FF6B7D", "No asistió", countBy(weekAppts, a=>a.status==="no_asistio"), "#FF6B7D", false, countBy(weekAppts, a=>a.status==="no_asistio")/weekTotal*100)}
          {row(RIC.xmark, "#9AA6B2", "Canceladas", countBy(weekAppts, a=>a.status==="anulada"), null, false, countBy(weekAppts, a=>a.status==="anulada")/weekTotal*100)}
          {row(RIC.pct,   noShowRate>15?"#FF6B7D":"#46D27A", "Tasa de inasistencia", noShowRate+"%", noShowRate>15?"#FF6B7D":"#46D27A", true, noShowRate)}
        </div>
        <div style={{ ...glassPanel(T,20), padding:"6px 16px 10px" }}>
          <div style={{ fontFamily:T.sans, fontSize:11, letterSpacing:".12em", textTransform:"uppercase", color:T.accent, fontWeight:600, padding:"14px 0 2px" }}>Procedimientos del mes</div>
          <div style={{ fontFamily:T.sans, fontSize:11, color:T.textMute, padding:"0 0 10px", lineHeight:1.5 }}>Incluye lo agendado para lo que resta del mes, no solo lo ya atendido — para anticipar stock.</div>
          {topProc.length===0 && <div style={{ fontFamily:T.sans, fontSize:13, color:T.textMute, padding:"6px 0 12px" }}>Sin datos este mes.</div>}
          {topProc.map((t,i) => {
            const open = expanded === t.name;
            return (
            <div key={t.name} style={{ borderBottom: i===topProc.length-1 && !open?"none":"1px solid "+T.divider }}>
              {/* Fila clickeable (pedido): tocarla despliega DE QUIÉN es cada cita — antes solo se
                  veía el número, sin forma de saber a qué paciente corresponde. */}
              <button onClick={()=>setExpanded(open?null:t.name)} style={{ display:"flex", alignItems:"center", gap:13, padding:"11px 0", width:"100%", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
                {/* Ranking: número de posición (antes un icono de barras idéntico en todas las filas, que no aportaba). */}
                <div style={{ width:30, height:30, borderRadius:9, flexShrink:0, background:T.accentSoft, color:T.accentStrong, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:13, fontWeight:700 }}>{i+1}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:T.sans, fontSize:15, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t.name}</span>
                    <span style={{ fontFamily:T.sans, fontSize:16, fontWeight:700, color:T.text, marginLeft:8, flexShrink:0 }}>{t.n}</span>
                  </div>
                  {/* Barra apilada: azul = agendado, dorado = realizado — mismos colores que el resto
                      del panel y el portal, así un mismo total distingue de un vistazo qué falta. */}
                  <div style={{ height:6, borderRadius:100, background:T.divider, overflow:"hidden", marginTop:8, display:"flex" }}>
                    <div style={{ height:"100%", width:Math.round(t.pend/maxProc*100)+"%", background:T.accent }} />
                    <div style={{ height:"100%", width:Math.round(t.real/maxProc*100)+"%", background:T.gold }} />
                  </div>
                  <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textFaint, marginTop:6 }}>{t.pend} agendados · {t.real} realizados</div>
                </div>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, transform:open?"rotate(180deg)":"none", transition:"transform .15s" }}><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {open && (() => {
                // Al expandir: los próximos AGENDADOS de este procedimiento (fecha + nombre + "Agendado"),
                // como en el prototipo — para saber a quién corresponde cada cita pendiente (real).
                const upcomingAg = t.list.filter(a => !(a.status==="atendida"||a.attended) && (a.fecha||offToISO(a.day||0))>=todayIso);
                return (
                  <div style={{ display:"flex", flexDirection:"column", gap:7, padding:"0 0 12px 43px" }}>
                    {upcomingAg.length===0 && <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textFaint }}>Sin próximos agendados</div>}
                    {upcomingAg.map(a => (
                      <button key={a.id} onClick={()=>onOpenAppt(a)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", cursor:"pointer", background:"none", border:"none", padding:0 }}>
                        <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:11, color:T.textFaint, width:56 }}>{dayLabelM(a.fecha||offToISO(a.day||0))}</span>
                        <span style={{ flex:1, minWidth:0, fontFamily:T.sans, fontSize:12.5, fontWeight:500, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.name||"Paciente"}</span>
                        <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:11, fontWeight:600, color:T.accentStrong }}>Agendado</span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          );})}
        </div>
      </div>
    </OverlayShell>
  );
}

/* ═══════════ Plantillas de mensajes de WhatsApp (por clínica) ═══════════
   Cada clínica tiene su propio texto para "Confirmación de cita" y "Confirmar asistencia",
   guardado en DB.cfg().msg_tpl_confirm / msg_tpl_asist (sincronizado con el portal de
   escritorio, que usa las mismas claves — ver jcmCitaConfirmMsg/jcmConfirmAsistMsg en
   jc-admin.jsx). Si no se personaliza, se usa el texto predeterminado de jcm_shared.js. */
function MessageTemplatesView({ T }) {
  const cfg = (window.DB && window.DB.cfg && window.DB.cfg()) || {};
  const clinNombre = (cfg.clinic_name && (""+cfg.clinic_name).trim()) || "tu clínica";
  const TPLS = [
    { key:"msg_tpl_confirm", label:"Confirmación de cita", def: window.DEFAULT_TPL_CONFIRM,
      sample: { nombre:"María Pérez", primernombre:"María", clinica:clinNombre, fecha:"Sáb 11 Jul", hora:"13:45", tratamiento:"Rinomodelación", profesional:(cfg.professional&&(""+cfg.professional).trim())||"Profesional a cargo", direccion:(cfg.clinic_addr&&(""+cfg.clinic_addr).trim())||"Dirección de tu clínica", mapa:"https://www.medique.cl/ir?c=…", politica:"" } },
    { key:"msg_tpl_asist", label:"Confirmar asistencia", def: window.DEFAULT_TPL_ASIST,
      sample: { nombre:"María Pérez", primernombre:"María", clinica:clinNombre, fecha:"sábado 11 de julio", hora:"13:45", tratamiento:"Rinomodelación", mapa:"https://www.medique.cl/ir?c=…" } },
    { key:"msg_tpl_recita", label:"Campaña de re-cita", def: window.DEFAULT_TPL_RECITA,
      sample: { primernombre:"María", clinica:clinNombre, mensaje:"Tu siguiente sesión de Sculptra potencia y prolonga tu colágeno (vas en la sesión 2 de 3)", precio_linea:" El valor actual es de $450.000 y, por ser parte de la clínica, te lo dejamos en $400.000." } },
  ];
  const [open, setOpen] = useState(null);
  return (
    <div style={{ padding:"14px 16px 40px", display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.textMute, lineHeight:1.6, padding:"0 2px" }}>
        Personaliza el texto que reciben tus pacientes por WhatsApp. Se aplica también a los mensajes enviados desde el portal de escritorio.
      </div>
      {TPLS.map(t => (
        <TplCard key={t.key} T={T} tplKey={t.key} label={t.label} defaultTpl={t.def} sample={t.sample}
                 open={open===t.key} onToggle={()=>setOpen(open===t.key?null:t.key)} />
      ))}
    </div>
  );
}

function TplCard({ T, tplKey, label, defaultTpl, sample, open, onToggle }) {
  const stored = (() => { try { const v = window.DB && window.DB.cfg && window.DB.cfg()[tplKey]; return (v && (""+v).trim()) || ""; } catch(e) { return ""; } })();
  const [text, setText] = useState(stored || defaultTpl);
  const [isCustom, setIsCustom] = useState(!!stored);
  const [savedFlag, setSavedFlag] = useState(false);
  const inp = { width:"100%", fontFamily:"ui-monospace, monospace", fontSize:12.5, padding:"11px 13px", borderRadius:9, border:"1px solid "+T.inputBorder, background:T.inputFill, color:T.text, outline:"none", boxSizing:"border-box", lineHeight:1.6 };

  function save() {
    try { window.DB.set("config", Object.assign({}, window.DB.cfg(), { [tplKey]: text.trim() })); } catch(e) {}
    setIsCustom(!!text.trim());
    setSavedFlag(true); setTimeout(()=>setSavedFlag(false), 1800);
  }
  function restore() {
    setText(defaultTpl);
    try { window.DB.set("config", Object.assign({}, window.DB.cfg(), { [tplKey]: "" })); } catch(e) {}
    setIsCustom(false);
    setSavedFlag(true); setTimeout(()=>setSavedFlag(false), 1800);
  }

  const tokens = (window.TPL_TOKENS && window.TPL_TOKENS[tplKey]) || [];
  const preview = window.fillMsgTpl ? window.fillMsgTpl(text, sample) : text;

  return (
    <div style={{ ...glassPanel(T,16), padding:"4px 16px 14px" }}>
      <button onClick={onToggle} style={{ display:"flex", alignItems:"center", width:"100%", background:"none", border:"none", cursor:"pointer", padding:"14px 0", textAlign:"left" }}>
        <span style={{ flex:1, fontFamily:T.sans, fontSize:15, fontWeight:600, color:T.text }}>{label}</span>
        {isCustom && <span style={{ fontFamily:T.sans, fontSize:10, color:T.accent, border:"1px solid "+T.accent, borderRadius:999, padding:"2px 8px", marginRight:8, flexShrink:0 }}>Personalizada</span>}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2.2" style={{ flexShrink:0, transform:open?"rotate(180deg)":"none", transition:"transform .15s" }}><path d="M6 9l6 6 6-6"/></svg>
      </button>
      {open && (
        <div style={{ display:"flex", flexDirection:"column", gap:10, paddingBottom:4 }}>
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={9} style={{...inp, resize:"vertical"}} />
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {tokens.map(tk => (
              <button key={tk.k} title={tk.d} onClick={()=>setText(v=>v + (v && !/\s$/.test(v) ? " " : "") + "{"+tk.k+"}")}
                style={{ fontFamily:"ui-monospace, monospace", fontSize:11, color:T.accent, background:T.flatFill, border:"1px solid "+T.flatBorder, borderRadius:7, padding:"4px 8px", cursor:"pointer" }}>
                {"{"+tk.k+"}"}
              </button>
            ))}
          </div>
          <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textFaint, lineHeight:1.6 }}>
            {tokens.map(tk => tk.k+": "+tk.d).join(" · ")}
          </div>
          <div>
            <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:T.textMute, marginBottom:6 }}>Vista previa</div>
            <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.text, background:T.inputFill, border:"1px solid "+T.flatBorder, borderRadius:10, padding:"11px 13px", whiteSpace:"pre-wrap", lineHeight:1.6 }}>{preview}</div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button onClick={restore} style={{ flex:1, height:38, borderRadius:8, border:"1px solid "+T.inputBorder, background:"transparent", color:T.textMute, fontFamily:T.sans, fontSize:12, cursor:"pointer" }}>Restaurar predeterminado</button>
            <button onClick={save} style={{ flex:1, height:38, borderRadius:8, border:"none", background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, fontWeight:600, cursor:"pointer" }}>{savedFlag?"Guardado ✓":"Guardar"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════ Menú (pestaña "mas") — composición del prototipo tabIsMenu ═══════════
   Perfil + tarjeta-lista de accesos + Cerrar sesión aparte. Conserva TODOS los onClick reales
   (overlays, notificaciones, citas anuladas, plantillas, actualizar datos, salir). */
function MasTab({ T, mode, toggleMode, openOverlay, onLogout, openNotif, goAnuladas }) {
  const clinNombre = (() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return (n && (""+n).trim()) || ""; } catch(e) { return ""; } })();
  const ini = (clinNombre||"JC").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase();
  const avatarSrc = (() => { try { return localStorage.getItem("jcm_admin_photo") || ""; } catch(e) { return ""; } })();
  // Fila de la tarjeta-lista: ícono accent + label + chevron, separadas por divisor (salvo la última).
  const row = (icon, label, onClick, last) => (
    <button onClick={onClick} style={{ display:"flex", alignItems:"center", gap:12, width:"100%", textAlign:"left", background:"none", border:"none", borderBottom: last?"none":"1px solid "+T.divider, padding:"15px 16px", cursor:"pointer" }}>
      <div style={{ color:T.accent, display:"flex", flexShrink:0 }}>{icon}</div>
      <span style={{ flex:1, fontFamily:T.sans, fontSize:14, color:T.text }}>{label}</span>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={T.textFaint} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
  return (
    <div style={{ padding:"calc(16px + env(safe-area-inset-top,0px)) 18px 120px" }}>
      <div style={{ fontFamily:T.serif, fontWeight:600, fontSize:27, color:T.text, marginBottom:16 }}>Menú</div>

      {/* Tarjeta de perfil */}
      <div style={{ ...glassPanel(T,18), display:"flex", alignItems:"center", gap:12, padding:"14px 16px", marginBottom:18 }}>
        {avatarSrc
          ? <img src={avatarSrc} alt="" style={{ width:44, height:44, borderRadius:"50%", objectFit:"cover", flexShrink:0, border:"1px solid "+T.accent }} />
          : <div style={{ width:44, height:44, borderRadius:"50%", background:T.accentSoft, border:"1px solid "+T.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontFamily:T.serif, fontWeight:600, fontSize:15, color:T.accent }}>{ini}</span>
            </div>}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:T.sans, fontWeight:500, fontSize:14.5, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{clinNombre || "Medique"}</div>
          <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textMute, marginTop:1 }}>Panel de la clínica</div>
        </div>
      </div>

      {/* Tarjeta-lista de accesos */}
      <div style={{ ...glassPanel(T,18), overflow:"hidden", marginBottom:14 }}>
        {row(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, "Pacientes", ()=>openOverlay("pacientes"))}
        {row(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4"/></svg>, "Reportes", ()=>openOverlay("reportes"))}
        {row(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>, "Notificaciones", openNotif)}
        {row(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9a8 8 0 1 1 1.3 6.5"/><path d="M4 4v5h5"/></svg>, "Citas anuladas", goAnuladas)}
        {row(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, "Plantillas de mensajes", ()=>openOverlay("plantillas"))}
        {row(<svg id="jcm-mob-rfab-icon2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>, "Actualizar datos", ()=>{ const b = document.getElementById("jcm-mob-rfab-icon2"); if(b){ b.style.transition="transform .55s"; b.style.transform="rotate(360deg)"; setTimeout(()=>{b.style.transition="";b.style.transform="";},600);} window.dispatchEvent(new CustomEvent("jcsaas:data")); }, true)}
      </div>

      {/* Modo claro/oscuro — fila con switch (prototipo). Alterna el tema y lo persiste. */}
      <div style={{ ...glassPanel(T,18), display:"flex", alignItems:"center", gap:12, padding:"13px 16px", marginBottom:14 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 3v2.2M12 18.8V21M4.2 12H2.4M21.6 12h-1.8M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/></svg>
        <span style={{ flex:1, fontFamily:T.sans, fontSize:14, color:T.text }}>Modo claro</span>
        <button onClick={toggleMode} aria-label="Cambiar tema" style={{ width:44, height:26, borderRadius:100, background: mode==="light" ? T.accent : T.flatBorder, position:"relative", cursor:"pointer", border:"none", flexShrink:0, transition:"background .2s" }}>
          <span style={{ position:"absolute", top:2, left: mode==="light" ? 20 : 2, width:22, height:22, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 3px rgba(0,0,0,.3)", transition:"left .2s" }} />
        </button>
      </div>

      {/* Cerrar sesión — tarjeta aparte, en rojo */}
      <button onClick={onLogout} style={{ ...glassPanel(T,18), display:"flex", alignItems:"center", gap:12, width:"100%", textAlign:"left", padding:"15px 16px", cursor:"pointer" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B7D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 8l-4 4 4 4"/><path d="M6 12h12"/></svg>
        <span style={{ fontFamily:T.sans, fontSize:14, color:"#FF6B7D" }}>Cerrar sesión</span>
      </button>
    </div>
  );
}

/* ─── Contenedor de pantallas superpuestas (Pacientes/Ficha/Reportes) — navegación tipo iOS push ─── */
function OverlayShell({ T, title, onBack, children }) {
  // Mismo fondo (foto desenfocada + velo) que Inicio/Agenda — antes era un navy azulado radial
  // propio de los overlays, que se veía distinto al resto de la app (pedido: unificar).
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, overflow:"hidden", backgroundColor:T.bg, display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" }}>
      <PhotoBgLayers T={T} />
      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", height:"100%" }}>
        {/* Header overlay (referencia): botón atrás en círculo glass + título grande a la izquierda, sin barra. */}
        <div style={{ padding:"calc(14px + env(safe-area-inset-top,0px)) 18px 10px", display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
          {/* Objetivo táctil mínimo 44px (Fitts' Law / WCAG 2.2) — el ícono visual queda igual, solo
              crece el área de toque invisible. */}
          <button onClick={onBack} aria-label="Volver" style={{ width:44, height:44, borderRadius:"50%", ...glassChip(T), color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span style={{ fontFamily:T.serif, fontSize:27, fontWeight:600, color:T.text, letterSpacing:"-.01em" }}>{title}</span>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Shell principal ─── */
function MobileShell({ T, D, onLogout, mode, toggleMode }) {
  const [tab, setTab] = useState("citas");
  const [overlay, setOverlay] = useState(null); // null | "pacientes" | "reportes" | {type:"ficha", id}
  const [apptSheet, setApptSheet] = useState(null); // appt abierta en la hoja de acciones
  const [drawer, setDrawer] = useState(false); // menú lateral (hamburguesa)
  const [notifOpen, setNotifOpen] = useState(false); // panel de pendientes (campana)
  const [agShowAnuladas, setAgShowAnuladas] = useState(false); // filtro de canceladas (icono del header en Agenda)
  const [appts, setAppts] = useState(() => (window.DB&&window.DB.get("appointments"))||[]);
  const [patients, setPatients] = useState(() => (window.DB&&window.DB.get("patients"))||[]);

  // Gesto iOS: deslizar desde el BORDE IZQUIERDO hacia la derecha = "volver atrás" (como el pop
  // interactivo nativo). Solo cuenta si el toque EMPIEZA pegado al borde (≤24px), es un movimiento
  // horizontal claro (dx grande, dy chico) y hay algo a lo que volver. Cierra en orden: campana →
  // hoja de cita → overlay (Pacientes/Reportes/Ficha) → pestaña que no sea Inicio. Si el menú lateral
  // está abierto no hace nada (ese se cierra deslizando hacia el otro lado / tocando fuera).
  const edgeTouch = useRef(null);
  function onRootTouchStart(e) {
    if (!e.touches || e.touches.length !== 1) { edgeTouch.current = null; return; }
    const t = e.touches[0];
    edgeTouch.current = t.clientX <= 24 ? { x: t.clientX, y: t.clientY } : null;
  }
  function onRootTouchEnd(e) {
    const start = edgeTouch.current; edgeTouch.current = null;
    if (!start || !e.changedTouches || !e.changedTouches.length) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x, dy = t.clientY - start.y;
    if (dx < 70 || Math.abs(dy) > 45) return; // debe ser un swipe claramente horizontal hacia la derecha
    if (drawer) return;
    if (notifOpen) { setNotifOpen(false); return; }
    if (apptSheet) { setApptSheet(null); return; }
    if (overlay) { setOverlay(null); return; }
    // En Inicio (sin nada abierto): el gesto de borde ABRE el menú lateral (pedido) — no hay que
    // tocar el ícono de abajo. En otras pestañas, el gesto vuelve a Inicio.
    if (tab !== "citas") { setTab("citas"); return; }
    setDrawer(true);
  }

  useEffect(() => {
    function reload() {
      setAppts((window.DB&&window.DB.get("appointments"))||[]);
      setPatients((window.DB&&window.DB.get("patients"))||[]);
    }
    window.addEventListener("jcm:appts", reload);
    window.addEventListener("jcsaas:data", reload);
    return () => { window.removeEventListener("jcm:appts", reload); window.removeEventListener("jcsaas:data", reload); };
  }, []);

  useEffect(() => {
    // Pedido del usuario: la pestaña/título debe llevar la MARCA del producto (Medique), no el
    // nombre de la clínica — igual que el panel de escritorio (JC_Admin.html: "Medique · Panel
    // Clínico"). Título fijo, ya no derivado de clinic_name.
    document.title = "Medique · Panel Móvil";
  }, []);

  // Aviso de sin conexión (pedido): la sincronización con la nube pasa en silencio en segundo plano
  // — sin este aviso, si el celular pierde señal, la clínica sigue viendo datos guardados sin saber
  // que podrían estar desactualizados (una cita nueva de otro dispositivo no llegaría, por ejemplo).
  const [online, setOnline] = useState(() => typeof navigator === "undefined" || navigator.onLine);
  useEffect(() => {
    function goOnline() { setOnline(true); }
    function goOffline() { setOnline(false); }
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => { window.removeEventListener("online", goOnline); window.removeEventListener("offline", goOffline); };
  }, []);

  function saveAppts(updated) { window.DB&&window.DB.set("appointments", updated); setAppts(updated); }
  function updateAppt(id, patch) { const all=(window.DB&&window.DB.get("appointments"))||[]; saveAppts(all.map(x=>x.id===id?{...x,...patch}:x)); }

  function confirmPago(id) {
    const all = (window.DB&&window.DB.get("appointments"))||[];
    const a = all.find(x=>x.id===id);
    if (a && a.fecha && a.time) {
      try {
        const map = (window.DB && window.DB.get('horarios_dates')) || {};
        const cur = Array.isArray(map[a.fecha]) ? map[a.fecha] : [];
        map[a.fecha] = cur.filter(s=>s!==a.time);
        if (window.DB) window.DB.set('horarios_dates', map);
      } catch(e) {}
    }
    saveAppts(all.map(x=>x.id===id?{...x,status:"confirmada"}:x));
  }

  // Cancelar = soft-cancel (igual que el panel de escritorio): la cita queda "anulada" (se puede
  // restaurar) en vez de borrarse. Libera el horario para que vuelva a quedar disponible.
  function cancelAppt(id) {
    const all = (window.DB&&window.DB.get("appointments"))||[];
    const a = all.find(x=>x.id===id);
    if (a && a.fecha && a.time) {
      try {
        const map = (window.DB && window.DB.get('horarios_dates')) || {};
        const cur = Array.isArray(map[a.fecha]) ? [...map[a.fecha]] : [];
        if (!cur.includes(a.time)) { cur.push(a.time); cur.sort(); map[a.fecha]=cur; }
        if (window.DB) window.DB.set('horarios_dates', map);
      } catch(e) {}
    }
    saveAppts(all.map(x=>x.id===id?{...x,status:"anulada",attended:false,anuladaAt:Date.now()}:x));
  }
  // Restaurar: vuelve a "pendiente" (Agendado) y re-ocupa el horario.
  function restoreAppt(id) {
    const all = (window.DB&&window.DB.get("appointments"))||[];
    const a = all.find(x=>x.id===id);
    if (a && a.fecha && a.time) {
      try {
        const map = (window.DB && window.DB.get('horarios_dates')) || {};
        const cur = Array.isArray(map[a.fecha]) ? map[a.fecha] : slotsM().slice();
        map[a.fecha] = cur.filter(s=>s!==a.time);
        if (window.DB) window.DB.set('horarios_dates', map);
      } catch(e) {}
    }
    saveAppts(all.map(x=>x.id===id?{...x,status:"pendiente",attended:false,anuladaAt:null}:x));
  }

  function addAppt(appt) {
    const all = (window.DB&&window.DB.get("appointments"))||[];
    if (appt.fecha && appt.time) {
      try {
        const map = (window.DB && window.DB.get('horarios_dates')) || {};
        const cur = Array.isArray(map[appt.fecha]) ? map[appt.fecha] : slotsM().slice();
        map[appt.fecha] = cur.filter(s=>s!==appt.time);
        if (window.DB) window.DB.set('horarios_dates', map);
      } catch(e) {}
    }
    saveAppts([...all, appt]);
  }
  function addPatient(p) { const np = addPatientM(p); setPatients(patientsAll()); return np; }
  function updatePatient(id, patch) { updatePatientM(id, patch); setPatients(patientsAll()); }

  const pendPago = appts.filter(a=>a.status==="pendiente_pago");
  const pendConsent = consentPendingM(patients, appts);   // consentimientos por firmar (como el portal)
  const bellCount = pendPago.length + pendConsent.length;
  const clinName = (() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return (n && (""+n).trim()) || ""; } catch(e) { return ""; } })();
  // Fecha del día para el subtítulo del header (reemplaza a "Panel móvil"). El mes va en serif
  // itálica + color de acento (PRUEBA rama movil-diseno-portal: mismo tratamiento que el rango de
  // fechas de la Agenda del portal — jc-admin.jsx, "6 de Julio – 12 de Julio").
  const fechaHeaderParts = (() => { const d = new Date(); const dow = DOW_FULL[d.getDay()]; return { pre: dow.charAt(0).toUpperCase()+dow.slice(1)+", "+d.getDate()+" de ", mes: MESES_LARGOS[d.getMonth()].toLowerCase() }; })();
  {/* Objetivo táctil mínimo 44px en toda esta fila: el ícono visual no cambia de tamaño, el margen
      negativo compensa el padding invisible extra para que la fila no se vea más ancha. */}
  const hamburger = <button onClick={()=>setDrawer(true)} aria-label="Menú" style={{ width:44, height:44, borderRadius:"50%", border:"none", background:"none", color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginLeft:-9 }}>
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
  </button>;
  const bell = <button onClick={()=>setNotifOpen(true)} aria-label="Pendientes" style={{ position:"relative", width:44, height:44, borderRadius:"50%", border:"none", background:"none", color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginRight:-7 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>
    {/* Excepción documentada al mínimo de 11px: badge numérico de 1-2 dígitos sobre un ícono
        (mismo patrón que el badge de notificaciones de iOS/Android) — agrandarlo a 11px no cabría
        en un círculo de este tamaño sin verse desproporcionado. */}
    {bellCount>0 && <span style={{ position:"absolute", top:8, right:8, minWidth:18, height:18, padding:"0 4px", borderRadius:999, background:T.accent, color:"#fff", fontFamily:T.sans, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", border:"1.5px solid rgba(255,255,255,.35)" }}>{bellCount}</span>}
  </button>;
  const headerTitle = (txt) => <span style={{ fontFamily:T.serif, fontSize:17, fontWeight:600, color:T.text }}>{txt}</span>;
  const renderHeader = () => {
    if (tab==="citas") return <><div style={{ display:"flex", alignItems:"center", gap:8, minWidth:0 }}>
        {hamburger}
        {/* Pedido: logo SIN fondo blanco, directo sobre el header oscuro. */}
        <img src="/assets/medique-logo.png" alt="Medique" style={{ width:24, height:24, objectFit:"contain", flexShrink:0 }} />
        {/* Pedido: nombre de la clínica + fecha en UNA sola línea horizontal, alineada con la campana. */}
        <div style={{ display:"flex", alignItems:"baseline", gap:5, minWidth:0 }}>
          <span style={{ fontFamily:FRAUNCES, fontSize:13.5, fontWeight:500, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{clinName || "Medique"}</span>
          <span style={{ fontFamily:T.sans, fontSize:11, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>· {fechaHeaderParts.pre}<span style={{ fontFamily:FRAUNCES, fontStyle:"italic", color:T.accent }}>{fechaHeaderParts.mes}</span></span>
        </div>
      </div>{bell}</>;
    if (tab==="nueva") return <>
      <button onClick={()=>setTab("citas")} aria-label="Volver" style={{ width:44, height:44, borderRadius:"50%", border:"none", background:"none", color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginLeft:-9 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <span style={{ position:"absolute", left:0, right:0, textAlign:"center", pointerEvents:"none", fontFamily:T.serif, fontSize:20, fontWeight:600, color:T.text }}>Nueva cita</span>
      <button onClick={()=>setTab("citas")} aria-label="Cerrar" style={{ width:44, height:44, borderRadius:"50%", border:"none", background:"none", color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginRight:-9 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    </>;
    // agenda / horarios / mas: hamburguesa + título centrado + acción a la derecha (filtro en Agenda)
    const titleMap = { horarios:"Bloquear horarios", agenda:"Agenda", mas:"Más" };
    const rightAction = tab==="agenda"
      ? <button onClick={()=>setAgShowAnuladas(v=>!v)} aria-label="Filtro" style={{ width:44, height:44, borderRadius:"50%", border:"none", background:agShowAnuladas?T.accentSoft:"none", color:agShowAnuladas?T.accent:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginRight:-7 }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg></button>
      : <div style={{ width:44 }} />;
    return <>{hamburger}<span style={{ position:"absolute", left:0, right:0, textAlign:"center", pointerEvents:"none", fontFamily:T.serif, fontSize:20, fontWeight:600, color:T.text }}>{titleMap[tab]}</span>{rightAction}</>;
  };
  // Barra inferior del prototipo: 3 pestañas — Inicio · Agenda · Menú. Pacientes y Reportes ya no
  // viven en el nav (accesibles como mosaicos en Inicio y como filas en el Menú). Cada act conserva
  // su comportamiento original (limpiar overlay + cambiar de tab).
  const tabs = [
    { lbl:"Inicio", on: tab==="citas"  && !overlay, act:()=>{ setOverlay(null); setTab("citas"); },  icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"/></svg> },
    { lbl:"Agenda", on: tab==="agenda" && !overlay, act:()=>{ setOverlay(null); setTab("agenda"); }, icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 9.5h17"/><path d="M8 3v4M16 3v4"/></svg> },
    { lbl:"Menú",   on: tab==="mas"    && !overlay, act:()=>{ setOverlay(null); setTab("mas"); },    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg> },
  ];

  // Fondo con BLUR real (pedido): la foto vive en su propia capa aparte y detrás (PhotoBgLayers),
  // y el contenido real va en una capa separada ENCIMA — así el blur nunca toca el texto/los
  // controles, solo la imagen. El MISMO fondo se reutiliza en overlays y menú lateral.
  return (
    <div onTouchStart={onRootTouchStart} onTouchEnd={onRootTouchEnd} style={{ height:"100dvh", overflow:"hidden", position:"relative", backgroundColor:T.bg, maxWidth:480, margin:"0 auto" }}>
      <PhotoBgLayers T={T} />
      <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column" }}>
        {/* Header dinámico por pestaña (referencia): hamburguesa + título/marca + acción a la derecha */}
        {/* Header = TARJETA FLOTANTE redondeada (referencia), no barra recta full-width. Gutter lateral +
            safe-area arriba; la tarjeta glass va redondeada con borde completo. */}
        {/* Inicio y Menú NO llevan barra superior (el prototipo no la tiene): cada uno arma su propio
            encabezado dentro de su tarjeta (saludo en Inicio, título "Menú" en el Menú) con padding
            de safe-area propio. El resto de pestañas (nueva/agenda/horarios) sí usan el header. */}
        {tab!=="citas" && tab!=="mas" && (
          <div style={{ position:"sticky", top:0, zIndex:10, padding:"calc(6px + env(safe-area-inset-top,0px)) 14px 2px" }}>
            <div style={{ position:"relative", display:"flex", justifyContent:"space-between", alignItems:"center", gap:8, padding:"4px 4px", minHeight:36 }}>{renderHeader()}</div>
          </div>
        )}

        {/* Aviso de sin conexión (pedido): visible y persistente mientras dure — no un toast que
            desaparece solo, porque el riesgo (datos desactualizados) sigue mientras siga offline. */}
        {!online && (
          <div style={{ flexShrink:0, margin:"0 14px 6px", padding:"8px 12px", borderRadius:12, background:"rgba(184,134,11,.22)", border:"1px solid rgba(184,134,11,.4)", display:"flex", alignItems:"center", gap:8 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E8B84D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M1 1l22 22M8.5 16.5a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 3.5-2.5M12 20h.01M19 12.5a10 10 0 0 0-2.5-2.2M2 8.5a15 15 0 0 1 4-2.5"/></svg>
            <span style={{ fontFamily:T.sans, fontSize:11.5, color:"#F0D9A8", lineHeight:1.35 }}>Sin conexión · mostrando datos guardados en este equipo</span>
          </div>
        )}

        {/* Content */}
        {/* Pedido: en Agenda y en Inicio la pantalla queda fija (KPI/accesos/encabezados no se mueven)
            — solo scrollea la lista interna (próximas citas / horario). Por eso este contenedor
            exterior NO tiene scroll propio para esas pestañas; cada una maneja su scroll interno. */}
        <div style={{ flex:1, minHeight:0, overflowY: (tab==="agenda"||tab==="citas") ? "hidden" : "auto" }}>
          {tab==="citas"    && <HomeTab     T={T} appts={appts} patients={patients} onOpenAppt={setApptSheet} goTab={setTab} openOverlay={setOverlay} openNotif={()=>setNotifOpen(true)} bellCount={bellCount} />}
          {tab==="horarios" && <HorariosTab T={T} appts={appts} />}
          {tab==="nueva"    && <NuevaWizard T={T} appts={appts} patients={patients} addAppt={addAppt} addPatient={addPatient} onDone={()=>setTab("citas")} />}
          {tab==="agenda"   && <AgendaTab   T={T} appts={appts} onOpenAppt={setApptSheet} goTab={setTab} showAnuladas={agShowAnuladas} setShowAnuladas={setAgShowAnuladas} />}
          {tab==="mas"      && <MasTab      T={T} mode={mode} toggleMode={toggleMode} openOverlay={setOverlay} onLogout={onLogout} openNotif={()=>setNotifOpen(true)} goAnuladas={()=>{ setOverlay(null); setAgShowAnuladas(true); setTab("agenda"); }} />}
        </div>

        {/* Tab bar (prototipo): barra glass navy full-width con blur(28px). Cada ítem = caja redondeada
            ~38x32 (activo = relleno accent + ícono onAccent; inactivo = transparente + ícono textFaint),
            label Jost 10 debajo (activo en accent) y un puntito de 4px (activo = accent). */}
        <div style={{ flexShrink:0, position:"relative", zIndex:5, display:"flex", alignItems:"center", justifyContent:"space-around", padding:"10px 12px calc(16px + env(safe-area-inset-bottom,0px))", background:T.navFill, backdropFilter:"blur(28px) saturate(1.3)", WebkitBackdropFilter:"blur(28px) saturate(1.3)", borderTop:"1px solid "+T.glassBorder }}>
          {tabs.map(({lbl,icon,on,act})=>(
            <button key={lbl} onClick={act}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer", width:64, background:"none", border:"none", padding:0 }}>
              <div style={{ width:38, height:32, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", background: on ? T.accent : "transparent", color: on ? T.onAccent : T.textFaint, transition:"background .18s ease" }}>{icon}</div>
              <span style={{ fontFamily:T.sans, fontWeight:500, fontSize:10, color: on ? T.accent : T.textFaint }}>{lbl}</span>
              <div style={{ width:4, height:4, borderRadius:"50%", background: on ? T.accent : "transparent" }} />
            </button>
          ))}
        </div>
      </div>

      {/* Overlays de navegación tipo iOS push */}
      {overlay==="pacientes" && <PacientesOverlay T={T} patients={patients} appts={appts} addPatient={addPatient} onBack={()=>setOverlay(null)} onOpenFicha={(id)=>setOverlay({type:"ficha", id})} />}
      {overlay==="reportes" && <ReportesOverlay T={T} appts={appts} onBack={()=>setOverlay(null)} onOpenAppt={setApptSheet} />}
      {/* Plantillas de mensajes: opción PROPIA (pedido: no es un reporte) — vive en Más y el menú lateral. */}
      {overlay==="plantillas" && <OverlayShell T={T} title="Plantillas de mensajes" onBack={()=>setOverlay(null)}><MessageTemplatesView T={T} /></OverlayShell>}
      {overlay && overlay.type==="ficha" && <FichaOverlay T={T} patientId={overlay.id} patients={patients} appts={appts} updatePatient={updatePatient} onBack={()=>setOverlay(null)} />}

      {/* Panel de PENDIENTES (campana): consentimientos por firmar + pagos por confirmar (datos reales). */}
      {notifOpen && (() => {
        const closeN = () => setNotifOpen(false);
        const openFichaN = (id) => { setNotifOpen(false); setOverlay({ type:"ficha", id }); };
        const openApptN = (a) => { setNotifOpen(false); setApptSheet(a); };
        const total = pendConsent.length + pendPago.length;
        const docIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 14l2 2 4-4"/></svg>;
        const payIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>;
        const row = (color, icon, title, sub, onClick) => (
          <button key={title+sub} onClick={onClick} style={{ display:"flex", alignItems:"center", gap:12, width:"100%", textAlign:"left", background:"none", border:"none", borderRadius:12, padding:"11px 12px", cursor:"pointer" }}>
            <div style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:color+"22", color:color, display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:T.sans, fontSize:13.5, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{title}</div>
              <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{sub}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        );
        const label = (txt) => <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".08em", textTransform:"uppercase", color:T.textMute, padding:"10px 12px 3px" }}>{txt}</div>;
        return (
          <div onMouseDown={e=>{ if(e.target===e.currentTarget) closeN(); }} style={{ position:"fixed", inset:0, zIndex:410, background:"rgba(0,0,0,.55)", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
            <div onClick={e=>e.stopPropagation()} style={{ ...glassPanel(T,24), borderBottomLeftRadius:0, borderBottomRightRadius:0, maxHeight:"78dvh", display:"flex", flexDirection:"column", paddingBottom:"env(safe-area-inset-bottom,10px)", animation:"jcFade .2s ease" }}>
              <div style={{ padding:"14px 16px 11px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid "+T.divider }}>
                <div>
                  <div style={{ fontFamily:T.serif, fontSize:18, fontWeight:600, color:T.text }}>Pendientes</div>
                  <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textMute, marginTop:1 }}>{total===0 ? "Todo al día" : total+" por resolver"}</div>
                </div>
                <button onClick={closeN} aria-label="Cerrar" style={{ width:44, height:44, borderRadius:"50%", ...glassChip(T), color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
              </div>
              <div className="jc-scroll" style={{ flex:1, overflowY:"auto", padding:"6px 8px 14px", display:"flex", flexDirection:"column", gap:1 }}>
                {total===0 && <div style={{ padding:"40px 16px", textAlign:"center", fontFamily:T.sans, fontSize:13, color:T.textMute }}>Sin pendientes · todo en orden ✓</div>}
                {pendConsent.length>0 && label("Consentimientos por firmar")}
                {pendConsent.map(p => row("#E8B84D", docIcon, p.name||"Paciente", "Consentimiento por firmar", ()=>openFichaN(p.id)))}
                {pendPago.length>0 && label("Pagos por confirmar")}
                {pendPago.map(a => row("#6EA8E8", payIcon, a.name||"Paciente", "Transferencia por confirmar" + (a.time?" · "+a.time:""), ()=>openApptN(a)))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Hoja de acciones de una cita (estados oficiales) */}
      {apptSheet && (
        <ApptSheet T={T} appt={apptSheet} patients={patients} onClose={()=>setApptSheet(null)}
          updateAppt={updateAppt} cancelAppt={cancelAppt} restoreAppt={restoreAppt} confirmPago={confirmPago}
          onOpenFicha={(id)=>{ setApptSheet(null); setOverlay({type:"ficha", id}); }} />
      )}

      {/* Menú lateral (hamburguesa) — navegación completa + salir, deslizando desde la izquierda */}
      {drawer && (() => {
        const go = (id) => { setTab(id); setDrawer(false); };
        const openOv = (o) => { setOverlay(o); setDrawer(false); };
        const navItem = (icon, label, onClick, danger) => (
          <button onClick={onClick} style={{ display:"flex", alignItems:"center", gap:13, width:"100%", textAlign:"left", background:"none", border:"none", borderRadius:11, padding:"12px 12px", cursor:"pointer" }}>
            <div style={{ width:34, height:34, borderRadius:9, background:(danger?T.red:T.accent)+"22", color:danger?T.red:T.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
            <span style={{ fontFamily:T.sans, fontSize:14, fontWeight:500, color:danger?T.red:T.text }}>{label}</span>
          </button>
        );
        return (
          <div onMouseDown={e=>{ if(e.target===e.currentTarget) setDrawer(false); }} style={{ position:"fixed", inset:0, zIndex:400, background:"rgba(0,0,0,.5)", display:"flex" }}>
            {/* Mismo fondo (foto desenfocada + velo) que el resto del panel — antes era un navy azulado
                radial distinto (pedido: unificar el color con la pantalla principal). */}
            <div onClick={e=>e.stopPropagation()} style={{ position:"relative", overflow:"hidden", width:"78%", maxWidth:320, height:"100%", backgroundColor:T.bg, display:"flex", flexDirection:"column", boxShadow:"8px 0 40px -10px rgba(0,0,0,.6)", animation:"jcDrawerIn .22s ease" }}>
              <PhotoBgLayers T={T} />
              <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", height:"100%" }}>
              <div style={{ ...glassChip(T), border:"none", padding:"calc(16px + env(safe-area-inset-top,0px)) 16px 16px", display:"flex", alignItems:"center", gap:11 }}>
                <img src="/assets/medique-logo.png" alt="Medique" style={{ width:34, height:34, flexShrink:0 }} />
                <div style={{ minWidth:0 }}>
                  {/* Mismo criterio que el header: solo el logo es "Medique", el texto es la clínica. */}
                  <div style={{ fontFamily:FRAUNCES, fontSize:18, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{clinName || "Medique"}</div>
                </div>
              </div>
              <div className="jc-scroll" style={{ flex:1, overflowY:"auto", padding:"12px 8px", display:"flex", flexDirection:"column", gap:2 }}>
                {navItem(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>, "Inicio", ()=>go("citas"))}
                {navItem(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01"/></svg>, "Agenda", ()=>go("agenda"))}
                {navItem(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12h14"/></svg>, "Nueva cita", ()=>go("nueva"))}
                {navItem(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, "Horarios", ()=>go("horarios"))}
                {navItem(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, "Pacientes", ()=>openOv("pacientes"))}
                {navItem(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4"/></svg>, "Reportes", ()=>openOv("reportes"))}
                {navItem(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, "Plantillas de mensajes", ()=>openOv("plantillas"))}
                <div style={{ height:1, background:T.divider, margin:"8px 12px" }} />
                {navItem(<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>, "Actualizar datos", ()=>{ window.dispatchEvent(new CustomEvent("jcsaas:data")); setDrawer(false); })}
                {navItem(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>, "Cerrar sesión", ()=>{ setDrawer(false); onLogout(); }, true)}
              </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ─── Entry point (modo local) ─── */
function MobileAdmin() {
  const [mode, setMode] = useState(readMobileMode);
  const T = buildMobileTheme(mode);
  const toggleMode = () => setMode(m => { const n = m === "dark" ? "light" : "dark"; writeMobileMode(n); return n; });
  const D = window.JCDATA;
  const authed0 = !!(window.jcmAdminHasPass&&window.jcmAdminHasPass()&&window.jcmAdminHasSession&&window.jcmAdminHasSession());
  const [authed, setAuthed] = useState(authed0);
  if (!authed) return <LoginScreen T={T} onAuth={()=>setAuthed(true)} />;
  return <MobileShell T={T} D={D} mode={mode} toggleMode={toggleMode} onLogout={()=>{ try { window.jcmAdminEndSession && window.jcmAdminEndSession(); } catch(e){} setAuthed(false); }} />;
}

/* ─── Entry point SaaS (multi-clínica): carga data cacheada inmediatamente ─── */
function MobileSaasGate() {
  const [mode, setMode] = useState(readMobileMode);
  const T = buildMobileTheme(mode);
  const toggleMode = () => setMode(m => { const n = m === "dark" ? "light" : "dark"; writeMobileMode(n); return n; });
  const D = window.JCDATA;

  const hasCachedSession = !!(
    window.JCSAAS && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId() &&
    window.DB && (window.DB.get("appointments") || window.DB.get("patients"))
  );
  const [phase, setPhase] = useState(hasCachedSession ? "app" : "loading");
  const [view, setView] = useState("login");
  const [email, setEmail] = useState(""); const [pass, setPass] = useState("");
  const [err, setErr] = useState(""); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  function authMsgM(e) {
    const c = (e && e.code) || "";
    if (c.indexOf("invalid-credential") >= 0 || c.indexOf("wrong-password") >= 0 || c.indexOf("user-not-found") >= 0) return "Correo o contraseña incorrectos.";
    if (c.indexOf("invalid-email") >= 0) return "El correo no es válido.";
    if (c.indexOf("too-many-requests") >= 0) return "Demasiados intentos. Espera unos minutos.";
    if (c.indexOf("network") >= 0) return "Sin conexión. Revisa tu internet.";
    if (c.indexOf("configuration-not-found") >= 0) return "Falta habilitar Correo/contraseña en Firebase.";
    return "No se pudo entrar. Intenta nuevamente.";
  }

  useEffect(() => {
    window.JCSAAS.onAuth(p => {
      if (!p || p.incomplete) { setPhase("login"); return; }
      const a = window.JCSAAS.access();
      setPhase(a.ok ? "app" : "blocked");
    });
    const t = setTimeout(() => setPhase(x => x === "loading" ? "login" : x), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!busy) return;
    const t = setTimeout(() => { setBusy(false); setErr("La conexión está tardando demasiado. Revisa tu internet e inténtalo de nuevo."); }, 13000);
    return () => clearTimeout(t);
  }, [busy]);

  async function doLogin() {
    if (!email.trim() || !pass) return;
    setErr(""); setBusy(true);
    try { await window.JCSAAS.login(email, pass); setBusy(false); }
    catch (e) { console.error("[Medique] Error de login (móvil):", e); setErr(authMsgM(e)); setBusy(false); }
  }
  async function doRecover() {
    if (!email.trim()) return;
    setErr(""); setMsg(""); setBusy(true);
    try { await window.JCSAAS.resetPassword(email); setMsg("Te enviamos un correo para restablecer tu contraseña."); }
    catch (e) { console.error("[Medique] Error al recuperar contraseña (móvil):", e); setErr(authMsgM(e)); }
    setBusy(false);
  }

  if (phase === "app") return <MobileShell T={T} D={D} mode={mode} toggleMode={toggleMode} onLogout={() => window.JCSAAS.logout()} />;

  // Aspecto IDÉNTICO al login del portal de escritorio (SaasGate, jc-admin.jsx): sin logo, eyebrow
  // en el color de acento, serif fina centrada, inputs opacos con radio 6 (no glass translúcido).
  const inp = { width:"100%", fontFamily:T.sans, fontSize:16, padding:"14px 16px", borderRadius:6, border:"1px solid rgba(255,255,255,.14)", background:"rgba(20,22,28,.85)", color:"#fff", outline:"none", boxSizing:"border-box" };
  const btnSober = { width:"100%", background:"rgba(235,238,242,.92)", color:"#15181D", fontFamily:T.sans, fontSize:12, fontWeight:500, letterSpacing:".14em", textTransform:"uppercase", border:"none", borderRadius:6, padding:"14px", cursor:"pointer", marginTop:4 };
  const linkSober = { background:"none", border:"none", cursor:"pointer", color:T.accent, fontFamily:T.sans, fontSize:12, textDecoration:"underline", padding:6 };
  const SERIF = FRAUNCES; // la serif real del portal (Fraunces), no Marcellus
  const eyebrow = { fontFamily:T.sans, fontSize:10, letterSpacing:".28em", textTransform:"uppercase", color:T.accent, textAlign:"center" };
  const title = { fontFamily:SERIF, fontWeight:300, fontSize:34, color:"#fff", textAlign:"center", margin:"12px 0 6px", lineHeight:1.05 };
  const subtitle = { fontFamily:T.sans, fontSize:12.5, color:ON_PHOTO.mute, textAlign:"center", lineHeight:1.6, margin:"0 0 22px" };
  // Toda la "zona de login" (cargando/entrar/bloqueado/recuperar) comparte el mismo fondo.
  const center = (kids) => <LoginVideoBg>{kids}</LoginVideoBg>;

  if (phase === "loading") return center(<>
    <div style={eyebrow}>Medique · Panel móvil</div>
    <h1 style={title}>Conectando…</h1>
    <p style={subtitle}>Verificando tu sesión.</p>
  </>);

  if (phase === "blocked") return center(<>
    <h1 style={title}>Plan inactivo</h1>
    <p style={subtitle}>El acceso de tu clínica no está activo. Escríbenos para reactivarlo.</p>
    <button onClick={()=>window.JCSAAS.logout()} style={{ background:"none", border:"1px solid rgba(255,255,255,.25)", color:"#fff", fontFamily:T.sans, fontSize:12, borderRadius:6, padding:"12px 18px", cursor:"pointer" }}>Cerrar sesión</button>
  </>);

  if (view === "recover") return center(<>
    <div style={eyebrow}>Medique · Panel móvil</div>
    <h1 style={title}>Recuperar contraseña</h1>
    <p style={subtitle}>Te enviaremos un enlace a tu correo para restablecerla.</p>
    <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:11 }}>
      <input placeholder="Correo de tu cuenta" inputMode="email" data-nocap="" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doRecover()} style={inp} />
      {err && <div style={{ fontFamily:T.sans, fontSize:12, color:T.red, textAlign:"center" }}>{err}</div>}
      {msg && <div style={{ fontFamily:T.sans, fontSize:12, color:"#7CDDA8", textAlign:"center" }}>{msg}</div>}
      <button onClick={doRecover} disabled={busy||!email.trim()} style={{ ...btnSober, opacity:(busy||!email.trim())?.6:1 }}>{busy?"Enviando…":"Enviar enlace"}</button>
      <div style={{ textAlign:"center" }}><button onClick={()=>{ setView("login"); setErr(""); setMsg(""); }} style={linkSober}>← Volver</button></div>
    </div>
  </>);

  return center(<>
    <div style={eyebrow}>Medique · Panel móvil</div>
    <h1 style={title}>Confirmar citas</h1>
    <p style={subtitle}>Accede al panel de tu clínica.</p>
    <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:11 }}>
      <input placeholder="Correo de tu clínica" inputMode="email" autoComplete="email" data-nocap="" value={email} onChange={e=>setEmail(e.target.value)} style={inp} />
      <input type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} autoComplete="current-password" style={inp} />
      {err && <div style={{ fontFamily:T.sans, fontSize:12, color:T.red, textAlign:"center" }}>{err}</div>}
      <button onClick={doLogin} disabled={busy} style={{ ...btnSober, opacity:busy?.6:1 }}>{busy?"…":"Entrar"}</button>
      <div style={{ textAlign:"center" }}><button onClick={()=>{ setView("recover"); setErr(""); }} style={linkSober}>¿Olvidaste tu contraseña?</button></div>
    </div>
  </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  (window.JCSAAS && window.JCSAAS.enabled) ? <MobileSaasGate /> : <MobileAdmin />
);
