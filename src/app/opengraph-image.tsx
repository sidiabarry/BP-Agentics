import { ImageResponse } from "next/og";

export const alt = "BP Agentics — Systeme und Automatisierung für Betriebe in NRW";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14161C",
          color: "#F3EFE6",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.18em", color: "#9FD0F8" }}>
          BP AGENTICS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 600, maxWidth: 900 }}>
            Systeme und Automatisierung für Betriebe in NRW
          </div>
          <div style={{ fontSize: 28, color: "#9FD0F8" }}>
            Kleiststraße 9, 58095 Hagen · +49 162 2843869
          </div>
        </div>
      </div>
    ),
    size,
  );
}
