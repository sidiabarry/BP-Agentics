"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * WhatsAppButton — BP Agentics
 * ---------------------------------------------------------------------------
 * Zwei Exporte:
 *   <WhatsAppFab />     schwebender Kreis unten links, immer sichtbar
 *   <WhatsAppInline />  Textzeile mit Icon, für Kontakt- und Preisabschnitt
 *
 * Datenschutz: Das ist ein reiner Link auf wa.me. Es wird kein Skript von Meta
 * geladen und vor dem Klick fließen keine Daten. Deshalb braucht dieser Button
 * KEINEN Cookie- oder Consent-Banner — anders als eingebettete Chat-Widgets.
 * Genau deshalb diese Variante und nicht das offizielle WhatsApp-Widget.
 *
 * Markenregeln: Grün ist #25D366 und wird nicht verändert. Das Zeichen wird
 * nicht verzerrt, nicht eingefärbt, nicht mit anderen Marken kombiniert.
 * ---------------------------------------------------------------------------
 */

/** 01622843869 → international ohne Plus und ohne führende Null */
const PHONE = "491622843869";

/** Vorbelegter Text. Landet im Eingabefeld, der Nutzer kann ihn ändern. */
const DEFAULT_MESSAGE =
  "Guten Tag, ich möchte eine Website oder einen digitalen Ablauf für meinen Betrieb besprechen.";

function waHref(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

type FabProps = {
  message?: string;
  label?: string;
  revealAfter?: number;
};

export function WhatsAppFab({
  message = DEFAULT_MESSAGE,
  label = "Per WhatsApp schreiben",
  revealAfter = 0,
}: FabProps) {
  const [visible, setVisible] = useState(revealAfter === 0);

  useEffect(() => {
    if (revealAfter === 0) return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * revealAfter);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealAfter]);

  return (
    <a
      href={waHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-analytics="whatsapp-fab"
      className={cn(
        "group fixed z-50 flex items-center overflow-hidden",
        "h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20",
        "left-[max(1rem,env(safe-area-inset-left))]",
        "bottom-[calc(4.5rem+max(1rem,env(safe-area-inset-bottom)))]",
        "md:bottom-[calc(max(1rem,env(safe-area-inset-bottom))+0.25rem)]",
        "md:hover:w-[15.5rem] md:hover:gap-3 md:hover:pr-5",
        "transition-[width,gap,padding,opacity,transform] duration-300 ease-out",
        "motion-reduce:transition-none",
        "outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40",
        "hover:bg-[#1FBE59] active:scale-95",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center">
        <WhatsAppGlyph className="h-7 w-7" />
      </span>
      <span className="hidden whitespace-nowrap text-[0.95rem] font-medium md:inline-block md:max-w-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-300 md:group-hover:max-w-[11rem] md:group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}

type InlineProps = {
  message?: string;
  children?: ReactNode;
  variant?: "solid" | "quiet";
  className?: string;
};

export function WhatsAppInline({
  message = DEFAULT_MESSAGE,
  children = "Per WhatsApp schreiben",
  variant = "solid",
  className = "",
}: InlineProps) {
  return (
    <a
      href={waHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics="whatsapp-inline"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full font-medium transition-colors",
        "outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40",
        variant === "solid"
          ? "bg-[#25D366] px-5 py-3 text-white hover:bg-[#1FBE59]"
          : "text-[#128C4A] underline-offset-4 hover:underline",
        className,
      )}
    >
      <WhatsAppGlyph className="h-5 w-5 shrink-0" />
      {children}
    </a>
  );
}

export { waHref, PHONE };
