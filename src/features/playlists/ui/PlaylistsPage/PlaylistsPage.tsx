import { useFetchPlaylistsQuery } from '../../api/playlistsApi';
import { playlistsStubResponse } from '../../api/stubs';

export const PlaylistsPage = () => {
  const { data } = useFetchPlaylistsQuery({ pageSize: 3 });

  // const { data } = playlistsStubResponse;
  console.log('(**) => data: ', data);
  return (
    <div>
      {data?.data.map((item) => (
        <p key={item.id}>{item.attributes.title}</p>
      ))}
    </div>
  );
};
