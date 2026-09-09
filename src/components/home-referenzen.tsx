import Link from "next/link";
import { DemoLoop, PhoneDemo } from "@/components/demo-player";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { cn } from "@/lib/utils";

export function DemoPair({
  surface = "cream",
}: {
  surface?: "cream" | "white";
}) {
  const card = surface === "white" ? "bg-white" : "bg-[#F3EFE6]";
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
      <article className={cn("flex h-full flex-col rounded-3xl p-6 md:p-7", card)}>
        <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
          Projekt · Feinkost Kreta
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
          Feinkost Kreta — Bestell-App
        </h3>
        <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
          Vorher hieß neu bestellen: Formular jedes Mal neu. Heute: angemeldet
          bestellen, der Laden sieht die Bestellung.
        </p>
        <div className="mt-6 flex flex-1 items-center justify-center rounded-3xl bg-[#14161C] px-6 py-8">
          <PhoneDemo
            src="/demos/feinkost-loop.mp4"
            poster="/demos/feinkost-poster.jpg"
            fullSrc="/demos/feinkost-full.mp4"
            posterAlt="Smartphone-Ansicht der Bestell-App von Feinkost Kreta"
            caption="Angemeldet bestellen in der App von Feinkost Kreta."
            width={300}
          />
        </div>
        <p className="mt-5">
          <Link
            href="/referenzen/feinkost-kreta"
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            Projekt Feinkost Kreta
          </Link>
        </p>
      </article>

      <article className={cn("flex h-full flex-col rounded-3xl p-6 md:p-7", card)}>
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
        <div className="mt-6 flex-1">
          <DemoLoop
            src="/demos/dach-loop.mp4"
            poster="/demos/dach-poster.jpg"
            fullSrc="/demos/dach-full.mp4"
            posterAlt="Standbild einer Signature-Website für einen Dachdeckerbetrieb"
            caption="Mögliche Gestaltung einer Website für einen Dachdeckerbetrieb."
            note="Produktdemo · kein Echtbetrieb"
          />
        </div>
        <p className="mt-5">
          <Link
            href="/referenzen/dachdecker-signature"
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            Website-Demo ansehen
          </Link>
        </p>
      </article>
    </div>
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
          So können die Lösungen aussehen.
        </RevealHeading>
        <RevealIn as="p" variant="lead" className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Ein Projekt zeigt einen Bestellweg. Eine Produktdemo zeigt, wie sich die
          Leistungen eines Dachdeckerbetriebs präsentieren lassen.
        </RevealIn>

        <div className="mt-12">
          <DemoPair surface="cream" />
        </div>
      </div>
    </section>
  );
}
