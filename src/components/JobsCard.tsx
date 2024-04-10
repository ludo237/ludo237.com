import { fromUnixTime } from 'date-fns';
import { promises as fs } from 'fs';
import Link from 'next/link';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/Avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';

const JobsCard: FC = async () => {
  const file = await fs.readFile(process.cwd() + '/data/jobs.json', 'utf8');
  const jobs = JSON.parse(file) as Job[];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Jobs</CardTitle>
        <CardDescription>Shows where I&apos;m currently work</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-8'>
        <div className='flex items-center gap-4'>
          <Avatar className='hidden size-9 sm:flex'>
            <AvatarImage src={jobs[0].avatar} alt={jobs[0].company} />
            <AvatarFallback>{jobs[0].short}</AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <p className='font-medium leading-none text-sky-500'>
              {jobs[0].company}
            </p>
            <p className=' text-sm text-zinc-600  dark:text-zinc-200'>
              {jobs[0].description}
            </p>
          </div>
          <div className='ml-auto text-sm'>
            {fromUnixTime(jobs[0].startedAt).toLocaleDateString()}
          </div>
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