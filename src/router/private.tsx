import React, { useEffect, Suspense } from 'react';
import { api } from '../api';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';

import { Spinner } from '../components/elements/spinner';

import { useViewport } from '../hooks/useViewport';

import { useAppDispatch, useAppSelector } from '../store';
import { selectAuthor } from '../store/selectors/author';
import { setStatus } from '../store/reducers/author';
import { instance } from '../api/instance';
import { fetchMessages, fetchPosts, fetchReaders } from '../store/thunks/author';

export const AuthorLayout = () => {
  const { status } = useAppSelector(selectAuthor);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    const isLoggedIn = await verifyToken();
    if (isLoggedIn) {
      await dispatch(fetchReaders());
      await dispatch(fetchMessages());
      await dispatch(fetchPosts());

      dispatch(setStatus('logged-in'));
    } else {
      dispatch(setStatus('not-logged-in'));
    }
  };

  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      navigate('/author/board/login', { replace: true });
    } else {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      const isLoggedIn = await api.users.verify();
      if (isLoggedIn) {
        return true;
      } else {
        localStorage.removeItem('token');
        navigate('/author/board/login', { replace: true });
      }
    }
  };

  useEffect(() => {
    fetchData();
    let polling = 0;
    if (status === 'logged-in') {
      polling = window.setInterval(fetchData, 5 * 60 * 1000);
    }
    return () => {
      window.clearInterval(polling);
    };
  }, [status]);

  return (
    <Suspense fallback={<Spinner />}>
      <ScrollRestoration />
      {status === 'loading' && <Spinner />}
      <Outlet />
    </Suspense>
  );
};
