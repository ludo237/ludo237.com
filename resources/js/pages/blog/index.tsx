import Header from '@/components/header';
import SeoHead from '@/components/seo-head';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseMarkdown, readingTime } from '@/lib/utils';
import { EloquentResource } from '@/types';
import { Post } from '@/types/model';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { FC } from 'react';

interface BlogIndexProps {
    posts: EloquentResource<Post[]>;
}

const BlogPostCard: FC<{ post: Post }> = ({ post }) => (
    <Link href={`/blog/${post.slug}`} className="group block">
        <Card className="h-full overflow-hidden">
            <img src={post.cover} alt={post.title} className="aspect-video w-full object-cover" loading="lazy" />
            <CardHeader className="space-y-3">
                <CardTitle className="line-clamp-2 text-xl leading-tight font-bold group-hover:text-primary">{post.title}</CardTitle>
                <CardDescription className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                        {readingTime(post.content)} min read
                    </Badge>
                    <span>•</span>
                    <time className="text-xs">{format(new Date(post.publishedAt || post.createdAt || ''), 'MMM dd, yyyy')}</time>
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-justify text-muted-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(post.excerpt) }} />
            </CardContent>
        </Card>
    </Link>
);

const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
    <div className="mb-12 space-y-3 text-center">
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        {description && <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>}
    </div>
);

export default function BlogIndex({ posts }: BlogIndexProps) {
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
                            <BreadcrumbPage>Blog</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <SectionHeader title="Blog" description="Thoughts, insights, and stories from my journey as a developer and entrepreneur." />

                <div className="grid gap-9 md:grid-cols-2 lg:gap-10">
                    {posts.data.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    );
}
