import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { getProjects } from "~/actions/cv";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

const ProjectsCard: FC = async () => {
	const proejcts = await getProjects();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-sky-500">Projects</CardTitle>
				<CardDescription>My most notable projects</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{proejcts.map((p, index) => (
						<div className="group/post flex items-center py-1.5" key={p.id}>
							<div className="grow space-y-0.5">
								{p.external && (
									<a
										href={p.url}
										target="_blank"
										rel="noreferrer"
										className="flex items-center space-x-1.5 font-medium leading-none text-sky-500 group-hover/post:underline"
									>
										<ExternalLink className="size-3" />
										<span>{p.name}</span>
									</a>
								)}

								{!p.external && (
									<Link
										href={p.url}
										className="flex items-center space-x-1.5 font-medium leading-none text-sky-500 group-hover/post:underline"
									>
										<span>{p.name}</span>
									</Link>
								)}
								<p className="text-sm text-zinc-600 dark:text-zinc-200">
									{p.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export { ProjectsCard };
