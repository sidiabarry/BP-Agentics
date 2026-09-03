import Image from "next/image";
import { works } from "@/lib/content";

export function Proof() {
  return (
    <section id="arbeiten" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.2em] text-[#5B54E6] uppercase">
          Arbeitsproben
        </p>
        <h2 className="mt-3 max-w-[18ch] text-4xl leading-[1.12] font-semibold tracking-[-0.03em] hyphens-auto md:text-5xl">
          Kein Agenturglanz. Betriebe, die so arbeiten wie Sie.
        </h2>
        <div className="mt-12 overflow-hidden rounded-[2rem]">
          <Image
            src="/media/buero.jpg"
            alt="Büro am Lager: Laptop, Festnetz, Zettel. Genau der Alltag, den wir ablösen."
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {works.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-6">
              <p className="text-sm tracking-[0.16em] text-[#5B54E6] uppercase">
                {item.layer}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
