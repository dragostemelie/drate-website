import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageGenerator } from '../../models/openai';
import { Settings } from '../../models/user';
import { fetchSaved, fetchSettings, generateImage, savePost, updateSettings } from '../thunks/ui';

const initialState = {
  posts: {
    filter: 'All tags',
    sort: 'Newest',
    search: '',
  },
  saved: [] as number[],
  settings: {
    uuid: '',
    guid: '',
    avatar: '',
    displayName: '',
    title: '',
    about: '',
    theme: 'light',
  } as Settings,
  imageGenerator: {
    url: undefined,
    size: 'Medium',
    error: undefined,
  } as ImageGenerator | undefined,
  status: 'loading',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        posts: {
          ...state.posts,
          filter: action.payload,
        },
      };
    },
    setSort: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        posts: {
          ...state.posts,
          sort: action.payload,
        },
      };
    },
    setSearch: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        posts: {
          ...state.posts,
          search: action.payload,
        },
      };
    },
    setSaved: (state, action: PayloadAction<number[]>) => {
      return {
        ...state,
        saved: action.payload,
      };
    },
    resetImageGenerator: (state) => {
      return {
        ...state,
        imageGenerator: {
          url: null,
          size: state.imageGenerator?.size || 'Medium',
          error: undefined,
        },
      };
    },
    setStatus: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    setTheme: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.payload,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSettings.fulfilled, (state, action: PayloadAction<Settings>) => ({
      ...state,
      settings: {
        ...state.settings,
        ...action.payload,
      },
    }));
    builder.addCase(updateSettings.fulfilled, (state, action: PayloadAction<Settings>) => ({
      ...state,
      settings: {
        ...state.settings,
        ...action.payload,
      },
    }));
    builder.addCase(fetchSaved.fulfilled, (state, action: PayloadAction<number[]>) => ({
      ...state,
      saved: action.payload,
    }));
    builder.addCase(savePost.fulfilled, (state, action: PayloadAction<number>) => ({
      ...state,
      saved: state.saved.includes(action.payload)
        ? state.saved.filter((item) => item !== action.payload)
        : [...state.saved, action.payload],
    }));
    builder.addCase(generateImage.fulfilled, (state, action: PayloadAction<ImageGenerator>) => ({
      ...state,
      imageGenerator: action.payload,
    }));
  },
});

// actions
export const { setFilter, setSort, setSearch, setSaved, resetImageGenerator, setStatus, setTheme } = uiSlice.actions;

export default uiSlice.reducer;
