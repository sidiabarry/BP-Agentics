import type { Metadata } from "next";
import Link from "next/link";
import { DemoLoop } from "@/components/demo-player";
import { StageCard, StageGrid } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { videoObject } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Website-Demo für einen Dachdeckerbetrieb",
  description:
    "Produktdemo, kein Echtbetrieb: Bilder, Leistungsbeschreibung und Anfrageweg für einen Dachdeckerbetrieb.",
  path: "/referenzen/dachdecker-signature",
});

export default function DachdeckerSignaturePage() {
  return (
    <StagePage
      kicker="Produktdemo · kein Echtbetrieb"
      title="Bilder, Leistungen, Anfrageweg — in einem Auftritt."
      lead="Die Demo zeigt eine mögliche Präsentation von Dacharbeiten: mit Bildern, Leistungsbeschreibung und einem klaren Anfrageweg."
      crumbs={[
        { name: "Arbeiten und Demos", path: "/referenzen" },
        { name: "Dachdecker Signature", path: "/referenzen/dachdecker-signature" },
      ]}
      extraJsonLd={[
        videoObject({
          name: "Website-Demo für einen Dachdeckerbetrieb",
          description:
            "Produktdemo: mögliche Gestaltung mit Bildern, Leistungsbeschreibung und Anfrageweg.",
          thumbnailUrl: "/demos/dach-poster.jpg",
          contentUrl: "/demos/dach-loop.mp4",
          duration: "PT7S",
          uploadDate: "2026-09-09",
        }),
      ]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/gewerke#dachdecker", label: "Anwendungsbeispiel Dachdecker" },
        { href: "/referenzen/feinkost-kreta", label: "Projekt Feinkost Kreta" },
        { href: "/preise", label: "Preise" },
      ]}
      next={{
        title: "Website-Projekt besprechen",
        body: "Ob ein solcher Umfang sinnvoll ist, wird am konkreten Vorhaben entschieden. 90 Minuten vor Ort. Den Wunschtermin bestätigen wir persönlich.",
        primary: { href: cta.href, label: "Website-Projekt besprechen" },
        secondary: { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
      }}
      visual={
        <DemoLoop
          src="/demos/dach-loop.mp4"
          poster="/demos/dach-poster.jpg"
          fullSrc="/demos/dach-full.mp4"
          posterAlt="Standbild einer Signature-Website für einen Dachdeckerbetrieb"
          caption="Mögliche Gestaltung einer Website für einen Dachdeckerbetrieb."
          note="Produktdemo · kein Echtbetrieb"
        />
      }
    >
      <StageGrid cols={2}>
        <StageCard kicker="Gestaltung" title="Bilder, Bewegung und ein klarer Aufbau.">
          <p>
            Ein Dachdecker-Website-Entwurf mit Bildergalerie, Leistungsbeschreibung
            und Anfrageformular. Bewegung führt durch die Seite, aber
            der Aufbau funktioniert auch ohne. Interessenten sehen Arbeitsweise,
            Einsatzgebiet und einen direkten Kontaktweg.
          </p>
        </StageCard>
        <StageCard kicker="Einordnung" title="Produktdemo — kein Echtbetrieb.">
          <p>
            Dieses Beispiel zeigt eine Gestaltungsmöglichkeit von Website Signature.
            Es basiert nicht auf einem realen Auftrag. Ob ein solcher Umfang
            sinnvoll ist, wird am konkreten Vorhaben entschieden.
          </p>
          <p className="mt-3">
            <Link href={cta.href} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Website-Projekt besprechen
            </Link>
          </p>
        </StageCard>
      </StageGrid>
    </StagePage>
  );
}
