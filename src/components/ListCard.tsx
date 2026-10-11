import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

type Props = {
  title: string;
  subtitle?: string;
  onPress: () => void;
  onLongPress?: () => void;
};

export function ListCard({ title, subtitle, onPress, onLongPress }: Props) {
  const colors = useTheme();

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.line, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={styles.texts}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle !== undefined && (
          <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
        )}
      </View>
      <Text style={[styles.arrow, { color: colors.muted }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 20,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
  },
  arrow: {
    fontSize: 28,
  },
});
