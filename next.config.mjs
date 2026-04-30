/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: "export" for local dev
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;