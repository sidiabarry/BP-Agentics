import { ConsequenceReel } from "@/components/consequence-reel";
import { RevealHeading } from "@/components/reveal-heading";
import { consequenceCards, workReferences } from "@/lib/content";

export function Proof() {
  return (
    <section id="arbeiten" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.2em] text-[#5B54E6] uppercase">
          Ohne System
        </p>
        <RevealHeading className="mt-3 max-w-[18ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] hyphens-auto md:text-5xl">
          Der Schreibtisch füllt sich. Der Auftrag nicht.
        </RevealHeading>
        <p className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Anfrage im Festnetz. Lieferschein auf dem Tisch. Lager hinter Glas. Das
          ist kein unfähiger Betrieb. Das ist ein Betrieb ohne Setter und ohne
          Datenfundament.
        </p>
        <div className="mt-12">
          <ConsequenceReel />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {consequenceCards.map((item) => (
            <article key={item.time} className="rounded-3xl bg-white p-6">
              <p className="text-sm tracking-[0.16em] text-[#5B54E6] uppercase">
                {item.time}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-[1.02rem] text-[#5C5F66]">{workReferences}</p>
      </div>
    </section>
  );
}
