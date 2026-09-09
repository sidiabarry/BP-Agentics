import type { Metadata } from "next";
import { DemoPair } from "@/components/home-referenzen";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Arbeiten und Demos — was bisher entstanden ist",
  description:
    "Projekt Feinkost Kreta: angemeldet bestellen. Produktdemo Dachdecker: eine mögliche Website. Beschreibungen erklären, was zu sehen ist.",
  path: "/referenzen",
});

export default function ReferenzenPage() {
  return (
    <StagePage
      kicker="Arbeiten und Demos"
      title="Was bisher entstanden ist."
      lead="Ein Kundenprojekt zeigt einen echten Bestellweg. Eine Produktdemo zeigt, wie sich ein Handwerksbetrieb präsentieren kann. Beschreibungen erklären, was zu sehen ist."
      crumbs={[{ name: "Arbeiten und Demos", path: "/referenzen" }]}
      related={[
        { href: "/referenzen/feinkost-kreta", label: "Projekt Feinkost Kreta" },
        { href: "/referenzen/dachdecker-signature", label: "Website-Demo ansehen" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
      next={{
        title: "Ähnlichen Weg für Ihren Betrieb prüfen",
        body: "Im Gespräch klären wir, welcher Ansatz zu Ihrem Vorhaben passt.",
        chips: ["Ein Projekt, eine Demo", "90 Minuten vor Ort"],
        primary: { href: cta.href, label: cta.primary },
        secondary: { href: "/leistungen", label: "Leistungen ansehen" },
      }}
    >
      <DemoPair surface="white" />
    </StagePage>
  );
}
