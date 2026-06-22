/* ============================================================================
 * Skin Defense — estilo "Plants vs Zombies" para Glow Clinic (JC Medical)
 *
 * 5 carriles. Las imperfecciones (zombies) avanzan de derecha a izquierda y
 * DEVORAN las plantas que encuentran. El jugador siembra plantas en una rejilla
 * gastando GLOW (✦), que se obtiene con la planta generadora (Sérum) y orbes
 * que caen y se recogen tocándolos. Cada carril tiene un CORTACÉSPED de último
 * recurso: si una imperfección llega a la clínica y el cortacésped sigue ahí,
 * barre el carril una vez. Si ya se usó, se pierde ese carril → fin del juego.
 *
 * Sin librerías ni imágenes: todo dibujado en <canvas>.
 * ==========================================================================*/
(() => {
  'use strict';

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;   // 900
  const H = canvas.height;  // 600

  // ---- Tablero -----------------------------------------------------------
  const HOUSE_X = 92;            // borde izquierdo (clínica). Mower vive aquí.
  const LANES = 5;
  const LANE_TOP = 54;
  const LANE_H = (H - LANE_TOP - 16) / LANES;
  const COLS = 8;
  const GRID_X0 = HOUSE_X + 6;
  const CELL_W = (W - GRID_X0 - 12) / COLS;
  const SPAWN_X = W + 28;

  function laneY(l){ return LANE_TOP + l * LANE_H + LANE_H / 2; }
  function cellX(c){ return GRID_X0 + c * CELL_W + CELL_W / 2; }
  function laneAt(y){ return Math.floor((y - LANE_TOP) / LANE_H); }
  function colAt(x){ return Math.floor((x - GRID_X0) / CELL_W); }

  // ---- Plantas -----------------------------------------------------------
  // kind: 'gen' genera glow · 'shoot' dispara · 'splash' área · 'wall' muro
  const PLANTS = [
    { id:0, name:'Sérum',     glyph:'✿', cost:50,  hp:60,  kind:'gen',    color:'#4caf7d', genEvery:7,  genAmt:25 },
    { id:1, name:'Limpieza',  glyph:'✦', cost:100, hp:90,  kind:'shoot',  color:'#7FA8C9', fireRate:2.4, dmg:9 },
    { id:2, name:'Botox',     glyph:'⊹', cost:175, hp:90,  kind:'shoot',  color:'#9c6ade', fireRate:1.6, dmg:24 },
    { id:3, name:'Sculptra',  glyph:'✷', cost:300, hp:90,  kind:'splash', color:'#B9C2CB', fireRate:1.0, dmg:30, splash:60 },
    { id:4, name:'Mascarilla',glyph:'▦', cost:50,  hp:420, kind:'wall',   color:'#8895a8' },
  ];

  // ---- Imperfecciones (zombies) -----------------------------------------
  // eatDps = daño por seg que hace a una planta mientras la devora.
  const ENEMY_TYPES = {
    arruga:   { name:'Arruga',   hp:46,  speed:20, reward:15, eatDps:34, color:'#8a6d52', r:14 },
    brote:    { name:'Brote',    hp:34,  speed:42, reward:18, eatDps:30, color:'#c45b6a', r:12 }, // rápido
    mancha:   { name:'Mancha',   hp:95,  speed:17, reward:25, eatDps:42, color:'#7a5a3a', r:16 }, // conehead
    flacidez: { name:'Flacidez', hp:190, speed:13, reward:45, eatDps:55, color:'#b07f9c', r:20 }, // tanque
    boss:     { name:'Flacidez gigante', hp:900, speed:11, reward:300, eatDps:90, color:'#7a4b66', r:30 },
  };

  const TOTAL_WAVES = 10;
  const START_CASH = 125;
  const BEST_KEY = 'skin_defense_best';

  // ---- Estado ------------------------------------------------------------
  let state;
  function freshState(){
    return {
      cash: START_CASH,
      wave: 0,
      sel: 0,            // planta seleccionada
      removing: false,   // modo pala
      lanesLost: 0,
      mowers: Array.from({length:LANES}, () => ({ alive:true, firing:false, x:HOUSE_X-24 })),
      grid: {},          // "lane,col" -> planta
      plants: [],
      enemies: [],
      bullets: [],
      orbs: [],          // glow recolectable
      particles: [],
      spawnQueue: [],
      spawnTimer: 0,
      skyTimer: 5,       // orbe que cae del cielo cada tanto
      waveActive: false,
      running: false,
      over: false,
      hoverCell: -1,     // lane*COLS+col
    };
  }

  // ---- DOM ---------------------------------------------------------------
  const el = {
    hudWave: document.getElementById('hudWave'),
    hudCash: document.getElementById('hudCash'),
    hudLife: document.getElementById('hudLife'),
    hudTower: document.getElementById('hudTower'),
    bestWave: document.getElementById('bestWave'),
    startWaveBtn: document.getElementById('startWaveBtn'),
    restartBtn: document.getElementById('restartBtn'),
    overlay: document.getElementById('overlay'),
    ovTitle: document.getElementById('ovTitle'),
    ovText: document.getElementById('ovText'),
    ovBtn: document.getElementById('ovBtn'),
    muteBtn: document.getElementById('muteBtn'),
    shovelBtn: document.getElementById('shovelBtn'),
    toast: document.getElementById('toast'),
    towerBtns: Array.from(document.querySelectorAll('.tower-btn')),
  };

  // ---- Utilidades --------------------------------------------------------
  let toastTimer = null;
  function toast(msg){
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove('show'), 1500);
  }
  function getBest(){ return parseInt(localStorage.getItem(BEST_KEY) || '0', 10) || 0; }
  function setBest(v){ if(v > getBest()) localStorage.setItem(BEST_KEY, String(v)); }

  function updateHUD(){
    el.hudWave.textContent = `${state.wave} / ${TOTAL_WAVES}`;
    el.hudCash.textContent = '✦ ' + Math.round(state.cash).toLocaleString('es-CL');
    el.hudLife.textContent = LANES - state.lanesLost;
    el.hudTower.textContent = state.removing ? 'Quitar' : PLANTS[state.sel].name;
    el.bestWave.textContent = getBest();
    el.towerBtns.forEach((b) => {
      const idx = parseInt(b.dataset.tower, 10);
      if(idx < 0){ b.classList.toggle('rm', state.removing); return; }
      const cost = PLANTS[idx].cost;
      const cspan = b.querySelector('[data-cost]');
      if(cspan) cspan.textContent = '✦ ' + cost;
      b.classList.toggle('sel', !state.removing && idx === state.sel);
      b.disabled = state.cash < cost;
    });
    el.startWaveBtn.disabled = state.waveActive || state.over || state.wave >= TOTAL_WAVES;
  }

  // ---- Oleadas -----------------------------------------------------------
  function buildWave(n){
    const queue = [];
    const count = 4 + Math.floor(n * 2.2);            // crece fuerte
    const hpScale = 1 + (n - 1) * 0.34;               // más dura
    const spScale = 1 + (n - 1) * 0.045;
    const pool = ['arruga','arruga'];
    if(n >= 2) pool.push('brote');
    if(n >= 3) pool.push('mancha','brote');
    if(n >= 5) pool.push('mancha','flacidez');
    if(n >= 7) pool.push('flacidez','flacidez','brote');
    for(let i=0; i<count; i++){
      const type = pool[Math.floor(Math.random() * pool.length)];
      const def = ENEMY_TYPES[type];
      queue.push({
        type,
        lane: Math.floor(Math.random() * LANES),
        hpMax: def.hp * hpScale,
        speed: def.speed * spScale,
        reward: def.reward,
        gap: Math.max(0.45, 1.5 - n * 0.09) + Math.random() * 0.5, // spawnea más seguido
      });
    }
    // Jefe en la última oleada
    if(n === TOTAL_WAVES){
      queue.push({ type:'boss', lane:2, hpMax:ENEMY_TYPES.boss.hp * (1 + (n-1)*0.1), speed:ENEMY_TYPES.boss.speed, reward:ENEMY_TYPES.boss.reward, gap:2 });
    }
    return queue;
  }

  function startWave(){
    if(state.waveActive || state.over || state.wave >= TOTAL_WAVES) return;
    state.wave++;
    state.spawnQueue = buildWave(state.wave);
    state.spawnTimer = 0.6;
    state.waveActive = true;
    Sound.click();
    toast(`Oleada ${state.wave} en camino`);
    updateHUD();
  }

  // ---- Sembrar / quitar plantas -----------------------------------------
  function cellKey(lane, col){ return lane + ',' + col; }
  function tryPlace(lane, col){
    if(lane < 0 || lane >= LANES || col < 0 || col >= COLS) return;
    const key = cellKey(lane, col);
    if(state.removing){
      const p = state.grid[key];
      if(p){
        state.cash += Math.round(p.def.cost * 0.5);
        removePlant(p);
        Sound.click();
        updateHUD();
      }
      return;
    }
    if(state.grid[key]){ Sound.error(); toast('Celda ocupada'); return; }
    const def = PLANTS[state.sel];
    if(state.cash < def.cost){ Sound.error(); toast('Glow insuficiente'); return; }
    state.cash -= def.cost;
    const p = {
      def, lane, col,
      x: cellX(col), y: laneY(lane),
      hp: def.hp, hpMax: def.hp,
      cooldown: Math.random() * 0.5,
      genTimer: def.genEvery || 0,
      pulse: 0, eaten: 0,
    };
    state.grid[key] = p;
    state.plants.push(p);
    Sound.cash();
    updateHUD();
  }
  function removePlant(p){
    delete state.grid[cellKey(p.lane, p.col)];
    const i = state.plants.indexOf(p);
    if(i >= 0) state.plants.splice(i, 1);
  }

  // ---- Update ------------------------------------------------------------
  function update(dt){
    if(!state.running || state.over) return;

    // Spawns
    if(state.waveActive && state.spawnQueue.length){
      state.spawnTimer -= dt;
      if(state.spawnTimer <= 0){
        const s = state.spawnQueue.shift();
        spawnEnemy(s);
        state.spawnTimer = s.gap;
      }
    }

    // Orbe del cielo (glow gratis ocasional para que siempre haya algo que tocar)
    state.skyTimer -= dt;
    if(state.skyTimer <= 0){
      state.skyTimer = 9 + Math.random() * 6;
      state.orbs.push({ x: 120 + Math.random()*(W-200), y:-10, ty: 60 + Math.random()*(H-160), amt:25, life:11, vy:60 });
    }

    // Plantas
    for(const p of state.plants){
      if(p.pulse > 0) p.pulse -= dt * 4;
      if(p.def.kind === 'gen'){
        p.genTimer -= dt;
        if(p.genTimer <= 0){
          p.genTimer = p.def.genEvery;
          state.orbs.push({ x:p.x, y:p.y, ty:p.y, amt:p.def.genAmt, life:10, vy:0, pop:1 });
          p.pulse = 1;
        }
        continue;
      }
      if(p.def.kind === 'wall') continue;
      // disparo: si hay enemigo en el carril a la derecha de la planta
      p.cooldown -= dt;
      if(p.cooldown > 0) continue;
      const tgt = firstEnemyAhead(p);
      if(tgt){
        fire(p, tgt);
        p.cooldown = 1 / p.def.fireRate;
        p.pulse = 1;
      }
    }

    // Enemigos
    for(let i=state.enemies.length-1; i>=0; i--){
      const e = state.enemies[i];
      e.wobble += dt * 6;
      // ¿hay planta para devorar en su celda?
      const eating = plantInFront(e);
      if(eating){
        e.eatingPlant = eating;
        eating.hp -= e.eatDps * dt;
        if(Math.random() < dt*8) spawnHit(eating.x, eating.y, '#b06a5a', 1);
        if(eating.hp <= 0){
          removePlant(eating);
          Sound.bad();
        }
      }else{
        e.eatingPlant = null;
        e.x -= e.speed * dt;
      }
      // ¿llegó a la clínica?
      if(e.x <= HOUSE_X){
        const m = state.mowers[e.lane];
        if(m && m.alive && !m.firing){ m.firing = true; }
        if(m && m.firing){
          // el cortacésped lo barre (se gestiona en updateMowers)
        }
        if(!m || (!m.alive && !m.firing)){
          // carril perdido
          state.enemies.splice(i, 1);
          state.lanesLost++;
          spawnHit(HOUSE_X, e.y, '#e05b5b', 16);
          Sound.bad();
          updateHUD();
          if(state.lanesLost >= LANES || true){ /* fin si cualquier carril cae sin mower */ }
          if(state.lanesLost >= 1 && (!state.mowers[e.lane] || !state.mowers[e.lane].alive)){ endGame(false); return; }
          continue;
        }
        // si hay mower vivo no quitamos aquí; lo mata el barrido
      }
      if(e.hp <= 0){
        state.enemies.splice(i, 1);
        state.cash += e.reward;
        spawnHit(e.x, e.y, e.color, 14);
        Sound.good();
        updateHUD();
      }
    }

    updateMowers(dt);

    // Proyectiles
    for(let i=state.bullets.length-1; i>=0; i--){
      const b = state.bullets[i];
      b.x += b.speed * dt;
      // impacto con primer enemigo del carril
      let hit = null;
      for(const e of state.enemies){
        if(e.lane === b.lane && Math.abs(e.x - b.x) <= e.r + 4 && e.x >= b.x - 6){ hit = e; break; }
      }
      if(hit){
        applyDamage(b, hit);
        state.bullets.splice(i, 1);
      }else if(b.x > W + 10){
        state.bullets.splice(i, 1);
      }
    }

    // Orbes
    for(let i=state.orbs.length-1; i>=0; i--){
      const o = state.orbs[i];
      if(o.pop) o.pop -= dt * 3;
      if(o.vy && o.y < o.ty){ o.y += o.vy * dt; if(o.y > o.ty) o.y = o.ty; }
      o.life -= dt;
      if(o.life <= 0) state.orbs.splice(i, 1);
    }

    // Partículas
    for(let i=state.particles.length-1; i>=0; i--){
      const p = state.particles[i];
      p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
      if(p.life <= 0) state.particles.splice(i, 1);
    }

    // ¿Fin de oleada?
    if(state.waveActive && state.spawnQueue.length === 0 && state.enemies.length === 0){
      state.waveActive = false;
      const bonus = 75 + state.wave * 20;
      state.cash += bonus;
      Sound.cash();
      toast(`Oleada ${state.wave} superada · +✦${bonus}`);
      updateHUD();
      if(state.wave >= TOTAL_WAVES) endGame(true);
    }
  }

  function updateMowers(dt){
    for(let l=0; l<LANES; l++){
      const m = state.mowers[l];
      if(!m.firing) continue;
      m.x += 520 * dt;
      // mata todo lo que toca en su carril
      for(let i=state.enemies.length-1; i>=0; i--){
        const e = state.enemies[i];
        if(e.lane === l && e.x <= m.x + 22){
          state.enemies.splice(i, 1);
          spawnHit(e.x, e.y, e.color, 10);
        }
      }
      if(m.x > W + 40){ m.firing = false; m.alive = false; }
    }
  }

  function spawnEnemy(s){
    const def = ENEMY_TYPES[s.type];
    state.enemies.push({
      x: SPAWN_X, y: laneY(s.lane), lane: s.lane, type: s.type,
      r: def.r, color: def.color, hp: s.hpMax, hpMax: s.hpMax,
      speed: s.speed, reward: s.reward, eatDps: def.eatDps,
      wobble: Math.random()*6, eatingPlant: null,
    });
  }

  // Planta que el enemigo está tocando por delante (misma celda/carril)
  function plantInFront(e){
    const col = colAt(e.x - e.r);
    const key = cellKey(e.lane, col);
    let p = state.grid[key];
    if(p && Math.abs(e.x - e.r - p.x) < CELL_W*0.55) return p;
    // también revisar celda actual del centro
    const key2 = cellKey(e.lane, colAt(e.x));
    p = state.grid[key2];
    if(p && e.x - e.r <= p.x + CELL_W*0.3) return p;
    return null;
  }

  function firstEnemyAhead(p){
    let best = null, bx = Infinity;
    for(const e of state.enemies){
      if(e.lane === p.lane && e.x >= p.x - 6 && e.x < bx){ best = e; bx = e.x; }
    }
    return best;
  }

  function fire(p, tgt){
    state.bullets.push({
      x: p.x + 14, y: p.y, lane: p.lane, speed: 460,
      dmg: p.def.dmg, splash: p.def.splash || 0, color: p.def.color,
    });
  }

  function applyDamage(b, hit){
    if(b.splash > 0){
      for(const e of state.enemies){
        if(e.lane === b.lane && Math.abs(e.x - hit.x) <= b.splash) e.hp -= b.dmg;
      }
      spawnHit(hit.x, hit.y, b.color, 16, b.splash);
    }else{
      hit.hp -= b.dmg;
      spawnHit(b.x, b.y, b.color, 5);
    }
  }

  function spawnHit(x, y, color, n, spread){
    spread = spread || 30;
    for(let i=0; i<n; i++){
      const a = Math.random()*Math.PI*2, sp = 40 + Math.random()*spread*2;
      state.particles.push({ x, y, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, life:.3+Math.random()*.3, maxLife:.6, color, r:2+Math.random()*2 });
    }
  }

  // ---- Render ------------------------------------------------------------
  function render(){
    ctx.clearRect(0,0,W,H);
    drawBackground();
    drawHouse();
    drawHover();
    drawOrbs();
    drawPlants();
    drawEnemies();
    drawBullets();
    drawMowers();
    drawParticles();
  }

  function drawBackground(){
    ctx.fillStyle = '#e7ecf2'; ctx.fillRect(0,0,W,H);
    for(let l=0; l<LANES; l++){
      const y = LANE_TOP + l*LANE_H;
      ctx.fillStyle = l%2===0 ? '#eef2f7' : '#e3e9f0';
      ctx.fillRect(HOUSE_X, y, W-HOUSE_X, LANE_H);
    }
    // rejilla de celdas
    ctx.strokeStyle = 'rgba(42,59,82,.05)'; ctx.lineWidth = 1;
    for(let c=0; c<=COLS; c++){ const x = GRID_X0 + c*CELL_W; ctx.beginPath(); ctx.moveTo(x,LANE_TOP); ctx.lineTo(x,LANE_TOP+LANES*LANE_H); ctx.stroke(); }
    ctx.fillStyle = 'rgba(42,59,82,.16)'; ctx.font = '600 11px system-ui'; ctx.textAlign = 'right';
    ctx.fillText('Imperfecciones →', W-12, LANE_TOP-16);
  }

  function drawHouse(){
    ctx.fillStyle = 'rgba(196,169,106,.12)'; ctx.fillRect(0,0,HOUSE_X,H);
    ctx.strokeStyle = 'rgba(196,169,106,.5)'; ctx.setLineDash([6,6]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(HOUSE_X,0); ctx.lineTo(HOUSE_X,H); ctx.stroke(); ctx.setLineDash([]);
    ctx.save(); ctx.translate(HOUSE_X/2, H/2 - 8);
    ctx.fillStyle = '#f3d9c4'; ctx.beginPath(); ctx.ellipse(0,0,26,36,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#2a3b52'; ctx.beginPath(); ctx.arc(-9,-6,3,0,7); ctx.arc(9,-6,3,0,7); ctx.fill();
    ctx.strokeStyle='#c97a6d'; ctx.lineWidth=2; ctx.beginPath();
    const happy=(LANES-state.lanesLost)/LANES; ctx.moveTo(-9,14); ctx.quadraticCurveTo(0,14+(happy-0.5)*16,9,14); ctx.stroke();
    ctx.restore();
    ctx.fillStyle='#2a3b52'; ctx.font='700 11px system-ui'; ctx.textAlign='center'; ctx.fillText('Clínica', HOUSE_X/2, H/2+44);
  }

  function drawHover(){
    if(state.hoverCell < 0) return;
    const lane = Math.floor(state.hoverCell / COLS), col = state.hoverCell % COLS;
    const x = cellX(col), y = laneY(lane);
    ctx.fillStyle = state.removing ? 'rgba(224,91,91,.16)' : 'rgba(196,169,106,.18)';
    ctx.strokeStyle = state.removing ? 'rgba(224,91,91,.8)' : 'rgba(196,169,106,.85)';
    ctx.lineWidth = 2; roundRect(x-CELL_W/2+3, y-LANE_H/2+3, CELL_W-6, LANE_H-6, 8); ctx.fill(); ctx.stroke();
  }

  function drawPlants(){
    for(const p of state.plants){
      ctx.save(); ctx.translate(p.x, p.y);
      const s = 1 + Math.max(0,p.pulse)*0.12; ctx.scale(s,s);
      ctx.fillStyle = '#fff'; ctx.strokeStyle = p.def.color; ctx.lineWidth = 3;
      roundRect(-19,-19,38,38,10); ctx.fill(); ctx.stroke();
      if(p.def.kind === 'wall'){
        ctx.fillStyle = p.def.color; roundRect(-13,-13,26,26,5); ctx.fill();
      }else{
        ctx.fillStyle = p.def.color; ctx.beginPath(); ctx.arc(0,0,12,0,Math.PI*2); ctx.fill();
      }
      ctx.fillStyle = '#fff'; ctx.font = '700 15px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(p.def.glyph, 0, 1);
      ctx.restore();
      // barra de vida de la planta (si dañada)
      if(p.hp < p.hpMax){
        const w=34,pct=Math.max(0,p.hp/p.hpMax);
        ctx.fillStyle='rgba(42,59,82,.2)'; ctx.fillRect(p.x-w/2,p.y-26,w,3);
        ctx.fillStyle = pct>0.4?'#4caf7d':'#e05b5b'; ctx.fillRect(p.x-w/2,p.y-26,w*pct,3);
      }
    }
  }

  function drawEnemies(){
    for(const e of state.enemies){
      ctx.save(); ctx.translate(e.x, e.y + Math.sin(e.wobble)*2); drawImperfection(e); ctx.restore();
      const w=e.r*2.2, pct=Math.max(0,e.hp/e.hpMax);
      ctx.fillStyle='rgba(42,59,82,.25)'; ctx.fillRect(e.x-w/2, e.y-e.r-11, w, 4);
      ctx.fillStyle = pct>0.5?'#4caf7d':pct>0.25?'#e8b84b':'#e05b5b'; ctx.fillRect(e.x-w/2, e.y-e.r-11, w*pct, 4);
    }
  }

  function drawImperfection(e){
    ctx.fillStyle = e.color; ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 1.5;
    if(e.type === 'arruga' || e.type === 'brote'){
      ctx.strokeStyle = e.color; ctx.lineWidth = 3;
      for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.moveTo(-e.r,k*6); ctx.quadraticCurveTo(0,k*6-5,e.r,k*6); ctx.stroke(); }
      if(e.type==='brote'){ ctx.fillStyle=e.color; ctx.beginPath(); ctx.arc(0,0,4,0,7); ctx.fill(); }
    }else if(e.type === 'mancha'){
      ctx.beginPath(); const pts=8;
      for(let k=0;k<=pts;k++){ const a=k/pts*Math.PI*2, rr=e.r*(0.75+0.35*Math.sin(a*3+e.wobble)); const px=Math.cos(a)*rr,py=Math.sin(a)*rr; k===0?ctx.moveTo(px,py):ctx.lineTo(px,py); }
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }else{
      ctx.beginPath(); ctx.arc(0,e.r*0.3,e.r*0.85,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-e.r*0.5,0); ctx.quadraticCurveTo(0,-e.r*1.4,e.r*0.5,0); ctx.closePath(); ctx.fill();
    }
  }

  function drawBullets(){
    for(const b of state.bullets){
      ctx.fillStyle=b.color; ctx.beginPath(); ctx.arc(b.x,b.y,b.splash>0?6:4,0,Math.PI*2); ctx.fill();
    }
  }

  function drawMowers(){
    for(let l=0; l<LANES; l++){
      const m = state.mowers[l]; if(!m.alive && !m.firing) continue;
      const y = laneY(l);
      ctx.fillStyle = m.firing ? '#B9C2CB' : '#9aa6b5';
      roundRect(m.x-14, y-9, 28, 18, 4); ctx.fill();
      ctx.fillStyle = '#2a3b52'; ctx.beginPath(); ctx.arc(m.x-7,y+9,4,0,7); ctx.arc(m.x+7,y+9,4,0,7); ctx.fill();
      ctx.fillStyle='#fff'; ctx.font='700 9px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('✚', m.x, y);
    }
  }

  function drawOrbs(){
    for(const o of state.orbs){
      const blink = o.life < 3 ? (Math.floor(o.life*6)%2 ? 0.4 : 1) : 1;
      ctx.globalAlpha = blink;
      const r = 13 * (o.pop ? 1 + Math.max(0,o.pop)*0.3 : 1);
      ctx.fillStyle = '#B9C2CB'; ctx.beginPath(); ctx.arc(o.x,o.y,r,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font='700 11px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('✦',o.x,o.y+1);
      ctx.globalAlpha = 1;
    }
  }

  function drawParticles(){
    for(const p of state.particles){
      ctx.globalAlpha = Math.max(0,p.life/p.maxLife);
      ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function roundRect(x,y,w,h,r){
    ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
  }

  // ---- Fin ---------------------------------------------------------------
  function endGame(won){
    if(state.over) return;
    state.over = true; state.waveActive = false;
    setBest(won ? TOTAL_WAVES : state.wave);
    if(won){
      Sound.win();
      el.ovTitle.textContent = '¡Rostro radiante!';
      el.ovText.innerHTML = `Defendiste la clínica las <b>${TOTAL_WAVES} oleadas</b> y venciste a la Flacidez gigante.<br>Glow final: <b>✦${Math.round(state.cash)}</b>`;
    }else{
      Sound.bad();
      el.ovTitle.textContent = 'Carril perdido';
      el.ovText.innerHTML = `Una imperfección cruzó sin cortacésped en la oleada <b>${state.wave}</b>.<br>Mejor oleada: <b>${getBest()}</b>`;
    }
    el.ovBtn.textContent = 'Jugar de nuevo';
    el.overlay.classList.add('show');
    updateHUD();
  }

  // ---- Interacción -------------------------------------------------------
  function canvasPos(evt){
    const rect = canvas.getBoundingClientRect();
    const t = evt.touches ? evt.touches[0] : evt;
    return { x:(t.clientX-rect.left)*(W/rect.width), y:(t.clientY-rect.top)*(H/rect.height) };
  }
  function orbAt(x,y){
    for(let i=state.orbs.length-1; i>=0; i--){ const o=state.orbs[i]; if(Math.hypot(x-o.x,y-o.y) <= 18) return i; }
    return -1;
  }
  canvas.addEventListener('mousemove', (e) => {
    const p = canvasPos(e); const lane=laneAt(p.y), col=colAt(p.x);
    state.hoverCell = (lane>=0&&lane<LANES&&col>=0&&col<COLS&&p.x>=GRID_X0) ? lane*COLS+col : -1;
  });
  canvas.addEventListener('mouseleave', () => { state.hoverCell = -1; });
  function onTap(e){
    e.preventDefault(); Sound.unlock();
    if(!state.running || state.over) return;
    const p = canvasPos(e);
    // 1) recoger orbe
    const oi = orbAt(p.x, p.y);
    if(oi >= 0){ state.cash += state.orbs[oi].amt; state.orbs.splice(oi,1); Sound.good(); updateHUD(); return; }
    // 2) sembrar / quitar
    const lane = laneAt(p.y), col = colAt(p.x);
    if(lane>=0&&lane<LANES&&col>=0&&col<COLS&&p.x>=GRID_X0){ state.hoverCell = lane*COLS+col; tryPlace(lane,col); }
  }
  canvas.addEventListener('click', onTap);
  canvas.addEventListener('touchstart', onTap, { passive:false });

  // ---- Botones -----------------------------------------------------------
  el.towerBtns.forEach((b) => {
    b.addEventListener('click', () => {
      Sound.unlock(); Sound.click();
      const idx = parseInt(b.dataset.tower, 10);
      if(idx < 0){ state.removing = !state.removing; }
      else { state.removing = false; state.sel = idx; }
      updateHUD();
    });
  });
  el.startWaveBtn.addEventListener('click', () => { Sound.unlock(); startWave(); });
  el.restartBtn.addEventListener('click', () => { Sound.unlock(); Sound.click(); restart(); });
  el.ovBtn.addEventListener('click', () => {
    Sound.unlock(); el.overlay.classList.remove('show');
    if(state.over || !state.running) restart();
    state.running = true; updateHUD();
  });
  el.muteBtn.addEventListener('click', () => {
    Sound.unlock(); const m = !Sound.isMuted(); Sound.setMuted(m);
    el.muteBtn.textContent = m ? '🔇' : '🔊'; if(!m) Sound.click();
  });

  function restart(){ state = freshState(); state.running = true; el.overlay.classList.remove('show'); updateHUD(); }

  // ---- Loop --------------------------------------------------------------
  let last = 0;
  function loop(ts){
    const dt = Math.min(0.05, (ts - last)/1000) || 0; last = ts;
    update(dt); render(); requestAnimationFrame(loop);
  }

  function init(){
    state = freshState();
    el.ovTitle.textContent = 'Skin Defense';
    el.ovText.innerHTML =
      'Estilo <b>Plants vs Zombies</b>: las imperfecciones avanzan por 5 carriles y <b>devoran tus plantas</b>.<br><br>' +
      'Siembra <b>✿ Sérum</b> para generar <b>✦ glow</b> y <b>tócalo</b> para recogerlo. Con glow siembras <b>defensas</b>: ✦ Limpieza, ⊹ Botox, ✷ Sculptra (área) y ▦ Mascarilla (muro).<br><br>' +
      'Cada carril tiene un <b>cortacésped ✚</b> de último recurso: si una imperfección llega a la clínica lo usa una vez. Si ya no queda, <b>pierdes</b>.<br><br>' +
      `Resiste <b>${TOTAL_WAVES} oleadas</b> y vence al jefe final.`;
    el.ovBtn.textContent = 'Empezar';
    el.overlay.classList.add('show');
    updateHUD();
    requestAnimationFrame(loop);
  }
  init();
})();
