import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, Vibration, View } from 'react-native';

import { CounterControls } from '@/src/components/CounterControls';
import { FinishedCard } from '@/src/components/FinishedCard';
import { ProgressBar } from '@/src/components/ProgressBar';
import { RestartPrompt } from '@/src/components/RestartPrompt';
import { RowCard } from '@/src/components/RowCard';
import { useCurrentPattern } from '@/src/hooks/useCurrentPattern';
import { useSafeKeepAwake } from '@/src/hooks/useSafeKeepAwake';
import { getRowInfo } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

export default function CounterScreen() {
  useSafeKeepAwake();
  const colors = useTheme();
  const { t } = useTranslation();

  const { pattern, parsed, stitchCounts } = useCurrentPattern();
  const nextRow = useStore((state) => state.nextRow);
  const previousRow = useStore((state) => state.previousRow);
  const setRow = useStore((state) => state.setRow);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  if (!pattern) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.muted, fontFamily: fonts.body }}>{t('common.loading')}</Text>
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

    const nextInfo = next <= parsed.totalRows ? getRowInfo(parsed, next) : null;
    if (nextInfo?.highlight || nextInfo?.isLastRow) {
      Vibration.vibrate([0, 80, 50, 80, 50, 80]);
    } else {
      Vibration.vibrate(20);
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {parsed.totalRows > 0 && (
        <ProgressBar row={pattern.currentRow} totalRows={parsed.totalRows} />
      )}
      <ScrollView style={styles.cardArea}>
        {isFinished ? (
          <FinishedCard totalRows={parsed.totalRows} onRestart={restart} />
        ) : (
          <RowCard info={info} stitchesBefore={stitchCounts?.[pattern.currentRow] ?? null} />
        )}
      </ScrollView>

      <View style={styles.controls}>
        <CounterControls
          onPrevious={() => previousRow(pattern.id)}
          onNext={handleNextRow}
          nextDisabled={isFinished}
        />
      </View>

      <View style={styles.restart}>
        {pattern.currentRow > 1 && !isFinished && <RestartPrompt onRestart={restart} />}
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
  cardArea: {
    flex: 1,
  },
  controls: {
    height: 160,
    justifyContent: 'center',
  },
  restart: {
    height: 48,
    justifyContent: 'center',
  },
});
