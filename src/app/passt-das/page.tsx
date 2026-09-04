import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Process } from "@/components/process";
import { SchnellCheck } from "@/components/schnell-check";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Passt das zu meinem Betrieb?",
  description:
    "Schnell-Check und die vier Schritte von BP Agentics: Gespräch, Systemplan, Einbau, Wartung. Für Betriebe in Hagen und NRW.",
  path: "/passt-das",
});

export default function PasstDasPage() {
  return (
    <>
      <DocPage
        kicker="Orientierung"
        title="Passt das zu meinem Betrieb?"
        lead="Zwei Fragen sortieren den Engpass. Vier Schritte beschreiben, was danach passiert. Kein Test, der Sie in ein Paket drückt — ein Filter, bevor Sidia Jerome Barry in den Betrieb kommt."
        crumbs={[{ name: "Passt das zu mir?", path: "/passt-das" }]}
        related={[
          { href: "/leistungen", label: "Die drei Ebenen im Überblick" },
          { href: "/preise", label: "Endpreise nachschlagen" },
          { href: "/ueber-mich", label: "Wie Sidia arbeitet" },
          { href: "/termin", label: "90-Minuten-Gespräch legen" },
        ]}
      >
        <h2>Wofür ist dieser Check — und wofür nicht?</h2>
        <p className="answer">
          Der Check sagt, an welcher Ebene der Schmerz heute sitzt: Auftritt, Annahme oder Abläufe. Er ersetzt nicht das Gespräch und er berechnet keinen Preis.
        </p>
        <p>
          Viele Inhaber öffnen eine Agenturseite und sollen sich zwischen Paketen entscheiden, deren Namen nichts mit dem Betrieb zu tun haben. Hier gibt es drei Reibungspunkte, die aus echten Sätzen stammen: die Seite holt die falschen Anfragen, das Telefon bleibt liegen, das Papier füllt den Abend. Dazu die Teamstärke, weil ein Inhaber auf dem Dach ein anderer Engpass ist als ein Büro mit zwanzig Leuten.
        </p>
        <p>
          Die Empfehlung danach ist eine Richtung, kein Vertrag. Der verbindliche Zuschnitt entsteht im neunzigminütigen Gespräch vor Ort in Hagen oder in den Nachbarstädten. Drei Fragen dort: Wie kommen Anfragen rein, warum sitzen Sie abends im Büro, was ist zuletzt schiefgelaufen. In drei Werktagen liegt der Systemplan mit Festpreis und Ausschlussliste.
        </p>

        <h2>Welche Ebene kommt typischerweise zuerst?</h2>
        <p className="answer">
          Zuerst kommt die Ebene, an der der Betrieb heute Geld oder Zeit verliert — nicht die Ebene, die auf einer Agenturfolie am schönsten aussieht.
        </p>
        <p>
          Ein Dachdecker mit voller Auslastung braucht selten zuerst eine Signature-Website. Er braucht Annahme, weil die Besichtigung verloren geht, während er auf dem Dach steht. Ein Betrieb, dessen Seite seit zwei Jahren schweigt, braucht zuerst Auftritt. Ein Containerdienst mit Lieferscheinen in der Kabine braucht Abläufe. Das steht ausführlicher auf{" "}
          <Link href="/leistungen">Leistungen für Betriebe in NRW</Link>, mit Preisen unter{" "}
          <Link href="/preise">Endpreise</Link>.
        </p>
        <p>
          MID Digitale Prozesse in Nordrhein-Westfalen kann innere Vorhaben zur Hälfte tragen, höchstens fünfzehntausend Euro, nur wenn die Arbeit erst nach dem Bescheid beginnt. Eine reine Marketingseite fällt selten in diesen Topf. Lesen Sie{" "}
          <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse</Link>, bevor Sie intern beauftragen.
        </p>

        <h2>Was folgt auf den Check?</h2>
        <p className="answer">
          Auf den Check folgen dieselben vier Schritte wie bei jedem Auftrag: Gespräch, Systemplan, Einbau, Wartungsvertrag.
        </p>
        <p>
          Das Gespräch ist kostenlos und findet im Betrieb statt, nicht in einem Agenturfoyer. Der Einbau dauert höchstens sechs Wochen. Ein dreißigminütiger Termin pro Woche, der Betrieb läuft weiter. Nach zwölf Monaten ist monatlich kündbar. Die Dateien gehören Ihnen ab Zahlung des Einbaus. Sidia Jerome Barry ist der Ansprechpartner: Kleiststraße 9, 58095 Hagen, Telefon +49 162 2843869.
        </p>
        <p>
          Wer den Check überspringen und direkt schreiben will, nutzt{" "}
          <Link href="/kontakt">Kontakt in Hagen</Link> oder das{" "}
          <Link href="/termin">Buchungsformular</Link>. Wer zuerst sehen will, was schon läuft:{" "}
          <Link href="/referenzen/feinkost-kreta">Bestell-App Feinkost Kreta</Link> und{" "}
          <Link href="/referenzen/dachdecker-signature">Dachdecker Signature</Link>.
        </p>
        <p>
          Der vierte Schritt — Wartung — steht in voller Länge auf der Preisseite: Hosting in Deutschland, SSL, Backups, drei Textänderungen, Störung an Werktagen. Hier unten stehen alle vier Schritte ungekürzt, damit die Reihenfolge klar ist, bevor jemand einen Termin legt.
        </p>

        <h2>Was ändert sich mit der Teamstärke?</h2>
        <p className="answer">
          Die Teamstärke ändert nicht die Ebene, sie ändert, wer den Engpass spürt: der Inhaber selbst, das Büro oder die verteilten Standorte.
        </p>
        <p>
          Ein bis fünf Mitarbeiter: der Inhaber arbeitet auf der Baustelle oder im Fahrzeug mit. Annahme und Auftritt treffen ihn persönlich. Sechs bis zwanzig: Vorarbeiter leiten Kolonnen, das Büro wird zum Flaschenhals, Abläufe rücken nach vorn. Über zwanzig: Teams, Standorte oder Fuhrpark verlieren Daten zwischen Zentrale und Außendienst. Der Check fragt das, weil derselbe Setter in einem Ein-Mann-Betrieb anders sitzt als in einem Containerdienst mit vierzig Leuten.
        </p>
        <p>
          Keine der drei Antworten ist ein Verkaufstrick. Sie beschreiben, was wir im Gespräch als erstes ansehen. Sidia Jerome Barry kommt nach Hagen, Iserlohn, Lüdenscheid, Witten, Schwelm, in den Ennepe-Ruhr-Kreis und in den Märkischen Kreis. Außerhalb von Nordrhein-Westfalen hören wir zu und sagen, ob die Anfahrt noch im Festpreis liegt.
        </p>
        <p>
          Die Dateien gehören Ihnen ab Zahlung des Einbaus. Nach zwölf Monaten monatlich kündbar. Hosting in Deutschland, Daten in der Europäischen Union, Auftragsverarbeitung nach Artikel 28 DSGVO. Das steht auch unter{" "}
          <Link href="/ueber-mich">Über mich</Link> und im{" "}
          <Link href="/impressum">Impressum</Link>. Hier geht es nur darum, dass der Check nicht in ein Abo mündet, das Sie nicht kündigen können.
        </p>
      </DocPage>
      <SchnellCheck />
      <Process />
    </>
  );
}
