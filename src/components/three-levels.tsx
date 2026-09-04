import { RevealHeading } from "@/components/reveal-heading";
import { levels } from "@/lib/content";

export function ThreeLevels() {
  return (
    <section id="ebenen" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.2em] text-[#5B54E6] uppercase">
          Drei Ebenen
        </p>
        <RevealHeading className="mt-3 max-w-[20ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] hyphens-auto md:text-5xl">
          Sie starten dort, wo der Schmerz am größten ist.
        </RevealHeading>
        <p className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Kein monolithisches Großprojekt. Außen, Scharnier und Innen greifen ineinander,
          bleiben aber einzeln beauftragbar. Nachrüsten, wenn der Betrieb soweit ist.
        </p>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {levels.map((level) => (
            <article
              key={level.id}
              id={level.id}
              className="flex flex-col rounded-[2rem] bg-[#14161C] p-7 text-[#F3EFE6]"
            >
              <p className="text-sm tracking-[0.2em] text-[#A8A4FF] uppercase">
                {level.roman} · {level.kicker}
              </p>
              <h3 className="mt-4 text-3xl font-semibold">{level.name}</h3>
              <p className="mt-4 flex-1 text-[1.08rem] leading-relaxed text-white/75">
                {level.lead}
              </p>
              <ul className="mt-6 space-y-2 text-[1.02rem]">
                {level.items.map((item) => (
                  <li key={item} className="border-t border-white/10 pt-2">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[1.05rem]">{level.price}</p>
              <p className="text-white/60">{level.run}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
