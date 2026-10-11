import { StyleSheet, Text, View } from 'react-native';

import { StitchCount } from '@/src/components/StitchCount';
import type { RowInfo } from '@/src/pattern/types';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  info: RowInfo;
  stitchesBefore: number | null; 
};

export function RowCard({ info, stitchesBefore }: Props) {
  const colors = useTheme();

  const look = info.isLastRow
    ? { background: colors.endBackground, border: colors.end, text: colors.text, badge: 'Last row' }
    : info.highlight
      ? { background: colors.markBackground, border: colors.mark, text: colors.markText, badge: 'Pay attention' }
      : { background: colors.surface, border: colors.line, text: colors.text, badge: null };

  return (
    <View style={[styles.card, { backgroundColor: look.background, borderColor: look.border }]}>
      <View style={styles.top}>
        <Text style={[styles.label, { color: colors.muted }]}>ROW</Text>
        {look.badge !== null && (
          <View style={[styles.badge, { backgroundColor: look.border }]}>
            <Text style={[styles.badgeText, { color: colors.surface }]}>{look.badge}</Text>
          </View>
        )}
      </View>

      <Text style={[styles.rowNumber, { color: colors.text }]}>{info.row}</Text>

      {info.isEmpty ? (
        <Text style={[styles.emptyNote, { color: colors.muted }]}>No instruction for this row.</Text>
      ) : (
        info.instructions.map((instruction, index) => (
          <Text key={index} style={[styles.instruction, { color: look.text }]}>
            {instruction.text}
          </Text>
        ))
      )}

      {info.normalRow !== null && (
        <Text style={[styles.normalRow, { color: colors.muted }]}>Normal row here: {info.normalRow}</Text>
      )}

      {stitchesBefore !== null && (
        <StitchCount before={stitchesBefore} change={info.stitchChange} lineColor={look.border} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    gap: 12,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 1,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  rowNumber: {
    fontFamily: fonts.display,
    fontSize: 96,
    lineHeight: 104,
  },
  instruction: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 22,
  },
  emptyNote: {
    fontFamily: fonts.bodyMedium,
    fontSize: 17,
  },
  normalRow: {
    fontFamily: fonts.body,
    fontSize: 15,
  },
});