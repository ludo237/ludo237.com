import { fromUnixTime } from 'date-fns';
import { promises as fs } from 'fs';
import Link from 'next/link';
import { FC } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui';

const JobsCard: FC = async () => {
  const file = await fs.readFile(process.cwd() + '/data/db/jobs.json', 'utf8');
  const jobs = JSON.parse(file) as Job[];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Jobs</CardTitle>
        <CardDescription>Shows where I&apos;m currently work</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-9'>
        <div className='flex items-center gap-3'>
          <Avatar className='hidden size-9 sm:flex'>
            <AvatarImage src={jobs[0].avatar} alt={jobs[0].company} />
            <AvatarFallback>{jobs[0].short}</AvatarFallback>
          </Avatar>
          <div className='grow space-y-0.5'>
            <p className='font-medium leading-none text-sky-500'>
              {jobs[0].company}
            </p>
            <p className=' text-sm text-zinc-600  dark:text-zinc-200'>
              {jobs[0].description}
            </p>
          </div>
          <small className='ml-auto text-xs text-zinc-400'>
            {fromUnixTime(jobs[0].startedAt).toLocaleDateString()}
          </small>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Link href='/curriculum'>
          <CardDescription className='text-sm'>
            Check out my complete curriculum
          </CardDescription>
        </Link>
      </CardFooter>
    </Card>
  );
};

export { JobsCard };
