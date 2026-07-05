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
const WDS = ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"];
const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const MESES_LARGOS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DOW_FULL = ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "S\xE1bado"];
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
  if (a.attended || a.status === "atendida") return { label: "Atendida", color: "#6EA8E8" };
  if (a.status === "confirmada") return { label: "Confirmada", color: "#46D27A" };
  if (a.status === "pendiente_pago") return { label: "\u23F3 Transferencia", color: "#F5B93D" };
  return { label: "Agendado", color: "#F5B93D" };
}
function apptBadge(a) {
  if (a.status === "anulada") return { label: "Cancelada", color: "rgba(235,242,252,.6)", bg: "transparent", border: "rgba(235,242,252,.35)" };
  if (a.status === "no_asistio") return { label: "No asisti\xF3", color: "#FFFFFF", bg: "#E5566B", border: "#E5566B" };
  if (a.attended || a.status === "atendida") return { label: "Atendida", color: "#9CC0FF", bg: "rgba(78,141,255,.14)", border: "rgba(120,165,255,.55)" };
  if (a.status === "confirmada") return { label: "Confirmada", color: "#9CC0FF", bg: "rgba(78,141,255,.14)", border: "rgba(120,165,255,.55)" };
  if (a.status === "pendiente_pago") return { label: "Transferencia", color: "#2A1F00", bg: "#E8B84D", border: "#E8B84D" };
  return { label: "Pendiente", color: "#2A1F00", bg: "#E8B84D", border: "#E8B84D" };
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
function weekOf(iso) {
  const ref = /* @__PURE__ */ new Date(iso + "T12:00:00");
  const dow = (ref.getDay() + 6) % 7;
  const monday = new Date(ref);
  monday.setDate(ref.getDate() - dow);
  const todayIso = todayISO();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dIso = localISO(d);
    return { iso: dIso, wd: WDS[d.getDay()], dd: d.getDate(), isToday: dIso === todayIso };
  });
}
const ON_PHOTO = { text: "#F5F7FB", mute: "rgba(235,242,252,.72)", faint: "rgba(235,242,252,.5)" };
const SF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', system-ui, Roboto, sans-serif";
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
    // Acento azul vivo (referencia del usuario, look iOS): botones primarios, FAB, tab activo,
    // pastillas de día y badges de estado. Texto blanco sobre el azul.
    accent: "#3B82F6",
    accentSoft: "rgba(59,130,246,.18)",
    onAccent: "#FFFFFF"
  });
}
function mobileBg(T) {
  const overlay = "linear-gradient(180deg, rgba(9,13,22,.6), rgba(8,12,20,.68) 50%, rgba(6,10,17,.8))";
  return { backgroundImage: overlay + ", url('/assets/everest-mobile.jpg?v=9')", backgroundColor: "#070B12", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat" };
}
function glassPanel(T, radius) {
  return {
    background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.018) 50%, rgba(255,255,255,.006) 100%), rgba(24,33,49,.46)",
    backdropFilter: "blur(28px) saturate(1.3)",
    WebkitBackdropFilter: "blur(28px) saturate(1.3)",
    border: "1px solid rgba(255,255,255,.085)",
    borderRadius: radius == null ? 20 : radius,
    boxShadow: "0 18px 42px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.10)"
  };
}
function glassChip(T) {
  return {
    background: "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.015) 50%, rgba(255,255,255,.005) 100%), rgba(22,31,47,.42)",
    backdropFilter: "blur(26px) saturate(1.25)",
    WebkitBackdropFilter: "blur(26px) saturate(1.25)",
    border: "1px solid rgba(255,255,255,.075)"
  };
}
function LoginVideoBg({ children }) {
  const overlay = "linear-gradient(180deg, rgba(18,44,84,.4), rgba(16,38,74,.5) 50%, rgba(12,30,62,.7))";
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", minHeight: "100dvh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 24px", backgroundColor: "#12294F" } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      poster: "/assets/everest-mobile.jpg?v=9",
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
    },
    /* @__PURE__ */ React.createElement("source", { src: "/assets/everest-login.mp4?v=2", type: "video/mp4" })
  ), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: overlay } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" } }, children));
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
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 16, padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.08)", color: "#fff", outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement(LoginVideoBg, null, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 52, height: 52, marginBottom: 10 } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 28, fontWeight: 600, color: "#fff" } }, "Medique"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: ON_PHOTO.mute, marginBottom: 44 } }, "Panel m\xF3vil \xB7 Acceso privado"), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 12 } }, setup && /* @__PURE__ */ React.createElement("input", { placeholder: "Usuario", value: user, onChange: (e) => setUser(e.target.value), style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: "Contrase\xF1a del panel", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => e.key === "Enter" && submit(), style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#FF8FA3", textAlign: "center" } }, err), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: submit,
      disabled: busy,
      style: { background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", border: "none", borderRadius: 10, padding: "16px", cursor: "pointer", opacity: busy ? 0.6 : 1, marginTop: 4 }
    },
    busy ? "\u2026" : setup ? "Crear acceso" : "Entrar"
  )));
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
  }, style: { position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "rgba(0,0,0,.55)" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: card }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 4, borderRadius: 2, background: T.dark ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.18)", margin: "6px auto 14px" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: "50%", background: st.color + "26", color: st.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 15, fontWeight: 700, flexShrink: 0 } }, (a.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, fontWeight: 600, color: T.text, lineHeight: 1.15 } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 2 } }, a.time, " \xB7 ", a.proc || "\u2014", " \xB7 ", durLabel), matched && /* @__PURE__ */ React.createElement("button", { onClick: () => onOpenFicha(matched.id), style: { marginTop: 4, background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5, color: T.accent, textDecoration: "underline" } }, "Ver ficha del paciente \u2192")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, "aria-label": "Cerrar", style: { flexShrink: 0, width: 30, height: 30, borderRadius: "50%", border: "none", background: T.dark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.06)", color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), isPend && /* @__PURE__ */ React.createElement(
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
  }, style: { width: "100%", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, border: "none", borderRadius: 10, padding: "14px", cursor: "pointer" } }, "Restaurar cita")) : /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 8 } }, "Estado de la cita"), !confirmCancel ? /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 } }, STATUS_STEPS.map((s) => {
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
  }, style: { flex: 2, height: 36, borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "Guardar"))) : /* @__PURE__ */ React.createElement("button", { onClick: () => setEditCom(true), style: { display: "flex", alignItems: "center", gap: 8, width: "100%", ...glassChip(T), borderRadius: 9, padding: "10px 12px", cursor: "pointer", textAlign: "left", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: a.comentario ? T.text : T.textFaint, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.comentario || "Agregar comentario")), edit ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, ...glassChip(T), borderRadius: 10, padding: "12px 13px", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent } }, "Editar cita"), /* @__PURE__ */ React.createElement("label", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Fecha", /* @__PURE__ */ React.createElement("input", { type: "date", value: ef.fecha, onChange: (e) => setEf((f) => ({ ...f, fecha: e.target.value })), style: { ...inp, marginTop: 3 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("label", { style: { flex: 1, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Hora", /* @__PURE__ */ React.createElement("select", { value: ef.time, onChange: (e) => setEf((f) => ({ ...f, time: e.target.value })), style: { ...inp, marginTop: 3 } }, HALF_HOURS.map((h) => /* @__PURE__ */ React.createElement("option", { key: h, value: h }, h)), HALF_HOURS.indexOf(ef.time) < 0 && /* @__PURE__ */ React.createElement("option", { value: ef.time }, ef.time))), /* @__PURE__ */ React.createElement("label", { style: { flex: 1, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Duraci\xF3n", /* @__PURE__ */ React.createElement("select", { value: ef.dur, onChange: (e) => setEf((f) => ({ ...f, dur: e.target.value })), style: { ...inp, marginTop: 3 } }, ["15", "30", "45", "60", "90", "120"].map((d) => /* @__PURE__ */ React.createElement("option", { key: d, value: d }, d, " min"))))), /* @__PURE__ */ React.createElement("label", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Procedimiento", procOpts.length ? /* @__PURE__ */ React.createElement("select", { value: ef.proc, onChange: (e) => setEf((f) => ({ ...f, proc: e.target.value })), style: { ...inp, marginTop: 3 } }, [ef.proc, ...procOpts.filter((p) => p !== ef.proc)].filter(Boolean).map((p) => /* @__PURE__ */ React.createElement("option", { key: p, value: p }, p))) : /* @__PURE__ */ React.createElement("input", { value: ef.proc, onChange: (e) => setEf((f) => ({ ...f, proc: e.target.value })), placeholder: "Procedimiento", style: { ...inp, marginTop: 3 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 2 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setEdit(false), style: { flex: 1, height: 38, borderRadius: 8, border: "1px solid " + T.line, background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 12, cursor: "pointer" } }, "Cancelar"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    updateAppt(a.id, { fecha: ef.fecha, day: isoToDayOff(ef.fecha), time: ef.time, dur: ef.dur + " minutos", proc: ef.proc });
    setEdit(false);
  }, style: { flex: 2, height: 38, borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "Guardar cambios"))) : /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setEf({ fecha: a.fecha || todayISO(), time: a.time || "10:00", dur: (parseInt(a.dur) || 30) + "", proc: a.proc || "" });
    setEdit(true);
  }, style: { display: "flex", alignItems: "center", gap: 8, width: "100%", ...glassChip(T), borderRadius: 9, padding: "10px 12px", cursor: "pointer", textAlign: "left", color: T.text, fontFamily: T.sans, fontSize: 12.5, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M12 20h9" }), /* @__PURE__ */ React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" })), "Editar fecha, hora, duraci\xF3n o procedimiento"), waPhone && /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://wa.me/56" + waPhone.replace(/^(56|0)/, "") + "?text=" + encodeURIComponent("Hola " + a.name + ", confirmamos tu cita en " + clinNombre + ":\n\u{1F4C5} " + (a.fecha || "") + " \xB7 " + a.time + " hrs" + (clinDir ? "\n\u{1F4CD} " + clinDir : "") + "\n\u{1F489} " + (a.proc || "") + " (" + durLabel + ")\n\u23F0 La espera m\xE1xima para su atenci\xF3n es de 15 minutos, para no retrasar las atenciones siguientes"),
      target: "_blank",
      rel: "noopener",
      style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#1F8A5B22", border: "1px solid #1F8A5B55", borderRadius: 9, padding: "12px", textDecoration: "none", color: "#1F8A5B", fontFamily: T.sans, fontSize: 12.5, fontWeight: 500 }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "#1F8A5B" }, /* @__PURE__ */ React.createElement("path", { d: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" })),
    "WhatsApp"
  )));
}
function occupancyForOff(appts, off) {
  try {
    const iso = offToISO(off);
    const wd = (/* @__PURE__ */ new Date(iso + "T12:00:00")).getDay();
    let weekly = HALF_HOURS.slice();
    const h = window.DB && window.DB.get("horarios_v1");
    if (h && h[wd]) {
      weekly = h[wd].open === false ? [] : h[wd].slots || HALF_HOURS.slice();
    }
    const map = window.DB && window.DB.get("horarios_dates") || {};
    const avail = map[iso] != null ? map[iso] : weekly;
    const occupied = /* @__PURE__ */ new Set();
    appts.filter((a) => a.status !== "anulada" && (a.fecha || offToISO(a.day || 0)) === iso).forEach((a) => {
      if (!a.time) return;
      const start = minsM(a.time);
      const dur = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
      HALF_HOURS.forEach((s) => {
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
  return /* @__PURE__ */ React.createElement("div", { style: { ...glassChip(T), borderRadius: bars ? 14 : 12, padding: bars ? "11px 10px" : "9px 12px", display: "flex", alignItems: "center", justifyContent: bars ? "space-around" : "center", gap: 8, flexWrap: "wrap" } }, dot("#46D27A", (prefix ? prefix + " " : "") + c + " confirmada" + (c === 1 ? "" : "s")), sep, dot("#E8B84D", p + " pendiente" + (p === 1 ? "" : "s")), sep, dot("#FF6B7D", na + " no asisti\xF3"));
}
function HomeTab({ T, appts, patients, onOpenAppt, goTab, openOverlay }) {
  const today = todayISO();
  const yestISO = offToISO(-1);
  const active = appts.filter((a) => a.status !== "anulada");
  const todayAppts = active.filter((a) => (a.fecha || offToISO(a.day || 0)) === today).sort((a, b) => minsM(a.time) - minsM(b.time));
  const yestCount = active.filter((a) => (a.fecha || offToISO(a.day || 0)) === yestISO).length;
  const confirmadas = todayAppts.filter((a) => a.status === "confirmada" || a.status === "atendida" || a.attended).length;
  const pendientes = todayAppts.filter((a) => !(a.status === "confirmada" || a.status === "atendida" || a.attended || a.status === "anulada")).length;
  const delta = yestCount > 0 ? Math.round((todayAppts.length - yestCount) / yestCount * 100) : todayAppts.length > 0 ? 100 : 0;
  const pct = (n) => todayAppts.length ? Math.round(n / todayAppts.length * 100) : 0;
  const ocup = occupancyForOff(appts, 0);
  const ocupDelta = ocup - occupancyForOff(appts, -1);
  const cToday = todayAppts.filter((a) => a.status === "confirmada" || a.status === "atendida" || a.attended).length;
  const naToday = todayAppts.filter((a) => a.status === "no_asistio").length;
  const pToday = todayAppts.length - cToday - naToday;
  const upcoming = active.filter((a) => (a.fecha || offToISO(a.day || 0)) >= today).sort((a, b) => {
    const fa = a.fecha || offToISO(a.day || 0), fb = b.fecha || offToISO(b.day || 0);
    return fa < fb ? -1 : fa > fb ? 1 : minsM(a.time) - minsM(b.time);
  }).slice(0, 5);
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
  const kpi = (icon, label, val, sub, subColor) => /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, ...glassPanel(T, 18), padding: "14px 4px 13px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { color: T.accent, opacity: 0.92, height: 14, display: "flex", alignItems: "center" } }, icon), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, color: T.textMute, lineHeight: 1.1, marginTop: 4, minHeight: 20, display: "flex", alignItems: "center" } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, fontWeight: 600, color: T.text, marginTop: 1, lineHeight: 1, letterSpacing: "-.01em" } }, val), sub && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8, color: subColor || "rgba(230,240,255,.72)", marginTop: 3, lineHeight: 1.1 } }, sub));
  const IC = {
    cal: /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" })),
    check: /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("path", { d: "M9 11l3 3L22 4" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" })),
    clock: /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M12 7v5l3 2" })),
    bars: /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 3v18h18" }), /* @__PURE__ */ React.createElement("path", { d: "M8 17v-5M13 17V8M18 17v-8" }))
  };
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
    gap: 6,
    minHeight: 70,
    minWidth: 0,
    cursor: "pointer",
    borderRadius: 16,
    background: primary ? "rgba(63,131,255,.14)" : "rgba(255,255,255,.055)",
    border: "1px solid " + (primary ? "rgba(63,131,255,.35)" : "rgba(255,255,255,.1)"),
    padding: "10px 4px"
  } }, primary ? /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: T.accent, color: "#fff", boxShadow: "0 6px 14px -6px " + T.accent } }, icon) : /* @__PURE__ */ React.createElement("div", { style: { height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "#DCE9FF" } }, icon), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, fontWeight: 500, lineHeight: 1.1, textAlign: "center", color: T.text } }, label));
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 96px", display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7 } }, kpi(IC.cal, "Citas hoy", todayAppts.length, (delta >= 0 ? "\u2191" : "\u2193") + Math.abs(delta) + "% vs ayer"), kpi(IC.check, "Confirmadas", confirmadas, pct(confirmadas) + "% del total"), kpi(IC.clock, "Pendientes", pendientes, pct(pendientes) + "% del total"), kpi(IC.bars, "Tasa de ocupaci\xF3n", ocup + "%", (ocupDelta >= 0 ? "\u2191" : "\u2193") + Math.abs(ocupDelta) + "% vs ayer")), todayAppts.length > 0 && /* @__PURE__ */ React.createElement(DaySummary, { T, c: cToday, p: pToday, na: naToday, prefix: "Hoy:" }), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 22), display: "flex", gap: 9, padding: 10 } }, action(/* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })), "Nueva cita", () => goTab("nueva"), true), action(/* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })), "Pacientes", () => openOverlay("pacientes")), action(/* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 6v6l4 2" })), "Bloquear horario", () => goTab("horarios")), action(/* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" })), "Reportes", () => openOverlay("reportes"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.text } }, "Pr\xF3ximas citas"), /* @__PURE__ */ React.createElement("button", { onClick: () => goTab("agenda"), style: { background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.accent, display: "flex", alignItems: "center", gap: 3 } }, "Ver agenda ", /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })))), upcoming.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 14), padding: "22px 16px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textFaint } }, "Sin pr\xF3ximas citas agendadas."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, upcoming.map((a) => {
    const st = apptStateM(a, T);
    const bd = apptBadge(a);
    const iso = a.fecha || offToISO(a.day || 0);
    const dLbl = iso === today ? "Hoy" : (() => {
      const d = /* @__PURE__ */ new Date(iso + "T00:00:00");
      return WDS[d.getDay()] + " " + d.getDate() + " " + MESES[d.getMonth()];
    })();
    return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: { display: "flex", alignItems: "stretch", width: "100%", textAlign: "left", cursor: "pointer", ...glassPanel(T, 16), padding: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 4, background: st.color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "11px 11px", minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, minWidth: 40 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, fontWeight: 600, color: st.color, lineHeight: 1 } }, a.time), iso !== today && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, color: T.textFaint, marginTop: 3 } }, dLbl)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 } }, a.proc || "\u2014", " \xB7 ", durOf(a))), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 8, fontWeight: 700, letterSpacing: ".03em", textTransform: "uppercase", color: bd.color, background: bd.bg, border: "1px solid " + bd.border, borderRadius: 6, padding: "3px 8px" } }, bd.label)));
  }))));
}
function HorariosTab({ T, appts }) {
  const [selOff, setSelOff] = useState(0);
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + i);
    return { off: i, iso: localISO(d), wd: WDS[d.getDay()], dd: d.getDate() };
  });
  const selDay = days[selOff];
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
      var wd = (/* @__PURE__ */ new Date(selDay.iso + "T12:00:00")).getDay();
      if (h && h[wd] && h[wd].open !== false) return h[wd].slots || HALF_HOURS.slice();
      if (h && h[wd] && h[wd].open === false) return [];
    } catch (e) {
    }
    return HALF_HOURS.slice();
  })();
  const avail = slotsMap[selDay.iso] != null ? slotsMap[selDay.iso] : weeklySlots;
  const occupied = /* @__PURE__ */ new Set();
  appts.filter((a) => a.status !== "anulada" && (a.fecha ? a.fecha === selDay.iso : a.day === selOff)).forEach((a) => {
    if (!a.time) return;
    const startMin = minsM(a.time);
    const durMin = parseInt(a.dur) || (window.JCDATA && window.JCDATA.procMin ? window.JCDATA.procMin(a.proc) : 30);
    HALF_HOURS.forEach((slot) => {
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
    const cur = map[selDay.iso] != null ? [...map[selDay.iso]] : weeklySlots.slice();
    map[selDay.iso] = cur.includes(slot) ? cur.filter((s) => s !== slot) : [...cur, slot].sort();
    saveMap(map);
  }
  function blockAll() {
    const m = window.DB && window.DB.get("horarios_dates") || {};
    m[selDay.iso] = [];
    saveMap(m);
  }
  function openAll() {
    const m = window.DB && window.DB.get("horarios_dates") || {};
    delete m[selDay.iso];
    saveMap(m);
  }
  const availCount = avail.filter((s) => !occupied.has(s)).length;
  const blockedCount = HALF_HOURS.filter((s) => !avail.includes(s) && !occupied.has(s)).length;
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "6px 12px 90px" } }, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: "6px 2px 12px", minWidth: "max-content" } }, days.map((d, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: i,
      onClick: () => setSelOff(i),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: "8px 10px 6px",
        borderRadius: 14,
        minWidth: 50,
        cursor: "pointer",
        background: selOff === i ? "rgba(59,130,246,.12)" : "transparent",
        border: "1px solid " + (selOff === i ? "rgba(130,175,255,.55)" : "transparent")
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: selOff === i ? "#7FB0FF" : T.textMute } }, i === 0 ? "Hoy" : d.wd),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 20, fontWeight: 600, color: T.text } }, d.dd),
    /* @__PURE__ */ React.createElement("div", { style: { width: 5, height: 5, borderRadius: "50%", background: selOff === i ? T.accent : "transparent" } })
  )))), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 14), padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontFamily: T.sans, fontSize: 11, color: T.textMute, minWidth: 160 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#1F8A5B", fontWeight: 600 } }, availCount), " disponibles \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, blockedCount), " bloqueadas \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: "#B8860B", fontWeight: 600 } }, occupied.size), " con cita"), /* @__PURE__ */ React.createElement("button", { onClick: openAll, style: { background: "#1F8A5B18", border: "1px solid #1F8A5B44", color: "#1F8A5B", borderRadius: 8, padding: "8px 12px", fontFamily: T.sans, fontSize: 10.5, cursor: "pointer" } }, "Abrir todo"), /* @__PURE__ */ React.createElement("button", { onClick: blockAll, style: { background: "#C0285A18", border: "1px solid #C0285A44", color: "#C0285A", borderRadius: 8, padding: "8px 12px", fontFamily: T.sans, fontSize: 10.5, cursor: "pointer" } }, "Bloquear todo")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, padding: "2px 2px 10px" } }, [["#1F8A5B", "Disponible"], ["#C0285A", "Bloqueado"], ["#B8860B", "Con cita"]].map(([c, l]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 9, height: 9, borderRadius: 3, background: c } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute } }, l)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7 } }, HALF_HOURS.map((slot) => {
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
      isOcc && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8, marginTop: 1, opacity: 0.7 } }, "cita")
    );
  })));
}
const CAL_PX_HOUR = 90;
const CAL_START = 8;
const CAL_END = 20;
const CAL_HOURS = Array.from({ length: CAL_END - CAL_START + 1 }, (_, i) => CAL_START + i);
function AgendaTab({ T, appts, onOpenAppt, goTab, showAnuladas, setShowAnuladas }) {
  const today = todayISO();
  const [selDay, setSelDay] = useState(today);
  const days = useMemo(() => weekOf(selDay), [selDay]);
  const [view, setView] = useState("dia");
  const [monthCur, setMonthCur] = useState(() => {
    const d = /* @__PURE__ */ new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const dayRef = useMemo(() => React.createRef(), []);
  const stripTouchX = useRef(null);
  function stripTouchStart(e) {
    stripTouchX.current = e.touches[0].clientX;
  }
  function stripTouchEnd(e) {
    if (stripTouchX.current == null) return;
    const dx = e.changedTouches[0].clientX - stripTouchX.current;
    stripTouchX.current = null;
    if (Math.abs(dx) < 40) return;
    const d = /* @__PURE__ */ new Date(selDay + "T12:00:00");
    d.setDate(d.getDate() + (dx < 0 ? 7 : -7));
    setSelDay(localISO(d));
  }
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
    const heightPx = Math.max(durMin * (CAL_PX_HOUR / 60), 20);
    const compact = heightPx < 56;
    const st = apptStateM(a, T);
    const bd = apptBadge(a);
    const isAnulada = a.status === "anulada";
    const fmt = (m) => {
      const h = Math.floor(m / 60), mm = m % 60;
      return (h < 10 ? "0" : "") + h + ":" + (mm < 10 ? "0" : "") + mm;
    };
    const range = a.time + " \u2013 " + fmt(startMin + durMin);
    return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => onOpenAppt(a), style: {
      position: "absolute",
      top: topPx,
      left: 0,
      right: 0,
      height: heightPx,
      display: "flex",
      alignItems: "stretch",
      textAlign: "left",
      cursor: "pointer",
      ...glassPanel(T, compact ? 10 : 14),
      padding: 0,
      overflow: "hidden",
      boxSizing: "border-box",
      opacity: isAnulada ? 0.55 : 1
    } }, /* @__PURE__ */ React.createElement("div", { style: { width: compact ? 3 : 4, background: st.color, flexShrink: 0 } }), compact ? (
      // Cita corta: una sola línea (nombre + hora + punto de estado), sin procedimiento ni divisor.
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 8, padding: "0 10px" } }, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: isAnulada ? "line-through" : "none" } }, a.name), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: st.color } }, a.time), /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: st.color, flexShrink: 0 } }))
    ) : /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, padding: "12px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 17, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.25, textDecoration: isAnulada ? "line-through" : "none" } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 3 } }, a.proc || "\u2014")), /* @__PURE__ */ React.createElement("div", { style: { width: 1, alignSelf: "center", height: "52%", background: "rgba(255,255,255,.12)", flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { width: 128, flexShrink: 0, padding: "12px 14px", textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: st.color } }, range), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, marginTop: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, bd.label), /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: st.color, flexShrink: 0 } })))));
  }
  const toggleRow = /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, padding: "10px 14px 8px", flexShrink: 0, ...glassChip(T), border: "none", background: "transparent" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flex: 1, gap: 4, padding: 5, borderRadius: 14, ...glassChip(T) } }, [["dia", "D\xEDa"], ["mes", "Mes"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setView(k), style: {
    flex: 1,
    fontFamily: T.sans,
    fontSize: 14,
    fontWeight: view === k ? 600 : 500,
    padding: "9px",
    borderRadius: 10,
    cursor: "pointer",
    ...view === k ? { background: "linear-gradient(180deg, rgba(88,142,246,.28), rgba(48,104,214,.22))", color: "#fff", border: "1px solid rgba(130,175,255,.45)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.22), 0 6px 16px -8px rgba(40,90,200,.6)" } : { background: "transparent", color: T.textMute, border: "1px solid transparent" }
  } }, l))), showAnuladas && view === "dia" && /* @__PURE__ */ React.createElement("span", { style: { alignSelf: "center", fontFamily: T.sans, fontSize: 10.5, color: "#F1657F", whiteSpace: "nowrap" } }, "Canceladas (", anuladasCount, ")"));
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
        background: "rgba(63,131,255,.32)",
        border: "1px solid rgba(150,190,255,.5)",
        color: "#EAF2FF",
        cursor: "pointer",
        backdropFilter: "blur(16px) saturate(1.5)",
        WebkitBackdropFilter: "blur(16px) saturate(1.5)",
        boxShadow: "0 12px 28px -10px rgba(10,25,55,.6), inset 0 1px 0 rgba(255,255,255,.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5
      }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" }))
  );
  if (view === "mes") {
    const WD = ["L", "M", "M", "J", "V", "S", "D"];
    return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "flex", flexDirection: "column", height: "calc(100dvh - 150px)" } }, toggleRow, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 16px 8px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setMonthCur((c) => {
      const m = c.m - 1;
      return m < 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m };
    }), style: { width: 36, height: 36, borderRadius: 999, ...glassChip(T), color: T.text, cursor: "pointer" } }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, fontWeight: 600, color: T.text } }, MESES_LARGOS[monthCur.m], " ", monthCur.y), /* @__PURE__ */ React.createElement("button", { onClick: () => setMonthCur((c) => {
      const m = c.m + 1;
      return m > 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m };
    }), style: { width: 36, height: 36, borderRadius: 999, ...glassChip(T), color: T.text, cursor: "pointer" } }, "\u203A")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", padding: "0 10px 4px", flexShrink: 0 } }, WD.map((w, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { textAlign: "center", fontFamily: T.sans, fontSize: 10, letterSpacing: ".08em", color: T.textFaint } }, w))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "0 10px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 } }, monthGrid.map((c) => {
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
    }))), fab);
  }
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "flex", flexDirection: "column", height: "calc(100dvh - 150px)" } }, toggleRow, /* @__PURE__ */ React.createElement("div", { onTouchStart: stripTouchStart, onTouchEnd: stripTouchEnd, style: { overflowX: "auto", flexShrink: 0, WebkitOverflowScrolling: "touch" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", padding: "12px 10px 4px", minWidth: "max-content", gap: 3 } }, days.map((d) => {
    const isSel = d.iso === selDay;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: d.iso,
        onClick: () => setSelDay(d.iso),
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: "8px 10px 6px",
          borderRadius: 14,
          minWidth: 46,
          cursor: "pointer",
          background: isSel ? "rgba(59,130,246,.12)" : "transparent",
          border: "1px solid " + (isSel ? "rgba(130,175,255,.55)" : "transparent")
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: isSel ? "#7FB0FF" : T.textMute } }, d.isToday ? "Hoy" : d.wd),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 22, fontWeight: d.isToday ? "700" : "400", color: T.text, lineHeight: 1.15 } }, d.dd),
      /* @__PURE__ */ React.createElement("div", { style: { width: 5, height: 5, borderRadius: "50%", background: isSel ? T.accent : "transparent" } })
    );
  }))), !showAnuladas && selActive.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px 8px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement(DaySummary, { T, c: cSel, p: pSel, na: naSel, bars: true })), /* @__PURE__ */ React.createElement("div", { ref: dayRef, style: { flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginLeft: 48, paddingRight: 12 } }, CAL_HOURS.map((h) => /* @__PURE__ */ React.createElement("div", { key: h, style: { position: "absolute", left: -48, right: 0, top: (h - CAL_START) * CAL_PX_HOUR, display: "flex", alignItems: "flex-start", zIndex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, width: 42, textAlign: "right", paddingRight: 8, lineHeight: 1, transform: "translateY(-5px)", flexShrink: 0 } }, h < 10 ? "0" + h : "" + h, ":00"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, borderTop: "1px solid " + (T.dark ? "rgba(255,255,255,.1)" : T.lineSoft), marginTop: 0 } }))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", minHeight: (CAL_END - CAL_START) * CAL_PX_HOUR + 40 } }, dayAppts.map((a) => apptBlock(a))), dayAppts.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", textAlign: "center", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.textFaint } }, showAnuladas ? "Sin citas canceladas este d\xEDa" : "Sin citas este d\xEDa")))), fab);
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
  const step1Ok = tipo === "existente" ? !!selectedPatient : name.trim() && phoneOk;
  const step2Ok = !!proc && !!fecha && !!time;
  const slotsMap = window.DB && window.DB.get("horarios_dates") || {};
  const weeklyDef = (() => {
    try {
      var h = window.DB && window.DB.get("horarios_v1");
      var wd = (/* @__PURE__ */ new Date(fecha + "T12:00:00")).getDay();
      if (h && h[wd] && h[wd].open !== false) return h[wd].slots || HALF_HOURS.slice();
      if (h && h[wd] && h[wd].open === false) return [];
    } catch (e) {
    }
    return HALF_HOURS.slice();
  })();
  const avail = slotsMap[fecha] != null ? slotsMap[fecha] : weeklyDef;
  const occupied = new Set(appts.filter((a) => a.fecha === fecha && a.status !== "anulada").map((a) => a.time));
  const freeSlots = avail.filter((s) => !occupied.has(s));
  function confirm() {
    let patId = pid;
    if (tipo === "nuevo") {
      const np = addPatient({ name: name.trim(), rut: rut.trim(), phone: phone.trim(), email: email.trim(), age: 0 });
      patId = np.id;
    }
    addAppt({ id: Date.now().toString(36), patId, name: finalName.trim(), rut: (finalRut || "").trim(), phone: (finalPhone || "").trim(), email: (finalEmail || "").trim(), proc, dur, time, fecha, day: isoToDayOff(fecha), status: "confirmada", source: "movil", comentario: comment.trim() || void 0, createdAt: (/* @__PURE__ */ new Date()).toISOString() });
    if (notifyWa && finalPhone) {
      const waP = (finalPhone || "").replace(/\D/g, "");
      if (waP.length >= 8) setTimeout(() => window.open("https://wa.me/56" + waP.replace(/^(56|0)/, "") + "?text=" + encodeURIComponent("Hola " + finalName + ", tu cita qued\xF3 agendada para el " + fecha + " a las " + time + " hrs \xB7 " + proc), "_blank", "noopener"), 300);
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
  } }, step > i + 1 ? "\u2713" : i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9, color: step >= i + 1 ? T.text : T.textFaint, whiteSpace: "nowrap" } }, s)), i < STEPS.length - 1 && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: step > i + 1 ? T.accent : T.dark ? "rgba(255,255,255,.14)" : T.line, marginBottom: 16 } })))), step === 1 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["existente", "Paciente existente"], ["nuevo", "Paciente nuevo"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTipo(k), style: {
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
  }, style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", ...glassChip(T), borderRadius: 9, padding: "10px 12px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: "rgba(59,130,246,.16)", border: "1px solid rgba(120,160,240,.3)", color: "#89B4FF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 11, fontWeight: 700, flexShrink: 0 } }, (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, [p.rut, p.phone].filter(Boolean).join(" \xB7 ")))))), !selectedPatient && ql.length >= 2 && results.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 9, fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, 'Sin resultados. Prueba con "Paciente nuevo".')) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Nombre completo"), /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Nombre y apellido", style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "RUT (opcional)"), /* @__PURE__ */ React.createElement("input", { value: rut, onChange: (e) => setRut(e.target.value), placeholder: "12.345.678-9", style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Tel\xE9fono"), /* @__PURE__ */ React.createElement("input", { type: "tel", inputMode: "numeric", value: phone, onChange: (e) => onPhone(e.target.value), style: { ...inp, borderColor: phoneOk ? void 0 : "#C0285A88" } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Correo (opcional)"), /* @__PURE__ */ React.createElement("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "correo@ejemplo.com", style: inp })), !phoneOk && phone.length > PHONE_PFX.length && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#FF8FA3" } }, "Ingresa los 8 d\xEDgitos del tel\xE9fono.")), /* @__PURE__ */ React.createElement("button", { onClick: () => step1Ok && setStep(2), disabled: !step1Ok, style: { background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 15, fontWeight: 600, border: "none", borderRadius: 12, padding: "16px", cursor: step1Ok ? "pointer" : "not-allowed", opacity: step1Ok ? 1 : 0.5 } }, "Continuar")), step === 2 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Procedimiento"), /* @__PURE__ */ React.createElement("select", { value: proc, onChange: (e) => setProc(e.target.value), style: { ...inp, appearance: "none" } }, /* @__PURE__ */ React.createElement("option", null, "Evaluaci\xF3n general"), procs.map((p) => /* @__PURE__ */ React.createElement("option", { key: p, value: p }, p)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Fecha"), /* @__PURE__ */ React.createElement("input", { type: "date", value: fecha, onChange: (e) => setFecha(e.target.value), style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Hora"), /* @__PURE__ */ React.createElement("select", { value: time, onChange: (e) => setTime(e.target.value), style: { ...inp, appearance: "none" } }, (() => {
    const base = freeSlots.length ? freeSlots : HALF_HOURS;
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
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 14, padding: "11px 13px", borderRadius: 9, border: "1px solid " + (T.dark ? "rgba(255,255,255,.16)" : T.line), background: T.dark ? "rgba(255,255,255,.06)" : "#fff", color: T.text, outline: "none", boxSizing: "border-box" };
  function saveNuevo() {
    if (!f.name.trim()) return;
    const np = addPatient({ name: f.name.trim(), rut: f.rut.trim(), phone: f.phone.trim(), email: f.email.trim(), age: 0 });
    setNuevo(false);
    setF({ name: "", rut: "", phone: "+56 9 ", email: "" });
    onOpenFicha(np.id);
  }
  return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Pacientes", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 10, ...glassChip(T), borderRadius: 13, padding: "0 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4-4" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nombre, RUT o tel\xE9fono\u2026", style: { flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontFamily: T.sans, fontSize: 14, padding: "13px 0" } })), /* @__PURE__ */ React.createElement("button", { onClick: () => setNuevo((v) => !v), "aria-label": "Nuevo paciente", style: { flexShrink: 0, width: 50, borderRadius: 13, border: "none", background: T.accent, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px -8px " + T.accent } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })))), nuevo && /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 12), padding: "13px 14px", display: "flex", flexDirection: "column", gap: 9 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent } }, "Nuevo paciente"), /* @__PURE__ */ React.createElement("input", { value: f.name, onChange: (e) => setF((s) => ({ ...s, name: e.target.value })), placeholder: "Nombre completo", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.rut, onChange: (e) => setF((s) => ({ ...s, rut: e.target.value })), placeholder: "RUT (opcional)", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.phone, onChange: (e) => setF((s) => ({ ...s, phone: e.target.value })), placeholder: "+56 9 1234 5678", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.email, onChange: (e) => setF((s) => ({ ...s, email: e.target.value })), placeholder: "Correo (opcional)", style: inp }), /* @__PURE__ */ React.createElement("button", { onClick: saveNuevo, disabled: !f.name.trim(), style: { background: T.accent, color: T.onAccent, border: "none", borderRadius: 9, padding: "12px", fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer", opacity: f.name.trim() ? 1 : 0.5 } }, "Guardar paciente")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "30px 0", fontFamily: T.sans, fontSize: 12.5, color: T.textFaint } }, "Sin pacientes", ql ? " que coincidan" : "", "."), list.map((p) => {
    const nextA = appts.filter((a) => (a.patId === p.id || a.name === p.name) && a.status !== "anulada" && (a.fecha || offToISO(a.day || 0)) >= todayISO()).sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""))[0];
    return /* @__PURE__ */ React.createElement("button", { key: p.id, onClick: () => onOpenFicha(p.id), style: { display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", ...glassPanel(T, 16), padding: "12px 14px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: "50%", flexShrink: 0, background: "rgba(59,130,246,.16)", border: "1px solid rgba(120,160,240,.3)", color: "#89B4FF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 14, fontWeight: 700 } }, (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 16, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 2 } }, [p.rut, p.phone].filter(Boolean).join(" \xB7 "))), nextA && /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, fontFamily: T.sans, fontSize: 12, color: "#9BC0FF", ...glassChip(T), borderRadius: 999, padding: "5px 11px", whiteSpace: "nowrap" } }, nextA.fecha === todayISO() ? "Hoy " + nextA.time : (() => {
      const d = /* @__PURE__ */ new Date((nextA.fecha || "") + "T00:00:00");
      return isNaN(d.getTime()) ? nextA.fecha : d.getDate() + " " + MESES[d.getMonth()].toLowerCase();
    })()), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2", strokeLinecap: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })));
  }))));
}
function FichaOverlay({ T, patientId, patients, appts, onBack, updatePatient }) {
  const p = patients.find((x) => x.id === patientId);
  const [edit, setEdit] = useState(false);
  const [f, setF] = useState({ phone: p ? p.phone || "" : "", email: p ? p.email || "" : "", notas: p ? p.notas || "" : "" });
  useEffect(() => {
    if (p) setF({ phone: p.phone || "", email: p.email || "", notas: p.notas || "" });
  }, [patientId]);
  if (!p) return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Ficha", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: 30, textAlign: "center", fontFamily: T.sans, color: T.textFaint } }, "Paciente no encontrado."));
  const mine = appts.filter((a) => a.patId === p.id || a.name === p.name);
  const today = todayISO();
  const proximas = mine.filter((a) => a.status !== "anulada" && (a.fecha || offToISO(a.day || 0)) >= today).sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));
  const pasadas = mine.filter((a) => (a.fecha || offToISO(a.day || 0)) < today || a.status === "atendida").sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 14, padding: "11px 13px", borderRadius: 9, border: "1px solid " + (T.dark ? "rgba(255,255,255,.16)" : T.line), background: T.dark ? "rgba(255,255,255,.06)" : "#fff", color: T.text, outline: "none", boxSizing: "border-box" };
  function save() {
    updatePatient(p.id, { phone: f.phone.trim(), email: f.email.trim(), notas: f.notas.trim() });
    setEdit(false);
  }
  return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Ficha del paciente", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 40px", display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 56, height: 56, borderRadius: "50%", background: "rgba(59,130,246,.16)", border: "1px solid rgba(120,160,240,.3)", color: "#89B4FF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 19, fontWeight: 700, flexShrink: 0 } }, (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, [p.rut, p.age ? p.age + " a\xF1os" : ""].filter(Boolean).join(" \xB7 ")))), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 12), padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, "Contacto"), !edit && /* @__PURE__ */ React.createElement("button", { onClick: () => setEdit(true), style: { background: "none", border: "none", color: T.accent, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } }, "Editar")), edit ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: f.phone, onChange: (e) => setF((s) => ({ ...s, phone: e.target.value })), placeholder: "Tel\xE9fono", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.email, onChange: (e) => setF((s) => ({ ...s, email: e.target.value })), placeholder: "Correo", style: inp }), /* @__PURE__ */ React.createElement("textarea", { value: f.notas, onChange: (e) => setF((s) => ({ ...s, notas: e.target.value })), placeholder: "Notas (alergias, preferencias, etc.)", rows: 2, style: { ...inp, resize: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
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
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Pr\xF3ximas citas (", proximas.length, ")"), proximas.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Sin pr\xF3ximas citas."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, proximas.map((a) => /* @__PURE__ */ React.createElement("div", { key: a.id, style: { ...glassChip(T), borderRadius: 9, padding: "9px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, a.fecha, " \xB7 ", a.time, " hrs"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, a.proc || "\u2014"))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Historial (", pasadas.length, ")"), pasadas.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Sin atenciones registradas."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, pasadas.slice(0, 20).map((a) => /* @__PURE__ */ React.createElement("div", { key: a.id, style: { ...glassChip(T), borderRadius: 9, padding: "9px 12px", opacity: a.status === "anulada" ? 0.55 : 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, a.fecha, " \xB7 ", a.proc || "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, apptStateM(a, T).label)))))));
}
function ReportesOverlay({ T, appts, onBack }) {
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
    if (a.status === "anulada") return;
    const k = a.proc || "Sin especificar";
    porProc[k] = (porProc[k] || 0) + 1;
  });
  const topProc = Object.keys(porProc).map((k) => ({ name: k, n: porProc[k] })).sort((a, b) => b.n - a.n).slice(0, 5);
  const maxProc = topProc[0] ? topProc[0].n : 1;
  const RIC = {
    cal: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" })),
    check: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M8 12l3 3 5-6" })),
    user: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M5 21v-1a6 6 0 0 1 12 0v1" })),
    xmark: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M15 9l-6 6M9 9l6 6" })),
    pct: /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M8 15l8-6" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "9", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "15", r: "1" }))
  };
  const row = (icon, iconColor, label, val, valColor, last) => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13, padding: "12px 0", borderBottom: last ? "none" : "1px solid rgba(255,255,255,.07)" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: iconColor + "22", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" } }, icon), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 15, color: T.text } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 17, fontWeight: 700, color: valColor || T.text } }, val));
  return /* @__PURE__ */ React.createElement(OverlayShell, { T, title: "Reportes", onBack }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 40px", display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 20), padding: "6px 16px 8px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#5B93F5", fontWeight: 600, padding: "14px 0 6px" } }, "Esta semana"), row(RIC.cal, "#7FA8E8", "Citas totales", weekAppts.filter((a) => a.status !== "anulada").length), row(RIC.check, "#46D27A", "Confirmadas", countBy(weekAppts, (a) => a.status === "confirmada" || a.status === "atendida"), "#46D27A"), row(RIC.user, "#6EA8FF", "Atendidas", countBy(weekAppts, (a) => a.status === "atendida" || a.attended), "#6EA8FF"), row(RIC.user, "#FF6B7D", "No asisti\xF3", countBy(weekAppts, (a) => a.status === "no_asistio"), "#FF6B7D"), row(RIC.xmark, "#9AA6B2", "Canceladas", countBy(weekAppts, (a) => a.status === "anulada")), row(RIC.pct, noShowRate > 15 ? "#FF6B7D" : "#46D27A", "Tasa de inasistencia", noShowRate + "%", noShowRate > 15 ? "#FF6B7D" : "#46D27A", true)), /* @__PURE__ */ React.createElement("div", { style: { ...glassPanel(T, 20), padding: "6px 16px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#5B93F5", fontWeight: 600, padding: "14px 0 8px" } }, "Procedimientos del mes"), topProc.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textFaint, padding: "6px 0 12px" } }, "Sin datos este mes."), topProc.map((t, i) => /* @__PURE__ */ React.createElement("div", { key: t.name, style: { display: "flex", alignItems: "center", gap: 13, padding: "11px 0", borderBottom: i === topProc.length - 1 ? "none" : "1px solid rgba(255,255,255,.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: "rgba(59,130,246,.14)", color: "#6EA8FF", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 15, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, t.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.text, marginLeft: 8, flexShrink: 0 } }, t.n)), /* @__PURE__ */ React.createElement("div", { style: { height: 5, borderRadius: 999, background: "rgba(255,255,255,.09)", overflow: "hidden", marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: Math.max(6, Math.round(t.n / maxProc * 100)) + "%", background: "linear-gradient(90deg,#3B82F6,#5EA0FF)", borderRadius: 999 } }))))))));
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
  } }, /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: danger ? "rgba(255,90,110,.16)" : "rgba(59,130,246,.16)", border: "1px solid " + (danger ? "rgba(255,120,140,.3)" : "rgba(120,160,240,.28)"), color: danger ? "#FF6B7D" : "#6EA8FF", display: "flex", alignItems: "center", justifyContent: "center" } }, icon), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 18, fontWeight: 600, color: danger ? "#FF6B7D" : T.text, flex: 1 } }, label), /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: danger ? "rgba(255,107,125,.7)" : T.textFaint, strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })));
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
    /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: "rgba(59,130,246,.16)", border: "1px solid rgba(120,160,240,.28)", color: "#6EA8FF", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { id: "jcm-mob-rfab-icon2", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M8 16H3v5" }))),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 18, fontWeight: 600, color: T.text, flex: 1 } }, "Actualizar datos"),
    /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" }))
  ), /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: T.dark ? "rgba(255,255,255,.1)" : T.lineSoft, margin: "8px 4px" } }), item(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ React.createElement("path", { d: "M16 17l5-5-5-5M21 12H9" })), "Cerrar sesi\xF3n", onLogout, true));
}
function OverlayShell({ T, title, onBack, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 200, background: "radial-gradient(125% 80% at 72% -5%, #142944 0%, #0c1a2e 45%, #081120 100%)", backgroundColor: "#081120", display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "calc(14px + env(safe-area-inset-top,0px)) 18px 10px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, "aria-label": "Volver", style: { width: 38, height: 38, borderRadius: "50%", ...glassChip(T), color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" }))), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 26, fontWeight: 700, color: T.text, letterSpacing: "-.01em" } }, title)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto" } }, children));
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
        const cur = Array.isArray(map[a.fecha]) ? map[a.fecha] : HALF_HOURS.slice();
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
        const cur = Array.isArray(map[appt.fecha]) ? map[appt.fecha] : HALF_HOURS.slice();
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
  const hamburger = /* @__PURE__ */ React.createElement("button", { onClick: () => setDrawer(true), "aria-label": "Men\xFA", style: { width: 38, height: 38, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: -6 } }, /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M3 12h18M3 18h18" })));
  const bell = /* @__PURE__ */ React.createElement("button", { onClick: () => setNotifOpen(true), "aria-label": "Pendientes", style: { position: "relative", width: 38, height: 38, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: -4 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" })), bellCount > 0 && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 4, right: 6, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 999, background: T.accent, color: "#fff", fontFamily: T.sans, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,255,255,.35)" } }, bellCount));
  const headerTitle = (txt) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 17, fontWeight: 600, color: T.text } }, txt);
  const renderHeader = () => {
    if (tab === "citas") return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 } }, hamburger, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 3px 10px -4px rgba(0,0,0,.55)" } }, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 34, height: 34, objectFit: "contain" } })), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 5, lineHeight: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, fontWeight: 600, color: T.text } }, "Medique"), clinName && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, "\xB7 ", clinName)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, display: "block", marginTop: 1 } }, fechaHeader))), bell);
    if (tab === "nueva") return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("citas"), "aria-label": "Volver", style: { width: 38, height: 38, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: -6 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" }))), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 0, right: 0, textAlign: "center", pointerEvents: "none", fontFamily: T.sans, fontSize: 20, fontWeight: 600, color: T.text } }, "Nueva cita"), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("citas"), "aria-label": "Cerrar", style: { width: 38, height: 38, borderRadius: "50%", border: "none", background: "none", color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginRight: -6 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.1" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
    const titleMap = { horarios: "Horarios", agenda: "Agenda", mas: "M\xE1s" };
    const rightAction = tab === "agenda" ? /* @__PURE__ */ React.createElement("button", { onClick: () => setAgShowAnuladas((v) => !v), "aria-label": "Filtro", style: { width: 38, height: 38, borderRadius: "50%", border: "none", background: agShowAnuladas ? T.accentSoft : "none", color: agShowAnuladas ? T.accent : T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginRight: -4 } }, /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 6h16M7 12h10M10 18h4" }))) : /* @__PURE__ */ React.createElement("div", { style: { width: 34 } });
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
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100dvh", ...mobileBg(T), display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "sticky", top: 0, zIndex: 10, padding: "calc(8px + env(safe-area-inset-top,0px)) 14px 4px" } }, tab === "citas" ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, ...glassChip(T), borderRadius: 20, padding: "11px 14px" } }, renderHeader()) : /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "6px 4px 6px", minHeight: 42 } }, renderHeader())), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto" } }, tab === "citas" && /* @__PURE__ */ React.createElement(HomeTab, { T, appts, patients, onOpenAppt: setApptSheet, goTab: setTab, openOverlay: setOverlay }), tab === "horarios" && /* @__PURE__ */ React.createElement(HorariosTab, { T, appts }), tab === "nueva" && /* @__PURE__ */ React.createElement(NuevaWizard, { T, appts, patients, addAppt, addPatient, onDone: () => setTab("citas") }), tab === "agenda" && /* @__PURE__ */ React.createElement(AgendaTab, { T, appts, onOpenAppt: setApptSheet, goTab: setTab, showAnuladas: agShowAnuladas, setShowAnuladas: setAgShowAnuladas }), tab === "mas" && /* @__PURE__ */ React.createElement(MasTab, { T, openOverlay: setOverlay, onLogout })), /* @__PURE__ */ React.createElement("div", { style: { position: "sticky", bottom: 0, padding: "0 12px calc(10px + env(safe-area-inset-bottom,0px))", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 2, ...glassPanel(T, 26), padding: "7px 6px", pointerEvents: "auto", boxShadow: "0 18px 44px -14px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.16)" } }, tabs.map(({ lbl, icon, on, act }) => /* @__PURE__ */ React.createElement(
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
  )))), overlay === "pacientes" && /* @__PURE__ */ React.createElement(PacientesOverlay, { T, patients, appts, addPatient, onBack: () => setOverlay(null), onOpenFicha: (id) => setOverlay({ type: "ficha", id }) }), overlay === "reportes" && /* @__PURE__ */ React.createElement(ReportesOverlay, { T, appts, onBack: () => setOverlay(null) }), overlay && overlay.type === "ficha" && /* @__PURE__ */ React.createElement(FichaOverlay, { T, patientId: overlay.id, patients, appts, updatePatient, onBack: () => setOverlay(null) }), notifOpen && (() => {
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
    const label = (txt) => /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: T.textFaint, padding: "10px 12px 3px" } }, txt);
    return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
      if (e.target === e.currentTarget) closeN();
    }, style: { position: "fixed", inset: 0, zIndex: 410, background: "rgba(0,0,0,.55)", display: "flex", flexDirection: "column", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { ...glassPanel(T, 24), borderBottomLeftRadius: 0, borderBottomRightRadius: 0, maxHeight: "78dvh", display: "flex", flexDirection: "column", paddingBottom: "env(safe-area-inset-bottom,10px)", animation: "jcFade .2s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 11px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.1)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, fontWeight: 600, color: T.text } }, "Pendientes"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 1 } }, total === 0 ? "Todo al d\xEDa" : total + " por resolver")), /* @__PURE__ */ React.createElement("button", { onClick: closeN, "aria-label": "Cerrar", style: { width: 34, height: 34, borderRadius: "50%", ...glassChip(T), color: T.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "6px 8px 14px", display: "flex", flexDirection: "column", gap: 1 } }, total === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "40px 16px", textAlign: "center", fontFamily: T.sans, fontSize: 13, color: T.textFaint } }, "Sin pendientes \xB7 todo en orden \u2713"), pendConsent.length > 0 && label("Consentimientos por firmar"), pendConsent.map((p) => row("#E8B84D", docIcon, p.name || "Paciente", "Consentimiento por firmar", () => openFichaN(p.id))), pendPago.length > 0 && label("Pagos por confirmar"), pendPago.map((a) => row("#6EA8E8", payIcon, a.name || "Paciente", "Transferencia por confirmar" + (a.time ? " \xB7 " + a.time : ""), () => openApptN(a))))));
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
    }, style: { position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,.5)", display: "flex" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: "78%", maxWidth: 320, height: "100%", background: "radial-gradient(125% 80% at 72% -5%, #142944 0%, #0c1a2e 45%, #081120 100%)", backgroundColor: "#081120", display: "flex", flexDirection: "column", boxShadow: "8px 0 40px -10px rgba(0,0,0,.6)", animation: "jcDrawerIn .22s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { ...glassChip(T), border: "none", padding: "calc(16px + env(safe-area-inset-top,0px)) 16px 16px", display: "flex", alignItems: "center", gap: 11 } }, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 34, height: 34, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.text } }, "Medique"), clinName && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, clinName))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 } }, navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" })), "Inicio", () => go("citas")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" })), "Agenda", () => go("agenda")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })), "Nueva cita", () => go("nueva")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 6v6l4 2" })), "Horarios", () => go("horarios")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 1 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })), "Pacientes", () => openOv("pacientes")), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" })), "Reportes", () => openOv("reportes")), /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: "rgba(255,255,255,.1)", margin: "8px 12px" } }), navItem(/* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M8 16H3v5" })), "Actualizar datos", () => {
      window.dispatchEvent(new CustomEvent("jcsaas:data"));
      setDrawer(false);
    }), navItem(/* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ React.createElement("path", { d: "M16 17l5-5-5-5M21 12H9" })), "Cerrar sesi\xF3n", () => {
      setDrawer(false);
      onLogout();
    }, true))));
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
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 16, padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.08)", color: "#fff", outline: "none", boxSizing: "border-box" };
  const center = (kids) => /* @__PURE__ */ React.createElement(LoginVideoBg, null, kids);
  if (phase === "loading") return center(
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 } }, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 36, height: 36, marginBottom: 6 } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 24, color: "#fff" } }, "Medique"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: ON_PHOTO.mute } }, "Conectando\u2026"))
  );
  if (phase === "blocked") return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, color: "#fff", marginBottom: 8 } }, "Plan inactivo"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: ON_PHOTO.mute, textAlign: "center", maxWidth: 300, marginBottom: 18 } }, "El acceso de tu cl\xEDnica no est\xE1 activo. Escr\xEDbenos para reactivarlo."), /* @__PURE__ */ React.createElement("button", { onClick: () => window.JCSAAS.logout(), style: { background: "none", border: "1px solid rgba(255,255,255,.25)", color: "#fff", fontFamily: T.sans, fontSize: 12, borderRadius: 10, padding: "12px 18px", cursor: "pointer" } }, "Cerrar sesi\xF3n")));
  if (view === "recover") return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: 6 } }, "Recuperar contrase\xF1a"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: ON_PHOTO.mute, textAlign: "center", maxWidth: 300, marginBottom: 32, lineHeight: 1.5 } }, "Te enviaremos un enlace a tu correo para restablecerla."), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("input", { placeholder: "Correo de tu cuenta", inputMode: "email", "data-nocap": "", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: (e) => e.key === "Enter" && doRecover(), style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#FF8FA3", textAlign: "center" } }, err), msg && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#7CDDA8", textAlign: "center" } }, msg), /* @__PURE__ */ React.createElement("button", { onClick: doRecover, disabled: busy || !email.trim(), style: { background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", border: "none", borderRadius: 10, padding: "16px", cursor: "pointer", opacity: busy || !email.trim() ? 0.6 : 1, marginTop: 4 } }, busy ? "Enviando\u2026" : "Enviar enlace"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setView("login");
    setErr("");
    setMsg("");
  }, style: { background: "none", border: "none", cursor: "pointer", color: T.accent, fontFamily: T.sans, fontSize: 12, textDecoration: "underline", padding: 6 } }, "\u2190 Volver"))));
  return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: 6 } }, "Confirmar citas"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: ON_PHOTO.mute, marginBottom: 44 } }, "Panel m\xF3vil \xB7 Acceso de tu cl\xEDnica"), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("input", { placeholder: "Correo de tu cl\xEDnica", inputMode: "email", "data-nocap": "", value: email, onChange: (e) => setEmail(e.target.value), style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: "Contrase\xF1a", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => e.key === "Enter" && doLogin(), style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#FF8FA3", textAlign: "center" } }, err), /* @__PURE__ */ React.createElement("button", { onClick: doLogin, disabled: busy, style: { background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", border: "none", borderRadius: 10, padding: "16px", cursor: "pointer", opacity: busy ? 0.6 : 1, marginTop: 4 } }, busy ? "\u2026" : "Entrar"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setView("recover");
    setErr("");
    setMsg("");
  }, style: { background: "none", border: "none", cursor: "pointer", color: T.accent, fontFamily: T.sans, fontSize: 12, textDecoration: "underline", padding: 6 } }, "\xBFOlvidaste tu contrase\xF1a?"))));
}
ReactDOM.createRoot(document.getElementById("root")).render(
  window.JCSAAS && window.JCSAAS.enabled ? /* @__PURE__ */ React.createElement(MobileSaasGate, null) : /* @__PURE__ */ React.createElement(MobileAdmin, null)
);
