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
  async headers() {
    return [
      {
        // 適用するパスを指定
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.instagram.com http://www.instagram.com https://*.twitter.com https://*.connect.facebook.net https://*.googletagmanager.com;
              img-src 'self' data: https://*.instagram.com https://*.twitter.com https://*.connect.facebook.net https://*.google.com https://*.pbs.twimg.com https://t1.gstatic.com https://t3.gstatic.com https://pbs.twimg.com;
              connect-src 'self' https://www.google-analytics.com;
              frame-src https://platform.twitter.com https://www.instagram.com;
              style-src 'self' 'unsafe-inline';
              upgrade-insecure-requests;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
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