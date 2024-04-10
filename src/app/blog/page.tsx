import { formatDistanceToNowStrict } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { getPosts } from '~/actions';
import {
  AspectRatio,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui';
import { readingTime } from '~/lib/utils';

const Post: FC<{ post: Post }> = ({ post }) => {
  return (
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
        <CardTitle className='text-sky-500 hover:underline'>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription>
          {readingTime(post.content)} minutes read. Written{' '}
          {formatDistanceToNowStrict(post.date, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>{post.summary}</CardContent>
    </Card>
  );
};

const BlogPage: FC = async () => {
  const posts = await getPosts();

  return (
    <div className='mx-3 grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:mx-auto'>
      {posts.map((post) => (
        <Post key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default BlogPage;
