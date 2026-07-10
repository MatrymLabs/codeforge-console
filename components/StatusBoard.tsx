import type { StatusPayload } from "@/lib/types";
import { StatusCard } from "./StatusCard";

export function StatusBoard({ status }: { status: StatusPayload }) {
  return (
    <section aria-label="Readiness board">
      <div className="grid">
        {status.cards.map((card) => (
          <StatusCard key={card.key} card={card} />
        ))}
      </div>
    </section>
  );
}
