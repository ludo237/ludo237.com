import type {FC} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';

const Header: FC = () => {
  return (
    <header>
      <div className='w-full max-w-2xl'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex flex-1 flex-col space-y-1.5'>
            <div className='flex'>
              <span className='inline-block text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none dark:text-slate-400'>
                Hi 👋, I am Claudio Ludovico
              </span>
            </div>
            <div className='flex'>
              <span className='inline-block max-w-[600px] md:text-xl dark:text-slate-400'>
                Also known as{' '}
                <strong className='text-sky-500 dark:text-sky-600'>
                  Ludo237
                </strong>
                . Software Engineer turned Entrepreneur.
              </span>
            </div>
          </div>
          <Avatar className='size-36'>
            <AvatarImage src='https://avatars.githubusercontent.com/u/921500?v=4' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export {Header};
