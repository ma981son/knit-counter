[English](README.md) · [Deutsch](README.de.md) · **Español**

# knit-counter 🧶

Un contador de filas para tejer con agujas y a crochet que te muestra qué hacer en la fila en la que estás.

<p align="center">
  <img src="docs/screenshots/counter.png" width="230" alt="Contador en la fila 9 con una disminución destacada">
  <img src="docs/screenshots/rows.png" width="230" alt="Lista de filas con la fila actual marcada">
  <img src="docs/screenshots/counter-dark.png" width="230" alt="Contador con la paleta Rosadito en modo oscuro">
</p>

<p align="center">
  <img src="docs/screenshots/notification.png" width="460" alt="Notificación de Android con botones de menos y más y una barra de progreso">
</p>

<sub>Las capturas muestran la app en inglés. También está en español y alemán.</sub>

## Por qué la hice

Mientras tejía, siempre tenía el patrón abierto en una app, un contador de filas en otra y casi siempre un video de fondo. Con tanto ir y venir entre apps, era facilísimo perder la cuenta de dónde iba.

No encontré ninguna app que hiciera todo esto junto, así que hice mi propia appcita que tiene todo en un solo lugar:

- me muestra qué hacer en la fila en la que estoy
- me avisa cuando viene un aumento, una disminución u otra fila especial
- y tiene una notificación con botones −/+, para que pueda seguir viendo mi serie y aun así contar mis filas

La hice solo para mí, para tejer con agujas y a crochet, y la verdad me divertí muchísimo haciéndola 💛

## Funciones

- **La instrucción de tu fila actual**, grande y fácil de leer. Cuando una fila especial reemplaza a la normal, la fila normal se muestra debajo.
- **Filas destacadas** para aumentos, disminuciones y todo lo que no te puedes saltar. El celular vibra cuando llegas a una.
- **Conteo de puntos** por fila, incluyendo cuántos puntos ganas o pierdes.
- **Lista de filas** con todas las filas del patrón. Mantén presionada una fila para saltar a ella.
- **Código del patrón**: escribes tu patrón una sola vez en un formato corto y sencillo (ver abajo). La app lo revisa y te avisa si faltan filas, si se superponen o si algo no está bien.
- **Notificación con botones −/+** y barra de progreso, para contar filas sin salir de la app en la que estás.
- **Proyectos con varios patrones**, por ejemplo delantero, espalda y mangas de un suéter.
- **Dos paletas de colores** (Rosadito y Jarrito), modo claro y oscuro, cuatro íconos de la app y una pantalla de inicio que combina con la paleta.
- **Inglés, español y alemán.**
- Todo se guarda en el celular. Sin cuenta y sin internet.

<p align="center">
  <img src="docs/screenshots/code.png" width="230" alt="Pantalla de código con el patrón de ejemplo y su resumen">
  <img src="docs/screenshots/settings.png" width="230" alt="Configuración con idioma, apariencia, paleta e ícono de la app">
</p>

## El código del patrón

Cada línea empieza con las filas a las que se aplica, luego dos puntos y luego la instrucción. Este es el ejemplo "Cómo funciona" que viene con la app (en inglés lo ves en las capturas de arriba):

```
Cast on: 20
1-4: Elástico D1, R1. "1-4" significa filas 1 a 4
5+: Derecho (filas 5, 7, 9 …) | Revés (filas 6, 8, 10 …)
7: ! "!" al inicio destaca la fila y vibra
9, 13: ! Dism: D1, ddD, D hasta los últimos 3 ptos, 2pjD, D1 (-2)
11: Solo la fila 11: reemplaza el rango, abajo ves la fila normal
11: ! Una segunda línea para la fila 11: se muestran ambas
15, 17: ! Aum: D1, a1i, D hasta el último pto, a1d, D1 (+2)
19+: Derecho. "19+" empieza un rango nuevo y termina el de la fila 5 | Revés
24: END Rem todos los ptos. END marca la última fila
```

| Código             | Significado                                        |
| ------------------ | -------------------------------------------------- |
| `13:`              | una fila                                           |
| `1-6:`             | filas 1 a 6                                        |
| `7+:`              | desde la fila 7, hasta que empiece otro rango      |
| `13, 19, 25:`      | varias filas                                       |
| `Derecho \| Revés` | se alterna fila por fila, empezando por la primera |
| `!`                | al inicio del texto: destacar la fila              |
| `END`              | al inicio del texto: la última fila                |
| `Cast on: 66`      | puntos montados, muestra el conteo de puntos       |
| `(-2)` `(+1)`      | puntos que se pierden o se ganan en esa fila       |

Una fila sola (`11:`) gana sobre un rango (`5+:`), así que solo escribes las filas que son distintas.

**Próximamente:** la app va a entender abreviaturas de tejido como `2pjD`, `ddD` o `a1i` (en español, inglés y alemán) y va a contar los puntos sola, y el editor de código se va a mejorar.

## Tecnología

- [Expo](https://expo.dev) SDK 57, React Native 0.86, TypeScript
- Expo Router para la navegación
- Zustand con AsyncStorage para guardar proyectos y configuración
- i18next y react-i18next para los tres idiomas
- **Módulos nativos propios en Kotlin:**
  - `row-notification`: un foreground service con un diseño de notificación propio (RemoteViews), acciones −/+ y colores que siguen la paleta
  - `app-icon`: cambia el ícono de la app con activity aliases
  - `splash-theme`: define la pantalla de inicio según la paleta (API SplashScreen de Android 13+)
- **Config plugins propios** que generan los aliases de íconos, los temas de la pantalla de inicio y `local.properties` durante el prebuild

La app está hecha para Android. Las funciones nativas son solo para Android.

## Pruébala tú

Necesitas Node.js, el SDK de Android (por ejemplo con Android Studio) y un JDK 17 o más nuevo.

```bash
git clone https://github.com/ma981son/knit-counter.git
cd knit-counter
npm install
npx expo run:android
```

Esto compila una versión de desarrollo y la instala en un celular conectado o en un emulador. Para una versión más rápida sin servidor de desarrollo:

```bash
npx expo run:android --variant release
```

## Licencia

[MIT](LICENSE) © Maria Fe Sonnenberg
