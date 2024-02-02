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
  FormMessage,
} from '@/components/ui/form';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { clients } from '@/api/query.key';
import { queryClient } from '@/config/client';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AxiosError } from 'axios';

interface GisCardReviewsUploadModalProps {
  children: ReactNode;
  orderId: number;
}

export const formContactSchema = z.object({
  file: z.any(),
});

export function GisCardReviewsUploadModal({
  children,
  orderId,
}: GisCardReviewsUploadModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const filePicker = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formContactSchema>>({
    resolver: zodResolver(formContactSchema),
  });

  const onAddClientContact = (data: any) => {
    toast('Добавление файла отзывов', {
      description: data.detail,
    });
    form.reset();
    queryClient.invalidateQueries(['getWriterReviewsGis']);
  };

  const { mutate, isLoading } = useMutation(clients.uploadWriterReviewsGis.fn, {
    onSuccess: (data) => onAddClientContact(data),

    onError: (error: AxiosError<{ detail: string }>) =>
      toast('Ошибка', {
        description: error.response?.data.detail,
        duration: 7000,
      }),
  });

  function onSubmit() {
    if (selectedFile) {
      mutate({ slug: orderId, file: selectedFile });
    }
    setOpen(false);
    setSelectedFile(null);
  }

  const handlePick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (filePicker.current) filePicker.current.click();
  };

  useEffect(() => {
    setSelectedFile(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Форма загрузки файла отзывов</DialogTitle>
          <DialogDescription>Разрешенный формат xlsx</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex flex-col flex-1'
          >
            <div className='flex-1 flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='file'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className='opacity-0 h-0 w-0 leading-none overflow-hidden p-0 m-0'
                        type='file'
                        accept='.xlsx, .xls'
                        {...field}
                        ref={filePicker}
                        onChange={(e) => {
                          const fileInput = e.target;
                          if (
                            fileInput &&
                            fileInput.files &&
                            fileInput.files.length > 0
                          ) {
                            setSelectedFile(fileInput.files[0]);
                          } else {
                            setSelectedFile(null);
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>{selectedFile?.name || 'Файл не выбран'}</p>
              <Button onClick={handlePick}>Выбрать файл</Button>
              <div className='flex flex-row items-center'></div>
            </div>
            <Button
              className={cn('w-full', isLoading && 'opacity-30')}
              type='submit'
              disabled={isLoading}
            >
              Отправить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
