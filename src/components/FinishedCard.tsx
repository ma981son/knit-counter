import { Button } from '@/src/components/Button';
import { fonts, useTheme } from '@/src/theme';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  totalRows: number;
  onRestart: () => void;
};

export function FinishedCard({ totalRows, onRestart }: Props) {
  const colors = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.endBackground, borderColor: colors.end }]}>
      <Text style={[styles.title, { color: colors.text }]}>Piece finished</Text>
      <Text style={[styles.text, { color: colors.muted }]}>
        All {totalRows} rows done. Tap −1 if you need to go back.
      </Text>
      <Button title="Start again from row 1" onPress={onRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: 12,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
  },
  text: {
    fontFamily: fonts.body,
    fontSize: 16,
    textAlign: 'center',
  },
});