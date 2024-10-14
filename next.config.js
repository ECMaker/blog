/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3.us-west-2.amazonaws.com",
      "picsum.photos",
      "amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com"
    ],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/page/1",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/page/1",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
