export const leistungItems = [
  {
    href: "/leistungen/auftritt",
    title: "Websites",
    sub: "Leistungen, Referenzen und Einsatzgebiet verständlich zeigen.",
  },
  {
    href: "/leistungen/annahme",
    title: "WhatsApp-Assistent",
    sub: "Anfragen per Text beantworten und Termine abstimmen.",
  },
  {
    href: "/leistungen/ablaeufe",
    title: "Büroabläufe automatisieren",
    sub: "Informationen einmal erfassen und weitergeben.",
  },
] as const;

export const mainLinks = [
  { href: "/referenzen", label: "Arbeiten und Demos", spy: "referenzen" },
  { href: "/preise", label: "Preise", spy: "preise" },
  { href: "/ueber-mich", label: "Über mich", spy: null },
  { href: "/kontakt", label: "Kontakt", spy: null },
] as const;

/** Desktop-Erweiterung der Startseiten-Kopfzeile, sobald der Hero den Viewport verlässt. */
export const homeExpandLinks = [
  { href: "#referenzen", label: "Arbeiten und Demos", spy: "referenzen" },
  { href: "#preise", label: "Preise", spy: "preise" },
  { href: "/ueber-mich", label: "Über mich", spy: null },
] as const;

export const mobileOverview = {
  href: "/leistungen",
  label: "Leistungen im Überblick",
} as const;

export const mobileReferenzen = [
  { href: "/referenzen/feinkost-kreta", label: "Feinkost Kreta" },
  { href: "/referenzen/dachdecker-signature", label: "Dachdecker Signature" },
] as const;

export const mobileInfo = [
  { href: "/preise", label: "Preise" },
  { href: "/foerderung/mid-digitale-prozesse", label: "Förderung" },
  { href: "/passt-das", label: "Welcher Einstieg passt?" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function gewerkHref(slug: string) {
  return `/gewerke#${slug}`;
}
