/* ═══════════════ MEDIQUE · PORTAL DEL PACIENTE ═══════════════
   SPA autocontenida: el paciente entra con su RUT + una clave que él mismo crea y ve SOLO su
   propia ficha (procedimientos registrados). NO carga jcm_saas/jcm_cloud → el navegador del
   paciente nunca toca Firestore: todo pasa por /api/portal, que filtra server-side.
   Vistas: activación (desde el link de un solo uso), login, recuperación (3 preguntas), ficha. */

const SESS_KEY = "jcm_portal_sess";
const SEC_QUESTIONS = [
  "¿Nombre de tu primera mascota?",
  "¿En qué ciudad naciste?",
  "¿Nombre de tu mejor amigo/a de la infancia?",
  "¿Cuál es tu comida favorita?",
  "¿Nombre de tu profesor/a favorito/a?",
  "¿Cómo se llamaba tu primer colegio?",
  "¿Nombre de soltera de tu madre?",
  "¿Cuál fue tu primer trabajo?"
];

function portalApi(action, body) {
  return fetch("/api/portal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.assign({ action: action }, body || {}))
  }).then(function (r) { return r.json().catch(function () { return { ok: false, error: "Respuesta inválida del servidor." }; }); })
    .catch(function (e) { return { ok: false, error: (e && e.message) || "Sin conexión." }; });
}
function fmtRut(v) {
  var s = (v || "").replace(/[^0-9kK]/g, "").toUpperCase();
  if (s.length < 2) return s;
  var dv = s.slice(-1), body = s.slice(0, -1), out = "";
  for (var i = body.length; i > 0; i -= 3) out = "." + body.slice(Math.max(0, i - 3), i) + out;
  return out.slice(1) + "-" + dv;
}
function fmtFecha(iso) {
  try { return new Date(iso + "T00:00:00").toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" }); }
  catch (e) { return iso; }
}

function PortalApp() {
  const T = window.JCTHEME.clinico;
  const params = new URLSearchParams(window.location.search);
  const activarToken = params.get("activar");
  const [view, setView] = useState(activarToken ? "activar" : "login");
  const [sess, setSess] = useState(() => { try { return JSON.parse(sessionStorage.getItem(SESS_KEY) || "null"); } catch (e) { return null; } });

  // Si hay sesión guardada, ir directo a la ficha.
  useEffect(() => { if (sess && sess.token && !activarToken) setView("ficha"); }, []);

  function login(token, name) {
    const s = { token: token, name: name };
    try { sessionStorage.setItem(SESS_KEY, JSON.stringify(s)); } catch (e) {}
    setSess(s); setView("ficha");
  }
  function logout() { try { sessionStorage.removeItem(SESS_KEY); } catch (e) {} setSess(null); setView("login"); }

  const S = portalStyles(T);
  return (
    <div style={S.stage}>
      <div style={S.card}>
        <div style={S.brandRow}>
          <div style={S.mark}>M</div>
          <div>
            <div style={S.brandName}>Portal del paciente</div>
            <div style={S.brandSub}>Tu ficha, siempre contigo</div>
          </div>
        </div>
        {view === "activar" && <ActivateView T={T} S={S} token={activarToken} onDone={() => setView("login")} />}
        {view === "login" && <LoginView T={T} S={S} onLogin={login} onRecover={() => setView("recuperar")} />}
        {view === "recuperar" && <RecoverView T={T} S={S} onDone={() => setView("login")} onBack={() => setView("login")} />}
        {view === "ficha" && sess && <FichaView T={T} S={S} sess={sess} onLogout={logout} onExpired={logout} />}
      </div>
      <div style={S.footer}>Medique · Tu información está protegida y solo tú accedes a ella.</div>
    </div>
  );
}

/* ── Activación: crear clave + 3 preguntas de seguridad (desde el link de un solo uso) ── */
function ActivateView({ T, S, token, onDone }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [already, setAlready] = useState(false);
  const [err, setErr] = useState("");
  const [pass, setPass] = useState(""); const [pass2, setPass2] = useState("");
  const [qs, setQs] = useState([SEC_QUESTIONS[0], SEC_QUESTIONS[1], SEC_QUESTIONS[2]]);
  const [ans, setAns] = useState(["", "", ""]);
  const [busy, setBusy] = useState(false); const [done, setDone] = useState(false);

  useEffect(() => {
    portalApi("verify-token", { token: token }).then(function (r) {
      setLoading(false);
      if (r && r.ok) { setName(r.name || ""); setAlready(!!r.alreadySet); }
      else setErr((r && r.error) || "El enlace no es válido o venció.");
    });
  }, []);

  const distinct = new Set(qs).size === 3;
  const ok = pass.length >= 6 && pass === pass2 && distinct && ans.every(a => a.trim().length >= 2);

  function submit() {
    if (!ok || busy) return;
    setBusy(true); setErr("");
    portalApi("register", { token: token, password: pass, questions: qs, answers: ans }).then(function (r) {
      setBusy(false);
      if (r && r.ok) setDone(true);
      else setErr((r && r.error) || "No se pudo crear tu acceso.");
    });
  }

  if (loading) return <div style={S.info}>Verificando tu enlace…</div>;
  if (err && !name) return <div style={S.errBox}>{err}</div>;
  if (done) return (
    <div>
      <div style={S.okBox}>¡Listo! Tu acceso quedó creado. Ya puedes entrar con tu RUT y tu clave.</div>
      <button style={S.btnPrimary} onClick={onDone}>Ir a iniciar sesión</button>
    </div>
  );

  return (
    <div>
      <div style={S.h}>Hola{name ? ", " + name.split(" ")[0] : ""} 👋</div>
      <div style={S.sub}>{already ? "Ya tenías una clave; puedes definir una nueva aquí." : "Crea tu clave y 3 preguntas de seguridad para acceder a tu ficha."}</div>
      <Field S={S} label="Nueva clave (mín. 6 caracteres)" type="password" value={pass} onChange={setPass} />
      <Field S={S} label="Repetir clave" type="password" value={pass2} onChange={setPass2} />
      {pass2 && pass !== pass2 && <div style={S.hint}>Las claves no coinciden.</div>}
      <div style={S.secLabel}>Preguntas de seguridad (para recuperar tu clave)</div>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ marginBottom: 10 }}>
          <select value={qs[i]} onChange={e => { const n = qs.slice(); n[i] = e.target.value; setQs(n); }} style={S.select}>
            {SEC_QUESTIONS.map(q => <option key={q} value={q}>{q}</option>)}
          </select>
          <input value={ans[i]} onChange={e => { const n = ans.slice(); n[i] = e.target.value; setAns(n); }} placeholder="Tu respuesta" style={S.input} />
        </div>
      ))}
      {!distinct && <div style={S.hint}>Elige 3 preguntas distintas.</div>}
      {err && <div style={S.errBox}>{err}</div>}
      <button style={ok ? S.btnPrimary : S.btnDisabled} onClick={submit} disabled={!ok || busy}>{busy ? "Creando…" : "Crear mi acceso"}</button>
    </div>
  );
}

