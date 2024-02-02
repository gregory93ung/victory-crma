import { useRef, useState } from 'react';
import { GisReview } from './GisReview';
import { clients } from '@/api/query.key';
import { query } from '@/api/fetcherHook/useQueryWrapper';
import { Skeleton } from '@/components/ui/skeleton';

import { useDebounce } from '@/hooks/useDebounce';
import { PageNavigation } from '@/components/page-navigation';

type YandexReviewListProps = {
  cardId: number;
};

const YandexReviewList = ({ cardId }: YandexReviewListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const debouncedValue = useDebounce<number>(pageNumber, 350);

  const {
    loading,
    fetching,
    data: reviewsList,
  } = query(
    clients.getAllReviewsCardsGis,
    {
      slug: String(cardId),
      pageParam: { page: debouncedValue },
    },
    {
      onSuccess: () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      },
    },
  );

  return (
    <div className='flex-1 flex flex-col'>
      <div
        className='p-5 flex-1 flex flex-col gap-4 basis-0 overflow-y-scroll'
        ref={scrollContainerRef}
      >
        {reviewsList?.reviews.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center gap-2'>
              <p>Отзывов нет</p>
              <p className='text-text-secondary hover:text-text-primary cursor-pointer'>
                Загрузить
              </p>
            </div>
          </div>
        )}
        {!fetching &&
          reviewsList?.reviews.map((review: any, i: any) => (
            <GisReview key={i} review={review} />
          ))}
        {fetching && (
          <div className='flex flex-col gap-3'>
            <Skeleton className='w-full h-[250px] bg-miscellaneous-skeleton-background' />
            <Skeleton className='w-full h-[250px] bg-miscellaneous-skeleton-background' />
            <Skeleton className='w-full h-[250px] bg-miscellaneous-skeleton-background' />
            <Skeleton className='w-full h-[250px] bg-miscellaneous-skeleton-background' />
          </div>
        )}
      </div>
      {!loading && reviewsList?.reviews.length !== 0 && (
        <div className='h-[64px] flex flex-row items-center justify-between px-5 py-3 border-t border-border-subtitle-02'>
          <PageNavigation
            currentPage={pageNumber}
            total={reviewsList.reviews_count}
            limit={12}
            onPageChange={(page) => setPageNumber(page)}
          />
          {reviewsList && (
            <p className='font-normal text-text-secondary'>
              Всего{' '}
              <span className='font-normal text-text-primary'>
                {reviewsList.reviews_count &&
                  Math.ceil(reviewsList.reviews_count / 12)}
              </span>{' '}
              страниц
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default YandexReviewList;

// import { GisReview } from './GisReview';
// import { useTwoGisReviews } from '@/api/2gis/getAllReviewsCard';
// import { memo, useEffect, useRef } from 'react';
// import { useOnScreen } from '@/hooks/useOnScreen';

// type GisReviewListProps = {
//   cardId: number;
// };

// const GisReviewList = ({ cardId }: GisReviewListProps) => {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading: loading,
//   } = useTwoGisReviews(String(cardId));
//   const reviewsRef = useRef<HTMLDivElement | null>(null);
//   const isVisible = useOnScreen(reviewsRef);

//   useEffect(() => {
//     if (isVisible && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [isVisible, hasNextPage, fetchNextPage]);

//   return <div>Gis</div>;
// };

// export default GisReviewList;
