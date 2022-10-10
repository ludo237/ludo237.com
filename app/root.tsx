import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react";
import type { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";
import type { LinksFunction, MetaFunction } from "@remix-run/server-runtime";
import React from "react";
import Link from "~/components/Link";
import Navbar from "~/components/Navbar";
import styles from "~/styles/tailwind.css";

export const meta: MetaFunction = () => {
  return {
    charset: "utf-8",
    title: "Claudio Ludovico | Entrepreneur - Coder - Futurist",
    description: "I am part of the ‘90s generation that grew up with the Fresh Prince of Bel Air and the Commodore 64.",
    viewport: "width=device-width,initial-scale=1",
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ];
};

const Document = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang={"en"} className={"min-h-screen"}>
    <head>
      <Meta />
      <Links />
    </head>
    <body className={"min-h-screen overflow-y-scroll bg-white dark:bg-slate-800"}>
    <img src={"http://canarytokens.com/static/aevoojbj4ls6zag57ux4k2tef/contact.php"} className={"opacity-0 w-0 h-0"} />
    {children}
    <Scripts />
    </body>
    </html>
  );
};

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();

  return (
    <Document>
      <main className={"min-h-screen grid place-items-center"}>
        <div className={"max-w-max mx-auto"}>
          <div className={"sm:flex"}>
            <p className={"text-4xl font-extrabold text-sky-600 dark:text-sky-300 sm:text-5xl"}>{caught.status}</p>
            <div className={"sm:ml-6"}>
              <div className={"sm:border-l sm:border-slate-200 sm:pl-6"}>
                <h1 className={"text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight sm:text-5xl"}>{caught.statusText}</h1>
                <p className={"mt-1 text-base space-x-1 text-slate-600 dark:text-slate-100"}>
                  <span>Please check the URL in the address bar and try again,</span>
                  <Link to={"/"} title={"home"} color={"sky"}>go Home.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Document>
  );
};

export default function App () {
  return (
    <Document>
      <main className={"relative pt-3 pb-16 sm:pb-24"}>
        <Navbar />
        <div className={"mt-10 sm:mt-20"}>
          <div className={"mx-auto max-w-7xl"}>
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <LiveReload />
      </main>
    </Document>
  );
}
