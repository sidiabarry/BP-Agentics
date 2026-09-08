import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { steps } from "@/lib/content";

export function Process({
  limit,
  headingId = "ablauf",
}: {
  limit?: number;
  headingId?: string;
}) {
  const shown = limit ? steps.slice(0, limit) : steps;

  return (
    <section
      id={headingId}
      className={`bg-white px-5 text-[#14161C] md:px-8 ${limit ? "py-16" : "py-16 md:py-24"}`}
    >
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Zusammenarbeit
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[18ch] text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.03em] text-[#14161C] md:text-5xl">
          Vom ersten Gespräch zum passenden Baustein.
        </RevealHeading>
        <ol
          className={
            limit === 3
              ? "mt-12 grid items-start gap-10 md:grid-cols-3"
              : "mt-12 grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {shown.map((step, index) => (
            <RevealIn
              key={step.n}
              as="li"
              variant="card"
              delay={index * 60}
              className="relative min-w-0"
            >
              {index < shown.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-[2.6rem] hidden h-px bg-black/12 lg:block"
                  style={{ right: "-1.25rem" }}
                />
              ) : null}
              <p className="text-[2rem] leading-none font-semibold tracking-[-0.04em] text-[#198BE8]">
                {step.n}
              </p>
              <h3 className="mt-4 text-xl leading-snug font-semibold">{step.title}</h3>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-[#3A3D45]">
                {step.body}
              </p>
            </RevealIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
