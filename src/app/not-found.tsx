import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#F3EFE6]">
      <SiteHeader tone="light" />
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-24 md:px-8">
        <p className="text-sm tracking-[0.2em] text-[#198BE8] uppercase">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          Diese Seite gibt es nicht.
        </h1>
        <p className="mt-4 text-[1.15rem] text-[#3A3D45]">
          Zurück zur Startseite oder direkt den Termin legen.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-12 rounded-full bg-[#198BE8] px-6 text-white">
            <Link href="/">Zur Startseite</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full px-6">
            <Link href="/termin">Erstgespräch</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
