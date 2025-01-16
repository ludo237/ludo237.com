import { type ClassValue, clsx } from "clsx";
import {
	Github,
	Gitlab,
	Globe,
	Link,
	type LucideProps,
	Twitter,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const readingTime = (content: string): number => {
	//Matches words See https://regex101.com/r/q2Kqjg/6
	const words = content.match(/\w+/g)?.length || 0;
	return Math.ceil(words / 237);
};

export const formatTime = (seconds: number) => {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const addItemsToTimeline = (
	items: (Job | Education)[],
): TimelineItem[] => {
	const timeline: TimelineItem[] = [];
	for (const item of items) {
		const defaultObject: Partial<TimelineItem> = {
			id: crypto.randomUUID(),
			description: item.description,
			image: item.image,
			location: item.location,
			links: item.links,
			startDate: item.startedAt,
			endDate: item.endedAt,
		};

		if (Object.hasOwn(item, "company")) {
			defaultObject.name = (item as Job).company.name;
		} else {
			defaultObject.name = (item as Education).name;
		}

		timeline.push(defaultObject as TimelineItem);
	}

	return timeline;
};

export const mapTimelineIcon = (
	type: "website" | "github" | "gitlab" | "twitter",
): ForwardRefExoticComponent<
	Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
> => {
	if (type === "website") {
		return Globe;
	}

	if (type === "github") {
		return Github;
	}

	if (type === "gitlab") {
		return Gitlab;
	}

	if (type === "twitter") {
		return Twitter;
	}

	return Link;
};
