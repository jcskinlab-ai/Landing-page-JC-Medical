/* ═══════════ JC MEDICAL · DATOS PANEL CLÍNICO ═══════════ */
(function () {
  var PATIENTS = [
    { id: "p1", name: "María González", rut: "16.482.913-5", age: 38, phone: "+56 9 8421 7733", email: "maria.g@gmail.com",
      tags: ["Botox"], lastVisit: "2026-05-28", notes: "Frente y entrecejo. Buena respuesta a 20U. Sin alergias conocidas.",
      history: [
        { date: "2026-05-28", proc: "Botox 3 zonas", units: "24U", note: "Frente 8U · entrecejo 10U · patas de gallo 6U" },
        { date: "2026-02-12", proc: "Botox 3 zonas", units: "22U", note: "Control a 21 días: óptimo" }
      ], consent: true },
    { id: "p2", name: "Camila Soto", rut: "18.992.044-1", age: 31, phone: "+56 9 7651 2290", email: "camila.soto@gmail.com",
      tags: ["Rinomodelación"], lastVisit: "2026-06-02", notes: "Dorso nasal. 1 jeringa AH alta reticulación.",
      history: [{ date: "2026-06-02", proc: "Rinomodelación", units: "1 jeringa", note: "Dorso y punta. Resultado inmediato." }], consent: true },
    { id: "p3", name: "Antonia Vera", rut: "15.330.781-9", age: 45, phone: "+56 9 9013 4456", email: "antonia.vera@gmail.com",
      tags: ["Sculptra"], lastVisit: "2026-05-15", notes: "Plan 3 sesiones de sculptra. Sesión 2 realizada.",
      history: [
        { date: "2026-05-15", proc: "Sculptra · sesión 2", units: "2 viales", note: "Tercio medio y óvalo" },
        { date: "2026-03-20", proc: "Sculptra · sesión 1", units: "2 viales", note: "Sin eventos adversos" }
      ], consent: false },
    { id: "p4", name: "Fernanda Díaz", rut: "20.114.553-7", age: 29, phone: "+56 9 6622 8810", email: "fer.diaz@gmail.com",
      tags: ["Bruxismo"], lastVisit: "2026-06-08", notes: "Masetero bilateral. Refiere mejoría de cefalea.",
      history: [{ date: "2026-06-08", proc: "Bruxismo", units: "50U", note: "25U por masetero" }], consent: true }
  ];

  // Productos / insumos para registrar punción
  var PRODUCTS = [
    { id: "botox", label: "Toxina botulínica", unit: "U", color: "#8B9EB0" },
    { id: "ah", label: "Ácido hialurónico", unit: "ml", color: "#B9C2CB" },
    { id: "sculptra", label: "Sculptra (PLLA)", unit: "vial", color: "#C0285A" },
    { id: "meso", label: "Mesoterapia / NCTF", unit: "ml", color: "#6A8296" }
  ];

  // Zonas anatómicas sugeridas (coords % sobre el lienzo del rostro, vista frontal)
  var ZONES_FRONT = [
    { id: "frente", label: "Frente", x: 50, y: 24, def: "8U" },
    { id: "entrecejo", label: "Entrecejo", x: 50, y: 36, def: "10U" },
    { id: "pata-izq", label: "Patas de gallo izq.", x: 28, y: 40, def: "6U" },
    { id: "pata-der", label: "Patas de gallo der.", x: 72, y: 40, def: "6U" },
    { id: "nariz", label: "Dorso nasal", x: 50, y: 50, def: "0.3ml" },
    { id: "pomulo-izq", label: "Pómulo izq.", x: 30, y: 54, def: "0.5ml" },
    { id: "pomulo-der", label: "Pómulo der.", x: 70, y: 54, def: "0.5ml" },
    { id: "labios", label: "Labios", x: 50, y: 70, def: "0.6ml" },
    { id: "menton", label: "Mentón", x: 50, y: 82, def: "0.4ml" },
    { id: "maseter-izq", label: "Masetero izq.", x: 24, y: 70, def: "25U" },
    { id: "maseter-der", label: "Masetero der.", x: 76, y: 70, def: "25U" }
  ];
  var ZONES_SIDE = [
    { id: "frente-s", label: "Frente", x: 46, y: 24, def: "8U" },
    { id: "nariz-s", label: "Dorso nasal", x: 40, y: 48, def: "0.3ml" },
    { id: "punta-s", label: "Punta nasal", x: 30, y: 56, def: "0.2ml" },
    { id: "labios-s", label: "Labios", x: 38, y: 70, def: "0.4ml" },
    { id: "menton-s", label: "Mentón", x: 44, y: 82, def: "0.4ml" },
    { id: "mandibula-s", label: "Ángulo mandibular", x: 64, y: 76, def: "1ml" },
    { id: "pomulo-s", label: "Pómulo", x: 52, y: 52, def: "0.5ml" }
  ];

  // `vertical`: filtra el catálogo según el rubro de la clínica (window.isDental()).
  //   "estetica" → solo clínicas estéticas · "dental" → solo clínicas dentales
  //   sin campo    → se ofrece SIEMPRE (ej. el consentimiento extraordinario).
  // En estética el filtro devuelve exactamente los mismos ítems y en el mismo orden que antes.
  var CONSENTS = [
    { id: "c-botox", title: "Toxina botulínica", kind: "toxina", proc: "Toxina botulínica", cat: "Toxina", vertical: "estetica" },
    { id: "c-ah", title: "Relleno de Ácido Hialurónico", kind: "estandar", proc: "Relleno de Ácido Hialurónico", proc4: "relleno de ácido hialurónico", vascular: true, cat: "Relleno", vertical: "estetica" },
    { id: "c-sculptra", title: "Sculptra", kind: "estandar", proc: "Sculptra de colágeno", proc4: "Sculptra", vascular: false, cat: "Sculptra", vertical: "estetica" },
    { id: "c-bruxismo", title: "Bruxismo", kind: "custom", proc: "Toxina Botulínica — Bruxismo", cat: "Toxina", vertical: "estetica", paragraphs: [
      { n: "1.-", t: "Por el presente documento, autorizo a EU {EU} a realizar el procedimiento de tratamiento del bruxismo y/o apretamiento dental mediante la aplicación de Toxina Botulínica tipo A en el músculo masetero y/o temporal, con el objetivo de reducir la hiperactividad muscular involuntaria. El procedimiento me ha sido totalmente explicado, entendiendo su naturaleza y consecuencias." },
      { n: "2.-", t: "He entendido que los efectos son variables y reversibles, con una duración aproximada de 4 a 6 meses, comenzando a evidenciarse entre los 7 y 14 días posteriores a la aplicación." },
      { n: "3.-", t: "Reconozco que pueden presentarse los siguientes efectos transitorios: hematomas en los sitios de punción, inflamación leve, sensación de tensión mandibular, dificultad temporal para masticar alimentos duros y asimetría leve. Todos son reversibles." },
      { n: "4.-", t: "Soy consciente que la práctica de la medicina no es una ciencia exacta y que los resultados pueden ser variables entre pacientes." },
      { n: "5.-", t: "Doy fe de no encontrarme en alguna de las siguientes condiciones: embarazo o lactancia, enfermedades neuromusculares (miastenia gravis, esclerosis lateral amiotrófica u otras), ni de estar en tratamiento con aminoglucósidos u otros medicamentos que interfieran con la transmisión neuromuscular." },
      { n: "6.-", t: "Autorizo el registro del proceso mediante fotografías y vídeos con fines clínicos y académicos." },
      { n: "7.-", t: "He leído detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional a realizarme el procedimiento antes descrito." }
    ] },
    { id: "c-hiperh-facial", title: "Hiperhidrosis facial", kind: "custom", proc: "Toxina Botulínica — Hiperhidrosis facial", cat: "Toxina", vertical: "estetica", paragraphs: [
      { n: "1.-", t: "Por el presente documento, autorizo a EU {EU} a realizar el tratamiento de hiperhidrosis facial (sudoración excesiva del rostro) mediante micro-infiltraciones intradérmicas de Toxina Botulínica tipo A en las zonas afectadas (frente, nariz, mentón u otras áreas indicadas). El procedimiento me ha sido totalmente explicado." },
      { n: "2.-", t: "He entendido que la reducción de la sudoración es temporal y reversible, con una duración aproximada de 6 a 12 meses, comenzando a evidenciarse el efecto entre los 7 y 14 días posteriores al tratamiento." },
      { n: "3.-", t: "Reconozco que pueden presentarse los siguientes efectos transitorios: pequeñas marcas en los sitios de punción, enrojecimiento leve, hematomas y sensación de tensión cutánea. Todos son reversibles." },
      { n: "4.-", t: "Soy consciente que la práctica de la medicina no es una ciencia exacta y que los resultados pueden ser variables entre pacientes." },
      { n: "5.-", t: "Doy fe de no encontrarme en alguna de las siguientes condiciones: embarazo o lactancia, enfermedades neuromusculares, ni de estar en tratamiento con medicamentos que interfieran con la transmisión neuromuscular. No presento infección activa ni inflamación en las zonas a tratar." },
      { n: "6.-", t: "Autorizo el registro del proceso mediante fotografías y vídeos con fines clínicos y académicos." },
      { n: "7.-", t: "He leído detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional a realizarme el procedimiento antes descrito." }
    ] },
    { id: "c-hiperh-corp", title: "Hiperhidrosis axilar y palmar", kind: "custom", proc: "Toxina Botulínica — Hiperhidrosis axilar y palmar", cat: "Toxina", vertical: "estetica", paragraphs: [
      { n: "1.-", t: "Por el presente documento, autorizo a EU {EU} a realizar el tratamiento de hiperhidrosis axilar y/o palmar (sudoración excesiva de axilas y/o palmas) mediante micro-infiltraciones intradérmicas múltiples de Toxina Botulínica tipo A. El procedimiento me ha sido totalmente explicado, entendiendo su naturaleza y consecuencias." },
      { n: "2.-", t: "He entendido que los efectos son temporales y reversibles, con una duración aproximada de 6 a 12 meses para axilas y potencialmente menor para palmas. El beneficio comenzará a evidenciarse entre los 7 y 14 días post aplicación." },
      { n: "3.-", t: "Reconozco que pueden presentarse los siguientes efectos: hematomas en los sitios de punción, inflamación leve, sensación de tensión en la zona, debilidad muscular transitoria en los dedos (hiperhidrosis palmar) y en casos poco frecuentes sudoración compensatoria en otras áreas del cuerpo. Todos son reversibles." },
      { n: "4.-", t: "Soy consciente que la práctica de la medicina no es una ciencia exacta y que los resultados pueden ser variables entre pacientes." },
      { n: "5.-", t: "Doy fe de no encontrarme en alguna de las siguientes condiciones: embarazo o lactancia, enfermedades neuromusculares, ni de estar en tratamiento con medicamentos que interfieran con la transmisión neuromuscular. No presento infección activa ni inflamación en las zonas a tratar." },
      { n: "6.-", t: "Autorizo el registro del proceso mediante fotografías y vídeos con fines clínicos y académicos." },
      { n: "7.-", t: "He leído detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional a realizarme el procedimiento antes descrito." }
    ] },
    /* ── ODONTOLOGÍA (solo visibles cuando window.isDental() === true) ──
       Textos redactados en términos prudentes: describen riesgos reales del procedimiento,
       alternativas y cuidados, sin garantizar resultados. No citan normativa específica. */
    { id: "c-dent-exo-simple", title: "Extracción dental simple", kind: "custom", proc: "Extracción dental simple (exodoncia)", cat: "Cirugía", vertical: "dental", paragraphs: [
      { n: "1.-", t: "Autorizo al profesional {EU} a realizar la extracción (exodoncia) de la(s) pieza(s) dentaria(s) que me fue(ron) indicada(s) y que me fue(ron) identificada(s) previamente. El procedimiento, su motivo y sus alcances me fueron explicados en lenguaje comprensible y pude hacer todas las preguntas que estimé necesarias." },
      { n: "2.-", t: "Se me explicó que el procedimiento se realiza bajo anestesia local y que la extracción de una pieza dentaria es irreversible: el diente no se recupera. Entiendo que la ausencia de la pieza puede producir con el tiempo migración de los dientes vecinos, extrusión del diente antagonista y pérdida de hueso en la zona, y que existen alternativas para reponerla (prótesis fija, prótesis removible o implante), cuya indicación y costo se evalúan por separado." },
      { n: "3.-", t: "Se me informaron las alternativas a la extracción cuando existen (por ejemplo, tratamiento de conducto, restauración o tratamiento periodontal), así como las razones por las que en mi caso se indicó la extracción y las consecuencias de no tratar la pieza." },
      { n: "4.-", t: "Comprendo que pueden presentarse las siguientes complicaciones, la mayoría transitorias: dolor e inflamación en los días posteriores, sangrado, hematomas, apertura limitada de la boca, infección del sitio operatorio, alveolitis (inflamación dolorosa del alvéolo), fractura de la corona o de la raíz que obligue a un abordaje quirúrgico, daño de restauraciones o piezas vecinas y, con menor frecuencia, comunicación con el seno maxilar o alteración transitoria de la sensibilidad del labio, mentón o lengua." },
      { n: "5.-", t: "Declaro haber informado de forma completa y veraz mis antecedentes de salud: enfermedades sistémicas, alergias (en especial a anestésicos o antibióticos), medicamentos que utilizo —incluidos anticoagulantes, antiagregantes y bifosfonatos—, embarazo o lactancia, y consumo de tabaco. Entiendo que omitir estos datos puede aumentar el riesgo del procedimiento." },
      { n: "6.-", t: "Me comprometo a seguir las indicaciones postoperatorias que se me entregarán por escrito, a tomar los medicamentos que se me indiquen y a asistir a los controles. Sé que debo consultar de inmediato ante sangrado que no cede, dolor intenso que aumenta después del tercer día, fiebre o aumento de volumen progresivo." },
      { n: "7.-", t: "Entiendo que la odontología no es una ciencia exacta y que, aunque el profesional pondrá todos los medios a su alcance, no es posible garantizar un resultado ni la ausencia de complicaciones." },
      { n: "8.-", t: "Autorizo el registro clínico del procedimiento mediante fotografías, radiografías y modelos de estudio, para fines de tratamiento y, cuando corresponda, docentes o académicos resguardando mi identidad." },
      { n: "9.-", t: "He leído y comprendido este documento, se me respondieron mis dudas y consiento de forma libre e informada la realización del procedimiento descrito. Sé que puedo revocar este consentimiento antes de su inicio." }
    ] },
    { id: "c-dent-exo-qx", title: "Extracción quirúrgica (incluye terceros molares)", kind: "custom", proc: "Extracción dental quirúrgica / tercer molar incluido", cat: "Cirugía", vertical: "dental", paragraphs: [
      { n: "1.-", t: "Autorizo al profesional {EU} a realizar la extracción quirúrgica de la(s) pieza(s) dentaria(s) indicada(s), que puede incluir terceros molares retenidos o piezas incluidas. Comprendo que el procedimiento requiere incisión de la encía, levantamiento de un colgajo, desgaste de hueso, seccionamiento del diente y sutura." },
      { n: "2.-", t: "Se me explicaron el motivo de la indicación, las alternativas disponibles —incluida la de mantener la pieza bajo control clínico y radiográfico— y las consecuencias previsibles de no realizar el procedimiento." },
      { n: "3.-", t: "Entiendo que el postoperatorio habitual incluye dolor, inflamación de la mejilla, hematomas y limitación para abrir la boca durante varios días, y que estos efectos son esperables y transitorios." },
      { n: "4.-", t: "Se me informó que pueden presentarse complicaciones, algunas poco frecuentes: sangrado prolongado, infección del sitio operatorio, alveolitis, dehiscencia de la sutura, fractura de la tabla ósea o de la tuberosidad, desplazamiento de un resto radicular, comunicación con el seno maxilar y, en el caso de piezas inferiores, lesión del nervio dentario inferior o del nervio lingual, que puede provocar adormecimiento o alteración de la sensibilidad del labio, mentón o lengua. Esta alteración es habitualmente transitoria, pero en casos infrecuentes puede ser prolongada o permanente." },
      { n: "5.-", t: "Se me indicaron los exámenes previos necesarios (radiografía panorámica y, si el profesional lo estima, tomografía) y comprendo que el riesgo se evalúa a partir de ellos, sin que sea posible eliminarlo por completo." },
      { n: "6.-", t: "Declaro haber informado de forma completa y veraz mis antecedentes de salud: enfermedades sistémicas, alergias, medicamentos que utilizo —incluidos anticoagulantes, antiagregantes y bifosfonatos—, embarazo o lactancia y consumo de tabaco." },
      { n: "7.-", t: "Me comprometo a seguir las indicaciones postoperatorias, a completar el tratamiento farmacológico indicado, a asistir al control y al retiro de puntos, y a consultar de inmediato ante sangrado que no cede, dolor que aumenta después del tercer día, fiebre, dificultad para tragar o respirar, o aumento de volumen progresivo." },
      { n: "8.-", t: "Entiendo que la odontología no es una ciencia exacta y que no puede garantizarse un resultado determinado ni la ausencia de complicaciones, aun con una técnica correcta." },
      { n: "9.-", t: "Autorizo el registro clínico del procedimiento mediante fotografías, radiografías y modelos de estudio, para fines de tratamiento y, cuando corresponda, docentes o académicos resguardando mi identidad." },
      { n: "10.-", t: "He leído y comprendido este documento, se me respondieron mis dudas y consiento de forma libre e informada la realización del procedimiento descrito. Sé que puedo revocar este consentimiento antes de su inicio." }
    ] },
    { id: "c-dent-ortodoncia", title: "Tratamiento de ortodoncia", kind: "custom", proc: "Tratamiento de ortodoncia", cat: "Ortodoncia", vertical: "dental", paragraphs: [
      { n: "1.-", t: "Autorizo al profesional {EU} a realizar el tratamiento de ortodoncia planificado a partir de mi examen clínico, radiografías, fotografías y modelos de estudio. Se me explicaron los objetivos del tratamiento, el tipo de aparatología a utilizar (fija o removible, según corresponda) y su duración estimada." },
      { n: "2.-", t: "Entiendo que la duración es una ESTIMACIÓN y no un plazo garantizado: depende de mi respuesta biológica, del crecimiento, de la asistencia puntual a los controles y del cumplimiento de las indicaciones, incluido el uso de elásticos u otros dispositivos. La inasistencia o el incumplimiento pueden prolongar el tratamiento o comprometer el resultado." },
      { n: "3.-", t: "Se me informó que pueden presentarse: molestias y sensibilidad dentaria después de cada ajuste, lesiones o úlceras transitorias en labios, mejillas y lengua, dificultad inicial para hablar y comer, descalcificación o manchas blancas y caries si la higiene es deficiente, inflamación de las encías, reabsorción radicular (acortamiento de la raíz), recesión de encías, anquilosis, problemas o dolor en la articulación temporomandibular, y descementado o fractura de brackets y aparatos." },
      { n: "4.-", t: "Comprendo que la higiene bucal rigurosa y los controles odontológicos periódicos son parte esencial del tratamiento, y que el tratamiento de ortodoncia no reemplaza el tratamiento de caries ni el tratamiento periodontal, los que deben realizarse y mantenerse en paralelo." },
      { n: "5.-", t: "Acepto que en algunos casos el plan puede requerir modificaciones durante su desarrollo, incluyendo la extracción de piezas dentarias, el uso de dispositivos auxiliares o la derivación a cirugía ortognática, y que estas indicaciones me serán explicadas antes de ejecutarlas." },
      { n: "6.-", t: "Entiendo que al finalizar el tratamiento activo es INDISPENSABLE el uso de contención (fija, removible o ambas) por el tiempo que se me indique, y que los dientes tienden naturalmente a moverse con los años. El abandono de la contención puede producir recidiva, sin que ello sea atribuible a un defecto del tratamiento." },
      { n: "7.-", t: "Se me explicaron las alternativas al tratamiento propuesto, incluida la de no tratarse, y las consecuencias previsibles de cada una." },
      { n: "8.-", t: "Entiendo que la odontología no es una ciencia exacta: el profesional pondrá todos los medios a su alcance, pero no puede garantizar un resultado estético o funcional determinado." },
      { n: "9.-", t: "Autorizo el registro clínico mediante fotografías, radiografías y modelos de estudio, para fines de tratamiento y, cuando corresponda, docentes o académicos resguardando mi identidad." },
      { n: "10.-", t: "He leído y comprendido este documento, se me respondieron mis dudas y consiento de forma libre e informada el inicio del tratamiento descrito." }
    ] },
    { id: "c-dent-implante", title: "Implante dental oseointegrado", kind: "custom", proc: "Instalación de implante dental oseointegrado", cat: "Implantología", vertical: "dental", paragraphs: [
      { n: "1.-", t: "Autorizo al profesional {EU} a realizar la instalación de implante(s) dental(es) oseointegrado(s) en la(s) zona(s) que me fue(ron) indicada(s), y los procedimientos complementarios que sean necesarios. Se me explicó que el tratamiento tiene una etapa quirúrgica (instalación del implante), un período de cicatrización y oseointegración, y una etapa protésica posterior (corona o prótesis), y que cada etapa tiene sus propios plazos y costos." },
      { n: "2.-", t: "Se me informaron las alternativas para reponer la(s) pieza(s) ausente(s) —prótesis fija, prótesis removible o no tratarse— con sus ventajas y desventajas, así como las consecuencias previsibles de no realizar el tratamiento." },
      { n: "3.-", t: "Entiendo que el diagnóstico se basa en el examen clínico y en imágenes (radiografía y, cuando el profesional lo indique, tomografía), y que puede requerirse un procedimiento adicional de aumento de hueso o de tejido blando (injerto, regeneración ósea o elevación del piso del seno maxilar), lo que se me explicará antes de realizarlo." },
      { n: "4.-", t: "Comprendo que el postoperatorio habitual incluye dolor, inflamación, hematomas y sangrado leve, y que pueden presentarse complicaciones tales como: infección, dehiscencia de la sutura, exposición o pérdida del injerto, perforación del seno maxilar, daño de estructuras vecinas, y alteración de la sensibilidad del labio, mentón o lengua por compromiso nervioso, habitualmente transitoria y en casos infrecuentes prolongada o permanente." },
      { n: "5.-", t: "Entiendo que el implante puede NO oseointegrarse y perderse, tanto en la fase de cicatrización como años después, y que ello puede obligar a retirarlo, esperar la cicatrización y evaluar un nuevo intento, sin que exista certeza de éxito. El tabaquismo, la diabetes no controlada, el bruxismo, la enfermedad periodontal activa, una higiene deficiente y la ausencia de controles aumentan de manera significativa este riesgo." },
      { n: "6.-", t: "Me comprometo a mantener una higiene rigurosa, a asistir a los controles periódicos y a las mantenciones indicadas de por vida, y a informar cualquier movilidad, sangrado, dolor o inflamación alrededor del implante. Entiendo que la periimplantitis es una complicación tardía que puede llevar a la pérdida del implante." },
      { n: "7.-", t: "Declaro haber informado de forma completa y veraz mis antecedentes de salud: enfermedades sistémicas —en especial diabetes—, alergias, medicamentos que utilizo —incluidos anticoagulantes, antiagregantes, bifosfonatos y otros antirresortivos—, radioterapia previa de cabeza y cuello, embarazo o lactancia y consumo de tabaco." },
      { n: "8.-", t: "Entiendo que la odontología no es una ciencia exacta y que, aun con una técnica correcta, no es posible garantizar el éxito del implante ni un resultado estético determinado, y que la vida útil de la prótesis depende del uso, del hábito y de las mantenciones." },
      { n: "9.-", t: "Autorizo el registro clínico del procedimiento mediante fotografías, radiografías, tomografías y modelos de estudio, para fines de tratamiento y, cuando corresponda, docentes o académicos resguardando mi identidad." },
      { n: "10.-", t: "He leído y comprendido este documento, se me respondieron mis dudas y consiento de forma libre e informada la realización del tratamiento descrito. Sé que puedo revocar este consentimiento antes de su inicio." }
    ] },
    { id: "c-extra", title: "Consentimiento extraordinario", kind: "extra", proc: "", cat: "Extraordinario", body: "" }
  ];

  window.JCADMIN = { patients: PATIENTS, products: PRODUCTS, zonesFront: ZONES_FRONT, zonesSide: ZONES_SIDE, consents: CONSENTS, pro: "/assets/jc-pro.jpg" };
})();
