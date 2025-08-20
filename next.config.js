/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    IMAGE_BASE_URL: process.env.IMAGE_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.habit.yoga",
        port: "",
        pathname: "/corporateassets/**",
      },
    ],
  },
};

module.exports = nextConfig;
