import type { Metadata } from "next";
import { StandortPage } from "@/components/standort-page";
import { pageMetadata } from "@/lib/seo";
import { standortBySlug } from "@/lib/standorte";

const standort = standortBySlug["webdesign-hagen"];

export const metadata: Metadata = pageMetadata({
  title: standort.seoTitle,
  description: standort.seoDescription,
  path: "/webdesign-hagen",
});

export default function WebdesignHagenPage() {
  return <StandortPage standort={standort} />;
}
