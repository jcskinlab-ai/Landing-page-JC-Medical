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
function apptStateM(a, T) {
  if (a.status === "anulada")        return { label: "Cancelada",   color: T.textFaint };
  if (a.status === "no_asistio")     return { label: "No asistió",  color: "#C0285A" };
  if (a.attended || a.status === "atendida") return { label: "Atendida", color: "#1A50A3" };
  if (a.status === "confirmada")     return { label: "Confirmada",  color: "#16A34A" };
  if (a.status === "pendiente_pago") return { label: "⏳ Transferencia", color: "#B8860B" };
  return { label: "Agendado", color: T.accent };
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

/* ─── Fondo Everest + glass (referencia del usuario) ───
   Una sola fuente de verdad para el tratamiento visual: el fondo fijo (foto retrato del Everest +
   velo de legibilidad) y el "glass" translúcido de cabecera/tarjetas/tab bar, para que TODA la app
   comparta el mismo lenguaje sin repetir los valores en cada componente. */
function mobileBg(T) {
  const overlay = T.dark
    ? "linear-gradient(180deg, rgba(8,12,20,.55), rgba(8,12,20,.72) 45%, rgba(8,12,20,.92))"
    : "linear-gradient(180deg, rgba(20,26,36,.42), rgba(20,26,36,.6) 45%, rgba(20,26,36,.85))";
  return { backgroundImage: overlay + ", url('/assets/everest-mobile.jpg')", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" };
}
function glassPanel(T, radius) {
  return T.dark
    ? { background: "rgba(255,255,255,.06)", backdropFilter: "blur(20px) saturate(1.3)", WebkitBackdropFilter: "blur(20px) saturate(1.3)", border: "1px solid rgba(255,255,255,.10)", borderRadius: radius==null?14:radius }
    : { background: "rgba(255,255,255,.55)", backdropFilter: "blur(20px) saturate(1.3)", WebkitBackdropFilter: "blur(20px) saturate(1.3)", border: "1px solid rgba(255,255,255,.7)", borderRadius: radius==null?14:radius };
}
function glassChip(T) {
  return T.dark
    ? { background: "rgba(255,255,255,.08)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.12)" }
    : { background: "rgba(255,255,255,.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.75)" };
}
// Texto sobre foto: siempre claro (la foto es oscura arriba y abajo por el velo), independiente del
// tema día/noche del resto del panel — mismo criterio que el rediseño de escritorio.
const ON_PHOTO = { text: "#F4F1EA", mute: "rgba(244,241,234,.72)", faint: "rgba(244,241,234,.48)" };

/* ─── Pacientes (helpers de datos — este bundle no carga jc-admin.jsx) ─── */
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
  const inp = { width:"100%", fontFamily:T.sans, fontSize:16, padding:"14px 16px", borderRadius:10, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.08)", color:"#fff", outline:"none", boxSizing:"border-box" };
  return (
    <div style={{ minHeight:"100dvh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"30px 24px", ...mobileBg(T) }}>
      <img src="/assets/medique-logo.png" alt="Medique" style={{ width:52, height:52, marginBottom:10 }} />
      <div style={{ fontFamily:T.serif, fontSize:30, fontWeight:300, color:"#fff" }}>Medique</div>
      <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:ON_PHOTO.mute, marginBottom:44 }}>Panel móvil · Acceso privado</div>
      <div style={{ width:"100%", maxWidth:340, display:"flex", flexDirection:"column", gap:12 }}>
        {setup && <input placeholder="Usuario" value={user} onChange={e=>setUser(e.target.value)} style={inp} />}
        <input type="password" placeholder="Contraseña del panel" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} style={inp} />
        {err && <div style={{ fontFamily:T.sans, fontSize:12, color:"#FF8FA3", textAlign:"center" }}>{err}</div>}
        <button onClick={submit} disabled={busy}
          style={{ background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".14em", textTransform:"uppercase", border:"none", borderRadius:10, padding:"16px", cursor:"pointer", opacity:busy?.6:1, marginTop:4 }}>
          {busy?"…":(setup?"Crear acceso":"Entrar")}
        </button>
      </div>
    </div>
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
            <div style={{ fontFamily:T.serif, fontSize:19, color:T.text, lineHeight:1.15 }}>{a.name}</div>
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
          <a href={"https://wa.me/56"+waPhone.replace(/^(56|0)/,"")+"?text="+encodeURIComponent("Hola "+a.name+", confirmamos tu cita en "+clinNombre+":\n📅 "+(a.fecha||"")+" · "+a.time+" hrs"+(clinDir?"\n📍 "+clinDir:"")+"\n💉 "+(a.proc||"")+" ("+durLabel+")\n⏰ La espera máxima para su atención es de 15 minutos, para no retrasar las atenciones siguientes")}
            target="_blank" rel="noopener"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:"#1F8A5B22", border:"1px solid #1F8A5B55", borderRadius:9, padding:"12px", textDecoration:"none", color:"#1F8A5B", fontFamily:T.sans, fontSize:12.5, fontWeight:500 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#1F8A5B"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z"/></svg>
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

/* ═══════════ Home (tab "Citas") ═══════════ */
function HomeTab({ T, appts, patients, onOpenAppt, goTab, openOverlay }) {
  const today = todayISO();
  const yestISO = offToISO(-1);
  const active = appts.filter(a => a.status !== "anulada");
  const todayAppts = active.filter(a => (a.fecha||offToISO(a.day||0)) === today).sort((a,b)=>minsM(a.time)-minsM(b.time));
  const yestCount = active.filter(a => (a.fecha||offToISO(a.day||0)) === yestISO).length;
  const confirmadas = todayAppts.filter(a => a.status==="confirmada" || a.status==="atendida" || a.attended).length;
  const pendientes = todayAppts.filter(a => !(a.status==="confirmada"||a.status==="atendida"||a.attended||a.status==="anulada")).length;
  const delta = yestCount>0 ? Math.round((todayAppts.length-yestCount)/yestCount*100) : (todayAppts.length>0?100:0);
  const pct = n => todayAppts.length ? Math.round(n/todayAppts.length*100) : 0;

  const upcoming = active
    .filter(a => (a.fecha||offToISO(a.day||0)) >= today)
    .sort((a,b) => { const fa=a.fecha||offToISO(a.day||0), fb=b.fecha||offToISO(b.day||0); return fa<fb?-1:fa>fb?1:minsM(a.time)-minsM(b.time); })
    .slice(0, 6);

  const clinNombre = (() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return (n && (""+n).trim()) || ""; } catch(e) { return ""; } })();
  const fechaLarga = (() => { const d = new Date(); return DOW_FULL[d.getDay()]+", "+d.getDate()+" de "+MESES_LARGOS[d.getMonth()].toLowerCase(); })();

  const kpi = (label, val, sub, subColor) => (
    <div style={{ flex:1, ...glassPanel(T,14), padding:"12px 12px 11px" }}>
      <div style={{ fontFamily:T.sans, fontSize:9.5, letterSpacing:".08em", textTransform:"uppercase", color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{label}</div>
      <div style={{ fontFamily:T.serif, fontSize:26, color:T.text, marginTop:4, lineHeight:1 }}>{val}</div>
      {sub && <div style={{ fontFamily:T.sans, fontSize:10, color:subColor||T.textFaint, marginTop:5 }}>{sub}</div>}
    </div>
  );
  const action = (icon, label, onClick) => (
    <button onClick={onClick} style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:8, ...glassPanel(T,14), padding:"13px 12px", cursor:"pointer", textAlign:"left" }}>
      <div style={{ width:34, height:34, borderRadius:9, background:T.accent+"22", color:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
      <span style={{ fontFamily:T.sans, fontSize:12.5, fontWeight:500, color:T.text }}>{label}</span>
    </button>
  );

  return (
    <div style={{ padding:"6px 14px 90px", display:"flex", flexDirection:"column", gap:16 }}>
      <div>
        <div style={{ fontFamily:T.serif, fontSize:23, color:T.text }}>Hola{clinNombre?", "+clinNombre:""}</div>
        <div style={{ fontFamily:T.sans, fontSize:12.5, color:T.textMute, marginTop:2, textTransform:"capitalize" }}>{fechaLarga}</div>
      </div>

      <div style={{ display:"flex", gap:9 }}>
        {kpi("Citas hoy", todayAppts.length, (delta>=0?"↑":"↓")+Math.abs(delta)+"% vs ayer", delta>=0?"#16A34A":"#C0285A")}
        {kpi("Confirmadas", confirmadas, pct(confirmadas)+"% del total")}
        {kpi("Pendientes", pendientes, pct(pendientes)+"% del total")}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:9 }}>
        {action(<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12h14"/></svg>, "Nueva cita", ()=>goTab("nueva"))}
        {action(<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, "Pacientes", ()=>openOverlay("pacientes"))}
        {action(<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, "Bloquear horario", ()=>goTab("horarios"))}
        {action(<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4"/></svg>, "Reportes", ()=>openOverlay("reportes"))}
      </div>

      <div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:9 }}>
          <span style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:T.textMute }}>Próximas citas</span>
          <button onClick={()=>goTab("agenda")} style={{ background:"none", border:"none", padding:0, cursor:"pointer", fontFamily:T.sans, fontSize:12, fontWeight:600, color:T.accent, display:"flex", alignItems:"center", gap:3 }}>Ver agenda <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
        {upcoming.length===0 && <div style={{ ...glassPanel(T,14), padding:"22px 16px", textAlign:"center", fontFamily:T.sans, fontSize:12.5, color:T.textFaint }}>Sin próximas citas agendadas.</div>}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {upcoming.map(a => {
            const st = apptStateM(a, T);
            const iso = a.fecha||offToISO(a.day||0);
            const dLbl = iso===today ? "Hoy" : (()=>{ const d=new Date(iso+"T00:00:00"); return WDS[d.getDay()]+" "+d.getDate()+" "+MESES[d.getMonth()]; })();
            return (
              <button key={a.id} onClick={()=>onOpenAppt(a)} style={{ display:"flex", alignItems:"center", gap:11, width:"100%", textAlign:"left", cursor:"pointer", ...glassPanel(T,13), padding:"11px 13px" }}>
                <div style={{ flexShrink:0, textAlign:"center", minWidth:38 }}>
                  <div style={{ fontFamily:T.serif, fontSize:15, color:T.text, lineHeight:1 }}>{a.time}</div>
                  <div style={{ fontFamily:T.sans, fontSize:8, letterSpacing:".05em", textTransform:"uppercase", color:T.textFaint, marginTop:3 }}>{dLbl}</div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:T.sans, fontSize:13.5, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.name}</div>
                  <div style={{ fontFamily:T.sans, fontSize:11, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.proc||"—"} · {durOf(a)}</div>
                </div>
                <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:9, fontWeight:700, letterSpacing:".05em", textTransform:"uppercase", color:st.color, background:st.color+"1e", borderRadius:999, padding:"4px 9px" }}>{st.label}</span>
              </button>
            );
          })}
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
              style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"8px 10px", borderRadius:10, minWidth:50, cursor:"pointer",
                ...(selOff===i ? { background:T.accent, border:"1px solid "+T.accent } : { ...glassChip(T) }) }}>
              <span style={{ fontFamily:T.sans, fontSize:8.5, letterSpacing:".06em", textTransform:"uppercase", color:selOff===i?T.onAccent:T.textMute }}>{i===0?"Hoy":d.wd}</span>
              <span style={{ fontFamily:T.serif, fontSize:20, color:selOff===i?T.onAccent:T.text, marginTop:2 }}>{d.dd}</span>
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
const CAL_PX_HOUR = 64; // píxeles por hora
const CAL_START   = 8;  // primera hora visible
const CAL_END     = 20; // última hora visible
const CAL_HOURS   = Array.from({length: CAL_END - CAL_START + 1}, (_,i) => CAL_START + i);

