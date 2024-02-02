import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Clients } from '@/types';

import { ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { queryClient } from '@/config/client';
import { cn } from '@/lib/utils';
import { BadgeCheck, Calendar, CornerUpRight } from 'lucide-react';
import { ReadeMoreResp } from '../reade-more-resp';
import { Rating } from '../rating';
import { AxiosError } from 'axios';
import { addRespDeletingReviewYandexReq } from '@/api/yandex/addRespDeletingReviewYandex';

interface ResYandexDeletingReviewModalProps {
  reviewInfo: Clients.YandexDeletingReview;
  firmUrl: string;
  orderId: number;
  serviceId: number;
  children: ReactNode;
}

function cleanedDataFn(values: any, fieldsToKeepAsString: String[]) {
  const cleanedData = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      value === '' && !fieldsToKeepAsString.includes(key) ? null : value,
    ]),
  );

  return cleanedData;
}

export const formSchema = z.object({
  claim_text: z
    .string({ required_error: 'Поле обязательно к заполнению' })
    .min(10, {
      message: 'Для отправки отзыва необходимо минимум 10 символов',
    }),
});

export function ResYandexDeletingReviewModal({
  reviewInfo,
  children,
  firmUrl,
  orderId,
  serviceId,
}: ResYandexDeletingReviewModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onRespDeletingReview = (data: any) => {
    toast('Добавление жалобы на отзыв', {
      description: data.detail,
    });
    form.reset();
    queryClient.invalidateQueries(['getDeletingReviewsYandex']);
    setOpen(false);
  };

  const { mutate, isLoading } = useMutation(
    clients.addRespDeletingReviewYandex.fn,
    {
      onSuccess: (data) => onRespDeletingReview(data),
      onError: (error: AxiosError<{ detail: string }>) =>
        toast('Ошибка', {
          description: error.response?.data.detail,
          duration: 7000,
        }),
    },
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const cleanedData = cleanedDataFn(values, ['title']);

    mutate({
      body: {
        review_id: reviewInfo.review_id,
        firm_url: firmUrl,
        service_id: serviceId,
        ...cleanedData,
      } as addRespDeletingReviewYandexReq,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='max-w-2xl p-7'>
        <DialogHeader className='mb-3'>
          <DialogTitle>Форма для жалобы на отзыв</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <p className='font-medium text-text-primary'>Url фирмы</p>
          <div className='bg-layer-01 px-2 py-1 rounded'>
            <p
              className={cn(
                'font-medium text-text-secondary break-words',
                !firmUrl && 'text-text-disabled',
              )}
            >
              {firmUrl ? firmUrl : 'Не указан'}
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2 mb-3 bg-layer-01 p-3 rounded'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-2'>
              {reviewInfo.our_review && (
                <BadgeCheck className='w-5 h-5 stroke-green-80-value fill-green-40-value' />
              )}

              <p
                className={cn(
                  'font-medium text-text-secondary break-words',
                  !reviewInfo.user_name && 'text-text-disabled',
                )}
              >
                {reviewInfo.user_name ? reviewInfo.user_name : 'Не указано'}
              </p>
            </div>
            <Rating value={reviewInfo.rating} />
          </div>
          <div className='flex flex-col gap-2'>
            <ReadeMoreResp text={reviewInfo.review_text} />
            <div className='flex flex-row items-center gap-2 text-text-secondary'>
              <Calendar className='w-4 h-4' />
              <p className='font-normal'>
                {format(
                  new Date(reviewInfo.date_created),
                  'dd.MM.yyyy HH:mm:ss',
                )}
              </p>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex flex-col flex-1'
          >
            <div className='flex-1 flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='claim_text'
                render={({ field }) => (
                  <FormItem className='flex-1 flex flex-col'>
                    <FormLabel>
                      <div className='flex flex-row items-center gap-2 px-1 y-1 mb-1'>
                        <CornerUpRight className='w-3 h-3 stroke-layer-selected-03' />
                        <span>Жалоба</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className='h-[160px] min-h-[160px] p-3'
                        placeholder='Текст жалобы'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className={cn('w-full', isLoading && 'opacity-30')}
              type='submit'
              disabled={isLoading}
            >
              Добавить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
