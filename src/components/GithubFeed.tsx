'use client';

import {
  BookPlus,
  BookUp,
  Dot,
  GitFork,
  LucideIcon,
  ScanEye,
} from 'lucide-react';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { ScrollArea } from '~/components/ui/ScrollArea';
import { Separator } from '~/components/ui/Separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/Tooltip';

const GithubFeedItem: FC<{ event: GithubEvent }> = ({ event }) => {
  const Icon: LucideIcon = useMemo(() => {
    switch (event.type) {
      case 'ForkEvent':
        return GitFork;
      case 'WatchEvent':
        return ScanEye;
      case 'PushEvent':
        return BookUp;
      case 'CreateEvent':
        return BookPlus;
      default:
        return Dot;
    }
  }, [event.type]);

  return (
    <li className='flex items-center space-x-1.5'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon className='size-6 text-zinc-600' />
          </TooltipTrigger>
          <TooltipContent>
            <p>{event.type}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div>
        <Link href={event.repo.url} target='_blank'>
          {event.repo.name}
        </Link>
      </div>
    </li>
  );
};

const GithubFeed: FC<{ events: GithubEvent[] }> = ({ events }) => {
  return (
    <ScrollArea className='h-72'>
      <div className='p-3'>
        {events.map((event) => (
          <div key={event.id}>
            <GithubFeedItem event={event} />
            <Separator className='my-1.5' />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export { GithubFeed };
