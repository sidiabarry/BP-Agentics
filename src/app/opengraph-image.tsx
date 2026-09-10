import { ImageResponse } from "next/og";

export const alt = "BP Agentics — Websites und Software für Betriebe in NRW";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const levels = [
  { n: "01", name: "Websites" },
  { n: "02", name: "Nachrichten-Assistent" },
  { n: "03", name: "Büroabläufe" },
];

function LogoMark() {
  return (
    <svg
      width="92"
      height="64"
      viewBox="0 0 80 56"
      fill="none"
    >
      <path
        d="M8 6h22c8 0 14 5 14 13 0 5-3 9-8 11 6 2 10 7 10 13 0 8-7 13-16 13H8V6Z"
        fill="#1A365D"
      />
      <circle cx="18" cy="18" r="2.2" fill="#F3EFE6" />
      <circle cx="28" cy="18" r="2.2" fill="#F3EFE6" />
      <circle cx="23" cy="28" r="2.2" fill="#F3EFE6" />
      <path
        d="M18 18h10M18 18l5 10M28 18l-5 10"
        stroke="#F3EFE6"
        strokeWidth="1.6"
      />
      <path
        d="M42 6h16c10 0 16 6 16 16 0 9-6 16-16 16H50v18H42V6Z"
        fill="#4A5568"
      />
      <path
        d="M58 14c4 2 6 5 6 9s-2 7-6 9c-4-2-6-5-6-9s2-7 6-9Z"
        fill="#1A365D"
      />
      <circle cx="56" cy="21" r="1.4" fill="#F3EFE6" />
      <circle cx="61" cy="23" r="1.4" fill="#F3EFE6" />
      <circle cx="58" cy="27" r="1.4" fill="#F3EFE6" />
      <path
        d="M56 21l5 2M56 21l2 6M61 23l-3 4"
        stroke="#F3EFE6"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            background: "#F3EFE6",
            fontFamily: "sans-serif",
          }}
        >
        <div
          style={{
            position: "absolute",
            right: 300,
            bottom: -160,
            width: 340,
            height: 340,
            borderRadius: 999,
            background: "linear-gradient(150deg, #d9ecfc 0%, #198BE8 46%, #0b5ea8 100%)",
            opacity: 0.28,
          }}
        />
        <div
          style={{
            width: 18,
            height: "100%",
            background: "#198BE8",
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 48px 52px 52px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <LogoMark />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 18 }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "#1A365D",
                }}
              >
                BP AGENTICS
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 16,
                  letterSpacing: "0.22em",
                  color: "#6B7280",
                }}
              >
                HAGEN
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.16em",
                color: "#198BE8",
                marginBottom: 18,
              }}
            >
              WEBSITES · SOFTWARE · ABLÄUFE
            </div>
            <div
              style={{
                fontSize: 58,
                lineHeight: 1.06,
                fontWeight: 600,
                color: "#14161C",
                maxWidth: 640,
                letterSpacing: "-0.03em",
              }}
            >
              Websites und Software für Betriebe in NRW
            </div>
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#5C5F66",
            }}
          >
            Sidia Jerome Barry · Hagen
          </div>
        </div>

        <div
          style={{
            width: 390,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#14161C",
            padding: "56px 40px",
            borderLeft: "1px solid rgba(25,139,232,0.35)",
          }}
        >
          {levels.map((level, index) => (
            <div
              key={level.n}
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: index === 0 ? 0 : 28,
                marginTop: index === 0 ? 0 : 28,
                borderTop: index === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  letterSpacing: "0.16em",
                  color: "#9FD0F8",
                  marginBottom: 8,
                }}
              >
                {level.n}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: "#F3EFE6",
                  letterSpacing: "-0.02em",
                }}
              >
                {level.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
