import React, { useEffect, Suspense } from 'react';
import { api } from '../api';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Spinner } from '../components/elements/spinner';

import { useViewport } from '../hooks/useViewport';

import { useAppDispatch, useAppSelector } from '../store';
import { selectUi } from '../store/selectors/ui';
import { fetchAvatars, fetchPosts, fetchUsers } from '../store/thunks/data';
import { fetchSaved, fetchSettings } from '../store/thunks/ui';
import { setStatus } from '../store/reducers/ui';

export const Layout = () => {
  const { height } = useViewport();
  document.documentElement.style.setProperty('height', `${height}px`);

  const { status } = useAppSelector(selectUi);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    const guid = getGuid();
    const theme = getTheme();

    await dispatch(fetchAvatars());
    await dispatch(fetchSettings({ guid, theme }));
    await dispatch(fetchSaved(guid));
    await dispatch(fetchPosts());
    await dispatch(fetchUsers());
    dispatch(setStatus('idle'));
    api.stats.postStats(guid);
  };

  const getGuid = () => {
    let uuid = localStorage.getItem('uuid');
    if (uuid === null) {
      uuid = crypto.randomUUID();
      localStorage.setItem('uuid', uuid);
    }
    return uuid;
  };

  const getTheme = () => {
    const themes = ['dark', 'light'];

    let theme = localStorage.getItem('theme');
    if (theme === null || !themes.includes(theme)) {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = isDarkMode ? 'dark' : 'light';

      localStorage.setItem('theme', theme);
    }
    return theme;
  };

  useEffect(() => {
    fetchData();
    const polling = window.setInterval(fetchData, 5 * 60 * 1000);
    return () => {
      window.clearInterval(polling);
    };
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <ScrollRestoration />
      {status === 'loading' && <Spinner />}
      <Outlet />
    </Suspense>
  );
};
