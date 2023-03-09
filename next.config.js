/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // NOTE: https://nextjs.org/docs/messages/next-image-unconfigured-host
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;
