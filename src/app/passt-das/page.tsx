import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Process } from "@/components/process";
import { SchnellCheck } from "@/components/schnell-check";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Orientierung: passt das Angebot zu Ihrem Betrieb",
  description:
    "Kurze Orientierung, ob Website, Nachrichten-Assistent oder Automatisierung zu Ihrem Betrieb passt. Den genauen Umfang klären wir im Gespräch.",
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
      <section className="max-w-[44rem] space-y-4 text-[1.05rem] leading-relaxed text-[#3A3D45]" aria-labelledby="richtungen">
        <h2 id="richtungen" className="text-2xl font-semibold tracking-[-0.03em] text-[#14161C] md:text-3xl">
          Drei Richtungen, einzeln beauftragbar
        </h2>
        <p>
          Die Orientierung hier ersetzt kein Angebot. Sie sortiert nur, welche Frage
          Sie gerade haben. Eine Website zeigt Leistungen, Referenzen und das
          Einsatzgebiet und macht den Weg zur Anfrage klar. Der Nachrichten-Assistent
          beantwortet Textnachrichten per WhatsApp und E-Mail, fragt vereinbarte
          Angaben ab und bietet Termine aus dem angebundenen Kalender an. Büroabläufe
          führen Informationen zusammen, die heute an mehreren Stellen liegen, zum
          Beispiel einen digitalen Lieferschein oder die Übergabe von der Baustelle
          ins Büro.
        </p>
        <p>
          Die drei Bausteine setzen einander nicht voraus. Wer schon eine Website hat
          und vor allem Nachrichten sortieren will, braucht keine neue Seite. Wer
          Unterlagen im Büro doppelt erfasst, startet bei den Abläufen und nicht beim
          Auftritt. Was fachlich entschieden wird, bleibt im Betrieb: Dringlichkeit,
          Freigaben und die Auskunft gegenüber Kundinnen und Kunden.
        </p>
        <ul className="grid list-none gap-3 p-0">
          <li className="rounded-[1.2rem] bg-white p-4">
            <p className="font-semibold text-[#14161C]">Leistungen online zeigen</p>
            <p className="mt-1">
              Passt, wenn Interessenten nicht erkennen, welche Arbeiten Sie übernehmen
              und wie sie anfragen. Die Stufe hängt von den vorhandenen Inhalten ab.
            </p>
            <p className="mt-2">
              <Link href="/leistungen/auftritt" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
                Website-Pakete ansehen
              </Link>
            </p>
          </li>
          <li className="rounded-[1.2rem] bg-white p-4">
            <p className="font-semibold text-[#14161C]">WhatsApp- und E-Mail-Anfragen vorbereiten</p>
            <p className="mt-1">
              Passt, wenn sich Fragen oder Terminabstimmungen wiederholen, während das
              Team unterwegs ist. Telefonannahme ist nicht enthalten.
            </p>
            <p className="mt-2">
              <Link href="/leistungen/annahme" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
                Nachrichten-Assistent ansehen
              </Link>
            </p>
          </li>
          <li className="rounded-[1.2rem] bg-white p-4">
            <p className="font-semibold text-[#14161C]">Wiederkehrende Büroarbeit verbinden</p>
            <p className="mt-1">
              Passt, wenn Angaben mobil entstehen und im Büro noch einmal erfasst
              werden. Vorhandene Programme bleiben, soweit sie zuverlässig arbeiten.
            </p>
            <p className="mt-2">
              <Link href="/leistungen/ablaeufe" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
                Büroabläufe ansehen
              </Link>
            </p>
          </li>
        </ul>
        <p>
          Der Check darunter wählt eine dieser Richtungen. Das Ergebnis ist eine
          erste Einordnung, keine Wirtschaftlichkeitsprüfung und kein festgelegtes
          Paket. Den verbindlichen Umfang, den Zeitrahmen und den Festpreis halten
          wir im Projektplan fest. Das Gespräch dauert 90 Minuten, findet bei Ihnen
          vor Ort statt und ist kostenlos. Sie senden einen Terminwunsch, die
          Bestätigung kommt persönlich.
        </p>
        <p>
          <Link href="/termin" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
            Kostenloses Erstgespräch anfragen
          </Link>
          {" · "}
          <Link href="/leistungen" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
            Leistungen im Überblick
          </Link>
        </p>
      </section>
      <div className="mt-12">
        <SchnellCheck embedded />
      </div>
    </StagePage>
  );
}
