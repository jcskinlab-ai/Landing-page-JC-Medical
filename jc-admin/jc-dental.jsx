/* ════════════════════════════════════════════════════════════════════════════
 * ODONTOGRAMA DIGITAL — vertical dental de Medique
 * ────────────────────────────────────────────────────────────────────────────
 * Equivalente dental del Mapa facial (jc-face.jsx): un mapa interactivo donde
 * el profesional registra el estado de cada pieza, su historial y sus
 * radiografías. Sigue el mismo molde que FaceMap:
 *   - componente que persiste solo vía updatePatient (sin value/onChange),
 *   - estado local para la selección (no se persiste),
 *   - registro final en window (no hay módulos ES: todo es global),
 *   - reutiliza la capa de fotos de jc-face para las radiografías.
 *
 * DIFERENCIA DELIBERADA con FaceMap: el rostro se marca con puntos libres sobre
 * una foto (posicionamiento en % + hit-testing con getBoundingClientRect). La
 * dentadura NO es un lienzo libre: son 32 piezas discretas y numeradas. Por eso
 * cada pieza es un <button> con su propio <svg>, en vez de divs posicionados en
 * absoluto. Sale gratis lo que en FaceMap costaría: navegación por teclado,
 * lectores de pantalla y foco visible.
 *
 * Todo este archivo solo se monta cuando window.isDental() — una clínica
 * estética jamás lo ve.
 * ════════════════════════════════════════════════════════════════════════════ */

/* ── Estados de una pieza ────────────────────────────────────────────────────
 * `code` NO es decorativo: es la accesibilidad del módulo. Un odontograma que
 * distingue "caries" de "obturación" SOLO por color es ilegible para el ~8% de
 * los hombres con daltonismo — y estas son decisiones clínicas. Cada pieza
 * lleva siempre su letra además del color. */
const ODONTO_ESTADOS = [
  { id: "sano",        label: "Sano",                  code: "",  color: null,      atencion: false },
  { id: "caries",      label: "Caries",                code: "C", color: "#C0285A", atencion: true  },
  { id: "obturacion",  label: "Obturación",            code: "O", color: "#2E7FB0", atencion: false },
  { id: "corona",      label: "Corona",                code: "K", color: "#C9A227", atencion: false },
  { id: "endodoncia",  label: "Endodoncia",            code: "E", color: "#7A5AA8", atencion: false },
  { id: "implante",    label: "Implante",              code: "I", color: "#2E8B7A", atencion: false },
  { id: "extraccion",  label: "Extracción indicada",   code: "X", color: "#E0602C", atencion: true  },
  { id: "ausente",     label: "Ausente",               code: "–", color: "#9A9A9A", atencion: false },
  { id: "fractura",    label: "Fractura",              code: "F", color: "#7A5230", atencion: true  },
  { id: "sellante",    label: "Sellante",              code: "S", color: "#6FB07F", atencion: false }
];
function odontoEstado(id) {
  for (var i = 0; i < ODONTO_ESTADOS.length; i++) if (ODONTO_ESTADOS[i].id === id) return ODONTO_ESTADOS[i];
  return ODONTO_ESTADOS[0];
}

/* ── Numeración FDI ──────────────────────────────────────────────────────────
 * Permanente 11-48, temporal (de leche) 51-85. El orden de cada arcada es el
 * que ve el profesional de frente al paciente: la hemiarcada derecha del
 * paciente queda a la IZQUIERDA en pantalla. Por eso el primer cuadrante va
 * invertido (18→11) y el segundo correlativo (21→28). */
const FDI_PERM_SUP = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const FDI_PERM_INF = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
const FDI_TEMP_SUP = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
const FDI_TEMP_INF = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];
const ODONTO_DENTICION = {
  permanente: { label: "Permanente", sup: FDI_PERM_SUP, inf: FDI_PERM_INF, rango: "11–48" },
  temporal:   { label: "Temporal",   sup: FDI_TEMP_SUP, inf: FDI_TEMP_INF, rango: "51–85" }
};
function odontoPiezasDe(denticion) {
  var d = ODONTO_DENTICION[denticion] || ODONTO_DENTICION.permanente;
  return d.sup.concat(d.inf);
}
// Tipo morfológico a partir del número FDI — define el dibujo (cuántas raíces, qué corona).
function odontoTipo(num) {
  var n = parseInt(num, 10);
  if (!n) return "incisivo";
  var cuad = Math.floor(n / 10), d = n % 10;
  var temporal = cuad >= 5;
  if (d === 1 || d === 2) return "incisivo";
  if (d === 3) return "canino";
  if (temporal) return "molar";          // en temporal, 4 y 5 son molares
  if (d === 4 || d === 5) return "premolar";
  return "molar";
}
function odontoEsSuperior(num) { var c = Math.floor(parseInt(num, 10) / 10); return c === 1 || c === 2 || c === 5 || c === 6; }

/* ── Lectura y escritura del odontograma en la ficha ─────────────────────────
 * Forma persistida:  patient.odontograma = { piezas: { "11": {...} }, ts }
 * Pieza:             { estado, nota, hist: [ { fecha, estado, proc, proName, nota } ] }
 * Funciones PURAS: se prueban en harness sin navegador y las reutilizan el
 * presupuesto (vínculo por pieza) y la IA dental (contexto). */
function odontoGet(patient) {
  var o = (patient && patient.odontograma) || null;
  var piezas = (o && o.piezas && typeof o.piezas === "object") ? o.piezas : {};
  return { piezas: piezas, ts: (o && o.ts) || 0 };
}
function odontoPieza(patient, num) {
  var p = odontoGet(patient).piezas[String(num)];
  return {
    estado: (p && p.estado) || "sano",
    nota: (p && p.nota) || "",
    hist: (p && Array.isArray(p.hist)) ? p.hist : []
  };
}
// Devuelve el objeto odontograma COMPLETO ya actualizado (no escribe: eso lo hace el llamador
// con updatePatient, para que la persistencia siga siendo responsabilidad de la ficha).
function odontoSetPieza(patient, num, patch, nowTs) {
  var cur = odontoGet(patient), piezas = {}, k;
  for (k in cur.piezas) if (Object.prototype.hasOwnProperty.call(cur.piezas, k)) piezas[k] = cur.piezas[k];
  var prev = odontoPieza(patient, num);
  var next = { estado: prev.estado, nota: prev.nota, hist: prev.hist };
  if (patch && patch.estado != null) next.estado = patch.estado;
  if (patch && patch.nota != null) next.nota = patch.nota;
  if (patch && patch.hist != null) next.hist = patch.hist;
  // Una pieza sana, sin nota y sin historial no aporta nada: no la guardamos. Así el odontograma
  // de un paciente nuevo pesa 0 y no infla el documento (Firestore topa en 1 MB por doc).
  if (next.estado === "sano" && !next.nota && (!next.hist || !next.hist.length)) delete piezas[String(num)];
  else piezas[String(num)] = next;
  return { piezas: piezas, ts: nowTs || Date.now() };
}
// Resumen: conteo por estado + piezas que requieren atención (caries, extracción indicada, fractura).
function odontoStats(piezas) {
  var counts = {}, atencion = [], k, i;
  for (i = 0; i < ODONTO_ESTADOS.length; i++) counts[ODONTO_ESTADOS[i].id] = 0;
  var nums = [];
  for (k in piezas) if (Object.prototype.hasOwnProperty.call(piezas, k)) nums.push(k);
  nums.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
  for (i = 0; i < nums.length; i++) {
    var est = (piezas[nums[i]] && piezas[nums[i]].estado) || "sano";
    if (counts[est] == null) counts[est] = 0;
    counts[est]++;
    if (odontoEstado(est).atencion) atencion.push(nums[i]);
  }
  return { counts: counts, atencion: atencion, registradas: nums.length };
}
// Resumen en texto plano — lo consume la IA dental (Fase F) y el portal.
function odontoResumenTexto(patient) {
  var piezas = odontoGet(patient).piezas, st = odontoStats(piezas), out = [], k;
  for (k in piezas) if (Object.prototype.hasOwnProperty.call(piezas, k)) {
    var p = piezas[k];
    if (p.estado === "sano" && !p.nota) continue;
    out.push("Pieza " + k + ": " + odontoEstado(p.estado).label + (p.nota ? " (" + p.nota + ")" : ""));
  }
  if (!out.length) return "Sin hallazgos registrados en el odontograma.";
  return out.join("\n") + (st.atencion.length ? "\nRequieren atención: " + st.atencion.join(", ") : "");
}

