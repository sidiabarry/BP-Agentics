import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GewerkScroll } from "@/components/gewerk-scroll";
import { StageCard, StageGrid } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { industryList } from "@/lib/content";
import { gewerkHref, paths, stageThread } from "@/lib/journey";
import { pageMetadata } from "@/lib/seo";
import { tradePages } from "@/lib/trade-pages";

const title = "Derselbe Weg. Anderer Arbeitsalltag.";
const lead =
  "Anwendungsbeispiele, keine Referenzen. Welcher Weg passt, hängt von Ihrem Vorhaben und den vorhandenen Programmen ab.";

export const metadata: Metadata = pageMetadata({
  title: "Websites und Automatisierung nach Gewerk",
  description:
    "Websites und Automatisierung für Dachdecker, SHK, Elektro, GaLaBau und weitere Gewerke in NRW. Derselbe Weg, angepasst an den Arbeitsalltag.",
  path: paths.gewerke,
});

export default function GewerkePage() {
  const thread = stageThread(paths.gewerke);

  return (
    <StagePage
      kicker="Anwendungsbeispiele"
      title={title}
      lead={lead}
      crumbs={[{ name: "Gewerke", path: paths.gewerke }]}
      visual={
        <figure className="min-w-0 overflow-hidden rounded-[1.6rem] shadow-xl ring-1 ring-black/10">
          <Image
            src="/demos/dach-poster.jpg"
            alt="Standbild einer Signature-Website für einen Dachdeckerbetrieb — Produktdemo"
            width={640}
            height={360}
            className="h-auto w-full"
          />
          <figcaption className="bg-[#14161C] px-4 py-2 text-sm text-white/60">
            Produktdemo · kein Echtbetrieb
          </figcaption>
        </figure>
      }
      prelude={<GewerkScroll />}
      related={thread.related}
      next={thread.next}
    >
      <nav aria-label="Gewerke auf dieser Seite">
        <ul className="flex flex-wrap gap-2">
          {industryList.map((item) => (
            <li key={item.slug} className="max-w-full shrink-0">
              <a
                href={gewerkHref(item.slug)}
                className="inline-flex min-h-11 w-fit max-w-full items-center rounded-full border border-black/12 bg-white px-4 py-2 text-[0.95rem] leading-snug text-[#14161C] transition hover:border-[#198BE8] hover:text-[#198BE8]"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <StageGrid cols={2} className="mt-10">
        {industryList.map((item) => {
          const seo = tradePages[item.slug];
          return (
            <div key={item.slug} id={item.slug} className="min-w-0 scroll-mt-[7.5rem]">
              <StageCard kicker={`Anwendungsbeispiel · ${item.title}`}>
                <h2 className="text-[1.25rem] leading-snug font-semibold tracking-[-0.03em] text-[#14161C] md:text-[1.5rem]">
                  {seo.hub.heading}
                </h2>
                {seo.hub.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-3">
                    {paragraph}
                  </p>
                ))}
                <p className="mt-5 flex flex-col gap-2 text-[1.02rem] sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-2">
                  <Link
                    href={seo.leistung.href}
                    className="font-semibold break-words text-[#198BE8] underline-offset-4 hover:underline"
                  >
                    {seo.leistung.label}
                  </Link>
                  <Link
                    href={seo.second.href}
                    className="break-words text-[#198BE8] underline-offset-4 hover:underline"
                  >
                    {seo.second.label}
                  </Link>
                  {item.slug === "dachdecker" ? (
                    <Link
                      href={paths.dachdecker}
                      className="break-words text-[#198BE8] underline-offset-4 hover:underline"
                    >
                      Website-Demo ansehen
                    </Link>
                  ) : null}
                </p>
              </StageCard>
            </div>
          );
        })}
      </StageGrid>
    </StagePage>
  );
}
