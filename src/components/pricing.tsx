import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { WhatsAppInline } from "@/components/whatsapp-button";
import { DemoLoop, PhoneDemo } from "@/components/demo-player";

const systems = [
  {
    name: "Fundament",
    price: "ab 2.490 €",
    body: "Anbindung von Postfach, Kalender und Kundendaten. Ein Ort statt fünf.",
  },
  {
    name: "KI-Setter",
    price: "1.290 €",
    run: "99 € monatlich",
    body: "Beantwortet Anfragen per Text und bucht Termine in Ihren Kalender.",
  },
] as const;

const websites = [
  {
    name: "Website Start",
    price: "690 €",
    run: "149 € monatlich, optional",
    body: "Einseiter, der Anfragen holt. Für Betriebe, deren Auftritt seit Jahren schweigt.",
    featured: false,
  },
  {
    name: "Website Betrieb",
    price: "1.790 €",
    run: "149 € monatlich, optional",
    body: "Mehrseitig, mit Leistungsseiten und Referenzen. Für Betriebe, die gefunden werden wollen, ohne Sonderanfertigung.",
    featured: false,
  },
  {
    name: "Website Signature",
    price: "ab 3.490 €",
    run: "290 € monatlich, optional",
    body: "Für Betriebe, die über die Website verkaufen. Der Auftritt ist die Arbeitsprobe.",
    featured: true,
  },
] as const;

const teaserRows = [
  { name: "Website Start", price: "690 €", run: "149 € monatlich, optional" },
  { name: "Website Betrieb", price: "1.790 €", run: "149 € monatlich, optional" },
  { name: "Website Signature", price: "ab 3.490 €", run: "290 € monatlich, optional" },
  { name: "KI-Setter", price: "1.290 €", run: "99 € monatlich" },
  { name: "Fundament", price: "ab 2.490 €", run: "ohne monatliche Betreuung" },
] as const;

function WebsiteCards() {
  return (
    <div className="grid items-stretch gap-4 md:grid-cols-3">
      {websites.map((plan, index) => (
        <RevealIn
          key={plan.name}
          as="article"
          variant="card"
          delay={index * 60}
          className={
            plan.featured
              ? "flex h-full flex-col rounded-3xl bg-[#198BE8] p-7 text-white"
              : "flex h-full flex-col rounded-3xl bg-white p-7"
          }
        >
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <RevealIn
            as="p"
            variant="price"
            delay={120 + index * 60}
            className="mt-2 text-3xl font-semibold whitespace-nowrap"
          >
            {plan.price}
          </RevealIn>
          <p className={plan.featured ? "mt-1 text-white/80" : "mt-1 text-[#5C5F66]"}>
            {plan.run}
          </p>
          <p className={plan.featured ? "mt-4 flex-1 text-white/90" : "mt-4 flex-1 text-[#3A3D45]"}>
            {plan.body}
          </p>
          <p className="mt-5">
            <Link
              href="/leistungen/auftritt"
              className={
                plan.featured
                  ? "text-white underline-offset-4 hover:underline"
                  : "text-[#198BE8] underline-offset-4 hover:underline"
              }
            >
              Website {plan.name.replace("Website ", "")}: Leistung und Wartung
            </Link>
          </p>
        </RevealIn>
      ))}
    </div>
  );
}

