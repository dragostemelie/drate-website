import { instance } from './instance';

import { Avatar } from '../models/avatar';

export const avatars = {
  getAll: async () => {
    const { data } = await instance.request<Avatar[]>({
      url: '/avatar/',
      method: 'GET',
    });
    return data;
  },
};
