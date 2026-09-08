import type { Metadata } from "next";
import Link from "next/link";
import { DataTable, DocPage } from "@/components/doc-page";
import { LivingChat } from "@/components/living-chat";
import { PageFaqs } from "@/components/page-faqs";
import { annahmeFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { PRICE_NOTE, cta, whatsappOffer } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "WhatsApp- und E-Mail-Anfragen vorbereiten. Termine leichter abstimmen.",
  description:
    "KI-Assistent für WhatsApp- und E-Mail-Anfragen: Angaben erfassen und Termine aus dem angebundenen Kalender anbieten. 1.290 € Einrichtung + 99 € monatlich.",
  path: "/leistungen/annahme",
});

export default function AnnahmePage() {
  return (
    <>
      <DocPage
        kicker="Nachrichten-Assistent"
        title="WhatsApp- und E-Mail-Anfragen vorbereiten. Termine leichter abstimmen."
        lead="Der KI-Assistent beantwortet Nachrichten per WhatsApp und E-Mail, fragt vereinbarte Angaben ab und bietet Termine aus dem angebundenen Kalender an. Ihr Team kann das persönliche Gespräch mit den Informationen zur Anfrage beginnen."
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
      >
        <p>
          <strong>
            {whatsappOffer.once} Einrichtung + {whatsappOffer.month} monatlich.
          </strong>
          <br />
          Einrichtung und 12 Monate Betrieb: {whatsappOffer.year}.
        </p>
        <p>{PRICE_NOTE}</p>

        <h2>So läuft eine Anfrage ab</h2>
        <ol>
          <li>Eine Person schreibt dem Betrieb auf WhatsApp oder per E-Mail.</li>
          <li>Der Assistent erfasst die vereinbarten Angaben zum Vorhaben.</li>
          <li>Er bietet verfügbare Termine nach den festgelegten Kalenderregeln an.</li>
          <li>Nach der Auswahl wird der Termin im angebundenen Kalender eingetragen.</li>
        </ol>

        <h2>Was vor der Einrichtung festgelegt wird</h2>
        <p>
          Welche Anfragen der Assistent bearbeitet, welche Angaben erforderlich sind,
          welche Termine angeboten werden und wann ein Mensch übernimmt.
          Voraussetzungen Ihrer WhatsApp-Nummer, Ihres E-Mail-Postfachs und Ihres
          Kalenders werden vorab geprüft.
        </p>

        <h2>Leistungsgrenze</h2>
        <p>
          Dieses Angebot betrifft Textnachrichten per WhatsApp und E-Mail.
          Telefonanrufe und fachliche Notfallentscheidungen sind nicht Teil des hier
          beschriebenen Assistenten.
        </p>

        <h2>Passt das zum Betrieb?</h2>
        <p>
          Sinnvoll ist der Assistent, wenn Kunden per WhatsApp oder E-Mail anfragen
          und wiederkehrende Fragen oder Terminabstimmungen anfallen. Im Gespräch
          prüfen wir das anhand Ihres Anfragewegs.
        </p>

        <DataTable
          caption="Nachrichten-Assistent"
          headers={["Position", "Inhalt", "Preis"]}
          rows={[
            [
              "Einrichtung",
              "Fragenkatalog, WhatsApp- und E-Mail-Anbindung, Kalenderregeln",
              whatsappOffer.once,
            ],
            [
              "Betreuung",
              "Laufender Betrieb nach dem vereinbarten Angebot",
              `${whatsappOffer.month} / Monat`,
            ],
          ]}
        />

        <PageFaqs items={annahmeFaqs} />
        <p className="mt-8">
          <Link href={cta.href} className="text-[#198BE8] underline-offset-4 hover:underline">
            Nachrichten-Assistent besprechen
          </Link>
          {" — "}
          90 Minuten vor Ort.
        </p>
      </DocPage>
      <LivingChat />
    </>
  );
}
