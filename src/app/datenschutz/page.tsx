import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <div className="bg-[#F3EFE6]">
      <SiteHeader tone="light" />
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-24 text-[1.08rem] leading-relaxed md:px-8">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Datenschutz</h1>
        <p className="mt-8">
          Verantwortlich: {site.name}, {site.owner}, {site.city}, {site.email}.
        </p>
        <h2 className="mt-10 text-2xl font-semibold">Welche Daten wir auf dieser Seite verarbeiten</h2>
        <p className="mt-4">
          Die Website speichert keine Nutzerkonten. Wenn Sie das Erstgespräch
          anfragen, senden Sie Name, Telefon, Betriebsname, Wunschtermin und
          optional eine Notiz. Diese Angaben dienen ausschließlich der
          Terminvereinbarung.
        </p>
        <h2 className="mt-10 text-2xl font-semibold">Server und Standort</h2>
        <p className="mt-4">
          Produktionsdaten der Systeme, die wir für Betriebe bauen, liegen auf
          Servern in der Europäischen Union. Zu jedem Projekt gehört ein
          Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
        </p>
        <h2 className="mt-10 text-2xl font-semibold">Ihre Rechte</h2>
        <p className="mt-4">
          Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und
          Widerspruch. Schreiben Sie an {site.email}. Sie können sich bei einer
          Aufsichtsbehörde beschweren.
        </p>
      </main>
    </div>
  );
}
