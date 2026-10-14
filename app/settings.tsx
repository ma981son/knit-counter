import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Linking, ScrollView, StyleSheet, Text } from 'react-native';

import { Button } from '@/src/components/Button';
import { SegmentedControl } from '@/src/components/SegmentedControl';
import { SettingSwitch } from '@/src/components/SettingSwitch';
import { SettingsCard } from '@/src/components/SettingsCard';
import { getExample } from '@/src/patterns/examples';
import { useStore } from '@/src/store/store';
import type { AppearanceSetting, LanguageSetting } from '@/src/store/types';
import { fonts, PALETTE_NAMES, type PaletteName, useTheme } from '@/src/theme';

export default function SettingsScreen() {
  const colors = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);
  const addProject = useStore((state) => state.addProject);
  const addPattern = useStore((state) => state.addPattern);

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

  const palettes: { value: PaletteName; label: string }[] = PALETTE_NAMES.map((name) => ({
    value: name,
    label: name.charAt(0).toUpperCase() + name.slice(1),
  }));

  function showExample() {
    const example = getExample(i18n.resolvedLanguage ?? i18n.language);
    const projectId = addProject(example.projectName);
    addPattern(projectId, example.patternName, example.code);
    router.push({ pathname: '/project/[projectId]', params: { projectId } });
  }

  function openNotificationSettings() {
    const packageName = Constants.expoConfig?.android?.package;
    Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS', [
      { key: 'android.provider.extra.APP_PACKAGE', value: packageName ?? '' },
    ]).catch(() => Linking.openSettings());
  }

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

      <SettingsCard title={t('settings.palette')}>
        <SegmentedControl
          options={palettes}
          value={settings.palette}
          onChange={(palette) => updateSettings({ palette })}
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

      <SettingsCard title={t('settings.notification')}>
        <SettingSwitch
          label={t('settings.showNotification')}
          value={settings.notification}
          onChange={(notification) => updateSettings({ notification })}
        />
        <SettingSwitch
          label={t('settings.notificationSound')}
          value={settings.notificationSound}
          onChange={(notificationSound) => updateSettings({ notificationSound })}
        />
        <Button
          title={t('settings.systemNotificationSettings')}
          variant="secondary"
          onPress={openNotificationSettings}
        />
      </SettingsCard>

      <SettingsCard title={t('settings.help')}>
        <Button title={t('settings.showExample')} variant="secondary" onPress={showExample} />
      </SettingsCard>

      <SettingsCard title={t('settings.about')}>
        <Text style={[styles.version, { color: colors.text }]}>
          {t('settings.version', { version: Constants.expoConfig?.version ?? '' })}
        </Text>
        <Button
          title={t('settings.sourceCode')}
          variant="secondary"
          onPress={() => Linking.openURL('https://github.com/ma981son/knit-counter')}
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
  version: {
    fontFamily: fonts.body,
    fontSize: 16,
  },
});
