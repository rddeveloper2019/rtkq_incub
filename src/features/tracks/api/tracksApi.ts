import { baseApi } from '@/app/baseApi';
import type { FetchTracksResponse } from './tracksApi.types';

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTracks: build.infiniteQuery<
      FetchTracksResponse,
      void,
      string | undefined
    >({
      infiniteQueryOptions: {
        initialPageParam: undefined,
        getNextPageParam: (
          lastPage: FetchTracksResponse,
          // allPages: FetchTracksResponse[],
          // lastPageParam: string | undefined,
          // allPageParams: (string | undefined)[],
          // queryArg: void,
        ) => {
          return lastPage?.meta?.nextCursor || null;
        },
      },
      query: ({ pageParam }) => {
        return {
          url: 'playlists/tracks',
          params: {
            cursor: pageParam,
            pageSize: 15,
            paginationType: 'cursor',
          },
        };
      },
    }),
  }),
});
export const { useFetchTracksInfiniteQuery } = tracksApi;
