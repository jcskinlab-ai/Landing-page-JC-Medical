/* ═══════════ JC · PANTALLAS INTEGRADAS: ASISTENTE / JUEGOS / PERFIL ═══════════ */

/* ─────────── ASISTENTE IA · prompt experto + base de conocimientos ─────────── */
// System prompt del asistente experto de JC Medical (SKINLAB.TALCA). Se usa con el
// modelo en vivo (window.claude.complete) cuando está disponible; si no, responde la
// base de conocimientos por reglas (window.jcmBot).
const JCM_ASSISTANT_SYS = `Actúa como un asistente virtual experto en Medicina Estética Facial y Corporal para la clínica JC Medical (SKINLAB.TALCA, Talca, Chile). Tu creador y director médico es el Enfermero en Medicina Estética, Juan Claudio Parra Pérez. Tu objetivo es educar a los pacientes, resolver sus dudas con precisión clínica y calidez, y motivarlos a agendar una evaluación en nuestra sede en Talca.

Tu tono debe ser profesional, empático, seguro y persuasivo. Nunca diagnostiques, pero brinda toda la información necesaria sobre nuestros procedimientos. Responde SIEMPRE en español, de forma breve y clara (2 a 5 frases salvo que pidan detalle).

BASE DE CONOCIMIENTOS DE PROCEDIMIENTOS:

1. TOXINA BOTULÍNICA (BOTOX) — Zonas: tercio superior (patas de gallo, entrecejo, frente), cuello (Nefertiti), bruxismo (masetero), hiperhidrosis (axilar/palmar), sonrisa gingival, mentón empedrado. Efecto: relaja los músculos que causan arrugas dinámicas; no rellena. Aplicación: inyecciones intramusculares con aguja ultrafina. Sesión: 15–30 min. Resultados: 3–6 meses (hiperhidrosis y sonrisa gingival hasta 12 meses); peak a los 21 días. Dolor: leve, como un pequeño pellizco. Efectos secundarios: enrojecimiento leve, pequeña inflamación o hematoma puntual que desaparece en pocos días, asimetría temporal corregible. Contraindicaciones: embarazo, lactancia, alergia a la toxina, enfermedades neuromusculares (ej. Miastenia Gravis), infección activa en la zona.

2. ÁCIDO HIALURÓNICO (RELLENOS Y ARMONIZACIÓN) — Procedimientos: rinomodelación, relleno de labios (y rinolips), surcos nasogenianos, aumento de mentón, arco mandibular, Rest Full Lift de pómulos, código de barras. Efecto: aporta volumen, hidrata, define contornos y mejora la simetría. Aplicación: inyección subcutánea o supraperióstica, frecuentemente con cánula de bajo calibre o aguja fina. Sesión: 30–45 min. Resultados: 9–18 meses según densidad y zona. Dolor: leve a moderado; anestesia tópica y muchos rellenos traen lidocaína. Efectos secundarios: inflamación 3–5 días, posibles hematomas, sensibilidad al tacto. Contraindicaciones: embarazo, lactancia, enfermedades autoinmunes activas, tendencia a queloides, infección activa.

3. BIOESTIMULADORES DE COLÁGENO (SCULPTRA Y RADIESSE) — Efecto: estimulan la producción natural de colágeno y elastina en capas profundas; combaten flacidez y recuperan volumen perdido. Aplicación: inyección con cánula en abanico (vectores de tensión). Sesión: 45–60 min. Resultados: Sculptra 1–2 años, Radiesse 12–18 meses. Dolor: leve, con anestesia local. Efectos secundarios: inflamación temporal, nódulos palpables poco frecuentes (se previenen con el masaje post-tratamiento). Contraindicaciones: enfermedades autoinmunes, embarazo, infecciones activas.

4. BIOREVITALIZANTES Y MESOTERAPIA (NCTF 135 HA, REJURAN HB, PINK GLOW) — NCTF: biorevitalización con 59 ingredientes + AH. Rejuran: regeneración con ADN de salmón. Pink Glow: hidratación y luminosidad con péptidos y antioxidantes. Aplicación: microinyecciones superficiales (pápulas), Nanosoft o Dermapen. Sesión: 30–45 min. Resultados: 6–12 meses. Dolor: leve con crema anestésica, indoloro con Dermapen. Efectos secundarios: eritema y pequeñas pápulas que desaparecen en 24–48 h. Contraindicaciones: alergia a componentes (ej. pescado para Rejuran), acné activo severo.

5. HILOS TENSORES (LIFTING FACIAL Y FOXY EYES) — Efecto: elevación mecánica de tejidos caídos (cola de ceja, mejillas, mandíbula) y estimulación de colágeno. Aplicación: inserción subcutánea de hilos biocompatibles (PDO u otros) con cánula guía. Sesión: 45–60 min. Resultados: 12–18 meses. Dolor: moderado; requiere anestesia local inyectable en los puntos de entrada. Efectos secundarios: tensión o tirantez los primeros días, hematomas, leve hundimiento temporal (hoyuelos) que se resuelve rápido. Contraindicaciones: piel muy flácida o gruesa (mala indicación), infecciones, alteraciones de la coagulación.

6. ENZIMAS LIPOLÍTICAS INYECTABLES — Efecto: destrucción de grasa localizada (papada, abdomen, brazos). Aplicación: microinyecciones directas en el tejido adiposo. Sesión: 20–30 min (requiere 3–6 sesiones cada 15 días). Resultados: permanentes si el paciente mantiene su peso. Dolor: leve a moderado, sensación de ardor al ingresar el líquido. Efectos secundarios: inflamación importante 48–72 h, enrojecimiento, sensibilidad, nódulos temporales. Contraindicaciones: obesidad generalizada (es para contorno, no para bajar de peso), embarazo, alteraciones hepáticas graves.

REGLAS DE INTERACCIÓN:
1. Si preguntan precios, usa EXCLUSIVAMENTE la LISTA DE PRECIOS OFICIAL que se incluye más abajo (en pesos chilenos). No inventes ni estimes valores. La evaluación cuesta $10.000 y se descuenta del tratamiento si el paciente lo realiza.
2. Si el paciente relata una complicación grave (dolor intenso, cambio de color o blanqueamiento de la piel), indícale que debe contactar al Enfermero Juan Claudio INMEDIATAMENTE por WhatsApp +56 9 9788 0877.
3. Cierra SIEMPRE tus mensajes invitando al paciente a agendar una hora en JC Medical.`;
const JCM_AGENDA_CIERRE = "¿Te gustaría que agendemos tu evaluación en JC Medical?";
const JCM_SEVERE = /(dolor (muy )?intenso|insoportable|blanque|palidez|piel (blanca|p[aá]lida|morada)|cambio de color|se puso (blanc|morad|gris)|necros|no siento|p[eé]rdida de visi)/i;
function jcmStripHtml(s) { return (s + "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim(); }
function jcmMdToHtml(s) {
  let h = (s + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  h = h.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n{2,}/g, "<br><br>").replace(/\n/g, "<br>");
  return h;
}
window.JCM_ASSISTANT_SYS = JCM_ASSISTANT_SYS;

/* ─────────── ASISTENTE IA ─────────── */
function AssistantScreen({ T, D, openBooking, onBack }) {
  const [msgs, setMsgs] = useState([{ who: "bot", html: "Hola, soy el asistente de <b>JC Medical</b>. Cuéntame tu duda o elige una opción:", sugs: ["Procedimientos más frecuentes", "Tratamiento para arrugas", "Tratamiento para flacidez"] }]);
  const [val, setVal] = useState("");
  const [busy, setBusy] = useState(false);
  const [resolved, setResolved] = useState(0); // dudas resueltas (>4 → el botón "Agendar procedimiento" crece)
  const boxRef = useRef(null);
  const ctx = useRef(null);                     // último procedimiento mencionado (contexto)
  const chips = window.JCM_CHAT_CHIPS || ["¿Qué es el Bótox?", "¿Duele el ácido hialurónico?", "¿En qué consiste la evaluación?"];
  const BASE_Q = ["Procedimientos más frecuentes", "Precios", "¿En qué consiste la evaluación?"];
  const CTX_WORD = { botox: "botox", bioestim: "sculptra", meso: "nctf", lipo: "quemador", salmon: "rejuran", rino: "rinomodelacion", ha: "acido hialuronico", hiper: "hiperhidrosis" };
  function _norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

  function scrollDown() { setTimeout(() => { if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight; }, 40); }
  function safeBot(q) { let res = { html: "Cuéntame un poco más y te oriento. " + JCM_AGENDA_CIERRE, sugs: chips.slice(0, 3) }; try { if (window.jcmBot) res = window.jcmBot(q); } catch (e) {} return res; }
  async function ask(q) {
    if (!q || !q.trim() || busy) return;
    if (/^agendar/i.test(q.trim())) { if (openBooking) openBooking(null); return; }
    if (/whatsapp/i.test(q.trim())) { window.open("https://wa.me/56997880877", "_blank"); return; }
    setMsgs(m => [...m, { who: "me", html: escapeHtml(q) }]);
    setVal(""); scrollDown();
    // urgencia clínica
    if (JCM_SEVERE.test(q)) {
      setMsgs(m => [...m, { who: "bot", html: "Lo que describes puede ser una <b>urgencia</b>. Por favor contacta de inmediato al enfermero <b>Juan Claudio Parra</b> por WhatsApp: <a href=\"https://wa.me/56997880877\" target=\"_blank\" rel=\"noopener\" style=\"color:inherit;font-weight:600\">+56 9 9788 0877</a>. No esperes ni te automediques.", sugs: ["Escribir por WhatsApp"] }]);
      scrollDown(); return;
    }
    // Contexto: recuerda el procedimiento mencionado; en preguntas sueltas de sesiones lo reinyecta.
    const topic = window.jcmDetectProc ? window.jcmDetectProc(q) : null;
    if (topic) ctx.current = topic;
    let bq = q;
    if (!topic && ctx.current && /sesion|sesiones|cuantas veces|cuantas/.test(_norm(q))) bq = q + " " + (CTX_WORD[ctx.current] || "");
    const nextResolved = resolved + 1;
    setResolved(nextResolved);
    const showBook = nextResolved >= 2;
    const live = window.claude && typeof window.claude.complete === "function";
    if (live) {
      setBusy(true);
      setMsgs(m => [...m, { who: "bot", html: "<i style=\"opacity:.6\">Escribiendo…</i>", typing: true }]);
      scrollDown();
      try {
        const hist = msgs.slice(-6).map(x => (x.who === "me" ? "Paciente: " : "Asistente: ") + jcmStripHtml(x.html)).join("\n");
        const prices = window.jcmPriceList ? ("\n\nLISTA DE PRECIOS OFICIAL (CLP):\n" + window.jcmPriceList()) : "";
        const prompt = JCM_ASSISTANT_SYS + prices + "\n\nConversación previa:\n" + hist + "\nPaciente: " + bq + "\nAsistente:";
        const out = await window.claude.complete(prompt);
        setMsgs(m => [...m.filter(x => !x.typing), { who: "bot", html: jcmMdToHtml(out), sugs: ["Agendar evaluación"], showBook }]);
      } catch (e) {
        const r = safeBot(bq); setMsgs(m => [...m.filter(x => !x.typing), { who: "bot", html: r.html, sugs: r.sugs, showBook }]);
      }
      setBusy(false); scrollDown(); return;
    }
    setTimeout(() => { const r = safeBot(bq); setMsgs(m => [...m, { who: "bot", html: r.html, sugs: r.sugs, showBook }]); scrollDown(); }, 240);
  }
  function escapeHtml(s) { return (s + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 20px 6px" }}>
        {onBack && (
          <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: T.textMute, fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12, padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>Volver
          </button>
        )}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <Eyebrow T={T}>Asistente · orientación</Eyebrow>
            <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 38, lineHeight: 1, letterSpacing: "-.02em", color: T.text, marginTop: 12 }}>Pregúntame</h1>
          </div>
          <button onClick={() => openBooking && openBooking(null)} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 10, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.onAccent, background: T.gold, border: "none", borderRadius: 999, padding: "9px 14px", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>Agendar
          </button>
        </div>
      </div>
      <div ref={boxRef} className="jc-scroll" style={{ flex: 1, overflowY: "auto", padding: "8px 16px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ flexGrow: 1 }} />
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.who === "me" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "86%" }}>
              <div style={{
                fontFamily: T.sans, fontSize: 13.5, lineHeight: 1.6,
                background: m.who === "me" ? T.primaryBg : T.surface, color: m.who === "me" ? T.primaryText : T.text,
                border: "1px solid " + (m.who === "me" ? T.primaryBg : T.line), borderRadius: 14,
                borderBottomRightRadius: m.who === "me" ? 4 : 14, borderBottomLeftRadius: m.who === "me" ? 14 : 4,
                padding: "12px 15px"
              }} dangerouslySetInnerHTML={{ __html: m.html }} />
              {(m.sugs && m.sugs.length > 0 || m.showBook) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {(m.sugs || []).slice(0, 3).map(s => (
                    <button key={s} onClick={() => ask(s)} style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "7px 12px", cursor: "pointer" }}>{s}</button>
                  ))}
                  {m.showBook && (
                    <button onClick={() => openBooking && openBooking(null)} style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: "#fff", background: T.gold, border: "none", borderRadius: 999, padding: "7px 14px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>Agendar
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid " + T.line, background: T.navBg, display: "flex", gap: 8 }}>
        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => { if (e.key === "Enter") ask(val); }}
          placeholder="Escribe tu pregunta…" style={{ flex: 1, padding: "12px 14px", borderRadius: 999, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 16, outline: "none" }} />
        <button onClick={() => ask(val)} style={{ width: 44, height: 44, borderRadius: "50%", border: "none", background: T.primaryBg, color: T.primaryText, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────── JUEGOS ─────────── */
// rk = clave del récord. Para los juegos del hub de acción es 'acc_<key>' dentro
// de localStorage 'jcm_records'; para el resto es su propia clave *_best.
// base = récord semilla (siempre hay una marca que superar, aunque nadie haya jugado).
/* ─────────── GLOW POINTS · tope diario + tickets de sorteo ───────────
   Regla: hay un TOPE de puntos por día. Acumulando ~15 días de juego (al tope)
   se alcanza la meta y se gana 1 TICKET de participación al sorteo. Los puntos NO
   se canjean por sesiones: se acumulan tickets y entre todos los usuarios se sortea. */
const GLOW = {
  CAP: 200,      // máximo de puntos por día (necesita ~10 min de juego para llegar al tope)
  GAME_CAP: 100, // máximo de puntos por juego por día (obliga a jugar 2+ juegos)
  GOAL: 3000,    // puntos para 1 ticket (~15 días al tope)
  todayKey() { const d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); },
  load() {
    let s; try { s = JSON.parse(localStorage.getItem("jcm_glow") || "null"); } catch (e) { s = null; }
    if (!s) s = { points: 0, tickets: 0, cyclePts: 0, lifetime: 0, day: this.todayKey(), today: 0, perGame: {} };
    if (s.day !== this.todayKey()) { s.day = this.todayKey(); s.today = 0; s.perGame = {}; }
    if (!s.perGame) s.perGame = {};
    return s;
  },
  save(s) { try { localStorage.setItem("jcm_glow", JSON.stringify(s)); } catch (e) {} },
  add(n, gameId) {
    const s = this.load();
    // Límite por juego: máx 100 pts/día por juego
    if (gameId) {
      const gamePts = s.perGame[gameId] || 0;
      const gameRoom = Math.max(0, this.GAME_CAP - gamePts);
      n = Math.min(n, gameRoom);
      if (n > 0) s.perGame[gameId] = gamePts + n;
    }
    // Límite diario global
    const room = Math.max(0, this.CAP - s.today); n = Math.min(n, room);
    if (n > 0) { s.today += n; s.points += n; s.cyclePts += n; s.lifetime += n; while (s.cyclePts >= this.GOAL) { s.cyclePts -= this.GOAL; s.tickets += 1; } }
    this.save(s); return s;
  }
};
const SORTEO_PREMIOS = [
  { ic: "PG", n: "Sesión de Pink Glow", d: "Hidratación y luminosidad" },
  { ic: "EX", n: "Sesión de Exosomas o Botox", d: "Regeneración y expresión natural" },
  { ic: "TB", n: "Toxina botulínica · 1 zona", d: "Expresión natural" }
];

const JC_GAMES = [
  // ── Saber estético (set claro, con instrucciones) ──
  { id: "trivia",    nm: "Consultorio Trivia", d: "3 rondas · 3 vidas", ic: "🧠", url: "arcade/games/jc/index.html?game=trivia", c: "#54707F", rk: "trivia_best", base: 920,
    inst: "3 rondas de 3 preguntas. Tienes 3 vidas ❤️❤️❤️ — cada error te cuesta una. Responde rápido para ganar más puntos." },
  { id: "millonario", nm: "¿Quién quiere ser…?", d: "15 preguntas · escala de premios", ic: "💰", url: "arcade/games/jc/index.html?game=millonario", c: "#caa86a", rk: "mill_best", base: 0,
    inst: "Sube 15 escalones respondiendo correctamente. Hay premios asegurados en el camino. Un comodín 50:50 disponible. La selección de preguntas rota cada día." },
  { id: "mv",        nm: "Mito o Verdad", d: "10 afirmaciones · 3 vidas", ic: "⚖️", url: "arcade/games/jc/index.html?game=mito", c: "#9C8AB5", rk: "acc_mv", base: 120,
    inst: "¿Verdad o mito? 10 afirmaciones de medicina estética. Tienes 3 vidas ❤️❤️❤️ — cuidado con los mitos bien disfrazados." },
  { id: "reflex",    nm: "Reflejo Glow", d: "Reacciona en < 400 ms", ic: "⚡", url: "arcade/games/jc/index.html?game=reflejo", c: "#5E7A99", rk: "acc_reflex", base: 360,
    inst: "Toca en cuanto el círculo se ponga VERDE. Solo reacciones bajo 400 ms suman puntos. Son 5 rondas — más rápido, más puntos." },
  // ── Habilidad ──
  { id: "mina",    nm: "Mapa de Punción", d: "Evita los nervios faciales", ic: "🧭", url: "arcade/games/jc/index.html?game=mina", c: "#54707F", rk: "acc_mina", base: 300,
    inst: "Marca zonas seguras sin tocar un nervio facial. Cada número indica cuántos nervios hay cerca. Cambia a modo bandera para marcarlos." },
  { id: "glowlab",  nm: "Glow Lab", d: "Arrastra para combinar insumos", ic: "🧪", url: "arcade/games/jc/index.html?game=glowlab", c: "#9C8AB5", rk: "glowlab_best", base: 1500,
    inst: "Desliza el dedo sobre una ficha hacia una vecina para intercambiarlas. Alinea 3 o más iguales y ¡estallan! Tienes 25 movimientos — como Candy Crush." }
];
const JC_TOP_IDS = ["trivia", "millonario", "mv", "reflex"];

// Récord a superar de cada juego (todos los juegos guardan en jcm_records).
function gameRecord(g) {
  let v = g.base || 0;
  try {
    const R = JSON.parse(localStorage.getItem("jcm_records") || "{}");
    v = Math.max(v, parseInt(R[g.rk] || 0, 10) || 0);
  } catch (e) {}
  return v;
}

function GameCard({ T, g, top, onOpen }) {
  const rec = gameRecord(g);
  return (
    <button onClick={() => onOpen(g)} style={{ textAlign: "left", padding: "14px 13px", cursor: "pointer", background: T.surface, border: "1px solid " + (top ? T.gold : T.line), borderRadius: 8, display: "flex", flexDirection: "column", gap: 9, minHeight: 126, position: "relative" }}>
      <span style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: g.c + "22", border: "1px solid " + T.line }}>{g.ic}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent }}>{g.d}</div>
        <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text, lineHeight: 1.12, marginTop: 3 }}>{g.nm}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        <span title="Récord a superar" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: T.sans, fontSize: 10.5, fontWeight: 500, color: T.gold }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h14v2h2v2.5a3.5 3.5 0 0 1-3.5 3.5h-.6A5 5 0 0 1 13 15.8V18h3v2H8v-2h3v-2.2A5 5 0 0 1 7.1 11H6.5A3.5 3.5 0 0 1 3 7.5V5h2V3zm0 4v.5A1.5 1.5 0 0 0 6.5 9H7V7H5zm14 0h-2v2h.5A1.5 1.5 0 0 0 19 7.5V7z" /></svg>
          {rec.toLocaleString("es-CL")}
        </span>
        <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent }}>Jugar →</span>
      </div>
    </button>
  );
}

