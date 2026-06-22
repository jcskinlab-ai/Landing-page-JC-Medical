/* ============================================================================
 * Glow Snake — la cánula que recoge glow (Glow Clinic · JC Medical)
 * Snake clásico: crece al recoger ✦, acelera con el tiempo, choque = fin.
 * Teclado, swipe y pad en pantalla. Récord guardado.
 * ==========================================================================*/
(() => {
  'use strict';
  const GRID = 18, CELL = 20;        // 18*20 = 360
  const BEST_KEY = 'glowsnake_best';

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const el = {
    score: document.getElementById('score'),
    len: document.getElementById('len'),
    best: document.getElementById('best'),
    muteBtn: document.getElementById('muteBtn'),
    overlay: document.getElementById('overlay'),
    ovTitle: document.getElementById('ovTitle'),
    ovText: document.getElementById('ovText'),
    ovBtn: document.getElementById('ovBtn'),
    toast: document.getElementById('toast'),
  };

  let snake, dir, nextDir, food, score, step, acc, running, dead, last, collected;
  // Insumos que recolecta la cánula (en vez de puntos abstractos)
  const ITEMS = [
    { e: "💉", nm: "Jeringa de ácido", pts: 15, c: "#6FB3B8" },
    { e: "🧪", nm: "Vial de Botox", pts: 12, c: "#9C8AB5" },
    { e: "✨", nm: "Sculptra", pts: 18, c: "#B9C2CB" }
  ];

  function getBest(){ return parseInt(localStorage.getItem(BEST_KEY)||'0',10)||0; }
  function setBest(v){ if (v>getBest()) localStorage.setItem(BEST_KEY,String(v)); }
  let toastTimer; function toast(m){ el.toast.textContent=m; el.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.toast.classList.remove('show'),1300); }

  function reset(){
    snake=[{x:8,y:9},{x:7,y:9},{x:6,y:9}];
    dir={x:1,y:0}; nextDir={x:1,y:0};
    score=0; step=0.16; acc=0; running=true; dead=false; collected={};
    placeFood(); refreshHUD();
  }
  function placeFood(){
    do { food={x:Math.floor(Math.random()*GRID),y:Math.floor(Math.random()*GRID)}; }
    while (snake.some(s=>s.x===food.x&&s.y===food.y));
    food.item = ITEMS[Math.floor(Math.random()*ITEMS.length)];
  }
  function refreshHUD(){ el.score.textContent=score; el.len.textContent=snake.length; el.best.textContent=getBest(); }

  function setDir(nx,ny){
    if (nx===-dir.x&&ny===-dir.y) return; // no reversa
    nextDir={x:nx,y:ny};
  }

  function tickStep(){
    dir=nextDir;
    const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
    if (head.x<0||head.x>=GRID||head.y<0||head.y>=GRID||snake.some(s=>s.x===head.x&&s.y===head.y)){
      return end();
    }
    snake.unshift(head);
    if (head.x===food.x&&head.y===food.y){
      const it=food.item||ITEMS[0]; score+=it.pts; collected[it.nm]=(collected[it.nm]||0)+1;
      Sound.good(); placeFood();
      step=Math.max(0.07, step*0.96); // acelera
    } else {
      snake.pop();
    }
    refreshHUD();
  }

  function end(){ running=false; dead=true; Sound.bad(); setBest(score);
    el.ovTitle.textContent='¡Choque!';
    const lines=Object.keys(collected).map(k=>`${k}: <b>${collected[k]}</b>`).join(' · ') || 'Sin insumos recolectados';
    el.ovText.innerHTML=`Insumos recolectados:<br>${lines}<br><br>Glow total: <b>${score}</b> · Récord: <b>${getBest()}</b>`;
    el.ovBtn.textContent='Jugar de nuevo';
    el.overlay.classList.add('show');
  }

  function draw(ts){
    const dt=Math.min(0.05,(ts-last)/1000)||0; last=ts;
    if (running){ acc+=dt; if (acc>=step){ acc=0; tickStep(); } }
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#0D0D0D'; ctx.fillRect(0,0,W,H);
    // rejilla tenue
    ctx.strokeStyle='rgba(139,158,176,.06)';
    for (let i=1;i<GRID;i++){ ctx.beginPath(); ctx.moveTo(i*CELL,0); ctx.lineTo(i*CELL,H); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0,i*CELL); ctx.lineTo(W,i*CELL); ctx.stroke(); }
    // insumo a recolectar (halo + emoji)
    const it=food.item||ITEMS[0]; const fx=food.x*CELL+CELL/2, fy=food.y*CELL+CELL/2;
    const pulse=1+0.12*Math.sin(performance.now()/200);
    ctx.fillStyle=it.c+'33'; ctx.beginPath(); ctx.arc(fx,fy,CELL*0.55*pulse,0,7); ctx.fill();
    ctx.font=(CELL-3)+'px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(it.e,fx,fy+1);
    // serpiente (cánula)
    snake.forEach((s,i)=>{
      ctx.fillStyle = i===0 ? '#F2EDE6' : (i%2 ? '#8B9EB0' : '#6E8296');
      rr(s.x*CELL+2, s.y*CELL+2, CELL-4, CELL-4, i===0?7:5); ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  function rr(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }

  // --- Entrada -------------------------------------------------------------
  window.addEventListener('keydown',(e)=>{
    const k=e.key; let used=true;
    if (k==='ArrowUp') setDir(0,-1); else if (k==='ArrowDown') setDir(0,1);
    else if (k==='ArrowLeft') setDir(-1,0); else if (k==='ArrowRight') setDir(1,0);
    else used=false;
    if (used){ e.preventDefault(); Sound.unlock(); }
  });
  let sx=0,sy=0;
  canvas.addEventListener('touchstart',(e)=>{ const t=e.touches[0]; sx=t.clientX; sy=t.clientY; },{passive:true});
  canvas.addEventListener('touchend',(e)=>{ Sound.unlock(); const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy; if(Math.max(Math.abs(dx),Math.abs(dy))<20)return; if(Math.abs(dx)>Math.abs(dy)) setDir(dx<0?-1:1,0); else setDir(0,dy<0?-1:1); },{passive:true});
  document.querySelectorAll('.pad button').forEach(b=>{
    b.addEventListener('click',()=>{ Sound.unlock(); const d=b.dataset.d; setDir(d==='left'?-1:d==='right'?1:0, d==='up'?-1:d==='down'?1:0); });
  });

  el.muteBtn.addEventListener('click', ()=>{ Sound.unlock(); const m=!Sound.isMuted(); Sound.setMuted(m); el.muteBtn.textContent=m?'🔇':'🔊'; });
  el.ovBtn.addEventListener('click', ()=>{ Sound.unlock(); el.overlay.classList.remove('show'); reset(); });

  // Arranque
  el.best.textContent=getBest();
  reset(); running=false; // espera al botón
  last=performance.now(); requestAnimationFrame(draw);
  el.ovTitle.textContent='Glow Snake';
  el.ovText.innerHTML='Guía la cánula para recoger <b>✦ glow</b> y crecer. Acelera mientras más comes. No choques con los bordes ni contigo.';
  el.overlay.classList.add('show');
})();
