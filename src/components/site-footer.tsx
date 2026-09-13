import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { industryList } from "@/lib/content";
import { gewerkHref, labels, paths, stations } from "@/lib/journey";
import { site } from "@/lib/site";
import { PRICE_NOTE } from "@/lib/offers";
import { WhatsAppInline } from "@/components/whatsapp-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#14161C] text-[#F3EFE6]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        <div>
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">Leistungen</p>
          <ul className="mt-3 space-y-2 text-white/85">
            {stations.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">Arbeiten und Demos</p>
          <ul className="mt-3 space-y-2 text-white/85">
            <li>
              <Link href={paths.feinkost} className="hover:text-white">
                Feinkost Kreta
              </Link>
            </li>
            <li>
              <Link href={paths.dachdecker} className="hover:text-white">
                Dachdecker Signature
              </Link>
            </li>
            <li>
              <Link href={paths.werkstattAlias} className="hover:text-white">
                {labels.werkstattNav}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">Info</p>
          <ul className="mt-3 space-y-2 text-white/85">
            <li>
              <Link href={paths.preise} className="hover:text-white">
                {labels.preise}
              </Link>
            </li>
            <li>
              <Link href={paths.foerderung} className="hover:text-white">
                {labels.foerderung}
              </Link>
            </li>
            <li>
              <Link href={paths.passtDas} className="hover:text-white">
                {labels.passtDas}
              </Link>
            </li>
            <li>
              <Link href={paths.ueberMich} className="hover:text-white">
                {labels.ueberMich}
              </Link>
            </li>
            <li>
              <Link href={paths.kontakt} className="hover:text-white">
                {labels.kontakt}
              </Link>
            </li>
            <li>
              <Link href={paths.impressum} className="hover:text-white">
                {labels.impressum}
              </Link>
            </li>
            <li>
              <Link href={paths.datenschutz} className="hover:text-white">
                {labels.datenschutz}
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
          </p>
          <p className="mt-3 text-[1.02rem] text-white/85">
            <a className="hover:text-white" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-1 text-[1.02rem] text-white/85">
            <a className="hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-3">
            <WhatsAppInline variant="quiet" className="text-[#25D366] hover:text-white">
              Per WhatsApp schreiben
            </WhatsAppInline>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-sm text-white/45 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:justify-between">
          <span>{PRICE_NOTE}</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href={paths.gewerke} className="hover:text-white">
              {labels.gewerke}
            </Link>
            {industryList.map((item) => (
              <Link key={item.slug} href={gewerkHref(item.slug)} scroll={false} className="hover:text-white">
                {item.title}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
