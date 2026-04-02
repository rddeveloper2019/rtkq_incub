import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  PlaylistsResponse,
  FetchPlaylistsArgs,
} from './playlistsApi.types';

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      // 'API-KEY': import.meta.env.VITE_API_KEY,
      'content-type': 'application/json; charset=utf-8',
    },
  }),

  endpoints: (build) => {
    return {
      fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
        query: (params) => {
          return {
            method: 'get',
            url: `playlists`,
            params,
          };
        },
      }),
    };
  },
});

export const { useFetchPlaylistsQuery } = playlistsApi;
