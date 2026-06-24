# Design

## Color Palette

### Tema principal: Marfil Clínico (claro · default)

```
--bg:          #F5F2EC   /* marfil cálido — fondo principal */
--bg2:         #ECE8DF   /* marfil oscuro — fondos secundarios */
--surface:     #FFFFFF   /* blanco puro — tarjetas, modales */
--surface2:    #F3EFE8   /* superficie elevada suave */
--text:        #1A1A14   /* tinta oscura cálida */
--mute:        #5C5A50   /* texto secundario */
--faint:       rgba(26,26,20,.42)   /* texto terciario / placeholders */
--line:        rgba(20,20,15,.12)   /* bordes y divisores */
--line-soft:   rgba(20,20,15,.06)   /* separadores sutiles */
--accent:      #54707F   /* pizarra azul — acción primaria, links */
--accent-deep: #3F5663   /* pizarra oscura — hover */
--accent-soft: rgba(84,112,127,.12) /* fondo de chips/badges de acento */
--gold:        #B79A5E   /* champagne — detalles premium (páginas marketing) */
--silver:      #8A929B   /* plateado neutro — detalles en app de paciente */
--on-accent:   #FFFFFF   /* texto sobre fondo accent */
```

### Tema alternativo: Editorial (oscuro)

```
--bg:          #0D0D0D
--surface:     #141414
--text:        #F2EDE6
--textMute:    rgba(242,237,230,.52)
--accent:      #8B9EB0
--gold:        #B9C2CB   /* plateado frío en modo oscuro */
```

### Escala semántica de uso

| Rol | Token | Uso |
|---|---|---|
| Fondo página | `--bg` | Body, shell de la app |
| Superficie | `--surface` | Tarjetas, sheets, nav |
| Primario texto | `--text` | H1–H3, body copy |
| Secundario | `--mute` | Subtítulos, metadata |
| Acción | `--accent` | CTAs, links, indicadores activos |
| Premium | `--gold` | Eyebrows, separadores, nav dot activo (marketing) |
| Líneas | `--line` | Bordes de tarjeta, separadores de sección |

## Typography

### Fuentes

| Rol | Familia | Peso | Uso |
|---|---|---|---|
| Títulos | Marcellus | 400 | H1–H3, nombres de tratamientos, hero headline |
| Flourish | Cormorant Garamond italic | 400–600 | Énfasis editoriales, .flourish, taglines |
| UI / body | Jost | 300 / 400 / 500 / 600 | Todo el texto funcional, buttons, labels |

```css
--serif: 'Marcellus', Georgia, serif;
--ital:  'Cormorant Garamond', Georgia, serif;
--sans:  'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Escala tipográfica (app 430px)

| Token | Tamaño | Línea | Uso |
|---|---|---|---|
| Display | 48px / serif | 1.02 | Hero H1 |
| H2 section | 31px / serif | 1.08 | Cabeceras de sección |
| H3 card | 18–20px / serif | 1.2 | Títulos de tarjeta/tratamiento |
| Body | 13.5px / sans 300 | 1.7 | Párrafos de descripción |
| Label | 10–11px / sans 500 | — | Eyebrows, badges, uppercased labels |
| Micro | 9–9.5px / sans | — | Timestamps, metadata, tracking .3em |

### Reglas

- `letter-spacing: .3em; text-transform: uppercase` para eyebrows y labels.
- `.flourish` = `font-family: var(--ital); font-style: italic; color: var(--accent)` — usar para énfasis editoriales, no para UI funcional.
- Títulos de sección: siempre Marcellus, `font-weight: 400`, `letter-spacing: -.01em`.

## Spacing & Layout

- **Border radius**: `14px` default para tarjetas; `999px` para pills/chips; `4px` para botones primarios.
- **Frame de app**: 430×min(900px, 94vh), `border-radius: 32px`, centrado en desktop.
- **Ease global**: `cubic-bezier(.22,.1,.36,.1)` — suave, con salida expo.
- **Grid de sección**: padding horizontal `16–20px`; gap entre elementos `12–16px`.
- **Tarjetas de tratamiento**: `border: 1px solid var(--line)`, `box-shadow: 0 10px 30px -20px rgba(40,38,30,.35)`.

## Components

### Botón primario
```css
background: var(--text); color: var(--bg);
border: 1px solid var(--text); border-radius: 4px;
font: 500 10.5px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase;
padding: 14px 22px;
transition: .3s var(--ease);
/* hover → background: transparent; color: var(--text) */
```

### Botón ghost
```css
background: transparent; color: var(--mute);
border: 1px solid var(--line); border-radius: 4px;
/* hover → color: var(--text); border-color: var(--text) */
```

### Chip / Badge
```css
background: var(--accent-soft); color: var(--accent);
border: 1px solid rgba(84,112,127,.2); border-radius: 999px;
font: 500 9px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase;
padding: 5px 10px;
```

### Eyebrow (encabezado de sección)
```css
display: flex; align-items: center; gap: 10px;
/* línea decorativa: width 24px, height 1px, background var(--gold) */
/* texto: 9.5px, 400 weight, letter-spacing .3em, uppercase, color var(--accent) */
```

### Topbar de la app (scrolled)
```css
background: rgba(245,242,236,.86); backdrop-filter: blur(16px);
border-bottom: 1px solid var(--line);
```

### Progress bar
```css
height: 2px; background: linear-gradient(90deg, var(--accent), var(--gold));
```

## Motion

- **Ease global**: `cubic-bezier(.22,1,.36,1)` — expo out.
- **Reveal**: `opacity 0 → 1, translateY(26px) → 0`, duración `0.8s`.
- **Hero entrance**: `heroRise` — translateY(32px) → 0, 1.1s.
- **Atención**: `jcAttn` — scale bounce sutil para CTAs.
- **Chevron bounce**: `bounce` keyframe, `1.9s` infinito — scroll hint del hero.
- Siempre incluir `@media (prefers-reduced-motion: reduce)` que elimina transform/opacity y deja transiciones instantáneas.

## Surfaces & Register

| Superficie | Register | Tipografía dominante | Tono de color |
|---|---|---|---|
| marfil-home.html | brand | Marcellus + Cormorant | Marfil + champagne `--gold` |
| marfil-catalogo.html | brand | Marcellus + Jost | Marfil + pizarra |
| JC_App.html | product | Jost (UI) + Marcellus (títulos) | Marfil + plateado `--silver` |
| JC_Admin.html | product | Jost exclusivo | Editorial oscuro `#0E131B` |

## Logo

- Marca compacta: `assets/logo-jc-mark-navy.png` (Marfil Clínico) / `assets/logo-jc-mark-white.png` (Editorial)
- Lockup: `assets/logo-jc-lockup-navy.png` / `assets/logo-jc-lockup-white.png`
- Texto: `"jc"` serif itálica minúscula + `"medical"` sans tracking `.34em`
