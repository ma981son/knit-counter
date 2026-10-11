import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

type Props = {
  onPrevious: () => void;
  onNext: () => void;
  nextDisabled: boolean;
};

export function CounterControls({ onPrevious, onNext, nextDisabled }: Props) {
  const colors = useTheme();

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel="Back one row"
        onPress={onPrevious}
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
        disabled={nextDisabled}
        onPress={onNext}
        style={({ pressed }) => [
          styles.button,
          styles.plus,
          {
            backgroundColor: colors.accent,
            borderColor: colors.accent,
            opacity: nextDisabled ? 0.4 : pressed ? 0.85 : 1,
          },
        ]}
      >
        <Text style={[styles.plusText, { color: colors.onAccent }]}>+1 row</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
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
