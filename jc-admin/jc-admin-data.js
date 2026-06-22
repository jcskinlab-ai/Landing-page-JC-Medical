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
    { id: "c-extra", title: "Consentimiento extraordinario", kind: "extra", proc: "", cat: "Extraordinario", body: "" }
  ];

  window.JCADMIN = { patients: PATIENTS, products: PRODUCTS, zonesFront: ZONES_FRONT, zonesSide: ZONES_SIDE, consents: CONSENTS, pro: "assets/jc-pro.jpg" };
})();
