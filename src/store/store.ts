import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { parsePatternCode } from '../pattern/parse';
import i18n from '../i18n';
import { getExample } from '../patterns/examples';
import * as actions from './actions';
import type { Pattern, SavedData, Settings } from './types';

function maxRowFor(code: string): number {
  const { totalRows } = parsePatternCode(code).pattern;
  return totalRows > 0 ? totalRows + 1 : Infinity;
}

export function findPattern(data: SavedData, patternId: string): Pattern | undefined {
  for (const project of data.projects) {
    const pattern = project.patterns.find((p) => p.id === patternId);
    if (pattern) return pattern;
  }
  return undefined;
}

export function selectOpenPattern(state: SavedData): Pattern | undefined {
  return findPattern(state, state.openPatternId ?? '') ?? state.projects[0]?.patterns[0];
}

type Store = SavedData & {
  addProject: (name: string) => string;
  addPattern: (projectId: string, name: string, code?: string) => string;
  setRow: (patternId: string, row: number) => void;
  nextRow: (patternId: string) => void;
  previousRow: (patternId: string) => void;
  updateCode: (patternId: string, code: string) => void;
  renamePattern: (patternId: string, name: string) => void;
  renameProject: (projectId: string, name: string) => void;
  deletePattern: (patternId: string) => void;
  deleteProject: (projectId: string) => void;
  openPattern: (patternId: string) => void;
  updateSettings: (changes: Partial<Settings>) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...actions.emptyData,

      addProject: (name) => {
        const id = actions.createId();
        set((state) => actions.addProject(state, { id, name, now: Date.now() }));
        return id;
      },

      addPattern: (projectId, name, code) => {
        const id = actions.createId();
        set((state) => actions.addPattern(state, { projectId, id, name, code, now: Date.now() }));
        return id;
      },

      setRow: (patternId, row) => {
        const pattern = findPattern(get(), patternId);
        if (!pattern) return;
        set((state) =>
          actions.setRow(state, {
            patternId,
            row,
            maxRow: maxRowFor(pattern.code),
            now: Date.now(),
          }),
        );
      },

      nextRow: (patternId) => {
        const pattern = findPattern(get(), patternId);
        if (pattern) get().setRow(patternId, pattern.currentRow + 1);
      },

      previousRow: (patternId) => {
        const pattern = findPattern(get(), patternId);
        if (pattern) get().setRow(patternId, pattern.currentRow - 1);
      },

      updateCode: (patternId, code) =>
        set((state) =>
          actions.updateCode(state, { patternId, code, maxRow: maxRowFor(code), now: Date.now() }),
        ),

      renamePattern: (patternId, name) =>
        set((state) => actions.renamePattern(state, { patternId, name, now: Date.now() })),

      renameProject: (projectId, name) =>
        set((state) => actions.renameProject(state, { projectId, name, now: Date.now() })),

      deletePattern: (patternId) =>
        set((state) => actions.deletePattern(state, { patternId, now: Date.now() })),

      deleteProject: (projectId) => set((state) => actions.deleteProject(state, { projectId })),

      openPattern: (patternId) => set({ openPatternId: patternId }),

      updateSettings: (changes) => set((state) => actions.updateSettings(state, changes)),
    }),
    {
      name: 'knit-counter-data',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state): SavedData => ({
        version: state.version,
        projects: state.projects,
        openPatternId: state.openPatternId,
        settings: state.settings,
      }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<SavedData> | undefined;
        return {
          ...current,
          ...saved,
          settings: { ...actions.defaultSettings, ...saved?.settings },
        };
      },
      onRehydrateStorage: () => (state) => {
        if (state && state.projects.length === 0) {
          const example = getExample(i18n.resolvedLanguage ?? i18n.language);
          const projectId = state.addProject(example.projectName);
          state.addPattern(projectId, example.patternName, example.code);
        }
      },
    },
  ),
);
