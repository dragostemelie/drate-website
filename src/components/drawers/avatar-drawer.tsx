import React from 'react';
import { IconButton, Stack, SwipeableDrawer, TextField, Typography as Text, useTheme } from '@mui/material';

import { Puller } from '../elements/puller';
import { MessageHeader } from './styles';
import { useAppSelector } from '../../store';
import { selectAvatars } from '../../store/selectors/data';

interface Props {
  open: boolean;
  selected?: string;
  onClose: () => void;
  onSubmit: (avatar: string) => void;
}

export const AvatarDrawer = ({ open, selected, onClose, onSubmit }: Props) => {
  const { palette: colors } = useTheme();
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { avatars } = useAppSelector(selectAvatars);

  return (
    <SwipeableDrawer
      open={open}
      onOpen={() => {}}
      onClose={onClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <Puller />
      <MessageHeader>
        <Text variant="text" sx={{ color: colors.gray, flex: 1, paddingBottom: '6px' }}>
          Pick an avatar:
        </Text>
      </MessageHeader>
      <Stack
        sx={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '36px',
          padding: '24px 12px',
          justifyContent: 'center',
          overflowY: 'auto',
          height: 'calc(100% - 43px)',
        }}
      >
        {avatars.map((avatar) => (
          <IconButton
            key={avatar.url}
            onClick={() => onSubmit(avatar.url)}
            sx={{
              width: 80,
              height: 80,
              borderRadius: '18px',
              padding: 0,
              outline: avatar.url === selected ? `6px solid ${colors.purple}` : 0,
              overflow: 'hidden',
              '& img': {
                width: 90,
                height: 90,
                aspectRatio: '1/1',
                objectFit: 'cover',
              },
            }}
          >
            <img src={avatar.url} alt={avatar.name} />
          </IconButton>
        ))}
      </Stack>
    </SwipeableDrawer>
  );
};
