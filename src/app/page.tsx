import { FC } from 'react';
import { BioCard } from '~/components/BioCard';
import { BlogCard } from '~/components/BlogCard';
import { GitFeedCard } from '~/components/GitFeedCard';
import { JobsCard } from '~/components/JobsCard';
import { SocialCard } from '~/components/SocialdCard';

const HomePage: FC = () => {
  return (
    <>
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
    </>
  );
};

export default HomePage;
