import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi';
import { playlistsStubResponse } from '@/features/playlists/api/stubs';
import { CreatePlaylistForm } from '../CreatePlaylistForm/CreatePlaylistForm';

import s from './PlaylistsPage.module.css';
import { useState, type ChangeEvent } from 'react';
import { Pagination, useDebounceValue } from '@/common';
import { PlaylistsList } from '../PlaylistsList/PlaylistsList';
import { toast } from 'react-toastify';

export const PlaylistsPage = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const debounceSearch = useDebounceValue(search);

  const {
    data = {
      data: playlistsStubResponse.data,
      meta: playlistsStubResponse.meta,
    },
    isLoading,
    error,
    isError,
  } = useFetchPlaylistsQuery(
    {
      pageSize,
      pageNumber: currentPage,
      search: debounceSearch,
    },
    {
      refetchOnFocus: true,
      pollingInterval: 300000,
      skipPollingIfUnfocused: true,
    },
  );

  const changePageSizeHandler = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  };
  if (isLoading) return <h1>Skeleton loader...</h1>;

  // if (isError) {
  //   let message = 'Unknown error';
  //   if ('status' in error) {
  //     if ('error' in error) {
  //       message = error.error;
  //     } else {
  //       message =
  //         (error.data as { message: string }).message ||
  //         (error.data as { error: string }).error ||
  //         message;
  //     }
  //   } else {
  //     message = error?.message || message;
  //   }

  //   toast(message, { type: 'error', theme: 'colored' });
  // }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={'Search playlist by title'}
        onChange={searchPlaylistHandler}
      />
      <PlaylistsList
        playlists={data?.data || []}
        isPlaylistsLoading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  );
};
