import type { Metadata } from "next";
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
        { href: "/impressum", label: "Impressum" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
      showCta={false}
    >
      <h2>Welche Daten verarbeitet diese Website?</h2>
      <p>
        Diese Website speichert keine Nutzerkonten. Wenn Sie das Erstgespräch
        anfragen, senden Sie Name, Telefonnummer, Betriebsname, Wunschtermin und
        optional eine Notiz ausschließlich zur Terminabstimmung.
      </p>
      <p>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist {site.name},{" "}
        {site.founder.name}, {site.streetAddress}, {site.postalCode} {site.addressLocality},{" "}
        {site.email}, Telefon {site.phoneDisplay}.
      </p>

      <h2>Wie funktioniert der WhatsApp-Button?</h2>
      <p>
        Der WhatsApp-Button ist ein gewöhnlicher Link auf wa.me. Vor dem Klick lädt
        diese Seite kein Skript von Meta und sendet keine Daten. Nach dem Klick
        gelten die Hinweise von WhatsApp und Meta. Die Nummer ist{" "}
        {site.phoneDisplay}.
      </p>

      <h2>Wo werden Daten verarbeitet?</h2>
      <p>
        Das Hosting der Website liegt in Deutschland. Weitere Dienste, etwa
        Nachrichten über WhatsApp oder der E-Mail-Versand von Terminwünschen,
        verarbeiten Daten nach den jeweiligen Anbieterangaben. Der genaue
        Dienstweg eines Projekts steht im Angebot und im
        Auftragsverarbeitungsvertrag.
      </p>

      <h2>Welche Rechte haben Sie?</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung,
        Datenübertragbarkeit und Widerspruch. Schreiben Sie an {site.email}. Sie
        können sich bei einer Aufsichtsbehörde beschweren, in Nordrhein-Westfalen
        bei der Landesbeauftragten für Datenschutz und Informationsfreiheit.
      </p>
    </DocPage>
  );
}
