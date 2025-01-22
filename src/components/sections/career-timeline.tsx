import { format } from 'date-fns';
import Link from 'next/link';
import type { FC } from 'react';
import { getEducations, getJobs } from '~/actions/cv';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { addItemsToTimeline, mapTimelineIcon } from '~/lib/utils';

const TimelineLink: FC<{ link: TimelineLink }> = ({ link }) => {
  const Icon = mapTimelineIcon(link.type);

  return (
    <a href={link.href} key={link.title} target='_blank' rel='noreferrer'>
      <Badge
        variant='outline'
        title={link.title}
        className='flex items-center space-x-1.5'
      >
        <Icon className='size-3' />
        <span>{link.title}</span>
      </Badge>
    </a>
  );
};

const TimelineItem: FC<{ item: TimelineItem }> = ({ item }) => {
  return (
    <li className='relative ml-10 py-3'>
      <div className='absolute -left-16 top-3 flex items-center justify-center rounded-full bg-white'>
        <Avatar className='m-auto size-12 border'>
          <AvatarImage
            src={item.image}
            alt={item.name}
            className='object-contain'
          />
          <AvatarFallback>
            {item.name[0]}
            {item.name[1]}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className='flex flex-1 flex-col justify-start gap-1.5'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold leading-none text-sky-500 dark:text-sky-600'>
            {item.name}
          </h2>
          <time className='text-xs text-slate-500 dark:text-slate-400'>
            {format(item.startDate, 'MMMM yyyy')} -{' '}
            {item.endDate ? format(item.endDate, 'MMMM yyyy') : 'present'}
          </time>
        </div>
        <p className='text-xs text-slate-500 dark:text-slate-400'>
          {item.location}
        </p>
        {item.role && (
          <span className='text-sm text-sky-700 dark:text-sky-300'>
            {item.role.title}
          </span>
        )}

        <span className='prose text-sm text-slate-700 dark:prose-invert dark:text-slate-300'>
          {item.role ? item.role.description : item.description}
        </span>
      </div>
      {item.links && item.links.length > 0 && (
        <div className='flex flex-row flex-wrap items-start gap-3 py-1.5'>
          {item.links?.map((link) => (
            <TimelineLink key={link.title} link={link} />
          ))}
        </div>
      )}
    </li>
  );
};

const CareerTimeline = async () => {
  const jobs = await getJobs();
  const educations = await getEducations();
  const timelineItems = addItemsToTimeline([...jobs, ...educations]);

  return (
    <section id='career'>
      <div className='flex flex-col items-center justify-center space-y-4 text-center'>
        <div className='space-y-1.5'>
          <h2 className='text-3xl font-bold tracking-tighter text-sky-500 sm:text-5xl dark:text-sky-600'>
            My Career
          </h2>
          <p className='md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400'>
            Have a look at my career timeline, you will find educations and jobs
            I have done.
          </p>
        </div>
      </div>

      <ul className='mb-4 ml-4 divide-y divide-dashed border-l py-3'>
        {timelineItems.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </ul>

      <p className='flex w-full justify-end space-x-0.5'>
        <span className='dark:text-slate-400'>
          Do you need a more comprehensive look?
        </span>
        <Link
          href='/cv'
          className='font-semibold text-sky-500 dark:text-sky-600'
        >
          Get my CV
        </Link>
      </p>
    </section>
  );
};

export { CareerTimeline };
