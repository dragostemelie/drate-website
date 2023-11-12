/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { api } from '../../api';

import { Avatar } from '../../models/avatar';
import { Settings } from '../../models/user';
import { updateUser } from './data';

// FETCH SETTINGS
export const fetchSettings = createAsyncThunk(
  'ui/fetchSettings',
  async ({ guid, theme }: { guid: string; theme: string }, { getState }) => {
    const uuid = '';
    const title = '';
    const about = '';
    const state = getState() as RootState;
    const { url: avatar, name: displayName } = randomAvatar(state.data.avatars);
    try {
      const data = await api.users.getSelf({ guid, avatar, displayName });
      return { ...data, theme };
    } catch (err: any) {
      return { uuid, guid, avatar, displayName, theme, title, about };
    }
  },
);

// FETCH SAVED
export const fetchSaved = createAsyncThunk('ui/fetchSaved', async (guid: string) => {
  try {
    const data = await api.posts.getSaved(guid);
    return data;
  } catch (err: any) {
    return [] as number[];
  }
});

// SAVE POST
export const savePost = createAsyncThunk('ui/savePost', async (postId: number, { getState }) => {
  const state = getState() as RootState;
  try {
    if (state.ui.saved.includes(postId)) {
      await api.posts.unsavePost(state.ui.settings.guid, postId);
    } else {
      await api.posts.savePost(state.ui.settings.guid, postId);
    }
    return postId;
  } catch (err: any) {
    return 0;
  }
});

// CHANGE SETTINGS
export const updateSettings = createAsyncThunk('ui/updateSettings', async (settings: Settings, { dispatch }) => {
  try {
    api.users.updateSelf(settings);
    dispatch(updateUser(settings));
    return settings;
  } catch (err: any) {
    return settings;
  }
});

// GENERATE IMAGE
export const generateImage = createAsyncThunk(
  'ui/generateImage',
  async ({ prompt, size }: { prompt: string; size: string }) => {
    try {
      const data = await api.openai.generateImage({ prompt, size });
      return {
        url: data.imageUrl,
        size,
        error: data.error,
      };
    } catch (err: any) {
      return {
        url: null,
        size,
        error: 'An error occured while generating the image',
      };
    }
  },
);

function randomAvatar(avatars: Avatar[]) {
  const max = avatars.length - 1;
  const index = Math.floor(Math.random() * max);
  return avatars[index];
}
