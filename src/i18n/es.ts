import type { en } from './en';

export const es: typeof en = {
  common: {
    add: 'Agregar',
    cancel: 'Cancelar',
  },
  tabs: {
    counter: 'Contador',
    rows: 'Filas',
    code: 'Código',
  },
  notFound: {
    title: '¡Ups!',
    message: 'Esta pantalla no existe.',
    link: 'Ir a tus proyectos',
  },
  projects: {
    title: 'Proyectos',
    newProject: 'Nuevo proyecto',
    namePlaceholder: 'Nombre del proyecto, p. ej. Suéter',
    patternCount_one: '{{count}} patrón',
    patternCount_other: '{{count}} patrones',
    empty: 'Aún no hay proyectos.',
    deleteMessage: 'Esto elimina "{{name}}" y todos sus patrones. No se puede deshacer.',
  },
  project: {
    newPattern: 'Nuevo patrón',
    namePlaceholder: 'Nombre del patrón, p. ej. Manga izquierda',
    empty: 'Aún no hay patrones.',
    missing: 'Este proyecto ya no existe.',
    deleteMessage: 'Esto elimina "{{name}}" con su código y tu fila. No se puede deshacer.',
    progressRow: 'Fila {{row}}',
    progressRowOf: 'Fila {{row}} de {{total}}',
    finished: 'Terminado',
  },
  editSheet: {
    title: {
      project: 'Editar proyecto',
      pattern: 'Editar patrón',
    },
    saveName: 'Guardar nombre',
    askDelete: {
      project: 'Eliminar proyecto…',
      pattern: 'Eliminar patrón…',
    },
    delete: {
      project: 'Eliminar proyecto',
      pattern: 'Eliminar patrón',
    },
    keep: 'Conservar',
  },
};
