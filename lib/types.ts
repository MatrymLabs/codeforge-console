// The typed contract, mirroring CodeForge's Pydantic StatusPayload (parts/dashboard.py).
// This is the payoff of the typed API: a TypeScript client generated from a documented
// OpenAPI schema. Kept in one place so a schema change surfaces as a compile error.

export interface StatusCard {
  key: string;
  title: string;
  status: "ok" | "watch" | "fail" | "info" | string;
  headline: string;
  detail: string;
  rows: Record<string, string>;
}

export interface StatusPayload {
  engine: string;
  cards: StatusCard[];
}

// Mirrors CodeForge's Pydantic BlueprintSummary (GET /api/blueprints).
export interface BlueprintSummary {
  blueprint_id: string;
  title: string;
  intent: string;
  status: string;
  requirement_count: number;
}
