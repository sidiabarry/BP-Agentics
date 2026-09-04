import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { napLine, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz",
  description: `Datenschutz bei ${site.name}. Verantwortlicher: ${site.founder.name}, ${napLine}.`,
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <DocPage
      kicker="Rechtliches"
      title="Datenschutz"
      lead={`Verantwortlich: ${site.name}, ${site.founder.name}, ${napLine}, ${site.email}.`}
      crumbs={[{ name: "Datenschutz", path: "/datenschutz" }]}
      related={[
        { href: "/impressum", label: "Impressum mit ladungsfähiger Anschrift" },
        { href: "/kontakt", label: "Kontakt, ohne Formular auf dieser Seite" },
      ]}
    >
      <h2>Welche Daten verarbeitet diese Website?</h2>
      <p className="answer">
        Diese Website speichert keine Nutzerkonten; wenn Sie das Erstgespräch anfragen, senden Sie Name, Telefon, Betriebsname, Wunschtermin und optional eine Notiz ausschließlich zur Terminvereinbarung.
      </p>
      <p>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist {site.name},{" "}
        {site.founder.name}, {site.streetAddress}, {site.postalCode} {site.addressLocality},{" "}
        {site.email}, Telefon {site.phoneDisplay}.
      </p>

      <h2>Wie funktioniert der WhatsApp-Button?</h2>
      <p className="answer">
        Der WhatsApp-Button ist ein gewöhnlicher Link auf wa.me; vor dem Klick lädt diese Seite kein Skript von Meta und sendet keine Daten.
      </p>
      <p>
        Nach dem Klick gelten die Hinweise von WhatsApp und Meta. Die Nummer ist{" "}
        {site.phoneDisplay}, dieselbe wie im Impressum.
      </p>

      <h2>Wo liegen Produktionsdaten der Systeme?</h2>
      <p className="answer">
        Produktionsdaten der Systeme, die wir für Betriebe bauen, liegen auf Servern in der Europäischen Union.
      </p>
      <p>
        Zu jedem Projekt gehört ein Auftragsverarbeitungsvertrag nach Artikel 28 der
        Datenschutz-Grundverordnung. Einen vollständigen Export können Sie jederzeit
        anfordern. Weiterverkauf oder Kaltakquise über zugekaufte Daten findet nicht
        statt.
      </p>

      <h2>Welche Rechte haben Sie?</h2>
      <p className="answer">
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch.
      </p>
      <p>
        Schreiben Sie an {site.email}. Sie können sich bei einer Aufsichtsbehörde
        beschweren, in Nordrhein-Westfalen bei der Landesbeauftragten für Datenschutz
        und Informationsfreiheit. Weitere Leistungen und das Gespräch liegen unter{" "}
        <Link href="/kontakt">Kontakt</Link> und{" "}
        <Link href="/termin">Termin</Link>.
      </p>
    </DocPage>
  );
}
