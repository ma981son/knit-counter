export type RowRange = {
  from: number;
  to: number;
};

export type PatternCodeLine = {
  lineNumber: number;
  singleRows: number[];
  ranges: RowRange[];
  highlight: boolean;
  isEnd: boolean;
  parts: string[];
  stitchChange: number;
};

export type ParsedPattern = {
  lines: PatternCodeLine[];
  castOn: number | null;
  endRow: number | null;
  totalRows: number;
};

export type ParseResult = {
  pattern: ParsedPattern;
  warnings: string[];
};

export type RowInstruction = {
  text: string;
  highlight: boolean;
  stitchChange: number;
};

export type RowInfo = {
  row: number;
  instructions: RowInstruction[];
  normalRow: string | null;
  highlight: boolean;
  isLastRow: boolean;
  isEmpty: boolean;
  stitchChange: number;
};
