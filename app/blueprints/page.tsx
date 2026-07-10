import { BlueprintList } from "@/components/BlueprintList";
import { API_BASE, fetchBlueprints } from "@/lib/api";
import { DEMO_BLUEPRINTS } from "@/lib/fixture";
import type { BlueprintSummary } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function BlueprintsPage() {
  let blueprints: BlueprintSummary[] = DEMO_BLUEPRINTS;
  let live = false;
  try {
    blueprints = await fetchBlueprints();
    live = true;
  } catch {
    // Live API unreachable: fall back to demo data, labeled as such.
  }

  return (
    <main>
      <header>
        <h1>Blueprints</h1>
        <p className="subtitle">
          Plans filed in CodeForge, from the typed <code>/api/blueprints</code> contract.
        </p>
        {!live && (
          <p className="demo-banner" role="status">
            Showing demo data - the live API at <code>{API_BASE}</code> is unreachable.
          </p>
        )}
      </header>
      <BlueprintList blueprints={blueprints} />
      <footer>
        Consumes <code>{API_BASE}/api/blueprints</code>. Source:{" "}
        <a href="https://github.com/MatrymLabs/codeforge">CodeForge</a>.
      </footer>
    </main>
  );
}
