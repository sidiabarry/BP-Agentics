import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { WhatsAppInline } from "@/components/whatsapp-button";
import { DemoLoop, PhoneDemo } from "@/components/demo-player";
import {
  PRICE_NOTE,
  automationOffer,
  cta,
  offerTable,
  websiteCare,
  websiteOwnership,
  websitePackages,
  yearTableHint,
} from "@/lib/offers";

const teaserRows = offerTable.map((item) => ({
  name: item.name,
  price: item.once,
  run: item.run,
}));

export function WebsiteCards({
  showDetailLink = true,
}: {
  showDetailLink?: boolean;
}) {
  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-3">
      {websitePackages.map((plan, index) => (
        <RevealIn
          key={plan.name}
          as="article"
          variant="card"
          delay={index * 60}
          className={
            plan.featured
              ? "flex h-full min-w-0 flex-col rounded-3xl bg-[#198BE8] p-5 text-white md:p-7"
              : "flex h-full min-w-0 flex-col rounded-3xl bg-white p-5 md:p-7"
          }
        >
          <p className={plan.featured ? "min-h-[1.25rem] text-sm text-white/80" : "min-h-[1.25rem] text-sm text-[#198BE8]"}>
            {"badge" in plan && plan.badge ? plan.badge : "\u00a0"}
          </p>
          <h3 className="mt-1 min-h-[3.2rem] text-xl leading-snug font-semibold">{plan.name}</h3>
          <RevealIn
            as="p"
            variant="price"
            delay={120 + index * 60}
            className="mt-2 text-3xl font-semibold whitespace-nowrap"
          >
            {plan.once}
          </RevealIn>
          <p className={plan.featured ? "mt-1 min-h-[2.8rem] text-white/80" : "mt-1 min-h-[2.8rem] text-[#5C5F66]"}>
            {plan.run} · {plan.year} mit 12 Monaten Betreuung
          </p>
          <p className={plan.featured ? "mt-4 flex-1 text-white/90" : "mt-4 flex-1 text-[#3A3D45]"}>
            {plan.body}
          </p>
          {showDetailLink ? (
            <p className="mt-5">
              <Link
                href="/leistungen/auftritt"
                className={
                  plan.featured
                    ? "text-white underline-offset-4 hover:underline"
                    : "text-[#198BE8] underline-offset-4 hover:underline"
                }
              >
                Website-Pakete ansehen
              </Link>
            </p>
          ) : null}
        </RevealIn>
      ))}
    </div>
  );
}

