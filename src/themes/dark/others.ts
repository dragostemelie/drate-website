import { Components } from '@mui/material';
import { colors } from './colors';

export const MuiChip: Components['MuiChip'] = {
  variants: [
    {
      props: { variant: 'filled' },
      style: {
        color: colors.black,
        backgroundColor: colors.yellow,
        border: `1px solid ${colors.yellow}`,
        '&:hover': {
          backgroundColor: colors.yellow,
          border: `1px solid ${colors.yellow}`,
        },
      },
    },
    {
      props: { variant: 'outlined' },
      style: {
        color: colors.white,
        backgroundColor: colors.black,
        border: `1px solid ${colors.teal}`,
        '&:hover': {
          backgroundColor: colors.black,
        },
      },
    },
  ],
  styleOverrides: {
    root: {
      transition: 'none',
      userSelect: 'none',
    },
    label: {
      padding: '6px 16px',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: '20px',
      overflow: 'visible',
      whiteSpace: 'nowrap',
    },
  },
};

export const MuiCircularProgress: Components['MuiCircularProgress'] = {
  defaultProps: {
    size: 92,
  },
  styleOverrides: {
    root: {
      color: colors.white,
    },
  },
};

export const MuiMenu: Components['MuiMenu'] = {
  styleOverrides: {
    paper: {
      borderRadius: '12px',
    },
    list: {
      background: colors.dark,
      borderRadius: '12px',
      padding: '8px 0',
    },
  },
};

export const MuiMenuItem: Components['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
      color: colors.white,
      padding: '8px 16px',
      gap: '8px',
      alignItems: 'center',
    },
  },
};

export const MuiSwipeableDrawer: Components['MuiSwipeableDrawer'] = {
  defaultProps: {
    anchor: 'bottom',
    PaperProps: {
      style: {
        background: colors.black,
        padding: '32px 20px 0 20px',
        borderRadius: '36px 36px 0 0',
        height: '80%',
        margin: '0 auto',
        maxWidth: '600px',
      },
    },
    BackdropProps: {
      style: {
        background: 'rgba(185, 185, 185, 0.15)',
        backdropFilter: 'blur(1.5px)',
      },
    },
  },
};
