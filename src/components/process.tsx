import { steps } from "@/lib/content";

export function Process() {
  return (
    <section id="ablauf" className="bg-[#14161C] px-5 py-24 text-[#F3EFE6] md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.2em] text-[#A8A4FF] uppercase">
          Vier Schritte
        </p>
        <h2 className="mt-3 max-w-[18ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] hyphens-auto md:text-5xl">
          Keine Überraschung. Kein offener Stundenzettel.
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <li key={step.n} className="rounded-[1.6rem] border border-white/10 p-7">
              <p className="text-sm tracking-[0.2em] text-[#A8A4FF]">{step.n}</p>
              <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-[1.08rem] leading-relaxed text-white/75">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
