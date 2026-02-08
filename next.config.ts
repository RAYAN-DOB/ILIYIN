import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  // Évite le warning multi-lockfile quand le workspace a plusieurs projets
  outputFileTracingRoot: path.join(__dirname, "."),
};

export default nextConfig;
