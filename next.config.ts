import path from "node:path";
import type { NextConfig } from "next";

/** Hashstabile Medien aus /public — dürfen dauerhaft im Browsercache liegen. */
const IMMUTABLE_ASSETS = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "172.30.0.2"],
  outputFileTracingRoot: path.join(process.cwd()),
  staticPageGenerationTimeout: 90,
  async headers() {
    return [
      {
        // Hero-Bildsequenz: 71 Desktop- und 48 Mobile-Frames.  Ohne diesen
        // Header validiert der Browser sie bei jedem Seitenaufruf neu.
        source: "/hero/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE_ASSETS }],
      },
      {
        source: "/demos/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE_ASSETS }],
      },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE_ASSETS }],
      },
    ];
  },
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
