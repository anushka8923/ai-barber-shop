/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // <-- Yeh line zaroori hai
      },
      {
        protocol: 'https',
        hostname: 'demo.htmlcodex.com',
      },
    ],
  },
};

export default nextConfig;
