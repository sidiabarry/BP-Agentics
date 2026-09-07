import Link from "next/link";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { levels } from "@/lib/content";

const levelHrefs: Record<string, { href: string; label: string }> = {
  auftritt: {
    href: "/leistungen/auftritt",
    label: "Auftritt im Detail",
  },
  annahme: {
    href: "/leistungen/annahme",
    label: "Annahme im Detail",
  },
  ablaeufe: {
    href: "/leistungen/ablaeufe",
    label: "Abläufe im Detail",
  },
};

export function ThreeLevels({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="leistungen"
      className={`bg-[#F3EFE6] px-5 md:px-8 ${compact ? "py-16" : "py-24"}`}
    >
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
        {compact ? (
          <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {levels.map((level, index) => (
              <RevealIn
                key={level.id}
                id={level.id}
                as="li"
                variant="card"
                delay={index * 60}
                className="grid gap-1 py-4 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-baseline md:gap-6"
              >
                <p className="font-semibold tracking-[-0.02em] text-[#14161C]">
                  {level.roman} · {level.name}
                </p>
                <p className="text-[1.05rem] leading-snug text-[#3A3D45]">{level.sub}</p>
                {levelHrefs[level.id] ? (
                  <p>
                    <Link
                      href={levelHrefs[level.id].href}
                      className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
                    >
                      {levelHrefs[level.id].label}
                    </Link>
                  </p>
                ) : null}
              </RevealIn>
            ))}
          </ul>
        ) : (
          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
            {levels.map((level, index) => (
              <RevealIn
                key={level.id}
                id={level.id}
                as="article"
                variant="card"
                delay={index * 60}
                className="flex h-full flex-col rounded-3xl bg-[#14161C] p-7 text-[#F3EFE6]"
              >
                <p className="text-sm tracking-[0.2em] text-[#9FD0F8] uppercase">
                  {level.roman}
                </p>
                <h3 className="mt-4 text-3xl font-semibold">{level.name}</h3>
                <p className="mt-2 text-[1.05rem] text-[#9FD0F8]">{level.sub}</p>
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
        )}
      </div>
    </section>
  );
}
