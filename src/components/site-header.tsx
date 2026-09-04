"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Wordmark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { industryList } from "@/lib/content";

const links = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/preise", label: "Preise" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/foerderung/mid-digitale-prozesse", label: "MID-Förderung" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const invert = tone === "dark";

  return (
    <header
      className={`absolute inset-x-0 top-0 z-40 transition-colors duration-300 ${
        invert ? "text-white" : "text-foreground"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8">
        <Link href="/" aria-label="BP Agentics Startseite">
          <Wordmark invert={invert} />
        </Link>
        <nav className="hidden items-center gap-6 text-[0.95rem] lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                invert
                  ? "text-white/80 transition hover:text-white"
                  : "text-foreground/70 transition hover:text-foreground"
              }
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            className="h-11 rounded-full bg-[#198BE8] px-5 text-base text-white hover:bg-[#1576C4]"
          >
            <Link href="/termin">Erstgespräch</Link>
          </Button>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className={`lg:hidden ${
                invert
                  ? "bg-black/40 text-white hover:bg-black/55"
                  : "bg-black/80 text-white hover:bg-black"
              } rounded-full`}
              aria-label="Menü öffnen"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,22rem)]">
            <SheetHeader>
              <SheetTitle>Menü</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-1 px-4">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-lg"
                >
                  {item.label}
                </Link>
              ))}
              <p className="mt-4 text-sm tracking-[0.16em] text-muted-foreground uppercase">
                Gewerke
              </p>
              {industryList.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5"
                >
                  {item.title}
                </Link>
              ))}
              <Button
                asChild
                className="mt-6 h-12 rounded-full bg-[#198BE8] text-base text-white"
              >
                <Link href="/termin" onClick={() => setOpen(false)}>
                  Erstgespräch vereinbaren
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
