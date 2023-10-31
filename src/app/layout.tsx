import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "src/app/globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Ludo237.com",
  description: "",
};

export default function RootLayout(props: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        {props.children}
      </body>
    </html>
  );
}
