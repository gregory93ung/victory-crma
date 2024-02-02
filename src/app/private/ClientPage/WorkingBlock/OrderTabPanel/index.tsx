import { query } from '@/api/fetcherHook/useQueryWrapper';
import { clients } from '@/api/query.key';

import { Info, Upload } from 'lucide-react';
import { OrderInfoModal } from '@/components/order-info-modal';
import { initialDateOrderDetailInfo } from './initialDate';
import { ServiceReviewSelector } from './ServiceReviewSelector';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GisCardReviewsUploadModal } from '@/components/gis-card-reviews-upload-modal';

type OrderTabPanelProps = {
  orderId: number;
};

export const OrderTabPanel = ({ orderId }: OrderTabPanelProps) => {
  const {
    loading,

    data: orderDetailInfo = initialDateOrderDetailInfo,
  } = query(
    clients.getOrderDetailInfo,

    { slug: String(orderId) as string },

    {
      enabled: Boolean(orderId),
    },
  );

  return (
    <div className='h-full flex flex-col gap-5 p-5 basis-0'>
      <div className='flex-1 flex flex-col gap-3'>
        <div className='flex flex-row gap-3 items-center justify-between'>
          <p className='font-normal'>Список отзывов</p>
          <TooltipProvider delayDuration={200}>
            <div className='flex flex-row items-center gap-3'>
              {orderDetailInfo && orderDetailInfo.service.id === 1 && (
                <GisCardReviewsUploadModal orderId={orderId}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Upload className='w-4 h-4 stroke-layer-active-02 hover:stroke-layer-hover-02 cursor-pointer' />
                    </TooltipTrigger>
                    <TooltipContent align='end' side='bottom' sideOffset={10}>
                      <p>Загрузить xlsx файл отзывов</p>
                    </TooltipContent>
                  </Tooltip>
                </GisCardReviewsUploadModal>
              )}
              <OrderInfoModal info={orderDetailInfo}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='w-4 h-4 stroke-layer-active-02 hover:stroke-layer-hover-02 cursor-pointer' />
                  </TooltipTrigger>
                  <TooltipContent align='end' side='bottom' sideOffset={10}>
                    <p>Информация по заказу</p>
                  </TooltipContent>
                </Tooltip>
              </OrderInfoModal>
            </div>
          </TooltipProvider>
        </div>
        <div className='w-full flex-1 flex flex-col border border-border-subtitle-01 rounded'>
          <ServiceReviewSelector
            service={orderDetailInfo.service}
            orderId={orderId}
            firmUrl={orderDetailInfo.card.card_url}
          />
        </div>
      </div>
    </div>
  );
};
