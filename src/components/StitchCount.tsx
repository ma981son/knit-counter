import { StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

type Props = {
  before: number;
  change: number;
  lineColor: string;
};

export function StitchCount({ before, change, lineColor }: Props) {
  const colors = useTheme();

  return (
    <View style={[styles.container, { borderTopColor: lineColor }]}>
      <Text style={[styles.label, { color: colors.muted }]}>STITCHES</Text>
      <Text style={[styles.value, { color: colors.text }]}>
        {before}
        {change !== 0 && (
          <Text style={{ color: colors.mark }}>
            {' → '}
            {before + change}
          </Text>
        )}
      </Text>
      {change === 0 ? (
        <Text style={[styles.note, { color: colors.muted }]}>on your needle</Text>
      ) : (
        <View style={[styles.chip, { backgroundColor: colors.markBackground }]}>
          <Text style={[styles.note, { color: colors.markText }]}>
            {`${change > 0 ? '+' : '−'}${Math.abs(change)} this row`}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 10,
    borderTopWidth: 1,
    paddingTop: 12,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 1,
  },
  value: {
    fontFamily: fonts.display,
    fontSize: 28,
  },
  chip: {
    alignSelf: 'center',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  note: {
    fontFamily: fonts.body,
    fontSize: 15,
  },
});
