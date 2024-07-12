/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'custom-out',
    basePath: '/portfolio-react',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
            // Add other paths as needed
            '/projects': { page: '/projects' },
            '/experiences': { page: '/experiences' },
            '/achievements': { page: '/achievements' },
        };
    },
};

export default nextConfig;
