import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { PageFaqs } from "@/components/page-faqs";
import { Proof } from "@/components/proof";
import { TradeSelector } from "@/components/trade-selector";
import { ablaeufeFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { PRICE_NOTE, automationOffer, cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Informationen einmal erfassen und im passenden Ablauf weitergeben",
  description:
    "Datenbasis und ein Prozessmodul zusammen ab 2.490 €. Ohne monatliche Betreuung.",
  path: "/leistungen/ablaeufe",
});

export default function AblaeufePage() {
  return (
    <>
      <DocPage
        kicker="Büroabläufe"
        title="Informationen einmal erfassen und im passenden Ablauf weitergeben."
        lead="Lieferscheine, Kundenangaben oder Auftragsstatus werden an mehreren Stellen gebraucht. BP Agentics verbindet die vereinbarten Arbeitsschritte, damit Informationen für Büro und Außendienst zusammen verfügbar sind."
        crumbs={[
          { name: "Leistungen", path: "/leistungen" },
          { name: "Büroabläufe", path: "/leistungen/ablaeufe" },
        ]}
        extraJsonLd={[
          serviceOffer({
            name: "Büroabläufe automatisieren",
            description:
              "Gemeinsame Datenbasis und Prozessmodule für wiederkehrende Büroabläufe.",
            path: "/leistungen/ablaeufe",
            offers: [
              { name: "Datenbasis + 1 Prozessmodul", price: "2490" },
            ],
          }),
          faqPage(ablaeufeFaqs),
        ]}
        related={[
          { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
          { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
          { href: "/referenzen/feinkost-kreta", label: "Bestell-App ansehen" },
          { href: "/preise", label: "Preise" },
        ]}
      >
        <h2>Ein möglicher Einstieg: digitaler Lieferschein</h2>
        <p>
          Angaben zum Auftrag werden mobil erfasst und dem Büro zur weiteren
          Bearbeitung bereitgestellt. Welche Felder, Freigaben und Programme
          dazugehören, wird anhand Ihres Ablaufs festgelegt.
        </p>

        <h2>Preisaufbau</h2>
        <p>
          Datenbasis und ein Prozessmodul kosten zusammen {automationOffer.combined}.
          Eine monatliche Betreuung ist in diesem Einstieg nicht enthalten.
        </p>
        <p>
          Weitere Anschlüsse und zusätzliche Abläufe werden im Angebot ausgewiesen.
        </p>
        <p>{PRICE_NOTE}</p>

        <DataTable
          caption="Preisaufbau Automatisierung"
          headers={["Baustein", "Aufgabe", "Preis"]}
          rows={[
            [
              "Datenbasis + 1 Prozessmodul",
              "Vereinbarte Informationen und ein erster Ablauf",
              automationOffer.combined,
            ],
            [
              "Monatliche Betreuung",
              "Im Einstieg nicht enthalten",
              automationOffer.run,
            ],
          ]}
        />

        <h2>Auf dem Vorhandenen aufbauen</h2>
        <p>
          Im Gespräch wird geprüft, welche Programme bereits zuverlässig arbeiten
          und an welcher Stelle eine Verbindung hilfreich ist. Daraus ergibt sich,
          ob eine gemeinsame Datenbasis benötigt wird und welches Modul den ersten
          Ablauf abbildet. Eine gemeinsame Datenbasis ist nicht der vollständige
          Umfang einer kaufmännischen Software.
        </p>

        <h2>Mit dem Team abstimmen</h2>
        <p>
          Die Anforderungen von Büro und Außendienst werden im Projektplan
          festgehalten. Dazu gehören die benötigten Informationen, Zuständigkeiten
          und die Einführung in den neuen Ablauf.
        </p>
        <p>
          Ein verwandtes Prinzip zeigt die{" "}
          <Link href="/referenzen/feinkost-kreta">Bestell-App Feinkost Kreta</Link>.
        </p>

        <PageFaqs items={ablaeufeFaqs} />
        <p className="mt-8">
          <Link href={cta.href} className="text-[#198BE8] underline-offset-4 hover:underline">
            Ersten Ablauf besprechen
          </Link>
          {" — "}
          90 Minuten vor Ort.
        </p>
      </DocPage>
      <TradeSelector />
      <Proof />
    </>
  );
}
