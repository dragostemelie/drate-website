import { Components } from '@mui/material';
import { colors } from './colors';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    outlined: true;
    big: true;
  }
}

export const MuiButton: Components['MuiButton'] = {
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        color: colors.black,
        backgroundColor: colors.white,
        padding: '10px 38px',
        border: `1px solid ${colors.white}`,
        '&:hover': {
          backgroundColor: colors.white,
        },
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        color: colors.white,
        backgroundColor: colors.dark,
        padding: '10px 38px',
        border: `1px solid ${colors.dark}`,
        '&:hover': {
          backgroundColor: colors.dark,
        },
      },
    },
    {
      props: { variant: 'big' },
      style: {
        color: colors.white,
        backgroundColor: colors.dark,
        height: '47px',
        borderRadius: '24px',
        padding: '10px 38px',
        border: `1px solid ${colors.dark}`,
        '&:hover': {
          backgroundColor: colors.dark,
        },
      },
    },
    {
      props: { variant: 'outlined' },
      style: {
        color: colors.white,
        backgroundColor: 'transparent',
        padding: 0,
        border: 0,
        '&:hover': {
          backgroundColor: 'transparent',
          border: 0,
        },
      },
    },
  ],
  defaultProps: {
    variant: 'primary',
  },
  styleOverrides: {
    root: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1,
      height: 34,
      borderRadius: '16px',
      boxShadow: 'none',
      textTransform: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    },
  },
};
