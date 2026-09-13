import type { Metadata } from "next";
import { DemoPair } from "@/components/home-referenzen";
import { StagePage } from "@/components/stage-page";
import { pageMetadata } from "@/lib/seo";
import { paths, stageThread } from "@/lib/journey";

export const metadata: Metadata = pageMetadata({
  title: "Arbeiten und Demos — was bisher entstanden ist",
  description:
    "Kundenprojekt Feinkost Kreta und eine Website-Demo für Dachdecker. Beschreibungen erklären, was zu sehen ist — Demos sind als solche gekennzeichnet.",
  path: paths.referenzen,
});

export default function ReferenzenPage() {
  return (
    <StagePage
      kicker="Arbeiten und Demos"
      title="Was bisher entstanden ist."
      lead="Ein Kundenprojekt zeigt einen echten Bestellweg. Eine Produktdemo zeigt, wie sich ein Handwerksbetrieb präsentieren kann. Beschreibungen erklären, was zu sehen ist."
      crumbs={[{ name: "Arbeiten und Demos", path: paths.referenzen }]}
      related={stageThread(paths.referenzen).related}
      next={stageThread(paths.referenzen).next}
    >
      <DemoPair surface="white" />
    </StagePage>
  );
}
