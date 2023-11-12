import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

interface Props {
  open: boolean;
  title: string;
  text: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

export const AppDialog = ({ open, title, text, cancelLabel, confirmLabel, onCancel, onConfirm }: Props) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{text}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ gap: '24px' }}>
      {cancelLabel && (
        <Button variant="outlined" onClick={onCancel}>
          {cancelLabel}
        </Button>
      )}
      <Button onClick={onConfirm} sx={{ flex: 1 }} autoFocus>
        {confirmLabel || 'OK'}
      </Button>
    </DialogActions>
  </Dialog>
);
