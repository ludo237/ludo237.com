import { format } from "date-fns";
import Link from "next/link";
import type { FC } from "react";
import { getEducations, getJobs } from "~/actions/cv";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { addItemsToTimeline, mapTimelineIcon } from "~/lib/utils";

const TimelineLink: FC<{ link: TimelineLink }> = ({ link }) => {
	const Icon = mapTimelineIcon(link.type);

	return (
		<a href={link.href} key={link.title} target="_blank" rel="noreferrer">
			<Badge
				variant="outline"
				title={link.title}
				className="flex items-center space-x-1.5"
			>
				<Icon className="size-3" />
				<span>{link.title}</span>
			</Badge>
		</a>
	);
};

const TimelineItem: FC<{ item: TimelineItem }> = ({ item }) => {
	return (
		<li className="relative ml-10 py-3">
			<div className="absolute -left-16 top-3 flex items-center justify-center bg-white rounded-full">
				<Avatar className="border size-12 m-auto">
					<AvatarImage
						src={item.image}
						alt={item.name}
						className="object-contain"
					/>
					<AvatarFallback>
						{item.name[0]}
						{item.name[1]}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex flex-1 flex-col justify-start gap-1.5">
				<time className="text-xs">
					{format(item.startDate, "MMMM yyyy")} -{" "}
					{item.endDate ? format(item.endDate, "MMMM yyyy") : "present"}
				</time>
				<h2 className="text-lg font-semibold leading-none text-sky-500">
					{item.name}
				</h2>
				<p className="text-xs">{item.location}</p>
				<span className="prose dark:prose-invert text-sm">
					{item.description}
				</span>
			</div>
			{item.links && item.links.length > 0 && (
				<div className="py-1.5 flex flex-row flex-wrap items-start gap-3">
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
		<section id="about">
			<div className="flex flex-col items-center justify-center space-y-4 text-center">
				<div className="space-y-1.5">
					<h2 className="text-3xl font-bold text-sky-500 tracking-tighter sm:text-5xl">
						My Career
					</h2>
					<p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Have a look at my career timeline, you will find educations and jobs
						I have done.
					</p>
				</div>
			</div>

			<ul className="mb-4 ml-4 divide-y divide-dashed border-l">
				{timelineItems.map((item) => (
					<TimelineItem key={item.id} item={item} />
				))}
			</ul>

			<p className="w-full justify-end flex space-x-0.5">
				<span>Do you need a more comprehensive look?</span>
				<Link href="/cv" className="text-sky-500 font-semibold">
					Get my CV
				</Link>
			</p>
		</section>
	);
};

export { CareerTimeline };
