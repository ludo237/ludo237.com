import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EloquentResource, SharedPageProps } from '@/types';
import { JobExperience } from '@/types/model';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';

interface PageProps extends SharedPageProps {
    jobExperiences: EloquentResource<JobExperience[]>;
}

const JobExperienceCard = ({ jobExperience, onDelete }: { jobExperience: JobExperience; onDelete: (jobExperience: JobExperience) => void }) => (
    <Card className="transition-all hover:shadow-md">
        <CardContent className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                    <div className="flex items-start space-x-4">
                        {jobExperience.avatar && (
                            <img src={jobExperience.avatar} alt={jobExperience.company} className="size-12 rounded-lg object-cover" />
                        )}
                        <div className="flex-1">
                            <h3 className="line-clamp-1 text-lg font-semibold text-primary">{jobExperience.role}</h3>
                            <p className="text-sm font-medium text-foreground">{jobExperience.company}</p>
                            {jobExperience.location && <p className="text-xs text-muted-foreground">{jobExperience.location}</p>}
                        </div>
                    </div>

                    {jobExperience.roleDescription && <p className="line-clamp-2 text-sm text-muted-foreground">{jobExperience.roleDescription}</p>}

                    {jobExperience.skills && jobExperience.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {jobExperience.skills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                            {jobExperience.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{jobExperience.skills.length - 3} more
                                </Badge>
                            )}
                        </div>
                    )}

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <Badge variant={jobExperience.endedAt ? 'secondary' : 'default'}>
                            {jobExperience.endedAt ? 'Past Role' : 'Current Role'}
                        </Badge>
                        <span>•</span>
                        <time>
                            {format(new Date(jobExperience.startedAt), 'MMM yyyy')} -{' '}
                            {jobExperience.endedAt ? format(new Date(jobExperience.endedAt), 'MMM yyyy') : 'Present'}
                        </time>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href={route('job-experiences.edit', jobExperience.id)}>Edit</Link>
                    </Button>
                    <Button
                        onClick={() => onDelete(jobExperience)}
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function JobExperiencesIndex({ jobExperiences }: PageProps) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    const deleteJobExperience = (jobExperience: JobExperience) => {
        if (confirm('Are you sure you want to delete this job experience?')) {
            router.delete(route('job-experiences.destroy', jobExperience.id));
        }
    };

    return (
        <>
            <Head title="Job Experiences" />

            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <div className="space-y-6">
                    <header className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-wide text-primary">Job Experiences</h1>
                            <p className="mt-2 text-muted-foreground">Manage your professional work history</p>
                        </div>
                        <Button onClick={handleLogout} variant="outline" size="sm">
                            Logout
                        </Button>
                    </header>

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('dashboard')}>Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Job Experiences</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                            <Link
                                href={route('posts.index')}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                            >
                                Posts
                            </Link>
                            <Link
                                href={route('job-experiences.index')}
                                className="rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
                            >
                                Job Experiences
                            </Link>
                        </div>
                        <Button asChild>
                            <Link href={route('job-experiences.create')}>Add Experience</Link>
                        </Button>
                    </div>

                    {jobExperiences.data.length === 0 ? (
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-primary">No job experiences found</CardTitle>
                                <CardDescription>Start building your professional profile by adding your work history.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Button asChild>
                                    <Link href={route('job-experiences.create')}>Add Your First Experience</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {jobExperiences.data.map((jobExperience) => (
                                <JobExperienceCard key={jobExperience.id} jobExperience={jobExperience} onDelete={deleteJobExperience} />
                            ))}
                        </div>
                    )}

                    {jobExperiences.meta.total > jobExperiences.meta.per_page && (
                        <div className="flex items-center justify-center space-x-2">
                            {jobExperiences.meta.links.map((link, index) => (
                                <Button key={index} asChild variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url}>
                                    <Link href={link.url!}>{link.label}</Link>
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
