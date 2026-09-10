import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Process } from "@/components/process";
import { WhyTeaser } from "@/components/why-teaser";
import { cta } from "@/lib/offers";

export function HomeStart() {
  return (
    <section id="start" className="bg-[#F3EFE6]">
      <Process headingId="start-schritte" />
      <WhyTeaser />
      <div className="bg-white px-5 py-12 md:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#F3EFE6] px-6 py-8 md:px-8">
          <h2 className="max-w-[22ch] text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Was soll für Ihren Betrieb leichter werden?
          </h2>
          <p className="mt-3 max-w-[40rem] text-[1.08rem] leading-relaxed text-[#3A3D45]">
            Ein klarerer Webauftritt, strukturierte Anfragen per WhatsApp und E-Mail
            oder weniger doppelte Büroarbeit: Im Erstgespräch prüfen wir, welcher
            Einstieg zu Ihrem Vorhaben passt.
          </p>
          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              className="h-auto max-w-full whitespace-normal rounded-full bg-[#198BE8] px-7 py-3.5 text-center text-[1.05rem] text-white hover:bg-[#1576C4]"
            >
              <Link href={cta.href}>{cta.primary}</Link>
            </Button>
            <p className="text-[1.05rem] text-[#5C5F66]">
              90 Minuten vor Ort. Den Wunschtermin bestätigen wir persönlich.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
