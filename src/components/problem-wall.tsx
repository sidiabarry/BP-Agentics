import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { problems } from "@/lib/content";

export function ProblemWall() {
  return (
    <section id="problem" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Das Ablaufproblem
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[22ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] text-[#14161C] md:text-5xl">
          Sie verlieren keine Aufträge, weil Sie schlecht arbeiten.
        </RevealHeading>
        <RevealIn as="p" variant="lead" className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#14161C]/80">
          Sie verlieren sie, weil Sie auf dem Dach oder beim Kunden stehen, wenn
          das Telefon klingelt. Weil Angebote abends um zehn geschrieben werden.
          Weil der Stundenzettel im Transporter liegt und der Lieferschein irgendwo
          dazwischen. Das ist kein Softwareproblem. Das ist ein Ablaufproblem. Und
          Abläufe kann man bauen.
        </RevealIn>
        <div className="mt-12 grid items-stretch gap-4 md:grid-cols-2">
          {problems.map((item, index) => (
            <RevealIn
              key={item.title}
              as="article"
              variant="card"
              delay={index * 60}
              className="h-full rounded-3xl border border-black/8 bg-white p-6 shadow-[0_20px_50px_-32px_rgba(20,22,28,0.28)] md:p-7"
            >
              <p className="text-sm tracking-[0.18em] text-[#198BE8] uppercase">
                {String(index + 1).padStart(2, "0")} · {item.title}
              </p>
              <p className="mt-4 text-[1.2rem] leading-snug text-[#14161C]">
                „{item.line}“
              </p>
            </RevealIn>
          ))}
        </div>
      </div>
    </section>
  );
}
