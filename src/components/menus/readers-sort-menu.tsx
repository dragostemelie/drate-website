import React from 'react';
import { MenuItem, Menu, Typography as Text, useTheme } from '@mui/material';

import { Calendar, SortDown, ThreeLayers } from '../../assets/icons';

interface Props {
  anchorEl: Element | null;
  open: boolean;
  selected: string;
  onSelect: (option: string) => void;
  onClose: () => void;
}

export const ReadersSortContextMenu = ({ anchorEl, selected, open, onClose, onSelect }: Props) => {
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
      <MenuItem onClick={() => onSelect('Last visited')} selected={selected === 'Last visited'}>
        <Calendar color={colors.gray} />
        <Text variant="text">Last visited</Text>
      </MenuItem>
      <MenuItem onClick={() => onSelect('Comments')} selected={selected === 'Comments'}>
        <SortDown color={colors.gray} />
        <Text variant="text">Comments</Text>
      </MenuItem>
      <MenuItem onClick={() => onSelect('Page count')} selected={selected === 'Page count'}>
        <ThreeLayers color={colors.gray} />
        <Text variant="text">Page count</Text>
      </MenuItem>
    </Menu>
  );
};
