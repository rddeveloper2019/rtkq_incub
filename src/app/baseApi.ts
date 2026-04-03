import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'playlistsApi',

  baseQuery: fetchBaseQuery({
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
  }),
  tagTypes: ['Playlists'],
  keepUnusedDataFor: 30,

  refetchOnReconnect: true,
  endpoints: () => ({}),
});
