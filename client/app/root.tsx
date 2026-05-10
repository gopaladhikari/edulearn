import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import "./app.css";
import { GlobalError } from "./routes/error-boundary";
import { useAuthSync } from "./hooks/sync-auth";
import { Loading } from "./components/loading";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();

  // State can be "idle", "loading", or "submitting"
  const isLoading = navigation.state === "loading";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />

        <main>{isLoading ? <Loading /> : children}</main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useAuthSync();
  return <Outlet />;
}

export function ErrorBoundary() {
  return <GlobalError />;
}
