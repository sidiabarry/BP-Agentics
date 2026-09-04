import type { Metadata } from "next";
import { Source_Sans_3, Sora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { MobileDock } from "@/components/mobile-dock";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bpagentics.com"),
  title: {
    default: "BP Agentics · Hagen",
    template: "%s · BP Agentics",
  },
  description:
    "Websites und Systeme für mittelständische Betriebe, die noch mit Telefon, Zetteln und Excel arbeiten. Festpreis, in Wochen fertig, ein Ansprechpartner.",
  openGraph: {
    title: "Ihr Betrieb läuft. Nur digital nicht.",
    description:
      "BP Agentics baut Websites, den KI-Setter und den Innenbetrieb für Handwerk, Außendienst und Logistik. Entwickelt in Hagen. Daten in der EU.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${sourceSans.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="video" href="/media/hero.mp4" type="video/mp4" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F3EFE6] text-[#14161C]">
        {children}
        <SiteFooter />
        <MobileDock />
      </body>
    </html>
  );
}
