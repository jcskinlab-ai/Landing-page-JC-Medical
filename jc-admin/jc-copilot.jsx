/* ═══════════ JC · COPILOTO CLÍNICO (IA) · EXPERTO EN EVALUACIÓN FACIAL ═══════════ */

/* System prompt para el modelo en vivo (window.claude). Define al copiloto como
   analista clínico-fotográfico de medicina estética facial. */
const FACIAL_SYS = [
  "Eres el copiloto clínico de evaluación facial en medicina estética. Respondes SIEMPRE en español de Chile: claro, profesional y cercano.",
  "Eres un especialista virtual en análisis fotográfico de medicina estética facial: toxina botulínica, rellenos, bioestimuladores, calidad de piel (skin quality), rinomodelación y procedimientos perioculares.",
  "Actúas como analista clínico RIGUROSO. Nunca asumes resultados positivos ni negativos sin evidencia; nunca afirmas una complicación si la evidencia es insuficiente.",
  "Cuando te compartan o describan fotos antes/después, sigue esta metodología: 1) Validación fotográfica (ángulo cefálico, rotación/inclinación de cabeza, distancia y zoom, perspectiva, iluminación y sombras, expresión, apertura ocular, posición mandibular) e indica cuánto afecta cada factor. 2) Sistema de referencia anatómica (línea media, dorso y punta nasal, glabela, cantos internos/externos, pupilas, comisuras, arcos supraorbitarios) — describe una malla facial virtual. 3) Medición relativa estimada: MRD1, MRD2, apertura palpebral, distancia ceja-párpado, altura de ceja medial/central/lateral, simetría ocular y de cejas, en mm estimados + % de cambio + nivel de confianza. 4) Frente (líneas horizontales, reclutamiento/compensación frontal, actividad residual, escala 0-3). 5) Glabela (corrugador, prócer, depresor superciliar). 6) Periocular (patas de gallo, apertura, edema, ptosis). 7) Detección de ptosis: A sin ptosis / B pesadez subjetiva / C descenso de ceja / D ptosis palpebral verdadera / E combinada, con probabilidad %. 8) Diferenciar cambio real vs fotográfico vs mixto (%). 9) Describir un overlay clínico (ejes, pupilas, cejas, flechas de desplazamiento). 10) Conclusión: resumen ejecutivo por zona (frente, entrecejo, patas de gallo, cejas, párpados), riesgo de ptosis (%), y conclusión clínica.",
  "REGLA CRÍTICA: cierra todo análisis de fotos con: \"Las mediciones son estimaciones visuales derivadas de fotografías clínicas y no reemplazan mediciones presenciales estandarizadas.\"",
  "Si te hacen una pregunta puntual (qué es MRD1, cómo diferenciar ptosis de descenso de ceja, cuándo evaluar el resultado, cómo estandarizar la foto), responde directo y conciso, sin recitar toda la metodología. Sé intuitivo: ve a lo que se pregunta."
].join("\n");

/* Base de conocimiento local — responde preguntas específicas de evaluación facial
   aunque la IA en vivo no esté conectada (vista previa / sin cuenta). */
