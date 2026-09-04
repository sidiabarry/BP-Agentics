import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
