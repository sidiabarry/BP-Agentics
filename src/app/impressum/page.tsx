import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <div className="bg-[#F3EFE6]">
      <SiteHeader tone="light" />
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-24 text-[1.08rem] leading-relaxed md:px-8">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Impressum</h1>
        <p className="mt-8">
          {site.name}
          <br />
          {site.owner}
          <br />
          {site.city}
        </p>
        <p className="mt-6">
          E-Mail:{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <p className="mt-6">
          Kleinunternehmer gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.
        </p>
        <p className="mt-6 text-[#5C5F66]">
          Die vollständige ladungsfähige Anschrift wird im Systemplan und in den
          Vertragsunterlagen geführt. Für eine unmittelbare Kontaktaufnahme reicht
          die E-Mail.
        </p>
      </main>
    </div>
  );
}
