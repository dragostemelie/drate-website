createRoutesFromElements;

import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

import { Layout as Public } from './public';
import { AuthorLayout as Private } from './private';

const Explore = lazy(() => import('../pages/explore'));
const Saved = lazy(() => import('../pages/saved'));
const Search = lazy(() => import('../pages/search'));
const Settings = lazy(() => import('../pages/settings'));
const SinglePost = lazy(() => import('../pages/single-post'));
const ImageGenerator = lazy(() => import('../pages/posts/image-generator'));
const ViewImage = lazy(() => import('../pages/view-image'));

const Author = lazy(() => import('../pages/author'));
const Login = lazy(() => import('../pages/board/login'));
const Readers = lazy(() => import('../pages/board/readers'));
const Messages = lazy(() => import('../pages/board/messages'));
const Posts = lazy(() => import('../pages/board/posts'));
const AuthorSettings = lazy(() => import('../pages/board/settings'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Public />}>
      <Route index element={<Explore />} />
      <Route path="search" element={<Search />} />
      <Route path="saved" element={<Saved />} />
      <Route path="settings" element={<Settings />} />

      <Route path="post" element={<Navigate to="/" replace />} />
      <Route path="post/:slug" element={<SinglePost />} />
      <Route path="post/Image-generator" element={<ImageGenerator />} />

      <Route path="author/:slug" element={<Author />} />
      <Route path="author/board" element={<Private />}>
        <Route index element={<Navigate to="readers" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="readers" element={<Readers />} />
        <Route path="messages" element={<Messages />} />
        <Route path="posts" element={<Posts />} />
        <Route path="settings" element={<AuthorSettings />} />
      </Route>

      <Route path="image/:slug" element={<ViewImage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
);
