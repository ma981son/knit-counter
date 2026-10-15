import { useTranslation } from 'react-i18next';
import { Image, type ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import type { AppIconName } from '@/modules/app-icon/src/AppIconModule';
import { fonts, useTheme } from '@/src/theme';

type AppIcon = {
  value: AppIconName;
  label: string;
  variant: 'dark' | 'light';
  image: ImageSourcePropType;
};

export const APP_ICONS: AppIcon[] = [
  {
    value: 'Rosadito',
    label: 'Rosadito',
    variant: 'dark',
    image: require('@/assets/images/rosadito-background-dark.png'),
  },
  {
    value: 'RosaditoLight',
    label: 'Rosadito',
    variant: 'light',
    image: require('@/assets/images/rosadito-background-light.png'),
  },
  {
    value: 'Jarrito',
    label: 'Jarrito',
    variant: 'dark',
    image: require('@/assets/images/jarrito-background-dark.png'),
  },
  {
    value: 'JarritoLight',
    label: 'Jarrito',
    variant: 'light',
    image: require('@/assets/images/jarrito-background-light.png'),
  },
];

type Props = {
  value: AppIconName;
  onChange: (value: AppIconName) => void;
};

export function AppIconPicker({ value, onChange }: Props) {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      {APP_ICONS.map((icon) => {
        const selected = icon.value === value;
        const variant = t(`settings.${icon.variant}`);
        return (
          <Pressable
            key={icon.value}
            accessibilityRole="button"
            accessibilityLabel={`${icon.label} ${variant}`}
            accessibilityState={{ selected }}
            onPress={() => onChange(icon.value)}
            style={styles.option}
          >
            <View style={[styles.frame, { borderColor: selected ? colors.accent : 'transparent' }]}>
              <Image source={icon.image} style={styles.image} />
            </View>
            <Text style={[styles.label, { color: selected ? colors.accent : colors.text }]}>
              {icon.label}
            </Text>
            <Text style={[styles.variant, { color: colors.muted }]}>{variant}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  option: {
    alignItems: 'center',
  },
  frame: {
    borderWidth: 3,
    borderRadius: 20,
    padding: 3,
    marginBottom: 6,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
  },
  variant: {
    fontFamily: fonts.body,
    fontSize: 12,
  },
});
