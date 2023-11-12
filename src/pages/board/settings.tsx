import React, { Suspense, useState } from 'react';
import { Button, IconButton, Stack, Typography as Text, useTheme } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store';
import { selectUi } from '../../store/selectors/ui';

import { Header } from '../../components/navigation/header';
import { MessageDrawer } from '../../components/drawers/message-drawer';
import { Spacer } from '../../components/elements/spacer';
import { PublicNav } from '../../components/navigation/public-nav';
import { Spinner } from '../../components/elements/spinner';
import { AvatarDrawer } from '../../components/drawers/avatar-drawer';
import { updateSettings } from '../../store/thunks/ui';
import { AppSelect } from '../../components/elements/select';
import { setTheme } from '../../store/reducers/ui';
import { PrivateNav } from '../../components/navigation/private-nav';
import { Markdown } from '../../components/markdown/markdown';
import { EditFilled } from '../../assets/icons';

const Settings = () => {
  const [inputDrawerOpen, setInputDrawerOpen] = useState(false);
  const [inputLabel, setInputLabel] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [avatarDrawerOpen, setAvatarDrawerOpen] = useState(false);

  const { settings } = useAppSelector(selectUi);
  const dispatch = useAppDispatch();
  const { palette: colors } = useTheme();

  const handleChangeTheme = (themeName: string) => {
    const theme = themeName === 'Moon Rabbit' ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    dispatch(setTheme(theme));
  };

  const handleChangeName = (value: string) => {
    setInputDrawerOpen(false);
    switch (inputLabel) {
      case 'Change your name':
        dispatch(
          updateSettings({
            ...settings,
            displayName: value,
          }),
        );
        break;
      case 'Change your title':
        dispatch(
          updateSettings({
            ...settings,
            title: value,
          }),
        );
        break;
      case 'Change description':
        dispatch(
          updateSettings({
            ...settings,
            about: value,
          }),
        );
        break;

      default:
        break;
    }
    setInputLabel('');
    setInputValue('');
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

  const handleOpenInputDrawer = (label: string, value: string) => {
    setInputLabel(label);
    setInputValue(value);
    setInputDrawerOpen(true);
  };
  const handleOpeneAvatarDrawer = () => {
    setAvatarDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setAvatarDrawerOpen(false);
    setInputDrawerOpen(false);
    setInputLabel('');
    setInputValue('');
  };

  document.title = 'Settings';

  return (
    <Suspense fallback={<Spinner />}>
      <Stack
        sx={{
          padding: '0 20px 20px',
          width: '100%',
          maxWidth: 600,
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
            <Text variant="h5">PROFILE</Text>
          </Stack>
          <Spacer height={24} />
          <Stack sx={{ gap: '8px' }}>
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

          <Spacer height={24} />
          <Stack
            sx={{
              gap: '8px',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text variant="h4">{settings.displayName}</Text>
            <IconButton onClick={() => handleOpenInputDrawer('Change your name', settings.displayName)}>
              <EditFilled size={18} />
            </IconButton>
          </Stack>

          <Stack
            sx={{
              gap: '8px',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text variant="text" sx={{ color: colors.gray }}>
              {settings.title}
            </Text>
            <IconButton onClick={() => handleOpenInputDrawer('Change your title', settings.title)}>
              <EditFilled size={18} />
            </IconButton>
          </Stack>

          <Spacer height={24} />
          <Stack
            sx={{
              gap: '8px',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text variant="h4">ABOUT</Text>
            <IconButton onClick={() => handleOpenInputDrawer('Change description', settings.about)}>
              <EditFilled size={18} />
            </IconButton>
          </Stack>
          <Markdown>{settings.about}</Markdown>
        </Stack>
      </Stack>
      <AvatarDrawer
        open={avatarDrawerOpen}
        selected={settings.avatar}
        onClose={handleCloseDrawer}
        onSubmit={handleChangeAvatar}
      />
      <MessageDrawer
        open={inputDrawerOpen}
        initialValue={inputValue}
        noTimeout
        maxLength={2000}
        title={inputLabel}
        onClose={handleCloseDrawer}
        onSubmit={handleChangeName}
      />
      <PrivateNav />
    </Suspense>
  );
};

export default Settings;
