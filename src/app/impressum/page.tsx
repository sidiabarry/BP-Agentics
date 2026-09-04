import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { napLine, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

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
        { href: "/kontakt", label: "Kontaktseite mit derselben Anschrift" },
      ]}
    >
      <h2>Wer ist der Anbieter dieser Website?</h2>
      <p className="answer">
        Anbieter ist {site.name}, Inhaber {site.founder.name}, {site.streetAddress},{" "}
        {site.postalCode} {site.addressLocality}, Telefon {site.phoneDisplay}.
      </p>
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
        Kleinunternehmer gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.
        Alle Preise auf der Website sind Endpreise.
      </p>
      <p>
        Dieselbe Anschrift und dasselbe Telefon stehen im Footer, auf der{" "}
        <Link href="/kontakt">Kontaktseite</Link> und in den strukturierten Daten.
        Streitbeilegung: Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung bereit. Wir sind nicht verpflichtet und nicht bereit,
        an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>
    </DocPage>
  );
}
