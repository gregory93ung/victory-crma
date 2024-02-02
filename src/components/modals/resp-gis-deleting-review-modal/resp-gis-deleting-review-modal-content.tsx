import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Clients } from '@/types';

import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { queryClient } from '@/config/client';
import { cn } from '@/lib/utils';
import { BadgeCheck, Calendar, CornerUpRight } from 'lucide-react';
import { AxiosError } from 'axios';
import { addRespDeletingReviewGisReq } from '@/api/gis/addRespDeletingReviewGis';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Rating } from '@/components/rating';
import { ReadeMoreResp } from '@/components/reade-more-resp';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface RespGisDeletingReviewModalContentProps {
  reviewInfo: Clients.GisDeletingReview;
  firmUrl: string;
  orderId: number;
  serviceId: number;
  setOpen: any;
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
  answer_text: z
    .string({ required_error: 'Поле обязательно к заполнению' })
    .min(10, {
      message: 'Для отправки отзыва необходимо минимум 10 символов',
    }),
});

export function RespGisDeletingReviewModalContent({
  reviewInfo,
  firmUrl,
  orderId,
  serviceId,
  setOpen,
}: RespGisDeletingReviewModalContentProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onRespDeletingReviewGis = (data: any) => {
    toast('Добавление ответа на отзыв с уточняющим вопросом', {
      description: data.detail,
    });
    form.reset();
    queryClient.invalidateQueries(['getDeletingReviewsGis']);
    setOpen(false);
  };

  const { mutate, isLoading } = useMutation(
    clients.addRespDeletingReviewGis.fn,
    {
      onSuccess: (data) => onRespDeletingReviewGis(data),
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
      } as addRespDeletingReviewGisReq,
    });
    setOpen(false);
  }

  return (
    <DialogContent className='max-w-2xl p-7'>
      <DialogHeader className='mb-3'>
        <TooltipProvider delayDuration={200}>
          <DialogTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className='cursor-pointer'>
                  Форма ответа на отзыв с уточняющим вопросом <span>*</span>
                </p>
              </TooltipTrigger>
              <TooltipContent
                align='center'
                side='bottom'
                sideOffset={10}
                className='bg-layer-01 border border-border-subtitle-selected-01'
              >
                <div className='flex flex-col items-start p-3'>
                  <p className='font-semibold text-sm text-text-primary mb-3'>
                    Примеры отзывов с уточняющим вопросом:
                  </p>
                  <div className='flex flex-col items-start gap-2'>
                    <p className='font-normal text-text-secondary italic p-2 bg-layer-02 rounded'>
                      Добрый день, скажите когда вы у нас были?
                    </p>
                    <p className='font-normal text-text-secondary italic p-2 bg-layer-02 rounded'>
                      Здравствуйте, вы не могли бы сообщить дату вашего визита?
                    </p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </DialogTitle>
        </TooltipProvider>
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
      <div className='flex flex-col gap-3 mb-3'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-2'>
            {reviewInfo.our_review && (
              <BadgeCheck className='w-5 h-5 stroke-green-80-value fill-green-40-value' />
            )}

            <p
              className={cn(
                'font-medium text-text-primary break-words',
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
              {format(new Date(reviewInfo.date_created), 'dd.MM.yyyy HH:mm:ss')}
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
              name='answer_text'
              render={({ field }) => (
                <FormItem className='flex-1 flex flex-col'>
                  <FormLabel>
                    <div className='flex flex-row items-center gap-2 px-1 y-1 mb-1'>
                      <CornerUpRight className='w-3 h-3 stroke-layer-selected-03' />
                      <span>Ответ</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className='h-[160px] min-h-[160px] p-3'
                      placeholder='Текст ответа'
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
  );
}
