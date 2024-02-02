import { useParams } from 'react-router-dom';

import { query } from '@/api/fetcherHook/useQueryWrapper';
import { clients } from '@/api/query.key';

import { OrderItem } from './OrderItem';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { AddClientOrderModal } from '@/components/modals/add-client-order-modal';

export const OrdersTabPanel = () => {
  const { client_id } = useParams();

  const {
    loading,
    fetching,
    data: clientOrders,
  } = query(
    clients.getAllOrdersClient,
    { slug: client_id as string },
    { enabled: Boolean(client_id) },
  );

  return (
    <div className='h-full flex flex-col gap-3 p-5'>
      <div className='flex flex-row gap-2 justify-between items-center'>
        {!loading && !fetching && (
          <>
            <p className='font-normal'>Всего заказов</p>
            <p className='font-normal text-text-secondary'>
              {clientOrders?.length}
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
              clientOrders?.length === 0 && 'justify-center',
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

            {!loading && !fetching && clientOrders?.length === 0 && (
              <span className='text-sm text-text-secondary'>
                Заказы отсутствуют
              </span>
            )}

            {!fetching &&
              !loading &&
              clientOrders?.map((order, index) => (
                <OrderItem key={index} currentOrder={order} />
              ))}
          </div>
        </div>
        <div className='w-full h-[64px] flex items-center justify-center px-4 border-t border-border-subtitle-01'>
          <AddClientOrderModal>Добавить заказ</AddClientOrderModal>
        </div>
      </div>
    </div>
  );
};
