import { Pressable, StyleSheet, Text } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

export function Button({ title, onPress, variant = 'primary', disabled = false }: Props) {
  const colors = useTheme();

  const background =
    variant === 'primary' ? colors.accent : variant === 'danger' ? colors.danger : 'transparent';
  const border =
    variant === 'primary' ? colors.accent : variant === 'danger' ? colors.danger : colors.line;
  const textColor =
    variant === 'primary' ? colors.onAccent : variant === 'danger' ? colors.onDanger : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: background,
          borderColor: border,
          opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
  },
});
