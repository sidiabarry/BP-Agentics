import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section id="preise" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.2em] text-[#5B54E6] uppercase">
          Preise
        </p>
        <h2 className="mt-3 text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-6xl">
          Ab 149 € im Monat.
        </h2>
        <p className="mt-5 max-w-[42rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Mittelständische Kaufleute rechnen in laufenden Vorhaltekosten, nicht in
          Agenturabenteuern. Der Einbau ist ein Festpreis. Der Betrieb ist die
          Miete für ein Arbeitsmittel, das wir hosten und warten.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl bg-white p-6">
            <h3 className="text-xl font-semibold">Website Start</h3>
            <p className="mt-2 text-3xl font-semibold">950 €</p>
            <p className="mt-1 text-[#5C5F66]">plus 149 € / Monat, 12 Monate</p>
            <p className="mt-4 text-[#3A3D45]">
              Einseiter, der Anfragen holt. Für Betriebe, deren Auftritt seit Jahren
              schweigt.
            </p>
          </article>
          <article className="rounded-3xl bg-[#5B54E6] p-6 text-white">
            <h3 className="text-xl font-semibold">Website Signature</h3>
            <p className="mt-2 text-3xl font-semibold">ab 7.900 €</p>
            <p className="mt-1 text-white/80">plus 190 € / Monat</p>
            <p className="mt-4 text-white/90">
              Scroll-Choreografie wie diese Seite. Der Auftritt ist die Arbeitsprobe.
            </p>
          </article>
          <article className="rounded-3xl bg-white p-6">
            <h3 className="text-xl font-semibold">Setter und Innen</h3>
            <p className="mt-2 text-3xl font-semibold">Festpreis</p>
            <p className="mt-1 text-[#5C5F66]">nach dem 90-Minuten-Gespräch</p>
            <p className="mt-4 text-[#3A3D45]">
              KI-Setter 1.900 € Einbau. Fundament 2.900 €. Module 900 € bis 1.800 €.
              Endpreise nach § 19 UStG.
            </p>
          </article>
        </div>
        <Button
          asChild
          className="mt-10 h-13 rounded-full bg-[#14161C] px-7 text-[1.05rem] text-white hover:bg-black"
        >
          <Link href="/termin">Diesen Plan vor Ort durchsprechen</Link>
        </Button>
      </div>
    </section>
  );
}
