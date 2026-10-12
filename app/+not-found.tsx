import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '@/src/theme';

export default function NotFoundScreen() {
  const colors = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>This screen doesn't exist.</Text>
        <Link href="/" style={[styles.link, { color: colors.accent }]}>
          Go to your projects
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 20,
  },
  link: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    marginTop: 15,
    paddingVertical: 15,
  },
});
