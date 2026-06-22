/* ============================================================================
 * render.js — Todo el dibujo del canvas (arte por código, sin imágenes)
 * ----------------------------------------------------------------------------
 * El Renderer recibe el contexto 2D y pinta la clínica, los pacientes, las
 * camillas y las partículas. No muta estado de juego: sólo lee y dibuja.
 * Lee paleta/layout de config.js y los íconos de cada tratamiento de data.js.
 * ==========================================================================*/

class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.C = PALETTE;
    this.L = LAYOUT;
  }

  // --- Frame completo ------------------------------------------------------
  draw(game) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.L.canvas.w, this.L.canvas.h);
    this.drawFloor();
    this.drawWalls();
    this.drawReception();
    this.drawChairs(game);
    this.drawBeds(game.beds);
    this.drawGhostBed(game);
    // Pacientes ordenados por Y para una pseudo-profundidad.
    const sorted = [...game.patients].sort((a, b) => a.y - b.y);
    for (const p of sorted) this.drawPatient(p, game);
    this.drawParticles(game.particles);
  }

  // --- Suelo a cuadros suaves ---------------------------------------------
  drawFloor() {
    const ctx = this.ctx, { w, h } = this.L.canvas;
    ctx.fillStyle = this.C.floor;
    ctx.fillRect(0, 0, w, h);
    const tile = 60;
    for (let y = 0; y < h; y += tile) {
      for (let x = 0; x < w; x += tile) {
        if (((x / tile) + (y / tile)) % 2 === 0) {
          ctx.fillStyle = this.C.floorAlt;
          ctx.fillRect(x, y, tile, tile);
        }
      }
    }
    // Línea divisoria sutil entre sala de espera y boxes.
    ctx.strokeStyle = 'rgba(42,59,82,0.10)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 10]);
    ctx.beginPath();
    ctx.moveTo(470, 150);
    ctx.lineTo(470, h - 20);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // --- Paredes (marco superior) -------------------------------------------
  drawWalls() {
    const ctx = this.ctx, { w } = this.L.canvas;
    ctx.fillStyle = this.C.wall;
    ctx.fillRect(0, 0, w, 36);
    ctx.fillStyle = this.C.gold;
    ctx.fillRect(0, 36, w, 4);
  }

  // --- Recepción -----------------------------------------------------------
  drawReception() {
    const ctx = this.ctx, r = this.L.reception;
    this.roundRect(r.x, r.y, r.w, r.h, 12);
    ctx.fillStyle = this.C.metalBlue;
    ctx.fill();
    this.roundRect(r.x + 8, r.y + 6, r.w - 16, 22, 8);
    ctx.fillStyle = this.C.goldSoft;
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('' + GAME_NAME, r.x + r.w / 2, r.y + r.h - 20);
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('RECEPCIÓN · ' + GAME_SUBTITLE, r.x + r.w / 2, r.y + 38);
    ctx.textAlign = 'left';
  }

  // --- Sillas de espera ----------------------------------------------------
  drawChairs(game) {
    const ctx = this.ctx;
    const occupied = new Set(game.patients.filter(p => p.chairIndex != null).map(p => p.chairIndex));
    this.L.chairs.forEach((c, i) => {
      const used = occupied.has(i);
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.beginPath();
      ctx.ellipse(0, 20, 20, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      this.roundRect(-18, -6, 36, 26, 7);
      ctx.fillStyle = used ? this.C.metalBlueSoft : this.C.lightGray;
      ctx.fill();
      this.roundRect(-18, -22, 36, 14, 6);
      ctx.fillStyle = used ? this.C.metalBlue : '#C2C9D4';
      ctx.fill();
      ctx.restore();
    });
  }

  // --- Camillas ------------------------------------------------------------
  drawBeds(beds) {
    const ctx = this.ctx;
    for (const bed of beds) {
      ctx.save();
      ctx.translate(bed.x, bed.y);
      const s = bed.appearT < 1 ? this.easeOut(bed.appearT) : 1;
      ctx.scale(s, s);

      ctx.fillStyle = 'rgba(0,0,0,0.10)';
      ctx.beginPath();
      ctx.ellipse(0, 40, 58, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      this.roundRect(-58, -34, 116, 70, 12);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = this.C.lightGray;
      ctx.lineWidth = 2;
      ctx.stroke();

      this.roundRect(-52, -28, 30, 58, 8);
      ctx.fillStyle = this.C.metalBlueSoft;
      ctx.fill();

      this.roundRect(44, -28, 8, 58, 4);
      ctx.fillStyle = this.C.gold;
      ctx.fill();

      if (bed.isFree) {
        ctx.strokeStyle = 'rgba(76,175,125,0.55)';
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 3;
        this.roundRectPath(-62, -38, 124, 78, 14);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = this.C.green;
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('LIBRE', 0, 52);
        ctx.textAlign = 'left';
      }
      ctx.restore();
    }
  }

  // Vista previa de la próxima camilla a comprar (si hay slot disponible).
  drawGhostBed(game) {
    if (!game.showBedHint) return;
    if (game.state.beds >= CONFIG.maxBeds) return;
    const slot = this.L.bedSlots[game.state.beds];
    if (!slot) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = 0.35 + Math.sin(game.time * 3) * 0.12;
    ctx.translate(slot.x, slot.y);
    ctx.strokeStyle = this.C.gold;
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 8]);
    this.roundRectPath(-58, -34, 116, 70, 12);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = this.C.gold;
    ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('+', 0, 2);
    ctx.restore();
    ctx.textAlign = 'left';
  }

  // --- Paciente ------------------------------------------------------------
  drawPatient(p, game) {
    const ctx = this.ctx;
    const bobY = (p.state === 'waiting' || p.state === 'treating')
      ? Math.sin(p.bob) * 1.5 : 0;
    const cx = p.x, cy = p.y + bobY;

    ctx.fillStyle = 'rgba(0,0,0,0.10)';
    ctx.beginPath();
    ctx.ellipse(cx, p.y + 22, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    if (p.selected) {
      ctx.strokeStyle = this.C.gold;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 26 + Math.sin(game.time * 6) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Cuerpo (torso).
    this.roundRect(cx - 12, cy - 2, 24, 24, 9);
    ctx.fillStyle = p.cloth;
    ctx.fill();

    // Cabeza.
    ctx.fillStyle = p.skin;
    ctx.beginPath();
    ctx.arc(cx, cy - 12, 11, 0, Math.PI * 2);
    ctx.fill();
    // Pelo.
    ctx.fillStyle = p.hair;
    ctx.beginPath();
    ctx.arc(cx, cy - 14, 11, Math.PI, Math.PI * 2);
    ctx.fill();

    this.drawFace(cx, cy - 12, p);

    // VIP: aro y corona dorada para que destaque (paga mucho más).
    if (p.vip) {
      ctx.strokeStyle = this.C.gold;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy - 4, 22 + Math.sin(game.time * 5) * 1.5, 0, Math.PI * 2);
      ctx.stroke();
      const hy = cy - 24;
      ctx.fillStyle = this.C.gold;
      ctx.beginPath();
      ctx.moveTo(cx - 8, hy);
      ctx.lineTo(cx - 8, hy - 7);
      ctx.lineTo(cx - 3, hy - 2);
      ctx.lineTo(cx, hy - 8);
      ctx.lineTo(cx + 3, hy - 2);
      ctx.lineTo(cx + 8, hy - 7);
      ctx.lineTo(cx + 8, hy);
      ctx.closePath();
      ctx.fill();
    }

    if (p.state === 'waiting' || p.state === 'toBed' || p.state === 'toChair') {
      this.drawBubble(cx, cy - 32, p.treatment);
    }
    if (p.state === 'waiting') {
      this.drawPatienceBar(cx, cy + 26, p);
    }
    if (p.state === 'treating') {
      this.drawTreatBar(cx, cy + 30, p);
    }
    if (p.state === 'leaving') {
      ctx.font = '20px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(p.happy ? '😍' : '😡', cx, cy - 34);
      ctx.textAlign = 'left';
    }
  }

  drawFace(x, y, p) {
    const ctx = this.ctx;
    ctx.fillStyle = '#3a2c1e';
    ctx.beginPath();
    ctx.arc(x - 4, y - 1, 1.6, 0, Math.PI * 2);
    ctx.arc(x + 4, y - 1, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3a2c1e';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    const happy = p.state === 'treating' || (p.state === 'leaving' && p.happy);
    const angry = (p.state === 'waiting' && p.patienceRatio() < 0.3) || (p.state === 'leaving' && !p.happy);
    if (happy) ctx.arc(x, y + 4, 4, 0.15 * Math.PI, 0.85 * Math.PI);
    else if (angry) ctx.arc(x, y + 8, 4, 1.15 * Math.PI, 1.85 * Math.PI);
    else { ctx.moveTo(x - 3, y + 5); ctx.lineTo(x + 3, y + 5); }
    ctx.stroke();
  }

  // Burbuja redonda con el ícono del tratamiento.
  drawBubble(x, y, treatment) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = 'rgba(42,59,82,0.18)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 5, y + 11);
    ctx.lineTo(x + 5, y + 11);
    ctx.lineTo(x, y + 19);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
    // Ícono del tratamiento (carácter definido en data.js).
    ctx.fillStyle = treatment.color;
    ctx.font = 'bold 17px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(treatment.icon, x, y + 1);
    ctx.restore();
  }

  drawPatienceBar(x, y, p) {
    const ctx = this.ctx;
    const w = 30, h = 5, r = p.patienceRatio();
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    this.roundRect(x - w / 2 - 1, y - 1, w + 2, h + 2, 3); ctx.fill();
    let col = this.C.green;
    if (r < 0.6) col = this.C.yellow;
    if (r < 0.3) col = this.C.red;
    ctx.fillStyle = col;
    this.roundRect(x - w / 2, y, w * r, h, 2.5); ctx.fill();
  }

  drawTreatBar(x, y, p) {
    const ctx = this.ctx;
    const w = 40, h = 6, prog = p.treatProgress();
    ctx.strokeStyle = 'rgba(196,169,106,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y - 34, 22, 0, Math.PI * 2 * prog);
    ctx.stroke();

    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    this.roundRect(x - w / 2 - 1, y - 1, w + 2, h + 2, 3); ctx.fill();
    ctx.fillStyle = this.C.metalBlueSoft;
    this.roundRect(x - w / 2, y, w * prog, h, 3); ctx.fill();
    ctx.fillStyle = this.C.text;
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(Math.ceil(p.treatLeft) + 's', x, y + 16);
    ctx.textAlign = 'left';
  }

  // --- Partículas ----------------------------------------------------------
  drawParticles(list) {
    const ctx = this.ctx;
    for (const pt of list) {
      ctx.save();
      ctx.globalAlpha = pt.alpha();
      if (pt.kind === 'coin') {
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rot);
        ctx.fillStyle = this.C.gold;
        ctx.beginPath();
        ctx.ellipse(0, 0, pt.size, pt.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = this.C.goldSoft;
        ctx.beginPath();
        ctx.ellipse(0, 0, pt.size * 0.5, pt.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#8a6d2f';
        ctx.font = `bold ${pt.size}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 0);
      } else if (pt.kind === 'confetti') {
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rot);
        ctx.fillStyle = pt.color;
        ctx.fillRect(-pt.size / 2, -pt.size / 2, pt.size, pt.size * 0.6);
      } else if (pt.kind === 'text') {
        ctx.fillStyle = pt.color;
        ctx.font = `bold ${pt.size}px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = 'rgba(255,255,255,0.85)';
        ctx.lineWidth = 3;
        ctx.strokeText(pt.text, pt.x, pt.y);
        ctx.fillText(pt.text, pt.x, pt.y);
      }
      ctx.restore();
    }
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  // --- Helpers de formas ---------------------------------------------------
  roundRectPath(x, y, w, h, r) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  roundRect(x, y, w, h, r) { this.roundRectPath(x, y, w, h, r); }
  easeOut(t) { return 1 - Math.pow(1 - t, 3); }
}
