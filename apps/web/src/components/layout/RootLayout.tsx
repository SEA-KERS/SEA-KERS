import { HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { SITE_CONFIG } from "../../config/site";

const DIRECTION_CONTRACT = `SEA-KERS direction contract. THESIS: A world-stage engineering collective on a magazine cover, not a product dashboard: white ground, hairline rules, one crimson accent, oversized Archivo headlines, the particle caret mark as the centerpiece; refuses the SaaS hero-metric template and card grids. OWN-WORLD: White page, thin hairline rules, uppercase labels at 0.16em tracking, Archivo display type, deep crimson #DA261C as the primary accent and accent blue #0C1E8B for sparse emphasis, cinematic navy #030624 for the particle tile and closing dark chapters, editorial floats, image bleeds, asymmetry. STORY: The visitor reads the team like a cover story and acts by opening records and specifications. FIRST VIEWPORT: White canvas; left, a two-line oversized headline; right, the navy particle tile floating over an offset crimson block and a small accent-blue square; meta row beneath. FORM: Magazine cover split, pinned by the owner's design reference (DESIGN.md). FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.`;

export function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <div
          aria-hidden="true"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: `<!-- ${DIRECTION_CONTRACT} -->` }}
        />
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
      tabIndex={-1}
      className="grid min-h-screen place-items-center bg-(--background) px-6 py-24 text-(--foreground)"
    >
      <div className="editorial-panel w-full max-w-2xl p-8">
        <p className="kicker">404 / Route not found</p>
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
