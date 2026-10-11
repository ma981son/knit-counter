import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import { parsePatternCode } from '@/src/pattern/parse';
import { getStitchCounts } from '@/src/pattern/rows';
import { findPattern, useStore } from '@/src/store/store';

export function useCurrentPattern() {
    const { patternId } = useLocalSearchParams<{ patternId: string }>();
    const pattern = useStore((state) => findPattern(state, patternId));

    const code = pattern?.code ?? '';
    const result = useMemo(() => parsePatternCode(code), [code]);
    const stitchCounts = useMemo(() => getStitchCounts(result.pattern), [result]);

    return { pattern, parsed: result.pattern, warnings: result.warnings, stitchCounts };
}