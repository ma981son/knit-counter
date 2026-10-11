import { useKeepAwake } from 'expo-keep-awake';
import { StyleSheet, Text, Vibration, View } from 'react-native';

import { CounterControls } from '@/src/components/CounterControls';
import { FinishedCard } from '@/src/components/FinishedCard';
import { RestartPrompt } from '@/src/components/RestartPrompt';
import { RowCard } from '@/src/components/RowCard';
import { useCurrentPattern } from '@/src/hooks/useCurrentPattern';
import { getRowInfo } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

export default function CounterScreen() {
  useKeepAwake();
  const colors = useTheme();

  const { pattern, parsed, stitchCounts } = useCurrentPattern();
  const nextRow = useStore((state) => state.nextRow);
  const previousRow = useStore((state) => state.previousRow);
  const setRow = useStore((state) => state.setRow);

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

      {pattern.currentRow > 1 && !isFinished && <RestartPrompt onRestart={restart} />}
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
  },
});