import type { RowRange } from './types';

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