import Header from '@/components/header';
import SeoHead from '@/components/seo-head';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseMarkdown, readingTime } from '@/lib/utils';
import { Post } from '@/types/model';
import { formatDistanceToNowStrict } from 'date-fns';

interface BlogShowProps {
    post: Post;
}

export default function BlogShow({ post }: BlogShowProps) {
    return (
        <>
            <SeoHead />

            <main className="flex min-h-[100dvh] flex-col space-y-9 py-9">
                <div className="max-w-2xl space-y-6 px-4 md:mx-auto md:px-0 lg:max-w-3xl xl:max-w-5xl">
                    <Header />
                    <Breadcrumb>
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
                    <Card className="overflow-hidden p-0">
                        <img src={post.cover} alt={post.title} className="aspect-video" />
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
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
