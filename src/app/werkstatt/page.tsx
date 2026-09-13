import type { Metadata } from "next";
import { WerkstattScene } from "@/components/werkstatt/werkstatt-scene";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Die Werkstatt — die drei Leistungen in 3D",
  description:
    "Ein interaktiver 3D-Rundgang: Website-Bildschirm, Nachrichten-Assistent und Büroabläufe als begehbare Werkstatt. Jede Station führt zur passenden Leistung.",
  path: "/werkstatt",
});

export default function WerkstattPage() {
  return (
    <main id="inhalt">
      <WerkstattScene />
    </main>
  );
}
