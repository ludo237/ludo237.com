import AdminLayout from '@/components/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/types/model';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

interface Props {
    post: Post;
}

export default function ShowPost({ post }: Props) {
    return (
        <>
            <Head title={`View Post: ${post.title}`} />

            <AdminLayout
                title="View Post"
                description="Review post content and details"
                breadcrumbs={[
                    { label: 'Dashboard', href: route('dashboard') },
                    { label: 'Posts', href: route('posts.index') },
                    { label: 'View', active: true },
                ]}
            >
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <CardTitle className="text-primary">{post.title}</CardTitle>
                                {post.excerpt && <p className="text-muted-foreground">{post.excerpt}</p>}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Badge variant={post.publishedAt ? 'default' : 'secondary'}>{post.publishedAt ? 'Published' : 'Draft'}</Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="mb-1 text-sm font-medium text-foreground">Created</h4>
                                <p className="text-sm text-muted-foreground">{format(new Date(post.createdAt), 'PPpp')}</p>
                            </div>
                            <div>
                                <h4 className="mb-1 text-sm font-medium text-foreground">Last Updated</h4>
                                <p className="text-sm text-muted-foreground">{format(new Date(post.updatedAt), 'PPpp')}</p>
                            </div>
                            {post.publishedAt && (
                                <div>
                                    <h4 className="mb-1 text-sm font-medium text-foreground">Published</h4>
                                    <p className="text-sm text-muted-foreground">{format(new Date(post.publishedAt), 'PPpp')}</p>
                                </div>
                            )}
                            <div>
                                <h4 className="mb-1 text-sm font-medium text-foreground">Slug</h4>
                                <p className="font-mono text-sm text-muted-foreground">{post.slug}</p>
                            </div>
                        </div>

                        {post.cover && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-foreground">Cover Image</h4>
                                <div className="overflow-hidden rounded-lg border border-border">
                                    <img src={post.cover} alt={post.title} className="h-48 w-full object-cover" />
                                </div>
                            </div>
                        )}

                        <div>
                            <h4 className="mb-2 text-sm font-medium text-foreground">Content</h4>
                            <div className="prose prose-sm max-w-none rounded-lg border border-border bg-muted/50 p-4">
                                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">{post.content}</pre>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 border-t border-border pt-4">
                            <Button asChild variant="outline">
                                <Link href={route('posts.index')}>Back to Posts</Link>
                            </Button>
                            <Button asChild>
                                <Link href={route('posts.edit', post.id)}>Edit Post</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </AdminLayout>
        </>
    );
}