function AgendaTab({ T, appts, onOpenAppt, goTab }) {
  const today = todayISO();
  const days = weekDays();
  const [selDay, setSelDay] = useState(today);
  const [view, setView] = useState("dia");
  const [showAnuladas, setShowAnuladas] = useState(false);
  const [monthCur, setMonthCur] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const dayRef = useMemo(() => React.createRef(), []);
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

  useEffect(() => {
    if (!dayRef.current) return;
    const firstMin = dayAppts.length ? minsM(dayAppts[0].time) : CAL_START * 60;
    const targetPx = Math.max(0, (firstMin - CAL_START * 60 - 30) * (CAL_PX_HOUR / 60));
    dayRef.current.scrollTop = targetPx;
  }, [selDay, showAnuladas]);

  function apptBlock(a) {
    const startMin = minsM(a.time);
    const durMin = parseInt(a.dur) || (window.JCDATA&&window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
    const topPx   = (startMin - CAL_START * 60) * (CAL_PX_HOUR / 60);
    const heightPx = Math.max(durMin * (CAL_PX_HOUR / 60), 28);
    const st = apptStateM(a, T);
    const isAnulada = a.status === "anulada";
    return (
      <button key={a.id} onClick={()=>onOpenAppt(a)} style={{
        position:"absolute", top: topPx, left: 0, right: 0, height: heightPx,
        background: st.color + "24", border:"none",
        borderTop: "2px solid " + st.color, borderRadius: 8,
        padding: "3px 9px", overflow:"hidden", boxSizing:"border-box",
        cursor:"pointer", textAlign:"left", opacity:isAnulada?.55:1,
        textDecoration:isAnulada?"line-through":"none"
      }}>
        <div style={{ fontFamily:T.sans, fontSize:11.5, fontWeight:700, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", lineHeight:1.3 }}>{a.name}</div>
        {heightPx > 30 && (
          <div style={{ fontFamily:T.sans, fontSize:10, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.time} · {a.proc||"—"}</div>
        )}
      </button>
    );
  }

  const toggleRow = (
    <div style={{ display:"flex", gap:6, padding:"10px 12px 8px", flexShrink:0 }}>
      {[["dia","Día"],["mes","Mes"]].map(([k,l])=>(
        <button key={k} onClick={()=>setView(k)} style={{ flex:1, fontFamily:T.sans, fontSize:12.5, fontWeight:view===k?700:500, padding:"9px", borderRadius:9, cursor:"pointer",
          ...(view===k ? { border:"1px solid "+T.accent, background:T.accent, color:T.onAccent } : { border:"1px solid "+(T.dark?"rgba(255,255,255,.14)":T.line), background:"transparent", color:T.textMute }) }}>{l}</button>
      ))}
      {anuladasCount>0 && view==="dia" && (
        <button onClick={()=>setShowAnuladas(v=>!v)} style={{ flexShrink:0, fontFamily:T.sans, fontSize:11, fontWeight:500, borderRadius:9, padding:"9px 11px", cursor:"pointer",
          border:"1px solid "+(showAnuladas?"#C0285A":(T.dark?"rgba(255,255,255,.14)":T.line)), background:showAnuladas?"#C0285A22":"transparent", color:showAnuladas?"#C0285A":T.textMute, whiteSpace:"nowrap" }}>
          {showAnuladas?"Ver activas":"Canceladas ("+anuladasCount+")"}
        </button>
      )}
    </div>
  );

  const fab = (
    <button onClick={()=>goTab("nueva")} title="Nueva cita" aria-label="Nueva cita"
      style={{ position:"absolute", right:16, bottom:16+"px", width:52, height:52, borderRadius:"50%", border:"none", background:T.accent, color:T.onAccent, cursor:"pointer", boxShadow:"0 10px 24px -8px rgba(0,0,0,.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:5 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
    </button>
  );

  if (view === "mes") {
    const WD = ["L","M","M","J","V","S","D"];
    return (
      <div style={{ position:"relative", display:"flex", flexDirection:"column", height:"calc(100dvh - 132px)" }}>
        {toggleRow}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 16px 8px", flexShrink:0 }}>
          <button onClick={()=>setMonthCur(c=>{ const m=c.m-1; return m<0?{y:c.y-1,m:11}:{y:c.y,m}; })} style={{ width:36, height:36, borderRadius:999, ...glassChip(T), color:T.text, cursor:"pointer" }}>‹</button>
          <div style={{ fontFamily:T.serif, fontSize:19, color:T.text }}>{MESES_LARGOS[monthCur.m]} {monthCur.y}</div>
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
    <div style={{ position:"relative", display:"flex", flexDirection:"column", height:"calc(100dvh - 132px)" }}>
      {toggleRow}
      <div style={{ overflowX:"auto", flexShrink:0, WebkitOverflowScrolling:"touch" }}>
        <div style={{ display:"flex", padding:"2px 10px 8px", minWidth:"max-content", gap:2 }}>
          {days.map(d => {
            const isSel = d.iso === selDay;
            const isToday = d.iso === today;
            return (
              <button key={d.iso} onClick={()=>setSelDay(d.iso)}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"7px 10px", borderRadius:10, minWidth:46, border:"none", cursor:"pointer",
                  background: isSel ? T.accent : "transparent" }}>
                <span style={{ fontFamily:T.sans, fontSize:9, letterSpacing:".06em", textTransform:"uppercase", color: isSel ? T.onAccent : T.textMute }}>{d.i===0 ? "HOY" : d.wd.toUpperCase()}</span>
                <span style={{ fontFamily:T.sans, fontSize:22, fontWeight: isToday ? "700" : "400", color: isSel ? T.onAccent : T.text, lineHeight:1.2 }}>{d.dd}</span>
              </button>
            );
          })}
        </div>
      </div>
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
            <div style={{ position:"absolute", top:"50%", left:0, right:0, transform:"translateY(-50%)", textAlign:"center", pointerEvents:"none" }}>
              <div style={{ fontFamily:T.serif, fontSize:18, color:T.textFaint }}>{showAnuladas?"Sin citas canceladas este día":"Sin citas este día"}</div>
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

  const step1Ok = tipo==="existente" ? !!selectedPatient : (name.trim() && phoneOk);
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
    // Igual que antes del rediseño: una cita creada a mano desde el móvil queda "Confirmada" de
    // entrada (ya se acordó con el paciente al momento de agendar), no "Agendado".
    addAppt({ id:Date.now().toString(36), patId, name:finalName.trim(), rut:(finalRut||"").trim(), phone:(finalPhone||"").trim(), email:(finalEmail||"").trim(), proc, dur, time, fecha, day:isoToDayOff(fecha), status:"confirmada", source:"movil", comentario:comment.trim()||undefined, createdAt:new Date().toISOString() });
    if (notifyWa && finalPhone) {
      const waP = (finalPhone||"").replace(/\D/g,"");
      if (waP.length>=8) setTimeout(()=>window.open("https://wa.me/56"+waP.replace(/^(56|0)/,"")+"?text="+encodeURIComponent("Hola "+finalName+", tu cita quedó agendada para el "+fecha+" a las "+time+" hrs · "+proc), "_blank", "noopener"), 300);
    }
    setSaved(true);
    setTimeout(()=>{ setSaved(false); onDone(); }, 900);
  }

  const inp = { width:"100%", fontFamily:T.sans, fontSize:15, padding:"13px 15px", borderRadius:10, border:"1px solid "+(T.dark?"rgba(255,255,255,.16)":T.line), background:T.dark?"rgba(255,255,255,.06)":"#fff", color:T.text, outline:"none", boxSizing:"border-box" };
  const lbl = { display:"block", fontFamily:T.sans, fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:T.textMute, marginBottom:5 };
  const STEPS = ["Paciente","Detalles","Confirmar"];

  return (
    <div style={{ padding:"14px 16px 90px", display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ fontFamily:T.serif, fontSize:24, fontWeight:300, color:T.text }}>Nueva cita</div>
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
                      <div style={{ width:30, height:30, borderRadius:"50%", background:T.accent+"22", color:T.accent, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:11, fontWeight:700, flexShrink:0 }}>{(p.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</div>
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
              <div><label style={lbl}>RUT (opcional)</label><input value={rut} onChange={e=>setRut(e.target.value)} placeholder="12.345.678-9" style={inp} /></div>
              <div><label style={lbl}>Teléfono</label><input type="tel" inputMode="numeric" value={phone} onChange={e=>onPhone(e.target.value)} style={{...inp, borderColor: phoneOk?undefined:"#C0285A88"}} /></div>
              <div><label style={lbl}>Correo (opcional)</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="correo@ejemplo.com" style={inp} /></div>
              {!phoneOk && phone.length>PHONE_PFX.length && <div style={{ fontFamily:T.sans, fontSize:11, color:"#FF8FA3" }}>Ingresa los 8 dígitos del teléfono.</div>}
            </div>
          )}
          <button onClick={()=>step1Ok && setStep(2)} disabled={!step1Ok} style={{ background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".1em", textTransform:"uppercase", border:"none", borderRadius:10, padding:"15px", cursor:step1Ok?"pointer":"not-allowed", opacity:step1Ok?1:.5 }}>Continuar</button>
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
            <button onClick={()=>step2Ok && setStep(3)} disabled={!step2Ok} style={{ flex:2, background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".1em", textTransform:"uppercase", border:"none", borderRadius:10, padding:"15px", cursor:step2Ok?"pointer":"not-allowed", opacity:step2Ok?1:.5 }}>Continuar</button>
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
            <button onClick={confirm} disabled={saved} style={{ flex:2, background:saved?"#1F8A5B":T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".1em", textTransform:"uppercase", border:"none", borderRadius:10, padding:"15px", cursor:"pointer", transition:"background .3s" }}>{saved?"✓ Cita guardada":"Confirmar cita"}</button>
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
        <div style={{ display:"flex", gap:8 }}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por nombre, RUT o teléfono…" style={{ ...inp, flex:1 }} />
          <button onClick={()=>setNuevo(v=>!v)} style={{ flexShrink:0, width:44, height:44, borderRadius:9, border:"none", background:T.accent, color:T.onAccent, cursor:"pointer", fontSize:20, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
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
        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
          {list.length===0 && <div style={{ textAlign:"center", padding:"30px 0", fontFamily:T.sans, fontSize:12.5, color:T.textFaint }}>Sin pacientes{ql?" que coincidan":""}.</div>}
          {list.map(p => {
            const nextA = appts.filter(a=>(a.patId===p.id || a.name===p.name) && a.status!=="anulada" && (a.fecha||offToISO(a.day||0))>=todayISO()).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""))[0];
            return (
              <button key={p.id} onClick={()=>onOpenFicha(p.id)} style={{ display:"flex", alignItems:"center", gap:11, width:"100%", textAlign:"left", ...glassPanel(T,12), padding:"11px 13px", cursor:"pointer" }}>
                <div style={{ width:38, height:38, borderRadius:"50%", background:T.accent+"22", color:T.accent, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans, fontSize:13, fontWeight:700, flexShrink:0 }}>{(p.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:T.sans, fontSize:14, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                  <div style={{ fontFamily:T.sans, fontSize:11, color:T.textMute, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{[p.rut,p.phone].filter(Boolean).join(" · ")}</div>
                </div>
                {nextA && <span style={{ flexShrink:0, fontFamily:T.sans, fontSize:9.5, color:T.accent, background:T.accent+"1c", borderRadius:999, padding:"3px 8px", whiteSpace:"nowrap" }}>{nextA.fecha===todayISO()?"Hoy "+nextA.time:nextA.fecha}</span>}
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
          <div style={{ width:56, height:56, borderRadius:"50%", background:T.accent+"22", color:T.accent, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.serif, fontSize:20, flexShrink:0 }}>{(p.name||"?").trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase()}</div>
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
  const monthKey = now.getFullYear()+"-"+now.getMonth();
  const inWeek = a => { const f = a.fecha||offToISO(a.day||0); const d = new Date(f+"T00:00:00"); return d >= weekStart; };
  const inMonth = a => { const f = a.fecha||offToISO(a.day||0); const d = new Date(f+"T00:00:00"); return (d.getFullYear()+"-"+d.getMonth())===monthKey; };
  const weekAppts = appts.filter(inWeek);
  const monthAppts = appts.filter(inMonth);
  const countBy = (list, pred) => list.filter(pred).length;
  const noShowRate = weekAppts.length ? Math.round(countBy(weekAppts, a=>a.status==="no_asistio") / weekAppts.filter(a=>a.status!=="anulada").length * 100) || 0 : 0;
  const porProc = {};
  monthAppts.forEach(a => { if (a.status==="anulada") return; const k = a.proc||"Sin especificar"; porProc[k] = (porProc[k]||0)+1; });
  const topProc = Object.keys(porProc).map(k=>({name:k,n:porProc[k]})).sort((a,b)=>b.n-a.n).slice(0,5);
  const maxProc = topProc[0] ? topProc[0].n : 1;

  const row = (label, val, color) => (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid "+(T.dark?"rgba(255,255,255,.08)":T.lineSoft) }}>
      <span style={{ fontFamily:T.sans, fontSize:13, color:T.textMute }}>{label}</span>
      <span style={{ fontFamily:T.sans, fontSize:14, fontWeight:600, color:color||T.text }}>{val}</span>
    </div>
  );

  return (
    <OverlayShell T={T} title="Reportes" onBack={onBack}>
      <div style={{ padding:"14px 16px 40px", display:"flex", flexDirection:"column", gap:16 }}>
        <div style={{ ...glassPanel(T,12), padding:"13px 16px" }}>
          <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:T.accent, marginBottom:4 }}>Esta semana</div>
          {row("Citas totales", weekAppts.filter(a=>a.status!=="anulada").length)}
          {row("Confirmadas", countBy(weekAppts, a=>a.status==="confirmada"||a.status==="atendida"), "#16A34A")}
          {row("Atendidas", countBy(weekAppts, a=>a.status==="atendida"||a.attended), "#1A50A3")}
          {row("No asistió", countBy(weekAppts, a=>a.status==="no_asistio"), "#C0285A")}
          {row("Canceladas", countBy(weekAppts, a=>a.status==="anulada"), T.textFaint)}
          {row("Tasa de inasistencia", noShowRate+"%", noShowRate>15?"#C0285A":"#16A34A")}
        </div>
        <div style={{ ...glassPanel(T,12), padding:"13px 16px" }}>
          <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:T.accent, marginBottom:10 }}>Procedimientos del mes</div>
          {topProc.length===0 && <div style={{ fontFamily:T.sans, fontSize:12, color:T.textFaint }}>Sin datos este mes.</div>}
          {topProc.map(t => (
            <div key={t.name} style={{ marginBottom:9 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontFamily:T.sans, fontSize:12, color:T.text, marginBottom:4 }}><span>{t.name}</span><span style={{ color:T.textMute }}>{t.n}</span></div>
              <div style={{ height:5, borderRadius:999, background:T.dark?"rgba(255,255,255,.1)":T.lineSoft, overflow:"hidden" }}><div style={{ height:"100%", width:Math.max(6,Math.round(t.n/maxProc*100))+"%", background:T.accent, borderRadius:999 }} /></div>
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
    <button onClick={onClick} style={{ display:"flex", alignItems:"center", gap:13, width:"100%", textAlign:"left", ...glassPanel(T,13), padding:"14px 15px", cursor:"pointer" }}>
      <div style={{ width:38, height:38, borderRadius:10, background:(danger?"#C0285A":T.accent)+"1e", color:danger?"#C0285A":T.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
      <span style={{ fontFamily:T.sans, fontSize:14, fontWeight:500, color:danger?"#C0285A":T.text, flex:1 }}>{label}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  );
  return (
    <div style={{ padding:"10px 16px 90px", display:"flex", flexDirection:"column", gap:9 }}>
      {item(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, "Pacientes", ()=>openOverlay("pacientes"))}
      {item(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4"/></svg>, "Reportes", ()=>openOverlay("reportes"))}
      <button onClick={()=>{ const b = document.getElementById("jcm-mob-rfab-icon2"); if(b){ b.style.transition="transform .55s"; b.style.transform="rotate(360deg)"; setTimeout(()=>{b.style.transition="";b.style.transform="";},600);} window.dispatchEvent(new CustomEvent("jcsaas:data")); }}
        style={{ display:"flex", alignItems:"center", gap:13, width:"100%", textAlign:"left", ...glassPanel(T,13), padding:"14px 15px", cursor:"pointer" }}>
        <div style={{ width:38, height:38, borderRadius:10, background:T.accent+"1e", color:T.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg id="jcm-mob-rfab-icon2" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
        </div>
        <span style={{ fontFamily:T.sans, fontSize:14, fontWeight:500, color:T.text, flex:1 }}>Actualizar datos</span>
      </button>
      <div style={{ height:1, background:T.dark?"rgba(255,255,255,.1)":T.lineSoft, margin:"8px 4px" }} />
      {item(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>, "Cerrar sesión", onLogout, true)}
    </div>
  );
}

/* ─── Contenedor de pantallas superpuestas (Pacientes/Ficha/Reportes) — navegación tipo iOS push ─── */
function OverlayShell({ T, title, onBack, children }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, ...mobileBg(T), display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" }}>
      <div style={{ padding:"calc(10px + env(safe-area-inset-top,0px)) 12px 10px", display:"flex", alignItems:"center", gap:8, ...glassChip(T), borderLeft:"none", borderRight:"none", borderTop:"none" }}>
        <button onClick={onBack} aria-label="Volver" style={{ width:36, height:36, borderRadius:"50%", border:"none", background:"none", color:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontFamily:T.serif, fontSize:18, color:T.text }}>{title}</span>
      </div>
      <div style={{ flex:1, overflowY:"auto" }}>{children}</div>
    </div>
  );
}

/* ─── Shell principal ─── */
function MobileShell({ T, D, onLogout }) {
  const [tab, setTab] = useState("citas");
  const [overlay, setOverlay] = useState(null); // null | "pacientes" | "reportes" | {type:"ficha", id}
  const [apptSheet, setApptSheet] = useState(null); // appt abierta en la hoja de acciones
  const [appts, setAppts] = useState(() => (window.DB&&window.DB.get("appointments"))||[]);
  const [patients, setPatients] = useState(() => (window.DB&&window.DB.get("patients"))||[]);

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
  const tabs = [
    { id:"citas",    lbl:"Citas",    icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
    { id:"horarios", lbl:"Horarios", icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
    { id:"nueva",    lbl:"Nueva",    icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 5v14M5 12h14"/></svg> },
    { id:"agenda",   lbl:"Agenda",   icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg> },
    { id:"mas",      lbl:"Más",      icon:<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg> },
  ];

  return (
    <div style={{ minHeight:"100dvh", ...mobileBg(T), display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ padding:"calc(11px + env(safe-area-inset-top,0px)) 16px 9px", display:"flex", justifyContent:"space-between", alignItems:"center", ...glassChip(T), borderLeft:"none", borderRight:"none", borderTop:"none", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <img src="/assets/medique-logo.png" alt="Medique" style={{ width:26, height:26, flexShrink:0 }} />
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:5, lineHeight:1 }}>
              <span style={{ fontFamily:T.serif, fontSize:16, fontWeight:400, color:T.text }}>Medique</span>
              {(() => { try { const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name; return n ? <span style={{ fontFamily:T.sans, fontSize:10.5, color:T.textMute }}>· {n}</span> : null; } catch(e) { return null; } })()}
            </div>
          </div>
        </div>
        {pendPago.length>0 && (
          <button onClick={()=>setTab("citas")} style={{ background:"#B8860B", color:"#fff", fontFamily:T.sans, fontSize:11, fontWeight:600, border:"none", borderRadius:999, padding:"5px 12px", cursor:"pointer" }}>
            {pendPago.length} pendiente{pendPago.length>1?"s":""}
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {tab==="citas"    && <HomeTab     T={T} appts={appts} patients={patients} onOpenAppt={setApptSheet} goTab={setTab} openOverlay={setOverlay} />}
        {tab==="horarios" && <HorariosTab T={T} appts={appts} />}
        {tab==="nueva"    && <NuevaWizard T={T} appts={appts} patients={patients} addAppt={addAppt} addPatient={addPatient} onDone={()=>setTab("citas")} />}
        {tab==="agenda"   && <AgendaTab   T={T} appts={appts} onOpenAppt={setApptSheet} goTab={setTab} />}
        {tab==="mas"      && <MasTab      T={T} openOverlay={setOverlay} onLogout={onLogout} />}
      </div>

      {/* Tab bar */}
      <div style={{ display:"flex", ...glassChip(T), borderLeft:"none", borderRight:"none", borderBottom:"none", paddingBottom:"env(safe-area-inset-bottom,8px)", position:"sticky", bottom:0 }}>
        {tabs.map(({id,lbl,icon})=>(
          <button key={id} onClick={()=>setTab(id)}
            style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"11px 4px 9px", background:"none", border:"none", cursor:"pointer",
              color:tab===id?T.accent:T.textFaint, fontFamily:T.sans, fontSize:9, letterSpacing:".07em", textTransform:"uppercase" }}>
            {icon}{lbl}
          </button>
        ))}
      </div>

      {/* Overlays de navegación tipo iOS push */}
      {overlay==="pacientes" && <PacientesOverlay T={T} patients={patients} appts={appts} addPatient={addPatient} onBack={()=>setOverlay(null)} onOpenFicha={(id)=>setOverlay({type:"ficha", id})} />}
      {overlay==="reportes" && <ReportesOverlay T={T} appts={appts} onBack={()=>setOverlay(null)} />}
      {overlay && overlay.type==="ficha" && <FichaOverlay T={T} patientId={overlay.id} patients={patients} appts={appts} updatePatient={updatePatient} onBack={()=>setOverlay(null)} />}

      {/* Hoja de acciones de una cita (estados oficiales) */}
      {apptSheet && (
        <ApptSheet T={T} appt={apptSheet} patients={patients} onClose={()=>setApptSheet(null)}
          updateAppt={updateAppt} cancelAppt={cancelAppt} restoreAppt={restoreAppt} confirmPago={confirmPago}
          onOpenFicha={(id)=>{ setApptSheet(null); setOverlay({type:"ficha", id}); }} />
      )}
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

  const inp = { width:"100%", fontFamily:T.sans, fontSize:16, padding:"14px 16px", borderRadius:10, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.08)", color:"#fff", outline:"none", boxSizing:"border-box" };
  const center = (kids) => <div style={{ minHeight:"100dvh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"30px 24px", ...mobileBg(T) }}>{kids}</div>;

  if (phase === "loading") return center(
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
      <img src="/assets/medique-logo.png" alt="Medique" style={{ width:36, height:36, marginBottom:6 }} />
      <div style={{ fontFamily:T.serif, fontSize:24, color:"#fff" }}>Medique</div>
      <div style={{ fontFamily:T.sans, fontSize:12, color:ON_PHOTO.mute }}>Conectando…</div>
    </div>
  );

  if (phase === "blocked") return center(<>
    <div style={{ fontFamily:T.serif, fontSize:26, color:"#fff", marginBottom:8 }}>Plan inactivo</div>
    <div style={{ fontFamily:T.sans, fontSize:13, color:ON_PHOTO.mute, textAlign:"center", maxWidth:300, marginBottom:18 }}>El acceso de tu clínica no está activo. Escríbenos para reactivarlo.</div>
    <button onClick={()=>window.JCSAAS.logout()} style={{ background:"none", border:"1px solid rgba(255,255,255,.25)", color:"#fff", fontFamily:T.sans, fontSize:12, borderRadius:10, padding:"12px 18px", cursor:"pointer" }}>Cerrar sesión</button>
  </>);

  if (view === "recover") return center(<>
    <div style={{ fontFamily:T.serif, fontSize:30, fontWeight:300, color:"#fff", marginBottom:6 }}>Recuperar contraseña</div>
    <div style={{ fontFamily:T.sans, fontSize:12.5, color:ON_PHOTO.mute, textAlign:"center", maxWidth:300, marginBottom:32, lineHeight:1.5 }}>Te enviaremos un enlace a tu correo para restablecerla.</div>
    <div style={{ width:"100%", maxWidth:340, display:"flex", flexDirection:"column", gap:12 }}>
      <input placeholder="Correo de tu cuenta" inputMode="email" data-nocap="" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doRecover()} style={inp} />
      {err && <div style={{ fontFamily:T.sans, fontSize:12, color:"#FF8FA3", textAlign:"center" }}>{err}</div>}
      {msg && <div style={{ fontFamily:T.sans, fontSize:12, color:"#7CDDA8", textAlign:"center" }}>{msg}</div>}
      <button onClick={doRecover} disabled={busy||!email.trim()} style={{ background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".14em", textTransform:"uppercase", border:"none", borderRadius:10, padding:"16px", cursor:"pointer", opacity:(busy||!email.trim())?.6:1, marginTop:4 }}>{busy?"Enviando…":"Enviar enlace"}</button>
      <button onClick={()=>{ setView("login"); setErr(""); setMsg(""); }} style={{ background:"none", border:"none", cursor:"pointer", color:T.accent, fontFamily:T.sans, fontSize:12, textDecoration:"underline", padding:6 }}>← Volver</button>
    </div>
  </>);

  return center(<>
    <div style={{ fontFamily:T.serif, fontSize:30, fontWeight:300, color:"#fff", marginBottom:6 }}>Confirmar citas</div>
    <div style={{ fontFamily:T.sans, fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:ON_PHOTO.mute, marginBottom:44 }}>Panel móvil · Acceso de tu clínica</div>
    <div style={{ width:"100%", maxWidth:340, display:"flex", flexDirection:"column", gap:12 }}>
      <input placeholder="Correo de tu clínica" inputMode="email" data-nocap="" value={email} onChange={e=>setEmail(e.target.value)} style={inp} />
      <input type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} style={inp} />
      {err && <div style={{ fontFamily:T.sans, fontSize:12, color:"#FF8FA3", textAlign:"center" }}>{err}</div>}
      <button onClick={doLogin} disabled={busy} style={{ background:T.accent, color:T.onAccent, fontFamily:T.sans, fontSize:12, letterSpacing:".14em", textTransform:"uppercase", border:"none", borderRadius:10, padding:"16px", cursor:"pointer", opacity:busy?.6:1, marginTop:4 }}>{busy?"…":"Entrar"}</button>
      <button onClick={()=>{ setView("recover"); setErr(""); setMsg(""); }} style={{ background:"none", border:"none", cursor:"pointer", color:T.accent, fontFamily:T.sans, fontSize:12, textDecoration:"underline", padding:6 }}>¿Olvidaste tu contraseña?</button>
    </div>
  </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  (window.JCSAAS && window.JCSAAS.enabled) ? <MobileSaasGate /> : <MobileAdmin />
);
