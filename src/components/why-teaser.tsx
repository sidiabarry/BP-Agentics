import Link from "next/link";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { whyPoints } from "@/lib/content";

export function WhyTeaser() {
  return (
    <section id="warum" className="bg-[#F3EFE6] px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
            Ansprechpartner
          </RevealIn>
          <RevealHeading className="mt-3 max-w-[16ch] text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
            Ihr Ansprechpartner: Sidia Jerome Barry.
          </RevealHeading>
          <RevealIn as="p" variant="lead" className="mt-5 max-w-[36rem] text-[1.12rem] leading-relaxed text-[#3A3D45]">
            Ich bin Inhaber von BP Agentics und entwickle Websites und Software für
            Betriebe in NRW. Im ersten Gespräch geht es um Ihren Arbeitsalltag.
            Daraus entsteht ein Vorschlag, den Sie fachlich und preislich nachvollziehen
            können.
          </RevealIn>
          <p className="mt-8">
            <Link href="/ueber-mich" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Mehr über mich
            </Link>
          </p>
        </div>
        <ol className="space-y-0">
          {whyPoints.map((item, index) => (
            <RevealIn
              key={item.title}
              as="li"
              variant="card"
              delay={index * 50}
              className="border-t border-black/10 py-5 first:border-t-0 first:pt-0"
            >
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[#14161C]">
                {item.title}
              </h3>
              <p className="mt-2 text-[1.02rem] leading-relaxed text-[#3A3D45]">
                {item.body}
              </p>
            </RevealIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
