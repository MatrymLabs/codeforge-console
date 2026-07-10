// Demo data: lets the site render (and tests run) without a live CodeForge API. It is
// clearly labeled as demo in the UI when the live API is unreachable, so nothing overstates.

import type { BlueprintSummary, StatusPayload } from "./types";

export const DEMO_STATUS: StatusPayload = {
  engine: "codeforge",
  cards: [
    {
      key: "career",
      title: "Career evidence",
      status: "ok",
      headline: "30/36 proven",
      detail: "every cited proof exists on disk",
      rows: { proven: "30", partial: "5", missing: "1" },
    },
    {
      key: "qa",
      title: "QualityGate audit",
      status: "ok",
      headline: "95/95 pass",
      detail: "every filed object is ready",
      rows: { pass: "95", watch: "0", fail: "0" },
    },
    {
      key: "hardware",
      title: "Hardware store",
      status: "info",
      headline: "7 parts",
      detail: "reusable parts, each with a mirrored test twin",
      rows: { parts: "7", "reuse domains": "12" },
    },
    {
      key: "perf",
      title: "Performance",
      status: "ok",
      headline: "126,000 cmd/s",
      detail: "median 7.4us (engine tick)",
      rows: {},
    },
  ],
};

export const DEMO_BLUEPRINTS: BlueprintSummary[] = [
  {
    blueprint_id: "npc_combat",
    title: "NPCs that fight back",
    intent: "Turn the training dummy's one-sided combat into a real exchange.",
    status: "draft",
    requirement_count: 5,
  },
];
