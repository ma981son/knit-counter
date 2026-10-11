import type { Pattern, Project, SavedData } from './types';

export const emptyData: SavedData = { version: 1, projects: [] };

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

// Move to a row. maxRow is the "finished" row (totalRows + 1).
export function setRow(
    data: SavedData,
    args: { patternId: string; row: number; maxRow: number; now: number },
): SavedData {
    const row = Math.max(1, Math.min(args.row, args.maxRow));
    return updatePattern(data, args.patternId, args.now, (pattern) => ({ ...pattern, currentRow: row }));
}