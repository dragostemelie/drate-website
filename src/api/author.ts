import { instance } from './instance';
import { Message, Post, Reader } from '../models/author';

export const author = {
  getReaders: async () => {
    const { data } = await instance.request<Reader[]>({
      url: '/stat/',
      method: 'GET',
    });
    return data;
  },
  getMessages: async () => {
    const { data } = await instance.request<Message[]>({
      url: '/message/',
      method: 'GET',
    });
    return data;
  },
  getPosts: async () => {
    const { data } = await instance.request<Post[]>({
      url: '/post/?author',
      method: 'GET',
    });
    return data;
  },

  updatePost: async (post: Post) => {
    const { data } = await instance.request<Post>({
      url: '/post/',
      method: 'PUT',
      data: post,
    });
    return data;
  },
};
