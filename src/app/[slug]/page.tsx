import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import { industries, type IndustrySlug } from "@/lib/content";
import { breadcrumbList, webPageNode } from "@/lib/json-ld";
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
  const page = industries[slug as IndustrySlug];
  const seo = tradePages[slug as IndustrySlug];
  if (!page || !seo) return {};
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
  const path = `/${slug}`;

  return (
    <div className="bg-[#F3EFE6]">
      <SiteHeader tone="light" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            webPageNode({
              path,
              name: seo.metaTitle,
              description: seo.metaDescription,
            }),
            breadcrumbList([
              { name: "Startseite", path: "/" },
              { name: page.title, path },
            ]),
          ],
        }}
      />
      <main id="inhalt" className="mx-auto max-w-5xl px-5 pt-32 pb-8 md:px-8">
        <nav aria-label="Brotkrumen" className="text-sm text-[#5C5F66]">
          <Link href="/" className="underline-offset-4 hover:underline">
            Startseite
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-[#14161C]">{page.title}</span>
        </nav>
        <p className="mt-6 text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          {page.title} · BP Agentics / Hagen
        </p>
        <h1 className="mt-4 max-w-[18ch] text-4xl leading-[1.08] font-semibold tracking-[-0.03em] md:text-6xl">
          {page.h1}
        </h1>
        <p className="mt-5 max-w-[38rem] text-[1.2rem] leading-relaxed text-[#3A3D45]">
          {page.h2}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="h-13 rounded-full bg-[#198BE8] px-7 text-[1.05rem] text-white hover:bg-[#1576C4]"
          >
            <Link href="/termin">Erstgespräch vereinbaren</Link>
          </Button>
          <Button asChild variant="outline" className="h-13 rounded-full px-7 text-[1.05rem]">
            <Link href={seo.leistung.href}>{seo.leistung.label}</Link>
          </Button>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <article className="rounded-[1.8rem] bg-white p-7">
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Der Engpass
            </p>
            <p className="mt-3 text-[1.15rem] leading-relaxed">{page.bottleneck}</p>
          </article>
          <article className="rounded-[1.8rem] bg-[#14161C] p-7 text-[#F3EFE6]">
            <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">
              Konfiguration
            </p>
            <p className="mt-3 text-2xl font-semibold">{page.config}</p>
            <p className="mt-4 text-[1.1rem] leading-relaxed text-white/75">
              {page.argument}
            </p>
          </article>
        </div>
        <section className="doc-prose mt-14 max-w-3xl">
          <h2>{seo.question}</h2>
          <p className="answer">{seo.answer}</p>
          <p>{seo.local}</p>
          {seo.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <Link href={seo.second.href}>{seo.second.label}</Link>
            {" · "}
            <Link href="/foerderung/mid-digitale-prozesse">
              MID Digitale Prozesse: Antrag vor dem Einbau
            </Link>
            {" · "}
            <Link href="/kontakt">Kontakt in Hagen</Link>
            {" · "}
            <Link href="/">Zurück zur Startseite</Link>
          </p>
        </section>
      </main>
      <CtaBand />
    </div>
  );
}
