export type Project = {
  id: string;
  name: string;
  patterns: Pattern[];
  updatedAt: number;
};

export type Pattern = {
  id: string;
  name: string;
  code: string;
  currentRow: number;
};

export type SavedData = {
  version: 1;
  projects: Project[];
  openPatternId: string | null;
};
