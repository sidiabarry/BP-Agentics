import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { PageFaqs } from "@/components/page-faqs";
import { auftrittFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import {
  PRICE_NOTE,
  cta,
  websiteCare,
  websiteOwnership,
  websitePackages,
} from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Eine Website, die Ihre Leistungen verständlich macht",
  description:
    "Website Start 690 €, Betrieb 1.790 €, Signature ab 3.490 €. Monatliche Betreuung 149 € bzw. 290 €, optional. Für Betriebe in NRW.",
  path: "/leistungen/auftritt",
});

export default function AuftrittPage() {
  return (
    <DocPage
      kicker="Websites"
      title="Eine Website, die Ihre Leistungen verständlich macht."
      lead="Interessenten sollen sehen, welche Arbeiten Sie übernehmen, welche Projekte Sie zeigen können und wie sie Kontakt aufnehmen. BP Agentics gestaltet dafür den passenden Auftritt – vom Einseiter bis zur individuellen Projektpräsentation."
      crumbs={[
        { name: "Leistungen", path: "/leistungen" },
        { name: "Websites", path: "/leistungen/auftritt" },
      ]}
      extraJsonLd={[
        serviceOffer({
          name: "Website für Betriebe",
          description:
            "Website Start, Betrieb und Signature für Betriebe in Nordrhein-Westfalen.",
          path: "/leistungen/auftritt",
          offers: [
            { name: "Website Start", price: "690" },
            { name: "Website Betrieb", price: "1790" },
            { name: "Website Signature", price: "3490" },
            { name: "Betreuung Start und Betrieb", price: "149", unit: "MON" },
            { name: "Betreuung Signature", price: "290", unit: "MON" },
          ],
        }),
        faqPage(auftrittFaqs),
      ]}
      related={[
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
        { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
        { href: "/referenzen/dachdecker-signature", label: "Website-Demo ansehen" },
        { href: "/preise", label: "Preise" },
      ]}
    >
      <h2>Website Start</h2>
      <p>
        Ein kompakter Einseiter für einen klaren Überblick über Leistungen, Betrieb
        und Kontakt.
      </p>
      <p>
        <strong>{websitePackages[0].once} Erstellung. Betreuung optional: {websitePackages[0].month} im Monat</strong>
        <br />
        Erstellung mit 12 Monaten Betreuung: {websitePackages[0].year}
      </p>

      <h2>Website Betrieb</h2>
      <p>
        Eine mehrseitige Website mit Raum für einzelne Leistungen und Referenzen.
        Passend, wenn unterschiedliche Angebote verständlich erklärt werden sollen.
      </p>
      <p>
        <strong>{websitePackages[1].once} Erstellung. Betreuung optional: {websitePackages[1].month} im Monat</strong>
        <br />
        Erstellung mit 12 Monaten Betreuung: {websitePackages[1].year}
      </p>

      <h2>Website Signature</h2>
      <p>
        Ein individuell gestalteter Auftritt mit besonderer Bild- und
        Bewegungsführung. Passend, wenn Projekte ausführlicher und mit einer eigenen
        Gestaltung präsentiert werden sollen.
      </p>
      <p>
        <strong>{websitePackages[2].once} Erstellung. Betreuung optional: {websitePackages[2].month} im Monat</strong>
        <br />
        Erstellung mit 12 Monaten Betreuung: {websitePackages[2].year}
      </p>

      <DataTable
        caption="Website-Stufen"
        headers={["Stufe", "Erstellung", "Betreuung", "Erstellung + 12 Monate Betreuung"]}
        rows={websitePackages.map((plan) => [
          plan.name.replace("Website ", ""),
          plan.once,
          plan.run,
          plan.year,
        ])}
      />

      <h2>Welche Stufe passt?</h2>
      <p>
        Die passende Stufe hängt davon ab, wie viele Leistungen und Projekte erklärt
        werden sollen und welche Inhalte bereits vorliegen. Eine klare
        Anfragemöglichkeit gehört zu jedem Auftritt. Den genauen Umfang halten wir
        im Angebot fest.
      </p>

      <h2>Was zur Website gehört</h2>
      <p>
        Im Angebot steht, welche Seiten, Texte, Bilder und Funktionen umgesetzt
        werden. Der Nachrichten-Assistent und interne Abläufe werden bei Bedarf
        separat vereinbart.
      </p>

      <h2>Was nach der Einrichtung dazugehört</h2>
      <p>
        Die monatliche Betreuung ist optional. Wird sie gewählt, deckt sie Hosting,
        Updates und die vereinbarten Pflegeleistungen ab.
      </p>
      <ul>
        {websiteCare.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{websiteOwnership}</p>
      <p>{PRICE_NOTE}</p>
      <p>
        Eine mögliche Gestaltung zeigt die{" "}
        <Link href="/referenzen/dachdecker-signature">Website-Demo</Link>.
      </p>

      <PageFaqs items={auftrittFaqs} />
      <p className="mt-8">
        <Link href={cta.href} className="text-[#198BE8] underline-offset-4 hover:underline">
          Website-Projekt besprechen
        </Link>
        {" — "}
        90 Minuten vor Ort. Den Wunschtermin bestätigen wir persönlich.
      </p>
    </DocPage>
  );
}
