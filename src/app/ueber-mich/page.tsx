import type { Metadata } from "next";
import Link from "next/link";
import { Process } from "@/components/process";
import { StageCard, StageGrid } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { napLine, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Sidia Jerome Barry – Ihr Ansprechpartner bei BP Agentics",
  description:
    "Ich entwickle Websites und digitale Abläufe für Betriebe in Nordrhein-Westfalen. Sitz: Hagen.",
  path: "/ueber-mich",
});

export default function UeberMichPage() {
  return (
    <StagePage
      tone="ink"
      kicker="Über mich"
      title="Sidia Jerome Barry. Ein Ansprechpartner."
      lead="Ich entwickle Websites und digitale Abläufe für Betriebe in Nordrhein-Westfalen. Ausgangspunkt ist Ihr Arbeitsalltag — nicht eine Agenturkulisse."
      crumbs={[{ name: "Über mich", path: "/ueber-mich" }]}
      related={[
        { href: "/passt-das", label: "Welcher Einstieg passt?" },
        { href: "/leistungen", label: "Leistungen" },
        { href: "/referenzen", label: "Arbeiten und Demos" },
        { href: "/kontakt", label: "Kontakt" },
      ]}
      next={{
        title: "Direkt mit mir sprechen",
        body: "Im Erstgespräch lernen wir das Vorhaben kennen. Danach erhalten Sie ein Angebot mit nachvollziehbarem Umfang und Preis.",
        chips: ["90 Minuten vor Ort", "Ein Ansprechpartner", "Sitz Hagen"],
        primary: { href: cta.href, label: cta.primary },
        secondary: { href: "/kontakt", label: "Kontakt aufnehmen" },
      }}
      visual={
        <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6">
          <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">Sitz</p>
          <p className="mt-3 text-2xl font-semibold">{site.addressLocality}</p>
          <p className="mt-2 text-[1.05rem] leading-relaxed text-white/70">{napLine}</p>
          <p className="mt-5">
            <a href={`tel:${site.phoneTel}`} className="text-[#9FD0F8] underline-offset-4 hover:underline">
              {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-2">
            <a href={`mailto:${site.email}`} className="text-[#9FD0F8] underline-offset-4 hover:underline">
              {site.email}
            </a>
          </p>
        </div>
      }
      appendix={<Process />}
    >
      <StageGrid cols={2}>
        <StageCard kicker="Zusammenarbeit" title="Sie sprechen mit mir.">
          <p>
            Während der Umsetzung sprechen Sie direkt mit mir über die vereinbarten
            Schritte. Welche Leistungen online verständlich werden sollen, welche
            Informationen das Team braucht und welcher wiederkehrende Schritt
            leichter werden kann — das klären wir am konkreten Alltag.
          </p>
        </StageCard>
        <StageCard kicker="Arbeiten und Demos" title="Zwei Wege, die man sehen kann.">
          <p>
            <Link href="/referenzen/feinkost-kreta" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Projekt Feinkost Kreta
            </Link>
            {" · "}
            <Link href="/referenzen/dachdecker-signature" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Website-Demo Dachdecker
            </Link>
          </p>
          <p className="mt-3">
            Beschreibungen erklären, was zu sehen ist. Keine behaupteten
            Umsatzzahlen.
          </p>
        </StageCard>
      </StageGrid>
    </StagePage>
  );
}
