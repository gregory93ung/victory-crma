import { useParams } from 'react-router-dom';

import { query } from '@/api/fetcherHook/useQueryWrapper';
import { clients } from '@/api/query.key';

import { CardItem } from './CardItem';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const CardsTabPanel = () => {
  const { client_id } = useParams();

  const {
    loading,
    fetching,
    data: clientCards,
  } = query(clients.getAllCardsClient, {
    slug: client_id as string,
  });

  return (
    <div className='h-full flex flex-col gap-3 p-5'>
      <div className='flex flex-row gap-2 justify-between items-center'>
        {!loading && !fetching && (
          <>
            <p className='font-normal'>Всего карточек</p>
            <p className='font-normal text-text-secondary'>
              {clientCards?.length}
            </p>
          </>
        )}
        {(loading || fetching) && (
          <Skeleton className='w-full h-4 bg-miscellaneous-skeleton-background' />
        )}
      </div>
      <div className='w-full flex-1 flex flex-col border border-border-subtitle-01 rounded'>
        <div className='p-4 pt-0 pb-0 flex flex-1 flex-col gap-3 basis-0 overflow-y-auto scroll-smooth'>
          <div
            className={cn(
              'flex flex-col items-center flex-1 gap-5 pt-4 pb-4',
              clientCards?.length === 0 && 'justify-center',
            )}
          >
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className='h-60 w-full bg-miscellaneous-skeleton-background'
                />
              ))}
            {!loading &&
              fetching &&
              Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className='h-60 w-full bg-miscellaneous-skeleton-background'
                />
              ))}
            {!loading && !fetching && clientCards?.length === 0 && (
              <span className='text-sm text-text-secondary'>
                Карточки отсутствуют
              </span>
            )}
            {!fetching &&
              !loading &&
              clientCards?.map((card, index) => (
                <CardItem key={index} card={card} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
