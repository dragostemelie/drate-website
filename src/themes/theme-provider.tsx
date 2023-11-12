import React, { useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';

import { useAppSelector } from '../store';
import { selectUi } from '../store/selectors/ui';

import { theme as darkTheme } from './dark';
import { theme as lightTheme } from './light';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const ThemeProvider = ({ children }: Props) => {
  const { settings } = useAppSelector(selectUi);

  useEffect(() => {
    const headerColor = settings.theme === 'dark' ? '#000000' : '#F2F2F7';
    const appleBarColor = settings.theme === 'dark' ? 'black-translucent' : 'default';
    document.querySelector("meta[name='theme-color']")?.setAttribute('content', headerColor);
    document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]')?.setAttribute('content', appleBarColor);
  }, [settings.theme]);

  return (
    <MuiThemeProvider theme={settings.theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