/* ── Claves de radiografía (reutilizan la capa de fotos de jc-face.jsx) ────── */
function odontoRxView(pieza) { return pieza ? "rx_periapical_" + pieza : "rx_panoramica"; }

/* ════════ DIBUJO DE UNA PIEZA ════════
 * viewBox canónico 40×64 con la corona ARRIBA y las raíces ABAJO (una pieza
 * inferior). Para la arcada superior se voltea en vertical, que es como se ve
 * en la boca: las raíces apuntan hacia arriba. */
const TOOTH_PATHS = {
  incisivo: { crown: "M11 4 h18 a3 3 0 0 1 3 3 v18 a4 4 0 0 1 -4 4 h-16 a4 4 0 0 1 -4 -4 v-18 a3 3 0 0 1 3 -3 z", roots: ["M17 29 h6 l-1.5 29 a1.5 1.5 0 0 1 -3 0 z"] },
  canino:   { crown: "M20 3 l11 8 v13 a5 5 0 0 1 -5 5 h-12 a5 5 0 0 1 -5 -5 v-13 z",                                roots: ["M16.5 29 h7 l-2 31 a1.5 1.5 0 0 1 -3 0 z"] },
  premolar: { crown: "M12 6 l4 -3 4 3 4 -3 4 3 v18 a5 5 0 0 1 -5 5 h-10 a5 5 0 0 1 -5 -5 z",                        roots: ["M15 29 h4 l-1.5 27 a1.2 1.2 0 0 1 -2.4 0 z", "M21 29 h4 l1.5 27 a1.2 1.2 0 0 1 -2.4 0 z"] },
  molar:    { crown: "M8 7 l3.5 -3 3.5 3 3 -3 3 3 3.5 -3 3.5 3 v17 a5 5 0 0 1 -5 5 h-13 a5 5 0 0 1 -5 -5 z",        roots: ["M12 29 h4 l-2 25 a1.2 1.2 0 0 1 -2.4 0 z", "M18 29 h4 l0 25 a1.2 1.2 0 0 1 -2.4 0 z", "M24 29 h4 l2 25 a1.2 1.2 0 0 1 -2.4 0 z"] }
};

function ToothSVG({ T, num, estado, selected, onClick, readOnly }) {
  const tipo = odontoTipo(num), sup = odontoEsSuperior(num);
  const est = odontoEstado(estado);
  const shape = TOOTH_PATHS[tipo] || TOOTH_PATHS.incisivo;
  const ausente = estado === "ausente";
  const implante = estado === "implante";
  // Esmalte: claro sobre tema oscuro y viceversa lo resolvemos con el propio tema, para que la
  // pieza se vea "diente" en los ~15 temas sin hardcodear blanco.
  const enamel = T.surface2 || T.surface;
  const fill = est.color || enamel;
  const stroke = est.color || T.textMute;
  const label = "Pieza " + num + " · " + est.label;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected ? "true" : "false"}
      title={label}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
        padding: "3px 1px", background: selected ? T.surface2 : "transparent",
        border: "1px solid " + (selected ? T.accent : "transparent"),
        borderRadius: 6, cursor: readOnly ? "default" : "pointer", flex: "0 0 auto"
      }}
    >
      {!sup && <span style={{ fontFamily: T.sans, fontSize: 9, color: selected ? T.text : T.textFaint, letterSpacing: ".04em" }}>{num}</span>}
      <svg width="26" height="42" viewBox="0 0 40 64" aria-hidden="true" style={{ display: "block", opacity: ausente ? 0.4 : 1 }}>
        <g transform={sup ? "translate(0,64) scale(1,-1)" : undefined}>
          {!ausente && shape.roots.map((d, i) => (
            <path key={i} d={d} fill={implante ? est.color : enamel} stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" opacity={implante ? 0.9 : 1} />
          ))}
          {!ausente && <path d={shape.crown} fill={fill} stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />}
          {ausente && <path d={shape.crown} fill="none" stroke={est.color} strokeWidth="1.4" strokeDasharray="3 3" strokeLinejoin="round" />}
        </g>
        {ausente && <g stroke={est.color} strokeWidth="2.4" strokeLinecap="round"><line x1="10" y1="12" x2="30" y2="32" /><line x1="30" y1="12" x2="10" y2="32" /></g>}
        {/* La letra del estado: lo que hace el odontograma legible sin depender del color. */}
        {est.code && !ausente && (
          <text x="20" y={sup ? 52 : 20} textAnchor="middle" fontSize="13" fontWeight="700"
                fill={est.color ? "#FFFFFF" : T.text} stroke={est.color || "none"} strokeWidth="0.4"
                style={{ fontFamily: T.sans, paintOrder: "stroke" }}>{est.code}</text>
        )}
      </svg>
      {sup && <span style={{ fontFamily: T.sans, fontSize: 9, color: selected ? T.text : T.textFaint, letterSpacing: ".04em" }}>{num}</span>}
    </button>
  );
}

