import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import { ProSeal } from "@/components/pro-seal";
import { cn } from "@/lib/utils";

export function ReviewsBand({
  tone = "cream",
}: {
  tone?: "cream" | "white";
}) {
  return (
    <section
      id="bewertungen"
      aria-label="Bewertungen"
      className={cn(
        "rounded-[1.6rem] p-6 md:p-8",
        tone === "cream" ? "bg-[#F3EFE6]" : "bg-white",
      )}
    >
      <RevealIn as="p" variant="kicker" className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">
        Bewertungen
      </RevealIn>
      <RevealHeading className="mt-3 max-w-[18ch] text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.03em] md:text-4xl">
        Öffentliche Stimmen zur Zusammenarbeit.
      </RevealHeading>
      <RevealIn as="p" variant="lead" className="mt-5 max-w-[40rem] text-[1.15rem] leading-relaxed text-[#3A3D45]">
        Auftraggeber können BP Agentics auf ProvenExpert bewerten. Das Siegel
        kommt von dort — nicht aus unseren Texten.
      </RevealIn>
      <div className="mt-8">
        <ProSeal />
      </div>
    </section>
  );
}
