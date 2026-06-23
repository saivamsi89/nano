import type { NextConfig } from "next";

// When deploying to GitHub Pages (project site at /<repo>), the workflow sets
// PAGES_BASE_PATH=/nano so all routes and assets resolve correctly. Locally the
// var is unset, so dev/build run at the root.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export", // fully static site (no server runtime) — hostable on GitHub Pages
  trailingSlash: true, // emit /shop/index.html so Pages serves clean URLs
  images: { unoptimized: true },
  basePath,
};

export default nextConfig;
