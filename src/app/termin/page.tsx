import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { BookingForm } from "@/components/booking-form";
import { WhatsAppInline } from "@/components/whatsapp-button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "90-Minuten-Gespräch buchen",
  description:
    "90 Minuten vor Ort, kostenlos. Hagen und NRW. Danach liegt der Systemplan auf dem Tisch.",
  path: "/termin",
});

export default function TerminPage() {
  return (
    <>
      <div className="relative bg-[#F3EFE6] pb-8">
        <SiteHeader tone="light" />
        <main id="inhalt" className="mx-auto max-w-3xl px-5 pt-32 pb-24 md:px-8">
          <p className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
            Vor Ort in Ihrem Betrieb
          </p>
          <h1 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-[-0.03em] md:text-6xl">
            90 Minuten. Kostenlos. Danach liegt der Plan auf dem Tisch.
          </h1>
          <p className="mt-5 text-[1.15rem] leading-relaxed text-[#3A3D45]">
            Wir kommen zu Ihnen. Sie beschreiben, wie Anfragen, Material und Personal
            heute durch den Betrieb laufen. Wir sagen, welche Ebene zuerst Sinn ergibt.
          </p>
          <div className="mt-12 rounded-[2rem] bg-white p-6 md:p-8">
            <BookingForm />
          </div>
          <p className="mt-6 text-[1.05rem] text-[#3A3D45]">
            Lieber zuerst Anschrift und Telefon?{" "}
            <Link href="/kontakt" className="text-[#198BE8] underline-offset-4 hover:underline">
              Kontaktseite mit NAP in Hagen
            </Link>
            . Oder kurz schreiben:
          </p>
          <WhatsAppInline className="mt-3" />
        </main>
      </div>
    </>
  );
}
