import Link from 'next/link';
import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';

const BlogCard: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Latest Blog</CardTitle>
        <CardDescription>There are 237 posts to read</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Work in progress...</p>
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
