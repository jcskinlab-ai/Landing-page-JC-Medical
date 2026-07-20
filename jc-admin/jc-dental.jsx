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
    setRxTick(function (t) { return t + 1; });
  }
  function getRx(pieza) {
    try { return (window.faceGetPhoto && window.faceGetPhoto(patient.id, odontoRxView(pieza))) || null; } catch (e) { return null; }
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
              <RxSlot T={T} url={getRx(null)} readOnly={readOnly} tick={rxTick}
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
            <RxSlot T={T} url={getRx(sel)} readOnly={readOnly} tick={rxTick}
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

/* Ranura de radiografía: previsualización + carga + borrado. */
function RxSlot({ T, url, readOnly, onPick, onDel }) {
  const [zoom, setZoom] = useState(false);
  if (url) {
    return (
      <div>
        <img src={url} alt="Radiografía" onClick={function () { setZoom(!zoom); }}
             style={{ width: "100%", maxHeight: zoom ? "none" : 150, objectFit: zoom ? "contain" : "cover", borderRadius: 6, border: "1px solid " + T.line, cursor: "zoom-in", display: "block", background: "#000" }} />
        {!readOnly && <button type="button" onClick={onDel} style={{ marginTop: 6, background: "transparent", border: "none", color: T.textFaint, cursor: "pointer", fontFamily: T.sans, fontSize: 11 }}>Eliminar radiografía</button>}
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

Object.assign(window, {
  Odontograma, ToothSVG, RxSlot,
  ODONTO_ESTADOS, ODONTO_DENTICION, odontoEstado, odontoTipo, odontoEsSuperior, odontoPiezasDe,
  odontoGet, odontoPieza, odontoSetPieza, odontoStats, odontoResumenTexto, odontoRxView
});
