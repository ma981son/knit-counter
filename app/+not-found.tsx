import { Link, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

export default function NotFoundScreen() {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('notFound.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>{t('notFound.message')}</Text>
        <Link href="/" style={[styles.link, { color: colors.accent }]}>
          {t('notFound.link')}
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 20,
  },
  link: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    marginTop: 15,
    paddingVertical: 15,
  },
});
