import { Components, ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    text: React.CSSProperties;
    description: React.CSSProperties;
    label: React.CSSProperties;
    small: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    text?: React.CSSProperties;
    description?: React.CSSProperties;
    label?: React.CSSProperties;
    small?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    text: true;
    description: true;
    label: true;
    small: true;

    // Disable unused variants
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}

export const typography: ThemeOptions['typography'] = {
  fontFamily: ['Inter', 'sans-serif'].join(','),
  htmlFontSize: 16,
  h1: {
    fontSize: 30,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: 21,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h4: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h5: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.25,
  },
  h6: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
  },
  text: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  description: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1,
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    overflow: 'visible',
    whiteSpace: 'nowrap',
  },
  small: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.5,
  },
};

export const MuiTypography: Components['MuiTypography'] = {
  defaultProps: {
    variantMapping: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      text: 'p',
      description: 'p',
      label: 'span',
      small: 'span',
    },
  },
};
