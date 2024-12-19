import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

//Components
import Footer from "./components/_footer";
import Header from "./components/_header";

//Styles
import globalStyles from "~/styles/styles.scss?url";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-screen">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col justify-between min-h-screen">
      <ScrollRestoration />
      <Scripts />
        <Header />
        <div className="container h-full py-8 flex-1">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
