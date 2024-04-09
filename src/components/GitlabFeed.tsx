"use client";

import {BookPlus, BookUp, Dot, LucideIcon} from "lucide-react";
import {FC, useMemo} from "react";
import {ScrollArea} from "~/components/ui/ScrollArea";
import {Separator} from "~/components/ui/Separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/Tooltip";

const GitlabFeedItem: FC<{event: GitlabEvent}> = ({event}) => {
  const Icon: LucideIcon = useMemo(() => {
    switch (event.action_name) {
      case "opened":
      case "pushed new":
        return BookPlus;
      case "pushed":
      case "pushed to":
        return BookUp
      default:
        return Dot;
    }
  }, [event.action_name]);

  return (
    <li className="flex items-center space-x-1.5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon className="size-6 text-zinc-600" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{event.action_name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div>{event.project_id}</div>
    </li>
  );
};

const GitlabFeed: FC<{events: GitlabEvent[]}> = ({events}) => {
  return (
    <ScrollArea className="h-72">
      <div className="p-3">
        {events.map((event) => (
          <div key={event.id}>
            <GitlabFeedItem event={event} />
            <Separator className="my-1.5" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export {GitlabFeed};
