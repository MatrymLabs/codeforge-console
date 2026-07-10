import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.test.ts", "**/*.test.tsx"],
  },
  resolve: {
    // Mirror the tsconfig "@/*" path alias so tests import the same way the app does.
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});
