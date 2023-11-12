import { instance } from './instance';

import { Author, Settings, User } from '../models/user';

export const users = {
  getSelf: async (user: Pick<Settings, 'guid' | 'avatar' | 'displayName'>) => {
    const { data } = await instance.request<Settings>({
      url: `/user/`,
      method: 'POST',
      data: user,
    });
    return data;
  },
  updateSelf: async (user: Settings) => {
    try {
      const { data } = await instance.request<Settings>({
        url: `/user/`,
        method: 'PUT',
        data: user,
      });
      return data;
    } catch (e) {
      return user;
    }
  },
  getAll: async () => {
    const { data } = await instance.request<User[]>({
      url: '/user/',
      method: 'GET',
    });
    return data;
  },
  login: async (email: string, password: string) => {
    try {
      const { data } = await instance.request<Author>({
        url: `/login/`,
        method: 'POST',
        data: { email, password },
      });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      return {
        token: null,
        message,
      };
    }
  },
  verify: async () => {
    try {
      await instance.request({
        url: `/login/`,
        method: 'GET',
      });
      return true;
    } catch (error) {
      return false;
    }
  },
};
