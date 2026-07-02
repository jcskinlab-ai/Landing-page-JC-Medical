/* ═══════════ JC Medical · Panel Móvil v2 ═══════════ */

// Gate del rediseño (mismo criterio que jc-admin.jsx): reconoce a Los Medique por el ownerEmail
// de la clínica activa o por el correo de la sesión. Este bundle no carga jc-admin.jsx, así que
// se duplica aquí (mismo email) en vez de depender de un archivo que no está presente.
var LOS_MEDIQUE_EMAIL = "makikarenina06@gmail.com";
function isLosMedique() {
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

function minsM(t) { if (!t) return 0; const [h,m] = t.split(":"); return parseInt(h)*60+parseInt(m||0); }
function apptStateM(a, T) {
  if (a.status === "anulada")        return { label: "Anulada",     color: T.textFaint };
  if (a.status === "no_asistio")     return { label: "No asistió",  color: "#C0285A" };
  if (a.attended || a.status === "atendida") return { label: "Atendida", color: "#1A50A3" };
  if (a.status === "confirmada")     return { label: "Confirmada",  color: "#16A34A" };
  if (a.status === "pendiente_pago") return { label: "⏳ Transferencia", color: "#B8860B" };
  return { label: "Pendiente", color: T.accent };
}

// Usa hora local del dispositivo, NO UTC (evita el desfase de zona horaria)
function localISO(d) {
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}
function todayISO() { return localISO(new Date()); }
function offToISO(off) { const d = new Date(); d.setDate(d.getDate()+off); return localISO(d); }
function isoToDayOff(iso) { const d = new Date(iso+"T00:00:00"), t = new Date(); t.setHours(0,0,0,0); return Math.round((d-t)/86400000); }
function procList() { try { return window.JCDATA.catalog.reduce((a,s) => { s.groups.forEach(g => g.items.forEach(it => a.push(it.n))); return a; }, []); } catch(e) { return []; } }
function durOf(a) { return a.dur || (window.JCDATA&&window.JCDATA.procMin ? window.JCDATA.procMin(a.proc)+" min" : "30 min"); }

/* ─── 7 días fijos desde hoy ─── */
function weekDays() {
  return Array.from({length:7}, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()+i);
    const iso = localISO(d);
    const label = i===0 ? "Hoy" : WDS[d.getDay()]+" "+d.getDate()+" "+MESES[d.getMonth()];
    return { iso, label, wd: WDS[d.getDay()], dd: d.getDate(), i };
  });
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
  const inp = { width:"100%", fontFamily:T.sans, fontSize:16, padding:"14px 16px", borderRadius:6, border:"1px solid "+T.line, background:T.surface, color:T.text, outline:"none", boxSizing:"border-box" };
  return (
    <div style={{ minHeight:"100dvh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"30px 24px", background:T.bg }}>
      <img src="/assets/medique-logo.png" alt="Medique" style={{ width:52, height:52, marginBottom:10 }} />
      <div style={{ fontFamily:T.serif, fontSize:30, fontWeight:300, color:T.text, marginBottom:6 }}>Medique</div>
      <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:T.textMute, marginBottom:44 }}>Panel móvil · Acceso privado</div>
      <div style={{ width:"100%", maxWidth:340, display:"flex", flexDirection:"column", gap:12 }}>
        {setup && <input placeholder="Usuario" value={user} onChange={e=>setUser(e.target.value)} style={inp} />}
        <input type="password" placeholder="Contraseña del panel" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} style={inp} />
        {err && <div style={{ fontFamily:T.sans, fontSize:12, color:"#C0285A", textAlign:"center" }}>{err}</div>}
        <button onClick={submit} disabled={busy}
          style={{ background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".14em", textTransform:"uppercase", border:"none", borderRadius:6, padding:"16px", cursor:"pointer", opacity:busy?.6:1, marginTop:4 }}>
          {busy?"…":(setup?"Crear acceso":"Entrar")}
        </button>
      </div>
    </div>
  );
}

