import { query } from '@/api/fetcherHook/useQueryWrapper';
import { clients } from '@/api/query.key';
import { PageNavigation } from '@/components/page-navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { useRef, useState } from 'react';
import { GisAccountingReview } from './GisAccountingReview';

type GisAccountingReviewListProps = {
  orderId: number;
  serviceId: number;
  firmUrl: string;
};

export const GisAccountingReviewList = ({
  orderId,
  firmUrl,
  serviceId,
}: GisAccountingReviewListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const debouncedValue = useDebounce<number>(pageNumber, 350);

  const {
    loading,
    fetching,
    data: accountingReviewsList,
  } = query(
    clients.getAccountingReviewsGis,
    {
      slug: String(orderId),
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
        {loading && (
          <div className='flex flex-col gap-3'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className='w-full h-[250px] bg-miscellaneous-skeleton-background'
              />
            ))}
          </div>
        )}

        {!loading && fetching && (
          <div className='flex flex-col gap-3'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className='w-full h-[250px] bg-miscellaneous-skeleton-background'
              />
            ))}
          </div>
        )}

        {!loading &&
          !fetching &&
          accountingReviewsList?.reviews.length === 0 && (
            <div className='h-full flex flex-col items-center justify-center'>
              <div className='flex flex-col items-center gap-2'>
                <p className='text-text-placeholder'>Отзывов нет</p>
              </div>
            </div>
          )}

        {!fetching &&
          !loading &&
          accountingReviewsList?.reviews.map((review, index) => (
            <GisAccountingReview
              key={index}
              review={review}
              firmUrl={firmUrl}
              orderId={orderId}
              serviceId={serviceId}
            />
          ))}
      </div>
      {!loading &&
        accountingReviewsList &&
        accountingReviewsList?.reviews.length !== 0 && (
          <div className='h-[64px] flex flex-row items-center justify-between px-5 py-3 border-t border-border-subtitle-02'>
            <PageNavigation
              currentPage={pageNumber}
              total={accountingReviewsList?.reviews_count}
              limit={12}
              onPageChange={(page) => setPageNumber(page)}
            />
            {accountingReviewsList && (
              <p className='font-normal text-text-secondary'>
                Всего{' '}
                <span className='font-normal text-text-primary'>
                  {accountingReviewsList.reviews_count &&
                    Math.ceil(accountingReviewsList.reviews_count / 12)}
                </span>{' '}
                страниц
              </p>
            )}
          </div>
        )}
    </div>
  );
};
