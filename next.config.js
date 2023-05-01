/** @type {import('next').NextConfig} */

module.exports = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
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
