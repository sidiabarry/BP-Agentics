"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-button";

/**
 * Routen, die ihre eigene, bildschirmfüllende Oberfläche mitbringen und deshalb
 * ohne Kopfzeile, Fußzeile und schwebenden WhatsApp-Knopf laufen. Die Werkstatt
 * hat eine eigene Topbar und eine untere Stationsnavigation — die globale
 * Kopf-/Fußzeile würde damit kollidieren.
 */
const CHROMELESS_ROUTES = new Set(["/werkstatt"]);

export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (CHROMELESS_ROUTES.has(pathname)) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
