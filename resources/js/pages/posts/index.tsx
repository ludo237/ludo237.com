import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EloquentResource, SharedPageProps } from '@/types';
import { Post } from '@/types/model';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';

interface PageProps extends SharedPageProps {
    posts: EloquentResource<Post[]>;
}

const PostCard = ({ post, onDelete }: { post: Post; onDelete: (post: Post) => void }) => (
    <Card className="transition-all hover:shadow-md">
        <CardContent className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                    <div>
                        <h3 className="line-clamp-2 text-lg font-semibold text-primary">{post.title}</h3>
                        {post.excerpt && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>}
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <Badge variant={post.publishedAt ? 'default' : 'secondary'}>{post.publishedAt ? 'Published' : 'Draft'}</Badge>
                        <span>•</span>
                        <time>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</time>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href={route('posts.edit', post.id)}>Edit</Link>
                    </Button>
                    <Button
                        onClick={() => onDelete(post)}
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

export default function PostsIndex({ posts }: PageProps) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    const deletePost = (post: Post) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('posts.destroy', post.id));
        }
    };

    return (
        <>
            <Head title="Posts" />

            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <div className="space-y-6">
                    <header className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-wide text-primary">Posts</h1>
                            <p className="mt-2 text-muted-foreground">Manage your blog posts and articles</p>
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
                                <BreadcrumbPage>Posts</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                            <Link href={route('posts.index')} className="rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                                Posts
                            </Link>
                            <Link
                                href={route('job-experiences.index')}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                            >
                                Job Experiences
                            </Link>
                        </div>
                        <Button asChild>
                            <Link href={route('posts.create')}>Create Post</Link>
                        </Button>
                    </div>

                    {posts.data.length === 0 ? (
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-primary">No posts found</CardTitle>
                                <CardDescription>Start creating content by adding your first blog post.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Button asChild>
                                    <Link href={route('posts.create')}>Create Your First Post</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {posts.data.map((post) => (
                                <PostCard key={post.id} post={post} onDelete={deletePost} />
                            ))}
                        </div>
                    )}

                    {posts.meta.total > posts.meta.per_page && (
                        <div className="flex items-center justify-center space-x-2">
                            {posts.meta.links.map((link, index) => (
                                <Button key={index} asChild={!!link.url} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url}>
                                    {link.url ? (
                                        <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    )}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
