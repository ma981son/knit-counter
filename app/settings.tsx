import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { SegmentedControl } from '@/src/components/SegmentedControl';
import { useStore } from '@/src/store/store';
import type { AppearanceSetting, LanguageSetting } from '@/src/store/types';
import { fonts, useTheme } from '@/src/theme';

export default function SettingsScreen() {
  const colors = useTheme();
  const { t } = useTranslation();
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);

  const languages: { value: LanguageSetting; label: string }[] = [
    { value: 'system', label: t('settings.system') },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'de', label: 'Deutsch' },
  ];

  const appearances: { value: AppearanceSetting; label: string }[] = [
    { value: 'system', label: t('settings.system') },
    { value: 'light', label: t('settings.light') },
    { value: 'dark', label: t('settings.dark') },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.line }]}>
        <Text style={[styles.label, { color: colors.muted }]}>{t('settings.language')}</Text>
        <SegmentedControl
          options={languages}
          value={settings.language}
          onChange={(language) => updateSettings({ language })}
        />
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.line }]}>
        <Text style={[styles.label, { color: colors.muted }]}>{t('settings.appearance')}</Text>
        <SegmentedControl
          options={appearances}
          value={settings.appearance}
          onChange={(appearance) => updateSettings({ appearance })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
