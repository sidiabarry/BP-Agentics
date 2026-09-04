import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { PageFaqs } from "@/components/page-faqs";
import { auftrittFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Auftritt — Website für Betriebe in NRW",
  description:
    "Website Start 950 Euro, Betrieb 3.900 Euro, Signature ab 7.900 Euro. Wartung 149 bis 290 Euro. Gebaut in Hagen.",
  path: "/leistungen/auftritt",
});

export default function AuftrittPage() {
  return (
    <DocPage
      kicker="Auftritt · Websites"
      title="Eine Website, die Anfragen holt — nicht nur existiert"
      lead="Drei feste Stufen für Betriebe in Hagen und Nordrhein-Westfalen: Start, Betrieb und Signature. Die Seite gehört Ihnen ab Zahlung des Einbaus."
      crumbs={[
        { name: "Leistungen", path: "/leistungen" },
        { name: "Auftritt", path: "/leistungen/auftritt" },
      ]}
      extraJsonLd={[
        serviceOffer({
          name: "Website für Betriebe",
          description:
            "Website Start, Betrieb und Signature für Handwerk und lokale Betriebe in Nordrhein-Westfalen.",
          path: "/leistungen/auftritt",
          offers: [
            { name: "Website Start", price: "950" },
            { name: "Website Betrieb", price: "3900" },
            { name: "Website Signature", price: "7900" },
            { name: "Wartung Start und Betrieb", price: "149", unit: "MON" },
            { name: "Wartung Signature", price: "290", unit: "MON" },
          ],
        }),
        faqPage(auftrittFaqs),
      ]}
      related={[
        { href: "/leistungen/annahme", label: "Annahme: KI-Setter, wenn Anfragen liegen bleiben" },
        { href: "/leistungen/ablaeufe", label: "Abläufe: wenn nach dem Termin das Papier beginnt" },
        { href: "/referenzen/dachdecker-signature", label: "Signature-Choreografie eines Dachdeckerbetriebs" },
        { href: "/preise", label: "Endpreise aller Stufen in einer Tabelle" },
        { href: "/dachdecker", label: "Dachdecker-Seite mit lokalem Zuschnitt" },
      ]}
    >
      <h2>Was ist eine Website von BP Agentics?</h2>
      <p className="answer">
        Eine Website von BP Agentics ist der öffentliche Auftritt eines Betriebs: sie holt die richtigen Anfragen und macht die Arbeitsprobe sichtbar, statt eine veraltete Visitenkarte zu sein.
      </p>
      <p>
        Viele Firmenwebsites im Handwerk sind vor Jahren entstanden und haben seit zwei Jahren keinen rentablen Auftrag gebracht. Sie sprechen Preiskämpfer an oder niemand. Eine Seite, die verkauft, filtert. Sie zeigt Gewerk, Einzugsgebiet und den Anspruch, bevor jemand anruft. In Hagen und den Nachbarstädten reicht „wir sind seit 1987 für Sie da“ nicht mehr, wenn der Wettbewerber schneller antwortet und klarer wirkt.
      </p>
      <p>
        BP Agentics baut drei Stufen. Start ist ein Einseiter für Betriebe, deren Auftritt schweigt. Betrieb ist mehrseitig, mit Leistungsseiten und Referenzen, ohne Sonderanfertigung. Signature ist die Choreografie für Betriebe, die über die Website verkaufen — der Auftritt ist dann die Arbeitsprobe, nicht die Broschüre.
      </p>

      <h2>Was kosten Website Start, Betrieb und Signature?</h2>
      <p className="answer">
        Website Start kostet neunhundertfünfzig Euro, Website Betrieb dreitausendneunhundert Euro und Website Signature beginnt bei siebentausendneunhundert Euro; die Wartung liegt bei einhundertneunundvierzig bis zweihundertneunzig Euro im Monat.
      </p>

      <DataTable
        caption="Website-Stufen und Endpreise"
        headers={["Stufe", "Einbau", "Wartung", "Umfang"]}
        rows={[
          [
            "Start",
            "950 Euro",
            "149 Euro im Monat, zwölf Monate",
            "Einseiter, der Anfragen holt",
          ],
          [
            "Betrieb",
            "3.900 Euro",
            "149 Euro im Monat, zwölf Monate",
            "Mehrseitig, Leistungen und Referenzen",
          ],
          [
            "Signature",
            "ab 7.900 Euro",
            "290 Euro im Monat",
            "Scroll-Choreografie, Verkaufsauftritt",
          ],
        ]}
      />
      <p>
        Die gleiche Tabelle mit Setter, Fundament und Eigentum steht unter{" "}
        <Link href="/preise">Preise für Website und Systeme</Link>.
      </p>

      <h2>Was steckt in der monatlichen Wartung?</h2>
      <p className="answer">
        Die Wartung deckt Hosting in Deutschland, SSL, Sicherheitsupdates, tägliche Backups, bis zu drei Textänderungen im Monat und Störungsbehebung innerhalb von vierundzwanzig Stunden an Werktagen.
      </p>
      <p>
        Sie zahlen für die Wartung, nicht für Ihr Eigentum. Die Seite gehört Ihnen ab Zahlung des Einbaus. Nach zwölf Monaten ist der Vertrag monatlich kündbar. Bei Kündigung übergeben wir die vollständigen Dateien, kostenfrei. Das ist derselbe Gedanke, den ein Betrieb seinen eigenen Wartungskunden schreibt: das Arbeitsmittel bleibt beim Kunden, die Pflege ist die Leistung.
      </p>
      <p>
        Signature kostet in der Wartung zweihundertneunzig Euro, weil die Choreografie, die Medien und die technische Fläche größer sind als ein Einseiter. Start und Betrieb bleiben bei einhundertneunundvierzig Euro. Alle Preise sind Endpreise.
      </p>

      <h2>Für wen eignet sich welche Stufe?</h2>
      <p className="answer">
        Start eignet sich, wenn seit Jahren niemand die Seite relevant findet; Betrieb, wenn der Betrieb gefunden werden will, ohne Sonderanfertigung; Signature, wenn die Website selbst verkaufen soll.
      </p>
      <p>
        Ein Malerbetrieb mit fünf Leuten und einer Seite von 2014 nimmt Start. Ein SHK-Betrieb, der Badsanierung und Notdienst trennen muss, nimmt Betrieb, weil er Leistungsseiten braucht. Ein Dachdecker, der Steildach und Premium-Sanierung verkauft und Preiskämpfer fernhalten will, nimmt Signature. Die Demo dieser Choreografie steht unter{" "}
        <Link href="/referenzen/dachdecker-signature">Dachdecker Signature-Website</Link>.
      </p>
      <p>
        Eine Website holt Anfragen. Sie nimmt sie nicht an. Wenn tagsüber niemand ans Telefon geht, gehört der{" "}
        <Link href="/leistungen/annahme">KI-Setter</Link> dazu oder danach. Wenn Angebote und Rechnungen bis zum Abend liegen bleiben, gehören die{" "}
        <Link href="/leistungen/ablaeufe">internen Abläufe</Link> dazu. Die MID-Förderung in Nordrhein-Westfalen zielt auf Prozesse, nicht auf reine Marketingseiten — Details auf{" "}
        <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse</Link>.
      </p>
      <p>
        Gebaut wird in Hagen, Daten liegen in der Europäischen Union. Ein Ansprechpartner, höchstens sechs Wochen Einbau, ein dreißigminütiger Termin pro Woche. Der Betrieb läuft weiter. Wer den Zuschnitt vor Ort klären will, schreibt über die{" "}
        <Link href="/kontakt">Kontaktseite mit Anschrift und Telefon</Link> oder legt das{" "}
        <Link href="/termin">90-Minuten-Gespräch</Link> fest.
      </p>

      <h2>Was gehört nicht zur Website?</h2>
      <p className="answer">
        Nicht zur Website gehören Annahme, Qualifizierung, Kalenderbuchung, Lager, Lieferschein und Rechnung — das sind Setter und Abläufe.
      </p>
      <p>
        Wir mischen das bewusst nicht in ein „Rundum-sorglos-Paket“, das niemand vergleichen kann. Wer eine Signature-Seite kauft, kauft den Auftritt. Wer später den Setter nachrüstet, zahlt den Setter, nicht die Seite noch einmal. Wer MID beantragen will, beantragt Prozesse. Eine neue Startseite als alleiniger Gegenstand ist selten förderfähig. Diese Trennung schützt Sie vor einem Antrag, der an der Richtlinie scheitert, und uns vor einem Leistungsversprechen, das drei Ebenen unter einem Preis verbirgt.
      </p>
      <p>
        Texte schreibt ein Mensch, der den Betrieb gesehen hat. Keine Lorem-Seite, keine Stock-Belegschaft. Bilder und Choreografie sitzen dort, wo sie die Arbeitsprobe tragen. Hosting bleibt in Deutschland. Es gibt kein Baukasten-Login, in dem Sie nach sechs Monaten allein dastehen. Es gibt Dateien, die Ihnen gehören, und einen Wartungsvertrag, den Sie kündigen können.
      </p>
      <p>
        Gewerke mit eigenem Einstieg:{" "}
        <Link href="/dachdecker">Dachdecker</Link>,{" "}
        <Link href="/shk-haustechnik">SHK und Haustechnik</Link>,{" "}
        <Link href="/elektrotechnik">Elektrotechnik</Link>,{" "}
        <Link href="/metallbau">Metallbau</Link>. Die Startseite bleibt die Übersicht. Diese Seite ist die Leistungsbeschreibung für Menschen, die „Website Handwerk Hagen Festpreis“ suchen und eine klare Stufe wollen. Der Preis nach dem Gespräch ändert sich nicht. Offene Stundensätze gibt es nicht.
      </p>

      <PageFaqs items={auftrittFaqs} />
      <p className="mt-8">
        <Link href="/termin" className="text-[#198BE8] underline-offset-4 hover:underline">
          Erstgespräch vereinbaren — 90 Minuten im Betrieb
        </Link>
        {" · "}
        <Link href="/leistungen/annahme" className="text-[#198BE8] underline-offset-4 hover:underline">
          Zur Annahme
        </Link>
        {" · "}
        <Link href="/leistungen/ablaeufe" className="text-[#198BE8] underline-offset-4 hover:underline">
          Zu den Abläufen
        </Link>
      </p>
    </DocPage>
  );
}
