import type { FC } from 'react';
import { AboutMe } from '~/components/sections/about-me';
import { CareerTimeline } from '~/components/sections/career-timeline';
import { ContactMe } from '~/components/sections/contact';
import { Header } from '~/components/sections/header';
import { ProjectsGrid } from '~/components/sections/projects';

const HomePage: FC = async () => {
  return (
    <main className='flex min-h-[100dvh] flex-col space-y-9'>
      <div className='mx-auto max-w-2xl space-y-6'>
        <Header />
        <AboutMe />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-32'>
        <CareerTimeline />
        <ProjectsGrid />
      </div>
      <ContactMe />
    </main>
  );
};

export default HomePage;
