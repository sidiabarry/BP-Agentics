"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Wordmark } from "@/components/brand";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { homeExpandLinks, leistungItems, mainLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!onHome) return;
    const ids = ["leistungen", "referenzen", "warum", "preise", "start"];
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

  const desktopLinks = onHome ? homeExpandLinks : mainLinks;

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
        <div className="hidden lg:block">
          <nav className="flex items-center gap-6 pr-1 whitespace-nowrap" aria-label="Hauptnavigation">
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
            {desktopLinks.map((item) => (
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
              className="h-11 rounded-full bg-[#0C5A9A] px-5 text-base text-white hover:bg-[#0A4A80]"
            >
              <Link href="/termin">Erstgespräch</Link>
            </Button>
          </nav>
        </div>
        <MobileNav open={open} onOpenChange={setOpen} />
      </div>
    </header>
  );
}
