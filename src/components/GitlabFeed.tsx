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
import { FC, useEffect, useMemo, useState } from 'react';
import { getGilabProjects } from '~/actions';
import { ScrollArea } from '~/components/ui/ScrollArea';
import { Separator } from '~/components/ui/Separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/Tooltip';

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
  const [projects, setProjects] = useState<GitlabProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getGilabProjects();
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects().catch(console.error);
  }, [events]);

  return (
    <ScrollArea className='h-72'>
      <div className='p-3'>
        {events.map((event) => (
          <div key={event.id}>
            <GitlabFeedItem
              event={event}
              project={projects.find((p) => p.id === event.project_id)}
            />
            <Separator className='my-1.5' />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export { GitlabFeed };
