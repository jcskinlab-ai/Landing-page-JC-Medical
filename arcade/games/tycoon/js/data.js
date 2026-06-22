/* ============================================================
   GLOW CLINIC — by JC Medical
   data.js — Configuración de contenido y balance del juego
   ------------------------------------------------------------
   Edita SOLO este archivo para agregar/ajustar tratamientos,
   precios, tiempos y curva de niveles. El motor lee de aquí.
   ============================================================ */

/* ---------- TRATAMIENTOS ----------
   time       = segundos que toma atender (en tiempo de juego)
   cost       = costo de insumos que se descuenta al iniciar
   price      = lo que paga el paciente al terminar
   xp         = experiencia que otorga al completarse
   unlockLvl  = nivel de clínica requerido para que aparezca
   patience   = segundos de paciencia del paciente que lo pide
   color      = color del ícono/etiqueta del tratamiento
   icon       = etiqueta corta para dibujar sobre el paciente
   La ganancia neta = price - cost. Está balanceada para que
   los tratamientos lentos/caros rindan más por minuto al subir nivel.
*/
const TREATMENTS = [
  {
    id: "limpieza", name: "Limpieza facial",
    time: 8, cost: 2000, price: 12000, xp: 10, unlockLvl: 1, patience: 35,
    color: "#7FA8C9", icon: "✦",
    desc: "Rápida y económica. El pan de cada día de la clínica."
  },
  {
    id: "hidrafacial", name: "Hidrafacial",
    time: 10, cost: 4000, price: 21000, xp: 14, unlockLvl: 2, patience: 33,
    color: "#6FB3B8", icon: "✺",
    desc: "Limpieza profunda e hidratación. Muy pedido y rentable."
  },
  {
    id: "peeling", name: "Peeling químico",
    time: 12, cost: 6000, price: 28000, xp: 18, unlockLvl: 2, patience: 32,
    color: "#9C8AB5", icon: "◈",
    desc: "Renueva la piel. Buen margen, tiempo medio."
  },
  {
    id: "botox", name: "Toxina botulínica",
    time: 16, cost: 18000, price: 75000, xp: 35, unlockLvl: 3, patience: 30,
    color: "#5E7A99", icon: "⊹",
    desc: "El tratamiento estrella. Alto valor, demanda constante."
  },
  {
    id: "laser", name: "Depilación láser",
    time: 14, cost: 8000, price: 44000, xp: 26, unlockLvl: 4, patience: 31,
    color: "#C98A8A", icon: "✸",
    desc: "Sesiones recurrentes. Volumen constante de pacientes."
  },
  {
    id: "labios", name: "Ácido en labios",
    time: 18, cost: 22000, price: 98000, xp: 46, unlockLvl: 4, patience: 29,
    color: "#C77F9E", icon: "💋",
    desc: "Perfilado y volumen. Demanda alta entre jóvenes."
  },
  {
    id: "rino", name: "Rinomodelación",
    time: 22, cost: 30000, price: 132000, xp: 55, unlockLvl: 5, patience: 28,
    color: "#4A6272", icon: "◆",
    desc: "Armonización del perfil. Caro, lento, muy rentable."
  },
  {
    id: "hilos", name: "Hilos tensores",
    time: 26, cost: 45000, price: 185000, xp: 72, unlockLvl: 6, patience: 27,
    color: "#B5936A", icon: "☰",
    desc: "Efecto lifting sin cirugía. Procedimiento de alto ticket."
  },
  {
    id: "sculptra", name: "Bioestimulación (Sculptra)",
    time: 30, cost: 60000, price: 235000, xp: 90, unlockLvl: 7, patience: 26,
    color: "#B9C2CB", icon: "✷",
    desc: "Colágeno propio. El tratamiento premium de la casa."
  },
  {
    id: "salmon", name: "ADN de salmón",
    time: 20, cost: 40000, price: 170000, xp: 82, unlockLvl: 8, patience: 27,
    color: "#E0837A", icon: "◊",
    desc: "Regeneración de moda. Buen margen y ticket alto."
  },
  {
    id: "exosomas", name: "Exosomas",
    time: 28, cost: 75000, price: 300000, xp: 115, unlockLvl: 9, patience: 25,
    color: "#6E8CA6", icon: "❖",
    desc: "Terapia regenerativa de gama alta. La joya de la corona."
  }
];

