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
      <address className="not-italic">
        {site.name}
        <br />
        {site.founder.name}
        <br />
        {site.streetAddress}
        <br />
        {site.postalCode} {site.addressLocality}
      </address>
      <div className="mt-6 overflow-hidden rounded-[1.5rem] bg-white">
        <a
          href={`tel:${site.phoneTel}`}
          data-slot="button"
          className="flex flex-col gap-0.5 border-b border-black/8 px-5 py-4 text-[#14161C] no-underline hover:bg-[#F8F5EF]"
        >
          <span className="text-sm text-[#5C5F66]">Telefon</span>
          <span className="font-semibold">{site.phoneDisplay}</span>
        </a>
        <a
          href={`mailto:${site.email}`}
          data-slot="button"
          className="flex flex-col gap-0.5 border-b border-black/8 px-5 py-4 text-[#14161C] no-underline hover:bg-[#F8F5EF]"
        >
          <span className="text-sm text-[#5C5F66]">E-Mail</span>
          <span className="font-semibold">{site.email}</span>
        </a>
        <div className="px-5 py-4">
          <WhatsAppInline className="w-full justify-center">
            Per WhatsApp schreiben
          </WhatsAppInline>
        </div>
      </div>
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
