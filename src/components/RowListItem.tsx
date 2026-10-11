import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { RowInfo } from '@/src/pattern/types';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  info: RowInfo;
  stitchesBefore: number | null;
  isCurrent: boolean;
  isSelected: boolean;
  onPress: () => void;
  onGoTo: () => void;
};

export function RowListItem({ info, stitchesBefore, isCurrent, isSelected, onPress, onGoTo }: Props) {
  const colors = useTheme();

  const background = info.isLastRow
    ? colors.endBackground
    : info.highlight
      ? colors.markBackground
      : colors.surface;

  const numberColor = isCurrent ? colors.accent : info.highlight ? colors.mark : colors.muted;
  const textColor = info.highlight ? colors.markText : colors.text;

  const text = info.instructions.map((instruction) => instruction.text).join(' · ');

  return (
    <View style={[styles.item, { backgroundColor: background, borderBottomColor: colors.line }]}>
      <Pressable
        onPress={onPress}
        style={[styles.row, isCurrent && { borderLeftColor: colors.accent, borderLeftWidth: 4 }]}
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
            <Text style={[styles.small, { color: colors.muted }]}>Normal row here: {info.normalRow}</Text>
          )}

          {stitchesBefore !== null && info.stitchChange !== 0 && (
            <Text style={[styles.small, { color: colors.muted }]}>
              {stitchesBefore} → {stitchesBefore + info.stitchChange} stitches
            </Text>
          )}
        </View>
      </Pressable>

      {isSelected && !isCurrent && (
        <Pressable
          onPress={onGoTo}
          style={({ pressed }) => [styles.goTo, { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 }]}
        >
          <Text style={[styles.goToText, { color: colors.onAccent }]}>Go to row {info.row}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
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
  goTo: {
    alignSelf: 'flex-start',
    marginLeft: 66,
    marginBottom: 12,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  goToText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
  },
});