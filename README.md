# BP Agentics

Website für **BP Agentics** in Hagen: Websites, KI-Annahme und interne Abläufe für Betriebe in Nordrhein-Westfalen.

Canonical-Host: `https://bp-agentics.de`  
NAP: `Kleiststraße 9, 58095 Hagen · +49 162 2843869`

Die Startseite ist die Übersicht: acht Abschnitte, FAQ. Nach dem Hero erweitert sich die mitlaufende Kopfzeile um die Sprunglinks. Der volle Inhalt sitzt auf benannten Unterseiten.

## Lokal starten

```bash
npm install
npm run dev
```

Der Dev-Server lauscht auf [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Routen

- `/` — Übersicht (acht Abschnitte plus FAQ)
- `/leistungen`, `/leistungen/auftritt`, `/leistungen/annahme`, `/leistungen/ablaeufe`
- `/passt-das`, `/ueber-mich`
- `/foerderung/mid-digitale-prozesse`
- `/referenzen`, `/referenzen/feinkost-kreta`, `/referenzen/dachdecker-signature`
- `/preise`, `/kontakt`, `/termin`
- 301: `/leistungen/website` → `/leistungen/auftritt`, `/leistungen/ki-setter` → `/leistungen/annahme`
- `/gewerke` — acht Gewerke auf einer Seite; alte Pfade wie `/dachdecker` leiten auf den Anker um
- `/impressum`, `/datenschutz`
- Crawl: `/sitemap.xml`, `/robots.txt`, `/llms.txt`

## Technik auf der Seite

Metadaten, JSON-LD (`ProfessionalService`, `Person`, `WebSite`, plus Service/FAQ/Video wo der Inhalt sichtbar ist), Canonicals, beschreibende Alternativtexte. Kein `hreflang`, keine erfundenen Bewertungen, keine SearchAction.

## Was diese Website allein nicht rankt

Abschnitt 7 des SEO-Briefs liegt außerhalb des Repos und muss von Hand geschehen, sonst bleibt die Technik unsichtbar:

- Google Business Profile anlegen und NAP identisch halten
- Einträge SIHK, wlw, OpenStreetMap, LinkedIn — dieselbe Anschrift, dasselbe Telefon
- Search Console und Bing Webmaster, Property `bp-agentics.de`
- 301 von der bisherigen Squarespace-Domain auf die jeweiligen neuen Pfade
- echte Erwähnungen (Kunden, Kammern, lokale Seiten), keine gekauften Steckbriefe

Ohne diese Schritte indexiert Google die Hub-Seiten langsamer oder gar nicht. Das ist kein Fehler im Code.

## Preise

Ausgewiesene Beträge sind Endpreise. Der Hinweis nach § 19 UStG steht im Impressum und auf der Rechnung.
