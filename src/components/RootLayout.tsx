import { HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { SITE_CONFIG } from "../config/site";

export function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Outlet />
        {SITE_CONFIG.cloudflareAnalyticsToken ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token: SITE_CONFIG.cloudflareAnalyticsToken,
            })}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}

export function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="grid min-h-screen place-items-center bg-(--background) px-6 py-24 text-(--foreground)"
    >
      <div className="surface-card w-full max-w-2xl p-8">
        <p className="section-kicker">404 / Route not found</p>
        <h1 className="mt-3 font-headline text-4xl font-bold">Signal lost</h1>
        <p className="mt-3 text-(--muted-foreground)">
          The page you requested does not exist.
        </p>
        <Link to="/" className="button-primary mt-6">
          Return home
        </Link>
      </div>
    </main>
  );
}