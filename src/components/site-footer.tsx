import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { industryList } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#14161C] text-[#F3EFE6]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Wordmark invert />
          <p className="mt-5 max-w-sm text-[1.05rem] leading-relaxed text-white/75">
            Websites und Systeme für Betriebe, die noch mit Telefon, Zetteln und
            Excel arbeiten. Entwickelt in Hagen. Daten in der EU.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">
            Gewerke
          </p>
          <ul className="mt-3 space-y-2 text-white/85">
            {industryList.slice(0, 6).map((item) => (
              <li key={item.slug}>
                <Link href={`/${item.slug}`} className="hover:text-white">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-sm tracking-[0.16em] text-white/50 uppercase">
            Kontakt
          </p>
          <p className="mt-3">
            <a className="hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-1 text-white/75">{site.city}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            <Link href="/impressum" className="hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
            <Link href="/termin" className="hover:text-white">
              Termin
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-sm text-white/45 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 sm:flex-row sm:justify-between">
          <span>Kleinunternehmer nach § 19 UStG. Endpreise ohne Umsatzsteuer.</span>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
