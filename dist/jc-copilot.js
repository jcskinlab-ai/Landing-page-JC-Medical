const FACIAL_SYS = [
  "Eres el Copiloto de Evaluaci\xF3n Facial de JC Medical (Talca, Chile), del enfermero universitario Juan Claudio Parra. Respondes SIEMPRE en espa\xF1ol de Chile: claro, profesional y cercano.",
  "Eres un especialista virtual en an\xE1lisis fotogr\xE1fico de medicina est\xE9tica facial: toxina botul\xEDnica, rellenos, bioestimuladores, calidad de piel (skin quality), rinomodelaci\xF3n y procedimientos perioculares.",
  "Act\xFAas como analista cl\xEDnico RIGUROSO. Nunca asumes resultados positivos ni negativos sin evidencia; nunca afirmas una complicaci\xF3n si la evidencia es insuficiente.",
  "Cuando te compartan o describan fotos antes/despu\xE9s, sigue esta metodolog\xEDa: 1) Validaci\xF3n fotogr\xE1fica (\xE1ngulo cef\xE1lico, rotaci\xF3n/inclinaci\xF3n de cabeza, distancia y zoom, perspectiva, iluminaci\xF3n y sombras, expresi\xF3n, apertura ocular, posici\xF3n mandibular) e indica cu\xE1nto afecta cada factor. 2) Sistema de referencia anat\xF3mica (l\xEDnea media, dorso y punta nasal, glabela, cantos internos/externos, pupilas, comisuras, arcos supraorbitarios) \u2014 describe una malla facial virtual. 3) Medici\xF3n relativa estimada: MRD1, MRD2, apertura palpebral, distancia ceja-p\xE1rpado, altura de ceja medial/central/lateral, simetr\xEDa ocular y de cejas, en mm estimados + % de cambio + nivel de confianza. 4) Frente (l\xEDneas horizontales, reclutamiento/compensaci\xF3n frontal, actividad residual, escala 0-3). 5) Glabela (corrugador, pr\xF3cer, depresor superciliar). 6) Periocular (patas de gallo, apertura, edema, ptosis). 7) Detecci\xF3n de ptosis: A sin ptosis / B pesadez subjetiva / C descenso de ceja / D ptosis palpebral verdadera / E combinada, con probabilidad %. 8) Diferenciar cambio real vs fotogr\xE1fico vs mixto (%). 9) Describir un overlay cl\xEDnico (ejes, pupilas, cejas, flechas de desplazamiento). 10) Conclusi\xF3n: resumen ejecutivo por zona (frente, entrecejo, patas de gallo, cejas, p\xE1rpados), riesgo de ptosis (%), y conclusi\xF3n cl\xEDnica.",
  'REGLA CR\xCDTICA: cierra todo an\xE1lisis de fotos con: "Las mediciones son estimaciones visuales derivadas de fotograf\xEDas cl\xEDnicas y no reemplazan mediciones presenciales estandarizadas."',
  "Si te hacen una pregunta puntual (qu\xE9 es MRD1, c\xF3mo diferenciar ptosis de descenso de ceja, cu\xE1ndo evaluar el resultado, c\xF3mo estandarizar la foto), responde directo y conciso, sin recitar toda la metodolog\xEDa. S\xE9 intuitivo: ve a lo que se pregunta."
].join("\n");
const FACIAL_KB = [
  { k: ["mrd1", "margin reflex", "reflejo margen"], a: "MRD1 (Margin Reflex Distance 1) = distancia desde el reflejo luminoso corneal (centro pupilar) al borde del p\xE1rpado superior, mirando al frente.\n\n\u2022 Normal: ~4\u20135 mm\n\u2022 <2 mm: sugiere ptosis palpebral\n\nEs la medida clave para detectar ptosis tras toxina: si baja respecto al basal, hay descenso del p\xE1rpado superior. M\xEDdelo en reposo y compara ambos ojos." },
  { k: ["mrd2"], a: "MRD2 (Margin Reflex Distance 2) = distancia desde el reflejo corneal al borde del p\xE1rpado INFERIOR.\n\n\u2022 Normal: ~5 mm\n\nJunto con MRD1 define la apertura palpebral (fisura): MRD1 + MRD2 \u2248 9\u201310 mm normal. \xDAtil para evaluar retracci\xF3n o escleral show." },
  { k: ["apertura palpebral", "fisura palpebral", "abertura ocular", "altura del ojo"], a: "La apertura/fisura palpebral = MRD1 + MRD2 (\u2248 9\u201310 mm normal).\n\nPara evaluarla en foto: marca el reflejo corneal, mide al borde superior (MRD1) y al inferior (MRD2). Compara lado a lado. Una reducci\xF3n sim\xE9trica leve puede ser fotogr\xE1fica; una asim\xE9trica con MRD1 disminuido orienta a ptosis." },
  {
    k: ["ptosis palpebral", "parpado caido", "p\xE1rpado ca\xEDdo", "ptosis verdadera", "elevador"],
    a: "PTOSIS PALPEBRAL VERDADERA: ca\xEDda del p\xE1rpado superior por debilidad del m\xFAsculo elevador. En toxina ocurre por difusi\xF3n al elevador (sobre todo si se infiltra muy bajo o medial en el frontal/glabela).\n\nSignos:\n\u2022 MRD1 disminuido (a veces <2 mm)\n\u2022 El pliegue palpebral puede elevarse\n\u2022 El paciente eleva el frontal para compensar (cejas arqueadas)\n\u2022 Aparece a los 3\u201314 d\xEDas, transitoria (semanas)\n\nDifer\xE9nciala del descenso de ceja: en la ptosis palpebral, levantar manualmente la ceja NO normaliza el MRD1."
  },
  {
    k: ["pseudoptosis", "falsa ptosis", "pseudo ptosis"],
    a: "PSEUDOPTOSIS: el p\xE1rpado PARECE ca\xEDdo pero el elevador funciona bien. Causas: exceso de piel (dermatocalasia), descenso de ceja que empuja el p\xE1rpado, hipoglobo/enoftalmo, hipotrop\xEDa.\n\nClave diagn\xF3stica: al elevar manualmente la ceja o la piel sobrante, el MRD1 se normaliza \u2192 NO es ptosis verdadera. Importante para no atribuir a la toxina algo que es anat\xF3mico o por la ceja."
  },
  {
    k: ["descenso de ceja", "ceja caida", "ceja ca\xEDda", "brow ptosis", "ceja baja", "pesadez"],
    a: 'DESCENSO DE CEJA (brow ptosis): la ceja baja \u2014t\xEDpicamente la cola/lateral\u2014 por exceso de toxina en el FRONTAL (\xFAnico elevador de la ceja) sin equilibrar con los depresores. Da sensaci\xF3n de "pesadez".\n\nDifer\xE9nciala de la ptosis palpebral:\n\u2022 MRD1 suele estar NORMAL\n\u2022 Disminuye la distancia ceja\u2013p\xE1rpado\n\u2022 Al levantar la ceja con el dedo, la mirada "se abre"\n\nManejo: equilibrar depresores (cola de ceja con orbicular lateral) en la siguiente sesi\xF3n; ajustar dosis frontal. Es percepci\xF3n frecuente cuando se relaja mucho la frente.'
  },
  {
    k: ["compensacion frontal", "compensaci\xF3n frontal", "reclutamiento", "frontal compensa"],
    a: 'COMPENSACI\xD3N/RECLUTAMIENTO FRONTAL: cuando hay una ptosis basal leve, el frontal eleva las cejas de forma cr\xF3nica para "abrir" la mirada. Si tratas el frontal en exceso, se pierde esa compensaci\xF3n y aflora la pesadez o una ptosis que antes estaba enmascarada.\n\nPor eso conviene evaluar SIEMPRE la frente en reposo y en m\xE1xima elevaci\xF3n antes de infiltrar, y ser conservador en frontal cuando ves cejas muy arqueadas en reposo.'
  },
  {
    k: ["diferenciar real", "fotografico", "fotogr\xE1fico", "cambio real", "es real o foto", "real vs"],
    a: "CAMBIO REAL vs FOTOGR\xC1FICO: antes de concluir, descarta artefactos. Sospecha componente fotogr\xE1fico si entre ambas tomas cambian: \xE1ngulo/rotaci\xF3n de cabeza, altura de c\xE1mara, distancia/zoom (la cercan\xEDa distorsiona), iluminaci\xF3n (sombras que simulan arrugas o volumen) o la expresi\xF3n.\n\nAsigna un porcentaje (ej. 70% real / 30% fotogr\xE1fico) y baja el nivel de confianza cuando las condiciones no son comparables. Solo son comparables fotos con el mismo encuadre, luz y gesto."
  },
  {
    k: ["tomar la foto", "estandarizar", "fotografia clinica", "fotograf\xEDa cl\xEDnica", "como fotografiar", "encuadre", "registro fotografico"],
    a: "FOTO ESTANDARIZADA (para que el antes/despu\xE9s sea v\xE1lido):\n\u2022 C\xE1mara a la altura de los ojos, plano de Frankfort horizontal\n\u2022 Misma distancia, sin zoom digital (usa retroceso, no acercar)\n\u2022 Iluminaci\xF3n frontal homog\xE9nea, fondo neutro\n\u2022 Sin maquillaje, pelo retirado de la frente\n\u2022 3 gestos: reposo, m\xE1xima elevaci\xF3n de frente, ce\xF1o fruncido (y sonrisa forzada para patas de gallo)\n\u2022 Mismo encuadre antes/despu\xE9s\n\nConsejo: marca puntos de referencia (pupilas, comisuras) para alinear ambas tomas."
  },
  {
    k: ["cuando evaluar", "cu\xE1ndo evaluar", "control", "dia 14", "d\xEDa 14", "21 dias", "21 d\xEDas", "resultado botox", "cuanto tarda"],
    a: 'EVALUACI\xD3N DEL RESULTADO DE TOXINA:\n\u2022 Inicio del efecto: 3\u20137 d\xEDas\n\u2022 Efecto M\xC1XIMO: ~d\xEDa 14\n\u2022 Control y retoque: d\xEDa 14\u201321 (antes es prematuro juzgar)\n\nNunca concluyas "no funcion\xF3" antes del d\xEDa 14. Para comparar, repite la foto en las mismas condiciones del basal.'
  },
  {
    k: ["ptosis por botox", "manejo ptosis", "apraclonidina", "iopidina", "gotas", "tratar ptosis", "corregir ptosis"],
    a: "PTOSIS PALPEBRAL POR TOXINA (transitoria): manejo de referencia\n\u2022 Apraclonidina 0,5% (Iopidina) en gotas: estimula el m\xFAsculo de M\xFCller (\u03B1-adren\xE9rgico) y eleva el p\xE1rpado 1\u20132 mm mientras pasa el efecto\n\u2022 Alternativa: fenilefrina 2,5%\n\u2022 Tranquilizar: es transitoria (semanas), no permanente\n\nPrevenci\xF3n: no infiltrar muy bajo/medial en el frontal, respetar \u22651 cm sobre el reborde orbitario, dosis adecuadas en glabela.\n\n(Informaci\xF3n de referencia cl\xEDnica; la indicaci\xF3n es presencial.)"
  },
  {
    k: ["patas de gallo", "orbicular", "periocular", "arrugas ojos", "canto externo"],
    a: "PATAS DE GALLO (orbicular periocular): eval\xFAa en sonrisa forzada (m\xE1xima din\xE1mica). Clasifica: 0 sin cambio / 1 leve / 2 moderada / 3 gran mejor\xEDa.\n\nOjo con el edema malar y la posible elevaci\xF3n/ca\xEDda del canto. Si infiltras muy abajo puedes afectar el cigom\xE1tico mayor (sonrisa asim\xE9trica): mant\xE9n los puntos laterales y altos respecto al arco."
  },
  {
    k: ["glabela", "entrecejo", "corrugador", "procer", "pr\xF3cer", "ce\xF1o", "depresor superciliar"],
    a: 'GLABELA (entrecejo): m\xFAsculos a evaluar \u2014 corrugador (tira la ceja medial hacia adentro/abajo), pr\xF3cer (l\xEDneas horizontales del puente nasal) y depresor superciliar.\n\nEval\xFAa en ce\xF1o m\xE1ximo: persistencia de l\xEDneas, relajaci\xF3n y simetr\xEDa. La glabela mal balanceada o muy baja se asocia a riesgo de ptosis palpebral por difusi\xF3n al elevador. Busca tambi\xE9n el efecto "Spock" (cola de ceja elevada) por frontal sin tratar la cola.'
  },
  {
    k: ["frente", "frontal", "lineas horizontales", "l\xEDneas horizontales", "arrugas frente"],
    a: "FRENTE (frontal): \xFAnico elevador de las cejas. Eval\xFAa en m\xE1xima elevaci\xF3n: l\xEDneas horizontales, reclutamiento, compensaci\xF3n y actividad residual. Escala 0\u20133.\n\nS\xE9 conservador: tratar de m\xE1s baja las cejas (pesadez). Deja algo de movimiento superior y equilibra con glabela para evitar ca\xEDda de cola de ceja."
  },
  {
    k: ["cejas", "posicion ceja", "posici\xF3n ceja", "altura de ceja", "brow lift", "levantar cejas", "cola de ceja"],
    a: 'POSICI\xD3N DE CEJAS: mide altura medial, central y lateral respecto a una l\xEDnea de referencia (ej. pupila o reborde orbitario) y compara lados.\n\n\u2022 Chemical brow lift: relajar depresores (cola de ceja, glabela) eleva la cola 1\u20133 mm\n\u2022 Asimetr\xEDa: nota cu\xE1l sube/baja y cu\xE1nto (mm estimados, % y confianza)\n\u2022 Tras frontal: vigila descenso de cola ("pesadez") y efecto Spock'
  },
  {
    k: ["simetria", "simetr\xEDa", "asimetria", "asimetr\xEDa", "un lado mas", "desigual"],
    a: "SIMETR\xCDA: muchas asimetr\xEDas son BASALES (preexistentes) \u2014 docum\xE9ntalas con foto ANTES de tratar y mu\xE9straselas al paciente. En el an\xE1lisis, separa la asimetr\xEDa basal de la inducida por el tratamiento.\n\nUsa la l\xEDnea media facial y referencias pareadas (pupilas, cantos, comisuras, altura de ceja) para cuantificar el lado y los mm de diferencia, con su nivel de confianza."
  },
  {
    k: ["edema", "hinchazon", "hinchaz\xF3n", "inflamacion", "inflamaci\xF3n", "bolsa"],
    a: "EDEMA vs PTOSIS/cambio: el edema periocular post-infiltraci\xF3n puede simular pesadez o cerrar la mirada los primeros d\xEDas. Es transitorio (24\u201372 h habitualmente). No lo confundas con ptosis: el edema no reduce el MRD1 de forma sostenida y mejora solo. Reeval\xFAa con foto al d\xEDa 14."
  },
  {
    k: ["metodologia", "metodolog\xEDa", "como analizas", "c\xF3mo analizas", "informe", "como funciona", "que haces", "qu\xE9 haces"],
    a: "Mi an\xE1lisis sigue 10 pasos: 1) validaci\xF3n fotogr\xE1fica, 2) referencias anat\xF3micas (malla facial), 3) medici\xF3n relativa (MRD1/MRD2, apertura, ceja\u2013p\xE1rpado, simetr\xEDa) en mm + % + confianza, 4) frente, 5) glabela, 6) periocular, 7) detecci\xF3n de ptosis (sin/pesadez/descenso ceja/palpebral/combinada con %), 8) real vs fotogr\xE1fico, 9) overlay de referencia, 10) conclusi\xF3n por zona + riesgo de ptosis.\n\nPara empezar, descr\xEDbeme las fotos (o p\xE1samelas) y el procedimiento realizado. Tambi\xE9n respondo dudas puntuales: preg\xFAntame por MRD1, ptosis vs descenso de ceja, c\xF3mo estandarizar la foto, etc."
  }
];
function _facialNorm(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function facialAnswer(q) {
  const n = _facialNorm(q);
  let best = null, score = 0;
  FACIAL_KB.forEach((e) => {
    let s = 0;
    e.k.forEach((kw) => {
      if (n.indexOf(_facialNorm(kw)) >= 0) s += kw.length > 4 ? 2 : 1;
    });
    if (s > score) {
      score = s;
      best = e;
    }
  });
  return score >= 1 ? best.a : null;
}
function Copilot({ T, patients, appts, addAppt, onDarCita }) {
  const D = window.JCDATA;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "Hola Juan Claudio \u{1F44B} Soy tu copiloto cl\xEDnico. Puedo:\n\u2022 Agendar por voz o texto: \xABAgenda a Mar\xEDa botox ma\xF1ana a las 11\xBB.\n\u2022 Darte la auditor\xEDa del mes: escribe \xABauditor\xEDa\xBB.\n\u2022 Analizar evaluaci\xF3n facial (ptosis, cejas, MRD1/MRD2, simetr\xEDa).\n\n\xBFQu\xE9 necesitas?" }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [pos, setPos] = useState({ bottom: 20, right: 20 });
  const scRef = useRef(null);
  const recRef = useRef(null);
  function onFabDown(e) {
    const isTouch = e.type === "touchstart";
    const startX = isTouch ? e.touches[0].clientX : e.clientX;
    const startY = isTouch ? e.touches[0].clientY : e.clientY;
    const startRight = pos.right, startBottom = pos.bottom;
    let moved = false;
    function onMove(ev) {
      const cx = isTouch ? ev.touches[0].clientX : ev.clientX;
      const cy = isTouch ? ev.touches[0].clientY : ev.clientY;
      if (Math.abs(cx - startX) > 4 || Math.abs(cy - startY) > 4) moved = true;
      if (moved) {
        const vw = window.innerWidth, vh = window.innerHeight;
        setPos({ right: Math.min(vw - 64, Math.max(8, startRight - (cx - startX))), bottom: Math.min(vh - 64, Math.max(8, startBottom - (cy - startY))) });
      }
    }
    function onUp() {
      document.removeEventListener(isTouch ? "touchmove" : "mousemove", onMove);
      document.removeEventListener(isTouch ? "touchend" : "mouseup", onUp);
      if (!moved) setOpen((o) => !o);
    }
    document.addEventListener(isTouch ? "touchmove" : "mousemove", onMove, { passive: false });
    document.addEventListener(isTouch ? "touchend" : "mouseup", onUp);
    e.preventDefault();
  }
  function ctx() {
    let n = 0;
    D.catalog.forEach((s) => s.groups.forEach((g) => n += g.items.length));
    const hoy = appts.filter((a) => a.day === 0).map((a) => a.time + " " + a.name + " (" + a.proc + ")").join("; ");
    const pend = patients.filter((p) => !p.consent).map((p) => p.name).join(", ");
    return "Cat\xE1logo: " + n + " procedimientos. Citas de hoy: " + (hoy || "ninguna") + ". Pacientes: " + patients.map((p) => p.name).join(", ") + ". Consentimientos pendientes: " + (pend || "ninguno") + ".";
  }
  function procFromText(t) {
    let found = null;
    D.catalog.forEach((s) => s.groups.forEach((g) => g.items.forEach((it) => {
      if (!found && t.indexOf(it.n.toLowerCase()) >= 0) found = it.n;
    })));
    if (found) return found;
    if (/botox|toxina/.test(t)) return "Botox 3 zonas";
    if (/rino/.test(t)) return "Rinomodelaci\xF3n";
    if (/sculptra|bioestim|col[áa]geno/.test(t)) return "Bioestimulaci\xF3n de col\xE1geno facial";
    if (/relleno|hialur[óo]nico|labio|p[óo]mulo|ment[óo]n/.test(t)) return "Realce de p\xF3mulos";
    if (/eval/.test(t)) return "Evaluaci\xF3n general";
    return null;
  }
  function extractPatientName(text) {
    const m = (text || "").match(/(?:agenda(?:r|me|le)?|ag[eé]nda\w*|reserva(?:r|me|le)?|res[eé]rva\w*|anota(?:r|me|le)?|an[oó]ta\w*|cita)\s+(?:a\s+|para\s+|al\s+)?([a-zA-ZáéíóúñÁÉÍÓÚÑ]+(?:\s+[a-zA-ZáéíóúñÁÉÍÓÚÑ]+){0,3})/i);
    if (!m) return "";
    const STOP = ["para", "el", "la", "los", "las", "manana", "hoy", "pasado", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo", "las", "con", "procedimiento", "proc", "botox", "toxina", "relleno", "rino", "rinomodelacion", "sculptra", "bioestim", "bioestimulacion", "colageno", "evaluacion", "hialuronico", "labio", "pomulo", "menton", "de", "del", "y", "una", "un"];
    const out = [];
    for (const w of m[1].split(/\s+/)) {
      const wn = _facialNorm(w);
      if (STOP.indexOf(wn) >= 0) break;
      out.push(w);
    }
    return out.join(" ").trim();
  }
  function matchPatient(name) {
    const dn = (name || "").toLowerCase().trim();
    if (dn.length < 3) return null;
    let p = patients.find((x) => {
      const pn = x.name.toLowerCase();
      return pn === dn || pn.indexOf(dn) >= 0 || dn.indexOf(pn) >= 0;
    });
    if (p) return p;
    const parts = dn.split(/\s+/);
    if (parts.length >= 2) {
      p = patients.find((x) => {
        const pp = x.name.toLowerCase().split(/\s+/);
        return pp[0] === parts[0] && pp.indexOf(parts[1]) >= 0;
      });
    }
    return p || null;
  }
  function trySchedule(text) {
    const t = text.toLowerCase();
    if (!/\b(agenda|agendar|agéndame|agendame|cita|reserva|res[ée]rvame|anota|an[óo]tame)\b/.test(t)) return null;
    const proc = procFromText(t);
    const dictName = extractPatientName(text);
    let pat = matchPatient(dictName);
    let day = 0, dayLbl = "hoy";
    if (/mañana|manana/.test(t)) {
      day = 1;
      dayLbl = "ma\xF1ana";
    } else if (/pasado/.test(t)) {
      day = 2;
      dayLbl = "pasado ma\xF1ana";
    } else {
      const wds = ["domingo", "lunes", "martes", "mi\xE9rcoles", "jueves", "viernes", "s\xE1bado"];
      const today = (/* @__PURE__ */ new Date()).getDay();
      for (let i = 0; i < 7; i++) {
        const nm = wds[i].replace(/[éá]/g, (m) => ({ "\xE9": "e", "\xE1": "a" })[m]);
        if (t.indexOf(wds[i]) >= 0 || t.indexOf(nm) >= 0) {
          let off = (i - today + 7) % 7;
          if (off === 0) off = 7;
          day = off;
          dayLbl = wds[i];
          break;
        }
      }
    }
    let time = null;
    const tm = t.match(/\b(\d{1,2})(?::|\.|h|:)?(\d{2})?\s*(am|pm|hrs?|horas?)?\b/);
    if (tm) {
      let h = parseInt(tm[1], 10);
      const mm = tm[2] || "00";
      if (/pm/.test(tm[3] || "") && h < 12) h += 12;
      if (h >= 8 && h <= 21) time = (h < 10 ? "0" + h : h) + ":" + mm;
    }
    if (!proc && !time) return null;
    if (!proc) return "Entend\xED que quieres agendar, pero no detect\xE9 el procedimiento. Ejemplo: \xABAgenda a " + (pat ? pat.name.split(" ")[0] : "Mar\xEDa") + " botox ma\xF1ana a las 11\xBB.";
    if (!time) return "Detect\xE9 el procedimiento (" + proc + ") pero no la hora. Dime la hora, por ejemplo: \xAB\u2026 a las 11:30\xBB.";
    const name = pat ? pat.name : dictName;
    if (onDarCita) onDarCita({ proc, time, day, patId: pat ? pat.id : "", patName: name });
    return "Abr\xED el formulario \xABDar cita\xBB con lo que entend\xED: " + proc + (name ? " \xB7 " + name : "") + " \xB7 " + dayLbl + " a las " + time + ".\nRevisa y completa los datos que falten para confirmar \u{1F447}";
  }
  function tryAudit(text) {
    const t = text.toLowerCase();
    if (!/auditor[íi]a|más vendido|mas vendido|reporte del mes|qu[ée] se vendi|ranking de (procedimiento|tratamiento)|optimizar campa/.test(t)) return null;
    let moves = [];
    try {
      moves = window.DB && window.DB.get("cash_moves") || [];
    } catch (e) {
    }
    const month = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
    const at = moves.filter((m) => m.kind === "atencion" && (m.ts || "").slice(0, 7) === month);
    const by = {};
    at.forEach((m) => {
      const k = m.concept || "Otro";
      by[k] = by[k] || { n: 0, amt: 0 };
      by[k].n++;
      by[k].amt += m.amount || 0;
    });
    let usingAppts = false;
    if (!Object.keys(by).length) {
      usingAppts = true;
      appts.forEach((a) => {
        const k = a.proc || "Otro";
        by[k] = by[k] || { n: 0, amt: 0 };
        by[k].n++;
      });
    }
    const rows = Object.keys(by).map((k) => ({ k, ...by[k] })).sort((a, b) => b.amt - a.amt || b.n - a.n);
    if (!rows.length) return "A\xFAn no tengo datos de ventas ni citas este mes para auditar. Registra atenciones en Caja y vuelve a ped\xEDrmelo.";
    const total = rows.reduce((s, r) => s + r.amt, 0);
    let out = "\u{1F4CA} Auditor\xEDa de " + (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL", { month: "long", year: "numeric" }) + "\n\nM\xE1s vendidos:\n";
    rows.slice(0, 5).forEach((r, i) => {
      out += i + 1 + ". " + r.k + " \u2014 " + r.n + (r.n === 1 ? " atenci\xF3n" : " atenciones") + (r.amt ? " \xB7 " + D.fmt(r.amt) : "") + "\n";
    });
    if (!usingAppts) out += "\nIngresos del mes: " + D.fmt(total) + ".";
    const top = rows[0].k, low = rows[rows.length - 1].k;
    out += "\n\nRecomendaciones:\n\u2022 Potencia en campa\xF1as tu m\xE1s vendido (" + top + "): es tu mejor gancho de conversi\xF3n.\n\u2022 Crea una promo/educaci\xF3n para reactivar el de menor rotaci\xF3n (" + low + ").\n\u2022 Programa re-citas de toxina (3 m) y bioestimulaci\xF3n (2\xAA dosis) desde Pacientes \u2192 Campa\xF1as de re-cita.";
    return out;
  }
  useEffect(() => {
    if (scRef.current) scRef.current.scrollTop = scRef.current.scrollHeight;
  }, [msgs, busy]);
  function micToggle() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setMsgs((m) => [...m, { role: "assistant", content: "Tu navegador no soporta dictado por voz. Puedes escribir la indicaci\xF3n, por ejemplo: \xABAgenda a Mar\xEDa botox ma\xF1ana a las 11\xBB." }]);
      return;
    }
    if (listening) {
      try {
        recRef.current && recRef.current.stop();
      } catch (e) {
      }
      setListening(false);
      return;
    }
    const r = new SR();
    recRef.current = r;
    r.lang = "es-CL";
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.onresult = (e) => {
      const txt = e.results[0][0].transcript;
      setListening(false);
      send(txt);
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    setListening(true);
    try {
      r.start();
    } catch (e) {
      setListening(false);
    }
  }
  async function send(q) {
    const text = (q || input).trim();
    if (!text || busy) return;
    setInput("");
    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    const cmd = trySchedule(text) || tryAudit(text);
    if (cmd) {
      setMsgs((m) => [...m, { role: "assistant", content: cmd }]);
      return;
    }
    setBusy(true);
    try {
      if (!window.mediqueAI) throw new Error("nohost");
      const hoy = /* @__PURE__ */ new Date();
      const hoyStr = hoy.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      const hoyISO = hoy.getFullYear() + "-" + ("0" + (hoy.getMonth() + 1)).slice(-2) + "-" + ("0" + hoy.getDate()).slice(-2);
      const sched = "\n\nAGENDAR CITAS \u2014 hoy es " + hoyStr + " (" + hoyISO + '). Calcula las fechas reales a partir de HOY; nunca inventes el d\xEDa de la semana. Cuando el profesional pida reservar/agendar y tengas PACIENTE, PROCEDIMIENTO, FECHA y HORA, agrega al FINAL de tu respuesta UNA sola l\xEDnea EXACTA:\n@@AGENDAR {"paciente":"<nombre>","proc":"<procedimiento>","fecha":"YYYY-MM-DD","hora":"HH:MM"}\nSi falta alg\xFAn dato, NO pongas esa l\xEDnea: p\xEDdelo de forma breve. NUNCA afirmes que agendaste si no incluiste la l\xEDnea @@AGENDAR.';
      const system = FACIAL_SYS + sched + "\n\nDATOS DEL PANEL: " + ctx();
      const res = await window.mediqueAI(next, {}, { system, max_tokens: 700 });
      if (!res || !res.ok || !res.reply) throw new Error(res && res.error || "sin respuesta");
      let reply = res.reply.trim();
      const mAg = reply.match(/@@AGENDAR\s*(\{[\s\S]*?\})/);
      if (mAg) {
        reply = reply.replace(/@@AGENDAR\s*\{[\s\S]*?\}/, "").trim();
        try {
          const a = JSON.parse(mAg[1]);
          const t0 = /* @__PURE__ */ new Date();
          t0.setHours(0, 0, 0, 0);
          const target = /* @__PURE__ */ new Date((a.fecha || "") + "T00:00:00");
          let day = Math.round((target - t0) / 864e5);
          if (!(day >= 0)) day = 0;
          const pat = matchPatient(a.paciente);
          if (onDarCita) onDarCita({ proc: a.proc || "", time: a.hora || "", day, patId: pat ? pat.id : "", patName: pat ? pat.name : a.paciente || "" });
          reply = (reply ? reply + "\n\n" : "") + "\u{1F4C5} Te dej\xE9 la cita lista en el formulario \xABDar cita\xBB \u2014 revisa la fecha y conf\xEDrmala para que entre a la agenda \u{1F447}";
        } catch (e) {
        }
      }
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      const kb = facialAnswer(text);
      const fallback = kb ? kb + "\n\n\u2014 Respuesta de la base de conocimiento de evaluaci\xF3n facial. Con la cuenta de IA conectada, adem\xE1s analizo tus fotos antes/despu\xE9s." : "Soy tu copiloto de evaluaci\xF3n facial. Aqu\xED en la vista previa respondo dudas puntuales (MRD1/MRD2, ptosis vs descenso de ceja, pseudoptosis, c\xF3mo estandarizar la foto, cu\xE1ndo evaluar el resultado, manejo de ptosis por toxina). Con la cuenta de IA conectada, tambi\xE9n analizo fotos completas antes/despu\xE9s.\n\n\xBFSobre cu\xE1l de esos temas quieres que te oriente?";
      setMsgs((m) => [...m, { role: "assistant", content: fallback }]);
    }
    setBusy(false);
  }
  const sugs = [
    "Agenda a Mar\xEDa botox ma\xF1ana a las 11",
    "Auditor\xEDa del mes",
    "\xBFC\xF3mo diferencio ptosis palpebral de descenso de ceja?",
    "\xBFC\xF3mo estandarizo la foto antes/despu\xE9s?"
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onMouseDown: onFabDown, onTouchStart: onFabDown, title: "Copiloto \xB7 Evaluaci\xF3n facial", style: {
    position: "fixed",
    right: pos.right,
    bottom: pos.bottom,
    zIndex: 200,
    width: 56,
    height: 56,
    borderRadius: "50%",
    cursor: "grab",
    border: "1px solid rgba(255,255,255,.22)",
    background: "rgba(20,20,16,.55)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 8px 28px -6px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    touchAction: "none"
  } }, /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, open ? /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "4.5", y: "8", width: "15", height: "10", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M12 4.5V8" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "3.4", r: "1.3" }), /* @__PURE__ */ React.createElement("path", { d: "M2.5 12v3M21.5 12v3" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "13", r: "1.3", fill: "#fff", stroke: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "13", r: "1.3", fill: "#fff", stroke: "none" })))), open && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", right: pos.right, bottom: pos.bottom + 66, zIndex: 199, width: "min(360px, calc(100vw - 40px))", height: "min(520px, 72vh)", background: T.bg, border: "1px solid " + T.line, borderRadius: 16, boxShadow: "0 24px 60px -16px rgba(0,0,0,.6)", display: "flex", flexDirection: "column", overflow: "hidden", animation: "jcSlideUp .28s " + T.ease } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg," + T.accent + "," + T.accentDeep + ")", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "4.5", y: "8", width: "15", height: "10", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M12 4.5V8" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "3.4", r: "1.3" }), /* @__PURE__ */ React.createElement("path", { d: "M2.5 12v3M21.5 12v3" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "13", r: "1.3", fill: "#fff", stroke: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "13", r: "1.3", fill: "#fff", stroke: "none" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, "Copiloto JC"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".06em", color: T.accent } }, "Evaluaci\xF3n facial \xB7 IA")), /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(false), style: { background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { ref: scRef, className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10 } }, msgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
    maxWidth: "85%",
    padding: "10px 13px",
    borderRadius: 12,
    fontFamily: T.sans,
    fontSize: 12.5,
    lineHeight: 1.55,
    whiteSpace: "pre-wrap",
    background: m.role === "user" ? T.accent : T.surface,
    color: m.role === "user" ? T.onAccent : T.text,
    border: m.role === "user" ? "none" : "1px solid " + T.line
  } }, m.content)), busy && /* @__PURE__ */ React.createElement("div", { style: { alignSelf: "flex-start", padding: "10px 13px", borderRadius: 12, background: T.surface, border: "1px solid " + T.line, fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Pensando\u2026"), msgs.length <= 1 && !busy && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7, marginTop: 4 } }, sugs.map((s) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => send(s), style: { textAlign: "left", fontFamily: T.sans, fontSize: 12, color: T.textMute, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "10px 12px", cursor: "pointer" } }, s)))), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px", borderTop: "1px solid " + T.line, display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: micToggle, title: "Dictar por voz", style: { width: 42, flexShrink: 0, borderRadius: 10, cursor: "pointer", background: listening ? "#C0285A" : T.surface, color: listening ? "#fff" : T.textMute, border: "1px solid " + (listening ? "#C0285A" : T.line), display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "9", y: "3", width: "6", height: "11", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M5 11a7 7 0 0 0 14 0M12 18v3" }))), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: input,
      onChange: (e) => setInput(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") send();
      },
      placeholder: listening ? "Escuchando\u2026" : "Escribe o dicta: \xABAgenda a Mar\xEDa botox ma\xF1ana 11\xBB",
      style: { flex: 1, padding: "11px 13px", borderRadius: 10, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: () => send(), disabled: busy, style: { width: 42, flexShrink: 0, borderRadius: 10, border: "none", cursor: "pointer", background: T.primaryBg, color: T.primaryText, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M22 2 11 13M22 2l-7 20-4-9-9-4z" }))))));
}
Object.assign(window, { Copilot, facialAnswer, FACIAL_SYS });
