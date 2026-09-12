import { permanentRedirect } from "next/navigation";
import { industries, type IndustrySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

const slugs = Object.keys(industries) as IndustrySlug[];

export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

/**
 * Historische Gewerke-URLs ohne Präfix (/dachdecker) zeigen dauerhaft auf die
 * eigenständige Gewerke-Seite unter /gewerke/[slug].
 */
export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/gewerke/${slug}`);
}
