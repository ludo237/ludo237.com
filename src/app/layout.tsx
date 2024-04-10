import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import '~/app/globals.css';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Hey I am Claudio Ludovico',
  description:
    'Software Engineer | Consultant | Entrepeneur | Bodybuilder. Book me for a call if you are interesting in my services.',
};

export default function RootLayout(props: LayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className='h-screen dark:bg-zinc-800'>
        <div className='mx-auto flex max-w-3xl flex-col items-center gap-2 py-4 md:py-6 md:pb-4 lg:py-12 lg:pb-10'>
          <h1 className='text-balance text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] dark:text-zinc-200'>
            Claudio Ludovico
          </h1>
          <small className='text-sky-600 dark:text-sky-500'>
            also known as ludo237
          </small>
          <span className='text-muted-foreground max-w-[750px] text-center text-lg sm:text-xl dark:text-zinc-300'>
            Entrepreneur - Engineer - Optimistic for the Future
          </span>
        </div>
        {props.children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
