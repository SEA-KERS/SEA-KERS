# Team SEA-KERS Website

The official Team SEA-KERS website showcases hackathon victories, engineering projects, the team, and its mission.

It uses TanStack Start with streaming SSR on Cloudflare Workers. The codebase is strict TypeScript, Vite runs inside the Workers runtime through Cloudflare's adapter, and pnpm manages dependencies.

## Local development

Requirements: Node.js 20.19 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` for local configuration. `VITE_SITE_URL` is required for absolute production canonical, Open Graph, robots, and sitemap URLs. `VITE_CLOUDFLARE_ANALYTICS_TOKEN` is optional and enables Cloudflare Web Analytics when set.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm audit:lighthouse
```

`pnpm validate` runs lint, type checking, tests, and the production build. `pnpm preview` runs the production Worker build locally.

## Cloudflare Workers

Authenticate once, then deploy:

```bash
pnpm dlx wrangler login
pnpm deploy
```

Generate TypeScript declarations after adding or changing Cloudflare bindings:

```bash
pnpm cf-typegen
```

Worker settings live in `wrangler.jsonc`; the fetch entry is `src/server.ts`. The Worker serves `robots.txt` and `sitemap.xml` and applies production security headers.

## Design

The visual language, theme tokens, typography, accessibility constraints, and asset requirements live in [`DESIGN.md`](./DESIGN.md).

## License

Licensed under the MIT Open Source Protocol.