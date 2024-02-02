import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { LocalStorageKeys, setLocalStorageItem } from '@/utils/localStorage';
import { motion } from 'framer-motion';

const formSchema = z.object({
  login: z.string().min(2, {
    message: 'Имя пользователя должно состоять не менее чем из 2 символов.',
  }),
  password: z.string().min(2, {
    message: 'Пароль пользователя должен состоять не менее чем из 2 символов.',
  }),
});

const MotionCard = motion(Card);

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { mutate, isLoading } = useMutation(clients.login.fn, {
    onSuccess: (data) => {
      console.log(data);
      setLocalStorageItem(LocalStorageKeys.USER, data.token_value);
      window.location.reload();
    },
    onError: () => {
      console.log({ message: 'Неверный логин или пароль' });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <MotionCard
      className='min-w-96 max-w-96 bg-layer-01'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.9 }}
    >
      <CardHeader>
        <CardTitle className='text-center'>Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='login'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Victory'
                      {...field}
                      className='bg-field-02'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль пользователя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='12345'
                      {...field}
                      className='bg-field-02'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full'
              disabled={isLoading ? true : false}
            >
              {isLoading && (
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>
    </MotionCard>
  );
}
