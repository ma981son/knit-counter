
export type Project = {
    id: string;
    name: string;
    pieces: Pattern[];
    updatedAt: number;
};

export type Pattern = {
    id: string;
    code: string;
    patternText: string;
    currentRow: number;
};

export type SavedData = {
    version: 1;
    projects: Project[];
};