/* ---------- CURVA DE NIVELES ----------
   xpForLevel(n) = XP total acumulada necesaria para alcanzar el nivel n.
   Crece de forma suave al principio (enganche rápido) y se empina luego.
*/
function xpForLevel(level) {
  // nivel 1 = 0 xp; progresión cuadrática suave
  return Math.floor(40 * Math.pow(level - 1, 1.6));
}

/* Recompensa al subir de nivel (dinero de regalo para que se sienta premio) */
function levelUpReward(level) {
  return 10000 + level * 5000;
}

/* ---------- ECONOMÍA Y BALANCE GENERAL ---------- */
const CONFIG = {
  startMoney: 50000,         // dinero inicial
  startLevel: 1,
  startReputation: 3.0,      // estrellas iniciales (sobre 5)

  // Spawn de pacientes
  spawnIntervalBase: 6.0,    // segundos entre pacientes (nivel base)
  spawnIntervalMin: 2.2,     // mínimo al tener mucha reputación
  // A más reputación, más rápido llegan pacientes:
  // intervalo = lerp(base, min, reputacion/5)

  // Reputación
  repGainHappy: 0.04,        // sube por paciente feliz
  repLossAngry: 0.12,        // baja por paciente que se va sin atención
  repMin: 1.0,
  repMax: 5.0,

  // Camillas / boxes
  startBeds: 2,              // camillas iniciales
  maxBeds: 6,                // máximo comprable
  bedCostBase: 80000,        // costo de la 3ª camilla
  bedCostGrowth: 1.6,        // cada camilla siguiente cuesta x este factor

  // Sala de espera
  waitingSeats: 6,           // cuántos pacientes caben esperando
                             // si está llena, los nuevos no entran (clientes perdidos)

  // Guardado
  autosaveSeconds: 10,

  // Tutorial
  showTutorial: true,

  // --- ENGANCHE: combo de pacientes felices ---
  // Cada paciente atendido sin perder ninguno sube la racha y multiplica el pago.
  comboStep: 0.10,      // +10% por nivel de racha
  comboMax: 12,         // tope de racha (x2.2 aprox)

  // --- ENGANCHE: paciente VIP ---
  vipChance: 0.10,      // 10% de que un paciente sea VIP (desde nivel 2)
  vipMult: 2.6,         // paga x2.6
  vipMinLevel: 2,

  // --- ENGANCHE: ingreso pasivo al volver (idle) ---
  idlePerMinPerLevel: 850,  // $ por minuto por nivel mientras estuviste fuera
  idleCapMinutes: 120       // tope: 2 horas de acumulación
};

/* ---------- VARIEDAD VISUAL DE PACIENTES ----------
   El motor elige aleatoriamente de estas listas para que
   cada paciente se vea distinto (formas dibujadas por código).
*/
const PATIENT_STYLES = {
  skinTones:  ["#F3D9C0", "#E8C2A0", "#D2A37D", "#B07F57", "#8A5E3C"],
  hairColors: ["#2B2320", "#4A3526", "#6E4B2A", "#A88B5C", "#C9C2BB", "#7A4B3A"],
  outfits:    ["#3A4A5E", "#6E5A4E", "#4E6E5A", "#7A5060", "#505A7A", "#2A2A2A"]
};

/* ---------- NOMBRES SUGERIDOS PARA EL JUEGO ----------
   (Para la pantalla de inicio o branding. El default es "JC Medical".)
*/
const GAME_NAME = "Glow Clinic";          // nombre oficial del juego
const GAME_SUBTITLE = "by JC Medical";     // subtítulo de marca
const GAME_NAME_IDEAS = [                  // alternativas (referencia)
  "Glow Clinic",
  "Glow Clinic — Tycoon",
  "Glow Clinic: Estética Manager"
];

/* ---------- EXPORT (para uso con módulos o global) ---------- */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { TREATMENTS, CONFIG, PATIENT_STYLES, GAME_NAME, GAME_SUBTITLE, GAME_NAME_IDEAS, xpForLevel, levelUpReward };
}
