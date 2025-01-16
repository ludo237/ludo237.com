import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getProjects } from "~/actions/cv";

const ProjectsGrid = async () => {
	const projects = await getProjects();

	return (
		<section id="projects">
			<div className="space-y-9 w-full">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-1.5">
						<h2 className="text-3xl font-bold text-sky-500 dark:text-sky-600 tracking-tighter sm:text-5xl">
							Check out my latest work
						</h2>
						<p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
							I've worked on a variety of projects, from simple websites to
							complex web applications. Here are a few of my favorites.
						</p>
					</div>
				</div>

				<div className="space-y-3">
					{projects.map((p) => (
						<div className="group/post flex items-center py-1.5" key={p.id}>
							<div className="grow space-y-0.5">
								{p.external && (
									<a
										href={p.url}
										target="_blank"
										rel="noreferrer"
										className="flex items-center space-x-1.5 group-hover/post:underline"
									>
										<ExternalLink className="size-3 dark:text-sky-600" />
										<h2 className="text-lg font-semibold leading-none text-sky-500 dark:text-sky-600">
											{p.name}
										</h2>
									</a>
								)}

								{!p.external && (
									<Link
										href={p.url}
										className="flex items-center space-x-1.5 group-hover/post:underline"
									>
										<h2 className="text-lg font-semibold leading-none text-sky-500 dark:text-sky-600">
											{p.name}
										</h2>
									</Link>
								)}
								<p className="text-sm text-slate-700 dark:text-slate-400">
									{p.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export { ProjectsGrid };
