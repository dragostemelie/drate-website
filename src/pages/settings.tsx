import React, { Suspense, useState } from 'react';
import { Button, IconButton, Stack, Typography as Text, useTheme } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../store';
import { selectUi } from '../store/selectors/ui';

import { Header } from '../components/navigation/header';
import { MessageDrawer } from '../components/drawers/message-drawer';
import { Spacer } from '../components/elements/spacer';
import { PublicNav } from '../components/navigation/public-nav';
import { Spinner } from '../components/elements/spinner';
import { AvatarDrawer } from '../components/drawers/avatar-drawer';
import { updateSettings } from '../store/thunks/ui';
import { AppSelect } from '../components/elements/select';
import { setTheme } from '../store/reducers/ui';

const Settings = () => {
  const [nameDrawerOpen, setNameDrawerOpen] = useState(false);
  const [avatarDrawerOpen, setAvatarDrawerOpen] = useState(false);

  const { settings } = useAppSelector(selectUi);
  const dispatch = useAppDispatch();
  const { palette: colors } = useTheme();

  const handleChangeTheme = (themeName: string) => {
    const theme = themeName === 'Moon Rabbit' ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    dispatch(setTheme(theme));
  };

  const handleChangeName = (displayName: string) => {
    setNameDrawerOpen(false);
    dispatch(
      updateSettings({
        ...settings,
        displayName,
      }),
    );
  };

  const handleChangeAvatar = async (avatar: string) => {
    await dispatch(
      updateSettings({
        ...settings,
        avatar,
      }),
    );
    setAvatarDrawerOpen(false);
  };

  const handleOpeneNameDrawer = () => {
    setNameDrawerOpen(true);
  };
  const handleOpeneAvatarDrawer = () => {
    setAvatarDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setAvatarDrawerOpen(false);
    setNameDrawerOpen(false);
  };

  document.title = 'Settings';

  return (
    <Suspense fallback={<Spinner />}>
      <Stack
        sx={{
          padding: '0 20px 20px',
          width: '100%',
          maxWidth: 800,
          margin: 'auto',
          minHeight: '100%',
          color: colors.white,
        }}
      >
        <Header title="Settings" />
        <Spacer height={28} />
        <Stack>
          <Stack sx={{ gap: '16px' }}>
            <Text variant="h5">THEME</Text>
            <AppSelect
              selected={colors.mode === 'light' ? 'Moon Rabbit' : 'Midnight Blue'}
              values={['Moon Rabbit', 'Midnight Blue']}
              onChange={(val) => handleChangeTheme(val)}
            />
          </Stack>
          <Spacer height={36} />
          <Stack sx={{ gap: '16px' }}>
            <Text variant="h5">USER APPEARANCE</Text>
            <Text variant="text" sx={{ color: colors.gray, fontSize: 16 }}>
              These informations are used if you post comments. They are randomly selected on your first visit, but you
              can tune these up anytime.
            </Text>
          </Stack>
          <Spacer height={24} />
          <Stack sx={{ gap: '8px' }}>
            <Text variant="h6" sx={{ color: colors.gray }}>
              Avatar:
            </Text>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton
                onClick={handleOpeneAvatarDrawer}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '18px',
                  padding: 0,
                  overflow: 'hidden',
                  '& img': {
                    width: 150,
                    height: 150,
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                  },
                }}
              >
                <img src={settings.avatar} alt="Profile picture" />
              </IconButton>
              <Button variant="secondary" onClick={handleOpeneAvatarDrawer}>
                Pick
              </Button>
            </Stack>
          </Stack>
          <Spacer height={16} />
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingTop: '24px',
            }}
          >
            <Stack sx={{ gap: '8px' }}>
              <Text variant="h6" sx={{ color: colors.gray }}>
                Nickname:
              </Text>
              <Text variant="h4">{settings.displayName}</Text>
            </Stack>
            <Button variant="secondary" onClick={handleOpeneNameDrawer}>
              Edit
            </Button>
          </Stack>
          <Spacer height={16} />
        </Stack>
      </Stack>
      <AvatarDrawer
        open={avatarDrawerOpen}
        selected={settings.avatar}
        onClose={handleCloseDrawer}
        onSubmit={handleChangeAvatar}
      />
      <MessageDrawer
        open={nameDrawerOpen}
        initialValue={settings.displayName}
        maxLength={40}
        noTimeout
        title="Change your nickname"
        onClose={handleCloseDrawer}
        onSubmit={handleChangeName}
      />
      <PublicNav />
    </Suspense>
  );
};

export default Settings;
