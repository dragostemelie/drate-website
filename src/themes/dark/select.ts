import { Components } from '@mui/material';
import { colors } from './colors';

export const MuiSelect: Components['MuiSelect'] = {
  variants: [
    {
      props: { variant: 'outlined' },
      style: {},
    },
    {
      props: { variant: 'standard' },
      style: {
        width: '100%',
        padding: '12px',
        '&::before': {
          display: 'none',
        },
        '&::after': {
          display: 'none',
        },
      },
    },
  ],
  defaultProps: {
    variant: 'standard',
  },
  styleOverrides: {
    standard: {
      border: 0,
    },
    select: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      color: colors.white,
    },
  },
};
