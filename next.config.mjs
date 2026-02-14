/** @type {import('next').NextConfig} */
<<<<<<< HEAD
const nextConfig = {
  /* config options here */
  reactCompiler: true,
=======

// 1. Define the production status
const isProd = process.env.NODE_ENV === "production";

// 2. Define your repo name exactly as it appears on GitHub
const repo = "sdev_255_final_project_error_404_team_not_found";

const nextConfig = {
  reactStrictMode: true,
  // 3. Only use the repository name as a path prefix when building for production (GitHub)
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",

  // 4. Required for GitHub Pages static export
  output: "export",

  // 5. Disable server-side image optimization (GitHub Pages doesn't support it)
  images: {
    unoptimized: true,
  },
>>>>>>> 9a772071db0264fda1118ba935fc074763deee2f
};

export default nextConfig;
