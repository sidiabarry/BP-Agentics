import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";

const plans = [
  {
    name: "Website Start",
    price: "950 €",
    run: "plus 149 € / Monat, 12 Monate",
    body: "Einseiter, der Anfragen holt. Für Betriebe, deren Auftritt seit Jahren schweigt.",
    featured: false,
  },
  {
    name: "Website Signature",
    price: "ab 7.900 €",
    run: "plus 190 € / Monat",
    body: "Scroll-Choreografie wie diese Seite. Der Auftritt ist die Arbeitsprobe.",
    featured: true,
  },
  {
    name: "Setter und Innen",
    price: "Festpreis",
    run: "nach dem 90-Minuten-Gespräch",
    body: "KI-Setter 1.900 € Einbau. Fundament 2.900 €. Module 900 € bis 1.800 €. Endpreise nach § 19 UStG.",
    featured: false,
  },
] as const;

export function Pricing() {
  return (
    <section id="preise" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#5B54E6] uppercase">
          Preise
        </RevealIn>
        <RevealHeading className="mt-3 text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-6xl">
          Ab 149 € im Monat.
        </RevealHeading>
        <RevealIn as="p" variant="lead" className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Mittelständische Kaufleute rechnen in laufenden Vorhaltekosten, nicht in
          Agenturabenteuern. Der Einbau ist ein Festpreis. Der Betrieb ist die
          Miete für ein Arbeitsmittel, das wir hosten und warten.
        </RevealIn>
        <div className="mt-10 grid items-stretch gap-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <RevealIn
              key={plan.name}
              as="article"
              variant="card"
              delay={index * 60}
              className={
                plan.featured
                  ? "flex h-full flex-col rounded-3xl bg-[#5B54E6] p-7 text-white"
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
        <Button
          asChild
          className="mt-10 h-13 rounded-full bg-[#14161C] px-7 text-[1.05rem] text-white hover:bg-black"
        >
          <Link href="/termin">Diesen Plan vor Ort durchsprechen</Link>
        </Button>
      </div>
    </section>
  );
}
