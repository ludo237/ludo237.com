import Header from '@/components/header';
import SeoHead from '@/components/seo-head';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useInitials } from '@/hooks/use-initials';
import { EloquentResource } from '@/types';
import { JobExperience, Language, Project, School } from '@/types/model';
import { format, formatDistanceStrict } from 'date-fns';

interface CurriculumProps {
    jobs: EloquentResource<JobExperience[]>;
    languages: EloquentResource<Language[]>;
    projects: EloquentResource<Project[]>;
    schools: EloquentResource<School[]>;
}

const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
    <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-primary">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
    </div>
);

const CvJob = ({ job }: { job: JobExperience }) => {
    return (
        <Card className="transition-all hover:shadow-md">
            <CardContent className="p-6">
                <div className="flex gap-4">
                    <Avatar className="size-12 border-2 border-primary/20">
                        <AvatarImage src={job.avatar} alt={job.company} />
                        <AvatarFallback className="bg-primary/10 font-semibold text-primary">{useInitials()(job.company)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                        <div>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <h3 className="cursor-pointer text-lg font-semibold text-primary hover:underline">{job.company}</h3>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-primary">{job.company}</h4>
                                        <p className="text-sm text-muted-foreground">{job.companyDescription}</p>
                                        <div className="text-xs text-muted-foreground">
                                            <span>
                                                Started {format(new Date(job.startedAt), 'MMMM yyyy')}
                                                {job.endedAt && ` • Ended ${format(new Date(job.endedAt), 'MMMM yyyy')}`}
                                            </span>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                            <p className="font-medium text-sky-600 dark:text-sky-400">{job.role}</p>
                            <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{formatDistanceStrict(job.endedAt ? new Date(job.endedAt) : new Date(), new Date(job.startedAt))}</span>
                                <span>•</span>
                                <span>{job.location}</span>
                            </div>
                        </div>

                        <p className="leading-relaxed text-muted-foreground">{job.roleDescription}</p>

                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-primary">Skills & Technologies</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {job.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {job.urls && job.urls.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {job.urls.map((url) => (
                                    <Button key={url.id} variant="outline" size="sm" asChild>
                                        <a href={url.href} target="_blank" rel="noopener noreferrer">
                                            {url.name}
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const CvEducation = ({ school }: { school: School }) => (
    <Card className="transition-all hover:shadow-md">
        <CardContent className="p-6">
            <div className="flex gap-4">
                <Avatar className="size-12 border-2 border-primary/20">
                    <AvatarImage src={school.avatar} alt={school.name} />
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary">{useInitials()(school.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-primary">{school.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                            {format(new Date(school.startedAt), 'MMMM yyyy')} - {format(new Date(school.endedAt), 'MMMM yyyy')}
                        </span>
                        <span>•</span>
                        <span>{school.location}</span>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">{school.description}</p>

                    {school.urls && school.urls.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {school.urls.map((url) => (
                                <Button key={url.id} variant="outline" size="sm" asChild>
                                    <a href={url.href} target="_blank" rel="noopener noreferrer">
                                        {url.name}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </CardContent>
    </Card>
);

const CvProject = ({ project }: { project: Project }) => (
    <Card className="h-full transition-all hover:shadow-md">
        <CardContent className="flex h-full flex-col p-6">
            <div className="flex-grow space-y-3">
                <h3 className="text-lg font-semibold text-primary">{project.name}</h3>
                <p className="leading-relaxed text-muted-foreground">{project.description}</p>
            </div>

            {project.urls && project.urls.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.urls.map((url) => (
                        <Button key={url.id} variant="outline" size="sm" asChild className="text-xs">
                            <a href={url.href} target="_blank" rel="noopener noreferrer" className="max-w-full truncate" title={url.name}>
                                {url.name}
                            </a>
                        </Button>
                    ))}
                </div>
            )}
        </CardContent>
    </Card>
);

const getLanguageProficiency = (experience: string): number => {
    switch (experience.toLowerCase()) {
        case 'native':
            return 100;
        case 'fluent':
            return 90;
        case 'intermediate':
            return 70;
        case 'beginner':
            return 40;
        default:
            return 50;
    }
};

const CvLanguage = ({ language }: { language: Language }) => (
    <Card className="transition-all hover:shadow-md">
        <CardContent className="p-4">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-primary">{language.name}</h3>
                    <Badge variant="secondary" className="capitalize">
                        {language.experience}
                    </Badge>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Proficiency</span>
                        <span>{getLanguageProficiency(language.experience)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary/30">
                        <div
                            className="h-2 rounded-full bg-primary transition-all duration-300"
                            style={{ width: `${getLanguageProficiency(language.experience)}%` }}
                        />
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function Curriculum({ jobs, languages, projects, schools }: CurriculumProps) {
    return (
        <>
            <SeoHead />
            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <Header />

                <div className="space-y-3 px-4 md:mx-auto md:px-0">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('home')}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>CV</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <Card className="border-2 border-primary/20">
                        <CardHeader className="space-y-4 text-center">
                            <CardTitle className="text-3xl font-bold text-primary">Curriculum Vitae</CardTitle>
                            <CardDescription className="mx-auto max-w-2xl text-base leading-relaxed">
                                Aiming to connect people through free services and automation. Invest into big ideas and bold people and help them
                                growing as a family. To take on the bold, everyone need a deep seated desire to direct their own lives.
                            </CardDescription>
                            <div className="pt-4">
                                <Button variant="default" size="lg" asChild>
                                    <a href="/resume_latest.pdf" title="download my resume in pdf" download>
                                        Download PDF Version
                                    </a>
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>

                    <div className="space-y-6">
                        <SectionHeader title="Professional Experience" description="My career journey and professional accomplishments" />
                        <div className="space-y-6">
                            {jobs.data.map((job) => (
                                <CvJob key={job.id} job={job} />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <SectionHeader title="Education" description="My academic background and qualifications" />
                        <div className="space-y-6">
                            {schools.data.map((school) => (
                                <CvEducation key={school.id} school={school} />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <SectionHeader title="Featured Projects" description="Notable projects and contributions" />
                        <div className="grid gap-6 md:grid-cols-2">
                            {projects.data.map((project) => (
                                <CvProject key={project.id} project={project} />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <SectionHeader title="Languages" description="Spoken language proficiencies" />
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {languages.data.map((language) => (
                                <CvLanguage key={language.id} language={language} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
