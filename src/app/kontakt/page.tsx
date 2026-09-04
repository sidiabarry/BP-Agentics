import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { DataTable, DocPage } from "@/components/doc-page";
import { WhatsAppInline } from "@/components/whatsapp-button";
import { napLine, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt in Hagen",
  description:
    "BP Agentics, Kleiststraße 9, 58095 Hagen, +49 162 2843869. WhatsApp, E-Mail und 90-Minuten-Gespräch.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <DocPage
      kicker="Kontakt"
      title="Anschrift, Telefon, Gespräch — eine Zeile, überall gleich"
      lead={`${napLine}. Sidia Jerome Barry, ${site.email}. Das 90-Minuten-Gespräch buchen Sie unter /termin.`}
      crumbs={[{ name: "Kontakt", path: "/kontakt" }]}
      related={[
        { href: "/termin", label: "90-Minuten-Gespräch im Betrieb legen" },
        { href: "/leistungen", label: "Leistungen nachlesen, bevor Sie schreiben" },
        { href: "/preise", label: "Endpreise nachschlagen" },
        { href: "/impressum", label: "Impressum mit derselben Anschrift" },
      ]}
    >
      <h2>Wie erreicht man BP Agentics?</h2>
      <p className="answer">
        BP Agentics erreichen Sie in der Kleiststraße 9 in 58095 Hagen, telefonisch unter +49 162 2843869, per WhatsApp unter derselben Nummer und per E-Mail an {site.email}.
      </p>

      <DataTable
        caption="NAP — Name, Anschrift, Telefon"
        headers={["Feld", "Wert"]}
        rows={[
          ["Name", "BP Agentics"],
          ["Inhaber", site.founder.name],
          ["Straße", site.streetAddress],
          ["PLZ und Ort", `${site.postalCode} ${site.addressLocality}`],
          ["Land", "Deutschland, Nordrhein-Westfalen"],
          ["Telefon", site.phoneDisplay],
          ["WhatsApp", site.whatsappUrl],
          ["E-Mail", site.email],
        ]}
      />

      <p>
        Diese Zeichenfolge ist überall dieselbe: Footer, Impressum, JSON-LD, llms.txt, diese Seite. Kein zweites Postfach, keine abweichende Schreibweise, keine versteckte Anschrift. Wer uns in Google, auf Karten oder in Verzeichnissen findet, soll dieselbe Zeile lesen.
      </p>

      <h2>Wann kommt Sidia ins Haus — und wann reicht eine Nachricht?</h2>
      <p className="answer">
        Sidia kommt ins Haus zum kostenlosen 90-Minuten-Gespräch; eine Nachricht reicht, wenn Sie zuerst einen Slot oder eine Förderfrage klären wollen.
      </p>
      <p>
        Das Gespräch ist die Arbeitsform. Drei Fragen: Wie kommen Anfragen rein, warum sitzen Sie abends im Büro, was ist zuletzt schiefgelaufen. Danach liegt in drei Werktagen der Systemplan. Einbau in höchstens sechs Wochen. Ein Ansprechpartner, nicht eine Account-Staffel. Das Einzugsgebiet ist Nordrhein-Westfalen, schwerpunktmäßig Hagen, Iserlohn, Lüdenscheid, Witten, Schwelm, Ennepe-Ruhr-Kreis, Märkischer Kreis.
      </p>
      <p>
        Die Buchungsmaske liegt auf einer eigenen Route, damit Kalender und Formular nicht mit dieser NAP-Seite vermischt werden:{" "}
        <Link href="/termin">90-Minuten-Gespräch vereinbaren</Link>. WhatsApp ist ein gewöhnlicher Link auf wa.me, ohne Meta-Skript auf dieser Seite:
      </p>
      <p>
        <WhatsAppInline>Per WhatsApp an +49 162 2843869 schreiben</WhatsAppInline>
      </p>
      <p>
        E-Mail:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Telefon:{" "}
        <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>.
      </p>

      <h2>Terminwunsch von hier aus</h2>
      <p className="answer">
        Dasselbe Formular wie unter /termin: Name, Telefon, Betrieb, Wunschdatum. Die eigene Route bleibt, damit Kalender und NAP getrennt adressierbar sind.
      </p>
      <div className="mt-8 rounded-[2rem] bg-white p-6 md:p-8">
        <BookingForm />
      </div>

      <h2>Was sollten Sie vor dem Gespräch schon gelesen haben?</h2>
      <p className="answer">
        Vor dem Gespräch reicht oft eine Ebene: die Leistungsseite, die zu Ihrem Engpass passt, plus — wenn intern digitalisiert werden soll — die MID-Seite.
      </p>
      <ul>
        <li>
          <Link href="/leistungen/auftritt">Website für Betriebe</Link>, wenn der Auftritt schweigt.
        </li>
        <li>
          <Link href="/leistungen/annahme">KI-Setter</Link>, wenn Anrufe liegen bleiben.
        </li>
        <li>
          <Link href="/leistungen/ablaeufe">Interne Abläufe</Link>, wenn Papier den Abend frisst.
        </li>
        <li>
          <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse</Link>, wenn der Zuschuss vor dem Baubeginn beantragt werden muss.
        </li>
        <li>
          <Link href="/preise">Preistabelle</Link> und{" "}
          <Link href="/referenzen">Referenzen</Link>, wenn Sie Zahlen und Demos getrennt von der Startseite wollen.
        </li>
      </ul>
      <p>
        Rechtliches mit derselben Anschrift:{" "}
        <Link href="/impressum">Impressum</Link> und{" "}
        <Link href="/datenschutz">Datenschutz</Link>. Die Startseite bleibt die Verkaufsstrecke:{" "}
        <Link href="/">BP Agentics, Hagen</Link>.
      </p>

      <h2>Warum gibt es trotzdem /termin?</h2>
      <p className="answer">
        /termin bleibt die eigene Buchungsadresse für Menschen, die nur den Slot wollen; diese Seite trägt zuerst die ladungsfähige Erreichbarkeit — NAP oben, Formular darunter.
      </p>
      <p>
        Suchmaschinen und Menschen, die „BP Agentics Telefon Hagen“ eingeben, sollen hier landen: Name, Straße, PLZ, Ort, Telefon, Mail, WhatsApp. Das Formular steht zusätzlich hier, damit niemand eine zweite Adresse suchen muss. Impressum wiederholt die Anschrift, versteckt sie nicht.
      </p>
      <p>
        Es gibt kein zweites Büro in Düsseldorf und keine virtuelle Adresse. Geo in den strukturierten Daten gehört zur Kleiststraße, nicht zum Stadtzentrum. Wer uns auf einer Karte sucht, soll vor der richtigen Tür stehen. Wer uns anruft, soll dieselbe Nummer erreichen, die auf WhatsApp und im Footer steht: +49 162 2843869.
      </p>
      <p>
        Einzugsgebiet ausdrücklich: Nordrhein-Westfalen, mit Schwerpunkt Hagen, Iserlohn, Lüdenscheid, Witten, Schwelm, Ennepe-Ruhr-Kreis, Märkischer Kreis. Außerhalb hören wir zu und sagen, ob die Anfahrt noch in den Festpreis fällt.         Keine englische Parallelseite, kein Canonical auf eine andere Host-Schreibweise.
        Dieselbe Zeile wie im Footer, im Impressum und in llms.txt: Kleiststraße 9, 58095 Hagen · +49 162 2843869.
        Wenn die Nummer nicht durchgeht, bleibt die Mail und der wa.me-Link. Wir rufen zurück, wir schicken keine Newsletterserie.
      </p>
    </DocPage>
  );
}
