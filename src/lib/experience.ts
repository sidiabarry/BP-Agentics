export type ExperienceId = "auftritt" | "annahme" | "ablaeufe";

export type ExperienceScene = {
  id: ExperienceId;
  index: 0 | 1 | 2;
  solutionId: "solution-0" | "solution-1" | "solution-2";
  problem: string;
  title: string;
  benefit: string;
  href: string;
  linkLabel: string;
  startLabel: string;
  video: string;
  videoSmall: string;
  poster: string;
  posterAlt: string;
  caption: string;
};

export const experienceScenes: ExperienceScene[] = [
  {
    id: "auftritt",
    index: 0,
    solutionId: "solution-0",
    problem: "Meine Website bringt zu wenig",
    title: "Qualität wird sichtbar",
    benefit:
      "Meine Qualität wird sichtbar und Interessenten finden einen nächsten Schritt.",
    href: "/leistungen/auftritt",
    linkLabel: "Website-Stufen und Endpreise nachlesen",
    startLabel: "Auftritt aufbauen",
    video: "/experience/auftritt-motion.mp4",
    videoSmall: "/experience/auftritt-motion-small.mp4",
    poster: "/experience/auftritt-poster.webp",
    posterAlt:
      "Sorgfältig gefertigtes Holzbauteil auf einer Werkbank als Beispiel für sichtbar gemachte Handwerksqualität.",
    caption: "Illustration: Eine Website macht Ihre Arbeit verständlich.",
  },
  {
    id: "annahme",
    index: 1,
    solutionId: "solution-1",
    problem: "Anfragen bleiben liegen",
    title: "Die Anfrage bekommt einen nächsten Schritt",
    benefit:
      "Eine Anfrage erhält Struktur und einen klaren nächsten Schritt.",
    href: "/leistungen/annahme",
    linkLabel: "KI-Setter für die Annahme nachlesen",
    startLabel: "Beispielanfrage starten",
    video: "/experience/annahme-motion.mp4",
    videoSmall: "/experience/annahme-motion-small.mp4",
    poster: "/experience/annahme-poster.webp",
    posterAlt: "Smartphone neben Notizbuch und Schlüsseln auf einem Betriebsschreibtisch.",
    caption: "Illustration: Anfrage, Klärung und Terminabstimmung.",
  },
  {
    id: "ablaeufe",
    index: 2,
    solutionId: "solution-2",
    problem: "Wir erfassen alles doppelt",
    title: "Informationen gehören zusammen",
    benefit:
      "Informationen gehören zusammen, statt mehrfach erfasst zu werden.",
    href: "/leistungen/ablaeufe",
    linkLabel: "Fundament und Module nachlesen",
    startLabel: "Informationen bündeln",
    video: "/experience/ablaeufe-motion.mp4",
    videoSmall: "/experience/ablaeufe-motion-small.mp4",
    poster: "/experience/ablaeufe-poster.webp",
    posterAlt:
      "Lose Geschäftsunterlagen und ein Klemmbrett als Beispiel für manuelle Datenerfassung.",
    caption: "Illustration: Informationen einem Vorgang zuordnen.",
  },
];

export const experienceIntro = {
  kicker: "Engpass wählen",
  title: "Welcher Ablauf bleibt liegen?",
  lead:
    "Drei konkrete Reibungspunkte. Sie wählen einen, lösen das Beispiel aus und sehen, wie sich die Situation ordnet. Das ist ein interaktives Beispiel, kein Kundenprojekt.",
};

export const a03Sources = [
  { id: "foto" as const, label: "Foto", detail: "Ausgangssituation" },
  { id: "notiz" as const, label: "Notiz", detail: "Rückfrage zum Umfang" },
  { id: "auftrag" as const, label: "Auftrag", detail: "Nächster Arbeitsschritt" },
];

export const a01Projects = [
  { id: "website" as const, label: "Website erneuern", summary: "Leistung und Arbeitsprobe öffentlich machen." },
  { id: "probe" as const, label: "Arbeitsprobe zeigen", summary: "Ein konkretes Werkstück als Einstieg nutzen." },
];
