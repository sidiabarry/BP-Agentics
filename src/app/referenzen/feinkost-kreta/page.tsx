import type { Metadata } from "next";
import Link from "next/link";
import { PhoneDemo } from "@/components/demo-player";
import { StageCard, StageGrid } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { videoObject } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Feinkost Kreta: eine Bestell-App im Beispiel",
  description:
    "Produktdemo: Bestellung erfassen und den Betrieb benachrichtigen. Kein Nachweis für Umsatzwirkung.",
  path: "/referenzen/feinkost-kreta",
});

export default function FeinkostPage() {
  return (
    <StagePage
      kicker="Projektbeispiel · Produktdemo"
      title="Bestellung rein. Betrieb weiß Bescheid."
      lead="Die Produktdemo zeigt, wie eine Bestellung erfasst und der Betrieb benachrichtigt wird. Sie macht den Ablauf auf dem Smartphone sichtbar."
      crumbs={[
        { name: "Arbeiten und Demos", path: "/referenzen" },
        { name: "Feinkost Kreta", path: "/referenzen/feinkost-kreta" },
      ]}
      extraJsonLd={[
        videoObject({
          name: "Bestell-App Feinkost Kreta, Produktdemo",
          description:
            "Produktdemo: Bestellung und Benachrichtigung in einem zusammenhängenden Weg.",
          thumbnailUrl: "/demos/feinkost-poster.jpg",
          contentUrl: "/demos/feinkost-loop.mp4",
          duration: "PT29S",
          uploadDate: "2026-08-15",
        }),
      ]}
      related={[
        { href: "/leistungen/ablaeufe", label: "Automatisierung ansehen" },
        { href: "/referenzen/dachdecker-signature", label: "Website-Demo ansehen" },
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
      ]}
      next={{
        title: "Ähnlichen Ablauf besprechen",
        body: "In anderen Betrieben kann ein ähnliches Prinzip Lieferscheine oder Auftragsinformationen verbinden. Welche Angaben dazugehören, unterscheidet sich je nach Aufgabe.",
        primary: { href: cta.href, label: "Ähnlichen Ablauf besprechen" },
        secondary: { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
      }}
      visual={
        <div className="flex justify-center rounded-[2rem] bg-[#14161C] px-6 py-8">
          <PhoneDemo
            src="/demos/feinkost-loop.mp4"
            poster="/demos/feinkost-poster.jpg"
            fullSrc="/demos/feinkost-full.mp4"
            posterAlt="Smartphone-Ansicht der Bestell-App von Feinkost Kreta"
            caption="Bestellung und Benachrichtigung in der App von Feinkost Kreta."
            note="Produktdemo · kein Mitschnitt eines Kundengesprächs"
            width={300}
          />
        </div>
      }
    >
      <StageGrid cols={2}>
        <StageCard kicker="Was zu sehen ist" title="Ein Weg, zwei Seiten.">
          <p>
            Bestellung und Benachrichtigung in einem zusammenhängenden Weg. Weitere
            Funktionen wie Bestand nur konkret aufführen, wenn die bereitgestellte
            Demo oder das tatsächliche Projekt sie belegt.
          </p>
        </StageCard>
        <StageCard kicker="Übertragbarkeit" title="Dasselbe Prinzip, anderer Betrieb.">
          <p>
            In anderen Betrieben kann ein ähnliches Prinzip beispielsweise
            Lieferscheine oder Auftragsinformationen verbinden. Welche Angaben,
            Freigaben und Programme dazugehören, unterscheidet sich je nach Aufgabe.
          </p>
          <p className="mt-3">
            <Link href={cta.href} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Ähnlichen Ablauf besprechen
            </Link>
          </p>
        </StageCard>
      </StageGrid>
    </StagePage>
  );
}
