/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",                 // o que o front chama
        destination: "http://localhost:3001/api/:path*", // sua API Node
      },
    ];
  },
};
export default nextConfig;
