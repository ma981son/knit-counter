import {
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
} from '@expo-google-fonts/figtree';
import { YoungSerif_400Regular } from '@expo-google-fonts/young-serif';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import { useAppearanceSync } from '@/src/hooks/useAppearanceSync';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { useLanguageSync } from '@/src/i18n/useLanguageSync';
import { useHasHydrated } from '@/src/hooks/useHasHydrated';
import { useRowNotification } from '@/src/notifications/useRowNotification';
import { findPattern, useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  anchor: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useLanguageSync();
  useAppearanceSync();
  useRowNotification();

  const [loaded, error] = useFonts({
    YoungSerif_400Regular,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
  });
  const hydrated = useHasHydrated();
  const restoring = useStore(
    (state) =>
      state.openPatternId !== null && findPattern(state, state.openPatternId) !== undefined,
  );

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && hydrated && !restoring) {
      SplashScreen.hideAsync();
    }
  }, [loaded, hydrated, restoring]);

  if (!loaded || !hydrated) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = useTheme();
  const router = useRouter();

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
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: fonts.display, fontSize: 22 },
          headerTintColor: colors.text,
          headerRight: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('settings.title')}
              hitSlop={12}
              onPress={() => router.push('/settings')}
            >
              <SymbolView
                name={{ android: 'settings', ios: 'gearshape', web: 'settings' }}
                tintColor={colors.text}
                size={24}
              />
            </Pressable>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: t('projects.title') }} />
        <Stack.Screen
          name="settings"
          options={{ title: t('settings.title'), headerRight: () => null }}
        />
        <Stack.Screen name="project/[projectId]" options={restorableScreen} />
        <Stack.Screen name="pattern/[patternId]" options={restorableScreen} />
      </Stack>
    </ThemeProvider>
  );
}

function restorableScreen({ route }: { route: { params?: object } }) {
  const isRestoring =
    route.params !== undefined && 'restore' in route.params && route.params.restore !== undefined;
  return { title: '', animation: isRestoring ? 'none' : 'default' } as const;
}
