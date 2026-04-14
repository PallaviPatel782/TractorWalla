import { lightColors, darkColors } from './tokens/colors';
import { typography } from './tokens/typography';

export const theme = (mode: 'light' | 'dark') => ({
  colors: mode === 'dark' ? darkColors : lightColors,
  typography,
  mode,
});

export type AppTheme = ReturnType<typeof theme>;

export * from './ThemeContext';
export * from './useThemedStyles';