import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Process } from "@/components/process";

export function HomeStart() {
  return (
    <section id="start" className="bg-[#F3EFE6]">
      <Process limit={3} headingId="start-schritte" />
      <div className="bg-white px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 rounded-3xl bg-[#F3EFE6] px-6 py-6 sm:flex-row sm:items-center md:px-8">
          <Button
            asChild
            className="h-13 rounded-full bg-[#198BE8] px-7 text-[1.05rem] text-white hover:bg-[#1576C4]"
          >
            <Link href="/termin">Erstgespräch vereinbaren</Link>
          </Button>
          <p className="text-[1.05rem] text-[#5C5F66]">
            90 Minuten vor Ort, kostenlos. Danach liegt der Plan auf dem Tisch.
          </p>
        </div>
      </div>
    </section>
  );
}
