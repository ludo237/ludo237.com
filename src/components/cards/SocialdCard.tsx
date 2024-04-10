'use client';
import {
  Github,
  Gitlab,
  Layers,
  Linkedin,
  QrCode,
  Send,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { ContactForm } from '~/components/ContactForm';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui';
import { useMediaQuery } from '~/hooks/useMediaQuery';

const ContactMeDesktopDialog: FC<{ open: boolean; setOpen: any }> = ({
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          Contact me
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Send me a message</DialogTitle>
          <DialogDescription>
            Be sure to specify why you&apos;re contacting me. I&apos;ll get back
            to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
};

const ContactMeMobileDialog: FC<{ open: boolean; setOpen: any }> = ({
  open,
  setOpen,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' size='sm'>
          Contact me
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Send me a message</DrawerTitle>
          <DrawerDescription>
            Be sure to specify why you&apos;re contacting me. I&apos;ll get back
            to you as soon as possible.
          </DrawerDescription>
          <ContactForm />
        </DrawerHeader>
        <DrawerFooter className='py-3' />
      </DrawerContent>
    </Drawer>
  );
};

const SocialCard: FC = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

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
          <Link
            href='https://www.ideaqr.com/ludo237'
            target='_blank'
            title='IdeaQR'
          >
            <QrCode className='size-6 text-emerald-500' />
          </Link>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        {isDesktop ? (
          <ContactMeDesktopDialog open={open} setOpen={setOpen} />
        ) : (
          <ContactMeMobileDialog open={open} setOpen={setOpen} />
        )}
      </CardFooter>
    </Card>
  );
};

export { SocialCard };
