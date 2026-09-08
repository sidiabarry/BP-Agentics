import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { faqPage, howTo } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "MID Digitale Prozesse in NRW",
  description:
    "MID Digitale Prozesse: 50 Prozent Zuschuss, höchstens 15.000 Euro, Antrag vor Baubeginn, Fenster bis 1. Dezember 2026.",
  path: "/foerderung/mid-digitale-prozesse",
});

const midFaqs = [
  {
    q: "Was ist MID Digitale Prozesse?",
    a: "MID Digitale Prozesse ist ein Förderbaustein der Landesregierung Nordrhein-Westfalen für mittelständische Betriebe, die interne Geschäftsprozesse digitalisieren — nicht für reine Werbewebsites.",
  },
  {
    q: "Wie viel Zuschuss gibt es?",
    a: "Der Zuschuss beträgt bis zu fünfzig Prozent der förderfähigen Kosten, höchstens fünfzehntausend Euro.",
  },
  {
    q: "Wer kann den Antrag stellen?",
    a: "Kleine und mittlere Unternehmen mit Sitz oder Betriebsstätte in Nordrhein-Westfalen, typischerweise Handwerk, Handel und produktionsnahe Dienstleister — die genaue Abgrenzung steht in der aktuellen Richtlinie.",
  },
  {
    q: "Wann darf die Arbeit beginnen?",
    a: "Die Arbeit darf erst beginnen, wenn der Förderbescheid vorliegt. Ein früherer Start gefährdet den Zuschuss.",
  },
  {
    q: "Was ist in der Regel nicht förderfähig?",
    a: "Nicht förderfähig sind in der Regel bereits begonnene Vorhaben, reine Hardware ohne Prozessänderung, laufende Betriebskosten und ein öffentlicher Auftritt, der nur Marketing ist.",
  },
  {
    q: "Wie läuft das Verfahren?",
    a: "Das Verfahren ist ein Windhundverfahren: vollständig eingereichte Anträge werden nach Eingang beschieden, solange Mittel im Fenster bis zum 1. Dezember 2026 verfügbar sind.",
  },
];

const midSteps = [
  {
    name: "Engpass im Betrieb beschreiben",
    text: "Im 90-Minuten-Gespräch klären wir, welcher interne Prozess digitalisiert werden soll und ob er zur Richtlinie passt.",
  },
  {
    name: "Unterlagen und Systemplan",
    text: "Sie erhalten einen Systemplan mit Festpreis. Die Unterlagen für den Antrag werden zusammengestellt, bevor irgendetwas gebaut wird.",
  },
  {
    name: "Antrag einreichen",
    text: "Der Antrag geht vollständig an die zuständige Stelle. Unvollständige Anträge verlieren im Windhundverfahren Zeit.",
  },
  {
    name: "Auf den Bescheid warten",
    text: "Solange kein Bescheid da ist, beginnt keine förderfähige Arbeit. Die Reihenfolge ist Vorschrift.",
  },
  {
    name: "Erst danach einbauen",
    text: "Nach dem Bescheid bauen wir Setter, Fundament oder Module zum vereinbarten Festpreis.",
  },
];

