import { useMemo } from 'react';

import { parsePatternCode } from '@/src/pattern/parse';
import { getStitchCounts } from '@/src/pattern/rows';
import { selectOpenPattern, useStore } from '@/src/store/store';

export function useCurrentPattern() {
    const pattern = useStore(selectOpenPattern);

    const code = pattern?.code ?? '';
    const result = useMemo(() => parsePatternCode(code), [code]);
    const stitchCounts = useMemo(() => getStitchCounts(result.pattern), [result]);

    return { pattern, parsed: result.pattern, warnings: result.warnings, stitchCounts };
}