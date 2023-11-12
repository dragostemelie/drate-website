import React from 'react';
import { MenuItem, Menu, Typography as Text, useTheme } from '@mui/material';

import { Calendar, LayerGroup, SortDown } from '../../assets/icons';

interface Props {
  anchorEl: Element | null;
  open: boolean;
  onSelect: (option: string) => void;
  onClose: () => void;
}

export const SortContextMenu = ({ anchorEl, open, onClose, onSelect }: Props) => {
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
      <MenuItem onClick={() => onSelect('Newest')}>
        <Calendar color={colors.gray} />
        <Text variant="text">Newest</Text>
      </MenuItem>
      <MenuItem onClick={() => onSelect('Post title')}>
        <SortDown color={colors.gray} />
        <Text variant="text">Post title</Text>
      </MenuItem>
      <MenuItem onClick={() => onSelect('Topic')}>
        <LayerGroup color={colors.gray} />
        <Text variant="text">Topic</Text>
      </MenuItem>
    </Menu>
  );
};