function GamesScreen({ T, go, onBack }) {
  const [open, setOpen] = useState(null);
  const [pending, setPending] = useState(null); // juego seleccionado → muestra instrucciones antes de jugar
  const [sorteo, setSorteo] = useState(() => { const f = !!window._jcmOpenSorteo; window._jcmOpenSorteo = false; return f; });
  const [glow, setGlow] = useState(() => GLOW.load());
  const [promo, setPromo] = useState(() => { try { return !sessionStorage.getItem("jcm_games_promo"); } catch (e) { return true; } });
  const topGames = JC_TOP_IDS.map(id => JC_GAMES.find(g => g.id === id)).filter(Boolean);
  const popGames = JC_GAMES.filter(g => JC_TOP_IDS.indexOf(g.id) < 0);
  const secHead = { display: "flex", alignItems: "center", gap: 10, padding: "0 20px 8px", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent };
  const grid2 = { padding: "0 20px 8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
  const session = (window.jcmGetSession ? window.jcmGetSession() : null);
  const glowAwarded = React.useRef(false); // evita doble conteo en el mismo juego
  function closeGame() { if (!glowAwarded.current) setGlow(GLOW.add(40)); glowAwarded.current = false; setOpen(null); }
  // Recibe puntos por postMessage desde el iframe (millonario + otros juegos arcade)
  React.useEffect(() => {
    const h = e => { if (e.data && e.data.type === "jcm_glow" && e.data.pts > 0) { glowAwarded.current = true; setGlow(GLOW.add(e.data.pts, e.data.game)); } };
    window.addEventListener("message", h);
    return () => window.removeEventListener("message", h);
  }, []);
  function dismissPromo() { setPromo(false); try { sessionStorage.setItem("jcm_games_promo", "1"); } catch (e) {} }
  if (sorteo) return <SorteoView T={T} onBack={() => setSorteo(false)} go={go} />;
  return (
    <div>
      <ScreenTop T={T} eyebrow="Juega y participa por un procedimiento gratis" title="Juegos" onBack={onBack} />
      <p style={{ padding: "0 20px 14px", fontFamily: T.sans, fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: T.textMute }}>
        Elige un juego y empieza a sumar <b style={{ color: T.gold }}>Glow Points</b>. Cada juego tiene un <b style={{ color: T.gold }}>récord que superar</b> y te acerca a un <b style={{ color: T.gold }}>ticket</b> para el sorteo de tratamientos.
      </p>
      {/* Juegos arriba de inmediato */}
      <div style={secHead}><span>Más jugados</span><span style={{ flex: 1, height: 1, background: T.line }} /></div>
      <div style={grid2}>{topGames.map(g => <GameCard key={g.id} T={T} g={g} top onOpen={setPending} />)}</div>
      <div style={{ ...secHead, paddingTop: 18 }}><span>Populares entre usuarios</span><span style={{ flex: 1, height: 1, background: T.line }} /></div>
      <div style={grid2}>{popGames.map(g => <GameCard key={g.id} T={T} g={g} onOpen={setPending} />)}</div>
      {/* Cuenta y puntos, abajo */}
      <div style={{ padding: "20px 20px 28px", display: "flex", flexDirection: "column", gap: 9 }}>
        <button onClick={() => setSorteo(true)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, textAlign: "left", padding: "13px 15px", borderRadius: 8, background: T.surface2, border: "1px solid " + T.gold, cursor: "pointer" }}>
          <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: T.gold + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.6"><path d="M5 3h14v2h2v2.5a3.5 3.5 0 0 1-3.5 3.5h-.6A5 5 0 0 1 13 15.8V18h3v2H8v-2h3v-2.2A5 5 0 0 1 7.1 11H6.5A3.5 3.5 0 0 1 3 7.5V5h2V3z" /></svg>
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text, lineHeight: 1.35 }}>Revisa tus puntos y participa por una sesión gratis</span>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 10.5, color: T.gold, letterSpacing: ".06em", textTransform: "uppercase", marginTop: 4 }}>{glow.tickets} ticket{glow.tickets === 1 ? "" : "s"} · {glow.points.toLocaleString("es-CL")} pts →</span>
          </span>
        </button>
        {!session && <button onClick={() => go && go("perfil")} style={{ width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px", borderRadius: 8, background: "transparent", color: T.text, border: "1px solid " + T.chipBorder, cursor: "pointer" }}>Ingresar a mi cuenta · guarda tus puntos</button>}
      </div>
      {/* Pop-up de bienvenida (1 vez por sesión) */}
      {promo && !open && (
        <div onClick={dismissPromo} style={{ position: "absolute", inset: 0, zIndex: 55, background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: T.bg, border: "1px solid " + T.line, borderRadius: 16, padding: "26px 22px", maxWidth: 340, textAlign: "center", animation: "jcPop .4s " + T.ease }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: T.gold + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.6"><path d="M5 3h14v2h2v2.5a3.5 3.5 0 0 1-3.5 3.5h-.6A5 5 0 0 1 13 15.8V18h3v2H8v-2h3v-2.2A5 5 0 0 1 7.1 11H6.5A3.5 3.5 0 0 1 3 7.5V5h2V3z" /></svg>
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.gold, marginBottom: 6 }}>Juega gratis</div>
            <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 25, color: T.text, lineHeight: 1.15 }}>Juega y participa por un procedimiento gratis</h2>
            <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 10, lineHeight: 1.6 }}>Cada partida suma Glow Points. Al juntar suficientes ganas un <b style={{ color: T.text }}>ticket</b> para el sorteo de un tratamiento. Sin costo y sin límite para jugar.</p>
            <button onClick={dismissPromo} style={{ marginTop: 18, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", padding: "14px", borderRadius: 6, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" }}>Empezar a jugar</button>
          </div>
        </div>
      )}
      {/* Pop-up de instrucciones antes de cada juego */}
      {pending && !open && (
        <div onClick={() => setPending(null)} style={{ position: "absolute", inset: 0, zIndex: 56, background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: T.bg, border: "1px solid " + T.line, borderRadius: 16, padding: "26px 22px", maxWidth: 340, width: "100%", textAlign: "center", animation: "jcPop .4s " + (T.ease || "ease") }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: pending.c + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 28 }}>{pending.ic}</div>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 6 }}>Cómo se juega</div>
            <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 25, color: T.text, lineHeight: 1.15 }}>{pending.nm}</h2>
            <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.textMute, marginTop: 10, lineHeight: 1.6 }}>{pending.inst || "Toca Jugar para comenzar. Supera el récord y suma Glow Points."}</p>
            <button onClick={() => { setOpen(pending); setPending(null); }} style={{ marginTop: 18, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", padding: "14px", borderRadius: 6, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" }}>Jugar</button>
            <button onClick={() => setPending(null)} style={{ marginTop: 9, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", padding: "12px", borderRadius: 6, background: "transparent", color: T.text, border: "1px solid " + T.chipBorder, cursor: "pointer" }}>Volver</button>
          </div>
        </div>
      )}
      {open && (
        <div style={{ position: "absolute", inset: 0, background: T.bg, zIndex: 50, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid " + T.line, background: T.navBg }}>
            <button onClick={closeGame} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 18l-6-6 6-6" /></svg>Juegos
            </button>
            <div style={{ flex: 1, textAlign: "center", fontFamily: T.serif, fontSize: 17, color: T.text }}>{open.nm}</div>
            <a href={open.url} target="_blank" rel="noopener" style={{ color: T.textMute, display: "flex" }} title="Abrir en pestaña nueva">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
            </a>
          </div>
          <iframe src={open.url + (open.url.indexOf("?") >= 0 ? "&" : "?") + "v=45"} title={open.nm} style={{ flex: 1, width: "100%", border: 0, background: "#fff" }} />
        </div>
      )}
    </div>
  );
}

