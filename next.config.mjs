/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // reactCompiler: true, // You can keep this if you are using the React 19 compiler
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
