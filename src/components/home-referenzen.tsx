import Link from "next/link";
import { DemoLoop, PhoneDemo } from "@/components/demo-player";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";

export function HomeReferenzen() {
  return (
    <section id="referenzen" className="bg-white px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
          Referenzen
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[18ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Zwei Systeme, die man sehen kann.
        </RevealHeading>
        <RevealIn as="p" variant="lead" className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
          Keine erfundenen Sterne. Eine Bestell-App und eine Signature-Website —
          beide aus Hagen, beide mit Demo.
        </RevealIn>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2">
          <article>
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Bestell-App
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              Feinkost Kreta
            </h3>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
              Eine vollständige Bestell-App: ein Klick, die Bestellung sitzt,
              die Benachrichtigung geht raus. Kein Auftritt, kein Schaufenster —
              der innere Weg vom Kundenwunsch zur Theke.
            </p>
            <div className="mt-8 rounded-[2rem] bg-[#14161C] px-6 py-10">
              <PhoneDemo
                src="/demos/feinkost-loop.mp4"
                poster="/demos/feinkost-poster.jpg"
                fullSrc="/demos/feinkost-full.mp4"
                posterAlt="Smartphone-Ansicht der Bestell-App von Feinkost Kreta mit 1-Klick-Bestellung"
                caption="1-Klick-Bestellung und Benachrichtigung in der App von Feinkost Kreta."
                note="Produktdemo · kein Mitschnitt eines Kundengesprächs"
                width={300}
              />
            </div>
            <p className="mt-4">
              <Link
                href="/referenzen/feinkost-kreta"
                className="text-[#198BE8] underline-offset-4 hover:underline"
              >
                Fallseite Feinkost Kreta: Bestell-App und Demo
              </Link>
            </p>
          </article>

          <article>
            <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
              Auftritt
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              Dachdecker Signature
            </h3>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
              Die öffentliche Arbeitsprobe. Scroll-Choreografie für Steildach
              und Sanierung — die Seite verkauft, statt nur zu existieren.
            </p>
            <DemoLoop
              src="/demos/dach-loop.mp4"
              poster="/demos/dach-poster.jpg"
              fullSrc="/demos/dach-full.mp4"
              posterAlt="Standbild einer Signature-Website für einen Dachdeckerbetrieb mit Dachaufnahme und Scroll-Choreografie"
              caption="Scroll-Choreografie einer Signature-Website für einen Dachdeckerbetrieb."
              note="Produktdemo · kein Echtbetrieb"
              className="mt-8"
            />
            <p className="mt-4">
              <Link
                href="/referenzen/dachdecker-signature"
                className="text-[#198BE8] underline-offset-4 hover:underline"
              >
                Fallseite Dachdecker Signature: Loop und Erklärung
              </Link>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
