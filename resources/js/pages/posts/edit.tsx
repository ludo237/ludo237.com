import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    cover: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    post: Post;
}

export default function EditPost({ post }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        cover: post.cover || '',
        published_at: post.published_at || '',
    });

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('posts.update', post.id));
    };

    return (
        <>
            <Head title="Edit Post" />

            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <div className="space-y-6">
                    <header className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-wide text-primary">Edit Post</h1>
                            <p className="mt-2 text-muted-foreground">Update your blog post content</p>
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
                                <BreadcrumbLink href={route('posts.index')}>Posts</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-primary">Post Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="mb-2 block text-sm font-medium text-foreground">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="Enter post title"
                                            required
                                        />
                                        {errors.title && <p className="mt-2 text-sm text-destructive">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-foreground">
                                            Excerpt
                                        </label>
                                        <input
                                            type="text"
                                            id="excerpt"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="Short description of the post"
                                        />
                                        {errors.excerpt && <p className="mt-2 text-sm text-destructive">{errors.excerpt}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="cover" className="mb-2 block text-sm font-medium text-foreground">
                                            Cover Image URL
                                        </label>
                                        <input
                                            type="url"
                                            id="cover"
                                            value={data.cover}
                                            onChange={(e) => setData('cover', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {errors.cover && <p className="mt-2 text-sm text-destructive">{errors.cover}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="content" className="mb-2 block text-sm font-medium text-foreground">
                                            Content
                                        </label>
                                        <textarea
                                            id="content"
                                            rows={12}
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="Write your post content here..."
                                            required
                                        />
                                        {errors.content && <p className="mt-2 text-sm text-destructive">{errors.content}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="published_at" className="mb-2 block text-sm font-medium text-foreground">
                                            Publish Date
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="published_at"
                                            value={data.published_at}
                                            onChange={(e) => setData('published_at', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                        />
                                        <p className="mt-1 text-xs text-muted-foreground">Leave empty to save as draft</p>
                                        {errors.published_at && <p className="mt-2 text-sm text-destructive">{errors.published_at}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <Button asChild variant="outline">
                                        <Link href={route('posts.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Post'}
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
