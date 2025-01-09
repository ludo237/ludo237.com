import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import '~/app/global.css';
import { Header } from '~/components/header';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Hey I am Claudio Ludovico',
  description:
    'Software Engineer | Consultant | Entrepeneur | Bodybuilder. Book me for a call if you are interesting in my services.',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout(props: LayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className='h-screen dark:bg-zinc-800'>
        <Header />
        {props.children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
