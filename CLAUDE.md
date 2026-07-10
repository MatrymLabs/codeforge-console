# CLAUDE.md - CodeForge Console

A React + TypeScript + Next.js (App Router) front end for the CodeForge readiness API. It is
the decoupled counterpart to CodeForge's server-rendered dashboard: a standalone SPA that
consumes the typed `/api/status` contract.

## Conventions

- **Typed contract lives in `lib/types.ts`** and mirrors CodeForge's Pydantic `StatusPayload`.
  Keep them in sync; a schema change should surface as a TypeScript error.
- **Layering:** `app/page.tsx` (fetch) -> `components/StatusBoard` -> `components/StatusCard`.
  Components take data as props and never fetch. The only fetch layer is `lib/api.ts`.
- **Tests never touch the network:** component tests render from `lib/fixture.ts`; the client
  test stubs `fetch`. Mirrors CodeForge's "boundaries are seams, mocked in tests."
- **Prove every change:** `npm run lint && npm run typecheck && npm test && npm run build` must
  all pass before commit. Branch -> PR -> CI green -> merge; never commit to `main`.
- **No fancy dashes** (em/en dashes) in prose, comments, or commits - a spaced hyphen or a
  comma instead. Conventional Commits.
- **Honesty:** the page falls back to labeled demo data when the live API is down; never
  present demo data as live.

## Env

- `NEXT_PUBLIC_API_BASE` - the CodeForge API base URL (default `http://localhost:8000`).