export function Pricing({ teaser = false }: { teaser?: boolean }) {
  if (teaser) {
    return (
      <section id="preise" className="bg-[#F3EFE6] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
            Preise
          </RevealIn>
          <RevealHeading className="mt-3 text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-6xl">
            690 € Einbau. 149 € im Monat.
          </RevealHeading>
          <RevealIn as="p" variant="lead" className="mt-5 max-w-[42rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
            Festpreis für Website, Setter und Abläufe — inklusive Eigentum.
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
              Alle Endpreise in der Tabelle
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="preise" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Preise
        </RevealIn>
        <RevealHeading className="mt-3 text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-6xl">
          690 € Einbau. 149 € im Monat.
        </RevealHeading>
        <RevealIn as="p" variant="lead" className="mt-5 max-w-[42rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Mittelständische Kaufleute rechnen in Wartung, nicht in
          Agenturabenteuern. Der Einbau ist ein Festpreis. Danach läuft ein
          Wartungsvertrag, wie Sie ihn Ihren eigenen Kunden schreiben — für ein
          Arbeitsmittel, das wir hosten, pflegen und am Laufen halten.
        </RevealIn>

        <RevealIn
          as="article"
          variant="card"
          className="mt-12 rounded-[2rem] bg-[#14161C] p-7 text-[#F3EFE6] md:p-10"
        >
          <p className="text-sm tracking-[0.2em] text-[#9FD0F8] uppercase">
            Prozesslinie
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Interne Systeme
          </h3>
          <p className="mt-4 max-w-[40rem] text-[1.12rem] leading-relaxed text-white/80">
            Wir lösen Papier und Excel ab. Angebote, Termine, Kundendaten,
            Nachfassen — in einem System, das Ihre Leute ohne Schulung bedienen.
          </p>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div>
              <div className="divide-y divide-white/10 border-t border-white/10">
                {systems.map((item) => (
                  <div
                    key={item.name}
                    className="grid gap-2 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8"
                  >
                    <div>
                      <p className="text-xl font-semibold">{item.name}</p>
                      <p className="mt-2 text-[1.05rem] leading-relaxed text-white/75">
                        {item.body}
                      </p>
                    </div>
                    <div className="md:text-right">
                      <RevealIn
                        as="p"
                        variant="price"
                        className="text-2xl font-semibold whitespace-nowrap md:text-3xl"
                      >
                        {item.price}
                      </RevealIn>
                      {"run" in item ? (
                        <p className="mt-1 text-white/70">{item.run}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[1.08rem] leading-relaxed text-white/85">
                Der Zuschnitt entsteht im 90-Minuten-Gespräch vor Ort. Der Preis
                steht danach fest und ändert sich nicht.{" "}
                <Link href="/leistungen/ablaeufe" className="text-[#9FD0F8] underline-offset-4 hover:underline">
                  Fundament im Detail
                </Link>
                {" · "}
                <Link href="/leistungen/annahme" className="text-[#9FD0F8] underline-offset-4 hover:underline">
                  KI-Setter für Annahme und Kalender
                </Link>
                {" · "}
                <Link href="/preise" className="text-[#9FD0F8] underline-offset-4 hover:underline">
                  Alle Endpreise in einer Tabelle
                </Link>
                .
              </p>
            </div>
            <PhoneDemo
              src="/demos/feinkost-loop.mp4"
              poster="/demos/feinkost-poster.jpg"
              fullSrc="/demos/feinkost-full.mp4"
              posterAlt="Smartphone-Ansicht der Bestell-App von Feinkost Kreta mit 1-Klick-Bestellung"
              caption="Bestell-App Feinkost Kreta: 1-Klick und Benachrichtigung."
              width={300}
            />
            <p className="mt-4 text-center text-sm text-white/70">
              <Link href="/referenzen/feinkost-kreta" className="underline-offset-4 hover:underline">
                Referenz Feinkost Kreta: Bestell-App und Demo
              </Link>
            </p>
          </div>
          <div className="mt-8 rounded-[1.4rem] bg-[#F3EFE6] p-6 text-[#14161C] md:p-7">
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Fördermittel
            </p>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
              Das Land NRW bezuschusst die Digitalisierung interner
              Geschäftsprozesse über MID Digitale Prozesse mit 50 Prozent, bis
              zu 15.000 €. Wir begleiten den Antrag, bevor wir bauen — die
              Reihenfolge ist Vorschrift, nicht Kür. Das aktuelle Einreichfenster
              läuft bis zum 1. Dezember 2026 und wird nach Eingang vergeben.{" "}
              <Link href="/foerderung/mid-digitale-prozesse" className="text-[#198BE8] underline-offset-4 hover:underline">
                MID Digitale Prozesse: Zuschuss, Fenster und Reihenfolge vor dem Bescheid
              </Link>
              .
            </p>
          </div>
        </RevealIn>

        <div className="mt-6">
          <WebsiteCards />
        </div>

        <DemoLoop
          src="/demos/dach-loop.mp4"
          poster="/demos/dach-poster.jpg"
          fullSrc="/demos/dach-full.mp4"
          posterAlt="Standbild einer Signature-Website für einen Dachdeckerbetrieb mit Dachaufnahme und Scroll-Choreografie"
          caption="Scroll-Choreografie einer Signature-Website für einen Dachdeckerbetrieb."
          note="Produktdemo · kein Echtbetrieb"
          className="mt-10"
        />
        <p className="mt-3 text-[1.02rem] text-[#5C5F66]">
          <Link href="/referenzen/dachdecker-signature" className="text-[#198BE8] underline-offset-4 hover:underline">
            Referenz Dachdecker Signature: Loop und Erklärung
          </Link>
        </p>

        <RevealIn
          as="div"
          variant="lead"
          className="mt-6 space-y-4 rounded-[1.6rem] bg-white p-7 md:p-8"
        >
          <div>
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              In der Wartung enthalten
            </p>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
              Hosting in Deutschland, SSL, Sicherheitsupdates, tägliche Backups,
              bis zu drei Textänderungen im Monat, Störungsbehebung innerhalb von
              24 Stunden an Werktagen.
            </p>
          </div>
          <div className="border-t border-black/10 pt-4">
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Eigentum und Kündigung
            </p>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
              Die Seite gehört Ihnen ab Zahlung des Einbaus. Nach zwölf Monaten
              monatlich kündbar. Bei Kündigung übergeben wir Ihnen die
              vollständigen Dateien, kostenfrei. Sie zahlen für die Wartung,
              nicht für Ihr Eigentum.
            </p>
          </div>
        </RevealIn>

        <p className="mt-8 text-[1.02rem] text-[#5C5F66]">Alle Preise sind Endpreise.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            asChild
            className="h-13 rounded-full bg-[#14161C] px-7 text-[1.05rem] text-white hover:bg-black"
          >
            <Link href="/termin">Diesen Plan vor Ort durchsprechen</Link>
          </Button>
          <WhatsAppInline className="h-13 px-7 text-[1.05rem]" />
        </div>
      </div>
    </section>
  );
}
