import type { Metadata } from "next";
import Link from "next/link";
import { GewerkScroll } from "@/components/gewerk-scroll";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { industryList } from "@/lib/content";
import { breadcrumbList, webPageNode } from "@/lib/json-ld";
import { gewerkHref } from "@/lib/nav";
import { pageMetadata } from "@/lib/seo";
import { tradePages } from "@/lib/trade-pages";

const title = "Gewerke in NRW — Engpass und Ebene";
const description =
  "Acht Gewerke, eine Seite: was in Hagen und NRW typischerweise liegen bleibt und welche Ebene das löst. Keine acht dünnen Visitenkarten.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/gewerke",
});

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
          Gewerke · BP Agentics / Hagen
        </p>
        <h1 className="mt-4 max-w-[22ch] text-4xl leading-[1.08] font-semibold tracking-[-0.03em] md:text-6xl">
          Was in acht Gewerken liegen bleibt — und welche Ebene das löst.
        </h1>
        <p className="mt-5 max-w-[40rem] text-[1.2rem] leading-relaxed text-[#3A3D45]">
          Eine vollständige Seite statt acht halber. Jeder Abschnitt sagt, was in
          diesem Gewerk typischerweise liegen bleibt und welche Ebene das löst.
          Sobald ein Gewerk nachweislich Anfragen bringt, bekommt genau das später
          eine eigene Adresse mit voller Tiefe.
        </p>
        <nav
          aria-label="Gewerke auf dieser Seite"
          className="mt-8 flex flex-wrap gap-2"
        >
          {industryList.map((item) => (
            <a
              key={item.slug}
              href={gewerkHref(item.slug)}
              className="rounded-full border border-black/12 bg-white px-4 py-2 text-[0.95rem] text-[#14161C] transition hover:border-[#198BE8] hover:text-[#198BE8]"
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div className="mt-16 space-y-16">
          {industryList.map((item) => {
            const seo = tradePages[item.slug];
            return (
              <article
                key={item.slug}
                id={item.slug}
                className="doc-prose scroll-mt-[5.5rem] border-t border-black/8 pt-12"
              >
                <p className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
                  {item.title} · Hagen
                </p>
                <h2 className="mt-3 !text-3xl md:!text-4xl">{item.title}</h2>
                <p className="answer mt-5">
                  <span className="block text-sm tracking-[0.16em] text-[#198BE8] uppercase">
                    Was liegen bleibt
                  </span>
                  <span className="mt-2 block">{seo.hub.stuck}</span>
                </p>
                <p className="answer">
                  <span className="block text-sm tracking-[0.16em] text-[#198BE8] uppercase">
                    Welche Ebene das löst
                  </span>
                  <span className="mt-2 block">{seo.hub.level}</span>
                </p>
                {seo.hub.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                <p>
                  <Link href={seo.leistung.href}>{seo.leistung.label}</Link>
                  {" · "}
                  <Link href={seo.second.href}>{seo.second.label}</Link>
                  {item.slug === "dachdecker" ? (
                    <>
                      {" · "}
                      <Link href="/referenzen/dachdecker-signature">
                        Gebaute Signature-Demo
                      </Link>
                    </>
                  ) : null}
                  {" · "}
                  <Link href="/termin">Erstgespräch vereinbaren</Link>
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
            Neunzig Minuten im Betrieb. Wir sagen, welche Ebene zuerst kommt.
          </p>
          <Button
            asChild
            className="mt-6 h-12 rounded-full bg-[#198BE8] px-7 text-base text-white hover:bg-[#1576C4]"
          >
            <Link href="/termin">Erstgespräch vereinbaren</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
