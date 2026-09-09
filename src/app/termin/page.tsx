import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { StagePage } from "@/components/stage-page";
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
    <StagePage
      kicker="Vor Ort in Ihrem Betrieb"
      title="Kostenloses Erstgespräch anfragen"
      lead="Erzählen Sie kurz von Ihrem Vorhaben und nennen Sie einen Wunschtermin. Ich melde mich unter der angegebenen Nummer und stimme den Termin mit Ihnen ab."
      crumbs={[{ name: "Erstgespräch anfragen", path: "/termin" }]}
      related={[
        { href: "/kontakt", label: "Zur Kontaktseite" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/preise", label: "Preise" },
      ]}
      next={null}
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-8">
        <ul className="space-y-4">
          {[
            {
              kicker: "Das Gespräch",
              body: "90 Minuten vor Ort in Ihrem Betrieb.",
            },
            {
              kicker: "Das klären wir",
              body: "Welcher Baustein passt, welche Informationen benötigt werden und wie es danach weitergeht.",
            },
            {
              kicker: "Vorbereitung",
              body: "Sie müssen keine technischen Unterlagen vorbereiten. Ein Beispiel aus dem Arbeitsalltag kann hilfreich sein.",
            },
          ].map((item) => (
            <li key={item.kicker} className="rounded-[1.4rem] bg-white p-5">
              <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
                {item.kicker}
              </p>
              <p className="mt-2 text-[1.08rem] leading-relaxed text-[#3A3D45]">
                {item.body}
              </p>
            </li>
          ))}
          <li className="px-1">
            <p className="text-[1.02rem] text-[#3A3D45]">
              Lieber zuerst Anschrift und Telefon?{" "}
              <Link href="/kontakt" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
                Zur Kontaktseite
              </Link>
              .
            </p>
            <WhatsAppInline className="mt-3" />
          </li>
        </ul>
        <div className="rounded-[2rem] bg-white p-6 md:p-8">
          <Suspense fallback={<p className="text-[#5C5F66]">Formular wird geladen …</p>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </StagePage>
  );
}
