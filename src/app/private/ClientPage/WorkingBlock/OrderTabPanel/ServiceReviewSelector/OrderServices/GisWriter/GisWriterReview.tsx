import { ReadeMore } from '@/components/reade-more';
import { Clients } from '@/types';
import { BadgeCheck, Calendar } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';

import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Rating } from '@/components/rating';
import { Badge } from '@/components/ui/badge';
import { ResGisAccountingReviewModal } from '@/components/modals/res-gis-accounting-review-modal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GisWriterReviewContextMenu } from '@/components/context-menu/gis-writer-review-context-menu';
import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { queryClient } from '@/config/client';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

type GisWriterReviewProps = {
  review: Clients.GisWriterReview;
  firmUrl: string;
  serviceId: number;
};

// review_id: number;
// + review_text: string;
// + rating: number;
// + provider: string;
// + is_hidden: boolean;
// + date_created: string;
// ? date_edited: string | null;
// ? user_id: string;
// + user_name: string;
// + official_answer_text: string | null;
// + official_answer_date: string | null;
// + deleted: boolean;
// + our_review: boolean;
// old: boolean;

export const GisWriterReview = ({
  review,
  firmUrl,
  serviceId,
}: GisWriterReviewProps) => {
  const { client_id } = useParams();
  const currentReview = {
    id: review.id,
    review_text: review.review_text,
    date: review.date,
    sex: review.sex,
  };

  const onDelGisWriterReview = (data: any) => {
    toast('Удаление отзыва гис написание', {
      description: data.detail,
    });

    queryClient.invalidateQueries(['getWriterReviewsGis']);
  };
  const [_, copy] = useCopyToClipboard();

  const handleCopyClick = async (textToCopy: string) => {
    const isSuccess = await copy(textToCopy);

    if (isSuccess) {
      toast('Вы скопировали', {
        description: textToCopy,
      });
    }
  };

  const { mutate: delReview } = useMutation(clients.delGisWriterReview.fn, {
    onSuccess: (data) => onDelGisWriterReview(data),
    onError: (error: AxiosError<{ detail: string }>) =>
      toast('Ошибка', {
        description: error.response?.data.detail,
        duration: 7000,
      }),
  });

  const handleDelReview = () => {
    delReview({ params: { review_id: review.id } });
  };
  return (
    <GisWriterReviewContextMenu
      currentReview={currentReview}
      handleDelReview={handleDelReview}
    >
      <Card
        className={cn(
          'w-full bg-layer-02 border border-border-subtitle-02 rounded cursor-pointer',
          review.deleted && ' opacity-50',
        )}
      >
        <CardHeader className='flex flex-col gap-3'>
          <CardTitle className='flex flex-row items-center gap-2'>
            {review.found && (
              <BadgeCheck className='w-5 h-5 stroke-green-80-value fill-green-40-value' />
            )}
            <div className='flex flex-row items-center gap-2'>
              <div className='flex flex-row items-center gap-2'>
                <p className='font-semibold text-text-primary'>
                  Плановая дата написания:
                </p>
                <p className='font-normal text-text-secondary'>
                  {format(new Date(review.date), 'dd.MM.yyyy HH:mm:ss')}
                </p>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <p className='font-semibold text-text-primary'>
                  Фактическая дата публикации:
                </p>
                {review.date_done ? (
                  <p className='font-normal text-text-secondary'>
                    {format(new Date(review.date_done), 'dd.MM.yyyy HH:mm:ss')}
                  </p>
                ) : (
                  <p className='font-normal text-text-secondary'>
                    Не опубликован
                  </p>
                )}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <ReadeMore text={review.review_text} />
            <div className='flex flex-row items-center gap-2'>
              <p className='font-semibold text-text-primary'>Пол:</p>
              <p className='font-normal text-text-secondary'>
                {review.sex === 'female' ? 'Женский' : 'Мужской'}
              </p>
            </div>
          </div>
          {review.account && (
            <div className='flex flex-col gap-2 bg-layer-03 p-3 rounded'>
              <p>Логин:</p>
              <div
                className='bg-layer-active-02 hover:bg-layer-hover-02 rounded p-2 cursor-copy'
                onClick={() =>
                  review.account && handleCopyClick(review.account.username)
                }
              >
                {review.account.username}
              </div>
              <p>Пароль:</p>
              <div
                className='bg-layer-active-02 hover:bg-layer-hover-02 rounded p-2 cursor-copy'
                onClick={() =>
                  review.account && handleCopyClick(review.account.password)
                }
              >
                {review.account.password}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </GisWriterReviewContextMenu>
  );
};
