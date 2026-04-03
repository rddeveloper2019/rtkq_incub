import type { PlaylistData, PlaylistsResponse } from './playlistsApi.types';

export const playlistsStubResponse: PlaylistsResponse = {
  data: [
    {
      id: 'a48b2f9a-b234-4c79-84cc-20b4ac4c01e6',
      type: 'playlists',
      attributes: {
        title: 'авфув',
        addedAt: '2026-04-02T23:24:24.195Z',
        updatedAt: '2026-04-02T23:24:24.195Z',
        order: -3,
        user: {
          id: '978',
          name: 'WladyslawRouba_07a',
        },
        images: {
          main: [],
        },
        tags: [],
        currentUserReaction: 0,
        likesCount: 0,
        dislikesCount: 0,
        tracksCount: 0,
        duration: 0,
      },
    },
    {
      id: '2e6977db-4663-4e44-9cf4-70cb4f5ec201',
      type: 'playlists',
      attributes: {
        title: '333аа',
        addedAt: '2026-04-02T22:18:36.656Z',
        updatedAt: '2026-04-02T23:33:49.751Z',
        order: -2,
        user: {
          id: '978',
          name: 'WladyslawRouba_07a',
        },
        images: {
          main: [
            {
              url: 'https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/6d1a3032-c266-4a89-b2ee-fcc5d4bd828c_work-man-person-snow-winter-woman-554196-pxhere.com.jpg',
              width: 500,
              height: 500,
              fileSize: 52544,
              type: 'original',
            },
            {
              url: 'https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/ab53b3b4-8c5a-4870-9390-7e9f063d6e74_image.png',
              width: 156,
              height: 156,
              fileSize: 5346,
              type: 'medium',
            },
            {
              url: 'https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/e5c6af45-650d-4927-8565-29c9ff364859_image.png',
              width: 48,
              height: 48,
              fileSize: 1091,
              type: 'thumbnail',
            },
          ],
        },
        tags: [],
        currentUserReaction: 0,
        likesCount: 0,
        dislikesCount: 0,
        tracksCount: 0,
        duration: 0,
      },
    },
    {
      id: 'd8e4d8ff-f631-4682-ad2f-df9d6bd3a0d6',
      type: 'playlists',
      attributes: {
        title: '23',
        addedAt: '2026-04-02T19:17:26.843Z',
        updatedAt: '2026-04-02T19:17:26.843Z',
        order: -2,
        user: {
          id: '1498',
          name: 'fatzey_a4d',
        },
        images: {
          main: [
            {
              url: 'https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/b50de182-1623-4a73-90b4-be679fd982b1_1200x1200bf-60.jpg',
              width: 1200,
              height: 1200,
              fileSize: 82038,
              type: 'original',
            },
          ],
        },
        tags: [],
        currentUserReaction: 0,
        likesCount: 0,
        dislikesCount: 0,
        tracksCount: 0,
        duration: 0,
      },
    },
  ],
  meta: {
    page: 1,
    pageSize: 3,
    totalCount: 829,
    pagesCount: 277,
  },
};

export const createPlaylistStubResponse: { data: PlaylistData } = {
  data: {
    id: '06780661-f9d5-45ad-96dd-f8fe20f856aa',
    type: 'playlists',
    attributes: {
      title: 'test-title',
      description: 'test-description',
      addedAt: '2026-04-02T17:33:37.880Z',
      updatedAt: '2026-04-02T17:33:37.880Z',
      order: -1,
      user: {
        id: '1498',
        name: 'fatzey_a4d',
      },
      images: {
        main: [],
      },
      tags: [],
      currentUserReaction: 0,
      likesCount: 0,
      dislikesCount: 0,
      tracksCount: 0,
      duration: 0,
    },
  },
};
