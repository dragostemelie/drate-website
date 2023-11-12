import { instance } from './instance';

export const stats = {
  postStats: async (guid: string) => {
    const url = window.location.href;
    if (!url.includes('board'))
      await instance.request({
        url: '/stat/',
        method: 'POST',
        data: { guid, url },
      });
  },
};