/* ─────────── SORTEO · puntos, tickets y ranking global ─────────── */
function SorteoView({ T, onBack, go }) {
  const glow = GLOW.load();
  const session = (window.jcmGetSession ? window.jcmGetSession() : null);
  const pct = Math.min(100, Math.round((glow.cyclePts / GLOW.GOAL) * 100));
  // Ranking global: usuarios registrados + este dispositivo
  let users = [];
  try { users = (window.DB.get("users") || []).map(u => ({ name: u.name || "Paciente", pts: u.points || 0 })); } catch (e) {}
  const meName = session ? session.name : "Tú";
  if (!users.some(u => u.name === meName)) users.push({ name: meName, pts: glow.points, me: true });
  else { const u = users.find(x => x.name === meName); u.pts = Math.max(u.pts, glow.points); u.me = true; }
  users.sort((a, b) => b.pts - a.pts);
  const top = users.slice(0, 10);
  return (
    <div>
      <ScreenTop T={T} eyebrow="Tus Glow Points" title="Puntos y sorteo" onBack={onBack} />
      <div style={{ padding: "0 20px 26px" }}>
        {/* balance + tickets */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: T.dark ? "#0a0f1c" : T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "18px 16px", textAlign: "center" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent }}>Glow Points</div>
            <div style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 300, color: T.gold, lineHeight: 1.1 }}>{glow.points.toLocaleString("es-CL")}</div>
          </div>
          <div style={{ flex: 1, background: T.dark ? "#0a0f1c" : T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "18px 16px", textAlign: "center" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent }}>Tickets</div>
            <div style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 300, color: T.text, lineHeight: 1.1 }}>{glow.tickets}</div>
          </div>
        </div>
        {/* progreso al próximo ticket */}
        <div style={{ marginTop: 14, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 8 }}><span>Progreso al próximo ticket</span><span>{glow.cyclePts.toLocaleString("es-CL")} / {GLOW.GOAL.toLocaleString("es-CL")}</span></div>
          <div style={{ height: 8, borderRadius: 5, background: T.line, overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: T.gold, borderRadius: 5 }} /></div>
          <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 8, lineHeight: 1.5 }}>Hay un tope diario de {GLOW.CAP} puntos: jugando unos 15 días consigues 1 ticket. Puedes seguir jugando libremente; los tickets se acumulan para el sorteo.</div>
        </div>
        {/* premios a sorteo (solo info, sin canjear) */}
        <div style={{ marginTop: 22 }}>
          <Eyebrow T={T}>Tratamientos a sorteo</Eyebrow>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            {SORTEO_PREMIOS.map(r => (
              <div key={r.ic} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 15px", background: T.surface, border: "1px solid " + T.line, borderRadius: 8 }}>
                <span style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 14, color: T.gold, border: "1px solid " + T.line }}>{r.ic}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>{r.n}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 1 }}>{r.d}</div>
                </div>
                <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.gold }}>A sorteo</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 12, lineHeight: 1.6 }}>Cada ticket es una participación. Al cierre de cada periodo elegimos 1 o 2 ganadores entre todos los usuarios. Mientras más juegas, más tickets acumulas.</p>
        </div>
        {/* ranking global */}
        <div style={{ marginTop: 24 }}>
          <Eyebrow T={T}>Ranking global de jugadores</Eyebrow>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            {top.map((u, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 8, background: u.me ? T.surface2 : T.surface, border: "1px solid " + (u.me ? T.gold : T.line) }}>
                <span style={{ width: 24, fontFamily: T.serif, fontSize: 16, color: i < 3 ? T.gold : T.textMute, textAlign: "center" }}>{i + 1}</span>
                <span style={{ flex: 1, fontFamily: T.sans, fontSize: 13, color: T.text }}>{u.me ? u.name + " (tú)" : u.name}</span>
                <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.gold }}>{u.pts.toLocaleString("es-CL")}</span>
              </div>
            ))}
          </div>
          {!session && <div style={{ marginTop: 12 }}><GhostBtn T={T} full onClick={() => go && go("perfil")}>Ingresa a tu cuenta para guardar tu ranking</GhostBtn></div>}
        </div>
      </div>
    </div>
  );
}