/* ─── Shell principal ─── */
function MobileShell({ T, D, onLogout }) {
  const [tab, setTab] = useState("citas");
  const [appts, setAppts] = useState(() => (window.DB&&window.DB.get("appointments"))||[]);

  // Escucha cambios en tiempo real (desde Firestore via liveKv)
  useEffect(() => {
    function reload() { setAppts((window.DB&&window.DB.get("appointments"))||[]); }
    window.addEventListener("jcm:appts", reload);
    window.addEventListener("jcsaas:data", reload);
    return () => { window.removeEventListener("jcm:appts", reload); window.removeEventListener("jcsaas:data", reload); };
  }, []);

  // Título de la pestaña según la clínica (no "JC Medical" para todas). Usa el nombre de la
  // clínica si está configurado; si no, "Medique". Se re-evalúa cuando llegan los datos.
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
    saveAppts(all.filter(x=>x.id!==id));
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

  const pendPago = appts.filter(a=>a.status==="pendiente_pago");
  const tabs = [
    { id:"citas",    lbl:"Citas",    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
    { id:"horarios", lbl:"Horarios", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
    { id:"nueva",    lbl:"Nueva",    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 5v14M5 12h14"/></svg> },
    { id:"agenda",   lbl:"Agenda",   icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg> },
  ];

  return (
    <div style={{ minHeight:"100dvh", background:T.bg, display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ padding:"12px 16px 10px", borderBottom:"1px solid "+T.line, display:"flex", justifyContent:"space-between", alignItems:"center", background:T.navBg, backdropFilter:"blur(12px)", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <img src="/assets/medique-logo.png" alt="Medique" style={{ width:28, height:28, flexShrink:0 }} />
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:5, lineHeight:1 }}>
              <span style={{ fontFamily:T.serif, fontSize:17, fontWeight:400, color:T.text }}>Medique</span>
              {(() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return n ? <span style={{ fontFamily:T.sans, fontSize:11, color:T.textMute }}>· {n}</span> : null; } catch(e) { return null; } })()}
            </div>
            <span style={{ fontFamily:T.sans, fontSize:9, letterSpacing:".12em", textTransform:"uppercase", color:T.textFaint, display:"block", marginTop:2 }}>Panel móvil</span>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {pendPago.length>0 && (
            <button onClick={()=>setTab("citas")} style={{ background:"#B8860B", color:"#fff", fontFamily:T.sans, fontSize:11, fontWeight:600, border:"none", borderRadius:999, padding:"5px 12px", cursor:"pointer" }}>
              {pendPago.length} pendiente{pendPago.length>1?"s":""}
            </button>
          )}
          <button onClick={() => { const b = document.getElementById("jcm-mob-rfab-icon"); if(b) { b.style.transition="transform .55s"; b.style.transform="rotate(360deg)"; setTimeout(()=>{ b.style.transition=""; b.style.transform=""; },600); } window.dispatchEvent(new CustomEvent("jcsaas:data")); }} title="Actualizar" aria-label="Actualizar datos"
            style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", background:"none", color:T.textMute, border:"1px solid "+T.line, borderRadius:999, width:36, height:36, cursor:"pointer", flexShrink:0 }}>
            <svg id="jcm-mob-rfab-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M8 16H3v5"/>
            </svg>
          </button>
          <button onClick={onLogout} title="Cerrar sesión" aria-label="Cerrar sesión"
            style={{ display:"inline-flex", alignItems:"center", gap:6, background:T.surface, color:T.text, fontFamily:T.sans, fontSize:10.5, fontWeight:500, letterSpacing:".06em", border:"1px solid "+T.line, borderRadius:999, padding:"7px 12px", minHeight:36, cursor:"pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>
            Salir
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {tab==="citas"    && <CitasTab    T={T} D={D} appts={appts} confirmPago={confirmPago} cancelAppt={cancelAppt} updateAppt={updateAppt} />}
        {tab==="horarios" && <HorariosTab T={T} appts={appts} />}
        {tab==="nueva"    && <NuevaTab    T={T} D={D} appts={appts} addAppt={(a)=>{ addAppt(a); setTab("citas"); }} />}
        {tab==="agenda"   && <AgendaTab   T={T} appts={appts} />}
      </div>

      {/* Tab bar */}
      <div style={{ display:"flex", borderTop:"1px solid "+T.line, background:T.navBg, backdropFilter:"blur(12px)", paddingBottom:"env(safe-area-inset-bottom,8px)", position:"sticky", bottom:0 }}>
        {tabs.map(({id,lbl,icon})=>(
          <button key={id} onClick={()=>setTab(id)}
            style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"11px 4px 9px", background:"none", border:"none", cursor:"pointer",
              color:tab===id?T.accent:T.textFaint, fontFamily:T.sans, fontSize:9, letterSpacing:".07em", textTransform:"uppercase" }}>
            {icon}{lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Tab Citas ─── */
function CitasTab({ T, D, appts, confirmPago, cancelAppt, updateAppt }) {
  const today = todayISO();
  // Selector de días: 7 días fijos desde hoy, independiente de si hay citas
  const days = weekDays();
  const [filterDay, setFilterDay] = useState("all");
  const [showAnuladas, setShowAnuladas] = useState(false);

  const all = appts
    .filter(a => { const f = a.fecha || offToISO(a.day||0); return f >= today; })
    .sort((a,b) => {
      const fa = a.fecha||offToISO(a.day||0), fb = b.fecha||offToISO(b.day||0);
      return fa<fb?-1:fa>fb?1:minsM(a.time)-minsM(b.time);
    });

  const byFilter = filterDay === "all" ? all : all.filter(a => (a.fecha||offToISO(a.day||0)) === filterDay);
  const upcoming = showAnuladas ? byFilter.filter(a => a.status === "anulada") : byFilter.filter(a => a.status !== "anulada");

  const pendPago = upcoming.filter(a=>a.status==="pendiente_pago");
  const byDate = {};
  upcoming.forEach(a=>{ const k=a.fecha||offToISO(a.day||0); if(!byDate[k]) byDate[k]=[]; byDate[k].push(a); });

  const anuladasCount = byFilter.filter(a => a.status === "anulada").length;

  function dayLabel(iso) {
    if (iso === today) return "Hoy";
    const dt = new Date(iso+"T00:00:00");
    return WDS[dt.getDay()]+" "+dt.getDate()+" "+MESES[dt.getMonth()];
  }

  return (
    <div style={{ paddingBottom:24 }}>
      {/* Controles: selector de día (7 días) + toggle anuladas */}
      <div style={{ display:"flex", gap:8, padding:"10px 12px 8px", borderBottom:"1px solid "+T.lineSoft, alignItems:"center" }}>
        <div style={{ position:"relative", flex:1 }}>
          <select value={filterDay} onChange={e=>setFilterDay(e.target.value)}
            style={{ width:"100%", fontFamily:T.sans, fontSize:12.5, color:T.text, background:T.surface, border:"1px solid "+T.line, borderRadius:8, padding:"9px 32px 9px 12px", appearance:"none", cursor:"pointer", outline:"none" }}>
            <option value="all">Todos los días</option>
            {days.map(d => <option key={d.iso} value={d.iso}>{d.label}</option>)}
          </select>
          <svg style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        {anuladasCount > 0 && (
          <button onClick={()=>setShowAnuladas(v=>!v)}
            style={{ flexShrink:0, fontFamily:T.sans, fontSize:11.5, fontWeight:500, border:"1px solid "+(showAnuladas?"#C0285A":T.line), borderRadius:8, padding:"9px 12px", background:showAnuladas?"#C0285A18":T.surface, color:showAnuladas?"#C0285A":T.textMute, cursor:"pointer", whiteSpace:"nowrap" }}>
            {showAnuladas ? "Ocultar anuladas" : "Anuladas ("+anuladasCount+")"}
          </button>
        )}
      </div>

      {pendPago.length>0 && (
        <div style={{ margin:"14px 14px 6px", background:"#B8860B18", border:"1px solid #B8860B44", borderRadius:10, padding:"12px 14px" }}>
          <div style={{ fontFamily:T.sans, fontSize:11, letterSpacing:".1em", textTransform:"uppercase", color:"#B8860B", marginBottom:4 }}>
            ⏳ {pendPago.length} transferencia{pendPago.length>1?"s":""} por confirmar
          </div>
          <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.textMute }}>Revisa el comprobante y toca la cita para confirmar</div>
        </div>
      )}

      {upcoming.length === 0 && (
        <div style={{ padding:"50px 24px", textAlign:"center" }}>
          <div style={{ fontFamily:T.serif, fontSize:20, color:T.textMute, marginBottom:8 }}>Sin citas{filterDay!=="all"?" para este día":""}</div>
          <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.textFaint }}>{filterDay!=="all" ? "Selecciona otro día" : "Usa \"Nueva\" para agregar una cita"}</div>
        </div>
      )}

      {Object.entries(byDate).map(([fecha, dayAppts])=>{
        const isToday = fecha===today;
        return (
          <div key={fecha} style={{ marginTop:14 }}>
            <div style={{ padding:"0 16px 6px", fontFamily:T.sans, fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:isToday?T.accent:T.textMute }}>{dayLabel(fecha)}</div>
            {dayAppts.map(a=><ApptCard key={a.id} T={T} D={D} appt={a} confirmPago={confirmPago} cancelAppt={cancelAppt} updateAppt={updateAppt} />)}
          </div>
        );
      })}
    </div>
  );
}

function ApptCard({ T, D, appt:a, confirmPago, cancelAppt, updateAppt }) {
  const isPend = a.status==="pendiente_pago";
  const isAnulada = a.status==="anulada";
  const [open, setOpen] = useState(isPend);
  const [confirmDel, setConfirmDel] = useState(false);
  const [editCom, setEditCom] = useState(false);
  const [comTxt, setComTxt] = useState(a.comentario||"");
  // Edición de la cita ya creada (fecha, hora, duración, procedimiento) desde el móvil (P33).
  const [edit, setEdit] = useState(false);
  const [ef, setEf] = useState({ fecha: a.fecha || todayISO(), time: a.time || "10:00", dur: (parseInt(a.dur) || 30) + "", proc: a.proc || "" });
  const procOpts = (() => { try { return (window.JCDATA && window.JCDATA.catalog ? window.JCDATA.catalog.map(s => s.name) : []) || []; } catch (e) { return []; } })();
  const st = apptStateM(a, T);
  const ac = st.color;
  // Nombre y dirección de la CLÍNICA (no "JC Medical" para todas). Dinámicos desde la config.
  const clinNombre = (() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return (n && ("" + n).trim()) || "la clínica"; } catch (e) { return "la clínica"; } })();
  const clinDir = (() => { try { const d = window.DB && window.DB.cfg && window.DB.cfg().clinic_addr; return (d && ("" + d).trim()) || ""; } catch (e) { return ""; } })();
  const rawPhone = (a.phone||"").replace(/\D/g,"");
  const waPhone = rawPhone.length>=8 ? rawPhone : "";
  const durLabel = durOf(a);

  return (
    <div style={{ margin:"0 12px 8px", borderRadius:10, border:"1px solid "+(isAnulada?T.lineSoft:isPend?"#B8860B44":T.line), background:T.surface, overflow:"hidden", opacity:isAnulada?.6:1 }}>
      <button onClick={()=>!isAnulada&&setOpen(v=>!v)} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"13px 14px", background:"none", border:"none", cursor:isAnulada?"default":"pointer", textAlign:"left" }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:ac, flexShrink:0 }} aria-hidden="true" />
            <span style={{ fontFamily:T.sans, fontSize:15, fontWeight:600, color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.name}</span>
          </div>
          <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute, marginTop:2 }}>{a.time} · {a.proc||"—"} · {durLabel}</div>
        </div>
        <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
          <span style={{ fontFamily:T.sans, fontSize:9.5, letterSpacing:".09em", textTransform:"uppercase", color:ac, border:"1px solid "+ac+"55", borderRadius:999, padding:"3px 8px" }}>
            {st.label}
          </span>
        </div>
      </button>
      {open && (
        <div style={{ borderTop:"1px solid "+T.lineSoft, padding:"12px 14px", display:"flex", flexDirection:"column", gap:9 }}>
          {isPend && (
            <button onClick={()=>confirmPago(a.id)}
              style={{ width:"100%", background:"#1F8A5B", color:"#fff", fontFamily:T.sans, fontSize:12.5, letterSpacing:".1em", textTransform:"uppercase", border:"none", borderRadius:8, padding:"15px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              Confirmar transferencia
            </button>
          )}
          {/* Comentario */}
          {editCom ? (
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              <textarea value={comTxt} onChange={e=>setComTxt(e.target.value)}
                placeholder="Ej. Evaluación de botox, control rinomodelación…"
                rows={2} autoFocus
                style={{ width:"100%", boxSizing:"border-box", fontFamily:T.sans, fontSize:13, color:T.text, background:T.bg, border:"1px solid "+T.line, borderRadius:8, padding:"9px 11px", resize:"none", outline:"none" }} />
              <div style={{ display:"flex", gap:6 }}>
                <button onClick={()=>setEditCom(false)} style={{ flex:1, height:34, borderRadius:8, border:"1px solid "+T.line, background:"transparent", color:T.textMute, fontFamily:T.sans, fontSize:12, cursor:"pointer" }}>Cancelar</button>
                <button onClick={()=>{ updateAppt(a.id,{comentario:comTxt.trim()}); setEditCom(false); }} style={{ flex:2, height:34, borderRadius:8, border:"none", background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, fontWeight:600, cursor:"pointer" }}>Guardar</button>
              </div>
            </div>
          ) : (
            <button onClick={()=>setEditCom(true)}
              style={{ display:"flex", alignItems:"center", gap:8, width:"100%", background:a.comentario?"#1A50A308":T.bg, border:"1px solid "+(a.comentario?"#1A50A333":T.lineSoft), borderRadius:8, padding:"9px 12px", cursor:"pointer", textAlign:"left" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.comentario?"#1A50A3":T.textFaint} strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span style={{ fontFamily:T.sans, fontSize:12, color:a.comentario?T.text:T.textFaint, flex:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                {a.comentario || "Agregar comentario"}
              </span>
            </button>
          )}

          {/* Edición de la cita (P33) */}
          {edit ? (
            <div style={{ display:"flex", flexDirection:"column", gap:8, background:T.bg, border:"1px solid "+T.line, borderRadius:8, padding:"11px 12px" }}>
              <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:T.accent }}>Editar cita</div>
              <label style={{ fontFamily:T.sans, fontSize:11, color:T.textMute }}>Fecha
                <input type="date" value={ef.fecha} onChange={e=>setEf(f=>({...f,fecha:e.target.value}))} style={{ width:"100%", boxSizing:"border-box", marginTop:3, fontFamily:T.sans, fontSize:14, padding:"10px 11px", borderRadius:7, border:"1px solid "+T.line, background:T.surface, color:T.text, outline:"none" }} /></label>
              <div style={{ display:"flex", gap:8 }}>
                <label style={{ flex:1, fontFamily:T.sans, fontSize:11, color:T.textMute }}>Hora
                  <select value={ef.time} onChange={e=>setEf(f=>({...f,time:e.target.value}))} style={{ width:"100%", boxSizing:"border-box", marginTop:3, fontFamily:T.sans, fontSize:14, padding:"10px 11px", borderRadius:7, border:"1px solid "+T.line, background:T.surface, color:T.text, outline:"none" }}>{(typeof HALF_HOURS!=="undefined"?HALF_HOURS:[a.time]).map(h=><option key={h} value={h}>{h}</option>)}{(typeof HALF_HOURS==="undefined"||HALF_HOURS.indexOf(ef.time)<0)&&<option value={ef.time}>{ef.time}</option>}</select></label>
                <label style={{ flex:1, fontFamily:T.sans, fontSize:11, color:T.textMute }}>Duración
                  <select value={ef.dur} onChange={e=>setEf(f=>({...f,dur:e.target.value}))} style={{ width:"100%", boxSizing:"border-box", marginTop:3, fontFamily:T.sans, fontSize:14, padding:"10px 11px", borderRadius:7, border:"1px solid "+T.line, background:T.surface, color:T.text, outline:"none" }}>{["15","30","45","60","90","120"].map(d=><option key={d} value={d}>{d} min</option>)}</select></label>
              </div>
              <label style={{ fontFamily:T.sans, fontSize:11, color:T.textMute }}>Procedimiento
                {procOpts.length ? <select value={ef.proc} onChange={e=>setEf(f=>({...f,proc:e.target.value}))} style={{ width:"100%", boxSizing:"border-box", marginTop:3, fontFamily:T.sans, fontSize:14, padding:"10px 11px", borderRadius:7, border:"1px solid "+T.line, background:T.surface, color:T.text, outline:"none" }}>{[ef.proc, ...procOpts.filter(p=>p!==ef.proc)].filter(Boolean).map(p=><option key={p} value={p}>{p}</option>)}</select>
                  : <input value={ef.proc} onChange={e=>setEf(f=>({...f,proc:e.target.value}))} placeholder="Procedimiento" style={{ width:"100%", boxSizing:"border-box", marginTop:3, fontFamily:T.sans, fontSize:14, padding:"10px 11px", borderRadius:7, border:"1px solid "+T.line, background:T.surface, color:T.text, outline:"none" }} />}</label>
              <div style={{ display:"flex", gap:6, marginTop:2 }}>
                <button onClick={()=>setEdit(false)} style={{ flex:1, height:38, borderRadius:8, border:"1px solid "+T.line, background:"transparent", color:T.textMute, fontFamily:T.sans, fontSize:12, cursor:"pointer" }}>Cancelar</button>
                <button onClick={()=>{ updateAppt(a.id,{ fecha:ef.fecha, day:isoToDayOff(ef.fecha), time:ef.time, dur:ef.dur+" minutos", proc:ef.proc }); setEdit(false); }} style={{ flex:2, height:38, borderRadius:8, border:"none", background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, fontWeight:600, cursor:"pointer" }}>Guardar cambios</button>
              </div>
            </div>
          ) : (
            <button onClick={()=>{ setEf({ fecha:a.fecha||todayISO(), time:a.time||"10:00", dur:(parseInt(a.dur)||30)+"", proc:a.proc||"" }); setEdit(true); }} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", background:T.bg, border:"1px solid "+T.lineSoft, borderRadius:8, padding:"11px 12px", cursor:"pointer", textAlign:"left", color:T.text, fontFamily:T.sans, fontSize:12.5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
              Editar cita (fecha, hora, duración, procedimiento)
            </button>
          )}

          <div style={{ display:"flex", gap:8 }}>
            {waPhone && (
              <a href={"https://wa.me/56"+waPhone.replace(/^(56|0)/,"")+"?text="+encodeURIComponent("Hola "+a.name+", confirmamos tu cita en "+clinNombre+":\n📅 "+(a.fecha||"")+" · "+a.time+" hrs"+(clinDir?"\n📍 "+clinDir:"")+"\n💉 "+(a.proc||"")+" ("+durLabel+")\n⏰ La espera máxima para su atención es de 15 minutos, para no retrasar las atenciones siguientes")}
                target="_blank" rel="noopener"
                style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:"#1F8A5B22", border:"1px solid #1F8A5B55", borderRadius:8, padding:"12px", textDecoration:"none", color:"#1F8A5B", fontFamily:T.sans, fontSize:12, fontWeight:500 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#1F8A5B"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z"/></svg>
                WhatsApp
              </a>
            )}
            {confirmDel
              ? <div style={{ flex:1, display:"flex", gap:6 }}>
                  <button onClick={()=>setConfirmDel(false)} style={{ flex:1, background:"transparent", border:"1px solid "+T.line, borderRadius:8, padding:"12px", cursor:"pointer", fontFamily:T.sans, fontSize:11, color:T.textMute }}>Volver</button>
                  <button onClick={()=>cancelAppt(a.id)} style={{ flex:1, background:"#C0285A", border:"none", borderRadius:8, padding:"12px", cursor:"pointer", fontFamily:T.sans, fontSize:11, color:"#fff" }}>Sí, anular</button>
                </div>
              : <button onClick={()=>setConfirmDel(true)} style={{ flex:1, background:"transparent", border:"1px solid #C0285A44", borderRadius:8, padding:"12px", cursor:"pointer", color:"#C0285A", fontFamily:T.sans, fontSize:12, fontWeight:500 }}>Anular cita</button>
            }
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Tab Horarios ─── */
function HorariosTab({ T, appts }) {
  const [selOff, setSelOff] = useState(0);
  const days = Array.from({length:14},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()+i); return { off:i, iso:localISO(d), wd:WDS[d.getDay()], dd:d.getDate() }; });
  const selDay = days[selOff];
  const [slotsMap, setSlotsMap] = useState(()=>(window.DB && window.DB.get('horarios_dates')) || {});
  // Escucha cambios en Firestore para refrescar el mapa
  useEffect(() => {
    function reload() { setSlotsMap((window.DB && window.DB.get('horarios_dates')) || {}); }
    window.addEventListener('jcsaas:data', reload);
    return () => window.removeEventListener('jcsaas:data', reload);
  }, []);
  // Horario semanal configurado (horarios_v1) para el día seleccionado como fallback
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
    <div>
      <div style={{ overflowX:"auto", borderBottom:"1px solid "+T.line }}>
        <div style={{ display:"flex", gap:8, padding:"12px 14px", minWidth:"max-content" }}>
          {days.map((d,i)=>(
            <button key={i} onClick={()=>setSelOff(i)}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"8px 10px", borderRadius:8, minWidth:50, background:selOff===i?T.accent:T.surface, border:"1px solid "+(selOff===i?T.accent:T.line), cursor:"pointer" }}>
              <span style={{ fontFamily:T.sans, fontSize:8.5, letterSpacing:".06em", textTransform:"uppercase", color:selOff===i?T.onAccent:T.textMute }}>{i===0?"Hoy":d.wd}</span>
              <span style={{ fontFamily:T.serif, fontSize:20, color:selOff===i?T.onAccent:T.text, marginTop:2 }}>{d.dd}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:"12px 14px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid "+T.lineSoft }}>
        <div style={{ flex:1, fontFamily:T.sans, fontSize:11, color:T.textMute }}>
          <span style={{ color:"#1F8A5B", fontWeight:600 }}>{availCount}</span> disponibles · <span style={{ color:T.textFaint }}>{blockedCount}</span> bloqueadas · <span style={{ color:"#B8860B", fontWeight:600 }}>{occupied.size}</span> con cita
        </div>
        <button onClick={openAll}  style={{ background:"#1F8A5B18", border:"1px solid #1F8A5B44", color:"#1F8A5B", borderRadius:6, padding:"8px 12px", fontFamily:T.sans, fontSize:10.5, cursor:"pointer" }}>Abrir todo</button>
        <button onClick={blockAll} style={{ background:"#C0285A18", border:"1px solid #C0285A44", color:"#C0285A", borderRadius:6, padding:"8px 12px", fontFamily:T.sans, fontSize:10.5, cursor:"pointer" }}>Bloquear todo</button>
      </div>
      <div style={{ display:"flex", gap:14, padding:"10px 14px 6px" }}>
        {[["#1F8A5B","Disponible"],["#C0285A","Bloqueado"],["#B8860B","Con cita"]].map(([c,l])=>(
          <div key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:9, height:9, borderRadius:3, background:c }} />
            <span style={{ fontFamily:T.sans, fontSize:10, color:T.textMute }}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7, padding:"6px 12px 30px" }}>
        {HALF_HOURS.map(slot=>{
          const isOcc = occupied.has(slot);
          const isAvail = avail.includes(slot);
          return (
            <button key={slot} onClick={()=>toggle(slot)} disabled={isOcc}
              style={{ padding:"11px 4px", borderRadius:8, border:"1px solid",
                fontFamily:T.sans, fontSize:12.5, fontWeight:500,
                cursor:isOcc?"default":"pointer",
                background:isOcc?"#B8860B18":isAvail?"#1F8A5B15":T.surface,
                borderColor:isOcc?"#B8860B55":isAvail?"#1F8A5B55":T.lineSoft,
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
const CAL_PX_HOUR = 64; // píxeles por hora
const CAL_START   = 8;  // primera hora visible
const CAL_END     = 20; // última hora visible
const CAL_HOURS   = Array.from({length: CAL_END - CAL_START + 1}, (_,i) => CAL_START + i);

function AgendaTab({ T, appts }) {
  const today = todayISO();
  const days = weekDays();
  const [selDay, setSelDay] = useState(today);
  const [view, setView] = useState("dia"); // "dia" | "mes" (P37: visual mensual estilo Medique)
  const [monthCur, setMonthCur] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const dayRef = useMemo(() => React.createRef(), []);
  // Conteo de citas por fecha (para los puntos del calendario mensual).
  const apptCountByDate = useMemo(() => {
    const map = {};
    appts.forEach(a => { if (a.status === "anulada") return; const f = a.fecha || offToISO(a.day || 0); map[f] = (map[f] || 0) + 1; });
    return map;
  }, [appts]);
  // Rejilla del mes: semanas Lun→Dom, 6 filas.
  const monthGrid = useMemo(() => {
    const first = new Date(monthCur.y, monthCur.m, 1);
    const startDow = (first.getDay() + 6) % 7; // 0=Lunes
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(monthCur.y, monthCur.m, 1 - startDow + i);
      cells.push({ iso: localISO(d), dd: d.getDate(), inMonth: d.getMonth() === monthCur.m });
    }
    return cells;
  }, [monthCur]);
  const MESES_LARGOS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  // Citas del día seleccionado, excluyendo anuladas
  const dayAppts = appts
    .filter(a => {
      const f = a.fecha || offToISO(a.day||0);
      return f === selDay && a.status !== "anulada";
    })
    .sort((a,b) => minsM(a.time) - minsM(b.time));

  // Scroll automático a la primera cita del día (o a las 8:00 si no hay)
  useEffect(() => {
    if (!dayRef.current) return;
    const firstMin = dayAppts.length ? minsM(dayAppts[0].time) : CAL_START * 60;
    const targetPx = Math.max(0, (firstMin - CAL_START * 60 - 30) * (CAL_PX_HOUR / 60));
    dayRef.current.scrollTop = targetPx;
  }, [selDay]);

  function apptBlock(a) {
    const startMin = minsM(a.time);
    const durMin = parseInt(a.dur) || (window.JCDATA&&window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
    const topPx   = (startMin - CAL_START * 60) * (CAL_PX_HOUR / 60);
    const heightPx = Math.max(durMin * (CAL_PX_HOUR / 60), 28);
    const st = apptStateM(a, T);
    return (
      <div key={a.id} style={{
        position:"absolute",
        top: topPx,
        left: 0,
        right: 0,
        height: heightPx,
        background: st.color + "1A",
        borderTop: "2px solid " + st.color,
        borderRadius: 6,
        padding: "3px 8px",
        overflow:"hidden",
        boxSizing:"border-box",
        cursor:"default"
      }}>
        <div style={{ fontFamily:T.sans, fontSize:11.5, fontWeight:700, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", lineHeight:1.3 }}>{a.name}</div>
        {heightPx > 30 && (
          <div style={{ fontFamily:T.sans, fontSize:10, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {a.time} · {a.proc||"—"}
          </div>
        )}
        {heightPx > 50 && a.comentario && (
          <div style={{ fontFamily:T.sans, fontSize:9.5, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", fontStyle:"italic", marginTop:1 }}>
            {a.comentario}
          </div>
        )}
      </div>
    );
  }

  if (view === "mes") {
    const WD = ["L","M","M","J","V","S","D"];
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"calc(100dvh - 130px)" }}>
        {/* Toggle Día / Mes */}
        <div style={{ display:"flex", gap:6, padding:"10px 12px", borderBottom:"1px solid "+T.line, flexShrink:0 }}>
          {[["dia","Día"],["mes","Mes"]].map(([k,l])=>(
            <button key={k} onClick={()=>setView(k)} style={{ flex:1, fontFamily:T.sans, fontSize:12.5, fontWeight:view===k?700:500, padding:"9px", borderRadius:8, border:"1px solid "+(view===k?T.accent:T.line), background:view===k?T.accent:"transparent", color:view===k?T.onAccent:T.textMute, cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        {/* Cabecera del mes con navegación */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px 8px", flexShrink:0 }}>
          <button onClick={()=>setMonthCur(c=>{ const m=c.m-1; return m<0?{y:c.y-1,m:11}:{y:c.y,m}; })} style={{ width:36, height:36, borderRadius:999, border:"1px solid "+T.line, background:T.surface, color:T.text, cursor:"pointer" }}>‹</button>
          <div style={{ fontFamily:T.serif, fontSize:19, color:T.text }}>{MESES_LARGOS[monthCur.m]} {monthCur.y}</div>
          <button onClick={()=>setMonthCur(c=>{ const m=c.m+1; return m>11?{y:c.y+1,m:0}:{y:c.y,m}; })} style={{ width:36, height:36, borderRadius:999, border:"1px solid "+T.line, background:T.surface, color:T.text, cursor:"pointer" }}>›</button>
        </div>
        {/* Encabezado de días de la semana */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", padding:"0 10px 4px", flexShrink:0 }}>
          {WD.map((w,i)=><div key={i} style={{ textAlign:"center", fontFamily:T.sans, fontSize:10, letterSpacing:".08em", color:T.textFaint }}>{w}</div>)}
        </div>
        {/* Rejilla del mes */}
        <div style={{ flex:1, overflowY:"auto", padding:"0 10px 16px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
            {monthGrid.map(c=>{
              const n = apptCountByDate[c.iso] || 0;
              const isToday = c.iso === today;
              return (
                <button key={c.iso} onClick={()=>{ setSelDay(c.iso); setView("dia"); }} style={{ aspectRatio:"1/1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, borderRadius:10, cursor:"pointer",
                  background: isToday ? T.accent+"18" : (n?T.surface:"transparent"),
                  border:"1px solid "+(isToday?T.accent:(n?T.line:"transparent")),
                  opacity: c.inMonth?1:.32 }}>
                  <span style={{ fontFamily:T.sans, fontSize:14, fontWeight:isToday?700:500, color:isToday?T.accent:T.text }}>{c.dd}</span>
                  {n>0 && <span style={{ display:"flex", gap:2 }}>{Array.from({length:Math.min(n,3)}).map((_,i)=><span key={i} style={{ width:5, height:5, borderRadius:"50%", background:T.accent }} />)}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100dvh - 130px)" }}>
      {/* Toggle Día / Mes (P37) */}
      <div style={{ display:"flex", gap:6, padding:"10px 12px 8px", flexShrink:0 }}>
        {[["dia","Día"],["mes","Mes"]].map(([k,l])=>(
          <button key={k} onClick={()=>setView(k)} style={{ flex:1, fontFamily:T.sans, fontSize:12.5, fontWeight:view===k?700:500, padding:"9px", borderRadius:8, border:"1px solid "+(view===k?T.accent:T.line), background:view===k?T.accent:"transparent", color:view===k?T.onAccent:T.textMute, cursor:"pointer" }}>{l}</button>
        ))}
      </div>
      {/* Selector de días: 7 días con scroll horizontal */}
      <div style={{ overflowX:"auto", borderBottom:"1px solid "+T.line, flexShrink:0, WebkitOverflowScrolling:"touch" }}>
        <div style={{ display:"flex", padding:"10px 10px 8px", minWidth:"max-content", gap:2 }}>
          {days.map(d => {
            const isSel = d.iso === selDay;
            const isToday = d.iso === today;
            return (
              <button key={d.iso} onClick={()=>setSelDay(d.iso)}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"7px 10px", borderRadius:10, minWidth:46, border:"none",
                  background: isSel ? T.accent : "transparent", cursor:"pointer" }}>
                <span style={{ fontFamily:T.sans, fontSize:9, letterSpacing:".06em", textTransform:"uppercase", color: isSel ? T.onAccent : T.textMute }}>
                  {d.i===0 ? "HOY" : d.wd.toUpperCase()}
                </span>
                <span style={{ fontFamily:T.sans, fontSize:22, fontWeight: isToday ? "700" : "400", color: isSel ? T.onAccent : T.text, lineHeight:1.2 }}>
                  {d.dd}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline vertical */}
      <div ref={dayRef} style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch" }}>
        <div style={{ position:"relative", marginLeft:48, paddingRight:12 }}>
          {/* Líneas de hora */}
          {CAL_HOURS.map(h => (
            <div key={h} style={{ position:"absolute", left:-48, right:0, top: (h - CAL_START) * CAL_PX_HOUR, display:"flex", alignItems:"flex-start", zIndex:1 }}>
              <span style={{ fontFamily:T.sans, fontSize:10, color:T.textFaint, width:42, textAlign:"right", paddingRight:8, lineHeight:1, transform:"translateY(-5px)", flexShrink:0 }}>
                {h<10?"0"+h:""+h}:00
              </span>
              <div style={{ flex:1, borderTop:"1px solid "+T.lineSoft, marginTop:0 }} />
            </div>
          ))}

          {/* Bloque de citas del día */}
          <div style={{ position:"relative", minHeight: (CAL_END - CAL_START) * CAL_PX_HOUR + 40 }}>
            {dayAppts.map(a => apptBlock(a))}
          </div>

          {dayAppts.length === 0 && (
            <div style={{ position:"absolute", top:"50%", left:0, right:0, transform:"translateY(-50%)", textAlign:"center", pointerEvents:"none" }}>
              <div style={{ fontFamily:T.serif, fontSize:18, color:T.textFaint }}>Sin citas este día</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab Nueva cita ─── */
function NuevaTab({ T, D, appts, addAppt }) {
  const procs = procList();
  const [name,  setName]  = useState("");
  const [rut,   setRut]   = useState("");
  const PHONE_PFX = "+56 9 ";
  const [phone, setPhone] = useState(PHONE_PFX); // el prefijo +56 9 no se puede borrar (P34)
  function onPhone(v) { const digits = v.startsWith(PHONE_PFX) ? v.slice(PHONE_PFX.length).replace(/\D/g, "") : v.replace(/\D/g, "").replace(/^569?/, ""); setPhone(PHONE_PFX + digits.slice(0, 8)); }
  const phoneOk = phone.replace(/\D/g, "").length >= 11; // 56 + 9 + 8 dígitos
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState(todayISO());
  const [time,  setTime]  = useState("10:00");
  const [proc,    setProc]    = useState(procs[0]||"Evaluación general");
  const [dur,     setDur]     = useState("30 minutos");
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  // Auto-ajusta la duración cuando cambia el procedimiento
  useEffect(() => {
    if (window.JCDATA && window.JCDATA.procMin) {
      setDur(window.JCDATA.procMin(proc) + " minutos");
    }
  }, [proc]);

  const slotsMap = (window.DB && window.DB.get('horarios_dates')) || {};
  const weeklyDef = (() => {
    try { var h = window.DB && window.DB.get('horarios_v1'); var wd = new Date(fecha + 'T12:00:00').getDay(); if (h && h[wd] && h[wd].open !== false) return h[wd].slots || HALF_HOURS.slice(); if (h && h[wd] && h[wd].open === false) return []; } catch(e) {}
    return HALF_HOURS.slice();
  })();
  const avail = slotsMap[fecha]!=null ? slotsMap[fecha] : weeklyDef;
  const occupied = new Set(appts.filter(a=>a.fecha===fecha).map(a=>a.time));
  const freeSlots = avail.filter(s=>!occupied.has(s));

  const valid = name.trim() && phoneOk;
  function save() {
    if (!valid) return;
    addAppt({ id:Date.now().toString(36), name:name.trim(), rut:rut.trim(), phone:phone.trim(), email:email.trim(), proc, dur, time, fecha, day:isoToDayOff(fecha), status:"confirmada", source:"movil", comentario:comment.trim()||undefined, createdAt:new Date().toISOString() });
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
    setName(""); setRut(""); setPhone(PHONE_PFX); setEmail(""); setComment(""); setTime(freeSlots[0]||"10:00");
  }

  const inp = { width:"100%", fontFamily:T.sans, fontSize:15, padding:"13px 15px", borderRadius:8, border:"1px solid "+T.line, background:T.surface, color:T.text, outline:"none", boxSizing:"border-box" };
  const lbl = { display:"block", fontFamily:T.sans, fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:T.textMute, marginBottom:5 };

  return (
    <div style={{ padding:"20px 16px 50px", display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ fontFamily:T.serif, fontSize:26, fontWeight:300, color:T.text }}>Nueva cita</div>
      <div><label style={lbl}>Paciente</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre completo" style={inp} /></div>
      <div><label style={lbl}>RUT</label><input value={rut} onChange={e=>setRut(e.target.value)} placeholder="12.345.678-9" style={inp} /></div>
      <div><label style={lbl}>Teléfono</label><input type="tel" inputMode="numeric" value={phone} onChange={e=>onPhone(e.target.value)} placeholder="+56 9 1234 5678" style={{...inp, borderColor: phoneOk?T.line:"#C0285A55"}} /></div>
      <div><label style={lbl}>Correo (opcional)</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="correo@ejemplo.com" style={inp} /></div>
      <div><label style={lbl}>Procedimiento</label>
        <select value={proc} onChange={e=>setProc(e.target.value)} style={{...inp,appearance:"none"}}>
          <option>Evaluación general</option>
          {procs.map(p=><option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div><label style={lbl}>Fecha</label><input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={inp} /></div>
      <div>
        <label style={lbl}>Hora</label>
        {/* Selector de hora tipo iPhone: en iOS el <select> se muestra como rueda deslizable. (P35) */}
        <select value={time} onChange={e=>setTime(e.target.value)} style={{...inp,appearance:"none"}}>
          {(() => { const base = freeSlots.length ? freeSlots : (typeof HALF_HOURS!=="undefined"?HALF_HOURS:[time]); const opts = base.indexOf(time)>=0 ? base : [time, ...base]; return opts.map(s=><option key={s} value={s}>{s} hrs</option>); })()}
        </select>
        {freeSlots.length===0&&<div style={{ fontFamily:T.sans, fontSize:11, color:"#C0285A", marginTop:5 }}>No hay horas marcadas como disponibles para este día.</div>}
      </div>
      <div><label style={lbl}>Duración</label>
        <select value={dur} onChange={e=>setDur(e.target.value)} style={{...inp,appearance:"none"}}>
          {["15 minutos","30 minutos","45 minutos","60 minutos","90 minutos"].map(d=><option key={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label style={lbl}>Comentario (opcional)</label>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Ej. Evaluación de botox, control rinomodelación…" rows={2}
          style={{...inp, resize:"none", height:"auto"}} />
      </div>
      {!valid && (name.trim() && !phoneOk) && <div style={{ fontFamily:T.sans, fontSize:11.5, color:"#C0285A", marginTop:-4 }}>Ingresa los 8 dígitos del teléfono.</div>}
      <button onClick={save} disabled={!valid}
        style={{ background:saved?"#1F8A5B":T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".12em", textTransform:"uppercase", border:"none", borderRadius:8, padding:"17px", cursor:valid?"pointer":"not-allowed", opacity:valid?1:.5, marginTop:4, transition:"background .3s" }}>
        {saved?"✓ Cita guardada":"Confirmar cita"}
      </button>
    </div>
  );
}

/* ─── Entry point (modo local) ─── */
function MobileAdmin() {
  const TK = window.JCTHEME;
  const T = jcmMobileTheme((TK && (TK.marfil || TK.cielo || TK.editorial)) || {
    bg:"#F5F2EC", surface:"#fff", text:"#1A1A14", textMute:"#5C5A50", textFaint:"#8A8674",
    line:"rgba(20,20,15,.12)", lineSoft:"rgba(20,20,15,.08)", accent:"#54707F", onAccent:"#fff",
    sans:"'Jost',sans-serif", serif:"'Marcellus',serif", navBg:"rgba(245,242,236,.96)"
  });
  const D = window.JCDATA;
  const authed0 = !!(window.jcmAdminHasPass&&window.jcmAdminHasPass()&&window.jcmAdminHasSession&&window.jcmAdminHasSession());
  const [authed, setAuthed] = useState(authed0);
  if (!authed) return <LoginScreen T={T} onAuth={()=>setAuthed(true)} />;
  return <MobileShell T={T} D={D} onLogout={()=>{ try { window.jcmAdminEndSession && window.jcmAdminEndSession(); } catch(e){} setAuthed(false); }} />;
}

/* ─── Entry point SaaS (multi-clínica): carga data cacheada inmediatamente ─── */
function MobileSaasGate() {
  const TK = window.JCTHEME;
  const T = jcmMobileTheme((TK && (TK.marfil || TK.cielo || TK.editorial)) || {
    bg:"#F5F2EC", surface:"#fff", text:"#1A1A14", textMute:"#5C5A50", textFaint:"#8A8674",
    line:"rgba(20,20,15,.12)", lineSoft:"rgba(20,20,15,.08)", accent:"#54707F", onAccent:"#fff",
    sans:"'Jost',sans-serif", serif:"'Marcellus',serif", navBg:"rgba(245,242,236,.96)"
  });
  const D = window.JCDATA;

  // Carga rápida: si hay data en caché y clinicId, mostrar la app de inmediato
  const hasCachedSession = !!(
    window.JCSAAS && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId() &&
    window.DB && (window.DB.get("appointments") || window.DB.get("patients"))
  );
  const [phase, setPhase] = useState(hasCachedSession ? "app" : "loading");
  const [view, setView] = useState("login"); // login | recover
  const [email, setEmail] = useState(""); const [pass, setPass] = useState("");
  const [err, setErr] = useState(""); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  // Mismo mapeo de errores de Firebase que el panel (jc-admin.jsx authMsg), en vez del genérico
  // "Correo o contraseña incorrectos" para TODO error — así se distingue una clave mala de un
  // problema real (sin conexión, demasiados intentos, etc.).
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
    // Timeout reducido: 4 segundos (era 9s)
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

  const inp = { width:"100%", fontFamily:T.sans, fontSize:16, padding:"14px 16px", borderRadius:6, border:"1px solid "+T.line, background:T.surface, color:T.text, outline:"none", boxSizing:"border-box" };
  const center = (kids) => <div style={{ minHeight:"100dvh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"30px 24px", background:T.bg }}>{kids}</div>;

  if (phase === "loading") return center(
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
      <img src="/assets/medique-logo.png" alt="Medique" style={{ width:36, height:36, marginBottom:6 }} />
      <div style={{ fontFamily:T.serif, fontSize:24, color:T.text }}>Medique</div>
      <div style={{ fontFamily:T.sans, fontSize:12, color:T.textMute }}>Conectando…</div>
    </div>
  );

  if (phase === "blocked") return center(<>
    <div style={{ fontFamily:T.serif, fontSize:26, color:T.text, marginBottom:8 }}>Plan inactivo</div>
    <div style={{ fontFamily:T.sans, fontSize:13, color:T.textMute, textAlign:"center", maxWidth:300, marginBottom:18 }}>El acceso de tu clínica no está activo. Escríbenos para reactivarlo.</div>
    <button onClick={()=>window.JCSAAS.logout()} style={{ background:"none", border:"1px solid "+T.line, color:T.text, fontFamily:T.sans, fontSize:12, borderRadius:6, padding:"12px 18px", cursor:"pointer" }}>Cerrar sesión</button>
  </>);

  if (view === "recover") return center(<>
    <div style={{ fontFamily:T.serif, fontSize:32, fontWeight:300, color:T.text, marginBottom:6 }}>Recuperar contraseña</div>
    <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.textMute, textAlign:"center", maxWidth:300, marginBottom:32, lineHeight:1.5 }}>Te enviaremos un enlace a tu correo para restablecerla.</div>
    <div style={{ width:"100%", maxWidth:340, display:"flex", flexDirection:"column", gap:12 }}>
      <input placeholder="Correo de tu cuenta" inputMode="email" data-nocap="" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doRecover()} style={inp} />
      {err && <div style={{ fontFamily:T.sans, fontSize:12, color:"#C0285A", textAlign:"center" }}>{err}</div>}
      {msg && <div style={{ fontFamily:T.sans, fontSize:12, color:"#1F8A5B", textAlign:"center" }}>{msg}</div>}
      <button onClick={doRecover} disabled={busy||!email.trim()} style={{ background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".14em", textTransform:"uppercase", border:"none", borderRadius:6, padding:"16px", cursor:"pointer", opacity:(busy||!email.trim())?.6:1, marginTop:4 }}>{busy?"Enviando…":"Enviar enlace"}</button>
      <button onClick={()=>{ setView("login"); setErr(""); setMsg(""); }} style={{ background:"none", border:"none", cursor:"pointer", color:T.accent, fontFamily:T.sans, fontSize:12, textDecoration:"underline", padding:6 }}>← Volver</button>
    </div>
  </>);

  return center(<>
    <div style={{ fontFamily:T.serif, fontSize:32, fontWeight:300, color:T.text, marginBottom:6 }}>Confirmar citas</div>
    <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:T.textMute, marginBottom:44 }}>Panel móvil · Acceso de tu clínica</div>
    <div style={{ width:"100%", maxWidth:340, display:"flex", flexDirection:"column", gap:12 }}>
      <input placeholder="Correo de tu clínica" inputMode="email" data-nocap="" value={email} onChange={e=>setEmail(e.target.value)} style={inp} />
      <input type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} style={inp} />
      {err && <div style={{ fontFamily:T.sans, fontSize:12, color:"#C0285A", textAlign:"center" }}>{err}</div>}
      <button onClick={doLogin} disabled={busy} style={{ background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".14em", textTransform:"uppercase", border:"none", borderRadius:6, padding:"16px", cursor:"pointer", opacity:busy?.6:1, marginTop:4 }}>{busy?"…":"Entrar"}</button>
      <button onClick={()=>{ setView("recover"); setErr(""); setMsg(""); }} style={{ background:"none", border:"none", cursor:"pointer", color:T.accent, fontFamily:T.sans, fontSize:12, textDecoration:"underline", padding:6 }}>¿Olvidaste tu contraseña?</button>
    </div>
  </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  (window.JCSAAS && window.JCSAAS.enabled) ? <MobileSaasGate /> : <MobileAdmin />
);
