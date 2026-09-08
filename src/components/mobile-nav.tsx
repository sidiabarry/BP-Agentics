"use client";

import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WhatsAppInline } from "@/components/whatsapp-button";
import { industryList } from "@/lib/content";
import {
  gewerkHref,
  leistungItems,
  mobileInfo,
  mobileOverview,
  mobileReferenzen,
} from "@/lib/nav";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function closeOnClick(onOpenChange: (open: boolean) => void) {
  return () => onOpenChange(false);
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const close = closeOnClick(onOpenChange);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
        <SheetHeader className="sr-only">
          <SheetTitle>Menü</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 pt-10 pb-8" aria-label="Mobilnavigation">
          <Button
            asChild
            className="h-12 w-full rounded-full bg-[#198BE8] text-base text-white hover:bg-[#1576C4]"
          >
            <Link href="/termin" onClick={close}>
              Erstgespräch anfragen
            </Link>
          </Button>
          <WhatsAppInline className="mt-2 h-12 w-full justify-center rounded-full px-5 text-base">
            Per WhatsApp schreiben
          </WhatsAppInline>

          <p className="mt-8 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Leistungen
          </p>
          <Link href={mobileOverview.href} onClick={close} className="rounded-lg px-2 py-2.5 text-lg">
            {mobileOverview.label}
          </Link>
          {leistungItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-lg px-2 py-2.5"
            >
              <span className="block">{item.title}</span>
              <span className="block text-sm text-[#5C5F66]">{item.sub}</span>
            </Link>
          ))}

          <p className="mt-6 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Arbeiten und Demos
          </p>
          {mobileReferenzen.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-lg px-2 py-2.5 text-lg"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-4 flex flex-col gap-1">
            {mobileInfo.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-lg px-2 py-2.5 text-lg"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <details className="group mt-6">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-2 py-2.5 text-sm tracking-[0.16em] text-muted-foreground uppercase [&::-webkit-details-marker]:hidden">
              Für Ihr Gewerk
              <ChevronDown className="size-4 transition group-open:rotate-180" />
            </summary>
            <div className="flex flex-col">
              {industryList.map((item) => (
                    <Link
                      key={item.slug}
                      href={gewerkHref(item.slug)}
                      scroll={false}
                      onClick={close}
                      className="rounded-lg px-2 py-2.5 text-lg"
                    >
                  {item.title}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
