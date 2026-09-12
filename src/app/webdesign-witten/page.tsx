import type { Metadata } from "next";
import { StandortPage } from "@/components/standort-page";
import { pageMetadata } from "@/lib/seo";
import { standortBySlug } from "@/lib/standorte";

const standort = standortBySlug["webdesign-witten"];

export const metadata: Metadata = pageMetadata({
  title: standort.seoTitle,
  description: standort.seoDescription,
  path: "/webdesign-witten",
});

export default function WebdesignWittenPage() {
  return <StandortPage standort={standort} />;
}
