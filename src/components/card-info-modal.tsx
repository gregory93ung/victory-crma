import { ReactNode, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Clients } from '@/types';

import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { cn } from '@/lib/utils';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { UpdateCardInfoReq } from '@/api/cards/updateCardInfo';
import { queryClient } from '@/config/client';
import { useParams } from 'react-router-dom';

interface CardInfoModalProps {
  children: ReactNode;
  info: Clients.Card;
  refetchCardInfo: () => void;
}

const formSchema = z.object({
  service_login: z.string().nullable(),
  service_password: z.string().nullable(),
  // service_url: z.string().nullable(),
  service_url: z
    .string()
    .url({ message: 'Введите коректный url адрес' })
    .or(z.literal(''))
    // .transform((url) => (url === '' ? null : url))
    // .refine((url) => url === null || z.string().url(), {
    //   message: 'Введите корректный URL-адрес или оставьте поле пустым',
    // })
    .nullable(),
  // .transform(() => null)
  // service_url: z
  //   .string()
  //   .nullable()
  //   .transform((url) => (url === '' ? null : url))
  //   .refine((url) => url === null || z.string().url(), {
  //     message: 'Введите корректный URL-адрес или оставьте поле пустым',
  //   }),
  comment: z.string().nullable(),
});

export const CardInfoModal = ({
  children,
  info: {
    id,
    firm_name,
    firm_address,
    card_url,
    service_login,
    service_password,
    service_url,
    comment,
  },
  refetchCardInfo,
}: CardInfoModalProps) => {
  const { client_id } = useParams();
  const [_, copy] = useCopyToClipboard();

  const handleCopyClick = async (textToCopy: string) => {
    const isSuccess = await copy(textToCopy);

    if (isSuccess) {
      toast('Вы скопировали', {
        description: textToCopy,
      });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_login,
      service_password,
      service_url,
      comment,
    },
  });

  const onUpdateClientInfo = (data: any) => {
    toast('Редактирование информации о карточке', {
      description: data.detail,
    });
    form.reset();
    refetchCardInfo();
    queryClient.invalidateQueries(['getAllCardsClient', { slug: client_id }]);
  };

  const { mutate, isLoading } = useMutation(clients.updateCardInfo.fn, {
    onSuccess: (data) => onUpdateClientInfo(data),

    onError: (error) => console.error('Ошибка:', error),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const cleanedData = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        value === '' ? null : value,
      ]),
    );

    mutate({ body: { id: id, ...cleanedData } as UpdateCardInfoReq });
  }

  useEffect(
    () =>
      form.reset({
        service_login,
        service_password,
        service_url,
        comment,
      }),
    [service_login, service_password, service_url, comment],
  );

  return (
    <Sheet>
      <SheetTrigger className='outline-none'>{children}</SheetTrigger>
      <SheetContent className='flex flex-col gap-5'>
        <SheetHeader>
          <SheetTitle className='flex flex-row items-center justify-between'>
            Общая информация
          </SheetTitle>
        </SheetHeader>

        <div className='flex-1 flex flex-col justify-between gap-5 overflow-y-scroll'>
          <div className='flex-1 flex flex-col gap-5'>
            <div className='flex flex-col gap-3 bg-layer-01 p-3 rounded'>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>
                  Название:
                </p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    firm_name && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() => firm_name && handleCopyClick(firm_name)}
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !firm_name && 'text-text-disabled',
                    )}
                  >
                    {firm_name ? firm_name : 'Не указано'}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>
                  Адрес:
                </p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    firm_address && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() => firm_address && handleCopyClick(firm_address)}
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !firm_address && 'text-text-disabled',
                    )}
                  >
                    {firm_address ? firm_address : 'Не указано'}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>
                  Ссылка:
                </p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    card_url && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() => card_url && handleCopyClick(card_url)}
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !card_url && 'text-text-disabled',
                    )}
                  >
                    {card_url ? card_url : 'Не указано'}
                  </p>
                </div>
              </div>
            </div>

            <div className='flex-1 flex flex-col gap-3 bg-layer-01 p-3 rounded'>
              <p className='font-semibold text-text-primary'>Кабинет</p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-5 flex flex-col flex-1'
                >
                  <div className='flex-1 flex flex-col gap-3'>
                    <FormField
                      control={form.control}
                      name='service_login'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Логин</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Логин от кабинета'
                              {...field}
                              className='bg-layer-02'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='service_password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Пароль</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Пароль от кабинета'
                              {...field}
                              className='bg-layer-02'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='service_url'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ссылка</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ссылка на кабинет'
                              {...field}
                              className='bg-layer-02'
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
                              className='bg-layer-02'
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
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
