import { HeroScrub } from "@/components/hero-scrub";
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
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader tone="dark" />
      <HeroScrub />
      <ProblemWall />
      <TradeSelector />
      <ThreeLevels />
      <LivingChat />
      <Proof />
      <Process />
      <Pricing />
      <SchnellCheck />
      <Faq />
      <CtaBand dark />
    </>
  );
}
