import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { LivingChat } from "@/components/living-chat";
import { PageFaqs } from "@/components/page-faqs";
import { annahmeFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Annahme — KI-Setter für Betriebe",
  description:
    "KI-Setter nimmt Anfragen an, qualifiziert und bucht den Kalender. 1.900 Euro plus 99 Euro im Monat. Aus Hagen für NRW.",
  path: "/leistungen/annahme",
});

export default function AnnahmePage() {
  return (
    <>
      <DocPage
        kicker="Annahme · KI-Setter"
        title="Der Setter nimmt an, während Sie auf der Baustelle sind"
        lead="Eintausendneunhundert Euro Einrichtung und neunundneunzig Euro im Monat: Anfragen per Text, Qualifizierung, zwei Terminslots, Eintrag im Meisterkalender."
        crumbs={[
          { name: "Leistungen", path: "/leistungen" },
          { name: "Annahme", path: "/leistungen/annahme" },
        ]}
        extraJsonLd={[
          serviceOffer({
            name: "KI-Setter",
            description:
              "Annahme, Vorqualifizierung und Kalenderbuchung für Betriebe in Nordrhein-Westfalen.",
            path: "/leistungen/annahme",
            offers: [
              { name: "KI-Setter Einrichtung", price: "1900" },
              { name: "KI-Setter Wartung", price: "99", unit: "MON" },
            ],
          }),
          faqPage(annahmeFaqs),
        ]}
        related={[
          { href: "/leistungen/auftritt", label: "Auftritt: Website, die die Anfragen überhaupt erst holt" },
          { href: "/leistungen/ablaeufe", label: "Abläufe, wenn nach dem Termin das Papier beginnt" },
          { href: "/referenzen/feinkost-kreta", label: "Bestell-App Feinkost Kreta" },
          { href: "/foerderung/mid-digitale-prozesse", label: "MID Digitale Prozesse als möglicher Zuschuss" },
        ]}
      >
        <h2>Was ist der KI-Setter?</h2>
        <p className="answer">
          Der KI-Setter ist die Annahmeebene: er beantwortet Anfragen in Sekunden per Text, stellt die Qualifizierungsfragen und legt einen Termin in Ihren Kalender.
        </p>
        <p>
          Das klassische Bild: Der Meister steht auf dem Dach, das Festnetz klingelt im Büro, die Mailbox nimmt auf, der Rückruf kommt am Mittwoch. Der Kunde hat da schon drei andere Betriebe gefragt. Der Setter ändert die Reihenfolge. Die Anfrage landet auf WhatsApp Business. In Sekunden kommen zwei freie Slots. Der Kunde sagt zu. Der Termin sitzt beim Meister. Kein Telefonat in der Leiter, keine Mailbox, kein Zettel auf dem Armaturenbrett.
        </p>
        <p>
          Qualifizierung heißt: Dach oder Anbau, tropft es, PLZ, Fotos. Beim Notdienst: Störung oder Sanierung, Schadensbild, Zugänglichkeit. Beim Kältebetrieb: Kältemittel, Anlagennummer, Fehlerbild, bevor der Techniker ausfährt. Der Setter ersetzt nicht den Meister. Er ersetzt das Liegenlassen.
        </p>

        <h2>Was kostet der KI-Setter?</h2>
        <p className="answer">
          Der KI-Setter kostet eintausendneunhundert Euro Einrichtung und neunundneunzig Euro Wartung im Monat.
        </p>

        <DataTable
          caption="KI-Setter, Leistung und Preis"
          headers={["Position", "Inhalt", "Endpreis"]}
          rows={[
            [
              "Einrichtung",
              "WhatsApp-Annahme, Fragenkatalog, Kalender, Qualifizierung",
              "1.900 Euro",
            ],
            [
              "Wartung",
              "Betrieb, Anpassungen am Katalog, Störungsbehebung",
              "99 Euro im Monat",
            ],
          ]}
        />
        <p>
          Alle Endpreise neben Website und Fundament:{" "}
          <Link href="/preise">Preistabelle</Link>.
        </p>

        <h2>Wie unterscheidet sich der Setter von einem Chatbot auf der Website?</h2>
        <p className="answer">
          Ein Website-Chatbot sammelt oft nur eine Mailadresse; der Setter schließt den Kreis bis zum Kalendereintrag und bleibt dort, wo Kunden sowieso schreiben: auf WhatsApp.
        </p>
        <p>
          Betriebe in Hagen und im Ennepe-Ruhr-Kreis bekommen Anfragen selten über ein Kontaktformular, das niemand liest. Sie bekommen sie über die Nummer auf dem Transporter, über Google und über Weiterempfehlung. Der Setter hängt an diesem Kanal. Er kennt Ihre Slots, nicht eine generische „wir rufen zurück“-Floskel. Lead-Reaktivierung gehört dazu: wer vor drei Wochen geschrieben und nicht gebucht hat, bekommt eine saubere Nachfrage, bevor die Nummer in einem Zettelstapel verschwindet.
        </p>
        <p>
          Der Setter ist die mittlere Ebene. Ohne Website bleiben Sie unsichtbar. Ohne Abläufe bleibt nach dem Termin das Papier. Deshalb verlinken wir bewusst:{" "}
          <Link href="/leistungen/auftritt">Website für Betriebe</Link> holt die Anfrage,{" "}
          <Link href="/leistungen/ablaeufe">interne Abläufe</Link> tragen sie durch den Auftrag. Die Bestell-App von{" "}
          <Link href="/referenzen/feinkost-kreta">Feinkost Kreta</Link> zeigt, wie Bestellung und Benachrichtigung in einem Weg zusammenlaufen — ein anderes Gewerk, dieselbe Idee: nichts bleibt liegen.
        </p>

        <h2>Wer braucht den Setter zuerst?</h2>
        <p className="answer">
          Zuerst brauchen ihn Betriebe, die Anfragen verpassen, weil tagsüber niemand fest im Büro sitzt — Dachdecker, SHK-Notdienst, Kälte, Nutzfahrzeuge, jeder Außendienst.
        </p>
        <p>
          Ein Inhaber mit ein bis fünf Leuten ist selbst der Engpass. Sechs bis zwanzig Mitarbeiter schieben die Disposition ins Büro, das Büro schafft die Flut nicht. Über zwanzig verdoppelt sich das Problem über Standorte. Der Setter skaliert die erste Minute, nicht die Baustelle.
        </p>
        <p>
          Interne Digitalisierung dieses Zuschnitts kann in Nordrhein-Westfalen unter{" "}
          <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse</Link> fallen: fünfzig Prozent, höchstens fünfzehntausend Euro, Antrag vor Arbeitsbeginn, Fenster bis zum 1. Dezember 2026. Ob Ihr Setter förderfähig ist, klären wir gegen die aktuelle Richtlinie — nicht gegen Wunschdenken.
        </p>
        <p>
          Einrichtung in Wochen, nicht in Quartalen. Ein Ansprechpartner in Hagen. Daten in der Europäischen Union. Kalender bleibt Ihrer, WhatsApp bleibt Ihre Nummer. Wer den Fragenkatalog vor Ort durchsprechen will, nutzt{" "}
          <Link href="/kontakt">Kontakt mit Telefon und WhatsApp</Link> oder das{" "}
          <Link href="/termin">kostenlose 90-Minuten-Gespräch</Link>.
        </p>

        <h2>Was tut der Setter nicht?</h2>
        <p className="answer">
          Der Setter diagnostiziert keine Havarie, ersetzt keinen Meister und schreibt keine Rechnung — er schließt die erste Minute und den Kalendereintrag.
        </p>
        <p>
          Ein Kältebetrieb bekommt eine strukturierte Störung, keinen fertigen F-Gase-Bericht. Ein Dachdecker bekommt eine Besichtigung, kein Aufmaß. Ein SHK-Betrieb bekommt die Trennung zwischen tropfendem Heizkessel und geplanter Badsanierung, keine Disposition der Kolonne. Genau deshalb gibt es Module. Wer alles in den Setter stopft, bekommt einen Chat, der sich wichtig anhört und intern nichts trägt.
        </p>
        <p>
          WhatsApp bleibt Ihre Nummer. Der Kalender bleibt Ihrer. Wir richten den Katalog ein und halten ihn in der Wartung nach. Es gibt kein Callcenter in einem Drittland, das „guten Tag, hier ist die Zentrale“ sagt. Es gibt keine Stimme, die sich als Ihr Geselle ausgibt. Text, zwei Slots, Zusage, Eintrag. Die Demo unter diesem Text zeigt genau diesen Takt.
        </p>
        <p>
          Gewerke, bei denen die Annahme der erste Schmerz ist:{" "}
          <Link href="/dachdecker">Dachdecker</Link>,{" "}
          <Link href="/shk-haustechnik">SHK</Link>,{" "}
          <Link href="/kaeltetechnik">Kälte- und Klimatechnik</Link>,{" "}
          <Link href="/nutzfahrzeuge">Nutzfahrzeuge</Link>. Preise ohne Scroll:{" "}
          <Link href="/preise">Endpreistabelle</Link>.
          Der Fragenkatalog entsteht im Gespräch, nicht aus einer Branchenfolie. Was der Setter fragt, ist das, was der Meister sonst auf dem Beifahrersitz notiert.
        </p>

        <PageFaqs items={annahmeFaqs} />
        <p className="mt-8">
          <Link href="/termin" className="text-[#198BE8] underline-offset-4 hover:underline">
            Erstgespräch vereinbaren — 90 Minuten im Betrieb
          </Link>
          {" · "}
          <Link href="/leistungen/auftritt" className="text-[#198BE8] underline-offset-4 hover:underline">
            Zum Auftritt
          </Link>
          {" · "}
          <Link href="/leistungen/ablaeufe" className="text-[#198BE8] underline-offset-4 hover:underline">
            Zu den Abläufen
          </Link>
        </p>
      </DocPage>
      <LivingChat />
    </>
  );
}
