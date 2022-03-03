import {
  Links, LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./styles/tailwind.css";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ];
};

export default function App () {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="min-h-screen overflow-y-scroll bg-white dark:bg-slate-800">
    <Outlet />
    <ScrollRestoration />
    <LiveReload />
    <Scripts />
    </body>
    </html>
  );
}
