# Team SEA-KERS Website

The official website for Team SEA-KERS, showcasing hackathon victories, open-source projects, the engineering roster, and the collective's mission.

The app uses TanStack Start with streaming server-side rendering on Cloudflare Workers. Source code is strict TypeScript, Vite development runs inside the Workers runtime through Cloudflare's Vite plugin, and pnpm manages dependencies.

## Local development

Requirements: Node.js 20.19 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm preview
```

`pnpm preview` runs the production Worker build locally.

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

Worker settings live in `wrangler.jsonc`; the fetch entry is `src/server.ts`.

## License

Licensed under the MIT Open Source Protocol.
