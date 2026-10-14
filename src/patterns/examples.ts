type Example = {
  projectName: string;
  patternName: string;
  code: string;
};

const EXAMPLES: Record<string, Example> = {
  en: {
    projectName: 'Example',
    patternName: 'How it works',
    code: `Cast on: 20
1-4: Rib K1, P1. "1-4" means rows 1 to 4
5+: Knit (rows 5, 7, 9 …) | Purl (rows 6, 8, 10 …)
7: ! "!" at the start highlights the row and vibrates
9, 13: ! Dec: K1, ssk, k to last 3 sts, k2tog, K1 (-2)
11: Only row 11: replaces the range, the normal row shows below
11: ! A second line for row 11: both show
15, 17: ! Inc: K1, M1L, k to last st, M1R, K1 (+2)
19+: Knit. "19+" starts a new range and ends the one from row 5 | Purl
24: END BO all sts. END marks the last row`,
  },
  de: {
    projectName: 'Beispiel',
    patternName: 'So funktioniert’s',
    code: `Cast on: 20
1-4: Rippen 1 re, 1 li. „1-4“ heißt Reihe 1 bis 4
5+: Rechts (Reihe 5, 7, 9 …) | Links (Reihe 6, 8, 10 …)
7: ! „!“ am Anfang hebt die Reihe hervor und vibriert
9, 13: ! Abn: 1 re, ssk, re bis 3 M vor Ende, 2ReZus, 1 re (-2)
11: Nur Reihe 11: ersetzt den Bereich, darunter siehst du die normale Reihe
11: ! Eine zweite Zeile für Reihe 11: beide werden angezeigt
15, 17: ! Zun: 1 re, 1ZunL, re bis 1 M vor Ende, 1ZunR, 1 re (+2)
19+: Rechts. „19+“ startet einen neuen Bereich und beendet den ab Reihe 5 | Links
24: END Alle M abk. END markiert die letzte Reihe`,
  },
  es: {
    projectName: 'Ejemplo',
    patternName: 'Cómo funciona',
    code: `Cast on: 20
1-4: Elástico D1, R1. "1-4" significa filas 1 a 4
5+: Derecho (filas 5, 7, 9 …) | Revés (filas 6, 8, 10 …)
7: ! "!" al inicio destaca la fila y vibra
9, 13: ! Dism: D1, ddD, D hasta los últimos 3 ptos, 2pjD, D1 (-2)
11: Solo la fila 11: reemplaza el rango, abajo ves la fila normal
11: ! Una segunda línea para la fila 11: se muestran ambas
15, 17: ! Aum: D1, a1i, D hasta el último pto, a1d, D1 (+2)
19+: Derecho. "19+" empieza un rango nuevo y termina el de la fila 5 | Revés
24: END Rem todos los ptos. END marca la última fila`,
  },
};

export function getExample(language: string | undefined): Example {
  return (language && EXAMPLES[language]) || EXAMPLES.en;
}
