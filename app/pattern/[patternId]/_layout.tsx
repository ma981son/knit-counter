import { Tabs, useLocalSearchParams } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useEffect } from 'react';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
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
  const colors = useTheme();
  const params = useLocalSearchParams<{ patternId: string }>();
  const openPattern = useStore((state) => state.openPattern);
  const patternName = useStore((state) => selectOpenPattern(state)?.name);

  useEffect(() => {
    if (params.patternId) openPattern(params.patternId);
  }, [params.patternId, openPattern]);

  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, true),
        headerTitle: patternName ?? 'Knit counter',
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: { fontFamily: fonts.display, fontSize: 22, color: colors.text },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line },
        tabBarLabelStyle: { fontFamily: fonts.bodySemiBold, fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Counter',
          tabBarIcon: ({ color }) => (
            <TabIcon name={{ android: 'add_circle', ios: 'plus.circle', web: 'add_circle' }} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rows"
        options={{
          title: 'Rows',
          tabBarIcon: ({ color }) => (
            <TabIcon
              name={{ android: 'format_list_numbered', ios: 'list.number', web: 'format_list_numbered' }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="code"
        options={{
          title: 'Code',
          tabBarIcon: ({ color }) => (
            <TabIcon
              name={{ android: 'code', ios: 'chevron.left.forwardslash.chevron.right', web: 'code' }}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}