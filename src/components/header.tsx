import { FC } from 'react';
import { Navbar } from '~/components/navbar';

const Header: FC = () => {
  return (
    <div className='mx-auto flex max-w-3xl flex-col items-center gap-2 py-4 md:py-6 md:pb-4 lg:py-12 lg:pb-10'>
      <h1 className='text-balance text-center text-3xl font-bold leading-tight tracking-tighter dark:text-zinc-200 md:text-6xl lg:leading-[1.1]'>
        Claudio Ludovico
      </h1>
      <small className='text-sky-600 dark:text-sky-500'>
        also known as ludo237
      </small>
      <Navbar />
    </div>
  );
};

export { Header };
