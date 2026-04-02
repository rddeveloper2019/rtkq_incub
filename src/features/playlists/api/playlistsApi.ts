import type {
  PlaylistsResponse,
  FetchPlaylistsArgs,
  PlaylistData,
  CreatePlaylistArgs,
  UpdatePlaylistArgs,
} from './playlistsApi.types';
import { baseApi } from '@/app/baseApi';

export const playlistsApi = baseApi.injectEndpoints({
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
