import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  PlaylistsResponse,
  FetchPlaylistsArgs,
  PlaylistData,
  CreatePlaylistArgs,
  UpdatePlaylistArgs,
} from './playlistsApi.types';

export const playlistsApi = createApi({
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
  endpoints: (build) => {
    return {
      fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
        query: (params) => {
          return {
            url: `playlists`,
            params,
          };
        },
        providesTags: ['Playlists'],
      }),
      createPlaylist: build.mutation<
        { data: PlaylistData },
        CreatePlaylistArgs
      >({
        query: (attributes) => ({
          url: 'playlists',
          method: 'post',
          body: {
            data: {
              type: 'playlists',
              attributes,
            },
          },
        }),
        invalidatesTags: ['Playlists'],
      }),
      deletePlaylist: build.mutation<void, PlaylistData['id']>({
        query: (playlistId) => ({
          url: `playlists/${playlistId}`,
          method: 'delete',
        }),
        invalidatesTags: ['Playlists'],
      }),
      updatePlaylist: build.mutation<
        void,
        { playlistId: PlaylistData['id']; attributes: UpdatePlaylistArgs }
      >({
        query: ({ playlistId, attributes }) => ({
          url: `playlists/${playlistId}`,
          method: 'put',
          body: {
            data: {
              type: 'playlists',
              attributes: attributes,
            },
          },
        }),
        invalidatesTags: ['Playlists'],
      }),
    };
  },
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi;
