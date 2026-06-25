#!/usr/bin/env node
/**
 * build.mjs — Pre-compila todos los archivos JSX a JS puro (sin Babel en el navegador).
 * Uso: node build.mjs
 * Requiere: npx (incluido con Node.js)
 */
import { execSync } from 'child_process';
import { mkdirSync } from 'fs';

mkdirSync('dist', { recursive: true });

const ESBUILD = './node_modules/.bin/esbuild';
const FLAGS = '--bundle=false --jsx=transform --jsx-factory=React.createElement --jsx-fragment=React.Fragment --target=es2019 --log-level=warning';

const FILES = [
  // Admin panel
  ['jc-admin/jc-sign',     'dist/jc-sign'],
  ['jc-admin/jc-face',     'dist/jc-face'],
  ['jc-admin/jc-admin-b',  'dist/jc-admin-b'],
  ['jc-admin/jc-admin-c',  'dist/jc-admin-c'],
  ['jc-admin/jc-copilot',  'dist/jc-copilot'],
  ['jc-admin/jc-jcm',      'dist/jc-jcm'],
  ['jc-admin/jc-admin',    'dist/jc-admin'],
  // Panel móvil
  ['jc-admin/jc-mobile',   'dist/jc-mobile'],
  // App paciente
  ['jc-proto/jc-screens-a','dist/jc-screens-a'],
  ['jc-proto/jc-screens-b','dist/jc-screens-b'],
  ['jc-proto/jc-booking',  'dist/jc-booking'],
  ['jc-proto/jc-panel',    'dist/jc-panel'],
  ['jc-proto/jc-extra',    'dist/jc-extra'],
  ['jc-proto/jc-app',      'dist/jc-app'],
];

let ok = 0, fail = 0;
for (const [src, out] of FILES) {
  try {
    execSync(`${ESBUILD} ${src}.jsx ${FLAGS} --outfile=${out}.js`, { stdio: 'pipe' });
    console.log(`✓ ${src}.jsx`);
    ok++;
  } catch (e) {
    console.error(`✗ ${src}.jsx\n${e.stderr?.toString()}`);
    fail++;
  }
}
console.log(`\n${ok} compilados${fail ? ', ' + fail + ' errores' : ''} — dist/ listo.`);
if (fail > 0) process.exit(1);
