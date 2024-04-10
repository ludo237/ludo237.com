import { format, formatDistanceStrict } from 'date-fns';
import { CalendarDays, DownloadCloudIcon } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { getEducations, getJobs, getLanguages, getProjects } from '~/actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '~/components/ui';

const CvJob: FC<{ job: Job }> = ({ job }) => {
  return (
    <div className='flex items-center gap-3'>
      <Avatar className='hidden size-9 sm:flex'>
        <AvatarImage src={job.avatar} alt={job.company} />
        <AvatarFallback>{job.short}</AvatarFallback>
      </Avatar>
      <div className='grow space-y-0.5'>
        <HoverCard>
          <HoverCardTrigger asChild>
            <h4 className='font-medium leading-none text-sky-500'>
              {job.company}
            </h4>
          </HoverCardTrigger>
          <HoverCardContent className='w-80'>
            <div className='flex justify-between space-x-4'>
              <div className='space-y-1'>
                <h4 className='text-sm font-semibold'>{job.company}</h4>
                <p className='text-sm'>{job.about}</p>
                <div className='flex items-center pt-2'>
                  <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
                  <small className='text-xs  text-zinc-600'>
                    Joined {format(job.startedAt, 'MMMM yyyy')}
                    {job.endedAt &&
                      ` - Left ${format(job.endedAt, 'MMMM yyyy')}`}
                  </small>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <p className='text-sm text-zinc-600  dark:text-zinc-200'>
          {job.role.title}
        </p>
      </div>
      <small className='ml-auto text-xs text-zinc-400'>
        {formatDistanceStrict(job.endedAt || new Date(), job.startedAt)}
      </small>
    </div>
  );
};

const CvPage = async () => {
  const eduations = await getEducations();
  const jobs = await getJobs();
  const projects = await getProjects();
  const languages = await getLanguages();

  return (
    <div className='mx-auto max-w-2xl'>
      <Card>
        <CardHeader>
          <CardTitle>Curriculum Vitae</CardTitle>
          <CardDescription>
            <p>
              Aiming to connect people through free services and automation.
              Invest into big ideas and bold people and help them growing as a
              family. To take on the bold, everyone need a deep seated desire to
              direct their own lives.
            </p>

            <small className='text-sky-600'>
              Pro tip: hover on each company to see more details.
            </small>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type='single' collapsible defaultValue='jobs'>
            <AccordionItem value='jobs'>
              <AccordionTrigger>Job experiences</AccordionTrigger>
              <AccordionContent className='space-y-9'>
                {jobs.map((job, index) => (
                  <CvJob key={index} job={job} />
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='languages'>
              <AccordionTrigger>Spoken languages</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='educations'>
              <AccordionTrigger>Educaton</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <CardDescription className='flex w-full justify-end'>
            <Button variant='default' asChild>
              <Link href='/resume_latest.pdf' title='download my resume in pdf'>
                Need a PDF version?
                <DownloadCloudIcon className={'size-8 px-1.5'} />
                Download it
              </Link>
            </Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CvPage;
