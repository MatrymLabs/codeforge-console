import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchStatus } from "./api";
import { DEMO_STATUS } from "./fixture";

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
