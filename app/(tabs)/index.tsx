import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { parsePatternCode } from '@/src/pattern/parse';
import { getRowInfo } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

export default function CounterScreen() {
  const colors = useTheme();

  const pattern = useStore((state) => state.projects[0]?.patterns[0]);

  const code = pattern?.code ?? '';
  const parsed = useMemo(() => parsePatternCode(code).pattern, [code]);

  if (!pattern) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.muted, fontFamily: fonts.body }}>Loading…</Text>
      </View>
    );
  }

  const info = getRowInfo(parsed, pattern.currentRow);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Text style={[styles.rowNumber, { color: colors.text }]}>{pattern.currentRow}</Text>
      {info.instructions.map((instruction, index) => (
        <Text key={index} style={[styles.instruction, { color: colors.text }]}>
          {instruction.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  rowNumber: {
    fontFamily: fonts.display,
    fontSize: 96,
  },
  instruction: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 22,
  },
});