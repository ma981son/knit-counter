import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text } from 'react-native';

import { AddItem } from '@/src/components/AddItem';
import { EditItemSheet } from '@/src/components/EditItemSheet';
import { ListCard } from '@/src/components/ListCard';
import { useHasHydrated } from '@/src/hooks/useHasHydrated';
import { findPattern, useStore } from '@/src/store/store';
import { Project } from '@/src/store/types';
import { fonts, useTheme } from '@/src/theme';

export default function ProjectsScreen() {
  const colors = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const projects = useStore((state) => state.projects);
  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => b.updatedAt - a.updatedAt),
    [projects],
  );
  const hydrated = useHasHydrated();
  const didAutoOpen = useRef(false);
  const addProject = useStore((state) => state.addProject);
  const renameProject = useStore((state) => state.renameProject);
  const deleteProject = useStore((state) => state.deleteProject);
  const [editing, setEditing] = useState<Project | null>(null);

  useEffect(() => {
    if (!hydrated || didAutoOpen.current) return;
    didAutoOpen.current = true;

    const state = useStore.getState();
    const pattern = state.openPatternId ? findPattern(state, state.openPatternId) : undefined;
    if (!pattern) return;

    const project = state.projects.find((p) => p.patterns.some((x) => x.id === pattern.id));
    if (project) {
      router.push({
        pathname: '/project/[projectId]',
        params: { projectId: project.id, restore: '1' },
      });
    }
    router.push({
      pathname: '/pattern/[patternId]',
      params: { patternId: pattern.id, restore: '1' },
    });
  }, [hydrated, router]);

  return (
    <>
      <FlatList
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.list}
        data={sortedProjects}
        keyExtractor={(project) => project.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <AddItem
            label={t('projects.newProject')}
            placeholder={t('projects.namePlaceholder')}
            onAdd={(name) => {
              const id = addProject(name);
              router.push({ pathname: '/project/[projectId]', params: { projectId: id } });
            }}
          />
        }
        renderItem={({ item }) => (
          <ListCard
            title={item.name}
            subtitle={t('projects.patternCount', { count: item.patterns.length })}
            onPress={() =>
              router.navigate({ pathname: '/project/[projectId]', params: { projectId: item.id } })
            }
            onLongPress={() => setEditing(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>{t('projects.empty')}</Text>
        }
      />
      <EditItemSheet
        visible={editing !== null}
        kind="project"
        initialName={editing?.name ?? ''}
        deleteMessage={t('projects.deleteMessage', { name: editing?.name })}
        onRename={(name) => editing && renameProject(editing.id, name)}
        onDelete={() => editing && deleteProject(editing.id)}
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
