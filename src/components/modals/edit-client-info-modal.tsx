import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { buttonVariants } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { ReactNode, useEffect, useState } from 'react';
import { Clients } from '@/types';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { EditSpecificClientInfoReq } from '@/api/clients/editSpecificClientInfo';
import { queryClient } from '@/config/client';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AxiosError } from 'axios';

interface EditClientInfoModalProps {
  children: ReactNode;
  info: Clients.ClientDetailInfo;
}

const formSchema = z.object({
  city: z.string().nullable(),
  description: z.string().nullable(),
  rating: z.coerce.number().nullable(),
  reviews_count: z.coerce.number().nullable(),
  branch_count: z.coerce.number().nullable(),
  comment: z.string().nullable(),
});

export function EditClientInfoModal({
  children,
  info: { id, city, description, rating, reviews_count, branch_count, comment },
}: EditClientInfoModalProps) {
  const { client_id } = useParams();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city,
      description,
      rating,
      reviews_count,
      branch_count,
      comment,
    },
  });

  const onUpdateClientInfo = (data: any) => {
    toast('Редактирование информации о карточке', {
      description: data.detail,
    });
    form.reset();
    queryClient.invalidateQueries(['getSpecificClient', { slug: client_id }]);
  };

  const { mutate, isLoading } = useMutation(clients.editSpecificClientInfo.fn, {
    onSuccess: (data) => onUpdateClientInfo(data),

    onError: (error: AxiosError<{ detail: string }>) =>
      toast('Ошибка', {
        description: error.response?.data.detail,
        duration: 7000,
      }),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // const cleanedData = Object.fromEntries(
    //   Object.entries(values).map(([key, value]) => [
    //     key,
    //     value === '' ? null : value,
    //   ]),
    // );

    const cleanedData = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        value === '' || (typeof value === 'number' && value === 0)
          ? null
          : value,
      ]),
    );

    mutate({ body: { id: id, ...cleanedData } as EditSpecificClientInfoReq });
    setOpen(false);
  }

  useEffect(
    () =>
      form.reset({
        city,
        description,
        rating,
        reviews_count,
        branch_count,
        comment,
      }),
    [city, description, rating, reviews_count, branch_count, comment],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Форма редактирования</DialogTitle>
          <DialogDescription>
            Редактирование информации о клиенте
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex flex-col flex-1'
          >
            <div className='flex-1 flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Город</FormLabel>
                    <FormControl>
                      <Input placeholder='У кажите город' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сфера</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='У кажите сфферу деятельности'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='rating'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Рейтинг</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='У кажите рейтинг'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='reviews_count'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество филиалов</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='У количество филиалов'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='branch_count'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество отзывов</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='У количество отзывов'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='comment'
                render={({ field }) => (
                  <FormItem className='flex-1 flex flex-col'>
                    <FormLabel>Комментарий</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Комментарий по карточке'
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
    </Dialog>
  );
}
