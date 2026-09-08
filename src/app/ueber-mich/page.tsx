import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { napLine, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { steps } from "@/lib/content";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Sidia Jerome Barry – Ihr Ansprechpartner bei BP Agentics",
  description:
    "Ich entwickle Websites und digitale Abläufe für Betriebe in Nordrhein-Westfalen. Sitz: Hagen.",
  path: "/ueber-mich",
});

export default function UeberMichPage() {
  return (
    <DocPage
      kicker="Über mich"
      title="Sidia Jerome Barry – Ihr Ansprechpartner bei BP Agentics"
      lead="Ich entwickle Websites und digitale Abläufe für Betriebe in Nordrhein-Westfalen. Mein Ausgangspunkt ist Ihr Arbeitsalltag: Welche Leistungen sollen online verständlich werden? Welche Informationen braucht das Team? Welcher wiederkehrende Schritt lässt sich vereinfachen?"
      crumbs={[{ name: "Über mich", path: "/ueber-mich" }]}
      related={[
        { href: "/passt-das", label: "Welcher Einstieg passt?" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/referenzen", label: "Arbeiten und Demos" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
    >
      <h2>Zusammenarbeit</h2>
      <p>
        Im Erstgespräch lernen wir das Vorhaben kennen. Danach erhalten Sie ein
        Angebot mit nachvollziehbarem Umfang und Preis. Während der Umsetzung
        sprechen Sie direkt mit mir über die vereinbarten Schritte.
      </p>
      <ol>
        {steps.map((step) => (
          <li key={step.n}>
            <strong>{step.title}.</strong> {step.body}
          </li>
        ))}
      </ol>
      <p>
        Sitz: {napLine}. Telefon{" "}
        <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>, E-Mail{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Arbeiten und Demos</h2>
      <p>
        <Link href="/referenzen/feinkost-kreta">Bestell-App Feinkost Kreta</Link>
        {" · "}
        <Link href="/referenzen/dachdecker-signature">Website-Demo Dachdecker</Link>
      </p>
      <p>
        <Link href={cta.href}>{cta.primary}</Link>
      </p>
    </DocPage>
  );
}
