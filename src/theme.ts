import { useColorScheme } from '@/src/hooks/useColorScheme';

const light = {
  background: '#eef1ee',
  surface: '#ffffff',
  text: '#1c2420',
  muted: '#5d6862',
  line: '#d5dbd6',
  accent: '#e475b2',
  onAccent: '#ffffff',
  mark: '#b8700c',
  markBackground: '#fcefd8',
  markText: '#5e3700',
  end: '#2f6b4f',
  endBackground: '#ddefe5',
  warnBackground: '#fff4dc',
  warnText: '#6b4500',
  danger: '#b3261e',
  onDanger: '#ffffff',
};

const dark: typeof light = {
  background: '#131816',
  surface: '#1c2320',
  text: '#edf0ec',
  muted: '#9ba59f',
  line: '#2c3531',
  accent: '#e475b2',
  onAccent: '#21152a',
  mark: '#f0a63c',
  markBackground: '#3a2a12',
  markText: '#ffdba6',
  end: '#7fcfa6',
  endBackground: '#16302a',
  warnBackground: '#33270f',
  warnText: '#f3d29a',
  danger: '#f2b8b5',
  onDanger: '#601410',
};

type ThemeColors = typeof light;

export const fonts = {
  display: 'YoungSerif_400Regular',
  body: 'Figtree_400Regular',
  bodyMedium: 'Figtree_500Medium',
  bodySemiBold: 'Figtree_600SemiBold',
  bodyBold: 'Figtree_700Bold',
};

export function useTheme(): ThemeColors {
  return useColorScheme() === 'dark' ? dark : light;
}
