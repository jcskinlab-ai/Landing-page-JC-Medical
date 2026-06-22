/* ============================================================================
 * Glow Lab — match-3 de insumos con niveles (Glow Clinic · JC Medical)
 * Intercambia insumos vecinos para alinear 3+. Meta de puntaje por nivel,
 * movimientos limitados y combos en cascada. Sin imágenes (canvas).
 * ==========================================================================*/
(() => {
  'use strict';
  const COLS = 7, ROWS = 8, CELL = 52;
  const BEST_KEY = 'glowlab_best';
  const TYPES = [
    { g:'💉', c:'#1E3A50' },
    { g:'💧', c:'#1C3D2C' },
    { g:'🧪', c:'#3A2A52' },
    { g:'✨', c:'#4A2E12' },
    { g:'🧴', c:'#3D1530' },
  ];

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const el = {
    level: document.getElementById('level'),
    moves: document.getElementById('moves'),
    score: document.getElementById('score'),
    target: document.getElementById('target'),
    goalFill: document.getElementById('goalFill'),
    muteBtn: document.getElementById('muteBtn'),
    overlay: document.getElementById('overlay'),
    ovTitle: document.getElementById('ovTitle'),
    ovText: document.getElementById('ovText'),
    ovBtn: document.getElementById('ovBtn'),
    toast: document.getElementById('toast'),
  };

  let grid, level, moves, score, target, sel, busy, running, particles, ended;

  let toastTimer; function toast(m){ el.toast.textContent=m; el.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.toast.classList.remove('show'),1300); }
  function getBest(){ return parseInt(localStorage.getItem(BEST_KEY)||'0',10)||0; }
  function setBest(v){ if (v>getBest()) localStorage.setItem(BEST_KEY,String(v)); }

  function rnd(){ return Math.floor(Math.random()*TYPES.length); }
  function build(){
    grid=[];
    for (let r=0;r<ROWS;r++){ grid[r]=[]; for (let c=0;c<COLS;c++){
      let t; do { t=rnd(); } while ((c>=2&&grid[r][c-1]===t&&grid[r][c-2]===t)||(r>=2&&grid[r-1][c]===t&&grid[r-2][c]===t));
      grid[r][c]=t;
    }}
  }

  function startLevel(n){
    level=n; moves=20; score=0; target=1000+(n-1)*750; sel=null; busy=false; running=true; ended=false; particles=[];
    build(); refreshHUD();
  }
  function refreshHUD(){
    el.level.textContent=level; el.moves.textContent=moves; el.score.textContent=score; el.target.textContent=target;
    el.goalFill.style.width=Math.min(100,score/target*100)+'%';
  }

  function findMatches(){
    const m={};
    for (let r=0;r<ROWS;r++){ let run=1; for (let c=1;c<=COLS;c++){ if (c<COLS&&grid[r][c]===grid[r][c-1]) run++; else { if (run>=3) for (let k=1;k<=run;k++) m[r+','+(c-k)]=1; run=1; } } }
    for (let c=0;c<COLS;c++){ let run=1; for (let r=1;r<=ROWS;r++){ if (r<ROWS&&grid[r][c]===grid[r-1][c]) run++; else { if (run>=3) for (let k=1;k<=run;k++) m[(r-k)+','+c]=1; run=1; } } }
    return Object.keys(m);
  }

  function resolveCascades(cascade){
    const m=findMatches();
    if (!m.length){ busy=false; checkEnd(); return; }
    cascade=cascade||1;
    m.forEach(k=>{ const [r,c]=k.split(',').map(Number); burst(c,r,TYPES[grid[r][c]].c); grid[r][c]=null; });
    score += m.length*20*cascade;
    refreshHUD();
    Sound.good();
    // gravedad + relleno
    for (let c=0;c<COLS;c++){
      const col=[]; for (let r=ROWS-1;r>=0;r--) if (grid[r][c]!==null) col.push(grid[r][c]);
      while (col.length<ROWS) col.push(rnd());
      for (let r=ROWS-1,i=0;r>=0;r--,i++) grid[r][c]=col[i];
    }
    setTimeout(()=>resolveCascades(cascade+1), 150);
  }

  function trySwap(a,b){
    if (busy) return;
    [grid[a.r][a.c],grid[b.r][b.c]]=[grid[b.r][b.c],grid[a.r][a.c]];
    if (findMatches().length){
      busy=true; moves--; refreshHUD(); Sound.click();
      setTimeout(()=>resolveCascades(1),120);
    } else {
      [grid[a.r][a.c],grid[b.r][b.c]]=[grid[b.r][b.c],grid[a.r][a.c]];
      Sound.error(); toast('Sin combinación');
    }
  }

  function checkEnd(){
    if (ended) return;
    if (score>=target){ ended=true; running=false; Sound.win(); setBest(level); show('¡Nivel '+level+' superado! 🧪', `Alcanzaste <b>${score}</b> / ${target}.<br>Siguiente meta: <b>${1000+level*750}</b>`, 'Siguiente nivel →'); return; }
    if (moves<=0){ ended=true; running=false; Sound.bad(); setBest(level-1); show('Sin movimientos', `Llegaste a <b>${score}</b> de ${target} en el nivel ${level}.<br>Mejor nivel: <b>${getBest()}</b>`, 'Reintentar'); }
  }

  function burst(c,r,color){
    const x=c*CELL+CELL/2, y=r*CELL+CELL/2;
    for (let i=0;i<8;i++){ const a=Math.random()*Math.PI*2, sp=40+Math.random()*80; particles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:.4,max:.4,color,r:2+Math.random()*2}); }
  }

  function show(t,x,b){ el.ovTitle.innerHTML=t; el.ovText.innerHTML=x; el.ovBtn.textContent=b; el.overlay.classList.add('show'); }

  // --- Render --------------------------------------------------------------
  let last=0;
  function draw(ts){
    const dt=Math.min(0.05,(ts-last)/1000)||0; last=ts;
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#0D0D0D'; ctx.fillRect(0,0,W,H);
    for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++){
      const t=grid[r][c]; if (t===null) continue;
      const x=c*CELL, y=r*CELL;
      const isSel=sel&&sel.r===r&&sel.c===c;
      ctx.fillStyle=TYPES[t].c;
      rr(x+3,y+3,CELL-6,CELL-6,9); ctx.fill();
      if (isSel){ ctx.strokeStyle='#C2CAD2'; ctx.lineWidth=3; rr(x+3,y+3,CELL-6,CELL-6,9); ctx.stroke(); }
      ctx.font='22px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(TYPES[t].g, x+CELL/2, y+CELL/2+1);
    }
    for (let i=particles.length-1;i>=0;i--){ const p=particles[i]; p.x+=p.vx*dt; p.y+=p.vy*dt; p.life-=dt; if(p.life<=0){particles.splice(i,1);continue;} ctx.globalAlpha=Math.max(0,p.life/p.max); ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fill(); ctx.globalAlpha=1; }
    requestAnimationFrame(draw);
  }
  function rr(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }

  // --- Entrada -------------------------------------------------------------
  function cellAt(e){
    const rect=canvas.getBoundingClientRect();
    const t=e.touches?e.touches[0]:e;
    const x=(t.clientX-rect.left)*(W/rect.width), y=(t.clientY-rect.top)*(H/rect.height);
    const c=Math.floor(x/CELL), r=Math.floor(y/CELL);
    if (r<0||r>=ROWS||c<0||c>=COLS) return null;
    return {r,c};
  }
  function onTap(e){
    e.preventDefault(); Sound.unlock();
    if (!running||busy) return;
    const cell=cellAt(e); if (!cell) return;
    if (!sel){ sel=cell; return; }
    if (sel.r===cell.r&&sel.c===cell.c){ sel=null; return; }
    const adj=Math.abs(sel.r-cell.r)+Math.abs(sel.c-cell.c)===1;
    if (adj){ const a=sel; sel=null; trySwap(a,cell); }
    else { sel=cell; }
  }
  canvas.addEventListener('mousedown',onTap);
  canvas.addEventListener('touchstart',onTap,{passive:false});

  el.muteBtn.addEventListener('click', ()=>{ Sound.unlock(); const m=!Sound.isMuted(); Sound.setMuted(m); el.muteBtn.textContent=m?'🔇':'🔊'; });
  el.ovBtn.addEventListener('click', ()=>{
    Sound.unlock(); el.overlay.classList.remove('show');
    if (score>=target) startLevel(level+1); else startLevel(Math.max(1,level));
  });

  // Arranque
  el.target.textContent='1000';
  startLevel(1);
  requestAnimationFrame(draw);
  show('Glow Lab', 'Mezcla el laboratorio: intercambia insumos vecinos (💉 💧 🧪 ✨ 🧴) para alinear <b>3 o más</b> y sumar puntos. Llega a la <b>meta</b> antes de quedarte sin movimientos.', 'Jugar');
})();
