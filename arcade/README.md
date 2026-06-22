# Glow Clinic — by JC Medical · Arcade

Colección de mini-juegos web con la temática de una clínica de medicina estética
facial premium (**JC Medical**, Talca, Chile). Un mismo universo, **6 sistemas de
juego distintos**, todos en Vanilla JS + HTML5 Canvas/DOM, sin frameworks, sin
backend y con todo el arte dibujado por código.

## Cómo correrlo

No necesita instalación. Abre **`index.html`** (el menú principal) en el navegador
y elige un juego. Funciona con `file://`; para mejor experiencia:

```bash
python3 -m http.server 8000   # luego abre http://localhost:8000
```

## Los juegos

| Juego | Carpeta | Género | Idea |
|---|---|---|---|
| **Glow Deck** | `games/deck/` | Roguelike de cartas | Arma un mazo de tratamientos y cumple las metas de Glow/Calma de cada caso antes de que se acabe la paciencia. |
| **Skin Defense** | `games/defense/` | Tower defense | Coloca estaciones de tratamiento para frenar arrugas, manchas y flacidez antes de que lleguen al rostro. |
| **Precision Clinic** | `games/precision/` | Habilidad / timing | Detén el marcador en el punto exacto de cada procedimiento; encadena combos perfectos. |
| **Glow Empire** | `games/idle/` | Idle / incremental | De clickear pacientes a un imperio de sucursales que producen solas. Mejoras y prestige. |
| **Triage** | `games/triage/` | Decisiones / criterio | Lee la ficha, aplica el protocolo y decide aprobar, sugerir alternativa o rechazar. |
| **Glow Clinic Tycoon** | `games/tycoon/` | Gestión / tycoon | El MVP original: atiende pacientes en camillas, cobra, sube de nivel y amplía la clínica. |

## Estructura del proyecto

```
index.html              # menú principal (hub) que enlaza los 6 juegos
shared/
  theme.css             # paleta premium clínica + componentes UI comunes
  sound.js              # sonidos sintetizados (WebAudio) reutilizables
games/
  deck/        index.html + game.js
  defense/     index.html + game.js
  precision/   index.html + game.js
  idle/        index.html + game.js
  triage/      index.html + game.js
  tycoon/      index.html + css/ + js/   (incluye su propio data.js de balance)
```

Cada juego es **autocontenido** en su carpeta y reutiliza `shared/theme.css` y
`shared/sound.js`. Así se pueden editar, ampliar o reemplazar de forma
independiente sin afectar a los demás.

## Paleta e identidad

Blanco, gris claro, azul metálico `#2A3B52` y dorado `#C4A96A`. Tratamientos:
Limpieza facial ✦, Peeling ◈, Botox ⊹, Rinomodelación ◆, Sculptra ✷. Dinero en
pesos chilenos (`$12.000`).

## Estado / progreso

Cada juego guarda su mejor marca o progreso en `localStorage` con su propia clave
(`glow_deck_best`, `skin_defense_best`, `precision_best`, `glow_empire_save`,
`triage_best`, `glow_clinic_jc_v1`). Para reiniciar uno, borra su clave desde la
consola del navegador, p. ej.:

```js
localStorage.removeItem('glow_deck_best'); location.reload();
```
