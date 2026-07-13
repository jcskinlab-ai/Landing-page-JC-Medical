const SESS_KEY = "jcm_portal_sess";
const SEC_QUESTIONS = [
  "\xBFNombre de tu primera mascota?",
  "\xBFEn qu\xE9 ciudad naciste?",
  "\xBFNombre de tu mejor amigo/a de la infancia?",
  "\xBFCu\xE1l es tu comida favorita?",
  "\xBFNombre de tu profesor/a favorito/a?",
  "\xBFC\xF3mo se llamaba tu primer colegio?",
  "\xBFNombre de soltera de tu madre?",
  "\xBFCu\xE1l fue tu primer trabajo?"
];
function portalApi(action, body) {
  return fetch("/api/team-access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.assign({ action: "portal-" + action }, body || {}))
  }).then(function(r) {
    return r.json().catch(function() {
      return { ok: false, error: "Respuesta inv\xE1lida del servidor." };
    });
  }).catch(function(e) {
    return { ok: false, error: e && e.message || "Sin conexi\xF3n." };
  });
}
function fmtRut(v) {
  var s = (v || "").replace(/[^0-9kK]/g, "").toUpperCase();
  if (s.length < 2) return s;
  var dv = s.slice(-1), body = s.slice(0, -1), out = "";
  for (var i = body.length; i > 0; i -= 3) out = "." + body.slice(Math.max(0, i - 3), i) + out;
  return out.slice(1) + "-" + dv;
}
function fmtFecha(iso) {
  try {
    return (/* @__PURE__ */ new Date(iso + "T00:00:00")).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  } catch (e) {
    return iso;
  }
}
function PortalApp() {
  const T = window.JCTHEME.clinico;
  const params = new URLSearchParams(window.location.search);
  const activarToken = params.get("activar");
  const [view, setView] = useState(activarToken ? "activar" : "login");
  const [sess, setSess] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(SESS_KEY) || "null");
    } catch (e) {
      return null;
    }
  });
  useEffect(() => {
    if (sess && sess.token && !activarToken) setView("ficha");
  }, []);
  function login(token, name) {
    const s = { token, name };
    try {
      sessionStorage.setItem(SESS_KEY, JSON.stringify(s));
    } catch (e) {
    }
    setSess(s);
    setView("ficha");
  }
  function logout() {
    try {
      sessionStorage.removeItem(SESS_KEY);
    } catch (e) {
    }
    setSess(null);
    setView("login");
  }
  const S = portalStyles(T);
  return /* @__PURE__ */ React.createElement("div", { style: S.stage }, /* @__PURE__ */ React.createElement("div", { style: S.card }, /* @__PURE__ */ React.createElement("div", { style: S.brandRow }, /* @__PURE__ */ React.createElement("div", { style: S.mark }, "M"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.brandName }, "Portal del paciente"), /* @__PURE__ */ React.createElement("div", { style: S.brandSub }, "Tu ficha, siempre contigo"))), view === "activar" && /* @__PURE__ */ React.createElement(ActivateView, { T, S, token: activarToken, onDone: () => setView("login") }), view === "login" && /* @__PURE__ */ React.createElement(LoginView, { T, S, onLogin: login, onRecover: () => setView("recuperar") }), view === "recuperar" && /* @__PURE__ */ React.createElement(RecoverView, { T, S, onDone: () => setView("login"), onBack: () => setView("login") }), view === "ficha" && sess && /* @__PURE__ */ React.createElement(FichaView, { T, S, sess, onLogout: logout, onExpired: logout })), /* @__PURE__ */ React.createElement("div", { style: S.footer }, "Medique \xB7 Tu informaci\xF3n est\xE1 protegida y solo t\xFA accedes a ella."));
}
function ActivateView({ T, S, token, onDone }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [already, setAlready] = useState(false);
  const [err, setErr] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [qs, setQs] = useState([SEC_QUESTIONS[0], SEC_QUESTIONS[1], SEC_QUESTIONS[2]]);
  const [ans, setAns] = useState(["", "", ""]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    portalApi("verify-token", { token }).then(function(r) {
      setLoading(false);
      if (r && r.ok) {
        setName(r.name || "");
        setAlready(!!r.alreadySet);
      } else setErr(r && r.error || "El enlace no es v\xE1lido o venci\xF3.");
    });
  }, []);
  const distinct = new Set(qs).size === 3;
  const ok = pass.length >= 6 && pass === pass2 && distinct && ans.every((a) => a.trim().length >= 2);
  function submit() {
    if (!ok || busy) return;
    setBusy(true);
    setErr("");
    portalApi("register", { token, password: pass, questions: qs, answers: ans }).then(function(r) {
      setBusy(false);
      if (r && r.ok) setDone(true);
      else setErr(r && r.error || "No se pudo crear tu acceso.");
    });
  }
  if (loading) return /* @__PURE__ */ React.createElement("div", { style: S.info }, "Verificando tu enlace\u2026");
  if (err && !name) return /* @__PURE__ */ React.createElement("div", { style: S.errBox }, err);
  if (done) return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.okBox }, "\xA1Listo! Tu acceso qued\xF3 creado. Ya puedes entrar con tu RUT y tu clave."), /* @__PURE__ */ React.createElement("button", { style: S.btnPrimary, onClick: onDone }, "Ir a iniciar sesi\xF3n"));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.h }, "Hola", name ? ", " + name.split(" ")[0] : "", " \u{1F44B}"), /* @__PURE__ */ React.createElement("div", { style: S.sub }, already ? "Ya ten\xEDas una clave; puedes definir una nueva aqu\xED." : "Crea tu clave y 3 preguntas de seguridad para acceder a tu ficha."), /* @__PURE__ */ React.createElement(Field, { S, label: "Nueva clave (m\xEDn. 6 caracteres)", type: "password", value: pass, onChange: setPass }), /* @__PURE__ */ React.createElement(Field, { S, label: "Repetir clave", type: "password", value: pass2, onChange: setPass2 }), pass2 && pass !== pass2 && /* @__PURE__ */ React.createElement("div", { style: S.hint }, "Las claves no coinciden."), /* @__PURE__ */ React.createElement("div", { style: S.secLabel }, "Preguntas de seguridad (para recuperar tu clave)"), [0, 1, 2].map((i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("select", { value: qs[i], onChange: (e) => {
    const n = qs.slice();
    n[i] = e.target.value;
    setQs(n);
  }, style: S.select }, SEC_QUESTIONS.map((q) => /* @__PURE__ */ React.createElement("option", { key: q, value: q }, q))), /* @__PURE__ */ React.createElement("input", { value: ans[i], onChange: (e) => {
    const n = ans.slice();
    n[i] = e.target.value;
    setAns(n);
  }, placeholder: "Tu respuesta", style: S.input }))), !distinct && /* @__PURE__ */ React.createElement("div", { style: S.hint }, "Elige 3 preguntas distintas."), err && /* @__PURE__ */ React.createElement("div", { style: S.errBox }, err), /* @__PURE__ */ React.createElement("button", { style: ok ? S.btnPrimary : S.btnDisabled, onClick: submit, disabled: !ok || busy }, busy ? "Creando\u2026" : "Crear mi acceso"));
}
function LoginView({ T, S, onLogin, onRecover }) {
  const [rut, setRut] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ok = rut.replace(/[^0-9kK]/g, "").length >= 7 && pass.length >= 1;
  function submit() {
    if (!ok || busy) return;
    setBusy(true);
    setErr("");
    portalApi("login", { rut, password: pass }).then(function(r) {
      setBusy(false);
      if (r && r.ok) onLogin(r.token, r.name || "");
      else setErr(r && r.error || "No se pudo iniciar sesi\xF3n.");
    });
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.h }, "Iniciar sesi\xF3n"), /* @__PURE__ */ React.createElement("div", { style: S.sub }, "Entra con tu RUT y la clave que creaste."), /* @__PURE__ */ React.createElement(Field, { S, label: "RUT", value: rut, onChange: (v) => setRut(fmtRut(v)), placeholder: "12.345.678-9", onEnter: submit }), /* @__PURE__ */ React.createElement(Field, { S, label: "Clave", type: "password", value: pass, onChange: setPass, onEnter: submit }), err && /* @__PURE__ */ React.createElement("div", { style: S.errBox }, err), /* @__PURE__ */ React.createElement("button", { style: ok ? S.btnPrimary : S.btnDisabled, onClick: submit, disabled: !ok || busy }, busy ? "Entrando\u2026" : "Entrar"), /* @__PURE__ */ React.createElement("button", { style: S.btnLink, onClick: onRecover }, "\xBFOlvidaste tu clave?"));
}
function RecoverView({ T, S, onDone, onBack }) {
  const [step, setStep] = useState(1);
  const [rut, setRut] = useState("");
  const [questions, setQuestions] = useState([]);
  const [ans, setAns] = useState(["", "", ""]);
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  function start() {
    if (busy) return;
    setBusy(true);
    setErr("");
    portalApi("recover-start", { rut }).then(function(r) {
      setBusy(false);
      if (r && r.ok) {
        setQuestions(r.questions || []);
        setStep(2);
      } else setErr(r && r.error || "No se pudo iniciar la recuperaci\xF3n.");
    });
  }
  const okReset = ans.every((a) => a.trim().length >= 1) && pass.length >= 6 && pass === pass2;
  function verify() {
    if (!okReset || busy) return;
    setBusy(true);
    setErr("");
    portalApi("recover-verify", { rut, answers: ans, newPassword: pass }).then(function(r) {
      setBusy(false);
      if (r && r.ok) setDone(true);
      else setErr(r && r.error || "No se pudo verificar.");
    });
  }
  if (done) return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.okBox }, "Tu clave se actualiz\xF3. Ya puedes entrar con tu nueva clave."), /* @__PURE__ */ React.createElement("button", { style: S.btnPrimary, onClick: onDone }, "Ir a iniciar sesi\xF3n"));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.h }, "Recuperar clave"), step === 1 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: S.sub }, "Ingresa tu RUT para mostrarte tus preguntas de seguridad."), /* @__PURE__ */ React.createElement(Field, { S, label: "RUT", value: rut, onChange: (v) => setRut(fmtRut(v)), placeholder: "12.345.678-9", onEnter: start }), err && /* @__PURE__ */ React.createElement("div", { style: S.errBox }, err), /* @__PURE__ */ React.createElement("button", { style: rut.replace(/[^0-9kK]/g, "").length >= 7 ? S.btnPrimary : S.btnDisabled, onClick: start, disabled: busy }, busy ? "Buscando\u2026" : "Continuar")), step === 2 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: S.sub }, "Responde tus 3 preguntas de seguridad y define una nueva clave."), questions.map((q, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: S.qLabel }, q), /* @__PURE__ */ React.createElement("input", { value: ans[i], onChange: (e) => {
    const n = ans.slice();
    n[i] = e.target.value;
    setAns(n);
  }, placeholder: "Tu respuesta", style: S.input }))), /* @__PURE__ */ React.createElement(Field, { S, label: "Nueva clave (m\xEDn. 6)", type: "password", value: pass, onChange: setPass }), /* @__PURE__ */ React.createElement(Field, { S, label: "Repetir nueva clave", type: "password", value: pass2, onChange: setPass2 }), pass2 && pass !== pass2 && /* @__PURE__ */ React.createElement("div", { style: S.hint }, "Las claves no coinciden."), err && /* @__PURE__ */ React.createElement("div", { style: S.errBox }, err), /* @__PURE__ */ React.createElement("button", { style: okReset ? S.btnPrimary : S.btnDisabled, onClick: verify, disabled: busy }, busy ? "Verificando\u2026" : "Cambiar clave")), /* @__PURE__ */ React.createElement("button", { style: S.btnLink, onClick: onBack }, "\u2190 Volver"));
}
function FichaView({ T, S, sess, onLogout, onExpired }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    portalApi("me", { token: sess.token }).then(function(r) {
      setLoading(false);
      if (r && r.ok) setData(r);
      else if (/expir|sesión|sesion/i.test(r && r.error || "")) onExpired();
      else setErr(r && r.error || "No se pudo cargar tu ficha.");
    });
  }, []);
  if (loading) return /* @__PURE__ */ React.createElement("div", { style: S.info }, "Cargando tu ficha\u2026");
  if (err) return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.errBox }, err), /* @__PURE__ */ React.createElement("button", { style: S.btnGhost, onClick: onLogout }, "Salir"));
  const hist = data && data.history || [];
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.h }, "Hola, ", (data.name || "").split(" ")[0]), data.clinicName && /* @__PURE__ */ React.createElement("div", { style: S.sub }, data.clinicName), data.nextAppt && /* @__PURE__ */ React.createElement("div", { style: S.nextBox }, /* @__PURE__ */ React.createElement("div", { style: S.nextLabel }, "Tu pr\xF3xima cita"), /* @__PURE__ */ React.createElement("div", { style: S.nextMain }, fmtFecha(data.nextAppt.fecha), data.nextAppt.time ? " \xB7 " + data.nextAppt.time : ""), data.nextAppt.proc && /* @__PURE__ */ React.createElement("div", { style: S.nextSub }, data.nextAppt.proc)), /* @__PURE__ */ React.createElement("div", { style: S.secLabel }, "Mis procedimientos (", hist.length, ")"), hist.length === 0 && /* @__PURE__ */ React.createElement("div", { style: S.info }, "A\xFAn no tienes procedimientos registrados."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, hist.map((h, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: S.histItem }, /* @__PURE__ */ React.createElement("div", { style: S.histTop }, /* @__PURE__ */ React.createElement("span", { style: S.histProc }, h.proc), h.date && /* @__PURE__ */ React.createElement("span", { style: S.histDate }, h.date)), (h.lote || h.venc || h.temp) && /* @__PURE__ */ React.createElement("div", { style: S.histMeta }, [h.lote && "Lote " + h.lote, h.venc && "Vence " + h.venc, h.temp && "Temp. " + h.temp].filter(Boolean).join("  \xB7  ")), h.resumen && /* @__PURE__ */ React.createElement("div", { style: S.histText }, h.resumen), h.recomendados && /* @__PURE__ */ React.createElement("div", { style: S.histRec }, "Recomendaci\xF3n del profesional: ", h.recomendados), h.proName && /* @__PURE__ */ React.createElement("div", { style: S.histPro }, "Realizado por ", h.proName), data.clinicWhats && (h.recomendados || h.proc) && /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/" + data.clinicWhats + "?text=" + encodeURIComponent("Hola, soy " + (data.name || "") + ". Me gustar\xEDa agendar una cita de " + (h.recomendados || h.proc) + "."), target: "_blank", rel: "noopener", style: S.histWa }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" })), "Agendar ", h.recomendados ? h.recomendados : "por WhatsApp")))), /* @__PURE__ */ React.createElement("button", { style: S.btnGhost, onClick: onLogout }, "Cerrar sesi\xF3n"));
}
function Field({ S, label, value, onChange, type, placeholder, onEnter }) {
  return /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: S.fieldLabel }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: type || "text",
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder,
      onKeyDown: (e) => {
        if (e.key === "Enter" && onEnter) onEnter();
      },
      style: S.input,
      autoComplete: type === "password" ? "off" : void 0,
      "data-nocap": ""
    }
  ));
}
function portalStyles(T) {
  const inputBase = { width: "100%", boxSizing: "border-box", padding: "12px 13px", borderRadius: 10, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 14, outline: "none" };
  const btnBase = { width: "100%", boxSizing: "border-box", padding: "13px", borderRadius: 10, border: "none", fontFamily: T.sans, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4 };
  return {
    stage: { minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px", background: T.bg },
    card: { width: "100%", maxWidth: 420, background: T.surface, border: "1px solid " + T.line, borderRadius: 18, padding: "26px 24px", boxShadow: "0 18px 50px -22px rgba(40,38,30,.28)" },
    brandRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 },
    mark: { width: 40, height: 40, borderRadius: 11, background: T.primaryBg, color: T.primaryText, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 20, flexShrink: 0 },
    brandName: { fontFamily: T.serif, fontSize: 17, color: T.text },
    brandSub: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute },
    h: { fontFamily: T.serif, fontSize: 24, color: T.text, marginBottom: 4 },
    sub: { fontFamily: T.sans, fontSize: 13, color: T.textMute, marginBottom: 18, lineHeight: 1.5 },
    fieldLabel: { display: "block", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 },
    input: inputBase,
    select: Object.assign({}, inputBase, { marginBottom: 8 }),
    secLabel: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, margin: "16px 0 10px" },
    qLabel: { fontFamily: T.sans, fontSize: 12.5, color: T.text, marginBottom: 5 },
    btnPrimary: Object.assign({}, btnBase, { background: T.primaryBg, color: T.primaryText }),
    btnDisabled: Object.assign({}, btnBase, { background: T.line, color: T.textFaint, cursor: "not-allowed" }),
    btnGhost: Object.assign({}, btnBase, { background: "transparent", color: T.textMute, border: "1px solid " + T.line, marginTop: 16 }),
    btnLink: { width: "100%", background: "transparent", border: "none", color: T.accent, fontFamily: T.sans, fontSize: 13, cursor: "pointer", marginTop: 12, padding: 6 },
    info: { fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "18px 0", textAlign: "center" },
    hint: { fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", marginBottom: 8, marginTop: -6 },
    errBox: { fontFamily: T.sans, fontSize: 12.5, color: "#C0285A", background: "rgba(192,40,90,.08)", border: "1px solid rgba(192,40,90,.3)", borderRadius: 9, padding: "10px 12px", marginBottom: 12, lineHeight: 1.5 },
    okBox: { fontFamily: T.sans, fontSize: 13, color: "#1F8A5B", background: "rgba(31,138,91,.08)", border: "1px solid rgba(31,138,91,.3)", borderRadius: 9, padding: "12px 14px", marginBottom: 14, lineHeight: 1.5 },
    nextBox: { background: T.accentSoft || "rgba(84,112,127,.1)", border: "1px solid " + T.line, borderRadius: 12, padding: "13px 15px", marginBottom: 6 },
    nextLabel: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, marginBottom: 4 },
    nextMain: { fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text, textTransform: "capitalize" },
    nextSub: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 2 },
    histItem: { background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "13px 15px" },
    histTop: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 },
    histProc: { fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text },
    histDate: { fontFamily: T.sans, fontSize: 11.5, color: T.accent, whiteSpace: "nowrap" },
    histMeta: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 3 },
    histText: { fontFamily: T.sans, fontSize: 12.5, color: T.text, marginTop: 6, lineHeight: 1.55 },
    histRec: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 5, lineHeight: 1.5 },
    histPro: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, fontStyle: "italic", marginTop: 6 },
    histWa: { display: "inline-flex", alignItems: "center", gap: 6, marginTop: 11, padding: "8px 13px", borderRadius: 9, background: "rgba(37,211,102,.12)", border: "1px solid rgba(37,211,102,.42)", color: "#128a4b", fontFamily: T.sans, fontSize: 12, fontWeight: 600, textDecoration: "none" },
    footer: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 18, textAlign: "center", maxWidth: 420, lineHeight: 1.5 }
  };
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(PortalApp, null));
