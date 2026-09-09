import type { Metadata } from "next";
import Link from "next/link";
import { PageFaqs } from "@/components/page-faqs";
import { Proof } from "@/components/proof";
import { StageCard, StageGrid, StageLimit, StagePanel } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { TradeSelector } from "@/components/trade-selector";
import { ablaeufeFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { PRICE_NOTE, automationOffer, cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Einmal erfassen. Im Büro und unterwegs weitergeben.",
  description:
    "Datenbasis und ein Prozessmodul zusammen ab 2.490 €. Ohne monatliche Betreuung.",
  path: "/leistungen/ablaeufe",
});

function AblaeufePanels() {
  return (
    <StageGrid className="mt-10">
      <StagePanel
        tone="ink"
        kicker="Einstieg"
        title="Digitaler Lieferschein"
        body="Angaben zum Auftrag werden mobil erfasst und dem Büro bereitgestellt. Felder, Freigaben und Programme legt der Ablauf fest."
        visual={
          <div className="flex h-full w-full flex-col justify-center bg-[#198BE8] px-5">
            <p className="text-[0.72rem] tracking-[0.18em] text-white/75 uppercase">
              Beispiel · kein Echtbetrieb
            </p>
            <div className="mt-3 rounded-2xl bg-[#F3EFE6] px-4 py-3 text-[#14161C]">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm text-[#5C5F66]">
                <span>Lieferschein</span>
                <span>LS-1042</span>
              </div>
              <p className="mt-1 text-[1.05rem] leading-snug font-semibold">
                Hagen-Haspe · Garagendach
              </p>
              <p className="mt-2 inline-flex flex-wrap rounded-full bg-[#198BE8] px-3 py-1 text-sm text-white">
                unterwegs · Büro sieht mit
              </p>
            </div>
          </div>
        }
      />
      <StagePanel
        kicker="Vorhandenes"
        title="Auf dem Vorhandenen aufbauen."
        body="Im Gespräch prüfen wir, welche Programme zuverlässig laufen und wo eine Verbindung hilft. Eine Datenbasis ist keine kaufmännische Software."
        visual={
          <div className="flex h-full w-full flex-col justify-center bg-[#EDE7DA] px-5">
            <ol className="space-y-1.5">
              {[
                { n: "01", label: "Ihr Programm" },
                { n: "02", label: "Datenbasis" },
                { n: "03", label: "1 Modul" },
              ].map((step) => (
                <li
                  key={step.n}
                  className="flex items-center gap-3 rounded-xl bg-[#14161C] px-3 py-2 text-[#F3EFE6]"
                >
                  <span className="text-sm tracking-[0.16em] text-[#9FD0F8]">
                    {step.n}
                  </span>
                  <span className="text-[0.98rem] font-semibold">{step.label}</span>
                </li>
              ))}
            </ol>
          </div>
        }
      />
      <StagePanel
        kicker="Team"
        title="Büro und Außendienst im Blick."
        body="Informationen, Zuständigkeiten und die Einführung stehen im Projektplan. Fachliche Freigaben bleiben im Betrieb."
        visual={
          <div className="grid h-full w-full grid-cols-2">
            <div className="flex flex-col justify-center bg-[#14161C] px-4 text-[#F3EFE6]">
              <p className="text-[0.7rem] tracking-[0.16em] text-[#9FD0F8] uppercase">
                Büro
              </p>
              <p className="mt-2 text-sm leading-snug font-semibold">
                sieht denselben Stand
              </p>
            </div>
            <div className="flex flex-col justify-center bg-[#198BE8] px-4 text-white">
              <p className="text-[0.7rem] tracking-[0.16em] text-white/70 uppercase">
                Außendienst
              </p>
              <p className="mt-2 text-sm leading-snug font-semibold">
                erfasst unterwegs
              </p>
            </div>
          </div>
        }
      />
    </StageGrid>
  );
}

function LedgerPreview() {
  return (
    <div className="rounded-[1.6rem] bg-[#14161C] p-5 text-[#F3EFE6] md:p-6">
      <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">
        Beispiel · kein Echtbetrieb
      </p>
      <ul className="mt-5 divide-y divide-white/10 text-[1.02rem]">
        <li className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:items-baseline">
          <span>Besichtigung Do 9:00</span>
          <span className="text-[#9FD0F8]">im Kalender</span>
        </li>
        <li className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:items-baseline">
          <span>Hagen-Haspe · Garagendach</span>
          <span className="text-white/55">Angaben da</span>
        </li>
        <li className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:items-baseline">
          <span>Lieferschein unterwegs</span>
          <span className="text-white/55">Büro sieht mit</span>
        </li>
      </ul>
    </div>
  );
}

export default function AblaeufePage() {
  return (
    <StagePage
      kicker="Büroabläufe"
      title="Einmal erfassen. Im Büro und unterwegs weitergeben."
      lead="Lieferscheine, Kundenangaben oder Auftragsstatus werden an mehreren Stellen gebraucht. Die vereinbarten Schritte werden so verbunden, dass die Information nicht noch einmal getippt werden muss."
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
          offers: [{ name: "Datenbasis + 1 Prozessmodul", price: "2490" }],
        }),
        faqPage(ablaeufeFaqs),
      ]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
        { href: "/referenzen/feinkost-kreta", label: "Projekt Feinkost Kreta" },
        { href: "/preise", label: "Preise" },
      ]}
      next={{
        title: "Ersten Ablauf besprechen",
        body: "Im Gespräch prüfen wir, welche Programme schon zuverlässig arbeiten und welcher Schritt den passenden Anfang macht. 90 Minuten vor Ort.",
        chips: ["Datenbasis + 1 Modul", "Ohne monatliche Betreuung", "Weitere Abläufe im Angebot"],
        primary: { href: cta.href, label: "Ersten Ablauf besprechen" },
        secondary: { href: "/referenzen/feinkost-kreta", label: "Projekt Feinkost Kreta" },
      }}
      visual={<LedgerPreview />}
      appendix={
        <>
          <TradeSelector />
          <Proof />
        </>
      }
    >
      <StageCard tone="ink" kicker="Einstieg" title="Datenbasis und ein Prozessmodul.">
        <p className="text-3xl font-semibold text-[#F3EFE6]">{automationOffer.combined}</p>
        <p className="mt-2">
          Eine monatliche Betreuung ist in diesem Einstieg nicht enthalten.
          Weitere Anschlüsse und zusätzliche Abläufe werden im Angebot ausgewiesen.
        </p>
        <p className="mt-3 text-white/55">{PRICE_NOTE}</p>
      </StageCard>

      <AblaeufePanels />

      <StageLimit title="Ein Modul, kein Komplettsystem.">
        <p>
          Der Einstieg verbindet die vereinbarten Informationen und einen ersten
          Ablauf. Weitere Module kommen nur, wenn sie im Angebot stehen.
        </p>
      </StageLimit>

      <p className="mt-6 text-[1.05rem] text-[#3A3D45]">
        Wie ein Bestellweg in einem Laden aussehen kann, zeigt die Kundengeschichte{" "}
        <Link href="/referenzen/feinkost-kreta" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          Projekt Feinkost Kreta
        </Link>
        .
      </p>

      <PageFaqs items={ablaeufeFaqs} />
    </StagePage>
  );
}
