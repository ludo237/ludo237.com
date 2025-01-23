import { format, formatDistanceStrict } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import type { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '~/components/ui/hover-card';

const CvJob: FC<{ job: Job }> = ({ job }) => {
  return (
    <div className='flex items-center gap-x-3'>
      <Avatar className='hidden size-9 sm:flex'>
        <AvatarImage src={job.image} alt={job.company.name} />
        <AvatarFallback>{job.company.shortName}</AvatarFallback>
      </Avatar>
      <div className='grow space-y-1.5'>
        <HoverCard>
          <HoverCardTrigger asChild>
            <h4 className='leading-none font-medium text-sky-500'>
              {job.company.name}
            </h4>
          </HoverCardTrigger>
          <HoverCardContent className='w-80'>
            <div className='flex justify-between space-x-3'>
              <div className='space-y-1.5'>
                <h4 className='font-bold'>{job.company.name}</h4>
                <p className='text-xs font-semibold'>{job.description}</p>
                <div className='flex items-center'>
                  <CalendarDays className='size-3 pr-2 opacity-70' />{' '}
                  <small className='text-xs text-slate-600 dark:text-slate-400'>
                    Joined {format(job.startedAt, 'MMMM yyyy')}
                    {job.endedAt &&
                      ` - Left ${format(job.endedAt, 'MMMM yyyy')}`}
                  </small>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <div className='space-x-1.5'>
          <span className='text-sm text-sky-600 dark:text-sky-200'>
            {job.role.title}
          </span>{' '}
          <small className='text-slate-500'>
            ({formatDistanceStrict(job.endedAt || new Date(), job.startedAt)})
          </small>
        </div>

        <p className='prose-slate-600 dark:prose-slate-200 prose prose-sm'>
          {job.role.description}
        </p>

        <div>
          {job.skills.map((s) => (
            <Badge variant='outline' className='mr-1.5 mb-1.5' key={s}>
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export { CvJob };
