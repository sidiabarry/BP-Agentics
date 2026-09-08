import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Process } from "@/components/process";
import { SchnellCheck } from "@/components/schnell-check";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Welcher Einstieg passt zu Ihrem Vorhaben?",
  description:
    "Eine Angabe hilft bei der Orientierung: Was soll leichter werden? Der genaue Umfang wird im Gespräch geklärt.",
  path: "/passt-das",
});

export default function PasstDasPage() {
  return (
    <>
      <DocPage
        kicker="Orientierung"
        title="Welcher Einstieg passt zu Ihrem Vorhaben?"
        lead="Was soll leichter werden? Sie erhalten eine erste Richtung. Der genaue Umfang wird im Gespräch geklärt."
        crumbs={[{ name: "Welcher Einstieg passt?", path: "/passt-das" }]}
        related={[
          { href: "/leistungen", label: "Leistungen" },
          { href: "/preise", label: "Preise" },
          { href: "/ueber-mich", label: "Über mich" },
          { href: "/termin", label: "Erstgespräch anfragen" },
        ]}
      >
        <h2>Was soll leichter werden?</h2>
        <ul>
          <li>Leistungen und Referenzen online zeigen</li>
          <li>WhatsApp- und E-Mail-Anfragen und Termine vorbereiten</li>
          <li>Wiederkehrende Büroabläufe verbinden</li>
        </ul>
        <p>
          Die passende Leistung richtet sich nach Ihrem Vorhaben, nicht nach der
          Teamgröße. Die Richtung unten ist eine Orientierung, keine
          Wirtschaftlichkeitsprüfung. Den verbindlichen Umfang halten wir im Angebot
          fest.{" "}
          <Link href={cta.href}>{cta.primary}</Link>
        </p>
      </DocPage>
      <SchnellCheck />
      <Process />
    </>
  );
}
