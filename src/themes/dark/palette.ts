import { ThemeOptions } from '@mui/material';
import { colors } from './colors';

declare module '@mui/material/styles' {
  interface Palette {
    red: string;
    yellow: string;
    purple: string;
    blue: string;
    teal: string;
    gray: string;
    dark: string;
    black: string;
    white: string;
  }
  interface PaletteOptions {
    red?: string;
    yellow: string;
    purple: string;
    blue: string;
    teal: string;
    gray: string;
    dark: string;
    black: string;
    white: string;
  }
}

export const palette: ThemeOptions['palette'] = {
  mode: 'dark',
  ...colors,
};
