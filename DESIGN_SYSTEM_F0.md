# Medique · Design System — Fase 0: Inventario + Propuesta
> Dirección: SaaS clínico premium (listón Linear / Vercel / Stripe). Denso pero respirado,
> jerarquía impecable, precisión clínica. Datos primero. Stack real: React 18 + estilos
> inline con tokens `T` (sin Tailwind). Rollout gateado a Los Medique.

---

## 1 · Inventario (estado actual, medido en el código)

**Lo que ya existe y se conserva:**
- 15 temas en `window.JCTHEME` con estructura de tokens compartida (`bg, surface, line, text, textMute, accent, gold, shadow…`) — base sólida, claro y oscuro ya resueltos.
- Tipografías definidas: Marcellus (display), Cormorant (énfasis), Jost (UI). Correctas para "clínico premium"; el problema no son las fuentes sino la falta de escala.
- Componentes base reales: `AdBtn, AdModal, AdField, AdSwitch, AdTag, SecHead, CajaCard, Avatar, Empty2, AdminKeyModal, MiniCalendar, Toast`.

**La deuda (por qué hoy no parece "caro"):**
| Medición | Valor actual | Debería ser |
|---|---|---|
| Declaraciones `fontSize` inline | **1.274** en 3 archivos | salen de una escala |
| Tamaños de fuente distintos | **16+** (8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 15, 20…) | **8** |
| Valores de `gap` distintos | **10+** (4,6,7,8,9,10,11,12,14,18) | **5** (escala 4px) |
| Radios distintos | **7** (6,7,8,9,10,12,999) | **4** |
| Estados hover/focus | esporádicos, a mano | sistemáticos en cada componente |
| Foco de teclado visible | casi inexistente | anillo de foco estándar |
| Skeletons de carga | 0 | patrón único reutilizable |
| Colores semánticos | hex repetidos a mano (`#1F8A5B` ×N, `#C0285A` ×N, `#C9A227` ×N) | tokens con nombre |

**Diagnóstico en una frase:** los materiales son buenos; lo que falta es **disciplina de sistema**. El ojo detecta las 16 escalas de texto y los 7 radios aunque no sepa por qué — eso es lo que hoy "no se ve caro".

---

## 2 · Principios (los 5 que gobiernan toda decisión)

1. **Datos primero.** La tipografía UI optimiza lectura de tablas/listas densas: Jost 13px cuerpo, números tabulares donde haya cifras. El serif (Marcellus) queda SOLO para display: título de sección y cifras protagonistas — nunca en controles ni tablas.
2. **Denso pero respirado.** Densidad por fila compacta (alto 40–44px en listas), aire por márgenes de sección generosos (24–32px). Nunca al revés.
3. **Una sola voz de acento.** Pizarra `T.accent` para acción/activo. Verde/rojo/ámbar SOLO para estado clínico-financiero (confirmado/ingreso, anulado/egreso, pendiente). Nada decorativo de color.
4. **Todo estado existe.** Cada componente nace con hover, focus visible, disabled y (si carga datos) loading skeleton + vacío con acción. Sin excepciones.
5. **Movimiento discreto.** 150–200ms ease-out, transform/opacity solamente. El hover-lift máximo: 1px. Nada "rebota".

---

## 3 · Tokens propuestos (objeto `DS`, conviven con `T`)

Se agrega un objeto global `window.JCDS` (escala pura, independiente del tema; los colores siguen viniendo de `T`, así los 15 temas funcionan sin tocarse):

```js
window.JCDS = {
  // Tipografía — 8 pasos, roles con nombre (px)
  ft: {
    display: 30,   // Título de página (Marcellus 400) — antes 28–42 dispersos
    stat:    28,   // Cifra protagonista de KPI (Marcellus)
    title:   16,   // Título de tarjeta/sección (Jost 600)
    body:    13,   // Texto por defecto, filas, formularios (Jost 400/500)
    sub:     12,   // Secundario, metadata (Jost 400)
    label:   10.5, // Labels de campo, encabezados de tabla (Jost 500, tracking .06em)
    eyebrow: 10,   // Kicker de sección (Jost 500, uppercase, tracking .14em) — se BAJA de .28em
    micro:   9.5   // Timestamps, footnotes
  },
  // Espaciado — escala 4px estricta
  sp: [0, 4, 8, 12, 16, 24, 32, 48],        // sp[1]…sp[7]
  // Radios — 4 valores
  r: { ctl: 8, card: 12, panel: 16, pill: 999 },
  // Elevación — 3 niveles (color desde T.shadow para respetar tema)
  el: { flat: "none", raised: "0 1px 3px rgba(0,0,0,.10)", overlay: "0 16px 48px -16px rgba(0,0,0,.35)" },
  // Semánticos (nombres únicos para los hex hoy repetidos a mano)
  ok: "#1F8A5B", danger: "#C0285A", warn: "#C9A227", info: "#2E7FB0",
  okBg: "rgba(31,138,91,.10)", dangerBg: "rgba(192,40,90,.10)", warnBg: "rgba(201,162,39,.12)",
  // Movimiento
  dur: ".18s", ease: "cubic-bezier(.22,1,.36,1)",
  // Foco accesible (AA): anillo de 2px con offset, mismo en claro/oscuro
  focus: (T) => "0 0 0 2px " + T.bg + ", 0 0 0 4px " + T.accent
};
```

**Decisiones de dirección (vs. lo desplegado ayer):**
- El hero de 42px con eyebrow `.28em` **se modera**: título de página a 30px, tracking de eyebrows a `.14em`. Menos revista, más instrumento. La fecha grande deja de ser protagonista; los **datos** lo son.
- El serif se restringe a display y cifras KPI (regla de "confianza clínica": los controles hablan en sans).
- Tablas/listas: alto de fila 40–44px, bordes `lineSoft`, hover con `bg` sutil (no lift en filas de tabla; lift solo en cards clickeables).

---

## 4 · Estados estándar (contrato de cada componente de Fase 1)

| Estado | Especificación |
|---|---|
| hover | fondo `chipBg` o borde `accent66`; transición `.18s`; lift 1px solo en cards |
| focus-visible | `boxShadow: DS.focus(T)` — visible siempre, teclado incluido |
| active | `transform: scale(.985)` |
| disabled | `opacity: .45; cursor: not-allowed`; sin hover |
| loading | skeleton: bloque `chipBg` con animación de opacidad 1.2s (nuevo componente `Skel`) |
| vacío | icono línea + 1 frase + acción primaria (patrón `Empty2` mejorado) |
| error | texto `DS.danger` + borde `danger` en el campo + mensaje accionable |

---

## 5 · Plan Fase 1 (si apruebas esta Fase 0)

Rediseño **drop-in** de los componentes base (misma API, sin tocar lógica): `AdBtn` (4 variantes × 5 estados) · `AdField`/inputs · `AdTag`/chips · `CajaCard`→`StatCard` · `SecHead` (nuevo eyebrow) · patrón de fila de tabla/lista · `AdModal` · `Skel` (nuevo) · `Empty2`. Todos gateados: con `lux` usan `JCDS`, sin `lux` quedan como hoy. Compilo, despliego a Los Medique, y me das feedback con las pantallas reales.

Fase 2 aplicará el sistema pantalla por pantalla empezando por el Dashboard (incluye re-calibrar lo de ayer al nuevo tono) → Ficha → Agenda. Fase 3: skeletons en vistas con fetch, estados vacíos con acción, QA claro/oscuro, teclado.
