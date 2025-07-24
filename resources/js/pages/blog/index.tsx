import Header from '@/components/header';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseMarkdown, readingTime } from '@/lib/utils';
import { Post } from '@/types/model';
import { Head, Link } from '@inertiajs/react';
import { formatDistanceToNowStrict } from 'date-fns';

interface BlogIndexProps {
    posts: Post[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
    return (
        <>
            <Head title="My Toughts" />
            <main className="mx-auto max-w-6xl px-4 py-9">
                <Header />

                <div className="mx-auto max-w-2xl py-3">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Blog</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="py-3">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="block transition-transform hover:scale-105">
                                <Card className="h-full pt-0">
                                    <div className="relative overflow-hidden rounded-t-md">
                                        <AspectRatio ratio={16 / 9}>
                                            <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
                                        </AspectRatio>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="line-clamp-2 text-sky-500">{post.title}</CardTitle>
                                        <CardDescription>
                                            {readingTime(post.content)} minutes read • Written{' '}
                                            {formatDistanceToNowStrict(post.created_at, { addSuffix: true })}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className="prose prose-sm line-clamp-3 max-w-none dark:prose-invert"
                                            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.excerpt) }}
                                        />
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-muted-foreground">No blog posts found.</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
