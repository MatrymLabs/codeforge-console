// The API client layer (Page -> component -> THIS -> CodeForge API). Kept thin: fetch,
// validate the response is OK, return the typed payload. No UI concerns leak in here.

import type { BlueprintSummary, StatusPayload } from "./types";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export async function fetchStatus(base: string = API_BASE): Promise<StatusPayload> {
  const res = await fetch(`${base}/api/status`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`CodeForge API returned ${res.status} from ${base}/api/status`);
  }
  return (await res.json()) as StatusPayload;
}

export async function fetchBlueprints(base: string = API_BASE): Promise<BlueprintSummary[]> {
  const res = await fetch(`${base}/api/blueprints`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`CodeForge API returned ${res.status} from ${base}/api/blueprints`);
  }
  return (await res.json()) as BlueprintSummary[];
}
