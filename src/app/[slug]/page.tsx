import { notFound, permanentRedirect } from "next/navigation";
import { industries, type IndustrySlug } from "@/lib/content";
import { tradePages } from "@/lib/trade-pages";

type Props = { params: Promise<{ slug: string }> };

const slugs = Object.keys(industries) as IndustrySlug[];

export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const page = industries[slug as IndustrySlug];
  const seo = tradePages[slug as IndustrySlug];
  if (!page || !seo) notFound();
  permanentRedirect(`/gewerke?gewerk=${slug}`);
}
