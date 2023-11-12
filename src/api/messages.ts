import { instance } from './instance';

export const messages = {
  postMessage: async (guid: string, author: string, message: string) => {
    await instance.request({
      url: '/message/',
      method: 'POST',
      data: { guid, author, message },
    });
  },
};
