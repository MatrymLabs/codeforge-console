import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBoard } from "./StatusBoard";
import { DEMO_STATUS } from "@/lib/fixture";
import type { StatusPayload } from "@/lib/types";

describe("StatusBoard", () => {
  it("renders one card per status entry", () => {
    render(<StatusBoard status={DEMO_STATUS} />);
    expect(screen.getByText("Career evidence")).toBeInTheDocument();
    expect(screen.getByText("QualityGate audit")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(DEMO_STATUS.cards.length);
  });

  it("shows the headline and detail from the data", () => {
    render(<StatusBoard status={DEMO_STATUS} />);
    expect(screen.getByText("126,000 cmd/s")).toBeInTheDocument();
    expect(screen.getByText("every filed object is ready")).toBeInTheDocument();
  });

  it("renders a status badge, not just a color (accessibility)", () => {
    const one: StatusPayload = {
      engine: "codeforge",
      cards: [
        { key: "x", title: "Gate", status: "fail", headline: "1 gap", detail: "d", rows: {} },
      ],
    };
    render(<StatusBoard status={one} />);
    expect(screen.getByText("FAIL")).toBeInTheDocument();
  });

  it("renders detail rows when present and omits them when empty", () => {
    render(<StatusBoard status={DEMO_STATUS} />);
    expect(screen.getByText("reuse domains")).toBeInTheDocument(); // hardware has rows
    // perf card has no rows: its headline renders but no dt/dd for it
    expect(screen.queryByText("buckets")).not.toBeInTheDocument();
  });
});
