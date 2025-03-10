/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.gifer.com",
      },
      {
        protocol: "https",
        hostname: "cdn.svgator.com",
      },
    ],
  },
};

export default nextConfig;

