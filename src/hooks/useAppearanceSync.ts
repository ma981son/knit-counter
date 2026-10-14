import { useEffect } from 'react';
import { Appearance } from 'react-native';

import { useStore } from '@/src/store/store';

export function useAppearanceSync() {
  const appearance = useStore((state) => state.settings.appearance);

  useEffect(() => {
    Appearance.setColorScheme(appearance === 'system' ? 'unspecified' : appearance);
  }, [appearance]);
}
