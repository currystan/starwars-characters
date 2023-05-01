/** @type {import('next').NextConfig} */

module.exports = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "x-vercel-cache:", value: null },
          { key: "x-vercel-id", value: null },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/characters",
        destination:
          "https://develop.d3t5w79d05f5ds.amplifyapp.com/api/characters",
      },
    ];
  },
};
