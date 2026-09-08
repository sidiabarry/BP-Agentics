import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { DocPage } from "@/components/doc-page";
import { WhatsAppInline } from "@/components/whatsapp-button";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt zu BP Agentics",
  description:
    "Kontakt zu BP Agentics: Sidia Jerome Barry in Hagen. Telefon, E-Mail, WhatsApp oder kostenloses Erstgespräch anfragen.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <DocPage
      kicker="Kontakt"
      title="Kontakt zu BP Agentics"
      lead="Sie möchten eine Website oder einen digitalen Ablauf besprechen? Rufen Sie an, schreiben Sie eine Nachricht oder fragen Sie ein kostenloses Erstgespräch an."
      crumbs={[{ name: "Kontakt", path: "/kontakt" }]}
      related={[
        { href: "/termin", label: "Kostenloses Erstgespräch anfragen" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/preise", label: "Preise" },
        { href: "/impressum", label: "Impressum" },
      ]}
    >
      <h2>Erreichbarkeit</h2>
      <p>
        {site.name}
        <br />
        {site.founder.name}
        <br />
        {site.streetAddress}
        <br />
        {site.postalCode} {site.addressLocality}
      </p>
      <p>
        Telefon:{" "}
        <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
        <br />
        E-Mail:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <p>
        <WhatsAppInline>Per WhatsApp schreiben</WhatsAppInline>
      </p>
      <p>
        Vor-Ort-Gespräche in Nordrhein-Westfalen. Die Anfahrt und den Termin stimmen
        wir vorab ab.
      </p>
      <p>
        <Link href={cta.href} className="text-[#198BE8] underline-offset-4 hover:underline">
          {cta.short}
        </Link>
      </p>

      <h2>Terminwunsch senden</h2>
      <p>
        Sie senden einen Terminwunsch. Der Termin wird anschließend persönlich
        bestätigt.
      </p>
      <div className="mt-8 rounded-[2rem] bg-white p-6 md:p-8">
        <BookingForm />
      </div>
    </DocPage>
  );
}
