const MODELS_3D = [
  { id: "1beb6143ca84481f871c19a4648caa4c", label: "M\xFAsculos faciales (con etiquetas)" }
];
function sketchfabUrl(id) {
  return "https://sketchfab.com/models/" + id + "/embed?ui_theme=dark&ui_infos=0&ui_hint=0&ui_watermark=0&autospin=0.2&ui_ar=0";
}
const PUNCION_PRODUCTS = [
  { id: "botox", label: "Toxina botul\xEDnica", unit: "U", color: "#8B9EB0" },
  { id: "ah", label: "Rinomodelaci\xF3n", unit: "ml", color: "#6FB3B8" },
  { id: "sculptra", label: "Bioestimulaci\xF3n de col\xE1geno", unit: "vial", color: "#C0285A" }
];
function prodOf(id) {
  return PUNCION_PRODUCTS.find((p) => p.id === id) || PUNCION_PRODUCTS[0];
}
const ANAT_IMG = { front: "/assets/anat-front.jpg", sideL: "/assets/anat-side-left.png", sideR: "/assets/anat-side-right.jpg" };
function fileToDataURL(file, maxDim, cb) {
  const rd = new FileReader();
  rd.onload = () => {
    const img = new Image();
    img.onload = () => {
      let { width: w, height: h } = img;
      const sc = Math.min(1, maxDim / Math.max(w, h));
      w = Math.round(w * sc);
      h = Math.round(h * sc);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      c.getContext("2d").drawImage(img, 0, 0, w, h);
      cb(c.toDataURL("image/jpeg", 0.85));
    };
    img.src = rd.result;
  };
  rd.readAsDataURL(file);
}
function loadScriptOnce(src) {
  return new Promise((res, rej) => {
    if ([...document.scripts].some((s2) => s2.src === src)) {
      const t = setInterval(() => {
        if (window.FaceMesh) {
          clearInterval(t);
          res();
        }
      }, 80);
      setTimeout(() => {
        clearInterval(t);
        res();
      }, 8e3);
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.crossOrigin = "anonymous";
    s.onload = () => res();
    s.onerror = () => rej(new Error("No se pudo cargar el modelo de IA. Revisa tu conexi\xF3n."));
    document.head.appendChild(s);
  });
}
function loadImg(src) {
  return new Promise((res, rej) => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });
}
function _faceKey() {
  var cid = "local";
  try {
    cid = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId() || "local";
  } catch (e) {
  }
  return "jcm_facephotos_" + cid;
}
function _faceUrlKey(pid) {
  return "fpurl_" + pid;
}
function faceGetPhoto(pid, view) {
  try {
    var all = JSON.parse(localStorage.getItem(_faceKey()) || "{}");
    var loc = (all[pid] || {})[view];
    if (loc) return loc;
  } catch (e) {
  }
  try {
    var urls = window.DB && window.DB.get(_faceUrlKey(pid));
    return urls && urls[view] || null;
  } catch (e) {
    return null;
  }
}
function faceSetPhoto(pid, view, url) {
  if (!pid) return;
  try {
    var k = _faceKey(), all = JSON.parse(localStorage.getItem(k) || "{}");
    if (!all[pid]) all[pid] = {};
    if (url == null) {
      delete all[pid][view];
      if (!Object.keys(all[pid]).length) delete all[pid];
    } else all[pid][view] = url;
    localStorage.setItem(k, JSON.stringify(all));
  } catch (e) {
    try {
      window.jcmError && window.jcmError("No se pudo guardar la foto (almacenamiento del navegador lleno).");
    } catch (_) {
    }
  }
  if (url && url.startsWith("data:") && window.JCSAAS && typeof window.JCSAAS.uploadImage === "function") {
    window.JCSAAS.uploadImage(url, "faces/" + pid + "/" + view + ".jpg").then(function(storUrl) {
      try {
        var u2 = window.DB && window.DB.get(_faceUrlKey(pid)) || {};
        u2[view] = storUrl;
        window.DB && window.DB.set(_faceUrlKey(pid), u2);
      } catch (e) {
      }
    }).catch(function() {
    });
  } else if (url == null) {
    try {
      var u = window.DB && window.DB.get(_faceUrlKey(pid)) || {};
      delete u[view];
      if (Object.keys(u).length) window.DB && window.DB.set(_faceUrlKey(pid), u);
      else window.DB && window.DB.del && window.DB.del(_faceUrlKey(pid));
    } catch (e) {
    }
    try {
      if (window.JCSAAS && window.JCSAAS.deleteImage) window.JCSAAS.deleteImage("faces/" + pid + "/" + view + ".jpg");
    } catch (e) {
    }
  }
}
function photoQuality(dataUrl) {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.onload = function() {
        try {
          const s = 48, c = document.createElement("canvas");
          c.width = s;
          c.height = s;
          const ctx = c.getContext("2d");
          ctx.drawImage(img, 0, 0, s, s);
          const d = ctx.getImageData(0, 0, s, s).data;
          let sum = 0;
          const lums = [];
          for (let i = 0; i < d.length; i += 4) {
            const l = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
            lums.push(l);
            sum += l;
          }
          const mean = sum / lums.length;
          let vs = 0;
          for (let k = 0; k < lums.length; k++) vs += (lums[k] - mean) * (lums[k] - mean);
          resolve({ bright: mean, contrast: Math.sqrt(vs / lums.length) });
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = function() {
        resolve(null);
      };
      img.src = dataUrl;
    } catch (e) {
      resolve(null);
    }
  });
}
const FACEMESH_SRC = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/face_mesh.js";
async function detectFaceMesh(dataUrl) {
  await loadScriptOnce(FACEMESH_SRC);
  if (!window.FaceMesh) throw new Error("El modelo de IA no est\xE1 disponible.");
  const img = await loadImg(dataUrl);
  return await new Promise((resolve, reject) => {
    const to = setTimeout(() => reject(new Error("La detecci\xF3n tard\xF3 demasiado. Intenta con otra foto.")), 2e4);
    try {
      const fm = new window.FaceMesh({ locateFile: (f) => "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/" + f });
      fm.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.4 });
      fm.onResults((r) => {
        clearTimeout(to);
        const l = r.multiFaceLandmarks && r.multiFaceLandmarks[0];
        if (!l) reject(new Error("No se detect\xF3 un rostro. Usa una foto frontal, clara y bien iluminada."));
        else resolve({ lm: l, W: img.naturalWidth, H: img.naturalHeight });
      });
      fm.send({ image: img });
    } catch (e) {
      clearTimeout(to);
      reject(e);
    }
  });
}
const PHI = 1.618;
function aureoCompute(lm, W, H, opts) {
  const P = (i) => ({ x: lm[i].x * W, y: lm[i].y * H });
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const glabella = P(9), nasion = P(168), subnasale = P(2);
  const stomion = { x: (P(13).x + P(14).x) / 2, y: (P(13).y + P(14).y) / 2 }, menton = P(152);
  const trichDet = P(10);
  const trichion = { x: trichDet.x, y: opts && opts.trichY != null ? opts.trichY : trichDet.y };
  const axA = nasion, axB = menton;
  const adx = axB.x - axA.x, ady = axB.y - axA.y || 1;
  const alen = Math.hypot(adx, ady) || 1;
  const vx = adx / alen, vy = ady / alen;
  const nrx = -vy, nry = vx;
  const projV = (p) => (p.x - axA.x) * vx + (p.y - axA.y) * vy;
  const projH = (p) => (p.x - axA.x) * nrx + (p.y - axA.y) * nry;
  const sideOf = projH;
  const xAt = (y) => axA.x + (y - axA.y) * (adx / ady);
  const eyeOutL = P(33), eyeInL = P(133), eyeTopL = P(159), eyeBotL = P(145);
  const eyeInR = P(362), eyeOutR = P(263);
  const alarL = P(48), alarR = P(278), mouthL = P(61), mouthR = P(291);
  const browL = P(105), browR = P(334), faceL = P(234), faceR = P(454);
  const pT = projV(trichion), pG = projV(glabella), pS = projV(subnasale), pM = projV(menton);
  const total = Math.abs(pM - pT) || 1;
  const t1 = Math.abs(pG - pT) / total * 100;
  const t2 = Math.abs(pS - pG) / total * 100;
  const t3 = Math.abs(pM - pS) / total * 100;
  const hpts = [faceL, eyeOutL, eyeInL, eyeInR, eyeOutR, faceR].map(projH).sort((a, b) => a - b);
  const faceW = hpts[5] - hpts[0] || 1;
  const fifths = [hpts[1] - hpts[0], hpts[2] - hpts[1], hpts[3] - hpts[2], hpts[4] - hpts[3], hpts[5] - hpts[4]].map((v) => Math.abs(v) / faceW * 100);
  const fifthsDev = fifths.reduce((s, v) => s + Math.abs(v - 20), 0) / 5;
  const xs = [faceL.x, eyeOutL.x, eyeInL.x, eyeInR.x, eyeOutR.x, faceR.x].sort((a, b) => a - b);
  const noseW = dist(alarL, alarR), noseH = dist(nasion, subnasale);
  const mouthW = dist(mouthL, mouthR);
  const eyeW = dist(eyeOutL, eyeInL), eyeH = dist(eyeTopL, eyeBotL);
  const interEye = dist(eyeInL, eyeInR);
  const subToLip = dist(subnasale, stomion), lipToChin = dist(stomion, menton);
  const sc = (val, ideal, tol) => {
    const d = Math.min(1, Math.abs(val - ideal) / tol);
    return 1 - d * d;
  };
  const symPair = (l, r) => {
    const dl = Math.abs(sideOf(l)), dr = Math.abs(sideOf(r));
    return 1 - Math.min(1, Math.abs(dl - dr) / ((dl + dr) / 2 || 1));
  };
  const symmetry = (symPair(eyeOutL, eyeOutR) + symPair(eyeInL, eyeInR) + symPair(alarL, alarR) + symPair(mouthL, mouthR) + symPair(browL, browR)) / 5;
  const dEyeL = Math.abs(sideOf(eyeOutL)), dEyeR = Math.abs(sideOf(eyeOutR));
  const frontal = 1 - Math.min(1, Math.abs(dEyeL - dEyeR) / ((dEyeL + dEyeR) / 2 || 1));
  const metrics = [
    { key: "tercios", label: "Tercios faciales (33/33/33)", value: Math.round(t1) + " / " + Math.round(t2) + " / " + Math.round(t3) + "%", score: (sc(t1, 33.3, 10) + sc(t2, 33.3, 10) + sc(t3, 33.3, 10)) / 3, ideal: "33 / 33 / 33 %", note: t3 > 37 ? "Tercio inferior dominante" : t3 < 29 ? "Tercio inferior corto" : "Equilibrio en tercios" },
    { key: "quintos", label: "Quintos faciales (20% c/u)", value: fifths.map((v) => Math.round(v)).join("/") + "%", score: sc(fifthsDev, 0, 7), ideal: "20/20/20/20/20 %", note: fifths[2] > 24 ? "Quinto central (intercantal) amplio" : fifths[2] < 16 ? "Quinto central estrecho" : "Quintos equilibrados" },
    { key: "nariz", label: "Nariz \xB7 alto:ancho", value: (noseH / noseW).toFixed(2) + " : 1", score: sc(noseH / noseW, PHI, 0.6), ideal: "1.618 : 1", note: noseH / noseW < 1.4 ? "Base nasal ancha respecto a su altura" : noseH / noseW > 1.9 ? "Nariz alargada" : "Dentro de rango" },
    { key: "boca", label: "Ancho boca : ancho nariz", value: (mouthW / noseW).toFixed(2) + " : 1", score: sc(mouthW / noseW, PHI, 0.65), ideal: "1.618 : 1", note: mouthW / noseW < 1.35 ? "Boca estrecha respecto a la nariz" : mouthW / noseW > 1.9 ? "Boca ancha respecto a la nariz" : "Dentro de rango" },
    { key: "ojos", label: "Ojo \xB7 ancho:alto", value: (eyeW / eyeH).toFixed(2) + " : 1", score: sc(eyeW / eyeH, 3, 1), ideal: "\u2248 3 : 1", note: eyeW / eyeH > 3.6 ? "Ojo alargado" : eyeW / eyeH < 2.4 ? "Ojo redondeado" : "Almendrado" },
    { key: "intercantal", label: "Distancia intercantal", value: (interEye / eyeW).toFixed(2) + " : 1", score: sc(interEye / eyeW, 1, 0.35), ideal: "\u2248 1 ojo", note: interEye / eyeW > 1.25 ? "Ojos separados" : interEye / eyeW < 0.8 ? "Ojos juntos" : "Separaci\xF3n ideal" },
    { key: "nasolabial", label: "Surco nasolabial \u2192 ment\xF3n", value: (lipToChin / subToLip).toFixed(2) + " : 1", score: sc(lipToChin / subToLip, PHI, 0.65), ideal: "1.618 : 1", note: lipToChin / subToLip > 2.1 ? "Ment\xF3n/labio inferior dominante" : lipToChin / subToLip < 1.25 ? "Tercio inferior corto" : "Proporci\xF3n equilibrada del tercio inferior" },
    { key: "simetria", label: "Simetr\xEDa facial (eje medio)", value: Math.round(symmetry * 100) + "%", score: symmetry, ideal: "100 %", note: symmetry < 0.9 ? "Asimetr\xEDa respecto a la l\xEDnea media" : "Buena simetr\xEDa" }
  ];
  const harmony = Math.round(metrics.reduce((s, m) => s + m.score, 0) / metrics.length * 100);
  const recs = [];
  if (t3 > 37) recs.push("Tercio inferior dominante: evaluar proyecci\xF3n de ment\xF3n y equilibrio con bioestimulaci\xF3n / relleno.");
  if (t3 < 29) recs.push("Tercio inferior corto: valorar proyecci\xF3n de ment\xF3n.");
  if (fifths[2] > 24) recs.push("Quinto central amplio: distancia intercantal mayor a un ojo.");
  if (fifths[2] < 16) recs.push("Quinto central estrecho: ojos juntos respecto a la regla de los quintos.");
  if (noseH / noseW < 1.45) recs.push("Relaci\xF3n nasal fuera del ideal \xE1ureo: la rinomodelaci\xF3n puede armonizar dorso y punta.");
  if (mouthW / noseW < 1.45) recs.push("Boca estrecha respecto a la nariz: valorar volumen labial.");
  if (symmetry < 0.9) recs.push("Asimetr\xEDa respecto a la l\xEDnea media: la toxina botul\xEDnica puede equilibrar la musculatura.");
  if (!recs.length) recs.push("Proporciones dentro de rangos arm\xF3nicos. Mantenci\xF3n y prevenci\xF3n.");
  const overlay = {
    thirdsY: [trichion.y, glabella.y, subnasale.y, menton.y],
    fifthsX: xs,
    faceTopY: trichion.y,
    faceBotY: menton.y,
    faceLeftX: xs[0],
    faceRightX: xs[5],
    midTop: { x: xAt(trichion.y), y: trichion.y },
    midBot: { x: menton.x, y: menton.y },
    // Surco nasolabial → mentón: bracket del tercio inferior dividido en la boca (estomion)
    nasoSeg: { x: subnasale.x, yTop: subnasale.y, yMid: stomion.y, yBot: menton.y },
    dots: [eyeOutL, eyeInL, eyeInR, eyeOutR, alarL, alarR, mouthL, mouthR, subnasale, menton]
  };
  return { metrics, harmony, recs, W, H, overlay, frontal };
}
function FaceSVG({ view, stroke, faint }) {
  const SKIN = "#E7D2C6", M1 = "#BE7062", M2 = "#A4564B", TEND = "#ECE0D6", STRIA = "#8A453C";
  if (view === "front") {
    const HEAD = "M100 16 C58 16 44 48 44 98 C44 152 64 214 100 238 C136 214 156 152 156 98 C156 48 142 16 100 16 Z";
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 200 260", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "ffront" }, /* @__PURE__ */ React.createElement("path", { d: HEAD }))), /* @__PURE__ */ React.createElement("path", { d: HEAD, fill: SKIN }), /* @__PURE__ */ React.createElement("g", { clipPath: "url(#ffront)" }, /* @__PURE__ */ React.createElement("path", { d: "M56 104 C53 82 58 60 79 59 C90 58 96 69 100 78 C104 69 110 58 121 59 C142 60 147 82 144 104 C118 113 82 113 56 104 Z", fill: M1 }), /* @__PURE__ */ React.createElement("path", { d: "M97 64 C99 82 99 92 100 104 C101 92 101 82 103 64 Z", fill: TEND, opacity: ".85" }), /* @__PURE__ */ React.createElement("path", { d: "M44 74 C52 68 63 78 63 106 C52 114 44 102 42 88 Z", fill: M2 }), /* @__PURE__ */ React.createElement("path", { d: "M156 74 C148 68 137 78 137 106 C148 114 156 102 158 88 Z", fill: M2 }), /* @__PURE__ */ React.createElement("ellipse", { cx: "77", cy: "118", rx: "18", ry: "13", fill: M1 }), /* @__PURE__ */ React.createElement("ellipse", { cx: "123", cy: "118", rx: "18", ry: "13", fill: M1 }), /* @__PURE__ */ React.createElement("ellipse", { cx: "77", cy: "118", rx: "9.5", ry: "5.5", fill: SKIN }), /* @__PURE__ */ React.createElement("ellipse", { cx: "123", cy: "118", rx: "9.5", ry: "5.5", fill: SKIN }), /* @__PURE__ */ React.createElement("path", { d: "M94 108 C96 132 96 150 100 158 C104 150 104 132 106 108 Z", fill: M2 }), /* @__PURE__ */ React.createElement("path", { d: "M90 150 C83 152 83 160 91 162 Z", fill: M1 }), /* @__PURE__ */ React.createElement("path", { d: "M110 150 C117 152 117 160 109 162 Z", fill: M1 }), /* @__PURE__ */ React.createElement("path", { d: "M56 120 C54 152 66 184 92 192 C86 168 80 140 80 124 C72 118 62 116 56 120 Z", fill: M2, opacity: ".9" }), /* @__PURE__ */ React.createElement("path", { d: "M144 120 C146 152 134 184 108 192 C114 168 120 140 120 124 C128 118 138 116 144 120 Z", fill: M2, opacity: ".9" }), /* @__PURE__ */ React.createElement("path", { d: "M64 128 C72 150 82 170 96 180 L100 176 C86 166 76 148 70 126 Z", fill: M1 }), /* @__PURE__ */ React.createElement("path", { d: "M136 128 C128 150 118 170 104 180 L100 176 C114 166 124 148 130 126 Z", fill: M1 }), /* @__PURE__ */ React.createElement("ellipse", { cx: "100", cy: "182", rx: "22", ry: "12", fill: M1 }), /* @__PURE__ */ React.createElement("g", { stroke: STRIA, strokeWidth: "0.9", opacity: ".5", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M68 66 V104 M80 61 V108 M120 61 V108 M132 66 V104" }), /* @__PURE__ */ React.createElement("path", { d: "M46 80 C54 90 59 98 61 106 M154 80 C146 90 141 98 139 106" }), /* @__PURE__ */ React.createElement("path", { d: "M66 130 C74 152 84 170 96 180 M134 130 C126 152 116 170 104 180" }))), /* @__PURE__ */ React.createElement("g", { fill: "none", stroke, strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: HEAD }), /* @__PURE__ */ React.createElement("path", { d: "M68 119 q9 -5 18 0 M114 119 q9 -5 18 0" }), /* @__PURE__ */ React.createElement("path", { d: "M100 156 q-9 5 -14 1 M100 156 q9 5 14 1", stroke: faint }), /* @__PURE__ */ React.createElement("path", { d: "M82 182 q18 6 36 0", stroke: faint })));
  }
  const SIDE = "M152 16 C104 12 64 42 60 96 C58 118 49 124 43 136 C39 145 50 149 56 151 C58 174 64 198 88 212 C116 230 152 228 162 208 L164 16 Z";
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 200 260", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "fside" }, /* @__PURE__ */ React.createElement("path", { d: SIDE }))), /* @__PURE__ */ React.createElement("path", { d: SIDE, fill: SKIN }), /* @__PURE__ */ React.createElement("g", { clipPath: "url(#fside)" }, /* @__PURE__ */ React.createElement("path", { d: "M70 60 C100 50 150 54 158 62 L156 96 C120 96 92 92 72 94 C66 84 64 70 70 60 Z", fill: M1 }), /* @__PURE__ */ React.createElement("path", { d: "M118 66 C146 60 158 74 156 100 C148 116 126 108 116 94 C112 82 112 72 118 66 Z", fill: M2 }), /* @__PURE__ */ React.createElement("path", { d: "M120 70 C140 68 150 80 148 98 M122 78 C138 78 146 88 145 100", stroke: STRIA, strokeWidth: "0.9", fill: "none", opacity: ".5" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "86", cy: "108", rx: "14", ry: "11", fill: M1 }), /* @__PURE__ */ React.createElement("ellipse", { cx: "84", cy: "108", rx: "7", ry: "4.5", fill: SKIN }), /* @__PURE__ */ React.createElement("path", { d: "M64 100 C60 116 56 128 50 136 C58 140 64 138 66 132 Z", fill: M2 }), /* @__PURE__ */ React.createElement("ellipse", { cx: "72", cy: "170", rx: "18", ry: "11", fill: M1 }), /* @__PURE__ */ React.createElement("path", { d: "M96 120 C90 152 100 186 124 196 C120 172 116 142 116 122 C108 116 102 116 96 120 Z", fill: M2, opacity: ".9" }), /* @__PURE__ */ React.createElement("path", { d: "M120 196 C128 214 150 224 160 224 L162 206 C146 200 132 188 126 176 Z", fill: M1, opacity: ".85" }), /* @__PURE__ */ React.createElement("g", { stroke: STRIA, strokeWidth: "0.9", opacity: ".5", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M82 62 V94 M100 58 V94 M118 60 V94" }), /* @__PURE__ */ React.createElement("path", { d: "M98 126 C94 154 104 182 122 192" }))), /* @__PURE__ */ React.createElement("g", { fill: "none", stroke, strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M152 16 C104 12 64 42 60 96 C58 118 49 124 43 136 C39 145 50 149 56 151 C58 174 64 198 88 212 C116 230 152 228 162 208" }), /* @__PURE__ */ React.createElement("path", { d: "M78 108 q9 -5 16 0" }), /* @__PURE__ */ React.createElement("path", { d: "M50 136 q10 5 16 -1", stroke: faint }), /* @__PURE__ */ React.createElement("path", { d: "M56 170 q14 5 26 -1", stroke: faint })));
}
const MARQ_RATIO = 552 / 740;
function MarquardtMask({ color, scale, dy, opacity, fit }) {
  const url = "/jc-proto/marquardt-mask.png?v=65";
  const base = {
    pointerEvents: "none",
    opacity,
    backgroundColor: color,
    WebkitMaskImage: "url(" + url + ")",
    maskImage: "url(" + url + ")",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center center",
    maskPosition: "center center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    transform: "translateY(" + dy * 0.7 + "%) scale(" + scale + ")",
    transformOrigin: "center center",
    transition: "left .2s ease, top .2s ease, width .2s ease, height .2s ease"
  };
  const pos = fit ? { position: "absolute", left: fit.left + "%", top: fit.top + "%", width: fit.w + "%", height: fit.h + "%" } : { position: "absolute", inset: 0 };
  return /* @__PURE__ */ React.createElement("div", { style: { ...pos, ...base } });
}
function PuncionTool({ T, value, onChange, patient, updatePatient, readOnly, lockProduct }) {
  const A = window.JCADMIN;
  const [view, setView] = useState("front");
  const _prodList = lockProduct ? PUNCION_PRODUCTS.filter((p) => p.id === lockProduct) : PUNCION_PRODUCTS;
  const [product, setProduct] = useState(lockProduct ? prodOf(lockProduct) : PUNCION_PRODUCTS[0]);
  const [sel, setSel] = useState(null);
  const [spin, setSpin] = useState(false);
  const [model3d, setModel3d] = useState(MODELS_3D[0].id);
  const [imgFail, setImgFail] = useState({});
  const [photoMode, setPhotoMode] = useState("foto");
  const fileRef = useRef(null);
  const areaRef = useRef(null);
  const points = value || [];
  const mirror = view === "sider";
  const svgView = view === "front" ? "front" : "side";
  const zones = view === "front" ? A.zonesFront : mirror ? A.zonesSide.map((z) => ({ ...z, x: 100 - z.x })) : A.zonesSide;
  const [photo, _setPhoto] = useState(() => faceGetPhoto(patient && patient.id, view));
  useEffect(() => {
    _setPhoto(faceGetPhoto(patient && patient.id, view));
  }, [view, patient && patient.id]);
  useEffect(() => {
    if (!patient || !patient.id || !window.JCSAAS || typeof window.JCSAAS.uploadImage !== "function") return;
    try {
      var all = JSON.parse(localStorage.getItem(_faceKey()) || "{}");
      var patPhotos = all[patient.id] || {};
      Object.keys(patPhotos).forEach(function(v) {
        var loc = patPhotos[v];
        if (!loc || !loc.startsWith("data:")) return;
        try {
          var existing = window.DB && window.DB.get(_faceUrlKey(patient.id)) || {};
          if (existing[v]) return;
        } catch (e) {
        }
        faceSetPhoto(patient.id, v, loc);
      });
    } catch (e) {
    }
  }, [patient && patient.id]);
  const [narrow, setNarrow] = useState(typeof window !== "undefined" && window.innerWidth < 900);
  useEffect(() => {
    const h = () => setNarrow(window.innerWidth < 900);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  function setPhoto(url) {
    if (patient) {
      faceSetPhoto(patient.id, view, url);
      _setPhoto(url || null);
    }
  }
  function onUpload(e) {
    const f = e.target.files[0];
    if (f) fileToDataURL(f, 1100, setPhoto);
    e.target.value = "";
  }
  function addPoint(x, y, label, def) {
    const p = { id: "pt" + Date.now() + Math.random().toString(36).slice(2, 5), view, x, y, product: product.id, units: def || defFor(product), label: label || "", note: "" };
    onChange([...points, p]);
    setSel(p.id);
  }
  function defFor(pr) {
    return pr.unit === "U" ? "2U" : pr.unit === "ml" ? "0.5ml" : "1 vial";
  }
  function stepUnits(id, delta) {
    onChange(points.map((p) => {
      if (p.id !== id) return p;
      const m = (p.units || "").match(/^([\d.]+)\s*(.*)$/);
      const num = m ? parseFloat(m[1]) : 0;
      const suf = m ? m[2] : prodOf(p.product).unit === "U" ? "U" : "";
      const next = Math.max(0, Math.round((num + delta) * 10) / 10);
      return { ...p, units: next + (suf || "") };
    }));
  }
  function setNote(id, n) {
    onChange(points.map((p) => p.id === id ? { ...p, note: n } : p));
  }
  function setAnatPos(id, x, y) {
    onChange(points.map((p) => p.id === id ? { ...p, anatX: x, anatY: y } : p));
  }
  function clickArea(e) {
    if (e.target.closest("[data-marker]") || e.target.closest("[data-zone]")) return;
    const r = areaRef.current.getBoundingClientRect();
    const x = Math.round((e.clientX - r.left) / r.width * 100);
    const y = Math.round((e.clientY - r.top) / r.height * 100);
    if (x < 2 || x > 98 || y < 1 || y > 99) return;
    if (photo && photoMode === "anat") {
      if (sel) {
        setAnatPos(sel, x, y);
        setSel(null);
      }
    } else {
      addPoint(x, y);
    }
  }
  function setUnits(id, u) {
    onChange(points.map((p) => p.id === id ? { ...p, units: u } : p));
  }
  function remove(id) {
    onChange(points.filter((p) => p.id !== id));
    setSel(null);
  }
  function flip(v) {
    setSpin(true);
    setTimeout(() => {
      setView(v);
      setSpin(false);
    }, 180);
  }
  const viewPoints = points.filter((p) => p.view === view);
  const baseLabel = (s) => (s || "").toLowerCase().replace(/\s*(izq\.?|der\.?|izquierd[oa]|derech[oa])\.?\s*$/, "").trim();
  const zoneByLabel = {};
  zones.forEach((z) => {
    zoneByLabel[baseLabel(z.label)] = z;
  });
  const carried = points.filter((p) => p.view !== view && p.label && zoneByLabel[baseLabel(p.label)]).map((p) => ({ ...p, _z: zoneByLabel[baseLabel(p.label)] }));
  const totals = {};
  points.forEach((p) => {
    const pr = prodOf(p.product);
    const n = parseFloat(p.units) || 0;
    totals[pr.label] = (totals[pr.label] || 0) + n;
  });
  const summaryByProd = {};
  points.forEach((p) => {
    const pr = prodOf(p.product);
    const n = parseFloat(p.units) || 0;
    const s = summaryByProd[pr.label] || (summaryByProd[pr.label] = { unit: pr.unit, sum: 0, count: 0 });
    s.sum += n;
    s.count++;
  });
  const unitWord = (u) => u === "U" ? "U" : u === "ml" ? "ml" : u === "vial" ? "viales" : u || "";
  const rnd = (n) => Math.round(n * 100) / 100;
  const viewTabs = /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(ViewTab, { T, active: view === "front", onClick: () => flip("front") }, "Frontal"), /* @__PURE__ */ React.createElement(ViewTab, { T, active: view === "side", onClick: () => flip("side") }, "Perfil izq."), /* @__PURE__ */ React.createElement(ViewTab, { T, active: view === "sider", onClick: () => flip("sider") }, "Perfil der."), /* @__PURE__ */ React.createElement(ViewTab, { T, active: view === "3d", onClick: () => flip("3d") }, "Modelo 3D 360\xB0"));
  return /* @__PURE__ */ React.createElement("div", null, view !== "3d" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12, alignItems: "center" } }, _prodList.map((pr) => /* @__PURE__ */ React.createElement("button", { key: pr.id, onClick: () => setProduct(pr), style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontFamily: T.sans,
    fontSize: 10.5,
    letterSpacing: ".04em",
    padding: "8px 12px",
    borderRadius: 999,
    cursor: "pointer",
    background: product.id === pr.id ? T.surface2 : T.surface,
    color: product.id === pr.id ? T.text : T.textMute,
    border: "1px solid " + (product.id === pr.id ? pr.color : T.line)
  } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: pr.color } }), pr.label)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: onUpload, style: { display: "none" } }), !readOnly && /* @__PURE__ */ React.createElement("button", { onClick: () => fileRef.current.click(), style: ghostBtn(T) }, photo ? "Cambiar foto" : "Subir foto en reposo"), !readOnly && photo && /* @__PURE__ */ React.createElement("button", { onClick: () => setPhoto(null), style: ghostBtn(T) }, "Quitar foto"), photo && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", borderRadius: 999, border: "1px solid " + T.line, overflow: "hidden" } }, ["foto", "anat"].map((m) => /* @__PURE__ */ React.createElement("button", { key: m, onClick: () => setPhotoMode(m), style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".06em", padding: "7px 13px", cursor: "pointer", border: "none", background: photoMode === m ? T.text : "transparent", color: photoMode === m ? T.bg || "#fff" : T.textMute, transition: "background .15s" } }, m === "foto" ? "Foto real" : "Anatom\xEDa"))), !readOnly && viewPoints.length > 0 && /* @__PURE__ */ React.createElement("button", { onClick: () => {
    if (window.confirm("\xBFBorrar todos los puntos de esta vista?")) onChange(points.filter((p) => p.view !== view));
  }, style: { ...ghostBtn(T), color: "#C0285A", borderColor: "#C0285A44" } }, "Borrar todos")), view === "3d" ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, flexShrink: 0 } }, "Modelo"), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 12.5, color: T.text } }, "M\xFAsculos faciales con etiquetas \xB7 educaci\xF3n al paciente")), /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "4/3", borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line, background: "#0b0f14" } }, /* @__PURE__ */ React.createElement("iframe", { key: model3d, title: "Modelo 3D de musculatura facial", src: sketchfabUrl(model3d), allow: "autoplay; fullscreen; xr-spatial-tracking", allowFullScreen: true, style: { width: "100%", height: "100%", border: 0 } })), viewTabs, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 } }, "Arrastra para girar 360\xB0, acerca con rueda/pellizco. Para registrar punciones usa Frontal o Perfil.")) : /* @__PURE__ */ React.createElement("div", { style: { display: narrow ? "flex" : "grid", flexDirection: narrow ? "column" : void 0, gridTemplateColumns: narrow ? void 0 : "1.1fr .9fr", gap: 14, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, product.id !== "botox" ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, product.id === "ah" ? "Fotos antes / despu\xE9s \xB7 Rinomodelaci\xF3n" : "Fotos del paciente \xB7 Bioestimulaci\xF3n"), (() => {
    const allImgs = window.DB && patient && window.DB.get("pimg_" + patient.id) || patient && patient.images || [];
    const kws = product.id === "ah" ? ["rino", "hialu", "armoniz", "relleno"] : ["bio", "sculptra", "col\xE1g", "estimul"];
    const imgs = allImgs.length > 0 ? allImgs.filter((im) => !im.proc || kws.some((k) => (im.proc || "").toLowerCase().includes(k))) : [];
    if (imgs.length === 0) return /* @__PURE__ */ React.createElement("div", { style: { padding: "22px 14px", textAlign: "center", border: "1px dashed " + T.line, borderRadius: 8, color: T.textFaint, fontFamily: T.sans, fontSize: 12, lineHeight: 1.6 } }, "Sin fotos de ", product.id === "ah" ? "rinomodelaci\xF3n" : "bioestimulaci\xF3n", ".", /* @__PURE__ */ React.createElement("br", null), "A\xF1\xE1delas en la pesta\xF1a ", /* @__PURE__ */ React.createElement("b", null, "Im\xE1genes"), ".");
    return /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 8 } }, imgs.map((im) => /* @__PURE__ */ React.createElement("figure", { key: im.id || im.src, style: { margin: 0, borderRadius: 7, overflow: "hidden", border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("img", { src: im.src, alt: im.label || "", style: { width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" } }), /* @__PURE__ */ React.createElement("figcaption", { style: { fontFamily: T.sans, fontSize: 9.5, color: T.textMute, padding: "4px 7px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, im.proc || im.label || ""))));
  })()) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { perspective: 900, maxWidth: "65%", margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { ref: areaRef, onClick: readOnly ? void 0 : clickArea, style: {
    position: "relative",
    aspectRatio: "200/260",
    background: photo && photoMode === "foto" ? "#0c0f13" : "#fff",
    border: "1px solid " + T.line,
    borderRadius: 8,
    cursor: readOnly ? "default" : "crosshair",
    overflow: "hidden",
    transform: spin ? "rotateY(28deg)" : "rotateY(0deg)",
    transition: "transform .18s " + T.ease,
    transformStyle: "preserve-3d"
  } }, photo && photoMode === "foto" && /* @__PURE__ */ React.createElement("img", { src: photo, alt: "Rostro en reposo", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", transform: mirror ? "scaleX(-1)" : "none" } }), (!photo || photoMode === "anat") && (() => {
    const anatKey = view === "front" ? "front" : view === "sider" ? "sideR" : "sideL";
    const anatSrc = ANAT_IMG[anatKey];
    return /* @__PURE__ */ React.createElement(React.Fragment, null, imgFail[anatKey] && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: "6%", transform: mirror ? "scaleX(-1)" : "none" } }, /* @__PURE__ */ React.createElement(FaceSVG, { view: svgView, stroke: T.textMute, faint: T.line })), /* @__PURE__ */ React.createElement("img", { src: anatSrc, alt: "Musculatura facial", onError: () => setImgFail((f) => ({ ...f, [anatKey]: true })), style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", pointerEvents: "none", display: imgFail[anatKey] ? "none" : "block" } }));
  })(), photo && photoMode === "anat" && sel && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", background: "rgba(20,20,15,.82)", color: "#fff", fontFamily: T.sans, fontSize: 9.5, padding: "5px 11px", borderRadius: 99, pointerEvents: "none", whiteSpace: "nowrap", letterSpacing: ".05em" } }, "Haz clic para reubicar el punto seleccionado"), !readOnly && zones.map((z) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: z.id,
      "data-zone": true,
      onClick: () => {
        if (photo && photoMode === "anat") {
          if (sel) {
            setAnatPos(sel, z.x, z.y);
            setSel(null);
          }
        } else {
          addPoint(z.x, z.y, z.label, z.def);
        }
      },
      title: z.label,
      style: { position: "absolute", left: z.x + "%", top: z.y + "%", transform: "translate(-50%,-50%)", width: 11, height: 11, borderRadius: "50%", background: "transparent", border: "1px dashed " + (photo && photoMode === "foto" ? "rgba(255,255,255,.7)" : T.chipBorder), cursor: "pointer", padding: 0 }
    }
  )), carried.map((p) => {
    const pr = prodOf(p.product);
    return /* @__PURE__ */ React.createElement("span", { key: "c" + p.id, title: pr.label + " \xB7 " + p.label + " (referencia de otra vista)", style: { position: "absolute", left: p._z.x + "%", top: p._z.y + "%", transform: "translate(-50%,-50%)", width: 14, height: 14, borderRadius: "50%", background: "transparent", border: "1.5px dashed " + pr.color, opacity: 0.6, pointerEvents: "none" } });
  }), viewPoints.map((p) => {
    const pr = prodOf(p.product);
    const active = sel === p.id;
    const isGlass = photo && photoMode === "foto";
    const isAnat = photo && photoMode === "anat";
    const px = isAnat ? p.anatX != null ? p.anatX : p.x : p.x;
    const py = isAnat ? p.anatY != null ? p.anatY : p.y : p.y;
    const hasAnatPos = p.anatX != null;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: p.id,
        "data-marker": true,
        title: pr.label + (isGlass ? " \xB7 clic para eliminar" : isAnat ? active ? " \xB7 clic en el mapa para reubicar" : " \xB7 clic para seleccionar y reubicar" : " \xB7 clic para eliminar"),
        onClick: (e) => {
          e.stopPropagation();
          if (isAnat) {
            setSel(p.id === sel ? null : p.id);
          } else {
            remove(p.id);
          }
        },
        style: {
          position: "absolute",
          left: px + "%",
          top: py + "%",
          transform: "translate(-50%,-50%) scale(" + (active ? 1.35 : 1) + ")",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: isGlass ? "rgba(255,255,255,0.12)" : isAnat && !hasAnatPos ? "rgba(22,38,58,.5)" : "#16263A",
          backdropFilter: isGlass ? "blur(8px)" : "none",
          WebkitBackdropFilter: isGlass ? "blur(8px)" : "none",
          border: isGlass ? "1.5px solid " + (active ? pr.color : "rgba(255,255,255,0.6)") : "2px solid " + (active ? pr.color : isAnat && !hasAnatPos ? "rgba(255,255,255,.4)" : "#fff"),
          color: "#fff",
          fontFamily: T.sans,
          fontSize: 8.5,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: isGlass ? "0 2px 8px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.18)" : "0 1px 5px rgba(0,0,0,.45)",
          transition: "transform .15s, border-color .12s",
          padding: 0,
          lineHeight: "18px",
          opacity: isAnat && !hasAnatPos ? 0.55 : 1
        }
      },
      points.indexOf(p) + 1
    );
  }))), viewTabs, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5, textAlign: "center" } }, photo && photoMode === "anat" ? "Vista anat\xF3mica \u2014 selecciona un punto y haz clic en el m\xFAsculo correspondiente para ubicarlo con precisi\xF3n." : "Haz clic en el rostro para marcar un punto; haz clic sobre un punto para eliminarlo. Sube una <b>foto del rostro en reposo</b> o usa el esquema 2D y el modelo 3D.")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 8 } }, "Notas / Resultados"), Object.keys(summaryByProd).length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10, padding: "11px 13px", borderRadius: 8, background: T.accentSoft || "rgba(84,112,127,.10)", border: "1px solid " + (T.accent + "44") } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, marginBottom: 6 } }, "\u03A3 Total aplicado \xB7 autom\xE1tico"), Object.keys(summaryByProd).map((k) => {
    const s = summaryByProd[k];
    return /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", justifyContent: "space-between", gap: 10, padding: "3px 0", fontFamily: T.sans, fontSize: 12.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, k, " ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, "\xB7 ", s.count, " punci\xF3n", s.count === 1 ? "" : "es")), /* @__PURE__ */ React.createElement("span", { style: { color: T.text, fontWeight: 600 } }, rnd(s.sum), " ", unitWord(s.unit)));
  })), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: patient && patient.faceNotes || "",
      onChange: (e) => {
        if (updatePatient && patient) updatePatient(patient.id, { faceNotes: e.target.value });
      },
      placeholder: "Plan de tratamiento, dosis totales, observaciones de la sesi\xF3n, resultados y controles\u2026",
      style: { width: "100%", minHeight: 80, padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, lineHeight: 1.5, outline: "none", boxSizing: "border-box", resize: "vertical" }
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 8 } }, "Puntos \xB7 ", view === "front" ? "Frontal" : view === "sider" ? "Perfil der." : "Perfil izq."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, maxHeight: 340, overflowY: "auto" } }, viewPoints.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textFaint, padding: "18px 12px", textAlign: "center", border: "1px dashed " + T.line, borderRadius: 8 } }, "A\xFAn no hay puntos marcados en la vista actual."), viewPoints.map((p, i) => {
    const pr = prodOf(p.product);
    const active = sel === p.id;
    return /* @__PURE__ */ React.createElement("div", { key: p.id, onClick: () => setSel(p.id), style: { padding: "10px 11px", borderRadius: 8, cursor: "pointer", background: active ? T.surface2 : T.surface, border: "1px solid " + (active ? pr.color : T.line) } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#16263A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 11, fontWeight: 600 } }, i + 1), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute } }, "Punto ", i + 1), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: pr.color, flexShrink: 0 } }), pr.label)), /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { display: "flex", alignItems: "center", gap: 3 } }, /* @__PURE__ */ React.createElement("input", { value: p.units, onChange: (e) => setUnits(p.id, e.target.value), title: "Dosis", style: { width: 48, padding: "6px 7px", borderRadius: 4, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 11, textAlign: "center", outline: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => stepUnits(p.id, 1), title: "Subir", style: { width: 18, height: 13, padding: 0, borderRadius: 3, border: "1px solid " + T.line, background: T.surface, color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 } }, /* @__PURE__ */ React.createElement("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3" }, /* @__PURE__ */ React.createElement("path", { d: "M6 15l6-6 6 6" }))), /* @__PURE__ */ React.createElement("button", { onClick: () => stepUnits(p.id, -1), title: "Bajar", style: { width: 18, height: 13, padding: 0, borderRadius: 3, border: "1px solid " + T.line, background: T.surface, color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 } }, /* @__PURE__ */ React.createElement("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3" }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))))), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
      e.stopPropagation();
      remove(p.id);
    }, title: "Quitar", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 2, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("input", { value: p.note || "", onClick: (e) => e.stopPropagation(), onChange: (e) => setNote(p.id, e.target.value), placeholder: "Nota del punto\u2026", style: { width: "100%", marginTop: 8, padding: "7px 9px", borderRadius: 4, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 11.5, outline: "none", boxSizing: "border-box" } }));
  })), Object.keys(totals).length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, paddingTop: 12, borderTop: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 8 } }, "Totales"), Object.keys(totals).map((k) => /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", justifyContent: "space-between", padding: "4px 0", fontFamily: T.sans, fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, k), /* @__PURE__ */ React.createElement("span", { style: { color: T.text } }, Math.round(totals[k] * 100) / 100)))))));
}
function AureoTool({ T, patient, updatePatient }) {
  const saved = patient && patient.aureo || null;
  const [photo, setPhoto] = useState(() => faceGetPhoto(patient && patient.id, "aureo") || saved && saved.photo || null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [res, setRes] = useState(saved || null);
  const [trichAdj, setTrichAdj] = useState(0);
  const [canAdjust, setCanAdjust] = useState(false);
  const [warn, setWarn] = useState(null);
  const fileRef = useRef(null);
  const lmRef = useRef(null);
  function onUpload(e) {
    const f = e.target.files[0];
    if (f) fileToDataURL(f, 1100, (u) => {
      faceSetPhoto(patient && patient.id, "aureo", u);
      setPhoto(u);
      setRes(null);
      setErr("");
      setWarn(null);
      setTrichAdj(0);
      setCanAdjust(false);
      lmRef.current = null;
    });
    e.target.value = "";
  }
  async function analyze() {
    if (!photo || busy) return;
    setBusy(true);
    setErr("");
    try {
      const { lm, W, H } = await detectFaceMesh(photo);
      lmRef.current = { lm, W, H };
      const r = aureoCompute(lm, W, H);
      r.ts = Date.now();
      setTrichAdj(0);
      setCanAdjust(true);
      setRes(r);
      const q = await photoQuality(photo);
      const reasons = [];
      if (r.frontal != null && r.frontal < 0.88) reasons.push("la foto no est\xE1 totalmente de frente");
      if (q && (q.bright < 55 || q.bright > 225)) reasons.push("la iluminaci\xF3n es muy oscura o quemada");
      else if (q && q.contrast < 22) reasons.push("la luz es plana / con poco contraste");
      setWarn(reasons.length ? reasons : null);
      if (updatePatient && patient) updatePatient(patient.id, { aureo: { metrics: r.metrics, harmony: r.harmony, recs: r.recs, ts: r.ts, W: r.W, H: r.H, overlay: r.overlay } });
    } catch (e) {
      setErr(e.message || "No se pudo analizar.");
    }
    setBusy(false);
  }
  function applyTrich(adj) {
    setTrichAdj(adj);
    if (!lmRef.current) return;
    const { lm, W, H } = lmRef.current;
    const detTrichY = lm[10].y * H, mentonY = lm[152].y * H;
    const trichY = detTrichY - adj / 100 * (mentonY - detTrichY);
    const r = aureoCompute(lm, W, H, { trichY });
    r.ts = Date.now();
    setRes(r);
    if (updatePatient && patient) updatePatient(patient.id, { aureo: { metrics: r.metrics, harmony: r.harmony, recs: r.recs, ts: r.ts, W: r.W, H: r.H, overlay: r.overlay } });
  }
  useEffect(() => {
    if (photo && !res && !busy) analyze();
  }, [photo]);
  const scColor = (s) => s >= 0.8 ? "#1F8A5B" : s >= 0.55 ? T.gold || "#C9A227" : "#C0285A";
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12, lineHeight: 1.55 } }, "Sube una foto ", /* @__PURE__ */ React.createElement("b", null, "frontal"), ", clara y bien iluminada. La IA detecta 468 puntos faciales ", /* @__PURE__ */ React.createElement("b", null, "en este dispositivo"), " (sin enviar la imagen a ning\xFAn servidor), traza la ", /* @__PURE__ */ React.createElement("b", null, "l\xEDnea media de la nariz"), " y desde ese eje calcula ", /* @__PURE__ */ React.createElement("b", null, "tercios"), ", ", /* @__PURE__ */ React.createElement("b", null, "quintos"), " faciales y la proporci\xF3n \xE1urea (\u03A6 1.618)."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "minmax(220px, 330px) 1fr", gap: 18, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: onUpload, style: { display: "none" } }), res && canAdjust && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginBottom: 4 } }, "L\xEDnea del cabello \xB7 ajuste del tercio superior"), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0", max: "45", step: "1", value: trichAdj, onChange: (e) => applyTrich(+e.target.value), style: { width: "100%" } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 2, lineHeight: 1.45 } }, "La IA no detecta el nacimiento del pelo. S\xFAbelo hasta la l\xEDnea de implantaci\xF3n para medir el tercio superior con exactitud.")), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", aspectRatio: "3/4", borderRadius: 10, overflow: "hidden", border: "1px solid " + T.line, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center" } }, photo ? /* @__PURE__ */ React.createElement("img", { src: photo, alt: "Rostro", style: { width: "100%", height: "100%", objectFit: "contain" } }) : /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: T.textFaint, fontFamily: T.sans, fontSize: 12, padding: 20 } }, "Sin foto cargada"), res && photo && res.overlay && (() => {
    const o = res.overlay, gold = T.gold || "#C9A227", sw = Math.max(res.W, res.H) / 360, dash = sw * 3 + " " + sw * 2, r = Math.max(res.W, res.H) / 240;
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 " + res.W + " " + res.H, preserveAspectRatio: "xMidYMid meet", style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } }, o.thirdsY.map((y, i) => /* @__PURE__ */ React.createElement("line", { key: "t" + i, x1: o.faceLeftX, y1: y, x2: o.faceRightX, y2: y, stroke: T.accent, strokeWidth: sw, strokeDasharray: dash, opacity: ".9" })), o.fifthsX.map((x, i) => /* @__PURE__ */ React.createElement("line", { key: "f" + i, x1: x, y1: o.faceTopY, x2: x, y2: o.faceBotY, stroke: gold, strokeWidth: sw, strokeDasharray: dash, opacity: ".85" })), /* @__PURE__ */ React.createElement("line", { x1: o.midTop.x, y1: o.midTop.y, x2: o.midBot.x, y2: o.midBot.y, stroke: "#C0285A", strokeWidth: sw * 1.4, opacity: ".95" }), o.nasoSeg && (() => {
      const ns = o.nasoSeg, off = res.W / 18, tick = res.W / 55, gx = ns.x + off;
      return /* @__PURE__ */ React.createElement("g", { stroke: "#1F8A5B", strokeWidth: sw * 1.2, fill: "none", opacity: ".92" }, /* @__PURE__ */ React.createElement("line", { x1: gx, y1: ns.yTop, x2: gx, y2: ns.yBot }), [ns.yTop, ns.yMid, ns.yBot].map((y, i) => /* @__PURE__ */ React.createElement("line", { key: i, x1: gx - tick, y1: y, x2: gx + tick, y2: y })));
    })(), o.dots.map((p, i) => /* @__PURE__ */ React.createElement("circle", { key: "d" + i, cx: p.x, cy: p.y, r, fill: "#fff", stroke: T.accent, strokeWidth: sw * 0.7 })));
  })(), busy && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,11,15,.55)", fontFamily: T.sans, fontSize: 11.5, color: "#cfeee0" } }, "Analizando rostro con IA\u2026")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => fileRef.current.click(), style: ghostBtn(T) }, photo ? "Cambiar foto" : "Subir foto"), /* @__PURE__ */ React.createElement("button", { onClick: analyze, disabled: !photo || busy, style: { ...primBtn(T), opacity: !photo || busy ? 0.5 : 1, cursor: !photo || busy ? "default" : "pointer" } }, busy ? "Analizando\u2026" : res ? "Re-analizar" : "Analizar con IA")), err && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", lineHeight: 1.5 } }, err), res && res.frontal != null && res.frontal < 0.85 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontFamily: T.sans, fontSize: 11, color: T.gold || "#C9A227", lineHeight: 1.45, display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("span", null, "\u26A0"), /* @__PURE__ */ React.createElement("span", null, "La foto no parece totalmente de frente; para mayor exactitud usa una foto frontal con la mirada al frente.")), res && res.overlay && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: 9, fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 13, height: 0, borderTop: "2px dashed " + T.accent } }), "Tercios"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 13, height: 0, borderTop: "2px dashed " + (T.gold || "#C9A227") } }), "Quintos"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 13, height: 0, borderTop: "2px solid #C0285A" } }), "L\xEDnea media"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 13, height: 0, borderTop: "2px solid #1F8A5B" } }), "Nasolabial \u2192 ment\xF3n"))), /* @__PURE__ */ React.createElement("div", null, !res && !busy && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textFaint, padding: "26px 14px", textAlign: "center", border: "1px dashed " + T.line, borderRadius: 10 } }, "Sube una foto frontal: el ", /* @__PURE__ */ React.createElement("b", null, "an\xE1lisis con IA se ejecuta autom\xE1ticamente"), " y muestra la armon\xEDa facial."), busy && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, padding: "26px 14px", textAlign: "center", border: "1px dashed " + T.line, borderRadius: 10 } }, "Cargando modelo de IA y midiendo proporciones\u2026"), res && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 44, fontWeight: 300, color: T.text, lineHeight: 1 } }, res.harmony), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute } }, "/ 100 armon\xEDa facial")), warn && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "flex-start", background: "rgba(201,162,39,.12)", border: "1px solid rgba(201,162,39,.4)", borderRadius: 9, padding: "10px 12px", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, lineHeight: 1.2 } }, "\u26A0\uFE0F"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.text, lineHeight: 1.5 } }, "Calidad de foto: ", warn.join(" y "), ". El an\xE1lisis pierde precisi\xF3n \u2014 para resultados fiables usa una ", /* @__PURE__ */ React.createElement("b", null, "foto frontal, neutra y bien iluminada"), ".")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, res.metrics.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.key }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.text } }, m.label), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, m.value)), /* @__PURE__ */ React.createElement("div", { style: { height: 5, borderRadius: 3, background: T.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: Math.round(m.score * 100) + "%", height: "100%", background: scColor(m.score), borderRadius: 3 } })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 2 } }, m.note, " \xB7 ideal ", m.ideal)))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, paddingTop: 12, borderTop: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 7 } }, "Sugerencias"), res.recs.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, marginBottom: 5, display: "flex", gap: 7 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.accent } }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, r))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 8, lineHeight: 1.5 } }, "An\xE1lisis orientativo. El criterio cl\xEDnico del profesional prevalece sobre cualquier proporci\xF3n."))))));
}
const RICK_STEPS = [["nariz", "punta de la nariz"], ["lsup", "labio superior"], ["linf", "labio inferior"], ["menton", "ment\xF3n (pogonion)"]];
function RickettsTool({ T, patient, updatePatient }) {
  const saved = patient && patient.ricketts || null;
  const [photo, setPhoto] = useState(() => faceGetPhoto(patient && patient.id, "ricketts"));
  const [marks, setMarks] = useState(saved && saved.marks || {});
  const fileRef = useRef(null);
  const areaRef = useRef(null);
  const next = RICK_STEPS.find(([k]) => !marks[k]);
  function onUpload(e) {
    const f = e.target.files[0];
    if (f) fileToDataURL(f, 1100, (u) => {
      faceSetPhoto(patient && patient.id, "ricketts", u);
      setPhoto(u);
      setMarks({});
      if (updatePatient && patient) updatePatient(patient.id, { ricketts: null });
    });
    e.target.value = "";
  }
  function clickArea(e) {
    if (!photo || !next) return;
    const r = areaRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const m = { ...marks, [next[0]]: { x, y } };
    setMarks(m);
    if (updatePatient && patient) updatePatient(patient.id, { ricketts: { marks: m, ts: Date.now() } });
  }
  function reset() {
    setMarks({});
    if (updatePatient && patient) updatePatient(patient.id, { ricketts: null });
  }
  let report = null;
  if (marks.nariz && marks.menton && marks.lsup && marks.linf) {
    const a = marks.nariz, b = marks.menton;
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const side = (p) => ((p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x)) / len;
    const su = side(marks.lsup) / len * 100, sl = side(marks.linf) / len * 100;
    const interp = (v) => v > 4 ? "protruido (por delante)" : v < -4 ? "retruido (por detr\xE1s)" : "arm\xF3nico";
    report = { su, sl, iu: interp(su), il: interp(sl) };
  }
  const rickRecs = [];
  if (report) {
    const prot = report.su > 4 || report.sl > 4;
    const retr = report.su < -4 || report.sl < -4;
    if (prot) {
      rickRecs.push("Labios por delante de la l\xEDnea E: valorar proyecci\xF3n de ment\xF3n con bioestimulaci\xF3n o relleno para equilibrar el perfil.");
      rickRecs.push("La rinomodelaci\xF3n de la punta nasal puede armonizar la relaci\xF3n nariz\u2013labios\u2013ment\xF3n.");
    }
    if (retr) {
      rickRecs.push("Labios retruidos respecto a la l\xEDnea E: el relleno labial puede aportar proyecci\xF3n y mejorar el equilibrio del perfil.");
      rickRecs.push("Evaluar la proyecci\xF3n del ment\xF3n (bioestimulaci\xF3n o relleno) seg\xFAn el caso.");
    }
    if (!prot && !retr) rickRecs.push("Perfil labial dentro de rangos arm\xF3nicos seg\xFAn la l\xEDnea E. Mantenci\xF3n y prevenci\xF3n.");
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12, lineHeight: 1.55 } }, "Sube una foto de ", /* @__PURE__ */ React.createElement("b", null, "perfil"), " y marca 4 puntos: la l\xEDnea est\xE9tica E de Ricketts une la ", /* @__PURE__ */ React.createElement("b", null, "punta de la nariz"), " con el ", /* @__PURE__ */ React.createElement("b", null, "ment\xF3n"), "; se eval\xFAa cu\xE1nto sobresalen los labios respecto a esa l\xEDnea."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "minmax(220px, 330px) 1fr", gap: 18, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: onUpload, style: { display: "none" } }), /* @__PURE__ */ React.createElement("div", { ref: areaRef, onClick: clickArea, style: { position: "relative", aspectRatio: "3/4", borderRadius: 10, overflow: "hidden", border: "1px solid " + T.line, background: T.surface, cursor: photo && next ? "crosshair" : "default", display: "flex", alignItems: "center", justifyContent: "center" } }, photo ? /* @__PURE__ */ React.createElement("img", { src: photo, alt: "Perfil", style: { width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" } }) : /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: T.textFaint, fontFamily: T.sans, fontSize: 12, padding: 20 } }, "Sin foto de perfil"), photo && /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } }, marks.nariz && marks.menton && /* @__PURE__ */ React.createElement("line", { x1: marks.nariz.x * 100, y1: marks.nariz.y * 100, x2: marks.menton.x * 100, y2: marks.menton.y * 100, stroke: T.accent, strokeWidth: "1.4", strokeOpacity: "0.85", vectorEffect: "non-scaling-stroke" }), RICK_STEPS.map(([k]) => {
    const c = k === "lsup" || k === "linf" ? "#E0607A" : T.accent;
    return marks[k] && /* @__PURE__ */ React.createElement("circle", { key: k, cx: marks[k].x * 100, cy: marks[k].y * 100, r: "0.85", fill: c, fillOpacity: "0.3", stroke: c, strokeWidth: "1.4", vectorEffect: "non-scaling-stroke" });
  }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => fileRef.current.click(), style: ghostBtn(T) }, photo ? "Cambiar foto" : "Subir perfil"), photo && /* @__PURE__ */ React.createElement("button", { onClick: reset, style: ghostBtn(T) }, "Reiniciar puntos")), photo && next && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontFamily: T.sans, fontSize: 12, color: T.accent } }, "Toca: ", /* @__PURE__ */ React.createElement("b", null, next[1]))), /* @__PURE__ */ React.createElement("div", null, !report && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textFaint, padding: "26px 14px", textAlign: "center", border: "1px dashed " + T.line, borderRadius: 10 } }, "Marca los 4 puntos para trazar la l\xEDnea E y evaluar la posici\xF3n de los labios."), report && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "L\xEDnea est\xE9tica de Ricketts"), [["Labio superior", report.su, report.iu], ["Labio inferior", report.sl, report.il]].map(([lbl, v, it]) => /* @__PURE__ */ React.createElement("div", { key: lbl, style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "9px 0", borderBottom: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, lbl), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: v > 4 ? "#C0285A" : v < -4 ? T.accent : "#1F8A5B" } }, v >= 0 ? "+" : "", v.toFixed(1), " \xB7 ", it))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 12, lineHeight: 1.55 } }, "Referencia: en el adulto los labios suelen quedar ligeramente por detr\xE1s de la l\xEDnea E (labio superior \u2248 \u22124, inferior \u2248 \u22122). Valores positivos indican protrusi\xF3n labial. Medida relativa al largo de la l\xEDnea nariz\u2013ment\xF3n."), rickRecs.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 7 } }, "Sugerencias"), rickRecs.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, marginBottom: 5, paddingLeft: 12, position: "relative" } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 0, color: T.accent } }, "\xB7"), r))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 10, lineHeight: 1.5 } }, "An\xE1lisis orientativo, no sustituye un cefalograma. El criterio cl\xEDnico prevalece.")))));
}
function MarquardtTool({ T, patient, updatePatient }) {
  const [photo, setPhoto] = useState(() => faceGetPhoto(patient && patient.id, "marquardt"));
  const [scale, setScale] = useState(1);
  const [dy, setDy] = useState(0);
  const [op, setOp] = useState(0.5);
  const [fit, setFit] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [comment, setComment] = useState(null);
  const fileRef = useRef(null);
  const boxRef = useRef(null);
  async function autoFit() {
    if (!photo || !boxRef.current) return;
    setBusy(true);
    setErr("");
    try {
      const { lm, W, H } = await detectFaceMesh(photo);
      const xs = lm.map((p) => p.x);
      const topN = lm[10].y, botN = lm[152].y;
      const cxN = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2;
      const rect = boxRef.current.getBoundingClientRect();
      const Cw = rect.width, Ch = rect.height, Ir = W / H, Cr = Cw / Ch;
      let dW, dH, oX, oY;
      if (Ir > Cr) {
        dW = Cw;
        dH = Cw / Ir;
        oX = 0;
        oY = (Ch - dH) / 2;
      } else {
        dH = Ch;
        dW = Ch * Ir;
        oY = 0;
        oX = (Cw - dW) / 2;
      }
      const faceTopPx = oY + topN * dH, faceBotPx = oY + botN * dH, faceH = faceBotPx - faceTopPx;
      const cxPx = oX + cxN * dW;
      const extTop = faceH * 0.16, extBot = faceH * 0.06;
      const maskH = faceH + extTop + extBot;
      const maskW = maskH * MARQ_RATIO;
      const maskTop = faceTopPx - extTop, maskLeft = cxPx - maskW / 2;
      setScale(1);
      setDy(0);
      setFit({ left: maskLeft / Cw * 100, top: maskTop / Ch * 100, w: maskW / Cw * 100, h: maskH / Ch * 100 });
      try {
        const a = aureoCompute(lm, W, H);
        const low = a.metrics.slice().sort((x, y) => x.score - y.score).slice(0, 2).map((m) => m.label.split(" \xB7 ")[0].split(" (")[0].trim());
        setComment({ harmony: a.harmony, low });
      } catch (e2) {
        setComment(null);
      }
    } catch (e) {
      setErr(e.message || "No se pudo detectar el rostro.");
    }
    setBusy(false);
  }
  useEffect(() => {
    if (photo) {
      const t = setTimeout(autoFit, 60);
      return () => clearTimeout(t);
    } else {
      setFit(null);
      setErr("");
    }
  }, [photo]);
  function onUpload(e) {
    const f = e.target.files[0];
    if (f) fileToDataURL(f, 1100, (u) => {
      faceSetPhoto(patient && patient.id, "marquardt", u);
      setPhoto(u);
    });
    e.target.value = "";
  }
  function clearPhoto() {
    faceSetPhoto(patient && patient.id, "marquardt", null);
    setPhoto(null);
    setFit(null);
    setComment(null);
  }
  async function reanalyze() {
    if (!photo) return;
    setBusy(true);
    setErr("");
    try {
      const { lm, W, H } = await detectFaceMesh(photo);
      const a = aureoCompute(lm, W, H);
      const low = a.metrics.slice().sort((x, y) => x.score - y.score).slice(0, 2).map((m) => m.label.split(" \xB7 ")[0].split(" (")[0].trim());
      setComment({ harmony: a.harmony, low });
    } catch (e) {
      setErr(e.message || "No se pudo analizar.");
    }
    setBusy(false);
  }
  const rng = { width: "100%" };
  const rlbl = { display: "block", fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginBottom: 4 };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12, lineHeight: 1.55 } }, "Sube una foto ", /* @__PURE__ */ React.createElement("b", null, "frontal"), " en reposo: la ", /* @__PURE__ */ React.createElement("b", null, "m\xE1scara de Marquardt"), " (rejilla \xE1urea \u03A6 1.618) se ", /* @__PURE__ */ React.createElement("b", null, "calza sola"), " sobre el rostro con IA. Afina con los controles si lo necesitas."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "minmax(220px, 330px) 1fr", gap: 18, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: onUpload, style: { display: "none" } }), /* @__PURE__ */ React.createElement("div", { ref: boxRef, style: { position: "relative", aspectRatio: "200/260", borderRadius: 10, overflow: "hidden", border: "1px solid " + T.line, background: photo ? "#0c0f13" : T.surface, display: "flex", alignItems: "center", justifyContent: "center" } }, photo ? /* @__PURE__ */ React.createElement("img", { src: photo, alt: "Rostro frontal", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" } }) : /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: T.textFaint, fontFamily: T.sans, fontSize: 12, padding: 20 } }, "Sin foto frontal"), /* @__PURE__ */ React.createElement(MarquardtMask, { color: photo ? "#7FE3C2" : T.accent, scale, dy, opacity: op, fit: photo ? fit : null }), busy && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,11,15,.55)", fontFamily: T.sans, fontSize: 11.5, color: "#cfeee0" } }, "Detectando rostro con IA\u2026")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => fileRef.current.click(), style: ghostBtn(T) }, photo ? "Cambiar foto" : "Subir frontal"), photo && /* @__PURE__ */ React.createElement("button", { onClick: autoFit, disabled: busy, style: { ...ghostBtn(T), opacity: busy ? 0.5 : 1 } }, busy ? "Ajustando\u2026" : "Ajustar autom\xE1ticamente"), photo && /* @__PURE__ */ React.createElement("button", { onClick: reanalyze, disabled: busy, style: { ...ghostBtn(T), opacity: busy ? 0.5 : 1 } }, busy ? "Analizando\u2026" : "Repetir an\xE1lisis"), photo && /* @__PURE__ */ React.createElement("button", { onClick: clearPhoto, style: ghostBtn(T) }, "Quitar foto")), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#C0285A", marginTop: 8 } }, err, " Ajusta manualmente con los controles.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 } }, "Ajuste fino de la m\xE1scara"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: rlbl }, "Escala"), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0.7", max: "1.5", step: "0.02", value: scale, onChange: (e) => setScale(+e.target.value), style: rng })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: rlbl }, "Alto (vertical)"), /* @__PURE__ */ React.createElement("input", { type: "range", min: "-20", max: "20", step: "1", value: dy, onChange: (e) => setDy(+e.target.value), style: rng })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: rlbl }, "Opacidad"), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0.2", max: "1", step: "0.05", value: op, onChange: (e) => setOp(+e.target.value), style: rng })), photo && comment && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 7 } }, "Rostro vs m\xE1scara"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.text, lineHeight: 1.55 } }, "El rostro sigue las proporciones de la m\xE1scara de Marquardt en un ", /* @__PURE__ */ React.createElement("b", null, comment.harmony, "%"), ".", " ", comment.harmony >= 85 ? "Buen ajuste al trazado \xE1ureo." : comment.harmony >= 70 ? "Ajuste parcial: sigue el trazado en lo general, con desviaciones marcadas en algunas zonas." : comment.harmony >= 55 ? "Ajuste moderado: varias zonas se apartan del trazado." : "Ajuste bajo: el rostro se aparta del trazado en la mayor\xEDa de las zonas."), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 6, lineHeight: 1.5 } }, "Zonas que m\xE1s se alejan de la m\xE1scara: ", /* @__PURE__ */ React.createElement("b", null, (comment.low || []).join(" y ")), ".")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 6, lineHeight: 1.55 } }, "La m\xE1scara se posiciona autom\xE1ticamente con detecci\xF3n facial (MediaPipe, 468 puntos). Deriva del n\xFAmero \xE1ureo (\u03A6) y es una ", /* @__PURE__ */ React.createElement("b", null, "referencia est\xE9tica orientativa"), ": la belleza real es diversa y el criterio cl\xEDnico siempre prevalece."))));
}
function FaceMap({ T, value, onChange, patient, updatePatient, readOnly }) {
  const [tool, setTool] = useState("punzar");
  const TOOLS = [["punzar", "Punci\xF3n"], ["aureo", "Proporci\xF3n \xE1urea \xB7 IA"], ["ricketts", "Plano de Ricketts"], ["marquardt", "M\xE1scara de Marquardt"]];
  return /* @__PURE__ */ React.createElement("div", null, readOnly && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, color: T.textFaint, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })), "Solo visualizaci\xF3n \xB7 edita en cada sesi\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" } }, TOOLS.map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTool(k), style: {
    fontFamily: T.sans,
    fontSize: 11.5,
    letterSpacing: ".02em",
    padding: "9px 15px",
    borderRadius: 999,
    cursor: "pointer",
    background: tool === k ? T.text : T.surface,
    color: tool === k ? T.bg : T.textMute,
    border: "1px solid " + (tool === k ? T.text : T.line)
  } }, l))), tool === "punzar" && /* @__PURE__ */ React.createElement(PuncionTool, { T, value, onChange, patient, updatePatient, readOnly }), tool === "aureo" && /* @__PURE__ */ React.createElement(AureoTool, { T, patient, updatePatient }), tool === "ricketts" && /* @__PURE__ */ React.createElement(RickettsTool, { T, patient, updatePatient }), tool === "marquardt" && /* @__PURE__ */ React.createElement(MarquardtTool, { T, patient, updatePatient }));
}
function ViewTab({ T, active, children, onClick }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, style: { flex: 1, fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", padding: "10px", borderRadius: 6, cursor: "pointer", background: active ? T.surface2 : T.surface, color: active ? T.text : T.textMute, border: "1px solid " + (active ? T.accent : T.line) } }, children);
}
function ghostBtn(T) {
  return { fontFamily: T.sans, fontSize: 11, letterSpacing: ".04em", padding: "8px 13px", borderRadius: 7, cursor: "pointer", background: T.surface, color: T.textMute, border: "1px solid " + T.line };
}
function primBtn(T) {
  return { fontFamily: T.sans, fontSize: 11, letterSpacing: ".04em", padding: "8px 15px", borderRadius: 7, background: T.text, color: T.bg, border: "1px solid " + T.text };
}
Object.assign(window, { FaceMap, FaceSVG, ViewTab, PuncionTool, AureoTool, RickettsTool, MarquardtTool, MarquardtMask, aureoCompute, detectFaceMesh });
