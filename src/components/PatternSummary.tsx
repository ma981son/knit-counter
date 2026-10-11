import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getRowInfo } from '@/src/pattern/rows';
import type { ParsedPattern } from '@/src/pattern/types';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  parsed: ParsedPattern;
  stitchCounts: number[] | null;
  warnings: string[];
};

export function PatternSummary({ parsed, stitchCounts, warnings }: Props) {
  const colors = useTheme();

  const highlightedRows = useMemo(() => {
    let count = 0;
    for (let row = 1; row <= parsed.totalRows; row++) {
      if (getRowInfo(parsed, row).highlight) count++;
    }
    return count;
  }, [parsed]);

  const parts = [`${parsed.totalRows} rows`, `${highlightedRows} highlighted`];
  if (stitchCounts !== null) {
    parts.push(`${stitchCounts[1]} → ${stitchCounts[parsed.totalRows + 1]} stitches`);
  }

  return (
    <View style={styles.container}>
      {parsed.totalRows > 0 && (
        <View style={[styles.box, { backgroundColor: colors.endBackground }]}>
          <Text style={[styles.text, { color: colors.end }]}>{parts.join(' · ')}</Text>
        </View>
      )}

      {warnings.map((warning, index) => (
        <View key={index} style={[styles.box, { backgroundColor: colors.warnBackground }]}>
          <Text style={[styles.text, { color: colors.warnText }]}>{warning}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  box: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: fonts.body,
    fontSize: 15,
  },
});
