/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/chat",
        destination: "http://localhost:5000/api/chat",
      },
    ];
  },
};

export default nextConfig;
