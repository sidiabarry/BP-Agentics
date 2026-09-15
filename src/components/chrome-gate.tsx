"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-button";

/**
 * Die Werkstatt behält die Site-Kopfzeile (Leistungen muss klickbar bleiben),
 * läuft aber ohne Fußzeile und ohne den schwebenden WhatsApp-Knopf — beides
 * würde die 3D-Bühne und die Stationsnavigation zudecken.
 */
const HEADER_ONLY_ROUTES = new Set(["/werkstatt"]);

export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (HEADER_ONLY_ROUTES.has(pathname)) {
    return (
      <>
        <SiteHeader />
        {children}
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
