import React from 'react';
import { MenuItem, Menu, Typography as Text, useTheme } from '@mui/material';

import { DeleteOutlined, EditFilled } from '../../assets/icons';

interface Props {
  anchorEl: Element | null;
  open: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const CommentContextMenu = ({ anchorEl, open, onClose, onEdit, onDelete }: Props) => {
  const { palette: colors } = useTheme();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={onEdit} sx={{ padding: '4px 24px 4px 16px' }}>
        <EditFilled color={colors.gray} />
        <Text variant="text">Edit</Text>
      </MenuItem>
      <MenuItem onClick={onDelete} sx={{ padding: '4px 24px 4px 16px' }}>
        <DeleteOutlined color={colors.gray} />
        <Text variant="text">Delete</Text>
      </MenuItem>
    </Menu>
  );
};
