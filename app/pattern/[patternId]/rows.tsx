import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, Vibration, View } from 'react-native';

import { RowListItem } from '@/src/components/RowListItem';
import { useCurrentPattern } from '@/src/hooks/useCurrentPattern';
import { getRowInfo } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

import type { RowInfo } from '@/src/pattern/types';

export default function RowsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const { pattern, parsed, stitchCounts } = useCurrentPattern();
  const setRow = useStore((state) => state.setRow);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const rows = useMemo(
    () => Array.from({ length: parsed.totalRows }, (_, index) => getRowInfo(parsed, index + 1)),
    [parsed],
  );

  const listRef = useRef<FlatList<RowInfo>>(null);

  const currentIndex = pattern ? Math.min(pattern.currentRow, rows.length) - 1 : -1;

  useFocusEffect(
    useCallback(() => {
      if (currentIndex < 0) return;
      const timer = setTimeout(() => {
        listRef.current?.scrollToIndex({ index: currentIndex, viewPosition: 0.3, animated: false });
      }, 50);
      return () => clearTimeout(timer);
    }, [currentIndex]),
  );

  if (!pattern) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.message, { color: colors.muted }]}>Loading…</Text>
      </View>
    );
  }

  if (rows.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.message, { color: colors.muted }]}>This pattern has no rows yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={listRef}
      style={{ backgroundColor: colors.background }}
      data={rows}
      keyExtractor={(info) => String(info.row)}
      extraData={pattern.currentRow}
      onScrollToIndexFailed={({ index, averageItemLength }) => {
        listRef.current?.scrollToOffset({ offset: averageItemLength * index, animated: false });
        setTimeout(() => {
          listRef.current?.scrollToIndex({ index, viewPosition: 0.3, animated: false });
        }, 100);
      }}
      ListHeaderComponent={
        <Text style={[styles.hint, { color: colors.muted }]}>Hold a row to jump there.</Text>
      }
      renderItem={({ item }) => (
        <RowListItem
          info={item}
          stitchesBefore={stitchCounts?.[item.row] ?? null}
          isCurrent={item.row === pattern.currentRow}
          onLongPress={() => {
            Vibration.vibrate(30);
            setRow(pattern.id, item.row);
                        router.navigate({ pathname: '/pattern/[patternId]', params: { patternId: pattern.id } });;
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 16,
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
