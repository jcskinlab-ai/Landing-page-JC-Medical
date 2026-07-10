var LOS_MEDIQUE_EMAIL = "makikarenina06@gmail.com";
function isLosMedique() {
  return true;
  try {
    if (!(window.JCSAAS && window.JCSAAS.enabled)) return false;
    var owner = ((window.JCSAAS.currentClinic && window.JCSAAS.currentClinic() || {}).ownerEmail || "").toString().trim().toLowerCase();
    var sess = window.JCSAAS.userEmail && window.JCSAAS.userEmail() || "";
    return owner === LOS_MEDIQUE_EMAIL || sess === LOS_MEDIQUE_EMAIL;
  } catch (e) {
    return false;
  }
}
function jcmMobileTheme(base) {
  if (!isLosMedique()) return base;
  var nav = base.dark ? { accent: "#7891A6", accentDeep: "#61798E", accentSoft: "rgba(120,145,166,.14)", gold: "#9AA6B2" } : { accent: "#5C7488", accentDeep: "#495F6D", accentSoft: "rgba(92,116,136,.12)", gold: "#8A929B" };
  return Object.assign({}, base, nav);
}
const HALF_HOURS = (() => {
  const s = [];
  for (let h = 8; h < 20; h++) {
    s.push((h < 10 ? "0" : "") + h + ":00");
    s.push((h < 10 ? "0" : "") + h + ":30");
  }
  return s;
})();
const QUARTER_HOURS = (() => {
  const s = [];
  for (let h = 8; h < 20; h++) {
    ["00", "15", "30", "45"].forEach((m) => s.push((h < 10 ? "0" : "") + h + ":" + m));
  }
  return s;
})();
function clinicSeededM() {
  try {
    if (!(window.JCSAAS && window.JCSAAS.enabled)) return true;
    const clinic = window.JCSAAS.currentClinic && window.JCSAAS.currentClinic() || {};
    return clinic.isBase === true || (clinic.ownerEmail || "").toLowerCase() === "jc.skinlab@gmail.com";
  } catch (e) {
    return false;
  }
}
function slotsM() {
  return clinicSeededM() ? QUARTER_HOURS : HALF_HOURS;
}
const WDS = ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"];
const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const MESES_LARGOS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DOW_FULL = ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "S\xE1bado"];
function clinicMapsLinkM() {
  try {
    const m = window.DB && window.DB.cfg && window.DB.cfg().clinic_maps;
    if (m && ("" + m).trim()) return ("" + m).trim();
  } catch (e) {
  }
  let addr = "";
  try {
    const d = window.DB && window.DB.cfg && window.DB.cfg().clinic_addr;
    addr = d && ("" + d).trim() || "";
  } catch (e) {
  }
  if (!addr) return "";
  let cid = "";
  try {
    cid = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId() || "";
  } catch (e) {
  }
  return cid ? "https://www.medique.cl/ir?c=" + encodeURIComponent(cid) : "https://www.medique.cl/ir?to=" + encodeURIComponent(addr);
}
function esControlPostProcM(proc, pat) {
  if (!/evaluaci/i.test(proc || "")) return false;
  const hist = pat && Array.isArray(pat.history) ? pat.history : [];
  return hist.some((h) => h && h.proc && !/evaluaci/i.test(h.proc));
}
function jcmCitaConfirmMsgM(name, iso, time, proc, prof, clinNombre, clinDir, esControl) {
  const d = /* @__PURE__ */ new Date(iso + "T12:00:00");
  const wd = WDS[d.getDay()], dd = d.getDate(), mm = MESES[d.getMonth()];
  const maps = clinicMapsLinkM();
  let tpl = "";
  try {
    tpl = window.DB && window.DB.cfg && window.DB.cfg().msg_tpl_confirm;
  } catch (e) {
  }
  tpl = tpl && ("" + tpl).trim() || window.DEFAULT_TPL_CONFIRM;
  const politica = esControl ? " El primer reagendamiento es gratuito; desde el segundo tiene un costo de $10.000." : "";
  return window.fillMsgTpl(tpl, { nombre: name, clinica: clinNombre, fecha: wd + " " + dd + " " + mm, hora: time, tratamiento: proc, profesional: prof || "", direccion: clinDir || "", mapa: maps || "", politica });
}
function jcmConfirmAsistMsgM(a, clinNombre) {
  const maps = clinicMapsLinkM();
  let fecha = "";
  try {
    if (a.fecha) fecha = (/* @__PURE__ */ new Date(a.fecha + "T00:00:00")).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
  } catch (e) {
  }
  let tpl = "";
  try {
    tpl = window.DB && window.DB.cfg && window.DB.cfg().msg_tpl_asist;
  } catch (e) {
  }
  tpl = tpl && ("" + tpl).trim() || window.DEFAULT_TPL_ASIST;
  return window.fillMsgTpl(tpl, { nombre: a.name || "", clinica: clinNombre, fecha: fecha || "", hora: a.time || "", tratamiento: a.proc || "", mapa: maps || "" });
}
function minsM(t) {
  if (!t) return 0;
  const [h, m] = t.split(":");
  return parseInt(h) * 60 + parseInt(m || 0);
}
const STATUS_STEPS = [
  { key: "pendiente", label: "Agendado" },
  { key: "confirmada", label: "Confirmado" },
  { key: "atendida", label: "Atendido" },
  { key: "no_asistio", label: "No asisti\xF3" },
  { key: "anulada", label: "Cancelar" }
];
function apptStateM(a, T) {
  if (a.status === "anulada") return { label: "Cancelada", color: T.textFaint };
  if (a.status === "no_asistio") return { label: "No asisti\xF3", color: "#FF6B7D" };
  if (a.attended || a.status === "atendida") return { label: "Atendida", color: "#F5B93D" };
  if (a.status === "confirmada") return { label: "Confirmada", color: "#46D27A" };
  if (a.status === "pendiente_pago") return { label: "\u23F3 Transferencia", color: "#F5B93D" };
  return { label: "Agendado", color: "#6EA8E8" };
}
function localISO(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function todayISO() {
  return localISO(/* @__PURE__ */ new Date());
}
function offToISO(off) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + off);
  return localISO(d);
}
function isoToDayOff(iso) {
  const d = /* @__PURE__ */ new Date(iso + "T00:00:00"), t = /* @__PURE__ */ new Date();
  t.setHours(0, 0, 0, 0);
  return Math.round((d - t) / 864e5);
}
function inCurrentMonth(iso) {
  const now = /* @__PURE__ */ new Date(), d = /* @__PURE__ */ new Date(iso + "T00:00:00");
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}
function dayLabelM(iso) {
  const off = isoToDayOff(iso);
  if (off === 0) return "Hoy";
  if (off === 1) return "Ma\xF1ana";
  if (off === -1) return "Ayer";
  const d = /* @__PURE__ */ new Date(iso + "T00:00:00");
  return WDS[d.getDay()] + " " + d.getDate() + " " + MESES[d.getMonth()];
}
function procList() {
  try {
    return window.JCDATA.catalog.reduce((a, s) => {
      s.groups.forEach((g) => g.items.forEach((it) => a.push(it.n)));
      return a;
    }, []);
  } catch (e) {
    return [];
  }
}
function durOf(a) {
  const d = a.dur || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) + " min" : "30 min");
  return ("" + d).replace(/\s*minutos?\b/i, " min").trim();
}
const ON_PHOTO = { text: "#F5F7FB", mute: "rgba(235,242,252,.72)", faint: "rgba(235,242,252,.5)" };
const SF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', system-ui, Roboto, sans-serif";
const FRAUNCES = "'Fraunces', Georgia, serif";
function photoTheme(T) {
  return Object.assign({}, T, {
    dark: true,
    // fuerza la rama "glass oscuro" en glassPanel/glassChip
    text: ON_PHOTO.text,
    textMute: ON_PHOTO.mute,
    textFaint: ON_PHOTO.faint,
    line: "rgba(255,255,255,.16)",
    lineSoft: "rgba(255,255,255,.09)",
    serif: SF,
    sans: SF,
    // toda la tipografía del móvil en SF Pro (como el mockup)
    // Acento SLATE apagado (navyAccent del portal — el mismo que reemplazó al celeste/turquesa
    // "saturado" en jc-admin.jsx): #7891A6 en oscuro. Reemplaza al azul vivo anterior.
    accent: "#7891A6",
    accentSoft: "rgba(120,145,166,.16)",
    onAccent: "#FFFFFF"
  });
}
function glassPanel(T, radius) {
  return {
    background: "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.03) 45%, rgba(255,255,255,.045) 100%)",
    backdropFilter: "blur(28px) saturate(1.5)",
    WebkitBackdropFilter: "blur(28px) saturate(1.5)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: radius == null ? 20 : radius,
    boxShadow: "0 18px 42px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.14)"
  };
}
function glassChip(T) {
  return {
    background: "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.025) 45%, rgba(255,255,255,.04) 100%)",
    backdropFilter: "blur(16px) saturate(1.4)",
    WebkitBackdropFilter: "blur(16px) saturate(1.4)",
    border: "1px solid rgba(255,255,255,.1)"
  };
}
const MOBILE_BG_OVERLAY = "linear-gradient(180deg, rgba(9,13,22,.6), rgba(8,12,20,.68) 50%, rgba(6,10,17,.8))";
function PhotoBgLayers() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: -24, backgroundImage: "url('/assets/everest-mobile.jpg?v=11')", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", filter: "blur(22px)", transform: "scale(1.08)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: MOBILE_BG_OVERLAY } }));
}
function LoginVideoBg({ children }) {
  const overlay = "linear-gradient(rgba(9,11,15,.76), rgba(9,11,15,.90))";
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", minHeight: "100dvh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 24px", backgroundColor: "#070707" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: -24, backgroundImage: "url('/assets/everest-mobile.jpg?v=11')", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", filter: "blur(22px)", transform: "scale(1.08)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: overlay } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center" } }, children));
}
function consentPendingM(patients, appts) {
  appts = appts || [];
  const rutN = (r) => ("" + (r || "")).replace(/[^0-9kK]/g, "").toLowerCase();
  const telN = (t) => ("" + (t || "")).replace(/\D/g, "").slice(-8);
  const needId = /* @__PURE__ */ new Set(), needNm = /* @__PURE__ */ new Set(), needRut = /* @__PURE__ */ new Set(), needTel = /* @__PURE__ */ new Set();
  appts.forEach((a) => {
    if (["anulada", "cancelada", "no_asistio", "atendida"].indexOf(a.status) >= 0 || a.attended) return;
    if (/evaluaci/i.test(a.proc || "")) return;
    if (a.patId) needId.add(a.patId);
    const nm = (a.name || "").toLowerCase().trim();
    if (nm) needNm.add(nm);
    const r = rutN(a.rut);
    if (r.length >= 6) needRut.add(r);
    const t = telN(a.phone);
    if (t.length === 8) needTel.add(t);
  });
  return (patients || []).filter((p) => {
    if (p.consent) return false;
    if (needId.has(p.id)) return true;
    if (needNm.has((p.name || "").toLowerCase().trim())) return true;
    const r = rutN(p.rut);
    if (r.length >= 6 && needRut.has(r)) return true;
    const t = telN(p.phone);
    if (t.length === 8 && needTel.has(t)) return true;
    return false;
  });
}
function patientsAll() {
  try {
    return window.DB && window.DB.get("patients") || [];
  } catch (e) {
    return [];
  }
}
function savePatientsM(list) {
  try {
    window.DB && window.DB.set("patients", list);
  } catch (e) {
  }
}
function addPatientM(p) {
  const np = { id: "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), name: "", rut: "", phone: "", email: "", age: 0, notas: "", ...p };
  savePatientsM([...patientsAll(), np]);
  return np;
}
function updatePatientM(id, patch) {
  savePatientsM(patientsAll().map((x) => x.id === id ? { ...x, ...patch } : x));
}
function matchPatientForApptM(appt, patients) {
  const clean = (s) => (s || "").replace(/\D/g, "");
  const an = (appt.name || "").toLowerCase().trim();
  let found = patients.find((x) => (x.name || "").toLowerCase().trim() === an);
  if (found) return found;
  const ap = clean(appt.phone || "");
  if (ap.length >= 8) found = patients.find((x) => {
    const xp = clean(x.phone || "");
    return xp.length >= 8 && xp.slice(-8) === ap.slice(-8);
  });
  if (found) return found;
  if (an.length >= 4) found = patients.find((x) => {
    const xn = (x.name || "").toLowerCase();
    return xn.startsWith(an.split(" ")[0]) || an.startsWith(xn.split(" ")[0]);
  });
  return found || null;
}
function LoginScreen({ T, onAuth }) {
  const setup = !window.jcmAdminHasPass || !window.jcmAdminHasPass();
  const [user, setUser] = useState(setup ? "admin" : "");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit() {
    if (!pass.trim()) return;
    setBusy(true);
    setErr("");
    try {
      const storedUser = window.jcmAdminUser && window.jcmAdminUser() || user || "admin";
      const r = setup ? await window.jcmAdminSetPass(pass, user || "admin") : await window.jcmAdminCheck(storedUser, pass);
      if (!r.ok) {
        setErr(r.msg);
        setBusy(false);
        return;
      }
      window.jcmAdminStartSession && window.jcmAdminStartSession();
      onAuth();
    } catch (e) {
      setErr("Error de conexi\xF3n");
      setBusy(false);
    }
  }
  const SERIF = FRAUNCES;
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 16, padding: "14px 16px", borderRadius: 6, border: "1px solid rgba(255,255,255,.14)", background: "rgba(20,22,28,.85)", color: "#fff", outline: "none", boxSizing: "border-box" };
  const btnSober = { width: "100%", background: "rgba(235,238,242,.92)", color: "#15181D", fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", border: "none", borderRadius: 6, padding: "14px", cursor: "pointer", marginTop: 4 };
  return /* @__PURE__ */ React.createElement(LoginVideoBg, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent, textAlign: "center" } }, "Medique \xB7 Panel m\xF3vil"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: SERIF, fontWeight: 300, fontSize: 34, color: "#fff", textAlign: "center", margin: "12px 0 6px", lineHeight: 1.05 } }, "Acceso privado"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: ON_PHOTO.mute, textAlign: "center", lineHeight: 1.6, margin: "0 0 22px" } }, "Accede al panel de tu cl\xEDnica."), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", display: "flex", flexDirection: "column", gap: 11 } }, setup && /* @__PURE__ */ React.createElement("input", { placeholder: "Usuario", value: user, onChange: (e) => setUser(e.target.value), style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: "Contrase\xF1a del panel", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => e.key === "Enter" && submit(), style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A", textAlign: "center" } }, err), /* @__PURE__ */ React.createElement("button", { onClick: submit, disabled: busy, style: { ...btnSober, opacity: busy ? 0.6 : 1 } }, busy ? "\u2026" : setup ? "Crear acceso" : "Entrar")));
}
function ApptSheet({ T, appt: a, patients, onClose, updateAppt, cancelAppt, restoreAppt, confirmPago, onOpenFicha }) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [editCom, setEditCom] = useState(false);
  const [comTxt, setComTxt] = useState(a.comentario || "");
  const [edit, setEdit] = useState(false);
  const [ef, setEf] = useState({ fecha: a.fecha || todayISO(), time: a.time || "10:00", dur: (parseInt(a.dur) || 30) + "", proc: a.proc || "" });
  const procOpts = (() => {
    try {
      return (window.JCDATA && window.JCDATA.catalog ? procList() : []) || [];
    } catch (e) {
      return [];
    }
  })();
  const isPend = a.status === "pendiente_pago";
  const isAnulada = a.status === "anulada";
  const st = apptStateM(a, T);
  const clinNombre = (() => {
    try {
      const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name;
      return n && ("" + n).trim() || "la cl\xEDnica";
    } catch (e) {
      return "la cl\xEDnica";
    }
  })();
  const clinDir = (() => {
    try {
      const d = window.DB && window.DB.cfg && window.DB.cfg().clinic_addr;
      return d && ("" + d).trim() || "";
    } catch (e) {
      return "";
    }
  })();
  const rawPhone = (a.phone || "").replace(/\D/g, "");
  const waPhone = rawPhone.length >= 8 ? rawPhone : "";
  const durLabel = durOf(a);
  const matched = useMemo(() => matchPatientForApptM(a, patients || []), [a, patients]);
  function setStatus(key) {
    if (key === "anulada") {
      setConfirmCancel(true);
      return;
    }
    updateAppt(a.id, { status: key === "pendiente" ? "pendiente" : key, attended: key === "atendida" });
    onClose();
  }
  const card = { ...glassPanel(T, 22), width: "100%", maxWidth: 480, maxHeight: "88dvh", overflowY: "auto", padding: "10px 18px calc(22px + env(safe-area-inset-bottom,0px))", boxSizing: "border-box" };
  const inp = { width: "100%", boxSizing: "border-box", fontFamily: T.sans, fontSize: 14, padding: "11px 13px", borderRadius: 9, border: "1px solid " + (T.dark ? "rgba(255,255,255,.16)" : T.line), background: T.dark ? "rgba(0,0,0,.25)" : "#fff", color: T.text, outline: "none" };
  return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, style: { position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "rgba(0,0,0,.55)" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: card }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 4, borderRadius: 2, background: T.dark ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.18)", margin: "6px auto 14px" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: "50%", background: st.color + "26", color: st.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 15, fontWeight: 700, flexShrink: 0 } }, (a.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, fontWeight: 600, color: T.text, lineHeight: 1.15 } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 2 } }, a.time, " \xB7 ", a.proc || "\u2014", " \xB7 ", durLabel), matched && /* @__PURE__ */ React.createElement("button", { onClick: () => onOpenFicha(matched.id), style: { marginTop: 4, background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5, color: T.accent, textDecoration: "underline" } }, "Ver ficha del paciente \u2192")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, "aria-label": "Cerrar", style: { flexShrink: 0, width: 44, height: 44, borderRadius: "50%", border: "none", background: T.dark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.06)", color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), isPend && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        confirmPago(a.id);
        onClose();
      },
      style: { width: "100%", background: "#1F8A5B", color: "#fff", fontFamily: T.sans, fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", border: "none", borderRadius: 10, padding: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2.5" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" })),
    "Confirmar transferencia"
  ), isAnulada ? /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 10, lineHeight: 1.5 } }, "Esta cita est\xE1 cancelada. Restaurarla la vuelve a dejar agendada y ocupa el horario nuevamente."), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    restoreAppt(a.id);
    onClose();
  }, style: { width: "100%", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, border: "none", borderRadius: 10, padding: "14px", cursor: "pointer" } }, "Restaurar cita")) : /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Estado de la cita"), !confirmCancel ? /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 } }, STATUS_STEPS.map((s) => {
    const on = (s.key === "pendiente" ? a.status === "pendiente" || !a.status : a.status === s.key) || s.key === "atendida" && a.attended;
    const isCancelBtn = s.key === "anulada";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s.key,
        onClick: () => setStatus(s.key),
        style: {
          fontFamily: T.sans,
          fontSize: 12.5,
          fontWeight: on ? 700 : 500,
          padding: "12px 8px",
          borderRadius: 9,
          cursor: "pointer",
          gridColumn: isCancelBtn ? "1 / -1" : void 0,
          border: "1px solid " + (isCancelBtn ? "#C0285A55" : on ? T.accent : T.dark ? "rgba(255,255,255,.14)" : T.line),
          background: isCancelBtn ? "transparent" : on ? T.accent : T.dark ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.6)",
          color: isCancelBtn ? "#C0285A" : on ? T.onAccent : T.text
        }
      },
      s.label
    );
  })) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setConfirmCancel(false), style: { flex: 1, padding: "13px", borderRadius: 9, border: "1px solid " + T.line, background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 12.5, cursor: "pointer" } }, "Volver"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    cancelAppt(a.id);
    onClose();
  }, style: { flex: 1, padding: "13px", borderRadius: 9, border: "none", background: "#C0285A", color: "#fff", fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, cursor: "pointer" } }, "S\xED, cancelar cita"))), editCom ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("textarea", { value: comTxt, onChange: (e) => setComTxt(e.target.value), placeholder: "Ej. Evaluaci\xF3n de botox, control rinomodelaci\xF3n\u2026", rows: 2, autoFocus: true, style: { ...inp, resize: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setEditCom(false), style: { flex: 1, height: 36, borderRadius: 8, border: "1px solid " + T.line, background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 12, cursor: "pointer" } }, "Cancelar"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    updateAppt(a.id, { comentario: comTxt.trim() });
    setEditCom(false);
  }, style: { flex: 2, height: 36, borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "Guardar"))) : /* @__PURE__ */ React.createElement("button", { onClick: () => setEditCom(true), style: { display: "flex", alignItems: "center", gap: 8, width: "100%", ...glassChip(T), borderRadius: 9, padding: "10px 12px", cursor: "pointer", textAlign: "left", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: a.comentario ? T.text : T.textMute, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.comentario || "Agregar comentario")), edit ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, ...glassChip(T), borderRadius: 10, padding: "12px 13px", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent } }, "Editar cita"), /* @__PURE__ */ React.createElement("label", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Fecha", /* @__PURE__ */ React.createElement("input", { type: "date", value: ef.fecha, onChange: (e) => setEf((f) => ({ ...f, fecha: e.target.value })), style: { ...inp, marginTop: 3 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("label", { style: { flex: 1, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Hora", /* @__PURE__ */ React.createElement("select", { value: ef.time, onChange: (e) => setEf((f) => ({ ...f, time: e.target.value })), style: { ...inp, marginTop: 3 } }, slotsM().map((h) => /* @__PURE__ */ React.createElement("option", { key: h, value: h }, h)), slotsM().indexOf(ef.time) < 0 && /* @__PURE__ */ React.createElement("option", { value: ef.time }, ef.time))), /* @__PURE__ */ React.createElement("label", { style: { flex: 1, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Duraci\xF3n", /* @__PURE__ */ React.createElement("select", { value: ef.dur, onChange: (e) => setEf((f) => ({ ...f, dur: e.target.value })), style: { ...inp, marginTop: 3 } }, ["15", "30", "45", "60", "90", "120"].map((d) => /* @__PURE__ */ React.createElement("option", { key: d, value: d }, d, " min"))))), /* @__PURE__ */ React.createElement("label", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Procedimiento", procOpts.length ? /* @__PURE__ */ React.createElement("select", { value: ef.proc, onChange: (e) => setEf((f) => ({ ...f, proc: e.target.value })), style: { ...inp, marginTop: 3 } }, [ef.proc, ...procOpts.filter((p) => p !== ef.proc)].filter(Boolean).map((p) => /* @__PURE__ */ React.createElement("option", { key: p, value: p }, p))) : /* @__PURE__ */ React.createElement("input", { value: ef.proc, onChange: (e) => setEf((f) => ({ ...f, proc: e.target.value })), placeholder: "Procedimiento", style: { ...inp, marginTop: 3 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 2 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setEdit(false), style: { flex: 1, height: 38, borderRadius: 8, border: "1px solid " + T.line, background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 12, cursor: "pointer" } }, "Cancelar"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    updateAppt(a.id, { fecha: ef.fecha, day: isoToDayOff(ef.fecha), time: ef.time, dur: ef.dur + " minutos", proc: ef.proc });
    setEdit(false);
  }, style: { flex: 2, height: 38, borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "Guardar cambios"))) : /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setEf({ fecha: a.fecha || todayISO(), time: a.time || "10:00", dur: (parseInt(a.dur) || 30) + "", proc: a.proc || "" });
    setEdit(true);
  }, style: { display: "flex", alignItems: "center", gap: 8, width: "100%", ...glassChip(T), borderRadius: 9, padding: "10px 12px", cursor: "pointer", textAlign: "left", color: T.text, fontFamily: T.sans, fontSize: 12.5, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M12 20h9" }), /* @__PURE__ */ React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" })), "Editar fecha, hora, duraci\xF3n o procedimiento"), waPhone && // Mismo mensaje que el botón "Confirmar asistencia" del portal de escritorio
  // (jcmConfirmAsistMsg): pide responder SÍ/NO, con fecha/hora en español y cómo llegar.
  /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://wa.me/56" + waPhone.replace(/^(56|0)/, "") + "?text=" + encodeURIComponent(jcmConfirmAsistMsgM(a, clinNombre)),
      target: "_blank",
      rel: "noopener",
      style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#1F8A5B22", border: "1px solid #1F8A5B55", borderRadius: 9, padding: "12px", textDecoration: "none", color: "#1F8A5B", fontFamily: T.sans, fontSize: 12.5, fontWeight: 500 }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "#1F8A5B" }, /* @__PURE__ */ React.createElement("path", { d: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" })),
    "Confirmar asistencia"
  )));
}
function occupancyForOff(appts, off) {
  try {
    const iso = offToISO(off);
    const wd = (/* @__PURE__ */ new Date(iso + "T12:00:00")).getDay();
    let weekly = slotsM().slice();
    const h = window.DB && window.DB.get("horarios_v1");
    if (h && h[wd]) {
      weekly = h[wd].open === false ? [] : h[wd].slots || slotsM().slice();
    }
    const map = window.DB && window.DB.get("horarios_dates") || {};
    const avail = map[iso] != null ? map[iso] : weekly;
    const occupied = /* @__PURE__ */ new Set();
    appts.filter((a) => a.status !== "anulada" && (a.fecha || offToISO(a.day || 0)) === iso).forEach((a) => {
      if (!a.time) return;
      const start = minsM(a.time);
      const dur = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
      slotsM().forEach((s) => {
        const m = minsM(s);
        if (m >= start && m < start + dur) occupied.add(s);
      });
    });
    const cap = (/* @__PURE__ */ new Set([...avail, ...occupied])).size;
    return cap ? Math.round(occupied.size / cap * 100) : 0;
  } catch (e) {
    return 0;
  }
}
function DaySummary({ T, c, p, na, prefix, bars }) {
  const dot = (color, txt) => /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: bars ? 12 : 10.5, color: T.textMute } }, txt));
  const sep = bars ? /* @__PURE__ */ React.createElement("span", { style: { width: 1, height: 14, background: "rgba(255,255,255,.14)" } }) : /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint } }, "\xB7");
  return /* @__PURE__ */ React.createElement("div", { style: { ...glassChip(T), borderRadius: bars ? 14 : 12, padding: bars ? "11px 10px" : "9px 12px", display: "flex", alignItems: "center", justifyContent: bars ? "space-around" : "center", gap: 8, flexWrap: "wrap" } }, dot("#46D27A", (prefix ? prefix + " " : "") + c + " confirmada" + (c === 1 ? "" : "s")), sep, dot("#6EA8E8", p + " pendiente" + (p === 1 ? "" : "s")), sep, dot("#FF6B7D", na + " no asisti\xF3"));
}
function HomeTab({ T, appts, patients, onOpenAppt, goTab, openOverlay }) {
  const today = todayISO();
  const yestISO = offToISO(-1);
  const active = appts.filter((a) => a.status !== "anulada");
  const [q, setQ] = useState("");
  const ql = q.trim().toLowerCase();
  const searchMatches = !ql ? [] : active.filter((a) => (a.name || "").toLowerCase().includes(ql) || (a.rut || "").toLowerCase().includes(ql) || (a.proc || "").toLowerCase().includes(ql) && inCurrentMonth(a.fecha || offToISO(a.day || 0)));
  const searchResults = searchMatches.map((a) => ({ a, off: isoToDayOff(a.fecha || offToISO(a.day || 0)) })).sort((x, y) => {
    const dx = Math.abs(x.off), dy = Math.abs(y.off);
    return dx !== dy ? dx - dy : y.off - x.off;
  }).slice(0, 40).map((x) => x.a);
  const todayAppts = active.filter((a) => (a.fecha || offToISO(a.day || 0)) === today).sort((a, b) => minsM(a.time) - minsM(b.time));
  const yestCount = active.filter((a) => (a.fecha || offToISO(a.day || 0)) === yestISO).length;
  const confirmadas = todayAppts.filter((a) => a.status === "confirmada" || a.status === "atendida" || a.attended).length;
  const pendientes = todayAppts.filter((a) => !(a.status === "confirmada" || a.status === "atendida" || a.attended || a.status === "anulada")).length;
  const delta = todayAppts.length - yestCount;
  const pct = (n) => todayAppts.length ? Math.round(n / todayAppts.length * 100) : 0;
  const ocup = occupancyForOff(appts, 0);
  const ocupDelta = ocup - occupancyForOff(appts, -1);
  const vsAyer = (n, unit) => n > 0 ? "+" + n + (unit || "") + " vs ayer" : n < 0 ? "\u2212" + Math.abs(n) + (unit || "") + " vs ayer" : "igual que ayer";
  const cToday = todayAppts.filter((a) => a.status === "confirmada" || a.status === "atendida" || a.attended).length;
  const naToday = todayAppts.filter((a) => a.status === "no_asistio").length;
  const pToday = todayAppts.length - cToday - naToday;
  const upcoming = active.filter((a) => (a.fecha || offToISO(a.day || 0)) >= today).sort((a, b) => {
    const fa = a.fecha || offToISO(a.day || 0), fb = b.fecha || offToISO(b.day || 0);
    return fa < fb ? -1 : fa > fb ? 1 : minsM(a.time) - minsM(b.time);
  }).slice(0, 8);
  const upcomingByDay = [];
  upcoming.forEach((a) => {
    const f = a.fecha || offToISO(a.day || 0);
    const g = upcomingByDay[upcomingByDay.length - 1];
    if (g && g.fecha === f) g.items.push(a);
    else upcomingByDay.push({ fecha: f, items: [a] });
  });
  const clinNombre = (() => {
    try {
      const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name;
      return n && ("" + n).trim() || "";
    } catch (e) {
      return "";
    }
  })();
  const fechaLarga = (() => {
    const d = /* @__PURE__ */ new Date();
    const s = DOW_FULL[d.getDay()] + ", " + d.getDate() + " de " + MESES_LARGOS[d.getMonth()].toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  })();
  const kpi = (label, val, sub, subColor) => /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, ...glassPanel(T, 14), padding: "6px 8px 6px", display: "flex", flexDirection: "column", gap: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".02em", textTransform: "uppercase", color: T.textMute, lineHeight: 1.25 } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: FRAUNCES, fontSize: 21, fontWeight: 500, color: T.text, lineHeight: 1.1, letterSpacing: "-.01em" } }, val), sub && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: subColor || T.textMute, lineHeight: 1.2 } }, sub));
  const avatarSrc = (() => {
    try {
      return localStorage.getItem("jcm_admin_photo") || "";
    } catch (e) {
      return "";
    }
  })();
  const ini = (clinNombre || "JC").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const action = (icon, label, onClick, primary) => /* @__PURE__ */ React.createElement("button", { onClick, style: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    minHeight: 46,
    minWidth: 0,
    cursor: "pointer",
    borderRadius: 11,
    background: primary ? T.accentSoft : "rgba(255,255,255,.035)",
    border: "1px solid " + (primary ? "rgba(120,145,166,.4)" : "rgba(255,255,255,.08)"),
    padding: "6px 3px"
  } }, primary ? /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: T.accent, color: "#fff", boxShadow: "0 4px 10px -4px " + T.accent } }, icon) : /* @__PURE__ */ React.createElement("div", { style: { height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "#A9BAC7" } }, icon), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, fontWeight: 500, lineHeight: 1.1, textAlign: "center", color: T.text } }, label));
  const searchBar = /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, ...glassChip(T), borderRadius: 13, padding: "0 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4-4" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nombre, RUT o procedimiento\u2026", style: { flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontFamily: T.sans, fontSize: 13.5, padding: "11px 0" } }), q && /* @__PURE__ */ React.createElement("button", { onClick: () => setQ(""), "aria-label": "Limpiar b\xFAsqueda", style: { flexShrink: 0, width: 44, height: 44, margin: "0 -12px 0 -6px", background: "none", border: "none", color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
  const searchResultsBody = /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 14 } }, searchMatches.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 14), padding: "22px 16px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, 'Sin resultados para "', q.trim(), '".'), searchMatches.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, padding: "0 2px 2px" } }, searchMatches.length, " ", searchMatches.length === 1 ? "resultado" : "resultados", ' para "', q.trim(), '"'), searchResults.map((a) => {
    const st = apptStateM(a, T);
    return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer", background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, overflow: "hidden", padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", title: st.label, style: { width: 9, height: 9, borderRadius: "50%", background: st.color, flexShrink: 0, boxShadow: "0 0 0 3px color-mix(in srgb, " + st.color + " 24%, transparent)" } }), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.textMute, minWidth: 78 } }, dayLabelM(a.fecha || offToISO(a.day || 0)), " ", a.time), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: st.color, background: "color-mix(in srgb, " + st.color + " 20%, transparent)", borderRadius: 6, padding: "3px 7px" } }, abbrevProcM(a.proc)));
  })));
  return (
    // Pedido: los KPI y los accesos rápidos quedan FIJOS — solo la lista de "Próximas citas"
    // scrollea. Por eso el contenedor ocupa todo el alto y su bloque superior no se desplaza.
    /* @__PURE__ */ React.createElement("div", { style: { height: "100%", display: "flex", flexDirection: "column", padding: "12px 16px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7 } }, kpi("Citas hoy", todayAppts.length, vsAyer(delta)), kpi("Confirmadas", confirmadas, pct(confirmadas) + "% del total"), kpi("Pendientes", pendientes, pct(pendientes) + "% del total"), kpi("Ocupaci\xF3n", ocup + "%", vsAyer(ocupDelta, " pts"))), todayAppts.length > 0 && /* @__PURE__ */ React.createElement(DaySummary, { T, c: cToday, p: pToday, na: naToday, prefix: "Hoy:" }), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 18), display: "flex", gap: 7, padding: 7 } }, action(/* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })), "Nueva cita", () => goTab("nueva"), true), action(/* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })), "Pacientes", () => openOverlay("pacientes")), action(/* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 6v6l4 2" })), "Bloquear horario", () => goTab("horarios")), action(/* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" })), "Reportes", () => openOverlay("reportes"))), searchBar), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column", marginTop: 12 } }, ql ? searchResultsBody : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.text } }, "Pr\xF3ximas citas"), /* @__PURE__ */ React.createElement("button", { onClick: () => goTab("agenda"), style: { background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.accent, display: "flex", alignItems: "center", gap: 3 } }, "Ver agenda ", /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 14 } }, upcoming.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 14), padding: "26px 18px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.5 } }, "No tienes pr\xF3ximas citas.", /* @__PURE__ */ React.createElement("br", null), "Agenda la primera para empezar el d\xEDa."), /* @__PURE__ */ React.createElement("button", { onClick: () => goTab("nueva"), style: { display: "inline-flex", alignItems: "center", gap: 6, ...glassChip(T), borderRadius: 10, padding: "9px 15px", color: T.text, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })), "Nueva cita")), upcoming.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, upcomingByDay.map((g) => /* @__PURE__ */ React.createElement("div", { key: g.fecha }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, fontWeight: 600, padding: "0 0 6px" } }, dayLabelM(g.fecha)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, g.items.map((a) => {
      const st = apptStateM(a, T);
      return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer", background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, overflow: "hidden", padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", title: st.label, style: { width: 9, height: 9, borderRadius: "50%", background: st.color, flexShrink: 0, boxShadow: "0 0 0 3px color-mix(in srgb, " + st.color + " 24%, transparent)" } }), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: FRAUNCES, fontSize: 13, fontWeight: 500, color: T.text } }, a.time), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: st.color, background: "color-mix(in srgb, " + st.color + " 20%, transparent)", borderRadius: 6, padding: "3px 7px" } }, abbrevProcM(a.proc)));
    })))))))))
  );
}
function HorariosTab({ T, appts }) {
  const today = todayISO();
  const [selDay, setSelDay] = useState(today);
  const stripDays = useMemo(() => {
    const arr = [];
    for (let i = -14; i <= 60; i++) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() + i);
      const iso = localISO(d);
      arr.push({ iso, wd: WDS[d.getDay()], dd: d.getDate(), isToday: iso === today });
    }
    return arr;
  }, [today]);
  const dayBtnRefs = useRef({});
  useEffect(() => {
    const el = dayBtnRefs.current[selDay];
    if (el && el.scrollIntoView) el.scrollIntoView({ inline: "center", block: "nearest" });
  }, [selDay]);
  const [slotsMap, setSlotsMap] = useState(() => window.DB && window.DB.get("horarios_dates") || {});
  useEffect(() => {
    function reload() {
      setSlotsMap(window.DB && window.DB.get("horarios_dates") || {});
    }
    window.addEventListener("jcsaas:data", reload);
    return () => window.removeEventListener("jcsaas:data", reload);
  }, []);
  const weeklySlots = (() => {
    try {
      var h = window.DB && window.DB.get("horarios_v1");
      var wd = (/* @__PURE__ */ new Date(selDay + "T12:00:00")).getDay();
      if (h && h[wd] && h[wd].open !== false) return h[wd].slots || slotsM().slice();
      if (h && h[wd] && h[wd].open === false) return [];
    } catch (e) {
    }
    return slotsM().slice();
  })();
  const avail = slotsMap[selDay] != null ? slotsMap[selDay] : weeklySlots;
  const occupied = /* @__PURE__ */ new Set();
  appts.filter((a) => a.status !== "anulada" && (a.fecha ? a.fecha === selDay : offToISO(a.day || 0) === selDay)).forEach((a) => {
    if (!a.time) return;
    const startMin = minsM(a.time);
    const durMin = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
    slotsM().forEach((slot) => {
      const slotMin = minsM(slot);
      if (slotMin >= startMin && slotMin < startMin + durMin) occupied.add(slot);
    });
  });
  function saveMap(map) {
    if (window.DB) window.DB.set("horarios_dates", map);
    else {
      try {
        localStorage.setItem("jcm_horarios_dates", JSON.stringify(map));
      } catch (e) {
      }
    }
    setSlotsMap({ ...map });
  }
  function toggle(slot) {
    if (occupied.has(slot)) return;
    const map = window.DB && window.DB.get("horarios_dates") || {};
    const cur = map[selDay] != null ? [...map[selDay]] : weeklySlots.slice();
    map[selDay] = cur.includes(slot) ? cur.filter((s) => s !== slot) : [...cur, slot].sort();
    saveMap(map);
  }
  function blockAll() {
    const m = window.DB && window.DB.get("horarios_dates") || {};
    m[selDay] = [];
    saveMap(m);
  }
  function openAll() {
    const m = window.DB && window.DB.get("horarios_dates") || {};
    delete m[selDay];
    saveMap(m);
  }
  const availCount = avail.filter((s) => !occupied.has(s)).length;
  const blockedCount = slotsM().filter((s) => !avail.includes(s) && !occupied.has(s)).length;
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "6px 12px 90px" } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, padding: "6px 2px 12px", minWidth: "max-content" } }, stripDays.map((d) => {
    const isSel = d.iso === selDay;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: d.iso,
        ref: (el) => {
          dayBtnRefs.current[d.iso] = el;
        },
        onClick: () => setSelDay(d.iso),
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: "7px 9px 5px",
          borderRadius: 12,
          minWidth: 42,
          cursor: "pointer",
          background: isSel ? "rgba(120,145,166,.12)" : "transparent",
          border: "1px solid " + (isSel ? "rgba(150,170,185,.55)" : "transparent")
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, fontWeight: 500, color: isSel ? "#A9BAC7" : T.textMute } }, d.isToday ? "Hoy" : d.wd),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 18, fontWeight: 600, color: T.text } }, d.dd),
      /* @__PURE__ */ React.createElement("div", { style: { width: 5, height: 5, borderRadius: "50%", background: isSel ? T.accent : "transparent" } })
    );
  }))), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 14), padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontFamily: T.sans, fontSize: 11, color: T.textMute, minWidth: 160 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#1F8A5B", fontWeight: 600 } }, availCount), " disponibles \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, blockedCount), " bloqueadas \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: "#B8860B", fontWeight: 600 } }, occupied.size), " con cita"), /* @__PURE__ */ React.createElement("button", { onClick: openAll, style: { background: "#1F8A5B18", border: "1px solid #1F8A5B44", color: "#1F8A5B", borderRadius: 8, padding: "8px 12px", fontFamily: T.sans, fontSize: 10.5, cursor: "pointer" } }, "Abrir todo"), /* @__PURE__ */ React.createElement("button", { onClick: blockAll, style: { background: "#C0285A18", border: "1px solid #C0285A44", color: "#C0285A", borderRadius: 8, padding: "8px 12px", fontFamily: T.sans, fontSize: 10.5, cursor: "pointer" } }, "Bloquear todo")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, padding: "2px 2px 10px" } }, [["#1F8A5B", "Disponible"], ["#C0285A", "Bloqueado"], ["#B8860B", "Con cita"]].map(([c, l]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 9, height: 9, borderRadius: 3, background: c } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute } }, l)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7 } }, slotsM().map((slot) => {
    const isOcc = occupied.has(slot);
    const isAvail = avail.includes(slot);
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: slot,
        onClick: () => toggle(slot),
        disabled: isOcc,
        style: {
          padding: "11px 4px",
          borderRadius: 9,
          border: "1px solid",
          fontFamily: T.sans,
          fontSize: 12.5,
          fontWeight: 500,
          cursor: isOcc ? "default" : "pointer",
          background: isOcc ? "#B8860B22" : isAvail ? "#1F8A5B1e" : T.dark ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.6)",
          borderColor: isOcc ? "#B8860B55" : isAvail ? "#1F8A5B55" : T.dark ? "rgba(255,255,255,.12)" : T.lineSoft,
          color: isOcc ? "#B8860B" : isAvail ? "#1F8A5B" : T.textFaint
        }
      },
      slot,
      isOcc && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, marginTop: 1, opacity: 0.7 } }, "cita")
    );
  })));
}
const CAL_PX_HOUR = 60;
const CAL_START = 8;
const CAL_END = 20;
const CAL_HOURS = Array.from({ length: CAL_END - CAL_START + 1 }, (_, i) => CAL_START + i);
function abbrevNameM(name) {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return name || "";
  const given = words.slice(0, -2).join(" ");
  const s1 = words[words.length - 2], s2 = words[words.length - 1];
  return given + " " + s1 + " " + s2[0].toUpperCase() + ".";
}
function abbrevProcM(proc) {
  const p = (proc || "").toLowerCase();
  if (p.includes("botox") && p.includes("3 zona")) return "B3Z";
  if (p.includes("botox") && (p.includes("full face") || p.includes("8 zona"))) return "BFF";
  if (p.includes("rinomodela")) return "R";
  if (p.includes("sculptra")) return "S";
  if (p.includes("evaluaci")) return "EV";
  if (p.includes("quemador")) return "Q";
  if (!proc) return "\u2014";
  return proc.trim().charAt(0).toUpperCase();
}
function AgendaTab({ T, appts, onOpenAppt, goTab, showAnuladas, setShowAnuladas }) {
  const today = todayISO();
  const [selDay, setSelDay] = useState(today);
  const [q, setQ] = useState("");
  const ql = q.trim().toLowerCase();
  const searchMatches = !ql ? [] : appts.filter((a) => (a.name || "").toLowerCase().includes(ql) || (a.rut || "").toLowerCase().includes(ql) || (a.proc || "").toLowerCase().includes(ql) && inCurrentMonth(a.fecha || offToISO(a.day || 0)));
  const searchResults = searchMatches.map((a) => ({ a, off: isoToDayOff(a.fecha || offToISO(a.day || 0)) })).sort((x, y) => {
    const dx = Math.abs(x.off), dy = Math.abs(y.off);
    return dx !== dy ? dx - dy : y.off - x.off;
  }).slice(0, 40).map((x) => x.a);
  const stripDays = useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    now.setHours(0, 0, 0, 0);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysFromStart = Math.round((now - monthStart) / 864e5);
    const arr = [];
    for (let i = -daysFromStart; i <= 60; i++) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() + i);
      const iso = localISO(d);
      arr.push({ iso, wd: WDS[d.getDay()], dd: d.getDate(), isToday: iso === today });
    }
    return arr;
  }, [today]);
  const [view, setView] = useState("dia");
  const [monthCur, setMonthCur] = useState(() => {
    const d = /* @__PURE__ */ new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const dayRef = useMemo(() => React.createRef(), []);
  const stripRef = useRef(null);
  const dayBtnRefs = useRef({});
  useEffect(() => {
    const el = dayBtnRefs.current[selDay];
    if (el && el.scrollIntoView) el.scrollIntoView({ inline: "center", block: "nearest" });
  }, [selDay]);
  const apptCountByDate = useMemo(() => {
    const map = {};
    appts.forEach((a) => {
      if (a.status === "anulada") return;
      const f = a.fecha || offToISO(a.day || 0);
      map[f] = (map[f] || 0) + 1;
    });
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
  const dayAppts = appts.filter((a) => {
    const f = a.fecha || offToISO(a.day || 0);
    return f === selDay && (showAnuladas ? a.status === "anulada" : a.status !== "anulada");
  }).sort((a, b) => minsM(a.time) - minsM(b.time));
  const anuladasCount = appts.filter((a) => (a.fecha || offToISO(a.day || 0)) === selDay && a.status === "anulada").length;
  const selActive = appts.filter((a) => (a.fecha || offToISO(a.day || 0)) === selDay && a.status !== "anulada");
  const cSel = selActive.filter((a) => a.status === "confirmada" || a.status === "atendida" || a.attended).length;
  const naSel = selActive.filter((a) => a.status === "no_asistio").length;
  const pSel = selActive.length - cSel - naSel;
  useEffect(() => {
    if (!dayRef.current) return;
    const firstMin = dayAppts.length ? minsM(dayAppts[0].time) : CAL_START * 60;
    const targetPx = Math.max(0, (firstMin - CAL_START * 60 - 30) * (CAL_PX_HOUR / 60));
    dayRef.current.scrollTop = targetPx;
  }, [selDay, showAnuladas]);
  function apptBlock(a) {
    const startMin = minsM(a.time);
    const durMin = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
    const topPx = (startMin - CAL_START * 60) * (CAL_PX_HOUR / 60);
    const heightPx = Math.max(durMin * (CAL_PX_HOUR / 60), 15);
    const st = apptStateM(a, T);
    const isAnulada = a.status === "anulada";
    return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: {
      position: "absolute",
      top: topPx,
      left: 0,
      right: 0,
      height: heightPx,
      display: "flex",
      alignItems: "center",
      gap: 8,
      textAlign: "left",
      cursor: "pointer",
      background: "rgba(255,255,255,.035)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: 10,
      padding: "0 0 0 12px",
      overflow: "hidden",
      boxSizing: "border-box",
      opacity: isAnulada ? 0.55 : 1
    } }, /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", title: st.label, style: { width: 8, height: 8, borderRadius: "50%", background: st.color, flexShrink: 0, boxShadow: "0 0 0 2.5px color-mix(in srgb, " + st.color + " 24%, transparent)" } }), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: FRAUNCES, fontSize: 11.5, fontWeight: 500, color: T.text } }, a.time), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: isAnulada ? "line-through" : "none" } }, abbrevNameM(a.name)), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, marginRight: 10, fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: st.color, background: "color-mix(in srgb, " + st.color + " 20%, transparent)", borderRadius: 5, padding: "2px 6px" } }, abbrevProcM(a.proc)));
  }
  const toggleRow = /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, padding: "8px 14px 6px", flexShrink: 0, ...glassChip(T), border: "none", background: "transparent" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flex: 1, gap: 3, padding: 3, borderRadius: 11, ...glassChip(T) } }, [["dia", "D\xEDa"], ["mes", "Mes"]].map(([k, l]) => (
    // Pedido: al tocar "Día" siempre vuelve al día de HOY automáticamente (no se queda en
    // el último día que se haya elegido).
    /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => {
      setView(k);
      if (k === "dia") setSelDay(today);
    }, style: {
      flex: 1,
      fontFamily: T.sans,
      fontSize: 12,
      fontWeight: view === k ? 600 : 500,
      padding: "6px",
      borderRadius: 8,
      cursor: "pointer",
      ...view === k ? { background: "linear-gradient(180deg, rgba(88,142,246,.28), rgba(48,104,214,.22))", color: "#fff", border: "1px solid rgba(150,170,185,.45)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.22), 0 6px 16px -8px rgba(40,90,200,.6)" } : { background: "transparent", color: T.textMute, border: "1px solid transparent" }
    } }, l)
  ))), showAnuladas && view === "dia" && /* @__PURE__ */ React.createElement("span", { style: { alignSelf: "center", fontFamily: T.sans, fontSize: 10.5, color: "#F1657F", whiteSpace: "nowrap" } }, "Canceladas (", anuladasCount, ")"));
  const searchBar = /* @__PURE__ */ React.createElement("div", { style: { padding: "0 14px 8px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, ...glassChip(T), borderRadius: 13, padding: "0 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4-4" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nombre, RUT o procedimiento\u2026", style: { flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontFamily: T.sans, fontSize: 13.5, padding: "11px 0" } }), q && /* @__PURE__ */ React.createElement("button", { onClick: () => setQ(""), "aria-label": "Limpiar b\xFAsqueda", style: { flexShrink: 0, width: 44, height: 44, margin: "0 -12px 0 -6px", background: "none", border: "none", color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))));
  const searchResultsBody = /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "0 14px 16px" } }, searchMatches.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 14), padding: "22px 16px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, 'Sin resultados para "', q.trim(), '".'), searchMatches.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, padding: "0 2px 2px" } }, searchMatches.length, " ", searchMatches.length === 1 ? "resultado" : "resultados", ' para "', q.trim(), '"'), searchResults.map((a) => {
    const st = apptStateM(a, T);
    const isAnulada = a.status === "anulada";
    return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer", background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, overflow: "hidden", padding: "10px 12px", opacity: isAnulada ? 0.6 : 1 } }, /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", title: st.label, style: { width: 9, height: 9, borderRadius: "50%", background: st.color, flexShrink: 0, boxShadow: "0 0 0 3px color-mix(in srgb, " + st.color + " 24%, transparent)" } }), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.textMute, minWidth: 78 } }, dayLabelM(a.fecha || offToISO(a.day || 0)), " ", a.time), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: isAnulada ? "line-through" : "none" } }, a.name), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: st.color, background: "color-mix(in srgb, " + st.color + " 20%, transparent)", borderRadius: 6, padding: "3px 7px" } }, abbrevProcM(a.proc)));
  })));
  const fab = /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => goTab("nueva"),
      title: "Nueva cita",
      "aria-label": "Nueva cita",
      style: {
        position: "absolute",
        right: 16,
        bottom: "16px",
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "linear-gradient(180deg, rgba(120,145,166,.42), rgba(120,145,166,.24) 45%, rgba(120,145,166,.3) 100%)",
        border: "1px solid rgba(160,180,195,.5)",
        color: "#EAF2FF",
        cursor: "pointer",
        backdropFilter: "blur(28px) saturate(1.6)",
        WebkitBackdropFilter: "blur(28px) saturate(1.6)",
        boxShadow: "0 12px 28px -10px rgba(10,25,55,.6), inset 0 1px 0 rgba(255,255,255,.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 6
      }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" }))
  );
  if (view === "mes") {
    const WD = ["L", "M", "M", "J", "V", "S", "D"];
    return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" } }, toggleRow, searchBar, ql ? searchResultsBody : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 16px 8px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setMonthCur((c) => {
      const m = c.m - 1;
      return m < 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m };
    }), style: { width: 44, height: 44, borderRadius: 999, ...glassChip(T), color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 } }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, fontWeight: 600, color: T.text } }, MESES_LARGOS[monthCur.m], " ", monthCur.y), /* @__PURE__ */ React.createElement("button", { onClick: () => setMonthCur((c) => {
      const m = c.m + 1;
      return m > 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m };
    }), style: { width: 44, height: 44, borderRadius: 999, ...glassChip(T), color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 } }, "\u203A")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", padding: "0 10px 4px", flexShrink: 0 } }, WD.map((w, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { textAlign: "center", fontFamily: T.sans, fontSize: 10, letterSpacing: ".08em", color: T.textMute } }, w))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "0 10px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 } }, monthGrid.map((c) => {
      const n = apptCountByDate[c.iso] || 0;
      const isToday = c.iso === today;
      return /* @__PURE__ */ React.createElement("button", { key: c.iso, onClick: () => {
        setSelDay(c.iso);
        setView("dia");
      }, style: {
        aspectRatio: "1/1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        borderRadius: 10,
        cursor: "pointer",
        background: isToday ? T.accent + "22" : n ? glassChip(T).background : "transparent",
        border: "1px solid " + (isToday ? T.accent : n ? T.dark ? "rgba(255,255,255,.12)" : T.line : "transparent"),
        opacity: c.inMonth ? 1 : 0.32
      } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: isToday ? 700 : 500, color: isToday ? T.accent : T.text } }, c.dd), n > 0 && /* @__PURE__ */ React.createElement("span", { style: { display: "flex", gap: 2 } }, Array.from({ length: Math.min(n, 3) }).map((_, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { width: 5, height: 5, borderRadius: "50%", background: T.accent } }))));
    })))), fab);
  }
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" } }, toggleRow, searchBar, ql ? searchResultsBody : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { ref: stripRef, style: { overflowX: "auto", flexShrink: 0, WebkitOverflowScrolling: "touch" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", padding: "8px 10px 4px", minWidth: "max-content", gap: 2 } }, stripDays.map((d) => {
    const isSel = d.iso === selDay;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: d.iso,
        ref: (el) => {
          dayBtnRefs.current[d.iso] = el;
        },
        onClick: () => setSelDay(d.iso),
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          padding: "6px 8px 5px",
          borderRadius: 12,
          minWidth: 38,
          cursor: "pointer",
          background: isSel ? "rgba(120,145,166,.12)" : "transparent",
          border: "1px solid " + (isSel ? "rgba(150,170,185,.55)" : "transparent")
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: isSel ? "#A9BAC7" : T.textMute } }, d.isToday ? "Hoy" : d.wd),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 17, fontWeight: d.isToday ? "700" : "400", color: T.text, lineHeight: 1.15 } }, d.dd),
      /* @__PURE__ */ React.createElement("div", { style: { width: 4, height: 4, borderRadius: "50%", background: isSel ? T.accent : "transparent" } })
    );
  }))), !showAnuladas && selActive.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px 8px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement(DaySummary, { T, c: cSel, p: pSel, na: naSel, bars: true })), /* @__PURE__ */ React.createElement("div", { ref: dayRef, style: { flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginLeft: 48, paddingRight: 12 } }, CAL_HOURS.map((h) => /* @__PURE__ */ React.createElement("div", { key: h, style: { position: "absolute", left: -48, right: 0, top: (h - CAL_START) * CAL_PX_HOUR, display: "flex", alignItems: "flex-start", zIndex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, width: 42, textAlign: "right", paddingRight: 8, lineHeight: 1, transform: "translateY(-5px)", flexShrink: 0 } }, h < 10 ? "0" + h : "" + h, ":00"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, borderTop: "1px solid " + (T.dark ? "rgba(255,255,255,.1)" : T.lineSoft), marginTop: 0 } }))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", minHeight: (CAL_END - CAL_START) * CAL_PX_HOUR + 40 } }, dayAppts.map((a) => apptBlock(a))), dayAppts.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "46%", left: 0, right: 0, transform: "translateY(-50%)", textAlign: "center", pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.textMute } }, showAnuladas ? "Sin citas canceladas este d\xEDa" : "Sin citas este d\xEDa"), !showAnuladas && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Toca + para agendar una cita."))))), fab);
}
function NuevaWizard({ T, appts, patients, addAppt, addPatient, onDone }) {
  const [step, setStep] = useState(1);
  const [tipo, setTipo] = useState("existente");
  const [q, setQ] = useState("");
  const [pid, setPid] = useState("");
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const PHONE_PFX = "+56 9 ";
  const [phone, setPhone] = useState(PHONE_PFX);
  function onPhone(v) {
    const digits = v.startsWith(PHONE_PFX) ? v.slice(PHONE_PFX.length).replace(/\D/g, "") : v.replace(/\D/g, "").replace(/^569?/, "");
    setPhone(PHONE_PFX + digits.slice(0, 8));
  }
  const phoneOk = phone.replace(/\D/g, "").length >= 11;
  function onRut(v) {
    setRut(window.jcmFmtRut ? window.jcmFmtRut(v) : v);
  }
  const rutOk = window.jcmValidRut ? window.jcmValidRut(rut) : (rut || "").replace(/[^0-9kK]/g, "").length >= 2;
  const [sinRut, setSinRut] = useState(false);
  const [email, setEmail] = useState("");
  const procs = procList();
  const [fecha, setFecha] = useState(todayISO());
  const [time, setTime] = useState("10:00");
  const [proc, setProc] = useState(procs[0] || "Evaluaci\xF3n general");
  const [dur, setDur] = useState("30 minutos");
  const [comment, setComment] = useState("");
  const [notifyWa, setNotifyWa] = useState(true);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (window.JCDATA && window.JCDATA.procMin) setDur(window.JCDATA.procMin(proc) + " minutos");
  }, [proc]);
  const selectedPatient = patients.find((p) => p.id === pid) || null;
  const ql = q.trim().toLowerCase();
  const results = ql.length >= 2 ? patients.filter((p) => (p.name || "").toLowerCase().includes(ql) || (p.rut || "").toLowerCase().includes(ql) || (p.phone || "").includes(ql)).slice(0, 6) : [];
  const finalName = tipo === "existente" ? selectedPatient ? selectedPatient.name : "" : name;
  const finalPhone = tipo === "existente" ? selectedPatient ? selectedPatient.phone : "" : phone;
  const finalRut = tipo === "existente" ? selectedPatient ? selectedPatient.rut : "" : rut;
  const finalEmail = tipo === "existente" ? selectedPatient ? selectedPatient.email : "" : email;
  const step1Ok = tipo === "existente" ? !!selectedPatient : name.trim() && (sinRut || rutOk) && phoneOk;
  const step2Ok = !!proc && !!fecha && !!time;
  const slotsMap = window.DB && window.DB.get("horarios_dates") || {};
  const weeklyDef = (() => {
    try {
      var h = window.DB && window.DB.get("horarios_v1");
      var wd = (/* @__PURE__ */ new Date(fecha + "T12:00:00")).getDay();
      if (h && h[wd] && h[wd].open !== false) return h[wd].slots || slotsM().slice();
      if (h && h[wd] && h[wd].open === false) return [];
    } catch (e) {
    }
    return slotsM().slice();
  })();
  const avail = slotsMap[fecha] != null ? slotsMap[fecha] : weeklyDef;
  const occupied = new Set(appts.filter((a) => a.fecha === fecha && a.status !== "anulada").map((a) => a.time));
  const freeSlots = avail.filter((s) => !occupied.has(s));
  function confirm() {
    let patId = pid;
    if (tipo === "nuevo") {
      const np = addPatient({ name: name.trim(), rut: sinRut ? "" : rut.trim(), phone: phone.trim(), email: email.trim(), age: 0 });
      patId = np.id;
    }
    addAppt({ id: Date.now().toString(36), patId, name: finalName.trim(), rut: (finalRut || "").trim(), phone: (finalPhone || "").trim(), email: (finalEmail || "").trim(), proc, dur, time, fecha, day: isoToDayOff(fecha), status: "pendiente", source: "movil", comentario: comment.trim() || void 0, createdAt: (/* @__PURE__ */ new Date()).toISOString() });
    if (notifyWa && finalPhone) {
      const waP = (finalPhone || "").replace(/\D/g, "");
      if (waP.length >= 8) {
        const clinNombre = (() => {
          try {
            const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name;
            return n && ("" + n).trim() || "la cl\xEDnica";
          } catch (e) {
            return "la cl\xEDnica";
          }
        })();
        const clinDir = (() => {
          try {
            const d = window.DB && window.DB.cfg && window.DB.cfg().clinic_addr;
            return d && ("" + d).trim() || "";
          } catch (e) {
            return "";
          }
        })();
        const clinPro = (() => {
          try {
            const p = window.DB && window.DB.cfg && window.DB.cfg().professional;
            return p && ("" + p).trim() || (((window.JCDATA || {}).contact || {}).pro || "");
          } catch (e) {
            return "";
          }
        })();
        const msg = jcmCitaConfirmMsgM(finalName, fecha, time, proc, clinPro, clinNombre, clinDir, esControlPostProcM(proc, selectedPatient));
        setTimeout(() => window.open("https://wa.me/56" + waP.replace(/^(56|0)/, "") + "?text=" + encodeURIComponent(msg), "_blank", "noopener"), 300);
      }
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onDone();
    }, 900);
  }
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 15, padding: "15px 15px", minHeight: 54, borderRadius: 14, border: "1px solid rgba(255,255,255,.22)", background: "linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.03)), rgba(16,41,78,.42)", backdropFilter: "blur(24px) saturate(1.5)", WebkitBackdropFilter: "blur(24px) saturate(1.5)", color: T.text, outline: "none", boxSizing: "border-box" };
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 8 };
  const STEPS = ["Paciente", "Detalles", "Confirmar"];
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 90px", display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, STEPS.map((s, i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: s }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: T.sans,
    fontSize: 12,
    fontWeight: 700,
    background: step === i + 1 ? T.accent : step > i + 1 ? T.accent + "33" : T.dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)",
    color: step === i + 1 ? T.onAccent : step > i + 1 ? T.accent : T.textFaint
  } }, step > i + 1 ? "\u2713" : i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: step >= i + 1 ? T.text : T.textFaint, whiteSpace: "nowrap" } }, s)), i < STEPS.length - 1 && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: step > i + 1 ? T.accent : T.dark ? "rgba(255,255,255,.14)" : T.line, marginBottom: 16 } })))), step === 1 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["existente", "Paciente existente"], ["nuevo", "Paciente nuevo"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTipo(k), style: {
    flex: 1,
    fontFamily: T.sans,
    fontSize: 12,
    fontWeight: tipo === k ? 700 : 500,
    padding: "11px 6px",
    borderRadius: 9,
    cursor: "pointer",
    border: "1px solid " + (tipo === k ? T.accent : T.dark ? "rgba(255,255,255,.14)" : T.line),
    background: tipo === k ? T.accent + "1e" : "transparent",
    color: tipo === k ? T.accent : T.textMute
  } }, l))), tipo === "existente" ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Buscar paciente"), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => {
    setQ(e.target.value);
    setPid("");
  }, placeholder: "Nombre, RUT o tel\xE9fono\u2026", style: inp }), selectedPatient && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 9, ...glassPanel(T, 10), padding: "11px 13px", display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text } }, selectedPatient.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, [selectedPatient.rut, selectedPatient.phone].filter(Boolean).join(" \xB7 "))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setPid("");
    setQ("");
  }, style: { background: "none", border: "none", color: T.textFaint, cursor: "pointer" } }, "\u2715")), !selectedPatient && results.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 9, display: "flex", flexDirection: "column", gap: 6 } }, results.map((p) => /* @__PURE__ */ React.createElement("button", { key: p.id, onClick: () => {
    setPid(p.id);
    setQ(p.name);
  }, style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", ...glassChip(T), borderRadius: 9, padding: "10px 12px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: "rgba(120,145,166,.16)", border: "1px solid rgba(130,150,170,.3)", color: "#A9BAC7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 11, fontWeight: 700, flexShrink: 0 } }, (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, [p.rut, p.phone].filter(Boolean).join(" \xB7 ")))))), !selectedPatient && ql.length >= 2 && results.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 9, fontFamily: T.sans, fontSize: 12, color: T.textMute } }, 'Sin resultados. Prueba con "Paciente nuevo".')) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Nombre completo"), /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Nombre y apellido", style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "RUT"), /* @__PURE__ */ React.createElement("input", { value: rut, onChange: (e) => onRut(e.target.value), disabled: sinRut, inputMode: "numeric", placeholder: sinRut ? "Sin RUT" : "12.345.678-9", style: { ...inp, opacity: sinRut ? 0.5 : 1, borderColor: sinRut || rutOk || !rut ? void 0 : "#C0285A88" } })), !sinRut && rut && !rutOk && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#FF8FA3" } }, "Revisa el RUT: el d\xEDgito verificador no coincide."), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 9, cursor: "pointer", marginTop: -4 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: sinRut, onChange: (e) => {
    setSinRut(e.target.checked);
    if (e.target.checked) setRut("");
  } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Paciente extranjero / sin RUT")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Tel\xE9fono"), /* @__PURE__ */ React.createElement("input", { type: "tel", inputMode: "numeric", value: phone, onChange: (e) => onPhone(e.target.value), style: { ...inp, borderColor: phoneOk ? void 0 : "#C0285A88" } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Correo (opcional)"), /* @__PURE__ */ React.createElement("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "correo@ejemplo.com", style: inp })), !phoneOk && phone.length > PHONE_PFX.length && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#FF8FA3" } }, "Ingresa los 8 d\xEDgitos del tel\xE9fono.")), /* @__PURE__ */ React.createElement("button", { onClick: () => step1Ok && setStep(2), disabled: !step1Ok, style: { background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 15, fontWeight: 600, border: "none", borderRadius: 12, padding: "16px", cursor: step1Ok ? "pointer" : "not-allowed", opacity: step1Ok ? 1 : 0.5 } }, "Continuar")), step === 2 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Procedimiento"), /* @__PURE__ */ React.createElement("select", { value: proc, onChange: (e) => setProc(e.target.value), style: { ...inp, appearance: "none" } }, /* @__PURE__ */ React.createElement("option", null, "Evaluaci\xF3n general"), procs.map((p) => /* @__PURE__ */ React.createElement("option", { key: p, value: p }, p)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Fecha"), /* @__PURE__ */ React.createElement("input", { type: "date", value: fecha, onChange: (e) => setFecha(e.target.value), style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Hora"), /* @__PURE__ */ React.createElement("select", { value: time, onChange: (e) => setTime(e.target.value), style: { ...inp, appearance: "none" } }, (() => {
    const base = freeSlots.length ? freeSlots : slotsM();
    const opts = base.indexOf(time) >= 0 ? base : [time, ...base];
    return opts.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s, " hrs"));
  })()), freeSlots.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#FF8FA3", marginTop: 5 } }, "No hay horas marcadas como disponibles para este d\xEDa.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Duraci\xF3n"), /* @__PURE__ */ React.createElement("select", { value: dur, onChange: (e) => setDur(e.target.value), style: { ...inp, appearance: "none" } }, ["15 minutos", "30 minutos", "45 minutos", "60 minutos", "90 minutos"].map((d) => /* @__PURE__ */ React.createElement("option", { key: d }, d)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Comentario (opcional)"), /* @__PURE__ */ React.createElement("textarea", { value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Ej. Control, seguimiento, evaluaci\xF3n\u2026", rows: 2, style: { ...inp, resize: "none" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(1), style: { flex: 1, background: "transparent", border: "1px solid " + (T.dark ? "rgba(255,255,255,.16)" : T.line), color: T.textMute, fontFamily: T.sans, fontSize: 12, borderRadius: 10, padding: "15px", cursor: "pointer" } }, "Atr\xE1s"), /* @__PURE__ */ React.createElement("button", { onClick: () => step2Ok && setStep(3), disabled: !step2Ok, style: { flex: 2, background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 15, fontWeight: 600, border: "none", borderRadius: 12, padding: "16px", cursor: step2Ok ? "pointer" : "not-allowed", opacity: step2Ok ? 1 : 0.5 } }, "Continuar"))), step === 3 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 12), padding: "14px 16px", display: "flex", flexDirection: "column", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, finalName), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, [finalRut, finalPhone].filter(Boolean).join(" \xB7 ")), /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: T.dark ? "rgba(255,255,255,.12)" : T.lineSoft, margin: "3px 0" } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, proc), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, fecha, " \xB7 ", time, " hrs \xB7 ", dur), comment && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, fontStyle: "italic" } }, comment)), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 9, cursor: "pointer", ...glassChip(T), borderRadius: 9, padding: "11px 13px" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: notifyWa, onChange: (e) => setNotifyWa(e.target.checked) }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, "Notificar al paciente por WhatsApp")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(2), style: { flex: 1, background: "transparent", border: "1px solid " + (T.dark ? "rgba(255,255,255,.16)" : T.line), color: T.textMute, fontFamily: T.sans, fontSize: 12, borderRadius: 10, padding: "15px", cursor: "pointer" } }, "Atr\xE1s"), /* @__PURE__ */ React.createElement("button", { onClick: confirm, disabled: saved, style: { flex: 2, background: saved ? "#1F8A5B" : T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 15, fontWeight: 600, border: "none", borderRadius: 12, padding: "16px", cursor: "pointer", transition: "background .3s" } }, saved ? "\u2713 Cita guardada" : "Confirmar cita"))));
}
function PacientesOverlay({ T, patients, appts, onBack, onOpenFicha, addPatient }) {
  const [q, setQ] = useState("");
  const [nuevo, setNuevo] = useState(false);
  const [f, setF] = useState({ name: "", rut: "", phone: "+56 9 ", email: "" });
  const ql = q.trim().toLowerCase();
  const list = (ql ? patients.filter((p) => (p.name || "").toLowerCase().includes(ql) || (p.rut || "").toLowerCase().includes(ql) || (p.phone || "").includes(ql)) : patients).slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  const PAGE = 60;
  const [visibleCount, setVisibleCount] = useState(PAGE);
  useEffect(() => {
    setVisibleCount(PAGE);
  }, [ql]);
  const visible = list.slice(0, visibleCount);
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 14, padding: "11px 13px", borderRadius: 9, border: "1px solid " + (T.dark ? "rgba(255,255,255,.16)" : T.line), background: T.dark ? "rgba(255,255,255,.06)" : "#fff", color: T.text, outline: "none", boxSizing: "border-box" };
  function saveNuevo() {
    if (!f.name.trim()) return;
    const np = addPatient({ name: f.name.trim(), rut: f.rut.trim(), phone: f.phone.trim(), email: f.email.trim(), age: 0 });
    setNuevo(false);
    setF({ name: "", rut: "", phone: "+56 9 ", email: "" });
    onOpenFicha(np.id);
  }
  return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Pacientes", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 10, ...glassChip(T), borderRadius: 13, padding: "0 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4-4" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nombre, RUT o tel\xE9fono\u2026", style: { flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontFamily: T.sans, fontSize: 14, padding: "13px 0" } })), /* @__PURE__ */ React.createElement("button", { onClick: () => setNuevo((v) => !v), "aria-label": "Nuevo paciente", style: { flexShrink: 0, width: 50, borderRadius: 13, border: "none", background: T.accent, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px -8px " + T.accent } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })))), nuevo && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 12), padding: "13px 14px", display: "flex", flexDirection: "column", gap: 9 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent } }, "Nuevo paciente"), /* @__PURE__ */ React.createElement("input", { value: f.name, onChange: (e) => setF((s) => ({ ...s, name: e.target.value })), placeholder: "Nombre completo", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.rut, onChange: (e) => setF((s) => ({ ...s, rut: e.target.value })), placeholder: "RUT (opcional)", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.phone, onChange: (e) => setF((s) => ({ ...s, phone: e.target.value })), placeholder: "+56 9 1234 5678", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.email, onChange: (e) => setF((s) => ({ ...s, email: e.target.value })), placeholder: "Correo (opcional)", style: inp }), /* @__PURE__ */ React.createElement("button", { onClick: saveNuevo, disabled: !f.name.trim(), style: { background: T.accent, color: T.onAccent, border: "none", borderRadius: 9, padding: "12px", fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer", opacity: f.name.trim() ? 1 : 0.5 } }, "Guardar paciente")), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 18), display: "flex", flexDirection: "column", overflow: "hidden" } }, list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "30px 0", fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Sin pacientes", ql ? " que coincidan" : "", "."), visible.map((p, i) => {
    const nextA = appts.filter((a) => (a.patId === p.id || a.name === p.name) && a.status !== "anulada" && (a.fecha || offToISO(a.day || 0)) >= todayISO()).sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""))[0];
    return /* @__PURE__ */ React.createElement("button", { key: p.id, onClick: () => onOpenFicha(p.id), style: { display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: i === visible.length - 1 ? "none" : "1px solid rgba(255,255,255,.08)", padding: "11px 14px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "rgba(120,145,166,.16)", color: "#A9BAC7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 12.5, fontWeight: 600 } }, (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 } }, [p.rut, p.phone].filter(Boolean).join(" \xB7 "))), nextA && /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, color: "#A9BAC7" } }, nextA.fecha === todayISO() ? "Hoy " + nextA.time : (() => {
      const d = /* @__PURE__ */ new Date((nextA.fecha || "") + "T00:00:00");
      return isNaN(d.getTime()) ? nextA.fecha : d.getDate() + " " + MESES[d.getMonth()].toLowerCase();
    })()), /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2", strokeLinecap: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })));
  })), list.length > visibleCount && /* @__PURE__ */ React.createElement("button", { onClick: () => setVisibleCount((c) => c + PAGE), style: { ...glassChip(T), borderRadius: 12, padding: "12px", color: T.text, fontFamily: T.sans, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, "Mostrar m\xE1s (", list.length - visibleCount, " restantes)")));
}
function FichaOverlay({ T, patientId, patients, appts, onBack, updatePatient }) {
  const p = patients.find((x) => x.id === patientId);
  const [edit, setEdit] = useState(false);
  const [f, setF] = useState({ phone: p ? p.phone || "" : "", email: p ? p.email || "" : "", notas: p ? p.notas || "" : "" });
  useEffect(() => {
    if (p) setF({ phone: p.phone || "", email: p.email || "", notas: p.notas || "" });
  }, [patientId]);
  if (!p) return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Ficha", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: 30, textAlign: "center", fontFamily: T.sans, color: T.textMute } }, "Paciente no encontrado."));
  const mine = appts.filter((a) => a.patId === p.id || a.name === p.name);
  const today = todayISO();
  const proximas = mine.filter((a) => a.status !== "anulada" && (a.fecha || offToISO(a.day || 0)) >= today).sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));
  const pasadas = mine.filter((a) => (a.fecha || offToISO(a.day || 0)) < today || a.status === "atendida").sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
  const sesiones = (p.history || []).slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 14, padding: "11px 13px", borderRadius: 9, border: "1px solid " + (T.dark ? "rgba(255,255,255,.16)" : T.line), background: T.dark ? "rgba(255,255,255,.06)" : "#fff", color: T.text, outline: "none", boxSizing: "border-box" };
  function save() {
    updatePatient(p.id, { phone: f.phone.trim(), email: f.email.trim(), notas: f.notas.trim() });
    setEdit(false);
  }
  return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Ficha del paciente", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 40px", display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 56, height: 56, borderRadius: "50%", background: "rgba(120,145,166,.16)", border: "1px solid rgba(130,150,170,.3)", color: "#A9BAC7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 19, fontWeight: 700, flexShrink: 0 } }, (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, [p.rut, p.age ? p.age + " a\xF1os" : ""].filter(Boolean).join(" \xB7 ")))), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 12), padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, "Contacto"), !edit && /* @__PURE__ */ React.createElement("button", { onClick: () => setEdit(true), style: { background: "none", border: "none", color: T.accent, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } }, "Editar")), edit ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: f.phone, onChange: (e) => setF((s) => ({ ...s, phone: e.target.value })), placeholder: "Tel\xE9fono", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.email, onChange: (e) => setF((s) => ({ ...s, email: e.target.value })), placeholder: "Correo", style: inp }), /* @__PURE__ */ React.createElement("textarea", { value: f.notas, onChange: (e) => setF((s) => ({ ...s, notas: e.target.value })), placeholder: "Notas (alergias, preferencias, etc.)", rows: 2, style: { ...inp, resize: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setEdit(false);
    setF({ phone: p.phone || "", email: p.email || "", notas: p.notas || "" });
  }, style: { flex: 1, height: 38, borderRadius: 8, border: "1px solid " + T.line, background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 12, cursor: "pointer" } }, "Cancelar"), /* @__PURE__ */ React.createElement("button", { onClick: save, style: { flex: 2, height: 38, borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "Guardar"))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, p.phone || "Sin tel\xE9fono"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, p.email || "Sin correo"), p.notas && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 3, fontStyle: "italic" } }, p.notas))), p.phone && /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://wa.me/56" + p.phone.replace(/\D/g, "").replace(/^(56|0)/, ""),
      target: "_blank",
      rel: "noopener",
      style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#1F8A5B22", border: "1px solid #1F8A5B55", borderRadius: 9, padding: "12px", textDecoration: "none", color: "#1F8A5B", fontFamily: T.sans, fontSize: 12.5, fontWeight: 500 }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "#1F8A5B" }, /* @__PURE__ */ React.createElement("path", { d: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" })),
    "Escribir por WhatsApp"
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Pr\xF3ximas citas (", proximas.length, ")"), proximas.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Sin pr\xF3ximas citas."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, proximas.map((a) => /* @__PURE__ */ React.createElement("div", { key: a.id, style: { ...glassChip(T), borderRadius: 9, padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, a.fecha, " \xB7 ", a.time, " hrs"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, a.proc || "\u2014"))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Historial (", pasadas.length, ")"), pasadas.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Sin atenciones registradas."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, pasadas.slice(0, 20).map((a) => /* @__PURE__ */ React.createElement("div", { key: a.id, style: { ...glassChip(T), borderRadius: 9, padding: "9px 12px", opacity: a.status === "anulada" ? 0.55 : 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, a.fecha, " \xB7 ", a.proc || "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, apptStateM(a, T).label))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Procedimientos del portal (", sesiones.length, ")"), sesiones.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Sin procedimientos registrados en el portal."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, sesiones.slice(0, 20).map((h, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { ...glassChip(T), borderRadius: 9, padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, h.date || "\u2014", " \xB7 ", h.proc || "\u2014", h.units ? " \xB7 " + h.units : ""), h.resumen && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 3, lineHeight: 1.4 } }, h.resumen), h.proName && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, fontStyle: "italic", marginTop: 3 } }, "Realizado por ", h.proName)))))));
}
function ReportesOverlay({ T, appts, onBack, onOpenAppt }) {
  const [view, setView] = useState("stats");
  const [expanded, setExpanded] = useState(null);
  const now = /* @__PURE__ */ new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - (now.getDay() + 6) % 7);
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  const monthKey = now.getFullYear() + "-" + now.getMonth();
  const inWeek = (a) => {
    const f = a.fecha || offToISO(a.day || 0);
    const d = /* @__PURE__ */ new Date(f + "T00:00:00");
    return d >= weekStart && d <= weekEnd;
  };
  const inMonth = (a) => {
    const f = a.fecha || offToISO(a.day || 0);
    const d = /* @__PURE__ */ new Date(f + "T00:00:00");
    return d.getFullYear() + "-" + d.getMonth() === monthKey;
  };
  const weekAppts = appts.filter(inWeek);
  const monthAppts = appts.filter(inMonth);
  const countBy = (list, pred) => list.filter(pred).length;
  const noShowRate = weekAppts.length ? Math.round(countBy(weekAppts, (a) => a.status === "no_asistio") / weekAppts.filter((a) => a.status !== "anulada").length * 100) || 0 : 0;
  const porProc = {};
  monthAppts.forEach((a) => {
    if (a.status === "anulada" || a.status === "no_asistio") return;
    const k = a.proc || "Sin especificar";
    (porProc[k] || (porProc[k] = [])).push(a);
  });
  const topProc = Object.keys(porProc).map((k) => {
    const list = porProc[k].slice().sort((a, b) => (a.fecha || "").localeCompare(b.fecha || "") || minsM(a.time) - minsM(b.time));
    const real = list.filter((a) => a.status === "atendida" || a.attended).length;
    return { name: k, list, real, pend: list.length - real, n: list.length };
  }).sort((a, b) => b.n - a.n).slice(0, 5);
  const maxProc = topProc[0] ? topProc[0].n : 1;
  const RIC = {
    cal: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" })),
    check: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M8 12l3 3 5-6" })),
    user: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M5 21v-1a6 6 0 0 1 12 0v1" })),
    xmark: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M15 9l-6 6M9 9l6 6" })),
    pct: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M8 15l8-6" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "9", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "15", r: "1" }))
  };
  const row = (icon, iconColor, label, val, valColor, last) => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13, padding: "12px 0", borderBottom: last ? "none" : "1px solid rgba(255,255,255,.07)" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: iconColor + "22", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" } }, icon), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 15, color: T.text } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 17, fontWeight: 700, color: valColor || T.text } }, val));
  if (view === "plantillas") {
    return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Plantillas de mensajes", onBack: () => setView("stats") }, /* @__PURE__ */ React.createElement(MessageTemplatesView, { T }));
  }
  return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Reportes", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 40px", display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setView("plantillas"), style: { display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", ...glassPanel(T, 16), padding: "15px 16px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: "rgba(120,145,166,.16)", border: "1px solid rgba(130,150,170,.28)", color: "#A9BAC7", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.text } }, "Plantillas de mensajes"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 } }, "Edita el texto de WhatsApp de tu cl\xEDnica")), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" }))), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 20), padding: "6px 16px 8px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, fontWeight: 600, padding: "14px 0 6px" } }, "Esta semana"), row(RIC.cal, "#7FA8E8", "Citas totales", weekAppts.filter((a) => a.status !== "anulada").length), row(RIC.check, "#46D27A", "Confirmadas", countBy(weekAppts, (a) => a.status === "confirmada" || a.status === "atendida"), "#46D27A"), row(RIC.user, "#A9BAC7", "Atendidas", countBy(weekAppts, (a) => a.status === "atendida" || a.attended), "#A9BAC7"), row(RIC.user, "#FF6B7D", "No asisti\xF3", countBy(weekAppts, (a) => a.status === "no_asistio"), "#FF6B7D"), row(RIC.xmark, "#9AA6B2", "Canceladas", countBy(weekAppts, (a) => a.status === "anulada")), row(RIC.pct, noShowRate > 15 ? "#FF6B7D" : "#46D27A", "Tasa de inasistencia", noShowRate + "%", noShowRate > 15 ? "#FF6B7D" : "#46D27A", true)), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 20), padding: "6px 16px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, fontWeight: 600, padding: "14px 0 2px" } }, "Procedimientos del mes"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, padding: "0 0 10px", lineHeight: 1.5 } }, "Incluye lo agendado para lo que resta del mes, no solo lo ya atendido \u2014 para anticipar stock."), topProc.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "6px 0 12px" } }, "Sin datos este mes."), topProc.map((t, i) => {
    const open = expanded === t.name;
    return /* @__PURE__ */ React.createElement("div", { key: t.name, style: { borderBottom: i === topProc.length - 1 && !open ? "none" : "1px solid rgba(255,255,255,.06)" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setExpanded(open ? null : t.name), style: { display: "flex", alignItems: "center", gap: 13, padding: "11px 0", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: 9, flexShrink: 0, background: "rgba(120,145,166,.14)", color: "#A9BAC7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 13, fontWeight: 700 } }, i + 1), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 15, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, t.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.text, marginLeft: 8, flexShrink: 0 } }, t.n)), /* @__PURE__ */ React.createElement("div", { style: { height: 5, borderRadius: 999, background: "rgba(255,255,255,.09)", overflow: "hidden", marginTop: 8, display: "flex" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: Math.round(t.pend / maxProc * 100) + "%", background: "#6EA8E8" } }), /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: Math.round(t.real / maxProc * 100) + "%", background: "linear-gradient(90deg,#D9A63C,#F5B93D)" } })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 5 } }, t.pend, " agendados \xB7 ", t.real, " realizados")), /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2.2", style: { flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), open && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, padding: "0 0 12px 43px" } }, t.list.map((a) => {
      const st = apptStateM(a, T);
      return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", cursor: "pointer", background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 9, padding: "8px 11px" } }, /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", title: st.label, style: { width: 8, height: 8, borderRadius: "50%", background: st.color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.textMute, minWidth: 62 } }, dayLabelM(a.fecha || offToISO(a.day || 0))), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name || "Paciente"), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 10, color: st.color, fontWeight: 600 } }, st.label));
    })));
  }))));
}
function MessageTemplatesView({ T }) {
  const cfg = window.DB && window.DB.cfg && window.DB.cfg() || {};
  const clinNombre = cfg.clinic_name && ("" + cfg.clinic_name).trim() || "tu cl\xEDnica";
  const TPLS = [
    {
      key: "msg_tpl_confirm",
      label: "Confirmaci\xF3n de cita",
      def: window.DEFAULT_TPL_CONFIRM,
      sample: { nombre: "Mar\xEDa P\xE9rez", clinica: clinNombre, fecha: "S\xE1b 11 Jul", hora: "13:45", tratamiento: "Rinomodelaci\xF3n", profesional: cfg.professional && ("" + cfg.professional).trim() || "Profesional a cargo", direccion: cfg.clinic_addr && ("" + cfg.clinic_addr).trim() || "Direcci\xF3n de tu cl\xEDnica", mapa: "https://www.medique.cl/ir?c=\u2026", politica: "" }
    },
    {
      key: "msg_tpl_asist",
      label: "Confirmar asistencia",
      def: window.DEFAULT_TPL_ASIST,
      sample: { nombre: "Mar\xEDa P\xE9rez", clinica: clinNombre, fecha: "s\xE1bado 11 de julio", hora: "13:45", tratamiento: "Rinomodelaci\xF3n", mapa: "https://www.medique.cl/ir?c=\u2026" }
    }
  ];
  const [open, setOpen] = useState(null);
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 40px", display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.6, padding: "0 2px" } }, "Personaliza el texto que reciben tus pacientes por WhatsApp. Se aplica tambi\xE9n a los mensajes enviados desde el portal de escritorio."), TPLS.map((t) => /* @__PURE__ */ React.createElement(
    TplCard,
    {
      key: t.key,
      T,
      tplKey: t.key,
      label: t.label,
      defaultTpl: t.def,
      sample: t.sample,
      open: open === t.key,
      onToggle: () => setOpen(open === t.key ? null : t.key)
    }
  )));
}
function TplCard({ T, tplKey, label, defaultTpl, sample, open, onToggle }) {
  const stored = (() => {
    try {
      const v = window.DB && window.DB.cfg && window.DB.cfg()[tplKey];
      return v && ("" + v).trim() || "";
    } catch (e) {
      return "";
    }
  })();
  const [text, setText] = useState(stored || defaultTpl);
  const [isCustom, setIsCustom] = useState(!!stored);
  const [savedFlag, setSavedFlag] = useState(false);
  const inp = { width: "100%", fontFamily: "ui-monospace, monospace", fontSize: 12.5, padding: "11px 13px", borderRadius: 9, border: "1px solid rgba(255,255,255,.16)", background: "rgba(0,0,0,.22)", color: T.text, outline: "none", boxSizing: "border-box", lineHeight: 1.6 };
  function save() {
    try {
      window.DB.set("config", Object.assign({}, window.DB.cfg(), { [tplKey]: text.trim() }));
    } catch (e) {
    }
    setIsCustom(!!text.trim());
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 1800);
  }
  function restore() {
    setText(defaultTpl);
    try {
      window.DB.set("config", Object.assign({}, window.DB.cfg(), { [tplKey]: "" }));
    } catch (e) {
    }
    setIsCustom(false);
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 1800);
  }
  const tokens = window.TPL_TOKENS && window.TPL_TOKENS[tplKey] || [];
  const preview = window.fillMsgTpl ? window.fillMsgTpl(text, sample) : text;
  return /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 16), padding: "4px 16px 14px" } }, /* @__PURE__ */ React.createElement("button", { onClick: onToggle, style: { display: "flex", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 0", textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.text } }, label), isCustom && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: T.accent, border: "1px solid " + T.accent, borderRadius: 999, padding: "2px 8px", marginRight: 8, flexShrink: 0 } }, "Personalizada"), /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2.2", style: { flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), open && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, paddingBottom: 4 } }, /* @__PURE__ */ React.createElement("textarea", { value: text, onChange: (e) => setText(e.target.value), rows: 9, style: { ...inp, resize: "vertical" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, tokens.map((tk) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: tk.k,
      title: tk.d,
      onClick: () => setText((v) => v + (v && !/\s$/.test(v) ? " " : "") + "{" + tk.k + "}"),
      style: { fontFamily: "ui-monospace, monospace", fontSize: 11, color: T.accent, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 7, padding: "4px 8px", cursor: "pointer" }
    },
    "{" + tk.k + "}"
  ))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.6 } }, tokens.map((tk) => tk.k + ": " + tk.d).join(" \xB7 ")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Vista previa"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, background: "rgba(0,0,0,.22)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "11px 13px", whiteSpace: "pre-wrap", lineHeight: 1.6 } }, preview)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: restore, style: { flex: 1, height: 38, borderRadius: 8, border: "1px solid rgba(255,255,255,.18)", background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 12, cursor: "pointer" } }, "Restaurar predeterminado"), /* @__PURE__ */ React.createElement("button", { onClick: save, style: { flex: 1, height: 38, borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, savedFlag ? "Guardado \u2713" : "Guardar"))));
}
function MasTab({ T, openOverlay, onLogout }) {
  const item = (icon, label, onClick, danger) => /* @__PURE__ */ React.createElement("button", { onClick, style: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    width: "100%",
    textAlign: "left",
    ...glassPanel(T, 18),
    padding: "18px 16px",
    cursor: "pointer",
    ...danger ? { background: "linear-gradient(180deg, rgba(255,90,110,.10), rgba(255,70,90,.04) 60%), rgba(40,20,26,.42)" } : {}
  } }, /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: danger ? "rgba(255,90,110,.16)" : "rgba(120,145,166,.16)", border: "1px solid " + (danger ? "rgba(255,120,140,.3)" : "rgba(130,150,170,.28)"), color: danger ? "#FF6B7D" : "#A9BAC7", display: "flex", alignItems: "center", justifyContent: "center" } }, icon), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 18, fontWeight: 600, color: danger ? "#FF6B7D" : T.text, flex: 1 } }, label), /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: danger ? "rgba(255,107,125,.7)" : T.textFaint, strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })));
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 90px", display: "flex", flexDirection: "column", gap: 12 } }, item(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })), "Pacientes", () => openOverlay("pacientes")), item(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" })), "Reportes", () => openOverlay("reportes")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        const b = document.getElementById("jcm-mob-rfab-icon2");
        if (b) {
          b.style.transition = "transform .55s";
          b.style.transform = "rotate(360deg)";
          setTimeout(() => {
            b.style.transition = "";
            b.style.transform = "";
          }, 600);
        }
        window.dispatchEvent(new CustomEvent("jcsaas:data"));
      },
      style: { display: "flex", alignItems: "center", gap: 15, width: "100%", textAlign: "left", ...glassPanel(T, 18), padding: "18px 16px", cursor: "pointer" }
    },
    /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: "rgba(120,145,166,.16)", border: "1px solid rgba(130,150,170,.28)", color: "#A9BAC7", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { id: "jcm-mob-rfab-icon2", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M8 16H3v5" }))),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 18, fontWeight: 600, color: T.text, flex: 1 } }, "Actualizar datos"),
    /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" }))
  ), /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: T.dark ? "rgba(255,255,255,.1)" : T.lineSoft, margin: "8px 4px" } }), item(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ React.createElement("path", { d: "M16 17l5-5-5-5M21 12H9" })), "Cerrar sesi\xF3n", onLogout, true));
}
function OverlayShell({ T, title, onBack, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 200, overflow: "hidden", backgroundColor: "#070B12", display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(PhotoBgLayers, null), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "calc(14px + env(safe-area-inset-top,0px)) 18px 10px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, "aria-label": "Volver", style: { width: 44, height: 44, borderRadius: "50%", ...glassChip(T), color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" }))), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 26, fontWeight: 700, color: T.text, letterSpacing: "-.01em" } }, title)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto" } }, children)));
}
function MobileShell({ T, D, onLogout }) {
  const [tab, setTab] = useState("citas");
  const [overlay, setOverlay] = useState(null);
  const [apptSheet, setApptSheet] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [agShowAnuladas, setAgShowAnuladas] = useState(false);
  const [appts, setAppts] = useState(() => window.DB && window.DB.get("appointments") || []);
  const [patients, setPatients] = useState(() => window.DB && window.DB.get("patients") || []);
  const edgeTouch = useRef(null);
  function onRootTouchStart(e) {
    if (!e.touches || e.touches.length !== 1) {
      edgeTouch.current = null;
      return;
    }
    const t = e.touches[0];
    edgeTouch.current = t.clientX <= 24 ? { x: t.clientX, y: t.clientY } : null;
  }
  function onRootTouchEnd(e) {
    const start = edgeTouch.current;
    edgeTouch.current = null;
    if (!start || !e.changedTouches || !e.changedTouches.length) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x, dy = t.clientY - start.y;
    if (dx < 70 || Math.abs(dy) > 45) return;
    if (drawer) return;
    if (notifOpen) {
      setNotifOpen(false);
      return;
    }
    if (apptSheet) {
      setApptSheet(null);
      return;
    }
    if (overlay) {
      setOverlay(null);
      return;
    }
    if (tab !== "citas") {
      setTab("citas");
      return;
    }
  }
  useEffect(() => {
    function reload() {
      setAppts(window.DB && window.DB.get("appointments") || []);
      setPatients(window.DB && window.DB.get("patients") || []);
    }
    window.addEventListener("jcm:appts", reload);
    window.addEventListener("jcsaas:data", reload);
    return () => {
      window.removeEventListener("jcm:appts", reload);
      window.removeEventListener("jcsaas:data", reload);
    };
  }, []);
  useEffect(() => {
    function setTitle() {
      let nombre = "Medique";
      try {
        const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name;
        if (n && ("" + n).trim()) nombre = ("" + n).trim();
      } catch (e) {
      }
      document.title = nombre + " \xB7 Panel M\xF3vil";
    }
    setTitle();
    window.addEventListener("jcsaas:data", setTitle);
    return () => window.removeEventListener("jcsaas:data", setTitle);
  }, []);
  const [online, setOnline] = useState(() => typeof navigator === "undefined" || navigator.onLine);
  useEffect(() => {
    function goOnline() {
      setOnline(true);
    }
    function goOffline() {
      setOnline(false);
    }
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  function saveAppts(updated) {
    window.DB && window.DB.set("appointments", updated);
    setAppts(updated);
  }
  function updateAppt(id, patch) {
    const all = window.DB && window.DB.get("appointments") || [];
    saveAppts(all.map((x) => x.id === id ? { ...x, ...patch } : x));
  }
  function confirmPago(id) {
    const all = window.DB && window.DB.get("appointments") || [];
    const a = all.find((x) => x.id === id);
    if (a && a.fecha && a.time) {
      try {
        const map = window.DB && window.DB.get("horarios_dates") || {};
        const cur = Array.isArray(map[a.fecha]) ? map[a.fecha] : [];
        map[a.fecha] = cur.filter((s) => s !== a.time);
        if (window.DB) window.DB.set("horarios_dates", map);
      } catch (e) {
      }
    }
    saveAppts(all.map((x) => x.id === id ? { ...x, status: "confirmada" } : x));
  }
  function cancelAppt(id) {
    const all = window.DB && window.DB.get("appointments") || [];
    const a = all.find((x) => x.id === id);
    if (a && a.fecha && a.time) {
      try {
        const map = window.DB && window.DB.get("horarios_dates") || {};
        const cur = Array.isArray(map[a.fecha]) ? [...map[a.fecha]] : [];
        if (!cur.includes(a.time)) {
          cur.push(a.time);
          cur.sort();
          map[a.fecha] = cur;
        }
        if (window.DB) window.DB.set("horarios_dates", map);
      } catch (e) {
      }
    }
    saveAppts(all.map((x) => x.id === id ? { ...x, status: "anulada", attended: false, anuladaAt: Date.now() } : x));
  }
  function restoreAppt(id) {
    const all = window.DB && window.DB.get("appointments") || [];
    const a = all.find((x) => x.id === id);
    if (a && a.fecha && a.time) {
      try {
        const map = window.DB && window.DB.get("horarios_dates") || {};
        const cur = Array.isArray(map[a.fecha]) ? map[a.fecha] : slotsM().slice();
        map[a.fecha] = cur.filter((s) => s !== a.time);
        if (window.DB) window.DB.set("horarios_dates", map);
      } catch (e) {
      }
    }
    saveAppts(all.map((x) => x.id === id ? { ...x, status: "pendiente", attended: false, anuladaAt: null } : x));
  }
  function addAppt(appt) {
    const all = window.DB && window.DB.get("appointments") || [];
    if (appt.fecha && appt.time) {
      try {
        const map = window.DB && window.DB.get("horarios_dates") || {};
        const cur = Array.isArray(map[appt.fecha]) ? map[appt.fecha] : slotsM().slice();
        map[appt.fecha] = cur.filter((s) => s !== appt.time);
        if (window.DB) window.DB.set("horarios_dates", map);
      } catch (e) {
      }
    }
    saveAppts([...all, appt]);
  }
  function addPatient(p) {
    const np = addPatientM(p);
    setPatients(patientsAll());
    return np;
  }
  function updatePatient(id, patch) {
    updatePatientM(id, patch);
    setPatients(patientsAll());
  }
  const pendPago = appts.filter((a) => a.status === "pendiente_pago");
  const pendConsent = consentPendingM(patients, appts);
  const bellCount = pendPago.length + pendConsent.length;
  const clinName = (() => {
    try {
      const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name;
      return n && ("" + n).trim() || "";
    } catch (e) {
      return "";
    }
  })();
  const fechaHeader = (() => {
    const d = /* @__PURE__ */ new Date();
    const s = DOW_FULL[d.getDay()] + ", " + d.getDate() + " de " + MESES_LARGOS[d.getMonth()].toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  })();
  {
  }
  const hamburger = /* @__PURE__ */ React.createElement("button", { onClick: () => setDrawer(true), "aria-label": "Men\xFA", style: { width: 44, height: 44, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: -9 } }, /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M3 12h18M3 18h18" })));
  const bell = /* @__PURE__ */ React.createElement("button", { onClick: () => setNotifOpen(true), "aria-label": "Pendientes", style: { position: "relative", width: 44, height: 44, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: -7 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" })), bellCount > 0 && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 8, right: 8, minWidth: 18, height: 18, padding: "0 4px", borderRadius: 999, background: T.accent, color: "#fff", fontFamily: T.sans, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,255,255,.35)" } }, bellCount));
  const headerTitle = (txt) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 17, fontWeight: 600, color: T.text } }, txt);
  const renderHeader = () => {
    if (tab === "citas") return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 } }, hamburger, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 24, height: 24, objectFit: "contain", flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 5, minWidth: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: FRAUNCES, fontSize: 13.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, clinName || "Medique"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, "\xB7 ", fechaHeader))), bell);
    if (tab === "nueva") return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("citas"), "aria-label": "Volver", style: { width: 44, height: 44, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: -9 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" }))), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 0, right: 0, textAlign: "center", pointerEvents: "none", fontFamily: T.sans, fontSize: 20, fontWeight: 600, color: T.text } }, "Nueva cita"), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("citas"), "aria-label": "Cerrar", style: { width: 44, height: 44, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginRight: -9 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.1" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
    const titleMap = { horarios: "Horarios", agenda: "Agenda", mas: "M\xE1s" };
    const rightAction = tab === "agenda" ? /* @__PURE__ */ React.createElement("button", { onClick: () => setAgShowAnuladas((v) => !v), "aria-label": "Filtro", style: { width: 44, height: 44, borderRadius: "50%", border: "none", background: agShowAnuladas ? T.accentSoft : "none", color: agShowAnuladas ? T.accent : T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginRight: -7 } }, /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 6h16M7 12h10M10 18h4" }))) : /* @__PURE__ */ React.createElement("div", { style: { width: 44 } });
    return /* @__PURE__ */ React.createElement(React.Fragment, null, hamburger, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 0, right: 0, textAlign: "center", pointerEvents: "none", fontFamily: T.sans, fontSize: 20, fontWeight: 600, color: T.text } }, titleMap[tab]), rightAction);
  };
  const tabs = [
    { lbl: "Citas", on: tab === "citas" && !overlay, act: () => {
      setOverlay(null);
      setTab("citas");
    }, icon: /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" })) },
    { lbl: "Agenda", on: tab === "agenda" && !overlay, act: () => {
      setOverlay(null);
      setTab("agenda");
    }, icon: /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" })) },
    { lbl: "Pacientes", on: overlay === "pacientes", act: () => setOverlay("pacientes"), icon: /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })) },
    { lbl: "Reportes", on: overlay === "reportes", act: () => setOverlay("reportes"), icon: /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" })) },
    { lbl: "M\xE1s", on: tab === "mas" && !overlay, act: () => {
      setOverlay(null);
      setTab("mas");
    }, icon: /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("circle", { cx: "5", cy: "12", r: "1.6", fill: "currentColor", stroke: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "1.6", fill: "currentColor", stroke: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "19", cy: "12", r: "1.6", fill: "currentColor", stroke: "none" })) }
  ];
  return /* @__PURE__ */ React.createElement("div", { onTouchStart: onRootTouchStart, onTouchEnd: onRootTouchEnd, style: { height: "100dvh", overflow: "hidden", position: "relative", backgroundColor: "#070B12", maxWidth: 480, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(PhotoBgLayers, null), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "sticky", top: 0, zIndex: 10, padding: "calc(8px + env(safe-area-inset-top,0px)) 14px 4px" } }, tab === "citas" ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, ...glassChip(T), borderRadius: 18, padding: "8px 12px" } }, renderHeader()) : /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "6px 4px 6px", minHeight: 42 } }, renderHeader())), !online && /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, margin: "0 14px 6px", padding: "8px 12px", borderRadius: 12, background: "rgba(184,134,11,.22)", border: "1px solid rgba(184,134,11,.4)", display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "#E8B84D", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M1 1l22 22M8.5 16.5a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 3.5-2.5M12 20h.01M19 12.5a10 10 0 0 0-2.5-2.2M2 8.5a15 15 0 0 1 4-2.5" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#F0D9A8", lineHeight: 1.35 } }, "Sin conexi\xF3n \xB7 mostrando datos guardados en este equipo")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: tab === "agenda" || tab === "citas" ? "hidden" : "auto" } }, tab === "citas" && /* @__PURE__ */ React.createElement(HomeTab, { T, appts, patients, onOpenAppt: setApptSheet, goTab: setTab, openOverlay: setOverlay }), tab === "horarios" && /* @__PURE__ */ React.createElement(HorariosTab, { T, appts }), tab === "nueva" && /* @__PURE__ */ React.createElement(NuevaWizard, { T, appts, patients, addAppt, addPatient, onDone: () => setTab("citas") }), tab === "agenda" && /* @__PURE__ */ React.createElement(AgendaTab, { T, appts, onOpenAppt: setApptSheet, goTab: setTab, showAnuladas: agShowAnuladas, setShowAnuladas: setAgShowAnuladas }), tab === "mas" && /* @__PURE__ */ React.createElement(MasTab, { T, openOverlay: setOverlay, onLogout })), /* @__PURE__ */ React.createElement("div", { style: { position: "sticky", bottom: 0, padding: "0 12px calc(10px + env(safe-area-inset-bottom,0px))", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 2, ...glassPanel(T, 26), padding: "7px 6px", pointerEvents: "auto", boxShadow: "0 18px 44px -14px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.16)" } }, tabs.map(({ lbl, icon, on, act }) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: lbl,
      onClick: act,
      style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 2px", background: "transparent", border: "none", cursor: "pointer" }
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      width: 38,
      height: 32,
      borderRadius: 11,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: on ? T.accent : "transparent",
      color: on ? "#fff" : T.textFaint,
      boxShadow: on ? "0 6px 14px -6px " + T.accent : "none"
    } }, icon),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, fontWeight: on ? 600 : 500, color: on ? "#CFE0FF" : T.textFaint } }, lbl),
    /* @__PURE__ */ React.createElement("div", { style: { width: 5, height: 5, borderRadius: "50%", background: on ? T.accent : "transparent", marginTop: 1 } })
  ))))), overlay === "pacientes" && /* @__PURE__ */ React.createElement(PacientesOverlay, { T, patients, appts, addPatient, onBack: () => setOverlay(null), onOpenFicha: (id) => setOverlay({ type: "ficha", id }) }), overlay === "reportes" && /* @__PURE__ */ React.createElement(ReportesOverlay, { T, appts, onBack: () => setOverlay(null), onOpenAppt: setApptSheet }), overlay && overlay.type === "ficha" && /* @__PURE__ */ React.createElement(FichaOverlay, { T, patientId: overlay.id, patients, appts, updatePatient, onBack: () => setOverlay(null) }), notifOpen && (() => {
    const closeN = () => setNotifOpen(false);
    const openFichaN = (id) => {
      setNotifOpen(false);
      setOverlay({ type: "ficha", id });
    };
    const openApptN = (a) => {
      setNotifOpen(false);
      setApptSheet(a);
    };
    const total = pendConsent.length + pendPago.length;
    const docIcon = /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ React.createElement("path", { d: "M14 2v6h6M9 14l2 2 4-4" }));
    const payIcon = /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M2 10h20" }));
    const row = (color, icon, title, sub, onClick) => /* @__PURE__ */ React.createElement("button", { key: title + sub, onClick, style: { display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "none", border: "none", borderRadius: 12, padding: "11px 12px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: color + "22", color, display: "flex", alignItems: "center", justifyContent: "center" } }, icon), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, sub)), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })));
    const label = (txt) => /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: T.textMute, padding: "10px 12px 3px" } }, txt);
    return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
      if (e.target === e.currentTarget) closeN();
    }, style: { position: "fixed", inset: 0, zIndex: 410, background: "rgba(0,0,0,.55)", display: "flex", flexDirection: "column", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { ...glassPanel(T, 24), borderBottomLeftRadius: 0, borderBottomRightRadius: 0, maxHeight: "78dvh", display: "flex", flexDirection: "column", paddingBottom: "env(safe-area-inset-bottom,10px)", animation: "jcFade .2s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 11px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.1)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, fontWeight: 600, color: T.text } }, "Pendientes"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 1 } }, total === 0 ? "Todo al d\xEDa" : total + " por resolver")), /* @__PURE__ */ React.createElement("button", { onClick: closeN, "aria-label": "Cerrar", style: { width: 44, height: 44, borderRadius: "50%", ...glassChip(T), color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "6px 8px 14px", display: "flex", flexDirection: "column", gap: 1 } }, total === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "40px 16px", textAlign: "center", fontFamily: T.sans, fontSize: 13, color: T.textMute } }, "Sin pendientes \xB7 todo en orden \u2713"), pendConsent.length > 0 && label("Consentimientos por firmar"), pendConsent.map((p) => row("#E8B84D", docIcon, p.name || "Paciente", "Consentimiento por firmar", () => openFichaN(p.id))), pendPago.length > 0 && label("Pagos por confirmar"), pendPago.map((a) => row("#6EA8E8", payIcon, a.name || "Paciente", "Transferencia por confirmar" + (a.time ? " \xB7 " + a.time : ""), () => openApptN(a))))));
  })(), apptSheet && /* @__PURE__ */ React.createElement(
    ApptSheet,
    {
      T,
      appt: apptSheet,
      patients,
      onClose: () => setApptSheet(null),
      updateAppt,
      cancelAppt,
      restoreAppt,
      confirmPago,
      onOpenFicha: (id) => {
        setApptSheet(null);
        setOverlay({ type: "ficha", id });
      }
    }
  ), drawer && (() => {
    const go = (id) => {
      setTab(id);
      setDrawer(false);
    };
    const openOv = (o) => {
      setOverlay(o);
      setDrawer(false);
    };
    const navItem = (icon, label, onClick, danger) => /* @__PURE__ */ React.createElement("button", { onClick, style: { display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", background: "none", border: "none", borderRadius: 11, padding: "12px 12px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: 9, background: (danger ? "#F1657F" : T.accent) + "22", color: danger ? "#F1657F" : T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, icon), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: danger ? "#F1657F" : T.text } }, label));
    return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
      if (e.target === e.currentTarget) setDrawer(false);
    }, style: { position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,.5)", display: "flex" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { position: "relative", overflow: "hidden", width: "78%", maxWidth: 320, height: "100%", backgroundColor: "#070B12", display: "flex", flexDirection: "column", boxShadow: "8px 0 40px -10px rgba(0,0,0,.6)", animation: "jcDrawerIn .22s ease" } }, /* @__PURE__ */ React.createElement(PhotoBgLayers, null), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { ...glassChip(T), border: "none", padding: "calc(16px + env(safe-area-inset-top,0px)) 16px 16px", display: "flex", alignItems: "center", gap: 11 } }, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 34, height: 34, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: FRAUNCES, fontSize: 18, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, clinName || "Medique"))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 } }, navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" })), "Inicio", () => go("citas")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" })), "Agenda", () => go("agenda")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })), "Nueva cita", () => go("nueva")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 6v6l4 2" })), "Horarios", () => go("horarios")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })), "Pacientes", () => openOv("pacientes")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" })), "Reportes", () => openOv("reportes")), /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: "rgba(255,255,255,.1)", margin: "8px 12px" } }), navItem(/* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M8 16H3v5" })), "Actualizar datos", () => {
      window.dispatchEvent(new CustomEvent("jcsaas:data"));
      setDrawer(false);
    }), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ React.createElement("path", { d: "M16 17l5-5-5-5M21 12H9" })), "Cerrar sesi\xF3n", () => {
      setDrawer(false);
      onLogout();
    }, true)))));
  })());
}
function MobileAdmin() {
  const TK = window.JCTHEME;
  const T = photoTheme(jcmMobileTheme(TK && (TK.marfil || TK.cielo || TK.editorial) || {
    bg: "#F5F2EC",
    surface: "#fff",
    text: "#1A1A14",
    textMute: "#5C5A50",
    textFaint: "#8A8674",
    line: "rgba(20,20,15,.12)",
    lineSoft: "rgba(20,20,15,.08)",
    accent: "#54707F",
    onAccent: "#fff",
    sans: "'Jost',sans-serif",
    serif: "'Marcellus',serif",
    navBg: "rgba(245,242,236,.96)"
  }));
  const D = window.JCDATA;
  const authed0 = !!(window.jcmAdminHasPass && window.jcmAdminHasPass() && window.jcmAdminHasSession && window.jcmAdminHasSession());
  const [authed, setAuthed] = useState(authed0);
  if (!authed) return /* @__PURE__ */ React.createElement(LoginScreen, { T, onAuth: () => setAuthed(true) });
  return /* @__PURE__ */ React.createElement(MobileShell, { T, D, onLogout: () => {
    try {
      window.jcmAdminEndSession && window.jcmAdminEndSession();
    } catch (e) {
    }
    setAuthed(false);
  } });
}
function MobileSaasGate() {
  const TK = window.JCTHEME;
  const T = photoTheme(jcmMobileTheme(TK && (TK.marfil || TK.cielo || TK.editorial) || {
    bg: "#F5F2EC",
    surface: "#fff",
    text: "#1A1A14",
    textMute: "#5C5A50",
    textFaint: "#8A8674",
    line: "rgba(20,20,15,.12)",
    lineSoft: "rgba(20,20,15,.08)",
    accent: "#54707F",
    onAccent: "#fff",
    sans: "'Jost',sans-serif",
    serif: "'Marcellus',serif",
    navBg: "rgba(245,242,236,.96)"
  }));
  const D = window.JCDATA;
  const hasCachedSession = !!(window.JCSAAS && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId() && window.DB && (window.DB.get("appointments") || window.DB.get("patients")));
  const [phase, setPhase] = useState(hasCachedSession ? "app" : "loading");
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  function authMsgM(e) {
    const c = e && e.code || "";
    if (c.indexOf("invalid-credential") >= 0 || c.indexOf("wrong-password") >= 0 || c.indexOf("user-not-found") >= 0) return "Correo o contrase\xF1a incorrectos.";
    if (c.indexOf("invalid-email") >= 0) return "El correo no es v\xE1lido.";
    if (c.indexOf("too-many-requests") >= 0) return "Demasiados intentos. Espera unos minutos.";
    if (c.indexOf("network") >= 0) return "Sin conexi\xF3n. Revisa tu internet.";
    if (c.indexOf("configuration-not-found") >= 0) return "Falta habilitar Correo/contrase\xF1a en Firebase.";
    return "No se pudo entrar. Intenta nuevamente.";
  }
  useEffect(() => {
    window.JCSAAS.onAuth((p) => {
      if (!p || p.incomplete) {
        setPhase("login");
        return;
      }
      const a = window.JCSAAS.access();
      setPhase(a.ok ? "app" : "blocked");
    });
    const t = setTimeout(() => setPhase((x) => x === "loading" ? "login" : x), 4e3);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!busy) return;
    const t = setTimeout(() => {
      setBusy(false);
      setErr("La conexi\xF3n est\xE1 tardando demasiado. Revisa tu internet e int\xE9ntalo de nuevo.");
    }, 13e3);
    return () => clearTimeout(t);
  }, [busy]);
  async function doLogin() {
    if (!email.trim() || !pass) return;
    setErr("");
    setBusy(true);
    try {
      await window.JCSAAS.login(email, pass);
      setBusy(false);
    } catch (e) {
      console.error("[Medique] Error de login (m\xF3vil):", e);
      setErr(authMsgM(e));
      setBusy(false);
    }
  }
  async function doRecover() {
    if (!email.trim()) return;
    setErr("");
    setMsg("");
    setBusy(true);
    try {
      await window.JCSAAS.resetPassword(email);
      setMsg("Te enviamos un correo para restablecer tu contrase\xF1a.");
    } catch (e) {
      console.error("[Medique] Error al recuperar contrase\xF1a (m\xF3vil):", e);
      setErr(authMsgM(e));
    }
    setBusy(false);
  }
  if (phase === "app") return /* @__PURE__ */ React.createElement(MobileShell, { T, D, onLogout: () => window.JCSAAS.logout() });
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 16, padding: "14px 16px", borderRadius: 6, border: "1px solid rgba(255,255,255,.14)", background: "rgba(20,22,28,.85)", color: "#fff", outline: "none", boxSizing: "border-box" };
  const btnSober = { width: "100%", background: "rgba(235,238,242,.92)", color: "#15181D", fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", border: "none", borderRadius: 6, padding: "14px", cursor: "pointer", marginTop: 4 };
  const linkSober = { background: "none", border: "none", cursor: "pointer", color: T.accent, fontFamily: T.sans, fontSize: 12, textDecoration: "underline", padding: 6 };
  const SERIF = FRAUNCES;
  const eyebrow = { fontFamily: T.sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent, textAlign: "center" };
  const title = { fontFamily: SERIF, fontWeight: 300, fontSize: 34, color: "#fff", textAlign: "center", margin: "12px 0 6px", lineHeight: 1.05 };
  const subtitle = { fontFamily: T.sans, fontSize: 12.5, color: ON_PHOTO.mute, textAlign: "center", lineHeight: 1.6, margin: "0 0 22px" };
  const center = (kids) => /* @__PURE__ */ React.createElement(LoginVideoBg, null, kids);
  if (phase === "loading") return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: eyebrow }, "Medique \xB7 Panel m\xF3vil"), /* @__PURE__ */ React.createElement("h1", { style: title }, "Conectando\u2026"), /* @__PURE__ */ React.createElement("p", { style: subtitle }, "Verificando tu sesi\xF3n.")));
  if (phase === "blocked") return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", { style: title }, "Plan inactivo"), /* @__PURE__ */ React.createElement("p", { style: subtitle }, "El acceso de tu cl\xEDnica no est\xE1 activo. Escr\xEDbenos para reactivarlo."), /* @__PURE__ */ React.createElement("button", { onClick: () => window.JCSAAS.logout(), style: { background: "none", border: "1px solid rgba(255,255,255,.25)", color: "#fff", fontFamily: T.sans, fontSize: 12, borderRadius: 6, padding: "12px 18px", cursor: "pointer" } }, "Cerrar sesi\xF3n")));
  if (view === "recover") return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: eyebrow }, "Medique \xB7 Panel m\xF3vil"), /* @__PURE__ */ React.createElement("h1", { style: title }, "Recuperar contrase\xF1a"), /* @__PURE__ */ React.createElement("p", { style: subtitle }, "Te enviaremos un enlace a tu correo para restablecerla."), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { placeholder: "Correo de tu cuenta", inputMode: "email", "data-nocap": "", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: (e) => e.key === "Enter" && doRecover(), style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A", textAlign: "center" } }, err), msg && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#7CDDA8", textAlign: "center" } }, msg), /* @__PURE__ */ React.createElement("button", { onClick: doRecover, disabled: busy || !email.trim(), style: { ...btnSober, opacity: busy || !email.trim() ? 0.6 : 1 } }, busy ? "Enviando\u2026" : "Enviar enlace"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setView("login");
    setErr("");
    setMsg("");
  }, style: linkSober }, "\u2190 Volver")))));
  return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: eyebrow }, "Medique \xB7 Panel m\xF3vil"), /* @__PURE__ */ React.createElement("h1", { style: title }, "Confirmar citas"), /* @__PURE__ */ React.createElement("p", { style: subtitle }, "Accede al panel de tu cl\xEDnica."), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { placeholder: "Correo de tu cl\xEDnica", inputMode: "email", autoComplete: "email", "data-nocap": "", value: email, onChange: (e) => setEmail(e.target.value), style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: "Contrase\xF1a", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => e.key === "Enter" && doLogin(), autoComplete: "current-password", style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A", textAlign: "center" } }, err), /* @__PURE__ */ React.createElement("button", { onClick: doLogin, disabled: busy, style: { ...btnSober, opacity: busy ? 0.6 : 1 } }, busy ? "\u2026" : "Entrar"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setView("recover");
    setErr("");
  }, style: linkSober }, "\xBFOlvidaste tu contrase\xF1a?")))));
}
ReactDOM.createRoot(document.getElementById("root")).render(
  window.JCSAAS && window.JCSAAS.enabled ? /* @__PURE__ */ React.createElement(MobileSaasGate, null) : /* @__PURE__ */ React.createElement(MobileAdmin, null)
);
