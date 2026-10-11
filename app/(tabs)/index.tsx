import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { parsePatternCode } from '@/src/pattern/parse';
import { getRowInfo } from '@/src/pattern/rows';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';

import { Pressable } from 'react-native';

export default function CounterScreen() {
  const colors = useTheme();

  const pattern = useStore((state) => state.projects[0]?.patterns[0]);

  const code = pattern?.code ?? '';
  const parsed = useMemo(() => parsePatternCode(code).pattern, [code]);
  
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

    return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.rowNumber, { color: colors.text }]}>{pattern.currentRow}</Text>
        {info.instructions.map((instruction, index) => (
          <Text key={index} style={[styles.instruction, { color: colors.text }]}>
            {instruction.text}
          </Text>
        ))}
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
  rowNumber: {
    fontFamily: fonts.display,
    fontSize: 96,
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
});