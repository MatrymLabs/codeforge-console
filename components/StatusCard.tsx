import { Fragment } from "react";
import type { StatusCard as Card } from "@/lib/types";

const BADGE: Record<string, string> = { ok: "OK", watch: "WATCH", fail: "FAIL", info: "INFO" };

export function StatusCard({ card }: { card: Card }) {
  const rows = Object.entries(card.rows);
  return (
    <article className="card" aria-labelledby={`card-${card.key}`}>
      <h2 id={`card-${card.key}`}>{card.title}</h2>
      <span className={`badge ${card.status}`}>{BADGE[card.status] ?? "?"}</span>
      <p className="headline">{card.headline}</p>
      <p className="detail">{card.detail}</p>
      {rows.length > 0 && (
        <dl className="rows">
          {rows.map(([label, value]) => (
            <Fragment key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}
        </dl>
      )}
    </article>
  );
}
