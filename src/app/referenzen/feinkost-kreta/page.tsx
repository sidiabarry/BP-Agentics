import type { Metadata } from "next";
import Link from "next/link";
import { PhoneDemo } from "@/components/demo-player";
import { DataTable, DocPage } from "@/components/doc-page";
import { videoObject } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Feinkost Kreta Kundensystem",
  description:
    "Kundensystem für Feinkost Kreta: Annahme, Bestand und Bestellweg auf dem Telefon. Produktdemo aus Hagen.",
  path: "/referenzen/feinkost-kreta",
});

export default function FeinkostPage() {
  return (
    <DocPage
      kicker="Referenz · Bestell-App"
      title="Feinkost Kreta: 1-Klick-Bestellung, Benachrichtigung, fertig"
      lead="Eine vollständige Bestell-App — nicht der öffentliche Auftritt. Ein Klick, die Bestellung sitzt, die Benachrichtigung geht raus. Gebaut in Hagen, sichtbar als Phone-Demo."
      crumbs={[
        { name: "Referenzen", path: "/referenzen" },
        { name: "Feinkost Kreta", path: "/referenzen/feinkost-kreta" },
      ]}
      extraJsonLd={[
        videoObject({
          name: "Bestellweg im Kundensystem Feinkost Kreta",
          description:
            "Produktdemo: Annahme und Warenweg auf dem Smartphone im System von Feinkost Kreta.",
          thumbnailUrl: "/demos/feinkost-poster.jpg",
          contentUrl: "/demos/feinkost-loop.mp4",
          duration: "PT29S",
          uploadDate: "2026-08-15",
        }),
      ]}
      related={[
        { href: "/leistungen/ablaeufe", label: "Interne Abläufe in derselben Denke" },
        { href: "/leistungen/annahme", label: "KI-Setter für die erste Minute der Annahme" },
        { href: "/referenzen/dachdecker-signature", label: "Die äußere Ebene: Dachdecker Signature" },
        { href: "/foerderung/mid-digitale-prozesse", label: "MID, wenn interne Prozesse gefördert werden" },
      ]}
    >
      <div className="mt-10 rounded-[2rem] bg-[#14161C] px-6 py-10 md:px-10">
        <PhoneDemo
          src="/demos/feinkost-loop.mp4"
          poster="/demos/feinkost-poster.jpg"
          fullSrc="/demos/feinkost-full.mp4"
          posterAlt="Smartphone-Ansicht des Bestellsystems von Feinkost Kreta mit Warenannahme und Kundendaten"
          caption="Bestellweg im Kundensystem Feinkost Kreta: Annahme und Bestand auf dem iPhone."
          note="Produktdemo · kein Mitschnitt eines Kundengesprächs"
          width={300}
        />
      </div>

      <h2>Was ist das Kundensystem von Feinkost Kreta?</h2>
      <p className="answer">
        Das Kundensystem von Feinkost Kreta ist eine Bestell-App: 1-Klick-Bestellung, Benachrichtigung an den Betrieb, Bestand im selben Weg — bedient auf dem Telefon, nicht in einem Ordner hinter der Theke.
      </p>
      <p>
        Ein Feinkostbetrieb verliert Geld, wenn niemand weiß, was da ist, was bestellt wurde und wer gerade anruft. Excel auf dem Ladenschreibtisch und Zettel am Kühlhaus sind dasselbe Muster, das ein Handwerksbetrieb mit Lieferscheinen kennt. Deshalb steht diese Referenz hier: Sie zeigt Abläufe, nicht eine schöne Startseite. Die Demo läuft als Hochformat im Telefonrahmen. Die längere Fassung öffnet sich auf Klick. Wer Bewegung reduziert, sieht das Poster mit beschreibendem Alternativtext.
      </p>

      <h2>Welche Ebene steckt in diesem System?</h2>
      <p className="answer">
        In diesem System stecken Bestellung und Abläufe: 1-Klick, Benachrichtigung, Bestand — nicht der öffentliche Markenauftritt. Das ist eine andere Arbeit als die Dachdecker-Signature.
      </p>

      <DataTable
        caption="Feinkost Kreta, eingeordnet in die drei Ebenen"
        headers={["Ebene", "In dieser Referenz"]}
        rows={[
          ["Auftritt", "Nicht diese Referenz — das ist der Dachdecker"],
          ["Bestell-App", "1-Klick-Bestellung und Benachrichtigung"],
          ["Abläufe", "Bestand und Innenweg statt Zettel"],
        ]}
      />

      <p>
        Wer dasselbe Muster in einem Handwerks- oder Logistikbetrieb braucht, beginnt bei den{" "}
        <Link href="/leistungen/ablaeufe">internen Abläufen</Link>. Wer zuerst den Anruf verliert, beginnt beim{" "}
        <Link href="/leistungen/annahme">KI-Setter</Link>. Eine öffentliche Signature-Seite ist die andere Referenz:{" "}
        <Link href="/referenzen/dachdecker-signature">Dachdecker Signature-Website</Link>.
      </p>

      <h2>Warum liegt die Demo auf einer eigenen Seite?</h2>
      <p className="answer">
        Die Demo liegt auf einer eigenen Seite, damit Suchmaschinen und Menschen einen klaren Gegenstand finden: ein System, einen Betrieb, eine Video-Datei, eine Erklärung.
      </p>
      <p>
        Auf der Startseite sitzt dieselbe Phone-Demo in der Preiskarte der internen Systeme. Dort verkauft sie im Scroll. Hier erklärt sie. VideoObject-Markup beschreibt Name, Poster, Datei und Sprache. Es gibt keine Bewertungssterne und keine erfundenen Umsatzzahlen. Kleiststraße 9 taucht in der längeren Fassung auf, weil dort gearbeitet wurde — das ist der Sitz, nicht ein Studiotrick.
      </p>
      <p>
        Interne Digitalisierung dieses Zuschnitts kann unter{" "}
        <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse</Link> fallen. Die Website-Stufen bleiben getrennt:{" "}
        <Link href="/leistungen/auftritt">Website für Betriebe</Link>. Gespräch und NAP stehen auf der{" "}
        <Link href="/kontakt">Kontaktseite</Link>. Zurück zur Übersicht:{" "}
        <Link href="/referenzen">alle Referenzen</Link>.
      </p>

      <h2>Was kann ein Handwerksbetrieb daraus ableiten?</h2>
      <p className="answer">
        Ein Handwerksbetrieb kann ableiten, dass der innere Weg auf dem Telefon sitzen muss — nicht, dass er eine Feinkosttheke braucht.
      </p>
      <p>
        Lieferschein, Bestand, Bestellung, Annahme: dieselben vier Wörter, anderes Gewerk. Der Containerdienst unterschreibt im Fahrerhaus. Der Elektrobetrieb holt die Unterschrift auf der Fläche. Der Galabau-Trupp prüft, ob der Splitt da ist. Das System ändert die Gewohnheit nicht mit einem Schulungsordner. Es legt sie dorthin, wo die Hand schon ist.
      </p>
      <p>
        Deshalb steht neben dieser Demo kein erfundener Satz wie „Umsatz plus vierzig Prozent“. Es steht, was gebaut wurde und wie man es ansieht. Wer Zahlen für den eigenen Betrieb will, bekommt sie im Systemplan nach dem Gespräch — aus seinen Engpässen, nicht aus einer Referenzfolie.
      </p>
      <p>
        Sidia Jerome Barry, Hagen. Dieselbe Anschrift wie im Impressum. Dieselbe Nummer wie auf WhatsApp. Kein zweiter Markenname, kein englischer Landing-Clone unter einer anderen Domain in den Canonicals.         Canonical ist https://bpagentics.com/referenzen/feinkost-kreta.
        Wer denselben inneren Schnitt für den eigenen Betrieb will, beschreibt im
        Gespräch den Engpass, nicht die Theke. Wir sagen, welches Modul zuerst
        schließt und ob MID den Eigenanteil tragen kann, bevor irgendjemand einrichtet.
      </p>
    </DocPage>
  );
}
