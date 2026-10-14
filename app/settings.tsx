import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';

import { SegmentedControl } from '@/src/components/SegmentedControl';
import { SettingSwitch } from '@/src/components/SettingSwitch';
import { SettingsCard } from '@/src/components/SettingsCard';
import { useStore } from '@/src/store/store';
import type { AppearanceSetting, LanguageSetting } from '@/src/store/types';
import { useTheme } from '@/src/theme';

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
      <SettingsCard title={t('settings.language')}>
        <SegmentedControl
          options={languages}
          value={settings.language}
          onChange={(language) => updateSettings({ language })}
        />
      </SettingsCard>

      <SettingsCard title={t('settings.appearance')}>
        <SegmentedControl
          options={appearances}
          value={settings.appearance}
          onChange={(appearance) => updateSettings({ appearance })}
        />
      </SettingsCard>

      <SettingsCard title={t('settings.counter')}>
        <SettingSwitch
          label={t('settings.vibration')}
          value={settings.vibration}
          onChange={(vibration) => updateSettings({ vibration })}
        />
        <SettingSwitch
          label={t('settings.keepAwake')}
          value={settings.keepAwake}
          onChange={(keepAwake) => updateSettings({ keepAwake })}
        />
      </SettingsCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
  },
});