export default function MidPage() {
  return (
    <DocPage
      kicker="Förderung Nordrhein-Westfalen"
      title="MID Digitale Prozesse: Zuschuss, bevor jemand baut"
      lead="Fünfzig Prozent der förderfähigen Kosten, höchstens fünfzehntausend Euro, Antrag vor Arbeitsbeginn, Einreichfenster bis zum 1. Dezember 2026."
      crumbs={[
        { name: "MID Digitale Prozesse", path: "/foerderung/mid-digitale-prozesse" },
      ]}
      reviewed="2026-09-04"
      extraJsonLd={[
        faqPage(midFaqs),
        howTo({
          name: "MID Digitale Prozesse beantragen, bevor BP Agentics baut",
          description:
            "Reihenfolge vom Gespräch bis zum Einbau, ohne Arbeit vor dem Förderbescheid.",
          steps: midSteps,
        }),
      ]}
      related={[
        { href: "/leistungen/ablaeufe", label: "Interne Abläufe: typisch förderfähiger Kern" },
        { href: "/leistungen/annahme", label: "KI-Setter als digitalisierte Annahme" },
        { href: "/leistungen/auftritt", label: "Website — meist Marketing, selten MID-Kern" },
        { href: "/preise", label: "Endpreise, gegen die der Zuschuss gerechnet wird" },
        { href: "/kontakt", label: "Förderfähigkeit in Hagen ansprechen" },
      ]}
    >
      <h2>Was ist MID Digitale Prozesse?</h2>
      <p className="answer">
        MID Digitale Prozesse ist ein Förderbaustein der Landesregierung Nordrhein-Westfalen für Betriebe, die interne Abläufe digitalisieren — Annahme, Dokumentation, Lager, Rechnung — nicht für eine reine Werbesite.
      </p>
      <p>
        MID steht für Mittelstand Innovativ und Digital. Der Baustein Digitale Prozesse zielt auf die Stelle, an der der Betrieb Zeit und Geld verliert: Papier, Medienbrüche, doppelte Erfassung, Feierabend am Schreibtisch. BP Agentics in Hagen begleitet den Antrag, bevor wir bauen. Die Reihenfolge ist Vorschrift, nicht Kür. Ob Ihr Vorhaben unter die aktuelle Richtlinie fällt, prüfen wir gegen den Text der Landesregierung, nicht gegen eine Agenturfolie.
      </p>
      <p>
        Typische Vorhaben aus unserem Zuschnitt: der{" "}
        <Link href="/leistungen/annahme">KI-Setter</Link> als digitalisierte Annahme und die{" "}
        <Link href="/leistungen/ablaeufe">internen Abläufe</Link> mit Fundament und Modulen. Eine{" "}
        <Link href="/leistungen/auftritt">Signature-Website</Link> ist der öffentliche Auftritt. Sie kann sinnvoll sein, ist aber oft nicht der förderfähige Kern.
      </p>

      <h2>Wie viel Zuschuss gibt es?</h2>
      <p className="answer">
        Es gibt bis zu fünfzig Prozent der förderfähigen Kosten, höchstens fünfzehntausend Euro.
      </p>
      <p>
        Ein Fundament ab zweitausendvierhundertneunzig Euro kann unter dieser Decke liegen. Ein Setter für eintausendzweihundertneunzig Euro ebenfalls. Die genaue förderfähige Summe hängt von Richtlinie, De-minimis und Ihrem Vorhaben ab — nicht von der Preistabelle allein. Alle unsere Listenpreise sind Endpreise. Den aktuellen Stand der Richtlinie lesen wir vor jedem Antrag neu.
      </p>

      <DataTable
        caption="Was MID Digitale Prozesse typischerweise trifft"
        headers={["Thema", "Kurzfassung"]}
        rows={[
          ["Höhe", "Bis 50 Prozent, höchstens 15.000 Euro"],
          ["Fenster", "Einreichung bis 1. Dezember 2026"],
          ["Vergabe", "Windhund: nach vollständigem Eingang"],
          ["Start der Arbeit", "Erst nach dem Förderbescheid"],
          ["Ort", "Betrieb in Nordrhein-Westfalen"],
          ["Kern", "Interne Prozesse, nicht reine Werbung"],
        ]}
      />

      <h2>Wer kann den Antrag stellen?</h2>
      <p className="answer">
        Stellen können ihn kleine und mittlere Unternehmen mit Sitz oder Betriebsstätte in Nordrhein-Westfalen, sofern sie die Kriterien der geltenden Richtlinie erfüllen.
      </p>
      <p>
        In der Praxis sitzen unsere Gesprächspartner in Hagen, Iserlohn, Lüdenscheid, Witten, Schwelm, im Ennepe-Ruhr-Kreis und im Märkischen Kreis. Handwerk, Außendienst, Logistik, Werkstatt. Mitarbeiterzahl allein entscheidet nicht. Entscheidend ist, ob ein interner Prozess digitalisiert wird und ob das Unternehmen in die Größenklasse der Richtlinie fällt. Wir ersetzen keine Steuerberatung und keine Bewilligungsstelle. Wir bauen das Vorhaben so, dass der Antrag dazu passt — oder wir sagen, dass MID hier nicht trägt.
      </p>

      <h2>Wie läuft das Verfahren ab?</h2>
      <p className="answer">
        Das Verfahren ist ein Windhundverfahren: wer vollständige Unterlagen zuerst einreicht, wird zuerst beschieden, solange Mittel im Fenster bis zum 1. Dezember 2026 da sind.
      </p>
      <ol>
        {midSteps.map((step) => (
          <li key={step.name}>
            <strong>{step.name}.</strong> {step.text}
          </li>
        ))}
      </ol>
      <p>
        Unvollständige Anträge verlieren Zeit. Zeit ist in einem Windhundfenster Geld. Deshalb steht der Systemplan mit Festpreis, bevor jemand Code schreibt oder ein Modul einrichtet.
      </p>

      <h2>Was ist nicht förderfähig?</h2>
      <p className="answer">
        Nicht förderfähig sind in der Regel bereits begonnene Arbeiten, reine Hardware ohne geänderten Prozess, laufende Betriebskosten und ein Auftritt, der nur Werbung ist.
      </p>
      <p>
        Wer uns beauftragt, „schon mal anzufangen, der Bescheid kommt schon“, gefährdet den Zuschuss. Wer nur Laptops kauft, digitalisiert nichts. Wer nur eine neue Startseite will, beantragt das falsche Programm. Wartung nach dem Einbau ist Betrieb, nicht Vorhaben. Die verbindliche Liste steht in der Richtlinie und in den FAQs der Bewilligungsstelle — nicht in diesem Absatz. Wir halten uns daran.
      </p>

      <h2>Warum die Reihenfolge vor dem Bescheid?</h2>
      <p className="answer">
        Weil förderfähige Vorhaben nicht vor Bewilligung beginnen dürfen: erst Gespräch, dann Unterlagen, dann Antrag, dann Bescheid, dann Einbau.
      </p>
      <p>
        Das ist unbequem, wenn der Schreibtisch brennt. Es ist trotzdem die einzige Reihenfolge, die den Zuschuss nicht verspielt. Parallel können wir den öffentlichen Auftritt planen, wenn er getrennt beauftragt und nicht in denselben förderfähigen Topf gemischt wird. Transparenz im Systemplan verhindert genau das.
      </p>

      <h2 id="faq">Häufige Fragen zu MID Digitale Prozesse</h2>
      <p className="answer">
        Die sechs Fragen unten sind dieselben, die Inhaber im Gespräch zuerst stellen; die Antworten stehen jeweils im ersten Satz.
      </p>
      {midFaqs.map((item) => (
        <section key={item.q} aria-labelledby={item.q}>
          <h3>{item.q}</h3>
          <p className="answer">{item.a}</p>
        </section>
      ))}
      <p>
        Sidia Jerome Barry, Kleiststraße 9, 58095 Hagen, Telefon +49 162 2843869. Schreiben Sie über die{" "}
        <Link href="/kontakt">Kontaktseite</Link> oder legen Sie das{" "}
        <Link href="/termin">90-Minuten-Gespräch</Link> fest, bevor irgendjemand mit dem Einbau beginnt.
      </p>

      <h2>Wie rechnet man den Zuschuss gegen unsere Endpreise?</h2>
      <p className="answer">
        Man rechnet den Zuschuss gegen die förderfähigen Positionen im Systemplan, nicht gegen die gesamte Website-Preisliste.
      </p>
      <p>
        Ein Setter für eintausendzweihundertneunzig Euro und ein Fundament ab zweitausendvierhundertneunzig Euro können zusammen unter die Decke von fünfzehntausend Euro Zuschuss fallen, wenn die Richtlinie sie anerkennt. Eine Signature-Website ab dreitausendvierhundertneunzig Euro gehört in der Regel nicht in denselben Topf. Wartung nach dem Einbau ist Betrieb und damit üblicherweise draußen.
      </p>
      <p>
        Fünfzig Prozent von viertausendachthundert Euro sind zweitausendvierhundert Euro — als Rechenbeispiel, nicht als Zusage. Die Bewilligungsstelle entscheidet. Wir schreiben den Systemplan so, dass der Antrag dazu passt, oder wir raten vom Antrag ab. Beides ist eine Leistung. Schweigen, bis der Bescheid da ist, und trotzdem schon bauen, ist keine.
      </p>
      <p>
        Aktuelle Beträge ohne Förderrechnung:{" "}
        <Link href="/preise">Preistabelle</Link>. Gegenstand der inneren Arbeit:{" "}
        <Link href="/leistungen/ablaeufe">Abläufe</Link> und{" "}
        <Link href="/leistungen/annahme">KI-Setter</Link>. Diese Seite wurde am 4. September 2026 gegen den öffentlich kommunizierten Rahmen (fünfzig Prozent, fünfzehntausend Euro, Fenster bis 1. Dezember 2026, Windhund, kein Start vor Bescheid) geprüft. Ändert die Landesregierung die Richtlinie, ändert sich der sichtbare Stand hier.
      </p>
    </DocPage>
  );
}
