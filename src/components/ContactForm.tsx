'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, SendHorizonal } from 'lucide-react';
import { FC, useState, useTransition } from 'react';
import { Form, useForm } from 'react-hook-form';
import { z } from 'zod';
import { sendEmail } from '~/actions';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/Alert';
import { Button } from '~/components/ui/Button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/Form';
import { Input } from '~/components/ui/Input';
import { Textarea } from '~/components/ui/Textarea';
import { contactSchema } from '~/schemas';

const ContactForm: FC = () => {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      handler: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    startTransition(async () => {
      const sent = await sendEmail(values);
      setSent(sent);
    });
  };

  if (sent) {
    return (
      <Alert variant='success'>
        <Check className='size-4' />
        <AlertTitle>Thank you for contacting me</AlertTitle>
        <AlertDescription>
          I will get back to you as soon as possible.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='handler'
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can I call you?</FormLabel>
              <FormControl>
                <Input placeholder='@realLudo237' {...field} />
              </FormControl>
              <FormDescription>
                Your full name or nickname, like Twitter handler or GitHub
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input placeholder='jhon.doe@gmail.com' {...field} />
              </FormControl>
              <FormDescription>
                Please provide your email so I can contact you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder='Type here your message' {...field} />
              </FormControl>
              <FormDescription>
                Describe why you&apos;re contacting me
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button
            type='submit'
            className='flex items-center space-x-0.5'
            disabled={isPending}
          >
            <span>Send</span>
            <SendHorizonal className='size-4' />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { ContactForm };
