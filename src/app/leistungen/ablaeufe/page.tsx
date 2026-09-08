import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { PageFaqs } from "@/components/page-faqs";
import { Proof } from "@/components/proof";
import { TradeSelector } from "@/components/trade-selector";
import { ablaeufeFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Interne Abläufe digitalisieren",
  description:
    "Fundament ab 2.490 Euro, ohne monatliche Betreuung. Papier, Lager und Rechnung in einem System.",
  path: "/leistungen/ablaeufe",
});

export default function AblaeufePage() {
  return (
    <>
    <DocPage
      kicker="Abläufe · interne Systeme"
      title="Wenn die Arbeit nicht am Schreibtisch hängen bleibt"
      lead="Fundament ab zweitausendvierhundertneunzig Euro, ohne monatliche Betreuung. Kunden, Aufträge, Stundenzettel, Lieferscheine, Lager und Rechnung in einem Datenfundament."
      crumbs={[
        { name: "Leistungen", path: "/leistungen" },
        { name: "Abläufe", path: "/leistungen/ablaeufe" },
      ]}
      extraJsonLd={[
        serviceOffer({
          name: "Interne Abläufe",
          description:
            "Datenfundament und Prozessmodule für Betriebe, die Papier und Excel ablösen.",
          path: "/leistungen/ablaeufe",
          offers: [
            { name: "Fundament", price: "2490" },
          ],
        }),
        faqPage(ablaeufeFaqs),
      ]}
      related={[
        { href: "/leistungen/auftritt", label: "Auftritt: Website, die die Anfrage holt" },
        { href: "/leistungen/annahme", label: "Annahme: KI-Setter, bevor der Auftrag im System landet" },
        { href: "/foerderung/mid-digitale-prozesse", label: "MID Digitale Prozesse für interne Digitalisierung" },
        { href: "/referenzen/feinkost-kreta", label: "Feinkost Kreta: Bestell-App mit 1-Klick" },
        { href: "/preise", label: "Preistabelle Fundament, Modul, Setter, Website" },
      ]}
    >
      <h2>Was sind interne Abläufe bei BP Agentics?</h2>
      <p className="answer">
        Interne Abläufe sind das Betriebssystem hinter der Annahme: ein Datenfundament auf Postgres plus Module für genau den Engpass, der abends den Schreibtisch füllt.
      </p>
      <p>
        Typisches Bild in Hagen: Anfrage im Festnetz, Lieferschein auf dem Beifahrersitz, Lager hinter Glas, Angebot um zweiundzwanzig Uhr. Das ist kein unfähiger Betrieb. Das ist ein Betrieb, in dem niemand Daten einsammelt. Das Fundament bindet Postfach, Kalender und Kundendaten an einem Ort. Die Module schließen danach einen Ablauf: Angebotsversand, Nachfassen, Terminerinnerung, Auftragsdokumentation, Papier aufs Handy, Unterschrift im Browser, E-Rechnung.
      </p>
      <p>
        Fahrer und Gesellen bedienen das im Browser des Mobilgeräts. Kein App-Zwang, kein Schulungsmarathon. Der Inhaber sieht denselben Auftrag, den der Fahrer gerade gegenzeichnen lässt. Die Rechnung kann am Einsatztag raus, nicht drei Tage später, wenn der Wiegeschein aus der Kabine auftaucht.
      </p>

      <h2>Was kosten Fundament und Module?</h2>
      <p className="answer">
        Das Fundament beginnt bei zweitausendvierhundertneunzig Euro, ohne monatliche Betreuung.
      </p>

      <DataTable
        caption="Interne Systeme, Bausteine und Endpreise"
        headers={["Baustein", "Aufgabe", "Endpreis"]}
        rows={[
          [
            "Fundament",
            "Postfach, Kalender, Kundendaten, ein Ort statt fünf",
            "ab 2.490 Euro",
          ],
        ]}
      />

      <h2>Warum Module statt einer fertigen Branchensoftware?</h2>
      <p className="answer">
        Weil fertige Branchensoftware oft zwanzig Funktionen mitbringt, von denen der Betrieb drei braucht — und genau die eine, die weh tut, unsauber abbildet.
      </p>
      <p>
        Ein Elektrobetrieb auf der Großbaustelle braucht Bautagesberichte mit Unterschrift, solange der Auftraggeber noch da ist. Ein Containerdienst braucht den Lieferschein aus dem Fahrerhaus. Ein Galabau-Betrieb in der kurzen Saison braucht Lager und Kolonne in einem Blick. Ein Metallbauer will die Abnahme per Tablet, nicht siebzigundfünf Bürokratietage im Jahr. Deshalb ein Fundament und dann das Modul, das den Engpass schließt. Nachrüsten bleibt möglich.
      </p>
      <p>
        Der Zuschnitt entsteht im neunzigminütigen Gespräch vor Ort. Der Preis steht danach fest. Keine offenen Stundensätze. Alle Beträge sind Endpreise. Die Hoheit über die Daten bleibt beim Betrieb. Server stehen in der Europäischen Union. Zu jedem Projekt gehört ein Auftragsverarbeitungsvertrag nach Artikel 28 der Datenschutz-Grundverordnung.
      </p>

      <h2>Wie hängt das mit Annahme, Website und Förderung zusammen?</h2>
      <p className="answer">
        Die Website holt die Anfrage, der Setter nimmt sie an, die Abläufe tragen sie durch den Auftrag — und genau diese internen Prozesse sind der Kern von MID Digitale Prozesse.
      </p>
      <p>
        Wer nur Abläufe kauft, ohne Annahme, digitalisiert das Chaos nach dem verpassten Anruf. Wer nur eine Seite kauft, digitalisiert die Visitenkarte. Die Reihenfolge klären wir im Gespräch. Förderrechtlich gilt: Arbeit vor dem Bescheid gefährdet den Zuschuss. Fünfzig Prozent, höchstens fünfzehntausend Euro, Windhund bis zum 1. Dezember 2026 — erklärt auf{" "}
        <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse in Nordrhein-Westfalen</Link>.
      </p>
      <p>
        Gesehen statt behauptet:{" "}
        <Link href="/referenzen/feinkost-kreta">Feinkost Kreta</Link> ist eine vollständige Bestell-App — ein Klick, die Bestellung sitzt, die Benachrichtigung geht raus. Die{" "}
        <Link href="/leistungen/auftritt">Website-Stufen</Link> und der{" "}
        <Link href="/leistungen/annahme">KI-Setter</Link> bleiben einzeln beauftragbar. Wer den Engpass beschreiben will, ohne gleich zu buchen, schreibt über{" "}
        <Link href="/kontakt">Kontakt in Hagen</Link>.
      </p>

      <h2>Was gehört ins Fundament — und was bleibt draußen?</h2>
      <p className="answer">
        Ins Fundament gehören Kundendaten, Kalender und der Auftrag als gemeinsamer Kern; draußen bleiben Buchhaltungssuiten, Lohn und Dinge, die der Steuerberater bereits sauber führt.
      </p>
      <p>
        Wir ersetzen nicht DATEV, nicht die Tischlerei-Branchensoftware, die seit zehn Jahren die Stückliste kann, und nicht das Warenwirtschaftssystem eines Großhandels. Wir schließen den Medienbruch zwischen Hof, Kabine, Baustelle und Büro. Wo bereits etwas sitzt, binden wir an, statt eine zweite Wahrheit zu eröffnen. Wo nichts sitzt außer Excel, legen wir den Kern.
      </p>
      <p>
        GoBD und E-Rechnung sind keine Marketingwörter auf dieser Seite. Wenn Rechnungen aus dem System gehen, tun sie das so, dass der Betrieb sie seinem Berater zeigen kann. Wenn Unterschriften im Browser sitzen, sitzt der Zeitpunkt, nicht nur das Bild. Details gehören in den Systemplan, nicht in einen Satz, der jede Prüfung überlebt, weil er nichts sagt.
      </p>
      <p>
        Gewerke mit Ablauf-Schmerz:{" "}
        <Link href="/gewerke#elektrotechnik">Elektrotechnik und VOB-Nachweise</Link>,{" "}
        <Link href="/gewerke#spedition-container">Spedition und Container</Link>,{" "}
        <Link href="/gewerke#galabau">Garten, Landschaft, Pool</Link>,{" "}
        <Link href="/gewerke#metallbau">Metallbau</Link>. Gesehen:{" "}
        <Link href="/referenzen/feinkost-kreta">Feinkost Kreta</Link>.         Gespräch:{" "}
        <Link href="/termin">90 Minuten im Betrieb</Link>.
      </p>

      <PageFaqs items={ablaeufeFaqs} />
      <p className="mt-8">
        <Link href="/termin" className="text-[#198BE8] underline-offset-4 hover:underline">
          Erstgespräch vereinbaren — 90 Minuten im Betrieb
        </Link>
        {" · "}
        <Link href="/leistungen/auftritt" className="text-[#198BE8] underline-offset-4 hover:underline">
          Zum Auftritt
        </Link>
        {" · "}
        <Link href="/leistungen/annahme" className="text-[#198BE8] underline-offset-4 hover:underline">
          Zur Annahme
        </Link>
        {" · "}
        <Link href="/preise" className="text-[#198BE8] underline-offset-4 hover:underline">
          Zur Preistabelle
        </Link>
      </p>
    </DocPage>
    <TradeSelector />
    <Proof />
    </>
  );
}
