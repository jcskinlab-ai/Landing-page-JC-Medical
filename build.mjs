#!/usr/bin/env node
/**
 * build.mjs — Pre-compila todos los archivos JSX a JS puro (sin Babel en el navegador).
 * Uso: node build.mjs
 * Requiere: npx (incluido con Node.js)
 */
import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';

mkdirSync('dist', { recursive: true });

// En Windows, execSync usa cmd.exe: './node_modules/.bin/esbuild' (script sh) NO se resuelve y
// TODAS las compilaciones fallaban... mientras el script seguía imprimiendo "dist/ listo". Es una
// trampa seria: se cree haber compilado y se despliega el dist viejo. Se elige el binario según
// plataforma y se cita la ruta por si hay espacios (C:\Users\Nombre Apellido\...).
const ESBUILD_BIN = process.platform === 'win32'
  ? 'node_modules\\.bin\\esbuild.cmd'
  : './node_modules/.bin/esbuild';
if (!existsSync(ESBUILD_BIN)) {
  console.error(`✗ No se encontró esbuild en ${ESBUILD_BIN}. Corre "npm install" primero.`);
  process.exit(1);
}
const ESBUILD = `"${ESBUILD_BIN}"`;
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
  // Portal del paciente (autocontenido)
  ['jc-proto/jc-portal',   'dist/jc-portal'],
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
// No decir "dist/ listo" si no se compiló nada o hubo errores: ese mensaje optimista fue el que
// ocultó que en Windows el build llevaba tiempo compilando 0 archivos.
if (fail > 0 || ok === 0) {
  console.error(`\n✗ BUILD FALLIDO — ${ok} compilados, ${fail} errores. dist/ NO se actualizó (o quedó a medias).`);
  process.exit(1);
}
console.log(`\n${ok} compilados — dist/ listo.`);
