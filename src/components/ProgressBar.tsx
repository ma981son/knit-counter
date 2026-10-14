import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

type Props = {
  row: number;
  totalRows: number;
};

export function ProgressBar({ row, totalRows }: Props) {
  const colors = useTheme();
  const { t } = useTranslation();

  const rowsDone = Math.min(row - 1, totalRows);
  const percent = (rowsDone / totalRows) * 100;
  const label =
    row > totalRows
      ? t('counter.finished', { count: totalRows })
      : t('project.progressRowOf', { row, total: totalRows });

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.percent, { color: colors.muted }]}>{Math.round(percent)}%</Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.line }]}>
        <View style={[styles.fill, { backgroundColor: colors.accent, width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
  },
  percent: {
    fontFamily: fonts.body,
    fontSize: 14,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
