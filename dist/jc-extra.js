const JCM_ASSISTANT_SYS = `Act\xFAa como un asistente virtual experto en Medicina Est\xE9tica Facial y Corporal para la cl\xEDnica JC Medical (SKINLAB.TALCA, Talca, Chile). Tu creador y director m\xE9dico es el Enfermero en Medicina Est\xE9tica, Juan Claudio Parra P\xE9rez. Tu objetivo es educar a los pacientes, resolver sus dudas con precisi\xF3n cl\xEDnica y calidez, y motivarlos a agendar una evaluaci\xF3n en nuestra sede en Talca.

Tu tono debe ser profesional, emp\xE1tico, seguro y persuasivo. Nunca diagnostiques, pero brinda toda la informaci\xF3n necesaria sobre nuestros procedimientos. Responde SIEMPRE en espa\xF1ol, de forma breve y clara (2 a 5 frases salvo que pidan detalle).

BASE DE CONOCIMIENTOS DE PROCEDIMIENTOS:

1. TOXINA BOTUL\xCDNICA (BOTOX) \u2014 Zonas: tercio superior (patas de gallo, entrecejo, frente), cuello (Nefertiti), bruxismo (masetero), hiperhidrosis (axilar/palmar), sonrisa gingival, ment\xF3n empedrado. Efecto: relaja los m\xFAsculos que causan arrugas din\xE1micas; no rellena. Aplicaci\xF3n: inyecciones intramusculares con aguja ultrafina. Sesi\xF3n: 15\u201330 min. Resultados: 3\u20136 meses (hiperhidrosis y sonrisa gingival hasta 12 meses); peak a los 21 d\xEDas. Dolor: leve, como un peque\xF1o pellizco. Efectos secundarios: enrojecimiento leve, peque\xF1a inflamaci\xF3n o hematoma puntual que desaparece en pocos d\xEDas, asimetr\xEDa temporal corregible. Contraindicaciones: embarazo, lactancia, alergia a la toxina, enfermedades neuromusculares (ej. Miastenia Gravis), infecci\xF3n activa en la zona.

2. \xC1CIDO HIALUR\xD3NICO (RELLENOS Y ARMONIZACI\xD3N) \u2014 Procedimientos: rinomodelaci\xF3n, relleno de labios (y rinolips), surcos nasogenianos, aumento de ment\xF3n, arco mandibular, Rest Full Lift de p\xF3mulos, c\xF3digo de barras. Efecto: aporta volumen, hidrata, define contornos y mejora la simetr\xEDa. Aplicaci\xF3n: inyecci\xF3n subcut\xE1nea o supraperi\xF3stica, frecuentemente con c\xE1nula de bajo calibre o aguja fina. Sesi\xF3n: 30\u201345 min. Resultados: 9\u201318 meses seg\xFAn densidad y zona. Dolor: leve a moderado; anestesia t\xF3pica y muchos rellenos traen lidoca\xEDna. Efectos secundarios: inflamaci\xF3n 3\u20135 d\xEDas, posibles hematomas, sensibilidad al tacto. Contraindicaciones: embarazo, lactancia, enfermedades autoinmunes activas, tendencia a queloides, infecci\xF3n activa.

3. BIOESTIMULADORES DE COL\xC1GENO (SCULPTRA Y RADIESSE) \u2014 Efecto: estimulan la producci\xF3n natural de col\xE1geno y elastina en capas profundas; combaten flacidez y recuperan volumen perdido. Aplicaci\xF3n: inyecci\xF3n con c\xE1nula en abanico (vectores de tensi\xF3n). Sesi\xF3n: 45\u201360 min. Resultados: Sculptra 1\u20132 a\xF1os, Radiesse 12\u201318 meses. Dolor: leve, con anestesia local. Efectos secundarios: inflamaci\xF3n temporal, n\xF3dulos palpables poco frecuentes (se previenen con el masaje post-tratamiento). Contraindicaciones: enfermedades autoinmunes, embarazo, infecciones activas.

4. BIOREVITALIZANTES Y MESOTERAPIA (NCTF 135 HA, REJURAN HB, PINK GLOW) \u2014 NCTF: biorevitalizaci\xF3n con 59 ingredientes + AH. Rejuran: regeneraci\xF3n con ADN de salm\xF3n. Pink Glow: hidrataci\xF3n y luminosidad con p\xE9ptidos y antioxidantes. Aplicaci\xF3n: microinyecciones superficiales (p\xE1pulas), Nanosoft o Dermapen. Sesi\xF3n: 30\u201345 min. Resultados: 6\u201312 meses. Dolor: leve con crema anest\xE9sica, indoloro con Dermapen. Efectos secundarios: eritema y peque\xF1as p\xE1pulas que desaparecen en 24\u201348 h. Contraindicaciones: alergia a componentes (ej. pescado para Rejuran), acn\xE9 activo severo.

5. HILOS TENSORES (LIFTING FACIAL Y FOXY EYES) \u2014 Efecto: elevaci\xF3n mec\xE1nica de tejidos ca\xEDdos (cola de ceja, mejillas, mand\xEDbula) y estimulaci\xF3n de col\xE1geno. Aplicaci\xF3n: inserci\xF3n subcut\xE1nea de hilos biocompatibles (PDO u otros) con c\xE1nula gu\xEDa. Sesi\xF3n: 45\u201360 min. Resultados: 12\u201318 meses. Dolor: moderado; requiere anestesia local inyectable en los puntos de entrada. Efectos secundarios: tensi\xF3n o tirantez los primeros d\xEDas, hematomas, leve hundimiento temporal (hoyuelos) que se resuelve r\xE1pido. Contraindicaciones: piel muy fl\xE1cida o gruesa (mala indicaci\xF3n), infecciones, alteraciones de la coagulaci\xF3n.

6. ENZIMAS LIPOL\xCDTICAS INYECTABLES \u2014 Efecto: destrucci\xF3n de grasa localizada (papada, abdomen, brazos). Aplicaci\xF3n: microinyecciones directas en el tejido adiposo. Sesi\xF3n: 20\u201330 min (requiere 3\u20136 sesiones cada 15 d\xEDas). Resultados: permanentes si el paciente mantiene su peso. Dolor: leve a moderado, sensaci\xF3n de ardor al ingresar el l\xEDquido. Efectos secundarios: inflamaci\xF3n importante 48\u201372 h, enrojecimiento, sensibilidad, n\xF3dulos temporales. Contraindicaciones: obesidad generalizada (es para contorno, no para bajar de peso), embarazo, alteraciones hep\xE1ticas graves.

REGLAS DE INTERACCI\xD3N:
1. Si preguntan precios, usa EXCLUSIVAMENTE la LISTA DE PRECIOS OFICIAL que se incluye m\xE1s abajo (en pesos chilenos). No inventes ni estimes valores. La evaluaci\xF3n cuesta $15.000 y se descuenta del tratamiento si el paciente lo realiza.
2. Si el paciente relata una complicaci\xF3n grave (dolor intenso, cambio de color o blanqueamiento de la piel), ind\xEDcale que debe contactar al Enfermero Juan Claudio INMEDIATAMENTE por WhatsApp +56 9 9788 0877.
3. Cierra SIEMPRE tus mensajes invitando al paciente a agendar una hora en JC Medical.`;
const JCM_AGENDA_CIERRE = "\xBFTe gustar\xEDa que agendemos tu evaluaci\xF3n en JC Medical?";
const JCM_SEVERE = /(dolor (muy )?intenso|insoportable|blanque|palidez|piel (blanca|p[aá]lida|morada)|cambio de color|se puso (blanc|morad|gris)|necros|no siento|p[eé]rdida de visi)/i;
function jcmStripHtml(s) {
  return (s + "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}
function jcmMdToHtml(s) {
  let h = (s + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  h = h.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n{2,}/g, "<br><br>").replace(/\n/g, "<br>");
  return h;
}
window.JCM_ASSISTANT_SYS = JCM_ASSISTANT_SYS;
function AssistantScreen({ T, D, openBooking, onBack }) {
  const [msgs, setMsgs] = useState([{ who: "bot", html: "Hola, soy el asistente de <b>JC Medical</b>. Cu\xE9ntame tu duda o elige una opci\xF3n:", sugs: ["Procedimientos m\xE1s frecuentes", "Tratamiento para arrugas", "Tratamiento para flacidez"] }]);
  const [val, setVal] = useState("");
  const [busy, setBusy] = useState(false);
  const [resolved, setResolved] = useState(0);
  const boxRef = useRef(null);
  const ctx = useRef(null);
  const chips = window.JCM_CHAT_CHIPS || ["\xBFQu\xE9 es el B\xF3tox?", "\xBFDuele el \xE1cido hialur\xF3nico?", "\xBFEn qu\xE9 consiste la evaluaci\xF3n?"];
  const BASE_Q = ["Procedimientos m\xE1s frecuentes", "Precios", "\xBFEn qu\xE9 consiste la evaluaci\xF3n?"];
  const CTX_WORD = { botox: "botox", bioestim: "sculptra", meso: "nctf", lipo: "quemador", salmon: "rejuran", rino: "rinomodelacion", ha: "acido hialuronico", hiper: "hiperhidrosis" };
  function _norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function scrollDown() {
    setTimeout(() => {
      if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }, 40);
  }
  function safeBot(q) {
    let res = { html: "Cu\xE9ntame un poco m\xE1s y te oriento. " + JCM_AGENDA_CIERRE, sugs: chips.slice(0, 3) };
    try {
      if (window.jcmBot) res = window.jcmBot(q);
    } catch (e) {
    }
    return res;
  }
  async function ask(q) {
    if (!q || !q.trim() || busy) return;
    if (/^agendar/i.test(q.trim())) {
      if (openBooking) openBooking(null);
      return;
    }
    if (/whatsapp/i.test(q.trim())) {
      window.open("https://wa.me/56997880877", "_blank");
      return;
    }
    setMsgs((m) => [...m, { who: "me", html: escapeHtml(q) }]);
    setVal("");
    scrollDown();
    if (JCM_SEVERE.test(q)) {
      setMsgs((m) => [...m, { who: "bot", html: 'Lo que describes puede ser una <b>urgencia</b>. Por favor contacta de inmediato al enfermero <b>Juan Claudio Parra</b> por WhatsApp: <a href="https://wa.me/56997880877" target="_blank" rel="noopener" style="color:inherit;font-weight:600">+56 9 9788 0877</a>. No esperes ni te automediques.', sugs: ["Escribir por WhatsApp"] }]);
      scrollDown();
      return;
    }
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
      setMsgs((m) => [...m, { who: "bot", html: '<i style="opacity:.6">Escribiendo\u2026</i>', typing: true }]);
      scrollDown();
      try {
        const hist = msgs.slice(-6).map((x) => (x.who === "me" ? "Paciente: " : "Asistente: ") + jcmStripHtml(x.html)).join("\n");
        const prices = window.jcmPriceList ? "\n\nLISTA DE PRECIOS OFICIAL (CLP):\n" + window.jcmPriceList() : "";
        const prompt = JCM_ASSISTANT_SYS + prices + "\n\nConversaci\xF3n previa:\n" + hist + "\nPaciente: " + bq + "\nAsistente:";
        const out = await window.claude.complete(prompt);
        setMsgs((m) => [...m.filter((x) => !x.typing), { who: "bot", html: jcmMdToHtml(out), sugs: ["Agendar evaluaci\xF3n"], showBook }]);
      } catch (e) {
        const r = safeBot(bq);
        setMsgs((m) => [...m.filter((x) => !x.typing), { who: "bot", html: r.html, sugs: r.sugs, showBook }]);
      }
      setBusy(false);
      scrollDown();
      return;
    }
    setTimeout(() => {
      const r = safeBot(bq);
      setMsgs((m) => [...m, { who: "bot", html: r.html, sugs: r.sugs, showBook }]);
      scrollDown();
    }, 240);
  }
  function escapeHtml(s) {
    return (s + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 20px 6px" } }, onBack && /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: T.textMute, fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12, padding: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), "Volver"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Eyebrow, { T }, "Asistente \xB7 orientaci\xF3n"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 38, lineHeight: 1, letterSpacing: "-.02em", color: T.text, marginTop: 12 } }, "Preg\xFAntame")), /* @__PURE__ */ React.createElement("button", { onClick: () => openBooking && openBooking(null), style: { flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 10, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.onAccent, background: T.gold, border: "none", borderRadius: 999, padding: "9px 14px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4" })), "Agendar"))), /* @__PURE__ */ React.createElement("div", { ref: boxRef, className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "8px 16px 14px", display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { flexGrow: 1 } }), msgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: m.who === "me" ? "flex-end" : "flex-start" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "86%" } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: T.sans,
    fontSize: 13.5,
    lineHeight: 1.6,
    background: m.who === "me" ? T.primaryBg : T.surface,
    color: m.who === "me" ? T.primaryText : T.text,
    border: "1px solid " + (m.who === "me" ? T.primaryBg : T.line),
    borderRadius: 14,
    borderBottomRightRadius: m.who === "me" ? 4 : 14,
    borderBottomLeftRadius: m.who === "me" ? 14 : 4,
    padding: "12px 15px"
  }, dangerouslySetInnerHTML: { __html: m.html } }), (m.sugs && m.sugs.length > 0 || m.showBook) && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 } }, (m.sugs || []).slice(0, 3).map((s) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => ask(s), style: { fontFamily: T.sans, fontSize: 11, color: T.accent, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "7px 12px", cursor: "pointer" } }, s)), m.showBook && /* @__PURE__ */ React.createElement("button", { onClick: () => openBooking && openBooking(null), style: { fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: "#fff", background: T.gold, border: "none", borderRadius: 999, padding: "7px 14px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4" })), "Agendar")))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", borderTop: "1px solid " + T.line, background: T.navBg, display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: val,
      onChange: (e) => setVal(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") ask(val);
      },
      placeholder: "Escribe tu pregunta\u2026",
      style: { flex: 1, padding: "12px 14px", borderRadius: 999, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 16, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: () => ask(val), style: { width: 44, height: 44, borderRadius: "50%", border: "none", background: T.primaryBg, color: T.primaryText, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" })))));
}
const GLOW = {
  CAP: 200,
  // máximo de puntos por día (necesita ~10 min de juego para llegar al tope)
  GAME_CAP: 100,
  // máximo de puntos por juego por día (obliga a jugar 2+ juegos)
  GOAL: 3e3,
  // puntos para 1 ticket (~15 días al tope)
  todayKey() {
    const d = /* @__PURE__ */ new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  },
  load() {
    let s;
    try {
      s = JSON.parse(localStorage.getItem("jcm_glow") || "null");
    } catch (e) {
      s = null;
    }
    if (!s) s = { points: 0, tickets: 0, cyclePts: 0, lifetime: 0, day: this.todayKey(), today: 0, perGame: {} };
    if (s.day !== this.todayKey()) {
      s.day = this.todayKey();
      s.today = 0;
      s.perGame = {};
    }
    if (!s.perGame) s.perGame = {};
    return s;
  },
  save(s) {
    try {
      localStorage.setItem("jcm_glow", JSON.stringify(s));
    } catch (e) {
    }
  },
  add(n, gameId) {
    const s = this.load();
    if (gameId) {
      const gamePts = s.perGame[gameId] || 0;
      const gameRoom = Math.max(0, this.GAME_CAP - gamePts);
      n = Math.min(n, gameRoom);
      if (n > 0) s.perGame[gameId] = gamePts + n;
    }
    const room = Math.max(0, this.CAP - s.today);
    n = Math.min(n, room);
    if (n > 0) {
      s.today += n;
      s.points += n;
      s.cyclePts += n;
      s.lifetime += n;
      while (s.cyclePts >= this.GOAL) {
        s.cyclePts -= this.GOAL;
        s.tickets += 1;
      }
    }
    this.save(s);
    return s;
  }
};
const SORTEO_PREMIOS = [
  { ic: "PG", n: "Sesi\xF3n de Pink Glow", d: "Hidrataci\xF3n y luminosidad" },
  { ic: "EX", n: "Sesi\xF3n de Exosomas o Botox", d: "Regeneraci\xF3n y expresi\xF3n natural" },
  { ic: "TB", n: "Toxina botul\xEDnica \xB7 1 zona", d: "Expresi\xF3n natural" }
];
const JC_GAMES = [
  // ── Saber estético (set claro, con instrucciones) ──
  {
    id: "trivia",
    nm: "Consultorio Trivia",
    d: "3 rondas \xB7 3 vidas",
    ic: "\u{1F9E0}",
    url: "arcade/games/jc/index.html?game=trivia",
    c: "#54707F",
    rk: "trivia_best",
    base: 920,
    inst: "3 rondas de 3 preguntas. Tienes 3 vidas \u2764\uFE0F\u2764\uFE0F\u2764\uFE0F \u2014 cada error te cuesta una. Responde r\xE1pido para ganar m\xE1s puntos."
  },
  {
    id: "millonario",
    nm: "\xBFQui\xE9n quiere ser\u2026?",
    d: "15 preguntas \xB7 escala de premios",
    ic: "\u{1F4B0}",
    url: "arcade/games/jc/index.html?game=millonario",
    c: "#caa86a",
    rk: "mill_best",
    base: 0,
    inst: "Sube 15 escalones respondiendo correctamente. Hay premios asegurados en el camino. Un comod\xEDn 50:50 disponible. La selecci\xF3n de preguntas rota cada d\xEDa."
  },
  {
    id: "mv",
    nm: "Mito o Verdad",
    d: "10 afirmaciones \xB7 3 vidas",
    ic: "\u2696\uFE0F",
    url: "arcade/games/jc/index.html?game=mito",
    c: "#9C8AB5",
    rk: "acc_mv",
    base: 120,
    inst: "\xBFVerdad o mito? 10 afirmaciones de medicina est\xE9tica. Tienes 3 vidas \u2764\uFE0F\u2764\uFE0F\u2764\uFE0F \u2014 cuidado con los mitos bien disfrazados."
  },
  {
    id: "reflex",
    nm: "Reflejo Glow",
    d: "Reacciona en < 400 ms",
    ic: "\u26A1",
    url: "arcade/games/jc/index.html?game=reflejo",
    c: "#5E7A99",
    rk: "acc_reflex",
    base: 360,
    inst: "Toca en cuanto el c\xEDrculo se ponga VERDE. Solo reacciones bajo 400 ms suman puntos. Son 5 rondas \u2014 m\xE1s r\xE1pido, m\xE1s puntos."
  },
  // ── Habilidad ──
  {
    id: "salta",
    nm: "Salto Glow",
    d: "Salta los obst\xE1culos \xB7 sin parar",
    ic: "\u{1F998}",
    url: "arcade/games/nuevos5/index.html?game=salta",
    c: "#54707F",
    rk: "acc_salta",
    base: 300,
    inst: "Toca la pantalla para saltar. Evita que los obst\xE1culos te atrapen. \xA1Aguanta lo m\xE1s que puedas!"
  },
  {
    id: "jeringa",
    nm: "Funci\xF3n Perfecta",
    d: "Det\xE9n el \xE9mbolo en la zona verde",
    ic: "\u{1F489}",
    url: "arcade/games/nuevos/index.html?game=jeringa",
    c: "#9C8AB5",
    rk: "acc_jeringa",
    base: 1e3,
    inst: "Toca para detener el \xE9mbolo exactamente en la zona verde. A menor distancia del centro, m\xE1s puntos. \xBFPuedes ser perfecto?"
  }
];
const JC_TOP_IDS = ["trivia", "millonario", "mv", "reflex"];
function gameRecord(g) {
  let v = g.base || 0;
  try {
    const R = JSON.parse(localStorage.getItem("jcm_records") || "{}");
    v = Math.max(v, parseInt(R[g.rk] || 0, 10) || 0);
  } catch (e) {
  }
  return v;
}
function GameCard({ T, g, top, onOpen }) {
  const rec = gameRecord(g);
  return /* @__PURE__ */ React.createElement("button", { onClick: () => onOpen(g), style: { textAlign: "left", padding: "14px 13px", cursor: "pointer", background: T.surface, border: "1px solid " + (top ? T.gold : T.line), borderRadius: 8, display: "flex", flexDirection: "column", gap: 9, minHeight: 126, position: "relative" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: g.c + "22", border: "1px solid " + T.line } }, g.ic), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent } }, g.d), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text, lineHeight: 1.12, marginTop: 3 } }, g.nm)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { title: "R\xE9cord a superar", style: { display: "inline-flex", alignItems: "center", gap: 4, fontFamily: T.sans, fontSize: 10.5, fontWeight: 500, color: T.gold } }, /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M5 3h14v2h2v2.5a3.5 3.5 0 0 1-3.5 3.5h-.6A5 5 0 0 1 13 15.8V18h3v2H8v-2h3v-2.2A5 5 0 0 1 7.1 11H6.5A3.5 3.5 0 0 1 3 7.5V5h2V3zm0 4v.5A1.5 1.5 0 0 0 6.5 9H7V7H5zm14 0h-2v2h.5A1.5 1.5 0 0 0 19 7.5V7z" })), rec.toLocaleString("es-CL")), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent } }, "Jugar \u2192")));
}
function GamesScreen({ T, go, onBack }) {
  const [open, setOpen] = useState(null);
  const [pending, setPending] = useState(null);
  const [sorteo, setSorteo] = useState(() => {
    const f = !!window._jcmOpenSorteo;
    window._jcmOpenSorteo = false;
    return f;
  });
  const [glow, setGlow] = useState(() => GLOW.load());
  const [promo, setPromo] = useState(() => {
    try {
      return !sessionStorage.getItem("jcm_games_promo");
    } catch (e) {
      return true;
    }
  });
  const topGames = JC_TOP_IDS.map((id) => JC_GAMES.find((g) => g.id === id)).filter(Boolean);
  const popGames = JC_GAMES.filter((g) => JC_TOP_IDS.indexOf(g.id) < 0);
  const secHead = { display: "flex", alignItems: "center", gap: 10, padding: "0 20px 8px", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent };
  const grid2 = { padding: "0 20px 8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
  const session = window.jcmGetSession ? window.jcmGetSession() : null;
  const glowAwarded = React.useRef(false);
  function closeGame() {
    if (!glowAwarded.current) setGlow(GLOW.add(40));
    glowAwarded.current = false;
    setOpen(null);
  }
  React.useEffect(() => {
    const h = (e) => {
      if (e.data && e.data.type === "jcm_glow" && e.data.pts > 0) {
        glowAwarded.current = true;
        setGlow(GLOW.add(e.data.pts, e.data.game));
      }
    };
    window.addEventListener("message", h);
    return () => window.removeEventListener("message", h);
  }, []);
  function dismissPromo() {
    setPromo(false);
    try {
      sessionStorage.setItem("jcm_games_promo", "1");
    } catch (e) {
    }
  }
  if (sorteo) return /* @__PURE__ */ React.createElement(SorteoView, { T, onBack: () => setSorteo(false), go });
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ScreenTop, { T, eyebrow: "Juega y participa por un procedimiento gratis", title: "Juegos", onBack }), /* @__PURE__ */ React.createElement("p", { style: { padding: "0 20px 14px", fontFamily: T.sans, fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: T.textMute } }, "Elige un juego y empieza a sumar ", /* @__PURE__ */ React.createElement("b", { style: { color: T.gold } }, "Glow Points"), ". Cada juego tiene un ", /* @__PURE__ */ React.createElement("b", { style: { color: T.gold } }, "r\xE9cord que superar"), " y te acerca a un ", /* @__PURE__ */ React.createElement("b", { style: { color: T.gold } }, "ticket"), " para el sorteo de tratamientos."), /* @__PURE__ */ React.createElement("div", { style: secHead }, /* @__PURE__ */ React.createElement("span", null, "M\xE1s jugados"), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, height: 1, background: T.line } })), /* @__PURE__ */ React.createElement("div", { style: grid2 }, topGames.map((g) => /* @__PURE__ */ React.createElement(GameCard, { key: g.id, T, g, top: true, onOpen: setPending }))), /* @__PURE__ */ React.createElement("div", { style: { ...secHead, paddingTop: 18 } }, /* @__PURE__ */ React.createElement("span", null, "Populares entre usuarios"), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, height: 1, background: T.line } })), /* @__PURE__ */ React.createElement("div", { style: grid2 }, popGames.map((g) => /* @__PURE__ */ React.createElement(GameCard, { key: g.id, T, g, onOpen: setPending }))), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 20px 28px", display: "flex", flexDirection: "column", gap: 9 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setSorteo(true), style: { width: "100%", display: "flex", alignItems: "center", gap: 11, textAlign: "left", padding: "13px 15px", borderRadius: 8, background: T.surface2, border: "1px solid " + T.gold, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: T.gold + "22", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: T.gold, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M5 3h14v2h2v2.5a3.5 3.5 0 0 1-3.5 3.5h-.6A5 5 0 0 1 13 15.8V18h3v2H8v-2h3v-2.2A5 5 0 0 1 7.1 11H6.5A3.5 3.5 0 0 1 3 7.5V5h2V3z" }))), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text, lineHeight: 1.35 } }, "Revisa tus puntos y participa por una sesi\xF3n gratis"), /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 10.5, color: T.gold, letterSpacing: ".06em", textTransform: "uppercase", marginTop: 4 } }, glow.tickets, " ticket", glow.tickets === 1 ? "" : "s", " \xB7 ", glow.points.toLocaleString("es-CL"), " pts \u2192"))), !session && /* @__PURE__ */ React.createElement("button", { onClick: () => go && go("perfil"), style: { width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px", borderRadius: 8, background: "transparent", color: T.text, border: "1px solid " + T.chipBorder, cursor: "pointer" } }, "Ingresar a mi cuenta \xB7 guarda tus puntos")), promo && !open && /* @__PURE__ */ React.createElement("div", { onClick: dismissPromo, style: { position: "fixed", inset: 0, zIndex: 55, background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { background: T.bg, border: "1px solid " + T.line, borderRadius: 16, padding: "26px 22px", maxWidth: 340, textAlign: "center", animation: "jcPop .4s " + T.ease } }, /* @__PURE__ */ React.createElement("div", { style: { width: 54, height: 54, borderRadius: "50%", background: T.gold + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: T.gold, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M5 3h14v2h2v2.5a3.5 3.5 0 0 1-3.5 3.5h-.6A5 5 0 0 1 13 15.8V18h3v2H8v-2h3v-2.2A5 5 0 0 1 7.1 11H6.5A3.5 3.5 0 0 1 3 7.5V5h2V3z" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.gold, marginBottom: 6 } }, "Juega gratis"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 25, color: T.text, lineHeight: 1.15 } }, "Juega y participa por un procedimiento gratis"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 10, lineHeight: 1.6 } }, "Cada partida suma Glow Points. Al juntar suficientes ganas un ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "ticket"), " para el sorteo de un tratamiento. Sin costo y sin l\xEDmite para jugar."), /* @__PURE__ */ React.createElement("button", { onClick: dismissPromo, style: { marginTop: 18, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", padding: "14px", borderRadius: 6, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" } }, "Empezar a jugar"))), pending && !open && /* @__PURE__ */ React.createElement("div", { onClick: () => setPending(null), style: { position: "fixed", inset: 0, zIndex: 56, background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { background: T.bg, border: "1px solid " + T.line, borderRadius: 16, padding: "26px 22px", maxWidth: 340, width: "100%", textAlign: "center", animation: "jcPop .4s " + (T.ease || "ease") } }, /* @__PURE__ */ React.createElement("div", { style: { width: 56, height: 56, borderRadius: "50%", background: pending.c + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 28 } }, pending.ic), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 6 } }, "C\xF3mo se juega"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 25, color: T.text, lineHeight: 1.15 } }, pending.nm), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.textMute, marginTop: 10, lineHeight: 1.6 } }, pending.inst || "Toca Jugar para comenzar. Supera el r\xE9cord y suma Glow Points."), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setOpen(pending);
    setPending(null);
  }, style: { marginTop: 18, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", padding: "14px", borderRadius: 6, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" } }, "Jugar"), /* @__PURE__ */ React.createElement("button", { onClick: () => setPending(null), style: { marginTop: 9, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", padding: "12px", borderRadius: 6, background: "transparent", color: T.text, border: "1px solid " + T.chipBorder, cursor: "pointer" } }, "Volver"))), open && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: T.bg, zIndex: 50, display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid " + T.line, background: T.navBg } }, /* @__PURE__ */ React.createElement("button", { onClick: closeGame, style: { display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), "Juegos"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, textAlign: "center", fontFamily: T.serif, fontSize: 17, color: T.text } }, open.nm), /* @__PURE__ */ React.createElement("a", { href: open.url, target: "_blank", rel: "noopener", style: { color: T.textMute, display: "flex" }, title: "Abrir en pesta\xF1a nueva" }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" })))), /* @__PURE__ */ React.createElement("iframe", { src: open.url + (open.url.indexOf("?") >= 0 ? "&" : "?") + "v=46", title: open.nm, style: { flex: 1, width: "100%", border: 0, background: "#fff" } })));
}
function SorteoView({ T, onBack, go }) {
  const glow = GLOW.load();
  const session = window.jcmGetSession ? window.jcmGetSession() : null;
  const pct = Math.min(100, Math.round(glow.cyclePts / GLOW.GOAL * 100));
  let users = [];
  try {
    users = (window.DB.get("users") || []).map((u) => ({ name: u.name || "Paciente", pts: u.points || 0 }));
  } catch (e) {
  }
  const meName = session ? session.name : "T\xFA";
  if (!users.some((u) => u.name === meName)) users.push({ name: meName, pts: glow.points, me: true });
  else {
    const u = users.find((x) => x.name === meName);
    u.pts = Math.max(u.pts, glow.points);
    u.me = true;
  }
  users.sort((a, b) => b.pts - a.pts);
  const top = users.slice(0, 10);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ScreenTop, { T, eyebrow: "Tus Glow Points", title: "Puntos y sorteo", onBack }), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 20px 26px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: T.dark ? "#0a0f1c" : T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "18px 16px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent } }, "Glow Points"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 40, fontWeight: 300, color: T.gold, lineHeight: 1.1 } }, glow.points.toLocaleString("es-CL"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: T.dark ? "#0a0f1c" : T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "18px 16px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent } }, "Tickets"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 40, fontWeight: 300, color: T.text, lineHeight: 1.1 } }, glow.tickets))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", null, "Progreso al pr\xF3ximo ticket"), /* @__PURE__ */ React.createElement("span", null, glow.cyclePts.toLocaleString("es-CL"), " / ", GLOW.GOAL.toLocaleString("es-CL"))), /* @__PURE__ */ React.createElement("div", { style: { height: 8, borderRadius: 5, background: T.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: pct + "%", height: "100%", background: T.gold, borderRadius: 5 } })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 8, lineHeight: 1.5 } }, "Hay un tope diario de ", GLOW.CAP, " puntos: jugando unos 15 d\xEDas consigues 1 ticket. Puedes seguir jugando libremente; los tickets se acumulan para el sorteo.")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 22 } }, /* @__PURE__ */ React.createElement(Eyebrow, { T }, "Tratamientos a sorteo"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, display: "flex", flexDirection: "column", gap: 10 } }, SORTEO_PREMIOS.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.ic, style: { display: "flex", alignItems: "center", gap: 14, padding: "13px 15px", background: T.surface, border: "1px solid " + T.line, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 14, color: T.gold, border: "1px solid " + T.line } }, r.ic), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, r.n), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 1 } }, r.d)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.gold } }, "A sorteo")))), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 12, lineHeight: 1.6 } }, "Cada ticket es una participaci\xF3n. Al cierre de cada periodo elegimos 1 o 2 ganadores entre todos los usuarios. Mientras m\xE1s juegas, m\xE1s tickets acumulas.")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 24 } }, /* @__PURE__ */ React.createElement(Eyebrow, { T }, "Ranking global de jugadores"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, display: "flex", flexDirection: "column", gap: 6 } }, top.map((u, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 8, background: u.me ? T.surface2 : T.surface, border: "1px solid " + (u.me ? T.gold : T.line) } }, /* @__PURE__ */ React.createElement("span", { style: { width: 24, fontFamily: T.serif, fontSize: 16, color: i < 3 ? T.gold : T.textMute, textAlign: "center" } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 13, color: T.text } }, u.me ? u.name + " (t\xFA)" : u.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.gold } }, u.pts.toLocaleString("es-CL"))))), !session && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement(GhostBtn, { T, full: true, onClick: () => go && go("perfil") }, "Ingresa a tu cuenta para guardar tu ranking")))));
}
const JC_REWARDS = [
  { ic: "PG", n: "Sesi\xF3n de Pink Glow" },
  { ic: "AS", n: "ADN de salm\xF3n" },
  { ic: "EX", n: "Sesi\xF3n de Exosomas" }
];
const EXCL_PROMOS = [
  { name: "Botox Full Face (8 zonas)", tag: "Precio exclusivo app", price: 28e4, orig: 35e4, img: "assets/ad-botox-soft.png", desc: "Cara completa en una sola sesi\xF3n. Ahorra $70.000 reservando desde aqu\xED." },
  { name: "Sculptra \xB7 1 sesi\xF3n", tag: "Precio exclusivo app", price: 4e5, orig: 45e4, img: "assets/ad-sculptra-soft.png", desc: "Bioestimulaci\xF3n de col\xE1geno. Ahorra $50.000 reservando desde aqu\xED." },
  { name: "Rinomodelaci\xF3n", tag: "Precio exclusivo app", price: 17e4, orig: 2e5, img: "assets/ad-rino-soft.png", desc: "Con Juv\xE9derm. Ahorra $30.000 reservando desde aqu\xED." }
];
function ProfileScreen({ T, D, go, openBooking, onBack, onSessionChange }) {
  const [colab, setColab] = useState(null);
  const [session, setSession] = useState(() => window.jcmGetSession ? window.jcmGetSession() : null);
  const cfg = window.DB && window.DB.cfg ? window.DB.cfg() : { pts_start: 500, reward_cost: 6e4 };
  const [points, setPoints] = useState(session ? session.points || 0 : cfg.pts_start || 500);
  const [mode, setMode] = useState("menu");
  const [form, setForm] = useState({ name: "", phone: "", email: "", pass: "", terms: false });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const rewardCost = cfg.reward_cost || 6e4;
  const extraKey = session ? "profile_extra_" + session.id : "profile_extra_guest";
  const [extra, setExtra] = useState(() => {
    try {
      return window.DB.get(extraKey) || {};
    } catch (e) {
      return {};
    }
  });
  const [editExtra, setEditExtra] = useState({ rut: extra.rut || "", age: extra.age || "", avatarColor: extra.avatarColor || "#8B7355" });
  function saveExtra() {
    const d = { rut: editExtra.rut, age: editExtra.age, avatarColor: editExtra.avatarColor };
    try {
      window.DB.set(extraKey, d);
    } catch (e) {
    }
    setExtra(d);
    setMode("menu");
  }
  const myBookings = (() => {
    try {
      const bs = window.DB.get("bookings") || [];
      return bs.filter((b) => session && (b.phone === session.phone || b.uid === session.id));
    } catch (e) {
      return [];
    }
  })();
  const myAbonos = (() => {
    try {
      const abs = window.DB.get("abonos") || [];
      return abs.filter((a) => session && (a.phone === session.phone || a.uid === session.id));
    } catch (e) {
      return [];
    }
  })();
  const weekPromo = (() => {
    const d = /* @__PURE__ */ new Date();
    const week = Math.floor((d - new Date(d.getFullYear(), 0, 1)) / 6048e5);
    return EXCL_PROMOS.slice().sort((a, b) => (EXCL_PROMOS.indexOf(a) + week) % 3 - (EXCL_PROMOS.indexOf(b) + week) % 3);
  })();
  function _notifySession(s) {
    setSession(s);
    if (onSessionChange) onSessionChange(s);
  }
  async function doRegister() {
    setErr("");
    if (!form.terms) {
      setErr("Debes aceptar los t\xE9rminos y ser mayor de 18 a\xF1os.");
      return;
    }
    setBusy(true);
    try {
      const r = await window.jcmRegister(form.name, form.phone, form.pass, form.email);
      if (!r.ok) {
        setErr(r.msg);
        setBusy(false);
        return;
      }
      const s = window.jcmSaveSession(r.user);
      _notifySession(s);
      setPoints(r.user.points || cfg.pts_start);
      setMode("menu");
    } catch (e) {
      setErr("Error al registrar. Intenta de nuevo.");
    }
    setBusy(false);
  }
  async function doLogin() {
    setErr("");
    setBusy(true);
    try {
      const r = await window.jcmLogin(form.phone, form.pass);
      if (!r.ok) {
        setErr(r.msg);
        setBusy(false);
        return;
      }
      const s = window.jcmSaveSession(r.user);
      _notifySession(s);
      setPoints(r.user.points || 0);
      setMode("menu");
    } catch (e) {
      setErr("Error al iniciar sesi\xF3n.");
    }
    setBusy(false);
  }
  function doLogout() {
    if (window.jcmEndSession) window.jcmEndSession();
    _notifySession(null);
    setPoints(cfg.pts_start || 500);
    setMode("menu");
  }
  function redeem() {
    if (points < rewardCost) return;
    try {
      const reds = window.DB.get("redeems") || [];
      reds.push({ id: Date.now().toString(36), user: session ? session.name : "Invitado", uid: session ? session.id : null, cost: rewardCost, t: (/* @__PURE__ */ new Date()).toISOString(), done: false });
      window.DB.set("redeems", reds);
      const np = points - rewardCost;
      setPoints(np);
      if (session) window.jcmUpdatePoints(session.id, np);
    } catch (e) {
    }
  }
  if (mode === "editprofile") {
    const AVATAR_COLORS = ["#8B7355", "#4A7C8E", "#7C6B8B", "#5A8A6A", "#8A5A5A", "#6B6B8A"];
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ScreenTop, { T, eyebrow: "Mi perfil", title: "Editar datos", onBack: () => setMode("menu") }), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 72, height: 72, borderRadius: "50%", background: editExtra.avatarColor, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 600, fontFamily: T.serif, marginBottom: 10 } }, (session ? session.name : "?")[0].toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Color de avatar"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "center" } }, AVATAR_COLORS.map((c) => /* @__PURE__ */ React.createElement("button", { key: c, onClick: () => setEditExtra((e) => ({ ...e, avatarColor: c })), style: { width: 28, height: 28, borderRadius: "50%", background: c, border: editExtra.avatarColor === c ? "2.5px solid " + T.text : "2.5px solid transparent", cursor: "pointer" } })))), /* @__PURE__ */ React.createElement(Field, { T, label: "RUT", value: editExtra.rut, onChange: (v) => setEditExtra((e) => ({ ...e, rut: v })), placeholder: "Ej: 12.345.678-9" }), /* @__PURE__ */ React.createElement(Field, { T, label: "Edad", value: editExtra.age, onChange: (v) => setEditExtra((e) => ({ ...e, age: v.replace(/\D/g, "") })), placeholder: "Ej: 32", inputMode: "numeric" }), /* @__PURE__ */ React.createElement(PrimaryBtn, { T, full: true, onClick: saveExtra }, "Guardar cambios"), /* @__PURE__ */ React.createElement(GhostBtn, { T, full: true, onClick: () => setMode("menu") }, "Cancelar")));
  }
  if (mode === "register" || mode === "login") {
    const isReg = mode === "register";
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ScreenTop, { T, eyebrow: isReg ? "Nueva cuenta" : "Bienvenida de vuelta", title: isReg ? "Reg\xEDstrate" : "Iniciar sesi\xF3n", onBack: () => {
      setMode("menu");
      setErr("");
    } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 12 } }, isReg && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6 } }, "Crea tu cuenta y recibe ", /* @__PURE__ */ React.createElement("b", { style: { color: T.gold } }, cfg.pts_start || 500, " Glow Points"), " de regalo."), isReg && /* @__PURE__ */ React.createElement(Field, { T, label: "Nombre completo", value: form.name, onChange: (v) => setForm({ ...form, name: v }), placeholder: "Ej: Camila Rojas" }), /* @__PURE__ */ React.createElement(Field, { T, label: "Tel\xE9fono (WhatsApp)", value: form.phone, onChange: (v) => setForm({ ...form, phone: v.replace(/[^\d+\s]/g, "") }), placeholder: "+56 9 XXXX XXXX", inputMode: "tel" }), isReg && /* @__PURE__ */ React.createElement(Field, { T, label: "Correo (opcional)", value: form.email, onChange: (v) => setForm({ ...form, email: v }), placeholder: "tucorreo@ejemplo.com", inputMode: "email" }), /* @__PURE__ */ React.createElement(Field, { T, label: "Contrase\xF1a", value: form.pass, onChange: (v) => setForm({ ...form, pass: v }), placeholder: "M\xEDn. 6 caracteres", type: "password" }), isReg && /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "flex-start", gap: 9, fontFamily: T.sans, fontSize: 12, color: T.textMute, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: form.terms, onChange: (e) => setForm({ ...form, terms: e.target.checked }), style: { marginTop: 2 } }), "Acepto los t\xE9rminos de uso y soy mayor de 18 a\xF1os."), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#c0285a" } }, err), /* @__PURE__ */ React.createElement(PrimaryBtn, { T, full: true, onClick: isReg ? doRegister : doLogin }, busy ? "Procesando\u2026" : isReg ? "Crear cuenta \xB7 +" + (cfg.pts_start || 500) + " pts" : "Entrar"), /* @__PURE__ */ React.createElement(GhostBtn, { T, full: true, onClick: () => {
      setMode(isReg ? "login" : "register");
      setErr("");
    } }, isReg ? "Ya tengo cuenta" : "Crear una cuenta")));
  }
  const avatarColor = extra.avatarColor || "#8B7355";
  const firstName = session ? (session.name || "").split(" ")[0] : null;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ScreenTop, { T, eyebrow: "Mi cuenta", title: "Mi Perfil", onBack }), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 20px 24px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 64, height: 64, borderRadius: "50%", background: avatarColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 600, fontFamily: T.serif, flexShrink: 0 } }, (session ? session.name : "?")[0].toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, lineHeight: 1.1, marginBottom: 3 } }, session ? session.name : "Invitada"), session && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, session.phone, extra.rut ? " \xB7 " + extra.rut : "", extra.age ? " \xB7 " + extra.age + " a\xF1os" : "")), session && /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setEditExtra({ rut: extra.rut || "", age: extra.age || "", avatarColor });
    setMode("editprofile");
  }, style: { flexShrink: 0, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, "Editar")), /* @__PURE__ */ React.createElement("div", { style: { background: T.dark ? "#0a0f1c" : T.surface, border: "1px solid " + T.line, borderRadius: 6, padding: "22px 20px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent } }, "Glow Points"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 52, fontWeight: 300, color: T.gold, lineHeight: 1, marginTop: 6 } }, points.toLocaleString("es-CL")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 6 } }, session ? "Hola " + firstName + " \xB7 puntos acumulados" : "Modo invitado \xB7 inicia sesi\xF3n para guardar tus puntos")), !session ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement(PrimaryBtn, { T, full: true, onClick: () => setMode("register") }, "Crear cuenta \xB7 +", cfg.pts_start || 500, " pts"), /* @__PURE__ */ React.createElement(GhostBtn, { T, full: true, onClick: () => setMode("login") }, "Iniciar sesi\xF3n")) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => go && go("juegos"), style: { flex: 1, fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", padding: "11px", borderRadius: 8, cursor: "pointer", background: T.surface2, color: T.gold, border: "1px solid " + T.gold } }, "Jugar \xB7 ganar puntos"), /* @__PURE__ */ React.createElement("button", { onClick: doLogout, style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", padding: "11px 14px", borderRadius: 8, cursor: "pointer", background: "transparent", color: T.textMute, border: "1px solid " + T.chipBorder } }, "Salir")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 } }, "Precios exclusivos \xB7 solo en la app"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, weekPromo.map((p, i) => /* @__PURE__ */ React.createElement("div", { key: p.name, style: { display: "flex", alignItems: "center", gap: 12, background: i === 0 ? T.surface2 : T.surface, border: "1px solid " + (i === 0 ? T.gold + "55" : T.line), borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("img", { src: p.img, alt: p.name, onError: (e) => {
    e.target.style.display = "none";
  }, style: { width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0, background: T.bg } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.text, lineHeight: 1.1, marginBottom: 2 } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 4 } }, p.desc), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 17, color: T.gold, fontWeight: 500 } }, "$", p.price.toLocaleString("es-CL")), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, textDecoration: "line-through" } }, "$", p.orig.toLocaleString("es-CL")))), /* @__PURE__ */ React.createElement("button", { onClick: () => openBooking && openBooking({ name: p.name, price: p.price }), style: { flexShrink: 0, background: T.gold, color: "#fff", border: "none", borderRadius: 8, padding: "9px 12px", cursor: "pointer", fontFamily: T.sans, fontSize: 10, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase" } }, "Agendar"))))), session && myBookings.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 } }, "Tus procedimientos"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, myBookings.slice(0, 6).map((b, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: T.surface, border: "1px solid " + T.line, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, b.proc || b.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, b.date ? new Date(b.date).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" }) : b.day === 0 ? "Hoy" : b.day === 1 ? "Ma\xF1ana" : "Pr\xF3ximo")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: b.paid ? "#2A7A4B" : T.textMute, background: b.paid ? "#2A7A4B18" : T.chipBg, border: "1px solid " + (b.paid ? "#2A7A4B44" : T.chipBorder), borderRadius: 999, padding: "4px 10px" } }, b.paid ? "Pagado" : "Pendiente"))))), session && myAbonos.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 } }, "Tus abonos"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, myAbonos.map((a, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: T.surface, border: "1px solid " + T.line, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, a.concept || "Abono"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, a.date ? new Date(a.date).toLocaleDateString("es-CL", { day: "numeric", month: "short" }) : "")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: "#2A7A4B" } }, "+$", (a.amount || 0).toLocaleString("es-CL")))))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 24 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    window._jcmOpenSorteo = true;
    go && go("juegos");
  }, style: { width: "100%", display: "flex", alignItems: "center", gap: 13, textAlign: "left", padding: "15px 16px", background: T.surface2, border: "1px solid " + T.gold, borderRadius: 8, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: T.gold, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M5 3h14v2h2v2.5a3.5 3.5 0 0 1-3.5 3.5h-.6A5 5 0 0 1 13 15.8V18h3v2H8v-2h3v-2.2A5 5 0 0 1 7.1 11H6.5A3.5 3.5 0 0 1 3 7.5V5h2V3z" }))), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.serif, fontSize: 17, color: T.text } }, "Puntos y sorteo"), /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 } }, "Junta tickets jugando y participa por una sesi\xF3n gratis")), /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M9 6l6 6-6 6" })))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    const url = window.JCSAAS && window.JCSAAS.collabLink ? window.JCSAAS.collabLink() : "https://medique.cl/colaborar.html?c=jc-medical-qI9dePy";
    window.open(url, "_blank", "noopener");
  }, style: { width: "100%", display: "flex", alignItems: "center", gap: 13, textAlign: "left", padding: "15px 16px", background: T.surface, border: "1px solid " + T.line, borderRadius: 8, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "8", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M2 20a6 6 0 0 1 11 0M16 6a3 3 0 0 1 0 6M22 20a6 6 0 0 0-5-5.9" }))), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.serif, fontSize: 17, color: T.text } }, "Colabora con nosotros"), /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 } }, "\xBFEres influencer o marca? Trabajemos juntos")), /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M9 6l6 6-6 6" }))))), colab && /* @__PURE__ */ React.createElement(ColaboraSheet, { T, step: colab, setStep: setColab, session }));
}
function ColaboraSheet({ T, step, setStep, session }) {
  const [f, setF] = useState({ name: session ? session.name : "", kind: "Influencer", ig: "", reach: "", phone: "", message: "" });
  const ok = f.name.trim() && (f.ig.trim() || f.phone.trim());
  function send() {
    try {
      const all = window.DB.get("collabs") || [];
      all.unshift({ id: "cb" + Date.now(), name: f.name.trim(), kind: f.kind, ig: f.ig.trim(), reach: f.reach.trim(), phone: f.phone.trim(), message: f.message.trim(), status: "nueva", ts: Date.now() });
      window.DB.set("collabs", all);
    } catch (e) {
    }
    setStep("ok");
  }
  return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, zIndex: 60, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { width: "100%", maxHeight: "92%", overflowY: "auto", background: T.bg, borderRadius: "18px 18px 0 0", border: "1px solid " + T.line, padding: "20px 20px 28px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Colaboraciones \xB7 JC Medical"), /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(null), style: { background: "none", border: "none", color: T.textMute, cursor: "pointer", padding: 2 } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), step === "cond" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 27, color: T.text, lineHeight: 1.1, marginBottom: 12 } }, "Trabajemos juntos"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, marginBottom: 12 } }, "Buscamos colaboraciones reales y de largo plazo con personas y marcas alineadas con nuestra filosof\xEDa: resultados naturales y criterio cl\xEDnico. Antes de postular, ten en cuenta:"), ["Cuenta activa y contenido propio coherente con est\xE9tica y bienestar.", "Compromiso de contenido honesto: mostramos procesos reales, no promesas.", "La colaboraci\xF3n se eval\xFAa caso a caso; te contactamos si hay match.", "Los tratamientos est\xE1n sujetos a evaluaci\xF3n cl\xEDnica previa."].map((c, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, marginBottom: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.accent, marginTop: 2 } }, "\u2022"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, lineHeight: 1.5 } }, c))), /* @__PURE__ */ React.createElement("button", { onClick: () => setStep("form"), style: { marginTop: 16, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", padding: "15px", borderRadius: 6, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" } }, "Continuar")), step === "form" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 26, color: T.text, lineHeight: 1.1, marginBottom: 14 } }, "Cu\xE9ntanos de ti"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(Field, { T, label: "Nombre o marca", value: f.name, onChange: (v) => setF({ ...f, name: v }), placeholder: "Tu nombre o el de tu marca" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "Tipo"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, ["Influencer", "Marca"].map((k) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setF({ ...f, kind: k }), style: { flex: 1, fontFamily: T.sans, fontSize: 12.5, padding: "11px", borderRadius: 7, cursor: "pointer", background: f.kind === k ? T.accent : T.surface, color: f.kind === k ? T.onAccent || "#fff" : T.textMute, border: "1px solid " + (f.kind === k ? T.accent : T.line) } }, k)))), /* @__PURE__ */ React.createElement(Field, { T, label: "Instagram", value: f.ig, onChange: (v) => setF({ ...f, ig: v }), placeholder: "@tucuenta" }), /* @__PURE__ */ React.createElement(Field, { T, label: "Seguidores (aprox.)", value: f.reach, onChange: (v) => setF({ ...f, reach: v.replace(/\D/g, "") }), placeholder: "Ej: 12000", inputMode: "numeric" }), /* @__PURE__ */ React.createElement(Field, { T, label: "WhatsApp", value: f.phone, onChange: (v) => setF({ ...f, phone: v.replace(/[^\d+\s]/g, "") }), placeholder: "+56 9 XXXX XXXX", inputMode: "tel" }), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Tu propuesta"), /* @__PURE__ */ React.createElement("textarea", { value: f.message, onChange: (e) => setF({ ...f, message: e.target.value }), rows: 3, placeholder: "Cu\xE9ntanos qu\xE9 te gustar\xEDa proponer\u2026", style: { width: "100%", padding: "12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 16, outline: "none", resize: "vertical", boxSizing: "border-box" } })), /* @__PURE__ */ React.createElement(PrimaryBtn, { T, full: true, onClick: () => ok && send() }, "Enviar solicitud"))), step === "ok" && /* @__PURE__ */ React.createElement("div", { style: { padding: "26px 0", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 56, height: 56, borderRadius: "50%", background: "#1F8A5B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" } }, /* @__PURE__ */ React.createElement("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 26, color: T.text } }, "\xA1Solicitud enviada!"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 8, lineHeight: 1.6 } }, "Gracias por tu inter\xE9s. Revisaremos tu propuesta y, si hay match, te contactaremos."), /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(null), style: { marginTop: 18, fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px 22px", borderRadius: 6, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" } }, "Listo"))));
}
const JC_REELS = [
  { id: "euDVh--UYyU", t: "La fascia: un mundo misterioso bajo la piel", src: "DW Documental", likes: 14e3, views: 32e4 },
  { id: "5n-kWpf0SOU", t: "El boom del \xE1cido hialur\xF3nico", src: "DW Documental", likes: 47600, views: 161e4 },
  { id: "KubwNE8kmbg", t: "Los secretos de la longevidad", src: "DW Documental", likes: 54e3, views: 21e5 },
  { id: "ApNwyP7KvdI", t: "El c\xF3digo secreto del envejecimiento", src: "DW Documental", likes: 38e3, views: 145e4 },
  { id: "Y2Z_XxVanT0", t: "El sistema inmunol\xF3gico contra el c\xE1ncer", src: "DW Documental", likes: 41e3, views: 132e4 },
  { id: "-rD7COiH67I", t: "Salud mental y resiliencia", src: "DW Documental", likes: 36e3, views: 118e4 },
  { id: "hHO42VQabtg", t: "Endometriosis: una enfermedad invisible", src: "DW Documental", likes: 22e3, views: 64e4 },
  { id: "lP7iJf3Tgn8", t: "Az\xFAcar y aditivos: la industria alimentaria", src: "DW Documental", likes: 52e3, views: 24e5 },
  { id: "oOn_rTintBk", t: "El futuro de la alimentaci\xF3n", src: "DW Documental", likes: 19e3, views: 51e4 },
  { id: "NN8-XNQiEpc", t: "Metabolismo, longevidad y biohacking", src: "DW Documental", likes: 29e3, views: 98e4 }
];
const VIDEO_CATS = [
  { k: "estetica", l: "Medicina Est\xE9tica", ic: "\u{1F489}", img: "assets/ad-botox-soft.png" },
  { k: "salud", l: "Salud", ic: "\u{1FA7A}", img: "assets/cat-bioest-facial.png" },
  { k: "peso", l: "P\xE9rdida de peso", ic: "\u{1F957}", img: "assets/ad-sculptra-soft.png" }
];
const JC_NEWS = [
  { tag: "Tendencias", t: "Las 6 tendencias de la medicina est\xE9tica del futuro", sub: "De la prevenci\xF3n a los tratamientos expr\xE9s.", link: "https://www.hola.com/belleza/20251110865817/medicina-estetica-nuevos-tratamientos/", src: "HOLA", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=640&q=70" },
  { tag: "Regeneraci\xF3n", t: "Exosomas: el nuevo elixir que revoluciona la belleza", sub: "Reparaci\xF3n celular, col\xE1geno y elastina.", link: "https://www.multiestetica.com/articulos/exosomas/exosomas-el-nuevo-elixir-de-la-juventud-que-revoluciona-la-belleza-y-la-ciencia", src: "Multiest\xE9tica", img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=640&q=70" },
  { tag: "B\xF3tox", t: "Botox suave: naturalidad, tecnolog\xEDa y prevenci\xF3n", sub: "Potenciar rasgos sin congelar la cara.", link: "https://www.drjonathanvarela.com/%F0%9F%8C%9F-tendencias-en-medicina-estetica-2025-naturalidad-tecnologia-y-prevencion/", src: "Dr. Varela", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=640&q=70" },
  { tag: "Col\xE1geno", t: "Bioestimuladores: rejuvenecer sin cirug\xEDa", sub: "Estimulan tu propio col\xE1geno progresivamente.", link: "https://www.elvocero.com/escenario/moda-y-belleza/bioestimuladores-de-col-geno-la-revoluci-n-en-el-rejuvenecimiento-facial-sin-cirug-a/article_a9efe629-1be0-4aff-bfd2-c51ce3ffc574.html", src: "El Vocero", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=640&q=70" },
  { tag: "Regeneraci\xF3n", t: "Polinucle\xF3tidos y exosomas: regenerar de adentro", sub: "C\xF3mo combinar ambos activos.", link: "https://www.chicmagazine.com.mx/estilo-de-vida/wellness/polinucleotidos-y-exosomas-en-medicina-estetica", src: "Chic Magazine", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=640&q=70" },
  { tag: "Skincare", t: "Rutina de skincare paso a paso", sub: "La constancia gana a la complejidad.", link: "https://www.isdin.com/es/blog/rutina-piel-sensible/", src: "ISDIN", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=640&q=70" },
  { tag: "SPF", t: "La t\xE9cnica del 'sunscreen sandwich'", sub: "C\xF3mo aplicar el SPF para que proteja de verdad.", link: "https://www.hola.com/us-es/belleza/20260526903709/tecnica-sunscreen-sandwich-aplicacion-proteccion-solar-spf/", src: "HOLA", img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=640&q=70" },
  { tag: "M\xE1s solicitados", t: "Los tratamientos m\xE1s solicitados del a\xF1o", sub: "\xC1cido hialur\xF3nico, hilos y b\xF3tox suave lideran.", link: "https://clinicamedivas.es/tratamientos-de-medicina-estetica-mas-solicitados-en-2025", src: "Medivas", img: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=640&q=70" },
  { tag: "Armonizaci\xF3n", t: "Armonizaci\xF3n facial: menos es m\xE1s", sub: "El equilibrio de rasgos por sobre el volumen.", link: "https://www.vogue.es/belleza/articulos/armonizacion-facial-tendencia", src: "Vogue", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=640&q=70" },
  { tag: "Skinbooster", t: "Skinboosters: hidrataci\xF3n que se ve y se siente", sub: "Luminosidad y calidad de piel desde adentro.", link: "https://www.elle.com/es/belleza/cara-cuerpo/skinbooster-hidratacion", src: "Elle", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=640&q=70" },
  { tag: "Prevenci\xF3n", t: "Prejuvenation: prevenir antes que corregir", sub: "Por qu\xE9 los tratamientos empiezan antes.", link: "https://www.harpersbazaar.com/es/belleza/prejuvenation", src: "Harper's Bazaar", img: "https://images.unsplash.com/photo-1512291313931-d4291048e7b6?auto=format&fit=crop&w=640&q=70" },
  { tag: "Labios", t: "Labios naturales: la t\xE9cnica del 'lip refresh'", sub: "Definici\xF3n sutil sin perder naturalidad.", link: "https://www.cosmopolitan.com/es/belleza/cara-cuerpo/lip-refresh", src: "Cosmopolitan", img: "https://images.unsplash.com/photo-1599842057874-37393e9342df?auto=format&fit=crop&w=640&q=70" },
  { tag: "Cuello", t: "El cuello, la nueva prioridad antiedad", sub: "Bioestimulaci\xF3n y toxina para el tercio inferior.", link: "https://www.glamour.es/belleza/cuidado-facial/cuello-antiedad", src: "Glamour", img: "https://images.unsplash.com/photo-1614436163996-25cee5f54290?auto=format&fit=crop&w=640&q=70" },
  { tag: "Hombres", t: "Est\xE9tica masculina: crecimiento sostenido", sub: "Mand\xEDbula, b\xF3tox preventivo y skincare.", link: "https://www.gq.com.mx/cuidado-personal/articulo/medicina-estetica-hombres", src: "GQ", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=70" }
];
function dayIndex() {
  return Math.floor((Date.now() - 5 * 36e5) / 864e5);
}
function dailyRotate(arr, n) {
  if (!arr.length) return [];
  const start = (dayIndex() % arr.length + arr.length) % arr.length;
  const out = [];
  for (let i = 0; i < Math.min(n, arr.length); i++) out.push(arr[(start + i) % arr.length]);
  return out;
}
function cycleRotate(arr, n, hours) {
  if (!arr.length) return [];
  const idx = Math.floor(Date.now() / ((hours || 24) * 36e5));
  const start = idx % arr.length;
  const out = [];
  for (let i = 0; i < Math.min(n, arr.length); i++) out.push(arr[(start + i) % arr.length]);
  return out;
}
function fmtK(n) {
  n = +n || 0;
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(".0", "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(".0", "") + "k";
  return "" + n;
}
function VideosHub({ T, onBack, openBooking }) {
  return /* @__PURE__ */ React.createElement(ReelsView, { T, onBack, openBooking });
}
function FeedHubScreen({ T, D, go, openBooking, onBack }) {
  const [view, setView] = useState(null);
  if (view === "videos") return /* @__PURE__ */ React.createElement(VideosHub, { T, onBack: () => setView(null), openBooking });
  if (view === "noticias") return /* @__PURE__ */ React.createElement(NewsView, { T, onBack: () => setView(null) });
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ScreenTop, { T, eyebrow: "@medique.cl \xB7 contenido", title: "Videos y noticias", onBack }), /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 20px 24px", display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setView("noticias"), style: { textAlign: "left", cursor: "pointer", padding: 0, border: "1px solid " + T.line, borderRadius: 8, overflow: "hidden", background: T.surface } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: 150 } }, /* @__PURE__ */ React.createElement("img", { src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=720&q=70", alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(13,13,13,.2),rgba(13,13,13,.82))" } }), /* @__PURE__ */ React.createElement("svg", { width: "34", height: "34", viewBox: "0 0 24 24", fill: "none", stroke: "#F2EDE6", strokeWidth: "1.4", style: { position: "absolute", left: 16, top: 16, opacity: 0.9 } }, /* @__PURE__ */ React.createElement("path", { d: "M4 5h16v14H4zM8 9h8M8 13h8M8 17h5" }))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 18px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Opci\xF3n 1"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, color: T.text, marginTop: 4 } }, "Ver noticias"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 4 } }, "15 novedades seleccionadas, se renuevan cada 48 horas."))), /* @__PURE__ */ React.createElement("button", { onClick: () => setView("videos"), style: { textAlign: "left", cursor: "pointer", padding: 0, border: "1px solid " + T.line, borderRadius: 8, overflow: "hidden", background: T.surface } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: 150 } }, /* @__PURE__ */ React.createElement("img", { src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=720&q=70", alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(13,13,13,.2),rgba(13,13,13,.82))" } }), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: "50%", top: "44%", transform: "translate(-50%,-50%)", width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,.16)", backdropFilter: "blur(4px)", border: "1.5px solid rgba(242,237,230,.6)", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "#F2EDE6" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" })))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 18px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.gold } }, "Opci\xF3n 2"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, color: T.text, marginTop: 4 } }, "Ver videos"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 4 } }, "3 categor\xEDas: Medicina Est\xE9tica, Salud y P\xE9rdida de peso.")))));
}
function OpinionModal({ T, onClose }) {
  const QS = [
    { q: "\xBFC\xF3mo calificar\xEDas la atenci\xF3n de JC Medical?", o: ["Excelente", "Buena", "Regular", "A\xFAn no me atiendo"] },
    { q: "\xBFQu\xE9 tratamientos te interesan?", o: ["B\xF3tox", "\xC1cido hialur\xF3nico", "Bioestimulaci\xF3n", "Skincare", "Regeneraci\xF3n"] },
    { q: "\xBFQu\xE9 te gustar\xEDa ver m\xE1s en este feed?", o: ["Antes y despu\xE9s", "Educativo", "Precios y promos", "Detr\xE1s de c\xE1mara"] }
  ];
  const [ans, setAns] = useState(QS.map(() => []));
  const [sent, setSent] = useState(false);
  function toggle(qi, opt) {
    setAns((a) => a.map((arr, i) => i !== qi ? arr : arr.includes(opt) ? arr.filter((x) => x !== opt) : arr.concat([opt])));
  }
  function send() {
    try {
      const all = window.DB.get("feedback") || [];
      all.push({ t: (/* @__PURE__ */ new Date()).toISOString(), ans: QS.map((q, i) => ({ q: q.q, a: ans[i] })) });
      window.DB.set("feedback", all);
    } catch (e) {
    }
    setSent(true);
    setTimeout(onClose, 1400);
  }
  return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, zIndex: 60, background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { width: "100%", maxHeight: "88%", overflowY: "auto", background: T.bg, borderRadius: "18px 18px 0 0", border: "1px solid " + T.line, padding: "20px 20px 26px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Encuesta \xB7 30 segundos"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 26, color: T.text, marginTop: 6, lineHeight: 1.1 } }, "D\xE9janos tu opini\xF3n,", /* @__PURE__ */ React.createElement("br", null), "tu opini\xF3n nos importa")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", color: T.textMute, cursor: "pointer", padding: 4 } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), sent ? /* @__PURE__ */ React.createElement("div", { style: { padding: "30px 0", textAlign: "center", fontFamily: T.serif, fontSize: 22, color: T.text } }, "\xA1Gracias!", /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 8 } }, "Tu opini\xF3n nos ayuda a mejorar.")) : /* @__PURE__ */ React.createElement("div", null, QS.map((qq, qi) => /* @__PURE__ */ React.createElement("div", { key: qi, style: { marginTop: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text, marginBottom: 10 } }, qq.q), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, qq.o.map((opt) => {
    const on = ans[qi].includes(opt);
    return /* @__PURE__ */ React.createElement("button", { key: opt, onClick: () => toggle(qi, opt), style: { fontFamily: T.sans, fontSize: 12.5, color: on ? T.onAccent : T.text, background: on ? T.accent : T.chipBg, border: "1px solid " + (on ? T.accent : T.chipBorder), borderRadius: 999, padding: "9px 14px", cursor: "pointer" } }, opt);
  })))), /* @__PURE__ */ React.createElement("button", { onClick: send, style: { marginTop: 22, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", padding: "15px", borderRadius: 4, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" } }, "Enviar opini\xF3n"))));
}
function ReelsView({ T, onBack, openBooking, category }) {
  let base = JC_REELS.slice();
  const list = dailyRotate(base, base.length).concat(dailyRotate(base, base.length));
  const catLabel = (VIDEO_CATS.find((c) => c.k === category) || {}).l;
  const [playing, setPlaying] = useState(null);
  const [opinion, setOpinion] = useState(false);
  const [stats, setStats] = useState(null);
  const lang = (() => {
    try {
      return (navigator.language || "es").toLowerCase().indexOf("es") === 0 ? "sub" : "original";
    } catch (e) {
      return "sub";
    }
  })();
  const lastTap = useRef(0);
  useEffect(() => {
    try {
      const key = window.DB && window.DB.cfg && window.DB.cfg().yt_api_key || "";
      if (!key || !window.jcmYTStats) return;
      window.jcmYTStats(base.map((v) => v.id), key).then((m) => {
        if (m) setStats(m);
      }).catch(() => {
      });
    } catch (e) {
    }
  }, []);
  function statOf(v) {
    const s = stats && stats[v.id];
    return { likes: s && s.likes ? s.likes : v.likes, views: s && s.views ? s.views : v.views };
  }
  function langParams() {
    return lang === "sub" ? "&cc_load_policy=1&cc_lang_pref=es&hl=es" : "&hl=en";
  }
  function onFrameTap(i) {
    if (playing !== i) setPlaying(i);
  }
  const glass = { background: "rgba(255,255,255,.14)", backdropFilter: "blur(8px)", border: "1px solid rgba(242,237,230,.4)", color: "#F2EDE6" };
  return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "#000", zIndex: 20, display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 10, left: 12, zIndex: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { display: "inline-flex", alignItems: "center", gap: 6, ...glass, borderRadius: 999, padding: "8px 13px", cursor: "pointer", fontFamily: T.sans, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), "Volver")), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", scrollSnapType: "y mandatory" } }, list.map((v, i) => /* @__PURE__ */ React.createElement("div", { key: i, onClick: () => onFrameTap(i), style: { position: "relative", height: "100%", minHeight: 480, scrollSnapAlign: "start", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: playing === i ? "default" : "pointer" } }, playing === i ? /* @__PURE__ */ React.createElement("iframe", { src: "https://www.youtube.com/embed/" + v.id + "?autoplay=1&playsinline=1&rel=0&controls=1&fs=1&modestbranding=1" + langParams(), title: v.t, allow: "autoplay; encrypted-media; fullscreen; picture-in-picture", allowFullScreen: true, style: { width: "100%", height: "100%", border: 0 } }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("img", { src: "https://img.youtube.com/vi/" + v.id + "/hqdefault.jpg", alt: v.t, style: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.82 } }), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: "44%", left: "50%", transform: "translate(-50%,-50%)", width: 64, height: 64, borderRadius: "50%", ...glass, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "#fff" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" }))), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", right: 12, bottom: 100, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", color: "#fff", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "#fff" }, /* @__PURE__ */ React.createElement("path", { d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, marginTop: 2 } }, fmtK(statOf(v).likes))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, marginTop: 2 } }, fmtK(statOf(v).views)))), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 16, right: 70, bottom: 92, color: "#fff", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, opacity: 0.85 } }, "@medique.cl \xB7 ", v.src), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, lineHeight: 1.1, marginTop: 4, textShadow: "0 2px 12px rgba(0,0,0,.7)" } }, v.t)), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    setOpinion(true);
  }, style: { position: "absolute", left: 16, bottom: 40, pointerEvents: "auto", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", ...glass, borderRadius: 999, padding: "10px 16px", cursor: "pointer" } }, "D\xE9janos tu opini\xF3n"))))), opinion && /* @__PURE__ */ React.createElement(OpinionModal, { T, onClose: () => setOpinion(false) }));
}
function NewsView({ T, onBack }) {
  const list = cycleRotate(JC_NEWS, 15, 48);
  const [reading, setReading] = useState(null);
  if (reading) {
    return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: T.bg, zIndex: 25, display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: "1px solid " + T.line, background: T.navBg } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setReading(null), style: { display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), "Noticias"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, textAlign: "center", fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, "Fuente: ", reading.src)), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto" } }, /* @__PURE__ */ React.createElement("img", { src: reading.img, alt: "", style: { width: "100%", height: 220, objectFit: "cover", display: "block" } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 22px 30px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent } }, reading.tag, " \xB7 ", reading.src), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 400, fontSize: 27, lineHeight: 1.12, color: T.text, margin: "8px 0 12px" } }, reading.t), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: T.textMute } }, reading.sub), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 300, lineHeight: 1.7, color: T.textFaint, marginTop: 14 } }, "Vista previa. El art\xEDculo completo est\xE1 en el sitio de ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text, fontWeight: 500 } }, reading.src), "."), /* @__PURE__ */ React.createElement("a", { href: reading.link, target: "_blank", rel: "noopener", style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20, fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: T.primaryText, background: T.primaryBg, borderRadius: 3, padding: "15px 26px", textDecoration: "none" } }, "Leer art\xEDculo completo", /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M7 17 17 7M9 7h8v8" }))))));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, zIndex: 25, background: T.bg, display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement(FixedBack, { T, onBack }), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", paddingTop: 36 } }, /* @__PURE__ */ React.createElement(ScreenTop, { T, eyebrow: "Novedades del mes", title: "Noticias" }), /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 18px 24px", display: "flex", flexDirection: "column", gap: 16 } }, list.map((a, i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => setReading(a), style: { textAlign: "left", cursor: "pointer", padding: 0, textDecoration: "none", borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line, background: T.surface, display: "block", width: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: 180 } }, /* @__PURE__ */ React.createElement("img", { src: a.img, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, loading: "lazy" }), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 12, top: 12, fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#F2EDE6", background: "rgba(10,10,10,.55)", border: "1px solid rgba(242,237,230,.2)", borderRadius: 999, padding: "6px 11px" } }, a.tag)), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent } }, a.src), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.text, lineHeight: 1.12, marginTop: 5 } }, a.t), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 6, lineHeight: 1.5 } }, a.sub), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, marginTop: 10 } }, "Leer m\xE1s \u2192")))))));
}
function FixedBack({ T, onBack }) {
  return /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { position: "absolute", top: 12, left: 12, zIndex: 8, display: "inline-flex", alignItems: "center", gap: 6, background: T.dark ? "rgba(16,19,26,.6)" : "rgba(255,255,255,.6)", backdropFilter: "blur(16px) saturate(1.3)", WebkitBackdropFilter: "blur(16px) saturate(1.3)", border: "1px solid " + (T.dark ? "rgba(255,255,255,.12)" : "rgba(20,20,15,.1)"), cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", padding: "8px 14px 8px 11px", borderRadius: 999, boxShadow: "0 6px 18px -8px rgba(0,0,0,.4)" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), "Volver");
}
Object.assign(window, { AssistantScreen, GamesScreen, ProfileScreen, FeedHubScreen, ReelsView, NewsView, VideosHub, SorteoView, ColaboraSheet, GLOW, FixedBack });