/* ─────────── PERFIL / LOGIN ─────────── */
const JC_REWARDS = [
  { ic: "PG", n: "Sesión de Pink Glow" },
  { ic: "AS", n: "ADN de salmón" },
  { ic: "EX", n: "Sesión de Exosomas" }
];

// Promos exclusivas rotativas semanales (semana del año mod 3 elige el orden)
const EXCL_PROMOS = [
  { name: "Botox Full Face (8 zonas)", tag: "Precio exclusivo app", price: 280000, orig: 350000, img: "assets/ad-botox-soft.png", desc: "Cara completa en una sola sesión. Ahorra $70.000 reservando desde aquí." },
  { name: "Sculptra · 1 sesión", tag: "Precio exclusivo app", price: 400000, orig: 450000, img: "assets/ad-sculptra-soft.png", desc: "Bioestimulación de colágeno. Ahorra $50.000 reservando desde aquí." },
  { name: "Rinomodelación", tag: "Precio exclusivo app", price: 170000, orig: 200000, img: "assets/ad-rino-soft.png", desc: "Con Juvéderm. Ahorra $30.000 reservando desde aquí." }
];

function ProfileScreen({ T, D, go, openBooking, onBack, onSessionChange }) {
  const [colab, setColab] = useState(null); // null | "cond" | "form" | "ok"
  const [session, setSession] = useState(() => (window.jcmGetSession ? window.jcmGetSession() : null));
  const cfg = (window.DB && window.DB.cfg) ? window.DB.cfg() : { pts_start: 500, reward_cost: 60000 };
  const [points, setPoints] = useState(session ? (session.points || 0) : (cfg.pts_start || 500));
  const [mode, setMode] = useState("menu"); // menu | login | register | editprofile
  const [form, setForm] = useState({ name: "", phone: "", email: "", pass: "", terms: false });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const rewardCost = cfg.reward_cost || 60000;

  // Extra datos de perfil (RUT, edad, color avatar)
  const extraKey = session ? "profile_extra_" + session.id : "profile_extra_guest";
  const [extra, setExtra] = useState(() => { try { return window.DB.get(extraKey) || {}; } catch(e) { return {}; } });
  const [editExtra, setEditExtra] = useState({ rut: extra.rut || "", age: extra.age || "", avatarColor: extra.avatarColor || "#8B7355" });
  function saveExtra() { const d = { rut: editExtra.rut, age: editExtra.age, avatarColor: editExtra.avatarColor }; try { window.DB.set(extraKey, d); } catch(e) {} setExtra(d); setMode("menu"); }

  // Procedimientos del paciente (desde bookings)
  const myBookings = (() => { try { const bs = window.DB.get("bookings") || []; return bs.filter(b => session && (b.phone === session.phone || b.uid === session.id)); } catch(e) { return []; } })();
  // Abonos del paciente
  const myAbonos = (() => { try { const abs = window.DB.get("abonos") || []; return abs.filter(a => session && (a.phone === session.phone || a.uid === session.id)); } catch(e) { return []; } })();

  // Promo semanal rotatoria
  const weekPromo = (() => { const d = new Date(); const week = Math.floor((d - new Date(d.getFullYear(), 0, 1)) / 6048e5); return EXCL_PROMOS.slice().sort((a, b) => (EXCL_PROMOS.indexOf(a) + week) % 3 - (EXCL_PROMOS.indexOf(b) + week) % 3); })();

  function _notifySession(s) { setSession(s); if (onSessionChange) onSessionChange(s); }

  async function doRegister() {
    setErr(""); if (!form.terms) { setErr("Debes aceptar los términos y ser mayor de 18 años."); return; }
    setBusy(true);
    try {
      const r = await window.jcmRegister(form.name, form.phone, form.pass, form.email);
      if (!r.ok) { setErr(r.msg); setBusy(false); return; }
      const s = window.jcmSaveSession(r.user); _notifySession(s); setPoints(r.user.points || cfg.pts_start); setMode("menu");
    } catch (e) { setErr("Error al registrar. Intenta de nuevo."); }
    setBusy(false);
  }
  async function doLogin() {
    setErr(""); setBusy(true);
    try {
      const r = await window.jcmLogin(form.phone, form.pass);
      if (!r.ok) { setErr(r.msg); setBusy(false); return; }
      const s = window.jcmSaveSession(r.user); _notifySession(s); setPoints(r.user.points || 0); setMode("menu");
    } catch (e) { setErr("Error al iniciar sesión."); }
    setBusy(false);
  }
  function doLogout() { if (window.jcmEndSession) window.jcmEndSession(); _notifySession(null); setPoints(cfg.pts_start || 500); setMode("menu"); }
  function redeem() {
    if (points < rewardCost) return;
    try {
      const reds = (window.DB.get("redeems")) || [];
      reds.push({ id: Date.now().toString(36), user: session ? session.name : "Invitado", uid: session ? session.id : null, cost: rewardCost, t: new Date().toISOString(), done: false });
      window.DB.set("redeems", reds);
      const np = points - rewardCost; setPoints(np);
      if (session) window.jcmUpdatePoints(session.id, np);
    } catch (e) {}
  }

  if (mode === "editprofile") {
    const AVATAR_COLORS = ["#8B7355","#4A7C8E","#7C6B8B","#5A8A6A","#8A5A5A","#6B6B8A"];
    return (
      <div>
        <ScreenTop T={T} eyebrow="Mi perfil" title="Editar datos" onBack={() => setMode("menu")} />
        <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: editExtra.avatarColor, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 600, fontFamily: T.serif, marginBottom: 10 }}>
              {(session ? session.name : "?")[0].toUpperCase()}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Color de avatar</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {AVATAR_COLORS.map(c => <button key={c} onClick={() => setEditExtra(e => ({...e, avatarColor: c}))} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: editExtra.avatarColor === c ? "2.5px solid " + T.text : "2.5px solid transparent", cursor: "pointer" }} />)}
            </div>
          </div>
          <Field T={T} label="RUT" value={editExtra.rut} onChange={v => setEditExtra(e => ({...e, rut: v}))} placeholder="Ej: 12.345.678-9" />
          <Field T={T} label="Edad" value={editExtra.age} onChange={v => setEditExtra(e => ({...e, age: v.replace(/\D/g, "")}))} placeholder="Ej: 32" inputMode="numeric" />
          <PrimaryBtn T={T} full onClick={saveExtra}>Guardar cambios</PrimaryBtn>
          <GhostBtn T={T} full onClick={() => setMode("menu")}>Cancelar</GhostBtn>
        </div>
      </div>
    );
  }

  if (mode === "register" || mode === "login") {
    const isReg = mode === "register";
    return (
      <div>
        <ScreenTop T={T} eyebrow={isReg ? "Nueva cuenta" : "Bienvenida de vuelta"} title={isReg ? "Regístrate" : "Iniciar sesión"} onBack={() => { setMode("menu"); setErr(""); }} />
        <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          {isReg && <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6 }}>Crea tu cuenta y recibe <b style={{ color: T.gold }}>{cfg.pts_start || 500} Glow Points</b> de regalo.</p>}
          {isReg && <Field T={T} label="Nombre completo" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Ej: Camila Rojas" />}
          <Field T={T} label="Teléfono (WhatsApp)" value={form.phone} onChange={v => setForm({ ...form, phone: v.replace(/[^\d+\s]/g, "") })} placeholder="+56 9 XXXX XXXX" inputMode="tel" />
          {isReg && <Field T={T} label="Correo (opcional)" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="tucorreo@ejemplo.com" inputMode="email" />}
          <Field T={T} label="Contraseña" value={form.pass} onChange={v => setForm({ ...form, pass: v })} placeholder="Mín. 6 caracteres" type="password" />
          {isReg && (
            <label style={{ display: "flex", alignItems: "flex-start", gap: 9, fontFamily: T.sans, fontSize: 12, color: T.textMute, cursor: "pointer" }}>
              <input type="checkbox" checked={form.terms} onChange={e => setForm({ ...form, terms: e.target.checked })} style={{ marginTop: 2 }} />
              Acepto los términos de uso y soy mayor de 18 años.
            </label>
          )}
          {err && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#c0285a" }}>{err}</div>}
          <PrimaryBtn T={T} full onClick={isReg ? doRegister : doLogin}>{busy ? "Procesando…" : (isReg ? "Crear cuenta · +" + (cfg.pts_start || 500) + " pts" : "Entrar")}</PrimaryBtn>
          <GhostBtn T={T} full onClick={() => { setMode(isReg ? "login" : "register"); setErr(""); }}>{isReg ? "Ya tengo cuenta" : "Crear una cuenta"}</GhostBtn>
        </div>
      </div>
    );
  }

  const avatarColor = extra.avatarColor || "#8B7355";
  const firstName = session ? (session.name || "").split(" ")[0] : null;

  return (
    <div>
      <ScreenTop T={T} eyebrow="Mi cuenta" title="Mi Perfil" onBack={onBack} />
      <div style={{ padding: "0 20px 24px" }}>

        {/* Avatar + datos */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: avatarColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 600, fontFamily: T.serif, flexShrink: 0 }}>
            {(session ? session.name : "?")[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, lineHeight: 1.1, marginBottom: 3 }}>{session ? session.name : "Invitada"}</div>
            {session && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute }}>{session.phone}{extra.rut ? " · " + extra.rut : ""}{extra.age ? " · " + extra.age + " años" : ""}</div>}
          </div>
          {session && <button onClick={() => { setEditExtra({ rut: extra.rut || "", age: extra.age || "", avatarColor }); setMode("editprofile"); }} style={{ flexShrink: 0, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute }}>Editar</button>}
        </div>

        {/* Balance */}
        <div style={{ background: T.dark ? "#0a0f1c" : T.surface, border: "1px solid " + T.line, borderRadius: 6, padding: "22px 20px", textAlign: "center" }}>
          <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent }}>Glow Points</div>
          <div style={{ fontFamily: T.serif, fontSize: 52, fontWeight: 300, color: T.gold, lineHeight: 1, marginTop: 6 }}>{points.toLocaleString("es-CL")}</div>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 6 }}>
            {session ? "Hola " + firstName + " · puntos acumulados" : "Modo invitado · inicia sesión para guardar tus puntos"}
          </div>
        </div>

        {!session ? (
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <PrimaryBtn T={T} full onClick={() => setMode("register")}>Crear cuenta · +{cfg.pts_start || 500} pts</PrimaryBtn>
            <GhostBtn T={T} full onClick={() => setMode("login")}>Iniciar sesión</GhostBtn>
          </div>
        ) : (
          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
            <button onClick={() => go && go("juegos")} style={{ flex: 1, fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", padding: "11px", borderRadius: 8, cursor: "pointer", background: T.surface2, color: T.gold, border: "1px solid " + T.gold }}>Jugar · ganar puntos</button>
            <button onClick={doLogout} style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", padding: "11px 14px", borderRadius: 8, cursor: "pointer", background: "transparent", color: T.textMute, border: "1px solid " + T.chipBorder }}>Salir</button>
          </div>
        )}

        {/* PROMOCIONES EXCLUSIVAS */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Precios exclusivos · solo en la app</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {weekPromo.map((p, i) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12, background: i === 0 ? T.surface2 : T.surface, border: "1px solid " + (i === 0 ? T.gold + "55" : T.line), borderRadius: 10, padding: "12px 14px" }}>
                <img src={p.img} alt={p.name} onError={e => { e.target.style.display = "none"; }} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0, background: T.bg }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text, lineHeight: 1.1, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 4 }}>{p.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: T.serif, fontSize: 17, color: T.gold, fontWeight: 500 }}>${p.price.toLocaleString("es-CL")}</span>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, textDecoration: "line-through" }}>${p.orig.toLocaleString("es-CL")}</span>
                  </div>
                </div>
                <button onClick={() => openBooking && openBooking({ name: p.name, price: p.price })} style={{ flexShrink: 0, background: T.gold, color: "#fff", border: "none", borderRadius: 8, padding: "9px 12px", cursor: "pointer", fontFamily: T.sans, fontSize: 10, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase" }}>Agendar</button>
              </div>
            ))}
          </div>
        </div>

        {/* PROCEDIMIENTOS REALIZADOS */}
        {session && myBookings.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Tus procedimientos</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {myBookings.slice(0, 6).map((b, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: T.surface, border: "1px solid " + T.line, borderRadius: 8 }}>
                  <div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{b.proc || b.name}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{b.date ? new Date(b.date).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" }) : (b.day === 0 ? "Hoy" : b.day === 1 ? "Mañana" : "Próximo")}</div>
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: b.paid ? "#2A7A4B" : T.textMute, background: b.paid ? "#2A7A4B18" : T.chipBg, border: "1px solid " + (b.paid ? "#2A7A4B44" : T.chipBorder), borderRadius: 999, padding: "4px 10px" }}>{b.paid ? "Pagado" : "Pendiente"}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABONOS */}
        {session && myAbonos.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Tus abonos</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {myAbonos.map((a, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: T.surface, border: "1px solid " + T.line, borderRadius: 8 }}>
                  <div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{a.concept || "Abono"}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{a.date ? new Date(a.date).toLocaleDateString("es-CL", { day: "numeric", month: "short" }) : ""}</div>
                  </div>
                  <div style={{ fontFamily: T.serif, fontSize: 15, color: "#2A7A4B" }}>+${(a.amount || 0).toLocaleString("es-CL")}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Puntos → sorteo (va directo a SorteoView seteando flag global) */}
        <div style={{ marginTop: 24 }}>
          <button onClick={() => { window._jcmOpenSorteo = true; go && go("juegos"); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 13, textAlign: "left", padding: "15px 16px", background: T.surface2, border: "1px solid " + T.gold, borderRadius: 8, cursor: "pointer" }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid " + T.line }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.6"><path d="M5 3h14v2h2v2.5a3.5 3.5 0 0 1-3.5 3.5h-.6A5 5 0 0 1 13 15.8V18h3v2H8v-2h3v-2.2A5 5 0 0 1 7.1 11H6.5A3.5 3.5 0 0 1 3 7.5V5h2V3z" /></svg>
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: "block", fontFamily: T.serif, fontSize: 17, color: T.text }}>Puntos y sorteo</span>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>Junta tickets jugando y participa por una sesión gratis</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.7"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        {/* Colabora */}
        <div style={{ marginTop: 16 }}>
          <button onClick={() => { const url = (window.JCSAAS && window.JCSAAS.collabLink) ? window.JCSAAS.collabLink() : "https://medique.cl/colaborar.html?c=jc-medical-qI9dePy"; window.open(url, "_blank", "noopener"); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 13, textAlign: "left", padding: "15px 16px", background: T.surface, border: "1px solid " + T.line, borderRadius: 8, cursor: "pointer" }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid " + T.line }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6"><circle cx="9" cy="8" r="3" /><path d="M2 20a6 6 0 0 1 11 0M16 6a3 3 0 0 1 0 6M22 20a6 6 0 0 0-5-5.9" /></svg>
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: "block", fontFamily: T.serif, fontSize: 17, color: T.text }}>Colabora con nosotros</span>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>¿Eres influencer o marca? Trabajemos juntos</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.7"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      {colab && <ColaboraSheet T={T} step={colab} setStep={setColab} session={session} />}
    </div>
  );
}

