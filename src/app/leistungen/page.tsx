import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { pageMetadata } from "@/lib/seo";
import { levels } from "@/lib/content";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Websites und Software für Ihren Betrieb",
  description:
    "Eine Website macht Leistungen verständlich. Ein Nachrichten-Assistent bereitet WhatsApp- und E-Mail-Anfragen vor. Automatisierte Abläufe verbinden Büro und Außendienst.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <DocPage
      kicker="Leistungen"
      title="Websites und Software für Ihren Betrieb"
      lead="Eine Website macht Leistungen und Referenzen verständlich. Ein Nachrichten-Assistent bereitet Kundenanfragen per WhatsApp und E-Mail vor. Automatisierte Abläufe verbinden Informationen zwischen Büro und Außendienst. Wählen Sie den Bereich, der zu Ihrem aktuellen Vorhaben passt."
      crumbs={[{ name: "Leistungen", path: "/leistungen" }]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
        { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
        { href: "/preise", label: "Preise" },
        { href: "/referenzen", label: "Arbeiten und Demos" },
      ]}
    >
      <h2>Drei Leistungszugänge</h2>
      <ul>
        {levels.map((level) => (
          <li key={level.id}>
            <Link href={level.href}>{level.name}</Link>
            {" — "}
            {level.lead}
          </li>
        ))}
      </ul>
      <p>
        Jeder Baustein ist einzeln beauftragbar. Im Gespräch klären wir, ob eine
        Website, ein Assistent oder ein einzelner automatisierter Ablauf den
        passenden Anfang macht. Die Größenordnung für Einrichtung und Betreuung
        steht auf der{" "}
        <Link href="/preise">Preisseite</Link>.
      </p>

      <h2>So können die Lösungen aussehen</h2>
      <p>
        Eine Bestell-App zeigt einen digitalen Bestellweg:{" "}
        <Link href="/referenzen/feinkost-kreta">Feinkost Kreta</Link>. Eine
        Website-Demo zeigt eine mögliche Gestaltung für einen Dachdeckerbetrieb:{" "}
        <Link href="/referenzen/dachdecker-signature">Website Signature</Link>.
      </p>

      <h2>Vom ersten Gespräch zum passenden Baustein</h2>
      <ol>
        <li>
          Im kostenlosen 90-Minuten-Gespräch vor Ort sehen wir uns an, wie Anfragen
          und Informationen heute durch den Betrieb laufen.
        </li>
        <li>
          Sie erhalten einen Projektplan mit den vereinbarten Leistungen, einem
          Zeitrahmen und einem Festpreis.
        </li>
        <li>
          Website oder Ablauf werden für den vereinbarten Einsatz eingerichtet.
        </li>
        <li>
          Hosting, Pflege und Unterstützung richten sich nach dem gewählten Angebot.
        </li>
      </ol>
      <p>
        <Link href={cta.href}>{cta.primary}</Link>
        {" — "}
        90 Minuten vor Ort. Den Wunschtermin bestätigen wir persönlich.
      </p>
    </DocPage>
  );
}
