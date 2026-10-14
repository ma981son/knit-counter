import { Stack, Tabs, useLocalSearchParams } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useClearRestoreParam } from '@/src/hooks/useClearRestoreParam';
import { selectOpenPattern, useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

type TabIconProps = {
  name: SymbolViewProps['name'];
  color: SymbolViewProps['tintColor'];
};

function TabIcon({ name, color }: TabIconProps) {
  return <SymbolView name={name} tintColor={color} size={26} />;
}

export default function PatternLayout() {
  useClearRestoreParam();
  const colors = useTheme();
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ patternId: string }>();
  const openPattern = useStore((state) => state.openPattern);
  const patternName = useStore((state) => selectOpenPattern(state)?.name);

  useEffect(() => {
    if (params.patternId) openPattern(params.patternId);
  }, [params.patternId, openPattern]);

  return (
    <>
      <Stack.Screen options={{ title: patternName ?? '' }} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line },
          tabBarLabelStyle: { fontFamily: fonts.bodySemiBold, fontSize: 12 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('tabs.counter'),
            tabBarIcon: ({ color }) => (
              <TabIcon
                name={{ android: 'add_circle', ios: 'plus.circle', web: 'add_circle' }}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="rows"
          options={{
            title: t('tabs.rows'),
            tabBarIcon: ({ color }) => (
              <TabIcon
                name={{
                  android: 'format_list_numbered',
                  ios: 'list.number',
                  web: 'format_list_numbered',
                }}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="code"
          options={{
            title: t('tabs.code'),
            tabBarIcon: ({ color }) => (
              <TabIcon
                name={{
                  android: 'code',
                  ios: 'chevron.left.forwardslash.chevron.right',
                  web: 'code',
                }}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
