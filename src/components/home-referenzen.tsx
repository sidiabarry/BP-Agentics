import Link from "next/link";
import { DemoLoop } from "@/components/demo-player";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { ReviewsBand } from "@/components/reviews-band";
import { cn } from "@/lib/utils";

export function DemoPair({
  surface = "cream",
}: {
  surface?: "cream" | "white";
}) {
  const card = surface === "white" ? "bg-white" : "bg-[#F3EFE6]";
  return (
    <article className={cn("rounded-3xl p-6 md:p-8", card)}>
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        <div>
          <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
            Produktdemo · kein Echtbetrieb
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
            Dachdecker — Website Signature
          </h3>
          <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
            Die Demo verbindet Bilder, Leistungsbeschreibung und einen Anfrageweg.
            Sie zeigt eine mögliche Gestaltung für einen Dachdeckerbetrieb.
          </p>
          <p className="mt-5">
            <Link
              href="/referenzen/dachdecker-signature"
              className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
            >
              Website-Demo ansehen
            </Link>
          </p>
        </div>
        <DemoLoop
          src="/demos/dach-loop.mp4"
          poster="/demos/dach-poster.jpg"
          fullSrc="/demos/dach-full.mp4"
          posterAlt="Standbild einer Signature-Website für einen Dachdeckerbetrieb"
          caption="Mögliche Gestaltung einer Website für einen Dachdeckerbetrieb."
          note="Produktdemo · kein Echtbetrieb"
        />
      </div>
    </article>
  );
}

export function HomeReferenzen() {
  return (
    <section id="referenzen" className="bg-white px-5 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Arbeiten und Demos
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[18ch] text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Was bisher entstanden ist.
        </RevealHeading>
        <RevealIn as="p" variant="lead" className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Eine Produktdemo für einen Dachdeckerbetrieb. Die Beschreibung erklärt,
          was zu sehen ist.
        </RevealIn>

        <div className="mt-12">
          <DemoPair surface="cream" />
        </div>

        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/referenzen"
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            Alle Arbeiten und Demos
          </Link>
          <Link
            href="/leistungen"
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            Leistungen im Überblick
          </Link>
        </p>

        <div className="mt-16">
          <ReviewsBand tone="cream" />
        </div>
      </div>
    </section>
  );
}
