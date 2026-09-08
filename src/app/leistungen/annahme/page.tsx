import type { Metadata } from "next";
import { LivingChat } from "@/components/living-chat";
import { PageFaqs } from "@/components/page-faqs";
import { StageCard, StageGrid, StageLimit, StageSteps } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { annahmeFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { PRICE_NOTE, cta, whatsappOffer } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Die Angaben liegen vor, bevor Sie zurückrufen",
  description:
    "KI-Assistent für WhatsApp- und E-Mail-Anfragen: Angaben erfassen und Termine aus dem angebundenen Kalender anbieten. 1.290 € Einrichtung + 99 € monatlich.",
  path: "/leistungen/annahme",
});

export default function AnnahmePage() {
  return (
    <StagePage
      kicker="Nachrichten-Assistent"
      title="Die Angaben liegen vor, bevor Sie zurückrufen."
      lead="Der KI-Assistent beantwortet Nachrichten per WhatsApp und E-Mail, fragt vereinbarte Angaben ab und bietet Termine aus dem angebundenen Kalender an."
      crumbs={[
        { name: "Leistungen", path: "/leistungen" },
        { name: "Nachrichten-Assistent", path: "/leistungen/annahme" },
      ]}
      extraJsonLd={[
        serviceOffer({
          name: "Nachrichten-Assistent",
          description:
            "KI-Assistent für WhatsApp- und E-Mail-Anfragen: Angaben erfassen und Termine aus dem angebundenen Kalender anbieten.",
          path: "/leistungen/annahme",
          offers: [
            { name: "Nachrichten-Assistent Einrichtung", price: "1290" },
            { name: "Nachrichten-Assistent Betreuung", price: "99", unit: "MON" },
          ],
        }),
        faqPage(annahmeFaqs),
      ]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
        { href: "/preise", label: "Preise" },
      ]}
      next={{
        title: "Nachrichten-Assistent besprechen",
        body: "Sinnvoll, wenn Kunden per WhatsApp oder E-Mail anfragen und wiederkehrende Fragen oder Terminabstimmungen anfallen. 90 Minuten vor Ort.",
        chips: ["WhatsApp und E-Mail", "Kalenderregeln", "Mensch übernimmt bei Bedarf"],
        primary: { href: cta.href, label: "Nachrichten-Assistent besprechen" },
        secondary: { href: "/preise", label: "Preis ansehen" },
      }}
      prelude={<LivingChat />}
    >
      <StageCard tone="ink" kicker="Einrichtung und Betrieb" title="Ein Preis für den laufenden Assistenten.">
        <p className="text-3xl font-semibold text-[#F3EFE6]">
          {whatsappOffer.once} + {whatsappOffer.month} monatlich
        </p>
        <p className="mt-2">
          Einrichtung und 12 Monate Betrieb: {whatsappOffer.year}. Die monatliche
          Betreuung gehört zu diesem Angebot.
        </p>
        <p className="mt-3 text-white/55">{PRICE_NOTE}</p>
      </StageCard>

      <StageSteps
        heading="So läuft eine Anfrage ab"
        items={[
          {
            title: "Nachricht kommt an",
            body: "Eine Person schreibt dem Betrieb auf WhatsApp oder per E-Mail.",
          },
          {
            title: "Angaben werden erfasst",
            body: "Der Assistent fragt die vereinbarten Angaben zum Vorhaben ab.",
          },
          {
            title: "Termine stehen bereit",
            body: "Er bietet verfügbare Termine nach den festgelegten Kalenderregeln an.",
          },
          {
            title: "Eintrag im Kalender",
            body: "Nach der Auswahl wird der Termin im angebundenen Kalender eingetragen.",
          },
        ]}
      />

      <StageGrid className="mt-10" cols={2}>
        <StageCard kicker="Vor der Einrichtung" title="Was wir festlegen.">
          <p>
            Welche Anfragen der Assistent bearbeitet, welche Angaben nötig sind,
            welche Termine angeboten werden und wann ein Mensch übernimmt.
            WhatsApp, E-Mail und Kalender prüfen wir vorab.
          </p>
        </StageCard>
        <StageCard kicker="Passt das?" title="Wenn Anfragen wiederkehren.">
          <p>
            Sinnvoll, wenn Kunden per WhatsApp oder E-Mail anfragen und
            wiederkehrende Fragen oder Terminabstimmungen anfallen. Im Gespräch
            prüfen wir Ihren Anfrageweg.
          </p>
        </StageCard>
      </StageGrid>

      <StageLimit title="Textnachrichten, kein Telefon.">
        <p>
          Dieses Angebot betrifft Textnachrichten per WhatsApp und E-Mail.
          Telefonanrufe und fachliche Notfallentscheidungen sind nicht Teil des
          hier beschriebenen Assistenten.
        </p>
      </StageLimit>

      <div className="mt-10 overflow-x-auto rounded-[1.4rem] bg-white p-4 md:p-6">
        <table className="w-full min-w-[28rem] border-collapse text-left text-[1.02rem]">
          <caption className="mb-3 text-left text-sm tracking-[0.14em] text-[#198BE8] uppercase">
            Nachrichten-Assistent
          </caption>
          <thead>
            <tr className="border-b border-black/10">
              <th scope="col" className="py-2 pr-4 font-semibold">Position</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Inhalt</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Preis</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black/5 align-top">
              <th scope="row" className="py-3 pr-4 font-medium">Einrichtung</th>
              <td className="py-3 pr-4 text-[#3A3D45]">
                Fragenkatalog, WhatsApp- und E-Mail-Anbindung, Kalenderregeln
              </td>
              <td className="py-3 pr-4 text-[#3A3D45]">{whatsappOffer.once}</td>
            </tr>
            <tr className="align-top">
              <th scope="row" className="py-3 pr-4 font-medium">Betreuung</th>
              <td className="py-3 pr-4 text-[#3A3D45]">
                Laufender Betrieb nach dem vereinbarten Angebot
              </td>
              <td className="py-3 pr-4 text-[#3A3D45]">{whatsappOffer.month} / Monat</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PageFaqs items={annahmeFaqs} />
    </StagePage>
  );
}
