import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

const ENTRIES = [
  ['13:', 'oneRow'],
  ['1-6:', 'range'],
  ['7+:', 'openRange'],
  ['13, 19, 25:', 'severalRows'],
  [null, 'alternate'],
  ['!', 'highlight'],
  ['END', 'end'],
  ['Cast on: 66', 'castOn'],
  ['(-2)  (+1)', 'stitchChange'],
] as const;

export function CodeCheatSheet() {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.box, { backgroundColor: colors.surface, borderColor: colors.line }]}>
      <Text style={[styles.title, { color: colors.muted }]}>{t('code.cheatSheet.title')}</Text>
      {ENTRIES.map(([syntax, meaning]) => (
        <View key={meaning} style={styles.entry}>
          <Text style={[styles.syntax, { color: colors.text }]}>
            {syntax ?? t('code.cheatSheet.alternateExample')}
          </Text>
          <Text style={[styles.meaning, { color: colors.muted }]}>
            {t(`code.cheatSheet.meanings.${meaning}`)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  title: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 2,
  },
  entry: {
    flexDirection: 'row',
    gap: 12,
  },
  syntax: {
    width: 110,
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'bold',
  },
  meaning: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
  },
});
