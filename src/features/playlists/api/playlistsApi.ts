import type { Images } from '@/common';
import type {
  PlaylistsResponse,
  FetchPlaylistsArgs,
  PlaylistData,
  CreatePlaylistArgs,
  UpdatePlaylistArgs,
} from './playlistsApi.types';
import { baseApi } from '@/app/baseApi';
import { current } from '@reduxjs/toolkit';

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
        onQueryStarted: async (
          { playlistId, attributes },
          { queryFulfilled, dispatch, getState },
        ) => {
          const args = playlistsApi.util.selectCachedArgsForQuery(
            getState(),
            'fetchPlaylists',
          );
          debugger;
          const patchResults: any[] = [];

          args.forEach((arg) => {
            patchResults.push(
              dispatch(
                playlistsApi.util.updateQueryData(
                  'fetchPlaylists',
                  {
                    pageNumber: arg.pageNumber,
                    pageSize: arg.pageSize,
                    search: arg.search,
                  },
                  (state) => {
                    const index = state?.data
                      ? state.data.findIndex(
                          (playlist) => playlist.id === playlistId,
                        )
                      : -1;
                    if (index > -1) {
                      state.data[index].attributes = {
                        ...state.data[index].attributes,
                        ...attributes,
                      };
                    }
                  },
                ),
              ),
            );
          });

          try {
            await queryFulfilled;
          } catch {
            patchResults.forEach((patchResult) => {
              patchResult.undo();
            });
          }
        },
      }),
      uploadPlaylistCover: build.mutation<
        Images,
        { playlistId: PlaylistData['id']; file: File }
      >({
        query: ({ playlistId, file }) => {
          const fromData = new FormData();
          fromData.append('file', file);

          return {
            url: `playlists/${playlistId}/images/main`,
            method: 'post',
            body: fromData,
          };
        },
        invalidatesTags: ['Playlists'],
      }),
      deletePlaylistCover: build.mutation<
        void,
        { playlistId: PlaylistData['id'] }
      >({
        query: ({ playlistId }) => ({
          url: `playlists/${playlistId}/images/main`,
          method: 'delete',
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
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi;
