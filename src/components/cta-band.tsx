import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBand({ dark = false }: { dark?: boolean }) {
  return (
    <section
      className={`px-5 py-16 md:px-8 ${dark ? "bg-[#14161C] text-white" : "bg-[#EDE8FF]"}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Sowas für Ihren Betrieb?
          </h2>
          <p className={`mt-2 text-[1.1rem] ${dark ? "text-white/75" : "text-[#3A3D45]"}`}>
            Ein Gespräch, 90 Minuten, kostenlos. Danach wissen Sie, was sich lohnt.
          </p>
        </div>
        <Button
          asChild
          className="h-13 rounded-full bg-[#5B54E6] px-7 text-[1.05rem] text-white hover:bg-[#4A44D4]"
        >
          <Link href="/termin">Erstgespräch vereinbaren</Link>
        </Button>
      </div>
    </section>
  );
}
