import { hasProperty } from '@/common/utils/hasProperty';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

export const baseApi = createApi({
  reducerPath: 'baseApi',

  baseQuery: async (args, api, extraOptions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const apiOptions = {
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
    };

    const result = await fetchBaseQuery(apiOptions)(args, api, extraOptions);

    if (result.error) {
      switch (result.error.status) {
        case 'TIMEOUT_ERROR':
        case 'FETCH_ERROR':
        case 'PARSING_ERROR':
        case 'CUSTOM_ERROR':
          toast(result!.error.error, { type: 'error', theme: 'colored' });
          break;
        case 404:
          toast(
            hasProperty(result.error.data, 'error')
              ? result.error.data.error
              : 'Unknown error',
            {
              type: 'error',
              theme: 'colored',
            },
          );
          break;
        case 429:
          toast(
            hasProperty(result.error.data, 'message')
              ? result.error.data.message
              : 'Unknown error',
            {
              type: 'error',
              theme: 'colored',
            },
          );
          break;

        default:
          toast('Unknown error', {
            type: 'error',
            theme: 'colored',
          });
      }
    }

    return result;
  },
  tagTypes: ['Playlists'],
  keepUnusedDataFor: 30,

  refetchOnReconnect: true,
  endpoints: () => ({}),
});
