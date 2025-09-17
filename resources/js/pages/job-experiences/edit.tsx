import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

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
}

interface Props {
    jobExperience: JobExperience;
}

export default function EditJobExperience({ jobExperience }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        avatar: jobExperience.avatar || '',
        company: jobExperience.company || '',
        company_description: jobExperience.company_description || '',
        location: jobExperience.location || '',
        role: jobExperience.role || '',
        role_description: jobExperience.role_description || '',
        skills: jobExperience.skills || [],
        started_at: jobExperience.started_at ? jobExperience.started_at.split('T')[0] : '',
        ended_at: jobExperience.ended_at ? jobExperience.ended_at.split('T')[0] : '',
    });

    const [skillInput, setSkillInput] = useState('');

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('job-experiences.update', jobExperience.id));
    };

    const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const skill = skillInput.trim();
            if (skill && !data.skills.includes(skill)) {
                setData('skills', [...data.skills, skill]);
                setSkillInput('');
            }
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setData(
            'skills',
            data.skills.filter((skill) => skill !== skillToRemove),
        );
    };

    return (
        <>
            <Head title="Edit Job Experience" />

            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <div className="space-y-6">
                    <header className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-wide text-primary">Edit Job Experience</h1>
                            <p className="mt-2 text-muted-foreground">Update your professional experience details</p>
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
                                <BreadcrumbLink href={route('job-experiences.index')}>Job Experiences</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-primary">Job Experience Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                                            Company <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="Company name"
                                            required
                                        />
                                        {errors.company && <p className="mt-2 text-sm text-destructive">{errors.company}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="role" className="mb-2 block text-sm font-medium text-foreground">
                                            Role <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="role"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="Job title/role"
                                            required
                                        />
                                        {errors.role && <p className="mt-2 text-sm text-destructive">{errors.role}</p>}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="location" className="mb-2 block text-sm font-medium text-foreground">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="City, Country"
                                        />
                                        {errors.location && <p className="mt-2 text-sm text-destructive">{errors.location}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="avatar" className="mb-2 block text-sm font-medium text-foreground">
                                            Company Logo URL
                                        </label>
                                        <input
                                            type="url"
                                            id="avatar"
                                            value={data.avatar}
                                            onChange={(e) => setData('avatar', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="https://example.com/logo.png"
                                        />
                                        {errors.avatar && <p className="mt-2 text-sm text-destructive">{errors.avatar}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="company_description" className="mb-2 block text-sm font-medium text-foreground">
                                        Company Description
                                    </label>
                                    <textarea
                                        id="company_description"
                                        rows={3}
                                        value={data.company_description}
                                        onChange={(e) => setData('company_description', e.target.value)}
                                        className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                        placeholder="Brief description of the company"
                                    />
                                    {errors.company_description && <p className="mt-2 text-sm text-destructive">{errors.company_description}</p>}
                                </div>

                                <div>
                                    <label htmlFor="role_description" className="mb-2 block text-sm font-medium text-foreground">
                                        Role Description
                                    </label>
                                    <textarea
                                        id="role_description"
                                        rows={4}
                                        value={data.role_description}
                                        onChange={(e) => setData('role_description', e.target.value)}
                                        className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                        placeholder="Key responsibilities and achievements"
                                    />
                                    {errors.role_description && <p className="mt-2 text-sm text-destructive">{errors.role_description}</p>}
                                </div>

                                <div>
                                    <label htmlFor="skills" className="mb-2 block text-sm font-medium text-foreground">
                                        Skills & Technologies
                                    </label>
                                    <input
                                        type="text"
                                        id="skills"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={addSkill}
                                        className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                        placeholder="Type skill and press Enter or comma to add"
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">Press Enter or comma to add skills</p>
                                    {data.skills.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {data.skills.map((skill) => (
                                                <Badge key={skill} variant="secondary" className="text-sm">
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSkill(skill)}
                                                        className="ml-2 text-muted-foreground hover:text-destructive"
                                                    >
                                                        ×
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                    {errors.skills && <p className="mt-2 text-sm text-destructive">{errors.skills}</p>}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="started_at" className="mb-2 block text-sm font-medium text-foreground">
                                            Start Date <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="started_at"
                                            value={data.started_at}
                                            onChange={(e) => setData('started_at', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            required
                                        />
                                        {errors.started_at && <p className="mt-2 text-sm text-destructive">{errors.started_at}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="ended_at" className="mb-2 block text-sm font-medium text-foreground">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            id="ended_at"
                                            value={data.ended_at}
                                            onChange={(e) => setData('ended_at', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                        />
                                        <p className="mt-1 text-xs text-muted-foreground">Leave empty for current position</p>
                                        {errors.ended_at && <p className="mt-2 text-sm text-destructive">{errors.ended_at}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <Button asChild variant="outline">
                                        <Link href={route('job-experiences.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Experience'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
