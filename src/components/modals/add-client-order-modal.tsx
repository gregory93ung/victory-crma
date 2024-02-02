import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ReactNode, useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { queryClient } from '@/config/client';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AddNewOrderClientReq } from '@/api/orders/addNewOrderClient';
import { query } from '@/api/fetcherHook/useQueryWrapper';
import { AxiosError } from 'axios';

interface AddClientOrderModalProps {
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

export const formOrderSchema = z.object({
  card_url: z
    .string({
      required_error: 'Поле обязательно: укажите url карточки',
    })
    .url({ message: 'Введите коректный url адрес' }),
  service: z
    .string({
      required_error: 'Поле обязательно: выберите услугу из списка',
    })
    .refine((service_id) => !isNaN(parseFloat(service_id)), {
      message: 'Ошибка выбора сервиса',
    })
    .transform((service_id) => Number(service_id)),
  count: z
    .string()
    .transform((val) => {
      if (val === '' || val === null) {
        return null;
      } else {
        return Number(val);
      }
    })
    .nullable()
    .default(null),
  price: z
    .string({ required_error: 'Поле обязательно: укажите цену' })
    .min(1, { message: 'Поле обязательно: укажите цену' })
    .refine((service_id) => !isNaN(parseFloat(service_id)), {
      message: 'Ошибка не число',
    })
    .transform((service_id) => Number(service_id)),
  period_start: z.string({ required_error: 'Укажите дату начала' }),
  period_end: z.string({ required_error: 'Укажите дату окончания' }),
});

export function AddClientOrderModal({ children }: AddClientOrderModalProps) {
  const { client_id } = useParams();
  const [open, setOpen] = useState(false);

  const { data: servicesData = [] } = query(clients.getServices, {});

  const form = useForm<z.infer<typeof formOrderSchema>>({
    resolver: zodResolver(formOrderSchema),
  });

  const onAddClientOrder = (data: any) => {
    toast('Добавление нового заказа клиенту', {
      description: data.detail,
    });
    form.reset();
    queryClient.invalidateQueries(['getAllOrdersClient', { slug: client_id }]);
    queryClient.invalidateQueries(['getSpecificClient', { slug: client_id }]);
  };
  const { mutate, isLoading } = useMutation(clients.addNewOrderClient.fn, {
    onSuccess: (data) => onAddClientOrder(data),
    onError: (error: AxiosError<{ detail: string }>) =>
      toast('Ошибка', {
        description: error.response?.data.detail,
        duration: 7000,
      }),
    // onError: (error) => console.error('Ошибка:', error),
  });

  function onSubmit(values: z.infer<typeof formOrderSchema>) {
    mutate({
      body: { client_id: client_id, ...values } as AddNewOrderClientReq,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Форма добавления заказа</DialogTitle>
          <DialogDescription>Добавить новый заказ клиента</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex flex-col flex-1'
          >
            <div className='flex-1 flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='service'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Услуги</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Выберите из списка необходимую услугу' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {servicesData.map((service) => (
                          <SelectItem
                            key={service.id}
                            value={String(service.id)}
                          >
                            {service.name} ({service.platform})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='card_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url адрес карточки</FormLabel>
                    <FormControl>
                      <Input placeholder='Укажите url карточки' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена</FormLabel>
                    <FormControl>
                      <Input placeholder='Укажите цену' {...field} />
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
              Добавить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
