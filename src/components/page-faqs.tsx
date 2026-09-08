import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function PageFaqs({
  items,
  heading = "Häufige Fragen",
}: {
  items: { q: string; a: string }[];
  heading?: string;
}) {
  return (
    <section
      className="mt-12 rounded-[1.6rem] bg-white px-5 py-6 md:px-7 md:py-7"
      aria-labelledby="seiten-faq"
    >
      <h2 id="seiten-faq" className="text-2xl font-semibold tracking-[-0.03em]">
        {heading}
      </h2>
      <Accordion type="single" collapsible className="mt-4">
        {items.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-left text-[1.08rem] leading-snug">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-[1.05rem] leading-relaxed text-[#3A3D45]">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
