import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a minimal, self-contained server bundle for a small Docker image.
  output: "standalone",
};

export default nextConfig;
