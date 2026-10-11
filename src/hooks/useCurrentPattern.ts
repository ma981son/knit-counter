import { useMemo } from 'react';

import { parsePatternCode } from '@/src/pattern/parse';
import { getStitchCounts } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';

export function useCurrentPattern() {
    const pattern = useStore((state) => state.projects[0]?.patterns[0]);

    const code = pattern?.code ?? '';
    const parsed = useMemo(() => parsePatternCode(code).pattern, [code]);
    const stitchCounts = useMemo(() => getStitchCounts(parsed), [parsed]);

    return { pattern, parsed, stitchCounts };
}