import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { getRowInfo } from '@/src/pattern/rows';
import type { ParsedPattern, PatternWarning } from '@/src/pattern/types';
import { warningText } from '@/src/pattern/warningText';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  parsed: ParsedPattern;
  stitchCounts: number[] | null;
  warnings: PatternWarning[];
};

export function PatternSummary({ parsed, stitchCounts, warnings }: Props) {
  const colors = useTheme();
  const { t } = useTranslation();

  const highlightedRows = useMemo(() => {
    let count = 0;
    for (let row = 1; row <= parsed.totalRows; row++) {
      if (getRowInfo(parsed, row).highlight) count++;
    }
    return count;
  }, [parsed]);

  const parts = [
    t('code.summaryRows', { count: parsed.totalRows }),
    t('code.summaryHighlighted', { count: highlightedRows }),
  ];
  if (stitchCounts !== null) {
    parts.push(
      t('code.summaryStitches', { from: stitchCounts[1], to: stitchCounts[parsed.totalRows + 1] }),
    );
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
          <Text style={[styles.text, { color: colors.warnText }]}>{warningText(warning, t)}</Text>
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
