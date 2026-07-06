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
  return addr ? ("https://www.medique.cl/ir?to="+encodeURIComponent(addr)) : "";
}
// Mensaje de confirmación al CREAR una cita nueva — mismo texto que el portal: fecha, hora,
// tratamiento, profesional, dirección y "cómo llegar" con el link inteligente de mapa.
function jcmCitaConfirmMsgM(name, iso, time, proc, prof, clinNombre, clinDir) {
  const d = new Date(iso+"T12:00:00");
  const wd = WDS[d.getDay()], dd = d.getDate(), mm = MESES[d.getMonth()];
  const maps = clinicMapsLinkM();
  const L = ["Hola "+name+" 👋", "", "Tu cita en "+clinNombre+" quedó confirmada:", "",
    "🗓️ Fecha: "+wd+" "+dd+" "+mm, "⏰ Hora: "+time+" hrs", "💉 Tratamiento: "+proc, "👨‍⚕️ Profesional: "+(prof||"")];
  if (clinDir) L.push("📍 Dirección: "+clinDir);
  if (maps) L.push("", "🏥 Cómo llegar: "+maps);
  L.push("", "Recuerda llegar 5 min antes. Si necesitas reagendar, avísanos con 24 h de anticipación.", "", "¡Nos vemos pronto!");
  return L.join("\n");
}
// Mensaje del botón "Confirmar asistencia" — mismo texto que el portal: pide responder SÍ/NO,
// con fecha/hora en español y el link de "cómo llegar".
function jcmConfirmAsistMsgM(a, clinNombre) {
  const maps = clinicMapsLinkM();
  let fecha = "";
  try { if (a.fecha) fecha = new Date(a.fecha+"T00:00:00").toLocaleDateString("es-CL", { weekday:"long", day:"numeric", month:"long" }); } catch(e) {}
  const cuando = (fecha?"el "+fecha:"") + (a.time ? ((fecha?" a las ":"a las ")+a.time+" hrs") : "");
  const L = ["Hola "+(a.name||"")+",", "",
    "Te escribimos de "+clinNombre+" para confirmar tu asistencia a tu cita"+(cuando?" "+cuando:"")+(a.proc?" ("+a.proc+")":"")+".", "",
    "¿Nos confirmas? Responde *SÍ* para confirmar o *NO* si necesitas reagendar"];
  if (maps) L.push("", "Cómo llegar: "+maps);
  L.push("", "¡Te esperamos!");
  return L.join("\n");
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
// —#1A50A3, #B8860B— quedaban muy apagados sobre el fondo).
function apptStateM(a, T) {
  // Color de la BARRA lateral y el punto (tokens del MD: verde/amarillo/rojo/azul).
  if (a.status === "anulada")        return { label: "Cancelada",   color: T.textFaint };
  if (a.status === "no_asistio")     return { label: "No asistió",  color: "#FF6B7D" };
  if (a.attended || a.status === "atendida") return { label: "Atendida", color: "#6EA8E8" };
  if (a.status === "confirmada")     return { label: "Confirmada",  color: "#46D27A" };
  if (a.status === "pendiente_pago") return { label: "⏳ Transferencia", color: "#F5B93D" };
  // "Agendado" (pendiente de confirmar) = amarillo, coherente con la cápsula-resumen y el mockup.
  return { label: "Agendado", color: "#F5B93D" };
}
// Usa hora local del dispositivo, NO UTC (evita el desfase de zona horaria)
function localISO(d) {
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}
function todayISO() { return localISO(new Date()); }
function offToISO(off) { const d = new Date(); d.setDate(d.getDate()+off); return localISO(d); }
function isoToDayOff(iso) { const d = new Date(iso+"T00:00:00"), t = new Date(); t.setHours(0,0,0,0); return Math.round((d-t)/86400000); }
function procList() { try { return window.JCDATA.catalog.reduce((a,s) => { s.groups.forEach(g => g.items.forEach(it => a.push(it.n))); return a; }, []); } catch(e) { return []; } }
function durOf(a) { const d = a.dur || (window.JCDATA&&window.JCDATA.procMin ? window.JCDATA.procMin(a.proc)+" min" : "30 min"); return (""+d).replace(/\s*minutos?\b/i, " min").trim(); }

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
// Fuente del panel móvil = SF Pro (la del sistema en iPhone). En el iPhone del usuario -apple-system
// renderiza SF Pro real → match exacto con la referencia. Se usa TANTO en serif como en sans para
// que TODO el panel sea SF Pro (la referencia no usa serif en ningún lado), diferenciando por peso.
const SF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', system-ui, Roboto, sans-serif";
// Prueba de diseño (rama aparte, restaurable): acento de marca Fraunces — la MISMA serif real del
// portal de escritorio (navyAccent) — usado SOLO en 3 lugares puntuales: el título "Medique" del
// header, las cifras de los KPI y la hora de las citas (Home + Agenda). Todo lo demás sigue en SF
// Pro real, sin tocar la regla previa de "todo el panel es SF Pro".
const FRAUNCES = "'Fraunces', Georgia, serif";
function photoTheme(T) {
  return Object.assign({}, T, {
    dark: true,                              // fuerza la rama "glass oscuro" en glassPanel/glassChip
    text: ON_PHOTO.text, textMute: ON_PHOTO.mute, textFaint: ON_PHOTO.faint,
    line: "rgba(255,255,255,.16)", lineSoft: "rgba(255,255,255,.09)",
    serif: SF, sans: SF,                     // toda la tipografía del móvil en SF Pro (como el mockup)
    // Acento SLATE apagado (navyAccent del portal — el mismo que reemplazó al celeste/turquesa
    // "saturado" en jc-admin.jsx): #7891A6 en oscuro. Reemplaza al azul vivo anterior.
    accent: "#7891A6", accentSoft: "rgba(120,145,166,.16)", onAccent: "#FFFFFF"
  });
}
// Glass "liquid" (foto 3/4 de referencia): muy translúcido + blur alto, para que la foto se
// transparente detrás de cada tarjeta sin perder legibilidad.
// "Liquid Glass" (iOS 26, validado en maqueta): brillo superior que se disuelve hacia la base
// translúcida — simula el refractado/especular del material real (no solo un tinte plano+blur).
function glassPanel(T, radius) {
  return {
    background: "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.03) 45%, rgba(255,255,255,.045) 100%)",
    backdropFilter: "blur(28px) saturate(1.5)", WebkitBackdropFilter: "blur(28px) saturate(1.5)",
    border: "1px solid rgba(255,255,255,.1)", borderRadius: radius==null?20:radius,
    boxShadow: "0 18px 42px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.14)"
  };
}
function glassChip(T) {
  return {
    background: "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.025) 45%, rgba(255,255,255,.04) 100%)",
    backdropFilter: "blur(16px) saturate(1.4)", WebkitBackdropFilter: "blur(16px) saturate(1.4)",
    border: "1px solid rgba(255,255,255,.1)"
  };
}
// Capas de fondo del panel (foto desenfocada + velo oscuro): MISMO fondo en TODAS las pantallas
// (Inicio, Agenda, Pacientes, Reportes, menú lateral) para que no haya un navy azulado distinto en
// unas y la foto en otras. Se usa como primeras dos capas dentro de un contenedor position:relative.
const MOBILE_BG_OVERLAY = "linear-gradient(180deg, rgba(9,13,22,.6), rgba(8,12,20,.68) 50%, rgba(6,10,17,.8))";
function PhotoBgLayers() {
  return (
    <>
      <div style={{ position:"absolute", inset:-24, backgroundImage:"url('/assets/everest-mobile.jpg?v=11')", backgroundSize:"cover", backgroundPosition:"center top", backgroundRepeat:"no-repeat", filter:"blur(22px)", transform:"scale(1.08)" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:MOBILE_BG_OVERLAY }} />
    </>
  );
}
// Fondo de la pantalla de LOGIN: foto fija + velo casi negro, IDÉNTICO al login del portal de
// escritorio (SaasGate, jc-admin.jsx) — antes era un velo azulado más claro, propio del móvil.
// La foto va DESENFOCADA en su propia capa (no la nueva v3, que a diferencia de la anterior no
// viene pre-desenfocada) para que el texto/los inputs no se pierdan contra el detalle de la montaña.
function LoginVideoBg({ children }) {
  const overlay = "linear-gradient(rgba(9,11,15,.76), rgba(9,11,15,.90))";
  return (
    <div style={{ position:"relative", minHeight:"100dvh", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"30px 24px", backgroundColor:"#070707" }}>
      <div style={{ position:"absolute", inset:-24, backgroundImage:"url('/assets/everest-mobile.jpg?v=11')", backgroundSize:"cover", backgroundPosition:"center top", backgroundRepeat:"no-repeat", filter:"blur(22px)", transform:"scale(1.08)" }} />
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
        {err && <div style={{ fontFamily:T.sans, fontSize:12, color:"#E0607A", textAlign:"center" }}>{err}</div>}
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

  const card = { ...glassPanel(T, 22), width:"100%", maxWidth:480, maxHeight:"88dvh", overflowY:"auto", padding:"10px 18px calc(22px + env(safe-area-inset-bottom,0px))", boxSizing:"border-box" };
  const inp = { width:"100%", boxSizing:"border-box", fontFamily:T.sans, fontSize:14, padding:"11px 13px", borderRadius:9, border:"1px solid "+(T.dark?"rgba(255,255,255,.16)":T.line), background:T.dark?"rgba(0,0,0,.25)":"#fff", color:T.text, outline:"none" };

  return (
    <div onMouseDown={e=>{ if (e.target===e.currentTarget) onClose(); }} style={{ position:"fixed", inset:0, zIndex:300, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(0,0,0,.55)" }}>
      <div onClick={e=>e.stopPropagation()} style={card}>
        <div style={{ width:36, height:4, borderRadius:2, background:T.dark?"rgba(255,255,255,.25)":"rgba(0,0,0,.18)", margin:"6px auto 14px" }} />
        <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14 }}>
          <div style={{ width:44, height:44, borderRadius:"50%", background:st.color+"26", color:st.color, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:15, fontWeight:700, flexShrink:0 }}>
            {(a.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:T.serif, fontSize:19, fontWeight:600, color:T.text, lineHeight:1.15 }}>{a.name}</div>
            <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.textMute, marginTop:2 }}>{a.time} · {a.proc||"—"} · {durLabel}</div>
            {matched && <button onClick={()=>onOpenFicha(matched.id)} style={{ marginTop:4, background:"none", border:"none", padding:0, cursor:"pointer", fontFamily:T.sans, fontSize:11.5, color:T.accent, textDecoration:"underline" }}>Ver ficha del paciente →</button>}
          </div>
          <button onClick={onClose} aria-label="Cerrar" style={{ flexShrink:0, width:30, height:30, borderRadius:"50%", border:"none", background:T.dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.06)", color:T.textMute, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {isPend && (
          <button onClick={()=>{ confirmPago(a.id); onClose(); }}
            style={{ width:"100%", background:"#1F8A5B", color:"#fff", fontFamily:T.sans, fontSize:12.5, letterSpacing:".08em", textTransform:"uppercase", border:"none", borderRadius:10, padding:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:12 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            Confirmar transferencia
          </button>
        )}

        {isAnulada ? (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.textMute, marginBottom:10, lineHeight:1.5 }}>Esta cita está cancelada. Restaurarla la vuelve a dejar agendada y ocupa el horario nuevamente.</div>
            <button onClick={()=>{ restoreAppt(a.id); onClose(); }} style={{ width:"100%", background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12.5, fontWeight:600, border:"none", borderRadius:10, padding:"14px", cursor:"pointer" }}>Restaurar cita</button>
          </div>
        ) : (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontFamily:T.sans, fontSize:9.5, letterSpacing:".14em", textTransform:"uppercase", color:T.textFaint, marginBottom:8 }}>Estado de la cita</div>
            {!confirmCancel ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8 }}>
                {STATUS_STEPS.map(s => {
                  const on = (s.key==="pendiente" ? (a.status==="pendiente"||!a.status) : a.status===s.key) || (s.key==="atendida" && a.attended);
                  const isCancelBtn = s.key === "anulada";
                  return (
                    <button key={s.key} onClick={()=>setStatus(s.key)}
                      style={{ fontFamily:T.sans, fontSize:12.5, fontWeight:on?700:500, padding:"12px 8px", borderRadius:9, cursor:"pointer",
                        gridColumn: isCancelBtn ? "1 / -1" : undefined,
                        border:"1px solid "+(isCancelBtn ? "#C0285A55" : (on ? T.accent : (T.dark?"rgba(255,255,255,.14)":T.line))),
                        background: isCancelBtn ? "transparent" : (on ? T.accent : (T.dark?"rgba(255,255,255,.05)":"rgba(255,255,255,.6)")),
                        color: isCancelBtn ? "#C0285A" : (on ? T.onAccent : T.text) }}>
                      {s.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setConfirmCancel(false)} style={{ flex:1, padding:"13px", borderRadius:9, border:"1px solid "+T.line, background:"transparent", color:T.textMute, fontFamily:T.sans, fontSize:12.5, cursor:"pointer" }}>Volver</button>
                <button onClick={()=>{ cancelAppt(a.id); onClose(); }} style={{ flex:1, padding:"13px", borderRadius:9, border:"none", background:"#C0285A", color:"#fff", fontFamily:T.sans, fontSize:12.5, fontWeight:600, cursor:"pointer" }}>Sí, cancelar cita</button>
              </div>
            )}
          </div>
        )}

        {/* Comentario */}
        {editCom ? (
          <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:12 }}>
            <textarea value={comTxt} onChange={e=>setComTxt(e.target.value)} placeholder="Ej. Evaluación de botox, control rinomodelación…" rows={2} autoFocus style={{ ...inp, resize:"none" }} />
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={()=>setEditCom(false)} style={{ flex:1, height:36, borderRadius:8, border:"1px solid "+T.line, background:"transparent", color:T.textMute, fontFamily:T.sans, fontSize:12, cursor:"pointer" }}>Cancelar</button>
              <button onClick={()=>{ updateAppt(a.id,{comentario:comTxt.trim()}); setEditCom(false); }} style={{ flex:2, height:36, borderRadius:8, border:"none", background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, fontWeight:600, cursor:"pointer" }}>Guardar</button>
            </div>
          </div>
        ) : (
          <button onClick={()=>setEditCom(true)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", ...glassChip(T), borderRadius:9, padding:"10px 12px", cursor:"pointer", textAlign:"left", marginBottom:10 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span style={{ fontFamily:T.sans, fontSize:12, color:a.comentario?T.text:T.textFaint, flex:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.comentario || "Agregar comentario"}</span>
          </button>
        )}

        {/* Editar detalles */}
        {edit ? (
          <div style={{ display:"flex", flexDirection:"column", gap:8, ...glassChip(T), borderRadius:10, padding:"12px 13px", marginBottom:10 }}>
            <div style={{ fontFamily:T.sans, fontSize:9.5, letterSpacing:".12em", textTransform:"uppercase", color:T.accent }}>Editar cita</div>
            <label style={{ fontFamily:T.sans, fontSize:11, color:T.textMute }}>Fecha
              <input type="date" value={ef.fecha} onChange={e=>setEf(f=>({...f,fecha:e.target.value}))} style={{ ...inp, marginTop:3 }} /></label>
            <div style={{ display:"flex", gap:8 }}>
              <label style={{ flex:1, fontFamily:T.sans, fontSize:11, color:T.textMute }}>Hora
                <select value={ef.time} onChange={e=>setEf(f=>({...f,time:e.target.value}))} style={{ ...inp, marginTop:3 }}>{HALF_HOURS.map(h=><option key={h} value={h}>{h}</option>)}{HALF_HOURS.indexOf(ef.time)<0 && <option value={ef.time}>{ef.time}</option>}</select></label>
              <label style={{ flex:1, fontFamily:T.sans, fontSize:11, color:T.textMute }}>Duración
                <select value={ef.dur} onChange={e=>setEf(f=>({...f,dur:e.target.value}))} style={{ ...inp, marginTop:3 }}>{["15","30","45","60","90","120"].map(d=><option key={d} value={d}>{d} min</option>)}</select></label>
            </div>
            <label style={{ fontFamily:T.sans, fontSize:11, color:T.textMute }}>Procedimiento
              {procOpts.length ? <select value={ef.proc} onChange={e=>setEf(f=>({...f,proc:e.target.value}))} style={{ ...inp, marginTop:3 }}>{[ef.proc, ...procOpts.filter(p=>p!==ef.proc)].filter(Boolean).map(p=><option key={p} value={p}>{p}</option>)}</select>
                : <input value={ef.proc} onChange={e=>setEf(f=>({...f,proc:e.target.value}))} placeholder="Procedimiento" style={{ ...inp, marginTop:3 }} />}</label>
            <div style={{ display:"flex", gap:6, marginTop:2 }}>
              <button onClick={()=>setEdit(false)} style={{ flex:1, height:38, borderRadius:8, border:"1px solid "+T.line, background:"transparent", color:T.textMute, fontFamily:T.sans, fontSize:12, cursor:"pointer" }}>Cancelar</button>
              <button onClick={()=>{ updateAppt(a.id,{ fecha:ef.fecha, day:isoToDayOff(ef.fecha), time:ef.time, dur:ef.dur+" minutos", proc:ef.proc }); setEdit(false); }} style={{ flex:2, height:38, borderRadius:8, border:"none", background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, fontWeight:600, cursor:"pointer" }}>Guardar cambios</button>
            </div>
          </div>
        ) : (
          <button onClick={()=>{ setEf({ fecha:a.fecha||todayISO(), time:a.time||"10:00", dur:(parseInt(a.dur)||30)+"", proc:a.proc||"" }); setEdit(true); }} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", ...glassChip(T), borderRadius:9, padding:"10px 12px", cursor:"pointer", textAlign:"left", color:T.text, fontFamily:T.sans, fontSize:12.5, marginBottom:10 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
            Editar fecha, hora, duración o procedimiento
          </button>
        )}

        {waPhone && (
          // Mismo mensaje que el botón "Confirmar asistencia" del portal de escritorio
          // (jcmConfirmAsistMsg): pide responder SÍ/NO, con fecha/hora en español y cómo llegar.
          <a href={"https://wa.me/56"+waPhone.replace(/^(56|0)/,"")+"?text="+encodeURIComponent(jcmConfirmAsistMsgM(a, clinNombre))}
            target="_blank" rel="noopener"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:"#1F8A5B22", border:"1px solid #1F8A5B55", borderRadius:9, padding:"12px", textDecoration:"none", color:"#1F8A5B", fontFamily:T.sans, fontSize:12.5, fontWeight:500 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#1F8A5B"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z"/></svg>
            Confirmar asistencia
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
    let weekly = HALF_HOURS.slice();
    const h = window.DB && window.DB.get("horarios_v1");
    if (h && h[wd]) { weekly = h[wd].open === false ? [] : (h[wd].slots || HALF_HOURS.slice()); }
    const map = (window.DB && window.DB.get("horarios_dates")) || {};
    const avail = map[iso] != null ? map[iso] : weekly;
    const occupied = new Set();
    appts.filter(a => a.status !== "anulada" && (a.fecha || offToISO(a.day || 0)) === iso).forEach(a => {
      if (!a.time) return;
      const start = minsM(a.time);
      const dur = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
      HALF_HOURS.forEach(s => { const m = minsM(s); if (m >= start && m < start + dur) occupied.add(s); });
    });
    const cap = new Set([...avail, ...occupied]).size;
    return cap ? Math.round(occupied.size / cap * 100) : 0;
  } catch (e) { return 0; }
}
// Cápsula-resumen del día (referencia): • verde confirmadas · • amarillo pendientes · • rojo no asistió.
function DaySummary({ T, c, p, na, prefix, bars }) {
  const dot = (color, txt) => (
    <span style={{ display:"flex", alignItems:"center", gap:6, whiteSpace:"nowrap" }}>
      <span style={{ width:7, height:7, borderRadius:"50%", background:color, flexShrink:0 }} />
      <span style={{ fontFamily:T.sans, fontSize:bars?12:10.5, color:T.textMute }}>{txt}</span>
    </span>
  );
  // Separador entre los tres estados: barra vertical en Agenda (referencia), "·" en Home.
  const sep = bars
    ? <span style={{ width:1, height:14, background:"rgba(255,255,255,.14)" }} />
    : <span style={{ fontFamily:T.sans, fontSize:11, color:T.textFaint }}>·</span>;
  return (
    <div style={{ ...glassChip(T), borderRadius: bars?14:12, padding: bars?"11px 10px":"9px 12px", display:"flex", alignItems:"center", justifyContent: bars?"space-around":"center", gap:8, flexWrap:"wrap" }}>
      {dot("#46D27A", (prefix?prefix+" ":"") + c + " confirmada" + (c===1?"":"s"))}
      {sep}
      {dot("#E8B84D", p + " pendiente" + (p===1?"":"s"))}
      {sep}
      {dot("#FF6B7D", na + " no asistió")}
    </div>
  );
}
function HomeTab({ T, appts, patients, onOpenAppt, goTab, openOverlay }) {
  const today = todayISO();
  const yestISO = offToISO(-1);
  const active = appts.filter(a => a.status !== "anulada");
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
    .slice(0, 5);

  const clinNombre = (() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return (n && (""+n).trim()) || ""; } catch(e) { return ""; } })();
  const fechaLarga = (() => { const d = new Date(); const s = DOW_FULL[d.getDay()]+", "+d.getDate()+" de "+MESES_LARGOS[d.getMonth()].toLowerCase(); return s.charAt(0).toUpperCase()+s.slice(1); })();

  // KPIs — dashboard horizontal (pedido): cifra grande (tamaño de la versión anterior, más legible)
  // pero tarjeta más compacta (~75% del padding actual) para que el bloque en conjunto ocupe menos.
  const kpi = (label, val, sub, subColor) => (
    <div style={{ flex:1, minWidth:0, ...glassPanel(T,14), padding:"6px 8px 6px", display:"flex", flexDirection:"column", gap:1 }}>
      <div style={{ fontFamily:T.sans, fontSize:8, letterSpacing:".03em", textTransform:"uppercase", color:T.textMute, lineHeight:1.2 }}>{label}</div>
      <div style={{ fontFamily:FRAUNCES, fontSize:21, fontWeight:500, color:T.text, lineHeight:1.1, letterSpacing:"-.01em" }}>{val}</div>
      {sub && <div style={{ fontFamily:T.sans, fontSize:7.5, color:subColor||T.textFaint, lineHeight:1.1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{sub}</div>}
    </div>
  );
  // Avatar de la clínica: foto guardada (jcm_admin_photo) o iniciales, como en la referencia.
  const avatarSrc = (() => { try { return localStorage.getItem("jcm_admin_photo") || ""; } catch(e) { return ""; } })();
  const ini = (clinNombre||"JC").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase();

  // Accesos rápidos (referencia): 4 tiles con ícono arriba-izquierda + etiqueta debajo. El primero
  // ("Nueva cita") va relleno de acento; el resto en glass.
  // Accesos rápidos (referencia): 4 tiles glass con ícono centrado arriba y etiqueta debajo.
  // "Nueva cita" destaca con su círculo de acento relleno; los demás lo llevan tenue.
  // Inner tiles (referencia): superficie sutil dentro de UN contenedor glass exterior, no 4 tarjetas
  // pesadas sueltas. "Nueva cita" lleva el círculo azul; los demás, ícono de línea claro.
  // Pila flotante de accesos rápidos reducida a ~75% (pedido): se conserva el TAMAÑO de los íconos
  // (svg + círculo de 28px), solo se reduce lo demás — alto, paddings, separaciones y la etiqueta.
  const action = (icon, label, onClick, primary) => (
    <button onClick={onClick} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, minHeight:42, minWidth:0, cursor:"pointer", borderRadius:11,
      background: primary ? T.accentSoft : "rgba(255,255,255,.035)", border:"1px solid "+(primary?"rgba(120,145,166,.4)":"rgba(255,255,255,.08)"), padding:"5px 3px" }}>
      {primary
        ? <div style={{ width:28, height:28, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background:T.accent, color:"#fff", boxShadow:"0 4px 10px -4px "+T.accent }}>{icon}</div>
        : <div style={{ height:28, display:"flex", alignItems:"center", justifyContent:"center", color:"#A9BAC7" }}>{icon}</div>}
      <span style={{ fontFamily:T.sans, fontSize:9, fontWeight:500, lineHeight:1.05, textAlign:"center", color:T.text }}>{label}</span>
    </button>
  );

  return (
    // Pedido: los KPI y los accesos rápidos quedan FIJOS — solo la lista de "Próximas citas"
    // scrollea. Por eso el contenedor ocupa todo el alto y su bloque superior no se desplaza.
    <div style={{ height:"100%", display:"flex", flexDirection:"column", padding:"12px 16px 0" }}>
      {/* Bloque FIJO: KPI + resumen del día + pila de accesos rápidos. */}
      <div style={{ flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ display:"flex", gap:7 }}>
          {kpi("Citas hoy", todayAppts.length, vsAyer(delta))}
          {kpi("Confirmadas", confirmadas, pct(confirmadas)+"% del total")}
          {kpi("Pendientes", pendientes, pct(pendientes)+"% del total")}
          {kpi("Ocupación", ocup+"%", vsAyer(ocupDelta, " pts"))}
        </div>

        {todayAppts.length>0 && <DaySummary T={T} c={cToday} p={pToday} na={naToday} prefix="Hoy:" />}

        <div style={{ ...glassPanel(T,18), display:"flex", gap:7, padding:7 }}>
          {action(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>, "Nueva cita", ()=>goTab("nueva"), true)}
          {action(<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, "Pacientes", ()=>openOverlay("pacientes"))}
          {action(<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, "Bloquear horario", ()=>goTab("horarios"))}
          {action(<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4"/></svg>, "Reportes", ()=>openOverlay("reportes"))}
        </div>
      </div>

      {/* Próximas citas: el título queda fijo, solo la LISTA scrollea. */}
      <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", marginTop:12 }}>
        <div style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:9 }}>
          <span style={{ fontFamily:T.sans, fontSize:15, fontWeight:600, color:T.text }}>Próximas citas</span>
          <button onClick={()=>goTab("agenda")} style={{ background:"none", border:"none", padding:0, cursor:"pointer", fontFamily:T.sans, fontSize:12, fontWeight:600, color:T.accent, display:"flex", alignItems:"center", gap:3 }}>Ver agenda <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
        <div style={{ flex:1, minHeight:0, overflowY:"auto", WebkitOverflowScrolling:"touch", paddingBottom:14 }}>
          {upcoming.length===0 && (
            <div style={{ ...glassPanel(T,14), padding:"26px 18px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:11 }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center", color:T.textMute }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </div>
              <div style={{ fontFamily:T.sans, fontSize:13, color:T.textMute, lineHeight:1.5 }}>No tienes próximas citas.<br/>Agenda la primera para empezar el día.</div>
              <button onClick={()=>goTab("nueva")} style={{ display:"inline-flex", alignItems:"center", gap:6, ...glassChip(T), borderRadius:10, padding:"9px 15px", color:T.text, fontFamily:T.sans, fontSize:12.5, fontWeight:600, cursor:"pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                Nueva cita
              </button>
            </div>
          )}
          {/* Tarjeta plana (pedido): hora | nombre ... abreviación del procedimiento al borde derecho,
              todo alineado en la línea media de la tarjeta. Punto de color al inicio = estado. */}
          {upcoming.length>0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {upcoming.map((a,i) => {
              const st = apptStateM(a, T);
              return (
                <button key={a.id} onClick={()=>onOpenAppt(a)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", cursor:"pointer", background:"rgba(255,255,255,.035)", border:"1px solid rgba(255,255,255,.08)", borderRadius:12, overflow:"hidden", padding:"10px 12px" }}>
                  <span aria-hidden="true" title={st.label} style={{ width:9, height:9, borderRadius:"50%", background:st.color, flexShrink:0, boxShadow:"0 0 0 3px color-mix(in srgb, "+st.color+" 24%, transparent)" }} />
                  <span style={{ flexShrink:0, fontFamily:FRAUNCES, fontSize:13, fontWeight:500, color:T.text }}>{a.time}</span>
                  <span style={{ flex:1, minWidth:0, fontFamily:T.sans, fontSize:13, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.name}</span>
                  <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:10, fontWeight:700, color:st.color, background:"color-mix(in srgb, "+st.color+" 20%, transparent)", borderRadius:6, padding:"3px 7px" }}>{abbrevProcM(a.proc)}</span>
                </button>
              );
            })}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab Horarios (sin cambios de lógica, solo glass) ─── */
function HorariosTab({ T, appts }) {
  const [selOff, setSelOff] = useState(0);
  const days = Array.from({length:14},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()+i); return { off:i, iso:localISO(d), wd:WDS[d.getDay()], dd:d.getDate() }; });
  const selDay = days[selOff];
  const [slotsMap, setSlotsMap] = useState(()=>(window.DB && window.DB.get('horarios_dates')) || {});
  useEffect(() => {
    function reload() { setSlotsMap((window.DB && window.DB.get('horarios_dates')) || {}); }
    window.addEventListener('jcsaas:data', reload);
    return () => window.removeEventListener('jcsaas:data', reload);
  }, []);
  const weeklySlots = (() => {
    try { var h = window.DB && window.DB.get('horarios_v1'); var wd = new Date(selDay.iso + 'T12:00:00').getDay(); if (h && h[wd] && h[wd].open !== false) return h[wd].slots || HALF_HOURS.slice(); if (h && h[wd] && h[wd].open === false) return []; } catch(e) {}
    return HALF_HOURS.slice();
  })();
  const avail = slotsMap[selDay.iso]!=null ? slotsMap[selDay.iso] : weeklySlots;
  const occupied = new Set();
  appts
    .filter(a => a.status !== "anulada" && (a.fecha ? a.fecha === selDay.iso : a.day === selOff))
    .forEach(a => {
      if (!a.time) return;
      const startMin = minsM(a.time);
      const durMin = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
      HALF_HOURS.forEach(slot => {
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
    const cur = map[selDay.iso]!=null ? [...map[selDay.iso]] : weeklySlots.slice();
    map[selDay.iso] = cur.includes(slot) ? cur.filter(s=>s!==slot) : [...cur,slot].sort();
    saveMap(map);
  }
  function blockAll() { const m=(window.DB && window.DB.get('horarios_dates')) || {}; m[selDay.iso]=[]; saveMap(m); }
  function openAll()  { const m=(window.DB && window.DB.get('horarios_dates')) || {}; delete m[selDay.iso]; saveMap(m); }

  const availCount = avail.filter(s=>!occupied.has(s)).length;
  const blockedCount = HALF_HOURS.filter(s=>!avail.includes(s)&&!occupied.has(s)).length;

  return (
    <div style={{ padding:"6px 12px 90px" }}>
      <div style={{ overflowX:"auto" }}>
        <div style={{ display:"flex", gap:8, padding:"6px 2px 12px", minWidth:"max-content" }}>
          {days.map((d,i)=>(
            <button key={i} onClick={()=>setSelOff(i)}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"8px 10px 6px", borderRadius:14, minWidth:50, cursor:"pointer",
                background: selOff===i ? "rgba(120,145,166,.12)" : "transparent", border:"1px solid "+(selOff===i ? "rgba(150,170,185,.55)" : "transparent") }}>
              <span style={{ fontFamily:T.sans, fontSize:11, fontWeight:500, color:selOff===i?"#A9BAC7":T.textMute }}>{i===0?"Hoy":d.wd}</span>
              <span style={{ fontFamily:T.sans, fontSize:20, fontWeight:600, color:T.text }}>{d.dd}</span>
              <div style={{ width:5, height:5, borderRadius:"50%", background:selOff===i?T.accent:"transparent" }} />
            </button>
          ))}
        </div>
      </div>
      <div style={{ ...glassPanel(T,14), padding:"12px 14px", display:"flex", alignItems:"center", gap:10, marginBottom:10, flexWrap:"wrap" }}>
        <div style={{ flex:1, fontFamily:T.sans, fontSize:11, color:T.textMute, minWidth:160 }}>
          <span style={{ color:"#1F8A5B", fontWeight:600 }}>{availCount}</span> disponibles · <span style={{ color:T.textFaint }}>{blockedCount}</span> bloqueadas · <span style={{ color:"#B8860B", fontWeight:600 }}>{occupied.size}</span> con cita
        </div>
        <button onClick={openAll}  style={{ background:"#1F8A5B18", border:"1px solid #1F8A5B44", color:"#1F8A5B", borderRadius:8, padding:"8px 12px", fontFamily:T.sans, fontSize:10.5, cursor:"pointer" }}>Abrir todo</button>
        <button onClick={blockAll} style={{ background:"#C0285A18", border:"1px solid #C0285A44", color:"#C0285A", borderRadius:8, padding:"8px 12px", fontFamily:T.sans, fontSize:10.5, cursor:"pointer" }}>Bloquear todo</button>
      </div>
      <div style={{ display:"flex", gap:14, padding:"2px 2px 10px" }}>
        {[["#1F8A5B","Disponible"],["#C0285A","Bloqueado"],["#B8860B","Con cita"]].map(([c,l])=>(
          <div key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:9, height:9, borderRadius:3, background:c }} />
            <span style={{ fontFamily:T.sans, fontSize:10, color:T.textMute }}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7 }}>
        {HALF_HOURS.map(slot=>{
          const isOcc = occupied.has(slot);
          const isAvail = avail.includes(slot);
          return (
            <button key={slot} onClick={()=>toggle(slot)} disabled={isOcc}
              style={{ padding:"11px 4px", borderRadius:9, border:"1px solid",
                fontFamily:T.sans, fontSize:12.5, fontWeight:500,
                cursor:isOcc?"default":"pointer",
                background:isOcc?"#B8860B22":isAvail?"#1F8A5B1e":(T.dark?"rgba(255,255,255,.05)":"rgba(255,255,255,.6)"),
                borderColor:isOcc?"#B8860B55":isAvail?"#1F8A5B55":(T.dark?"rgba(255,255,255,.12)":T.lineSoft),
                color:isOcc?"#B8860B":isAvail?"#1F8A5B":T.textFaint }}>
              {slot}
              {isOcc&&<div style={{ fontFamily:T.sans, fontSize:8, marginTop:1, opacity:.7 }}>cita</div>}
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
// Procedimiento abreviado: códigos fijos para los más frecuentes (pedido original del usuario);
// cualquier otro procedimiento cae a la inicial (no el nombre completo) — esta abreviación se
// usa SIEMPRE en tarjetas de una sola línea (Home/Agenda), donde el nombre completo desbordaría.
function abbrevProcM(proc) {
  const p = (proc || "").toLowerCase();
  if (p.includes("botox") && p.includes("3 zona")) return "B3Z";
  if (p.includes("botox") && (p.includes("full face") || p.includes("8 zona"))) return "BFF";
  if (p.includes("rinomodela")) return "R";
  if (p.includes("sculptra")) return "S";
  if (p.includes("evaluaci")) return "EV";
  if (p.includes("quemador")) return "Q";
  if (!proc) return "—";
  return proc.trim().charAt(0).toUpperCase();
}

function AgendaTab({ T, appts, onOpenAppt, goTab, showAnuladas, setShowAnuladas }) {
  const today = todayISO();
  const [selDay, setSelDay] = useState(today);
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
        background:"rgba(255,255,255,.035)", border:"1px solid rgba(255,255,255,.08)", borderRadius:10,
        padding:"0 0 0 12px", overflow:"hidden", boxSizing:"border-box", opacity:isAnulada?.55:1
      }}>
        {/* Plana (pedido): mismo diseño que la página principal — hora | nombre … abreviación del
            procedimiento al borde derecho, punto de color al inicio = estado (antes barra lateral 3px). */}
        <span aria-hidden="true" title={st.label} style={{ width:8, height:8, borderRadius:"50%", background:st.color, flexShrink:0, boxShadow:"0 0 0 2.5px color-mix(in srgb, "+st.color+" 24%, transparent)" }} />
        <span style={{ flexShrink:0, fontFamily:FRAUNCES, fontSize:11.5, fontWeight:500, color:T.text }}>{a.time}</span>
        <span style={{ flex:1, minWidth:0, fontFamily:T.sans, fontSize:12.5, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", textDecoration:isAnulada?"line-through":"none" }}>{abbrevNameM(a.name)}</span>
        <span style={{ flexShrink:0, marginRight:10, fontFamily:T.sans, fontSize:9, fontWeight:700, color:st.color, background:"color-mix(in srgb, "+st.color+" 20%, transparent)", borderRadius:5, padding:"2px 6px" }}>{abbrevProcM(a.proc)}</span>
      </button>
    );
  }

  // Segmentado Día/Mes (el filtro de canceladas ahora vive en el icono del header, como la referencia).
  // Pedido: más chico, para dejar más protagonismo a la tira de días y las citas.
  const toggleRow = (
    <div style={{ display:"flex", gap:5, padding:"8px 14px 6px", flexShrink:0, ...glassChip(T), border:"none", background:"transparent" }}>
      <div style={{ display:"flex", flex:1, gap:3, padding:3, borderRadius:11, ...glassChip(T) }}>
        {[["dia","Día"],["mes","Mes"]].map(([k,l])=>(
          // Pedido: al tocar "Día" siempre vuelve al día de HOY automáticamente (no se queda en
          // el último día que se haya elegido).
          <button key={k} onClick={()=>{ setView(k); if (k==="dia") setSelDay(today); }} style={{ flex:1, fontFamily:T.sans, fontSize:12, fontWeight:view===k?600:500, padding:"6px", borderRadius:8, cursor:"pointer",
            ...(view===k
              ? { background:"linear-gradient(180deg, rgba(88,142,246,.28), rgba(48,104,214,.22))", color:"#fff", border:"1px solid rgba(150,170,185,.45)", boxShadow:"inset 0 1px 0 rgba(255,255,255,.22), 0 6px 16px -8px rgba(40,90,200,.6)" }
              : { background:"transparent", color:T.textMute, border:"1px solid transparent" }) }}>{l}</button>
        ))}
      </div>
      {showAnuladas && view==="dia" && <span style={{ alignSelf:"center", fontFamily:T.sans, fontSize:10.5, color:"#F1657F", whiteSpace:"nowrap" }}>Canceladas ({anuladasCount})</span>}
    </div>
  );

  // FAB con el mismo nivel de "Liquid Glass" que la pantalla principal (pedido): brillo superior +
  // blur/saturación más altos, no solo un tinte plano. zIndex alto: siempre queda SOBRE la lista de
  // citas que scrollea detrás — nunca la tapa a ella, pero ella tampoco lo tapa a él.
  const fab = (
    <button onClick={()=>goTab("nueva")} title="Nueva cita" aria-label="Nueva cita"
      style={{ position:"absolute", right:16, bottom:16+"px", width:56, height:56, borderRadius:"50%",
        background:"linear-gradient(180deg, rgba(120,145,166,.42), rgba(120,145,166,.24) 45%, rgba(120,145,166,.3) 100%)",
        border:"1px solid rgba(160,180,195,.5)", color:"#EAF2FF", cursor:"pointer",
        backdropFilter:"blur(28px) saturate(1.6)", WebkitBackdropFilter:"blur(28px) saturate(1.6)",
        boxShadow:"0 12px 28px -10px rgba(10,25,55,.6), inset 0 1px 0 rgba(255,255,255,.4)",
        display:"flex", alignItems:"center", justifyContent:"center", zIndex:6 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
    </button>
  );

  if (view === "mes") {
    const WD = ["L","M","M","J","V","S","D"];
    return (
      <div style={{ position:"relative", display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
        {toggleRow}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 16px 8px", flexShrink:0 }}>
          <button onClick={()=>setMonthCur(c=>{ const m=c.m-1; return m<0?{y:c.y-1,m:11}:{y:c.y,m}; })} style={{ width:36, height:36, borderRadius:999, ...glassChip(T), color:T.text, cursor:"pointer" }}>‹</button>
          <div style={{ fontFamily:T.serif, fontSize:19, fontWeight:600, color:T.text }}>{MESES_LARGOS[monthCur.m]} {monthCur.y}</div>
          <button onClick={()=>setMonthCur(c=>{ const m=c.m+1; return m>11?{y:c.y+1,m:0}:{y:c.y,m}; })} style={{ width:36, height:36, borderRadius:999, ...glassChip(T), color:T.text, cursor:"pointer" }}>›</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", padding:"0 10px 4px", flexShrink:0 }}>
          {WD.map((w,i)=><div key={i} style={{ textAlign:"center", fontFamily:T.sans, fontSize:10, letterSpacing:".08em", color:T.textFaint }}>{w}</div>)}
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"0 10px 16px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
            {monthGrid.map(c=>{
              const n = apptCountByDate[c.iso] || 0;
              const isToday = c.iso === today;
              return (
                <button key={c.iso} onClick={()=>{ setSelDay(c.iso); setView("dia"); }} style={{ aspectRatio:"1/1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, borderRadius:10, cursor:"pointer",
                  background: isToday ? T.accent+"22" : (n?glassChip(T).background:"transparent"),
                  border:"1px solid "+(isToday?T.accent:(n?(T.dark?"rgba(255,255,255,.12)":T.line):"transparent")),
                  opacity: c.inMonth?1:.32 }}>
                  <span style={{ fontFamily:T.sans, fontSize:14, fontWeight:isToday?700:500, color:isToday?T.accent:T.text }}>{c.dd}</span>
                  {n>0 && <span style={{ display:"flex", gap:2 }}>{Array.from({length:Math.min(n,3)}).map((_,i)=><span key={i} style={{ width:5, height:5, borderRadius:"50%", background:T.accent }} />)}</span>}
                </button>
              );
            })}
          </div>
        </div>
        {fab}
      </div>
    );
  }

  return (
    <div style={{ position:"relative", display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      {toggleRow}
      {/* Tira de días continua (pedido): scroll horizontal nativo y directo, sin paginar por semana.
          Esta zona y los botones de arriba quedan FIJOS — solo la lista de citas más abajo scrollea. */}
      <div ref={stripRef} style={{ overflowX:"auto", flexShrink:0, WebkitOverflowScrolling:"touch" }}>
        <div style={{ display:"flex", padding:"8px 10px 4px", minWidth:"max-content", gap:2 }}>
          {stripDays.map(d => {
            const isSel = d.iso === selDay;
            return (
              <button key={d.iso} ref={el=>{ dayBtnRefs.current[d.iso]=el; }} onClick={()=>setSelDay(d.iso)}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:1, padding:"6px 8px 5px", borderRadius:12, minWidth:38, cursor:"pointer",
                  background: isSel ? "rgba(120,145,166,.12)" : "transparent", border:"1px solid "+(isSel ? "rgba(150,170,185,.55)" : "transparent") }}>
                <span style={{ fontFamily:T.sans, fontSize:9.5, fontWeight:500, color: isSel ? "#A9BAC7" : T.textMute }}>{d.isToday ? "Hoy" : d.wd}</span>
                <span style={{ fontFamily:T.sans, fontSize:17, fontWeight: d.isToday ? "700" : "400", color: T.text, lineHeight:1.15 }}>{d.dd}</span>
                <div style={{ width:4, height:4, borderRadius:"50%", background: isSel ? T.accent : "transparent" }} />
              </button>
            );
          })}
        </div>
      </div>
      {!showAnuladas && selActive.length>0 && <div style={{ padding:"12px 16px 8px", flexShrink:0 }}><DaySummary T={T} c={cSel} p={pSel} na={naSel} bars /></div>}
      <div ref={dayRef} style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch" }}>
        <div style={{ position:"relative", marginLeft:48, paddingRight:12 }}>
          {CAL_HOURS.map(h => (
            <div key={h} style={{ position:"absolute", left:-48, right:0, top: (h - CAL_START) * CAL_PX_HOUR, display:"flex", alignItems:"flex-start", zIndex:1 }}>
              <span style={{ fontFamily:T.sans, fontSize:10, color:T.textFaint, width:42, textAlign:"right", paddingRight:8, lineHeight:1, transform:"translateY(-5px)", flexShrink:0 }}>{h<10?"0"+h:""+h}:00</span>
              <div style={{ flex:1, borderTop:"1px solid "+(T.dark?"rgba(255,255,255,.1)":T.lineSoft), marginTop:0 }} />
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
      {fab}
    </div>
  );
}

/* ═══════════ Nueva cita — asistente de 3 pasos (Paciente → Detalles → Confirmar) ═══════════ */
function NuevaWizard({ T, appts, patients, addAppt, addPatient, onDone }) {
  const [step, setStep] = useState(1);
  // Paso 1 — paciente
  const [tipo, setTipo] = useState("existente"); // existente | nuevo
  const [q, setQ] = useState("");
  const [pid, setPid] = useState("");
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const PHONE_PFX = "+56 9 ";
  const [phone, setPhone] = useState(PHONE_PFX);
  function onPhone(v) { const digits = v.startsWith(PHONE_PFX) ? v.slice(PHONE_PFX.length).replace(/\D/g, "") : v.replace(/\D/g, "").replace(/^569?/, ""); setPhone(PHONE_PFX + digits.slice(0, 8)); }
  const phoneOk = phone.replace(/\D/g, "").length >= 11;
  // RUT OBLIGATORIO para paciente nuevo (pedido): se formatea al escribir y se valida con módulo 11
  // (mismos helpers que el portal, jcm_shared.js). Se autoriza sin RUT solo si el helper no cargó.
  function onRut(v) { setRut(window.jcmFmtRut ? window.jcmFmtRut(v) : v); }
  const rutOk = window.jcmValidRut ? window.jcmValidRut(rut) : (rut||"").replace(/[^0-9kK]/g,"").length >= 2;
  const [email, setEmail] = useState("");
  // Paso 2 — detalles
  const procs = procList();
  const [fecha, setFecha] = useState(todayISO());
  const [time,  setTime]  = useState("10:00");
  const [proc,    setProc]    = useState(procs[0]||"Evaluación general");
  const [dur,     setDur]     = useState("30 minutos");
  const [comment, setComment] = useState("");
  // Paso 3
  const [notifyWa, setNotifyWa] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (window.JCDATA && window.JCDATA.procMin) setDur(window.JCDATA.procMin(proc) + " minutos"); }, [proc]);

  const selectedPatient = patients.find(p=>p.id===pid) || null;
  const ql = q.trim().toLowerCase();
  const results = ql.length>=2 ? patients.filter(p => (p.name||"").toLowerCase().includes(ql) || (p.rut||"").toLowerCase().includes(ql) || (p.phone||"").includes(ql)).slice(0,6) : [];

  const finalName = tipo==="existente" ? (selectedPatient?selectedPatient.name:"") : name;
  const finalPhone = tipo==="existente" ? (selectedPatient?selectedPatient.phone:"") : phone;
  const finalRut = tipo==="existente" ? (selectedPatient?selectedPatient.rut:"") : rut;
  const finalEmail = tipo==="existente" ? (selectedPatient?selectedPatient.email:"") : email;

  const step1Ok = tipo==="existente" ? !!selectedPatient : (name.trim() && rutOk && phoneOk);
  const step2Ok = !!proc && !!fecha && !!time;

  const slotsMap = (window.DB && window.DB.get('horarios_dates')) || {};
  const weeklyDef = (() => {
    try { var h = window.DB && window.DB.get('horarios_v1'); var wd = new Date(fecha + 'T12:00:00').getDay(); if (h && h[wd] && h[wd].open !== false) return h[wd].slots || HALF_HOURS.slice(); if (h && h[wd] && h[wd].open === false) return []; } catch(e) {}
    return HALF_HOURS.slice();
  })();
  const avail = slotsMap[fecha]!=null ? slotsMap[fecha] : weeklyDef;
  const occupied = new Set(appts.filter(a=>a.fecha===fecha && a.status!=="anulada").map(a=>a.time));
  const freeSlots = avail.filter(s=>!occupied.has(s));

  function confirm() {
    let patId = pid;
    if (tipo === "nuevo") {
      const np = addPatient({ name: name.trim(), rut: rut.trim(), phone: phone.trim(), email: email.trim(), age: 0 });
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
        const msg = jcmCitaConfirmMsgM(finalName, fecha, time, proc, clinPro, clinNombre, clinDir);
        setTimeout(()=>window.open("https://wa.me/56"+waP.replace(/^(56|0)/,"")+"?text="+encodeURIComponent(msg), "_blank", "noopener"), 300);
      }
    }
    setSaved(true);
    setTimeout(()=>{ setSaved(false); onDone(); }, 900);
  }

  const inp = { width:"100%", fontFamily:T.sans, fontSize:15, padding:"15px 15px", minHeight:54, borderRadius:14, border:"1px solid rgba(255,255,255,.22)", background:"linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.03)), rgba(16,41,78,.42)", backdropFilter:"blur(24px) saturate(1.5)", WebkitBackdropFilter:"blur(24px) saturate(1.5)", color:T.text, outline:"none", boxSizing:"border-box" };
  const lbl = { display:"block", fontFamily:T.sans, fontSize:13, fontWeight:500, color:T.text, marginBottom:8 };
  const STEPS = ["Paciente","Detalles","Confirmar"];

  return (
    <div style={{ padding:"14px 16px 90px", display:"flex", flexDirection:"column", gap:16 }}>
      {/* El título "Nueva cita" ya vive en el header de la pestaña; no se duplica aquí. */}
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        {STEPS.map((s,i) => (
          <React.Fragment key={s}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
              <div style={{ width:26, height:26, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:12, fontWeight:700,
                background: step===i+1 ? T.accent : (step>i+1 ? T.accent+"33" : (T.dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.06)")),
                color: step===i+1 ? T.onAccent : (step>i+1 ? T.accent : T.textFaint) }}>{step>i+1 ? "✓" : i+1}</div>
              <span style={{ fontFamily:T.sans, fontSize:9, color: step>=i+1 ? T.text : T.textFaint, whiteSpace:"nowrap" }}>{s}</span>
            </div>
            {i<STEPS.length-1 && <div style={{ flex:1, height:1, background: step>i+1 ? T.accent : (T.dark?"rgba(255,255,255,.14)":T.line), marginBottom:16 }} />}
          </React.Fragment>
        ))}
      </div>

      {step===1 && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"flex", gap:8 }}>
            {[["existente","Paciente existente"],["nuevo","Paciente nuevo"]].map(([k,l])=>(
              <button key={k} onClick={()=>setTipo(k)} style={{ flex:1, fontFamily:T.sans, fontSize:12, fontWeight:tipo===k?700:500, padding:"11px 6px", borderRadius:9, cursor:"pointer",
                border:"1px solid "+(tipo===k?T.accent:(T.dark?"rgba(255,255,255,.14)":T.line)), background:tipo===k?T.accent+"1e":"transparent", color:tipo===k?T.accent:T.textMute }}>{l}</button>
            ))}
          </div>
          {tipo==="existente" ? (
            <div>
              <label style={lbl}>Buscar paciente</label>
              <input value={q} onChange={e=>{ setQ(e.target.value); setPid(""); }} placeholder="Nombre, RUT o teléfono…" style={inp} />
              {selectedPatient && (
                <div style={{ marginTop:9, ...glassPanel(T,10), padding:"11px 13px", display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:T.sans, fontSize:13.5, fontWeight:600, color:T.text }}>{selectedPatient.name}</div>
                    <div style={{ fontFamily:T.sans, fontSize:11, color:T.textMute }}>{[selectedPatient.rut, selectedPatient.phone].filter(Boolean).join(" · ")}</div>
                  </div>
                  <button onClick={()=>{ setPid(""); setQ(""); }} style={{ background:"none", border:"none", color:T.textFaint, cursor:"pointer" }}>✕</button>
                </div>
              )}
              {!selectedPatient && results.length>0 && (
                <div style={{ marginTop:9, display:"flex", flexDirection:"column", gap:6 }}>
                  {results.map(p => (
                    <button key={p.id} onClick={()=>{ setPid(p.id); setQ(p.name); }} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", ...glassChip(T), borderRadius:9, padding:"10px 12px", cursor:"pointer" }}>
                      <div style={{ width:30, height:30, borderRadius:"50%", background:"rgba(120,145,166,.16)", border:"1px solid rgba(130,150,170,.3)", color:"#A9BAC7", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:11, fontWeight:700, flexShrink:0 }}>{(p.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</div>
                      <div style={{ minWidth:0 }}>
                        <div style={{ fontFamily:T.sans, fontSize:13, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                        <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textMute }}>{[p.rut, p.phone].filter(Boolean).join(" · ")}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {!selectedPatient && ql.length>=2 && results.length===0 && (
                <div style={{ marginTop:9, fontFamily:T.sans, fontSize:12, color:T.textFaint }}>Sin resultados. Prueba con "Paciente nuevo".</div>
              )}
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div><label style={lbl}>Nombre completo</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre y apellido" style={inp} /></div>
              <div><label style={lbl}>RUT</label><input value={rut} onChange={e=>onRut(e.target.value)} inputMode="numeric" placeholder="12.345.678-9" style={{...inp, borderColor: (rutOk || !rut) ? undefined : "#C0285A88"}} /></div>
              {rut && !rutOk && <div style={{ fontFamily:T.sans, fontSize:11, color:"#FF8FA3" }}>Revisa el RUT: el dígito verificador no coincide.</div>}
              <div><label style={lbl}>Teléfono</label><input type="tel" inputMode="numeric" value={phone} onChange={e=>onPhone(e.target.value)} style={{...inp, borderColor: phoneOk?undefined:"#C0285A88"}} /></div>
              <div><label style={lbl}>Correo (opcional)</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="correo@ejemplo.com" style={inp} /></div>
              {!phoneOk && phone.length>PHONE_PFX.length && <div style={{ fontFamily:T.sans, fontSize:11, color:"#FF8FA3" }}>Ingresa los 8 dígitos del teléfono.</div>}
            </div>
          )}
          <button onClick={()=>step1Ok && setStep(2)} disabled={!step1Ok} style={{ background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:15, fontWeight:600, border:"none", borderRadius:12, padding:"16px", cursor:step1Ok?"pointer":"not-allowed", opacity:step1Ok?1:.5 }}>Continuar</button>
        </div>
      )}

      {step===2 && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div><label style={lbl}>Procedimiento</label>
            <select value={proc} onChange={e=>setProc(e.target.value)} style={{...inp,appearance:"none"}}>
              <option>Evaluación general</option>
              {procs.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div><label style={lbl}>Fecha</label><input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={inp} /></div>
          <div>
            <label style={lbl}>Hora</label>
            <select value={time} onChange={e=>setTime(e.target.value)} style={{...inp,appearance:"none"}}>
              {(() => { const base = freeSlots.length ? freeSlots : HALF_HOURS; const opts = base.indexOf(time)>=0 ? base : [time, ...base]; return opts.map(s=><option key={s} value={s}>{s} hrs</option>); })()}
            </select>
            {freeSlots.length===0&&<div style={{ fontFamily:T.sans, fontSize:11, color:"#FF8FA3", marginTop:5 }}>No hay horas marcadas como disponibles para este día.</div>}
          </div>
          <div><label style={lbl}>Duración</label>
            <select value={dur} onChange={e=>setDur(e.target.value)} style={{...inp,appearance:"none"}}>
              {["15 minutos","30 minutos","45 minutos","60 minutos","90 minutos"].map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <div><label style={lbl}>Comentario (opcional)</label>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Ej. Control, seguimiento, evaluación…" rows={2} style={{...inp, resize:"none"}} />
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setStep(1)} style={{ flex:1, background:"transparent", border:"1px solid "+(T.dark?"rgba(255,255,255,.16)":T.line), color:T.textMute, fontFamily:T.sans, fontSize:12, borderRadius:10, padding:"15px", cursor:"pointer" }}>Atrás</button>
            <button onClick={()=>step2Ok && setStep(3)} disabled={!step2Ok} style={{ flex:2, background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:15, fontWeight:600, border:"none", borderRadius:12, padding:"16px", cursor:step2Ok?"pointer":"not-allowed", opacity:step2Ok?1:.5 }}>Continuar</button>
          </div>
        </div>
      )}

      {step===3 && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ ...glassPanel(T,12), padding:"14px 16px", display:"flex", flexDirection:"column", gap:7 }}>
            <div style={{ fontFamily:T.serif, fontSize:17, color:T.text }}>{finalName}</div>
            <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>{[finalRut, finalPhone].filter(Boolean).join(" · ")}</div>
            <div style={{ height:1, background:T.dark?"rgba(255,255,255,.12)":T.lineSoft, margin:"3px 0" }} />
            <div style={{ fontFamily:T.sans, fontSize:13, color:T.text }}>{proc}</div>
            <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>{fecha} · {time} hrs · {dur}</div>
            {comment && <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textMute, fontStyle:"italic" }}>{comment}</div>}
          </div>
          <label style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", ...glassChip(T), borderRadius:9, padding:"11px 13px" }}>
            <input type="checkbox" checked={notifyWa} onChange={e=>setNotifyWa(e.target.checked)} />
            <span style={{ fontFamily:T.sans, fontSize:12.5, color:T.text }}>Notificar al paciente por WhatsApp</span>
          </label>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setStep(2)} style={{ flex:1, background:"transparent", border:"1px solid "+(T.dark?"rgba(255,255,255,.16)":T.line), color:T.textMute, fontFamily:T.sans, fontSize:12, borderRadius:10, padding:"15px", cursor:"pointer" }}>Atrás</button>
            <button onClick={confirm} disabled={saved} style={{ flex:2, background:saved?"#1F8A5B":T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:15, fontWeight:600, border:"none", borderRadius:12, padding:"16px", cursor:"pointer", transition:"background .3s" }}>{saved?"✓ Cita guardada":"Confirmar cita"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════ Overlay: Pacientes ═══════════ */
function PacientesOverlay({ T, patients, appts, onBack, onOpenFicha, addPatient }) {
  const [q, setQ] = useState("");
  const [nuevo, setNuevo] = useState(false);
  const [f, setF] = useState({ name:"", rut:"", phone:"+56 9 ", email:"" });
  const ql = q.trim().toLowerCase();
  const list = (ql ? patients.filter(p => (p.name||"").toLowerCase().includes(ql) || (p.rut||"").toLowerCase().includes(ql) || (p.phone||"").includes(ql)) : patients)
    .slice().sort((a,b)=>(a.name||"").localeCompare(b.name||""));
  const inp = { width:"100%", fontFamily:T.sans, fontSize:14, padding:"11px 13px", borderRadius:9, border:"1px solid "+(T.dark?"rgba(255,255,255,.16)":T.line), background:T.dark?"rgba(255,255,255,.06)":"#fff", color:T.text, outline:"none", boxSizing:"border-box" };

  function saveNuevo() {
    if (!f.name.trim()) return;
    const np = addPatient({ name:f.name.trim(), rut:f.rut.trim(), phone:f.phone.trim(), email:f.email.trim(), age:0 });
    setNuevo(false); setF({ name:"", rut:"", phone:"+56 9 ", email:"" });
    onOpenFicha(np.id);
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
          {list.length===0 && <div style={{ textAlign:"center", padding:"30px 0", fontFamily:T.sans, fontSize:12.5, color:T.textFaint }}>Sin pacientes{ql?" que coincidan":""}.</div>}
          {list.map((p,i) => {
            const nextA = appts.filter(a=>(a.patId===p.id || a.name===p.name) && a.status!=="anulada" && (a.fecha||offToISO(a.day||0))>=todayISO()).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""))[0];
            return (
              <button key={p.id} onClick={()=>onOpenFicha(p.id)} style={{ display:"flex", alignItems:"center", gap:12, width:"100%", textAlign:"left", background:"none", border:"none", borderBottom: i===list.length-1?"none":"1px solid rgba(255,255,255,.08)", padding:"11px 14px", cursor:"pointer" }}>
                <div style={{ width:36, height:36, borderRadius:"50%", flexShrink:0, background:"rgba(120,145,166,.16)", color:"#A9BAC7", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:12.5, fontWeight:600 }}>{(p.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:T.sans, fontSize:15, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                  <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginTop:1 }}>{[p.rut,p.phone].filter(Boolean).join(" · ")}</div>
                </div>
                {nextA && <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:11.5, color:"#A9BAC7" }}>{nextA.fecha===todayISO()?"Hoy "+nextA.time:(()=>{ const d=new Date((nextA.fecha||"")+"T00:00:00"); return isNaN(d.getTime())?nextA.fecha:d.getDate()+" "+MESES[d.getMonth()].toLowerCase(); })()}</span>}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0 }}><path d="M9 18l6-6-6-6"/></svg>
              </button>
            );
          })}
        </div>
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
  if (!p) return <OverlayShell T={T} title="Ficha" onBack={onBack}><div style={{ padding:30, textAlign:"center", fontFamily:T.sans, color:T.textFaint }}>Paciente no encontrado.</div></OverlayShell>;

  const mine = appts.filter(a => a.patId===p.id || a.name===p.name);
  const today = todayISO();
  const proximas = mine.filter(a=>a.status!=="anulada" && (a.fecha||offToISO(a.day||0))>=today).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""));
  const pasadas = mine.filter(a=>(a.fecha||offToISO(a.day||0))<today || a.status==="atendida").sort((a,b)=>(b.fecha||"").localeCompare(a.fecha||""));
  const inp = { width:"100%", fontFamily:T.sans, fontSize:14, padding:"11px 13px", borderRadius:9, border:"1px solid "+(T.dark?"rgba(255,255,255,.16)":T.line), background:T.dark?"rgba(255,255,255,.06)":"#fff", color:T.text, outline:"none", boxSizing:"border-box" };

  function save() { updatePatient(p.id, { phone:f.phone.trim(), email:f.email.trim(), notas:f.notas.trim() }); setEdit(false); }

  return (
    <OverlayShell T={T} title="Ficha del paciente" onBack={onBack}>
      <div style={{ padding:"14px 16px 40px", display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:13 }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(120,145,166,.16)", border:"1px solid rgba(130,150,170,.3)", color:"#A9BAC7", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:19, fontWeight:700, flexShrink:0 }}>{(p.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</div>
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
          {proximas.length===0 && <div style={{ fontFamily:T.sans, fontSize:12, color:T.textFaint }}>Sin próximas citas.</div>}
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
          {pasadas.length===0 && <div style={{ fontFamily:T.sans, fontSize:12, color:T.textFaint }}>Sin atenciones registradas.</div>}
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {pasadas.slice(0,20).map(a => (
              <div key={a.id} style={{ ...glassChip(T), borderRadius:9, padding:"9px 12px", opacity:a.status==="anulada"?.55:1 }}>
                <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.text }}>{a.fecha} · {a.proc||"—"}</div>
                <div style={{ fontFamily:T.sans, fontSize:10.5, color:T.textMute }}>{apptStateM(a,T).label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OverlayShell>
  );
}

/* ═══════════ Overlay: Reportes (solo datos reales de citas — este bundle no tiene acceso a caja) ═══════════ */
function ReportesOverlay({ T, appts, onBack }) {
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
  const porProc = {};
  monthAppts.forEach(a => { if (a.status==="anulada") return; const k = a.proc||"Sin especificar"; porProc[k] = (porProc[k]||0)+1; });
  const topProc = Object.keys(porProc).map(k=>({name:k,n:porProc[k]})).sort((a,b)=>b.n-a.n).slice(0,5);
  const maxProc = topProc[0] ? topProc[0].n : 1;

  // Fila con ícono en círculo de color + valor coloreado (referencia).
  const RIC = {
    cal:  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    check:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>,
    user: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a6 6 0 0 1 12 0v1"/></svg>,
    xmark:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg>,
    pct:  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="12" r="9"/><path d="M8 15l8-6"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/></svg>
  };
  const row = (icon, iconColor, label, val, valColor, last) => (
    <div style={{ display:"flex", alignItems:"center", gap:13, padding:"12px 0", borderBottom: last ? "none" : "1px solid rgba(255,255,255,.07)" }}>
      <div style={{ width:38, height:38, borderRadius:11, flexShrink:0, background:iconColor+"22", color:iconColor, display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
      <span style={{ flex:1, fontFamily:T.sans, fontSize:15, color:T.text }}>{label}</span>
      <span style={{ fontFamily:T.sans, fontSize:17, fontWeight:700, color:valColor||T.text }}>{val}</span>
    </div>
  );

  return (
    <OverlayShell T={T} title="Reportes" onBack={onBack}>
      <div style={{ padding:"14px 16px 40px", display:"flex", flexDirection:"column", gap:16 }}>
        <div style={{ ...glassPanel(T,20), padding:"6px 16px 8px" }}>
          <div style={{ fontFamily:T.sans, fontSize:11, letterSpacing:".12em", textTransform:"uppercase", color:T.accent, fontWeight:600, padding:"14px 0 6px" }}>Esta semana</div>
          {row(RIC.cal,   "#7FA8E8", "Citas totales", weekAppts.filter(a=>a.status!=="anulada").length)}
          {row(RIC.check, "#46D27A", "Confirmadas", countBy(weekAppts, a=>a.status==="confirmada"||a.status==="atendida"), "#46D27A")}
          {row(RIC.user,  "#A9BAC7", "Atendidas", countBy(weekAppts, a=>a.status==="atendida"||a.attended), "#A9BAC7")}
          {row(RIC.user,  "#FF6B7D", "No asistió", countBy(weekAppts, a=>a.status==="no_asistio"), "#FF6B7D")}
          {row(RIC.xmark, "#9AA6B2", "Canceladas", countBy(weekAppts, a=>a.status==="anulada"))}
          {row(RIC.pct,   noShowRate>15?"#FF6B7D":"#46D27A", "Tasa de inasistencia", noShowRate+"%", noShowRate>15?"#FF6B7D":"#46D27A", true)}
        </div>
        <div style={{ ...glassPanel(T,20), padding:"6px 16px 10px" }}>
          <div style={{ fontFamily:T.sans, fontSize:11, letterSpacing:".12em", textTransform:"uppercase", color:T.accent, fontWeight:600, padding:"14px 0 8px" }}>Procedimientos del mes</div>
          {topProc.length===0 && <div style={{ fontFamily:T.sans, fontSize:13, color:T.textMute, padding:"6px 0 12px" }}>Sin datos este mes.</div>}
          {topProc.map((t,i) => (
            <div key={t.name} style={{ display:"flex", alignItems:"center", gap:13, padding:"11px 0", borderBottom: i===topProc.length-1?"none":"1px solid rgba(255,255,255,.06)" }}>
              {/* Ranking: número de posición (antes un icono de barras idéntico en todas las filas, que no aportaba). */}
              <div style={{ width:30, height:30, borderRadius:9, flexShrink:0, background:"rgba(120,145,166,.14)", color:"#A9BAC7", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:13, fontWeight:700 }}>{i+1}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:T.sans, fontSize:15, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t.name}</span>
                  <span style={{ fontFamily:T.sans, fontSize:16, fontWeight:700, color:T.text, marginLeft:8, flexShrink:0 }}>{t.n}</span>
                </div>
                <div style={{ height:5, borderRadius:999, background:"rgba(255,255,255,.09)", overflow:"hidden", marginTop:8 }}><div style={{ height:"100%", width:Math.max(6,Math.round(t.n/maxProc*100))+"%", background:"linear-gradient(90deg,#7891A6,#A9BAC7)", borderRadius:999 }} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OverlayShell>
  );
}

/* ═══════════ Overlay: Más (Pacientes/Reportes/Configuración/Salir) ═══════════ */
function MasTab({ T, openOverlay, onLogout }) {
  const item = (icon, label, onClick, danger) => (
    <button onClick={onClick} style={{ display:"flex", alignItems:"center", gap:15, width:"100%", textAlign:"left", ...glassPanel(T,18), padding:"18px 16px", cursor:"pointer",
      ...(danger ? { background:"linear-gradient(180deg, rgba(255,90,110,.10), rgba(255,70,90,.04) 60%), rgba(40,20,26,.42)" } : {}) }}>
      <div style={{ width:46, height:46, borderRadius:13, flexShrink:0, background:(danger?"rgba(255,90,110,.16)":"rgba(120,145,166,.16)"), border:"1px solid "+(danger?"rgba(255,120,140,.3)":"rgba(130,150,170,.28)"), color:danger?"#FF6B7D":"#A9BAC7", display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
      <span style={{ fontFamily:T.sans, fontSize:18, fontWeight:600, color:danger?"#FF6B7D":T.text, flex:1 }}>{label}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={danger?"rgba(255,107,125,.7)":T.textFaint} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  );
  return (
    <div style={{ padding:"14px 16px 90px", display:"flex", flexDirection:"column", gap:12 }}>
      {item(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, "Pacientes", ()=>openOverlay("pacientes"))}
      {item(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4"/></svg>, "Reportes", ()=>openOverlay("reportes"))}
      <button onClick={()=>{ const b = document.getElementById("jcm-mob-rfab-icon2"); if(b){ b.style.transition="transform .55s"; b.style.transform="rotate(360deg)"; setTimeout(()=>{b.style.transition="";b.style.transform="";},600);} window.dispatchEvent(new CustomEvent("jcsaas:data")); }}
        style={{ display:"flex", alignItems:"center", gap:15, width:"100%", textAlign:"left", ...glassPanel(T,18), padding:"18px 16px", cursor:"pointer" }}>
        <div style={{ width:46, height:46, borderRadius:13, flexShrink:0, background:"rgba(120,145,166,.16)", border:"1px solid rgba(130,150,170,.28)", color:"#A9BAC7", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg id="jcm-mob-rfab-icon2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
        </div>
        <span style={{ fontFamily:T.sans, fontSize:18, fontWeight:600, color:T.text, flex:1 }}>Actualizar datos</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div style={{ height:1, background:T.dark?"rgba(255,255,255,.1)":T.lineSoft, margin:"8px 4px" }} />
      {item(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>, "Cerrar sesión", onLogout, true)}
    </div>
  );
}

/* ─── Contenedor de pantallas superpuestas (Pacientes/Ficha/Reportes) — navegación tipo iOS push ─── */
function OverlayShell({ T, title, onBack, children }) {
  // Mismo fondo (foto desenfocada + velo) que Inicio/Agenda — antes era un navy azulado radial
  // propio de los overlays, que se veía distinto al resto de la app (pedido: unificar).
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, overflow:"hidden", backgroundColor:"#070B12", display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" }}>
      <PhotoBgLayers />
      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", height:"100%" }}>
        {/* Header overlay (referencia): botón atrás en círculo glass + título grande a la izquierda, sin barra. */}
        <div style={{ padding:"calc(14px + env(safe-area-inset-top,0px)) 18px 10px", display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
          <button onClick={onBack} aria-label="Volver" style={{ width:38, height:38, borderRadius:"50%", ...glassChip(T), color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span style={{ fontFamily:T.sans, fontSize:26, fontWeight:700, color:T.text, letterSpacing:"-.01em" }}>{title}</span>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Shell principal ─── */
function MobileShell({ T, D, onLogout }) {
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
    if (tab !== "citas") { setTab("citas"); return; }
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
    function setTitle() {
      let nombre = "Medique";
      try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; if (n && ("" + n).trim()) nombre = ("" + n).trim(); } catch (e) {}
      document.title = nombre + " · Panel Móvil";
    }
    setTitle();
    window.addEventListener("jcsaas:data", setTitle);
    return () => window.removeEventListener("jcsaas:data", setTitle);
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
        const cur = Array.isArray(map[a.fecha]) ? map[a.fecha] : HALF_HOURS.slice();
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
        const cur = Array.isArray(map[appt.fecha]) ? map[appt.fecha] : HALF_HOURS.slice();
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
  // Fecha del día para el subtítulo del header (reemplaza a "Panel móvil").
  const fechaHeader = (() => { const d = new Date(); const s = DOW_FULL[d.getDay()]+", "+d.getDate()+" de "+MESES_LARGOS[d.getMonth()].toLowerCase(); return s.charAt(0).toUpperCase()+s.slice(1); })();
  const hamburger = <button onClick={()=>setDrawer(true)} aria-label="Menú" style={{ width:38, height:38, borderRadius:"50%", border:"none", background:"none", color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginLeft:-6 }}>
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
  </button>;
  const bell = <button onClick={()=>setNotifOpen(true)} aria-label="Pendientes" style={{ position:"relative", width:38, height:38, borderRadius:"50%", border:"none", background:"none", color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginRight:-4 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>
    {bellCount>0 && <span style={{ position:"absolute", top:4, right:6, minWidth:16, height:16, padding:"0 4px", borderRadius:999, background:T.accent, color:"#fff", fontFamily:T.sans, fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", border:"1.5px solid rgba(255,255,255,.35)" }}>{bellCount}</span>}
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
          <span style={{ fontFamily:T.sans, fontSize:11, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>· {fechaHeader}</span>
        </div>
      </div>{bell}</>;
    if (tab==="nueva") return <>
      <button onClick={()=>setTab("citas")} aria-label="Volver" style={{ width:38, height:38, borderRadius:"50%", border:"none", background:"none", color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginLeft:-6 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <span style={{ position:"absolute", left:0, right:0, textAlign:"center", pointerEvents:"none", fontFamily:T.sans, fontSize:20, fontWeight:600, color:T.text }}>Nueva cita</span>
      <button onClick={()=>setTab("citas")} aria-label="Cerrar" style={{ width:38, height:38, borderRadius:"50%", border:"none", background:"none", color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginRight:-6 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    </>;
    // agenda / horarios / mas: hamburguesa + título centrado + acción a la derecha (filtro en Agenda)
    const titleMap = { horarios:"Horarios", agenda:"Agenda", mas:"Más" };
    const rightAction = tab==="agenda"
      ? <button onClick={()=>setAgShowAnuladas(v=>!v)} aria-label="Filtro" style={{ width:38, height:38, borderRadius:"50%", border:"none", background:agShowAnuladas?T.accentSoft:"none", color:agShowAnuladas?T.accent:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginRight:-4 }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg></button>
      : <div style={{ width:34 }} />;
    return <>{hamburger}<span style={{ position:"absolute", left:0, right:0, textAlign:"center", pointerEvents:"none", fontFamily:T.sans, fontSize:20, fontWeight:600, color:T.text }}>{titleMap[tab]}</span>{rightAction}</>;
  };
  // Barra inferior EXACTA de la referencia: Citas · Agenda · Pacientes · Reportes · Más.
  // Pacientes y Reportes abren sus overlays; Nueva cita y Horarios se acceden desde accesos rápidos.
  const tabs = [
    { lbl:"Citas",     on: tab==="citas" && !overlay,     act:()=>{ setOverlay(null); setTab("citas"); },  icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
    { lbl:"Agenda",    on: tab==="agenda" && !overlay,    act:()=>{ setOverlay(null); setTab("agenda"); }, icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg> },
    { lbl:"Pacientes", on: overlay==="pacientes",          act:()=>setOverlay("pacientes"),               icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { lbl:"Reportes",  on: overlay==="reportes",           act:()=>setOverlay("reportes"),                icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4"/></svg> },
    { lbl:"Más",       on: tab==="mas" && !overlay,        act:()=>{ setOverlay(null); setTab("mas"); },    icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg> },
  ];

  // Fondo con BLUR real (pedido): la foto vive en su propia capa aparte y detrás (PhotoBgLayers),
  // y el contenido real va en una capa separada ENCIMA — así el blur nunca toca el texto/los
  // controles, solo la imagen. El MISMO fondo se reutiliza en overlays y menú lateral.
  return (
    <div onTouchStart={onRootTouchStart} onTouchEnd={onRootTouchEnd} style={{ height:"100dvh", overflow:"hidden", position:"relative", backgroundColor:"#070B12", maxWidth:480, margin:"0 auto" }}>
      <PhotoBgLayers />
      <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column" }}>
        {/* Header dinámico por pestaña (referencia): hamburguesa + título/marca + acción a la derecha */}
        {/* Header = TARJETA FLOTANTE redondeada (referencia), no barra recta full-width. Gutter lateral +
            safe-area arriba; la tarjeta glass va redondeada con borde completo. */}
        <div style={{ position:"sticky", top:0, zIndex:10, padding:"calc(8px + env(safe-area-inset-top,0px)) 14px 4px" }}>
          {tab==="citas"
            ? <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:8, ...glassChip(T), borderRadius:18, padding:"8px 12px" }}>{renderHeader()}</div>
            : <div style={{ position:"relative", display:"flex", justifyContent:"space-between", alignItems:"center", gap:8, padding:"6px 4px 6px", minHeight:42 }}>{renderHeader()}</div>}
        </div>

        {/* Content */}
        {/* Pedido: en Agenda y en Inicio la pantalla queda fija (KPI/accesos/encabezados no se mueven)
            — solo scrollea la lista interna (próximas citas / horario). Por eso este contenedor
            exterior NO tiene scroll propio para esas pestañas; cada una maneja su scroll interno. */}
        <div style={{ flex:1, minHeight:0, overflowY: (tab==="agenda"||tab==="citas") ? "hidden" : "auto" }}>
          {tab==="citas"    && <HomeTab     T={T} appts={appts} patients={patients} onOpenAppt={setApptSheet} goTab={setTab} openOverlay={setOverlay} />}
          {tab==="horarios" && <HorariosTab T={T} appts={appts} />}
          {tab==="nueva"    && <NuevaWizard T={T} appts={appts} patients={patients} addAppt={addAppt} addPatient={addPatient} onDone={()=>setTab("citas")} />}
          {tab==="agenda"   && <AgendaTab   T={T} appts={appts} onOpenAppt={setApptSheet} goTab={setTab} showAnuladas={agShowAnuladas} setShowAnuladas={setAgShowAnuladas} />}
          {tab==="mas"      && <MasTab      T={T} openOverlay={setOverlay} onLogout={onLogout} />}
        </div>

        {/* Tab bar — isla flotante redondeada (referencia): pastilla azul con glow en el activo */}
        <div style={{ position:"sticky", bottom:0, padding:"0 12px calc(10px + env(safe-area-inset-bottom,0px))", pointerEvents:"none" }}>
          <div style={{ display:"flex", gap:2, ...glassPanel(T,26), padding:"7px 6px", pointerEvents:"auto", boxShadow:"0 18px 44px -14px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.16)" }}>
            {tabs.map(({lbl,icon,on,act})=>(
              <button key={lbl} onClick={act}
                style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"6px 2px", background:"transparent", border:"none", cursor:"pointer" }}>
                {/* Activo (referencia): el ícono va dentro de un cuadro azul relleno; etiqueta en azul. */}
                <div style={{ width:38, height:32, borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center",
                  background: on ? T.accent : "transparent", color: on ? "#fff" : T.textFaint,
                  boxShadow: on ? "0 6px 14px -6px "+T.accent : "none" }}>{icon}</div>
                <span style={{ fontFamily:T.sans, fontSize:10, fontWeight:on?600:500, color: on ? "#CFE0FF" : T.textFaint }}>{lbl}</span>
                {/* Puntito indicador del activo (referencia) */}
                <div style={{ width:5, height:5, borderRadius:"50%", background: on ? T.accent : "transparent", marginTop:1 }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlays de navegación tipo iOS push */}
      {overlay==="pacientes" && <PacientesOverlay T={T} patients={patients} appts={appts} addPatient={addPatient} onBack={()=>setOverlay(null)} onOpenFicha={(id)=>setOverlay({type:"ficha", id})} />}
      {overlay==="reportes" && <ReportesOverlay T={T} appts={appts} onBack={()=>setOverlay(null)} />}
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
        const label = (txt) => <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".08em", textTransform:"uppercase", color:T.textFaint, padding:"10px 12px 3px" }}>{txt}</div>;
        return (
          <div onMouseDown={e=>{ if(e.target===e.currentTarget) closeN(); }} style={{ position:"fixed", inset:0, zIndex:410, background:"rgba(0,0,0,.55)", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
            <div onClick={e=>e.stopPropagation()} style={{ ...glassPanel(T,24), borderBottomLeftRadius:0, borderBottomRightRadius:0, maxHeight:"78dvh", display:"flex", flexDirection:"column", paddingBottom:"env(safe-area-inset-bottom,10px)", animation:"jcFade .2s ease" }}>
              <div style={{ padding:"14px 16px 11px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
                <div>
                  <div style={{ fontFamily:T.serif, fontSize:18, fontWeight:600, color:T.text }}>Pendientes</div>
                  <div style={{ fontFamily:T.sans, fontSize:11.5, color:T.textMute, marginTop:1 }}>{total===0 ? "Todo al día" : total+" por resolver"}</div>
                </div>
                <button onClick={closeN} aria-label="Cerrar" style={{ width:34, height:34, borderRadius:"50%", ...glassChip(T), color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
              </div>
              <div className="jc-scroll" style={{ flex:1, overflowY:"auto", padding:"6px 8px 14px", display:"flex", flexDirection:"column", gap:1 }}>
                {total===0 && <div style={{ padding:"40px 16px", textAlign:"center", fontFamily:T.sans, fontSize:13, color:T.textFaint }}>Sin pendientes · todo en orden ✓</div>}
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
            <div style={{ width:34, height:34, borderRadius:9, background:(danger?"#F1657F":T.accent)+"22", color:danger?"#F1657F":T.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
            <span style={{ fontFamily:T.sans, fontSize:14, fontWeight:500, color:danger?"#F1657F":T.text }}>{label}</span>
          </button>
        );
        return (
          <div onMouseDown={e=>{ if(e.target===e.currentTarget) setDrawer(false); }} style={{ position:"fixed", inset:0, zIndex:400, background:"rgba(0,0,0,.5)", display:"flex" }}>
            {/* Mismo fondo (foto desenfocada + velo) que el resto del panel — antes era un navy azulado
                radial distinto (pedido: unificar el color con la pantalla principal). */}
            <div onClick={e=>e.stopPropagation()} style={{ position:"relative", overflow:"hidden", width:"78%", maxWidth:320, height:"100%", backgroundColor:"#070B12", display:"flex", flexDirection:"column", boxShadow:"8px 0 40px -10px rgba(0,0,0,.6)", animation:"jcDrawerIn .22s ease" }}>
              <PhotoBgLayers />
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
                <div style={{ height:1, background:"rgba(255,255,255,.1)", margin:"8px 12px" }} />
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
  const TK = window.JCTHEME;
  const T = photoTheme(jcmMobileTheme((TK && (TK.marfil || TK.cielo || TK.editorial)) || {
    bg:"#F5F2EC", surface:"#fff", text:"#1A1A14", textMute:"#5C5A50", textFaint:"#8A8674",
    line:"rgba(20,20,15,.12)", lineSoft:"rgba(20,20,15,.08)", accent:"#54707F", onAccent:"#fff",
    sans:"'Jost',sans-serif", serif:"'Marcellus',serif", navBg:"rgba(245,242,236,.96)"
  }));
  const D = window.JCDATA;
  const authed0 = !!(window.jcmAdminHasPass&&window.jcmAdminHasPass()&&window.jcmAdminHasSession&&window.jcmAdminHasSession());
  const [authed, setAuthed] = useState(authed0);
  if (!authed) return <LoginScreen T={T} onAuth={()=>setAuthed(true)} />;
  return <MobileShell T={T} D={D} onLogout={()=>{ try { window.jcmAdminEndSession && window.jcmAdminEndSession(); } catch(e){} setAuthed(false); }} />;
}

/* ─── Entry point SaaS (multi-clínica): carga data cacheada inmediatamente ─── */
function MobileSaasGate() {
  const TK = window.JCTHEME;
  const T = photoTheme(jcmMobileTheme((TK && (TK.marfil || TK.cielo || TK.editorial)) || {
    bg:"#F5F2EC", surface:"#fff", text:"#1A1A14", textMute:"#5C5A50", textFaint:"#8A8674",
    line:"rgba(20,20,15,.12)", lineSoft:"rgba(20,20,15,.08)", accent:"#54707F", onAccent:"#fff",
    sans:"'Jost',sans-serif", serif:"'Marcellus',serif", navBg:"rgba(245,242,236,.96)"
  }));
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

  if (phase === "app") return <MobileShell T={T} D={D} onLogout={() => window.JCSAAS.logout()} />;

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
      {err && <div style={{ fontFamily:T.sans, fontSize:12, color:"#E0607A", textAlign:"center" }}>{err}</div>}
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
      <input placeholder="Correo de tu clínica" inputMode="email" data-nocap="" value={email} onChange={e=>setEmail(e.target.value)} style={inp} />
      <input type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} style={inp} />
      {err && <div style={{ fontFamily:T.sans, fontSize:12, color:"#E0607A", textAlign:"center" }}>{err}</div>}
      <button onClick={doLogin} disabled={busy} style={{ ...btnSober, opacity:busy?.6:1 }}>{busy?"…":"Entrar"}</button>
      <div style={{ textAlign:"center" }}><button onClick={()=>{ setView("recover"); setErr(""); }} style={linkSober}>¿Olvidaste tu contraseña?</button></div>
    </div>
  </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  (window.JCSAAS && window.JCSAAS.enabled) ? <MobileSaasGate /> : <MobileAdmin />
);
