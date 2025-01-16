import { format, formatDistanceStrict } from "date-fns";
import { CalendarDays } from "lucide-react";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "~/components/ui/hover-card";

const CvJob: FC<{ job: Job }> = ({ job }) => {
	return (
		<div className="flex items-center gap-3">
			<Avatar className="hidden size-9 sm:flex">
				<AvatarImage src={job.image} alt={job.company.name} />
				<AvatarFallback>{job.company.shortName}</AvatarFallback>
			</Avatar>
			<div className="grow space-y-0.5">
				<HoverCard>
					<HoverCardTrigger asChild>
						<h4 className="font-medium leading-none text-sky-500">
							{job.company.name}
						</h4>
					</HoverCardTrigger>
					<HoverCardContent className="w-80">
						<div className="flex justify-between space-x-4">
							<div className="space-y-1">
								<h4 className="text-sm font-semibold">{job.company.name}</h4>
								<p className="text-sm">{job.description}</p>
								<div className="flex items-center pt-2">
									<CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
									<small className="text-xs text-zinc-600 dark:text-zinc-400">
										Joined {format(job.startedAt, "MMMM yyyy")}
										{job.endedAt &&
											` - Left ${format(job.endedAt, "MMMM yyyy")}`}
									</small>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
				<p className="text-sm text-zinc-600 dark:text-zinc-200">
					{job.role.title}
				</p>
			</div>
			<small className="ml-auto text-xs text-zinc-600 dark:text-zinc-400">
				{formatDistanceStrict(job.endedAt || new Date(), job.startedAt)}
			</small>
		</div>
	);
};

export { CvJob };
