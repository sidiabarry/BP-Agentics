import type { Metadata } from "next";
import { Source_Sans_3, Sora } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-button";
import { organizationGraph } from "@/lib/json-ld";
import { site } from "@/lib/site";
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
  metadataBase: new URL(site.url),
  title: {
    default: site.defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.defaultDescription,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    title: site.defaultTitle,
    description: site.defaultDescription,
    url: site.url,
    locale: site.locale,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${sourceSans.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero/poster.avif"
          type="image/avif"
        />
        <link
          rel="preload"
          as="image"
          href="/hero/poster-fallback.jpg"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F3EFE6] text-[#14161C]">
        <a
          href="#inhalt"
          className="bg-foreground text-background focus:fixed focus:top-3 focus:left-3 focus:z-80 focus:rounded-full focus:px-4 focus:py-2 sr-only focus:not-sr-only"
        >
          Zum Inhalt springen
        </a>
        <JsonLd data={organizationGraph()} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
