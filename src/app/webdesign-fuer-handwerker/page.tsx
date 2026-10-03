import type { Metadata } from "next";
import Link from "next/link";
import { PageFaqs } from "@/components/page-faqs";
import { StageCard } from "@/components/stage-blocks";
import { StagePage } from "@/components/stage-page";
import { feinkostStores } from "@/lib/feinkost";
import { faqPage } from "@/lib/json-ld";
import { industryList } from "@/lib/content";
import { PRICE_NOTE, cta, websitePackages, whatsappOffer } from "@/lib/offers";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/webdesign-fuer-handwerker";
const title = "Webdesign für Handwerker in NRW: BP Agentics aus Hagen";
const description =
  "BP Agentics aus Hagen erstellt Websites für Handwerksbetriebe in NRW: Einseiter 690 €, mehrseitig 1.790 €, Signature ab 3.490 €. Festpreis, Website gehört Ihnen.";

const [start, betrieb, signature] = websitePackages;

const tiers = [
  {
    name: start.name,
    once: start.once,
    who: "Kompakter Einseiter mit den Abschnitten Leistungen, Betrieb und Kontakt und einem Weg zur Anfrage",
    care: `${start.month} monatlich`,
    year: start.year,
  },
  {
    name: betrieb.name,
    once: betrieb.once,
    who: "Mehrseitige Website mit Raum für einzelne Leistungen und Referenzen",
    care: `${betrieb.month} monatlich`,
    year: betrieb.year,
  },
  {
    name: signature.name,
    once: signature.once,
    who: "Individuell gestalteter Auftritt mit besonderer Bild- und Bewegungsführung",
    care: `${signature.month} monatlich`,
    year: signature.year,
  },
] as const;

const webdesignFaqs = [
  {
    q: "Welche Agentur macht Websites für Handwerksbetriebe in NRW?",
    a: "Zum Beispiel BP Agentics aus Hagen. Die Agentur erstellt Websites für Handwerksbetriebe und kleine Unternehmen in ganz Nordrhein-Westfalen, zu festen Preisen von 690 € (Einseiter) über 1.790 € (mehrseitig) bis ab 3.490 € (Signature). Das erste Gespräch dauert 90 Minuten, findet bei Ihnen vor Ort statt und ist kostenlos.",
  },
  {
    q: "Was kostet eine Website für meinen Handwerksbetrieb?",
    a: "Website Start kostet 690 € einmalig, Website Betrieb 1.790 € und Website Signature ab 3.490 €. Hosting und Pflege können Sie selbst übernehmen oder optional bei BP Agentics buchen: 149 € monatlich bei Start und Betrieb, 290 € bei Signature. Alle Preise sind Endpreise nach § 19 UStG.",
  },
  {
    q: "Gehört mir die Website danach?",
    a: "Ja. Nach Zahlung der Erstellung gehört Ihnen die Website. Sie können die vereinbarten Dateien übernehmen und Hosting sowie Updates selbst tragen. Alternativ übernimmt BP Agentics Hosting und Pflege gegen die optionale monatliche Betreuung.",
  },
  {
    q: "Muss ich einen Betreuungsvertrag abschließen?",
    a: "Nein, die Betreuung ist optional. Wenn Sie sie wählen, gilt eine Mindestlaufzeit von zwölf Monaten, danach ist sie monatlich kündbar. Sie umfasst Hosting in Deutschland mit SSL, Sicherheitsupdates, tägliche Backups, bis zu drei Textänderungen im Monat und Störungsbehebung innerhalb von 24 Stunden an Werktagen.",
  },
  {
    q: "Welche Stufe passt zu meinem Betrieb?",
    a: "Für einen klaren Überblick über Leistungen, Betrieb und Kontakt reicht oft der Einseiter. Wenn Sie mehrere Leistungen und Referenzen einzeln zeigen wollen, passt Website Betrieb. Signature ist für einen individuell gestalteten Auftritt gedacht. Den genauen Umfang legen wir im Gespräch fest und halten ihn im Angebot fest.",
  },
  {
    q: "Wie läuft das erste Gespräch ab und was kostet es?",
    a: "Das Erstgespräch ist kostenlos, dauert 90 Minuten und findet bei Ihnen vor Ort statt. Sie senden einen Terminwunsch, ich melde mich und bestätige den Termin persönlich. Danach erhalten Sie ein Angebot mit Leistungsumfang, einmaligem Preis und laufenden Kosten.",
  },
  {
    q: "Gibt es eine Förderung für die Website?",
    a: "Das Förderprogramm MID-Digitale Prozesse in NRW unterstützt bestimmte Beratungsleistungen zur Digitalisierung interner Prozesse. Es ist keine pauschale Förderung der Website-Pakete. Details und offizielle Quellen stehen auf der Förderseite von BP Agentics.",
  },
] as const;

