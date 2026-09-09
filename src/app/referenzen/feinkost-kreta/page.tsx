import type { Metadata } from "next";
import Image from "next/image";
import { PhoneDemo } from "@/components/demo-player";
import { StageCard, StageGrid } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { videoObject } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Feinkost Kreta — Bestell-App entwickelt von BP Agentics",
  description:
    "Kundenprojekt von BP Agentics: eine Bestell-App für Feinkost Kreta in Hagen. Angemeldet bestellen, der Laden sieht die Bestellung.",
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
      kicker="Projekt · Feinkost Kreta"
      title="Bestellen, ohne jedes Mal von vorn anzufangen."
      lead="Wer angemeldet ist, bestellt in wenigen Schritten — und der Laden sieht die Bestellung."
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
            Die Bestell-App für Feinkost Kreta (auch im Google Play Store unter
            de.feinkostkreta.shop) ist ein Kundenprojekt von BP Agentics.
            BP Agentics ist eine Agentur für Website-Erstellung und
            Online-Marketing in Hagen — die App ist eine Auftragsarbeit, nicht
            das Kerngeschäft.
          </p>
        </StageCard>
        <StageCard kicker="Vorher" title="Seite auf, alles wieder eintragen.">
          <p>
            Der Inhaber wollte jüngere, technikaffine Kundschaft über das Handy
            erreichen. Auf der Website hieß neu bestellen: Seite aufmachen, alles
            wieder eintragen. Zusätzlich sollte jemand erinnert werden, wenn
            Olivenöl zur Neige gehen könnte.
          </p>
        </StageCard>
        <StageCard kicker="Eingerichtet" title="Anmelden, merken, bestellen.">
          <p>
            Eine Bestell-App: anmelden, Angaben merken, in wenigen Schritten
            bestellen, der Betrieb wird benachrichtigt. Für Olivenöl gibt es eine
            Erinnerung nach etwa sechs Monaten — als Beispiel, nicht als Regel
            für das ganze Sortiment.
          </p>
        </StageCard>
        <StageCard kicker="Heute" title="Wenige Klicks, Bestellung kommt an.">
          <p>
            Wer angemeldet ist, bestellt in wenigen Klicks. Der Betrieb bekommt
            die Bestellung. Die Erinnerung läuft derzeit für Olivenöl.
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
