/* ============================================================================
 * Glow 2048 — fusiona tratamientos (Glow Clinic · JC Medical)
 * Une dos tiles iguales para subir de tier: Limpieza → … → Exosomas.
 * Lógica 2048 clásica en grilla 4×4 con teclado y swipe.
 * ==========================================================================*/
(() => {
  'use strict';

  const N = 4;
  const BEST_KEY = 'glow2048_best';
  // Tiers: índice = valor lógico. icon + nombre + color.
  const TIERS = [
    null,
    { ic:'✦', nm:'Limpieza',  c:'#7FA8C9' },
    { ic:'✺', nm:'Hidrafacial',c:'#6FB3B8' },
    { ic:'◈', nm:'Peeling',   c:'#9C8AB5' },
    { ic:'⊹', nm:'Botox',     c:'#5E7A99' },
    { ic:'✸', nm:'Láser',     c:'#C98A8A' },
    { ic:'💋', nm:'Labios',    c:'#C77F9E' },
    { ic:'◆', nm:'Rino',      c:'#4A6272' },
    { ic:'☰', nm:'Hilos',     c:'#B5936A' },
    { ic:'✷', nm:'Sculptra',  c:'#B9C2CB' },
    { ic:'◊', nm:'ADN salmón',c:'#E0837A' },
    { ic:'❖', nm:'Exosomas',  c:'#3C5174' },
  ];
  const WIN_TIER = 11;

  const board = document.getElementById('board');
  const el = {
    score: document.getElementById('score'),
    best: document.getElementById('best'),
    topTier: document.getElementById('topTier'),
    newBtn: document.getElementById('newBtn'),
    muteBtn: document.getElementById('muteBtn'),
    overlay: document.getElementById('overlay'),
    ovTitle: document.getElementById('ovTitle'),
    ovText: document.getElementById('ovText'),
    ovBtn: document.getElementById('ovBtn'),
    toast: document.getElementById('toast'),
  };

  let grid, score, tiles, idSeq, won, dead, running;

  // Construye las celdas de fondo una vez.
  const cells = [];
  for (let i = 0; i < N * N; i++) { const d = document.createElement('div'); d.className = 'cell'; board.appendChild(d); cells.push(d); }

  function getBest(){ return parseInt(localStorage.getItem(BEST_KEY) || '0', 10) || 0; }
  function setBest(v){ if (v > getBest()) localStorage.setItem(BEST_KEY, String(v)); }

  let toastTimer;
  function toast(m){ el.toast.textContent = m; el.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.toast.classList.remove('show'),1500); }

  function reset(){
    grid = Array.from({length:N}, ()=>Array(N).fill(0));
    score = 0; idSeq = 1; won = false; dead = false; running = true;
    tiles = {}; board.querySelectorAll('.tile').forEach(t=>t.remove());
    addRandom(); addRandom();
    syncTiles(); refreshHUD();
  }

  function addRandom(){
    const free = [];
    for (let r=0;r<N;r++) for (let c=0;c<N;c++) if (grid[r][c]===0) free.push([r,c]);
    if (!free.length) return false;
    const [r,c] = free[Math.floor(Math.random()*free.length)];
    grid[r][c] = Math.random() < 0.9 ? 1 : 2;
    grid[r][c] = { v: grid[r][c], id: idSeq++, fresh: true };
    return true;
  }

  // El grid guarda objetos {v,id}. Normalizamos accesos.
  function val(cell){ return cell ? cell.v : 0; }

  function cellGeom(){
    const pad = 10, gap = 10;
    const inner = board.clientWidth - pad*2;
    const size = (inner - gap*(N-1)) / N;
    return { pad, gap, size };
  }

  function syncTiles(){
    const { pad, gap, size } = cellGeom();
    const seen = {};
    for (let r=0;r<N;r++) for (let c=0;c<N;c++){
      const cell = grid[r][c];
      if (!cell) continue;
      seen[cell.id] = true;
      let t = tiles[cell.id];
      if (!t){
        t = document.createElement('div');
        t.className = 'tile pop';
        board.appendChild(t);
        tiles[cell.id] = t;
        setTimeout(()=>t.classList.remove('pop'), 160);
      }
      const tier = TIERS[Math.min(cell.v, TIERS.length-1)];
      t.style.width = t.style.height = size + 'px';
      t.style.left = (pad + c*(size+gap)) + 'px';
      t.style.top = (pad + r*(size+gap)) + 'px';
      t.style.background = tier.c;
      t.innerHTML = `<span class="ic">${tier.ic}</span><span class="nm">${tier.nm}</span>`;
    }
    // elimina tiles que ya no existen
    for (const id in tiles){ if (!seen[id]){ tiles[id].remove(); delete tiles[id]; } }
  }

  // --- Movimiento ----------------------------------------------------------
  // Compacta y fusiona una fila (array de celdas) hacia el inicio. Devuelve {row, moved, gained}.
  function slide(line){
    const items = line.filter(x=>x); // celdas no vacías
    const out = [];
    let gained = 0;
    for (let i=0;i<items.length;i++){
      if (i+1<items.length && items[i].v === items[i+1].v){
        const nv = items[i].v + 1;
        out.push({ v: nv, id: items[i].id }); // conserva un id para animar
        gained += valuePoints(nv);
        i++; // saltar el fusionado
      } else {
        out.push(items[i]);
      }
    }
    while (out.length < N) out.push(0);
    let moved = false;
    for (let i=0;i<N;i++){ if (val(line[i]) !== val(out[i]) || (line[i]&&out[i]&&line[i].id!==out[i].id)) moved = true; }
    return { row: out, moved, gained };
  }
  function valuePoints(v){ return v*v*4; }

  function move(dir){ // 0=izq,1=der,2=arriba,3=abajo
    if (!running) return;
    let moved = false, gained = 0;
    const lines = [];
    for (let i=0;i<N;i++){
      let line = [];
      for (let j=0;j<N;j++){
        if (dir===0) line.push(grid[i][j]);
        else if (dir===1) line.push(grid[i][N-1-j]);
        else if (dir===2) line.push(grid[j][i]);
        else line.push(grid[N-1-j][i]);
      }
      const res = slide(line);
      if (res.moved) moved = true;
      gained += res.gained;
      lines.push(res.row);
    }
    if (!moved) return;
    for (let i=0;i<N;i++) for (let j=0;j<N;j++){
      const cell = lines[i][j] === 0 ? 0 : { v: lines[i][j].v, id: lines[i][j].id };
      if (dir===0) grid[i][j] = cell;
      else if (dir===1) grid[i][N-1-j] = cell;
      else if (dir===2) grid[j][i] = cell;
      else grid[N-1-j][i] = cell;
    }
    score += gained;
    if (gained>0) Sound.good(); else Sound.click();
    addRandom();
    // Más desafío: cuando el tablero se llena, entran 2 fichas por jugada.
    let free = 0; for (let r=0;r<N;r++) for (let c=0;c<N;c++) if (grid[r][c]===0) free++;
    if (free <= 6) addRandom();
    syncTiles(); refreshHUD();
    checkWinLose();
  }

  function maxTier(){ let m=1; for (let r=0;r<N;r++) for (let c=0;c<N;c++) if (val(grid[r][c])>m) m=val(grid[r][c]); return m; }

  function checkWinLose(){
    const mt = maxTier();
    if (!won && mt >= WIN_TIER){ won = true; Sound.win(); show('¡Exosomas! 🏆', `Llegaste al tratamiento premium con <b>${score}</b> puntos. Puedes seguir sumando.`, 'Seguir jugando'); return; }
    // ¿hay movimientos posibles?
    for (let r=0;r<N;r++) for (let c=0;c<N;c++){
      if (grid[r][c]===0) return;
      const v = val(grid[r][c]);
      if (c+1<N && val(grid[r][c+1])===v) return;
      if (r+1<N && val(grid[r+1][c])===v) return;
    }
    dead = true; running = false; Sound.bad(); setBest(score);
    show('Sin movimientos', `Tu clínica llegó hasta <b>${TIERS[mt].nm}</b> con <b>${score}</b> puntos.<br>Récord: <b>${getBest()}</b>`, 'Jugar de nuevo');
  }

  function refreshHUD(){
    el.score.textContent = score;
    setBest(score);
    el.best.textContent = getBest();
    el.topTier.textContent = TIERS[maxTier()].nm;
  }

  function show(title, text, btn){
    el.ovTitle.innerHTML = title; el.ovText.innerHTML = text; el.ovBtn.textContent = btn;
    el.overlay.classList.add('show');
  }

  // --- Entrada -------------------------------------------------------------
  window.addEventListener('keydown', (e)=>{
    const k = e.key;
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(k)){
      e.preventDefault(); Sound.unlock();
      move(k==='ArrowLeft'?0:k==='ArrowRight'?1:k==='ArrowUp'?2:3);
    }
  });
  let sx=0, sy=0, swiping=false;
  board.addEventListener('touchstart',(e)=>{ const t=e.touches[0]; sx=t.clientX; sy=t.clientY; swiping=true; }, {passive:true});
  board.addEventListener('touchend',(e)=>{
    if (!swiping) return; swiping=false; Sound.unlock();
    const t=e.changedTouches[0], dx=t.clientX-sx, dy=t.clientY-sy;
    if (Math.max(Math.abs(dx),Math.abs(dy))<24) return;
    if (Math.abs(dx)>Math.abs(dy)) move(dx<0?0:1); else move(dy<0?2:3);
  }, {passive:true});
  // mouse drag (desktop)
  let md=false;
  board.addEventListener('mousedown',(e)=>{ md=true; sx=e.clientX; sy=e.clientY; });
  window.addEventListener('mouseup',(e)=>{ if(!md)return; md=false; Sound.unlock(); const dx=e.clientX-sx, dy=e.clientY-sy; if (Math.max(Math.abs(dx),Math.abs(dy))<24) return; if (Math.abs(dx)>Math.abs(dy)) move(dx<0?0:1); else move(dy<0?2:3); });

  el.newBtn.addEventListener('click', ()=>{ Sound.unlock(); Sound.click(); reset(); });
  el.ovBtn.addEventListener('click', ()=>{ Sound.unlock(); el.overlay.classList.remove('show'); if (dead || !running) reset(); });
  el.muteBtn.addEventListener('click', ()=>{ Sound.unlock(); const m=!Sound.isMuted(); Sound.setMuted(m); el.muteBtn.textContent=m?'🔇':'🔊'; });

  window.addEventListener('resize', ()=>{ if (running||tiles) syncTiles(); });

  // --- Arranque ------------------------------------------------------------
  el.best.textContent = getBest();
  show('Glow 2048', '<b>Cómo jugar:</b><br>1 · Desliza (o usa las flechas) y todas las fichas se mueven en esa dirección.<br>2 · Dos fichas <b>iguales</b> que chocan se <b>fusionan</b> y suben de categoría: Limpieza → Hidrafacial → … → <b>Exosomas</b>.<br>3 · Cada jugada aparece una ficha nueva; si el tablero se llena entran dos. Si no quedan movimientos, pierdes.<br><br>¡Llega hasta los Exosomas!', 'Jugar');
  reset();
  el.overlay.classList.add('show'); // mostrar intro encima del tablero ya listo
})();