export function Pricing({
  teaser = false,
  embedded = false,
}: {
  teaser?: boolean;
  embedded?: boolean;
}) {
  if (teaser) {
    return (
      <section id="preise" className="bg-[#F3EFE6] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
            Preise
          </RevealIn>
          <RevealHeading className="mt-3 text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.03em] md:text-6xl">
            Was Einrichtung und laufende Betreuung kosten.
          </RevealHeading>
          <RevealIn as="p" variant="lead" className="mt-5 max-w-[42rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
            Einmalige Leistungen und monatliche Kosten sind getrennt ausgewiesen.
            Die Website-Betreuung ist optional. Der verbindliche Umfang und Preis
            stehen vor der Beauftragung im Angebot.
          </RevealIn>
          <ul className="mt-8 divide-y divide-black/10 overflow-hidden rounded-3xl bg-white">
            {teaserRows.map((item, index) => (
              <RevealIn
                key={item.name}
                as="li"
                variant="card"
                delay={index * 40}
                className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <p className="font-semibold tracking-[-0.02em]">{item.name}</p>
                <p className="whitespace-nowrap font-semibold">{item.price}</p>
                <p className="text-[#5C5F66] sm:text-right">{item.run}</p>
              </RevealIn>
            ))}
          </ul>
          <p className="mt-6 text-[1.08rem]">
            <Link href="/preise" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Preise mit 12-Monats-Rechnung ansehen
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="preise-detail"
      className={embedded ? "" : "bg-[#F3EFE6] px-5 py-24 md:px-8"}
    >
      <div className={embedded ? "" : "mx-auto max-w-6xl"}>
        <WebsiteCards />

        <RevealIn
          as="article"
          variant="card"
          className="mt-12 rounded-[2rem] bg-[#14161C] p-7 text-[#F3EFE6] md:p-10"
        >
          <p className="text-sm tracking-[0.2em] text-[#9FD0F8] uppercase">
            Automatisierung
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Gemeinsame Datenbasis und ein Modul
          </h3>
          <p className="mt-4 max-w-[40rem] text-[1.12rem] leading-relaxed text-white/80">
            Datenbasis und ein Prozessmodul kosten zusammen {automationOffer.combined}.
            Eine monatliche Betreuung ist in diesem Einstieg nicht enthalten.
          </p>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div>
              <p className="text-[1.08rem] leading-relaxed text-white/85">
                {yearTableHint}{" "}
                <Link href="/leistungen/ablaeufe" className="text-[#9FD0F8] underline-offset-4 hover:underline">
                  Automatisierung ansehen
                </Link>
                {" · "}
                <Link href="/leistungen/annahme" className="text-[#9FD0F8] underline-offset-4 hover:underline">
                  Nachrichten-Assistent ansehen
                </Link>
                .
              </p>
            </div>
            <PhoneDemo
              src="/demos/feinkost-loop.mp4"
              poster="/demos/feinkost-poster.jpg"
              fullSrc="/demos/feinkost-full.mp4"
              posterAlt="Smartphone-Ansicht der Bestell-App von Feinkost Kreta"
              caption="Bestell-App Feinkost Kreta: Bestellung und Benachrichtigung."
              note="Projektbeispiel · Produktdemo"
              width={300}
            />
          </div>
          <p className="mt-4 text-center text-sm text-white/70">
            <Link href="/referenzen/feinkost-kreta" className="underline-offset-4 hover:underline">
              Bestell-App ansehen
            </Link>
          </p>
          <div className="mt-8 rounded-[1.4rem] bg-[#F3EFE6] p-6 text-[#14161C] md:p-7">
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Förderung
            </p>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
              Für bestimmte Beratungsleistungen zur Digitalisierung interner Prozesse
              gibt es Förderprogramme. Unsere Softwarepakete werden durch
              MID-Digitale Prozesse nicht pauschal zur Hälfte bezuschusst.{" "}
              <Link href="/foerderung/mid-digitale-prozesse" className="text-[#198BE8] underline-offset-4 hover:underline">
                MID-Digitale Prozesse sachlich erklärt
              </Link>
              .
            </p>
          </div>
        </RevealIn>

        <DemoLoop
          src="/demos/dach-loop.mp4"
          poster="/demos/dach-poster.jpg"
          fullSrc="/demos/dach-full.mp4"
          posterAlt="Standbild einer Signature-Website für einen Dachdeckerbetrieb"
          caption="Website-Demo für einen Dachdeckerbetrieb."
          note="Produktdemo · kein Echtbetrieb"
          className="mt-10"
        />
        <p className="mt-3 text-[1.02rem] text-[#5C5F66]">
          <Link href="/referenzen/dachdecker-signature" className="text-[#198BE8] underline-offset-4 hover:underline">
            Website-Demo ansehen
          </Link>
        </p>

        <RevealIn
          as="div"
          variant="lead"
          className="mt-6 space-y-4 rounded-[1.6rem] bg-white p-7 md:p-8"
        >
          <div>
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Was nach der Einrichtung dazugehört
            </p>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
              Bei Websites ist die monatliche Betreuung optional. Wird sie gewählt,
              deckt sie Hosting, Sicherheitsupdates, Backups und die vereinbarten
              Inhaltsänderungen ab.
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-[1.05rem] text-[#3A3D45]">
              {websiteCare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-t border-black/10 pt-4">
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Ihre Website: übergeben oder weiter betreuen
            </p>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
              {websiteOwnership} Für interne Systeme und den Assistenten gilt die
              Laufzeit, die im jeweiligen Angebot steht.
            </p>
          </div>
        </RevealIn>

        <p className="mt-8 text-[1.02rem] text-[#5C5F66]">{PRICE_NOTE}</p>
        {embedded ? null : (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            asChild
            className="h-13 rounded-full bg-[#14161C] px-7 text-[1.05rem] text-white hover:bg-black"
          >
            <Link href={cta.href}>{cta.primary}</Link>
          </Button>
          <WhatsAppInline className="h-13 px-7 text-[1.05rem]" />
        </div>
        )}
      </div>
    </section>
  );
}
