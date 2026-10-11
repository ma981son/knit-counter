
export type Project = {
    id: string;
    name: string;
    pieces: Pattern[];
    updatedAt: number;
};

export type Pattern = {
    id: string;
    name: string;
    patternText: string;
    currentRow: number;
};

export type SavedData = {
    version: 1;
    projects: Project[];
};