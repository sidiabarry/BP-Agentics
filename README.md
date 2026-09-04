# BP Agentics

Signature-Website für **BP Agentics** in Hagen: Websites und Betriebssysteme für mittelständische Betriebe, die noch mit Telefon, Zetteln und Excel arbeiten.

Die Startseite ist als Scroll-Choreografie gebaut. Die Hero-Sequenz liegt unter `public/hero/` (71 Desktop-Frames, 48 Mobil-Frames). Die Kamera fährt per Scroll in das Smartphone. Am Ende des Shots liegt der Bildschirm voll im Viewport; die Fläche darunter übernimmt die Austrittsfarbe `--hero-exit`. `prefers-reduced-motion` zeigt nur das Poster.

## Lokal starten

```bash
npm install
npm run dev -- --hostname 127.0.0.1 --port 43123
```

Dann http://127.0.0.1:43123 öffnen.

## Was enthalten ist

- Startseite mit Bildsequenz-Scroll, Problemwand, Gewerke-Selektor, Leistungen, scroll-gesteuertem Setter-Chat, Büro-Folie ohne System (drei Higgsfield-Clips), Ablauf, Preisen, Schnell-Check und FAQ
- Branchenseiten unter `/dachdecker`, `/shk-haustechnik`, `/elektrotechnik`, `/kaeltetechnik`, `/spedition-container`, `/galabau`, `/metallbau`, `/nutzfahrzeuge`
- Terminbuchung unter `/termin` (Name, Telefon, Betrieb, Wunschtermin; öffnet eine vorausgefüllte Mail an Sidia)
- Impressum und Datenschutz

Texte folgen der Website-Konzeption für bpagentics.com. Die Hero-Sequenz stammt aus der Higgsfield-Produktion vom 3. September 2026.

## Hinweis zu Preisen

Ausgewiesene Beträge sind Endpreise. Der Hinweis nach § 19 UStG steht im Impressum und auf der Rechnung.
