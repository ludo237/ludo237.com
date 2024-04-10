import { Github, Gitlab, Layers, Linkedin, Send, Twitter } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui';

const SocialCard: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Socials</CardTitle>
        <CardDescription>My public profiles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center space-x-3'>
          <Link href='https://t.me/ludo237' target='_blank' title='Telegram'>
            <Send className='size-6 text-sky-300' />
          </Link>
          <Link
            href='https://twitter.com/realLudo237'
            target='_blank'
            title='Twitter'
          >
            <Twitter className='size-6 text-sky-400' />
          </Link>
          <Link
            href='https://www.linkedin.com/in/ludo237/'
            target='_blank'
            title='Linkedin'
          >
            <Linkedin className='size-6 text-sky-600' />
          </Link>
          <Link
            href='https://stackoverflow.com/users/1202367/ludo237'
            target='_blank'
            title='Stackoverflow'
          >
            <Layers className='size-6 text-orange-600' />
          </Link>
          <Link
            href='https://github.com/ludo237'
            target='_blank'
            title='Github'
          >
            <Github className='size-6 text-zinc-800' />
          </Link>
          <Link
            href='https://gitlab.com/ludo237'
            target='_blank'
            title='Gitlab'
          >
            <Gitlab className='size-6 text-orange-700' />
          </Link>
        </div>
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
