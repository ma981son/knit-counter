import { findRowProblems } from './rows';
import type { ParsedPattern, ParseResult, PatternCodeLine, RowRange } from './types';

export type ParsedRows = {
  singleRows: number[];
  ranges: RowRange[];
  invalid: string[];
};

const ROW_WORD = /^\s*(rows?|rounds?|rnds?|rd|reihen?|runden?)\.?\s*/i;

export function parseRows(spec: string): ParsedRows {
  const result: ParsedRows = { singleRows: [], ranges: [], invalid: [] };
  const cleaned = spec.replace(ROW_WORD, '');

  for (const raw of cleaned.split(',')) {
    const part = raw.trim();
    if (part === '') continue;

    let match = part.match(/^(\d+)\s*(?:-|–|—|to|bis)\s*(\d+)$/i);
    if (match) {
      const from = Number(match[1]);
      const to = Number(match[2]);
      if (from < 1 || from > to) result.invalid.push(part);
      else result.ranges.push({ from, to });
      continue;
    }

    match = part.match(/^(\d+)\s*\+$/);
    if (match) {
      const from = Number(match[1]);
      if (from < 1) result.invalid.push(part);
      else result.ranges.push({ from, to: Infinity });
      continue;
    }

    match = part.match(/^(\d+)$/);
    if (match) {
      const row = Number(match[1]);
      if (row < 1) result.invalid.push(part);
      else result.singleRows.push(row);
      continue;
    }

    result.invalid.push(part);
  }

  return result;
}

export type ParsedInstruction = {
  highlight: boolean;
  isEnd: boolean;
  stitchChange: number;
  parts: string[];
};

export function parseInstruction(input: string): ParsedInstruction {
  let text = input.trim();
  let highlight = false;
  let isEnd = false;

  while (true) {
    if (text.startsWith('!')) {
      highlight = true;
      text = text.slice(1).trim();
    } else if (/^END\b/.test(text)) {
      isEnd = true;
      text = text.slice(3).trim();
    } else {
      break;
    }
  }

  let stitchChange = 0;
  text = text
    .replace(/\(\s*([+\-−])\s*(\d+)\s*\)/g, (_match, sign: string, amount: string) => {
      stitchChange += (sign === '+' ? 1 : -1) * Number(amount);
      return '';
    })
    .replace(/\s{2,}/g, ' ')
    .trim();

  const parts = text
    .split('|')
    .map((part) => part.trim())
    .filter((part) => part !== '');
  if (parts.length === 0) parts.push(isEnd ? 'Last row' : '');

  return { highlight, isEnd, stitchChange, parts };
}

const CAST_ON = /^(cast\s*on|co|anschlag(?:en)?)\s*:\s*(\d+)\s*$/i;
const STARTS_WITH_ROWS = /^\s*(rows?|rounds?|rnds?|rd|reihen?|runden?)?\.?\s*\d/i;

function shorten(text: string): string {
  return text.length > 40 ? text.slice(0, 40) + '…' : text;
}

export function parsePatternCode(code: string): ParseResult {
  const lines: PatternCodeLine[] = [];
  const warnings: string[] = [];
  let castOn: number | null = null;

  for (const [index, rawLine] of code.split(/\r?\n/).entries()) {
    const lineNumber = index + 1;
    const line = rawLine.trim();
    if (line === '') continue;

    const castOnMatch = line.match(CAST_ON);
    if (castOnMatch) {
      castOn = Number(castOnMatch[2]);
      continue;
    }

    const colon = line.indexOf(':');
    const rowPart = colon === -1 ? '' : line.slice(0, colon);
    if (colon === -1 || !STARTS_WITH_ROWS.test(rowPart)) {
      warnings.push(
        `Line ${lineNumber} was skipped because it doesn't start with a row number: "${shorten(line)}"`,
      );
      continue;
    }

    const rows = parseRows(rowPart);
    for (const part of rows.invalid) {
      warnings.push(`Line ${lineNumber}: "${part}" isn't a row number or range.`);
    }
    if (rows.singleRows.length === 0 && rows.ranges.length === 0) continue;

    const instruction = parseInstruction(line.slice(colon + 1));
    lines.push({
      lineNumber,
      singleRows: rows.singleRows,
      ranges: rows.ranges,
      ...instruction,
    });
  }

  const endRows = lines
    .filter((line) => line.isEnd)
    .flatMap((line) => [...line.singleRows, ...line.ranges.map((range) => range.from)]);
  const endRow = endRows.length > 0 ? Math.min(...endRows) : null;

  let highestRow = 0;
  for (const line of lines) {
    for (const row of line.singleRows) highestRow = Math.max(highestRow, row);
    for (const range of line.ranges) {
      highestRow = Math.max(highestRow, Number.isFinite(range.to) ? range.to : range.from);
    }
  }

  const totalRows = endRow ?? highestRow;

  if (endRow !== null && highestRow > endRow) {
    warnings.push(
      `The pattern ends at row ${endRow} (END), so rows after that are ignored (up to row ${highestRow}).`,
    );
  }
  if (totalRows === 0) {
    warnings.push('No rows found yet. Start a line with a row number, like "1-6: Knit".');
  }

  const pattern: ParsedPattern = { lines, castOn, endRow, totalRows };
  warnings.push(...findRowProblems(pattern));

  return { pattern, warnings };
}
