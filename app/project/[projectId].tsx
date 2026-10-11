import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';

import { ListCard } from '@/src/components/ListCard';
import { parsePatternCode } from '@/src/pattern/parse';
import { useStore } from '@/src/store/store';
import type { Pattern } from '@/src/store/types';
import { fonts, useTheme } from '@/src/theme';

function progressText(pattern: Pattern): string {
  const totalRows = parsePatternCode(pattern.code).pattern.totalRows;
  if (totalRows === 0) return `Row ${pattern.currentRow}`;
  if (pattern.currentRow > totalRows) return 'Finished';
  return `Row ${pattern.currentRow} of ${totalRows}`;
}

export default function ProjectScreen() {
  const colors = useTheme();
  const router = useRouter();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const project = useStore((state) => state.projects.find((p) => p.id === projectId));
  const openPattern = useStore((state) => state.openPattern);

  function open(patternId: string) {
    openPattern(patternId);
    router.navigate({ pathname: '/pattern/[patternId]', params: { patternId } });
  }

  return (
    <>
      <Stack.Screen options={{ title: project?.name ?? '' }} />
      <FlatList
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.list}
        data={project?.patterns ?? []}
        keyExtractor={(pattern) => pattern.id}
        renderItem={({ item }) => (
          <ListCard title={item.name} subtitle={progressText(item)} onPress={() => open(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>
            {project ? 'No patterns yet.' : 'This project no longer exists.'}
          </Text>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 12,
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});