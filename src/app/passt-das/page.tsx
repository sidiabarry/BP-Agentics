import type { Metadata } from "next";
import Image from "next/image";
import { Process } from "@/components/process";
import { SchnellCheck } from "@/components/schnell-check";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { paths, stageThread } from "@/lib/journey";

export const metadata: Metadata = pageMetadata({
  title: "Orientierung: passt das Angebot zu Ihrem Betrieb",
  description:
    "Kurze Orientierung, ob Website, Nachrichten-Assistent oder Automatisierung zu Ihrem Betrieb passt. Den genauen Umfang klären wir im Gespräch.",
  path: paths.passtDas,
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
      crumbs={[{ name: "Welcher Einstieg passt?", path: paths.passtDas }]}
      related={stageThread(paths.passtDas).related}
      next={stageThread(paths.passtDas).next}
      appendix={<Process />}
    >
      <SchnellCheck embedded />
    </StagePage>
  );
}
