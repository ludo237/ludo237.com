import { DownloadCloudIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
	getEducations,
	getJobs,
	getLanguages,
	getProjects,
} from "~/actions/cv";
import { CvJob } from "~/components/cv-job";
import { Header } from "~/components/sections/header";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export const metadata: Metadata = {
	title: "Ludo237 | CV",
	description: "A resume of my professional experience.",
};

const CvPage = async () => {
	const educations = await getEducations();
	const jobs = await getJobs();
	const projects = await getProjects();
	const languages = await getLanguages();

	return (
		<>
			<Header />

			<Breadcrumb className="py-3">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>CV</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<main className="mx-auto max-w-2xl py-3">
				<Card>
					<CardHeader>
						<CardTitle>Curriculum Vitae</CardTitle>
						<CardDescription>
							<span className="pr-1">
								Aiming to connect people through free services and automation.
								Invest into big ideas and bold people and help them growing as a
								family. To take on the bold, everyone need a deep seated desire
								to direct their own lives.
							</span>
							<small className="text-sky-600">
								Pro tip: hover on each company to see more details.
							</small>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Accordion type="single" collapsible defaultValue="jobs">
							<AccordionItem value="jobs">
								<AccordionTrigger>Job experiences</AccordionTrigger>
								<AccordionContent className="space-y-9">
									{jobs.map((job) => (
										<CvJob key={job.id} job={job} />
									))}
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="projects">
								<AccordionTrigger>Public Projects</AccordionTrigger>
								<AccordionContent className="space-y-6">
									{projects.map((project) => (
										<div key={project.name} className="flex items-center gap-3">
											<div className="grow space-y-0.5">
												<h4 className="font-medium leading-none text-sky-500">
													{project.name}
												</h4>
												<small className="ml-auto text-xs text-zinc-600 dark:text-zinc-400">
													{project.description}
												</small>
											</div>
										</div>
									))}
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="educations">
								<AccordionTrigger>Education</AccordionTrigger>
								<AccordionContent className="space-y-6">
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
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="languages">
								<AccordionTrigger>Spoken languages</AccordionTrigger>
								<AccordionContent className="space-y-6">
									{languages.map((language) => (
										<div
											key={language.name}
											className="flex items-center gap-3"
										>
											<div className="grow space-y-0.5">
												<h4 className="font-medium leading-none text-sky-500">
													{language.name}
												</h4>
												<small className="ml-auto text-xs text-zinc-600 dark:text-zinc-400">
													{language.experience}
												</small>
											</div>
										</div>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter>
						<CardDescription className="flex w-full justify-end">
							<Button variant="default" asChild>
								<Link
									href="/resume_latest.pdf"
									title="download my resume in pdf"
								>
									Need a PDF version?
									<DownloadCloudIcon className={"size-8 px-1.5"} />
									Download it
								</Link>
							</Button>
						</CardDescription>
					</CardFooter>
				</Card>
			</main>
		</>
	);
};

export default CvPage;
