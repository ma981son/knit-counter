import type { en } from './en';

export const de: typeof en = {
  common: {
    add: 'Hinzufügen',
    cancel: 'Abbrechen',
    yes: 'Ja',
    loading: 'Lädt…',
  },
  tabs: {
    counter: 'Zähler',
    rows: 'Reihen',
    code: 'Code',
  },
  notFound: {
    title: 'Hoppla!',
    message: 'Diese Seite gibt es nicht.',
    link: 'Zu deinen Projekten',
  },
  projects: {
    title: 'Projekte',
    newProject: 'Neues Projekt',
    namePlaceholder: 'Projektname, z. B. Pullover',
    patternCount_one: '{{count}} Anleitung',
    patternCount_other: '{{count}} Anleitungen',
    empty: 'Noch keine Projekte.',
    deleteMessage:
      'Das löscht „{{name}}“ mit allen Anleitungen. Das kann nicht rückgängig gemacht werden.',
  },
  project: {
    newPattern: 'Neue Anleitung',
    namePlaceholder: 'Name der Anleitung, z. B. Linker Ärmel',
    empty: 'Noch keine Anleitungen.',
    missing: 'Dieses Projekt gibt es nicht mehr.',
    deleteMessage:
      'Das löscht „{{name}}“ mit Code und deiner Reihe. Das kann nicht rückgängig gemacht werden.',
    progressRow: 'Reihe {{row}}',
    progressRowOf: 'Reihe {{row}} von {{total}}',
    finished: 'Fertig',
  },
  counter: {
    rowLabel: 'REIHE',
    lastRow: 'Letzte Reihe',
    payAttention: 'Achtung',
    noInstruction: 'Keine Anweisung für diese Reihe.',
    normalRow: 'Normale Reihe: {{text}}',
    stitchesLabel: 'MASCHEN',
    onNeedle: 'auf der Nadel',
    stitchChange: '{{change}} in dieser Reihe',
    finished_one: 'Fertig · {{count}} Reihe',
    finished_other: 'Fertig · {{count}} Reihen',
    finishedTitle: 'Fertig gestrickt!',
    allRowsDone_one: 'Die {{count}} Reihe ist geschafft. Tippe auf −, wenn du zurück willst.',
    allRowsDone_other: 'Alle {{count}} Reihen geschafft. Tippe auf −, wenn du zurück willst.',
    restartFromRowOne: 'Neu ab Reihe 1 beginnen',
    restart: 'Neu anfangen',
    restartQuestion: 'Zurück zu Reihe 1?',
    backOneRow: 'Eine Reihe zurück',
    nextRow: 'Reihe fertig, nächste Reihe',
  },
  editSheet: {
    title: {
      project: 'Projekt bearbeiten',
      pattern: 'Anleitung bearbeiten',
    },
    saveName: 'Name speichern',
    askDelete: {
      project: 'Projekt löschen…',
      pattern: 'Anleitung löschen…',
    },
    delete: {
      project: 'Projekt löschen',
      pattern: 'Anleitung löschen',
    },
    keep: 'Behalten',
  },
};
