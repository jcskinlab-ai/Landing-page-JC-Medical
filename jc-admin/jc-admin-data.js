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
      tags: ["Sculptra"], lastVisit: "2026-05-15", notes: "Plan 3 sesiones de bioestimulación. Sesión 2 realizada.",
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

  var CONSENTS = [
    { id: "c-botox", title: "Toxina botulínica", kind: "toxina", proc: "Toxina botulínica", cat: "Toxina" },
    { id: "c-ah", title: "Relleno de Ácido Hialurónico", kind: "estandar", proc: "Relleno de Ácido Hialurónico", proc4: "relleno de ácido hialurónico", vascular: true, cat: "Relleno" },
    { id: "c-sculptra", title: "Bioestimulación con Sculptra", kind: "estandar", proc: "Bioestimulación de colágeno con Sculptra", proc4: "Sculptra", vascular: false, cat: "Bioestimulación" },
    { id: "c-bruxismo", title: "Bruxismo", kind: "custom", proc: "Toxina Botulínica — Bruxismo", cat: "Toxina", paragraphs: [
      { n: "1.-", t: "Por el presente documento, autorizo a EU {EU} a realizar el procedimiento de tratamiento del bruxismo y/o apretamiento dental mediante la aplicación de Toxina Botulínica tipo A en el músculo masetero y/o temporal, con el objetivo de reducir la hiperactividad muscular involuntaria. El procedimiento me ha sido totalmente explicado, entendiendo su naturaleza y consecuencias." },
      { n: "2.-", t: "He entendido que los efectos son variables y reversibles, con una duración aproximada de 4 a 6 meses, comenzando a evidenciarse entre los 7 y 14 días posteriores a la aplicación." },
      { n: "3.-", t: "Reconozco que pueden presentarse los siguientes efectos transitorios: hematomas en los sitios de punción, inflamación leve, sensación de tensión mandibular, dificultad temporal para masticar alimentos duros y asimetría leve. Todos son reversibles." },
      { n: "4.-", t: "Soy consciente que la práctica de la medicina no es una ciencia exacta y que los resultados pueden ser variables entre pacientes." },
      { n: "5.-", t: "Doy fe de no encontrarme en alguna de las siguientes condiciones: embarazo o lactancia, enfermedades neuromusculares (miastenia gravis, esclerosis lateral amiotrófica u otras), ni de estar en tratamiento con aminoglucósidos u otros medicamentos que interfieran con la transmisión neuromuscular." },
      { n: "6.-", t: "Autorizo el registro del proceso mediante fotografías y vídeos con fines clínicos y académicos." },
      { n: "7.-", t: "He leído detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional a realizarme el procedimiento antes descrito." }
    ] },
    { id: "c-hiperh-facial", title: "Hiperhidrosis facial", kind: "custom", proc: "Toxina Botulínica — Hiperhidrosis facial", cat: "Toxina", paragraphs: [
      { n: "1.-", t: "Por el presente documento, autorizo a EU {EU} a realizar el tratamiento de hiperhidrosis facial (sudoración excesiva del rostro) mediante micro-infiltraciones intradérmicas de Toxina Botulínica tipo A en las zonas afectadas (frente, nariz, mentón u otras áreas indicadas). El procedimiento me ha sido totalmente explicado." },
      { n: "2.-", t: "He entendido que la reducción de la sudoración es temporal y reversible, con una duración aproximada de 6 a 12 meses, comenzando a evidenciarse el efecto entre los 7 y 14 días posteriores al tratamiento." },
      { n: "3.-", t: "Reconozco que pueden presentarse los siguientes efectos transitorios: pequeñas marcas en los sitios de punción, enrojecimiento leve, hematomas y sensación de tensión cutánea. Todos son reversibles." },
      { n: "4.-", t: "Soy consciente que la práctica de la medicina no es una ciencia exacta y que los resultados pueden ser variables entre pacientes." },
      { n: "5.-", t: "Doy fe de no encontrarme en alguna de las siguientes condiciones: embarazo o lactancia, enfermedades neuromusculares, ni de estar en tratamiento con medicamentos que interfieran con la transmisión neuromuscular. No presento infección activa ni inflamación en las zonas a tratar." },
      { n: "6.-", t: "Autorizo el registro del proceso mediante fotografías y vídeos con fines clínicos y académicos." },
      { n: "7.-", t: "He leído detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional a realizarme el procedimiento antes descrito." }
    ] },
    { id: "c-hiperh-corp", title: "Hiperhidrosis axilar y palmar", kind: "custom", proc: "Toxina Botulínica — Hiperhidrosis axilar y palmar", cat: "Toxina", paragraphs: [
      { n: "1.-", t: "Por el presente documento, autorizo a EU {EU} a realizar el tratamiento de hiperhidrosis axilar y/o palmar (sudoración excesiva de axilas y/o palmas) mediante micro-infiltraciones intradérmicas múltiples de Toxina Botulínica tipo A. El procedimiento me ha sido totalmente explicado, entendiendo su naturaleza y consecuencias." },
      { n: "2.-", t: "He entendido que los efectos son temporales y reversibles, con una duración aproximada de 6 a 12 meses para axilas y potencialmente menor para palmas. El beneficio comenzará a evidenciarse entre los 7 y 14 días post aplicación." },
      { n: "3.-", t: "Reconozco que pueden presentarse los siguientes efectos: hematomas en los sitios de punción, inflamación leve, sensación de tensión en la zona, debilidad muscular transitoria en los dedos (hiperhidrosis palmar) y en casos poco frecuentes sudoración compensatoria en otras áreas del cuerpo. Todos son reversibles." },
      { n: "4.-", t: "Soy consciente que la práctica de la medicina no es una ciencia exacta y que los resultados pueden ser variables entre pacientes." },
      { n: "5.-", t: "Doy fe de no encontrarme en alguna de las siguientes condiciones: embarazo o lactancia, enfermedades neuromusculares, ni de estar en tratamiento con medicamentos que interfieran con la transmisión neuromuscular. No presento infección activa ni inflamación en las zonas a tratar." },
      { n: "6.-", t: "Autorizo el registro del proceso mediante fotografías y vídeos con fines clínicos y académicos." },
      { n: "7.-", t: "He leído detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional a realizarme el procedimiento antes descrito." }
    ] },
    { id: "c-extra", title: "Consentimiento extraordinario", kind: "extra", proc: "", cat: "Extraordinario", body: "" }
  ];

  window.JCADMIN = { patients: PATIENTS, products: PRODUCTS, zonesFront: ZONES_FRONT, zonesSide: ZONES_SIDE, consents: CONSENTS, pro: "/assets/jc-pro.jpg" };
})();
