import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { steps } from "@/lib/content";

export function Process() {
  return (
    <section id="ablauf" className="bg-[#14161C] px-5 py-24 text-[#F3EFE6] md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#9FD0F8] uppercase">
          Vier Schritte
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[18ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Keine Überraschung. Kein offener Stundenzettel.
        </RevealHeading>
        <ol className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <RevealIn
              key={step.n}
              as="li"
              variant="card"
              delay={index * 60}
              className="flex h-full flex-col rounded-[1.6rem] border border-white/10 p-7"
            >
              <p className="text-sm tracking-[0.2em] text-[#9FD0F8]">{step.n}</p>
              <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 flex-1 text-[1.08rem] leading-relaxed text-white/75">
                {step.body}
              </p>
            </RevealIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
