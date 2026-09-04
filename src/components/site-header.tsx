"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
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
import { leistungItems, mainLinks, mobileExtra } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    const ids = ["problem", "referenzen", "leistungen", "warum", "preise", "start"];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [onHome]);

  const linkClass = (on: boolean) =>
    cn(
      "text-[0.95rem] transition",
      on ? "text-[#198BE8]" : "text-foreground/70 hover:text-foreground",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[#F3EFE6]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" aria-label="BP Agentics Startseite">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Hauptnavigation">
          <div
            className="relative"
            onMouseEnter={() => setDrop(true)}
            onMouseLeave={() => setDrop(false)}
          >
            <button
              type="button"
              className={cn(linkClass(onHome && active === "leistungen"), "inline-flex items-center gap-1")}
              aria-expanded={drop}
              aria-haspopup="true"
              onClick={() => setDrop((value) => !value)}
            >
              Leistungen
              <ChevronDown className="size-3.5" />
            </button>
            {drop ? (
              <div className="absolute top-full left-0 z-50 w-[22rem] pt-2">
                <div className="rounded-2xl border border-black/8 bg-white p-2 shadow-xl">
                  {leistungItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2.5 hover:bg-[#E8F4FC]"
                    >
                      <span className="block font-medium">{item.title}</span>
                      <span className="block text-sm text-[#5C5F66]">{item.sub}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(onHome && item.spy ? active === item.spy : pathname.startsWith(item.href))}
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
              className="rounded-full bg-black/80 text-white hover:bg-black lg:hidden"
              aria-label="Menü öffnen"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,22rem)] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Menü</SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-1 px-4 pb-8">
              <p className="text-sm tracking-[0.16em] text-muted-foreground uppercase">Leistungen</p>
              {leistungItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5"
                >
                  <span className="block">{item.title}</span>
                  <span className="block text-sm text-[#5C5F66]">{item.sub}</span>
                </Link>
              ))}
              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-lg"
                >
                  {item.label}
                </Link>
              ))}
              {mobileExtra.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5"
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
