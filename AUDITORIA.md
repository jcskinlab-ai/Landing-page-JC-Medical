# Auditoría integral — JC Medical (app paciente + panel clínico)

> Español de Chile · principio rector: *"todo tiene su razón de ser; no falta ni sobra nada."*

---

## Estado de ejecución (actualizado 2026-06-19)

Tras tu "hazlo todo", apliqué las correcciones que **suman sí o sí (sin importar A o B) y son zero-regresión**. Las CRÍTICAS quedan pendientes porque **requieren montar un backend** (crear proyecto, credenciales, deploy), que no puedo provisionar por ti.

**✅ Aplicado ahora (verificado):**
- **Zona horaria de Chile en la agenda** — la fecha del cupo usaba UTC y podía desfasar el día cerca de medianoche (`jc-proto/jc-data.js:155`, ahora `dKey(d)`). [Fase 3.1]
- **Sin descarte silencioso de datos** — si `localStorage` falla, ya no se traga el error: registra en consola y avisa una vez (`jcm_shared.js`, `DB.set`). [Fase 2.3 / #7]
- **Accesibilidad** — `aria-label` en botones de solo ícono (Instagram, WhatsApp, pestañas) + `aria-current` en la pestaña activa + foco visible por teclado (`JC_App.html`, `jc-proto/jc-app.jsx`). [Fase 2.5 / #11]

**⏸ Pendiente — requiere tu decisión A/B + provisión de backend (no lo puedo crear yo):**
- #1 Autorización de servidor (reemplazar el gate de cliente), #2 reglas Firestore/cifrado en reposo, #3 audit trail, #4 reserva atómica (la parte de bloqueo), #8 validación server-side. Todo esto necesita backend con Auth.

**⏸ Pendiente — lo dejo documentado a propósito (riesgo de hacerlo "a ciegas"):**
- #5 salt por usuario y #6 merge de sync sin perder escrituras: **poco valor o no testeable sin Firebase activo**. Cambiar la lógica de fusión de datos sin poder probar el camino Firebase podría corromper datos reales → mejor hacerlo cuando exista el backend y se pueda probar con 2 dispositivos.
- #9 precompilar JSX (build pnpm) y optimizar imágenes: cambia la estructura del proyecto; conviene hacerlo en una pasada dedicada para no romper el setup actual que funciona.

---

## Resumen ejecutivo

JC Medical hoy es una **app 100% de cliente**: HTML estático + React (compilado por Babel en el navegador, desde CDN) + `localStorage` como base de datos, con **sincronización opcional a Firebase Firestore** y **API opcional de YouTube**. No existe servidor propio, ni autenticación de servidor, ni autorización de servidor, ni base de datos con control de acceso por fila.

Para una app de catálogo/marketing esto sería aceptable. Para una app que maneja **datos de salud** (fichas clínicas, antecedentes, fotos antes/después, procedimientos, pagos) **no lo es**: en el modelo actual, los datos sensibles de pacientes viven sin cifrar en el dispositivo y —si activas la nube— en **un único documento de Firestore** cuya seguridad depende por completo de reglas escritas a mano. El gate del panel admin se puede saltar desde la consola del navegador.

**Esto no significa que el trabajo esté mal hecho** — la app está bien construida para un prototipo/PWA local: hay hash PBKDF2, sanitización de HTML, sesión con expiración, rate-limit básico. El punto es que **el modelo de almacenamiento no es apto todavía para PHI real en producción multi-clínica**. Antes de "lanzarlo a internet" hay que decidir la arquitectura de backend.

**Veredicto:** apto para demo/uso interno controlado. **No apto aún** para producción con datos reales de pacientes accesibles por internet, hasta resolver los 4 hallazgos CRÍTICOS.

---

## FASE 1 — Descubrimiento (mapa del sistema)

### Stack real
- **Frontend:** React 18.3.1 + ReactDOM (UMD, CDN unpkg) + **Babel Standalone 7** compilando JSX en el navegador (`JC_App.html:36-38`, `JC_Admin.html:32-34`). Aviso visible en consola: *"You are using the in-browser Babel transformer. Be sure to precompile for production"*.
- **Estilos:** CSS inline en JS + tokens de tema (`jc-proto/jc-theme.js`). Fuentes Google (Marcellus, Cormorant Garamond, Jost).
- **"Base de datos":** `localStorage` vía `window.DB` (`jcm_shared.js:5-24`), claves con prefijo `jcm_`.
- **Nube (opcional):** Firebase Firestore 10.12.2 compat (CDN gstatic), un solo doc `jcm_shared/db` (`jcm_cloud.js:88`).
- **Integraciones externas:** rss2json (noticias, `jcm_shared.js:182`), YouTube Data API v3 (estadísticas, `jcm_shared.js:240`), Google Maps embed (iframe en Home), `wa.me` (WhatsApp).
- **Gestor de paquetes:** **no aplica** — no hay `package.json`, build, ni dependencias instaladas. (El prompt asumía pnpm; la realidad es CDN + archivos sueltos. Migrar a un build con pnpm es parte del plan, ver Fase 5.)
- **Sin pruebas**, sin linter, sin CI/CD, sin tipado (JS plano).

### Estructura / rutas
- **2 documentos** servidos como estáticos:
  - `JC_App.html` → app del paciente (router por estado en `jc-proto/jc-app.jsx`, pestañas Inicio/Catálogo/Feed/Asistente/Juegos + Perfil/Panel).
  - `JC_Admin.html` → panel clínico (`jc-admin/*`).
- No hay rutas de servidor ni endpoints. La "protección" de la zona admin es un gate de UI (ver Fase 2).
- Archivos legacy presentes (`JC_App_legacy.html`, `JC_Admin_legacy.html`) y prototipos de diseño (`marfil-*.html`, `comparador.html`) — ver Fase 4 (qué sobra).

### Modelo de datos (claves `localStorage`)
`users`, `bookings`, `appointments`, `redeems`, `feedback`, `config`, `horarios_v1`, `jcm_horarios_dates`, `records`, `action_pts`, `articles`, `videos`, `news_cache`, `yt_stats`, `admin_pass`, `collabs`, `glow`, `seeded/seed_version`. Sesiones en `sessionStorage`: `jcm_session` (8 h), `jcm_admin_sess` (4 h).
- **Relaciones:** por `id`/`email` dentro de arrays JSON. Sin constraints, sin integridad referencial.
- **Policies tipo RLS:** **no existen** (no hay base de datos relacional). En Firebase, la única "policy" son las reglas de Firestore, que el README de `jcm_cloud.js:16` sugiere abrir para "lectura/escritura del doc compartido".

### Autenticación / autorización
- **Pacientes:** registro/login con PBKDF2-SHA256, 100k iteraciones (`jcm_shared.js:29-39, 71-121`). Sesión 8 h (`jcm_shared.js:46-66`).
- **Admin:** usuario+contraseña (hash PBKDF2) guardados en `localStorage.admin_pass`; sesión 4 h en `sessionStorage` (`jcm_shared.js:132-175`).
- **Autorización:** **toda en el cliente.** No hay verificación de servidor en ninguna acción.

### Variables de entorno / secretos
- No hay `.env`. La config de Firebase y la API key de YouTube se pegan en el panel y se guardan en `localStorage.config` (`jcm_shared.js:18-19`). La key de YouTube, si se usa, viaja en la URL de la llamada (`jcm_shared.js:240`).
- **Datos reales en el repo (texto plano):** datos de transferencia bancaria, RUT y razón social en `jc-proto/jc-data.js:216-224`. No es un secreto criptográfico, pero queda embebido en el bundle/zip/deploy.

### Build / deploy
- No hay build. Se sirve estático (hoy `python -m http.server`/preview en `:8753`). Cache-busting manual con `?v=33` en cada `<script>` (`JC_App.html:48-61`).

---

## FASE 2 — Auditoría por dimensiones

> Formato: **[SEVERIDAD]** hallazgo — evidencia — impacto — recomendación.

### 1. Seguridad

- **[CRÍTICO] El gate del panel admin es 100% cliente y evadible.** `jcmAdminHasSession()` solo lee `sessionStorage.jcm_admin_sess` (`jcm_shared.js:166-168`). Cualquiera con la URL del panel puede, desde la consola, ejecutar `sessionStorage.setItem('jcm_admin_sess', Date.now())` y entrar a ver/editar **todas las fichas**. El hash de la clave (`admin_pass`) también es legible y reemplazable desde `localStorage`. → **Impacto:** acceso no autorizado total a PHI. → **Rec.:** mover la autorización a un backend (la UI nunca debe ser la única barrera). Mientras tanto, no exponer `JC_Admin.html` en una URL pública adivinable.
- **[CRÍTICO] No hay autorización de servidor en ninguna acción** (no existe servidor). Ocultar botones ≠ proteger datos. → **Rec.:** ver Fase 5 (backend con sesión/rol verificado por petición).
- **[ALTO] Salt global único en vez de salt por usuario.** `_JCM_SALT` es una constante compartida (`jcm_shared.js:27`). Si se filtra la BD, todos los hashes son atacables con una sola tabla precomputada. → **Rec.:** salt aleatorio por usuario (y, idealmente, hashing en servidor).
- **[ALTO] Rate-limit de login solo en memoria.** `_loginAttempts` y `_adminAtt` son variables JS (`jcm_shared.js:69, 134`); se resetean al recargar la página → no frenan fuerza bruta real. → **Rec.:** rate-limit en servidor.
- **[MEDIO] Validación de input solo en cliente** (`jcmRegister`/`jcmLogin`, `jcm_shared.js:71-121`). Manipulable. → **Rec.:** revalidar en servidor.
- **[OK] XSS:** el contenido externo (RSS) se sanitiza con `jcmSanitize` (`jcm_shared.js:41-44, 200-210`) y React escapa por defecto. **Verificar** que no haya `dangerouslySetInnerHTML` con datos de usuario (no se encontró en los archivos revisados; confirmar en una pasada completa).
- **[N/A] CSRF / security headers / sesiones de servidor:** no aplican sin backend; pasan a ser requisitos al construirlo.

### 2. Privacidad de datos de salud (CRÍTICO)

- **[CRÍTICO] PHI sin cifrado y sin control de acceso.** Fichas, antecedentes, fotos antes/después y procedimientos viven en `localStorage` (sin cifrar) y, con la nube activa, en **un solo documento** `jcm_shared/db` (`jcm_cloud.js:88`). El instructivo sugiere reglas de Firestore abiertas (`jcm_cloud.js:16`); si quedan en `allow read, write: if true`, **cualquiera con el projectId lee y escribe toda la BD de pacientes**. → **Rec.:** datos de salud = dato sensible con protección reforzada (**Ley 21.719**, que reemplaza/actualiza la Ley 19.628); exige base legal, control de acceso, y medidas de seguridad. **Verifica la vigencia y el estado actual de la norma** antes de lanzar.
- **[CRÍTICO] Sin log de auditoría de acceso a fichas.** No se registra quién vio/editó/exportó cada ficha. Es un requisito de facto para PHI. → **Rec.:** audit trail en servidor.
- **[ALTO] Sin minimización, retención ni eliminación.** No hay política de cuánto se guarda ni cómo se borra (el "borrado" en una app de cliente no garantiza eliminación en la nube). → **Rec.:** definir retención y borrado real (servidor).
- **[ALTO] Sin gestión de consentimiento del tratamiento de datos** (distinto del consentimiento clínico del procedimiento, que sí existe). → **Rec.:** registrar consentimiento informado de tratamiento de datos.
- **[MEDIO] Cifrado en tránsito:** las integraciones usan HTTPS ✓. Falta cifrado **en reposo** (localStorage/Firestore en claro).

### 3. Integridad de datos

- **[ALTO] Sincronización con "última escritura gana" sobre claves completas.** `applyRemote` reemplaza el array entero si difiere (`jcm_cloud.js:52-64`); `pushNow` hace `set(..., {merge:true})` por clave (`jcm_cloud.js:66`). Dos dispositivos editando `bookings`/`users` casi a la vez → **se pierde una de las dos escrituras** (lost update). → **Rec.:** transacciones / merge a nivel de elemento, o backend con escritura atómica.
- **[MEDIO] Descarte silencioso posible en formularios.** Si `localStorage.setItem` lanza (cuota llena, modo privado), `DB.set` devuelve `null` y **traga el error** (`jcm_shared.js:8`). Un intake podría "perderse" sin avisar. → **Rec.:** propagar el fallo a la UI ("no se pudo guardar, reintenta").
- **[MEDIO] Sin constraints ni transacciones** (es JSON en localStorage). Puntos, canjes y precios se calculan/guardan en cliente y son manipulables desde devtools (`jcmUpdatePoints`, `jcm_shared.js:123-127`) → riesgo de fraude en fidelización con premios reales.

### 4. Usabilidad / UX

- **[OK] Mobile-first** sólido; estados de carga/recarga manejados; copy claro y profesional.
- **[MEDIO] Recarga completa de página al sincronizar** (`jcm_cloud.js:78, 103`): `location.reload()` en cada cambio remoto puede interrumpir al usuario a mitad de un formulario. → **Rec.:** aplicar cambios sin recargar (re-render de React).
- **[BAJO] Mensajes de error genéricos** en algunos `catch` silenciosos. → **Rec.:** feedback accionable.

### 5. Accesibilidad

- **[OK]** Contraste del tema "Marfil Clínico" cumple AA en texto principal; targets táctiles ≥44px en nav/botones; `prefers-reduced-motion` respetado (`JC_App.html:30`, `Reveal` en `jc-screens-a.jsx`).
- **[MEDIO] Faltan labels/aria en varios inputs e íconos-botón** (ej. botones de solo ícono en la nav y el FAB). → **Rec.:** `aria-label` en controles sin texto.
- **[BAJO] Foco visible** no siempre evidente con estilos inline. → **Rec.:** estilos de `:focus-visible`.

### 6. Rendimiento

- **[ALTO] Babel en el navegador** compila TODO el JSX en cada carga (`JC_App.html:38`) → arranque lento en móvil. → **Rec.:** precompilar (build con esbuild/vite + pnpm).
- **[ALTO] Imágenes sin optimizar.** `assets/jc-hero-v2.png` ≈1.7 MB y `assets/jc-pro.jpg` ≈1.5 MB; varias `assets/cat/*` y `trust-*` sin comprimir. → **Rec.:** WebP/AVIF + tamaños responsivos + `loading="lazy"` (ya usado en varias).
- **[BAJO] Sin caché de assets / sin service worker.**

### 7. Manejo de errores y resiliencia

- **[OK] Degradación elegante de integraciones:** sin Firebase/RSS/YouTube la app sigue con localStorage (`jcm_cloud.js:33, 110`; `jcmFetchNews` retorna `null`). Bien.
- **[MEDIO] Catches silenciosos** en toda la capa DB y cloud → fallos invisibles (cuota, JSON corrupto). → **Rec.:** logging/telemetría mínima.

### 8. Observabilidad

- **[MEDIO] Nula.** Sin logging útil, sin monitoreo de errores, sin alertas. Para producción con pacientes, es necesario al menos captura de errores (ej. Sentry) y trazabilidad de accesos (ligado al hallazgo de audit trail).

### 9. Calidad de código

- **[OK]** Código consistente, comentado en español, bien modularizado por archivos.
- **[MEDIO] Sin tipado ni tests** → regresiones difíciles de detectar (justo lo que más cuesta en una app que crece hacia multi-clínica).
- **[BAJO] Duplicación de datos de catálogo** entre `jc-proto/jc-data.js` y los prototipos `marfil-*.html` (la fuente de verdad debe ser una sola).

---

## FASE 3 — Deep dives de flujos críticos

### 3.1 Agendamiento
- **Disponibilidad:** `buildSchedule` (`jc-proto/jc-data.js:141-161`) marca `taken` con un **seed determinista** (`seed < 3`, línea 152) — es decir, los cupos "ocupados" son **demo, no reservas reales**. La disponibilidad real por fecha se gestiona en el panel (`jcm_horarios_dates`).
- **[ALTO] Riesgo de doble reserva.** No hay bloqueo/transacción al confirmar: dos pacientes pueden tomar el mismo cupo a la vez, y con la nube la última escritura pisa la otra (ver Fase 2.3). → **Rec.:** reserva atómica en servidor (o transacción Firestore) que verifique cupo en el momento.
- **[MEDIO] Zona horaria.** La fecha se arma con `toISOString().slice(0,10)` (`jc-proto/jc-data.js:155`), que es **UTC**; en Chile (America/Santiago, UTC−4/−3) puede mostrar/guardar el **día equivocado** cerca de medianoche. → **Rec.:** formatear con zona horaria de Chile explícita.
- **[MEDIO] Recordatorios/confirmaciones:** dependen de WhatsApp/correo disparados manualmente; no hay garantía de envío idempotente ni reintentos. → **Rec.:** definir si los recordatorios serán automáticos (servidor) y hacerlos idempotentes.
- **Estados del turno** (pendiente/confirmada/cancelada/atendida) existen en datos, pero su consistencia entre paciente y admin depende de la sync (frágil).

### 3.2 Pagos
- **Solo transferencia + comprobante** (`jc-proto/jc-data.js:216-224`, `cardEnabled:false`). No se procesan tarjetas → bien, no se almacenan datos de tarjeta.
- **[MEDIO] Validación del pago en cliente.** El estado "abonó/pagado" lo marca el flujo de cliente; un usuario podría manipularlo. Al ser transferencia con verificación manual del admin, el riesgo es acotado, pero **el monto y el estado deberían confirmarse en servidor** cuando exista. → **Rec.:** validar monto/estado server-side; nunca confiar en el cliente.
- **[BAJO] Datos bancarios/RUT en el bundle** (texto plano). Aceptable para datos de transferencia, pero tenlo presente al publicar/compartir el zip.

### 3.3 Panel admin
- **[CRÍTICO] Separación de privilegios inexistente en servidor** (ver Fase 2.1): el rol admin no se verifica en ninguna petición; el panel es alcanzable por cualquiera que tenga `JC_Admin.html`.
- **[ALTO] Sin audit trail** de acciones sensibles (ver/editar/eliminar/exportar fichas).
- **[MEDIO] Exportaciones** (si las hay) no quedan registradas ni restringidas.
- La data de "otros contextos" (multi-clínica) hoy **no está aislada**: un solo doc compartido = sin separación por clínica. Crítico para el modelo SaaS que buscas.

---

## FASE 4 — Necesidad y suficiencia

### Qué SOBRA (candidatos a eliminar/aislar)
- `JC_App_legacy.html` (≈167 KB) y `JC_Admin_legacy.html` (≈35 KB) — versiones antiguas. → archivar fuera del deploy.
- `marfil-home.html`, `marfil-catalogo.html`, `comparador.html` — prototipos de diseño ya integrados al proyecto React. → mover a una carpeta `/prototipos` fuera del build.
- Duplicación del catálogo (datos repetidos en prototipos vs `jc-data.js`). → fuente única.

### Qué FALTA (gaps)
- Backend con **autorización por petición** y **aislamiento por clínica** (multi-tenant).
- **Cifrado en reposo** de PHI y **audit log** de accesos.
- **Validación server-side** de auth, puntos, canjes, montos y disponibilidad.
- **Reserva atómica** (anti-doble-reserva) y **manejo de zona horaria** de Chile.
- **Política de retención/eliminación** y **consentimiento de tratamiento de datos** (Ley 21.719).
- **Build de producción** (precompilar JSX) + **optimización de imágenes**.
- **Tests** de los flujos críticos (agendar, login, canje) y **observabilidad** (captura de errores).
- **`aria-label`** en controles de solo ícono.

---

## FASE 5 — Plan de acción priorizado

| # | Hallazgo | Sev. | Esfuerzo | Impacto | Orden |
|---|----------|------|----------|---------|-------|
| 1 | Backend con autorización de servidor + aislamiento por clínica (reemplaza el gate de cliente) | CRÍTICO | Alto | Máximo | 1 |
| 2 | Bloquear reglas de Firestore / cifrado en reposo de PHI | CRÍTICO | Medio | Máximo | 2 |
| 3 | Audit trail de acceso a fichas | CRÍTICO→ALTO | Medio | Alto | 3 |
| 4 | Reserva atómica anti-doble-reserva + zona horaria Chile | ALTO | Medio | Alto | 4 |
| 5 | Salt por usuario + rate-limit y validación en servidor | ALTO | Medio | Alto | 5 |
| 6 | Sync sin perder escrituras (merge por elemento / transacción) | ALTO | Medio | Alto | 6 |
| 7 | No descartar datos en silencio (errores visibles en formularios) | MEDIO | Bajo | Alto | 7 |
| 8 | Validación server-side de puntos/canjes/montos | MEDIO | Medio | Medio | 8 |
| 9 | Build de producción (pnpm + precompilar JSX) + optimizar imágenes | ALTO(perf) | Medio | Alto | 9 |
| 10 | Retención/eliminación + consentimiento de datos (Ley 21.719) | ALTO(legal) | Medio | Alto | 10 |
| 11 | `aria-label` + foco visible | MEDIO/BAJO | Bajo | Medio | 11 |
| 12 | Observabilidad (captura de errores) | MEDIO | Bajo | Medio | 12 |
| 13 | Limpiar legacy/prototipos del deploy + fuente única de catálogo | BAJO | Bajo | Bajo | 13 |

**Agrupación:**
- **(a) Arreglar YA (antes de exponer datos reales a internet):** #1, #2, #3 — y mientras tanto, **no publicar `JC_Admin.html` en URL pública** ni activar Firebase con reglas abiertas.
- **(b) Corto plazo:** #4–#10.
- **(c) Mejoras:** #11–#13.

### La decisión de fondo (necesito tu confirmación)
Casi todos los CRÍTICOS nacen de la misma raíz: **no hay backend**. Antes de ejecutar, hay que elegir el camino:
1. **Backend gestionado (recomendado para SaaS multi-clínica):** Supabase o Firebase **con Auth + reglas/RLS reales** + funciones de servidor. Resuelve autorización, aislamiento por clínica, audit log y validación server-side de una vez.
2. **Seguir 100% local (sin internet/multi-dispositivo):** solo válido si cada clínica usa un dispositivo y los datos **nunca** salen a una nube abierta. Limita el producto, pero evita la mayoría de los riesgos de exposición.

---

## Auto-chequeo
- [x] 9 dimensiones cubiertas + 3 deep dives (agenda, pagos, panel).
- [x] Cada hallazgo CRÍTICO/ALTO con evidencia `archivo:línea`.
- [x] Plan priorizado (tabla + agrupación a/b/c).
- [x] No se propusieron cambios fuera de lo justificado.
- [x] **No se ejecutó nada.** A la espera de tu aprobación para empezar por el #1.

> Nota legal: no soy asesor jurídico. La referencia a la Ley 19.628 y la Ley 21.719 es orientativa; **verifica con un abogado el estado y la vigencia actual** de la normativa de protección de datos y datos sensibles de salud en Chile antes de lanzar.
