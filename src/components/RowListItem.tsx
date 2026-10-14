import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { RowInfo } from '@/src/pattern/types';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  info: RowInfo;
  stitchesBefore: number | null;
  isCurrent: boolean;
  isLast: boolean;
  onLongPress: () => void;
};

export function RowListItem({ info, stitchesBefore, isCurrent, isLast, onLongPress }: Props) {
  const colors = useTheme();
  const { t } = useTranslation();

  const background = info.isLastRow
    ? colors.endBackground
    : info.highlight
      ? colors.markBackground
      : colors.surface;
  const isMarked = info.highlight && !info.isLastRow;

  const numberColor = isCurrent
    ? colors.accent
    : info.isLastRow
      ? colors.end
      : info.highlight
        ? colors.mark
        : colors.muted;

  const text = info.instructions.map((instruction) => instruction.text).join(' · ');

  return (
    <Pressable
      onLongPress={onLongPress}
      accessibilityHint={t('rows.jumpHint')}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: background,
          borderBottomColor: colors.line,
          borderBottomWidth: isLast ? 0 : 1,
          opacity: pressed ? 0.6 : 1,
        },
        isCurrent && { borderLeftColor: colors.accent },
      ]}
    >
      <Text style={[styles.number, { color: numberColor }]}>{info.row}</Text>

      <View style={styles.texts}>
        {isCurrent && (
          <Text style={[styles.here, { color: colors.accent }]}>{t('rows.youAreHere')}</Text>
        )}

        {info.isEmpty ? (
          <Text style={[styles.empty, { color: colors.muted }]}>{t('rows.noInstruction')}</Text>
        ) : isMarked ? (
          <Text style={[styles.instruction, styles.bold, { color: colors.markText }]}>{text}</Text>
        ) : (
          <Text style={[styles.instruction, { color: colors.text }]}>{text}</Text>
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
