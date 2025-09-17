import AdminLayout from '@/components/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

interface Stats {
    posts: number;
    published_posts: number;
    job_experiences: number;
}

interface Props {
    stats: Stats;
}

export default function Dashboard({ stats }: Props) {
    return (
        <>
            <Head title="Dashboard" />

            <AdminLayout
                title="Admin Dashboard"
                description="Manage your content and track your progress"
                breadcrumbs={[{ label: 'Dashboard', active: true }]}
            >
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="transition-all hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                                    <span className="text-lg font-bold text-primary">P</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                                    <p className="text-2xl font-bold text-primary">{stats.posts}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-all hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-secondary/10">
                                    <span className="text-lg font-bold text-secondary">✓</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Published</p>
                                    <p className="text-2xl font-bold text-secondary">{stats.published_posts}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-all hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10">
                                    <span className="text-lg font-bold text-accent-foreground">E</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Experiences</p>
                                    <p className="text-2xl font-bold text-accent-foreground">{stats.job_experiences}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-primary">Quick Actions</CardTitle>
                            <CardDescription>Common management tasks</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button asChild className="w-full justify-start">
                                <Link href={route('posts.create')}>Create New Post</Link>
                            </Button>
                            <Button asChild variant="secondary" className="w-full justify-start">
                                <Link href={route('job-experiences.create')}>Add Job Experience</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-primary">Navigation</CardTitle>
                            <CardDescription>Access your content management areas</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link
                                href={route('posts.index')}
                                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm transition-all hover:bg-muted"
                            >
                                <span>Manage Posts</span>
                                <Badge variant="secondary">{stats.posts}</Badge>
                            </Link>
                            <Link
                                href={route('job-experiences.index')}
                                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm transition-all hover:bg-muted"
                            >
                                <span>Manage Job Experiences</span>
                                <Badge variant="secondary">{stats.job_experiences}</Badge>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">Content Overview</CardTitle>
                        <CardDescription>Summary of your published content</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.posts > 0 ? (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Publication Rate</span>
                                    <span className="text-sm font-medium">
                                        {stats.posts > 0 ? Math.round((stats.published_posts / stats.posts) * 100) : 0}%
                                    </span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted">
                                    <div
                                        className="h-2 rounded-full bg-primary transition-all duration-300"
                                        style={{ width: `${stats.posts > 0 ? (stats.published_posts / stats.posts) * 100 : 0}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.published_posts} of {stats.posts} posts published
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Start creating content to see your publication statistics here.</p>
                        )}
                    </CardContent>
                </Card>
            </AdminLayout>
        </>
    );
}
