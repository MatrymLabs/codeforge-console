import type { BlueprintSummary } from "@/lib/types";

export function BlueprintList({ blueprints }: { blueprints: BlueprintSummary[] }) {
  if (blueprints.length === 0) {
    return <p className="detail">No blueprints filed yet.</p>;
  }
  return (
    <ul className="bp-list" aria-label="Blueprints">
      {blueprints.map((b) => (
        <li key={b.blueprint_id} className="bp-item">
          <h2>{b.title}</h2>
          <span className={`badge ${b.status}`}>{b.status.toUpperCase()}</span>
          <p className="detail">{b.intent}</p>
          <p className="bp-meta">
            {b.requirement_count} requirement{b.requirement_count === 1 ? "" : "s"}
          </p>
        </li>
      ))}
    </ul>
  );
}
