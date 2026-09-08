import type { Metadata } from "next";
import Link from "next/link";
import { DemoLoop } from "@/components/demo-player";
import { DocPage } from "@/components/doc-page";
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
    <DocPage
      kicker="Produktdemo · kein Echtbetrieb"
      title="Website-Demo für einen Dachdeckerbetrieb"
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
          duration: "PT15S",
          uploadDate: "2026-08-15",
        }),
      ]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/gewerke#dachdecker", label: "Anwendungsbeispiel Dachdecker" },
        { href: "/referenzen/feinkost-kreta", label: "Bestell-App ansehen" },
        { href: "/preise", label: "Preise" },
      ]}
    >
      <DemoLoop
        src="/demos/dach-loop.mp4"
        poster="/demos/dach-poster.jpg"
        fullSrc="/demos/dach-full.mp4"
        posterAlt="Standbild einer Signature-Website für einen Dachdeckerbetrieb"
        caption="Mögliche Gestaltung einer Website für einen Dachdeckerbetrieb."
        note="Produktdemo · kein Echtbetrieb"
        className="mt-10"
      />

      <h2>Gestaltung</h2>
      <p>
        Bewegung und Bilder unterstützen die Darstellung der Arbeiten. Entscheidend
        bleibt, dass Interessenten Leistungen, Einsatzgebiet und Kontaktmöglichkeit
        verstehen.
      </p>

      <h2>Einordnung</h2>
      <p>
        Das Beispiel zeigt eine Gestaltungsmöglichkeit von Website Signature. Es ist
        kein Nachweis für zusätzliche Aufträge oder höhere Umsätze. Ob ein solcher
        Umfang sinnvoll ist, wird am konkreten Vorhaben entschieden.
      </p>
      <p>
        <Link href={cta.href}>Website-Projekt besprechen</Link>
        {" — "}
        90 Minuten vor Ort.
      </p>
    </DocPage>
  );
}
