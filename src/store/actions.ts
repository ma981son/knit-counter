import type { Pattern, Project, SavedData, Settings } from './types';

export const defaultSettings: Settings = {
  language: 'system',
  appearance: 'system',
  vibration: true,
  notification: true,
  notificationSound: true,
  keepAwake: true,
};

export const emptyData: SavedData = {
  version: 1,
  projects: [],
  openPatternId: null,
  settings: defaultSettings,
};

export function createId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function updatePattern(
  data: SavedData,
  patternId: string,
  now: number,
  change: (pattern: Pattern) => Pattern,
): SavedData {
  return {
    ...data,
    projects: data.projects.map((project) => {
      if (!project.patterns.some((pattern) => pattern.id === patternId)) return project;
      return {
        ...project,
        updatedAt: now,
        patterns: project.patterns.map((pattern) =>
          pattern.id === patternId ? change(pattern) : pattern,
        ),
      };
    }),
  };
}

export function addProject(
  data: SavedData,
  args: { id: string; name: string; now: number },
): SavedData {
  const project: Project = { id: args.id, name: args.name, patterns: [], updatedAt: args.now };
  return { ...data, projects: [...data.projects, project] };
}

export function addPattern(
  data: SavedData,
  args: { projectId: string; id: string; name: string; code?: string; now: number },
): SavedData {
  const pattern: Pattern = { id: args.id, name: args.name, code: args.code ?? '', currentRow: 1 };
  return {
    ...data,
    projects: data.projects.map((project) =>
      project.id === args.projectId
        ? { ...project, updatedAt: args.now, patterns: [...project.patterns, pattern] }
        : project,
    ),
  };
}

export function setRow(
  data: SavedData,
  args: { patternId: string; row: number; maxRow: number; now: number },
): SavedData {
  const row = Math.max(1, Math.min(args.row, args.maxRow));
  return updatePattern(data, args.patternId, args.now, (pattern) => ({
    ...pattern,
    currentRow: row,
  }));
}

export function updateCode(
  data: SavedData,
  args: { patternId: string; code: string; maxRow: number; now: number },
): SavedData {
  return updatePattern(data, args.patternId, args.now, (pattern) => ({
    ...pattern,
    code: args.code,
    currentRow: Math.min(pattern.currentRow, args.maxRow),
  }));
}

export function renamePattern(
  data: SavedData,
  args: { patternId: string; name: string; now: number },
): SavedData {
  return updatePattern(data, args.patternId, args.now, (pattern) => ({
    ...pattern,
    name: args.name,
  }));
}

export function renameProject(
  data: SavedData,
  args: { projectId: string; name: string; now: number },
): SavedData {
  return {
    ...data,
    projects: data.projects.map((project) =>
      project.id === args.projectId
        ? { ...project, name: args.name, updatedAt: args.now }
        : project,
    ),
  };
}

export function deletePattern(
  data: SavedData,
  args: { patternId: string; now: number },
): SavedData {
  return {
    ...data,
    projects: data.projects.map((project) =>
      project.patterns.some((pattern) => pattern.id === args.patternId)
        ? {
            ...project,
            updatedAt: args.now,
            patterns: project.patterns.filter((pattern) => pattern.id !== args.patternId),
          }
        : project,
    ),
  };
}

export function deleteProject(data: SavedData, args: { projectId: string }): SavedData {
  return { ...data, projects: data.projects.filter((project) => project.id !== args.projectId) };
}

export function updateSettings(data: SavedData, changes: Partial<Settings>): SavedData {
  return { ...data, settings: { ...data.settings, ...changes } };
}
