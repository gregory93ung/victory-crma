import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import {
  DialogContent,
  DialogDescription,
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

import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { queryClient } from '@/config/client';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Clients } from '@/types';
import { useEffect } from 'react';
import { EditSpecificOrderReq } from '@/api/orders/editSpecificOrder';
import { AxiosError } from 'axios';

interface EditClientOrderModalProps {
  currentOrder: Clients.IClientOrder;
  setOpen: any;
}

export const formOrderSchema = z.object({
  count: z.coerce
    .string()
    .nullable()
    .transform((val) => {
      if (val === '' || val === null) {
        return null;
      } else {
        return Number(val);
      }
    })
    .default(null),
  period_start: z
    .string({ required_error: 'Укажите дату старта' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Выберите валидную дату',
    }),
  period_end: z
    .string({ required_error: 'Укажите дату окончания' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Выберите валидную дату',
    }),
});

export function EditClientOrderModal({
  currentOrder: { id, count, period_end, period_start },
  setOpen,
}: EditClientOrderModalProps) {
  const { client_id } = useParams();

  const form = useForm<z.infer<typeof formOrderSchema>>({
    resolver: zodResolver(formOrderSchema),
    defaultValues: {
      count,
      period_end,
      period_start,
    },
  });

  const onEditClientOrder = (data: any) => {
    toast('Редактирование заказа клиента', {
      description: data.detail,
    });
    form.reset();
    queryClient.invalidateQueries(['getAllOrdersClient', { slug: client_id }]);
  };

  const { mutate, isLoading } = useMutation(clients.editSpecificOrder.fn, {
    onSuccess: (data) => onEditClientOrder(data),
    onError: (error: AxiosError<{ detail: string }>) =>
      toast('Ошибка', {
        description: error.response?.data.detail,
        duration: 7000,
      }),
    // onError: (error) => console.error('Ошибка:', error),
  });

  function onSubmit(values: z.infer<typeof formOrderSchema>) {
    mutate({
      body: { id: id, ...values } as EditSpecificOrderReq,
    });
    setOpen(false);
  }

  useEffect(
    () =>
      form.reset({
        count,
        period_end,
        period_start,
      }),
    [count, period_end, period_start],
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Форма редактирования заказа</DialogTitle>
        <DialogDescription>Редактировать заказ №{id}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5 flex flex-col flex-1'
        >
          <div className='flex-1 flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='count'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Количество</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Укажите количество'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='period_start'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Начало</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      placeholder='Укажите дату старта'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='period_end'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Конец</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      placeholder='Укажите дату окончания'
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
            Сохранить
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
