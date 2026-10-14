import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const look = info.isLastRow
    ? {
        background: colors.endBackground,
        border: colors.end,
        text: colors.text,
        badge: t('counter.lastRow'),
        badgeBackground: colors.end,
        badgeText: colors.surface,
        instructionBackground: null,
      }
    : info.highlight
      ? {
          background: colors.surface,
          border: colors.line,
          text: colors.markText,
          badge: t('counter.payAttention'),
          badgeBackground: colors.markBackground,
          badgeText: colors.markText,
          instructionBackground: colors.markBackground,
        }
      : {
          background: colors.surface,
          border: colors.line,
          text: colors.text,
          badge: null,
          badgeBackground: colors.surface,
          badgeText: colors.text,
          instructionBackground: null,
        };

  return (
    <View style={[styles.card, { backgroundColor: look.background, borderColor: look.border }]}>
      <View style={styles.top}>
        <Text style={[styles.label, { color: colors.muted }]}>{t('counter.rowLabel')}</Text>
        {look.badge !== null && (
          <View style={[styles.badge, { backgroundColor: look.badgeBackground }]}>
            <Text style={[styles.badgeText, { color: look.badgeText }]}>{look.badge}</Text>
          </View>
        )}
      </View>

      <Text style={[styles.rowNumber, { color: colors.text }]}>{info.row}</Text>

      {info.isEmpty ? (
        <Text style={[styles.emptyNote, { color: colors.muted }]}>
          {t('counter.noInstruction')}
        </Text>
      ) : (
        info.instructions.map((instruction, index) => (
          <View
            key={index}
            style={
              look.instructionBackground !== null && [
                styles.instructionChip,
                { backgroundColor: look.instructionBackground },
              ]
            }
          >
            <Text style={[styles.instruction, { color: look.text }]}>
              {instruction.text || (info.isLastRow ? t('counter.lastRow') : '')}
            </Text>
          </View>
        ))
      )}

      {info.normalRow !== null && (
        <Text style={[styles.normalRow, { color: colors.muted }]}>
          {t('counter.normalRow', { text: info.normalRow })}
        </Text>
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
  instructionChip: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
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
