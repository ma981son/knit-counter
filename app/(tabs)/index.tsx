import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { parsePatternCode } from '@/src/pattern/parse';
import { getRowInfo, getStitchCounts } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

import { useKeepAwake } from 'expo-keep-awake';
import { Pressable, Vibration } from 'react-native';

import { StitchCount } from '@/src/components/StitchCount';

export default function CounterScreen() {
   useKeepAwake();
   
  const colors = useTheme();

  const pattern = useStore((state) => state.projects[0]?.patterns[0]);

  const code = pattern?.code ?? '';
  const parsed = useMemo(() => parsePatternCode(code).pattern, [code]);
  const stitchCounts = useMemo(() => getStitchCounts(parsed), [parsed]);
  
  const nextRow = useStore((state) => state.nextRow);
  const previousRow = useStore((state) => state.previousRow);
  const setRow = useStore((state) => state.setRow);
  const [confirmingRestart, setConfirmingRestart] = useState(false);

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
      
  const isFinished = parsed.totalRows > 0 && pattern.currentRow > parsed.totalRows;

  function restart() {
    setConfirmingRestart(false);
    setRow(pattern!.id, 1);
  }
  
  function handleNextRow() {
    const next = pattern!.currentRow + 1;
    nextRow(pattern!.id);

    if (next <= parsed.totalRows) {
      const nextInfo = getRowInfo(parsed, next);
      if (nextInfo.highlight || nextInfo.isLastRow) {
        Vibration.vibrate([0, 80, 50, 80, 50, 80]);
      }
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {isFinished ? (
          <View style={[styles.card, styles.doneCard, { backgroundColor: colors.endBackground, borderColor: colors.end }]}>
            <Text style={[styles.doneTitle, { color: colors.text }]}>Piece finished</Text>
            <Text style={[styles.doneText, { color: colors.muted }]}>
              All {parsed.totalRows} rows done. Tap −1 if you need to go back.
            </Text>
            <Pressable
              onPress={restart}
              style={({ pressed }) => [styles.smallButton, { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 }]}
            >
              <Text style={[styles.smallButtonText, { color: colors.onAccent }]}>Start again from row 1</Text>
            </Pressable>
          </View>
        ) : (
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
              <StitchCount
                before={stitchCounts[pattern.currentRow]}
                change={info.stitchChange}
                lineColor={card.border}
              />
            )}
          </View>
        )}
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
          disabled={isFinished}
          onPress={handleNextRow}
          style={({ pressed }) => [
            styles.button,
            styles.plus,
            {
              backgroundColor: colors.accent,
              borderColor: colors.accent,
              opacity: isFinished ? 0.4 : pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text style={[styles.plusText, { color: colors.onAccent }]}>+1 row</Text>
        </Pressable>
      </View>

      {pattern.currentRow > 1 && !isFinished && (
        confirmingRestart ? (
          <View style={[styles.confirm, { backgroundColor: colors.surface, borderColor: colors.line }]}>
            <Text style={[styles.confirmText, { color: colors.text }]}>Go back to row 1?</Text>
            <View style={styles.confirmButtons}>
              <Pressable onPress={restart} style={[styles.smallButton, { backgroundColor: colors.accent }]}>
                <Text style={[styles.smallButtonText, { color: colors.onAccent }]}>Yes, start again</Text>
              </Pressable>
              <Pressable
                onPress={() => setConfirmingRestart(false)}
                style={[styles.smallButton, { borderWidth: 1, borderColor: colors.line }]}
              >
                <Text style={[styles.smallButtonText, { color: colors.text }]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable onPress={() => setConfirmingRestart(true)} style={styles.linkButton}>
            <Text style={[styles.linkText, { color: colors.muted }]}>Start again</Text>
          </Pressable>
        )
      )}
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
    doneCard: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  doneTitle: {
    fontFamily: fonts.display,
    fontSize: 32,
  },
  doneText: {
    fontFamily: fonts.body,
    fontSize: 16,
    textAlign: 'center',
  },
  smallButton: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  smallButtonText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
  },
  linkButton: {
    alignSelf: 'center',
    padding: 8,
  },
  linkText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  confirm: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    gap: 10,
    alignItems: 'center',
  },
  confirmText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 10,
  },
});