import { StyleSheet, Switch, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export function SettingSwitch({ label, value, onChange }: Props) {
  const colors = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <Switch
        accessibilityLabel={label}
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.line, true: colors.accent }}
        thumbColor={colors.surface}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16,
  },
});
