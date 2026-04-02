import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,
  useUpdatePlaylistMutation,
} from '@/features/playlists/api/playlistsApi';
import { playlistsStubResponse } from '@/features/playlists/api/stubs';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { CreatePlaylistForm } from './CreatePlaylistForm/CreatePlaylistForm';
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types';
import s from './PlaylistsPage.module.css';
import { useState } from 'react';
import { EditPlaylistForm } from '../EditPlaylistForm/EditPlaylistForm';
import { PlaylistItem } from '../PlaylistItem/PlaylistItem';
export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const { data = { data: playlistsStubResponse.data } } =
    useFetchPlaylistsQuery({
      pageSize: 3,
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
      <div className={s.items}>
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
