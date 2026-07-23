# Repository Guidelines

## Setup Commands

- `pnpm install` — install dependencies.
- `pnpm dev` — run the local Cloudflare-compatible development server.
- `pnpm build` — build the client and Worker, prerender routes, and type-check.
- `pnpm lint` — run Oxlint.
- `pnpm typecheck` — run strict TypeScript checks.
- `pnpm preview` — preview the production build locally.
- `pnpm deploy` — build and deploy with Wrangler.
- Tests are not configured yet; add a `test` script with the first test suite.

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
