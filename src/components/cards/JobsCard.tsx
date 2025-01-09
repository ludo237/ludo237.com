import Link from 'next/link';
import { FC } from 'react';
import { getJobs } from '~/actions';
import { CvJob } from '~/components/CvJob';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';

const JobsCard: FC = async () => {
  // it's a little hack but it does the job
  const job = (await getJobs())[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Jobs</CardTitle>
        <CardDescription>Shows where I&apos;m currently work</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-9'>
        <CvJob job={job} />
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
