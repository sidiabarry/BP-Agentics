import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import {
  breadcrumbList,
  webPageNode,
} from "@/lib/json-ld";
import { site } from "@/lib/site";

export type Crumb = { name: string; path: string };

export function DocPage({
  crumbs,
  kicker,
  title,
  lead,
  children,
  related,
  extraJsonLd = [],
  reviewed,
}: {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  lead: string;
  children: React.ReactNode;
  related?: { href: string; label: string }[];
  extraJsonLd?: Record<string, unknown>[];
  reviewed?: string;
}) {
  const trail = [{ name: "Startseite", path: "/" }, ...crumbs];
  const path = crumbs[crumbs.length - 1]?.path ?? "/";

  return (
    <div className="bg-[#F3EFE6]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            webPageNode({
              path,
              name: title,
              description: lead,
            }),
            breadcrumbList(trail),
            ...extraJsonLd,
          ],
        }}
      />
      <nav
        aria-label="Brotkrumen"
        className="mx-auto max-w-3xl px-5 pt-8 text-sm text-[#5C5F66] md:px-8"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {index === trail.length - 1 ? (
                <span className="text-[#14161C]">{item.name}</span>
              ) : (
                <Link href={item.path} className="underline-offset-4 hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <article
        id="inhalt"
        className="mx-auto max-w-3xl px-5 pt-6 pb-20 md:px-8"
      >
        <div className="doc-prose">
          {kicker ? (
            <p className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">{kicker}</p>
          ) : null}
          <h1 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-[-0.03em] md:text-5xl">
            {title}
          </h1>
          <p className="lead mt-5 text-[1.18rem] leading-relaxed text-[#3A3D45]">{lead}</p>
          {reviewed ? (
            <p className="mt-3 text-sm text-[#5C5F66]">
              Zuletzt geprüft:{" "}
              <time dateTime={reviewed}>
                {new Date(`${reviewed}T12:00:00`).toLocaleDateString("de-DE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          ) : null}
          {children}
          {related && related.length > 0 ? (
            <section className="mt-16 border-t border-black/10 pt-10" aria-labelledby="verwandt">
              <h2 id="verwandt" className="text-2xl font-semibold tracking-[-0.03em]">
                Weiterlesen auf dieser Website
              </h2>
              <ul className="mt-4 space-y-2">
                {related.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[#198BE8] underline-offset-4 hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <section
          className="mt-14 grid gap-5 rounded-3xl border border-black/10 bg-white p-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-stretch md:gap-6 md:p-7"
          aria-labelledby="doc-naechster-schritt"
        >
          <div className="flex min-w-0 flex-col">
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Nächster Schritt
            </p>
            <h2
              id="doc-naechster-schritt"
              className="mt-2 text-[1.35rem] leading-snug font-semibold tracking-[-0.03em] md:text-[1.5rem]"
            >
              Wollen Sie das für Ihren Betrieb prüfen?
            </h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
              Sidia Jerome Barry kommt nach {site.addressLocality} und in die
              Nachbarstädte in Nordrhein-Westfalen.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:mt-auto sm:flex-row sm:pt-6">
              <Button
                asChild
                className="h-12 rounded-full bg-[#198BE8] px-6 text-white hover:bg-[#1576C4]"
              >
                <Link href="/termin">Erstgespräch vereinbaren</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-black/15 bg-transparent px-6 text-[#14161C] hover:bg-[#F3EFE6]"
              >
                <Link href="/">Zur Startseite</Link>
              </Button>
            </div>
          </div>
          <ul className="grid h-full gap-3 sm:grid-cols-3 md:grid-cols-1 md:grid-rows-3">
            <li className="flex items-center rounded-2xl bg-[#F3EFE6] px-4 py-3 text-[1.02rem] leading-snug text-[#14161C]">
              90 Minuten im Betrieb
            </li>
            <li className="flex items-center rounded-2xl bg-[#F3EFE6] px-4 py-3 text-[1.02rem] leading-snug text-[#14161C]">
              Kostenlos, ohne Folie
            </li>
            <li className="flex items-center rounded-2xl bg-[#F3EFE6] px-4 py-3 text-[1.02rem] leading-snug text-[#14161C]">
              Danach liegt der Plan da
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

export function DataTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-8 overflow-x-auto rounded-[1.4rem] bg-white p-4 md:p-6">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[1.02rem]">
        <caption className="mb-3 text-left text-sm tracking-[0.14em] text-[#198BE8] uppercase">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-black/10">
            {headers.map((header) => (
              <th key={header} scope="col" className="py-2 pr-4 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")} className="border-b border-black/5 align-top">
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={cell} scope="row" className="py-3 pr-4 font-medium">
                    {cell}
                  </th>
                ) : (
                  <td key={`${row[0]}-${cell}`} className="py-3 pr-4 text-[#3A3D45]">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

