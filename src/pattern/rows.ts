import type { ParsedPattern, RowInfo, RowInstruction } from './types';

export function getRowInfo(pattern: ParsedPattern, row: number): RowInfo {
    const specific: RowInstruction[] = [];
    let normal: { instruction: RowInstruction; from: number } | null = null;

    for (const line of pattern.lines) {
        const index = line.singleRows.indexOf(row);
        if (index !== -1) {
            specific.push({
                text: line.parts[index % line.parts.length],
                highlight: line.highlight,
                stitchChange: line.stitchChange,
            });
        }

        for (const range of line.ranges) {
            if (row < range.from || row > range.to) continue;
            if (normal === null || range.from >= normal.from) {
                normal = {
                    instruction: {
                        text: line.parts[(row - range.from) % line.parts.length],
                        highlight: line.highlight,
                        stitchChange: line.stitchChange,
                    },
                    from: range.from,
                };
            }
        }
    }

    const instructions =
        specific.length > 0 ? specific : normal !== null ? [normal.instruction] : [];

    return {
        row,
        instructions,
        normalRow: specific.length > 0 && normal !== null ? normal.instruction.text : null,
        highlight: instructions.some((instruction) => instruction.highlight),
        isLastRow: row === pattern.endRow,
        isEmpty: instructions.length === 0,
        stitchChange: instructions.reduce((sum, instruction) => sum + instruction.stitchChange, 0),
    };
}

export function getStitchCounts(pattern: ParsedPattern): number[] | null {
    if (pattern.castOn === null) return null;

    const counts: number[] = [];
    let current = pattern.castOn;

    for (let row = 1; row <= pattern.totalRows; row++) {
        counts[row] = current;
        current += getRowInfo(pattern, row).stitchChange;
    }
    counts[pattern.totalRows + 1] = current;

    return counts;
}

export function findRowProblems(pattern: ParsedPattern): string[] {
    const gaps: number[] = [];
    const overlaps: number[] = [];

    for (let row = 1; row <= pattern.totalRows; row++) {
        if (getRowInfo(pattern, row).isEmpty) gaps.push(row);

        let fixedRanges = 0;
        for (const line of pattern.lines) {
            for (const range of line.ranges) {
                const isFixed = Number.isFinite(range.to);
                if (isFixed && row >= range.from && row <= range.to) fixedRanges++;
            }
        }
        if (fixedRanges > 1) overlaps.push(row);
    }

    const warnings: string[] = [];
    if (gaps.length > 0) {
        warnings.push(`No instruction for ${describeRows(gaps)}. They'll show as empty.`);
    }
    if (overlaps.length > 0) {
        warnings.push(`Two fixed ranges both cover ${describeRows(overlaps)}. The one that starts later wins.`);
    }
    return warnings;
}

function describeRows(rows: number[]): string {
    const groups: [number, number][] = [];
    for (const row of rows) {
        const last = groups[groups.length - 1];
        if (last && last[1] === row - 1) last[1] = row;
        else groups.push([row, row]);
    }
    const text = groups
        .map(([from, to]) => (from === to ? `${from}` : `${from}–${to}`))
        .join(', ');
    return rows.length === 1 ? `row ${text}` : `rows ${text}`;
}