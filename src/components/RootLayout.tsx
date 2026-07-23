import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router'

export function RootLayout() {
  return (
    <html lang="en" className="light">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}

export function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] px-6 py-24 text-[var(--text-main)]">
      <div className="mx-auto max-w-2xl border-2 border-[var(--border-main)] bg-[var(--bg-surface)] p-8 shadow-[6px_6px_0px_rgba(0,0,0,0.8)]">
        <p className="font-mono text-sm font-bold text-[#da261c]">
          404 // ROUTE_NOT_FOUND
        </p>
        <h1 className="mt-3 font-headline text-4xl font-black uppercase">
          Signal lost
        </h1>
        <p className="mt-3 text-[var(--text-muted)]">
          The page you requested does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block border-2 border-black bg-[#da261c] px-4 py-2 font-mono text-sm font-bold text-white"
        >
          Return home
        </Link>
      </div>
    </main>
  )
}
