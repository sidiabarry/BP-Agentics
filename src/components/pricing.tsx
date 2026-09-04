import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";

const systems = [
  {
    name: "Fundament",
    price: "2.900 €",
    body: "Anbindung von Postfach, Kalender und Kundendaten. Ein Ort statt fünf.",
  },
  {
    name: "Modul",
    price: "900 € bis 1.800 €",
    body: "Ein Ablauf pro Modul: Angebotsversand, Nachfassen, Terminerinnerung, Auftragsdokumentation.",
  },
  {
    name: "KI-Setter",
    price: "1.900 €",
    run: "99 € im Monat",
    body: "Beantwortet Anfragen per Text und bucht Termine in Ihren Kalender.",
  },
] as const;

const websites = [
  {
    name: "Website Start",
    price: "950 €",
    run: "Wartungsvertrag 149 € / Monat, 12 Monate",
    body: "Einseiter, der Anfragen holt. Für Betriebe, deren Auftritt seit Jahren schweigt.",
    featured: false,
  },
  {
    name: "Website Signature",
    price: "ab 7.900 €",
    run: "Wartungsvertrag 190 € / Monat",
    body: "Für Betriebe, die über die Website verkaufen. Der Auftritt ist die Arbeitsprobe.",
    featured: true,
  },
] as const;

export function Pricing() {
  return (
    <section id="preise" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Preise
        </RevealIn>
        <RevealHeading className="mt-3 text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-6xl">
          950 € Einbau. 149 € im Monat.
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
          <div className="mt-8 divide-y divide-white/10 border-t border-white/10">
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
            steht danach fest und ändert sich nicht.
          </p>
          <div className="mt-8 rounded-[1.4rem] bg-[#F3EFE6] p-6 text-[#14161C] md:p-7">
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Fördermittel
            </p>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
              Das Land NRW bezuschusst die Digitalisierung interner
              Geschäftsprozesse über MID-Digitale Prozesse mit 50 Prozent, bis
              zu 15.000 €. Wir begleiten den Antrag, bevor wir bauen — die
              Reihenfolge ist Vorschrift, nicht Kür. Das aktuelle Einreichfenster
              läuft bis zum 1. Dezember 2026 und wird nach Eingang vergeben.
            </p>
          </div>
        </RevealIn>

        <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2">
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
            </RevealIn>
          ))}
        </div>

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
        <Button
          asChild
          className="mt-6 h-13 rounded-full bg-[#14161C] px-7 text-[1.05rem] text-white hover:bg-black"
        >
          <Link href="/termin">Diesen Plan vor Ort durchsprechen</Link>
        </Button>
      </div>
    </section>
  );
}
