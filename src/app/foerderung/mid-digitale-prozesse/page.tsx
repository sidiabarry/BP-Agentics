import type { Metadata } from "next";
import { StageCard } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { foerderung } from "@/lib/foerderung";

export const metadata: Metadata = pageMetadata({
  title: foerderung.title,
  description: foerderung.lead,
  path: "/foerderung/mid-digitale-prozesse",
});

export default function MidPage() {
  return (
    <StagePage
      kicker="Förderung Nordrhein-Westfalen"
      title={foerderung.title}
      lead={foerderung.lead}
      crumbs={[
        { name: "MID-Digitale Prozesse", path: "/foerderung/mid-digitale-prozesse" },
      ]}
      reviewed={foerderung.reviewed}
      related={[
        { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/preise", label: "Preise" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
      next={{
        title: "Ob eine Prozessberatung passt, klären wir sachlich.",
        body: "Diese kurze Fassung enthält keine vollständige Förderberatung. Die Bewilligungsstelle entscheidet über einen Antrag.",
        chips: ["Keine pauschale 50-Prozent-Rechnung", "Vor Beauftragung klären", "Offizielle Quellen zuerst"],
        primary: { href: "/kontakt", label: "Kontakt zu BP Agentics" },
        secondary: { href: foerderung.nrwBankUrl, label: "NRW.BANK-Aufruf" },
      }}
    >
      <h2 className="mb-4 text-2xl font-semibold tracking-[-0.03em]">
        Die Richtlinie in Kürze
      </h2>
      <div className="grid gap-4">
        {foerderung.sections.map((section) => (
          <StageCard key={section.heading} title={section.heading}>
            <p>{section.body}</p>
          </StageCard>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-2 text-[1.05rem] sm:flex-row sm:flex-wrap sm:gap-4">
        <a
          href={foerderung.nrwBankUrl}
          className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
        >
          NRW.BANK – aktueller Förderaufruf
        </a>
        <a
          href={foerderung.richtlinieUrl}
          className="text-[#198BE8] underline-offset-4 hover:underline"
        >
          Offizielle Richtlinie, insbesondere Ziffern 2, 4.5, 5.4 und 7
        </a>
      </div>
    </StagePage>
  );
}