const FACIAL_KB = [
  { k: ["mrd1", "margin reflex", "reflejo margen"], a: "MRD1 (Margin Reflex Distance 1) = distancia desde el reflejo luminoso corneal (centro pupilar) al borde del párpado superior, mirando al frente.\n\n• Normal: ~4–5 mm\n• <2 mm: sugiere ptosis palpebral\n\nEs la medida clave para detectar ptosis tras toxina: si baja respecto al basal, hay descenso del párpado superior. Mídelo en reposo y compara ambos ojos." },
  { k: ["mrd2"], a: "MRD2 (Margin Reflex Distance 2) = distancia desde el reflejo corneal al borde del párpado INFERIOR.\n\n• Normal: ~5 mm\n\nJunto con MRD1 define la apertura palpebral (fisura): MRD1 + MRD2 ≈ 9–10 mm normal. Útil para evaluar retracción o escleral show." },
  { k: ["apertura palpebral", "fisura palpebral", "abertura ocular", "altura del ojo"], a: "La apertura/fisura palpebral = MRD1 + MRD2 (≈ 9–10 mm normal).\n\nPara evaluarla en foto: marca el reflejo corneal, mide al borde superior (MRD1) y al inferior (MRD2). Compara lado a lado. Una reducción simétrica leve puede ser fotográfica; una asimétrica con MRD1 disminuido orienta a ptosis." },
  { k: ["ptosis palpebral", "parpado caido", "párpado caído", "ptosis verdadera", "elevador"],
    a: "PTOSIS PALPEBRAL VERDADERA: caída del párpado superior por debilidad del músculo elevador. En toxina ocurre por difusión al elevador (sobre todo si se infiltra muy bajo o medial en el frontal/glabela).\n\nSignos:\n• MRD1 disminuido (a veces <2 mm)\n• El pliegue palpebral puede elevarse\n• El paciente eleva el frontal para compensar (cejas arqueadas)\n• Aparece a los 3–14 días, transitoria (semanas)\n\nDiferénciala del descenso de ceja: en la ptosis palpebral, levantar manualmente la ceja NO normaliza el MRD1." },
  { k: ["pseudoptosis", "falsa ptosis", "pseudo ptosis"],
    a: "PSEUDOPTOSIS: el párpado PARECE caído pero el elevador funciona bien. Causas: exceso de piel (dermatocalasia), descenso de ceja que empuja el párpado, hipoglobo/enoftalmo, hipotropía.\n\nClave diagnóstica: al elevar manualmente la ceja o la piel sobrante, el MRD1 se normaliza → NO es ptosis verdadera. Importante para no atribuir a la toxina algo que es anatómico o por la ceja." },
  { k: ["descenso de ceja", "ceja caida", "ceja caída", "brow ptosis", "ceja baja", "pesadez"],
    a: "DESCENSO DE CEJA (brow ptosis): la ceja baja —típicamente la cola/lateral— por exceso de toxina en el FRONTAL (único elevador de la ceja) sin equilibrar con los depresores. Da sensación de \"pesadez\".\n\nDiferénciala de la ptosis palpebral:\n• MRD1 suele estar NORMAL\n• Disminuye la distancia ceja–párpado\n• Al levantar la ceja con el dedo, la mirada \"se abre\"\n\nManejo: equilibrar depresores (cola de ceja con orbicular lateral) en la siguiente sesión; ajustar dosis frontal. Es percepción frecuente cuando se relaja mucho la frente." },
  { k: ["compensacion frontal", "compensación frontal", "reclutamiento", "frontal compensa"],
    a: "COMPENSACIÓN/RECLUTAMIENTO FRONTAL: cuando hay una ptosis basal leve, el frontal eleva las cejas de forma crónica para \"abrir\" la mirada. Si tratas el frontal en exceso, se pierde esa compensación y aflora la pesadez o una ptosis que antes estaba enmascarada.\n\nPor eso conviene evaluar SIEMPRE la frente en reposo y en máxima elevación antes de infiltrar, y ser conservador en frontal cuando ves cejas muy arqueadas en reposo." },
  { k: ["diferenciar real", "fotografico", "fotográfico", "cambio real", "es real o foto", "real vs"],
    a: "CAMBIO REAL vs FOTOGRÁFICO: antes de concluir, descarta artefactos. Sospecha componente fotográfico si entre ambas tomas cambian: ángulo/rotación de cabeza, altura de cámara, distancia/zoom (la cercanía distorsiona), iluminación (sombras que simulan arrugas o volumen) o la expresión.\n\nAsigna un porcentaje (ej. 70% real / 30% fotográfico) y baja el nivel de confianza cuando las condiciones no son comparables. Solo son comparables fotos con el mismo encuadre, luz y gesto." },
  { k: ["tomar la foto", "estandarizar", "fotografia clinica", "fotografía clínica", "como fotografiar", "encuadre", "registro fotografico"],
    a: "FOTO ESTANDARIZADA (para que el antes/después sea válido):\n• Cámara a la altura de los ojos, plano de Frankfort horizontal\n• Misma distancia, sin zoom digital (usa retroceso, no acercar)\n• Iluminación frontal homogénea, fondo neutro\n• Sin maquillaje, pelo retirado de la frente\n• 3 gestos: reposo, máxima elevación de frente, ceño fruncido (y sonrisa forzada para patas de gallo)\n• Mismo encuadre antes/después\n\nConsejo: marca puntos de referencia (pupilas, comisuras) para alinear ambas tomas." },
  { k: ["cuando evaluar", "cuándo evaluar", "control", "dia 14", "día 14", "21 dias", "21 días", "resultado botox", "cuanto tarda"],
    a: "EVALUACIÓN DEL RESULTADO DE TOXINA:\n• Inicio del efecto: 3–7 días\n• Efecto MÁXIMO: ~día 14\n• Control y retoque: día 14–21 (antes es prematuro juzgar)\n\nNunca concluyas \"no funcionó\" antes del día 14. Para comparar, repite la foto en las mismas condiciones del basal." },
  { k: ["ptosis por botox", "manejo ptosis", "apraclonidina", "iopidina", "gotas", "tratar ptosis", "corregir ptosis"],
    a: "PTOSIS PALPEBRAL POR TOXINA (transitoria): manejo de referencia\n• Apraclonidina 0,5% (Iopidina) en gotas: estimula el músculo de Müller (α-adrenérgico) y eleva el párpado 1–2 mm mientras pasa el efecto\n• Alternativa: fenilefrina 2,5%\n• Tranquilizar: es transitoria (semanas), no permanente\n\nPrevención: no infiltrar muy bajo/medial en el frontal, respetar ≥1 cm sobre el reborde orbitario, dosis adecuadas en glabela.\n\n(Información de referencia clínica; la indicación es presencial.)" },
  { k: ["patas de gallo", "orbicular", "periocular", "arrugas ojos", "canto externo"],
    a: "PATAS DE GALLO (orbicular periocular): evalúa en sonrisa forzada (máxima dinámica). Clasifica: 0 sin cambio / 1 leve / 2 moderada / 3 gran mejoría.\n\nOjo con el edema malar y la posible elevación/caída del canto. Si infiltras muy abajo puedes afectar el cigomático mayor (sonrisa asimétrica): mantén los puntos laterales y altos respecto al arco." },
  { k: ["glabela", "entrecejo", "corrugador", "procer", "prócer", "ceño", "depresor superciliar"],
    a: "GLABELA (entrecejo): músculos a evaluar — corrugador (tira la ceja medial hacia adentro/abajo), prócer (líneas horizontales del puente nasal) y depresor superciliar.\n\nEvalúa en ceño máximo: persistencia de líneas, relajación y simetría. La glabela mal balanceada o muy baja se asocia a riesgo de ptosis palpebral por difusión al elevador. Busca también el efecto \"Spock\" (cola de ceja elevada) por frontal sin tratar la cola." },
  { k: ["frente", "frontal", "lineas horizontales", "líneas horizontales", "arrugas frente"],
    a: "FRENTE (frontal): único elevador de las cejas. Evalúa en máxima elevación: líneas horizontales, reclutamiento, compensación y actividad residual. Escala 0–3.\n\nSé conservador: tratar de más baja las cejas (pesadez). Deja algo de movimiento superior y equilibra con glabela para evitar caída de cola de ceja." },
  { k: ["cejas", "posicion ceja", "posición ceja", "altura de ceja", "brow lift", "levantar cejas", "cola de ceja"],
    a: "POSICIÓN DE CEJAS: mide altura medial, central y lateral respecto a una línea de referencia (ej. pupila o reborde orbitario) y compara lados.\n\n• Chemical brow lift: relajar depresores (cola de ceja, glabela) eleva la cola 1–3 mm\n• Asimetría: nota cuál sube/baja y cuánto (mm estimados, % y confianza)\n• Tras frontal: vigila descenso de cola (\"pesadez\") y efecto Spock" },
  { k: ["simetria", "simetría", "asimetria", "asimetría", "un lado mas", "desigual"],
    a: "SIMETRÍA: muchas asimetrías son BASALES (preexistentes) — documéntalas con foto ANTES de tratar y muéstraselas al paciente. En el análisis, separa la asimetría basal de la inducida por el tratamiento.\n\nUsa la línea media facial y referencias pareadas (pupilas, cantos, comisuras, altura de ceja) para cuantificar el lado y los mm de diferencia, con su nivel de confianza." },
  { k: ["edema", "hinchazon", "hinchazón", "inflamacion", "inflamación", "bolsa"],
    a: "EDEMA vs PTOSIS/cambio: el edema periocular post-infiltración puede simular pesadez o cerrar la mirada los primeros días. Es transitorio (24–72 h habitualmente). No lo confundas con ptosis: el edema no reduce el MRD1 de forma sostenida y mejora solo. Reevalúa con foto al día 14." },
  { k: ["metodologia", "metodología", "como analizas", "cómo analizas", "informe", "como funciona", "que haces", "qué haces"],
    a: "Mi análisis sigue 10 pasos: 1) validación fotográfica, 2) referencias anatómicas (malla facial), 3) medición relativa (MRD1/MRD2, apertura, ceja–párpado, simetría) en mm + % + confianza, 4) frente, 5) glabela, 6) periocular, 7) detección de ptosis (sin/pesadez/descenso ceja/palpebral/combinada con %), 8) real vs fotográfico, 9) overlay de referencia, 10) conclusión por zona + riesgo de ptosis.\n\nPara empezar, descríbeme las fotos (o pásamelas) y el procedimiento realizado. También respondo dudas puntuales: pregúntame por MRD1, ptosis vs descenso de ceja, cómo estandarizar la foto, etc." }
];

