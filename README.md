# CodeForge Console

A **React + TypeScript + Next.js** front end for the [CodeForge](https://github.com/MatrymLabs/codeforge)
readiness API. It renders CodeForge's live evidence board (career, QA, hardware, performance)
by consuming the typed `/api/status` contract - the decoupled, mainstream full-stack
architecture (Next.js/React/TypeScript front end talking to a FastAPI/Pydantic back end).

## Why this repo exists

CodeForge already serves a server-rendered dashboard. This is the **separated** counterpart:
a standalone SPA that proves the front/back split employers ask for. The typed API contract
CodeForge publishes (Pydantic `StatusPayload`, documented in OpenAPI) becomes a TypeScript
interface here, so a schema change surfaces as a compile error, not a runtime surprise.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
```

Point it at a running CodeForge API (default `http://localhost:8000`):

```bash
# in the codeforge repo:  codeforge api
NEXT_PUBLIC_API_BASE=http://localhost:8000 npm run dev
```

If the live API is unreachable, the page renders clearly-labeled **demo data** instead of
failing - so the deployed site always shows something, and never overstates what is live.

## Test it

```bash
npm run lint          # eslint (next config)
npm run typecheck     # tsc --noEmit
npm test              # vitest + React Testing Library (component + client, no network)
npm run build         # next production build
```

All four run in CI on every push (`.github/workflows/ci.yml`).

## Design choices

- **Typed contract in one place** (`lib/types.ts`) mirrors CodeForge's Pydantic
  `StatusPayload`. The API client (`lib/api.ts`) is the only layer that fetches.
- **Layered, not scattered:** `page.tsx` (fetch) -> `StatusBoard` -> `StatusCard`. Components
  take data as props and never fetch, so they are trivially testable.
- **Boundaries are seams, mocked in tests:** component tests render from a fixture; the client
  test stubs `fetch`. Tests never touch the network (mirrors CodeForge's discipline).
- **Accessible:** semantic `article`/`section`, `aria-label`led regions, status conveyed by a
  text badge (`OK`/`WATCH`/`FAIL`/`INFO`), not color alone.
- **Graceful degradation:** a demo fallback with an honest banner when the API is down.

## Security note

`npm audit` reports 2 **moderate** transitive advisories in Next.js's build-time `postcss`.
The only available remediation is a breaking Next.js change, which is deferred; there are no
high or critical advisories. Tracked, not hidden.

## Status

MIT licensed. A companion to CodeForge; the back end and the full engineering story live at
[github.com/MatrymLabs/codeforge](https://github.com/MatrymLabs/codeforge).