/* ── Login: RUT + clave ── */
function LoginView({ T, S, onLogin, onRecover }) {
  const [rut, setRut] = useState(""); const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  const ok = rut.replace(/[^0-9kK]/g, "").length >= 7 && pass.length >= 1;
  function submit() {
    if (!ok || busy) return;
    setBusy(true); setErr("");
    portalApi("login", { rut: rut, password: pass }).then(function (r) {
      setBusy(false);
      if (r && r.ok) onLogin(r.token, r.name || "");
      else setErr((r && r.error) || "No se pudo iniciar sesión.");
    });
  }
  return (
    <div>
      <div style={S.h}>Iniciar sesión</div>
      <div style={S.sub}>Entra con tu RUT y la clave que creaste.</div>
      <Field S={S} label="RUT" value={rut} onChange={v => setRut(fmtRut(v))} placeholder="12.345.678-9" onEnter={submit} />
      <Field S={S} label="Clave" type="password" value={pass} onChange={setPass} onEnter={submit} />
      {err && <div style={S.errBox}>{err}</div>}
      <button style={ok ? S.btnPrimary : S.btnDisabled} onClick={submit} disabled={!ok || busy}>{busy ? "Entrando…" : "Entrar"}</button>
      <button style={S.btnLink} onClick={onRecover}>¿Olvidaste tu clave?</button>
    </div>
  );
}

