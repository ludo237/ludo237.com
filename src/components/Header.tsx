import { FC } from 'react';

const Header: FC = () => {
  return (
    <div className='mx-auto flex max-w-3xl flex-col items-center gap-2 py-4 md:py-6 md:pb-4 lg:py-12 lg:pb-10'>
      <h1 className='text-balance text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] dark:text-zinc-200'>
        Claudio Ludovico
      </h1>
      <small className='text-sky-600 dark:text-sky-500'>
        also known as ludo237
      </small>
      <span className='text-muted-foreground max-w-[750px] text-center text-lg sm:text-xl dark:text-zinc-300'>
        Entrepreneur - Engineer - Optimistic for the Future
      </span>
    </div>
  );
};

export { Header };