function _facialNorm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function facialAnswer(q) {
  const n = _facialNorm(q);
  let best = null, score = 0;
  FACIAL_KB.forEach(e => {
    let s = 0; e.k.forEach(kw => { if (n.indexOf(_facialNorm(kw)) >= 0) s += kw.length > 4 ? 2 : 1; });
    if (s > score) { score = s; best = e; }
  });
  return score >= 1 ? best.a : null;
}

function Copilot({ T, patients, appts, addAppt, onDarCita }) {
  const D = window.JCDATA;
  // Nombre del asistente (configurado en Asistente IA) y nombre de la clínica activa.
  const _agentCfg = (function () { try { return (window.DB && window.DB.get("agent_cfg")) || {}; } catch (e) { return {}; } })();
  const agentName = ((_agentCfg.name || "") + "").trim() || "Copiloto";
  const clinicNm = (window.clinicName && window.clinicName()) || "tu clínica";
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "Hola 👋 Soy " + agentName + ", tu copiloto de " + clinicNm + ". Puedo:\n• Agendar por voz o texto: «Agenda a María botox mañana a las 11».\n• Darte la auditoría del mes: escribe «auditoría».\n• Analizar evaluación facial (ptosis, cejas, MRD1/MRD2, simetría).\n\n¿Qué necesitas?" }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [pos, setPos] = useState({ bottom: 20, right: 20 });
  const scRef = useRef(null);
  const recRef = useRef(null);

  // BUG (celular) · Antes el FAB llevaba onMouseDown Y onTouchStart, cada uno con su propio par
  // move/up. En un teléfono un tap recorre AMBOS caminos: primero touchstart→touchend (abre) y
  // después el mousedown/mouseup que el navegador sintetiza para el mismo tap (vuelve a cerrar).
  // El `e.preventDefault()` no lo evitaba: React registra touchstart como listener PASIVO en la
  // raíz, así que cancelarlo desde un onTouchStart no tiene efecto y el navegador sintetiza igual.
  // Resultado: en PC abría y en celular no abría nunca.
  // Ahora se usa un solo camino con eventos de puntero (ratón, táctil y lápiz en la misma API):
  // un gesto = un pointerdown, sin eventos sintetizados detrás. pointerdown SÍ es cancelable en
  // React, así que el preventDefault además suprime los de ratón.
  function onFabDown(e) {
    const startX = e.clientX, startY = e.clientY, id = e.pointerId;
    const startRight = pos.right, startBottom = pos.bottom;
    let moved = false;
    function onMove(ev) {
      if (ev.pointerId !== id) return;
      if (Math.abs(ev.clientX - startX) > 4 || Math.abs(ev.clientY - startY) > 4) moved = true;
      if (moved) {
        const vw = window.innerWidth, vh = window.innerHeight;
        setPos({ right: Math.min(vw - 64, Math.max(8, startRight - (ev.clientX - startX))), bottom: Math.min(vh - 64, Math.max(8, startBottom - (ev.clientY - startY))) });
      }
    }
    function onUp(ev) {
      if (ev.pointerId !== id) return;
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      if (!moved && ev.type === "pointerup") setOpen(o => !o);
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    // pointercancel: si el navegador se queda con el gesto (scroll, gesto del sistema), hay que
    // soltar los listeners igual — si no, quedan colgados hasta la próxima interacción.
    document.addEventListener("pointercancel", onUp);
    e.preventDefault();
  }

  // Minimización de datos hacia la IA externa (Groq, Ley 21.719): NUNCA se envía el listado de
  // nombres de pacientes ni con quién son las citas de hoy — solo horarios/procedimientos y
  // conteos agregados. El emparejamiento por nombre para agendar (matchPatient) ocurre siempre
  // LOCAL en el navegador, así que el modelo no necesita conocer la lista de pacientes para eso.
  function ctx() {
    let n = 0; D.catalog.forEach(s => s.groups.forEach(g => n += g.items.length));
    const hoyList = appts.filter(a => a.day === 0);
    const hoy = hoyList.map(a => a.time + " (" + a.proc + ")").join("; ");
    const pendCount = patients.filter(p => !p.consent).length;
    return "Catálogo: " + n + " procedimientos. Citas de hoy (" + hoyList.length + "): " + (hoy || "ninguna") + ". Pacientes registrados: " + patients.length + ". Consentimientos pendientes: " + pendCount + ".";
  }

  // ── Agendar por voz/texto ──
  function procFromText(t) {
    let found = null;
    D.catalog.forEach(s => s.groups.forEach(g => g.items.forEach(it => { if (!found && t.indexOf(it.n.toLowerCase()) >= 0) found = it.n; })));
    if (found) return found;
    if (/botox|toxina/.test(t)) return "Botox 3 zonas";
    if (/rino/.test(t)) return "Rinomodelación";
    if (/sculptra|bioestim|col[áa]geno/.test(t)) return "Sculptra de colágeno facial";
    if (/relleno|hialur[óo]nico|labio|p[óo]mulo|ment[óo]n/.test(t)) return "Realce de pómulos";
    if (/eval/.test(t)) return "Evaluación general";
    return null;
  }
  // Extrae el nombre dictado: «agenda a Juan Parra para el domingo…» → "Juan Parra".
  // Maneja también «agenda una hora para Paula Díaz el lunes».
  function extractPatientName(text) {
    const STOP = ["para", "el", "la", "los", "las", "manana", "hoy", "pasado", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo", "con", "procedimiento", "proc", "botox", "toxina", "relleno", "rino", "rinomodelacion", "sculptra", "bioestim", "bioestimulacion", "colageno", "evaluacion", "hialuronico", "labio", "pomulo", "menton", "de", "del", "y", "una", "un", "hora", "cita", "turno"];
    function filterStop(raw) {
      const out = [];
      for (const w of raw.split(/\s+/)) { if (STOP.indexOf(_facialNorm(w)) >= 0) break; out.push(w); }
      return out.join(" ").trim();
    }
    // Intento 1: «agenda [a/para] [nombre]» directo
    const m1 = (text || "").match(/(?:agenda(?:r|me|le)?|ag[eé]nda\w*|reserva(?:r|me|le)?|res[eé]rva\w*|anota(?:r|me|le)?|an[oó]ta\w*|cita)\s+(?:a\s+|para\s+|al\s+)?([a-zA-ZáéíóúñÁÉÍÓÚÑ]+(?:\s+[a-zA-ZáéíóúñÁÉÍÓÚÑ]+){0,4})/i);
    if (m1) { const r1 = filterStop(m1[1]); if (r1) return r1; }
    // Intento 2: «agenda una hora para [nombre]» — busca «para» tras el verbo
    const m2 = (text || "").match(/(?:agenda(?:r|me|le)?|ag[eé]nda\w*|reserva(?:r|me|le)?|res[eé]rva\w*|anota(?:r|me|le)?|an[oó]ta\w*|cita)\b.*?\bpara\s+([a-zA-ZáéíóúñÁÉÍÓÚÑ]+(?:\s+[a-zA-ZáéíóúñÁÉÍÓÚÑ]+){0,4})/i);
    if (m2) { const r2 = filterStop(m2[1]); if (r2) return r2; }
    return "";
  }
  // Empareja un nombre dictado con un paciente existente, ESTRICTO por nombre (no por palabras
  // sueltas que puedan ser un procedimiento, como "botox"). Si no hay match → null (= paciente nuevo).
  function matchPatient(name) {
    const dn = (name || "").toLowerCase().trim();
    if (dn.length < 3) return null;
    let p = patients.find(x => { const pn = x.name.toLowerCase(); return pn === dn || pn.indexOf(dn) >= 0 || dn.indexOf(pn) >= 0; });
    if (p) return p;
    const parts = dn.split(/\s+/);
    if (parts.length >= 2) {
      p = patients.find(x => { const pp = x.name.toLowerCase().split(/\s+/); return pp[0] === parts[0] && pp.indexOf(parts[1]) >= 0; });
    }
    return p || null;
  }
  function trySchedule(text) {
    const t = text.toLowerCase();
    if (!/\b(agenda|agendar|agéndame|agendame|cita|reserva|res[ée]rvame|anota|an[óo]tame)\b/.test(t)) return null;
    const proc = procFromText(t);
    // Emparejar SOLO contra el nombre dictado (no contra palabras del texto como "botox").
    const dictName = extractPatientName(text);
    let pat = matchPatient(dictName);
    let day = 0, dayLbl = "hoy";
    if (/mañana|manana/.test(t)) { day = 1; dayLbl = "mañana"; }
    else if (/pasado/.test(t)) { day = 2; dayLbl = "pasado mañana"; }
    else { const wds = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]; const today = new Date().getDay(); for (let i = 0; i < 7; i++) { const nm = wds[i].replace(/[éá]/g, m => ({ "é": "e", "á": "a" })[m]); if (t.indexOf(wds[i]) >= 0 || t.indexOf(nm) >= 0) { let off = (i - today + 7) % 7; if (off === 0) off = 7; day = off; dayLbl = wds[i]; break; } } }
    let time = null; const tm = t.match(/\b(\d{1,2})(?::|\.|h|:)?(\d{2})?\s*(am|pm|hrs?|horas?)?\b/);
    if (tm) { let h = parseInt(tm[1], 10); const mm = tm[2] || "00"; if (/pm/.test(tm[3] || "") && h < 12) h += 12; if (h >= 8 && h <= 21) time = (h < 10 ? "0" + h : h) + ":" + mm; }
    if (!proc && !time) return null;
    if (!proc) return "Entendí que quieres agendar, pero no detecté el procedimiento. Ejemplo: «Agenda a " + (pat ? pat.name.split(" ")[0] : "María") + " botox mañana a las 11».";
    if (!time) return "Detecté el procedimiento (" + proc + ") pero no la hora. Dime la hora, por ejemplo: «… a las 11:30».";
    // Si no hay paciente existente, se usa el nombre dictado → el formulario lo abre como paciente NUEVO.
    const name = pat ? pat.name : dictName;
    // Abre el formulario "Dar cita" prellenado para confirmar y completar lo que falte.
    if (onDarCita) onDarCita({ proc, time, day, patId: pat ? pat.id : "", patName: name });
    return "Abrí el formulario «Dar cita» con lo que entendí: " + proc + (name ? " · " + name : "") + " · " + dayLbl + " a las " + time + ".\nRevisa y completa los datos que falten para confirmar 👇";
  }
  // ── Auditoría del mes ──
  function tryAudit(text) {
    const t = text.toLowerCase();
    if (!/auditor[íi]a|más vendido|mas vendido|reporte del mes|qu[ée] se vendi|ranking de (procedimiento|tratamiento)|optimizar campa/.test(t)) return null;
    let moves = []; try { moves = (window.DB && window.DB.get("cash_moves")) || []; } catch (e) {}
    const month = new Date().toISOString().slice(0, 7);
    const at = moves.filter(m => m.kind === "atencion" && (m.ts || "").slice(0, 7) === month);
    const by = {};
    at.forEach(m => { const k = (window.normalizeProcC ? window.normalizeProcC(m.concept) : m.concept) || "Otro"; by[k] = by[k] || { n: 0, amt: 0 }; by[k].n++; by[k].amt += m.amount || 0; });
    // si no hay caja del mes, usar demanda por citas (proc)
    let usingAppts = false;
    if (!Object.keys(by).length) { usingAppts = true; appts.forEach(a => { const k = (window.normalizeProcC ? window.normalizeProcC(a.proc) : a.proc) || "Otro"; by[k] = by[k] || { n: 0, amt: 0 }; by[k].n++; }); }
    const rows = Object.keys(by).map(k => ({ k, ...by[k] })).sort((a, b) => (b.amt - a.amt) || (b.n - a.n));
    if (!rows.length) return "Aún no tengo datos de ventas ni citas este mes para auditar. Registra atenciones en Caja y vuelve a pedírmelo.";
    const total = rows.reduce((s, r) => s + r.amt, 0);
    let out = "📊 Auditoría de " + new Date().toLocaleDateString("es-CL", { month: "long", year: "numeric" }) + "\n\nMás vendidos:\n";
    rows.slice(0, 5).forEach((r, i) => { out += (i + 1) + ". " + r.k + " — " + r.n + (r.n === 1 ? " atención" : " atenciones") + (r.amt ? " · " + D.fmt(r.amt) : "") + "\n"; });
    if (!usingAppts) out += "\nIngresos del mes: " + D.fmt(total) + ".";
    const top = rows[0].k, low = rows[rows.length - 1].k;
    out += "\n\nRecomendaciones:\n• Potencia en campañas tu más vendido (" + top + "): es tu mejor gancho de conversión.\n• Crea una promo/educación para reactivar el de menor rotación (" + low + ").\n• Programa re-citas de toxina (3 m) y sculptra (2ª dosis) desde Pacientes → Campañas de re-cita.";
    return out;
  }

  useEffect(() => { if (scRef.current) scRef.current.scrollTop = scRef.current.scrollHeight; }, [msgs, busy]);

  function micToggle() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setMsgs(m => [...m, { role: "assistant", content: "Tu navegador no soporta dictado por voz. Puedes escribir la indicación, por ejemplo: «Agenda a María botox mañana a las 11»." }]); return; }
    if (listening) { try { recRef.current && recRef.current.stop(); } catch (e) {} setListening(false); return; }
    const r = new SR(); recRef.current = r; r.lang = "es-CL"; r.interimResults = false; r.maxAlternatives = 1;
    r.onresult = e => { const txt = e.results[0][0].transcript; setListening(false); send(txt); };
    r.onerror = () => setListening(false); r.onend = () => setListening(false);
    setListening(true); try { r.start(); } catch (e) { setListening(false); }
  }

  async function send(q) {
    const text = (q || input).trim();
    if (!text || busy) return;
    setInput("");
    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    // comandos locales (funcionan con o sin IA): agendar y auditoría
    const cmd = trySchedule(text) || tryAudit(text);
    if (cmd) { setMsgs(m => [...m, { role: "assistant", content: cmd }]); return; }
    setBusy(true);
    try {
      if (!window.mediqueAI) throw new Error("nohost");
      // Contexto de fecha real (para que NO invente el día de la semana) + capacidad de agendar de verdad.
      const hoy = new Date();
      const hoyStr = hoy.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      const hoyISO = hoy.getFullYear() + "-" + ("0" + (hoy.getMonth() + 1)).slice(-2) + "-" + ("0" + hoy.getDate()).slice(-2);
      const sched = "\n\nAGENDAR CITAS — hoy es " + hoyStr + " (" + hoyISO + "). Calcula las fechas reales a partir de HOY; nunca inventes el día de la semana. " +
        "Cuando el profesional pida reservar/agendar y tengas PACIENTE, PROCEDIMIENTO, FECHA y HORA, agrega al FINAL de tu respuesta UNA sola línea EXACTA:\n" +
        "@@AGENDAR {\"paciente\":\"<nombre>\",\"proc\":\"<procedimiento>\",\"fecha\":\"YYYY-MM-DD\",\"hora\":\"HH:MM\"}\n" +
        "Si falta algún dato, NO pongas esa línea: pídelo de forma breve. NUNCA afirmes que agendaste si no incluiste la línea @@AGENDAR.";
      const system = "Trabajas para la clínica " + clinicNm + ". Tu nombre es " + agentName + ". " + FACIAL_SYS + sched + "\n\nDATOS DEL PANEL: " + ctx();
      const res = await window.mediqueAI(next, {}, { system: system, max_tokens: 700 });
      if (!res || !res.ok || !res.reply) throw new Error((res && res.error) || "sin respuesta");
      let reply = res.reply.trim();
      // ¿La IA pidió agendar? → ejecuta la acción REAL: abre el formulario «Dar cita» prellenado.
      const mAg = reply.match(/@@AGENDAR\s*(\{[\s\S]*?\})/);
      if (mAg) {
        reply = reply.replace(/@@AGENDAR\s*\{[\s\S]*?\}/, "").trim();
        try {
          const a = JSON.parse(mAg[1]);
          const t0 = new Date(); t0.setHours(0, 0, 0, 0);
          const target = new Date((a.fecha || "") + "T00:00:00");
          let day = Math.round((target - t0) / 86400000); if (!(day >= 0)) day = 0;
          // Emparejar estricto por nombre; si no existe, se crea como paciente NUEVO con el nombre dictado.
          const pat = matchPatient(a.paciente);
          if (onDarCita) onDarCita({ proc: a.proc || "", time: a.hora || "", day: day, patId: pat ? pat.id : "", patName: pat ? pat.name : (a.paciente || "") });
          reply = (reply ? reply + "\n\n" : "") + "📅 Te dejé la cita lista en el formulario «Dar cita» — revisa la fecha y confírmala para que entre a la agenda 👇";
        } catch (e) {}
      }
      setMsgs(m => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      // Sin IA en vivo (vista previa / panel sin cuenta): respondemos con la base de conocimiento facial.
      const kb = facialAnswer(text);
      const fallback = kb
        ? kb + "\n\n— Respuesta de la base de conocimiento de evaluación facial. Con la cuenta de IA conectada, además analizo tus fotos antes/después."
        : "Soy tu copiloto de evaluación facial. Aquí en la vista previa respondo dudas puntuales (MRD1/MRD2, ptosis vs descenso de ceja, pseudoptosis, cómo estandarizar la foto, cuándo evaluar el resultado, manejo de ptosis por toxina). Con la cuenta de IA conectada, también analizo fotos completas antes/después.\n\n¿Sobre cuál de esos temas quieres que te oriente?";
      setMsgs(m => [...m, { role: "assistant", content: fallback }]);
    }
    setBusy(false);
  }

  const sugs = [
    "Agenda a María botox mañana a las 11",
    "Auditoría del mes",
    "¿Cómo diferencio ptosis palpebral de descenso de ceja?",
    "¿Cómo estandarizo la foto antes/después?"
  ];

  return (
    <>
      {/* FAB — arrastrable (click corto abre/cierra; drag mueve) */}
      <button onPointerDown={onFabDown} title="Copiloto · Evaluación facial" aria-label="Abrir el copiloto de IA" style={{
        position: "fixed", right: pos.right, bottom: pos.bottom, zIndex: 200, width: 56, height: 56, borderRadius: "50%", cursor: "grab", border: "1px solid rgba(255,255,255,.22)",
        background: "rgba(20,20,16,.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 8px 28px -6px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none", touchAction: "none"
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {open ? <path d="M18 6 6 18M6 6l12 12" /> : <><rect x="4.5" y="8" width="15" height="10" rx="3" /><path d="M12 4.5V8" /><circle cx="12" cy="3.4" r="1.3" /><path d="M2.5 12v3M21.5 12v3" /><circle cx="9" cy="13" r="1.3" fill="#fff" stroke="none" /><circle cx="15" cy="13" r="1.3" fill="#fff" stroke="none" /></>}
        </svg>
      </button>

      {/* DRAWER */}
      {open && (
        <div style={{ position: "fixed", right: pos.right, bottom: pos.bottom + 66, zIndex: 199, width: "min(360px, calc(100vw - 40px))", height: "min(520px, 72vh)", background: T.bg, border: "1px solid " + T.line, borderRadius: 16, boxShadow: "0 24px 60px -16px rgba(0,0,0,.6)", display: "flex", flexDirection: "column", overflow: "hidden", animation: "jcSlideUp .28s " + T.ease }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid " + T.line }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg," + T.accent + "," + T.accentDeep + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4.5" y="8" width="15" height="10" rx="3" /><path d="M12 4.5V8" /><circle cx="12" cy="3.4" r="1.3" /><path d="M2.5 12v3M21.5 12v3" /><circle cx="9" cy="13" r="1.3" fill="#fff" stroke="none" /><circle cx="15" cy="13" r="1.3" fill="#fff" stroke="none" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text }}>{agentName}</div>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".06em", color: T.accent }}>{clinicNm} · IA</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
          </div>

          <div ref={scRef} className="jc-scroll" style={{ flex: 1, overflowY: "auto", padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", padding: "10px 13px", borderRadius: 12, fontFamily: T.sans, fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap",
                background: m.role === "user" ? T.accent : T.surface, color: m.role === "user" ? T.onAccent : T.text, border: m.role === "user" ? "none" : "1px solid " + T.line }}>{m.content}</div>
            ))}
            {busy && <div style={{ alignSelf: "flex-start", padding: "10px 13px", borderRadius: 12, background: T.surface, border: "1px solid " + T.line, fontFamily: T.sans, fontSize: 12.5, color: T.textMute }}>Pensando…</div>}
            {msgs.length <= 1 && !busy && (
              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 4 }}>
                {sugs.map(s => <button key={s} onClick={() => send(s)} style={{ textAlign: "left", fontFamily: T.sans, fontSize: 12, color: T.textMute, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "10px 12px", cursor: "pointer" }}>{s}</button>)}
              </div>
            )}
          </div>

          <div style={{ padding: "12px", borderTop: "1px solid " + T.line, display: "flex", gap: 8 }}>
            <button onClick={micToggle} title="Dictar por voz" style={{ width: 42, flexShrink: 0, borderRadius: 10, cursor: "pointer", background: listening ? "#C0285A" : T.surface, color: listening ? "#fff" : T.textMute, border: "1px solid " + (listening ? "#C0285A" : T.line), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
            </button>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") send(); }} placeholder={listening ? "Escuchando…" : "Escribe o dicta: «Agenda a María botox mañana 11»"}
              style={{ flex: 1, padding: "11px 13px", borderRadius: 10, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }} />
            <button onClick={() => send()} disabled={busy} style={{ width: 42, flexShrink: 0, borderRadius: 10, border: "none", cursor: "pointer", background: T.primaryBg, color: T.primaryText, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
Object.assign(window, { Copilot, facialAnswer, FACIAL_SYS });
