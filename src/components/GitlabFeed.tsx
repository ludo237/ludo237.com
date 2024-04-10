'use client';

import {
  BookPlus,
  BookUp,
  BookX,
  Dot,
  GitPullRequestArrow,
  LucideIcon,
  MessageSquareText,
  ThumbsUp,
} from 'lucide-react';
import { FC, useMemo } from 'react';
import {
  ScrollArea,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui';

const GitlabFeedItem: FC<{ event: GitlabEvent; project?: GitlabProject }> = ({
  event,
  project,
}) => {
  const Icon: LucideIcon = useMemo(() => {
    switch (event.action_name) {
      case 'opened':
      case 'pushed new':
        return BookPlus;
      case 'pushed':
      case 'pushed to':
        return BookUp;
      case 'commented':
      case 'commented on':
        return MessageSquareText;
      case 'deleted':
        return BookX;
      case 'approved':
        return ThumbsUp;
      case 'accepted':
        return GitPullRequestArrow;
      default:
        return Dot;
    }
  }, [event.action_name]);

  return (
    <li className='flex items-center space-x-1.5'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon className='size-6 text-zinc-600' />
          </TooltipTrigger>
          <TooltipContent>
            <p>{event.action_name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div>{project?.name ?? event.project_id}</div>
    </li>
  );
};

const GitlabFeed: FC<{ events: GitlabEvent[] }> = ({ events }) => {
  return (
    <ScrollArea className='h-72'>
      <div className='p-3'>
        {events.map((event) => (
          <div key={event.id}>
            <GitlabFeedItem event={event} />
            <Separator className='my-1.5' />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export { GitlabFeed };
