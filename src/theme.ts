import { useColorScheme } from '@/src/hooks/useColorScheme';
import { useStore } from '@/src/store/store';

export type ThemeColors = {
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
  jarrito: {
    light: {
      background: '#F4EBDC',
      surface: '#FFFAF2',
      text: '#3A2A1E',
      muted: '#8A7A6A',
      line: '#E6D9C4',
      accent: '#1E9C82',
      onAccent: '#FFFFFF',
      mark: '#D4951F',
      markBackground: '#F8E2AE',
      markText: '#8A5A00',
      end: '#B5432C',
      endBackground: '#FBDCD2',
      warnBackground: '#FDF1DA',
      warnText: '#7A4E00',
      danger: '#A3222E',
      onDanger: '#FFFFFF',
    },
    dark: {
      background: '#1E1813',
      surface: '#2A221C',
      text: '#F4EBDC',
      muted: '#A89A8D',
      line: '#3A3028',
      accent: '#3FC1A5',
      onAccent: '#1E1813',
      mark: '#E8A92A',
      markBackground: '#3D2E14',
      markText: '#E8A92A',
      end: '#F58A74',
      endBackground: '#40241D',
      warnBackground: '#3A2E18',
      warnText: '#F3D29A',
      danger: '#FF7A7A',
      onDanger: '#1E1813',
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

export const PALETTE_NAMES = Object.keys(palettes) as PaletteName[];

export function getPalette(name: PaletteName): { light: ThemeColors; dark: ThemeColors } {
  return palettes[name] ?? palettes[DEFAULT_PALETTE];
}

export function useTheme(): ThemeColors {
  const palette = useStore((state) => state.settings.palette);
  return getPalette(palette)[useColorScheme()];
}
