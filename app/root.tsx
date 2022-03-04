import React from "react";
import {
  Links, LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useCatch,
} from "remix";
import { CatchBoundaryComponent } from "@remix-run/react/routeModules";
import type { MetaFunction } from "remix";
import styles from "./styles/tailwind.css";

export const meta: MetaFunction = () => {
  return {
    title: "Claudio Ludovico | Entrepreneur, Coder and Futurist",
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ];
};

const Document = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="min-h-screen overflow-y-scroll bg-white dark:bg-slate-800">
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
      <main className="min-h-screen grid place-items-center">
        <div className="max-w-max mx-auto">
          <div className="sm:flex">
            <p className="text-4xl font-extrabold text-sky-600 dark:text-sky-300 sm:text-5xl">{caught.status}</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-slate-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight sm:text-5xl">{caught.statusText}</h1>
                <p className="mt-1 text-base text-slate-600 dark:text-slate-100">Please check the URL in the address bar and try again.</p>
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
      <main>
        <Outlet />
        <ScrollRestoration />
        <LiveReload />
      </main>
    </Document>
  );
}
