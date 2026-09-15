import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DemoPair } from "@/components/home-referenzen";
import { Process } from "@/components/process";
import { StagePage } from "@/components/stage-page";
import { LevelCards } from "@/components/three-levels";
import { pageMetadata } from "@/lib/seo";
import { paths, stageThread } from "@/lib/journey";

export const metadata: Metadata = pageMetadata({
  title: "Website, WhatsApp-Annahme und Abläufe für Handwerk",
  description:
    "Website, WhatsApp-Annahme und automatisierte Abläufe für Handwerk in NRW. Die Bausteine sind einzeln beauftragbar; den Umfang klären wir im Gespräch.",
  path: paths.leistungen,
});

export default function LeistungenPage() {
  return (
    <StagePage
      kicker="Leistungen"
      title="Drei Bausteine. Ein Weg durch den Betrieb."
      lead="Website, Nachrichten-Assistent und Büroablauf sind einzeln beauftragbar. Im Gespräch klären wir, welcher Baustein zuerst den Alltag erleichtert."
      crumbs={[{ name: "Leistungen", path: paths.leistungen }]}
      visual={
        <div className="overflow-hidden rounded-[1.6rem] shadow-xl ring-1 ring-black/10">
          <Image
            src="/demos/dach-poster.jpg"
            alt="Standbild einer Signature-Website für einen Dachdeckerbetrieb — Produktdemo"
            width={640}
            height={360}
            className="h-auto w-full"
          />
        </div>
      }
      related={stageThread(paths.leistungen).related}
      next={stageThread(paths.leistungen).next}
      appendix={
        <>
          <Process />
          <section className="bg-[#F3EFE6] px-5 py-16 md:px-8">
            <div className="mx-auto max-w-6xl">
              <p className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
                Arbeiten und Demos
              </p>
              <h2 className="mt-3 max-w-[18ch] text-3xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-4xl">
                So kann es aussehen.
              </h2>
              <div className="mt-10">
                <DemoPair surface="white" />
              </div>
            </div>
          </section>
        </>
      }
    >
      <h2 className="sr-only">Drei Leistungszugänge</h2>
      <LevelCards />
      <p className="mt-8 max-w-[42rem] text-[1.08rem] leading-relaxed text-[#3A3D45]">
        Einrichtung und Betreuung stehen auf der{" "}
        <Link href={paths.preise} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          Preisseite
        </Link>
        .
      </p>
    </StagePage>
  );
}
