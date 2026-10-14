import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

type Props = {
  onRestart: () => void;
};

export function RestartPrompt({ onRestart }: Props) {
  const colors = useTheme();
  const { t } = useTranslation();
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <Pressable
        onPress={() => setConfirming(true)}
        style={[styles.pill, { backgroundColor: colors.endBackground }]}
      >
        <Text style={[styles.pillText, { color: colors.end }]}>{t('counter.restart')}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.confirm}>
      <Text style={[styles.question, { color: colors.text }]}>{t('counter.restartQuestion')}</Text>
      <Pressable
        onPress={() => {
          setConfirming(false);
          onRestart();
        }}
        style={[styles.pill, { backgroundColor: colors.end }]}
      >
        <Text style={[styles.pillText, { color: colors.surface }]}>{t('common.yes')}</Text>
      </Pressable>
      <Pressable
        onPress={() => setConfirming(false)}
        style={[styles.pill, { backgroundColor: colors.endBackground }]}
      >
        <Text style={[styles.pillText, { color: colors.end }]}>{t('common.cancel')}</Text>
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
