import Header from '@/components/header';
import SeoHead from '@/components/seo-head';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { parseMarkdown, readingTime } from '@/lib/utils';
import { EloquentResource } from '@/types';
import { Post } from '@/types/model';
import { Link } from '@inertiajs/react';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { FC } from 'react';

interface BlogShowProps {
    post: EloquentResource<Post>;
}

const ArticleHeader: FC<{ post: Post }> = ({ post }) => (
    <div className="space-y-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <img src={post.cover} alt={post.title} className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="space-y-3">
            <h1 className="text-3xl leading-tight font-bold text-primary md:text-4xl">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-xs">
                        {readingTime(post.content)} min read
                    </Badge>
                </div>
                <span>•</span>
                <time className="text-sm">Published {format(new Date(post.publishedAt || post.createdAt || ''), 'MMMM dd, yyyy')}</time>
                <span>•</span>
                <span className="text-sm">{formatDistanceToNowStrict(new Date(post.createdAt || ''), { addSuffix: true })}</span>
            </div>

            {post.excerpt && (
                <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: parseMarkdown(post.excerpt) }} />
            )}
        </div>
    </div>
);

const ArticleNavigation = () => (
    <div className="flex justify-center">
        <Button variant="outline" asChild>
            <Link href={route('blog.index')}>← Back to Blog</Link>
        </Button>
    </div>
);

export default function BlogShow(props: BlogShowProps) {
    const post = props.post.data;

    return (
        <>
            <SeoHead />

            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <Header />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={route('home')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={route('blog.index')}>Blog</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1">{post.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <ArticleHeader post={post} />

                <Separator className="my-9" />

                <article>
                    <div
                        className="prose max-w-none prose-gray md:prose-lg dark:prose-invert prose-headings:text-primary prose-a:text-primary prose-blockquote:border-primary/30 prose-blockquote:text-muted-foreground prose-strong:text-primary prose-code:text-primary prose-pre:bg-secondary/30 prose-th:text-primary prose-img:rounded-lg prose-img:shadow-sm"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                    />
                </article>

                <div className="flex flex-col space-y-6 py-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-3 text-center">
                                <h3 className="font-semibold text-primary">Thanks for reading!</h3>
                                <p className="text-muted-foreground">
                                    I hope you found this article helpful. Feel free to share it with others who might benefit.
                                </p>
                                <div className="flex justify-center gap-3">
                                    <Button variant="outline" size="sm" asChild>
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Share on X
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild>
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Share on LinkedIn
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <ArticleNavigation />
                </div>
            </main>
        </>
    );
}
