import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const openai = {
  generateImage: async ({ prompt, size }: { prompt: string; size: string }) => {
    try {
      const imageSize = size === 'Small' ? '256x256' : size === 'Medium' ? '512x512' : '1024x1024';
      const { data } = await instance.request({
        url: '/image-generator/',
        method: 'POST',
        data: {
          prompt,
          n: 1,
          size: imageSize,
        },
      });

      return {
        imageUrl: data?.data[0]?.url ? data.data[0].url : null,
        error: data?.error?.message ? data.error.message : undefined,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response.data.error.message as string;
      return {
        imageUrl: null,
        error: errorMessage || error.message,
      };
    }
  },
};