/* ── Recuperación: RUT → 3 preguntas → nueva clave ── */
function RecoverView({ T, S, onDone, onBack }) {
  const [step, setStep] = useState(1);
  const [rut, setRut] = useState(""); const [questions, setQuestions] = useState([]);
  const [ans, setAns] = useState(["", "", ""]); const [pass, setPass] = useState(""); const [pass2, setPass2] = useState("");
  const [busy, setBusy] = useState(false); const [err, setErr] = useState(""); const [done, setDone] = useState(false);

  function start() {
    if (busy) return; setBusy(true); setErr("");
    portalApi("recover-start", { rut: rut }).then(function (r) {
      setBusy(false);
      if (r && r.ok) { setQuestions(r.questions || []); setStep(2); }
      else setErr((r && r.error) || "No se pudo iniciar la recuperación.");
    });
  }
  const okReset = ans.every(a => a.trim().length >= 1) && pass.length >= 6 && pass === pass2;
  function verify() {
    if (!okReset || busy) return; setBusy(true); setErr("");
    portalApi("recover-verify", { rut: rut, answers: ans, newPassword: pass }).then(function (r) {
      setBusy(false);
      if (r && r.ok) setDone(true);
      else setErr((r && r.error) || "No se pudo verificar.");
    });
  }
  if (done) return (
    <div>
      <div style={S.okBox}>Tu clave se actualizó. Ya puedes entrar con tu nueva clave.</div>
      <button style={S.btnPrimary} onClick={onDone}>Ir a iniciar sesión</button>
    </div>
  );
  return (
    <div>
      <div style={S.h}>Recuperar clave</div>
      {step === 1 && <>
        <div style={S.sub}>Ingresa tu RUT para mostrarte tus preguntas de seguridad.</div>
        <Field S={S} label="RUT" value={rut} onChange={v => setRut(fmtRut(v))} placeholder="12.345.678-9" onEnter={start} />
        {err && <div style={S.errBox}>{err}</div>}
        <button style={rut.replace(/[^0-9kK]/g, "").length >= 7 ? S.btnPrimary : S.btnDisabled} onClick={start} disabled={busy}>{busy ? "Buscando…" : "Continuar"}</button>
      </>}
      {step === 2 && <>
        <div style={S.sub}>Responde tus 3 preguntas de seguridad y define una nueva clave.</div>
        {questions.map((q, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={S.qLabel}>{q}</div>
            <input value={ans[i]} onChange={e => { const n = ans.slice(); n[i] = e.target.value; setAns(n); }} placeholder="Tu respuesta" style={S.input} />
          </div>
        ))}
        <Field S={S} label="Nueva clave (mín. 6)" type="password" value={pass} onChange={setPass} />
        <Field S={S} label="Repetir nueva clave" type="password" value={pass2} onChange={setPass2} />
        {pass2 && pass !== pass2 && <div style={S.hint}>Las claves no coinciden.</div>}
        {err && <div style={S.errBox}>{err}</div>}
        <button style={okReset ? S.btnPrimary : S.btnDisabled} onClick={verify} disabled={busy}>{busy ? "Verificando…" : "Cambiar clave"}</button>
      </>}
      <button style={S.btnLink} onClick={onBack}>← Volver</button>
    </div>
  );
}

/* ── Ficha del paciente: procedimientos (solo lectura) ── */
function FichaView({ T, S, sess, onLogout, onExpired }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    portalApi("me", { token: sess.token }).then(function (r) {
      setLoading(false);
      if (r && r.ok) setData(r);
      else if (/expir|sesión|sesion/i.test((r && r.error) || "")) onExpired();
      else setErr((r && r.error) || "No se pudo cargar tu ficha.");
    });
  }, []);
  if (loading) return <div style={S.info}>Cargando tu ficha…</div>;
  if (err) return <div><div style={S.errBox}>{err}</div><button style={S.btnGhost} onClick={onLogout}>Salir</button></div>;
  const hist = (data && data.history) || [];
  return (
    <div>
      <div style={S.h}>Hola, {(data.name || "").split(" ")[0]}</div>
      {data.clinicName && <div style={S.sub}>{data.clinicName}</div>}
      {data.nextAppt && (
        <div style={S.nextBox}>
          <div style={S.nextLabel}>Tu próxima cita</div>
          <div style={S.nextMain}>{fmtFecha(data.nextAppt.fecha)}{data.nextAppt.time ? " · " + data.nextAppt.time : ""}</div>
          {data.nextAppt.proc && <div style={S.nextSub}>{data.nextAppt.proc}</div>}
        </div>
      )}
      <div style={S.secLabel}>Mis procedimientos ({hist.length})</div>
      {hist.length === 0 && <div style={S.info}>Aún no tienes procedimientos registrados.</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {hist.map((h, i) => (
          <div key={i} style={S.histItem}>
            <div style={S.histTop}>
              <span style={S.histProc}>{h.proc}</span>
              {h.date && <span style={S.histDate}>{h.date}</span>}
            </div>
            {h.units && <div style={S.histMeta}>{h.units}</div>}
            {h.resumen && <div style={S.histText}>{h.resumen}</div>}
            {h.recomendados && <div style={S.histRec}>Recomendado: {h.recomendados}</div>}
            {h.proName && <div style={S.histPro}>Realizado por {h.proName}</div>}
          </div>
        ))}
      </div>
      <button style={S.btnGhost} onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
}

/* ── Campo con label ── */
function Field({ S, label, value, onChange, type, placeholder, onEnter }) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <span style={S.fieldLabel}>{label}</span>
      <input type={type || "text"} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onKeyDown={e => { if (e.key === "Enter" && onEnter) onEnter(); }} style={S.input}
        autoComplete={type === "password" ? "off" : undefined} data-nocap="" />
    </label>
  );
}

/* ── Estilos (tema clínico claro) ── */
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
    footer: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 18, textAlign: "center", maxWidth: 420, lineHeight: 1.5 }
  };
}

ReactDOM.createRoot(document.getElementById("root")).render(<PortalApp />);
