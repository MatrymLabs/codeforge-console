import { StatusBoard } from "@/components/StatusBoard";
import { API_BASE, fetchStatus } from "@/lib/api";
import { DEMO_STATUS } from "@/lib/fixture";
import type { StatusPayload } from "@/lib/types";

// Always render fresh: this is a live dashboard, not a static page.
export const dynamic = "force-dynamic";

export default async function Home() {
  let status: StatusPayload = DEMO_STATUS;
  let live = false;
  try {
    status = await fetchStatus();
    live = true;
  } catch {
    // Live API unreachable at request time: fall back to demo data, labeled as such.
  }

  return (
    <main>
      <header>
        <h1>CodeForge Console</h1>
        <p className="subtitle">A React + TypeScript front end for the CodeForge readiness API.</p>
        {!live && (
          <p className="demo-banner" role="status">
            Showing demo data - the live API at <code>{API_BASE}</code> is unreachable.
          </p>
        )}
      </header>
      <StatusBoard status={status} />
      <footer>
        Consumes the typed contract at <code>{API_BASE}/api/status</code>. Source:{" "}
        <a href="https://github.com/MatrymLabs/codeforge">CodeForge</a>.
      </footer>
    </main>
  );
}
