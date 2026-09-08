import Link from "next/link";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { whyPoints } from "@/lib/content";

export function WhyTeaser() {
  return (
    <section id="warum" className="bg-[#14161C] px-5 py-20 text-[#F3EFE6] md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#9FD0F8] uppercase">
          Ansprechpartner
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[18ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Ihr Ansprechpartner: Sidia Jerome Barry.
        </RevealHeading>
        <RevealIn as="p" variant="lead" className="mt-5 max-w-[40rem] text-[1.12rem] leading-relaxed text-white/75">
          Ich bin Inhaber von BP Agentics und entwickle Websites und digitale Abläufe
          für Betriebe in NRW. Im ersten Gespräch geht es um Ihren Arbeitsalltag.
          Daraus entsteht ein Vorschlag, den Sie fachlich und preislich nachvollziehen
          können.
        </RevealIn>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {whyPoints.map((item, index) => (
            <RevealIn
              key={item.title}
              as="article"
              variant="card"
              delay={index * 60}
              className="rounded-3xl border border-white/10 p-6 md:p-7"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-[1.08rem] leading-relaxed text-white/75">
                {item.body}
              </p>
            </RevealIn>
          ))}
        </div>
        <p className="mt-10">
          <Link href="/ueber-mich" className="font-semibold text-[#9FD0F8] underline-offset-4 hover:underline">
            Mehr über die Zusammenarbeit
          </Link>
        </p>
      </div>
    </section>
  );
}
