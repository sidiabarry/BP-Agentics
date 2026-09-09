import type { Metadata } from "next";
import Image from "next/image";
import { PhoneDemo } from "@/components/demo-player";
import { StageCard, StageGrid } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { videoObject } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Kundenprojekt Feinkost Kreta — Bestellweg digitalisiert",
  description:
    "Kundenprojekt von BP Agentics: eine Bestell-App für Feinkost Kreta. Angemeldete Kunden bestellen in wenigen Schritten. Der Laden sieht die Bestellung.",
  path: "/referenzen/feinkost-kreta",
});

const stills = [
  {
    src: "/demos/feinkost-still-anmeldung.jpg",
    alt: "Bestellweg mit bereits bestätigter Lieferadresse in der App von Feinkost Kreta",
    caption: "Anmeldung — Adresse und Angaben bleiben.",
  },
  {
    src: "/demos/feinkost-still-bestellung.jpg",
    alt: "Warenkorb mit Olivenpaste in der App von Feinkost Kreta",
    caption: "Bestellung — wenige Schritte bis zur Kasse.",
  },
  {
    src: "/demos/feinkost-still-betrieb.jpg",
    alt: "Zahlungsabschluss in der App von Feinkost Kreta",
    caption: "Hinweis an den Betrieb — die Bestellung ist erfasst.",
  },
] as const;

export default function FeinkostPage() {
  return (
    <StagePage
      kicker="Kundenprojekt · Feinkost Kreta"
      title="Bestellen, ohne jedes Mal von vorn anzufangen."
      lead="Kundenprojekt für Feinkost Kreta: Stammkunden bestellen angemeldet in wenigen Schritten — der Laden sieht die Bestellung sofort."
      crumbs={[
        { name: "Arbeiten und Demos", path: "/referenzen" },
        { name: "Feinkost Kreta", path: "/referenzen/feinkost-kreta" },
      ]}
      extraJsonLd={[
        videoObject({
          name: "Bestellweg Feinkost Kreta",
          description:
            "Angemeldet bestellen: Angaben bleiben, wenige Schritte, der Laden sieht die Bestellung.",
          thumbnailUrl: "/demos/feinkost-poster.jpg",
          contentUrl: "/demos/feinkost-loop.mp4",
          duration: "PT12S",
          uploadDate: "2026-08-15",
        }),
      ]}
      related={[
        { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
        { href: "/referenzen/dachdecker-signature", label: "Website-Demo ansehen" },
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
      ]}
      next={{
        title: "Ähnlichen Bestellweg besprechen",
        body: "Im Gespräch klären wir, ob ein vergleichbarer Weg zu Ihrem Betrieb passt — welche Angaben bleiben sollen und wer die Bestellung sieht.",
        primary: { href: cta.href, label: "Ähnlichen Bestellweg besprechen" },
        secondary: { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
      }}
      visual={
        <div className="flex justify-center rounded-[2rem] bg-[#14161C] px-6 py-8">
          <PhoneDemo
            src="/demos/feinkost-loop.mp4"
            poster="/demos/feinkost-poster.jpg"
            fullSrc="/demos/feinkost-full.mp4"
            posterAlt="Smartphone-Ansicht der Bestell-App von Feinkost Kreta"
            caption="Angemeldet bestellen in der App von Feinkost Kreta."
            width={300}
          />
        </div>
      }
    >
      <StageGrid>
        <StageCard kicker="Kundenprojekt" title="Entwickelt von BP Agentics.">
          <p>
            Die Bestell-App für Feinkost Kreta ist ein Kundenprojekt von
            BP Agentics. Die App ist eine Auftragsarbeit, nicht das Kerngeschäft.
          </p>
        </StageCard>
        <StageCard kicker="Auftrag" title="Bestellweg für Stammkunden digitalisieren.">
          <p>
            Feinkost Kreta wollte Stammkunden einen schnelleren Bestellweg per
            Smartphone bieten. Dazu gehörte eine automatische Erinnerung, wenn
            Olivenöl zur Neige gehen könnte.
          </p>
        </StageCard>
        <StageCard kicker="Ausgangslage" title="Jede Bestellung begann von vorn.">
          <p>
            Auf der bisherigen Website mussten Kunden bei jeder Bestellung
            Adresse und Angaben erneut eintragen. Es gab keine Anmeldung und
            keine Möglichkeit, an vergangene Bestellungen anzuknüpfen.
          </p>
        </StageCard>
        <StageCard kicker="Lösung" title="Anmeldung, gespeicherte Angaben, Benachrichtigung.">
          <p>
            Eine Bestell-App mit Anmeldung: Angaben bleiben gespeichert,
            die Bestellung erreicht den Betrieb direkt. Für Olivenöl gibt es eine
            automatische Erinnerung nach etwa sechs Monaten.
          </p>
        </StageCard>
        <StageCard kicker="Ergebnis" title="Wenige Klicks, Bestellung kommt an.">
          <p>
            Angemeldete Kunden bestellen in wenigen Schritten. Der Betrieb wird
            benachrichtigt. Die Erinnerung läuft derzeit für Olivenöl — als
            konkretes Beispiel, nicht als Regel für das ganze Sortiment.
          </p>
        </StageCard>
      </StageGrid>

      <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-3">
        {stills.map((still) => (
          <li key={still.src} className="min-w-0">
            <figure className="overflow-hidden rounded-[1.4rem] bg-white">
              <Image
                src={still.src}
                alt={still.alt}
                width={354}
                height={536}
                className="h-auto w-full"
              />
              <figcaption className="px-4 py-3 text-[0.98rem] leading-snug text-[#3A3D45]">
                {still.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </StagePage>
  );
}
