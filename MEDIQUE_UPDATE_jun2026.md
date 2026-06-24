# Medique · Estado del Proyecto — Update junio 2026

## ✅ COMPLETADO (v40–v46)

### v40 — Arquitectura SaaS multi-clínica (base)
- Decisión de backend: Firebase Auth + Firestore
- `jcm_saas.js` — motor multi-tenant: registro con 14 días trial, login, logout, reset de clave, aislamiento por `clinicId` en Firestore (`tenants/{clinicId}/kv/*`)
- `jcm_saas_config.js` — config pública Firebase (projectId `medique-8dbf6`)
- `firestore.rules` — cada clínica solo lee/escribe sus propios datos; nadie cambia su propio plan/trial

### v41 — SaaS Fase 2 verificada en vivo
- `SaasGate` en panel: login / registro / recuperar clave / bloqueado / app
- Verificado contra Firebase real: registro crea `clinics/{id}` + `users/{uid}`; DB se aisla por clínica en localStorage

### v42 — Fases 3 y 4
- `publishProfile()` escribe perfil público en `tenants/{c}/public/profile`
- `submitBooking()` + `fetchBookings()` (reservas sin login por `?c=clinicId`)
- `super.html` (`/admin`) — consola super-admin: ver clínicas, activar/suspender/+14d. Solo `medique.cl@gmail.com` tiene acceso

### v43 — Dominios separados en vivo
- `medique.cl` = plataforma SaaS (panel, admin, reserva)
- `jcmedical.cl` = solo la app de pacientes
- Split por `vercel.json` con redirects (no rewrites — filesystem gana sobre rewrites en `/`)
- `agendar.html` multi-clínica por `?c=clinicId`
- Importación de reservas web al panel automática (`importWebBookings`)

### v44 — JC Medical operativa + super-admin funcional
- Super-admin: **"+ Nueva clínica"** (app Firebase secundaria, no cierra sesión del admin), toggle "App JC", botón "Link reserva"
- Pestaña "App JC Medical" exclusiva (visible solo si `clinic.jcApp === true`)
- `jc-mobile.jsx` conectado al SaaS (login clínica + clave unificada `appointments`)
- Eliminación de clínica desde /admin: botón **Eliminar** por fila con doble confirmación (escribe "ELIMINAR"); borra `clinics/{id}` + `users/{ownerUid}`; bloqueado para JC Medical

### v45 — Rebrand Medique + aislamiento de datos
- Logo `assets/medique-mark.svg` (M + línea creciente), texto "medique" en sidebar
- Link de reserva en Configuración = `/reservar?c=clinicId` por clínica
- `scopeClinicData()`: vacía pacientes/citas/equipo/marketing/campañas para clínicas no-base antes de montar el panel
- Persistencia por clínica: pacientes (`DB 'patients'`) y citas (`DB 'appointments'`) con `savePatients`/`saveAppts`
- `clinicDisplayName()` + `clinicAvatarSrc()`: nombre y avatar según clínica activa
- Dashboard sin datos demo en SaaS

### v46 — Onboarding + logo real + eliminación de clínicas
- **OnboardingWizard** 3 pasos: datos clínica (nombre / dirección / WA / horario) → primer profesional → gasto Meta opcional. Se salta si es JC Medical (base) o ya completó el onboarding (`DB 'onboarded_v1'`)
- `jcm_shared.js cfg()`: defaults de dirección/WA/horarios ahora **vacíos** para clínicas nuevas; JC Medical los hereda del seed solo si `isBase`
- Logo PNG real `assets/medique-logo.png` (M1 navy + línea plateada) en badge crema sobre sidebar y onboarding
- Firestore rules: `allow delete: if isSuper()` para `clinics` y `users`

---

## 🔧 PENDIENTE — 17 issues identificados en prueba (clínica Karenina)

### Panel · Agenda
1. **Bug 08:00/20:00** — volvió a aparecer; las celdas de inicio y fin no tienen doble ranura de 30 min. Corregir la lógica de `isHourLine`/`wkGridH` nuevamente.

### Panel · Pendientes
2. **Seguimientos demo** — María González, Antonia Vera, Camila Soto, Valentina Pérez aparecen en clínicas nuevas. `pendientesFollowUps` lee `CADMIN.fidelity` que no se limpió en `scopeClinicData`; dejarlo en `[]` para no-base.

### Panel · Servicios
3. **Sin opción de crear servicios** — clínicas nuevas ven catálogo vacío sin botón "+ Nuevo servicio". Agregar CRUD completo: nombre, descripción, precio, duración, categoría (categorías editables, no fijas).

### Panel · Agente IA
4. **Muestra conversaciones demo** — Camila Rojas, María Soto, Javier Díaz. En clínicas nuevas debe mostrar pantalla vacía con botón "Conectar WhatsApp" y pasos de configuración.

### Panel · Automatizaciones
5. **Campo Google Review genérico** — reemplazar el input de URL por un formulario propio por clínica. URL auto-generada `medique.cl/review?c=clinicId`; el formulario tiene sistema de estrellas (1–5), comentario y nombre/teléfono del paciente; las reseñas llegan al panel de la clínica.

