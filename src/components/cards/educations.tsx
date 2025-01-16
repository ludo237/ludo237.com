import Link from "next/link";
import { getEducations } from "~/actions/cv";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

const EducationsCard = async () => {
	const educations = await getEducations();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-sky-500">Education</CardTitle>
				<CardDescription>
					<span>Where did I study.</span>
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-9">
				{educations.map((edu) => (
					<div key={edu.id} className="flex items-center gap-3">
						<div className="grow space-y-0.5">
							<h4 className="font-medium leading-none text-sky-500">
								{edu.name}
							</h4>
							<small className="ml-auto text-xs text-zinc-600 dark:text-zinc-400">
								{edu.description}
							</small>
						</div>
					</div>
				))}
			</CardContent>
			<CardFooter className="flex justify-end">
				<Link href="/cv">
					<CardDescription className="text-sm">
						Check out my complete curriculum
					</CardDescription>
				</Link>
			</CardFooter>
		</Card>
	);
};

export { EducationsCard };
