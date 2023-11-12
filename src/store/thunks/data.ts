/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, Post } from '../../models/post';

import { RootState } from '..';
import { Avatar } from '../../models/avatar';
import { ShortUser, User } from '../../models/user';
import { api } from '../../api';

// FETCH POSTS
export const fetchPosts = createAsyncThunk('data/posts/fetch', async () => {
  try {
    const data = await api.posts.getAll();
    return data;
  } catch (err: any) {
    return [] as Post[];
  }
});

// FETCH USERS
export const fetchUsers = createAsyncThunk('data/users/fetch', async () => {
  try {
    const data = await api.users.getAll();
    return data;
  } catch (err: any) {
    return [] as User[];
  }
});

// FETCH AVATARS
export const fetchAvatars = createAsyncThunk('data/avatars/fetch', async () => {
  try {
    const data = await api.avatars.getAll();
    return data;
  } catch (err: any) {
    return [] as Avatar[];
  }
});

// UPDATE USER
export const updateUser = createAsyncThunk('data/users/update', async (user: ShortUser) => {
  try {
    return user;
  } catch (err: any) {
    return {
      uuid: '',
      avatar: '',
      displayName: '',
      theme: '',
    };
  }
});

// LIKE POST
export const likePost = createAsyncThunk('data/posts/toggleLike', async (postId: number, { getState }) => {
  const state = getState() as RootState;
  const uuid = state.ui.settings.uuid;
  const guid = state.ui.settings.guid;
  const posts = state.data.posts;
  try {
    const liked = posts.some((post) => post.id === postId && post.likes.includes(uuid));
    if (liked) {
      await api.posts.unlikePost(guid, postId);
    } else {
      await api.posts.likePost(guid, postId);
    }
    return posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likes: [
              ...(post.likes.includes(uuid) ? post.likes.filter((item) => item !== uuid) : [...post.likes, uuid]),
            ],
          }
        : post,
    );
  } catch (err: any) {
    return posts;
  }
});

// ADD COMMENT
export const addComment = createAsyncThunk(
  'data/posts/addComment',
  async ({ postId, newComment }: { postId: number; newComment: Comment }, { getState }) => {
    const state = getState() as RootState;
    const guid = state.ui.settings.guid;
    const posts = state.data.posts;
    try {
      const comment = await api.posts.addComment(guid, postId, newComment);

      if (newComment.repliedTo) {
        return posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments.map((item) =>
                    item.id === newComment.repliedTo
                      ? { ...item, replies: [...item.replies, { ...newComment, id: comment.id }] }
                      : item,
                  ),
                ],
              }
            : post,
        );
      } else {
        return posts.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, { ...newComment, id: comment.id }] } : post,
        );
      }
    } catch (err: any) {
      return posts;
    }
  },
);

// EDIT COMMENT
export const updateComment = createAsyncThunk(
  'data/posts/updateComment',
  async ({ postId, editedComment: newComment }: { postId: number; editedComment: Comment }, { getState }) => {
    const state = getState() as RootState;
    const guid = state.ui.settings.guid;
    const posts = state.data.posts;
    try {
      api.posts.editComment(guid, newComment.id, newComment);
      if (newComment.repliedTo) {
        return posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments.map((item) =>
                    item.id === newComment.repliedTo
                      ? {
                          ...item,
                          replies: [...item.replies.filter((reply) => reply.id !== newComment.id), newComment],
                        }
                      : item,
                  ),
                ],
              }
            : post,
        );
      } else {
        return posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...post.comments.filter((comment) => comment.id !== newComment.id), newComment],
              }
            : post,
        );
      }
    } catch (err: any) {
      return posts;
    }
  },
);

// DELETE COMMENT
export const deleteComment = createAsyncThunk(
  'data/posts/deleteComment',
  async ({ postId, newComment }: { postId: number; newComment: Comment }, { getState }) => {
    const state = getState() as RootState;
    const guid = state.ui.settings.guid;
    const posts = state.data.posts;
    try {
      api.posts.deleteComment(guid, newComment.id);
      if (newComment.repliedTo) {
        return posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments.map((item) =>
                    item.id === newComment.repliedTo
                      ? {
                          ...item,
                          replies: [...item.replies.filter((reply) => reply.id !== newComment.id)],
                        }
                      : item,
                  ),
                ],
              }
            : post,
        );
      } else {
        return posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...post.comments.filter((comment) => comment.id !== newComment.id)],
              }
            : post,
        );
      }
    } catch (err: any) {
      return posts;
    }
  },
);

// LIKE COMMENT
export const likeComment = createAsyncThunk(
  'data/comments/toggleLike',
  async ({ postId, commentId }: { postId: number; commentId: number }, { getState }) => {
    const state = getState() as RootState;
    const uuid = state.ui.settings.uuid;
    const guid = state.ui.settings.guid;
    const posts = state.data.posts;
    try {
      const post = posts.find((post) => post.id === postId);
      const liked = post?.comments.some((comment) => comment.id === commentId && comment.likes.includes(uuid));
      if (liked) {
        await api.posts.unlikeComment(guid, commentId);
      } else {
        await api.posts.likeComment(guid, commentId);
      }
      return posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments.map((comment) =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        likes: [
                          ...(comment.likes.includes(uuid)
                            ? comment.likes.filter((item) => item !== uuid)
                            : [...comment.likes, uuid]),
                        ],
                      }
                    : comment,
                ),
              ],
            }
          : post,
      );
    } catch (err: any) {
      return posts;
    }
  },
);
