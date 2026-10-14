import { type NativeStackNavigationProp, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

type RestoreParams = Record<string, { restore?: string } | undefined>;

export function useClearRestoreParam() {
  const navigation = useNavigation<NativeStackNavigationProp<RestoreParams>>();
  const { restore } = useLocalSearchParams<{ restore?: string }>();

  useEffect(() => {
    if (!restore) return;
    return navigation.addListener('transitionEnd', () => {
      navigation.setParams({ restore: undefined });
    });
  }, [navigation, restore]);
}
