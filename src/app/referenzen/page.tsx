import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Referenzen aus Hagen und NRW",
  description:
    "Zwei gebaute Systeme: Feinkost Kreta im Inneren, Dachdecker Signature nach außen. Demos, keine erfundenen Bewertungen.",
  path: "/referenzen",
});

export default function ReferenzenPage() {
  return (
    <DocPage
      kicker="Referenzen"
      title="Zwei Systeme, die man sehen kann"
      lead="Feinkost Kreta ist eine Bestell-App: 1-Klick und Benachrichtigung. Der Dachdecker zeigt das Äußere: eine Signature-Website, die verkauft."
      crumbs={[{ name: "Referenzen", path: "/referenzen" }]}
      related={[
        { href: "/referenzen/feinkost-kreta", label: "Feinkost Kreta: Kundensystem und Phone-Demo" },
        { href: "/referenzen/dachdecker-signature", label: "Dachdecker Signature: Scroll-Choreografie" },
        { href: "/leistungen", label: "Die drei Ebenen hinter beiden Referenzen" },
        { href: "/kontakt", label: "Eigenes Vorhaben in Hagen ansprechen" },
      ]}
    >
      <h2>Welche Referenzen zeigt BP Agentics?</h2>
      <p className="answer">
        BP Agentics zeigt zwei gebaute Systeme: das Kundensystem von Feinkost Kreta und die Signature-Website eines Dachdeckerbetriebs — jeweils mit Produktdemo, ohne erfundene Sterne.
      </p>
      <p>
        Agenturseiten stapeln Logos und fünf-Sterne-Zitate. Das tun wir nicht. Es gibt keine Bewertungen in den strukturierten Daten und keine erfundenen Fallstudien. Es gibt zwei Wege, die man abspielen kann. Der eine ist eine Bestell-App: ein Klick, die Bestellung sitzt, die Benachrichtigung geht raus. Der andere sitzt außen vor einem Handwerksbetrieb: Scroll, Bild, Angebot. Beide sind in Hagen entstanden. Feinkost ist kein Auftritt — das ist der Dachdecker.
      </p>

      <DataTable
        caption="Die zwei Referenzwege"
        headers={["Referenz", "Ebene", "Was Sie sehen", "Seite"]}
        rows={[
          [
            "Feinkost Kreta",
            "Bestell-App",
            "1-Klick und Benachrichtigung",
            "Kundensystem",
          ],
          [
            "Dachdecker Signature",
            "Auftritt",
            "Loop der Scroll-Choreografie, fünfzehn Sekunden",
            "Signature-Website",
          ],
        ]}
      />

      <h2>Warum nur zwei Fälle und keine Gallery?</h2>
      <p className="answer">
        Weil zwei ehrliche Systeme mehr sagten als zwölf austauschbare Screenshots ohne Kontext.
      </p>
      <p>
        Feinkost Kreta ist eine Bestell-App, kein Schaufenster. Man sieht 1-Klick-Bestellung und Benachrichtigung, nicht eine Hochglanz-Startseite. Genau das brauchen Inhaber, die abends noch Excel offen haben. Die ausführliche Beschreibung und die Phone-Demo stehen unter{" "}
        <Link href="/referenzen/feinkost-kreta">Feinkost Kreta Kundensystem</Link>.
      </p>
      <p>
        Der Dachdecker ist die öffentliche Arbeitsprobe. Preiskämpfer sollen nicht anrufen. Sanierung und Steildach sollen sichtbar sein, während der Meister auf dem Dach steht. Loop und längere Demo stehen unter{" "}
        <Link href="/referenzen/dachdecker-signature">Dachdecker Signature-Website</Link>.
      </p>
      <p>
        Weitere Gewerke beschreiben wir auf eigenen Seiten — Dachdecker, SHK, Elektro, Kälte, Spedition, Galabau, Metallbau, Nutzfahrzeuge — jeweils mit Engpass und Konfiguration, nicht mit einer erfundenen Erfolgsstory. Die Startseite bleibt die Verkaufsstrecke. Diese Hub-Seite ist der Index für Menschen und für Suchmaschinen, die „Referenz Hagen Handwerk System“ suchen.
      </p>

      <h2>Was ist eine Produktdemo — und was nicht?</h2>
      <p className="answer">
        Eine Produktdemo ist ein Schnitt des gebauten Systems; sie ist kein Mitschnitt eines echten Kundentelefonats und kein Versprechen, dass jeder Betrieb identisch aussieht.
      </p>
      <p>
        Auf den Unterseiten steht das sichtbar. Die Demos laden erst, wenn sie nahe am Viewport sind. Wer weniger Bewegung will, sieht das Poster. Poster und Schleifen haben beschreibende Texte, keine leeren Dateinamen. Es gibt keine Fake-Reviews, keine Search-Box im Schema, keine erfundenen sameAs-Profile.
      </p>
      <p>
        Wenn Ihr Betrieb in dieselbe Richtung will — Auftritt, Annahme oder Abläufe — stehen die Leistungsseiten bereit. Preise ohne Scroll liegen unter{" "}
        <Link href="/preise">Preise für Website und Systeme</Link>. Förderung interner Prozesse unter{" "}
        <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse</Link>. Gespräch und Anschrift unter{" "}
        <Link href="/kontakt">Kontakt in Hagen</Link>.
      </p>
      <h2>Für wen sind diese zwei Fälle gedacht?</h2>
      <p className="answer">
        Die zwei Fälle sind für Inhaber gedacht, die entweder innen im Bestand oder außen im Auftritt denselben Schnitt brauchen — nicht für eine Agentur-Pitchdeck-Galerie.
      </p>
      <p>
        Wer Feinkost Kreta öffnet und denkt „das ist Handel, ich bin Dachdecker“, hat den Punkt verpasst. Das Muster ist dasselbe: Daten, die im Kopf oder auf Zetteln leben, gehören auf das Gerät, das sowieso in der Hand ist. Wer den Dachdecker öffnet und denkt „ich brauche keinen Film“, hat den anderen Punkt verpasst. Der Film ist die Fläche, auf der der Betrieb beweist, dass er nicht die Nummer aus der Anzeige ist.
      </p>
      <p>
        Weitere Betriebe beschreiben wir auf den Gewerkeseiten, ohne so zu tun, als läge dort bereits eine gebaute Demo. Das ist Absicht. Eine ehrliche Website trennt gebaut und beschrieben. Suchmaschinen sollen das ebenfalls trennen: VideoObject nur dort, wo ein Video liegt. FAQPage nur dort, wo die Fragen sichtbar sind. Offer nur dort, wo Preise stehen.
      </p>
      <p>
        NAP bleibt Kleiststraße 9, 58095 Hagen, +49 162 2843869. Dieselbe Zeile wie im Footer. Wer uns zitiert, soll uns wiederfinden.
      </p>
      <ul>
        <li>
          <Link href="/referenzen/feinkost-kreta">Zum Kundensystem Feinkost Kreta</Link>
        </li>
        <li>
          <Link href="/referenzen/dachdecker-signature">Zur Signature-Choreografie des Dachdeckers</Link>
        </li>
        <li>
          <Link href="/leistungen">Zu den drei Leistungsebenen</Link>
        </li>
      </ul>
    </DocPage>
  );
}
