import { RevealHeading } from "@/components/reveal-heading";
import { problems } from "@/lib/content";

export function ProblemWall() {
  return (
    <section id="problem" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.2em] text-[#5B54E6] uppercase">
          Das Ablaufproblem
        </p>
        <RevealHeading className="mt-3 max-w-[22ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] text-[#14161C] hyphens-auto md:text-5xl">
          Sie verlieren keine Aufträge, weil Sie schlecht arbeiten.
        </RevealHeading>
        <p className="mt-6 max-w-[42rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Sie verlieren sie, weil Sie auf dem Dach oder beim Kunden stehen, wenn
          das Telefon klingelt. Weil Angebote abends um zehn geschrieben werden.
          Weil der Stundenzettel im Transporter liegt und der Lieferschein irgendwo
          dazwischen. Das ist kein Softwareproblem. Das ist ein Ablaufproblem. Und
          Abläufe kann man bauen.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {problems.map((item, index) => (
            <article
              key={item.title}
              className="rounded-3xl border border-black/8 bg-white p-7 shadow-[0_20px_50px_-32px_rgba(20,22,28,0.45)]"
            >
              <p className="text-sm tracking-[0.18em] text-[#5B54E6] uppercase">
                {String(index + 1).padStart(2, "0")} · {item.title}
              </p>
              <p className="mt-4 text-[1.2rem] leading-snug text-[#14161C]">
                „{item.line}“
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
