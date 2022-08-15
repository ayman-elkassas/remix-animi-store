import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

// import tailwind css
import styles from "./tailwind.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles, // tailwind css
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Cartoon App",
  viewport: "width=device-width,initial-scale=1",
  description: "New Remix App",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
