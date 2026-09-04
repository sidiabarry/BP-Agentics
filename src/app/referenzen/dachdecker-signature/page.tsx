import type { Metadata } from "next";
import Link from "next/link";
import { DemoLoop } from "@/components/demo-player";
import { DataTable, DocPage } from "@/components/doc-page";
import { videoObject } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dachdecker Signature-Website",
  description:
    "Signature-Website für einen Dachdeckerbetrieb: Scroll-Choreografie, fünfzehn Sekunden Loop, gebaut als Auftritt statt Visitenkarte.",
  path: "/referenzen/dachdecker-signature",
});

export default function DachdeckerSignaturePage() {
  return (
    <DocPage
      kicker="Referenz · Äußere Ebene"
      title="Dachdecker Signature: der Auftritt ist die Arbeitsprobe"
      lead="Eine Scroll-Choreografie für Steildach und Sanierung. Fünfzehn Sekunden Loop, längere Demo auf Klick, gebaut als Verkaufsfläche — nicht als Archiv."
      crumbs={[
        { name: "Referenzen", path: "/referenzen" },
        { name: "Dachdecker Signature", path: "/referenzen/dachdecker-signature" },
      ]}
      extraJsonLd={[
        videoObject({
          name: "Scroll-Choreografie einer Dachdecker-Signature-Website",
          description:
            "Produktdemo: fünfzehn Sekunden Loop der Signature-Website für einen Dachdeckerbetrieb.",
          thumbnailUrl: "/demos/dach-poster.jpg",
          contentUrl: "/demos/dach-loop.mp4",
          duration: "PT15S",
          uploadDate: "2026-08-15",
        }),
      ]}
      related={[
        { href: "/leistungen/website", label: "Website Start, Betrieb und Signature" },
        { href: "/dachdecker", label: "Dachdecker in Hagen: Engpass und Konfiguration" },
        { href: "/referenzen/feinkost-kreta", label: "Die innere Ebene: Feinkost Kreta" },
        { href: "/preise", label: "Signature ab 7.900 Euro, Wartung 290 Euro" },
      ]}
    >
      <DemoLoop
        src="/demos/dach-loop.mp4"
        poster="/demos/dach-poster.jpg"
        fullSrc="/demos/dach-full.mp4"
        posterAlt="Standbild einer Signature-Website für einen Dachdeckerbetrieb mit Dachaufnahme und Scroll-Choreografie"
        caption="Scroll-Choreografie einer Signature-Website für einen Dachdeckerbetrieb."
        note="Produktdemo · fünfzehn Sekunden Loop · kein Echtbetrieb"
        className="mt-10"
      />

      <h2>Was ist eine Signature-Website für Dachdecker?</h2>
      <p className="answer">
        Eine Signature-Website für Dachdecker ist der öffentliche Verkaufsauftritt: Scroll, Bild und Text arbeiten als Arbeitsprobe, damit Sanierung vor Preiskampf kommt.
      </p>
      <p>
        Der Meister steht auf dem Dach. Die Anfrage muss trotzdem landen — und sie muss die richtige sein. Eine Seite von 2016 mit Stockfoto und „kostenloses Angebot“ holt den Kunden, der drei Betriebe gegeneinander setzt. Signature filtert. Sie zeigt das Gewerk, das Einzugsgebiet, den Anspruch. Die Choreografie ist kein Effekt um des Effekts willen. Sie ist die Fläche, auf der der Betrieb beweist, dass er anders arbeitet als die Nummer aus der Anzeige.
      </p>

      <h2>Was sehen Sie in der Demo?</h2>
      <p className="answer">
        Sie sehen einen fünfzehnsekündigen Loop der Scroll-Choreografie und auf Klick die längere Fassung; das Poster trägt einen beschreibenden Alternativtext.
      </p>

      <DataTable
        caption="Signature-Demo, Dateien und Dauer"
        headers={["Datei", "Rolle", "Dauer"]}
        rows={[
          ["dach-loop.mp4", "Schleife im Hub und auf der Startseite", "15 Sekunden"],
          ["dach-full.mp4", "Längere Fassung im Overlay", "Vollversion"],
          ["dach-poster.jpg", "Erstes Bild und Variante ohne Bewegung", "Standbild"],
        ]}
      />

      <p>
        Dieselbe Demo sitzt auf der Startseite unter den Website-Karten. Hier hat sie eine eigene Adresse, einen eigenen Titel und VideoObject-Markup mit Poster, Inhalt und Dauer PT15S. Es gibt keine Kundenbewertung im Schema und keinen erfundenen Auftragswert.
      </p>

      <h2>Wie hängt das mit Setter, Abläufen und Hagen zusammen?</h2>
      <p className="answer">
        Die Signature-Seite holt die Anfrage; der Setter nimmt sie an, während der Meister auf dem Dach ist; Abläufe tragen Besichtigung und Auftrag — Hagen ist der Sitz, nicht nur ein Ortsname im Footer.
      </p>
      <p>
        Die Gewerkeseite{" "}
        <Link href="/dachdecker">Dachdecker bei BP Agentics</Link> beschreibt den Engpass ohne Demo. Die Leistungsseite{" "}
        <Link href="/leistungen/website">Website für Betriebe</Link> nennt die drei Stufen: Start neunhundertfünfzig Euro, Betrieb dreitausendneunhundert Euro, Signature ab siebentausendneunhundert Euro, Wartung einhundertneunundvierzig bis zweihundertneunzig Euro. Der{" "}
        <Link href="/leistungen/ki-setter">KI-Setter</Link> gehört dazu, wenn die Mailbox das Geschäft macht. MID Digitale Prozesse fördert in der Regel die inneren Prozesse, nicht diese öffentliche Fläche — erklärt unter{" "}
        <Link href="/foerderung/mid-digitale-prozesse">MID Digitale Prozesse</Link>.
      </p>
      <p>
        Die innere Referenz bleibt{" "}
        <Link href="/referenzen/feinkost-kreta">Feinkost Kreta</Link>. Wer den Auftritt für den eigenen Betrieb prüfen will, schreibt über{" "}
        <Link href="/kontakt">Kontakt in Hagen</Link> oder legt das{" "}
        <Link href="/termin">90-Minuten-Gespräch</Link> fest.
      </p>

      <h2>Für welches Dach ist Signature die falsche Stufe?</h2>
      <p className="answer">
        Signature ist die falsche Stufe, wenn der Betrieb unsichtbar ist und zuerst überhaupt eine Seite braucht, die Anfragen holt — dann ist Start oder Betrieb richtig.
      </p>
      <p>
        Ein Einseiter für neunhundertfünfzig Euro behebt jahrelanges Schweigen. Mehrseitig für dreitausendneunhundert Euro trägt Leistungsseiten, ohne Choreografie. Signature beginnt bei siebentausendneunhundert Euro, Wartung zweihundertneunzig Euro, weil die Fläche die Arbeitsprobe ist. Wer Signature kauft, um „modern zu wirken“, kauft den falschen Gegenstand. Wer Signature kauft, weil Preiskämpfer das Telefon zuhängen, kauft den richtigen.
      </p>
      <p>
        Die Gewerkeseite bleibt kürzer und lokal. Diese Referenzseite trägt das Video und die Einordnung. Beide verlinken einander, ohne denselben Text zu kopieren. Das ist Absicht gegen thin content: eine Demo-Adresse, eine Engpass-Adresse, eine Leistungsadresse.
      </p>
      <p>
        Canonical: https://bp-agentics.de/referenzen/dachdecker-signature. NAP: Kleiststraße 9, 58095 Hagen, +49 162 2843869. Kein hreflang, keine zweite Sprache, keine erfundenen Profile unter sameAs.
      </p>
    </DocPage>
  );
}
