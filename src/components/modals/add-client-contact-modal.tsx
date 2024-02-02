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
import { ReactNode, useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { queryClient } from '@/config/client';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AddNewContactReq } from '@/api/contacts/addNewContact';
import { AxiosError } from 'axios';

interface AddClientContactModalProps {
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

export const formContactSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Имя должно содержать минимум 2 символа' }),

  phone: z
    .string()
    .regex(
      /^7\d{10}$/,
      'Номер не должен иметь +, начинается с 7, после 10 цифр',
    )
    .or(z.literal(''))
    .nullable(),
  email: z
    .string()
    .email({ message: 'Невалидный email адрес' })
    .or(z.literal(''))
    .nullable(),
  comment: z.string().nullable(),
});

export function AddClientContactModal({
  children,
}: AddClientContactModalProps) {
  const { client_id } = useParams();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formContactSchema>>({
    resolver: zodResolver(formContactSchema),
    defaultValues: { title: '', phone: null, email: null, comment: null },
  });

  const onAddClientContact = (data: any) => {
    toast('Добавление нового контакта клиенту', {
      description: data.detail,
    });
    form.reset();
    queryClient.invalidateQueries([
      'getAllContactsClient',
      { slug: client_id },
    ]);
  };

  const { mutate, isLoading } = useMutation(clients.addNewContact.fn, {
    onSuccess: (data) => onAddClientContact(data),

    onError: (error: AxiosError<{ detail: string }>) =>
      toast('Ошибка', {
        description: error.response?.data.detail,
        duration: 7000,
      }),
  });

  function onSubmit(values: z.infer<typeof formContactSchema>) {
    const cleanedData = cleanedDataFn(values, ['title']);

    mutate({
      body: { client_id: client_id, ...cleanedData } as AddNewContactReq,
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
          <DialogTitle>Форма добавления контакта</DialogTitle>
          <DialogDescription>Добавить новый контакт клиента</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex flex-col flex-1'
          >
            <div className='flex-1 flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder='Укажите имя контакта' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Укажите телефон контакта'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input placeholder='Укажите почту контакта' {...field} />
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
                        placeholder='Комментарий к контакту'
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
