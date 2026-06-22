/* ============================================================================
 * Vial Sort — ordena el sérum por color (Glow Clinic · JC Medical)
 * Vierte el segmento superior de un vial a otro (mismo color o vacío) hasta
 * dejar cada vial de un solo color. Niveles incrementales, deshacer y reinicio.
 * ==========================================================================*/
(() => {
  'use strict';

  const CAP = 4; // segmentos por vial
  const BEST_KEY = 'vialsort_best';
  const COLORS = ['#B9C2CB','#5E7A99','#6FB3B8','#9C8AB5','#C77F9E','#E0837A','#5BBF8A','#8B9EB0'];

  const rack = document.getElementById('rack');
  const el = {
    level: document.getElementById('level'),
    moves: document.getElementById('moves'),
    best: document.getElementById('best'),
    undoBtn: document.getElementById('undoBtn'),
    restartBtn: document.getElementById('restartBtn'),
    muteBtn: document.getElementById('muteBtn'),
    overlay: document.getElementById('overlay'),
    ovTitle: document.getElementById('ovTitle'),
    ovText: document.getElementById('ovText'),
    ovBtn: document.getElementById('ovBtn'),
    toast: document.getElementById('toast'),
  };

  let level, tubes, sel, moves, history, won;

  function getBest(){ return parseInt(localStorage.getItem(BEST_KEY) || '1', 10) || 1; }
  function setBest(v){ if (v > getBest()) localStorage.setItem(BEST_KEY, String(v)); }
  let toastTimer;
  function toast(m){ el.toast.textContent = m; el.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.toast.classList.remove('show'),1400); }

  function numColors(n){ return Math.min(3 + (n-1), COLORS.length); }
  function numEmpty(n){ return n >= 4 ? 2 : 2; }

  function buildLevel(n){
    const cN = numColors(n);
    // pool: CAP de cada color
    let pool = [];
    for (let i=0;i<cN;i++) for (let k=0;k<CAP;k++) pool.push(i);
    // shuffle
    for (let i=pool.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
    tubes = [];
    for (let i=0;i<cN;i++) tubes.push(pool.slice(i*CAP,(i+1)*CAP));
    for (let e=0;e<numEmpty(n);e++) tubes.push([]);
    // evita empezar ya resuelto (raro): si lo está, rebaraja
    if (isWin()) return buildLevel(n);
    sel = -1; moves = 0; history = []; won = false;
  }

  function topRun(tube){ // cantidad de segmentos iguales arriba
    if (!tube.length) return 0;
    const top = tube[tube.length-1]; let k=0;
    for (let i=tube.length-1;i>=0 && tube[i]===top;i--) k++;
    return k;
  }
  function isComplete(tube){ return tube.length===CAP && topRun(tube)===CAP; }
  function isWin(){ return tubes.every(t => t.length===0 || isComplete(t)); }

  function canPour(from, to){
    if (from===to) return false;
    const a = tubes[from], b = tubes[to];
    if (!a.length) return false;
    if (b.length>=CAP) return false;
    if (!b.length) return true;
    return a[a.length-1] === b[b.length-1];
  }

  function pour(from, to){
    const a = tubes[from], b = tubes[to];
    const color = a[a.length-1];
    let n = 0;
    while (a.length && a[a.length-1]===color && b.length<CAP){ b.push(a.pop()); n++; }
    return n;
  }

  function snapshot(){ return JSON.stringify(tubes); }
  function pushHistory(){ history.push(snapshot()); if (history.length>60) history.shift(); }

  // --- Render --------------------------------------------------------------
  function render(){
    rack.innerHTML = '';
    tubes.forEach((tube, i) => {
      const d = document.createElement('div');
      d.className = 'tube' + (i===sel?' sel':'') + (isComplete(tube)?' done':'');
      tube.forEach(ci => {
        const s = document.createElement('div');
        s.className = 'seg'; s.style.background = COLORS[ci];
        d.appendChild(s);
      });
      d.addEventListener('click', ()=>onTube(i));
      rack.appendChild(d);
    });
    el.level.textContent = level;
    el.moves.textContent = moves;
    el.best.textContent = getBest();
  }

  function onTube(i){
    Sound.unlock();
    if (won) return;
    if (sel === -1){
      if (!tubes[i].length){ return; }
      sel = i; Sound.select ? Sound.select() : Sound.click(); render(); return;
    }
    if (sel === i){ sel = -1; render(); return; }
    if (canPour(sel, i)){
      pushHistory();
      const n = pour(sel, i);
      moves++;
      sel = -1;
      Sound.good();
      render();
      if (isWin()){ winLevel(); }
    } else {
      Sound.error();
      // re-selecciona el nuevo vial si tiene contenido
      sel = tubes[i].length ? i : -1;
      render();
    }
  }

  function winLevel(){
    won = true; Sound.win(); setBest(level+1);
    show('¡Nivel ' + level + ' resuelto! 🧪', `Lo ordenaste en <b>${moves}</b> movimientos.<br>Siguiente: <b>${numColors(level+1)} colores</b>.`, 'Siguiente nivel →');
  }

  function show(title, text, btn){ el.ovTitle.innerHTML=title; el.ovText.innerHTML=text; el.ovBtn.textContent=btn; el.overlay.classList.add('show'); }

  el.undoBtn.addEventListener('click', ()=>{
    Sound.unlock();
    if (!history.length){ toast('Nada que deshacer'); return; }
    tubes = JSON.parse(history.pop()); sel=-1; moves=Math.max(0,moves-1); Sound.click(); render();
  });
  el.restartBtn.addEventListener('click', ()=>{ Sound.unlock(); Sound.click(); buildLevel(level); render(); });
  el.muteBtn.addEventListener('click', ()=>{ Sound.unlock(); const m=!Sound.isMuted(); Sound.setMuted(m); el.muteBtn.textContent=m?'🔇':'🔊'; });
  el.ovBtn.addEventListener('click', ()=>{
    Sound.unlock(); el.overlay.classList.remove('show');
    if (won){ level++; buildLevel(level); render(); }
  });

  // --- Arranque ------------------------------------------------------------
  level = 1; el.best.textContent = getBest();
  buildLevel(level); render();
  show('Vial Sort', 'Vierte el sérum de un vial a otro hasta dejar <b>cada vial de un solo color</b>. Solo cae sobre el mismo color o un vial vacío.<br><br>Usa <b>Deshacer</b> si te trabas.', 'Jugar');
})();
