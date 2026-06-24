# Medique · Arquitectura y configuración (Prompt 1)

Documento de la refactorización de arquitectura. La interfaz y los colores se mantienen **idénticos**;
solo cambió la lógica subyacente, los identificadores, la validación, el feedback y los puntos de
integración con terceros.

## 1. Enrutamiento e IDs únicos

- **Enrutamiento**: la app es estática (React + Babel en el navegador, sin build ni servidor de rutas).
  No usa enrutamiento por hash. La navegación del panel es por estado (`section`, `openPatient`).
  No aplica el patrón Next.js `panel/pacientes/[ID]` porque **no hay servidor que resuelva rutas dinámicas**.
  Si se quiere deep-linking compartible, se haría con History API (`pushState` + querystring), tarea aparte.
- **IDs únicos (UUID)**: nuevo helper `window.jcmUid(prefix)` (en `jcm_shared.js`) usa `crypto.randomUUID()`
  con respaldo a timestamp+azar. Ya se usa para **pacientes**, **citas**, **servicios** y **sesiones**,
  evitando colisiones al fusionar/escalar datos. El multi-tenant ya namespacéa cada clave por `clinicId`
  (`jcm_<clinicId>_<clave>`), así que dos clínicas nunca comparten registros.

## 2. Validación de datos

- **RUT chileno**: `window.jcmFmtRut(v)` formatea `20.090.534-2` y `window.jcmValidRut(v)` valida el
  dígito verificador (módulo 11). Aplicado en Nuevo paciente y Administración.
- **Tipos por campo**: nombre/ciudad/audiencia solo letras; edad/temperatura/vencimiento/RUT solo números;
  teléfono con prefijo `+56 9` fijo no borrable. En formularios de paciente, sesión, configuración,
  colaboraciones (`colaborar.html`) y reseñas (`review.html`).
- **Sin nulls**: los guardados normalizan strings con `.trim()` y números con `parseInt`. El correo es
  opcional pero se valida su formato si viene.

## 3. Feedback de interfaz

- **Confirmación de guardado**: `window.jcmToast(texto, 'ok'|'error'|'info')` muestra un aviso visual
  reutilizable desde cualquier vista. Conectado en: alta de paciente, cita, servicio, sesión.
- **Pop-up al agregar paciente**: al crear un paciente salta el toast "Paciente \"X\" guardado".
- **Modo debug de errores**: `window.jcmError(contexto, err)` muestra el **código/mensaje exacto** del
  error (útil en la fase de prueba) y lo registra en consola.

## 4. Multi-tenant y subcuentas

- **Multi-clínica**: ya operativo (Firebase `clinics/{id}`, `users/{uid}`→{clinicId,role},
  `tenants/{clinicId}/kv/*`). Cada clínica solo lee/escribe lo suyo (ver `firestore.rules`).
- **Subcuentas (en Equipo)**: hoy el administrador crea miembros con permisos por sección y una clave
  (PIN) local para confirmar acciones. Para que una subcuenta inicie sesión con su **propio** correo
  en Firebase Auth (rol `staff` bajo la misma clínica) se reutiliza la técnica de la consola super-admin
  (app Firebase secundaria: crea el usuario, escribe `users/{uid}={clinicId, role:'staff', perms}` y
  cierra esa sesión sin afectar la del administrador). **Pendiente de prueba en vivo** antes de activarlo
  en el panel (requiere la cuenta real y reglas publicadas).

## 5. Integraciones de terceros (listas para conectar)

Las claves **nunca** van en el navegador: viven como variables de entorno del servidor (Vercel
Serverless Functions en `/api`). El cliente llama a estos endpoints; el endpoint usa la clave.

- **Agente IA · Groq** → `api/ai.js`. El panel llama `window.mediqueAI(messages, clinic)` (botón "✦ IA"
  en Agente IA → rellena el borrador con la respuesta sugerida). Sin clave, responde 503 y avisa sin romper.
- **Meta Ads** → `api/meta.js`. Devuelve gasto/leads/alcance reales para el embudo. Sin clave, el panel
  usa el gasto que el dueño carga a mano (`config.meta_spend_mes`).
- **Reservas/WhatsApp** → `api/reserva.js` (ya existía, vía n8n).

## 6. Seguridad y variables de entorno

**Ningún secreto está hardcodeado en el cliente** (verificado por búsqueda). La config web de Firebase
(`apiKey`, `projectId`) es pública por diseño y está permitida. La seguridad real la dan Firebase Auth +
las reglas de Firestore.

Variables de entorno a configurar en **Vercel → Settings → Environment Variables** (no en el código):

| Variable | Para qué | Quién la genera |
|---|---|---|
| `GROQ_API_KEY` | Agente IA (Groq) | Tú, en https://console.groq.com/keys |
| `GROQ_MODEL` (opcional) | Modelo Groq (def. `llama-3.3-70b-versatile`) | — |
| `META_ACCESS_TOKEN` | Meta Ads insights | Tú, en Meta for Developers |
| `META_AD_ACCOUNT_ID` | Cuenta publicitaria `act_…` | Tú |
| `META_API_VERSION` (opcional) | Versión Graph API (def. `v21.0`) | — |
| `N8N_WEBHOOK_URL` | Reservas → WhatsApp (n8n) | Tú |

Tras configurarlas, **redeploy** en Vercel para que las funciones las tomen. Mientras no estén, todo
sigue funcionando en modo manual/local (sin romper nada).

### Reglas de Firestore — acción pendiente
Se agregaron las colecciones públicas por clínica `collabs` y `reviews` en `firestore.rules`.
**Hay que publicar las reglas actualizadas** en Firebase Console → Firestore → Reglas para que los
formularios públicos (`colaborar.html?c=…`, `review.html?c=…`) puedan escribir y el panel leer.
