/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    async rewrites() {
      return [
       {
          source: "/user/:route",
          destination: `http://localhost:5000/user/:route`,
        },
        {
          source: "/production/:route",
          destination: `http://localhost:5000/production/:route`,
        },
        {
          source: "/delivery/:route",
          destination: `http://localhost:5000/delivery/:route`,
        },
        {
          source: "/material/:route",
          destination: `http://localhost:5000/material/:route`,
        },
        {
          source: "/rest/:route",
          destination: `http://localhost:8000/rest/:route`,
        },
        {
          source: "/equipment/:route",
          destination: `http://localhost:5000/equipment/:route`,
        },

      ];
    },
}

module.exports = nextConfig
