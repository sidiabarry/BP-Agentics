import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateCase } from "@/components/affiliate/affiliate-case";
import { AffiliateCta } from "@/components/affiliate/affiliate-cta";
import { AffiliateHero } from "@/components/affiliate/affiliate-hero";
import { AffiliatePay } from "@/components/affiliate/affiliate-pay";
import { AffiliateRollup } from "@/components/affiliate/affiliate-rollup";
import { JsonLd } from "@/components/json-ld";
import { PageFaqs } from "@/components/page-faqs";
import {
  affiliateFaqs,
  affiliateHero,
  affiliatePath,
} from "@/lib/affiliate";
import { breadcrumbList, faqPage, serviceOffer, webPageNode } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import "@/styles/affiliate.css";

export const metadata: Metadata = pageMetadata({
  title: "Affiliate-Programme mit ADCELL für Merchants",
  description: affiliateHero.lead,
  path: affiliatePath,
});

const crumbs = [
  { name: "Startseite", path: "/" },
  { name: "Leistungen", path: "/leistungen" },
  { name: "Affiliate-Programme", path: affiliatePath },
];

const related = [
  { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
  { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
  { href: "/leistungen/ablaeufe", label: "Büroabläufe ansehen" },
  { href: "/preise", label: "Preise" },
];

export default function AffiliatePage() {
  return (
    <main id="inhalt" className="affiliate-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            webPageNode({
              path: affiliatePath,
              name: affiliateHero.title,
              description: affiliateHero.lead,
            }),
            breadcrumbList(crumbs),
            serviceOffer({
              name: "Affiliate-Programme",
              description: affiliateHero.lead,
              path: affiliatePath,
            }),
            faqPage([...affiliateFaqs]),
          ],
        }}
      />

      <div className="affiliate-top">
        <AffiliateHero />
        <section className="affiliate-note">
          <p>
            Dieses Angebot richtet sich an Merchants, die ein Partnerprogramm auf ADCELL
            aufsetzen. Es ist getrennt von den Handwerksleistungen: eine Website, der
            Nachrichten-Assistent und Büroabläufe beantworten andere Aufgaben und bleiben
            einzeln beauftragbar.
          </p>
          <p>
            <Link href="/leistungen">Leistungen im Überblick</Link>
          </p>
        </section>
      </div>
      <div className="affiliate-chapter">
        <AffiliateRollup />
        <AffiliateCase />
      </div>
      <AffiliatePay />

      <div className="affiliate-page__column">
        <PageFaqs items={[...affiliateFaqs]} />
        <nav aria-label="Weiterlesen" className="affiliate-related">
          <p>Weiterlesen</p>
          <ul>
            {related.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="affiliate-dock">
        <AffiliateCta />
      </div>
    </main>
  );
}
