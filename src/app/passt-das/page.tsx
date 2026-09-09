import type { Metadata } from "next";
import { Process } from "@/components/process";
import { SchnellCheck } from "@/components/schnell-check";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Welcher Einstieg passt zu Ihrem Vorhaben?",
  description:
    "Eine Angabe hilft bei der Orientierung: Was soll leichter werden? Der genaue Umfang wird im Gespräch geklärt.",
  path: "/passt-das",
});

export default function PasstDasPage() {
  return (
    <StagePage
      kicker="Orientierung"
      title="Was soll leichter werden?"
      lead="Sie erhalten eine erste Richtung. Der genaue Umfang wird im Gespräch geklärt — keine Wirtschaftlichkeitsprüfung, kein festgelegtes Paket."
      crumbs={[{ name: "Welcher Einstieg passt?", path: "/passt-das" }]}
      related={[
        { href: "/leistungen", label: "Leistungen" },
        { href: "/preise", label: "Preise" },
        { href: "/ueber-mich", label: "Über mich" },
        { href: "/termin", label: "Erstgespräch anfragen" },
      ]}
      next={{
        title: "Die Richtung im Gespräch prüfen",
        body: "Die passende Leistung richtet sich nach Ihrem Vorhaben, nicht nach der Teamgröße. Den verbindlichen Umfang halten wir im Angebot fest.",
        chips: ["Eine Angabe reicht", "Keine Prüfung der Wirtschaftlichkeit", "90 Minuten vor Ort"],
        primary: { href: cta.href, label: cta.primary },
        secondary: { href: "/leistungen", label: "Leistungen ansehen" },
      }}
      appendix={<Process />}
    >
      <SchnellCheck embedded />
    </StagePage>
  );
}
