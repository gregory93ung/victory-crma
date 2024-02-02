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

import { useEffect } from 'react';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { queryClient } from '@/config/client';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { AxiosError } from 'axios';
import { Clients } from '@/types';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { UpdateGisWriterReviewReq } from '@/api/gis/updateGisWriterReview';

function cleanedDataFn(values: any, fieldsToKeepAsString: [String]) {
  const cleanedData = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      value === '' && !fieldsToKeepAsString.includes(key) ? null : value,
    ]),
  );

  return cleanedData;
}

interface EditGisWriterReviewModalProps {
  currentReview: {
    id: number;
    review_text: string;
    date: string;
    sex: Clients.sex;
  };
  setOpen: any;
}

export const formSchema = z.object({
  review_text: z
    .string({
      required_error: 'Поле обязательно: укажите текст отзыва',
    })
    .min(10, { message: 'Минимальное количество символов для отзыва 10' }),
  date: z.string({ required_error: 'Укажите дату' }),
  sex: z.enum(['male', 'female'], {
    required_error: 'Выберите одно из значений',
  }),
});

export function EditGisWriterReviewModal({
  currentReview: { id, review_text, sex, date },
  setOpen,
}: EditGisWriterReviewModalProps) {
  const { client_id } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review_text,
      sex,
      date: format(new Date(date), 'yyyy-MM-dd'),
    },
  });

  const onEditClientContact = (data: any) => {
    toast('Редактирование отзыва Gis Написание', {
      description: data.detail,
    });
    form.reset();
    queryClient.invalidateQueries(['getWriterReviewsGis']);
  };

  const { mutate, isLoading } = useMutation(clients.updateGisWriterReview.fn, {
    onSuccess: (data) => onEditClientContact(data),

    onError: (error: AxiosError<{ detail: string }>) =>
      toast('Ошибка', {
        description: error.response?.data.detail,
        duration: 7000,
      }),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      body: { id: id, ...values } as UpdateGisWriterReviewReq,
    });
    setOpen(false);
  }

  useEffect(
    () =>
      form.reset({
        review_text,
        sex,
        date: format(new Date(date), 'yyyy-MM-dd'),
      }),
    [review_text, sex, date],
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Форма редактирования отзыва написания gis</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5 flex flex-col flex-1'
        >
          <div className='flex-1 flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='sex'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Пол:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-row space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='male' />
                        </FormControl>
                        <FormLabel className='font-normal'>Мужчина</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='female' />
                        </FormControl>
                        <FormLabel className='font-normal'>Женщина</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата:</FormLabel>
                  <FormControl>
                    <Input type='date' placeholder='Укажите дату' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='review_text'
              render={({ field }) => (
                <FormItem className='flex-1 flex flex-col'>
                  <FormLabel>Отзыв:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Текст отзыва'
                      {...field}
                      className='h-[160px] min-h-[160px] p-3'
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
            Сохранить
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
