import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Reader, Post } from '../../models/author';
import { fetchMessages, fetchPosts, fetchReaders, updatePost } from '../thunks/author';

const initialState = {
  ui: {
    readers: {
      sort: 'Last visited',
    },
    posts: {
      sort: 'Newest',
    },
  },
  readers: [] as Reader[],
  messages: [] as Message[],
  posts: [] as Post[],
  status: 'loading',
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ui: {
          ...state.ui,
          readers: {
            ...state.ui.readers,
            sort: action.payload,
          },
        },
      };
    },
    setStatus: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchReaders.fulfilled, (state, action: PayloadAction<Reader[]>) => ({
      ...state,
      readers: action.payload,
    }));
    builder.addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => ({
      ...state,
      messages: action.payload,
    }));
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
    }));
    builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => ({
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            ...action.payload,
          };
        }
        return post;
      }),
    }));
  },
});

// actions
export const { setStatus, setSort } = authorSlice.actions;

export default authorSlice.reducer;
