/** @type {import('next').NextConfig} */
const nextConfig = {
    
}

module.exports = nextConfig;
module.exports = {
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        IMAGE_BASE_URL: process.env.IMAGE_BASE_URL,
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname:
              "assets.habit.yoga",
            port: "",
            pathname: "/corporateassets/**",
          },
        ],
      },
}