### Panel · Colaboraciones
6. **Formulario no es por clínica** — `medique.cl/colaborar.html` es global. Necesita `?c=clinicId` para que las solicitudes lleguen a la clínica correcta.

### Formulario de colaboraciones (público)
7. **Validaciones de campos** — `+569` fijo (no borrable) solo números; Nombre solo letras; Ciudad solo letras; "¿Dónde se ubica tu audiencia?" solo letras; cada campo valida su tipo correspondiente.

### Panel · Fidelidad
8. **Datos demo** — 96% retención, 1.040 puntos, 3 miembros oro en clínicas nuevas → en 0. Agregar **toggle on/off** del sistema de fidelidad y opción de editar puntos asignados por procedimiento (configurable por clínica).

### Panel · Integraciones
9. **Texto incorrecto** — subtítulo "Conecta tus herramientas a JC Medical" → "a Medique". Eliminar el aviso "En el prototipo las conexiones son simuladas…". Mostrar los botones de plataformas sin ninguna conexión activa — cada clínica conecta las suyas.

### Panel · Reportes
10. **Datos demo** — $16.2MM, $238.000 ticket promedio, 96% retención → en 0 para todas las clínicas incluyendo JC Medical (empiezan datos reales desde ahora).

### Panel · Administración
11. **Placeholder con datos reales** — RUT muestra `78.373.211-4` (de JC). Cambiar a `xx.xxx.xxx-x`; Razón Social a `Ej: Nombre SpA`. Campo RUT solo acepta números. Plan/suscripción se auto-rellena: cuentas demo → "Demo".

### Panel · Configuración — Datos de la clínica
12. **Datos de JC en otras clínicas** — nombre "JC Medical", dirección "1 Poniente 1258 Talca", profesional "Juan Claudio Parra", WA "+56997880877" aparecen en clínicas nuevas. Deben ser propios de cada clínica y vacíos para las nuevas.

### Panel · Configuración — Indicaciones post tratamiento
13. **Plantillas de JC en otras clínicas** — Neuromodulación/Bioestimulación/Armonización son exclusivas de JC Medical. Para clínicas nuevas partir en blanco + botón "+ Nueva plantilla".

### Panel · Nuevo paciente
14. **Validaciones y formato** — Nombre solo letras; RUT formato chileno `20.090.534-2` (puntos + guión, solo números); Edad solo números; Teléfono prefijo `+56 9` fijo (no borrable) solo números; Correo opcional.

### Panel · Nueva sesión
15. **Procedimiento = campo libre** → reemplazar por desplegable con los servicios creados en "Servicios", agrupados por categoría. También: Fecha de vencimiento solo números; Temperatura solo números; botón "Imprimir" debe funcionar e imprimir la info textual de la sesión (sin mapa facial ni fotos), estilo ficha clínica.

### Onboarding · Horario de atención
16. **Campo libre → selector estructurado** — días seleccionables (Lun–Dom, con toggle activar), horarios tipeados por día, posibilidad de horarios distintos semana vs fin de semana; campo WhatsApp con `+569` fijo (no borrable) solo números.

### Global
17. **"JC Medical" en textos genéricos** — revisar y reemplazar cualquier mención fija a "JC Medical" en secciones que no son la base (integraciones, subtítulos, mensajes de estado).

---

## 📁 Versiones actuales de archivos clave

| Archivo | Versión |
|---|---|
| `jc-admin/jc-admin.jsx` | ?v=94 |
| `jc-admin/jc-admin-b.jsx` | ?v=93 |
| `jc-admin/jc-admin-c.jsx` | ?v=96 |
| `jcm_saas.js` | ?v=6 |
| `jcm_shared.js` | ?v=72 |
| `jcm_saas_config.js` | ?v=4 |
| `super.html` | sin versión (JS puro) |

---

## 🏗️ Arquitectura en producción

```
medique.cl/panel   → JC_Admin.html     (panel clínico)
medique.cl/admin   → super.html        (consola super-admin, solo medique.cl@gmail.com)
medique.cl/reservar→ agendar.html      (reserva directa, ?c=clinicId)
jcmedical.cl/      → JC_App.html       (app pacientes JC Medical)
jcmedical.cl/movil → JC_Mobile.html    (confirmación móvil)
```

Firebase project: `medique-8dbf6` · Reglas Firestore: publicadas (con `delete: if isSuper()`)

---

## 🔐 Seguridad aplicada
- WhatsApp token / secrets: **jamás** en código cliente
- Firebase web config (apiKey, projectId): pública por diseño — seguridad real en Auth + Rules
- Super-admin: solo `medique.cl@gmail.com` puede listar/modificar/eliminar clínicas
- Eliminación de clínica requiere escribir "ELIMINAR" (doble confirmación); JC Medical no muestra el botón

---

*Próxima fase: ejecutar los 17 issues pendientes (datos demo aislados, validaciones de formularios, CRUD de servicios, onboarding estructurado)*
