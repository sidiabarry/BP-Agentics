import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { WhatsAppInline } from "@/components/whatsapp-button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kostenloses Erstgespräch anfragen",
  description:
    "Erzählen Sie kurz von Ihrem Vorhaben und nennen Sie einen Wunschtermin. 90 Minuten vor Ort in Ihrem Betrieb in NRW.",
  path: "/termin",
});

export default function TerminPage() {
  return (
    <>
      <div className="relative bg-[#F3EFE6] pb-8">
        <main id="inhalt" className="mx-auto max-w-3xl px-5 pt-10 pb-24 md:px-8">
          <p className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
            Vor Ort in Ihrem Betrieb
          </p>
          <h1 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-[-0.03em] md:text-6xl">
            Kostenloses Erstgespräch anfragen
          </h1>
          <p className="mt-5 text-[1.15rem] leading-relaxed text-[#3A3D45]">
            Erzählen Sie kurz von Ihrem Vorhaben und nennen Sie einen Wunschtermin.
            Ich melde mich unter der angegebenen Nummer und stimme den Termin mit
            Ihnen ab.
          </p>
          <ul className="mt-8 space-y-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
            <li>
              <strong>Das Gespräch:</strong> 90 Minuten vor Ort in Ihrem Betrieb.
            </li>
            <li>
              <strong>Das klären wir:</strong> Welcher Baustein passt, welche
              Informationen benötigt werden und wie es danach weitergeht.
            </li>
            <li>
              <strong>Vorbereitung:</strong> Sie müssen keine technischen Unterlagen
              vorbereiten. Ein Beispiel aus dem Arbeitsalltag kann hilfreich sein.
            </li>
          </ul>
          <div className="mt-12 rounded-[2rem] bg-white p-6 md:p-8">
            <BookingForm />
          </div>
          <p className="mt-6 text-[1.05rem] text-[#3A3D45]">
            Lieber zuerst Anschrift und Telefon?{" "}
            <Link href="/kontakt" className="text-[#198BE8] underline-offset-4 hover:underline">
              Zur Kontaktseite
            </Link>
            . Oder kurz schreiben:
          </p>
          <WhatsAppInline className="mt-3" />
        </main>
      </div>
    </>
  );
}
