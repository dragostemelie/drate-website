import { Components } from '@mui/material';
import { colors } from './colors';

export const MuiDialog: Components['MuiDialog'] = {
  styleOverrides: {
    container: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(1px)',
    },
    paper: {
      background: colors.black,
      padding: '24px',
      borderRadius: '18px',
    },
  },
};

export const MuiDialogTitle: Components['MuiDialogTitle'] = {
  styleOverrides: {
    root: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 1.2,
      color: colors.white,
      textAlign: 'center',
      padding: '0 0 12px 0',
    },
  },
};

export const MuiDialogContent: Components['MuiDialogContent'] = {
  styleOverrides: {
    root: {
      padding: '0 0 12px 0',
    },
  },
};

export const MuiDialogContentText: Components['MuiDialogContentText'] = {
  styleOverrides: {
    root: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
      color: colors.gray,
      textAlign: 'center',
      padding: '0 0 12px 0',
    },
  },
};

export const MuiDialogActions: Components['MuiDialogActions'] = {
  styleOverrides: {
    root: {
      margin: 'auto',
    },
  },
};
