import { useLocales } from 'expo-localization';
import { useEffect } from 'react';

import { useStore } from '@/src/store/store';
import i18n, { supportedLanguage } from './index';

export function useLanguageSync() {
  const deviceLanguage = supportedLanguage(useLocales()[0]?.languageCode);
  const setting = useStore((state) => state.settings.language);
  const language = setting === 'system' ? deviceLanguage : setting;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
}
