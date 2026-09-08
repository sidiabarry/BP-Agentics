import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Process } from "@/components/process";
import { SchnellCheck } from "@/components/schnell-check";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Welcher Einstieg passt zu Ihrem Betrieb?",
  description:
    "Zwei Angaben helfen bei der Orientierung: Was soll leichter werden, und wie groß ist das Team? Der genaue Umfang wird im Gespräch geklärt.",
  path: "/passt-das",
});

export default function PasstDasPage() {
  return (
    <>
      <DocPage
        kicker="Orientierung"
        title="Welcher Einstieg passt zu Ihrem Betrieb?"
        lead="Zwei Angaben helfen bei der Orientierung. Sie erhalten eine erste Richtung für Ihr Vorhaben. Der genaue Umfang wird im Gespräch geklärt."
        crumbs={[{ name: "Welcher Einstieg passt?", path: "/passt-das" }]}
        related={[
          { href: "/leistungen", label: "Leistungen" },
          { href: "/preise", label: "Preise" },
          { href: "/ueber-mich", label: "Über mich" },
          { href: "/termin", label: "Erstgespräch anfragen" },
        ]}
      >
        <h2>Frage 1: Was soll leichter werden?</h2>
        <ul>
          <li>Leistungen und Referenzen online zeigen</li>
          <li>WhatsApp-Anfragen und Termine vorbereiten</li>
          <li>Wiederkehrende Büroabläufe verbinden</li>
        </ul>

        <h2>Frage 2: Wie groß ist Ihr Team?</h2>
        <ul>
          <li>1–4 Mitarbeitende</li>
          <li>5–20 Mitarbeitende</li>
          <li>Mehr als 20 Mitarbeitende</li>
        </ul>
        <p>
          Keine Auswahl wird als Defizit bewertet. Die Größe darf die Erklärung
          anpassen, legt aber nicht automatisch das teuerste Paket fest. Aus „5–20
          Mitarbeitende“ folgt weder Signature noch eine garantierte Eignung.
        </p>
        <p>
          Die Richtung unten ist eine Orientierung, keine Wirtschaftlichkeitsprüfung.
          Den verbindlichen Umfang halten wir im Angebot fest.{" "}
          <Link href={cta.href}>{cta.primary}</Link>
        </p>
      </DocPage>
      <SchnellCheck />
      <Process />
    </>
  );
}
