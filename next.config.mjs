/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: "export",        // Static HTML export for GitHub Pages
  reactStrictMode: true,
  images: {
    unoptimized: true,      // Required for static export (no image optimization server)
  },
  // Apply basePath only when set (production builds for GitHub Pages)
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;