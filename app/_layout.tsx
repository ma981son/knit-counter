import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { fonts, useTheme } from '@/src/theme';
import {
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
} from '@expo-google-fonts/figtree';
import { YoungSerif_400Regular } from '@expo-google-fonts/young-serif';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    YoungSerif_400Regular,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const colors = useTheme();

  const base = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.line,
      primary: colors.accent,
    },
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: fonts.display, fontSize: 22 },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Projects' }} />
        <Stack.Screen name="project/[projectId]" options={{ title: '' }} />
        <Stack.Screen name="pattern/[patternId]" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
