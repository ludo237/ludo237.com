import { formatDistanceStrict } from 'date-fns';
import Link from 'next/link';
import { FC } from 'react';
import { getJobs } from '~/actions';
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
  const job = (await getJobs())[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Jobs</CardTitle>
        <CardDescription>Shows where I&apos;m currently work</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-9'>
        <div className='flex items-center gap-3'>
          <Avatar className='hidden size-9 sm:flex'>
            <AvatarImage src={job.avatar} alt={job.company} />
            <AvatarFallback>{job.short}</AvatarFallback>
          </Avatar>
          <div className='grow space-y-0.5'>
            <p className='font-medium leading-none text-sky-500'>
              {job.company}
            </p>
            <p className=' text-sm text-zinc-600  dark:text-zinc-200'>
              {job.role.title}
            </p>
          </div>
          <small className='ml-auto text-xs text-zinc-400'>
            {formatDistanceStrict(job.endedAt || new Date(), job.startedAt)}
          </small>
        </div>
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
