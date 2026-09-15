import { ActRail } from "@/components/journey/act-rail";
import { HeroPortal } from "@/components/scroll/hero-portal";
import { WerkstattChapter } from "@/components/werkstatt/werkstatt-chapter";
import { ProblemWall } from "@/components/problem-wall";
import { HomeReferenzen } from "@/components/home-referenzen";
import { LeistungenPreise } from "@/components/leistungen-preise";
import { HomeStart } from "@/components/home-start";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/lib/content";
import { faqPage } from "@/lib/json-ld";
import { anchors, entscheidungLinks } from "@/lib/journey";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: site.defaultTitle,
  },
  description: site.defaultDescription,
  alternates: {
    canonical: site.url,
  },
};

export default function HomePage() {
  return (
    <main id="inhalt">
      <link rel="preload" as="image" href="/hero/poster.avif" type="image/avif" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [faqPage(faqs)],
        }}
      />
      <HeroPortal />
      <ActRail />
      <WerkstattChapter />
      <div id={anchors.beweis} className="scroll-mt-[7.5rem]">
        <ProblemWall />
        <HomeReferenzen />
      </div>
      <div id={anchors.person} className="scroll-mt-[7.5rem]">
        <HomeStart />
      </div>
      <div id={anchors.entscheidung} className="scroll-mt-[7.5rem]">
        <nav aria-label="Entscheidung" className="bg-[#F3EFE6] px-5 pb-2 md:px-8">
          <ul className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:flex-wrap">
            {entscheidungLinks.map((item) => (
              <li key={item.href} className="sm:w-auto">
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-black/12 bg-white px-4 py-2 text-[0.98rem] text-[#14161C] transition hover:border-[#198BE8] hover:text-[#198BE8] sm:w-auto"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LeistungenPreise />
        <Faq />
      </div>
    </main>
  );
}
