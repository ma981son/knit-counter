import { Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

export default function RowsScreen() {
  const colors = useTheme();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <Text style={{ fontFamily: fonts.body, color: colors.text }}>Rows will go here</Text>
    </View>
  );
}