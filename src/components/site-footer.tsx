import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { industryList } from "@/lib/content";
import { napLine, site } from "@/lib/site";
import { WhatsAppInline } from "@/components/whatsapp-button";

const leistungen = [
  { href: "/leistungen", label: "Leistungen im Überblick" },
  { href: "/leistungen/website", label: "Website für Betriebe" },
  { href: "/leistungen/ki-setter", label: "KI-Setter" },
  { href: "/leistungen/ablaeufe", label: "Interne Abläufe" },
];

const hub = [
  { href: "/preise", label: "Preise" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/referenzen/feinkost-kreta", label: "Feinkost Kreta" },
  { href: "/referenzen/dachdecker-signature", label: "Dachdecker Signature" },
  { href: "/foerderung/mid-digitale-prozesse", label: "MID Digitale Prozesse" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/termin", label: "90-Minuten-Gespräch" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#14161C] text-[#F3EFE6]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <Wordmark invert />
          <p className="mt-5 max-w-sm text-[1.05rem] leading-relaxed text-white/75">
            Websites, KI-Annahme und interne Abläufe für Betriebe in
            Nordrhein-Westfalen. Entwickelt in Hagen. Daten in der EU.
          </p>
          <p className="mt-5 text-[1.02rem] text-white/85">{napLine}</p>
          <p className="mt-2">
            <a className="hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-3">
            <WhatsAppInline variant="quiet" className="text-[#25D366] hover:text-white">
              Per WhatsApp an {site.phoneDisplay} schreiben
            </WhatsAppInline>
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">Leistungen</p>
          <ul className="mt-3 space-y-2 text-white/85">
            {leistungen.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">Hub</p>
          <ul className="mt-3 space-y-2 text-white/85">
            {hub.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">Gewerke</p>
          <ul className="mt-3 space-y-2 text-white/85">
            {industryList.map((item) => (
              <li key={item.slug}>
                <Link href={`/${item.slug}`} className="hover:text-white">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-sm text-white/45 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:justify-between">
          <span>Alle Preise sind Endpreise.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/impressum" className="hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
            <span>© {new Date().getFullYear()} {site.name}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
