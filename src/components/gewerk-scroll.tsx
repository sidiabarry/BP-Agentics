"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function jumpToGewerk() {
  const fromQuery = new URLSearchParams(window.location.search).get("gewerk");
  const fromHash = window.location.hash.replace("#", "");
  const id = fromQuery || fromHash;
  if (!id) return false;
  const node = document.getElementById(id);
  if (!node) return false;
  node.scrollIntoView();
  if (fromQuery && !fromHash) {
    window.history.replaceState(null, "", `/gewerke#${id}`);
  }
  return true;
}

/** Scrollt zum Gewerk, wenn Next den Anker bei der Navigation verschluckt. */
export function GewerkScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/gewerke") return;
    const delays = [0, 50, 150, 300];
    const timers = delays.map((ms) => window.setTimeout(() => jumpToGewerk(), ms));
    window.addEventListener("hashchange", jumpToGewerk);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("hashchange", jumpToGewerk);
    };
  }, [pathname]);

  return null;
}
