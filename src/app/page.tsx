import { FC } from 'react';
import { BioCard } from '~/components/cards/bio';
import { BlogCard } from '~/components/cards/blog';
import { JobsCard } from '~/components/cards/jobs';
import { ProjectsCard } from '~/components/cards/projects';
import { SocialCard } from '~/components/cards/socials';
import { Header } from '~/components/header';

const HomePage: FC = async () => {
  return (
    <>
      <Header />
      <main className='pb-20'>
        <div className='grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-7 lg:grid-cols-12 xl:mx-auto'>
          <div className='col-span-1 md:col-span-2 lg:col-span-3'>
            <BioCard />
          </div>

          <div className='col-span-1 space-y-3 md:col-span-3 lg:col-span-6'>
            <JobsCard />
            <ProjectsCard />
          </div>

          <div className='col-span-1 space-y-3 md:col-span-2 lg:col-span-3'>
            <SocialCard />
            <BlogCard />
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
