import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "172.30.0.2"],
  async redirects() {
    return [
      {
        source: "/leistungen/website",
        destination: "/leistungen/auftritt",
        permanent: true,
      },
      {
        source: "/leistungen/ki-setter",
        destination: "/leistungen/annahme",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
