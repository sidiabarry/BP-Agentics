import Link from "next/link";
import { PageFaqs } from "@/components/page-faqs";
import { StageCard } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { industryList } from "@/lib/content";
import { faqPage, orgId } from "@/lib/json-ld";
import { cta } from "@/lib/offers";
import { site } from "@/lib/site";
import type { Standort } from "@/lib/standorte";

export function StandortPage({ standort }: { standort: Standort }) {
  const path = `/${standort.slug}`;

  return (
    <StagePage
      kicker={`Einsatzgebiet · ${standort.kreis}`}
      title={standort.h1}
      lead={standort.lead}
      crumbs={[{ name: `Webdesign ${standort.stadt}`, path }]}
      extraJsonLd={[
        faqPage(standort.faqs),
        {
          "@type": "Service",
          "@id": `${site.url}${path}#service`,
          name: standort.seoTitle,
          description: standort.seoDescription,
          url: `${site.url}${path}`,
          serviceType: "Website-Erstellung und Prozessautomatisierung",
          provider: { "@id": orgId },
          areaServed: {
            "@type": "City",
            name: standort.stadt,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: standort.kreis,
            },
          },
        },
      ]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
        { href: "/preise", label: "Preise" },
        { href: "/referenzen", label: "Arbeiten und Demos" },
        { href: "/ueber-mich", label: "Über mich" },
      ]}
      next={{
        title: `90 Minuten in Ihrem Betrieb in ${standort.stadt}.`,
        body: "Das Erstgespräch ist kostenlos und unverbindlich. Sie senden einen Terminwunsch, bestätigt wird er persönlich. Ein Angebot folgt erst danach.",
        chips: [
          standort.istSitz
            ? "Sitz in Hagen"
            : `Kein Büro in ${standort.stadt} — Termin im Betrieb`,
          "90 Minuten, kostenlos",
          "Preis vorher im Angebot",
        ],
        primary: { href: cta.href, label: cta.primary },
        secondary: { href: "/kontakt", label: "Direkt anrufen oder schreiben" },
      }}
    >
      <h2 className="mb-4 text-2xl font-semibold tracking-[-0.03em]">
        Zusammenarbeit in {standort.stadt}
      </h2>
      <div className="grid gap-4">
        {standort.sections.map((section) => (
          <StageCard key={section.heading} title={section.heading}>
            <p>{section.body}</p>
          </StageCard>
        ))}
      </div>

      <section
        className="mt-10 rounded-[1.6rem] border border-black/10 bg-white px-5 py-6 md:px-7"
        aria-labelledby="gewerke-vor-ort"
      >
        <h2
          id="gewerke-vor-ort"
          className="text-xl font-semibold tracking-[-0.03em] md:text-2xl"
        >
          Anwendungsbeispiele nach Gewerk
        </h2>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Für acht Gewerke ist beschrieben, was eine Website und ein digitaler
          Anfrageweg konkret übernehmen können. Es sind Anwendungsbeispiele,
          keine Referenzprojekte.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {industryList.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/gewerke/${item.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-black/12 bg-[#F3EFE6] px-4 py-2 text-[0.98rem] text-[#14161C] transition hover:border-[#198BE8] hover:text-[#198BE8]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <PageFaqs
        items={standort.faqs}
        heading={`Häufige Fragen — ${standort.stadt}`}
      />
    </StagePage>
  );
}
