export const leistungItems = [
  {
    href: "/leistungen/auftritt",
    title: "Auftritt — Websites",
    sub: "Damit die richtigen Anfragen kommen.",
  },
  {
    href: "/leistungen/annahme",
    title: "Annahme — KI-Setter",
    sub: "Damit keine Anfrage liegen bleibt.",
  },
  {
    href: "/leistungen/ablaeufe",
    title: "Abläufe — interne Systeme",
    sub: "Damit die Arbeit nicht am Schreibtisch hängt.",
  },
] as const;

export const mainLinks = [
  { href: "/referenzen", label: "Referenzen", spy: "referenzen" },
  { href: "/preise", label: "Preise", spy: "preise" },
  { href: "/foerderung/mid-digitale-prozesse", label: "Förderung", spy: null },
  { href: "/ueber-mich", label: "Über mich", spy: "warum" },
] as const;

/** Desktop-Erweiterung der Startseiten-Kopfzeile, sobald der Hero den Viewport verlässt. */
export const homeExpandLinks = [
  { href: "#referenzen", label: "Referenzen", spy: "referenzen" },
  { href: "#preise", label: "Preise", spy: "preise" },
  { href: "/foerderung/mid-digitale-prozesse", label: "Förderung", spy: null },
] as const;

export const mobileOverview = {
  href: "/leistungen",
  label: "Im Überblick",
} as const;

export const mobileReferenzen = [
  { href: "/referenzen/feinkost-kreta", label: "Feinkost Kreta" },
  { href: "/referenzen/dachdecker-signature", label: "Dachdecker Signature" },
] as const;

export const mobileInfo = [
  { href: "/preise", label: "Preise" },
  { href: "/foerderung/mid-digitale-prozesse", label: "Förderung" },
  { href: "/passt-das", label: "Passt das zu mir?" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function gewerkHref(slug: string) {
  return `/gewerke#${slug}`;
}