/* Hoja "Colabora con nosotros": condiciones → formulario → guarda en DB 'collabs' (lo lee el panel) */
function ColaboraSheet({ T, step, setStep, session }) {
  const [f, setF] = useState({ name: session ? session.name : "", kind: "Influencer", ig: "", reach: "", phone: "", message: "" });
  const ok = f.name.trim() && (f.ig.trim() || f.phone.trim());
  function send() {
    try { const all = window.DB.get("collabs") || []; all.unshift({ id: "cb" + Date.now(), name: f.name.trim(), kind: f.kind, ig: f.ig.trim(), reach: f.reach.trim(), phone: f.phone.trim(), message: f.message.trim(), status: "nueva", ts: Date.now() }); window.DB.set("collabs", all); } catch (e) {}
    setStep("ok");
  }
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 60, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end" }}>
      <div className="jc-scroll" style={{ width: "100%", maxHeight: "92%", overflowY: "auto", background: T.bg, borderRadius: "18px 18px 0 0", border: "1px solid " + T.line, padding: "20px 20px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Colaboraciones · JC Medical</div>
          <button onClick={() => setStep(null)} style={{ background: "none", border: "none", color: T.textMute, cursor: "pointer", padding: 2 }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>
        {step === "cond" && (<div>
          <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 27, color: T.text, lineHeight: 1.1, marginBottom: 12 }}>Trabajemos juntos</h2>
          <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, marginBottom: 12 }}>Buscamos colaboraciones reales y de largo plazo con personas y marcas alineadas con nuestra filosofía: resultados naturales y criterio clínico. Antes de postular, ten en cuenta:</p>
          {["Cuenta activa y contenido propio coherente con estética y bienestar.", "Compromiso de contenido honesto: mostramos procesos reales, no promesas.", "La colaboración se evalúa caso a caso; te contactamos si hay match.", "Los tratamientos están sujetos a evaluación clínica previa."].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 9 }}><span style={{ color: T.accent, marginTop: 2 }}>•</span><span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text, lineHeight: 1.5 }}>{c}</span></div>
          ))}
          <button onClick={() => setStep("form")} style={{ marginTop: 16, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", padding: "15px", borderRadius: 6, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" }}>Continuar</button>
        </div>)}
        {step === "form" && (<div>
          <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 26, color: T.text, lineHeight: 1.1, marginBottom: 14 }}>Cuéntanos de ti</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field T={T} label="Nombre o marca" value={f.name} onChange={v => setF({ ...f, name: v })} placeholder="Tu nombre o el de tu marca" />
            <div>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Tipo</div>
              <div style={{ display: "flex", gap: 8 }}>{["Influencer", "Marca"].map(k => <button key={k} onClick={() => setF({ ...f, kind: k })} style={{ flex: 1, fontFamily: T.sans, fontSize: 12.5, padding: "11px", borderRadius: 7, cursor: "pointer", background: f.kind === k ? T.accent : T.surface, color: f.kind === k ? (T.onAccent || "#fff") : T.textMute, border: "1px solid " + (f.kind === k ? T.accent : T.line) }}>{k}</button>)}</div>
            </div>
            <Field T={T} label="Instagram" value={f.ig} onChange={v => setF({ ...f, ig: v })} placeholder="@tucuenta" />
            <Field T={T} label="Seguidores (aprox.)" value={f.reach} onChange={v => setF({ ...f, reach: v.replace(/\D/g, "") })} placeholder="Ej: 12000" inputMode="numeric" />
            <Field T={T} label="WhatsApp" value={f.phone} onChange={v => setF({ ...f, phone: v.replace(/[^\d+\s]/g, "") })} placeholder="+56 9 XXXX XXXX" inputMode="tel" />
            <label style={{ display: "block" }}>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Tu propuesta</span>
              <textarea value={f.message} onChange={e => setF({ ...f, message: e.target.value })} rows={3} placeholder="Cuéntanos qué te gustaría proponer…" style={{ width: "100%", padding: "12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 16, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </label>
            <PrimaryBtn T={T} full onClick={() => ok && send()}>Enviar solicitud</PrimaryBtn>
          </div>
        </div>)}
        {step === "ok" && (<div style={{ padding: "26px 0", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#1F8A5B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg></div>
          <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 26, color: T.text }}>¡Solicitud enviada!</h2>
          <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 8, lineHeight: 1.6 }}>Gracias por tu interés. Revisaremos tu propuesta y, si hay match, te contactaremos.</p>
          <button onClick={() => setStep(null)} style={{ marginTop: 18, fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px 22px", borderRadius: 6, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" }}>Listo</button>
        </div>)}
      </div>
    </div>
  );
}

