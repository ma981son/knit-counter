import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { parsePatternCode } from '@/src/pattern/parse';
import { getRowInfo, getStitchCounts } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

import { Pressable } from 'react-native';

export default function CounterScreen() {
  const colors = useTheme();

  const pattern = useStore((state) => state.projects[0]?.patterns[0]);

  const code = pattern?.code ?? '';
  const parsed = useMemo(() => parsePatternCode(code).pattern, [code]);
  const stitchCounts = useMemo(() => getStitchCounts(parsed), [parsed]);
  
  const nextRow = useStore((state) => state.nextRow);
  const previousRow = useStore((state) => state.previousRow);

  if (!pattern) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.muted, fontFamily: fonts.body }}>Loading…</Text>
      </View>
    );
  }

  const info = getRowInfo(parsed, pattern.currentRow);
  
  const card = info.isLastRow
    ? { background: colors.endBackground, border: colors.end, text: colors.text, badge: 'Last row' }
    : info.highlight
      ? { background: colors.markBackground, border: colors.mark, text: colors.markText, badge: 'Pay attention' }
      : { background: colors.surface, border: colors.line, text: colors.text, badge: null };

    return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: card.background, borderColor: card.border }]}>
          <View style={styles.cardTop}>
            <Text style={[styles.eyebrow, { color: colors.muted }]}>ROW</Text>
            {card.badge !== null && (
              <View style={[styles.badge, { backgroundColor: card.border }]}>
                <Text style={[styles.badgeText, { color: colors.surface }]}>{card.badge}</Text>
              </View>
            )}
          </View>

          <Text style={[styles.rowNumber, { color: colors.text }]}>{pattern.currentRow}</Text>

          {info.isEmpty ? (
            <Text style={[styles.emptyNote, { color: colors.muted }]}>No instruction for this row.</Text>
          ) : (
            info.instructions.map((instruction, index) => (
              <Text key={index} style={[styles.instruction, { color: card.text }]}>
                {instruction.text}
              </Text>
            ))
          )}

          {info.normalRow !== null && (
            <Text style={[styles.normalRow, { color: colors.muted }]}>
              Normal row here: {info.normalRow}
            </Text>
          )}
                    {stitchCounts !== null && (
            <View style={[styles.stitches, { borderTopColor: card.border }]}>
              <Text style={[styles.eyebrow, { color: colors.muted }]}>STITCHES</Text>
              <Text style={[styles.stitchValue, { color: colors.text }]}>
                {stitchCounts[pattern.currentRow]}
                {info.stitchChange !== 0 && (
                  <Text style={{ color: colors.mark }}>
                    {' → '}
                    {stitchCounts[pattern.currentRow] + info.stitchChange}
                  </Text>
                )}
              </Text>
              <Text style={[styles.stitchNote, { color: colors.muted }]}>
                {info.stitchChange === 0
                  ? 'on your needle'
                  : `${info.stitchChange > 0 ? '+' : '−'}${Math.abs(info.stitchChange)} this row`}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable
          accessibilityLabel="Back one row"
          onPress={() => previousRow(pattern.id)}
          style={({ pressed }) => [
            styles.button,
            styles.minus,
            { backgroundColor: colors.surface, borderColor: colors.line, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={[styles.minusText, { color: colors.text }]}>−1</Text>
        </Pressable>

        <Pressable
          accessibilityLabel="Row done, next row"
          onPress={() => nextRow(pattern.id)}
          style={({ pressed }) => [
            styles.button,
            styles.plus,
            { backgroundColor: colors.accent, borderColor: colors.accent, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.plusText, { color: colors.onAccent }]}>+1 row</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  instruction: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 22,
  },
    content: {
    flex: 1,
    gap: 12,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minus: {
    flex: 1,
  },
  plus: {
    flex: 2.4,
  },
  minusText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 22,
  },
  plusText: {
    fontFamily: fonts.bodyBold,
    fontSize: 24,
  },
    card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    gap: 12,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
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
  emptyNote: {
    fontFamily: fonts.bodyMedium,
    fontSize: 17,
  },
  normalRow: {
    fontFamily: fonts.body,
    fontSize: 15,
  },
    stitches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 10,
    borderTopWidth: 1,
    paddingTop: 12,
  },
  stitchValue: {
    fontFamily: fonts.display,
    fontSize: 28,
  },
  stitchNote: {
    fontFamily: fonts.body,
    fontSize: 15,
  },
});