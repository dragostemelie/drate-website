import { instance } from './instance';

import { Post, Comment } from '../models/post';

export const posts = {
  likePost: async (guid: string, post: number) => {
    const { data } = await instance.request({
      url: '/like/',
      method: 'POST',
      data: { guid, post, comment: 0 },
    });
    return data;
  },
  unlikePost: async (guid: string, post: number) => {
    const { data } = await instance.request({
      url: '/like/',
      method: 'DELETE',
      data: { guid, post, comment: 0 },
    });
    return data;
  },

  getSaved: async (guid: string) => {
    const { data } = await instance.request<number[]>({
      url: `/saved/?guid=${guid}`,
      method: 'GET',
    });
    return data;
  },
  savePost: async (guid: string, post: number) => {
    const { data } = await instance.request({
      url: '/saved/',
      method: 'POST',
      data: { guid, post },
    });
    return data;
  },
  unsavePost: async (guid: string, post: number) => {
    const { data } = await instance.request({
      url: '/saved/',
      method: 'DELETE',
      data: { guid, post },
    });
    return data;
  },

  likeComment: async (guid: string, comment: number) => {
    const { data } = await instance.request({
      url: '/like/',
      method: 'POST',
      data: { guid, post: 0, comment },
    });
    return data;
  },
  unlikeComment: async (guid: string, comment: number) => {
    const { data } = await instance.request({
      url: '/like/',
      method: 'DELETE',
      data: { guid, post: 0, comment },
    });
    return data;
  },

  addComment: async (guid: string, post: number, commentData: Comment) => {
    const { comment, repliedTo } = commentData;
    const { data } = await instance.request<Comment>({
      url: '/comment/',
      method: 'POST',
      data: { guid, post, comment, repliedTo },
    });
    return data;
  },
  editComment: async (guid: string, id: number, commentData: Comment) => {
    const { comment, repliedTo } = commentData;
    const { data } = await instance.request<Comment>({
      url: '/comment/',
      method: 'PUT',
      data: { guid, id, comment, repliedTo },
    });
    return data;
  },
  deleteComment: async (guid: string, id: number) => {
    const { data } = await instance.request<Comment>({
      url: '/comment/',
      method: 'DELETE',
      data: { guid, id },
    });
    return data;
  },

  getAll: async () => {
    const { data } = await instance.request<Post[]>({
      url: '/post/',
      method: 'GET',
    });
    return data;
  },
};
