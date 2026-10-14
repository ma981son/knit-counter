import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AppState } from 'react-native';

import { de } from './de';
import { en } from './en';
import { es } from './es';

const SUPPORTED_LANGUAGES = ['en', 'es', 'de'];

function deviceLanguage() {
  const code = getLocales()[0]?.languageCode ?? 'en';
  return SUPPORTED_LANGUAGES.includes(code) ? code : 'en';
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es }, de: { translation: de } },
  lng: deviceLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') i18n.changeLanguage(deviceLanguage());
});

export default i18n;
