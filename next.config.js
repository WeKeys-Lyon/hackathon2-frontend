/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: { images: { layoutRaw: true } },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
