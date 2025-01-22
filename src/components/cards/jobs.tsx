import Link from 'next/link';
import type { FC } from 'react';
import { getJobs } from '~/actions/cv';
import { CvJob } from '~/components/cv-job';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

const JobsCard: FC = async () => {
  // it's a little hack but it does the job
  const jobs = await getJobs();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Work Experiences</CardTitle>
        <CardDescription>
          <span>Shows where I&apos;m currently work.</span>{' '}
          <small className='text-sky-600'>
            Pro tip: hover on each company to see more details.
          </small>
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-9'>
        {jobs.map((job) => (
          <CvJob key={job.id} job={job} />
        ))}
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Link href='/cv'>
          <CardDescription className='text-sm'>
            Check out my complete curriculum
          </CardDescription>
        </Link>
      </CardFooter>
    </Card>
  );
};

export { JobsCard };
