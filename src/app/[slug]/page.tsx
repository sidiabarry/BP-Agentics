import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StageCard } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { industries, type IndustrySlug } from "@/lib/content";
import { cta } from "@/lib/offers";
import { pageMetadata } from "@/lib/seo";
import { tradePages } from "@/lib/trade-pages";

type Props = { params: Promise<{ slug: string }> };

const slugs = Object.keys(industries) as IndustrySlug[];

export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seo = tradePages[slug as IndustrySlug];
  if (!seo) return {};
  return pageMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: `/${slug}`,
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const page = industries[slug as IndustrySlug];
  const seo = tradePages[slug as IndustrySlug];
  if (!page || !seo) notFound();

  const related = [
    { href: seo.leistung.href, label: seo.leistung.label },
    { href: seo.second.href, label: seo.second.label },
    { href: "/gewerke", label: "Alle Gewerke" },
  ];
  if (slug === "dachdecker") {
    related.splice(2, 0, {
      href: "/referenzen/dachdecker-signature",
      label: "Website-Demo ansehen",
    });
  }

  return (
    <StagePage
      kicker={`Anwendungsbeispiel · ${page.title}`}
      title={page.h1}
      lead={page.h2}
      crumbs={[
        { name: "Gewerke", path: "/gewerke" },
        { name: page.title, path: `/${slug}` },
      ]}
      related={related}
      next={{
        title: "Welches Beispiel zu Ihrem Vorhaben passt, klären wir im Gespräch.",
        body: seo.local,
        primary: { href: cta.href, label: cta.primary },
      }}
    >
      <StageCard kicker="Anwendungsbeispiel" title={seo.question}>
        <div className="space-y-3">
          {seo.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          <p>{seo.answer}</p>
        </div>
      </StageCard>
    </StagePage>
  );
}
