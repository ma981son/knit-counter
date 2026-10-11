import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import { AddItem } from '@/src/components/AddItem';
import { ListCard } from '@/src/components/ListCard';
import { useHasHydrated } from '@/src/hooks/useHasHydrated';
import { findPattern, useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

export default function ProjectsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const projects = useStore((state) => state.projects);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => b.updatedAt - a.updatedAt),
    [projects],
  );
  
  const hydrated = useHasHydrated();
  const didAutoOpen = useRef(false);
  
  const addProject = useStore((state) => state.addProject);

  useEffect(() => {
    if (!hydrated || didAutoOpen.current) return;
    didAutoOpen.current = true;

    const state = useStore.getState();
    const pattern = state.openPatternId ? findPattern(state, state.openPatternId) : undefined;
    if (!pattern) return;

    const project = state.projects.find((p) => p.patterns.some((x) => x.id === pattern.id));
    if (project) {
      router.push({ pathname: '/project/[projectId]', params: { projectId: project.id } });
    }
    router.push({ pathname: '/pattern/[patternId]', params: { patternId: pattern.id } });
  }, [hydrated, router]);

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      
      contentContainerStyle={styles.list}
      data={sortedProjects}
      keyExtractor={(project) => project.id}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <AddItem
          label="New project"
          placeholder="Project name, e.g. Sweater"
          onAdd={(name) => {
            const id = addProject(name);
            router.push({ pathname: '/project/[projectId]', params: { projectId: id } });
          }}
        />
      }
      renderItem={({ item }) => (
        <ListCard
          title={item.name}
          subtitle={item.patterns.length === 1 ? '1 pattern' : `${item.patterns.length} patterns`}
          onPress={() =>
            router.navigate({ pathname: '/project/[projectId]', params: { projectId: item.id } })
          }
        />
      )
    }
      ListEmptyComponent={
        <Text style={[styles.empty, { color: colors.muted }]}>No projects yet.</Text>
      }
    />
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