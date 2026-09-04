import Link from "next/link";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { whyPoints } from "@/lib/content";

export function WhyTeaser() {
  return (
    <section id="warum" className="bg-[#14161C] px-5 py-24 text-[#F3EFE6] md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#9FD0F8] uppercase">
          Über mich
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[18ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Ein Mensch. Ein Betrieb. Kein Account-Karussell.
        </RevealHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {whyPoints.map((item, index) => (
            <RevealIn
              key={item.title}
              as="article"
              variant="card"
              delay={index * 60}
              className="rounded-[1.6rem] border border-white/10 p-7"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-[1.08rem] leading-relaxed text-white/75">
                {item.body}
              </p>
            </RevealIn>
          ))}
        </div>
        <p className="mt-10">
          <Link href="/ueber-mich" className="text-[#9FD0F8] underline-offset-4 hover:underline">
            Wer Sidia Jerome Barry ist und wie die Zusammenarbeit läuft
          </Link>
        </p>
      </div>
    </section>
  );
}
