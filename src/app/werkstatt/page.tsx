import type { Metadata } from "next";
import { WerkstattChapter } from "@/components/werkstatt/werkstatt-chapter";
import { chapter, labels, paths, werkstattPage } from "@/lib/journey";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: werkstattPage.title,
  description: werkstattPage.description,
  path: paths.werkstattAlias,
});

export default function WerkstattPage() {
  return (
    <main id="inhalt">
      <WerkstattChapter />
      <p className="bg-[#F3EFE6] px-5 pb-16 text-center text-[1.05rem] text-[#3A3D45] md:px-8">
        Weiter im{" "}
        <Link href={chapter.beweis} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          {labels.weiterArbeiten}
        </Link>
        {" "}
        auf der Startseite.
      </p>
    </main>
  );
}
