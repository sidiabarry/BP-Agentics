import type { Metadata } from "next";
import Link from "next/link";
import { LivingChat } from "@/components/living-chat";
import { PageFaqs } from "@/components/page-faqs";
import { StageCard, StageSteps } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { annahmeFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { PRICE_NOTE, automationOffer, cta, websitePackages, whatsappOffer } from "@/lib/offers";
import { site } from "@/lib/site";

const description =
  "BP Agentics aus Hagen richtet für Handwerksbetriebe einen Assistenten ein, der WhatsApp- und E-Mail-Anfragen erfasst und Termine anbietet. 1.290 € + 99 €/Monat.";

export const metadata: Metadata = pageMetadata({
  title: "WhatsApp- & E-Mail-Anfragen automatisieren – Handwerk NRW",
  description,
  path: "/leistungen/annahme",
});

export default function AnnahmePage() {
  const start = websitePackages[0];

  return (
    <StagePage
      kicker="Nachrichten-Assistent"
      title="Die Angaben liegen vor, bevor Sie zurückrufen."
      lead="BP Agentics aus Hagen richtet für Handwerksbetriebe in Nordrhein-Westfalen einen Nachrichten-Assistenten ein. Er beantwortet Anfragen per WhatsApp und E-Mail, fragt die vereinbarten Angaben zum Vorhaben ab und bietet Termine aus Ihrem Kalender an. Die Einrichtung kostet 1.290 €, der laufende Betrieb 99 € im Monat. Am Anfang steht ein kostenloses Gespräch von 90 Minuten bei Ihnen vor Ort."
      jsonLdDescription={description}
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
        { href: "/webdesign-fuer-handwerker", label: "Webdesign für Handwerker" },
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
        { href: "/preise", label: "Preise" },
      ]}
      next={{
        title: "Nachrichten-Assistent besprechen",
        body: "90 Minuten vor Ort, kostenlos. Wir prüfen, ob sich Fragen oder Terminabstimmungen in Ihrem Anfrageweg wiederholen.",
        chips: ["WhatsApp und E-Mail", "Kalenderregeln", "Mensch übernimmt bei Bedarf"],
        primary: { href: cta.href, label: "Nachrichten-Assistent besprechen" },
        secondary: { href: site.whatsappUrl, label: "Per WhatsApp schreiben" },
      }}
      prelude={<LivingChat />}
    >
      <section aria-labelledby="wann-sinnvoll">
        <h2 id="wann-sinnvoll" className="text-2xl font-semibold tracking-[-0.03em]">
          Wann das sinnvoll ist
        </h2>
        <p className="mt-3 max-w-[44rem] text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Wenn Kundinnen und Kunden per WhatsApp oder E-Mail anfragen, während Sie auf der
          Baustelle sind, und sich Fragen oder Terminabstimmungen wiederholen. Ziel: Die Angaben
          liegen vor, bevor Sie zurückrufen.
        </p>
        <p className="mt-3 max-w-[44rem] text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Beispiele aus den Gewerken: Ein Dachdecker bekommt Anfragen zu Sanierungen und bietet
          dafür Besichtigungstermine an (
          <Link href="/dachdecker" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
            Dachdecker
          </Link>
          ). Ein SHK-Betrieb erfasst Angaben zu Badsanierung oder Wartung (
          <Link
            href="/shk-haustechnik"
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            SHK und Haustechnik
          </Link>
          ). Ein Betrieb für Kälte- und Klimatechnik sammelt Anlagennummer, Fehlerbild und Fotos (
          <Link
            href="/kaeltetechnik"
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            Kälte- und Klimatechnik
          </Link>
          ). Das sind Anwendungsbeispiele, keine Referenzen.
        </p>
      </section>

      <StageSteps
        heading="So läuft eine Anfrage ab"
        items={[
          {
            title: "Nachricht kommt an",
            body: "Jemand schreibt Ihrem Betrieb auf WhatsApp oder per E-Mail.",
          },
          {
            title: "Angaben werden erfasst",
            body: "Der Assistent fragt die vereinbarten Angaben zum Vorhaben ab, zum Beispiel Ort und ungefähre Größe.",
          },
          {
            title: "Termine stehen bereit",
            body: "Er bietet freie Termine nach den festgelegten Kalenderregeln an.",
          },
          {
            title: "Eintrag im Kalender",
            body: "Nach der Auswahl wird der Termin in Ihrem angebundenen Kalender eingetragen.",
          },
        ]}
      />

      <StageCard className="mt-10" kicker="Vorher festlegen" title="Was wir gemeinsam festlegen.">
        <ul className="list-disc space-y-2 pl-5">
          <li>welche Anfragen der Assistent bearbeitet</li>
          <li>welche Angaben nötig sind</li>
          <li>welche Termine angeboten werden</li>
          <li>wann ein Mensch übernimmt</li>
        </ul>
        <p className="mt-3">
          Ihre WhatsApp-Nummer, Ihr E-Mail-Postfach und Ihren Kalender prüfen wir vorab. Freigaben
          und fachliche Entscheidungen bleiben bei Ihnen. Den Zeitrahmen halten wir im Projektplan
          fest, den Sie vor der Beauftragung erhalten.
        </p>
      </StageCard>

      <StageCard className="mt-4" kicker="Grenze" title="Was der Assistent nicht macht">
        <p>
          Er bearbeitet Textnachrichten per WhatsApp und E-Mail. Telefonanrufe nimmt er nicht an,
          und fachliche Notfallentscheidungen trifft er nicht. Die Dringlichkeit beurteilt immer
          Ihr Betrieb.
        </p>
      </StageCard>

      <StageCard tone="ink" className="mt-4" kicker="Preis" title="Einrichtung und laufender Betrieb.">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Einrichtung", whatsappOffer.once],
            ["Laufender Betrieb und Betreuung", `${whatsappOffer.month} monatlich`],
            ["Einrichtung + 12 Monate", whatsappOffer.year],
          ].map(([label, value]) => (
            <p key={label}>
              <span className="block text-sm text-white/55">{label}</span>
              <span className="mt-1 block text-2xl font-semibold text-[#F3EFE6]">{value}</span>
            </p>
          ))}
        </div>
        <p className="mt-4">
          Die monatliche Betreuung gehört beim Assistenten fest zum Angebot. Die Laufzeit steht im
          jeweiligen Angebot.
        </p>
        <p className="mt-3 text-white/55">{PRICE_NOTE}</p>
      </StageCard>

      <StageCard className="mt-4" kicker="Kombination" title="Mit Website oder Büroabläufen kombinierbar.">
        <p>
          Der Assistent ist einzeln beauftragbar. Er lässt sich mit einer{" "}
          <Link
            href="/webdesign-fuer-handwerker"
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            Website
          </Link>{" "}
          (ab {start.once}) oder mit{" "}
          <Link
            href="/leistungen/ablaeufe"
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            Büroabläufen
          </Link>{" "}
          (Datenbasis + 1 Prozessmodul {automationOffer.combined}) verbinden, wenn Anfragedaten
          später im Büro weiterverarbeitet werden sollen. Welcher Baustein den Anfang macht, klären
          wir im Gespräch.
        </p>
      </StageCard>

      <StageCard className="mt-4" kicker="Ansprechpartner" title="Wer das einrichtet.">
        <p>
          BP Agentics ist die Agentur von {site.founder.name}, {site.streetAddress}, {site.postalCode}{" "}
          {site.addressLocality}. Sie sprechen während der Einrichtung direkt mit mir. Der Dialog
          auf dieser Seite ist ein Beispiel ohne echte Buchung.
        </p>
      </StageCard>

      <PageFaqs items={annahmeFaqs} />

      <p className="mt-8 text-[1.05rem] leading-relaxed text-[#3A3D45]">
        Telefon{" "}
        <a href={`tel:${site.phoneTel}`} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          {site.phoneDisplay}
        </a>
      </p>
    </StagePage>
  );
}
