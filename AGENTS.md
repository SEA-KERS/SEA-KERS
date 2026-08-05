# Repository Guidelines

## Setup Commands

- `pnpm install` — install dependencies.
- `pnpm dev` — run the local Cloudflare-compatible development server.
- `pnpm build` — build the client and Worker, prerender routes, and type-check.
- `pnpm lint` — run Oxlint.
- `pnpm typecheck` — run strict TypeScript checks.
- `pnpm test` — run the Vitest suites.
- `pnpm validate` — lint + typecheck + test + build in one go.
- `pnpm preview` — preview the production build locally.
- `pnpm deploy` — build and deploy with Wrangler.
- `pnpm deploy:cache` — deploy the turbo remote-cache Worker.
- `pnpm cms:scan` / `pnpm cms:upload` / `pnpm cms:generate` — image CMS workflows (see below).
- Tests live in the `@sea-kers/web` package (`*.test.ts` / `*.test.tsx`); add new suites there.

## Remote Build Cache

- All turbo tasks (`lint`, `typecheck`, `test`, `build`) are cached remotely by a
  custom Cloudflare Worker + R2 bucket (`tools/turbo-cache`, deployed at
  `sea-kers-turbo-cache.pramoda9-2-2004.workers.dev`).
- `turbo.json` hardcodes the Worker `apiUrl` and `teamId`; only the auth token is
  external. To use the remote cache locally, set the `TURBO_TOKEN` env var (token
  lives in `tools/turbo-cache/.env`, gitignored). E.g. `setx TURBO_TOKEN <value>`
  or export it in your shell profile.
- The Worker implements the Vercel remote-cache protocol: `GET /v8/artifacts/status`
  (must return `200` or turbo disables the cache), `HEAD`/`GET`/`PUT`
  `/v8/artifacts/{hash}` with `Authorization: Bearer <token>`, and `OPTIONS`
  preflight. Task hashes are 16 hex chars; do not tighten the hash regex below `{16,}`.
- CI (`deploy.yml`) restores `node_modules/.cache/turbo` and passes
  `TURBO_API`/`TURBO_TOKEN`/`TURBO_TEAM` as GitHub secrets. Add/rotate them in
  repo Settings > Secrets.

## Image CMS

- `tools/cms` is a TUI + CLI that indexes local source images, encodes each
  image to 3 sizes (480/960/1920, clamped to the source width) × 3 formats
  (avif/webp/jpeg), uploads to R2, and generates
  `apps/web/src/data/imageRegistry.ts` (do not edit by hand).
- Run `pnpm cms:scan` to index sources, `pnpm cms:upload` to encode + upload
  variants, `pnpm cms:generate` to regenerate the registry from the manifest
  (JSON at `tools/cms/data/manifest.json`). The TUI is `pnpm cms`.
- Source images are NOT committed. Drop new images into `apps/web/public/images`
  (gitignored) and run `pnpm cms:scan`, or re-upload existing ones from
  `tools/cms/data/originals` (gitignored). Published images are served from R2
  via `IMAGE_BASE_URL` (`https://img.team-seakers.com`); credentials live in
  `tools/cms/.env` (gitignored).
- `ResponsiveImage` uses `IMAGE_REGISTRY` when a record is uploaded; otherwise it
  falls back to the legacy `<img>` + srcset path via `src/utils/images.ts`.

## Code Style

- Use strict TypeScript only; do not add JavaScript or use `any` without justification.
- Prefer small, focused modules and follow DRY and SOLID principles without premature abstraction.
- Keep routes in `src/routes`, reusable UI in `src/components`, data in `src/data`, configuration in `src/config`, and shared types in `src/types.ts` or beside their domain.
- Keep browser-only APIs inside effects or event handlers so SSR remains hydration-safe.
- Do not edit `src/routeTree.gen.ts`; TanStack Router generates it.

## Git Commits and Pull Requests

- Use focused Conventional Commits, such as `feat:`, `fix:`, `refactor:`, `docs:`, or `chore:`.
- Keep commits reviewable and avoid mixing unrelated changes.
- PRs should explain intent, list verification performed, link relevant issues, and include screenshots for visible UI changes.
- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before requesting review.
