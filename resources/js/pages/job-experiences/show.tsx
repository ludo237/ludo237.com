import AdminLayout from '@/components/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

interface JobExperience {
    id: string;
    avatar: string | null;
    company: string;
    company_description: string | null;
    location: string | null;
    role: string;
    role_description: string | null;
    skills: string[] | null;
    started_at: string;
    ended_at: string | null;
    created_at: string;
    updated_at: string;
    urls?: Array<{
        id: string;
        url: string;
        title: string;
    }>;
}

interface Props {
    jobExperience: JobExperience;
}

export default function ShowJobExperience({ jobExperience }: Props) {
    return (
        <>
            <Head title={`View Experience: ${jobExperience.role} at ${jobExperience.company}`} />

            <AdminLayout
                title="View Job Experience"
                description="Review job experience details and information"
                breadcrumbs={[
                    { label: 'Dashboard', href: route('dashboard') },
                    { label: 'Job Experiences', href: route('job-experiences.index') },
                    { label: 'View', active: true },
                ]}
            >
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {jobExperience.avatar && (
                                    <img src={jobExperience.avatar} alt={jobExperience.company} className="size-16 rounded-lg object-cover" />
                                )}
                                <div className="space-y-1">
                                    <CardTitle className="text-primary">{jobExperience.role}</CardTitle>
                                    <p className="text-lg font-medium text-foreground">{jobExperience.company}</p>
                                    {jobExperience.location && <p className="text-sm text-muted-foreground">{jobExperience.location}</p>}
                                </div>
                            </div>
                            <Badge variant={jobExperience.endedAt ? 'secondary' : 'default'}>
                                {jobExperience.endedAt ? 'Past Role' : 'Current Role'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="mb-1 text-sm font-medium text-foreground">Start Date</h4>
                                <p className="text-sm text-muted-foreground">{format(new Date(jobExperience.startedAt), 'MMMM yyyy')}</p>
                            </div>
                            <div>
                                <h4 className="mb-1 text-sm font-medium text-foreground">End Date</h4>
                                <p className="text-sm text-muted-foreground">
                                    {jobExperience.endedAt ? format(new Date(jobExperience.endedAt), 'MMMM yyyy') : 'Present'}
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-1 text-sm font-medium text-foreground">Duration</h4>
                                <p className="text-sm text-muted-foreground">
                                    {(() => {
                                        const start = new Date(jobExperience.startedAt);
                                        const end = jobExperience.endedAt ? new Date(jobExperience.endedAt) : new Date();
                                        const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
                                        const years = Math.floor(months / 12);
                                        const remainingMonths = months % 12;

                                        if (years > 0 && remainingMonths > 0) {
                                            return `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
                                        } else if (years > 0) {
                                            return `${years} year${years > 1 ? 's' : ''}`;
                                        } else {
                                            return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
                                        }
                                    })()}
                                </p>
                            </div>
                        </div>

                        {jobExperience.companyDescription && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-foreground">Company Description</h4>
                                <p className="text-sm leading-relaxed text-muted-foreground">{jobExperience.companyDescription}</p>
                            </div>
                        )}

                        {jobExperience.roleDescription && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-foreground">Role Description</h4>
                                <div className="prose prose-sm max-w-none">
                                    <p className="text-sm leading-relaxed text-muted-foreground">{jobExperience.roleDescription}</p>
                                </div>
                            </div>
                        )}

                        {jobExperience.skills && jobExperience.skills.length > 0 && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-foreground">Skills & Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {jobExperience.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {jobExperience.urls && jobExperience.urls.length > 0 && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-foreground">Related URLs</h4>
                                <div className="space-y-2">
                                    {jobExperience.urls.map((url) => (
                                        <div key={url.id} className="flex items-center space-x-2">
                                            <a
                                                href={url.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-primary hover:underline"
                                            >
                                                {url.title || url.url}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="border-t border-border pt-4 text-xs text-muted-foreground">
                            <p>Created: {format(new Date(jobExperience.createdAt), 'PPpp')}</p>
                            <p>Updated: {format(new Date(jobExperience.updatedAt), 'PPpp')}</p>
                        </div>

                        <div className="flex justify-end space-x-3 border-t border-border pt-4">
                            <Button asChild variant="outline">
                                <Link href={route('job-experiences.index')}>Back to Experiences</Link>
                            </Button>
                            <Button asChild>
                                <Link href={route('job-experiences.edit', jobExperience.id)}>Edit Experience</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </AdminLayout>
        </>
    );
}
