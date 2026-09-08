import type { Metadata } from "next";
import Link from "next/link";
import { PhoneDemo } from "@/components/demo-player";
import { DocPage } from "@/components/doc-page";
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
    <DocPage
      kicker="Projektbeispiel · Produktdemo"
      title="Feinkost Kreta: eine Bestell-App im Beispiel"
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
        { href: "/leistungen/annahme", label: "WhatsApp-Assistent ansehen" },
      ]}
    >
      <div className="mt-10 rounded-[2rem] bg-[#14161C] px-6 py-10 md:px-10">
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

      <h2>Was zu sehen ist</h2>
      <p>
        Bestellung und Benachrichtigung in einem zusammenhängenden Weg. Weitere
        Funktionen wie Bestand nur konkret aufführen, wenn die bereitgestellte Demo
        oder das tatsächliche Projekt sie belegt.
      </p>

      <h2>Übertragbarkeit</h2>
      <p>
        In anderen Betrieben kann ein ähnliches Prinzip beispielsweise Lieferscheine
        oder Auftragsinformationen verbinden. Welche Angaben, Freigaben und
        Programme dazugehören, unterscheidet sich je nach Aufgabe.
      </p>
      <p>
        <Link href={cta.href}>Ähnlichen Ablauf besprechen</Link>
      </p>
    </DocPage>
  );
}
