/* ============================================================================
 * entities.js — Entidades del mundo: pacientes, camillas y partículas
 * ----------------------------------------------------------------------------
 * Sólo lógica/estado y movimiento. El dibujo vive en render.js. Mantener esta
 * separación facilita agregar nuevas entidades (personal, etc.) más adelante.
 * ==========================================================================*/

// --- Utilidades de movimiento ------------------------------------------------
function moveToward(obj, tx, ty, speed, dt) {
  const dx = tx - obj.x, dy = ty - obj.y;
  const dist = Math.hypot(dx, dy);
  const step = speed * dt;
  if (dist <= step || dist < 0.5) { obj.x = tx; obj.y = ty; return true; }
  obj.x += (dx / dist) * step;
  obj.y += (dy / dist) * step;
  return false;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// --- Camilla / box -----------------------------------------------------------
class Bed {
  constructor(slot, index) {
    this.x = slot.x;
    this.y = slot.y;
    this.index = index;
    this.patient = null;   // paciente siendo atendido
    this.appearT = 0;      // animación de aparición al comprarla
  }
  get isFree() { return this.patient === null; }
}

// --- Paciente ----------------------------------------------------------------
// Estados: 'toChair' -> 'waiting' -> 'toBed' -> 'treating' -> 'leaving'
let _patientId = 0;
class Patient {
  constructor(treatment, chair, chairIndex, door) {
    this.id = ++_patientId;
    this.treatment = treatment;
    this.chair = chair;
    this.chairIndex = chairIndex;

    this.x = door.x;
    this.y = door.y;
    this.state = 'toChair';

    // Paciencia: definida por el tratamiento que pide.
    this.patienceMax = treatment.patience;
    this.patience = this.patienceMax;

    this.treatTime = treatment.time;
    this.treatLeft = treatment.time;

    this.bed = null;
    this.selected = false;
    this.speed = 130;       // px/seg

    // Estética: tono de piel, pelo y ropa para variar visualmente.
    this.skin = pick(PATIENT_STYLES.skinTones);
    this.hair = pick(PATIENT_STYLES.hairColors);
    this.cloth = pick(PATIENT_STYLES.outfits);
    this.bob = Math.random() * Math.PI * 2; // fase para "respiración"

    this.done = false;      // marcar para remover
    this.happy = false;     // resultado final
    this.leaveT = 0;        // animación de salida
  }

  update(dt, door) {
    this.bob += dt * 2;
    switch (this.state) {
      case 'toChair':
        if (moveToward(this, this.chair.x, this.chair.y, this.speed, dt)) {
          this.state = 'waiting';
        }
        break;

      case 'waiting':
        this.patience -= dt;
        if (this.patience <= 0) {
          this.patience = 0;
          this.startLeaving(false);
        }
        break;

      case 'toBed':
        if (moveToward(this, this.bed.x, this.bed.y - 6, this.speed, dt)) {
          this.state = 'treating';
        }
        break;

      case 'treating':
        this.treatLeft -= dt;
        if (this.treatLeft <= 0) {
          this.treatLeft = 0;
          // El cobro lo dispara main.js al detectar treatProgress()>=1.
        }
        break;

      case 'leaving':
        this.leaveT += dt;
        if (moveToward(this, door.x, door.y, this.speed, dt)) {
          this.done = true;
        }
        break;
    }
  }

  assignBed(bed) {
    this.bed = bed;
    bed.patient = this;
    this.selected = false;
    this.state = 'toBed';
  }

  startLeaving(happy) {
    this.happy = happy;
    this.selected = false;
    if (this.bed) { this.bed.patient = null; this.bed = null; }
    this.state = 'leaving';
  }

  treatProgress() {
    if (this.treatTime <= 0) return 1;
    return 1 - this.treatLeft / this.treatTime;
  }

  patienceRatio() { return Math.max(0, this.patience / this.patienceMax); }

  isClickable() { return this.state === 'waiting'; }
}

// --- Partículas (monedas, confeti, texto flotante) ---------------------------
class Particle {
  constructor(kind, x, y, opts = {}) {
    this.kind = kind;       // 'coin' | 'confetti' | 'text'
    this.x = x; this.y = y;
    this.vx = opts.vx ?? 0;
    this.vy = opts.vy ?? 0;
    this.life = opts.life ?? 1;
    this.maxLife = this.life;
    this.color = opts.color ?? PALETTE.gold;
    this.text = opts.text ?? '';
    this.size = opts.size ?? 6;
    this.rot = Math.random() * Math.PI * 2;
    this.vrot = (Math.random() - 0.5) * 8;
    this.gravity = opts.gravity ?? 320;
    this.done = false;
  }

  update(dt) {
    this.life -= dt;
    if (this.life <= 0) { this.done = true; return; }
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.rot += this.vrot * dt;
  }

  alpha() { return Math.max(0, Math.min(1, this.life / this.maxLife)); }
}

// Fábricas de efectos --------------------------------------------------------
const FX = {
  coins(list, x, y, n = 6) {
    for (let i = 0; i < n; i++) {
      list.push(new Particle('coin', x + (Math.random() - 0.5) * 20, y, {
        vx: (Math.random() - 0.5) * 90,
        vy: -160 - Math.random() * 120,
        life: 0.9 + Math.random() * 0.3,
        color: PALETTE.gold,
        size: 7 + Math.random() * 3,
        gravity: 380,
      }));
    }
  },
  floatText(list, x, y, text, color) {
    list.push(new Particle('text', x, y, {
      vy: -42, life: 1.2, color, text, gravity: 0, size: 18,
    }));
  },
  confetti(list, x, y, n = 60) {
    const cols = ['#5C7CFA', '#4CAF7D', '#E8B84B', '#E05B5B', '#9C6ADE', '#B9C2CB', '#2A3B52'];
    for (let i = 0; i < n; i++) {
      list.push(new Particle('confetti', x + (Math.random() - 0.5) * 120, y, {
        vx: (Math.random() - 0.5) * 260,
        vy: -180 - Math.random() * 220,
        life: 1.4 + Math.random() * 0.8,
        color: cols[Math.floor(Math.random() * cols.length)],
        size: 5 + Math.random() * 5,
        gravity: 300,
      }));
    }
  },
};
