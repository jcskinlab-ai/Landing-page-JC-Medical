/* ═══════════════ JC MEDICAL · DATOS REALES ═══════════════ */
(function () {
  var WA = "56997880877";

  // ── Tratamientos destacados (con foto de resultado real) ──
  var FEATURED = [
    {
      id: "botox",
      name: "Toxina botulínica",
      sub: "Expresión natural",
      price: 150000, priceLabel: "desde $150.000",
      img: "assets/ad-botox-soft.png",
      photo: "assets/cat/page3.jpg",
      zone: "Frente y entrecejo", chip: "Suavizado",
      desc: "Suaviza arrugas dinámicas y previene su profundización, conservando una expresión que sigue siendo tuya. Dosificación precisa por zona, nunca por plantilla.",
      facts: [["Sutil", "Movimiento natural"], ["3–7 días", "Inicio del efecto"], ["3–6 meses", "Duración"]]
    },
    {
      id: "sculptra",
      name: "Sculptra",
      sub: "Bioestimulación de colágeno",
      price: 450000, priceLabel: "desde $450.000",
      img: "assets/ad-sculptra-soft.png",
      photo: "assets/cat/page5.jpg",
      zone: "Tercio medio y óvalo", chip: "Firmeza",
      desc: "Estimula tu propio colágeno para mejorar firmeza, densidad y calidad de la piel de forma progresiva. No rellena: reconstruye estructura desde dentro.",
      facts: [["Progresivo", "Colágeno propio"], ["Por plan", "Sesiones graduadas"], ["~24 meses", "Duración"]]
    },
    {
      id: "rino",
      name: "Rinomodelación",
      sub: "Sin cirugía",
      price: 200000, priceLabel: "$200.000",
      img: "assets/ad-rino-soft.png",
      photo: "assets/cat/page9.jpg",
      zone: "Dorso y punta nasal", chip: "Definido",
      desc: "Corrección no quirúrgica del contorno nasal con ácido hialurónico para equilibrar el dorso, refinar la punta y proyectar el perfil. Resultado inmediato y armónico.",
      facts: [["Inmediato", "Resultado visible"], ["En consulta", "Una sesión"], ["~12 meses", "Duración"]]
    }
  ];

  // ── Catálogo completo (Facial / Corporal) ──
  var CATALOG = [
    { sec: "Facial", groups: [
      { cat: "Toxina botulínica", items: [
        { n: "Botox 3 zonas", t: "Tercio superior", d: "3–6 meses", price: 150000, x: "Toxina botulínica en frente, entrecejo y patas de gallo para un rostro más descansado conservando tu gesto." },
        { n: "Botox 3 zonas + Lifting de ceja", t: "4 zonas", d: "3–6 meses", price: 170000, x: "Frente, entrecejo y patas de gallo más levantamiento de ceja para una mirada más descansada y abierta. Ideal para quienes tienen piel abundante en el párpado superior. Conserva tu expresión natural." },
        { n: "Botox Full Face (8 zonas)", t: "8 zonas", d: "3–6 meses", price: 350000, x: "Cara completa en una sola sesión. Incluye control y retoque al día 21." },
        { n: "Tratamiento de bruxismo con toxina botulínica", t: "Funcional · masetero", d: "3–6 meses", price: 240000, x: "Alivia dolor de cabeza, desgaste dental y tensión mandibular, y afina el contorno del rostro." },
        { n: "Hiperhidrosis facial", t: "Sudoración", d: "3–6 meses", price: 240000, x: "Controla la sudoración excesiva del rostro con resultados discretos y duraderos." },
        { n: "Tratamiento sonrisa gingival", t: "Sonrisa", d: "6–12 meses", price: 150000, x: "Sonrisa más armoniosa reduciendo la exposición excesiva de encías." },
        { n: "Mentón empedrado", t: "Mentón", d: "6–12 meses", price: 100000, x: "Alisa el mentón y eleva con sutileza la comisura caída." },
        { n: "Rejuvenecimiento de cuello · Nefertiti", t: "Cuello", d: "~6 meses", price: 250000, x: "Rejuvenece y estiliza el cuello y define la línea mandibular." },
        { n: "Código de barras, tratamiento de arrugas", t: "Labio superior", d: "3–6 meses", price: 100000, x: "Atenúa las líneas verticales sobre el labio superior." }
      ]},
      { cat: "Bioestimulación de colágeno con Sculptra", items: [
        { n: "Bioestimulación de colágeno facial", t: "Full face", d: "~24 meses", price: 450000, opts: [["1 sesión — full face", 450000], ["Pack 3 sesiones", 1200000]], x: "Recupera volumen y contorno, mejora firmeza e hidratación de forma progresiva." },
        { n: "Bioestimulación de surcos nasogenianos y marionetas", t: "Localizado", d: "~24 meses", price: 450000, opts: [["1 sesión", 450000], ["Pack 3 sesiones", 1200000]], x: "Devuelve firmeza al tercio inferior estimulando colágeno propio." },
        { n: "Bioestimulación de cuello", t: "Cuello", d: "~24 meses", price: 500000, opts: [["1 sesión", 500000], ["Pack 3 sesiones", 1450000]], x: "Mejora firmeza, textura y calidad de la piel del cuello." }
      ]},
      { cat: "Armonización facial", items: [
        { n: "Rinomodelación", t: "Juvéderm · Ácido hialurónico", d: "10–12 meses", price: 200000, x: "Equilibra el perfil sin cirugía: define el dorso o eleva la punta de la nariz. Utilizamos Juvéderm, marca premium de ácido hialurónico, una de las mejores del mercado." },
        { n: "Proyección de mentón", t: "Juvéderm · Ácido hialurónico", d: "10–12 meses", price: 180000, x: "Perfil más armonioso y simétrico aportando proyección al mentón. Realizado con Juvéderm, marca premium de ácido hialurónico." },
        { n: "Definición de arco mandibular", t: "Juvéderm · Ácido hialurónico", d: "10–12 meses", price: 200000, opts: [["1 jeringa · $200.000", 200000], ["2 jeringas · $340.000", 340000]], x: "Define el borde mandibular y la barbilla para un rostro más estructurado. Con Juvéderm, ácido hialurónico de marca premium." },
        { n: "Realce de pómulos", t: "Juvéderm · Ácido hialurónico", d: "10–12 meses", price: 180000, x: "Eleva los tejidos, angula el rostro y atenúa los surcos nasogenianos. Con Juvéderm, marca premium de ácido hialurónico." },
        { n: "Código de barras con ácido hialurónico", t: "Juvéderm · Ácido hialurónico", d: "10–12 meses", price: 180000, x: "Suaviza e hidrata las líneas verticales del labio superior con Juvéderm, marca premium de ácido hialurónico." }
      ]},
      { cat: "Mesoterapia · vitaminas faciales", items: [
        { n: "NCTF 135 HA", t: "Biorevitalización", d: "6–12 meses", price: 150000, opts: [["1 sesión", 150000], ["Pack 3 sesiones", 420000]], x: "Revitaliza la piel: más luminosidad, hidratación y firmeza." },
        { n: "ADN de salmón · Rejuran", t: "Regeneración", d: "6–12 meses", price: 180000, opts: [["1 sesión", 180000], ["Pack 3 sesiones", 500000]], x: "Regenera, ilumina y redefine la piel con polinucleótidos de ADN de salmón." }
      ]}
    ]},
    { sec: "Corporal", groups: [
      { cat: "Quemadores de grasa", items: [
        { n: "Quemadores de grasa localizada", t: "Lipolíticos", d: "Permanente", price: 300000, opts: [["Pack 3 sesiones", 300000], ["Pack 6 sesiones", 550000]], x: "Reduce grasa localizada en papada, brazos, abdomen, piernas y glúteos. Incluye celulitis." }
      ]},
      { cat: "Toxina botulínica", items: [
        { n: "Hiperhidrosis axilar y palmar", t: "Sudoración", d: "3–6 meses", price: 250000, x: "Controla la sudoración excesiva en axilas y palmas, con resultados duraderos." }
      ]},
      { cat: "Bioestimulación", items: [
        { n: "Bioestimulación de manos", t: "Corporal", d: "~24 meses", price: 450000, opts: [["1 sesión", 450000], ["Pack 3 sesiones", 1200000]], x: "Rejuvenece el dorso de las manos devolviendo densidad y firmeza." }
      ]}
    ]},
    { sec: "Promociones", groups: [
      { cat: "Packs de temporada · por tiempo limitado", items: [
        { n: "Botox Tercio Superior · 2 personas", t: "4 zonas cada una", d: "Ahorra $40.000", price: 300000, promo: true, save: 40000, x: "Trae a alguien y ahorren juntas: toxina botulínica en 4 zonas del tercio superior para dos personas. Expresión natural y descansada. Valor total $300.000 (en vez de $340.000)." },
        { n: "Sculptra · 2 sesiones para compartir", t: "Para ti y alguien más", d: "Ahorra $100.000", price: 800000, promo: true, save: 100000, x: "Dos sesiones de bioestimulación de colágeno con Sculptra para ti y quien tú elijas. Firmeza y calidad de piel progresiva. Valor total $800.000 (en vez de $900.000)." }
      ]}
    ]}
  ];

  // ── Antes / Después ──
  // Casos reales (composiciones antes/después con marca incluida). proc + price → carrito con valor real.
  var BEFORE_AFTER = [
    { id: "botox1", t: "Toxina botulínica", img: "assets/ba-botox-1.png", note: "Frente y entrecejo · control a los 14 días", proc: "Toxina botulínica", price: 150000 },
    { id: "botox2", t: "Toxina botulínica", img: "assets/ba-botox-2.png", note: "Líneas de expresión · resultado natural", proc: "Toxina botulínica", price: 150000 },
    { id: "botox3", t: "Toxina botulínica", img: "assets/ba-botox-3.png", note: "Entrecejo · suavizado del ceño", proc: "Toxina botulínica", price: 150000 },
    { id: "rino1", t: "Rinomodelación", img: "assets/ba-rino-1.png", note: "Dorso y punta · resultado inmediato", proc: "Rinomodelación", price: 200000 },
    { id: "rino2", t: "Rinomodelación", img: "assets/ba-rino-2.png", note: "Perfil armónico · sin cirugía", proc: "Rinomodelación", price: 200000 },
    { id: "sculptra", t: "Sculptra", img: "assets/ad-sculptra-soft.png", note: "Tercio medio · resultado progresivo", proc: "Sculptra", price: 450000 }
  ];

  // ── Feed (estilo Instagram) ──
  var FEED = [
    { id: "p1", kind: "statement", tag: "Filosofía", title: "La naturalidad también es una técnica.", likes: 312, dark: true },
    { id: "p2", kind: "photo", tag: "Educativo · Botox", title: "¿Cuándo empieza a notarse la toxina botulínica?", img: "assets/ad-botox-soft.png", likes: 487, swipe: true },
    { id: "p3", kind: "promo", tag: "Edición limitada", big: "20%", title: "Bioestimulación de colágeno", sub: "Agenda tu evaluación este mes", likes: 256, dark: true },
    { id: "p4", kind: "photo", tag: "Antes / Después", title: "Sculptra · firmeza progresiva", img: "assets/ad-sculptra-soft.png", likes: 612 },
    { id: "p5", kind: "statement", tag: "Criterio clínico", title: "Cada rostro pide su propia dosis.", likes: 198, dark: true },
    { id: "p6", kind: "photo", tag: "Resultado real", title: "Rinomodelación sin cirugía", img: "assets/ad-rino-soft.png", likes: 534 }
  ];

  // ── Agenda / horarios ──
  var DAYS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  var MONTHS_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  function defaultSlots(wd) {
    var out = [], end = wd === 6 ? 14 : 20; // sáb hasta 14:00 · resto 08:00–20:00
    // Bloques cada 30 min (reservas de 30 o 60 min, nunca 45).
    for (var h = 8; h < end; h++) { ["00", "30"].forEach(function (m) { out.push((h < 10 ? "0" + h : h) + ":" + m); }); }
    return out;
  }
  function loadHorarios() { try { return JSON.parse(localStorage.getItem("jcm_horarios_v1") || "{}"); } catch (e) { return {}; } }
  function getAvail(wd) { var h = loadHorarios()[wd]; if (h) return { open: h.open !== false, slots: h.slots || defaultSlots(wd) }; return { open: wd !== 0, slots: defaultSlots(wd) }; }
  // Disponibilidad por FECHA exacta (la clínica la define en App JC Medical → Horarios disponibles).
  // jcm_horarios_dates = { "YYYY-MM-DD": ["10:00","10:45", …] }  (lista de horas habilitadas ese día)
  function dKey(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function loadHorariosDates() { try { return JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}"); } catch (e) { return {}; } }
  function saveHorariosDates(map) { try { localStorage.setItem("jcm_horarios_dates", JSON.stringify(map)); } catch (e) {} }
  // Grilla completa de horas seleccionables para un día (10:00–19:30; sábado hasta 14:30).
  function slotGrid(wd) {
    var out = [], end = wd === 6 ? 14 : 20; // sáb hasta 14:00 · resto 08:00–19:30
    for (var h = 8; h < end; h++) { ["00", "30"].forEach(function (m) { out.push((h < 10 ? "0" + h : h) + ":" + m); }); }
    return out;
  }
  function availForDate(d) {
    var ov = loadHorariosDates()[dKey(d)];
    if (ov) return { open: ov.length > 0, slots: ov.slice() };   // override por fecha
    return getAvail(d.getDay());                                  // recurrente por día de semana
  }

  function buildSchedule() {
    var days = [];
    var now = new Date();
    var base = new Date(now); base.setHours(0, 0, 0, 0);
    var nowMinutes = now.getHours() * 60 + now.getMinutes(); // minutos del día actual
    for (var i = 0; i <= 21; i++) {  // i=0 incluye hoy
      var d = new Date(base); d.setDate(base.getDate() + i);
      var wd = d.getDay();
      var isToday = (i === 0);
      var av = availForDate(d);
      if (!av.open || !av.slots.length) continue;
      var slots = av.slots
        .filter(function (time) {
          if (!isToday) return true;
          // Para hoy: ocultar slots que ya pasaron (con 30 min de margen)
          var parts = time.split(':');
          var slotMinutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1] || '0', 10);
          return slotMinutes > nowMinutes + 30;
        })
        .map(function (time) {
          // Todos los horarios configurados quedan disponibles (sin "ocupado" de demo).
          // La disponibilidad real la confirma la clínica; así la app calza con el panel.
          return { time: time, taken: false };
        });
      if (!slots.length) continue; // hoy sin horas disponibles → no mostrar
      days.push({
        date: dKey(d),   // fecha LOCAL (Chile), no UTC — evita desfase de día cerca de medianoche
        wd: DAYS_ES[wd], dd: d.getDate(), mm: MONTHS_ES[d.getMonth()],
        slots: slots
      });
    }
    return days;
  }

  // ── Citas del profesional (panel) ──
  var APPOINTMENTS = [
    { id: "a1", name: "María González", proc: "Botox 3 zonas", time: "10:00", status: "confirmada", paid: true, day: 0 },
    { id: "a2", name: "Camila Soto", proc: "Rinomodelación", time: "11:30", status: "confirmada", paid: true, day: 0 },
    { id: "a3", name: "Javiera Rojas", proc: "Evaluación", time: "16:00", status: "pendiente", paid: false, day: 0 },
    { id: "a4", name: "Antonia Vera", proc: "Sculptra · sesión 2", time: "10:45", status: "confirmada", paid: true, day: 1 },
    { id: "a5", name: "Fernanda Díaz", proc: "Bruxismo", time: "12:15", status: "pendiente", paid: false, day: 1 }
  ];

  // ── Recordatorios / seguimiento ──
  var REMINDERS = [
    { id: "r1", name: "María González", proc: "Botox 3 zonas", type: "Control de retoque", due: "en 21 días", tone: "control" },
    { id: "r2", name: "Antonia Vera", proc: "Sculptra", type: "Sesión 3 de 3", due: "en 6 semanas", tone: "sesion" },
    { id: "r3", name: "Camila Soto", proc: "Rinomodelación", type: "Seguimiento de resultado", due: "en 7 días", tone: "seguimiento" },
    { id: "r4", name: "Valentina Pérez", proc: "NCTF 135", type: "Mantención recomendada", due: "vencido hace 3 días", tone: "vencido" }
  ];

  // ── Productos / marcas (ficha de producto en el Home) ──
  var PRODUCTS = [
    { brand: "Botox® · AbbVie", img: "assets/trust-botox.jpg", tipo: "Toxina botulínica tipo A", origen: "Estados Unidos", fabricante: "AbbVie / Allergan Aesthetics",
      desc: "La toxina botulínica tipo A original y la más estudiada del mundo. La usamos para relajar la musculatura que marca las arrugas de expresión.",
      uso: "Microinyecciones intramusculares con aguja ultrafina, en dosis precisas por zona (nunca por plantilla).",
      beneficios: "Suaviza frente, entrecejo y patas de gallo conservando tu expresión; previene que las arrugas se profundicen. Efecto desde el día 3–7, dura 3–6 meses.",
      efectos: "Enrojecimiento o pequeño hematoma puntual que desaparece en días; rara vez asimetría temporal corregible." },
    { brand: "Sculptra® · Galderma", img: "assets/trust-sculptra.jpg", tipo: "Bioestimulador de colágeno (PLLA)", origen: "Francia", fabricante: "Galderma",
      desc: "Bioestimulador de ácido poli-L-láctico que no rellena: reconstruye estructura estimulando tu propio colágeno de forma progresiva.",
      uso: "Inyección con cánula distribuida en abanico en planos profundos. Requiere masaje post-tratamiento indicado.",
      beneficios: "Mejora firmeza, densidad y calidad de la piel; recupera volumen perdido. Resultado progresivo de hasta ~24 meses.",
      efectos: "Inflamación temporal; nódulos palpables poco frecuentes si se realiza el masaje post-tratamiento." },
    { brand: "Ácido hialurónico · grado médico", img: "assets/trust-vial.jpg", tipo: "Relleno dérmico reticulado", origen: "Europa (lab. certificados)", fabricante: "Laboratorios dérmicos certificados",
      desc: "Gel de ácido hialurónico reticulado de alta calidad, con lidocaína para tu comodidad. Reversible con hialuronidasa.",
      uso: "Inyección subcutánea o supraperióstica, frecuentemente con cánula de bajo calibre para mayor seguridad.",
      beneficios: "Aporta volumen, define contornos (labios, pómulos, mentón, mandíbula) e hidrata, con resultado inmediato y natural. Dura 9–18 meses.",
      efectos: "Edema los primeros 3–5 días, posibles hematomas y sensibilidad al tacto." }
  ];

  window.JCDATA = {
    wa: WA,
    products: PRODUCTS,
    contact: {
      address: "1 Poniente 1258, Talca",
      region: "Maule, Chile",
      ig: "@jcskinlab",
      email: "jc.skinlab@gmail.com",
      pro: "Juan Claudio Parra",
      role: "Enfermero Universitario · Medicina Estética",
      mapsQuery: "1 Poniente 1258, Talca, Maule, Chile",
      mapsEmbed: "https://www.google.com/maps?q=" + encodeURIComponent("1 Poniente 1258, Talca, Chile") + "&output=embed",
      mapsLink: "https://maps.google.com/?q=" + encodeURIComponent("1 Poniente 1258, Talca, Chile"),
      hours: [["Lun – Vie", "10:30 – 19:00"], ["Sábado", "10:30 – 14:30"], ["Domingo", "Cerrado"]]
    },
    // ⚠️ DATOS DE TRANSFERENCIA — EDITA estos valores con tu cuenta real.
    // El pago con tarjeta está bloqueado por ahora (cardEnabled: false).
    pago: {
      cardEnabled: false,
      banco: "Banco de Chile",
      tipo: "Cuenta Vista",
      numero: "00-014-12261-28",
      rut: "78.373.211-4",
      titular: "SKINLAB.TALCA SpA",
      email: "jc.skinlab@gmail.com"
    },
    featured: FEATURED,
    catalog: CATALOG,
    beforeAfter: BEFORE_AFTER,
    feed: FEED,
    schedule: buildSchedule(),
    appointments: APPOINTMENTS,
    reminders: REMINDERS,
    fmt: function (n) { return "$" + n.toLocaleString("es-CL"); },
    // ── Duración de la cita en minutos (fuente de verdad para reservas, panel y mensajes) ──
    // Reglas: toxina 30 min · Botox Full Face 45 min · ácido hialurónico, Sculptra/bioestimulación
    // y mesoterapia 60 min · quemador de grasa 30 min por defecto (se edita a 60 si son 2 zonas).
    procMin: function (name) {
      var n = (name || "").trim().toLowerCase();
      if (!n) return 30;
      if (n.indexOf("evaluaci") >= 0) return 30;
      if (n.indexOf("full face") >= 0) return 45; // toxina cara completa
      var cat = "";
      try { CATALOG.forEach(function (sec) { (sec.groups || []).forEach(function (g) { (g.items || []).forEach(function (it) { if ((it.n || "").trim().toLowerCase() === n) cat = (g.cat || "").toLowerCase(); }); }); }); } catch (e) {}
      var hay = cat + " " + n; // categoría + nombre (cubre servicios personalizados)
      // Ácido hialurónico (armonización), Sculptra/bioestimulación de colágeno y mesoterapia → 1 hora
      if (/armoniz|hialur|juv[eé]derm|sculptra|bioestim|col[aá]geno|mesoterap|vitamina|nctf|rejuran|salm[oó]n/.test(hay)) return 60;
      return 30; // toxina, quemador de grasa y por defecto
    },
    procMinLabel: function (name) { return this.procMin(name) + " min"; },
    DAYS_ES: DAYS_ES, MONTHS_ES: MONTHS_ES,
    defaultSlots: defaultSlots,
    availability: getAvail,
    saveHorarios: function (wd, data) { var all = loadHorarios(); all[wd] = data; try { localStorage.setItem("jcm_horarios_v1", JSON.stringify(all)); } catch (e) {} },
    // ── Horarios por fecha exacta (App JC Medical → Horarios disponibles) ──
    dKey: dKey,
    slotGrid: slotGrid,
    loadHorariosDates: loadHorariosDates,
    getDateSlots: function (dateStr) { var m = loadHorariosDates(); return m[dateStr] || null; },
    saveDateSlots: function (dateStr, slots) { var m = loadHorariosDates(); m[dateStr] = (slots || []).slice(); saveHorariosDates(m); this.schedule = buildSchedule(); return m; },
    resetDate: function (dateStr) { var m = loadHorariosDates(); delete m[dateStr]; saveHorariosDates(m); this.schedule = buildSchedule(); return m; },
    availForDate: availForDate,
    rebuildSchedule: function () { this.schedule = buildSchedule(); return this.schedule; }
  };
})();
