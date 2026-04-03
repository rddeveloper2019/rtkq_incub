import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',

  baseQuery: async (args, api, extraOptions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL ?? '',
      headers: {
        // 'API-KEY': import.meta.env.VITE_API_KEY ?? '',
        'content-type': 'application/json; charset=utf-8',
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      prepareHeaders: (headers, api) => {
        headers.set(
          'Authorization',
          `Bearer ${import.meta.env.VITE_ACCESS_TOKEN ?? ''}`,
        );
        return headers;
      },
    })(args, api, extraOptions);
  },
  tagTypes: ['Playlists'],
  keepUnusedDataFor: 30,

  refetchOnReconnect: true,
  endpoints: () => ({}),
});
