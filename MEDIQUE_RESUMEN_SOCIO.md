# Medique — Resumen del proyecto (para revisión técnica)

**Qué es:** SaaS multi-clínica para clínicas de medicina estética. Una sola plataforma sirve a muchas clínicas, cada una con sus datos aislados. Nace del producto original de JC Medical (Talca).

**Dominios (mismo proyecto Vercel):**
- `medique.cl` → plataforma SaaS: `/panel` (panel clínico), `/admin` (super-admin), `/reservar` (reserva pública)
- `jcmedical.cl` → app de pacientes de JC Medical: `/app`, `/movil`

---

## Stack
- **Frontend:** HTML estático + **React 18 + Babel Standalone** (JSX compilado en el navegador, sin build). Hooks vía `window.*`.
- **Backend:** sin servidor propio. **Firebase** (Auth + Firestore) + **Vercel Serverless Functions** (`/api/*`) para integraciones. **n8n** para notificaciones WhatsApp.
- **Deploy:** GitHub (`jcskinlab-ai/Landing-page-JC-Medical`) → auto-deploy a Vercel (proyecto `medical-cl`). Firebase project `medique-8dbf6`.

## Base de datos (Firestore) — aislamiento multi-tenant
Aislamiento **por ruta** (no por campo), reforzado por reglas de seguridad:
- `clinics/{clinicId}` — perfil, plan, prueba (`plan`, `trialEnds`, `ownerUid`).
- `users/{uid}` → `{ clinicId, role }` — mapea cada usuario a su clínica.
- `tenants/{clinicId}/kv/{clave}` — **datos privados** de la clínica (agenda, pacientes, caja, inventario, servicios…). Una clave por "tabla".
- `tenants/{clinicId}/public/profile` — perfil público (marca, dirección, horarios, **servicios**) para la reserva/app.
- `tenants/{clinicId}/bookings|collabs|reviews/{id}` — formularios públicos (reservas, colaboraciones, reseñas).

Cliente: además se namespacéa `localStorage` como `jcm_<clinicId>_<clave>`, con sincronización pull/push y `onSnapshot` a Firestore. Sin login (modo `?c=clinicId`) carga solo el perfil público.

## Seguridad (auditoría aplicada)
- **Reglas Firestore:** cada usuario solo lee/escribe su `clinicId` (`myClinic() == clinicId`). El `clinicId` del usuario **no se puede cambiar** (evita robo de tenant). Una clínica **no** puede modificar su propio `plan/trial`.
- **Registro con aprobación:** las cuentas nuevas nacen `plan='pending'` (regla obligatoria) y **no pueden usar el panel** hasta que el super-admin las aprueba en `/admin`. Evita registros ilimitados / auto-activación.
- **Super-admin** por **custom claim** `superAdmin:true` (set vía Admin SDK; no se puede auto-asignar) — con correo `medique.cl@gmail.com` como respaldo temporal.
- **Secretos:** ninguno en el cliente. La config web de Firebase es pública por diseño. Claves de **Groq** (agente IA) y **Meta Ads** viven en variables de entorno de Vercel; los endpoints `/api/ai` y `/api/meta` las usan del lado servidor.
- **`/api/ai`** exige el **ID token de Firebase** del usuario (verificación RS256 contra llaves de Google) → solo usuarios logueados; nadie quema créditos desde fuera. CORS restringido a los dominios propios.
- **Contraseñas locales:** PBKDF2 con **salt aleatorio por usuario**.
- **CSP + X-Frame-Options + X-Content-Type-Options** en todas las páginas.
- **App Check (reCAPTCHA v3):** código listo, se activa al cargar el site key (anti-bots en formularios públicos). Pendiente de habilitar.

## Funcionalidades del panel
Dashboard con **embudo de marketing + ROAS real** (gasto/leads/mensajes/vendidos, conexión a Meta Ads en vivo o carga manual), Agenda (día/semana), Pacientes (fichas, sesiones, impresión), Servicios (CRUD propio), Inventario, Caja, Equipo, Marketing, **Agente IA (Groq) por WhatsApp**, Automatizaciones, Colaboraciones (formulario editable por clínica), Fidelidad, Integraciones (conectar Meta por clínica), Reportes, Administración, Configuración. **Reserva online por clínica** (`/reservar?c=…`, muestra solo SUS servicios) + **app de pacientes** + **app móvil de confirmación**.
- **Enrutamiento:** URL por sección y por paciente (`/panel/inventario`, `/panel/pacientes/<id>`) — compartible/recargable.
- **Onboarding:** asistente de bienvenida que configura todo (datos, RUT, profesionales, servicios, inventario) dentro de una ventana al primer ingreso.
- IDs únicos (UUID), validaciones (RUT chileno módulo 11, teléfono +56 9, tipos por campo), confirmaciones de guardado.

## Pendiente / decisiones abiertas (para revisar)
1. **2FA en dispositivo nuevo** — diseñado, falta decidir canal (email vía n8n + Admin SDK, o TOTP nativo de Firebase/Identity Platform).
2. **App Check** — habilitar reCAPTCHA v3 y, tras verificar, activar *enforcement* en Firestore.
3. **Backups de Firestore** (plan Blaze) + **PITR**.
4. **Pasarela de pagos** (Webpay/Flow/Stripe) — aún no definida; hoy los planes se activan a mano en `/admin`.
5. **Cumplimiento de datos de pacientes** (Ley 19.628 / 21.668 CL): consentimiento, retención, export.
6. Sugerido: 2FA en la cuenta super-admin (Gmail) y revisión final con `/code-review ultra`.

> Arquitectura deliberada: app estática + Firebase, **sin servidor propio**, para mantener costo y complejidad bajos. La seguridad real vive en las **reglas de Firestore** + **Auth** + (próximamente) **App Check**, no en el código cliente.
