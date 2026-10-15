export type AbbreviationLanguage = 'en' | 'de' | 'es';

export type StitchEffect =
  | { kind: 'fixed'; uses: number; makes: number }
  | { kind: 'perStitch' }
  | { kind: 'castOn' }
  | { kind: 'bindOff' };

export type AbbreviationCode = {
  text: string;
  number?: 'before' | 'after';
  exact?: boolean;
};

export type Abbreviation = {
  id: string;
  codes: AbbreviationCode[];
  effect?: StitchEffect;
  meaning: Record<AbbreviationLanguage, string>;
};

function codes(...texts: string[]): AbbreviationCode[] {
  return texts.map((text) => ({ text }));
}

function fixed(uses: number, makes: number): StitchEffect {
  return { kind: 'fixed', uses, makes };
}

const PER_STITCH: StitchEffect = { kind: 'perStitch' };

export const ABBREVIATIONS: Abbreviation[] = [
  {
    id: 'castOn',
    codes: [
      { text: 'CO', number: 'after' },
      { text: 'anschl', number: 'after' },
      { text: 'MO', number: 'after', exact: true },
    ],
    effect: { kind: 'castOn' },
    meaning: {
      en: 'cast on',
      de: 'Maschen anschlagen',
      es: 'montar puntos',
    },
  },
  {
    id: 'bindOff',
    codes: [
      { text: 'BO', number: 'after' },
      { text: 'abk', number: 'after' },
      { text: 'rem', number: 'after' },
    ],
    effect: { kind: 'bindOff' },
    meaning: {
      en: 'bind off',
      de: 'Maschen abketten',
      es: 'rematar (cerrar puntos)',
    },
  },
  {
    id: 'knit',
    codes: [
      { text: 'k', number: 'after' },
      { text: 're', number: 'before' },
      { text: 'D', number: 'after', exact: true },
    ],
    effect: PER_STITCH,
    meaning: {
      en: 'knit',
      de: 'rechts stricken',
      es: 'tejer al derecho',
    },
  },
  {
    id: 'purl',
    codes: [
      { text: 'p', number: 'after' },
      { text: 'li', number: 'before' },
      { text: 'R', number: 'after', exact: true },
    ],
    effect: PER_STITCH,
    meaning: {
      en: 'purl',
      de: 'links stricken',
      es: 'tejer al revés',
    },
  },
  {
    id: 'k1tbl',
    codes: codes('k1tbl', '1 re verschr', 'D1 ret'),
    effect: fixed(1, 1),
    meaning: {
      en: 'knit 1 stitch through the back loop',
      de: '1 Masche rechts verschränkt stricken',
      es: 'tejer 1 punto al derecho retorcido',
    },
  },
  {
    id: 'ktbl',
    codes: codes('ktbl', 're verschr', 'D ret'),
    effect: PER_STITCH,
    meaning: {
      en: 'knit through the back loop',
      de: 'rechts verschränkt stricken',
      es: 'tejer al derecho retorcido',
    },
  },
  {
    id: 'p1tbl',
    codes: codes('p1tbl', '1 li verschr', 'R1 ret'),
    effect: fixed(1, 1),
    meaning: {
      en: 'purl 1 stitch through the back loop',
      de: '1 Masche links verschränkt stricken',
      es: 'tejer 1 punto al revés retorcido',
    },
  },
  {
    id: 'ptbl',
    codes: codes('ptbl', 'li verschr', 'R ret'),
    effect: PER_STITCH,
    meaning: {
      en: 'purl through the back loop',
      de: 'links verschränkt stricken',
      es: 'tejer al revés retorcido',
    },
  },
  {
    id: 'k1b',
    codes: codes('k1b', '1 re-t', 'D1b'),
    effect: fixed(1, 1),
    meaning: {
      en: 'knit into the stitch below',
      de: '1 Masche rechts tiefer stechen',
      es: 'tejer 1 punto al derecho en la vuelta de abajo',
    },
  },
  {
    id: 'p1b',
    codes: codes('p1b', '1 li-t', 'R1b'),
    effect: fixed(1, 1),
    meaning: {
      en: 'purl into the stitch below',
      de: '1 Masche links tiefer stechen',
      es: 'tejer 1 punto al revés en la vuelta de abajo',
    },
  },
  {
    id: 'brk',
    codes: codes('brk', 'PMre', 'brD'),
    effect: fixed(1, 1),
    meaning: {
      en: 'brioche knit',
      de: 'Patentmasche rechts',
      es: 'punto brioche al derecho',
    },
  },
  {
    id: 'brp',
    codes: codes('brp', 'PMli', 'brR'),
    effect: fixed(1, 1),
    meaning: {
      en: 'brioche purl',
      de: 'Patentmasche links',
      es: 'punto brioche al revés',
    },
  },
  {
    id: 'slip',
    codes: [
      { text: 'sl', number: 'after' },
      { text: 'abh', number: 'before' },
      { text: 'dsl', number: 'after' },
    ],
    effect: PER_STITCH,
    meaning: {
      en: 'slip stitches without knitting them',
      de: 'Maschen abheben, ohne sie zu stricken',
      es: 'deslizar puntos sin tejerlos',
    },
  },
  {
    id: 'slipPurlwise',
    codes: codes('sl pw', 'li abh', 'dslR'),
    effect: PER_STITCH,
    meaning: {
      en: 'slip purlwise',
      de: 'wie zum Linksstricken abheben',
      es: 'deslizar como para tejer al revés',
    },
  },
  {
    id: 'sl1kw',
    codes: codes('sl1 kw', '1 re abh', 'dsl1D'),
    effect: fixed(1, 1),
    meaning: {
      en: 'slip 1 stitch knitwise',
      de: '1 Masche wie zum Rechtsstricken abheben',
      es: 'deslizar 1 punto como para tejer al derecho',
    },
  },
  {
    id: 'sl1pw',
    codes: codes('sl1 pw', '1 li abh', 'dsl1R'),
    effect: fixed(1, 1),
    meaning: {
      en: 'slip 1 stitch purlwise',
      de: '1 Masche wie zum Linksstricken abheben',
      es: 'deslizar 1 punto como para tejer al revés',
    },
  },
  {
    id: 'sl1wyib',
    codes: codes('sl1 wyib', 'sl1wyib', '1 abh mFhA', 'dsl1 chdt'),
    effect: fixed(1, 1),
    meaning: {
      en: 'slip 1 stitch with the yarn in back',
      de: '1 Masche abheben, Faden hinter der Arbeit',
      es: 'deslizar 1 punto con la hebra por detrás',
    },
  },
  {
    id: 'sl1wyif',
    codes: codes('sl1 wyif', 'sl1wyif', '1 abh mFvA', 'dsl1 chdl'),
    effect: fixed(1, 1),
    meaning: {
      en: 'slip 1 stitch with the yarn in front',
      de: '1 Masche abheben, Faden vor der Arbeit',
      es: 'deslizar 1 punto con la hebra por delante',
    },
  },
  {
    id: 'sl1pwyib',
    codes: codes('sl1p wyib', '1 li abh mFhA', 'dsl1R chdt'),
    effect: fixed(1, 1),
    meaning: {
      en: 'slip 1 stitch purlwise with the yarn in back',
      de: '1 Masche wie zum Linksstricken abheben, Faden hinter der Arbeit',
      es: 'deslizar 1 punto como al revés con la hebra por detrás',
    },
  },
  {
    id: 'sl1pwyif',
    codes: codes('sl1p wyif', '1 li abh mFvA', 'dsl1R chdl'),
    effect: fixed(1, 1),
    meaning: {
      en: 'slip 1 stitch purlwise with the yarn in front',
      de: '1 Masche wie zum Linksstricken abheben, Faden vor der Arbeit',
      es: 'deslizar 1 punto como al revés con la hebra por delante',
    },
  },
  {
    id: 'sl1',
    codes: codes('sl1', '1 abh', 'dsl1'),
    effect: fixed(1, 1),
    meaning: {
      en: 'slip 1 stitch',
      de: '1 Masche abheben',
      es: 'deslizar 1 punto',
    },
  },
  {
    id: 'k2tog',
    codes: codes('k2tog', '2ReZus', '2pjD'),
    effect: fixed(2, 1),
    meaning: {
      en: 'knit 2 stitches together (1 decrease)',
      de: '2 Maschen rechts zusammenstricken (1 Abnahme)',
      es: 'tejer 2 puntos juntos al derecho (1 disminución)',
    },
  },
  {
    id: 'k2togTbl',
    codes: codes('k2tog tbl', '2ReZus verschr', '2pjD ret'),
    effect: fixed(2, 1),
    meaning: {
      en: 'knit 2 together through the back loops (1 decrease)',
      de: '2 Maschen rechts verschränkt zusammenstricken (1 Abnahme)',
      es: 'tejer 2 puntos juntos al derecho retorcidos (1 disminución)',
    },
  },
  {
    id: 'k3tog',
    codes: codes('k3tog', '3ReZus', '3pjD'),
    effect: fixed(3, 1),
    meaning: {
      en: 'knit 3 stitches together (2 decreases)',
      de: '3 Maschen rechts zusammenstricken (2 Abnahmen)',
      es: 'tejer 3 puntos juntos al derecho (2 disminuciones)',
    },
  },
  {
    id: 'p2tog',
    codes: codes('p2tog', '2LiZus', '2pjR'),
    effect: fixed(2, 1),
    meaning: {
      en: 'purl 2 stitches together (1 decrease)',
      de: '2 Maschen links zusammenstricken (1 Abnahme)',
      es: 'tejer 2 puntos juntos al revés (1 disminución)',
    },
  },
  {
    id: 'p2togTbl',
    codes: codes('p2tog tbl', '2LiZus verschr', '2pjR ret'),
    effect: fixed(2, 1),
    meaning: {
      en: 'purl 2 together through the back loops (1 decrease)',
      de: '2 Maschen links verschränkt zusammenstricken (1 Abnahme)',
      es: 'tejer 2 puntos juntos al revés retorcidos (1 disminución)',
    },
  },
  {
    id: 'p3tog',
    codes: codes('p3tog', '3LiZus', '3pjR'),
    effect: fixed(3, 1),
    meaning: {
      en: 'purl 3 stitches together (2 decreases)',
      de: '3 Maschen links zusammenstricken (2 Abnahmen)',
      es: 'tejer 3 puntos juntos al revés (2 disminuciones)',
    },
  },
  {
    id: 'ssk',
    codes: codes('ssk', 'ddD'),
    effect: fixed(2, 1),
    meaning: {
      en: 'slip, slip, knit: left-leaning decrease (1 decrease)',
      de: 'abheben, abheben, zusammen rechts stricken: nach links geneigte Abnahme (1 Abnahme)',
      es: 'deslizar, deslizar, tejer juntos al derecho: disminución inclinada a la izquierda (1 disminución)',
    },
  },
  {
    id: 'ssp',
    codes: codes('ssp', 'ddR'),
    effect: fixed(2, 1),
    meaning: {
      en: 'slip, slip, purl together (1 decrease)',
      de: 'abheben, abheben, zusammen links stricken (1 Abnahme)',
      es: 'deslizar, deslizar, tejer juntos al revés (1 disminución)',
    },
  },
  {
    id: 'sssk',
    codes: codes('sssk', 'dddD'),
    effect: fixed(3, 1),
    meaning: {
      en: 'slip, slip, slip, knit together (2 decreases)',
      de: '3 Maschen abheben, zusammen rechts stricken (2 Abnahmen)',
      es: 'deslizar 3 puntos, tejerlos juntos al derecho (2 disminuciones)',
    },
  },
  {
    id: 'sssp',
    codes: codes('sssp', 'dddR'),
    effect: fixed(3, 1),
    meaning: {
      en: 'slip, slip, slip, purl together (2 decreases)',
      de: '3 Maschen abheben, zusammen links stricken (2 Abnahmen)',
      es: 'deslizar 3 puntos, tejerlos juntos al revés (2 disminuciones)',
    },
  },
  {
    id: 'cdd',
    codes: codes('cdd', 'zD-Abn', 'ddc'),
    effect: fixed(3, 1),
    meaning: {
      en: 'centered double decrease (2 decreases)',
      de: 'zentrierte doppelte Abnahme (2 Abnahmen)',
      es: 'disminución doble centrada (2 disminuciones)',
    },
  },
  {
    id: 'm1',
    codes: codes('M1'),
    effect: fixed(0, 1),
    meaning: {
      en: 'make 1 stitch (1 increase)',
      de: '1 Masche zunehmen (1 Zunahme)',
      es: 'aumentar 1 punto (1 aumento)',
    },
  },
  {
    id: 'm1l',
    codes: codes('M1L', '1ZunL', 'a1i'),
    effect: fixed(0, 1),
    meaning: {
      en: 'make 1 left-leaning stitch (1 increase)',
      de: '1 Masche nach links geneigt zunehmen (1 Zunahme)',
      es: 'aumentar 1 punto inclinado a la izquierda (1 aumento)',
    },
  },
  {
    id: 'm1r',
    codes: codes('M1R', '1ZunR', 'a1d'),
    effect: fixed(0, 1),
    meaning: {
      en: 'make 1 right-leaning stitch (1 increase)',
      de: '1 Masche nach rechts geneigt zunehmen (1 Zunahme)',
      es: 'aumentar 1 punto inclinado a la derecha (1 aumento)',
    },
  },
  {
    id: 'm1lp',
    codes: codes('M1Lp', '1 li ZunL', 'a1i-R'),
    effect: fixed(0, 1),
    meaning: {
      en: 'make 1 left-leaning purl stitch (1 increase)',
      de: '1 linke Masche nach links geneigt zunehmen (1 Zunahme)',
      es: 'aumentar 1 punto al revés inclinado a la izquierda (1 aumento)',
    },
  },
  {
    id: 'm1rp',
    codes: codes('M1Rp', '1 li ZunR', 'a1d-R'),
    effect: fixed(0, 1),
    meaning: {
      en: 'make 1 right-leaning purl stitch (1 increase)',
      de: '1 linke Masche nach rechts geneigt zunehmen (1 Zunahme)',
      es: 'aumentar 1 punto al revés inclinado a la derecha (1 aumento)',
    },
  },
  {
    id: 'lli',
    codes: codes('LLI', 'LAZ', 'aumLI'),
    effect: fixed(0, 1),
    meaning: {
      en: 'left lifted increase (1 increase)',
      de: 'links angehobene Zunahme (1 Zunahme)',
      es: 'aumento levantado a la izquierda (1 aumento)',
    },
  },
  {
    id: 'rli',
    codes: codes('RLI', 'RAZ', 'aumLD'),
    effect: fixed(0, 1),
    meaning: {
      en: 'right lifted increase (1 increase)',
      de: 'rechts angehobene Zunahme (1 Zunahme)',
      es: 'aumento levantado a la derecha (1 aumento)',
    },
  },
  {
    id: 'llpi',
    codes: codes('LLPI', 'LAZ li', 'aumLI-R'),
    effect: fixed(0, 1),
    meaning: {
      en: 'left lifted purl increase (1 increase)',
      de: 'links angehobene Zunahme, links gestrickt (1 Zunahme)',
      es: 'aumento levantado a la izquierda al revés (1 aumento)',
    },
  },
  {
    id: 'rlpi',
    codes: codes('RLPI', 'RAZ li', 'aumLD-R'),
    effect: fixed(0, 1),
    meaning: {
      en: 'right lifted purl increase (1 increase)',
      de: 'rechts angehobene Zunahme, links gestrickt (1 Zunahme)',
      es: 'aumento levantado a la derecha al revés (1 aumento)',
    },
  },
  {
    id: 'kfb',
    codes: codes('kfb'),
    effect: fixed(1, 2),
    meaning: {
      en: 'knit into the front and back of the same stitch (1 increase)',
      de: 'aus 1 Masche 2 Maschen rechts herausstricken (1 Zunahme)',
      es: 'tejer por delante y por detrás del mismo punto (1 aumento)',
    },
  },
  {
    id: 'yo',
    codes: [
      { text: 'yo' },
      { text: 'U', exact: true },
      { text: 'h', exact: true },
    ],
    effect: fixed(0, 1),
    meaning: {
      en: 'yarn over (1 increase, makes a small hole)',
      de: 'Umschlag (1 Zunahme, ergibt ein kleines Loch)',
      es: 'hebra (1 aumento, deja un pequeño agujero)',
    },
  },
  {
    id: 'stitch',
    codes: [{ text: 'st' }, { text: 'sts' }, { text: 'M', exact: true }, { text: 'pto' }, { text: 'ptos' }],
    meaning: {
      en: 'stitch',
      de: 'Masche',
      es: 'punto',
    },
  },
  {
    id: 'marker',
    codes: [{ text: 'M', exact: true }, { text: 'MM' }],
    meaning: {
      en: 'stitch marker',
      de: 'Maschenmarkierer',
      es: 'marcador',
    },
  },
  {
    id: 'placeMarker',
    codes: codes('PM', 'MMS', 'pM'),
    meaning: {
      en: 'place a marker',
      de: 'Maschenmarkierer setzen',
      es: 'poner un marcador',
    },
  },
  {
    id: 'slipMarker',
    codes: codes('SM', 'MMA', 'dM'),
    meaning: {
      en: 'slip the marker to the other needle',
      de: 'Maschenmarkierer auf die andere Nadel heben',
      es: 'pasar el marcador a la otra aguja',
    },
  },
  {
    id: 'removeMarker',
    codes: codes('RM', 'MME', 'qM'),
    meaning: {
      en: 'remove the marker',
      de: 'Maschenmarkierer entfernen',
      es: 'quitar el marcador',
    },
  },
  {
    id: 'beginningOfRound',
    codes: codes('BOR', 'R-Anf', 'Rd-Beg', 'iF', 'iV'),
    meaning: {
      en: 'beginning of the row or round',
      de: 'Reihen- oder Rundenbeginn',
      es: 'inicio de la fila o vuelta',
    },
  },
  {
    id: 'beginningOfRoundMarker',
    codes: codes('BORm', 'MM-Rd-Beg', 'M-RAnf', 'M-iV', 'M-iF'),
    meaning: {
      en: 'marker for the beginning of the row or round',
      de: 'Maschenmarkierer für den Reihen- oder Rundenbeginn',
      es: 'marcador del inicio de la fila o vuelta',
    },
  },
  {
    id: 'placeBorMarker',
    codes: codes('PBORm', 'MRd-Beg setzen', 'pMiV'),
    meaning: {
      en: 'place the beginning of round marker',
      de: 'Maschenmarkierer für den Rundenbeginn setzen',
      es: 'poner el marcador de inicio de vuelta',
    },
  },
  {
    id: 'removeBorMarker',
    codes: codes('RBORm', 'MRd-entf', 'qMiV'),
    meaning: {
      en: 'remove the beginning of round marker',
      de: 'Maschenmarkierer am Rundenbeginn entfernen',
      es: 'quitar el marcador de inicio de vuelta',
    },
  },
  {
    id: 'row',
    codes: [{ text: 'R', exact: true }, { text: 'F', exact: true }],
    meaning: {
      en: 'row (R can also mean right, or purl in Spanish)',
      de: 'Reihe (R kann auch rechts oder im Spanischen links stricken bedeuten)',
      es: 'fila (R también puede significar derecha, o revés en español)',
    },
  },
  {
    id: 'round',
    codes: codes('rnd', 'Rd', 'vta'),
    meaning: {
      en: 'round',
      de: 'Runde',
      es: 'vuelta',
    },
  },
  {
    id: 'right',
    codes: [{ text: 'R', exact: true }, { text: 'D', exact: true }],
    meaning: {
      en: 'right (D also means knit in Spanish)',
      de: 'rechts (D bedeutet im Spanischen auch rechts stricken)',
      es: 'derecha (D también significa tejer al derecho)',
    },
  },
  {
    id: 'left',
    codes: [{ text: 'L', exact: true }, { text: 'Izq' }],
    meaning: {
      en: 'left',
      de: 'links',
      es: 'izquierda',
    },
  },
  {
    id: 'rightSide',
    codes: codes('RS', 'LD'),
    meaning: {
      en: 'right side of the work (the side that shows)',
      de: 'rechte Seite der Arbeit (die Seite, die man sieht)',
      es: 'lado derecho del tejido (el que se ve)',
    },
  },
  {
    id: 'wrongSide',
    codes: codes('WS', 'RR', 'LR'),
    meaning: {
      en: 'wrong side of the work (the inside)',
      de: 'linke Seite oder Rückseite der Arbeit (die Innenseite)',
      es: 'lado revés del tejido (el de adentro)',
    },
  },
  {
    id: 'increase',
    codes: codes('inc', 'Zun', 'aum'),
    meaning: {
      en: 'increase',
      de: 'Zunahme',
      es: 'aumento',
    },
  },
  {
    id: 'decrease',
    codes: codes('dec', 'Abn', 'dism'),
    meaning: {
      en: 'decrease',
      de: 'Abnahme',
      es: 'disminución',
    },
  },
  {
    id: 'repeat',
    codes: codes('rep', 'wdh'),
    meaning: {
      en: 'repeat',
      de: 'wiederholen',
      es: 'repetir',
    },
  },
  {
    id: 'together',
    codes: [{ text: 'tog' }, { text: 'zus' }, { text: 'j', exact: true }],
    meaning: {
      en: 'together',
      de: 'zusammen',
      es: 'juntos',
    },
  },
  {
    id: 'throughBackLoop',
    codes: codes('tbl', 'verschr', 'ret'),
    meaning: {
      en: 'through the back loop (twisted)',
      de: 'verschränkt',
      es: 'retorcido',
    },
  },
  {
    id: 'knitwise',
    codes: codes('kwise', 'kw', 'wie zum Rechtsstr', 'como derecho'),
    meaning: {
      en: 'knitwise, as if to knit',
      de: 'wie zum Rechtsstricken',
      es: 'como para tejer al derecho',
    },
  },
  {
    id: 'purlwise',
    codes: codes('pwise', 'pw', 'wie zum Linksstr', 'como revés'),
    meaning: {
      en: 'purlwise, as if to purl',
      de: 'wie zum Linksstricken',
      es: 'como para tejer al revés',
    },
  },
  {
    id: 'yarnInBack',
    codes: codes('wyib', 'mFhA', 'chdt'),
    meaning: {
      en: 'with the yarn in back',
      de: 'mit dem Faden hinter der Arbeit',
      es: 'con la hebra por detrás',
    },
  },
  {
    id: 'yarnInFront',
    codes: codes('wyif', 'mFvA', 'chdl'),
    meaning: {
      en: 'with the yarn in front',
      de: 'mit dem Faden vor der Arbeit',
      es: 'con la hebra por delante',
    },
  },
  {
    id: 'garterStitch',
    codes: codes('garter st', 'kraus re', 'pto bobo'),
    meaning: {
      en: 'garter stitch: knit every row',
      de: 'kraus rechts: jede Reihe rechts stricken',
      es: 'punto bobo: tejer todas las filas al derecho',
    },
  },
  {
    id: 'stockinette',
    codes: codes('st st', 'glatt re', 'pto jersey'),
    meaning: {
      en: 'stockinette stitch: knit on the right side, purl on the wrong side',
      de: 'glatt rechts: Hinreihen rechts, Rückreihen links',
      es: 'punto jersey: derecho por el lado derecho, revés por el lado revés',
    },
  },
  {
    id: 'reverseStockinette',
    codes: codes('rev st st', 'glatt li', 'pto jersey revés'),
    meaning: {
      en: 'reverse stockinette: purl on the right side, knit on the wrong side',
      de: 'glatt links: Hinreihen links, Rückreihen rechts',
      es: 'punto jersey revés: revés por el lado derecho, derecho por el lado revés',
    },
  },
  {
    id: 'rib',
    codes: codes('rib', 'Rippen', 'p. elástico'),
    meaning: {
      en: 'ribbing: knit and purl stitches alternating in columns',
      de: 'Rippenmuster: rechte und linke Maschen im Wechsel',
      es: 'punto elástico: puntos derechos y reveses alternados',
    },
  },
  {
    id: 'alternate',
    codes: codes('alt', 'abw'),
    meaning: {
      en: 'alternate',
      de: 'abwechselnd',
      es: 'alternar',
    },
  },
  {
    id: 'approximately',
    codes: codes('approx.', 'ca.', 'aprox.'),
    meaning: {
      en: 'approximately',
      de: 'circa',
      es: 'aproximadamente',
    },
  },
  {
    id: 'beginning',
    codes: codes('beg', 'Anf', 'com'),
    meaning: {
      en: 'beginning',
      de: 'Anfang',
      es: 'comienzo',
    },
  },
  {
    id: 'follow',
    codes: codes('foll', 'folg', 'seg'),
    meaning: {
      en: 'following',
      de: 'folgend',
      es: 'siguiente',
    },
  },
  {
    id: 'breakAndTighten',
    codes: codes('b&t', 'a&f', 'c&a'),
    meaning: {
      en: 'break the yarn and pull it tight',
      de: 'Faden abschneiden und festziehen',
      es: 'cortar la hebra y asegurar',
    },
  },
  {
    id: 'backwardsLoopCastOn',
    codes: codes('BLCO'),
    meaning: {
      en: 'backwards loop cast-on',
      de: 'Anschlag mit rückwärtigen Schlingen',
      es: 'montaje de bucle hacia atrás',
    },
  },
  {
    id: 'mainColor',
    codes: codes('MC', 'HF', 'CP'),
    meaning: {
      en: 'main color',
      de: 'Hauptfarbe',
      es: 'color principal',
    },
  },
  {
    id: 'contrastColor',
    codes: codes('CC', 'KF'),
    meaning: {
      en: 'contrasting color',
      de: 'Kontrastfarbe',
      es: 'color de contraste',
    },
  },
  {
    id: 'color',
    codes: [{ text: 'C', exact: true }, { text: 'Fb' }],
    meaning: {
      en: 'color',
      de: 'Farbe',
      es: 'color',
    },
  },
  {
    id: 'leftCross',
    codes: codes('LC', 'LV', 'Ci'),
    meaning: {
      en: 'left cross (cable)',
      de: 'nach links verkreuzen (Zopf)',
      es: 'cruce a la izquierda (trenza)',
    },
  },
  {
    id: 'rightCross',
    codes: codes('RC', 'RV', 'Cd'),
    meaning: {
      en: 'right cross (cable)',
      de: 'nach rechts verkreuzen (Zopf)',
      es: 'cruce a la derecha (trenza)',
    },
  },
  {
    id: 'leftPurlCross',
    codes: codes('LPC', 'LV-li', 'Ci-R'),
    meaning: {
      en: 'left purl cross (cable with a purl stitch)',
      de: 'nach links verkreuzen mit linker Masche',
      es: 'cruce a la izquierda con punto revés',
    },
  },
  {
    id: 'rightPurlCross',
    codes: codes('RPC', 'RV-li', 'Cd-R'),
    meaning: {
      en: 'right purl cross (cable with a purl stitch)',
      de: 'nach rechts verkreuzen mit linker Masche',
      es: 'cruce a la derecha con punto revés',
    },
  },
  {
    id: 'popcorn',
    codes: codes('PC'),
    meaning: {
      en: 'popcorn stitch',
      de: 'Popcorn-Masche',
      es: 'punto popcorn',
    },
  },
  {
    id: 'chain',
    codes: codes('ch', 'Lftm', 'cad'),
    meaning: {
      en: 'chain (crochet)',
      de: 'Luftmasche (Häkeln)',
      es: 'cadeneta (crochet)',
    },
  },
  {
    id: 'needle',
    codes: codes('ndl', 'Nd', 'ag'),
    meaning: {
      en: 'needle',
      de: 'Nadel',
      es: 'aguja',
    },
  },
  {
    id: 'leftNeedle',
    codes: codes('LHN', 'LN', 'Nd-liH', 'li Nd', 'ag-mi', 'ag-i'),
    meaning: {
      en: 'left needle',
      de: 'linke Nadel',
      es: 'aguja izquierda',
    },
  },
  {
    id: 'rightNeedle',
    codes: codes('RHN', 'RN', 'Nd-reH', 're Nd', 'ag-md', 'ag-d'),
    meaning: {
      en: 'right needle',
      de: 'rechte Nadel',
      es: 'aguja derecha',
    },
  },
  {
    id: 'leftHand',
    codes: codes('LH', 'liH', 'mi'),
    meaning: {
      en: 'left hand',
      de: 'linke Hand',
      es: 'mano izquierda',
    },
  },
  {
    id: 'rightHand',
    codes: codes('RH', 'reH', 'md'),
    meaning: {
      en: 'right hand',
      de: 'rechte Hand',
      es: 'mano derecha',
    },
  },
  {
    id: 'cableNeedle',
    codes: codes('CN', 'Zopf-Nd', 'aux ndl', 'Hilfsnd', 'ag aux'),
    meaning: {
      en: 'cable or auxiliary needle',
      de: 'Zopf- oder Hilfsnadel',
      es: 'aguja auxiliar',
    },
  },
  {
    id: 'bottomNeedle',
    codes: codes('BN', 'unter-Nd', 'ag inf'),
    meaning: {
      en: 'bottom needle',
      de: 'untere Nadel',
      es: 'aguja inferior',
    },
  },
  {
    id: 'circularNeedle',
    codes: codes('circular ndl', 'Rundstricknd', 'ag circular'),
    meaning: {
      en: 'circular needle',
      de: 'Rundstricknadel',
      es: 'aguja circular',
    },
  },
  {
    id: 'doublePointedNeedles',
    codes: codes('DPNs', 'DPN', 'Nd-spiel', 'ADP'),
    meaning: {
      en: 'double-pointed needles',
      de: 'Nadelspiel',
      es: 'agujas de doble punta',
    },
  },
  {
    id: 'tapestryNeedle',
    codes: codes('tapestry ndl', 'Stopfnd', 'ag lanera'),
    meaning: {
      en: 'tapestry needle',
      de: 'Stopfnadel',
      es: 'aguja lanera',
    },
  },
];
