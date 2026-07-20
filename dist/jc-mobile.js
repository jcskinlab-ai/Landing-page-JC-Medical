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
function jcmFirstNameM(name) {
  return ("" + (name || "")).trim().split(/\s+/)[0] || "";
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
  return window.fillMsgTpl(tpl, { nombre: name, primernombre: jcmFirstNameM(name), clinica: clinNombre, fecha: wd + " " + dd + " " + mm, hora: time, tratamiento: proc, profesional: prof || "", direccion: clinDir || "", mapa: maps || "", politica });
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
  return window.fillMsgTpl(tpl, { nombre: a.name || "", primernombre: jcmFirstNameM(a.name), clinica: clinNombre, fecha: fecha || "", hora: a.time || "", tratamiento: a.proc || "", mapa: maps || "" });
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
  if (a.status === "anulada") return { label: "Cancelada", color: T.mutedPill };
  if (a.status === "no_asistio") return { label: "No asisti\xF3", color: "#FF6B7D" };
  if (a.attended || a.status === "atendida") return { label: "Atendida", color: "#F5B93D" };
  if (a.status === "confirmada") return { label: "Confirmada", color: "#46D27A" };
  if (a.status === "pendiente_pago") return { label: "\u23F3 Transferencia", color: "#F5B93D" };
  return { label: "Agendado", color: "#6EA8E8" };
}
function apptCardTintM(color) {
  return {
    background: color + "1e",
    backdropFilter: "blur(12px) saturate(1.25)",
    WebkitBackdropFilter: "blur(12px) saturate(1.25)",
    border: "1px solid " + color + "2a"
  };
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
function shiftDateM(iso, delta) {
  const d = /* @__PURE__ */ new Date((iso || todayISO()) + "T12:00:00");
  d.setDate(d.getDate() + delta);
  return localISO(d);
}
function apptEndM(a) {
  if (a && a.end) return a.end;
  if (!a || !a.time) return "";
  const start = minsM(a.time);
  const dur = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
  const e = start + dur, h = Math.floor(e / 60), m = e % 60;
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
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
function endTimeM(a) {
  const start = minsM(a.time);
  const dur = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
  const e = start + dur, hh = Math.floor(e / 60) % 24, mm = (e % 60 + 60) % 60;
  return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
}
const ON_PHOTO = { text: "#F5F7FB", mute: "rgba(235,242,252,.72)", faint: "rgba(235,242,252,.5)" };
const JOST = "'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Roboto, sans-serif";
const FRAUNCES = "'Fraunces', Georgia, serif";
const MOBILE_THEME_KEY = "jcm_mobile_theme";
function readMobileMode() {
  try {
    return localStorage.getItem(MOBILE_THEME_KEY) === "light" ? "light" : "dark";
  } catch (e) {
    return "dark";
  }
}
function writeMobileMode(m) {
  try {
    localStorage.setItem(MOBILE_THEME_KEY, m);
  } catch (e) {
  }
}
const THEME_SHARED = {
  gold: "#D8B36A",
  goldText: "#241C0E",
  red: "#CC5B54",
  redText: "#FFFFFF",
  mutedPill: "#A9B4BE",
  onAccent: "#10181F",
  green: "#4CAF78",
  serif: FRAUNCES,
  sans: JOST
};
const THEME_DARK = {
  dark: true,
  bg: "#05080F",
  bgRadial: "radial-gradient(130% 90% at 50% -12%, #16304F 0%, #0B1524 55%, #05080F 100%)",
  heroBg: "linear-gradient(180deg, rgba(9,13,22,.55) 0%, rgba(9,13,22,.92) 100%), radial-gradient(90% 55% at 78% 6%, rgba(120,145,166,.22), transparent 55%), radial-gradient(150% 120% at 50% -18%, #1c3552 0%, #0e1c2f 42%, #05080f 82%)",
  text: "#F2F5F8",
  text2: "rgba(242,245,248,.62)",
  text3: "rgba(242,245,248,.58)",
  accent: "#7891A6",
  accentStrong: "#9DB2C3",
  accentSoft: "rgba(120,145,166,.16)",
  accentBorder: "rgba(120,145,166,.55)",
  glassFill: "rgba(21,29,44,.62)",
  glassHl: "rgba(255,255,255,.07)",
  glassBorder: "rgba(255,255,255,.1)",
  glassShadow: "0 24px 55px -22px rgba(3,6,12,.72)",
  flatFill: "rgba(255,255,255,.045)",
  flatBorder: "rgba(255,255,255,.08)",
  divider: "rgba(255,255,255,.1)",
  inputFill: "rgba(255,255,255,.055)",
  inputBorder: "rgba(255,255,255,.09)",
  navFill: "rgba(18,25,38,.6)"
};
const THEME_LIGHT = {
  dark: false,
  bg: "#D2D9DE",
  bgRadial: "radial-gradient(130% 90% at 50% -12%, #EEF2F5 0%, #E1E6EA 55%, #D2D9DE 100%)",
  heroBg: "linear-gradient(180deg, rgba(255,255,255,.35) 0%, rgba(222,229,234,.88) 100%), radial-gradient(90% 55% at 78% 6%, rgba(92,116,136,.16), transparent 55%), radial-gradient(150% 120% at 50% -18%, #EEF2F5 0%, #E1E6EA 45%, #C9D1D7 85%)",
  text: "#1B2430",
  text2: "rgba(27,36,48,.62)",
  text3: "rgba(27,36,48,.74)",
  accent: "#5C7488",
  accentStrong: "#3F5163",
  accentSoft: "rgba(92,116,136,.14)",
  accentBorder: "rgba(92,116,136,.5)",
  glassFill: "rgba(255,255,255,.68)",
  glassHl: "rgba(255,255,255,.7)",
  glassBorder: "rgba(20,30,45,.1)",
  glassShadow: "0 18px 40px -20px rgba(20,30,45,.25)",
  flatFill: "rgba(20,30,45,.035)",
  flatBorder: "rgba(20,30,45,.08)",
  divider: "rgba(20,30,45,.1)",
  inputFill: "rgba(20,30,45,.045)",
  inputBorder: "rgba(20,30,45,.09)",
  navFill: "rgba(255,255,255,.6)"
};
function buildMobileTheme(mode) {
  const base = mode === "light" ? THEME_LIGHT : THEME_DARK;
  const t = Object.assign({}, THEME_SHARED, base);
  t.textMute = t.text2;
  t.textFaint = t.text3;
  t.line = t.glassBorder;
  t.lineSoft = t.divider;
  return t;
}
function glassPanel(T, radius) {
  return {
    background: T.glassFill,
    backdropFilter: "blur(28px) saturate(1.3)",
    WebkitBackdropFilter: "blur(28px) saturate(1.3)",
    border: "1px solid " + T.glassBorder,
    borderTop: "1px solid " + T.glassHl,
    borderRadius: radius == null ? 20 : radius,
    boxShadow: T.glassShadow
  };
}
function glassChip(T) {
  return {
    background: T.glassFill,
    backdropFilter: "blur(28px) saturate(1.3)",
    WebkitBackdropFilter: "blur(28px) saturate(1.3)",
    border: "1px solid " + T.glassBorder,
    borderTop: "1px solid " + T.glassHl,
    boxShadow: T.glassShadow
  };
}
function PhotoBgLayers({ T, hero }) {
  return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: hero ? T.heroBg : T.bgRadial } });
}
function LoginVideoBg({ children }) {
  const overlay = "linear-gradient(180deg, rgba(9,11,15,.42) 0%, rgba(9,11,15,.62) 45%, rgba(9,11,15,.82) 100%)";
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", minHeight: "100dvh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 24px", backgroundColor: "#070707" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: "url('/assets/evapp-login.jpg?v=1')", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: overlay } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center" } }, children));
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
  return /* @__PURE__ */ React.createElement(LoginVideoBg, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent, textAlign: "center" } }, "Medique \xB7 Panel m\xF3vil"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: SERIF, fontWeight: 300, fontSize: 34, color: "#fff", textAlign: "center", margin: "12px 0 6px", lineHeight: 1.05 } }, "Acceso privado"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: ON_PHOTO.mute, textAlign: "center", lineHeight: 1.6, margin: "0 0 22px" } }, "Accede al panel de tu cl\xEDnica."), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", display: "flex", flexDirection: "column", gap: 11 } }, setup && /* @__PURE__ */ React.createElement("input", { placeholder: "Usuario", value: user, onChange: (e) => setUser(e.target.value), style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: "Contrase\xF1a del panel", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => e.key === "Enter" && submit(), style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.red, textAlign: "center" } }, err), /* @__PURE__ */ React.createElement("button", { onClick: submit, disabled: busy, style: { ...btnSober, opacity: busy ? 0.6 : 1 } }, busy ? "\u2026" : setup ? "Crear acceso" : "Entrar")));
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
  const sheet = { width: "100%", maxWidth: 480, maxHeight: "84dvh", overflowY: "auto", background: T.bgRadial, borderRadius: "24px 24px 0 0", padding: "10px 20px calc(28px + env(safe-area-inset-bottom,0px))", boxSizing: "border-box", boxShadow: "0 -20px 50px rgba(0,0,0,.4)", borderTop: "1px solid " + T.glassBorder };
  const inp = { width: "100%", boxSizing: "border-box", fontFamily: T.sans, fontSize: 13, padding: "8px 10px", borderRadius: 8, border: "1px solid " + T.glassBorder, background: T.glassFill, color: T.text, outline: "none" };
  const initials = (a.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const stepBtn = (dir, onClick) => /* @__PURE__ */ React.createElement("button", { onClick, "aria-label": dir < 0 ? "D\xEDa anterior" : "D\xEDa siguiente", style: { width: 44, height: 44, borderRadius: "50%", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 28, height: 28, borderRadius: "50%", background: T.glassFill, border: "1px solid " + T.glassBorder, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: T.text, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7" }))));
  return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, style: { position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "rgba(2,4,8,.6)" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), className: "no-sb", style: sheet }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 5, borderRadius: 100, background: T.divider, margin: "0 auto 16px" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: "50%", background: T.accentSoft, border: "1px solid " + T.accentBorder, color: T.accentStrong, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 14, fontWeight: 600, flexShrink: 0 } }, initials), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, fontWeight: 600, color: T.text, lineHeight: 1.2 } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 2 } }, a.time, " \xB7 ", a.proc || "\u2014", " \xB7 ", durLabel), matched && /* @__PURE__ */ React.createElement("button", { onClick: () => onOpenFicha(matched.id), style: { marginTop: 6, background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: T.sans, fontSize: 12, color: T.accentStrong } }, "Ver ficha del paciente \u2192")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, "aria-label": "Cerrar", style: { flexShrink: 0, width: 44, height: 44, borderRadius: "50%", border: "none", background: "none", color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginRight: -6, marginTop: -6 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 32, height: 32, borderRadius: "50%", border: "1px solid " + T.flatBorder, background: T.flatFill, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 5l14 14M19 5L5 19" }))))), isPend && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        confirmPago(a.id);
        onClose();
      },
      style: { width: "100%", background: "#1F8A5B", color: "#fff", fontFamily: T.sans, fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", border: "none", borderRadius: 12, padding: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2.5" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" })),
    "Confirmar transferencia"
  ), isAnulada ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 10, lineHeight: 1.5 } }, "Esta cita est\xE1 cancelada. Restaurarla la vuelve a dejar agendada y ocupa el horario nuevamente."), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    restoreAppt(a.id);
    onClose();
  }, style: { width: "100%", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 14, fontWeight: 600, border: "none", borderRadius: 14, padding: "14px", cursor: "pointer" } }, "Restaurar cita")) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontWeight: 500, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textFaint, margin: "20px 0 10px" } }, "Estado de la cita"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 } }, STATUS_STEPS.filter((s) => s.key !== "anulada").map((s) => {
    const on = (s.key === "pendiente" ? a.status === "pendiente" || !a.status : a.status === s.key) || s.key === "atendida" && a.attended;
    const stColor = apptStateM(s.key === "atendida" ? { attended: true } : { status: s.key }, T).color;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s.key,
        onClick: () => setStatus(s.key),
        style: {
          textAlign: "center",
          padding: "13px 8px",
          borderRadius: 14,
          cursor: "pointer",
          background: on ? stColor + "26" : T.flatFill,
          border: "1.4px solid " + (on ? stColor : T.flatBorder),
          fontFamily: T.sans,
          fontWeight: 600,
          fontSize: 13,
          color: on ? stColor : T.text
        }
      },
      s.label
    );
  })), !confirmCancel ? /* @__PURE__ */ React.createElement("button", { onClick: () => setConfirmCancel(true), style: { display: "block", width: "100%", marginTop: 9, textAlign: "center", padding: "13px 8px", borderRadius: 14, border: "1.4px solid " + T.red, background: "transparent", cursor: "pointer", fontFamily: T.sans, fontWeight: 600, fontSize: 13, color: T.red } }, "Cancelar") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 9 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setConfirmCancel(false), style: { flex: 1, padding: "13px", borderRadius: 14, border: "1px solid " + T.line, background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 13, cursor: "pointer" } }, "Volver"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    cancelAppt(a.id);
    onClose();
  }, style: { flex: 1, padding: "13px", borderRadius: 14, border: "none", background: T.red, color: "#fff", fontFamily: T.sans, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, "S\xED, cancelar"))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setComTxt(a.comentario || "");
    setEditCom((v) => !v);
  }, style: { display: "flex", alignItems: "center", gap: 10, width: "100%", marginTop: 14, padding: "13px 14px", borderRadius: 14, background: T.flatFill, border: "1px solid " + T.flatBorder, cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 4h16v12H8l-4 4V4Z" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13.5, color: a.comentario ? T.text : T.text, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, editCom ? "Agregar comentario" : a.comentario || "Agregar comentario")), editCom && /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: comTxt,
      onChange: (e) => setComTxt(e.target.value),
      onBlur: () => updateAppt(a.id, { comentario: comTxt.trim() || void 0 }),
      placeholder: "Escribe una nota interna\u2026",
      autoFocus: true,
      rows: 2,
      style: { width: "100%", boxSizing: "border-box", marginTop: 8, minHeight: 64, borderRadius: 12, background: T.flatFill, border: "1px solid " + T.flatBorder, color: T.text, fontFamily: T.sans, fontSize: 13, padding: "10px 12px", resize: "none", outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    if (!edit) setEf({ fecha: a.fecha || todayISO(), time: a.time || "10:00", dur: (parseInt(a.dur) || 30) + "", proc: a.proc || "" });
    setEdit((v) => !v);
  }, style: { display: "flex", alignItems: "center", gap: 10, width: "100%", marginTop: 9, padding: "13px 14px", borderRadius: 14, background: T.flatFill, border: "1px solid " + T.flatBorder, cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20l4-1 10-10-3-3L5 16l-1 4Z" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13.5, color: T.text, flex: 1 } }, "Editar fecha, hora, duraci\xF3n o procedimiento")), edit && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, padding: 14, borderRadius: 14, background: T.flatFill, border: "1px solid " + T.flatBorder, display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Fecha"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, stepBtn(-1, () => setEf((f) => ({ ...f, fecha: shiftDateM(f.fecha, -1) }))), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontWeight: 500, fontSize: 12.5, color: T.text, minWidth: 88, textAlign: "center" } }, dayLabelM(ef.fecha)), stepBtn(1, () => setEf((f) => ({ ...f, fecha: shiftDateM(f.fecha, 1) }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Hora"), /* @__PURE__ */ React.createElement("input", { type: "time", value: ef.time, onChange: (e) => setEf((f) => ({ ...f, time: e.target.value })), style: { ...inp, width: "auto" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Duraci\xF3n"), /* @__PURE__ */ React.createElement("select", { value: ef.dur, onChange: (e) => setEf((f) => ({ ...f, dur: e.target.value })), style: { ...inp, width: "auto" } }, ["15", "30", "45", "60", "90", "120"].map((d) => /* @__PURE__ */ React.createElement("option", { key: d, value: d }, d, " min")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, display: "block", marginBottom: 6 } }, "Procedimiento"), procOpts.length ? /* @__PURE__ */ React.createElement("select", { value: ef.proc, onChange: (e) => setEf((f) => ({ ...f, proc: e.target.value })), style: inp }, [ef.proc, ...procOpts.filter((p) => p !== ef.proc)].filter(Boolean).map((p) => /* @__PURE__ */ React.createElement("option", { key: p, value: p }, p))) : /* @__PURE__ */ React.createElement("input", { value: ef.proc, onChange: (e) => setEf((f) => ({ ...f, proc: e.target.value })), placeholder: "Procedimiento", style: inp })), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    updateAppt(a.id, { fecha: ef.fecha, day: isoToDayOff(ef.fecha), time: ef.time, dur: ef.dur + " minutos", proc: ef.proc });
    setEdit(false);
  }, style: { height: 44, borderRadius: 12, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 14, fontWeight: 600, cursor: "pointer" } }, "Guardar cambios")), waPhone && // Mismo mensaje que el botón "Confirmar asistencia" del portal de escritorio
  // (jcmConfirmAsistMsg): pide responder SÍ/NO, con fecha/hora en español y cómo llegar.
  /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://wa.me/56" + waPhone.replace(/^(56|0)/, "") + "?text=" + encodeURIComponent(jcmConfirmAsistMsgM(a, clinNombre)),
      target: "_blank",
      rel: "noopener",
      style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16, padding: "14px 8px", borderRadius: 14, background: T.green + "24", border: "1.4px solid " + T.green + "80", textDecoration: "none", color: T.green, fontFamily: T.sans, fontSize: 13.5, fontWeight: 600 }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.green, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.4 7.55L4 20l1.05-4.5A8.5 8.5 0 1 1 21 11.5Z" }), /* @__PURE__ */ React.createElement("path", { d: "M8.5 10.5c.3 2.5 2.5 4.7 5 5" })),
    "Confirmar asistencia por WhatsApp"
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
  const sep = bars ? /* @__PURE__ */ React.createElement("span", { style: { width: 1, height: 14, background: T.divider } }) : /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint } }, "\xB7");
  return /* @__PURE__ */ React.createElement("div", { style: { ...glassChip(T), borderRadius: bars ? 14 : 12, padding: bars ? "11px 10px" : "9px 12px", display: "flex", alignItems: "center", justifyContent: bars ? "space-around" : "center", gap: 8, flexWrap: "wrap" } }, dot("#46D27A", (prefix ? prefix + " " : "") + c + " confirmada" + (c === 1 ? "" : "s")), sep, dot("#6EA8E8", p + " pendiente" + (p === 1 ? "" : "s")), sep, dot("#FF6B7D", na + " no asisti\xF3"));
}
function HomeTab({ T, appts, patients, onOpenAppt, goTab, openOverlay, openNotif, bellCount }) {
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
  const primerNombre = (clinNombre || "").trim().split(/\s+/)[0] || "";
  const avatarSrc = (() => {
    try {
      return localStorage.getItem("jcm_admin_photo") || "";
    } catch (e) {
      return "";
    }
  })();
  const ini = (clinNombre || "JC").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const kpiCard = (label, val, sub, onClick) => /* @__PURE__ */ React.createElement("button", { onClick, style: { ...glassPanel(T, 16), display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0, padding: "12px 10px", textAlign: "left", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontWeight: 600, fontSize: 21, color: T.text, lineHeight: 1.1 } }, val), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 5, lineHeight: 1.25 } }, label), sub && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 2, lineHeight: 1.2 } }, sub));
  const tile = (icon, label, onClick, primary) => /* @__PURE__ */ React.createElement("button", { onClick, style: { ...glassPanel(T, 16), display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "12px 4px", cursor: "pointer", minWidth: 0 } }, primary ? /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: "50%", background: T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 6px 14px -6px " + T.accent } }, icon) : /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, flexShrink: 0 } }, icon), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, fontWeight: 500, color: T.text, textAlign: "center", lineHeight: 1.15 } }, label));
  const searchBar = /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, ...glassChip(T), borderRadius: 13, padding: "0 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4-4" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nombre, RUT o procedimiento\u2026", style: { flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontFamily: T.sans, fontSize: 13.5, padding: "11px 0" } }), q && /* @__PURE__ */ React.createElement("button", { onClick: () => setQ(""), "aria-label": "Limpiar b\xFAsqueda", style: { flexShrink: 0, width: 44, height: 44, margin: "0 -12px 0 -6px", background: "none", border: "none", color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
  const searchResultsBody = /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 14 } }, searchMatches.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 14), padding: "22px 16px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, 'Sin resultados para "', q.trim(), '".'), searchMatches.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, padding: "0 2px 2px" } }, searchMatches.length, " ", searchMatches.length === 1 ? "resultado" : "resultados", ' para "', q.trim(), '"'), searchResults.map((a) => {
    const st = apptStateM(a, T);
    return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer", borderRadius: 12, overflow: "hidden", padding: "10px 12px", ...apptCardTintM(st.color) } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.textMute, minWidth: 78 } }, dayLabelM(a.fecha || offToISO(a.day || 0)), " ", a.time), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: st.color, background: "color-mix(in srgb, " + st.color + " 18%, #141B26)", borderRadius: 6, padding: "3px 7px" } }, abbrevProcM(a.proc)));
  })));
  return (
    // Composición del prototipo: saludo + accesos rápidos + buscador quedan FIJOS; solo la lista
    // de "Próximas citas" scrollea. El header propio de la pestaña Inicio es esta tarjeta de
    // saludo (el prototipo no tiene barra superior separada en Inicio).
    /* @__PURE__ */ React.createElement("div", { style: { height: "100%", display: "flex", flexDirection: "column", padding: "calc(14px + env(safe-area-inset-top,0px)) 16px 0", background: T.heroBg } }, /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 20), display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", minHeight: 70 } }, avatarSrc ? /* @__PURE__ */ React.createElement("img", { src: avatarSrc, alt: "", style: { width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid " + T.accent } }) : /* @__PURE__ */ React.createElement("div", { style: { width: 42, height: 42, borderRadius: "50%", background: T.accentSoft, border: "1px solid " + T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontWeight: 600, fontSize: 15, color: T.accent } }, ini)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontWeight: 600, fontSize: 19, color: T.text, lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, primerNombre ? "Hola, " + primerNombre : "Hola"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.4, marginTop: 3 } }, fechaLarga)), /* @__PURE__ */ React.createElement("button", { onClick: openNotif, "aria-label": "Notificaciones", style: { position: "relative", width: 38, height: 38, borderRadius: "50%", background: T.flatFill, border: "1px solid " + T.flatBorder, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.text, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" })), bellCount > 0 && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 6, right: 7, width: 8, height: 8, borderRadius: "50%", background: T.accent, border: "1.5px solid " + T.glassFill } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 9 } }, tile(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })), "Nueva cita", () => goTab("nueva"), true), tile(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })), "Pacientes", () => openOverlay("pacientes")), tile(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 6v6l4 2" })), "Bloquear horario", () => goTab("horarios")), tile(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" })), "Reportes", () => openOverlay("reportes"))), searchBar), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column", marginTop: 12 } }, ql ? searchResultsBody : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 17, fontWeight: 600, color: T.text } }, "Pr\xF3ximas citas"), /* @__PURE__ */ React.createElement("button", { onClick: () => goTab("agenda"), style: { background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.accent, display: "flex", alignItems: "center", gap: 3 } }, "Ver agenda ", /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 14, display: "flex", flexDirection: "column", justifyContent: upcoming.length <= 4 ? "center" : "flex-start" } }, upcoming.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 14), padding: "26px 18px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: "50%", background: T.flatFill, border: "1px solid " + T.flatBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.5 } }, "No tienes pr\xF3ximas citas.", /* @__PURE__ */ React.createElement("br", null), "Agenda la primera para empezar el d\xEDa."), /* @__PURE__ */ React.createElement("button", { onClick: () => goTab("nueva"), style: { display: "inline-flex", alignItems: "center", gap: 6, ...glassChip(T), borderRadius: 10, padding: "9px 15px", color: T.text, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })), "Nueva cita")), upcoming.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, upcomingByDay.map((g) => /* @__PURE__ */ React.createElement("div", { key: g.fecha }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, fontWeight: 600, padding: "0 0 8px" } }, dayLabelM(g.fecha)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, g.items.map((a) => {
      const st = apptStateM(a, T);
      return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer", background: T.flatFill, border: "1px solid " + T.flatBorder, borderRadius: 14, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontWeight: 500, fontSize: 13.5, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 2 } }, a.proc || "\u2014"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", marginTop: 7, fontFamily: T.sans, fontWeight: 600, fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100, background: "color-mix(in srgb, " + st.color + " 16%, #141B26)", color: st.color } }, st.label)), /* @__PURE__ */ React.createElement("div", { style: { width: 1, alignSelf: "stretch", background: T.divider } }), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontWeight: 600, fontSize: 15, color: st.color } }, a.time), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 1 } }, apptEndM(a))));
    }))))), upcoming.length > 0 && upcoming.length < 8 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "20px 0 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, opacity: 0.7 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M8.5 12.3l2.4 2.4 4.6-5.2" })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Est\xE1s al d\xEDa \u2014 sin m\xE1s citas pr\xF3ximas."))))))
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
  const dateLabel = (() => {
    try {
      return (/* @__PURE__ */ new Date(selDay + "T12:00:00")).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
    } catch (e) {
      return selDay;
    }
  })();
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "6px 16px 90px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, textTransform: "capitalize", padding: "0 2px 8px" } }, dateLabel), /* @__PURE__ */ React.createElement("div", { className: "no-sb", style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, padding: "2px 2px 12px", minWidth: "max-content" } }, stripDays.map((d) => {
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
          background: isSel ? T.accentSoft : "transparent",
          border: "1px solid " + (isSel ? T.accentBorder : "transparent")
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, fontWeight: 500, color: isSel ? T.accentStrong : T.textMute } }, d.isToday ? "Hoy" : d.wd),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, fontWeight: 600, color: T.text } }, d.dd),
      /* @__PURE__ */ React.createElement("div", { style: { width: 5, height: 5, borderRadius: "50%", background: isSel ? T.accent : "transparent" } })
    );
  }))), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 16), padding: "14px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.green, fontWeight: 600 } }, availCount), " disponibles \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, blockedCount), " bloqueadas \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: T.gold, fontWeight: 600 } }, occupied.size), " con cita"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: openAll, style: { flex: 1, textAlign: "center", padding: 9, borderRadius: 100, border: "1.4px solid " + T.accent, background: "transparent", color: T.accentStrong, fontFamily: T.sans, fontWeight: 600, fontSize: 12, cursor: "pointer" } }, "Abrir todo"), /* @__PURE__ */ React.createElement("button", { onClick: blockAll, style: { flex: 1, textAlign: "center", padding: 9, borderRadius: 100, border: "1.4px solid " + T.red, background: "transparent", color: T.red, fontFamily: T.sans, fontWeight: 600, fontSize: 12, cursor: "pointer" } }, "Bloquear todo"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, padding: "0 2px 14px" } }, [[T.green, "Disponible"], [T.red, "Bloqueado"], [T.gold, "Con cita"]].map(([c, l]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: c } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, l)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 } }, slotsM().map((slot) => {
    const isOcc = occupied.has(slot);
    const isAvail = avail.includes(slot);
    const color = isOcc ? T.gold : isAvail ? T.green : T.red;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: slot,
        onClick: () => toggle(slot),
        disabled: isOcc,
        style: {
          textAlign: "center",
          padding: "10px 4px",
          borderRadius: 12,
          border: "1.4px solid " + color,
          fontFamily: T.sans,
          fontSize: 12,
          fontWeight: 600,
          cursor: isOcc ? "default" : "pointer",
          background: color + "1e",
          color
        }
      },
      slot,
      isOcc && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, marginTop: 2, color } }, "cita")
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
function normalizeProcM(proc) {
  return (proc || "").replace(/bioestimulaci[oó]n/i, "Sculptra");
}
function abbrevProcM(proc) {
  const p = (proc || "").toLowerCase();
  if (p.includes("botox") && p.includes("3 zona")) return "B3Z";
  if (p.includes("botox") && (p.includes("full face") || p.includes("8 zona"))) return "BFF";
  if (p.includes("rinomodela")) return "R";
  if (p.includes("sculptra") || p.includes("bioestim")) return "S";
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
  const [dayMode, setDayMode] = useState("list");
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
  const daySwipeRef = useRef(null);
  function onDaySwipeStart(e) {
    if (!e.touches || e.touches.length !== 1) {
      daySwipeRef.current = null;
      return;
    }
    const t = e.touches[0];
    if (t.clientX <= 30) {
      daySwipeRef.current = null;
      return;
    }
    daySwipeRef.current = { x: t.clientX, y: t.clientY };
  }
  function onDaySwipeEnd(e) {
    const start = daySwipeRef.current;
    daySwipeRef.current = null;
    if (!start || !e.changedTouches || !e.changedTouches.length) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x, dy = t.clientY - start.y;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
    setSelDay((d) => shiftDateM(d, dx < 0 ? 1 : -1));
  }
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
      borderRadius: 10,
      padding: "0 0 0 12px",
      overflow: "hidden",
      boxSizing: "border-box",
      opacity: isAnulada ? 0.55 : 1,
      ...apptCardTintM(st.color)
    } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: FRAUNCES, fontSize: 11.5, fontWeight: 500, color: st.color } }, a.time), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: isAnulada ? "line-through" : "none" } }, abbrevNameM(a.name)), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, marginRight: 10, fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: st.color, background: "color-mix(in srgb, " + st.color + " 18%, #141B26)", borderRadius: 5, padding: "2px 6px" } }, abbrevProcM(a.proc)));
  }
  const toggleRow = /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, padding: "5px 14px 4px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flex: 1, gap: 3, padding: 3, borderRadius: 11, ...glassChip(T) } }, [["dia", "D\xEDa"], ["mes", "Mes"]].map(([k, l]) => (
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
      ...view === k ? { background: T.accentSoft, color: T.accentStrong, border: "1px solid " + T.accentBorder } : { background: "transparent", color: T.textMute, border: "1px solid transparent" }
    } }, l)
  ))), showAnuladas && view === "dia" && /* @__PURE__ */ React.createElement("span", { style: { alignSelf: "center", fontFamily: T.sans, fontSize: 10.5, color: T.red, whiteSpace: "nowrap" } }, "Canceladas (", anuladasCount, ")"));
  const searchBar = /* @__PURE__ */ React.createElement("div", { style: { padding: "0 14px 5px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, ...glassChip(T), borderRadius: 13, padding: "0 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4-4" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nombre, RUT o procedimiento\u2026", style: { flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontFamily: T.sans, fontSize: 13.5, padding: "11px 0" } }), q && /* @__PURE__ */ React.createElement("button", { onClick: () => setQ(""), "aria-label": "Limpiar b\xFAsqueda", style: { flexShrink: 0, width: 44, height: 44, margin: "0 -12px 0 -6px", background: "none", border: "none", color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))));
  const searchResultsBody = /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "0 14px 16px" } }, searchMatches.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 14), padding: "22px 16px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, 'Sin resultados para "', q.trim(), '".'), searchMatches.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, padding: "0 2px 2px" } }, searchMatches.length, " ", searchMatches.length === 1 ? "resultado" : "resultados", ' para "', q.trim(), '"'), searchResults.map((a) => {
    const st = apptStateM(a, T);
    const isAnulada = a.status === "anulada";
    return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer", borderRadius: 12, overflow: "hidden", padding: "10px 12px", opacity: isAnulada ? 0.6 : 1, ...apptCardTintM(st.color) } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.textMute, minWidth: 78 } }, dayLabelM(a.fecha || offToISO(a.day || 0)), " ", a.time), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: isAnulada ? "line-through" : "none" } }, a.name), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: st.color, background: "color-mix(in srgb, " + st.color + " 18%, #141B26)", borderRadius: 6, padding: "3px 7px" } }, abbrevProcM(a.proc)));
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
        background: T.accent,
        border: "none",
        color: T.onAccent,
        cursor: "pointer",
        boxShadow: "0 12px 28px -10px rgba(10,25,55,.5)",
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
    }), style: { width: 44, height: 44, borderRadius: 999, ...glassChip(T), color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 } }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 19, fontWeight: 600, color: T.text } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: FRAUNCES, fontStyle: "italic", color: T.accent } }, MESES_LARGOS[monthCur.m]), " ", monthCur.y), /* @__PURE__ */ React.createElement("button", { onClick: () => setMonthCur((c) => {
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
        border: "1px solid " + (isToday ? T.accent : n ? T.flatBorder : "transparent"),
        opacity: c.inMonth ? 1 : 0.32
      } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 14, fontWeight: 600, color: isToday ? T.accent : T.text } }, c.dd), n > 0 && /* @__PURE__ */ React.createElement("span", { style: { display: "flex", gap: 2 } }, Array.from({ length: Math.min(n, 3) }).map((_, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { width: 5, height: 5, borderRadius: "50%", background: T.accent } }))));
    })))), fab);
  }
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" } }, toggleRow, searchBar, ql ? searchResultsBody : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { ref: stripRef, style: { overflowX: "auto", flexShrink: 0, WebkitOverflowScrolling: "touch" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", padding: "5px 10px 3px", minWidth: "max-content", gap: 2 } }, stripDays.map((d) => {
    const isSel = d.iso === selDay;
    const hasApts = (apptCountByDate[d.iso] || 0) > 0;
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
          gap: 3,
          padding: "6px 8px 5px",
          borderRadius: 14,
          minWidth: 44,
          cursor: "pointer",
          background: "transparent",
          border: "1.4px solid " + (isSel ? T.accent : "transparent")
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, fontWeight: 500, color: T.textFaint } }, d.wd),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, fontWeight: 600, color: isSel ? T.accent : d.isToday ? T.text : T.textMute, lineHeight: 1.15 } }, d.dd),
      /* @__PURE__ */ React.createElement("div", { style: { width: 5, height: 5, borderRadius: "50%", background: isSel ? T.accent : hasApts ? T.textFaint : "transparent" } })
    );
  }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setDayMode((m) => m === "list" ? "cal" : "list"), style: { margin: "6px 16px 6px", flexShrink: 0, width: "calc(100% - 32px)", background: T.flatFill, border: "1px solid " + T.flatBorder, borderRadius: 16, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left", fontFamily: "inherit" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "8.5" }), /* @__PURE__ */ React.createElement("path", { d: "M12 7.5V12l3 2" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontWeight: 500, fontSize: 13, color: T.text } }, dayMode === "list" ? "Ver horarios disponibles" : "Ver lista de citas")), /* @__PURE__ */ React.createElement("svg", { width: "8", height: "14", viewBox: "0 0 8 14", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M1 1l6 6-6 6", stroke: T.textFaint, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }))), dayMode === "list" ? /* @__PURE__ */ React.createElement("div", { onTouchStart: onDaySwipeStart, onTouchEnd: onDaySwipeEnd, className: "no-sb", style: { flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "0 16px 8px", display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text } }, (() => {
    const d = /* @__PURE__ */ new Date(selDay + "T12:00:00");
    return selDay === today ? "Hoy \xB7 " + DOW_FULL[d.getDay()] : DOW_FULL[d.getDay()] + " " + d.getDate() + " de " + MESES_LARGOS[d.getMonth()].toLowerCase();
  })()), dayAppts.map((a) => {
    const st = apptStateM(a, T);
    const isAnulada = a.status === "anulada";
    return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer", background: T.flatFill, border: "1px solid " + T.flatBorder, borderRadius: 14, padding: "12px 14px", opacity: isAnulada ? 0.6 : 1 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", fontFamily: T.sans, fontWeight: 700, fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100, color: st.color, background: "color-mix(in srgb, " + st.color + " 16%, #141B26)", marginBottom: 7 } }, st.label), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontWeight: 500, fontSize: 13.5, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: isAnulada ? "line-through" : "none" } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.proc || "\u2014")), /* @__PURE__ */ React.createElement("div", { style: { width: 1, alignSelf: "stretch", background: T.divider } }), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: FRAUNCES, fontWeight: 600, fontSize: 15, color: st.color } }, a.time), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 1 } }, endTimeM(a))));
  }), dayAppts.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "34px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.textMute } }, showAnuladas ? "Sin citas canceladas este d\xEDa" : "Sin citas este d\xEDa"), !showAnuladas && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Toca + para agendar una cita.")), !showAnuladas && anuladasCount > 0 && /* @__PURE__ */ React.createElement("button", { onClick: () => setShowAnuladas(true), style: { width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px 0 4px", cursor: "pointer", fontFamily: "inherit" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Ver citas anuladas"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "(", anuladasCount, ")")), /* @__PURE__ */ React.createElement("div", { style: { height: 88, flexShrink: 0 } })) : /* @__PURE__ */ React.createElement("div", { ref: dayRef, onTouchStart: onDaySwipeStart, onTouchEnd: onDaySwipeEnd, style: { flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginLeft: 48, paddingRight: 12 } }, CAL_HOURS.map((h) => /* @__PURE__ */ React.createElement("div", { key: h, style: { position: "absolute", left: -48, right: 0, top: (h - CAL_START) * CAL_PX_HOUR, display: "flex", alignItems: "flex-start", zIndex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, width: 42, textAlign: "right", paddingRight: 8, lineHeight: 1, transform: "translateY(-5px)", flexShrink: 0 } }, h < 10 ? "0" + h : "" + h, ":00"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, borderTop: "1px solid " + T.divider, marginTop: 0 } }))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", minHeight: (CAL_END - CAL_START) * CAL_PX_HOUR + 40 } }, dayAppts.map((a) => apptBlock(a))), dayAppts.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "46%", left: 0, right: 0, transform: "translateY(-50%)", textAlign: "center", pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.textMute } }, showAnuladas ? "Sin citas canceladas este d\xEDa" : "Sin citas este d\xEDa"), !showAnuladas && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Toca + para agendar una cita."))))), fab);
}
function NuevaWizard({ T, appts, patients, addAppt, addPatient, onDone }) {
  const [tipo, setTipo] = useState("existente");
  const [pid, setPid] = useState("");
  const [pq, setPq] = useState("");
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
  const [calOpen, setCalOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(() => /* @__PURE__ */ new Date(todayISO() + "T12:00:00"));
  useEffect(() => {
    setCalMonth(/* @__PURE__ */ new Date((fecha || todayISO()) + "T12:00:00"));
  }, [fecha]);
  const [time, setTime] = useState("10:00");
  const [proc, setProc] = useState(procs[0] || "Evaluaci\xF3n general");
  const [dur, setDur] = useState("30 minutos");
  const [comment, setComment] = useState("");
  const [notifyWa, setNotifyWa] = useState(true);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (window.JCDATA && window.JCDATA.procMin) setDur(window.JCDATA.procMin(proc) + " minutos");
  }, [proc]);
  const patientOptions = patients.slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  const selectedPatient = patients.find((p) => p.id === pid) || null;
  const finalName = tipo === "existente" ? selectedPatient ? selectedPatient.name : "" : name;
  const finalPhone = tipo === "existente" ? selectedPatient ? selectedPatient.phone : "" : phone;
  const finalRut = tipo === "existente" ? selectedPatient ? selectedPatient.rut : "" : rut;
  const finalEmail = tipo === "existente" ? selectedPatient ? selectedPatient.email : "" : email;
  const patientOk = tipo === "existente" ? !!selectedPatient : name.trim() && (sinRut || rutOk) && phoneOk;
  const canSave = patientOk && !!proc && !!fecha && !!time;
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
    if (!canSave || saved) return;
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
  const inp = { width: "100%", boxSizing: "border-box", fontFamily: T.sans, fontSize: 14, padding: "11px 12px", borderRadius: 12, border: "1px solid " + T.inputBorder, background: T.inputFill, color: T.text, outline: "none" };
  const lbl = { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 6 };
  const stepBtn = (dir, onClick) => /* @__PURE__ */ React.createElement("button", { onClick, "aria-label": dir < 0 ? "D\xEDa anterior" : "D\xEDa siguiente", style: { width: 44, height: 44, borderRadius: "50%", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 28, height: 28, borderRadius: "50%", background: T.glassFill, border: "1px solid " + T.glassBorder, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: T.text, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7" }))));
  return (
    // El título "Nueva cita" ya vive en el header de la pestaña; aquí va el formulario del prototipo.
    /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 90px", display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["existente", "Paciente existente"], ["nuevo", "Paciente nuevo"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTipo(k), style: {
      flex: 1,
      fontFamily: T.sans,
      fontSize: 12,
      fontWeight: tipo === k ? 700 : 500,
      padding: "11px 6px",
      borderRadius: 10,
      cursor: "pointer",
      border: "1px solid " + (tipo === k ? T.accent : T.inputBorder),
      background: tipo === k ? T.accentSoft : "transparent",
      color: tipo === k ? T.accentStrong : T.textMute
    } }, l))), tipo === "existente" ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Paciente"), selectedPatient ? (
      // Paciente elegido: tarjeta con datos + botón para cambiar (limpia la selección).
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, background: T.flatFill, border: "1px solid " + T.accentBorder, borderRadius: 12, padding: "11px 13px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: "50%", background: T.accentSoft, border: "1px solid " + T.accentBorder, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontWeight: 600, fontSize: 12, color: T.accentStrong } }, (selectedPatient.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase())), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontWeight: 600, fontSize: 13.5, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, selectedPatient.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, [selectedPatient.rut, selectedPatient.phone].filter(Boolean).join(" \xB7 "))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
        setPid("");
        setPq("");
      }, "aria-label": "Cambiar paciente", style: { flexShrink: 0, background: "none", border: "none", color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 12 } }, "Cambiar"))
    ) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, background: T.inputFill, border: "1px solid " + T.inputBorder, borderRadius: 12, padding: "0 12px" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.7", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "10.5", cy: "10.5", r: "6" }), /* @__PURE__ */ React.createElement("path", { d: "M20 20l-5-5" })), /* @__PURE__ */ React.createElement("input", { value: pq, onChange: (e) => setPq(e.target.value), placeholder: "Buscar por nombre o RUT\u2026", autoFocus: true, style: { flex: 1, background: "none", border: "none", outline: "none", color: T.text, fontFamily: T.sans, fontSize: 14, padding: "11px 0", minWidth: 0 } })), (() => {
      const q = pq.trim().toLowerCase();
      const res = q.length >= 1 ? patientOptions.filter((p) => (p.name || "").toLowerCase().includes(q) || (p.rut || "").toLowerCase().includes(q)).slice(0, 8) : patientOptions.slice(0, 8);
      if (!res.length) return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, padding: "9px 2px 0" } }, 'Sin coincidencias. Prueba con "Paciente nuevo".');
      return /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, display: "flex", flexDirection: "column", gap: 6, maxHeight: 214, overflowY: "auto" }, className: "no-sb" }, res.map((p) => /* @__PURE__ */ React.createElement("button", { key: p.id, onClick: () => {
        setPid(p.id);
      }, style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer", background: T.flatFill, border: "1px solid " + T.flatBorder, borderRadius: 11, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: T.accentSoft, border: "1px solid " + T.accentBorder, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontWeight: 600, fontSize: 11, color: T.accentStrong } }, (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase())), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.name), p.rut && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, p.rut)))));
    })())) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Nombre completo"), /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Nombre y apellido", style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "RUT"), /* @__PURE__ */ React.createElement("input", { value: rut, onChange: (e) => onRut(e.target.value), disabled: sinRut, inputMode: "numeric", placeholder: sinRut ? "Sin RUT" : "12.345.678-9", style: { ...inp, opacity: sinRut ? 0.5 : 1, borderColor: sinRut || rutOk || !rut ? T.inputBorder : T.red } })), !sinRut && rut && !rutOk && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.red, marginTop: -6 } }, "Revisa el RUT: el d\xEDgito verificador no coincide."), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 9, cursor: "pointer", marginTop: -4 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: sinRut, onChange: (e) => {
      setSinRut(e.target.checked);
      if (e.target.checked) setRut("");
    } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Paciente extranjero / sin RUT")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Tel\xE9fono"), /* @__PURE__ */ React.createElement("input", { type: "tel", inputMode: "numeric", value: phone, onChange: (e) => onPhone(e.target.value), style: { ...inp, borderColor: phoneOk ? T.inputBorder : T.red } })), !phoneOk && phone.length > PHONE_PFX.length && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.red, marginTop: -6 } }, "Ingresa los 8 d\xEDgitos del tel\xE9fono."), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Correo (opcional)"), /* @__PURE__ */ React.createElement("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "correo@ejemplo.com", style: inp }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Procedimiento"), /* @__PURE__ */ React.createElement("select", { value: proc, onChange: (e) => setProc(e.target.value), style: inp }, /* @__PURE__ */ React.createElement("option", null, "Evaluaci\xF3n general"), procs.map((p) => /* @__PURE__ */ React.createElement("option", { key: p, value: p }, p)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Fecha"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, stepBtn(-1, () => setFecha((f) => shiftDateM(f, -1))), /* @__PURE__ */ React.createElement("button", { onClick: () => setCalOpen((o) => !o), "aria-label": "Abrir calendario", style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, minWidth: 100, height: 30, padding: "0 10px", borderRadius: 10, background: calOpen ? T.accentSoft : "none", border: "1px solid " + (calOpen ? T.accentBorder : "transparent"), cursor: "pointer" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontWeight: 500, fontSize: 12.5, color: T.text } }, dayLabelM(fecha)), /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round", style: { transform: calOpen ? "rotate(180deg)" : "none", transition: "transform .2s" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), stepBtn(1, () => setFecha((f) => shiftDateM(f, 1))))), calOpen && (() => {
      const y = calMonth.getFullYear(), m = calMonth.getMonth();
      const startOff = (new Date(y, m, 1).getDay() + 6) % 7;
      const nDays = new Date(y, m + 1, 0).getDate();
      const cells = [];
      for (let i = 0; i < startOff; i++) cells.push(null);
      for (let d = 1; d <= nDays; d++) cells.push(d);
      const navMonth = (delta) => setCalMonth(new Date(y, m + delta, 1));
      return /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 16), padding: "12px 12px 10px", marginTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => navMonth(-1), "aria-label": "Mes anterior", style: { width: 30, height: 30, borderRadius: 9, background: T.glassFill, border: "1px solid " + T.glassBorder, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: T.text, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 5l-7 7 7 7" }))), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 15, fontWeight: 600, color: T.text } }, MESES_LARGOS[m], " ", y), /* @__PURE__ */ React.createElement("button", { onClick: () => navMonth(1), "aria-label": "Mes siguiente", style: { width: 30, height: 30, borderRadius: 9, background: T.glassFill, border: "1px solid " + T.glassBorder, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: T.text, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 5l7 7-7 7" })))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 } }, ["Lu", "Ma", "Mi", "Ju", "Vi", "S\xE1", "Do"].map((w) => /* @__PURE__ */ React.createElement("div", { key: w, style: { textAlign: "center", fontFamily: T.sans, fontSize: 10, color: T.textFaint, padding: "2px 0" } }, w))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 } }, cells.map((d, i) => {
        if (d == null) return /* @__PURE__ */ React.createElement("div", { key: "e" + i });
        const iso = localISO(new Date(y, m, d));
        const isSel = iso === fecha, isToday = iso === todayISO();
        return /* @__PURE__ */ React.createElement(
          "button",
          {
            key: iso,
            onClick: () => {
              setFecha(iso);
              setCalOpen(false);
            },
            style: {
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background: isSel ? T.accent : "transparent",
              color: isSel ? T.onAccent : T.text,
              fontFamily: T.sans,
              fontSize: 13.5,
              fontWeight: isSel || isToday ? 600 : 400,
              boxShadow: !isSel && isToday ? "inset 0 0 0 1px " + T.accentBorder : "none"
            }
          },
          d
        );
      })));
    })()), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Hora"), /* @__PURE__ */ React.createElement("select", { value: time, onChange: (e) => setTime(e.target.value), style: { ...inp, width: "auto" } }, (() => {
      const base = freeSlots.length ? freeSlots : slotsM();
      const opts = base.indexOf(time) >= 0 ? base : [time, ...base];
      return opts.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s, " hrs"));
    })())), freeSlots.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.red, marginTop: -8 } }, "No hay horas marcadas como disponibles para este d\xEDa."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Duraci\xF3n"), /* @__PURE__ */ React.createElement("select", { value: dur, onChange: (e) => setDur(e.target.value), style: { ...inp, width: "auto" } }, ["15 minutos", "30 minutos", "45 minutos", "60 minutos", "75 minutos", "90 minutos", "120 minutos"].map((d) => /* @__PURE__ */ React.createElement("option", { key: d }, d)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Comentario (opcional)"), /* @__PURE__ */ React.createElement("textarea", { value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Ej. Control, seguimiento, evaluaci\xF3n\u2026", rows: 2, style: { ...inp, resize: "none" } })), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 9, cursor: "pointer", padding: "11px 13px", borderRadius: 12, background: T.flatFill, border: "1px solid " + T.flatBorder } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: notifyWa, onChange: (e) => setNotifyWa(e.target.checked) }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, "Notificar al paciente por WhatsApp")), /* @__PURE__ */ React.createElement("button", { onClick: confirm, disabled: !canSave || saved, style: { marginTop: 4, height: 50, borderRadius: 14, border: "none", background: saved ? T.green : T.accent, color: saved ? "#fff" : T.onAccent, fontFamily: T.sans, fontSize: 15, fontWeight: 600, cursor: canSave && !saved ? "pointer" : "not-allowed", opacity: canSave || saved ? 1 : 0.5, transition: "background .3s" } }, saved ? "\u2713 Cita guardada" : "Guardar cita"))
  );
}
function PacientesOverlay({ T, patients, appts, onBack, onOpenFicha, addPatient }) {
  const [q, setQ] = useState("");
  const [nuevo, setNuevo] = useState(false);
  const [f, setF] = useState({ name: "", rut: "", phone: "+56 9 ", email: "" });
  const ql = q.trim().toLowerCase();
  const opened = (() => {
    try {
      return window.DB && window.DB.get("pat_opened") || {};
    } catch (e) {
      return {};
    }
  })();
  const list = (ql ? patients.filter((p) => (p.name || "").toLowerCase().includes(ql) || (p.rut || "").toLowerCase().includes(ql) || (p.phone || "").includes(ql)) : patients).slice().sort((a, b) => (opened[b.id] || 0) - (opened[a.id] || 0));
  function openFicha(id) {
    try {
      const m = window.DB && window.DB.get("pat_opened") || {};
      m[id] = Date.now();
      window.DB && window.DB.set("pat_opened", m);
    } catch (e) {
    }
    onOpenFicha(id);
  }
  const PAGE = 60;
  const [visibleCount, setVisibleCount] = useState(PAGE);
  useEffect(() => {
    setVisibleCount(PAGE);
  }, [ql]);
  const visible = list.slice(0, visibleCount);
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 14, padding: "11px 13px", borderRadius: 9, border: "1px solid " + T.inputBorder, background: T.inputFill, color: T.text, outline: "none", boxSizing: "border-box" };
  function saveNuevo() {
    if (!f.name.trim()) return;
    const np = addPatient({ name: f.name.trim(), rut: f.rut.trim(), phone: f.phone.trim(), email: f.email.trim(), age: 0 });
    setNuevo(false);
    setF({ name: "", rut: "", phone: "+56 9 ", email: "" });
    openFicha(np.id);
  }
  return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Pacientes", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 10, ...glassChip(T), borderRadius: 13, padding: "0 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4-4" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nombre, RUT o tel\xE9fono\u2026", style: { flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontFamily: T.sans, fontSize: 14, padding: "13px 0" } })), /* @__PURE__ */ React.createElement("button", { onClick: () => setNuevo((v) => !v), "aria-label": "Nuevo paciente", style: { flexShrink: 0, width: 50, borderRadius: 13, border: "none", background: T.accent, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px -8px " + T.accent } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })))), nuevo && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 12), padding: "13px 14px", display: "flex", flexDirection: "column", gap: 9 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent } }, "Nuevo paciente"), /* @__PURE__ */ React.createElement("input", { value: f.name, onChange: (e) => setF((s) => ({ ...s, name: e.target.value })), placeholder: "Nombre completo", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.rut, onChange: (e) => setF((s) => ({ ...s, rut: e.target.value })), placeholder: "RUT (opcional)", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.phone, onChange: (e) => setF((s) => ({ ...s, phone: e.target.value })), placeholder: "+56 9 1234 5678", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.email, onChange: (e) => setF((s) => ({ ...s, email: e.target.value })), placeholder: "Correo (opcional)", style: inp }), /* @__PURE__ */ React.createElement("button", { onClick: saveNuevo, disabled: !f.name.trim(), style: { background: T.accent, color: T.onAccent, border: "none", borderRadius: 9, padding: "12px", fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer", opacity: f.name.trim() ? 1 : 0.5 } }, "Guardar paciente")), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 18), display: "flex", flexDirection: "column", overflow: "hidden" } }, list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "30px 0", fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Sin pacientes", ql ? " que coincidan" : "", "."), visible.map((p, i) => {
    const nextA = appts.filter((a) => (a.patId === p.id || a.name === p.name) && a.status !== "anulada" && (a.fecha || offToISO(a.day || 0)) >= todayISO()).sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""))[0];
    return /* @__PURE__ */ React.createElement("button", { key: p.id, onClick: () => openFicha(p.id), style: { display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: i === visible.length - 1 ? "none" : "1px solid " + T.divider, padding: "11px 14px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: T.accentSoft, color: T.accentStrong, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 12.5, fontWeight: 600 } }, (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15.5, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 } }, [p.rut, p.phone].filter(Boolean).join(" \xB7 "))), nextA && /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, color: T.accentStrong } }, nextA.fecha === todayISO() ? "Hoy " + nextA.time : (() => {
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
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 14, padding: "11px 13px", borderRadius: 9, border: "1px solid " + T.inputBorder, background: T.inputFill, color: T.text, outline: "none", boxSizing: "border-box" };
  function save() {
    updatePatient(p.id, { phone: f.phone.trim(), email: f.email.trim(), notas: f.notas.trim() });
    setEdit(false);
  }
  return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Ficha del paciente", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 40px", display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 56, height: 56, borderRadius: "50%", background: T.accentSoft, border: "1px solid " + T.accentBorder, color: T.accentStrong, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 19, fontWeight: 700, flexShrink: 0 } }, (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, [p.rut, p.age ? p.age + " a\xF1os" : ""].filter(Boolean).join(" \xB7 ")))), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 12), padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, "Contacto"), !edit && /* @__PURE__ */ React.createElement("button", { onClick: () => setEdit(true), style: { background: "none", border: "none", color: T.accent, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } }, "Editar")), edit ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: f.phone, onChange: (e) => setF((s) => ({ ...s, phone: e.target.value })), placeholder: "Tel\xE9fono", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.email, onChange: (e) => setF((s) => ({ ...s, email: e.target.value })), placeholder: "Correo", style: inp }), /* @__PURE__ */ React.createElement("textarea", { value: f.notas, onChange: (e) => setF((s) => ({ ...s, notas: e.target.value })), placeholder: "Notas (alergias, preferencias, etc.)", rows: 2, style: { ...inp, resize: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
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
    const k = normalizeProcM(a.proc) || "Sin especificar";
    (porProc[k] || (porProc[k] = [])).push(a);
  });
  const topProc = Object.keys(porProc).map((k) => {
    const list = porProc[k].slice().sort((a, b) => (a.fecha || "").localeCompare(b.fecha || "") || minsM(a.time) - minsM(b.time));
    const real = list.filter((a) => a.status === "atendida" || a.attended).length;
    return { name: k, list, real, pend: list.length - real, n: list.length };
  }).sort((a, b) => b.n - a.n).slice(0, 5);
  const maxProc = topProc[0] ? topProc[0].n : 1;
  const todayIso = todayISO();
  const todayA = appts.filter((a) => (a.fecha || offToISO(a.day || 0)) === todayIso && a.status !== "anulada");
  const dayBars = [
    { label: "Agendadas", color: "#6EA8E8", count: todayA.filter((a) => !(a.status === "confirmada" || a.status === "atendida" || a.attended || a.status === "no_asistio")).length },
    { label: "Confirmadas", color: "#46D27A", count: todayA.filter((a) => a.status === "confirmada").length },
    { label: "Atendidas", color: "#F5B93D", count: todayA.filter((a) => a.status === "atendida" || a.attended).length },
    { label: "No asisti\xF3", color: "#FF6B7D", count: todayA.filter((a) => a.status === "no_asistio").length }
  ];
  const dayMax = Math.max(1, ...dayBars.map((b) => b.count));
  const todayLabelStr = (() => {
    const d = /* @__PURE__ */ new Date();
    return WDS[d.getDay()] + " " + d.getDate() + " " + MESES[d.getMonth()];
  })();
  const weekTotal = Math.max(1, weekAppts.filter((a) => a.status !== "anulada").length);
  const RIC = {
    cal: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" })),
    check: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M8 12l3 3 5-6" })),
    user: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M5 21v-1a6 6 0 0 1 12 0v1" })),
    xmark: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M15 9l-6 6M9 9l6 6" })),
    pct: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M8 15l8-6" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "9", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "15", r: "1" }))
  };
  const row = (icon, iconColor, label, val, valColor, last, barPct) => /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 0", borderBottom: last ? "none" : "1px solid " + T.divider } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: iconColor + "22", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" } }, icon), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 15, color: T.text } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 17, fontWeight: 700, color: valColor || T.text } }, val)), barPct != null && /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 100, background: T.divider, overflow: "hidden", marginTop: 9 } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", borderRadius: 100, width: Math.max(0, Math.min(100, barPct)) + "%", background: iconColor } })));
  return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Reportes", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 40px", display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 16), padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontWeight: 500, fontSize: 11.5, color: T.textMute, marginBottom: 10, textTransform: "capitalize" } }, "Resumen del d\xEDa \xB7 ", todayLabelStr), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 16, height: 44 } }, dayBars.map((b) => /* @__PURE__ */ React.createElement("div", { key: b.label, style: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 16, borderRadius: "5px 5px 2px 2px", background: b.color, height: Math.round(b.count / dayMax * 100) + "%", minHeight: 4 } })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, marginTop: 8 } }, dayBars.map((b) => /* @__PURE__ */ React.createElement("div", { key: b.label, style: { flex: 1, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontWeight: 600, fontSize: 14, color: T.text } }, b.count), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, color: T.textFaint, marginTop: 1 } }, b.label))))), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 20), padding: "6px 16px 8px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, fontWeight: 600, padding: "14px 0 6px" } }, "Esta semana"), row(RIC.cal, "#7FA8E8", "Citas totales", weekAppts.filter((a) => a.status !== "anulada").length, null, false, 100), row(RIC.check, "#46D27A", "Confirmadas", countBy(weekAppts, (a) => a.status === "confirmada" || a.status === "atendida"), "#46D27A", false, countBy(weekAppts, (a) => a.status === "confirmada" || a.status === "atendida") / weekTotal * 100), row(RIC.user, T.accentStrong, "Atendidas", countBy(weekAppts, (a) => a.status === "atendida" || a.attended), T.accentStrong, false, countBy(weekAppts, (a) => a.status === "atendida" || a.attended) / weekTotal * 100), row(RIC.user, "#FF6B7D", "No asisti\xF3", countBy(weekAppts, (a) => a.status === "no_asistio"), "#FF6B7D", false, countBy(weekAppts, (a) => a.status === "no_asistio") / weekTotal * 100), row(RIC.xmark, "#9AA6B2", "Canceladas", countBy(weekAppts, (a) => a.status === "anulada"), null, false, countBy(weekAppts, (a) => a.status === "anulada") / weekTotal * 100), row(RIC.pct, noShowRate > 15 ? "#FF6B7D" : "#46D27A", "Tasa de inasistencia", noShowRate + "%", noShowRate > 15 ? "#FF6B7D" : "#46D27A", true, noShowRate)), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 20), padding: "6px 16px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, fontWeight: 600, padding: "14px 0 2px" } }, "Procedimientos del mes"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, padding: "0 0 10px", lineHeight: 1.5 } }, "Incluye lo agendado para lo que resta del mes, no solo lo ya atendido \u2014 para anticipar stock."), topProc.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "6px 0 12px" } }, "Sin datos este mes."), topProc.map((t, i) => {
    const open = expanded === t.name;
    return /* @__PURE__ */ React.createElement("div", { key: t.name, style: { borderBottom: i === topProc.length - 1 && !open ? "none" : "1px solid " + T.divider } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setExpanded(open ? null : t.name), style: { display: "flex", alignItems: "center", gap: 13, padding: "11px 0", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: 9, flexShrink: 0, background: T.accentSoft, color: T.accentStrong, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 13, fontWeight: 700 } }, i + 1), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 15, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, t.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.text, marginLeft: 8, flexShrink: 0 } }, t.n)), /* @__PURE__ */ React.createElement("div", { style: { height: 6, borderRadius: 100, background: T.divider, overflow: "hidden", marginTop: 8, display: "flex" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: Math.round(t.pend / maxProc * 100) + "%", background: T.accent } }), /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: Math.round(t.real / maxProc * 100) + "%", background: T.gold } })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 } }, t.pend, " agendados \xB7 ", t.real, " realizados")), /* @__PURE__ */ React.createElement("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), open && (() => {
      const upcomingAg = t.list.filter((a) => !(a.status === "atendida" || a.attended) && (a.fecha || offToISO(a.day || 0)) >= todayIso);
      return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7, padding: "0 0 12px 43px" } }, upcomingAg.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textFaint } }, "Sin pr\xF3ximos agendados"), upcomingAg.map((a) => /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer", background: "none", border: "none", padding: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.textFaint, width: 56 } }, dayLabelM(a.fecha || offToISO(a.day || 0))), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name || "Paciente"), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.accentStrong } }, "Agendado"))));
    })());
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
      sample: { nombre: "Mar\xEDa P\xE9rez", primernombre: "Mar\xEDa", clinica: clinNombre, fecha: "S\xE1b 11 Jul", hora: "13:45", tratamiento: "Rinomodelaci\xF3n", profesional: cfg.professional && ("" + cfg.professional).trim() || "Profesional a cargo", direccion: cfg.clinic_addr && ("" + cfg.clinic_addr).trim() || "Direcci\xF3n de tu cl\xEDnica", mapa: "https://www.medique.cl/ir?c=\u2026", politica: "" }
    },
    {
      key: "msg_tpl_asist",
      label: "Confirmar asistencia",
      def: window.DEFAULT_TPL_ASIST,
      sample: { nombre: "Mar\xEDa P\xE9rez", primernombre: "Mar\xEDa", clinica: clinNombre, fecha: "s\xE1bado 11 de julio", hora: "13:45", tratamiento: "Rinomodelaci\xF3n", mapa: "https://www.medique.cl/ir?c=\u2026" }
    },
    {
      key: "msg_tpl_recita",
      label: "Campa\xF1a de re-cita",
      def: window.DEFAULT_TPL_RECITA,
      sample: { primernombre: "Mar\xEDa", clinica: clinNombre, mensaje: "Tu siguiente sesi\xF3n de Sculptra potencia y prolonga tu col\xE1geno (vas en la sesi\xF3n 2 de 3)", precio_linea: " El valor actual es de $450.000 y, por ser parte de la cl\xEDnica, te lo dejamos en $400.000." }
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
  const inp = { width: "100%", fontFamily: "ui-monospace, monospace", fontSize: 12.5, padding: "11px 13px", borderRadius: 9, border: "1px solid " + T.inputBorder, background: T.inputFill, color: T.text, outline: "none", boxSizing: "border-box", lineHeight: 1.6 };
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
      style: { fontFamily: "ui-monospace, monospace", fontSize: 11, color: T.accent, background: T.flatFill, border: "1px solid " + T.flatBorder, borderRadius: 7, padding: "4px 8px", cursor: "pointer" }
    },
    "{" + tk.k + "}"
  ))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.6 } }, tokens.map((tk) => tk.k + ": " + tk.d).join(" \xB7 ")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Vista previa"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, background: T.inputFill, border: "1px solid " + T.flatBorder, borderRadius: 10, padding: "11px 13px", whiteSpace: "pre-wrap", lineHeight: 1.6 } }, preview)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: restore, style: { flex: 1, height: 38, borderRadius: 8, border: "1px solid " + T.inputBorder, background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 12, cursor: "pointer" } }, "Restaurar predeterminado"), /* @__PURE__ */ React.createElement("button", { onClick: save, style: { flex: 1, height: 38, borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, savedFlag ? "Guardado \u2713" : "Guardar"))));
}
function MasTab({ T, mode, toggleMode, openOverlay, onLogout, openNotif, goAnuladas }) {
  const clinNombre = (() => {
    try {
      const n = window.DB && window.DB.cfg && window.DB.cfg().clinic_name;
      return n && ("" + n).trim() || "";
    } catch (e) {
      return "";
    }
  })();
  const ini = (clinNombre || "JC").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const avatarSrc = (() => {
    try {
      return localStorage.getItem("jcm_admin_photo") || "";
    } catch (e) {
      return "";
    }
  })();
  const row = (icon, label, onClick, last) => /* @__PURE__ */ React.createElement("button", { onClick, style: { display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: last ? "none" : "1px solid " + T.divider, padding: "15px 16px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { color: T.accent, display: "flex", flexShrink: 0 } }, icon), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 14, color: T.text } }, label), /* @__PURE__ */ React.createElement("svg", { width: "8", height: "14", viewBox: "0 0 8 14", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M1 1l6 6-6 6", stroke: T.textFaint, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })));
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "calc(16px + env(safe-area-inset-top,0px)) 18px 120px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontWeight: 600, fontSize: 27, color: T.text, marginBottom: 16 } }, "Men\xFA"), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 18), display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", marginBottom: 18 } }, avatarSrc ? /* @__PURE__ */ React.createElement("img", { src: avatarSrc, alt: "", style: { width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid " + T.accent } }) : /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: "50%", background: T.accentSoft, border: "1px solid " + T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontWeight: 600, fontSize: 15, color: T.accent } }, ini)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontWeight: 500, fontSize: 14.5, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, clinNombre || "Medique"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 1 } }, "Panel de la cl\xEDnica"))), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 18), overflow: "hidden", marginBottom: 14 } }, mobileCan("pacientes") && row(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })), "Pacientes", () => openOverlay("pacientes")), mobileCan("reportes") && row(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" })), "Reportes", () => openOverlay("reportes")), row(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" })), "Notificaciones", openNotif), row(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 9a8 8 0 1 1 1.3 6.5" }), /* @__PURE__ */ React.createElement("path", { d: "M4 4v5h5" })), "Citas anuladas", goAnuladas), mobileCan("plantillas") && row(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })), "Plantillas de mensajes", () => openOverlay("plantillas")), row(/* @__PURE__ */ React.createElement("svg", { id: "jcm-mob-rfab-icon2", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M8 16H3v5" })), "Actualizar datos", () => {
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
  }, true)), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 18), display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4.2" }), /* @__PURE__ */ React.createElement("path", { d: "M12 3v2.2M12 18.8V21M4.2 12H2.4M21.6 12h-1.8M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" })), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 14, color: T.text } }, "Modo claro"), /* @__PURE__ */ React.createElement("button", { onClick: toggleMode, "aria-label": "Cambiar tema", style: { width: 44, height: 26, borderRadius: 100, background: mode === "light" ? T.accent : T.flatBorder, position: "relative", cursor: "pointer", border: "none", flexShrink: 0, transition: "background .2s" } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 2, left: mode === "light" ? 20 : 2, width: 22, height: 22, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.3)", transition: "left .2s" } }))), /* @__PURE__ */ React.createElement("button", { onClick: onLogout, style: { ...glassPanel(T, 18), display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "15px 16px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#FF6B7D", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" }), /* @__PURE__ */ React.createElement("path", { d: "M10 8l-4 4 4 4" }), /* @__PURE__ */ React.createElement("path", { d: "M6 12h12" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 14, color: "#FF6B7D" } }, "Cerrar sesi\xF3n")));
}
function OverlayShell({ T, title, onBack, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 200, overflow: "hidden", backgroundColor: T.bg, display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(PhotoBgLayers, { T }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "calc(14px + env(safe-area-inset-top,0px)) 18px 10px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, "aria-label": "Volver", style: { width: 44, height: 44, borderRadius: "50%", ...glassChip(T), color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" }))), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 27, fontWeight: 600, color: T.text, letterSpacing: "-.01em" } }, title)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto" } }, children)));
}
var MOBILE_PERM = {
  citas: "Agenda",
  agenda: "Agenda",
  nueva: "Agenda",
  horarios: "Agenda",
  pacientes: "Pacientes",
  ficha: "Pacientes",
  reportes: "Reportes",
  // Plantillas edita la configuración de mensajes de TODA la clínica, no es una vista de consulta.
  plantillas: "Configuraci\xF3n"
};
function mobileCan(key) {
  try {
    var role = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentRole ? window.JCSAAS.currentRole() : "owner";
    if (role !== "professional") return true;
    var need = MOBILE_PERM[key];
    if (!need) return true;
    var perms = window.JCSAAS.currentPerms && window.JCSAAS.currentPerms() || {};
    return !!perms[need];
  } catch (e) {
    return false;
  }
}
function SinPermisoM({ T }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 26px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "30", height: "30", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.5" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "11", width: "18", height: "10", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V8a5 5 0 0 1 10 0v3" })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text, margin: "12px 0 6px" } }, "Sin acceso"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.55, maxWidth: 280 } }, "Tu cuenta no tiene permiso para ver esta secci\xF3n. P\xEDdeselo al administrador de la cl\xEDnica."));
}
function MobileShell({ T, D, onLogout, mode, toggleMode }) {
  const [tab, setTab] = useState("citas");
  useEffect(() => {
    if (mobileCan(tab)) return;
    var order = ["citas", "agenda", "mas"];
    for (var i = 0; i < order.length; i++) {
      if (mobileCan(order[i])) {
        setTab(order[i]);
        return;
      }
    }
  }, [tab]);
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
    setDrawer(true);
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
    document.title = "Medique \xB7 Panel M\xF3vil";
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
  const fechaHeaderParts = (() => {
    const d = /* @__PURE__ */ new Date();
    const dow = DOW_FULL[d.getDay()];
    return { pre: dow.charAt(0).toUpperCase() + dow.slice(1) + ", " + d.getDate() + " de ", mes: MESES_LARGOS[d.getMonth()].toLowerCase() };
  })();
  {
  }
  const hamburger = /* @__PURE__ */ React.createElement("button", { onClick: () => setDrawer(true), "aria-label": "Men\xFA", style: { width: 44, height: 44, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: -9 } }, /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M3 12h18M3 18h18" })));
  const bell = /* @__PURE__ */ React.createElement("button", { onClick: () => setNotifOpen(true), "aria-label": "Pendientes", style: { position: "relative", width: 44, height: 44, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: -7 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" })), bellCount > 0 && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 8, right: 8, minWidth: 18, height: 18, padding: "0 4px", borderRadius: 999, background: T.accent, color: "#fff", fontFamily: T.sans, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,255,255,.35)" } }, bellCount));
  const headerTitle = (txt) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 17, fontWeight: 600, color: T.text } }, txt);
  const renderHeader = () => {
    if (tab === "citas") return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 } }, hamburger, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 24, height: 24, objectFit: "contain", flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 5, minWidth: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: FRAUNCES, fontSize: 13.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, clinName || "Medique"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, "\xB7 ", fechaHeaderParts.pre, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: FRAUNCES, fontStyle: "italic", color: T.accent } }, fechaHeaderParts.mes)))), bell);
    if (tab === "nueva") return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("citas"), "aria-label": "Volver", style: { width: 44, height: 44, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: -9 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" }))), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 0, right: 0, textAlign: "center", pointerEvents: "none", fontFamily: T.serif, fontSize: 20, fontWeight: 600, color: T.text } }, "Nueva cita"), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("citas"), "aria-label": "Cerrar", style: { width: 44, height: 44, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginRight: -9 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.1" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
    const titleMap = { horarios: "Bloquear horarios", agenda: "Agenda", mas: "M\xE1s" };
    const rightAction = tab === "agenda" ? /* @__PURE__ */ React.createElement("button", { onClick: () => setAgShowAnuladas((v) => !v), "aria-label": "Filtro", style: { width: 44, height: 44, borderRadius: "50%", border: "none", background: agShowAnuladas ? T.accentSoft : "none", color: agShowAnuladas ? T.accent : T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginRight: -7 } }, /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 6h16M7 12h10M10 18h4" }))) : /* @__PURE__ */ React.createElement("div", { style: { width: 44 } });
    return /* @__PURE__ */ React.createElement(React.Fragment, null, hamburger, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 0, right: 0, textAlign: "center", pointerEvents: "none", fontFamily: T.serif, fontSize: 20, fontWeight: 600, color: T.text } }, titleMap[tab]), rightAction);
  };
  const tabs = [
    { lbl: "Inicio", on: tab === "citas" && !overlay, act: () => {
      setOverlay(null);
      setTab("citas");
    }, icon: /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 11.5 12 4l8 7.5" }), /* @__PURE__ */ React.createElement("path", { d: "M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9" })) },
    { lbl: "Agenda", on: tab === "agenda" && !overlay, act: () => {
      setOverlay(null);
      setTab("agenda");
    }, icon: /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3.5", y: "5", width: "17", height: "15", rx: "2.5" }), /* @__PURE__ */ React.createElement("path", { d: "M3.5 9.5h17" }), /* @__PURE__ */ React.createElement("path", { d: "M8 3v4M16 3v4" })) },
    { lbl: "Men\xFA", on: tab === "mas" && !overlay, act: () => {
      setOverlay(null);
      setTab("mas");
    }, icon: /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 6h16M4 12h16M4 18h16" })) }
  ].filter(function(t) {
    return t.lbl === "Inicio" ? mobileCan("citas") : t.lbl === "Agenda" ? mobileCan("agenda") : true;
  });
  return /* @__PURE__ */ React.createElement("div", { onTouchStart: onRootTouchStart, onTouchEnd: onRootTouchEnd, style: { height: "100dvh", overflow: "hidden", position: "relative", backgroundColor: T.bg, maxWidth: 480, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(PhotoBgLayers, { T }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column" } }, tab !== "citas" && tab !== "mas" && /* @__PURE__ */ React.createElement("div", { style: { position: "sticky", top: 0, zIndex: 10, padding: "calc(6px + env(safe-area-inset-top,0px)) 14px 2px" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "4px 4px", minHeight: 36 } }, renderHeader())), !online && /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, margin: "0 14px 6px", padding: "8px 12px", borderRadius: 12, background: "rgba(184,134,11,.22)", border: "1px solid rgba(184,134,11,.4)", display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "#E8B84D", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M1 1l22 22M8.5 16.5a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 3.5-2.5M12 20h.01M19 12.5a10 10 0 0 0-2.5-2.2M2 8.5a15 15 0 0 1 4-2.5" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#F0D9A8", lineHeight: 1.35 } }, "Sin conexi\xF3n \xB7 mostrando datos guardados en este equipo")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: tab === "agenda" || tab === "citas" ? "hidden" : "auto" } }, tab === "citas" && (mobileCan("citas") ? /* @__PURE__ */ React.createElement(HomeTab, { T, appts, patients, onOpenAppt: setApptSheet, goTab: setTab, openOverlay: setOverlay, openNotif: () => setNotifOpen(true), bellCount }) : /* @__PURE__ */ React.createElement(SinPermisoM, { T })), tab === "horarios" && (mobileCan("horarios") ? /* @__PURE__ */ React.createElement(HorariosTab, { T, appts }) : /* @__PURE__ */ React.createElement(SinPermisoM, { T })), tab === "nueva" && (mobileCan("nueva") ? /* @__PURE__ */ React.createElement(NuevaWizard, { T, appts, patients, addAppt, addPatient, onDone: () => setTab("citas") }) : /* @__PURE__ */ React.createElement(SinPermisoM, { T })), tab === "agenda" && (mobileCan("agenda") ? /* @__PURE__ */ React.createElement(AgendaTab, { T, appts, onOpenAppt: setApptSheet, goTab: setTab, showAnuladas: agShowAnuladas, setShowAnuladas: setAgShowAnuladas }) : /* @__PURE__ */ React.createElement(SinPermisoM, { T })), tab === "mas" && /* @__PURE__ */ React.createElement(MasTab, { T, mode, toggleMode, openOverlay: setOverlay, onLogout, openNotif: () => setNotifOpen(true), goAnuladas: () => {
    setOverlay(null);
    setAgShowAnuladas(true);
    setTab("agenda");
  } })), /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, position: "relative", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px 12px calc(16px + env(safe-area-inset-bottom,0px))", background: T.navFill, backdropFilter: "blur(28px) saturate(1.3)", WebkitBackdropFilter: "blur(28px) saturate(1.3)", borderTop: "1px solid " + T.glassBorder } }, tabs.map(({ lbl, icon, on, act }) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: lbl,
      onClick: act,
      style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", width: 64, background: "none", border: "none", padding: 0 }
    },
    /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 32, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: on ? T.accent : "transparent", color: on ? T.onAccent : T.textFaint, transition: "background .18s ease" } }, icon),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontWeight: 500, fontSize: 10, color: on ? T.accent : T.textFaint } }, lbl),
    /* @__PURE__ */ React.createElement("div", { style: { width: 4, height: 4, borderRadius: "50%", background: on ? T.accent : "transparent" } })
  )))), overlay === "pacientes" && (mobileCan("pacientes") ? /* @__PURE__ */ React.createElement(PacientesOverlay, { T, patients, appts, addPatient, onBack: () => setOverlay(null), onOpenFicha: (id) => setOverlay({ type: "ficha", id }) }) : /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Pacientes", onBack: () => setOverlay(null) }, /* @__PURE__ */ React.createElement(SinPermisoM, { T }))), overlay === "reportes" && (mobileCan("reportes") ? /* @__PURE__ */ React.createElement(ReportesOverlay, { T, appts, onBack: () => setOverlay(null), onOpenAppt: setApptSheet }) : /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Reportes", onBack: () => setOverlay(null) }, /* @__PURE__ */ React.createElement(SinPermisoM, { T }))), overlay === "plantillas" && (mobileCan("plantillas") ? /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Plantillas de mensajes", onBack: () => setOverlay(null) }, /* @__PURE__ */ React.createElement(MessageTemplatesView, { T })) : /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Plantillas de mensajes", onBack: () => setOverlay(null) }, /* @__PURE__ */ React.createElement(SinPermisoM, { T }))), overlay && overlay.type === "ficha" && (mobileCan("ficha") ? /* @__PURE__ */ React.createElement(FichaOverlay, { T, patientId: overlay.id, patients, appts, updatePatient, onBack: () => setOverlay(null) }) : /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Ficha", onBack: () => setOverlay(null) }, /* @__PURE__ */ React.createElement(SinPermisoM, { T }))), notifOpen && (() => {
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
    }, style: { position: "fixed", inset: 0, zIndex: 410, background: "rgba(0,0,0,.55)", display: "flex", flexDirection: "column", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { ...glassPanel(T, 24), borderBottomLeftRadius: 0, borderBottomRightRadius: 0, maxHeight: "78dvh", display: "flex", flexDirection: "column", paddingBottom: "env(safe-area-inset-bottom,10px)", animation: "jcFade .2s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 11px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid " + T.divider } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, fontWeight: 600, color: T.text } }, "Pendientes"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 1 } }, total === 0 ? "Todo al d\xEDa" : total + " por resolver")), /* @__PURE__ */ React.createElement("button", { onClick: closeN, "aria-label": "Cerrar", style: { width: 44, height: 44, borderRadius: "50%", ...glassChip(T), color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "6px 8px 14px", display: "flex", flexDirection: "column", gap: 1 } }, total === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "40px 16px", textAlign: "center", fontFamily: T.sans, fontSize: 13, color: T.textMute } }, "Sin pendientes \xB7 todo en orden \u2713"), pendConsent.length > 0 && label("Consentimientos por firmar"), pendConsent.map((p) => row("#E8B84D", docIcon, p.name || "Paciente", "Consentimiento por firmar", () => openFichaN(p.id))), pendPago.length > 0 && label("Pagos por confirmar"), pendPago.map((a) => row("#6EA8E8", payIcon, a.name || "Paciente", "Transferencia por confirmar" + (a.time ? " \xB7 " + a.time : ""), () => openApptN(a))))));
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
    const navItem = (icon, label, onClick, danger) => /* @__PURE__ */ React.createElement("button", { onClick, style: { display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", background: "none", border: "none", borderRadius: 11, padding: "12px 12px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: 9, background: (danger ? T.red : T.accent) + "22", color: danger ? T.red : T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, icon), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: danger ? T.red : T.text } }, label));
    return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
      if (e.target === e.currentTarget) setDrawer(false);
    }, style: { position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,.5)", display: "flex" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { position: "relative", overflow: "hidden", width: "78%", maxWidth: 320, height: "100%", backgroundColor: T.bg, display: "flex", flexDirection: "column", boxShadow: "8px 0 40px -10px rgba(0,0,0,.6)", animation: "jcDrawerIn .22s ease" } }, /* @__PURE__ */ React.createElement(PhotoBgLayers, { T }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { ...glassChip(T), border: "none", padding: "calc(16px + env(safe-area-inset-top,0px)) 16px 16px", display: "flex", alignItems: "center", gap: 11 } }, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 34, height: 34, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: FRAUNCES, fontSize: 18, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, clinName || "Medique"))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 } }, mobileCan("citas") && navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" })), "Inicio", () => go("citas")), mobileCan("agenda") && navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" })), "Agenda", () => go("agenda")), mobileCan("nueva") && navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })), "Nueva cita", () => go("nueva")), mobileCan("horarios") && navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 6v6l4 2" })), "Horarios", () => go("horarios")), mobileCan("pacientes") && navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })), "Pacientes", () => openOv("pacientes")), mobileCan("reportes") && navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" })), "Reportes", () => openOv("reportes")), mobileCan("plantillas") && navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })), "Plantillas de mensajes", () => openOv("plantillas")), /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: T.divider, margin: "8px 12px" } }), navItem(/* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M8 16H3v5" })), "Actualizar datos", () => {
      window.dispatchEvent(new CustomEvent("jcsaas:data"));
      setDrawer(false);
    }), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ React.createElement("path", { d: "M16 17l5-5-5-5M21 12H9" })), "Cerrar sesi\xF3n", () => {
      setDrawer(false);
      onLogout();
    }, true)))));
  })());
}
function MobileAdmin() {
  const [mode, setMode] = useState(readMobileMode);
  const T = buildMobileTheme(mode);
  const toggleMode = () => setMode((m) => {
    const n = m === "dark" ? "light" : "dark";
    writeMobileMode(n);
    return n;
  });
  const D = window.JCDATA;
  const authed0 = !!(window.jcmAdminHasPass && window.jcmAdminHasPass() && window.jcmAdminHasSession && window.jcmAdminHasSession());
  const [authed, setAuthed] = useState(authed0);
  if (!authed) return /* @__PURE__ */ React.createElement(LoginScreen, { T, onAuth: () => setAuthed(true) });
  return /* @__PURE__ */ React.createElement(MobileShell, { T, D, mode, toggleMode, onLogout: () => {
    try {
      window.jcmAdminEndSession && window.jcmAdminEndSession();
    } catch (e) {
    }
    setAuthed(false);
  } });
}
function MobileSaasGate() {
  const [mode, setMode] = useState(readMobileMode);
  const T = buildMobileTheme(mode);
  const toggleMode = () => setMode((m) => {
    const n = m === "dark" ? "light" : "dark";
    writeMobileMode(n);
    return n;
  });
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
  if (phase === "app") return /* @__PURE__ */ React.createElement(MobileShell, { T, D, mode, toggleMode, onLogout: () => window.JCSAAS.logout() });
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
  if (view === "recover") return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: eyebrow }, "Medique \xB7 Panel m\xF3vil"), /* @__PURE__ */ React.createElement("h1", { style: title }, "Recuperar contrase\xF1a"), /* @__PURE__ */ React.createElement("p", { style: subtitle }, "Te enviaremos un enlace a tu correo para restablecerla."), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { placeholder: "Correo de tu cuenta", inputMode: "email", "data-nocap": "", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: (e) => e.key === "Enter" && doRecover(), style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.red, textAlign: "center" } }, err), msg && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#7CDDA8", textAlign: "center" } }, msg), /* @__PURE__ */ React.createElement("button", { onClick: doRecover, disabled: busy || !email.trim(), style: { ...btnSober, opacity: busy || !email.trim() ? 0.6 : 1 } }, busy ? "Enviando\u2026" : "Enviar enlace"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setView("login");
    setErr("");
    setMsg("");
  }, style: linkSober }, "\u2190 Volver")))));
  return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: eyebrow }, "Medique \xB7 Panel m\xF3vil"), /* @__PURE__ */ React.createElement("h1", { style: title }, "Confirmar citas"), /* @__PURE__ */ React.createElement("p", { style: subtitle }, "Accede al panel de tu cl\xEDnica."), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { placeholder: "Correo de tu cl\xEDnica", inputMode: "email", autoComplete: "email", "data-nocap": "", value: email, onChange: (e) => setEmail(e.target.value), style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: "Contrase\xF1a", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => e.key === "Enter" && doLogin(), autoComplete: "current-password", style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.red, textAlign: "center" } }, err), /* @__PURE__ */ React.createElement("button", { onClick: doLogin, disabled: busy, style: { ...btnSober, opacity: busy ? 0.6 : 1 } }, busy ? "\u2026" : "Entrar"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setView("recover");
    setErr("");
  }, style: linkSober }, "\xBFOlvidaste tu contrase\xF1a?")))));
}
ReactDOM.createRoot(document.getElementById("root")).render(
  window.JCSAAS && window.JCSAAS.enabled ? /* @__PURE__ */ React.createElement(MobileSaasGate, null) : /* @__PURE__ */ React.createElement(MobileAdmin, null)
);
