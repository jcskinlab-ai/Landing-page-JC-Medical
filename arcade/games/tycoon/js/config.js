/* ============================================================================
 * config.js — Configuración TÉCNICA del motor (no de contenido)
 * ----------------------------------------------------------------------------
 * Aquí vive lo que NO suele tocarse para balancear el juego: la paleta de
 * colores y el layout de la clínica (posiciones en el canvas). El contenido y
 * el balance (tratamientos, economía, niveles) están en data.js.
 * ==========================================================================*/

// Clave de guardado en localStorage.
const SAVE_KEY = 'glow_clinic_jc_v1';

// Paleta premium clínica.
const PALETTE = {
  white: '#FFFFFF',
  bg: '#EEF1F5',
  lightGray: '#D9DEE6',
  floor: '#E7ECF2',
  floorAlt: '#DFE5EE',
  wall: '#C9D1DD',
  metalBlue: '#2A3B52',
  metalBlueSoft: '#3C5174',
  gold: '#B9C2CB',
  goldSoft: '#D8C290',
  green: '#4CAF7D',
  yellow: '#E8B84B',
  red: '#E05B5B',
  text: '#2A3B52',
};

// Layout de la clínica (coordenadas sobre un canvas de 960x600).
const LAYOUT = {
  canvas: { w: 960, h: 600 },
  door: { x: 80, y: 560 },                  // entrada/salida de pacientes
  reception: { x: 360, y: 70, w: 240, h: 70 },

  // Sillas de la sala de espera (lado izquierdo). Deben ser >= CONFIG.waitingSeats.
  chairs: [
    { x: 130, y: 230 }, { x: 250, y: 230 },
    { x: 130, y: 350 }, { x: 250, y: 350 },
    { x: 130, y: 470 }, { x: 250, y: 470 },
  ],

  // Posiciones posibles de camillas (lado derecho). Deben ser >= CONFIG.maxBeds.
  bedSlots: [
    { x: 640, y: 200 }, { x: 850, y: 200 },
    { x: 640, y: 340 }, { x: 850, y: 340 },
    { x: 640, y: 480 }, { x: 850, y: 480 },
  ],
};

// Formatea dinero en pesos chilenos: 50000 -> "$50.000".
function fmtMoney(n) {
  return '$' + Math.round(n).toLocaleString('es-CL');
}
