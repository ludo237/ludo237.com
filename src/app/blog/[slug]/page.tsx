import { formatDistanceToNowStrict } from 'date-fns';
import * as marked from 'marked';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { FC } from 'react';
import { getPost } from '~/actions';
import { AspectRatio } from '~/components/ui/AspectRatio';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';
import { readingTime } from '~/lib/utils';

export const revalidate = 60 * 60 * 24;

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    openGraph: {
      images: [post.cover, ...previousImages],
    },
  };
}

const BlogSlugPage: FC<{ params: { slug: string } }> = async ({ params }) => {
  const post = await getPost(params.slug);

  const markdownContent = marked.parse(post.content);

  return (
    <div className='mx-auto max-w-2xl'>
      <Card>
        <div className='relative overflow-hidden rounded-t-md'>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className='object-cover'
            />
          </AspectRatio>
        </div>
        <CardHeader>
          <CardTitle className='text-sky-500'>{post.title}</CardTitle>

          <CardDescription>
            {readingTime(post.content)} minutes read. Written{' '}
            {formatDistanceToNowStrict(post.date, { addSuffix: true })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className='prose prose-sm md:prose-base dark:prose-invert'
            dangerouslySetInnerHTML={{ __html: markdownContent }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSlugPage;
