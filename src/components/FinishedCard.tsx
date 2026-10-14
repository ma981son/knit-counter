import { Button } from '@/src/components/Button';
import { fonts, useTheme } from '@/src/theme';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  totalRows: number;
  onRestart: () => void;
};

export function FinishedCard({ totalRows, onRestart }: Props) {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.card, { backgroundColor: colors.endBackground, borderColor: colors.end }]}>
      <Text style={[styles.title, { color: colors.end }]}>{t('counter.finishedTitle')}</Text>
      <Text style={[styles.text, { color: colors.muted }]}>
        {t('counter.allRowsDone', { count: totalRows })}
      </Text>
      <Button title={t('counter.restartFromRowOne')} onPress={onRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: 12,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
  },
  text: {
    fontFamily: fonts.body,
    fontSize: 16,
    textAlign: 'center',
  },
});