export const metadata: Metadata = pageMetadata({
  title: "Webdesign für Handwerker in NRW – ab 690 €",
  description,
  path,
});

export default function WebdesignFuerHandwerkerPage() {
  return (
    <StagePage
      kicker="Websites"
      title={title}
      lead="BP Agentics ist eine inhabergeführte Agentur aus Hagen, die Websites für Handwerksbetriebe in Nordrhein-Westfalen erstellt. Es gibt drei Stufen zum Festpreis: einen Einseiter für 690 €, eine mehrseitige Website für 1.790 € und eine individuell gestaltete Website Signature ab 3.490 €. Nach Zahlung gehört die Website Ihnen. Hosting und Pflege sind optional. Am Anfang steht ein kostenloses Gespräch von 90 Minuten bei Ihnen vor Ort."
      jsonLdDescription={description}
      aboutId={`${site.url}/leistungen/auftritt#service`}
      crumbs={[
        { name: "Leistungen", path: "/leistungen" },
        { name: "Webdesign für Handwerker", path },
      ]}
      extraJsonLd={[faqPage([...webdesignFaqs])]}
      related={[
        { href: "/leistungen/auftritt", label: "Website-Pakete ansehen" },
        { href: "/preise", label: "Preise" },
        { href: "/gewerke", label: "Gewerke" },
        { href: "/leistungen/annahme", label: "Nachrichten-Assistent ansehen" },
      ]}
      next={{
        title: "Welche Stufe zu Ihrem Betrieb passt, klären wir vor Ort.",
        body: "Im kostenlosen Gespräch von 90 Minuten bei Ihnen vor Ort klären wir Leistungen, vorhandene Inhalte und den Weg zur Anfrage.",
        primary: { href: cta.href, label: "Kostenloses Erstgespräch anfragen" },
        secondary: { href: site.whatsappUrl, label: "Per WhatsApp schreiben" },
      }}
    >
      <p className="text-[1.05rem] leading-relaxed text-[#3A3D45]">
        Ansprechpartner ist {site.founder.name}, Inhaber von {site.name}, {site.streetAddress},{" "}
        {site.postalCode} {site.addressLocality}.
      </p>

      <section className="mt-12" aria-labelledby="fuer-wen">
        <h2 id="fuer-wen" className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          Für wen diese Websites gedacht sind
        </h2>
        <p className="mt-4 max-w-[44rem] text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Für Handwerksbetriebe und kleine Unternehmen in NRW, die online zeigen wollen, welche
          Arbeiten sie übernehmen, in welchem Gebiet sie arbeiten und wie man sie erreicht. Auf
          bpagentics.com gibt es Anwendungsbeispiele für diese Gewerke:
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {industryList.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${item.slug}`}
                className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-[44rem] text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Die Gespräche finden vor Ort in Nordrhein-Westfalen statt, zum Beispiel in Hagen,
          Iserlohn, Lüdenscheid, Witten, Schwelm, im Ennepe-Ruhr-Kreis und im Märkischen Kreis.
          Das sind Anwendungsbeispiele, keine Referenzen. Welche Website passt, hängt von Ihren
          Leistungen und den Inhalten ab, die schon vorliegen.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="leisten">
        <h2 id="leisten" className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          Was eine Handwerker-Website leisten soll
        </h2>
        <p className="mt-4 max-w-[44rem] text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Eine Website für einen Handwerksbetrieb muss nicht viel können, aber drei Dinge
          zuverlässig:
        </p>
        <ol className="mt-4 grid list-none gap-3 p-0 md:grid-cols-3">
          {[
            {
              title: "Leistungen und Referenzen zeigen.",
              body: "Interessenten erkennen, welche Arbeiten Sie übernehmen.",
            },
            {
              title: "Das Einsatzgebiet klarmachen.",
              body: "Wer sucht, sieht, ob Sie in seiner Gegend arbeiten.",
            },
            {
              title: "Einen klaren Weg zur Anfrage bieten.",
              body: "Kontakt aufnehmen soll ohne Umwege möglich sein.",
            },
          ].map((item, index) => (
            <li key={item.title} className="rounded-[1.4rem] bg-white p-5">
              <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">0{index + 1}</p>
              <p className="mt-2 font-semibold">{item.title}</p>
              <p className="mt-2 text-[1.02rem] leading-relaxed text-[#3A3D45]">{item.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-[44rem] text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Eine klare Anfragemöglichkeit gehört bei BP Agentics zu jeder Website, egal welche Stufe.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="stufen">
        <h2 id="stufen" className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          Drei Stufen, feste Preise
        </h2>
        <div className="mt-6 grid gap-4 md:hidden">
          {tiers.map((tier) => (
            <article key={tier.name} className="rounded-[1.4rem] bg-white p-5">
              <p className="text-lg font-semibold">{tier.name}</p>
              <p className="mt-2 text-2xl font-semibold">{tier.once}</p>
              <p className="mt-2 text-[1.02rem] leading-relaxed text-[#3A3D45]">{tier.who}</p>
              <p className="mt-3 text-[0.98rem] text-[#5C5F66]">
                Optionale Betreuung: {tier.care}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-6 hidden overflow-x-auto rounded-[1.6rem] bg-white md:block">
          <table className="w-full border-collapse text-left text-[1.02rem]">
            <caption className="sr-only">Website-Stufen mit Festpreis und optionaler Betreuung</caption>
            <thead>
              <tr className="border-b border-black/10 bg-[#EDE7DA]">
                {["Stufe", "Einmalig", "Für wen", "Optionale Betreuung"].map((header) => (
                  <th key={header} scope="col" className="px-5 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr key={tier.name} className="border-b border-black/5 align-top">
                  <th scope="row" className="px-5 py-4 font-medium">
                    {tier.name}
                  </th>
                  <td className="px-5 py-4 whitespace-nowrap text-[#3A3D45]">{tier.once}</td>
                  <td className="px-5 py-4 text-[#3A3D45]">{tier.who}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-[#3A3D45]">{tier.care}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 max-w-[46rem] space-y-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
          <p>{PRICE_NOTE}</p>
          <p>
            Mit zwölf Monaten Betreuung kommen Sie auf {start.year} (Start), {betrieb.year}{" "}
            (Betrieb) oder {signature.year} (Signature). Diese Rechnung gilt nur, wenn Sie die
            Betreuung wählen. Die komplette Übersicht steht auf der{" "}
            <Link href="/preise" className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
              Preisseite
            </Link>
            , die Paketdetails unter{" "}
            <Link
              href="/leistungen/auftritt"
              className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
            >
              Websites
            </Link>
            .
          </p>
          <p>
            Welche Stufe passt, hängt davon ab, wie viele Leistungen und Projekte Sie zeigen wollen
            und welche Inhalte schon da sind. Den genauen Umfang halten wir im Angebot fest.
          </p>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="im-preis">
        <h2 id="im-preis" className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          Was im Preis steht und was optional ist
        </h2>
        <div className="mt-6 grid gap-4">
          <StageCard title="Im Angebot">
            <p>
              Welche Seiten, Texte, Bilder und Funktionen umgesetzt werden, dazu Zeitrahmen und
              Festpreis. Zusätzliche Wünsche bieten wir vor der Umsetzung gesondert an.
              Nutzungsrechte an fremden Medien oder Diensten stehen einzeln im Angebot.
            </p>
          </StageCard>
          <StageCard title="Die Website gehört Ihnen.">
            <p>
              Nach Zahlung der Erstellung können Sie die vereinbarten Dateien übernehmen und
              Hosting, Sicherheitsupdates und den laufenden Betrieb selbst tragen.
            </p>
          </StageCard>
          <StageCard title="Optionale Betreuung">
            <p>
              Hosting in Deutschland mit SSL, Sicherheitsupdates, tägliche Backups, bis zu drei
              Textänderungen pro Monat und Störungsbehebung innerhalb von 24 Stunden an Werktagen.
              Wenn Sie die Betreuung wählen, beträgt die Mindestlaufzeit zwölf Monate. Danach ist
              sie monatlich kündbar.
            </p>
          </StageCard>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="ablauf">
        <h2 id="ablauf" className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          So läuft ein Website-Projekt ab
        </h2>
        <ol className="mt-6 grid list-none gap-4 p-0">
          {[
            {
              title: "Kennenlernen vor Ort.",
              body: "Im kostenlosen Gespräch von 90 Minuten sehen wir uns an, wie Anfragen heute in Ihren Betrieb kommen und was die Website leisten soll. Sie senden über das Formular zunächst einen Terminwunsch, den ich persönlich bestätige.",
            },
            {
              title: "Umfang und Preis festhalten.",
              body: "Sie erhalten einen Projektplan mit den vereinbarten Leistungen, einem Zeitrahmen und einem Festpreis.",
            },
            {
              title: "Einrichten und übergeben.",
              body: "Die Website wird für den vereinbarten Einsatz eingerichtet. Wie die Übergabe an Ihr Team aussieht, steht im Projektplan.",
            },
            {
              title: "Laufend betreuen, wenn Sie möchten.",
              body: "Hosting und Pflege richten sich nach dem gewählten Angebot. Die laufenden Kosten sehen Sie vor der Beauftragung.",
            },
          ].map((step, index) => (
            <li key={step.title} className="rounded-[1.4rem] bg-white p-5 md:p-6">
              <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">0{index + 1}</p>
              <p className="mt-2 text-lg font-semibold">{step.title}</p>
              <p className="mt-2 text-[1.05rem] leading-relaxed text-[#3A3D45]">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-[44rem] text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Während der Umsetzung sprechen Sie direkt mit mir, nicht mit wechselnden
          Ansprechpartnern.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="ansehen">
        <h2 id="ansehen" className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          Was man sich ansehen kann
        </h2>
        <div className="mt-6 grid gap-4">
          <StageCard kicker="Kundenprojekt" title="Feinkost Kreta">
            <p>
              Für Feinkost Kreta hat BP Agentics eine Bestell-App entwickelt. Stammkunden bestellen
              angemeldet in wenigen Schritten, ihre Angaben bleiben gespeichert, und der Betrieb
              wird über jede Bestellung benachrichtigt. Für Olivenöl gibt es eine automatische
              Erinnerung nach etwa sechs Monaten. Die App ist im{" "}
              <a
                href={feinkostStores.googlePlay}
                className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
              >
                Google Play Store
              </a>{" "}
              und im{" "}
              <a
                href={feinkostStores.appStore}
                className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
              >
                App Store
              </a>{" "}
              verfügbar. Das Projekt ist eine App, keine Handwerker-Website. Es zeigt, wie BP
              Agentics einen Bestell- und Anfrageweg für einen echten Betrieb umsetzt.
            </p>
            <p className="mt-3">
              <Link
                href="/referenzen/feinkost-kreta"
                className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
              >
                Projekt Feinkost Kreta ansehen
              </Link>
            </p>
          </StageCard>
          <StageCard kicker="Produktdemo" title="Dachdecker, Website Signature">
            <p>
              Die Demo zeigt eine mögliche Gestaltung für einen Dachdeckerbetrieb mit Bildern,
              Leistungsbeschreibung und Anfrageweg. Sie ist eine Demo und kein Echtbetrieb.
            </p>
            <p className="mt-3">
              <Link
                href="/referenzen/dachdecker-signature"
                className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
              >
                Website-Demo ansehen
              </Link>
            </p>
          </StageCard>
        </div>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Wir nennen keine Umsatzzahlen und keine erfundenen Ergebnisse.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="ergaenzung">
        <h2 id="ergaenzung" className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          Ergänzung: Anfragen per WhatsApp und E-Mail
        </h2>
        <p className="mt-4 max-w-[44rem] text-[1.05rem] leading-relaxed text-[#3A3D45]">
          Wenn Anfragen vor allem per WhatsApp oder E-Mail kommen, lässt sich die Website mit dem
          Nachrichten-Assistenten ergänzen. Er beantwortet Nachrichten, fragt die vereinbarten
          Angaben zum Vorhaben ab und bietet Termine aus Ihrem angebundenen Kalender an. Er
          bearbeitet Textnachrichten, keine Telefonanrufe. Preis: {whatsappOffer.once} Einrichtung
          plus {whatsappOffer.month} monatlich, also {whatsappOffer.year} für Einrichtung und zwölf
          Monate Betrieb. Website und Assistent sind einzeln beauftragbar.
        </p>
        <p className="mt-3">
          <Link
            href="/leistungen/annahme"
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            Nachrichten-Assistent ansehen
          </Link>
        </p>
      </section>

      <PageFaqs items={[...webdesignFaqs]} />

      <p className="mt-8 text-[1.05rem] leading-relaxed text-[#3A3D45]">
        Telefon{" "}
        <a href={`tel:${site.phoneTel}`} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          {site.phoneDisplay}
        </a>
        {" · "}
        <a href={`mailto:${site.email}`} className="font-semibold text-[#198BE8] underline-offset-4 hover:underline">
          {site.email}
        </a>
        {" · "}
        <Link href="/foerderung/mid-digitale-prozesse" className="text-[#198BE8] underline-offset-4 hover:underline">
          Förderseite
        </Link>
      </p>
    </StagePage>
  );
}
