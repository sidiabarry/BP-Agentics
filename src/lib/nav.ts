import {
  anchors,
  labels,
  paths,
  stations,
} from "@/lib/journey";

export { gewerkHref } from "@/lib/journey";

export const leistungItems = [
  {
    href: stations[0].href,
    title: stations[0].label,
    sub: "Leistungen, Referenzen und Einsatzgebiet verständlich zeigen.",
  },
  {
    href: stations[1].href,
    title: stations[1].label,
    sub: "Anfragen per WhatsApp und E-Mail beantworten und Termine abstimmen.",
  },
  {
    href: stations[2].href,
    title: stations[2].label,
    sub: "Informationen einmal erfassen und weitergeben.",
  },
] as const;

export const mainLinks = [
  { href: paths.referenzen, label: labels.referenzen, spy: anchors.referenzen },
  { href: paths.preise, label: labels.preise, spy: anchors.preise },
  { href: paths.ueberMich, label: labels.ueberMich, spy: null },
  { href: paths.kontakt, label: labels.kontakt, spy: null },
] as const;

/** Desktop-Erweiterung der Startseiten-Kopfzeile, sobald der Hero den Viewport verlässt. */
export const homeExpandLinks = [
  { href: `#${anchors.referenzen}`, label: labels.referenzen, spy: anchors.referenzen },
  { href: `#${anchors.preise}`, label: labels.preise, spy: anchors.preise },
  { href: paths.ueberMich, label: labels.ueberMich, spy: null },
  { href: paths.kontakt, label: labels.kontakt, spy: null },
] as const;

export const mobileOverview = {
  href: paths.leistungen,
  label: labels.leistungenOverview,
} as const;

export const mobileReferenzen = [
  { href: paths.feinkost, label: "Feinkost Kreta" },
  { href: paths.dachdecker, label: "Dachdecker Signature" },
  { href: paths.werkstattAlias, label: labels.werkstattNav },
] as const;

export const mobileInfo = [
  { href: paths.preise, label: labels.preise },
  { href: paths.foerderung, label: labels.foerderung },
  { href: paths.passtDas, label: labels.passtDas },
  { href: paths.ueberMich, label: labels.ueberMich },
  { href: paths.kontakt, label: labels.kontakt },
] as const;
