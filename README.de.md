[English](README.md) · **Deutsch** · [Español](README.es.md)

# knit-counter 🧶

Ein Reihenzähler zum Stricken und Häkeln, der dir zeigt, was in der Reihe zu tun ist, in der du gerade bist.

<p align="center">
  <img src="docs/screenshots/counter.png" width="230" alt="Zähler in Reihe 9 mit hervorgehobener Abnahme">
  <img src="docs/screenshots/rows.png" width="230" alt="Reihenliste mit markierter aktueller Reihe">
  <img src="docs/screenshots/counter-dark.png" width="230" alt="Zähler in der dunklen Rosadito-Palette">
</p>

<p align="center">
  <img src="docs/screenshots/notification.png" width="460" alt="Android-Benachrichtigung mit Minus- und Plus-Knopf und Fortschrittsbalken">
</p>

<sub>Die Screenshots zeigen die App auf Englisch. Sie gibt es auch auf Deutsch und Spanisch.</sub>

## Warum ich das gemacht habe

Beim Stricken hatte ich immer die Anleitung in einer App offen, einen Reihenzähler in einer anderen und meistens noch ein Video, das nebenbei lief. Durch das ständige Hin- und Herwechseln habe ich ganz schnell den Überblick verloren, wo ich gerade war.

Ich habe keine App gefunden, die das alles zusammen kann, also habe ich mir meine eigene gebaut, die alles an einem Ort hat:

- sie zeigt mir, was in der Reihe zu tun ist, in der ich gerade bin
- sie erinnert mich, wenn eine Zunahme, Abnahme oder eine andere besondere Reihe kommt
- und sie hat eine Benachrichtigung mit −/+ Knöpfen, damit ich weiter meine Serie schauen und trotzdem meine Reihen zählen kann

Ich habe sie nur für mich gemacht, zum Stricken und Häkeln, und es hat ehrlich gesagt richtig Spaß gemacht, sie zu bauen 💛

## Funktionen

- **Die Anweisung für deine aktuelle Reihe**, groß und gut lesbar. Wenn eine besondere Reihe die normale ersetzt, steht die normale Reihe darunter.
- **Hervorgehobene Reihen** für Zunahmen, Abnahmen und alles, was du nicht verpassen solltest. Das Handy vibriert, wenn du so eine Reihe erreichst.
- **Maschenzahl** pro Reihe, inklusive wie viele Maschen dazukommen oder wegfallen.
- **Reihenliste** mit allen Reihen der Anleitung. Halte eine Reihe gedrückt, um dorthin zu springen.
- **Anleitungscode**: Du schreibst deine Anleitung einmal in einem kurzen, einfachen Format (siehe unten). Die App prüft sie und sagt dir, wenn Reihen fehlen, sich überschneiden oder etwas nicht stimmt.
- **Benachrichtigung mit −/+ Knöpfen** und Fortschrittsbalken, damit du Reihen zählen kannst, ohne die App zu verlassen, in der du gerade bist.
- **Projekte mit mehreren Anleitungen**, z. B. Vorderteil, Rückenteil und Ärmel eines Pullovers.
- **Zwei Farbpaletten** (Rosadito und Jarrito), heller und dunkler Modus, vier App-Icons und ein Startbildschirm, der zur Palette passt.
- **Englisch, Spanisch und Deutsch.**
- Alles wird auf dem Handy gespeichert. Kein Konto, kein Internet nötig.

<p align="center">
  <img src="docs/screenshots/code.png" width="230" alt="Code-Seite mit der Beispielanleitung und ihrer Zusammenfassung">
  <img src="docs/screenshots/settings.png" width="230" alt="Einstellungen mit Sprache, Darstellung, Palette und App-Icon">
</p>

## Der Anleitungscode

Jede Zeile beginnt mit den Reihen, für die sie gilt, dann ein Doppelpunkt, dann die Anweisung. Das ist das Beispiel „So funktioniert’s“, das in der App dabei ist (auf Englisch siehst du es in den Screenshots oben):

```
Cast on: 20
1-4: Rippen 1 re, 1 li. „1-4“ heißt Reihe 1 bis 4
5+: Rechts (Reihe 5, 7, 9 …) | Links (Reihe 6, 8, 10 …)
7: ! „!“ am Anfang hebt die Reihe hervor und vibriert
9, 13: ! Abn: 1 re, ssk, re bis 3 M vor Ende, 2ReZus, 1 re (-2)
11: Nur Reihe 11: ersetzt den Bereich, darunter siehst du die normale Reihe
11: ! Eine zweite Zeile für Reihe 11: beide werden angezeigt
15, 17: ! Zun: 1 re, 1ZunL, re bis 1 M vor Ende, 1ZunR, 1 re (+2)
19+: Rechts. „19+“ startet einen neuen Bereich und beendet den ab Reihe 5 | Links
24: END Alle M abk. END markiert die letzte Reihe
```

| Code              | Bedeutung                                           |
| ----------------- | --------------------------------------------------- |
| `13:`             | eine Reihe                                          |
| `1-6:`            | Reihen 1 bis 6                                      |
| `7+:`             | ab Reihe 7, bis ein anderer Bereich beginnt         |
| `13, 19, 25:`     | mehrere Reihen                                      |
| `Rechts \| Links` | wechselt Reihe für Reihe, beginnend mit der ersten  |
| `!`               | am Anfang des Textes: Reihe hervorheben             |
| `END`             | am Anfang des Textes: die letzte Reihe              |
| `Cast on: 66`     | Anschlagmaschen, zeigt die Maschenzahl              |
| `(-2)` `(+1)`     | Maschen, die in der Reihe wegfallen oder dazukommen |

Eine einzelne Reihe (`11:`) hat Vorrang vor einen Bereich (`5+:`), du schreibst also nur die Reihen auf, die anders sind.

**Als Nächstes:** Die App wird Strickabkürzungen wie `2ReZus`, `ssk` oder `1ZunL` verstehen (auf Deutsch, Englisch und Spanisch) und die Maschen selbst zählen, und der Code-Editor wird überarbeitet.

## Technik

- [Expo](https://expo.dev) SDK 57, React Native 0.86, TypeScript
- Expo Router für die Navigation
- Zustand mit AsyncStorage zum Speichern von Projekten und Einstellungen
- i18next und react-i18next für die drei Sprachen
- **Eigene native Module in Kotlin:**
  - `row-notification`: ein Foreground Service mit eigenem Benachrichtigungs-Layout (RemoteViews), −/+ Aktionen und Farben, die der Palette folgen
  - `app-icon`: wechselt das App-Icon über Activity-Aliases
  - `splash-theme`: setzt den Startbildschirm pro Palette (SplashScreen-API ab Android 13)
- **Eigene Config-Plugins**, die beim Prebuild die Icon-Aliases, die Startbildschirm-Themes und `local.properties` erzeugen

Die App ist für Android gebaut. Die nativen Funktionen gibt es nur auf Android.

## Selbst ausprobieren

Du brauchst Node.js, das Android SDK (z. B. über Android Studio) und ein JDK 17 oder neuer.

```bash
git clone https://github.com/ma981son/knit-counter.git
cd knit-counter
npm install
npx expo run:android
```

Das baut eine Entwicklungsversion und installiert sie auf einem verbundenen Handy oder Emulator. Für eine schnellere Version ohne Entwicklungsserver:

```bash
npx expo run:android --variant release
```

## Lizenz

[MIT](LICENSE) © Maria Fe Sonnenberg
