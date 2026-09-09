import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { StagePage } from "@/components/stage-page";
import { WhatsAppInline } from "@/components/whatsapp-button";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Anrufen, schreiben oder einen Terminwunsch senden",
  description:
    "Kontakt zu BP Agentics: Sidia Jerome Barry in Hagen. Telefon, E-Mail, WhatsApp oder kostenloses Erstgespräch anfragen.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <StagePage
      kicker="Kontakt"
      title="Anrufen, schreiben oder einen Terminwunsch senden."
      lead="Sie möchten eine Website oder einen digitalen Ablauf besprechen? Sidia Jerome Barry, Hagen. Vor-Ort-Gespräche in Nordrhein-Westfalen."
      crumbs={[{ name: "Kontakt", path: "/kontakt" }]}
      related={[
        { href: "/termin", label: "Kostenloses Erstgespräch anfragen" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/preise", label: "Preise" },
        { href: "/impressum", label: "Impressum" },
      ]}
      next={null}
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-8">
        <aside className="min-w-0 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-[1.6rem] bg-white">
            <address className="border-b border-black/8 px-5 py-5 not-italic">
              <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
                Erreichbarkeit
              </p>
              <p className="mt-3 text-[1.15rem] font-semibold">{site.name}</p>
              <p className="mt-1 text-[#3A3D45]">{site.founder.name}</p>
              <p className="mt-3 text-[#3A3D45]">
                {site.streetAddress}
                <br />
                {site.postalCode} {site.addressLocality}
              </p>
            </address>
            <a
              href={`tel:${site.phoneTel}`}
              data-slot="button"
              className="flex min-h-14 flex-col justify-center gap-0.5 border-b border-black/8 px-5 py-4 text-[#14161C] no-underline hover:bg-[#F8F5EF]"
            >
              <span className="text-sm text-[#5C5F66]">Telefon</span>
              <span className="font-semibold">{site.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              data-slot="button"
              className="flex min-h-14 flex-col justify-center gap-0.5 border-b border-black/8 px-5 py-4 text-[#14161C] no-underline hover:bg-[#F8F5EF]"
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
          <p className="mt-4 text-[1.02rem] leading-relaxed text-[#5C5F66]">
            Anfahrt und Termin stimmen wir vorab ab.{" "}
            <Link href={cta.href} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              {cta.short}
            </Link>
          </p>
        </aside>

        <div className="min-w-0 rounded-[2rem] bg-white p-6 md:p-8">
          <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
            Terminwunsch
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
            Wunschtermin senden
          </h2>
          <p className="mt-2 text-[1.05rem] leading-relaxed text-[#3A3D45]">
            Der Termin wird anschließend persönlich bestätigt.
          </p>
          <div className="mt-6">
            <BookingForm />
          </div>
        </div>
      </div>
    </StagePage>
  );
}
