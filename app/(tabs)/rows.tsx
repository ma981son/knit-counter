import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, Vibration, View } from 'react-native';

import { RowListItem } from '@/src/components/RowListItem';
import { useCurrentPattern } from '@/src/hooks/useCurrentPattern';
import { getRowInfo } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';


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
      style={{ backgroundColor: colors.background }}
      data={rows}
      keyExtractor={(info) => String(info.row)}
      extraData={pattern.currentRow}
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
            router.navigate('/');
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