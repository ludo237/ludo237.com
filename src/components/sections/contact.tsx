import {Send} from 'lucide-react';
import {ContactMeDialogs} from '~/components/contact-me-dialogs';
import {Button} from '~/components/ui/button';

const ContactMe = () => {
  return (
    <section id='contact'>
      <div className='w-full space-y-3 text-center md:px-6'>
        <h2 className='text-3xl font-bold tracking-tighter text-sky-500 sm:text-5xl dark:text-sky-600'>
          Get in Touch
        </h2>
        <p className='mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400'>
          <span>Want to chat? Just shoot me a dm</span>{' '}
          <a
            className='text-sky-500 hover:underline dark:text-sky-600'
            href='https://x.com/intent/follow?screen_name=realLudo237'
          >
            with a direct question on Twitter
          </a>{' '}
          <span>and I wil respond whenever I can.</span>
          <br />
          <span>Want to send me an email?</span>{' '}
          <ContactMeDialogs
            trigger={
              <Button variant={'outline'} size={'sm'}>
                <Send className='size-3' />
                <span>Send me a message</span>
              </Button>
            }
          />
        </p>
      </div>
    </section>
  );
};

export {ContactMe};
