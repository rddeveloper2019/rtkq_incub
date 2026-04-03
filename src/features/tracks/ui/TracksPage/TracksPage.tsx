import { useFetchTracksInfiniteQuery } from '../../api/tracksApi';
import { infiniteStubResponse } from '../../api/stub';
import { TracksList } from '../TracksList/TracksList';
import { LoadingTrigger } from '../LoadingTrigger/LoadingTrigger';
import { useInfiniteScroll } from '@/common/hooks/useInfiniteScroll';

export const TracksPage = () => {
  const {
    data = infiniteStubResponse,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchTracksInfiniteQuery();
  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetching,
    fetchNextPage,
  });

  const pages = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div>
      <h1>Tracks page</h1>
      <TracksList tracks={pages} />
      {hasNextPage && (
        <LoadingTrigger
          isFetchingNextPage={isFetchingNextPage}
          observerRef={observerRef}
        />
      )}
      {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
    </div>
  );
};
