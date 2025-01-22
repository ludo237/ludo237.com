'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FC, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { login } from '~/actions/auth';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { loginSchema } from '~/schemas';

const LoginForm: FC<{ revalidateFrom: string }> = ({ revalidateFrom }) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      await login(data, revalidateFrom);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='example@ludo237.com'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Any email will be fine, even a throwaway
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='********' {...field} />
              </FormControl>
              <FormDescription>
                Only one rule: at least 8 characters (even emojis 😏)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full items-center justify-end'>
          <Button disabled={isPending} type='submit' size='sm'>
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { LoginForm };
