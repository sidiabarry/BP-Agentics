"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Wordmark } from "@/components/brand";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { homeExpandLinks, leistungItems, leistungenParent, mainLinks } from "@/lib/nav";
import { cta } from "@/lib/offers";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [heroState, setHeroState] = useState({ path: onHome ? "/" : pathname, inView: true });
  if (heroState.path !== (onHome ? "/" : pathname)) {
    setHeroState({ path: onHome ? "/" : pathname, inView: true });
  }

  useEffect(() => {
    if (!onHome) return;
    const hero = document.getElementById("einstieg");
    if (!hero) return;
    const headerHeight = Math.ceil(
      headerRef.current?.getBoundingClientRect().height ?? 72,
    );
    const observer = new IntersectionObserver(
      ([entry]) => setHeroState({ path: "/", inView: entry.isIntersecting }),
      { threshold: 0, rootMargin: `-${headerHeight}px 0px 0px 0px` },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!onHome) return;
    const ids = ["werkstatt", "beweis", "problem", "referenzen", "person", "start", "preise", "leistungen", "entscheidung"];
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

  const expanded = !onHome || !heroState.inView;
  const desktopLinks = onHome ? homeExpandLinks : mainLinks;

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const sync = () => {
      document.documentElement.style.setProperty(
        "--site-header-h",
        `${Math.ceil(el.getBoundingClientRect().height)}px`,
      );
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded]);

  const linkClass = (on: boolean) =>
    cn(
      "text-[0.95rem] transition",
      on ? "text-[#198BE8]" : "text-foreground/70 hover:text-foreground",
    );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 isolate z-[80] border-b border-black/8 bg-[#F3EFE6]"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" aria-label="BP Agentics Startseite" className="inline-flex min-h-11 items-center">
          <Wordmark />
        </Link>
        <div
          className={cn(
            "hidden lg:block",
            expanded ? "max-w-[48rem] overflow-visible" : "pointer-events-none max-w-0 overflow-hidden",
          )}
          aria-hidden={!expanded}
        >
          <nav
            className={cn(
              "flex items-center gap-6 pr-1 whitespace-nowrap",
              expanded ? "opacity-100" : "opacity-0",
            )}
            aria-label="Hauptnavigation"
          >
            <div
              className="relative"
              onMouseEnter={() => setDrop(true)}
              onMouseLeave={() => setDrop(false)}
            >
              <div className="inline-flex items-center gap-0.5">
                <Link
                  href={onHome ? leistungenParent.homeHref : leistungenParent.href}
                  className={cn(
                    linkClass(onHome && (active === "werkstatt" || active === "leistungen")),
                    "inline-flex min-h-11 items-center px-1",
                  )}
                  onClick={(event) => {
                    setDrop(false);
                    if (!onHome) return;
                    event.preventDefault();
                    const headerH = Math.ceil(
                      headerRef.current?.getBoundingClientRect().height ?? 72,
                    );
                    const hero = document.getElementById("einstieg");
                    const werkstatt = document.getElementById("werkstatt");
                    const y = hero
                      ? hero.getBoundingClientRect().bottom + window.scrollY - headerH
                      : werkstatt
                        ? werkstatt.getBoundingClientRect().top + window.scrollY - headerH
                        : 0;
                    window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
                    history.replaceState(null, "", leistungenParent.homeHref);
                  }}
                >
                  {leistungenParent.label}
                </Link>
                <button
                  type="button"
                  className={cn(linkClass(onHome && (active === "werkstatt" || active === "leistungen")), "p-1")}
                  aria-expanded={drop}
                  aria-haspopup="true"
                  aria-label="Leistungen-Untermenü"
                  onClick={() => setDrop((value) => !value)}
                >
                  <ChevronDown className="size-3.5" />
                </button>
              </div>
              {drop ? (
                <div className="absolute top-full left-0 z-50 w-[22rem] pt-2">
                  <div className="rounded-2xl border border-black/8 bg-white p-2 shadow-xl">
                    {leistungItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-2.5 hover:bg-[#E8F4FC]"
                        onClick={() => setDrop(false)}
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
              className="h-11 rounded-full bg-[#198BE8] px-5 text-base text-white hover:bg-[#1576C4]"
            >
              <Link href={cta.href}>{cta.short}</Link>
            </Button>
          </nav>
        </div>
        <MobileNav open={open} onOpenChange={setOpen} />
      </div>
    </header>
  );
}
