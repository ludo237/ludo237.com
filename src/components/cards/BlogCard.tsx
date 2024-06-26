import Link from 'next/link';
import { FC } from 'react';
import { getPosts } from '~/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui';

const BlogCard: FC = async () => {
  const posts = await getPosts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Blog</CardTitle>
        <CardDescription>
          There are {posts.length} posts to read
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {posts.map((post) => (
            <div className='group/post flex items-center py-3' key={post.slug}>
              <div className='grow space-y-0.5'>
                <Link href={`/blog/${post.slug}`}>
                  <p className='font-medium leading-none text-sky-500 group-hover/post:underline'>
                    {post.title}
                  </p>
                </Link>
                <p className=' text-sm text-zinc-600  dark:text-zinc-200'>
                  {post.summary}
                </p>
              </div>
              <small className='ml-auto text-xs text-zinc-400 opacity-0 group-hover/post:opacity-100'>
                {post.date.toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Link href='/blog'>
          <CardDescription className='text-sm'>
            Read the rest of the articles
          </CardDescription>
        </Link>
      </CardFooter>
    </Card>
  );
};

export { BlogCard };
