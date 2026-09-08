import type { Metadata } from "next";
import Link from "next/link";
import { PageFaqs } from "@/components/page-faqs";
import { Proof } from "@/components/proof";
import { StageCard, StageLimit } from "@/components/stage-blocks";
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
    <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
      <article className="flex min-w-0 flex-col overflow-hidden rounded-[1.8rem] bg-[#14161C] text-[#F3EFE6]">
        <div className="bg-[#198BE8] px-5 py-5">
          <p className="text-[0.72rem] tracking-[0.18em] text-white/75 uppercase">
            Beispiel · kein Echtbetrieb
          </p>
          <div className="mt-3 rounded-2xl bg-[#F3EFE6] px-4 py-4 text-[#14161C] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]">
            <div className="flex items-baseline justify-between gap-3 text-sm text-[#5C5F66]">
              <span>Lieferschein</span>
              <span>LS-1042</span>
            </div>
            <p className="mt-2 text-[1.15rem] leading-snug font-semibold">
              Hagen-Haspe · Garagendach
            </p>
            <p className="mt-3 inline-flex rounded-full bg-[#198BE8] px-3 py-1 text-sm text-white">
              unterwegs · Büro sieht mit
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col px-6 py-6">
          <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">
            Ein möglicher Einstieg
          </p>
          <h3 className="mt-2 text-[1.45rem] leading-snug font-semibold tracking-[-0.03em]">
            Digitaler Lieferschein
          </h3>
          <p className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-white/72">
            Angaben zum Auftrag werden mobil erfasst und dem Büro zur weiteren
            Bearbeitung bereitgestellt. Welche Felder, Freigaben und Programme
            dazugehören, wird anhand Ihres Ablaufs festgelegt.
          </p>
        </div>
      </article>

      <article className="flex min-w-0 flex-col overflow-hidden rounded-[1.8rem] bg-white">
        <div className="bg-[#EDE7DA] px-5 py-5">
          <ol className="space-y-2">
            {[
              { n: "01", label: "Ihr Programm" },
              { n: "02", label: "Datenbasis" },
              { n: "03", label: "1 Modul" },
            ].map((step, index) => (
              <li key={step.n}>
                <span className="flex items-center gap-3 rounded-2xl bg-[#14161C] px-4 py-3 text-[#F3EFE6]">
                  <span className="text-sm tracking-[0.16em] text-[#9FD0F8]">
                    {step.n}
                  </span>
                  <span className="text-[1.02rem] font-semibold">{step.label}</span>
                </span>
                {index < 2 ? (
                  <span
                    aria-hidden="true"
                    className="mx-auto block h-2 w-px bg-[#198BE8]"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-1 flex-col px-6 py-6">
          <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
            Vorhandenes
          </p>
          <h3 className="mt-2 text-[1.45rem] leading-snug font-semibold tracking-[-0.03em]">
            Auf dem aufbauen, was schon läuft.
          </h3>
          <p className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-[#3A3D45]">
            Im Gespräch wird geprüft, welche Programme bereits zuverlässig arbeiten
            und an welcher Stelle eine Verbindung hilfreich ist. Eine gemeinsame
            Datenbasis ist nicht der vollständige Umfang einer kaufmännischen
            Software.
          </p>
        </div>
      </article>

      <article className="flex min-w-0 flex-col overflow-hidden rounded-[1.8rem] bg-white">
        <div className="grid grid-cols-2">
          <div className="bg-[#14161C] px-4 py-5 text-[#F3EFE6] sm:px-5">
            <p className="text-[0.7rem] tracking-[0.16em] text-[#9FD0F8] uppercase">
              Büro
            </p>
            <p className="mt-2 text-[1.05rem] leading-snug font-semibold">
              sieht denselben Stand
            </p>
          </div>
          <div className="bg-[#198BE8] px-4 py-5 text-white sm:px-5">
            <p className="text-[0.7rem] tracking-[0.16em] text-white/70 uppercase">
              Außendienst
            </p>
            <p className="mt-2 text-[1.05rem] leading-snug font-semibold">
              erfasst unterwegs
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col px-6 py-6">
          <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
            Team
          </p>
          <h3 className="mt-2 text-[1.45rem] leading-snug font-semibold tracking-[-0.03em]">
            Büro und Außendienst stimmen mit.
          </h3>
          <p className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-[#3A3D45]">
            Die benötigten Informationen, Zuständigkeiten und die Einführung in
            den neuen Ablauf stehen im Projektplan. Fachliche Freigaben bleiben
            im Betrieb.
          </p>
        </div>
      </article>
    </div>
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
        { href: "/referenzen/feinkost-kreta", label: "Bestell-App ansehen" },
        { href: "/preise", label: "Preise" },
      ]}
      next={{
        title: "Ersten Ablauf besprechen",
        body: "Im Gespräch prüfen wir, welche Programme schon zuverlässig arbeiten und welcher Schritt den passenden Anfang macht. 90 Minuten vor Ort.",
        chips: ["Datenbasis + 1 Modul", "Ohne monatliche Betreuung", "Weitere Abläufe im Angebot"],
        primary: { href: cta.href, label: "Ersten Ablauf besprechen" },
        secondary: { href: "/referenzen/feinkost-kreta", label: "Bestell-App ansehen" },
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

      <div className="mt-10 overflow-x-auto rounded-[1.4rem] bg-white p-4 md:p-6">
        <table className="w-full min-w-[28rem] border-collapse text-left text-[1.02rem]">
          <caption className="mb-3 text-left text-sm tracking-[0.14em] text-[#198BE8] uppercase">
            Preisaufbau Automatisierung
          </caption>
          <thead>
            <tr className="border-b border-black/10">
              <th scope="col" className="py-2 pr-4 font-semibold">Baustein</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Aufgabe</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Preis</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black/5 align-top">
              <th scope="row" className="py-3 pr-4 font-medium">Datenbasis + 1 Prozessmodul</th>
              <td className="py-3 pr-4 text-[#3A3D45]">
                Vereinbarte Informationen und ein erster Ablauf
              </td>
              <td className="py-3 pr-4 text-[#3A3D45]">{automationOffer.combined}</td>
            </tr>
            <tr className="align-top">
              <th scope="row" className="py-3 pr-4 font-medium">Monatliche Betreuung</th>
              <td className="py-3 pr-4 text-[#3A3D45]">Im Einstieg nicht enthalten</td>
              <td className="py-3 pr-4 text-[#3A3D45]">{automationOffer.run}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-[1.05rem] text-[#3A3D45]">
        Ein verwandtes Prinzip zeigt die{" "}
        <Link href="/referenzen/feinkost-kreta" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          Bestell-App Feinkost Kreta
        </Link>
        .
      </p>

      <PageFaqs items={ablaeufeFaqs} />
    </StagePage>
  );
}
