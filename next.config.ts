import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "172.30.0.2"],
  outputFileTracingRoot: path.join(process.cwd()),
  staticPageGenerationTimeout: 90,
  async headers() {
    // Modelle und Standbilder tragen die Version im Dateinamen (…v6…) und
    // dürfen deshalb dauerhaft im Browser-Cache bleiben.
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/models/:file+", headers: immutable },
      { source: "/werkstatt/:file+", headers: immutable },
    ];
  },
  async redirects() {
    return [
      {
        source: "/werkstatt",
        destination: "/#werkstatt",
        permanent: false,
      },
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
