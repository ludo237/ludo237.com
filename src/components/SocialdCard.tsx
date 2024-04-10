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

const SocialCard: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Socials</CardTitle>
        <CardDescription>You can chat with me</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Work in progress...</p>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Link href='/contacts'>
          <CardDescription className='text-sm'>Contact me</CardDescription>
        </Link>
      </CardFooter>
    </Card>
  );
};

export { SocialCard };
