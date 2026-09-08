# Änderungsbericht: Copy-Überarbeitung 8. September 2026

Lokale, prüfbare Textüberarbeitung. Kein öffentliches Deployment.

## Was geändert wurde

- Sichtbare Copy, Metadaten, JSON-LD-Beschreibungen und `public/llms.txt` an die Vorlagen vom 8. September 2026 angepasst.
- Preise unverändert; 12-Monats-Rechnungen zentral in `src/lib/offers.ts`.
- CTA überall: **Kostenloses Erstgespräch anfragen** / kurz **Erstgespräch anfragen** / Formular **Terminwunsch senden**.
- Kanalgrenze Nachrichten-Assistent: WhatsApp und E-Mail, keine Telefonannahme, keine Havarie-Triage, Demo D01 (planbare Garagendach-Sanierung, 6 Nachrichten).
- MID: pauschale 50-%-Rechnung auf Softwarepakete entfernt. Sachliche Fassung in `src/lib/foerderung.ts`.
- Leistungs-Maschine bleibt; nur Texte und Demo umformuliert.
- HeroPortal-Choreografie bleibt; H01-Texte plus CTA ohne neue Pflichtanimation.
- Navigation: **Arbeiten und Demos** statt „Was schon läuft“ / „Referenzen“ als Kundenwort.
- Impressum: OS-Plattform als aufgehoben (20. Juli 2025) gekennzeichnet; Verbraucherschlichtung bleibt verneint.
- Formular: K02-Texte, Feldfehler mit Fokus, Eingaben bleiben bei Fehler erhalten, interne Versandmeldung nicht als Besuchersatz.

## Nachzug: Nachrichten-Assistent (WhatsApp und E-Mail)

- Produktname von „WhatsApp-Assistent“ auf **Nachrichten-Assistent** geändert.
- Angebot gilt für **Textnachrichten per WhatsApp und E-Mail**. Telefonannahme bleibt ausgeschlossen.
- Preise unverändert: 1.900 € Einrichtung + 99 € monatlich (3.088 € inkl. 12 Monate).
- Kontakt-Button „Per WhatsApp schreiben“ bleibt der Kontaktweg zu BP Agentics, nicht die Produktbeschreibung.
- Beispieldialog (LivingChat / Maschine) bleibt visuell ein WhatsApp-Dialog und ist als Beispiel gekennzeichnet.

## Nachzug: Angebot offen, Hero kürzer

- Keine Zielgruppe „Betriebe mit 5–20 Mitarbeitenden“ mehr in Hero, Metadaten, Check und `llms.txt`.
- Orientierung fragt nur noch, was leichter werden soll — nicht nach Teamgröße.
- Hero-Einstieg: kurzer Kicker, Überschrift, CTA und eine Zeile darunter. Langer Lead und Extra-Zeilen entfallen.
- Überschrift und Ankunftstext im Hero kleiner gesetzt.

## Nachzug: Hero-Text oben links

- Einstiegstext sitzt oben links, schmal genug, dass er die Frau im Bild nicht berührt.
- Button im Hero kurz: **Erstgespräch anfragen**.

## Nachzug: Stufen links, Websites und Software

- Kein extra Hintergrund hinter dem Einstiegstext.
- Schrift läuft als Stufen an einer linken Achse nach unten: **Websites**, dann **Software**.
- Positionierung: nicht nur Websites; Software steht gleichwertig daneben (Nachrichten und Abläufe).

## Geprüft

- `npx tsc --noEmit`: ohne Fehler.
- `npx eslint src`: bestehende Hook-Hinweise in unberührten Dateien (`consequence-reel`, `hero-sequence`, `reveal-*`); keine neuen Copy-bedingten Typfehler.
- Grep: keine Treffer mehr für Telefonannahme, 4.800/2.400, „Termin gebucht“, Preiskämpfer, Havarie-Demo, „Ihr Betrieb läuft. Nur digital nicht.“
- Buchung: `/api/termin` prüft keine Kalenderverfügbarkeit; Texte behandeln den Versand als Terminwunsch. Pflichtfelder unverändert. Honeypot unverändert. Kein Testversand an Sidia.

## Offene Geschäftsfragen (nicht durch Copy gelöst)

| Punkt | Stand |
|---|---|
| Sitz | Im Code Hagen, Kleiststraße 9 (`src/lib/site.ts`). Export-Lüdenscheid nicht übernommen. Lüdenscheid bleibt nur als bediente Region. |
| Paketabgrenzung Start/Betrieb/Signature | Keine Seitenzahlen, Foto-/Videoproduktion oder SEO als enthalten genannt. |
| 290-€-Betreuung Signature | Keine zusätzlichen Reports oder Optimierungen erfunden. |
| 24 Stunden Behebung | Bestehende Zusage belassen, nicht zu „Reaktion“ umbenannt. |
| 3 Werktage / 6 Wochen / 30 Min/Woche | Nicht als pauschale Garantie übernommen. |
| Assistenten-Kontingente und Fremdkosten | Nicht beziffert. |
| Laufzeit Automatisierung | Website-Regel nicht automatisch übertragen. |
| Status Feinkost Kreta | Als Projektbeispiel / Produktdemo, nicht als Echtbetrieb. |
| Team-Einweisung | Im Projektplan, nicht als enthaltene Schulungsfreiheit. |
| Datenschutz-Dienstweg | Hosting Deutschland genannt; keine pauschale EU-Garantie für alle Dienste. |

## Nicht eingeführt

- 20-Minuten-Telefon-Erstkontakt
- Neue Pakete, Rabatte, Kontingente, Garantien
- Öffentliches Deployment
- Zusätzliches Tracking
