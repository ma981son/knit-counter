import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

type Props = {
  onRestart: () => void;
};

export function RestartPrompt({ onRestart }: Props) {
  const colors = useTheme();
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <Pressable
        onPress={() => setConfirming(true)}
        style={[styles.pill, { backgroundColor: colors.endBackground }]}
      >
        <Text style={[styles.pillText, { color: colors.end }]}>Start again</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.confirm}>
      <Text style={[styles.question, { color: colors.text }]}>Go back to row 1?</Text>
      <Pressable
        onPress={() => {
          setConfirming(false);
          onRestart();
        }}
        style={[styles.pill, { backgroundColor: colors.end }]}
      >
        <Text style={[styles.pillText, { color: colors.surface }]}>Yes</Text>
      </Pressable>
      <Pressable
        onPress={() => setConfirming(false)}
        style={[styles.pill, { backgroundColor: colors.endBackground }]}
      >
        <Text style={[styles.pillText, { color: colors.end }]}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'center',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  pillText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
  },
  confirm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  question: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
  },
});
