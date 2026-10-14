import type { en } from './en';

export const de: typeof en = {
  common: {
    add: 'Hinzufügen',
    cancel: 'Abbrechen',
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
