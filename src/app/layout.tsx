import {Analytics} from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/next";
import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import "~/app/globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Hey I am Claudio Ludovico",
  description: "Software Engineer | Consultant | Entrepeneur | Bodybuilder. Book me for a call if you are interesting in my services.",
};

export default function RootLayout(props: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="h-screen">
        {props.children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
