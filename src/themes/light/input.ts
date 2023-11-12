import { Components } from '@mui/material';
import { colors } from './colors';

export const MuiTextField: Components['MuiTextField'] = {
  variants: [
    {
      props: { variant: 'outlined' },
      style: {
        '& .MuiInputBase-root': {
          padding: '12px',
          borderRadius: '8px',
        },
      },
    },
    {
      props: { variant: 'standard' },
      style: {
        '& .MuiInputBase-root': {
          padding: '12px',
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
        },
      },
    },
  ],
  defaultProps: {
    variant: 'standard',
  },
  styleOverrides: {
    root: {
      '& .MuiInputBase-input': {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
        color: colors.white,
        padding: 0,
        '&::placeholder': {
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.5,
          color: colors.gray,
        },
      },
    },
  },
};
