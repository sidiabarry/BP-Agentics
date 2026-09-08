import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Arbeiten und Produktdemos",
  description:
    "Zwei Beispiele: eine Bestell-App und eine Website-Präsentation. Beschreibungen erklären, was zu sehen ist — ohne behauptete Umsatzzahlen.",
  path: "/referenzen",
});

export default function ReferenzenPage() {
  return (
    <DocPage
      kicker="Arbeiten und Demos"
      title="Arbeiten und Produktdemos"
      lead="Hier sehen Sie zwei unterschiedliche Aufgaben: einen digitalen Bestellweg und eine Website-Präsentation. Die Beschreibungen erklären, was die Beispiele zeigen und wofür ein ähnlicher Ansatz genutzt werden kann."
      crumbs={[{ name: "Arbeiten und Demos", path: "/referenzen" }]}
      related={[
        { href: "/referenzen/feinkost-kreta", label: "Bestell-App ansehen" },
        { href: "/referenzen/dachdecker-signature", label: "Website-Demo ansehen" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
    >
      <h2>Feinkost Kreta — Bestell-App</h2>
      <p>
        Die Demo zeigt eine Bestellung und die Benachrichtigung an den Betrieb. Ein
        Beispiel dafür, wie Informationen in einem zusammenhängenden Ablauf
        weitergegeben werden.
      </p>
      <p>
        Kennzeichnung: <strong>Projektbeispiel · Produktdemo</strong>
      </p>
      <p>
        <Link href="/referenzen/feinkost-kreta">Bestell-App ansehen</Link>
      </p>

      <h2>Dachdecker — Website Signature</h2>
      <p>
        Die Demo verbindet Bilder, Leistungsbeschreibung und einen Anfrageweg. Sie
        zeigt eine mögliche Gestaltung für einen Dachdeckerbetrieb.
      </p>
      <p>
        Kennzeichnung: <strong>Produktdemo · kein Echtbetrieb</strong>
      </p>
      <p>
        <Link href="/referenzen/dachdecker-signature">Website-Demo ansehen</Link>
      </p>
      <p>
        <Link href={cta.href}>{cta.primary}</Link>
      </p>
    </DocPage>
  );
}
