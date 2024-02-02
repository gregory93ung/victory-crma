import { useState } from 'react';
import { Info, MoreVertical, Upload } from 'lucide-react';

import { clients } from '@/api/query.key';
import { query } from '@/api/fetcherHook/useQueryWrapper';
import { initialDateCardDetailInfo } from './initialDate';

import { CardInfoModal } from '@/components/card-info-modal';
import { PlatformReviewSelector } from './PlatformReviewSelector';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GisCardReviewsUploadModal } from '@/components/gis-card-reviews-upload-modal';

type CardTabPanelProps = {
  cardId: number;
};

export const CardTabPanel = ({ cardId }: CardTabPanelProps) => {
  const {
    data: cardDetailInfo = initialDateCardDetailInfo,
    refetch: refetchCardInfo,
  } = query(
    clients.getSpecificCard,

    { slug: String(cardId) as string },

    {
      enabled: Boolean(cardId),
    },
  );
  return (
    <div className='h-full flex flex-col gap-5 p-5 basis-0'>
      <div className='flex-1 flex flex-col gap-3'>
        <div className='flex flex-row gap-3 items-center justify-between'>
          <p className='font-normal'>Список отзывов</p>
          <TooltipProvider delayDuration={200}>
            <div className='flex flex-row items-center gap-3'>
              {/* {cardDetailInfo && cardDetailInfo.platform === 'GIS' && (
                <GisCardReviewsUploadModal>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Upload className='w-4 h-4 stroke-layer-active-02 hover:stroke-layer-hover-02 cursor-pointer' />
                    </TooltipTrigger>
                    <TooltipContent align='end' side='bottom' sideOffset={10}>
                      <p>Загрузить xlsx файл отзывов</p>
                    </TooltipContent>
                  </Tooltip>
                </GisCardReviewsUploadModal>
              )} */}

              <CardInfoModal
                info={cardDetailInfo}
                refetchCardInfo={refetchCardInfo}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='w-4 h-4 stroke-layer-active-02 hover:stroke-layer-hover-02 cursor-pointer' />
                  </TooltipTrigger>
                  <TooltipContent align='end' side='bottom' sideOffset={10}>
                    <p>Информация по карточке</p>
                  </TooltipContent>
                </Tooltip>
              </CardInfoModal>
            </div>
          </TooltipProvider>
        </div>
        <div className='w-full flex-1 flex flex-col border border-border-subtitle-01 rounded'>
          <PlatformReviewSelector
            service={cardDetailInfo.platform}
            cardId={cardId}
          />
        </div>
      </div>
    </div>
  );
};
