import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { napLine, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { PRICE_NOTE } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description: `Impressum von ${site.name}, ${napLine}. Inhaber ${site.founder.name}.`,
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <DocPage
      kicker="Rechtliches"
      title="Impressum"
      lead={`Anbieterkennzeichnung von ${site.name}. ${napLine}.`}
      crumbs={[{ name: "Impressum", path: "/impressum" }]}
      related={[
        { href: "/datenschutz", label: "Datenschutzhinweise" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
      showCta={false}
    >
      <h2>Anbieter</h2>
      <p>
        {site.name}
        <br />
        {site.founder.name}
        <br />
        {site.streetAddress}
        <br />
        {site.postalCode} {site.addressLocality}
        <br />
        Deutschland
      </p>
      <p>
        Telefon:{" "}
        <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
        <br />
        E-Mail:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <p>
        Kleinunternehmer gemäß § 19 UStG. {PRICE_NOTE}
      </p>
      <p>
        Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen. Die frühere
        OS-Plattform der Europäischen Kommission wurde zum 20. Juli 2025
        aufgehoben.
      </p>
    </DocPage>
  );
}
