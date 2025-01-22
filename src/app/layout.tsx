import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import '~/app/global.css';

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
      <body className='mx-auto min-h-screen max-w-screen-2xl overflow-y-scroll bg-white px-6 py-12 font-sans antialiased sm:py-2 dark:bg-slate-800'>
        {props.children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
