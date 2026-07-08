// Medique · Asigna el custom claim { superAdmin: true } a la cuenta del super-admin.
// Solo se ejecuta UNA vez, localmente, con tu service account de Firebase (NO se commitea).
//
// Pasos:
//   1) Firebase Console → ⚙ Configuración del proyecto → Cuentas de servicio →
//      "Generar nueva clave privada" → descarga el JSON (guárdalo como serviceAccount.json aquí).
//   2) En esta carpeta:  npm install
//   3) Ejecuta:          node set-superadmin.mjs ./serviceAccount.json medique.cl@gmail.com
//
// El service account es SECRETO: no lo subas a git (ya está en .gitignore).

import admin from "firebase-admin";
import { readFileSync } from "node:fs";

const svcPath = process.argv[2] || "./serviceAccount.json";
const email = (process.argv[3] || "medique.cl@gmail.com").trim().toLowerCase();

let svc;
try {
  svc = JSON.parse(readFileSync(svcPath, "utf8"));
} catch (e) {
  console.error("No pude leer el service account en:", svcPath, "\n", e.message);
  process.exit(1);
}

admin.initializeApp({ credential: admin.credential.cert(svc) });

try {
  const user = await admin.auth().getUserByEmail(email);
  // Conserva claims existentes y agrega superAdmin.
  const claims = Object.assign({}, user.customClaims || {}, { superAdmin: true });
  await admin.auth().setCustomUserClaims(user.uid, claims);
  console.log("✓ superAdmin=true asignado a", email, "(uid:", user.uid + ")");
  console.log("  El usuario debe cerrar sesión y volver a entrar para que el token tome el claim.");
  process.exit(0);
} catch (e) {
  console.error("Error:", e.message);
  process.exit(1);
}
