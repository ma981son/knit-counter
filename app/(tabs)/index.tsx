import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { parsePatternCode } from '@/src/pattern/parse';
import { getRowInfo, getStitchCounts } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

import { useKeepAwake } from 'expo-keep-awake';
import { Pressable, Vibration } from 'react-native';

import { CounterControls } from '@/src/components/CounterControls';
import { FinishedCard } from '@/src/components/FinishedCard';
import { RowCard } from '@/src/components/RowCard';

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
          <FinishedCard totalRows={parsed.totalRows} onRestart={restart} />
        ) : (
          <RowCard info={info} stitchesBefore={stitchCounts?.[pattern.currentRow] ?? null} />
        )}
      </View>

      <CounterControls
        onPrevious={() => previousRow(pattern.id)}
        onNext={handleNextRow}
        nextDisabled={isFinished}
      />

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
    content: {
    flex: 1,
    gap: 12,
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