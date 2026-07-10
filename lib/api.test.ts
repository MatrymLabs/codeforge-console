import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchBlueprints, fetchStatus } from "./api";
import { DEMO_BLUEPRINTS, DEMO_STATUS } from "./fixture";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchStatus", () => {
  it("fetches and returns the typed payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => DEMO_STATUS,
    });
    vi.stubGlobal("fetch", fetchMock);

    const status = await fetchStatus("http://api.test");
    expect(status.engine).toBe("codeforge");
    expect(status.cards).toHaveLength(DEMO_STATUS.cards.length);
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/api/status", { cache: "no-store" });
  });

  it("throws a clear error on a non-OK response (so the page can fall back)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(fetchStatus("http://api.test")).rejects.toThrow("503");
  });
});

describe("fetchBlueprints", () => {
  it("fetches and returns the typed blueprint list", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => DEMO_BLUEPRINTS });
    vi.stubGlobal("fetch", fetchMock);

    const plans = await fetchBlueprints("http://api.test");
    expect(plans[0].blueprint_id).toBe("npc_combat");
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/api/blueprints", { cache: "no-store" });
  });

  it("throws on a non-OK response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    await expect(fetchBlueprints("http://api.test")).rejects.toThrow("500");
  });
});
