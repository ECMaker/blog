/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      's3.us-west-2.amazonaws.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      's3.amazonaws.com',
      'github-production-user-asset-6210df.s3.amazonaws.com',
      'res.cloudinary.com',
      'github-contributions-api.deno.dev',
    ],
  },
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = {
  ...nextConfig,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
