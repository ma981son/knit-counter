import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { de } from './de';
import { en } from './en';
import { es } from './es';

const SUPPORTED_LANGUAGES = ['en', 'es', 'de'];

export function supportedLanguage(code: string | null | undefined) {
  return code && SUPPORTED_LANGUAGES.includes(code) ? code : 'en';
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es }, de: { translation: de } },
  lng: supportedLanguage(getLocales()[0]?.languageCode),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
