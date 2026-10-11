import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  onRestart: () => void;
};

export function RestartPrompt({ onRestart }: Props) {
  const colors = useTheme();
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <Pressable onPress={() => setConfirming(true)} style={styles.link}>
        <Text style={[styles.linkText, { color: colors.muted }]}>Start again</Text>
      </Pressable>
    );
  }

  return (
    <View style={[styles.box, { backgroundColor: colors.surface, borderColor: colors.line }]}>
      <Text style={[styles.question, { color: colors.text }]}>Go back to row 1?</Text>
            <View style={styles.buttons}>
        <Button
          title="Yes, start again"
          onPress={() => {
            setConfirming(false);
            onRestart();
          }}
        />
        <Button title="Cancel" variant="secondary" onPress={() => setConfirming(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    alignSelf: 'center',
    padding: 8,
  },
  linkText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  box: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    gap: 10,
    alignItems: 'center',
  },
  question: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
});