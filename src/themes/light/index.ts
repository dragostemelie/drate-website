import { createTheme } from '@mui/material/styles';

import { palette } from './palette';
import { typography, MuiTypography } from './typography';
import { MuiButton } from './buttons';
import { MuiDialog, MuiDialogTitle, MuiDialogContent, MuiDialogContentText, MuiDialogActions } from './dialog';
import { MuiTextField } from './input';
import { MuiSelect } from './select';
import { MuiCssBaseline } from './globals';
import { MuiChip, MuiCircularProgress, MuiSwipeableDrawer, MuiMenu, MuiMenuItem } from './others';

export const theme = createTheme({
  palette,
  typography,
  components: {
    MuiButton,
    MuiChip,
    MuiCircularProgress,
    MuiCssBaseline,
    MuiDialog,
    MuiDialogTitle,
    MuiDialogContent,
    MuiDialogContentText,
    MuiDialogActions,
    MuiMenu,
    MuiMenuItem,
    MuiSwipeableDrawer,
    MuiTextField,
    MuiSelect,
    MuiTypography,
  },
});
