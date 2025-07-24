import Header from '@/components/header';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseMarkdown, readingTime } from '@/lib/utils';
import { Post } from '@/types/model';
import { Head } from '@inertiajs/react';
import { formatDistanceToNowStrict } from 'date-fns';

interface BlogShowProps {
    post: Post;
}

export default function BlogShow({ post }: BlogShowProps) {
    return (
        <>
            <Head title="My Toughts" />
            <main className="mx-auto max-w-2xl py-9">
                <Header />

                <Breadcrumb className="py-3">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{post.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="mx-auto max-w-2xl py-3">
                    <Card className="pt-0">
                        <div className="relative overflow-hidden rounded-t-md">
                            <AspectRatio ratio={16 / 9}>
                                <img src={post.cover} alt={post.title} className="object-cover" />
                            </AspectRatio>
                        </div>
                        <CardHeader>
                            <CardTitle className="text-sky-500">{post.title}</CardTitle>

                            <CardDescription>
                                {readingTime(post.content)} minutes read.Written {formatDistanceToNowStrict(post.created_at, { addSuffix: true })}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="prose prose-sm max-w-none md:prose-base dark:prose-invert"
                                dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
