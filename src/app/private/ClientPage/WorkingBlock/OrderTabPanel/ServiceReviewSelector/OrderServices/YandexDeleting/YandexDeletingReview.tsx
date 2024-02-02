import { Rating } from '@/components/rating';
import { ReadeMore } from '@/components/reade-more';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clients } from '@/types';
import { BadgeCheck, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ResYandexDeletingReviewModal } from '@/components/modals/res-yandex-deleting-review-modal';

type YandexDeletingReviewProps = {
  review: Clients.YandexDeletingReview;
  firmUrl: string;
  orderId: number;
  serviceId: number;
};

export const YandexDeletingReview = ({
  review,
  firmUrl,
  orderId,
  serviceId,
}: YandexDeletingReviewProps) => {
  return (
    <ResYandexDeletingReviewModal
      reviewInfo={review}
      firmUrl={firmUrl}
      orderId={orderId}
      serviceId={serviceId}
    >
      <Card
        className={cn(
          'w-full border rounded cursor-pointer',
          review.deleted
            ? 'bg-red-80-value border-red-70-value bg-opacity-20 border-opacity-20'
            : 'bg-layer-02 border-border-subtitle-02',
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
              <div className='flex flex-row items-center gap-2 text-text-secondary'>
                <Calendar className='w-4 h-4' />
                {review.official_answer_date && (
                  <p className='font-normal'>
                    {format(
                      new Date(review.official_answer_date),
                      'dd.MM.yyyy HH:mm:ss',
                    )}
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ResYandexDeletingReviewModal>
  );
};
