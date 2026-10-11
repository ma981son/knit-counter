import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';

import { AddItem } from '@/src/components/AddItem';
import { EditItemSheet } from '@/src/components/EditItemSheet';
import { ListCard } from '@/src/components/ListCard';
import { parsePatternCode } from '@/src/pattern/parse';
import { useStore } from '@/src/store/store';
import type { Pattern } from '@/src/store/types';
import { fonts, useTheme } from '@/src/theme';
import { useState } from 'react';

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
  const addPattern = useStore((state) => state.addPattern);
  const renamePattern = useStore((state) => state.renamePattern);
  const deletePattern = useStore((state) => state.deletePattern);
  const [editing, setEditing] = useState<Pattern | null>(null);

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
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          project ? (
            <AddItem
              label="New pattern"
              placeholder="Pattern name, e.g. Left sleeve"
              onAdd={(name) => {
                const id = addPattern(project.id, name);
                openPattern(id);
                router.push({ pathname: '/pattern/[patternId]/code', params: { patternId: id } });
              }}
            />
          ) : null
        }
        renderItem={({ item }) => (
          <ListCard
            title={item.name}
            subtitle={progressText(item)}
            onPress={() => open(item.id)}
            onLongPress={() => setEditing(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>
            {project ? 'No patterns yet.' : 'This project no longer exists.'}
          </Text>
        }
      />
      <EditItemSheet
        visible={editing !== null}
        kind="pattern"
        initialName={editing?.name ?? ''}
        deleteMessage={`This deletes "${editing?.name}" with its code and your row. This can't be undone.`}
        onRename={(name) => editing && renamePattern(editing.id, name)}
        onDelete={() => editing && deletePattern(editing.id)}
        onClose={() => setEditing(null)}
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
