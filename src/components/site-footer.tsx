import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { industryList } from "@/lib/content";
import { napLine, site } from "@/lib/site";
import { WhatsAppInline } from "@/components/whatsapp-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#14161C] text-[#F3EFE6]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        <div>
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">Leistungen</p>
          <ul className="mt-3 space-y-2 text-white/85">
            <li>
              <Link href="/leistungen/auftritt" className="hover:text-white">
                Auftritt
              </Link>
            </li>
            <li>
              <Link href="/leistungen/annahme" className="hover:text-white">
                Annahme
              </Link>
            </li>
            <li>
              <Link href="/leistungen/ablaeufe" className="hover:text-white">
                Abläufe
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">Referenzen</p>
          <ul className="mt-3 space-y-2 text-white/85">
            <li>
              <Link href="/referenzen/feinkost-kreta" className="hover:text-white">
                Feinkost Kreta
              </Link>
            </li>
            <li>
              <Link href="/referenzen/dachdecker-signature" className="hover:text-white">
                Dachdecker Signature
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">Info</p>
          <ul className="mt-3 space-y-2 text-white/85">
            <li>
              <Link href="/preise" className="hover:text-white">
                Preise
              </Link>
            </li>
            <li>
              <Link href="/foerderung/mid-digitale-prozesse" className="hover:text-white">
                Förderung
              </Link>
            </li>
            <li>
              <Link href="/passt-das" className="hover:text-white">
                Passt das zu mir?
              </Link>
            </li>
            <li>
              <Link href="/ueber-mich" className="hover:text-white">
                Über mich
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-white">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/impressum" className="hover:text-white">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-white">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Wordmark invert />
          <p className="mt-5 text-[1.02rem] leading-relaxed text-white/85">
            {site.name}
            <br />
            {site.streetAddress}
            <br />
            {site.postalCode} {site.addressLocality}
            <br />
            <a className="hover:text-white" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-3">
            <WhatsAppInline variant="quiet" className="text-[#25D366] hover:text-white">
              WhatsApp
            </WhatsAppInline>
          </p>
          <p className="mt-3 text-sm text-white/50">{napLine}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-sm text-white/45 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:justify-between">
          <span>Alle Preise sind Endpreise.</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            {industryList.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} className="hover:text-white">
                {item.title}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
