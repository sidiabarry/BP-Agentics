import type { Metadata } from "next";
import Link from "next/link";
import { DemoPair } from "@/components/home-referenzen";
import { Process } from "@/components/process";
import { StagePage } from "@/components/stage-page";
import { LevelCards } from "@/components/three-levels";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Drei Bausteine. Ein Weg durch den Betrieb.",
  description:
    "Eine Website macht Leistungen verständlich. Ein Nachrichten-Assistent bereitet WhatsApp- und E-Mail-Anfragen vor. Automatisierte Abläufe verbinden Büro und Außendienst.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <StagePage
      kicker="Leistungen"
      title="Drei Bausteine. Ein Weg durch den Betrieb."
      lead="Website, Nachrichten-Assistent und Büroablauf sind einzeln beauftragbar. Im Gespräch klären wir, welcher Baustein zuerst den Alltag erleichtert."
      crumbs={[{ name: "Leistungen", path: "/leistungen" }]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
        { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
        { href: "/preise", label: "Preise" },
        { href: "/referenzen", label: "Arbeiten und Demos" },
      ]}
      next={{
        title: "Welcher Baustein zuerst?",
        body: "90 Minuten vor Ort in Nordrhein-Westfalen. Sie senden einen Terminwunsch. Den Termin bestätigen wir persönlich.",
        chips: ["90 Minuten im Betrieb", "Kostenloses Erstgespräch", "Persönlich bestätigt"],
        primary: { href: cta.href, label: cta.primary },
        secondary: { href: "/passt-das", label: "Erst Orientierung holen" },
      }}
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
        Die Größenordnung für Einrichtung und Betreuung steht auf der{" "}
        <Link href="/preise" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          Preisseite
        </Link>
        . Der verbindliche Umfang steht vor der Beauftragung im Angebot.
      </p>
    </StagePage>
  );
}
