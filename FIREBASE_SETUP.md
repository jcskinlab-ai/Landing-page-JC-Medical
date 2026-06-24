# Configurar Firebase para el SaaS multi-clínica (lo haces tú, ~5–10 min)

Esto crea **un** proyecto Firebase que servirá a **todas** las clínicas que vendas.
Solo se hace una vez. No expone ningún secreto: la "config web" es pública por diseño.

## 1) Crear el proyecto
1. Entra a https://console.firebase.google.com con tu cuenta Google.
2. **Agregar proyecto** → nombre, p. ej. `jc-medical-saas` → continuar (puedes desactivar Analytics).

## 2) Activar el login (Authentication)
1. Menú izquierdo → **Build → Authentication → Comenzar**.
2. Pestaña **Sign-in method** → habilita **Correo electrónico/contraseña** → Guardar.

## 3) Crear la base de datos (Firestore)
1. Menú → **Build → Firestore Database → Crear base de datos**.
2. Modo **producción** → elige ubicación (p. ej. `southamerica-east1`).
3. Pestaña **Reglas** → borra lo que haya y pega TODO el contenido de `firestore.rules`
   (está en la raíz del proyecto) → **Publicar**.

## 4) Registrar la app web y copiar la config
1. ⚙ (arriba izq.) → **Configuración del proyecto** → sección **Tus apps** → ícono **Web `</>`**.
2. Apodo: `jcmedical-web` → **Registrar app** (no hace falta Hosting).
3. Te mostrará un objeto `firebaseConfig`, algo así:
   ```js
   const firebaseConfig = {
     apiKey: "AIza…",
     authDomain: "jc-medical-saas.firebaseapp.com",
     projectId: "jc-medical-saas",
     storageBucket: "jc-medical-saas.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abc123"
   };
   ```
4. Copia **solo el contenido entre las llaves `{ … }`** y pégalo dentro de
   `window.JCSAAS_CONFIG = { … }` en el archivo **`jcm_saas_config.js`**.

   > Pégamelo aquí en el chat si quieres y yo lo dejo puesto: estos valores
   > son **públicos** (no son una contraseña ni un token secreto), así que no
   > hay problema en compartirlos.

## 5) Listo
Al guardar y desplegar, el panel mostrará la pantalla de **crear cuenta / iniciar sesión**
por clínica, con prueba gratis de 14 días. Mientras `jcm_saas_config.js` esté vacío,
la app sigue funcionando en modo local (mono-clínica) como hoy.

## Activar el plan de una clínica que ya pagó (super-admin = tú)
Por ahora, cuando una clínica pague:
1. Firebase Console → **Firestore Database → colección `clinics`** → abre el doc de la clínica.
2. Cambia el campo **`plan`** de `trial` a **`active`** → Guardar.
(En la Fase 5 esto se automatiza con pago en línea: Webpay/Flow/Stripe.)
