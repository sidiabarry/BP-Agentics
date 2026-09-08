import type { Metadata } from "next";
import { LivingChat } from "@/components/living-chat";
import { PageFaqs } from "@/components/page-faqs";
import { StageCard, StageLimit, StageSteps } from "@/components/stage-blocks";
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

      <StageCard className="mt-10" kicker="Umfang" title="Was wir festlegen — und wann es passt.">
        <p>
          Welche Anfragen der Assistent bearbeitet, welche Angaben nötig sind,
          welche Termine angeboten werden und wann ein Mensch übernimmt.
          WhatsApp, E-Mail und Kalender prüfen wir vorab. Sinnvoll, wenn Kunden
          per WhatsApp oder E-Mail anfragen und Fragen oder Termine wiederkehren.
        </p>
      </StageCard>

      <StageLimit title="Textnachrichten, kein Telefon.">
        <p>
          Dieses Angebot betrifft Textnachrichten per WhatsApp und E-Mail.
          Telefonanrufe und fachliche Notfallentscheidungen sind nicht Teil des
          hier beschriebenen Assistenten.
        </p>
      </StageLimit>

      <PageFaqs items={annahmeFaqs} />
    </StagePage>
  );
}
