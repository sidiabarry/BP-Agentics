import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="bg-[#F3EFE6] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm tracking-[0.2em] text-[#5B54E6] uppercase">
          Einwände
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          Was Inhaber uns zuerst sagen.
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left text-[1.15rem] leading-snug">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[1.05rem] leading-relaxed text-[#3A3D45]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
