import {
	CalendarIcon,
	FileTextIcon,
	GlobeIcon,
	InputIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "~/components/ui/bento-grid";

const features = [
	{
		Icon: FileTextIcon,
		name: "IdeaQR",
		description: "We automatically save your files as you type.",
		href: "/",
		cta: "Learn more",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "col-span-3 lg:col-span-1",
	},
	{
		Icon: InputIcon,
		name: "Digie",
		description: "Search through all your files in one place.",
		href: "/",
		cta: "Learn more",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "col-span-3 lg:col-span-2",
	},
	{
		Icon: GlobeIcon,
		name: "Sudoku",
		description: "Supports 100+ languages and counting.",
		href: "/",
		cta: "Learn more",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "col-span-3 lg:col-span-2",
	},
	{
		Icon: CalendarIcon,
		name: "Temporary Email",
		description: "Use the calendar to filter your files by date.",
		href: "/",
		cta: "Learn more",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "col-span-3 lg:col-span-1",
	},
];

const ProjectsBentoGrid = () => {
	return (
		<section id="projects">
			<div className="space-y-9 w-full">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-1.5">
						<h2 className="text-3xl font-bold text-sky-500 tracking-tighter sm:text-5xl">
							Check out my latest work
						</h2>
						<p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							I've worked on a variety of projects, from simple websites to
							complex web applications. Here are a few of my favorites.
						</p>
					</div>
				</div>

				<BentoGrid>
					{features.map((feature) => (
						<BentoCard key={feature.name} {...feature} />
					))}
				</BentoGrid>
			</div>
		</section>
	);
};

export { ProjectsBentoGrid };
