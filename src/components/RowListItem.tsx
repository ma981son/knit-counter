import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { RowInfo } from '@/src/pattern/types';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  info: RowInfo;
  stitchesBefore: number | null;
  isCurrent: boolean;
  onLongPress: () => void;
};

export function RowListItem({ info, stitchesBefore, isCurrent, onLongPress }: Props) {
  const colors = useTheme();

  const background = info.isLastRow
    ? colors.endBackground
    : info.highlight
      ? colors.markBackground
      : colors.surface;

  const numberColor = isCurrent
    ? colors.accent
    : info.isLastRow
      ? colors.end
      : info.highlight
        ? colors.mark
        : colors.muted;
  const textColor = info.highlight && !info.isLastRow ? colors.markText : colors.text;

  const text = info.instructions.map((instruction) => instruction.text).join(' · ');

  return (
    <Pressable
      onLongPress={onLongPress}
      accessibilityHint="Hold to jump to this row"
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: background, borderBottomColor: colors.line, opacity: pressed ? 0.6 : 1 },
        isCurrent && { borderLeftColor: colors.accent },
      ]}
    >
      <Text style={[styles.number, { color: numberColor }]}>{info.row}</Text>

      <View style={styles.texts}>
        {isCurrent && <Text style={[styles.here, { color: colors.accent }]}>YOU ARE HERE</Text>}

        {info.isEmpty ? (
          <Text style={[styles.empty, { color: colors.muted }]}>No instruction</Text>
        ) : (
          <Text style={[styles.instruction, { color: textColor }, info.highlight && styles.bold]}>
            {text}
          </Text>
        )}

        {info.normalRow !== null && (
          <Text style={[styles.small, { color: colors.muted }]}>
            Normal row here: {info.normalRow}
          </Text>
        )}

        {stitchesBefore !== null && info.stitchChange !== 0 && (
          <Text style={[styles.small, { color: colors.muted }]}>
            {stitchesBefore} → {stitchesBefore + info.stitchChange} stitches
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  number: {
    width: 36,
    fontFamily: fonts.display,
    fontSize: 18,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  here: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  instruction: {
    fontFamily: fonts.body,
    fontSize: 16,
  },
  bold: {
    fontFamily: fonts.bodySemiBold,
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontStyle: 'italic',
  },
  small: {
    fontFamily: fonts.body,
    fontSize: 13,
  },
});
