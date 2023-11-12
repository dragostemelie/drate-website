import { Components } from '@mui/material';
import { colors } from './colors';

export const MuiCssBaseline: Components['MuiCssBaseline'] = {
  styleOverrides: {
    html: {
      height: '100%',
      '@media (min-width:600px)': {
        '& *': { scrollbarColor: ' #787985 #000000', scrollbarWidth: 'thin' },
        '& *::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '& *::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '& *::-webkit-scrollbar-thumb': {
          background: '#787985',
          borderRadius: '3px',
        },
        '& *::-webkit-scrollbar-thumb:hover': {
          background: '#61626B',
        },
      },
    },
    body: {
      height: '100%',
      background: colors.black,
      '& #root': {
        height: '100%',
      },
    },
  },
};
