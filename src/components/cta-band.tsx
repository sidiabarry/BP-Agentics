import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RevealIn } from "@/components/reveal-in";

export function CtaBand({ dark = false }: { dark?: boolean }) {
  return (
    <section
      className={`px-5 py-16 md:px-8 ${dark ? "bg-[#14161C] text-white" : "bg-[#E8F4FC]"}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <RevealIn variant="rise" className="max-w-[40rem]">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Sowas für Ihren Betrieb?
          </h2>
          <p className={`mt-2 text-[1.1rem] ${dark ? "text-white/75" : "text-[#3A3D45]"}`}>
            Ein Gespräch, 90 Minuten, kostenlos. Danach wissen Sie, was sich lohnt.
          </p>
        </RevealIn>
        <RevealIn variant="rise" delay={80}>
          <Button
            asChild
            className="h-13 rounded-full bg-[#198BE8] px-7 text-[1.05rem] text-white hover:bg-[#1576C4]"
          >
            <Link href="/termin">Erstgespräch vereinbaren</Link>
          </Button>
        </RevealIn>
      </div>
    </section>
  );
}
