import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import { ListCard } from '@/src/components/ListCard';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

export default function ProjectsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const projects = useStore((state) => state.projects);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => b.updatedAt - a.updatedAt),
    [projects],
  );

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.list}
      data={sortedProjects}
      keyExtractor={(project) => project.id}
      renderItem={({ item }) => (
        <ListCard
          title={item.name}
          subtitle={item.patterns.length === 1 ? '1 pattern' : `${item.patterns.length} patterns`}
          onPress={() =>
            router.navigate({ pathname: '/project/[projectId]', params: { projectId: item.id } })
          }
        />
      )}
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