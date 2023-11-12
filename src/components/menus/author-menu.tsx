import React from 'react';
import { MenuItem, Menu, Typography as Text, useTheme } from '@mui/material';

import { BookmarkFilled, BookmarkOutlined, HeartFilled, HeartOutlined, PaperPlaneOutlined } from '../../assets/icons';

interface Props {
  anchorEl: Element | null;
  open: boolean;
  onSelect: (option: string) => void;
  onClose: () => void;
}

export const AuthorContextMenu = ({ anchorEl, open, onClose, onSelect }: Props) => {
  const { palette: colors } = useTheme();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{ padding: '8px 20px' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => onSelect('create')}>
        <BookmarkOutlined color={colors.gray} />
        <Text variant="text">New article</Text>
      </MenuItem>
      <MenuItem onClick={() => onSelect('logout')}>
        <HeartOutlined color={colors.gray} />
        <Text variant="text">Log out</Text>
      </MenuItem>
    </Menu>
  );
};
