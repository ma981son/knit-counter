import { useColorScheme } from '@/src/hooks/useColorScheme';

type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  line: string;
  accent: string;
  onAccent: string;
  mark: string;
  markBackground: string;
  markText: string;
  end: string;
  endBackground: string;
  warnBackground: string;
  warnText: string;
  danger: string;
  onDanger: string;
};

const palettes = {
  rosadito: {
    light: {
      background: '#F4EBE6',
      surface: '#FFFFFF',
      text: '#2A2026',
      muted: '#7D6D74',
      line: '#E3D6D0',
      accent: '#D13F55',
      onAccent: '#FFFFFF',
      mark: '#B7791F',
      markBackground: '#FBE8B8',
      markText: '#8A5A00',
      end: '#1E7A6C',
      endBackground: '#D5F0EA',
      warnBackground: '#FDF1DA',
      warnText: '#7A4E00',
      danger: '#B3261E',
      onDanger: '#FFFFFF',
    },
    dark: {
      background: '#211A1E',
      surface: '#2D2429',
      text: '#F3E8E3',
      muted: '#A8999F',
      line: '#3D3238',
      accent: '#F29BB0',
      onAccent: '#211A1E',
      mark: '#F2BE4E',
      markBackground: '#3D3220',
      markText: '#F2BE4E',
      end: '#4FBFAE',
      endBackground: '#1F3532',
      warnBackground: '#3A2E18',
      warnText: '#F3D29A',
      danger: '#F28B8B',
      onDanger: '#3A0F14',
    },
  },
} satisfies Record<string, { light: ThemeColors; dark: ThemeColors }>;

export type PaletteName = keyof typeof palettes;

export const DEFAULT_PALETTE: PaletteName = 'rosadito';

export const fonts = {
  display: 'YoungSerif_400Regular',
  body: 'Figtree_400Regular',
  bodyMedium: 'Figtree_500Medium',
  bodySemiBold: 'Figtree_600SemiBold',
  bodyBold: 'Figtree_700Bold',
};

export function useTheme(): ThemeColors {
  return palettes[DEFAULT_PALETTE][useColorScheme()];
}
