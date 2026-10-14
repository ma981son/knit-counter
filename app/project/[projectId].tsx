import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';

import { AddItem } from '@/src/components/AddItem';
import { EditItemSheet } from '@/src/components/EditItemSheet';
import { ListCard } from '@/src/components/ListCard';
import { useClearRestoreParam } from '@/src/hooks/useClearRestoreParam';
import { parsePatternCode } from '@/src/pattern/parse';
import { useStore } from '@/src/store/store';
import type { Pattern } from '@/src/store/types';
import { fonts, useTheme } from '@/src/theme';
import type { TFunction } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function progressText(pattern: Pattern, t: TFunction): string {
  const totalRows = parsePatternCode(pattern.code).pattern.totalRows;
  if (totalRows === 0) return t('project.progressRow', { row: pattern.currentRow });
  if (pattern.currentRow > totalRows) return t('project.finished');
  return t('project.progressRowOf', { row: pattern.currentRow, total: totalRows });
}

export default function ProjectScreen() {
  useClearRestoreParam();
  const colors = useTheme();
  const { t } = useTranslation();
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
              label={t('project.newPattern')}
              placeholder={t('project.namePlaceholder')}
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
            subtitle={progressText(item, t)}
            onPress={() => open(item.id)}
            onLongPress={() => setEditing(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>
            {project ? t('project.empty') : t('project.missing')}
          </Text>
        }
      />
      <EditItemSheet
        visible={editing !== null}
        kind="pattern"
        initialName={editing?.name ?? ''}
        deleteMessage={t('project.deleteMessage', { name: editing?.name })}
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
