import Header from '@/components/header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useInitials } from '@/hooks/use-initials';
import { JobExperience, Language, Project, School } from '@/types/model';
import { Head, Link } from '@inertiajs/react';
import { format, formatDistanceStrict } from 'date-fns';
import { CalendarDays, DownloadCloudIcon } from 'lucide-react';

interface CurriculumProps {
    jobs: JobExperience[];
    languages: Language[];
    projects: Project[];
    schools: School[];
}

const CvJob = ({ job }: { job: JobExperience }) => {
    return (
        <div className="flex items-center gap-x-3">
            <Avatar className="hidden size-9 sm:flex">
                <AvatarImage src={job.avatar} alt={job.company_description} />
                <AvatarFallback>{useInitials()(job.company)}</AvatarFallback>
            </Avatar>
            <div className="grow space-y-1.5">
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <h4 className="leading-none font-medium text-sky-500">{job.company}</h4>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-3">
                            <div className="space-y-1.5">
                                <h4 className="font-bold">{job.company}</h4>
                                <p className="text-xs font-semibold">{job.company_description}</p>
                                <div className="flex items-center">
                                    <CalendarDays className="size-3 pr-2 opacity-70" />{' '}
                                    <small className="text-xs text-slate-600 dark:text-slate-400">
                                        Joined {format(job.started_at, 'MMMM yyyy')}
                                        {job.ended_at && ` - Left ${format(job.ended_at, 'MMMM yyyy')}`}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <div className="space-x-1.5">
                    <span className="text-sm text-sky-600 dark:text-sky-200">{job.role}</span>{' '}
                    <small className="text-slate-500">({formatDistanceStrict(job.ended_at || new Date(), job.started_at)})</small>
                </div>

                <p className="prose-slate-600 dark:prose-slate-200 prose prose-sm">{job.role_description}</p>

                <div>
                    {job.skills.map((s) => (
                        <Badge variant="outline" className="mr-1.5 mb-1.5" key={s}>
                            {s}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Curriculum({ jobs, languages, projects, schools }: CurriculumProps) {
    return (
        <>
            <Head title="My Curriculum" />
            <main className="flex min-h-[100dvh] flex-col space-y-9 py-9">
                <div className="max-w-2xl space-y-6 px-4 md:mx-auto md:px-0 lg:max-w-3xl xl:max-w-5xl">
                    <Header />
                    <Breadcrumb>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Curriculum Vitae</CardTitle>
                            <CardDescription>
                                <span className="pr-1">
                                    Aiming to connect people through free services and automation. Invest into big ideas and bold people and help them
                                    growing as a family. To take on the bold, everyone need a deep seated desire to direct their own lives.
                                </span>
                                <small className="text-sky-600">Pro tip: hover on each company to see more details.</small>
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
                                                    <h4 className="leading-none font-medium text-sky-500">{project.name}</h4>
                                                    <small className="ml-auto text-xs text-zinc-600 dark:text-zinc-400">{project.description}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="educations">
                                    <AccordionTrigger>Education</AccordionTrigger>
                                    <AccordionContent className="space-y-6">
                                        {schools.map((edu) => (
                                            <div key={edu.id} className="flex items-center gap-3">
                                                <div className="grow space-y-0.5">
                                                    <h4 className="leading-none font-medium text-sky-500">{edu.name}</h4>
                                                    <small className="ml-auto text-xs text-zinc-600 dark:text-zinc-400">{edu.description}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="languages">
                                    <AccordionTrigger>Spoken languages</AccordionTrigger>
                                    <AccordionContent className="space-y-6">
                                        {languages.map((language) => (
                                            <div key={language.name} className="flex items-center gap-3">
                                                <div className="grow space-y-0.5">
                                                    <h4 className="leading-none font-medium text-sky-500">{language.name}</h4>
                                                    <small className="ml-auto text-xs text-zinc-600 dark:text-zinc-400">{language.experience}</small>
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
                                    <Link href="/resume_latest.pdf" title="download my resume in pdf">
                                        Need a PDF version?
                                        <DownloadCloudIcon className={'size-8 px-1.5'} />
                                        Download it
                                    </Link>
                                </Button>
                            </CardDescription>
                        </CardFooter>
                    </Card>
                </div>
            </main>
        </>
    );
}
