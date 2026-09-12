import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFaqs } from "@/components/page-faqs";
import { StageCard } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { industries, industryList, type IndustrySlug } from "@/lib/content";
import { faqPage, orgId } from "@/lib/json-ld";
import { cta } from "@/lib/offers";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { tradeDetails } from "@/lib/trade-detail";
import { tradePages } from "@/lib/trade-pages";

type Props = { params: Promise<{ slug: string }> };

const slugs = Object.keys(industries) as IndustrySlug[];

export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

function resolve(slug: string) {
  if (!slugs.includes(slug as IndustrySlug)) return null;
  const key = slug as IndustrySlug;
  return {
    key,
    industry: industries[key],
    page: tradePages[key],
    detail: tradeDetails[key],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = resolve(slug);
  if (!data) return {};
  return pageMetadata({
    title: data.detail.seoTitle,
    description: data.detail.seoDescription,
    path: `/gewerke/${slug}`,
  });
}

export default async function GewerkPage({ params }: Props) {
  const { slug } = await params;
  const data = resolve(slug);
  if (!data) notFound();
  const { key, industry, page, detail } = data;

  const others = industryList.filter((item) => item.slug !== key);

  return (
    <StagePage
      kicker={`Anwendungsbeispiel · ${industry.title}`}
      title={detail.h1}
      lead={detail.intro}
      crumbs={[
        { name: "Gewerke", path: "/gewerke" },
        { name: industry.title, path: `/gewerke/${slug}` },
      ]}
      extraJsonLd={[
        faqPage(detail.faqs),
        {
          "@type": "Service",
          "@id": `${site.url}/gewerke/${slug}#service`,
          name: detail.seoTitle,
          description: detail.seoDescription,
          url: `${site.url}/gewerke/${slug}`,
          serviceType: `Website und Digitalisierung für ${industry.title}`,
          provider: { "@id": orgId },
          areaServed: site.areaServed.map((name) => ({
            "@type": "AdministrativeArea",
            name,
          })),
        },
      ]}
      related={[
        { href: page.leistung.href, label: page.leistung.label },
        { href: page.second.href, label: page.second.label },
        { href: "/preise", label: "Preise ansehen" },
        { href: "/gewerke", label: "Alle Gewerke" },
      ]}
      next={{
        title: "Was für Ihren Betrieb zuerst sinnvoll ist, klären wir vor Ort.",
        body: "90 Minuten im Betrieb, kostenlos. Sie senden einen Terminwunsch, den Termin bestätigen wir persönlich. Beauftragt wird erst danach — auf Grundlage eines schriftlichen Angebots.",
        chips: [
          "Anwendungsbeispiel, kein Referenzprojekt",
          "90 Minuten vor Ort in NRW",
          "Preis vorher im Angebot",
        ],
        primary: { href: cta.href, label: cta.primary },
        secondary: { href: "/passt-das", label: "Erst Orientierung holen" },
      }}
    >
      <h2 className="mb-4 text-2xl font-semibold tracking-[-0.03em]">
        {industry.h1}
      </h2>
      <div className="grid gap-4">
        {detail.sections.map((section) => (
          <StageCard key={section.heading} title={section.heading}>
            <p>{section.body}</p>
          </StageCard>
        ))}
      </div>

      <section
        className="mt-10 rounded-[1.6rem] border border-black/10 bg-[#E8F4FC] px-5 py-6 md:px-7"
        aria-labelledby="einordnung"
      >
        <h2
          id="einordnung"
          className="text-xl font-semibold tracking-[-0.03em] md:text-2xl"
        >
          Einordnung
        </h2>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
          {page.local}
        </p>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
          {page.hub.stuck} Welche Bausteine passen, hängt vom bisherigen
          Anfrageweg, der Auslastung und den vorhandenen Programmen ab.
        </p>
      </section>

      <PageFaqs
        items={detail.faqs}
        heading={`Häufige Fragen — ${industry.title}`}
      />

      <nav aria-label="Weitere Gewerke" className="mt-12">
        <h2 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">
          Andere Gewerke
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/gewerke/${item.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-black/12 bg-white px-4 py-2 text-[0.98rem] text-[#14161C] transition hover:border-[#198BE8] hover:text-[#198BE8]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </StagePage>
  );
}
