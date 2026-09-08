import type { Metadata } from "next";
import { DemoPair } from "@/components/home-referenzen";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "So können die Lösungen aussehen",
  description:
    "Zwei Beispiele: eine Bestell-App und eine Website-Präsentation. Beschreibungen erklären, was zu sehen ist — ohne behauptete Umsatzzahlen.",
  path: "/referenzen",
});

export default function ReferenzenPage() {
  return (
    <StagePage
      kicker="Arbeiten und Demos"
      title="So können die Lösungen aussehen."
      lead="Zwei unterschiedliche Aufgaben: ein digitaler Bestellweg und eine Website-Präsentation. Die Beschreibungen erklären, was zu sehen ist — ohne behauptete Umsatzzahlen."
      crumbs={[{ name: "Arbeiten und Demos", path: "/referenzen" }]}
      related={[
        { href: "/referenzen/feinkost-kreta", label: "Bestell-App ansehen" },
        { href: "/referenzen/dachdecker-signature", label: "Website-Demo ansehen" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
      next={{
        title: "Ähnlichen Weg für Ihren Betrieb prüfen",
        body: "Die Demos zeigen Prinzipien, keine versprochenen Ergebnisse. Im Gespräch klären wir, welcher Ansatz zu Ihrem Vorhaben passt.",
        chips: ["Produktdemo", "Kein Umsatzversprechen", "90 Minuten vor Ort"],
        primary: { href: cta.href, label: cta.primary },
        secondary: { href: "/leistungen", label: "Leistungen ansehen" },
      }}
    >
      <DemoPair surface="white" />
    </StagePage>
  );
}
