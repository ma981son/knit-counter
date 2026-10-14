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
          { borderColor: colors.accent, opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={[styles.symbol, { color: colors.accent }]}>−</Text>
      </Pressable>

      <Pressable
        accessibilityLabel="Row done, next row"
        disabled={nextDisabled}
        onPress={onNext}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: colors.accent,
            borderColor: colors.accent,
            opacity: nextDisabled ? 0.4 : pressed ? 0.85 : 1,
          },
        ]}
      >
        <Text style={[styles.symbol, { color: colors.onAccent }]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 104,
  },
  button: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontFamily: fonts.bodyBold,
    fontSize: 46,
    lineHeight: 54,
  },
});