/* ════════ CONTENEDOR · ODONTOGRAMA ════════ */
function Odontograma({ T, patient, updatePatient, readOnly }) {
  const [denticion, setDenticion] = useState("permanente");
  const [sel, setSel] = useState(null);          // pieza seleccionada (string) — no se persiste
  const [proc, setProc] = useState("");
  const [nota, setNota] = useState("");
  const [proName, setProName] = useState(() => {
    try { return (window.DB && DB.cfg().professional) || ""; } catch (e) { return ""; }
  });
  const [rxTick, setRxTick] = useState(0);       // fuerza relectura de radiografías tras subir/borrar

  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const den = ODONTO_DENTICION[denticion] || ODONTO_DENTICION.permanente;
  const piezas = odontoGet(patient).piezas;
  const stats = odontoStats(piezas);
  const selData = sel ? odontoPieza(patient, sel) : null;

  function commit(num, patch) {
    if (readOnly || !patient || !patient.id) return;
    updatePatient(patient.id, { odontograma: odontoSetPieza(patient, num, patch) });
  }
  function setEstado(num, estadoId) { commit(num, { estado: estadoId }); }
  function addHist(num) {
    if (readOnly || !num) return;
    const p = odontoPieza(patient, num);
    const entry = {
      fecha: new Date().toISOString().slice(0, 10),
      estado: p.estado,
      proc: (proc || "").trim(),
      proName: (proName || "").trim(),
      nota: (nota || "").trim()
    };
    if (!entry.proc && !entry.nota) {
      try { window.jcmToast && window.jcmToast("Escribe el procedimiento o una nota antes de agregar al historial.", "error"); } catch (e) {}
      return;
    }
    commit(num, { hist: [entry].concat(p.hist) });
    setProc(""); setNota("");
    try { window.jcmToast && window.jcmToast("Agregado al historial de la pieza " + num + ".", "ok"); } catch (e) {}
  }
  function delHist(num, idx) {
    if (readOnly) return;
    const p = odontoPieza(patient, num);
    commit(num, { hist: p.hist.filter(function (_, i) { return i !== idx; }) });
  }
  function onRx(file, pieza) {
    if (readOnly || !file || !patient || !patient.id) return;
    const f = window.fileToDataURL, set = window.faceSetPhoto;
    if (!f || !set) { try { window.jcmError && window.jcmError("No se pudo cargar el módulo de imágenes."); } catch (e) {} return; }
    f(file, 1400, function (dataUrl) { set(patient.id, odontoRxView(pieza), dataUrl); setRxTick(function (t) { return t + 1; }); });
  }
  function delRx(pieza) {
    if (readOnly) return;
    try { window.faceSetPhoto && window.faceSetPhoto(patient.id, odontoRxView(pieza), null); } catch (e) {}
    saveMed(pieza, null);   // las medidas son de ESA imagen: sin imagen no significan nada
    setRxTick(function (t) { return t + 1; });
  }
  function getRx(pieza) {
    try { return (window.faceGetPhoto && window.faceGetPhoto(patient.id, odontoRxView(pieza))) || null; } catch (e) { return null; }
  }
  /* Mediciones de radiografía. Viven en el paciente (patient.rxMed), no en la capa de fotos:
     son parte de la ficha clínica y tienen que viajar con ella, no con el archivo de imagen. */
  function getMed(pieza) {
    try { return (patient && patient.rxMed && patient.rxMed[odontoRxView(pieza)]) || null; } catch (e) { return null; }
  }
  function saveMed(pieza, m) {
    if (readOnly || !patient || !patient.id) return;
    const all = Object.assign({}, patient.rxMed || {});
    if (m) all[odontoRxView(pieza)] = m; else delete all[odontoRxView(pieza)];
    updatePatient(patient.id, { rxMed: all });
  }

  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = luxF
    ? Object.assign({}, DS.ctl(T), { width: "100%" })
    : { width: "100%", padding: "10px 12px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" };
  const card = luxF
    ? Object.assign({}, DS.card(T), { padding: "16px 18px" })
    : { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "14px 16px" };

  function Arcada({ nums, titulo }) {
    return (
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: T.textFaint, marginBottom: 4, textAlign: "center" }}>{titulo}</div>
        {/* overflow-x: en móvil 16 piezas no caben; se desplaza la arcada en vez de romper la página. */}
        <div style={{ display: "flex", justifyContent: "center", gap: 1, overflowX: "auto", paddingBottom: 2 }}>
          {nums.map(function (n) {
            const p = odontoPieza(patient, n);
            return <ToothSVG key={n} T={T} num={n} estado={p.estado} selected={String(sel) === String(n)}
                             readOnly={readOnly} onClick={function () { setSel(String(sel) === String(n) ? null : String(n)); }} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      {readOnly && (
        <div style={{ fontFamily: T.sans, fontSize: 9.5, color: T.textFaint, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          Solo visualización
        </div>
      )}

      {/* Dentición */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        {Object.keys(ODONTO_DENTICION).map(function (k) {
          const active = denticion === k;
          return (
            <button key={k} type="button" onClick={function () { setDenticion(k); setSel(null); }} style={{
              fontFamily: T.sans, fontSize: 11.5, letterSpacing: ".02em", padding: "9px 15px", borderRadius: 999, cursor: "pointer",
              background: active ? T.text : T.surface, color: active ? T.bg : T.textMute, border: "1px solid " + (active ? T.text : T.line)
            }}>{ODONTO_DENTICION[k].label} · {ODONTO_DENTICION[k].rango}</button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* ── Mapa de piezas ── */}
        <div style={{ flex: "1 1 420px", minWidth: 0 }}>
          <div style={card}>
            <Arcada nums={den.sup} titulo="Arcada superior" />
            <div style={{ height: 1, background: T.line, margin: "6px 0 10px" }} />
            <Arcada nums={den.inf} titulo="Arcada inferior" />
          </div>

          {/* Leyenda */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {ODONTO_ESTADOS.map(function (e) {
              return (
                <span key={e.id} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>
                  <span aria-hidden="true" style={{
                    width: 15, height: 15, borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center",
                    background: e.color || (T.surface2 || T.surface), border: "1px solid " + (e.color || T.line),
                    color: e.color ? "#FFFFFF" : T.textMute, fontSize: 9, fontWeight: 700
                  }}>{e.code}</span>
                  {e.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* ── Resumen ── */}
        <div style={{ flex: "0 1 260px", minWidth: 230 }}>
          <div style={card}>
            <div style={luxF ? DS.text(T, "eyebrow") : { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Resumen</div>
            {stats.registradas === 0
              ? <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.6, marginTop: 8 }}>Sin hallazgos registrados. Toca una pieza para marcar su estado.</div>
              : <div style={{ marginTop: 8 }}>
                  {ODONTO_ESTADOS.filter(function (e) { return stats.counts[e.id] > 0; }).map(function (e) {
                    return (
                      <div key={e.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "4px 0", fontFamily: T.sans, fontSize: 12, color: T.text }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: 2, background: e.color || (T.surface2 || T.surface), border: "1px solid " + (e.color || T.line) }} />
                          {e.label}
                        </span>
                        <strong style={{ fontVariantNumeric: "tabular-nums" }}>{stats.counts[e.id]}</strong>
                      </div>
                    );
                  })}
                </div>}
            {stats.atencion.length > 0 && (
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid " + T.line }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: DS ? DS.danger : "#C0285A", marginBottom: 7 }}>
                  Requieren atención ({stats.atencion.length})
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {stats.atencion.map(function (n) {
                    return (
                      <button key={n} type="button" onClick={function () { setSel(String(n)); }} style={{
                        fontFamily: T.sans, fontSize: 11, fontVariantNumeric: "tabular-nums", padding: "4px 9px", borderRadius: 999, cursor: "pointer",
                        background: "transparent", color: odontoEstado(odontoPieza(patient, n).estado).color, border: "1px solid " + odontoEstado(odontoPieza(patient, n).estado).color
                      }}>{n} · {odontoEstado(odontoPieza(patient, n).estado).code}</button>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Radiografía panorámica: una sola por paciente, no depende de la pieza seleccionada. */}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid " + T.line }}>
              <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Radiografía panorámica</div>
              <RxSlot T={T} url={getRx(null)} readOnly={readOnly} tick={rxTick} titulo="Radiografía panorámica"
                      med={getMed(null)} onSaveMed={function (m) { saveMed(null, m); }}
                      onPick={function (f) { onRx(f, null); }} onDel={function () { delRx(null); }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Pieza seleccionada ── */}
      {sel && (
        <div style={Object.assign({}, card, { marginTop: 16 })}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={luxF ? DS.text(T, "title") : { fontFamily: T.serif, fontSize: 17, color: T.text }}>Pieza {sel}</span>
              <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, textTransform: "capitalize" }}>{odontoTipo(sel)} · {odontoEsSuperior(sel) ? "superior" : "inferior"}</span>
            </div>
            <button type="button" onClick={function () { setSel(null); }} style={typeof ghostBtn === "function" ? ghostBtn(T) : { cursor: "pointer" }}>Cerrar</button>
          </div>

          {/* Estado */}
          <div style={{ marginBottom: 14 }}>
            <span style={lbl}>Estado</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ODONTO_ESTADOS.map(function (e) {
                const active = selData.estado === e.id;
                return (
                  <button key={e.id} type="button" disabled={readOnly} onClick={function () { setEstado(sel, e.id); }} style={{
                    fontFamily: T.sans, fontSize: 11.5, padding: "8px 13px", borderRadius: 7, cursor: readOnly ? "default" : "pointer",
                    background: active ? (e.color || T.text) : T.surface,
                    color: active ? "#FFFFFF" : T.textMute,
                    border: "1px solid " + (active ? (e.color || T.text) : T.line),
                    opacity: readOnly && !active ? 0.5 : 1
                  }}>{e.code ? e.code + " · " : ""}{e.label}</button>
                );
              })}
            </div>
          </div>

          {!readOnly && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
              <label style={{ flex: "1 1 180px" }}><span style={lbl}>Procedimiento</span>
                <input value={proc} onChange={function (ev) { setProc(ev.target.value); }} placeholder="Ej: Obturación compuesta" style={inp} /></label>
              <label style={{ flex: "1 1 150px" }}><span style={lbl}>Profesional</span>
                <input value={proName} onChange={function (ev) { setProName(ev.target.value); }} placeholder="Ej: Dr. Pérez" style={inp} /></label>
              <label style={{ flex: "1 1 100%" }}><span style={lbl}>Nota</span>
                <input value={nota} onChange={function (ev) { setNota(ev.target.value); }} placeholder="Observación clínica" style={inp} /></label>
              <button type="button" onClick={function () { addHist(sel); }} style={typeof primBtn === "function" ? primBtn(T) : { cursor: "pointer" }}>Agregar al historial</button>
            </div>
          )}

          {/* Radiografía periapical de la pieza */}
          <div style={{ marginBottom: 14 }}>
            <span style={lbl}>Radiografía periapical · pieza {sel}</span>
            <RxSlot T={T} url={getRx(sel)} readOnly={readOnly} tick={rxTick} titulo={"Periapical · pieza " + sel}
                    med={getMed(sel)} onSaveMed={function (m) { saveMed(sel, m); }}
                    onPick={function (f) { onRx(f, sel); }} onDel={function () { delRx(sel); }} />
          </div>

          {/* Historial de la pieza */}
          <div>
            <span style={lbl}>Historial de la pieza ({selData.hist.length})</span>
            {selData.hist.length === 0
              ? <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint, marginTop: 4 }}>Sin registros para esta pieza.</div>
              : <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  {selData.hist.map(function (h, i) {
                    const e = odontoEstado(h.estado);
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 11px", borderRadius: 6, background: T.surface2 || T.surface, border: "1px solid " + T.line }}>
                        <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 2, marginTop: 5, flexShrink: 0, background: e.color || T.textMute }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{h.proc || e.label}</div>
                          <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>
                            {h.fecha}{h.proName ? " · " + h.proName : ""} · {e.label}
                          </div>
                          {h.nota && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 4, lineHeight: 1.5 }}>{h.nota}</div>}
                        </div>
                        {!readOnly && <button type="button" onClick={function () { delHist(sel, i); }} aria-label={"Eliminar registro del " + h.fecha}
                          style={{ background: "transparent", border: "none", color: T.textFaint, cursor: "pointer", fontFamily: T.sans, fontSize: 15, lineHeight: 1, padding: 2 }}>×</button>}
                      </div>
                    );
                  })}
                </div>}
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * MEDICIÓN SOBRE RADIOGRAFÍA
 * ────────────────────────────────────────────────────────────────────────────
 * Una radiografía NO trae escala: el archivo no sabe cuántos milímetros mide un
 * píxel. Y además amplifica —entre 5% y 25% en una periapical según la técnica,
 * y de forma desigual a lo largo del arco en una panorámica—.
 *
 * Por eso acá NO se estima la escala ni se le pregunta a un modelo: la fija el
 * profesional trazando una línea sobre algo de largo conocido (un implante, una
 * lima de endodoncia, el ancho de una corona) y escribiendo cuánto mide. Todo
 * milímetro que muestre la herramienta sale de esa calibración y de nada más.
 * Un número inventado en una ficha clínica es peor que no tener el número.
 *
 * Las coordenadas se guardan en PÍXELES DE LA IMAGEN, no de pantalla: así la
 * medición sobrevive al zoom, a otro monitor y al móvil. El <svg> usa viewBox
 * con el tamaño natural, de modo que dibujar y guardar ocurren en el mismo
 * sistema de coordenadas y no hay conversiones sueltas dando vueltas.
 * ════════════════════════════════════════════════════════════════════════════ */
function rxDist(l) { return Math.sqrt(Math.pow(l.x2 - l.x1, 2) + Math.pow(l.y2 - l.y1, 2)); }
function rxFmtMm(v) { return (Math.round(v * 10) / 10).toLocaleString("es-CL", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " mm"; }

function RxMedir({ T, url, titulo, med, readOnly, onSave, onClose }) {
  const imgRef = useRef(null);
  const [nat, setNat] = useState(() => (med && med.w ? { w: med.w, h: med.h } : null));
  const [cal, setCal] = useState(() => (med && med.cal) || null);
  const [lineas, setLineas] = useState(() => (med && med.lineas) || []);
  const [draft, setDraft] = useState(null);   // línea en curso (arrastre)
  const [pend, setPend] = useState(null);     // línea de calibración esperando su medida
  const [mmTxt, setMmTxt] = useState("");
  const [suc, setSuc] = useState(false);

  const modo = cal ? "medir" : "calibrar";
  const mmPorPx = cal ? (cal.mm / rxDist(cal)) : null;

  useEffect(function () {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return function () { window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  // Coordenadas del puntero → píxeles de la imagen. Un solo lugar que hace la conversión.
  function pt(ev) {
    const el = imgRef.current; if (!el || !nat) return null;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return {
      x: Math.max(0, Math.min(nat.w, (ev.clientX - r.left) / r.width * nat.w)),
      y: Math.max(0, Math.min(nat.h, (ev.clientY - r.top) / r.height * nat.h))
    };
  }
  // Eventos de PUNTERO, no mouse+touch: un tap dispara los dos y la línea salía duplicada.
  function down(ev) {
    if (readOnly || pend) return;
    const p = pt(ev); if (!p) return;
    try { ev.currentTarget.setPointerCapture(ev.pointerId); } catch (e) {}
    setDraft({ x1: p.x, y1: p.y, x2: p.x, y2: p.y });
  }
  function move(ev) {
    if (!draft) return;
    const p = pt(ev); if (!p) return;
    setDraft(function (d) { return d ? { x1: d.x1, y1: d.y1, x2: p.x, y2: p.y } : d; });
  }
  function up(ev) {
    if (!draft) return;
    // El extremo lo fija el pointerup, NO el último pointermove: al soltar, el puntero suele
    // haberse movido un poco más, y en una medición clínica la línea tiene que terminar donde
    // el profesional soltó. Con el último move la medida salía sistemáticamente corta.
    const p = (ev && ev.clientX != null) ? pt(ev) : null;
    const l = p ? { x1: draft.x1, y1: draft.y1, x2: p.x, y2: p.y } : draft;
    setDraft(null); setSuc(false);
    // Descarta el clic sin arrastre: 6 px de imagen es un toque, no una medición.
    if (rxDist(l) < 6) return;
    if (modo === "calibrar") { setPend(l); setMmTxt(""); }
    else setLineas(function (ls) { return ls.concat([l]); });
  }
  function confirmarCal() {
    const mm = parseFloat(String(mmTxt).replace(",", "."));
    if (!isFinite(mm) || mm <= 0) { try { window.jcmError && window.jcmError("Escribe cuántos milímetros mide la línea de referencia."); } catch (e) {} return; }
    setCal(Object.assign({}, pend, { mm: mm })); setPend(null); setMmTxt("");
  }
  function guardar() {
    onSave(cal ? { w: nat.w, h: nat.h, cal: cal, lineas: lineas, ts: Date.now() } : null);
    setSuc(true);
  }

  const btn = function (activo) {
    return {
      fontFamily: T.sans, fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 999,
      border: "1px solid " + (activo ? T.accent : "rgba(255,255,255,.24)"), cursor: "pointer",
      background: activo ? T.accent : "transparent", color: activo ? (T.onAccent || "#fff") : "rgba(255,255,255,.86)"
    };
  };
  const sw = nat ? Math.max(1.4, nat.w / 520) : 2;          // grosor de línea en px de imagen
  const fs = nat ? Math.max(11, nat.w / 46) : 14;           // tamaño de etiqueta en px de imagen
  const linea = function (l, i, color, texto) {
    const mx = (l.x1 + l.x2) / 2, my = (l.y1 + l.y2) / 2;
    return (
      <g key={i}>
        <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <circle cx={l.x1} cy={l.y1} r={sw * 1.6} fill={color} />
        <circle cx={l.x2} cy={l.y2} r={sw * 1.6} fill={color} />
        {texto && <text x={mx} y={my - fs * 0.45} fill="#fff" fontSize={fs} fontFamily="system-ui, sans-serif" fontWeight="600"
                        textAnchor="middle" stroke="rgba(0,0,0,.85)" strokeWidth={fs / 6} paintOrder="stroke">{texto}</text>}
      </g>
    );
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={"Medir " + titulo}
         style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,0,0,.9)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center", maxWidth: "94vw" }}>
        <span style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,.72)", marginRight: 4 }}>{titulo}</span>
        {!readOnly && <button type="button" style={btn(modo === "calibrar")} onClick={function () { setCal(null); setPend(null); }}>
          {cal ? "Recalibrar" : "1 · Calibrar"}
        </button>}
        {!readOnly && <button type="button" style={btn(false)} disabled={!lineas.length}
                              onClick={function () { setLineas(function (ls) { return ls.slice(0, -1); }); setSuc(false); }}>Deshacer</button>}
        {!readOnly && <button type="button" style={btn(false)} disabled={!lineas.length}
                              onClick={function () { setLineas([]); setSuc(false); }}>Borrar medidas</button>}
        {!readOnly && <button type="button" style={btn(true)} onClick={guardar}>{suc ? "✓ Guardado" : "Guardar en la ficha"}</button>}
        <button type="button" style={btn(false)} onClick={onClose}>Cerrar</button>
      </div>

      <div style={{ position: "relative", lineHeight: 0, maxWidth: "94vw", maxHeight: "72vh", touchAction: "none" }}>
        <img ref={imgRef} src={url} alt={titulo} draggable="false"
             onLoad={function (e) { setNat({ w: e.target.naturalWidth || 1000, h: e.target.naturalHeight || 1000 }); }}
             style={{ display: "block", maxWidth: "94vw", maxHeight: "72vh", userSelect: "none" }} />
        {nat && (
          <svg viewBox={"0 0 " + nat.w + " " + nat.h} preserveAspectRatio="none"
               onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: readOnly ? "default" : "crosshair", touchAction: "none" }}>
            {cal && linea(cal, "cal", "#F2C14E", rxFmtMm(cal.mm) + " · referencia")}
            {lineas.map(function (l, i) { return linea(l, i, "#3FD2C7", mmPorPx ? rxFmtMm(rxDist(l) * mmPorPx) : null); })}
            {pend && linea(pend, "pend", "#F2C14E", null)}
            {draft && linea(draft, "draft", modo === "calibrar" ? "#F2C14E" : "#3FD2C7",
                            mmPorPx && modo === "medir" ? rxFmtMm(rxDist(draft) * mmPorPx) : null)}
          </svg>
        )}
      </div>

      <div style={{ maxWidth: 620, textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: "rgba(255,255,255,.78)", lineHeight: 1.55 }}>
        {pend ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <span>¿Cuántos milímetros mide esa línea?</span>
            <input value={mmTxt} onChange={function (e) { setMmTxt(e.target.value); }} inputMode="decimal" autoFocus placeholder="Ej. 10"
                   onKeyDown={function (e) { if (e.key === "Enter") confirmarCal(); }}
                   style={{ width: 90, padding: "7px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,.3)", background: "rgba(255,255,255,.08)", color: "#fff", fontFamily: T.sans, fontSize: 13, textAlign: "center", outline: "none" }} />
            <button type="button" style={btn(true)} onClick={confirmarCal}>Confirmar</button>
            <button type="button" style={btn(false)} onClick={function () { setPend(null); }}>Cancelar</button>
          </div>
        ) : modo === "calibrar" ? (
          <span><b style={{ color: "#F2C14E" }}>Paso 1 · Calibrar.</b> Traza una línea sobre algo de largo conocido —un implante, una lima, el ancho de una corona— y escribe cuánto mide. Sin eso no se puede medir: la radiografía no trae escala.</span>
        ) : (
          <span><b style={{ color: "#3FD2C7" }}>Paso 2 · Medir.</b> Arrastra para trazar cada medida. Escala: 1 px = {(mmPorPx || 0).toFixed(4)} mm.
            <br /><span style={{ color: "rgba(255,255,255,.5)", fontSize: 11.5 }}>Las medidas son relativas a tu referencia. La radiografía amplifica y distorsiona, así que sirven para comparar y seguir la evolución, no como medida absoluta.</span></span>
        )}
      </div>
    </div>
  );
}

/* Ranura de radiografía: previsualización + carga + borrado + medición. */
function RxSlot({ T, url, readOnly, onPick, onDel, med, onSaveMed, titulo }) {
  const [zoom, setZoom] = useState(false);
  const [medir, setMedir] = useState(false);
  const nMed = (med && med.lineas && med.lineas.length) || 0;
  if (url) {
    return (
      <div>
        <img src={url} alt="Radiografía" onClick={function () { setZoom(!zoom); }}
             style={{ width: "100%", maxHeight: zoom ? "none" : 150, objectFit: zoom ? "contain" : "cover", borderRadius: 6, border: "1px solid " + T.line, cursor: "zoom-in", display: "block", background: "#000" }} />
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6, flexWrap: "wrap" }}>
          {onSaveMed && <button type="button" onClick={function () { setMedir(true); }}
                                style={{ background: "transparent", border: "none", color: T.accent, cursor: "pointer", fontFamily: T.sans, fontSize: 11, fontWeight: 600, padding: 0 }}>
            {nMed ? "Medir · " + nMed + (nMed === 1 ? " medida" : " medidas") : "Medir"}
          </button>}
          {!readOnly && <button type="button" onClick={onDel} style={{ background: "transparent", border: "none", color: T.textFaint, cursor: "pointer", fontFamily: T.sans, fontSize: 11, padding: 0 }}>Eliminar radiografía</button>}
        </div>
        {medir && <RxMedir T={T} url={url} titulo={titulo || "Radiografía"} med={med} readOnly={readOnly}
                           onSave={onSaveMed} onClose={function () { setMedir(false); }} />}
      </div>
    );
  }
  if (readOnly) return <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textFaint }}>Sin radiografía.</div>;
  return (
    <label style={{ display: "block", padding: "14px 12px", borderRadius: 6, border: "1px dashed " + T.line, textAlign: "center", cursor: "pointer", fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>
      Subir radiografía
      <input type="file" accept="image/*" style={{ display: "none" }}
             onChange={function (ev) { const f = ev.target.files && ev.target.files[0]; if (f) onPick(f); ev.target.value = ""; }} />
    </label>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * PLANO DE TRATAMIENTO · PRESUPUESTO DENTAL Y CUOTAS
 * ────────────────────────────────────────────────────────────────────────────
 * En estética un presupuesto es una COTIZACIÓN: se emite, se imprime y se
 * archiva (patient.presupuestos, un array histórico). En odontología es otra
 * cosa: un plano de tratamiento VIVO, con procedimientos que avanzan de
 * pendiente a hecho, ligados a una pieza, aprobados por el paciente y pagados
 * en cuotas a lo largo de meses.
 *
 * Por eso NO se toca `patient.presupuestos` (sigue igual, para estética) y el
 * plano vive en `patient.presupuesto` (singular), como pide el documento.
 * ════════════════════════════════════════════════════════════════════════════ */
const PLAN_PRIORIDADES = [
  { id: "alta",  label: "Alta",  desc: "Dolor o infección", peso: 0 },
  { id: "media", label: "Media", desc: "Funcional",         peso: 1 },
  { id: "baja",  label: "Baja",  desc: "Estético",          peso: 2 }
];
const PLAN_ESTADOS = [
  { id: "pendiente", label: "Pendiente" },
  { id: "encurso",   label: "En curso"  },
  { id: "hecho",     label: "Hecho"     }
];
function planPrioridad(id) {
  for (var i = 0; i < PLAN_PRIORIDADES.length; i++) if (PLAN_PRIORIDADES[i].id === id) return PLAN_PRIORIDADES[i];
  return PLAN_PRIORIDADES[1];
}
function planEstadoLabel(id) {
  for (var i = 0; i < PLAN_ESTADOS.length; i++) if (PLAN_ESTADOS[i].id === id) return PLAN_ESTADOS[i].label;
  return "Pendiente";
}
function planGet(patient) {
  var p = (patient && patient.presupuesto) || null;
  return {
    items:  (p && Array.isArray(p.items))  ? p.items  : [],
    abonos: (p && Array.isArray(p.abonos)) ? p.abonos : [],
    aprobacion: (p && p.aprobacion) || null,
    ts: (p && p.ts) || 0
  };
}
// Totales del plano. PURA: el dinero se prueba en harness, no a ojo.
function planTotales(plan) {
  var items = (plan && plan.items) || [], abonos = (plan && plan.abonos) || [], i;
  var total = 0, hecho = 0, pendiente = 0;
  for (i = 0; i < items.length; i++) {
    var precio = Number(items[i].precio) || 0;
    total += precio;
    if (items[i].estado === "hecho") hecho += precio; else pendiente += precio;
  }
  var pagado = 0;
  for (i = 0; i < abonos.length; i++) pagado += Number(abonos[i].monto) || 0;
  return { total: total, pagado: pagado, saldo: total - pagado, valorHecho: hecho, valorPendiente: pendiente };
}
// Ordena por urgencia clínica: dolor/infección → funcional → estético. Los ya hechos van al final:
// dejan de ser una decisión pendiente. Estable dentro de cada grupo (no reordena lo empatado).
function planOrdenado(items) {
  return ((items || []).map(function (it, i) { return { it: it, i: i }; })).sort(function (a, b) {
    var ah = a.it.estado === "hecho" ? 1 : 0, bh = b.it.estado === "hecho" ? 1 : 0;
    if (ah !== bh) return ah - bh;
    var ap = planPrioridad(a.it.prioridad).peso, bp = planPrioridad(b.it.prioridad).peso;
    if (ap !== bp) return ap - bp;
    return a.i - b.i;
  }).map(function (x) { return x.it; });
}
// Lo que el paciente puede ver (portal): sin precios internos ni notas privadas.
function planPendientesPublicos(patient) {
  var plan = planGet(patient);
  return planOrdenado(plan.items).filter(function (it) { return it.estado !== "hecho"; }).map(function (it) {
    return { proc: it.proc || "", pieza: it.pieza || "", prioridad: it.prioridad || "media", estado: it.estado || "pendiente" };
  });
}

function PlanDentalTab({ T, patient, updatePatient }) {
  const plan = planGet(patient);
  const tot = planTotales(plan);
  const fmt = function (n) {
    try { return (window.JCDATA && window.JCDATA.fmt) ? window.JCDATA.fmt(n) : ("$" + (Number(n) || 0).toLocaleString("es-CL")); }
    catch (e) { return "$" + (Number(n) || 0); }
  };
  const servicios = (function () { try { return (window.clinicServiceList ? window.clinicServiceList() : []) || []; } catch (e) { return []; } })();

  const [nProc, setNProc] = useState("");
  const [nPieza, setNPieza] = useState("");
  const [nPrecio, setNPrecio] = useState("");
  const [nPrio, setNPrio] = useState("media");
  const [abono, setAbono] = useState("");
  const [metodo, setMetodo] = useState("Efectivo");
  const [firmando, setFirmando] = useState(false);

  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 13.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" };
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const card = luxF ? Object.assign({}, DS.card(T), { padding: "16px 18px" }) : { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "14px 16px" };

  function savePlan(patch, extra) {
    const next = Object.assign({}, plan, patch, { ts: Date.now() });
    updatePatient(patient.id, Object.assign({ presupuesto: next }, extra || {}));
  }
  function addItem() {
    const proc = (nProc || "").trim();
    if (!proc) { window.jcmToast && window.jcmToast("Escribe el procedimiento.", "error"); return; }
    const it = {
      id: "pi" + Date.now() + Math.random().toString(36).slice(2, 5),
      proc: proc, pieza: nPieza || "", precio: parseInt(String(nPrecio).replace(/\D/g, ""), 10) || 0,
      prioridad: nPrio, estado: "pendiente"
    };
    savePlan({ items: plan.items.concat([it]) });
    setNProc(""); setNPieza(""); setNPrecio(""); setNPrio("media");
  }
  function updItem(id, patch) {
    savePlan({ items: plan.items.map(function (it) { return it.id === id ? Object.assign({}, it, patch) : it; }) });
  }
  // Marcar "hecho" con una pieza asociada escribe TAMBIÉN en el historial de esa pieza del
  // odontograma: es el vínculo que pide el documento. Se hace en UN solo updatePatient para que
  // el plano y el odontograma no puedan quedar desincronizados.
  function setEstadoItem(it, estado) {
    if (estado === "hecho" && it.pieza) {
      const prev = odontoPieza(patient, it.pieza);
      const entry = {
        fecha: new Date().toISOString().slice(0, 10),
        estado: prev.estado,
        proc: it.proc || "",
        proName: (function () { try { return (window.DB && DB.cfg().professional) || ""; } catch (e) { return ""; } })(),
        nota: "Registrado desde el plano de tratamiento"
      };
      const items = plan.items.map(function (x) { return x.id === it.id ? Object.assign({}, x, { estado: estado }) : x; });
      updatePatient(patient.id, {
        presupuesto: Object.assign({}, plan, { items: items, ts: Date.now() }),
        odontograma: odontoSetPieza(patient, it.pieza, { hist: [entry].concat(prev.hist) })
      });
      window.jcmToast && window.jcmToast("Hecho · registrado en el historial de la pieza " + it.pieza + ".", "ok");
      return;
    }
    updItem(it.id, { estado: estado });
  }
  function delItem(id) { savePlan({ items: plan.items.filter(function (it) { return it.id !== id; }) }); }

  function addAbono() {
    const monto = parseInt(String(abono).replace(/\D/g, ""), 10) || 0;
    if (monto <= 0) { window.jcmToast && window.jcmToast("Escribe el monto del abono.", "error"); return; }
    if (typeof window.cashAdd !== "function") { window.jcmError && window.jcmError("La Caja no está disponible: el abono NO se registró."); return; }
    // Primero la Caja. Si cashAdd fallara, no queremos un abono "fantasma" en el plano que cuadre
    // el saldo del paciente sin respaldo en cash_moves.
    try {
      window.cashAdd({
        type: "ingreso", kind: "atencion", amount: monto, method: metodo,
        concept: "Abono plan de tratamiento · " + (patient.name || ""),
        patient: patient.name || "",
        prof: (function () { try { return (window.DB && DB.cfg().professional) || ""; } catch (e) { return ""; } })()
      });
    } catch (e) {
      window.jcmError && window.jcmError("No se pudo registrar el abono en Caja. No se guardó nada.");
      return;
    }
    savePlan({ abonos: plan.abonos.concat([{ id: "ab" + Date.now(), monto: monto, metodo: metodo, fecha: new Date().toISOString().slice(0, 10) }]) });
    setAbono("");
    window.jcmToast && window.jcmToast("Abono de " + fmt(monto) + " registrado en Caja.", "ok");
  }

  const piezasSel = odontoPiezasDe("permanente");

  return (
    <div>
      {/* Totales */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        {[["Total del plan", tot.total, T.text], ["Pagado", tot.pagado, DS ? DS.ok : "#1F8A5B"], ["Saldo pendiente", tot.saldo, tot.saldo > 0 ? (DS ? DS.warn : "#C9A227") : (DS ? DS.ok : "#1F8A5B")]].map(function (row) {
          return (
            <div key={row[0]} style={Object.assign({}, card, { flex: "1 1 150px" })}>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>{row[0]}</div>
              <div style={{ fontFamily: T.serif, fontSize: 24, color: row[2] }}>{fmt(row[1])}</div>
            </div>
          );
        })}
      </div>

      {/* Aprobación del paciente */}
      <div style={Object.assign({}, card, { marginBottom: 16 })}>
        {plan.aprobacion && plan.aprobacion.ts ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ color: DS ? DS.ok : "#1F8A5B", fontFamily: T.sans, fontSize: 12.5 }}>✓ Plan aprobado por {plan.aprobacion.nombre || "el paciente"}</span>
            <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{new Date(plan.aprobacion.ts).toLocaleString("es-CL")}</span>
            {plan.aprobacion.sig && <img src={plan.aprobacion.sig} alt="Firma del paciente" style={{ height: 44, background: "#fff", borderRadius: 4, border: "1px solid " + T.line }} />}
            <button type="button" onClick={function () { if (window.confirm("¿Anular la aprobación? El paciente deberá volver a firmar.")) savePlan({ aprobacion: null }); }}
              style={{ marginLeft: "auto", background: "none", border: "none", color: T.textFaint, fontFamily: T.sans, fontSize: 11, cursor: "pointer" }}>Anular aprobación</button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, flex: 1, minWidth: 200 }}>Este plan aún no ha sido aprobado por el paciente.</span>
            <AdBtn T={T} primary onClick={function () { if (!plan.items.length) { window.jcmToast && window.jcmToast("Agrega al menos un procedimiento.", "info"); return; } setFirmando(true); }}>Firmar aprobación</AdBtn>
          </div>
        )}
      </div>

      {/* Alta de procedimiento */}
      <div style={Object.assign({}, card, { marginBottom: 14 })}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
          <label style={{ flex: "2 1 200px" }}><span style={lbl}>Procedimiento</span>
            <input value={nProc} onChange={function (e) { setNProc(e.target.value); }} list="plan-svc" placeholder="Ej: Endodoncia" style={inp} />
            <datalist id="plan-svc">{servicios.map(function (s) { return <option key={s.name} value={s.name} />; })}</datalist>
          </label>
          <label style={{ flex: "0 1 110px" }}><span style={lbl}>Pieza</span>
            <select value={nPieza} onChange={function (e) { setNPieza(e.target.value); }} style={inp}>
              <option value="">— sin pieza —</option>
              {piezasSel.map(function (n) { return <option key={n} value={String(n)}>{n}</option>; })}
            </select>
          </label>
          <label style={{ flex: "0 1 130px" }}><span style={lbl}>Precio</span>
            <input value={nPrecio} onChange={function (e) { setNPrecio(e.target.value.replace(/\D/g, "")); }} inputMode="numeric" placeholder="0" style={Object.assign({}, inp, { textAlign: "right" })} />
          </label>
          <label style={{ flex: "0 1 150px" }}><span style={lbl}>Prioridad</span>
            <select value={nPrio} onChange={function (e) { setNPrio(e.target.value); }} style={inp}>
              {PLAN_PRIORIDADES.map(function (p) { return <option key={p.id} value={p.id}>{p.label} · {p.desc}</option>; })}
            </select>
          </label>
          <AdBtn T={T} onClick={addItem}>+ Agregar</AdBtn>
        </div>
      </div>

      {/* Plano */}
      {plan.items.length === 0
        ? <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "14px 0" }}>El plano de tratamiento está vacío. Agrega procedimientos arriba.</div>
        : <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
            {planOrdenado(plan.items).map(function (it) {
              const pr = planPrioridad(it.prioridad);
              const done = it.estado === "hecho";
              return (
                <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "11px 14px", opacity: done ? 0.65 : 1 }}>
                  <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 999, flexShrink: 0, background: pr.id === "alta" ? (DS ? DS.danger : "#C0285A") : pr.id === "media" ? (DS ? DS.warn : "#C9A227") : T.textMute }} />
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, textDecoration: done ? "line-through" : "none" }}>{it.proc}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>
                      {it.pieza ? "Pieza " + it.pieza + " · " : ""}Prioridad {pr.label.toLowerCase()} · {pr.desc.toLowerCase()}
                    </div>
                  </div>
                  <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text, fontVariantNumeric: "tabular-nums" }}>{fmt(it.precio)}</span>
                  <select value={it.estado} onChange={function (e) { setEstadoItem(it, e.target.value); }}
                    style={{ fontFamily: T.sans, fontSize: 11.5, padding: "6px 9px", borderRadius: 7, border: "1px solid " + T.line, background: T.surface, color: T.textMute, cursor: "pointer" }}>
                    {PLAN_ESTADOS.map(function (s) { return <option key={s.id} value={s.id}>{s.label}</option>; })}
                  </select>
                  <button type="button" onClick={function () { delItem(it.id); }} aria-label={"Quitar " + it.proc}
                    style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 2, display: "flex" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </button>
                </div>
              );
            })}
          </div>}

      {/* Cuotas */}
      <div style={card}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Pagos por cuotas</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 12 }}>
          <label style={{ flex: "0 1 150px" }}><span style={lbl}>Abono</span>
            <input value={abono} onChange={function (e) { setAbono(e.target.value.replace(/\D/g, "")); }} inputMode="numeric" placeholder="0" style={Object.assign({}, inp, { textAlign: "right" })} />
          </label>
          <label style={{ flex: "0 1 150px" }}><span style={lbl}>Método</span>
            <select value={metodo} onChange={function (e) { setMetodo(e.target.value); }} style={inp}>
              {["Efectivo", "Débito", "Crédito", "Transferencia"].map(function (m) { return <option key={m} value={m}>{m}</option>; })}
            </select>
          </label>
          <AdBtn T={T} primary onClick={addAbono}>Registrar abono</AdBtn>
        </div>
        {plan.abonos.length === 0
          ? <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Sin abonos registrados.</div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {plan.abonos.map(function (a) {
                return (
                  <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: T.sans, fontSize: 12.5, color: T.text, padding: "8px 10px", borderRadius: 6, background: T.surface2 || T.surface, border: "1px solid " + T.line }}>
                    <span style={{ flex: 1 }}>{a.fecha} · {a.metodo}</span>
                    <strong style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(a.monto)}</strong>
                  </div>
                );
              })}
              <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 4, lineHeight: 1.5 }}>
                Cada abono queda registrado como ingreso en Caja. Para corregir un cobro, hazlo en Caja: así el movimiento y su auditoría no se separan de lo que ve el paciente.
              </div>
            </div>}
      </div>

      {firmando && <PlanFirmaModal T={T} patient={patient} onClose={function () { setFirmando(false); }}
        onSign={function (r) { savePlan({ aprobacion: { nombre: r.nombre, sig: r.sig, ts: Date.now() } }); setFirmando(false); window.jcmToast && window.jcmToast("Plan aprobado y firmado.", "ok"); }} />}
    </div>
  );
}

