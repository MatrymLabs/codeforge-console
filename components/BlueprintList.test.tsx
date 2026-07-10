import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlueprintList } from "./BlueprintList";
import { DEMO_BLUEPRINTS } from "@/lib/fixture";

describe("BlueprintList", () => {
  it("renders one item per blueprint with title, intent, and count", () => {
    render(<BlueprintList blueprints={DEMO_BLUEPRINTS} />);
    expect(screen.getByText("NPCs that fight back")).toBeInTheDocument();
    expect(screen.getByText(/Turn the training dummy/)).toBeInTheDocument();
    expect(screen.getByText("5 requirements")).toBeInTheDocument();
    expect(screen.getByText("DRAFT")).toBeInTheDocument();
  });

  it("singularizes the requirement count", () => {
    render(
      <BlueprintList
        blueprints={[
          { blueprint_id: "x", title: "X", intent: "y", status: "draft", requirement_count: 1 },
        ]}
      />,
    );
    expect(screen.getByText("1 requirement")).toBeInTheDocument();
  });

  it("shows an empty state when there are none", () => {
    render(<BlueprintList blueprints={[]} />);
    expect(screen.getByText(/No blueprints filed/)).toBeInTheDocument();
  });
});
