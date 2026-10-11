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

