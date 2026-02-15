/** @type {import('next').NextConfig} */

// 1. Define the production status
const isProd = process.env.NODE_ENV === "production";

// 2. Define your repo name exactly as it appears on GitHub
const repo = "sdev_255_final_project_error_404_team_not_found";

const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true, // Kept from your local config

  // 3. Only use the repository name as a path prefix when building for production (GitHub)
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",

  // 5. Disable server-side image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
