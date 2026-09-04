import Link from "next/link";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { levels } from "@/lib/content";

const levelHrefs: Record<string, { href: string; label: string }> = {
  auftritt: {
    href: "/leistungen/auftritt",
    label: "Website-Stufen und Endpreise nachlesen",
  },
  annahme: {
    href: "/leistungen/annahme",
    label: "KI-Setter für die Annahme nachlesen",
  },
  ablaeufe: {
    href: "/leistungen/ablaeufe",
    label: "Fundament und Module nachlesen",
  },
};

export function ThreeLevels({ compact = false }: { compact?: boolean }) {
  return (
    <section id="leistungen" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Leistungen
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[20ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Sie starten dort, wo der Schmerz am größten ist.
        </RevealHeading>
        <RevealIn as="p" variant="lead" className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Kein monolithisches Großprojekt. Die Bausteine greifen ineinander,
          bleiben aber einzeln beauftragbar. Nachrüsten, wenn der Betrieb soweit ist.
        </RevealIn>
        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {levels.map((level, index) => (
            <RevealIn
              key={level.id}
              id={level.id}
              as="article"
              variant="card"
              delay={index * 60}
              className="flex h-full flex-col rounded-[2rem] bg-[#14161C] p-7 text-[#F3EFE6]"
            >
                <p className="text-sm tracking-[0.2em] text-[#9FD0F8] uppercase">
                  {level.roman}
                </p>
                <h3 className="mt-4 text-3xl font-semibold">{level.name}</h3>
                <p className="mt-2 text-[1.05rem] text-[#9FD0F8]">{level.sub}</p>
                <p className="mt-4 flex-1 text-[1.08rem] leading-relaxed text-white/75">
                  {level.lead}
                </p>
                {compact ? (
                  <p className="mt-4 text-[1.05rem] leading-relaxed text-white/70">
                    {level.price}. {level.run}.
                  </p>
                ) : (
                  <>
                    <ul className="mt-6 space-y-2 text-[1.02rem]">
                      {level.items.map((item) => (
                        <li key={item} className="border-t border-white/10 pt-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 text-[1.05rem]">{level.price}</p>
                    <p className="text-white/60">{level.run}</p>
                  </>
                )}
                {levelHrefs[level.id] ? (
                  <p className="mt-5">
                    <Link
                      href={levelHrefs[level.id].href}
                      className="text-[#9FD0F8] underline-offset-4 hover:underline"
                    >
                      {levelHrefs[level.id].label}
                    </Link>
                  </p>
                ) : null}
            </RevealIn>
          ))}
        </div>
      </div>
    </section>
  );
}
