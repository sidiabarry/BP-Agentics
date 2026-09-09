import type { Metadata } from "next";
import Image from "next/image";
import { Process } from "@/components/process";
import { SchnellCheck } from "@/components/schnell-check";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Was soll leichter werden? Orientierung für den Einstieg",
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
      visual={
        <div className="flex justify-center">
          <Image
            src="/media/phone-hand.png"
            alt="Hand hält ein Smartphone mit geöffnetem BP Agentics System"
            width={320}
            height={480}
            className="h-auto w-full max-w-[16rem]"
          />
        </div>
      }
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
