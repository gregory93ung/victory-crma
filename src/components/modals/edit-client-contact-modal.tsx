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
  FormDescription,
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
import { formContactSchema } from './add-client-contact-modal';
import { ContactItemProps } from '@/app/private/ClientPage/InfoBlock/InfoTabs/ContactsTabPanel/ContactItem';
import { EditSpecificContactReq } from '@/api/contacts/editSpecificContact';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { AxiosError } from 'axios';

function cleanedDataFn(values: any, fieldsToKeepAsString: [String]) {
  const cleanedData = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      value === '' && !fieldsToKeepAsString.includes(key) ? null : value,
    ]),
  );

  return cleanedData;
}

interface EditClientContactModalProps {
  currentContact: ContactItemProps;
  setOpen: any;
}

export function EditClientContactModal({
  currentContact: { id, comment, email, phone, title },
  setOpen,
}: EditClientContactModalProps) {
  const { client_id } = useParams();

  const form = useForm<z.infer<typeof formContactSchema>>({
    resolver: zodResolver(formContactSchema),
    defaultValues: { title, phone, email, comment },
  });

  const onEditClientContact = (data: any) => {
    toast('Редактирование контакта клиента', {
      description: data.detail,
    });
    form.reset();
    queryClient.invalidateQueries([
      'getAllContactsClient',
      { slug: client_id },
    ]);
  };

  const { mutate, isLoading } = useMutation(clients.editSpecificContact.fn, {
    onSuccess: (data) => onEditClientContact(data),

    onError: (error: AxiosError<{ detail: string }>) =>
      toast('Ошибка', {
        description: error.response?.data.detail,
        duration: 7000,
      }),
  });

  function onSubmit(values: z.infer<typeof formContactSchema>) {
    const cleanedData = cleanedDataFn(values, ['title']);

    mutate({
      body: { id: id, ...cleanedData } as EditSpecificContactReq,
    });
    setOpen(false);
  }

  useEffect(
    () =>
      form.reset({
        title,
        phone,
        email,
        comment,
      }),
    [title, phone, email, comment],
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Форма редактирования контакта</DialogTitle>
        <DialogDescription>Отредактировать контакт клиента</DialogDescription>
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
                    <Input placeholder='Укажите телефон контакта' {...field} />
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
                    <Textarea placeholder='Комментарий к контакту' {...field} />
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
