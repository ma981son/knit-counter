import { StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

const ENTRIES: [string, string][] = [
  ['13:', 'one row'],
  ['1-6:', 'rows 1 to 6'],
  ['7+:', 'from row 7 on, until another range starts'],
  ['13, 19, 25:', 'several rows'],
  ['Knit | Purl', 'alternates row by row, starting with the first'],
  ['!', 'at the start of the text: highlight the row'],
  ['END', 'at the start of the text: the last row'],
  ['Cast on: 66', 'starting stitches, shows the stitch count'],
  ['(-2)  (+1)', 'stitches lost or gained on that row'],
];

export function CodeCheatSheet() {
  const colors = useTheme();

  return (
    <View style={[styles.box, { backgroundColor: colors.surface, borderColor: colors.line }]}>
      <Text style={[styles.title, { color: colors.muted }]}>HOW TO WRITE IT</Text>
      {ENTRIES.map(([syntax, meaning]) => (
        <View key={syntax} style={styles.entry}>
          <Text style={[styles.syntax, { color: colors.text }]}>{syntax}</Text>
          <Text style={[styles.meaning, { color: colors.muted }]}>{meaning}</Text>
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
