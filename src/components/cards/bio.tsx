import Link from 'next/link';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

const BioCard: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>About Me</CardTitle>
        <CardDescription>
          I am part of the 90s generation that grew up with the Fresh Prince of
          Bel Air and the Commodore 64
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex w-full items-center justify-center pb-3'>
          <Avatar className='size-28'>
            <AvatarImage src='https://avatars.githubusercontent.com/u/921500?v=4' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <article className='prose prose-sm py-3 dark:text-zinc-200'>
          <p>
            Being self-taught, I believe in life-long learning and knowledge
            sharing.
          </p>
          <p>
            I also deeply believe in the open-source movement and try to give
            back to the community whenever I can.
          </p>
          <p>
            Understanding how stuff works is a passion that I showed since the
            age of 5, in fact I tried to assemble and disassemble both Commodore
            and Amiga with very positive results, but with a lot of anger as
            well.
          </p>
        </article>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Link href='/blog/my-story'>
          <CardDescription className='text-sm'>
            Read more about my story
          </CardDescription>
        </Link>
      </CardFooter>
    </Card>
  );
};

export { BioCard };
