import { useColorScheme as useColorSchemeCore } from 'react-native';

export function useColorScheme() {
  const scheme = useColorSchemeCore();
  return scheme === 'dark' ? 'dark' : 'light';
}
