import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  addComment,
  deleteComment,
  fetchAvatars,
  fetchPosts,
  fetchUsers,
  likeComment,
  likePost,
  updateComment,
  updateUser,
} from '../thunks/data';
import type { Avatar } from '../../models/avatar';
import type { Post } from '../../models/post';
import type { ShortUser, User } from '../../models/user';

const initialState = {
  avatars: [] as Avatar[],
  users: [] as User[],
  posts: [] as Post[],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAvatars.fulfilled, (state, action: PayloadAction<Avatar[]>) => ({
      ...state,
      avatars: action.payload,
    })),
      builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => ({
        ...state,
        posts: action.payload,
      })),
      builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => ({
        ...state,
        users: action.payload,
      })),
      builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<ShortUser>) => ({
        ...state,
        users: [...state.users.map((usr) => (usr.uuid === action.payload.uuid ? { ...usr, ...action.payload } : usr))],
      })),
      builder.addCase(addComment.fulfilled, (state, action: PayloadAction<Post[]>) => ({
        ...state,
        posts: action.payload,
      }));
    builder.addCase(updateComment.fulfilled, (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
    }));
    builder.addCase(deleteComment.fulfilled, (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
    }));
    builder.addCase(likePost.fulfilled, (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
    }));
    builder.addCase(likeComment.fulfilled, (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
    }));
  },
});

export default dataSlice.reducer;
