import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { pageMetadata } from "@/lib/seo";
import { foerderung } from "@/lib/foerderung";

export const metadata: Metadata = pageMetadata({
  title: foerderung.title,
  description: foerderung.lead,
  path: "/foerderung/mid-digitale-prozesse",
});

export default function MidPage() {
  return (
    <DocPage
      kicker="Förderung Nordrhein-Westfalen"
      title={foerderung.title}
      lead={foerderung.lead}
      crumbs={[
        { name: "MID-Digitale Prozesse", path: "/foerderung/mid-digitale-prozesse" },
      ]}
      reviewed={foerderung.reviewed}
      related={[
        { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/preise", label: "Preise" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
    >
      {foerderung.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </section>
      ))}
      <p>
        <a href={foerderung.nrwBankUrl}>
          NRW.BANK – aktueller Förderaufruf
        </a>
      </p>
      <p>
        <a href={foerderung.richtlinieUrl}>
          Offizielle Richtlinie, insbesondere Ziffern 2, 4.5, 5.4 und 7
        </a>
      </p>
      <p>
        Diese kurze Fassung enthält keine vollständige Förderberatung.{" "}
        <Link href="/kontakt">Kontakt zu BP Agentics</Link>, wenn Sie prüfen
        möchten, ob eine Prozessberatung zu Ihrem Vorhaben passt.
      </p>
    </DocPage>
  );
}
