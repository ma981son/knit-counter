import { useEffect } from 'react';

import SplashTheme from '@/modules/splash-theme/src/SplashThemeModule';
import { useHasHydrated } from '@/src/hooks/useHasHydrated';
import { useStore } from '@/src/store/store';
import { DEFAULT_PALETTE } from '@/src/theme';

export function useSplashThemeSync() {
  const palette = useStore((state) => state.settings.palette);
  const hydrated = useHasHydrated();

  useEffect(() => {
    if (!hydrated || !SplashTheme) return;
    const name = palette === DEFAULT_PALETTE ? null : palette.charAt(0).toUpperCase() + palette.slice(1);
    SplashTheme.setTheme(name);
  }, [palette, hydrated]);
}
