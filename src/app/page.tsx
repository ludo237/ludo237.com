import { FC } from 'react';
import { BioCard } from '~/components/BioCard';
import { BlogCard } from '~/components/BlogCard';
import { GitFeedCard } from '~/components/GitFeedCard';
import { JobsCard } from '~/components/JobsCard';
import { SocialCard } from '~/components/SocialdCard';

const HomePage: FC = () => {
  return (
    <div>
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
      <div className='mx-3 grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-12 xl:mx-auto'>
        <div className='col-span-1 md:col-span-3'>
          <BioCard />
        </div>

        <div className='col-span-1 space-y-3 md:col-span-6'>
          <JobsCard />
          <BlogCard />
        </div>

        <div className='col-span-1 space-y-3 md:col-span-3'>
          <SocialCard />
          <GitFeedCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
