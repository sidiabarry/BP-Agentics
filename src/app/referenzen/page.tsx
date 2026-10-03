import type { Metadata } from "next";
import Link from "next/link";
import { DemoPair } from "@/components/home-referenzen";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Arbeiten und Demos — Website-Demo für Dachdecker",
  description:
    "Website-Demo für einen Dachdeckerbetrieb. Die Beschreibung erklärt, was zu sehen ist. Die Demo ist als solche gekennzeichnet.",
  path: "/referenzen",
});

export default function ReferenzenPage() {
  return (
    <StagePage
      kicker="Arbeiten und Demos"
      title="Was bisher entstanden ist."
      lead="Die Produktdemo zeigt, wie sich ein Dachdeckerbetrieb präsentieren kann: mit Bildern, Leistungsbeschreibung und Anfrageweg. Sie ist kein Echtbetrieb."
      crumbs={[{ name: "Arbeiten und Demos", path: "/referenzen" }]}
      related={[
        { href: "/referenzen/dachdecker-signature", label: "Website-Demo ansehen" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
      next={{
        title: "Ähnlichen Weg für Ihren Betrieb prüfen",
        body: "Im Gespräch klären wir, welcher Ansatz zu Ihrem Vorhaben passt.",
        chips: ["Produktdemo, kein Echtbetrieb", "90 Minuten vor Ort"],
        primary: { href: cta.href, label: cta.primary },
        secondary: { href: "/leistungen", label: "Leistungen ansehen" },
      }}
    >
      <DemoPair surface="white" />
      <div className="mt-10 max-w-[44rem] space-y-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
        <p>
          Die Dachdecker-Seite ist eine Produktdemo für Website Signature, mit Bildern,
          Leistungsbeschreibung und Anfrageweg, und ausdrücklich kein Echtbetrieb.
        </p>
        <p>
          Welche Leistung zu einem Betrieb passt, steht nicht in diesem Beispiel fest.
          Website, Nachrichten-Assistent und Büroabläufe sind einzeln beauftragbar. Im
          Gespräch von 90 Minuten vor Ort klären wir den passenden Anfang. Den Umfang
          hält danach der Projektplan fest.
        </p>
        <ul className="flex list-none flex-col gap-2 p-0">
          <li>
            <Link href="/referenzen/dachdecker-signature" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Website-Demo Dachdecker
            </Link>
          </li>
          <li>
            <Link href="/leistungen" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Leistungen im Überblick
            </Link>
          </li>
        </ul>
      </div>
    </StagePage>
  );
}
