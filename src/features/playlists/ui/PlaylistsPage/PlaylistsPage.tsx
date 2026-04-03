import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,
} from '@/features/playlists/api/playlistsApi';
import { playlistsStubResponse } from '@/features/playlists/api/stubs';
import { useForm } from 'react-hook-form';

import { CreatePlaylistForm } from '../CreatePlaylistForm/CreatePlaylistForm';
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types';
import s from './PlaylistsPage.module.css';
import { useState } from 'react';
import { EditPlaylistForm } from '../EditPlaylistForm/EditPlaylistForm';
import { PlaylistItem } from '../PlaylistItem/PlaylistItem';
import { useDebounceValue } from '@/common';

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounceValue(search);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const { data = { data: playlistsStubResponse.data }, isLoading } =
    useFetchPlaylistsQuery({
      pageSize: 20,
      search: debounceSearch,
    });

  const [deletePlaylist] = useDeletePlaylistMutation();

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId);
    }
  };

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((t) => t.id),
      });
    } else {
      setPlaylistId(null);
    }
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={'Search playlist by title'}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <div className={s.items}>
        {!data?.data.length && !isLoading && <h2>Playlists not found</h2>}

        {data?.data.map((playlist) => {
          const isEditing = playlistId === playlist.id;

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing ? (
                <EditPlaylistForm
                  playlistId={playlistId}
                  handleSubmit={handleSubmit}
                  register={register}
                  editPlaylist={editPlaylistHandler}
                  setPlaylistId={setPlaylistId}
                />
              ) : (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylist={deletePlaylistHandler}
                  editPlaylist={editPlaylistHandler}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
