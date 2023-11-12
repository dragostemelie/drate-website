import React from 'react';
import { MenuItem, Menu, Typography as Text, useTheme } from '@mui/material';

import { BookmarkFilled, BookmarkOutlined, HeartFilled, HeartOutlined, PaperPlaneOutlined } from '../../assets/icons';

interface Props {
  anchorEl: Element | null;
  open: boolean;
  isSaved: boolean;
  isLiked: boolean;
  onSelect: (option: string) => void;
  onClose: () => void;
}

export const PostContextMenu = ({ anchorEl, open, isSaved, isLiked, onClose, onSelect }: Props) => {
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
      <MenuItem onClick={() => onSelect('Save')}>
        {isSaved ? <BookmarkFilled color={colors.yellow} /> : <BookmarkOutlined color={colors.gray} />}
        <Text variant="text">{isSaved ? 'Article saved' : 'Add to saved'}</Text>
      </MenuItem>
      <MenuItem onClick={() => onSelect('Like')}>
        {isLiked ? <HeartFilled color={colors.red} /> : <HeartOutlined color={colors.gray} />}
        <Text variant="text">{isLiked ? 'Liked' : 'Like article'}</Text>
      </MenuItem>
      <MenuItem onClick={() => onSelect('Comment')}>
        <PaperPlaneOutlined color={colors.gray} />
        <Text variant="text">Leave a comment</Text>
      </MenuItem>
    </Menu>
  );
};
