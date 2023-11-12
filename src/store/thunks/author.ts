import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import { Post } from '../../models/author';
import { fetchPosts as uiFetchPosts } from './data';

// FETCH READERS
export const fetchReaders = createAsyncThunk('author/fetchReaders', async () => {
  try {
    const data = await api.author.getReaders();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return [];
  }
});

// FETCH MESSAGES
export const fetchMessages = createAsyncThunk('author/fetchMessages', async () => {
  try {
    const data = await api.author.getMessages();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return [];
  }
});

// FETCH POSTS
export const fetchPosts = createAsyncThunk('author/fetchPosts', async () => {
  try {
    const data = await api.author.getPosts();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return [];
  }
});

// UPDATE POST
export const updatePost = createAsyncThunk('author/updatePost', async (post: Post, { dispatch }) => {
  try {
    const data = await api.author.updatePost(post);
    dispatch(uiFetchPosts());
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return post;
  }
});
