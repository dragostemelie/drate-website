import React, { Suspense, useEffect, useState } from 'react';
import { Button, Stack, Typography as Text, useTheme } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/navigation/header';
import { Spacer } from '../../components/elements/spacer';
import { Spinner } from '../../components/elements/spinner';
import { TextInput } from '../../components/elements/text-input';
import { AppDialog } from '../../components/elements/dialog';
import { api } from '../../api';

import { useAppDispatch, useAppSelector } from '../../store';
import { setStatus } from '../../store/reducers/author';
import { selectAuthor } from '../../store/selectors/author';
import { fetchSettings } from '../../store/thunks/ui';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const navigate = useNavigate();
  const { palette: colors } = useTheme();
  const { status } = useAppSelector(selectAuthor);
  const dispatch = useAppDispatch();
  document.title = 'Author zone - Login';

  const handleEnterKey = () => {
    const passwordInput = document.querySelector('#password') as HTMLInputElement | undefined;
    passwordInput?.focus();
  };

  const handleClose = () => {
    setError(undefined);
    setSubmitting(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email is invalid');
      return;
    }

    if (password.trim().length < 8) {
      setError('Password is invalid');
      return;
    }

    const author = await api.users.login(email, password);
    if (!author.token) {
      setError(author.message);
      return;
    }

    localStorage.setItem('uuid', author.guid);
    localStorage.setItem('token', author.token);
    const theme = localStorage.getItem('theme') || 'dark';
    await dispatch(fetchSettings({ guid: author.guid, theme }));
    setTimeout(() => {
      dispatch(setStatus('loading'));
      navigate('/author/board/readers', { replace: true });
    }, 1000);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      navigate('/author/board/readers', { replace: true });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      {loading ? (
        <Spinner />
      ) : (
        <Stack sx={{ padding: '0 20px 20px', width: '100%', maxWidth: 600, margin: 'auto', minHeight: '100%' }}>
          <Header title="Author zone" />
          <Spacer height={24} />
          <Stack sx={{ alignItems: 'center' }}>
            <img src="/drate.svg" width={128} height={128} alt="Logo" />
          </Stack>
          <Spacer height={24} />
          <Stack sx={{ gap: '8px' }}>
            <Text variant="label" sx={{ color: colors.white, paddingLeft: '12px' }}>
              Email
            </Text>
            <TextInput
              id="email"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="email@example.com"
              onSubmit={handleEnterKey}
              readonly={submitting}
            />
          </Stack>
          <Spacer height={18} />
          <Stack sx={{ gap: '8px' }}>
            <Text variant="label" sx={{ color: colors.white, paddingLeft: '12px' }}>
              Password
            </Text>
            <TextInput
              id="password"
              value={password}
              type="password"
              onChange={setPassword}
              onSubmit={handleSubmit}
              readonly={submitting}
            />
          </Stack>
          <Spacer height={24} />
          <Button variant="big" onClick={handleSubmit} disabled={submitting}>
            Login
          </Button>
        </Stack>
      )}
      <AppDialog open={!!error} onConfirm={handleClose} title="Login failed" text={error || ''} />
    </Suspense>
  );
};

export default Login;
