import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GewerkScroll } from "@/components/gewerk-scroll";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { industryList } from "@/lib/content";
import { breadcrumbList, faqPage, webPageNode } from "@/lib/json-ld";
import { gewerkHref } from "@/lib/nav";
import { pageMetadata } from "@/lib/seo";
import { tradePages } from "@/lib/trade-pages";
import { cta } from "@/lib/offers";

const title = "Websites für Handwerk: acht Gewerke im Überblick";
const description =
  "Website und digitale Abläufe für Dachdecker, SHK, Elektro, Kältetechnik, Spedition, GaLaBau, Metallbau und Nutzfahrzeuge. Anwendungsbeispiele aus NRW.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/gewerke",
});

const gewerkeFaqs = [
  {
    q: "Was kostet eine Website für einen Handwerksbetrieb?",
    a: "Website Start 690 €, Website Betrieb 1.790 €, Signature ab 3.490 €. Die monatliche Betreuung ist optional. Der verbindliche Preis steht vor der Beauftragung im Angebot; alle Preise sind Endpreise ohne ausgewiesene Umsatzsteuer gemäß § 19 UStG.",
  },
  {
    q: "Sind das echte Referenzen?",
    a: "Nein. Die acht Gewerke-Seiten beschreiben Anwendungsbeispiele — was eine Website und ein digitaler Anfrageweg im jeweiligen Alltag übernehmen könnten. Echte Arbeiten und Demos stehen getrennt unter „Arbeiten und Demos“.",
  },
  {
    q: "Mein Gewerk steht nicht in der Liste — passt es trotzdem?",
    a: "Die acht Beispiele sind die häufigsten Fälle, keine abschließende Liste. Entscheidend ist nicht das Gewerk, sondern der Weg, den eine Anfrage heute durch den Betrieb nimmt. Das klären wir im kostenlosen Erstgespräch vor Ort.",
  },
];

export default function GewerkePage() {
  return (
    <div className="bg-[#F3EFE6]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            webPageNode({
              path: "/gewerke",
              name: title,
              description,
            }),
            breadcrumbList([
              { name: "Startseite", path: "/" },
              { name: "Gewerke", path: "/gewerke" },
            ]),
            faqPage(gewerkeFaqs),
          ],
        }}
      />
      <GewerkScroll />
      <main id="inhalt" className="mx-auto max-w-5xl px-5 pt-10 pb-20 md:px-8">
        <nav aria-label="Brotkrumen" className="text-sm text-[#5C5F66]">
          <Link href="/" className="underline-offset-4 hover:underline">
            Startseite
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-[#14161C]">Gewerke</span>
        </nav>
        <p className="mt-6 text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Anwendungsbeispiele
        </p>
        <h1 className="mt-4 max-w-[16ch] text-[1.85rem] leading-[1.08] font-semibold tracking-[-0.03em] md:text-6xl">
          Websites für Handwerk — acht Gewerke, derselbe Weg.
        </h1>
        <p className="mt-5 max-w-[40rem] text-[1.2rem] leading-relaxed text-[#3A3D45]">
          Anwendungsbeispiele, keine Referenzen. Welcher Weg passt, hängt von Ihrem
          Vorhaben und den vorhandenen Programmen ab.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10">
          <Image
            src="/demos/dach-poster.jpg"
            alt="Standbild einer Signature-Website für einen Dachdeckerbetrieb — Produktdemo"
            width={960}
            height={540}
            className="h-auto w-full"
          />
          <p className="bg-[#14161C] px-4 py-2 text-sm text-white/60">
            Produktdemo · kein Echtbetrieb
          </p>
        </div>
        <nav
          aria-label="Gewerke auf dieser Seite"
          className="mt-8 flex flex-wrap gap-2"
        >
          {industryList.map((item) => (
            <Link
              key={item.slug}
              href={gewerkHref(item.slug)}
              className="rounded-full border border-black/12 bg-white px-4 py-2 text-[0.95rem] text-[#14161C] transition hover:border-[#198BE8] hover:text-[#198BE8]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {industryList.map((item) => {
            const seo = tradePages[item.slug];
            return (
              <article
                key={item.slug}
                id={item.slug}
                className="scroll-mt-[5.5rem] rounded-[1.6rem] bg-white p-6 md:p-7"
              >
                <p className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
                  Anwendungsbeispiel · {item.title}
                </p>
                <h2 className="mt-3 text-2xl leading-snug font-semibold tracking-[-0.03em] md:text-3xl">
                  <Link
                    href={`/gewerke/${item.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {seo.hub.heading}
                  </Link>
                </h2>
                {seo.hub.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
                    {paragraph}
                  </p>
                ))}
                <p className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-[1.02rem]">
                  <Link
                    href={`/gewerke/${item.slug}`}
                    className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
                  >
                    Website für {item.title}
                  </Link>
                  <Link href={seo.leistung.href} className="text-[#198BE8] underline-offset-4 hover:underline">
                    {seo.leistung.label}
                  </Link>
                  <Link href={seo.second.href} className="text-[#198BE8] underline-offset-4 hover:underline">
                    {seo.second.label}
                  </Link>
                  {item.slug === "dachdecker" ? (
                    <Link href="/referenzen/dachdecker-signature" className="text-[#198BE8] underline-offset-4 hover:underline">
                      Website-Demo ansehen
                    </Link>
                  ) : null}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-16 rounded-[1.8rem] bg-[#14161C] px-7 py-10 text-[#F3EFE6] md:px-10">
          <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">
            Nächster Schritt
          </p>
          <p className="mt-3 max-w-[32rem] text-2xl leading-snug font-semibold">
            Welches Beispiel zu Ihrem Vorhaben passt, klären wir im Gespräch.
          </p>
          <Button
            asChild
            className="mt-6 h-auto max-w-full whitespace-normal rounded-full bg-[#198BE8] px-7 py-3 text-center text-base text-white hover:bg-[#1576C4]"
          >
            <Link href={cta.href}>{cta.primary}</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