/* Aprobación digital del plano. Reutiliza SignaturePad (jc-sign.jsx), el mismo componente con el
   que se firman los consentimientos, para que la firma del paciente sea una sola cosa en el sistema. */
function PlanFirmaModal({ T, patient, onClose, onSign }) {
  const [nombre, setNombre] = useState(patient.name || "");
  const [sig, setSig] = useState(null);
  const [acepta, setAcepta] = useState(false);
  const listo = !!(nombre.trim() && sig && acepta);
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 13.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" };
  return (
    <AdModal T={T} title="Aprobación del plan de tratamiento" onClose={onClose}
      footer={<AdBtn T={T} primary full onClick={function () { if (listo) onSign({ nombre: nombre.trim(), sig: sig }); }}>{listo ? "Aprobar y firmar" : "Completa nombre, firma y aceptación"}</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Nombre de quien aprueba</span>
          <input value={nombre} onChange={function (e) { setNombre(e.target.value); }} style={inp} /></label>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 9, fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5, cursor: "pointer" }}>
          <input type="checkbox" checked={acepta} onChange={function (e) { setAcepta(e.target.checked); }} style={{ marginTop: 3, flexShrink: 0 }} />
          <span>Declaro que me explicaron los procedimientos del plan, su orden y su costo, y que acepto realizarlos.</span>
        </label>
        <div>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Firma del paciente</span>
          <SignaturePad T={T} onChange={setSig} height={170} />
        </div>
      </div>
    </AdModal>
  );
}

Object.assign(window, {
  Odontograma, ToothSVG, RxSlot, RxMedir, PlanDentalTab, PlanFirmaModal,
  PLAN_PRIORIDADES, PLAN_ESTADOS, planGet, planTotales, planOrdenado, planPrioridad, planEstadoLabel, planPendientesPublicos,
  ODONTO_ESTADOS, ODONTO_DENTICION, odontoEstado, odontoTipo, odontoEsSuperior, odontoPiezasDe,
  odontoGet, odontoPieza, odontoSetPieza, odontoStats, odontoResumenTexto, odontoRxView
});
