import { HeroSequence } from "@/components/hero-sequence";
import { ProblemWall } from "@/components/problem-wall";
import { TradeSelector } from "@/components/trade-selector";
import { ThreeLevels } from "@/components/three-levels";
import { LivingChat } from "@/components/living-chat";
import { Proof } from "@/components/proof";
import { Process } from "@/components/process";
import { Pricing } from "@/components/pricing";
import { SchnellCheck } from "@/components/schnell-check";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";

export default function HomePage() {
  return (
    <>
      <HeroSequence />
      <ProblemWall />
      <TradeSelector />
      <Process />
      <ThreeLevels />
      <LivingChat />
      <Proof />
      <Pricing />
      <SchnellCheck />
      <Faq />
      <CtaBand dark />
    </>
  );
}
