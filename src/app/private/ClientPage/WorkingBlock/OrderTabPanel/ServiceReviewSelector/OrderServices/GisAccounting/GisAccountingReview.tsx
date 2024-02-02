import { ReadeMore } from '@/components/reade-more';
import { Clients } from '@/types';
import { BadgeCheck, Calendar } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
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

type GisAccountingReviewProps = {
  review: Clients.GisAccountingReview;
  firmUrl: string;
  orderId: number;
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

export const GisAccountingReview = ({
  review,
  firmUrl,
  orderId,
  serviceId,
}: GisAccountingReviewProps) => {
  return (
    <ResGisAccountingReviewModal
      reviewInfo={review}
      firmUrl={firmUrl}
      orderId={orderId}
      serviceId={serviceId}
    >
      <Card
        className={cn(
          'w-full bg-layer-02 border border-border-subtitle-02 rounded cursor-pointer',
          review.is_hidden && !review.deleted && ' opacity-50',
          review.deleted &&
            !review.is_hidden &&
            'bg-red-80-value border-red-70-value bg-opacity-20 border-opacity-20',
          review.deleted &&
            review.is_hidden &&
            'bg-red-80-value border-red-70-value bg-opacity-20 border-opacity-20',
        )}
      >
        <CardHeader className='flex flex-col gap-3'>
          <CardTitle className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-2'>
              {review.our_review && (
                <BadgeCheck className='w-5 h-5 stroke-green-80-value fill-green-40-value' />
              )}

              <p
                className={cn(
                  'font-medium text-text-primary break-words',
                  !review.user_name && 'text-text-disabled',
                )}
                title={review.user_id}
              >
                {review.user_name ? review.user_name : 'Не указано'}
              </p>
            </div>
            <Rating value={review.rating} />
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <ReadeMore text={review.review_text} />
            <div className='flex flex-row items-center gap-2 text-text-secondary'>
              <Calendar className='w-4 h-4' />
              <p className='font-normal'>
                {format(new Date(review.date_created), 'dd.MM.yyyy HH:mm:ss')}
              </p>
            </div>
          </div>

          {review.official_answer_text && (
            <div className='flex flex-col gap-2'>
              <p className='font-medium text-text-primary break-words'>
                Ответ компании
              </p>
              <ReadeMore text={review.official_answer_text} />
              {review.official_answer_date && (
                <div className='flex flex-row items-center gap-2 text-text-secondary'>
                  <Calendar className='w-4 h-4' />
                  <p className='font-normal'>
                    {format(
                      new Date(review.official_answer_date),
                      'dd.MM.yyyy HH:mm:ss',
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Badge variant='default'>{review.provider}</Badge>
        </CardFooter>
      </Card>
    </ResGisAccountingReviewModal>
  );
};
