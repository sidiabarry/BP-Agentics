import type { Metadata } from "next";
import { AblaeufeStory, type StoryFocus } from "@/components/ablaeufe-story";
import { PageFaqs } from "@/components/page-faqs";
import { Proof } from "@/components/proof";
import { StagePage } from "@/components/stage-page";
import { ablaeufeFaqs } from "@/lib/content";
import { faqPage, serviceOffer } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { PRICE_NOTE, automationOffer, cta } from "@/lib/offers";

export const metadata: Metadata = pageMetadata({
  title: "Büroabläufe und Automatisierung für Handwerk",
  description:
    "Sie erfassen Termin, Notiz oder Stand einmal, und das Büro arbeitet mit derselben Angabe weiter. Datenbasis und ein Prozessmodul zusammen ab 2.490 €, ohne monatliche Betreuung.",
  path: "/leistungen/ablaeufe",
});

export default async function AblaeufePage({
  searchParams,
}: {
  searchParams: Promise<{ entwurf?: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.entwurf) ? params.entwurf[0] : params.entwurf;
  const focus: StoryFocus = raw === "a" || raw === "b" || raw === "c" || raw === "alle" ? raw : "alle";

  return (
    <StagePage
      kicker="Büroabläufe"
      title="Einmal erfassen. Im Büro und unterwegs weitergeben."
      lead="Sie erfassen Termin, Notiz oder Stand einmal, und das Büro arbeitet mit derselben Angabe weiter, ohne sie ein zweites Mal zu tippen."
      crumbs={[
        { name: "Leistungen", path: "/leistungen" },
        { name: "Büroabläufe", path: "/leistungen/ablaeufe" },
      ]}
      extraJsonLd={[
        serviceOffer({
          name: "Büroabläufe automatisieren",
          description:
            "Gemeinsame Datenbasis und Prozessmodule für wiederkehrende Büroabläufe.",
          path: "/leistungen/ablaeufe",
          offers: [{ name: "Datenbasis + 1 Prozessmodul", price: "2490" }],
        }),
        faqPage(ablaeufeFaqs),
      ]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
        { href: "/leistungen/affiliate", label: "Affiliate-Programme" },
        { href: "/referenzen/feinkost-kreta", label: "Projekt Feinkost Kreta" },
        { href: "/preise", label: "Preise" },
      ]}
      next={{
        title: "Ersten Ablauf besprechen",
        body: "Im Gespräch prüfen wir, welche Programme schon zuverlässig arbeiten und welcher Schritt den passenden Anfang macht. 90 Minuten vor Ort.",
        chips: ["Datenbasis + 1 Modul", "Ohne monatliche Betreuung", "Weitere Abläufe im Angebot"],
        primary: { href: cta.href, label: "Ersten Ablauf besprechen" },
        secondary: { href: "/referenzen/feinkost-kreta", label: "Projekt Feinkost Kreta" },
      }}
      appendix={<Proof />}
    >
      <AblaeufeStory price={automationOffer.combined} note={PRICE_NOTE} focus={focus}>
        <PageFaqs items={ablaeufeFaqs} calm />
      </AblaeufeStory>
    </StagePage>
  );
}
