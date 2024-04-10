import { formatDistanceToNowStrict } from 'date-fns';
import * as marked from 'marked';
import Image from 'next/image';
import { FC } from 'react';
import { getPost } from '~/actions';
import {
  AspectRatio,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui';
import { readingTime } from '~/lib/utils';

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
