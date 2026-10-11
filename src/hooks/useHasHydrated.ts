import { useEffect, useState } from 'react';

import { useStore } from '@/src/store/store';

export function useHasHydrated() {
    const [hydrated, setHydrated] = useState(useStore.persist.hasHydrated());

    useEffect(() => {
        const unsubscribe = useStore.persist.onFinishHydration(() => setHydrated(true));
        setHydrated(useStore.persist.hasHydrated());
        return unsubscribe;
    }, []);

    return hydrated;
}