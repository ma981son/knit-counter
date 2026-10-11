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