/* ─────────── FEED: Videos (Reels) + Noticias ─────────── */
// Pool de videos internacionales (no chilenos) sobre estética. likes/views curados (>10k).
// Curaduría: solo contenido de calidad. Documentales DW (estética + salud general)
// y clips clínicos de profesionales. Mezcla de videos largos (DW) y cortos (clínicos).
// IDs verificados como existentes y embebibles. Sin vlogs de youtubers.
// cat: "estetica" | "salud" | "peso". Curaduría de alta calidad (DW, Instituto Rubí,
// Hiperactina, Dr. Vargas Kelsh, Dr. Saucillo; fitness con contenido real). Se quitó Top Doctors LATAM
// por baja calidad de video/audio. IDs verificados como embebibles; el resto se llena con la
// YouTube Data API o agregando URLs en el panel (App JC Medical → Contenido).
// Feed único, solo DW Documental (contenido de calidad asegurado). El de la fascia va primero.
const JC_REELS = [
  { id: "euDVh--UYyU", t: "La fascia: un mundo misterioso bajo la piel", src: "DW Documental", likes: 14000, views: 320000 },
  { id: "5n-kWpf0SOU", t: "El boom del ácido hialurónico", src: "DW Documental", likes: 47600, views: 1610000 },
  { id: "KubwNE8kmbg", t: "Los secretos de la longevidad", src: "DW Documental", likes: 54000, views: 2100000 },
  { id: "ApNwyP7KvdI", t: "El código secreto del envejecimiento", src: "DW Documental", likes: 38000, views: 1450000 },
  { id: "Y2Z_XxVanT0", t: "El sistema inmunológico contra el cáncer", src: "DW Documental", likes: 41000, views: 1320000 },
  { id: "-rD7COiH67I", t: "Salud mental y resiliencia", src: "DW Documental", likes: 36000, views: 1180000 },
  { id: "hHO42VQabtg", t: "Endometriosis: una enfermedad invisible", src: "DW Documental", likes: 22000, views: 640000 },
  { id: "lP7iJf3Tgn8", t: "Azúcar y aditivos: la industria alimentaria", src: "DW Documental", likes: 52000, views: 2400000 },
  { id: "oOn_rTintBk", t: "El futuro de la alimentación", src: "DW Documental", likes: 19000, views: 510000 },
  { id: "NN8-XNQiEpc", t: "Metabolismo, longevidad y biohacking", src: "DW Documental", likes: 29000, views: 980000 }
];
const VIDEO_CATS = [
  { k: "estetica", l: "Medicina Estética", ic: "💉", img: "assets/ad-botox-soft.png" },
  { k: "salud", l: "Salud", ic: "🩺", img: "assets/cat-bioest-facial.png" },
  { k: "peso", l: "Pérdida de peso", ic: "🥗", img: "assets/ad-sculptra-soft.png" }
];
// Noticias internacionales (no chilenas), de fuentes en español, con imagen y fuente.
const JC_NEWS = [
  { tag: "Tendencias", t: "Las 6 tendencias de la medicina estética del futuro", sub: "De la prevención a los tratamientos exprés.", link: "https://www.hola.com/belleza/20251110865817/medicina-estetica-nuevos-tratamientos/", src: "HOLA", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=640&q=70" },
  { tag: "Regeneración", t: "Exosomas: el nuevo elixir que revoluciona la belleza", sub: "Reparación celular, colágeno y elastina.", link: "https://www.multiestetica.com/articulos/exosomas/exosomas-el-nuevo-elixir-de-la-juventud-que-revoluciona-la-belleza-y-la-ciencia", src: "Multiestética", img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=640&q=70" },
  { tag: "Bótox", t: "Botox suave: naturalidad, tecnología y prevención", sub: "Potenciar rasgos sin congelar la cara.", link: "https://www.drjonathanvarela.com/%F0%9F%8C%9F-tendencias-en-medicina-estetica-2025-naturalidad-tecnologia-y-prevencion/", src: "Dr. Varela", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=640&q=70" },
  { tag: "Colágeno", t: "Bioestimuladores: rejuvenecer sin cirugía", sub: "Estimulan tu propio colágeno progresivamente.", link: "https://www.elvocero.com/escenario/moda-y-belleza/bioestimuladores-de-col-geno-la-revoluci-n-en-el-rejuvenecimiento-facial-sin-cirug-a/article_a9efe629-1be0-4aff-bfd2-c51ce3ffc574.html", src: "El Vocero", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=640&q=70" },
  { tag: "Regeneración", t: "Polinucleótidos y exosomas: regenerar de adentro", sub: "Cómo combinar ambos activos.", link: "https://www.chicmagazine.com.mx/estilo-de-vida/wellness/polinucleotidos-y-exosomas-en-medicina-estetica", src: "Chic Magazine", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=640&q=70" },
  { tag: "Skincare", t: "Rutina de skincare paso a paso", sub: "La constancia gana a la complejidad.", link: "https://www.isdin.com/es/blog/rutina-piel-sensible/", src: "ISDIN", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=640&q=70" },
  { tag: "SPF", t: "La técnica del 'sunscreen sandwich'", sub: "Cómo aplicar el SPF para que proteja de verdad.", link: "https://www.hola.com/us-es/belleza/20260526903709/tecnica-sunscreen-sandwich-aplicacion-proteccion-solar-spf/", src: "HOLA", img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=640&q=70" },
  { tag: "Más solicitados", t: "Los tratamientos más solicitados del año", sub: "Ácido hialurónico, hilos y bótox suave lideran.", link: "https://clinicamedivas.es/tratamientos-de-medicina-estetica-mas-solicitados-en-2025", src: "Medivas", img: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=640&q=70" },
  { tag: "Armonización", t: "Armonización facial: menos es más", sub: "El equilibrio de rasgos por sobre el volumen.", link: "https://www.vogue.es/belleza/articulos/armonizacion-facial-tendencia", src: "Vogue", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=640&q=70" },
  { tag: "Skinbooster", t: "Skinboosters: hidratación que se ve y se siente", sub: "Luminosidad y calidad de piel desde adentro.", link: "https://www.elle.com/es/belleza/cara-cuerpo/skinbooster-hidratacion", src: "Elle", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=640&q=70" },
  { tag: "Prevención", t: "Prejuvenation: prevenir antes que corregir", sub: "Por qué los tratamientos empiezan antes.", link: "https://www.harpersbazaar.com/es/belleza/prejuvenation", src: "Harper's Bazaar", img: "https://images.unsplash.com/photo-1512291313931-d4291048e7b6?auto=format&fit=crop&w=640&q=70" },
  { tag: "Labios", t: "Labios naturales: la técnica del 'lip refresh'", sub: "Definición sutil sin perder naturalidad.", link: "https://www.cosmopolitan.com/es/belleza/cara-cuerpo/lip-refresh", src: "Cosmopolitan", img: "https://images.unsplash.com/photo-1599842057874-37393e9342df?auto=format&fit=crop&w=640&q=70" },
  { tag: "Cuello", t: "El cuello, la nueva prioridad antiedad", sub: "Bioestimulación y toxina para el tercio inferior.", link: "https://www.glamour.es/belleza/cuidado-facial/cuello-antiedad", src: "Glamour", img: "https://images.unsplash.com/photo-1614436163996-25cee5f54290?auto=format&fit=crop&w=640&q=70" },
  { tag: "Hombres", t: "Estética masculina: crecimiento sostenido", sub: "Mandíbula, bótox preventivo y skincare.", link: "https://www.gq.com.mx/cuidado-personal/articulo/medicina-estetica-hombres", src: "GQ", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=70" }
];
// Índice de día que CAMBIA a las 05:00 (restamos 5 h al tiempo actual).
function dayIndex() { return Math.floor((Date.now() - 5 * 3600000) / 86400000); }
function dailyRotate(arr, n) { if (!arr.length) return []; const start = ((dayIndex() % arr.length) + arr.length) % arr.length; const out = []; for (let i = 0; i < Math.min(n, arr.length); i++) out.push(arr[(start + i) % arr.length]); return out; }
// Rotación por ciclo de N horas (noticias: 48h). Devuelve hasta `n` elementos.
function cycleRotate(arr, n, hours) { if (!arr.length) return []; const idx = Math.floor(Date.now() / ((hours || 24) * 3600000)); const start = idx % arr.length; const out = []; for (let i = 0; i < Math.min(n, arr.length); i++) out.push(arr[(start + i) % arr.length]); return out; }
function fmtK(n) { n = +n || 0; if (n >= 1e6) return (n / 1e6).toFixed(1).replace(".0", "") + "M"; if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(".0", "") + "k"; return "" + n; }

function VideosHub({ T, onBack, openBooking }) {
  // Feed único global (sin categorías), solo DW Documental.
  return <ReelsView T={T} onBack={onBack} openBooking={openBooking} />;
}
function FeedHubScreen({ T, D, go, openBooking, onBack }) {
  const [view, setView] = useState(null); // null | 'videos' | 'noticias'
  if (view === "videos") return <VideosHub T={T} onBack={() => setView(null)} openBooking={openBooking} />;
  if (view === "noticias") return <NewsView T={T} onBack={() => setView(null)} />;
  return (
    <div>
      <ScreenTop T={T} eyebrow="@medique.cl · contenido" title="Videos y noticias" onBack={onBack} />
      <div style={{ padding: "4px 20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <button onClick={() => setView("noticias")} style={{ textAlign: "left", cursor: "pointer", padding: 0, border: "1px solid " + T.line, borderRadius: 8, overflow: "hidden", background: T.surface }}>
          <div style={{ position: "relative", height: 150 }}>
            <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=720&q=70" alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(13,13,13,.2),rgba(13,13,13,.82))" }} />
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#F2EDE6" strokeWidth="1.4" style={{ position: "absolute", left: 16, top: 16, opacity: .9 }}><path d="M4 5h16v14H4zM8 9h8M8 13h8M8 17h5" /></svg>
          </div>
          <div style={{ padding: "14px 18px 16px" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Opción 1</div>
            <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginTop: 4 }}>Ver noticias</div>
            <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 4 }}>15 novedades seleccionadas, se renuevan cada 48 horas.</div>
          </div>
        </button>
        <button onClick={() => setView("videos")} style={{ textAlign: "left", cursor: "pointer", padding: 0, border: "1px solid " + T.line, borderRadius: 8, overflow: "hidden", background: T.surface }}>
          <div style={{ position: "relative", height: 150 }}>
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=720&q=70" alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(13,13,13,.2),rgba(13,13,13,.82))" }} />
            <span style={{ position: "absolute", left: "50%", top: "44%", transform: "translate(-50%,-50%)", width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,.16)", backdropFilter: "blur(4px)", border: "1.5px solid rgba(242,237,230,.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#F2EDE6"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </div>
          <div style={{ padding: "14px 18px 16px" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.gold }}>Opción 2</div>
            <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginTop: 4 }}>Ver videos</div>
            <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 4 }}>3 categorías: Medicina Estética, Salud y Pérdida de peso.</div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* Modal de opinión (3 preguntas multiselección, estilo encuesta) */
function OpinionModal({ T, onClose }) {
  const QS = [
    { q: "¿Cómo calificarías la atención de JC Medical?", o: ["Excelente", "Buena", "Regular", "Aún no me atiendo"] },
    { q: "¿Qué tratamientos te interesan?", o: ["Bótox", "Ácido hialurónico", "Bioestimulación", "Skincare", "Regeneración"] },
    { q: "¿Qué te gustaría ver más en este feed?", o: ["Antes y después", "Educativo", "Precios y promos", "Detrás de cámara"] }
  ];
  const [ans, setAns] = useState(QS.map(() => []));
  const [sent, setSent] = useState(false);
  function toggle(qi, opt) { setAns(a => a.map((arr, i) => i !== qi ? arr : (arr.includes(opt) ? arr.filter(x => x !== opt) : arr.concat([opt])))); }
  function send() { try { const all = window.DB.get("feedback") || []; all.push({ t: new Date().toISOString(), ans: QS.map((q, i) => ({ q: q.q, a: ans[i] })) }); window.DB.set("feedback", all); } catch (e) {} setSent(true); setTimeout(onClose, 1400); }
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 60, background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end" }}>
      <div className="jc-scroll" style={{ width: "100%", maxHeight: "88%", overflowY: "auto", background: T.bg, borderRadius: "18px 18px 0 0", border: "1px solid " + T.line, padding: "20px 20px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Encuesta · 30 segundos</div>
            <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 26, color: T.text, marginTop: 6, lineHeight: 1.1 }}>Déjanos tu opinión,<br />tu opinión nos importa</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.textMute, cursor: "pointer", padding: 4 }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>
        {sent ? (
          <div style={{ padding: "30px 0", textAlign: "center", fontFamily: T.serif, fontSize: 22, color: T.text }}>¡Gracias!<div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 8 }}>Tu opinión nos ayuda a mejorar.</div></div>
        ) : (
          <div>
            {QS.map((qq, qi) => (
              <div key={qi} style={{ marginTop: 18 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text, marginBottom: 10 }}>{qq.q}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {qq.o.map(opt => { const on = ans[qi].includes(opt); return (
                    <button key={opt} onClick={() => toggle(qi, opt)} style={{ fontFamily: T.sans, fontSize: 12.5, color: on ? T.onAccent : T.text, background: on ? T.accent : T.chipBg, border: "1px solid " + (on ? T.accent : T.chipBorder), borderRadius: 999, padding: "9px 14px", cursor: "pointer" }}>{opt}</button>
                  ); })}
                </div>
              </div>
            ))}
            <button onClick={send} style={{ marginTop: 22, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", padding: "15px", borderRadius: 4, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" }}>Enviar opinión</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ReelsView({ T, onBack, openBooking, category }) {
  // Feed único, solo curaduría DW. Sin mezclar con datos sembrados.
  let base = JC_REELS.slice();
  const list = dailyRotate(base, base.length).concat(dailyRotate(base, base.length));
  const catLabel = (VIDEO_CATS.find(c => c.k === category) || {}).l;
  const [playing, setPlaying] = useState(null);
  const [opinion, setOpinion] = useState(false);
  const [stats, setStats] = useState(null); // estadísticas reales de YouTube (si hay API key)
  // Idioma automático según el dispositivo: español → subtítulos en español; otro → idioma original. Sin popup.
  const lang = (() => { try { return ((navigator.language || "es").toLowerCase().indexOf("es") === 0) ? "sub" : "original"; } catch (e) { return "sub"; } })();
  const lastTap = useRef(0);
  // Si hay YouTube Data API key configurada en el panel, trae views/likes reales.
  useEffect(() => {
    try {
      const key = (window.DB && window.DB.cfg && window.DB.cfg().yt_api_key) || "";
      if (!key || !window.jcmYTStats) return;
      window.jcmYTStats(base.map(v => v.id), key).then(m => { if (m) setStats(m); }).catch(() => {});
    } catch (e) {}
  }, []);
  function statOf(v) { const s = stats && stats[v.id]; return { likes: s && s.likes ? s.likes : v.likes, views: s && s.views ? s.views : v.views }; }
  function langParams() { return lang === "sub" ? "&cc_load_policy=1&cc_lang_pref=es&hl=es" : "&hl=en"; }
  // Un toque en la miniatura inicia el video. Una vez reproduciendo, el iframe
  // recibe los toques y se usan los controles nativos de YouTube (play/pausa,
  // barra de progreso, volumen, pantalla completa).
  function onFrameTap(i) { if (playing !== i) setPlaying(i); }
  const glass = { background: "rgba(255,255,255,.14)", backdropFilter: "blur(8px)", border: "1px solid rgba(242,237,230,.4)", color: "#F2EDE6" };
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", zIndex: 20, display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", top: 10, left: 12, zIndex: 8 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, ...glass, borderRadius: 999, padding: "8px 13px", cursor: "pointer", fontFamily: T.sans, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 18l-6-6 6-6" /></svg>Volver
        </button>
      </div>
      <div className="jc-scroll" style={{ flex: 1, overflowY: "auto", scrollSnapType: "y mandatory" }}>
        {list.map((v, i) => (
          <div key={i} onClick={() => onFrameTap(i)} style={{ position: "relative", height: "100%", minHeight: 480, scrollSnapAlign: "start", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: playing === i ? "default" : "pointer" }}>
            {playing === i
              ? <iframe src={"https://www.youtube.com/embed/" + v.id + "?autoplay=1&playsinline=1&rel=0&controls=1&fs=1&modestbranding=1" + langParams()} title={v.t} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen style={{ width: "100%", height: "100%", border: 0 }} />
              : <React.Fragment>
                  <img src={"https://img.youtube.com/vi/" + v.id + "/hqdefault.jpg"} alt={v.t} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .82 }} />
                  <span style={{ position: "absolute", top: "44%", left: "50%", transform: "translate(-50%,-50%)", width: 64, height: 64, borderRadius: "50%", ...glass, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <div style={{ position: "absolute", right: 12, bottom: 100, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", color: "#fff", pointerEvents: "none" }}>
                    <div style={{ textAlign: "center" }}><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg><div style={{ fontSize: 11, marginTop: 2 }}>{fmtK(statOf(v).likes)}</div></div>
                    <div style={{ textAlign: "center" }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg><div style={{ fontSize: 11, marginTop: 2 }}>{fmtK(statOf(v).views)}</div></div>
                  </div>
                  <div style={{ position: "absolute", left: 16, right: 70, bottom: 92, color: "#fff", pointerEvents: "none" }}>
                    <div style={{ fontFamily: T.sans, fontSize: 11, opacity: .85 }}>@medique.cl · {v.src}</div>
                    <div style={{ fontFamily: T.serif, fontSize: 22, lineHeight: 1.1, marginTop: 4, textShadow: "0 2px 12px rgba(0,0,0,.7)" }}>{v.t}</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setOpinion(true); }} style={{ position: "absolute", left: 16, bottom: 40, pointerEvents: "auto", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", ...glass, borderRadius: 999, padding: "10px 16px", cursor: "pointer" }}>Déjanos tu opinión</button>
                </React.Fragment>}
          </div>
        ))}
      </div>
      {opinion && <OpinionModal T={T} onClose={() => setOpinion(false)} />}
    </div>
  );
}

function NewsView({ T, onBack }) {
  const list = cycleRotate(JC_NEWS, 15, 48);
  const [reading, setReading] = useState(null);
  if (reading) {
    // Vista previa propia (los sitios de noticias bloquean el iframe). El artículo completo se abre en su sitio.
    return (
      <div style={{ position: "absolute", inset: 0, background: T.bg, zIndex: 25, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: "1px solid " + T.line, background: T.navBg }}>
          <button onClick={() => setReading(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 18l-6-6 6-6" /></svg>Noticias
          </button>
          <div style={{ flex: 1, textAlign: "center", fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Fuente: {reading.src}</div>
        </div>
        <div className="jc-scroll" style={{ flex: 1, overflowY: "auto" }}>
          <img src={reading.img} alt="" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
          <div style={{ padding: "20px 22px 30px" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent }}>{reading.tag} · {reading.src}</div>
            <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 27, lineHeight: 1.12, color: T.text, margin: "8px 0 12px" }}>{reading.t}</h1>
            <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: T.textMute }}>{reading.sub}</p>
            <p style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 300, lineHeight: 1.7, color: T.textFaint, marginTop: 14 }}>Vista previa. El artículo completo está en el sitio de <b style={{ color: T.text, fontWeight: 500 }}>{reading.src}</b>.</p>
            <a href={reading.link} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20, fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: T.primaryText, background: T.primaryBg, borderRadius: 3, padding: "15px 26px", textDecoration: "none" }}>
              Leer artículo completo
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M7 17 17 7M9 7h8v8" /></svg>
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 25, background: T.bg, display: "flex", flexDirection: "column" }}>
      <FixedBack T={T} onBack={onBack} />
      <div className="jc-scroll" style={{ flex: 1, overflowY: "auto", paddingTop: 36 }}>
      <ScreenTop T={T} eyebrow="Novedades del mes" title="Noticias" />
      <div style={{ padding: "4px 18px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {list.map((a, i) => (
          <button key={i} onClick={() => setReading(a)} style={{ textAlign: "left", cursor: "pointer", padding: 0, textDecoration: "none", borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line, background: T.surface, display: "block", width: "100%" }}>
            <div style={{ position: "relative", height: 180 }}>
              <img src={a.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
              <span style={{ position: "absolute", left: 12, top: 12, fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#F2EDE6", background: "rgba(10,10,10,.55)", border: "1px solid rgba(242,237,230,.2)", borderRadius: 999, padding: "6px 11px" }}>{a.tag}</span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent }}>{a.src}</div>
              <div style={{ fontFamily: T.serif, fontSize: 22, color: T.text, lineHeight: 1.12, marginTop: 5 }}>{a.t}</div>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 6, lineHeight: 1.5 }}>{a.sub}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, marginTop: 10 }}>Leer más →</div>
            </div>
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}
// Botón "Volver" fijo (glass) en su posición — para vistas overlay (noticias / videos).
function FixedBack({ T, onBack }) {
  return (
    <button onClick={onBack} style={{ position: "absolute", top: 12, left: 12, zIndex: 8, display: "inline-flex", alignItems: "center", gap: 6, background: T.dark ? "rgba(16,19,26,.6)" : "rgba(255,255,255,.6)", backdropFilter: "blur(16px) saturate(1.3)", WebkitBackdropFilter: "blur(16px) saturate(1.3)", border: "1px solid " + (T.dark ? "rgba(255,255,255,.12)" : "rgba(20,20,15,.1)"), cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", padding: "8px 14px 8px 11px", borderRadius: 999, boxShadow: "0 6px 18px -8px rgba(0,0,0,.4)" }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>Volver
    </button>
  );
}

Object.assign(window, { AssistantScreen, GamesScreen, ProfileScreen, FeedHubScreen, ReelsView, NewsView, VideosHub, SorteoView, ColaboraSheet, GLOW, FixedBack });
