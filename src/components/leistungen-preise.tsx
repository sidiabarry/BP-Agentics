"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RevealHeading } from "@/components/reveal-heading";
import { RevealIn } from "@/components/reveal-in";
import {
  PRICE_NOTE,
  catalogOffers,
  offerFamilies,
  offerInquiryHref,
  offersInFamily,
  websiteCare,
  websiteOwnership,
  type CatalogOffer,
  type OfferFamilyId,
  type OfferId,
} from "@/lib/offers";
import { cn } from "@/lib/utils";

export function LeistungenPreise({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  return (
    <section
      id={embedded ? undefined : "leistungen"}
      className={embedded ? "" : "scroll-mt-24 bg-[#F3EFE6] px-5 py-16 md:px-8"}
      aria-label="Leistungen und Preise"
    >
      <div
        id={embedded ? undefined : "preise"}
        className={cn("mx-auto max-w-6xl", !embedded && "scroll-mt-24")}
      >
        <RevealIn
          as="p"
          variant="kicker"
          className="text-sm tracking-[0.2em] text-[#198BE8] uppercase"
        >
          Leistungen und Preise
        </RevealIn>
        <RevealHeading className="mt-3 max-w-[22ch] text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.03em] md:text-5xl">
          Was brauchen Sie für Ihren Betrieb?
        </RevealHeading>
        <RevealIn
          as="p"
          variant="lead"
          className="mt-5 max-w-[42rem] text-[1.15rem] leading-relaxed text-[#3A3D45]"
        >
          Jeder Baustein ist einzeln beauftragbar. Einmalige Erstellung und
          monatliche Betreuung bleiben getrennt. Der verbindliche Umfang steht
          vor der Beauftragung im Angebot.
        </RevealIn>
        <div className="mt-10">
          <LeistungenPreisePicker />
        </div>
        {embedded ? null : (
          <p className="mt-8 text-[1.08rem]">
            <Link
              href="/preise#jahresrechnung"
              className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
            >
              Preise mit 12-Monats-Rechnung ansehen
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

function LeistungenPreisePicker() {
  const [family, setFamily] = useState<OfferFamilyId>("websites");
  const [selectedId, setSelectedId] = useState<OfferId>("start");
  const [careOn, setCareOn] = useState(false);
  const [focusedNode, setFocusedNode] = useState<string>("leistungen");
  const detailRef = useRef<HTMLDivElement>(null);
  const offer = catalogOffers.find((item) => item.id === selectedId) ?? catalogOffers[0];
  const familyOffers = offersInFamily(family);
  const familyMeta = offerFamilies.find((item) => item.id === family) ?? offerFamilies[0];

  function selectFamily(next: OfferFamilyId) {
    if (next === family) return;
    const first = offersInFamily(next)[0];
    setFamily(next);
    setSelectedId(first.id);
    setCareOn(false);
    setFocusedNode(first.structure[0]?.id ?? "");
  }

  function selectOffer(id: OfferId) {
    if (id === selectedId) return;
    const next = catalogOffers.find((item) => item.id === id);
    if (!next) return;
    setSelectedId(id);
    setCareOn(false);
    setFocusedNode(next.structure[0]?.id ?? "");
  }

  function scrollToDetails() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    detailRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <div>
      <FamilyTabs family={family} onChange={selectFamily} />

      {familyOffers.length > 1 ? (
        <>
          <div className="mt-6 lg:hidden">
            <PackageRows
              offers={familyOffers}
              selectedId={selectedId}
              onSelect={selectOffer}
            />
            <button
              type="button"
              onClick={scrollToDetails}
              className="mt-4 inline-flex min-h-11 items-center text-[1.02rem] font-semibold text-[#198BE8] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Paketdetails ansehen ↓
            </button>
          </div>
          <div className="mt-8 hidden lg:block">
            <PackageCards
              offers={familyOffers}
              selectedId={selectedId}
              onSelect={selectOffer}
            />
          </div>
        </>
      ) : (
        <SinglePackageIntro offer={offer} />
      )}

      <div
        ref={detailRef}
        id="paket-detail"
        className="mt-8 scroll-mt-24 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:items-start lg:gap-6"
      >
        <div className="space-y-5">
          <DifferenceList offer={offer} />
          <StructureTree
            offer={offer}
            focusedId={focusedNode}
            onFocusNode={setFocusedNode}
          />
          <p className="px-1 text-[1.02rem]">
            <Link
              href={familyMeta.href}
              className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
            >
              {familyMeta.linkLabel}
            </Link>
          </p>
        </div>
        <CostCard offer={offer} careOn={careOn} onCareChange={setCareOn} />
      </div>
    </div>
  );
}

function FamilyTabs({
  family,
  onChange,
}: {
  family: OfferFamilyId;
  onChange: (id: OfferFamilyId) => void;
}) {
  const labelId = useId();

  return (
    <div>
      <p id={labelId} className="sr-only">
        Leistungsbereich
      </p>
      <div
        role="tablist"
        aria-labelledby={labelId}
        className="flex gap-2 overflow-x-auto pb-1"
      >
        {offerFamilies.map((item) => {
          const on = item.id === family;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              id={`familie-${item.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => {
                const index = offerFamilies.findIndex((entry) => entry.id === family);
                const next =
                  event.key === "ArrowRight" || event.key === "ArrowDown"
                    ? offerFamilies[(index + 1) % offerFamilies.length]
                    : event.key === "ArrowLeft" || event.key === "ArrowUp"
                      ? offerFamilies[(index - 1 + offerFamilies.length) % offerFamilies.length]
                      : null;
                if (!next) return;
                event.preventDefault();
                onChange(next.id);
                document.getElementById(`familie-${next.id}`)?.focus();
              }}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-4 text-[1.02rem] font-semibold transition-colors duration-200 motion-reduce:transition-none",
                "focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-offset-2 focus-visible:outline-none",
                on
                  ? "bg-[#14161C] text-[#F3EFE6]"
                  : "bg-white text-[#3A3D45] hover:bg-[#EDE7DA]",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PackageCards({
  offers,
  selectedId,
  onSelect,
}: {
  offers: CatalogOffer[];
  selectedId: OfferId;
  onSelect: (id: OfferId) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Pakete"
      className="grid items-stretch gap-4 lg:grid-cols-3"
    >
      {offers.map((offer) => {
        const on = offer.id === selectedId;
        return (
          <button
            key={offer.id}
            type="button"
            role="radio"
            aria-checked={on}
            id={`paket-${offer.id}`}
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(offer.id)}
            onKeyDown={(event) => handlePackageKeys(event, offers, selectedId, onSelect)}
            className={cn(
              "flex h-full flex-col rounded-[1.6rem] border-2 bg-white p-6 text-left transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none",
              "focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-offset-2 focus-visible:outline-none",
              on
                ? "border-[#2F7D4A] shadow-[0_12px_32px_-20px_rgba(47,125,74,0.65)]"
                : "border-transparent hover:border-black/10",
            )}
          >
            <span className="min-h-[1.25rem] text-sm text-[#198BE8]">
              {offer.badge ?? "\u00a0"}
            </span>
            <span className="mt-1 flex items-start justify-between gap-3">
              <span className="text-xl leading-snug font-semibold">{offer.name}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                  on ? "border-[#2F7D4A] bg-[#2F7D4A] text-white" : "border-black/20 bg-white",
                )}
              >
                {on ? (
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 6.2 4.8 8.5 9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
            </span>
            <span className="mt-3 text-3xl font-semibold whitespace-nowrap">{offer.once}</span>
            <span className="mt-1 text-[0.98rem] text-[#5C5F66]">einmalige Erstellung</span>
            <span className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-[#3A3D45]">
              {offer.body}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PackageRows({
  offers,
  selectedId,
  onSelect,
}: {
  offers: CatalogOffer[];
  selectedId: OfferId;
  onSelect: (id: OfferId) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Pakete"
      className="divide-y divide-black/10 overflow-hidden rounded-[1.6rem] bg-white"
    >
      {offers.map((offer) => {
        const on = offer.id === selectedId;
        return (
          <button
            key={offer.id}
            type="button"
            role="radio"
            aria-checked={on}
            id={`paket-row-${offer.id}`}
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(offer.id)}
            onKeyDown={(event) => handlePackageKeys(event, offers, selectedId, onSelect)}
            className={cn(
              "grid min-h-11 w-full gap-1 px-5 py-4 text-left sm:grid-cols-[minmax(0,1.1fr)_auto] sm:items-baseline sm:gap-6",
              "focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-inset focus-visible:outline-none",
              on ? "bg-[#EAF6EE]" : "bg-white",
            )}
          >
            <span className="flex items-center gap-2 font-semibold tracking-[-0.02em]">
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex size-4 shrink-0 items-center justify-center rounded-full border-2",
                  on ? "border-[#2F7D4A] bg-[#2F7D4A]" : "border-black/25",
                )}
              />
              {offer.name}
            </span>
            <span className="whitespace-nowrap font-semibold">{offer.once}</span>
          </button>
        );
      })}
    </div>
  );
}

function handlePackageKeys(
  event: KeyboardEvent<HTMLButtonElement>,
  offers: CatalogOffer[],
  selectedId: OfferId,
  onSelect: (id: OfferId) => void,
) {
  const index = offers.findIndex((item) => item.id === selectedId);
  const next =
    event.key === "ArrowRight" || event.key === "ArrowDown"
      ? offers[(index + 1) % offers.length]
      : event.key === "ArrowLeft" || event.key === "ArrowUp"
        ? offers[(index - 1 + offers.length) % offers.length]
        : event.key === "Home"
          ? offers[0]
          : event.key === "End"
            ? offers[offers.length - 1]
            : null;
  if (!next) return;
  event.preventDefault();
  onSelect(next.id);
  const group = event.currentTarget.closest("[role='radiogroup']");
  const target = group?.querySelector<HTMLButtonElement>(`#${event.currentTarget.id.replace(selectedId, next.id)}`);
  target?.focus();
}

function SinglePackageIntro({ offer }: { offer: CatalogOffer }) {
  return (
    <article className="mt-6 rounded-[1.6rem] bg-white p-6 md:p-8">
      <h3 className="text-2xl font-semibold tracking-[-0.02em]">{offer.name}</h3>
      <p className="mt-2 text-3xl font-semibold">{offer.once}</p>
      <p className="mt-1 text-[1.02rem] text-[#5C5F66]">{offer.run}</p>
      <p className="mt-4 max-w-[40rem] text-[1.08rem] leading-relaxed text-[#3A3D45]">
        {offer.body}
      </p>
    </article>
  );
}

function DifferenceList({ offer }: { offer: CatalogOffer }) {
  return (
    <ul className="rounded-[1.6rem] bg-white px-6 py-5 md:px-7">
      {offer.differences.map((item) => (
        <li
          key={item}
          className="border-t border-black/8 py-2.5 text-[1.05rem] first:border-t-0 first:pt-0 last:pb-0"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function StructureTree({
  offer,
  focusedId,
  onFocusNode,
}: {
  offer: CatalogOffer;
  focusedId: string;
  onFocusNode: (id: string) => void;
}) {
  return (
    <div className="rounded-[1.6rem] bg-white p-6 md:p-8">
      <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">Aufbau</p>
      <h3 className="mt-2 text-[1.45rem] leading-snug font-semibold tracking-[-0.02em] md:text-[1.7rem]">
        {offer.structureTitle}
      </h3>
      <p className="mt-2 text-[1.05rem] leading-relaxed text-[#5C5F66]">
        {offer.structureCaption}
      </p>
      <ol className="mt-6">
        {offer.structure.map((node, index) => {
          const on = node.id === focusedId;
          const last = index === offer.structure.length - 1;
          return (
            <li key={node.id} className="relative pl-8">
              {last ? null : (
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-[7px] h-[calc(100%-0.35rem)] w-px bg-black/12"
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-2 left-0 size-4 rounded-full border-2 bg-white",
                  on ? "border-[#2F7D4A]" : "border-black/25",
                )}
              />
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onFocusNode(node.id)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md py-1 text-left text-[1.08rem] font-semibold tracking-[-0.02em]",
                  "focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-offset-2 focus-visible:outline-none",
                  on ? "text-[#14161C]" : "text-[#3A3D45]",
                )}
              >
                {node.label}
              </button>
              {node.hint ? (
                <p className="pb-4 text-[0.98rem] leading-relaxed text-[#5C5F66]">
                  {node.hint}
                </p>
              ) : (
                <div className={last ? "" : "pb-4"} />
              )}
            </li>
          );
        })}
      </ol>
      {offer.structureLink ? (
        <p className="mt-2 text-[1.02rem] text-[#3A3D45]">
          <Link
            href={offer.structureLink.href}
            className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
          >
            {offer.structureLink.label}
          </Link>
          <span className="text-[#5C5F66]"> — {offer.structureLink.note}</span>
        </p>
      ) : null}
    </div>
  );
}

function CostCard({
  offer,
  careOn,
  onCareChange,
}: {
  offer: CatalogOffer;
  careOn: boolean;
  onCareChange: (value: boolean) => void;
}) {
  const optionalOn = offer.care === "optional" && careOn;
  const monthLine =
    offer.care === "required"
      ? `${offer.month} monatlich`
      : offer.care === "none"
        ? offer.run
        : optionalOn
          ? `${offer.month} monatlich`
          : "nicht gewählt";

  return (
    <aside className="mt-5 rounded-[1.6rem] bg-[#14161C] p-6 text-[#F3EFE6] lg:sticky lg:top-24 lg:mt-0 lg:p-7">
      <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">Kosten</p>
      <h3 className="mt-2 text-[1.35rem] leading-snug font-semibold">{offer.name}</h3>
      <div aria-live="polite">
        <p className="mt-4 text-4xl font-semibold tracking-[-0.03em]">{offer.once}</p>
        <p className="mt-1 text-[1.02rem] text-white/70">einmalige Erstellung</p>
        <p className="mt-4 text-[1.08rem]">
          <span className="text-white/60">Monatlich: </span>
          <span>{monthLine}</span>
        </p>
      </div>

      {offer.care === "optional" ? (
        <CareToggle
          checked={careOn}
          month={offer.month}
          onChange={onCareChange}
        />
      ) : null}

      {offer.care === "required" ? (
        <p className="mt-4 text-[0.98rem] leading-relaxed text-white/70">
          Einrichtung und monatliche Betreuung gehören bei diesem Angebot zusammen.
        </p>
      ) : null}

      {offer.care === "none" ? (
        <p className="mt-4 text-[0.98rem] leading-relaxed text-white/70">
          Eine monatliche Betreuung ist in diesem Einstieg nicht enthalten.
        </p>
      ) : null}

      {offer.care === "optional" ? (
        <Accordion type="single" collapsible className="mt-5 border-t border-white/10 pt-2">
          <AccordionItem value="betreuung" className="border-white/10">
            <AccordionTrigger className="text-[1.02rem] text-[#F3EFE6] hover:no-underline hover:text-white **:data-[slot=accordion-trigger-icon]:text-white/70">
              Was die Betreuung umfasst
            </AccordionTrigger>
            <AccordionContent className="text-[0.98rem] leading-relaxed text-white/75 [&_a]:text-[#9FD0F8]">
              <p>
                Die Betreuung ist optional. Wird sie gewählt, gilt eine
                Mindestlaufzeit von 12 Monaten.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {websiteCare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}

      <Link
        href={offerInquiryHref(offer.id, careOn)}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#2F7D4A] px-5 text-center text-[1.05rem] font-semibold text-white transition-colors hover:bg-[#276840] focus-visible:ring-2 focus-visible:ring-[#9FD0F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14161C] focus-visible:outline-none"
      >
        {offer.inquiryLabel}
      </Link>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-white/55">
        Sie senden einen Terminwunsch. Der Termin wird anschließend persönlich
        bestätigt.
      </p>
      <p className="mt-3 text-[0.88rem] leading-relaxed text-white/45">{PRICE_NOTE}</p>
    </aside>
  );
}

function CareToggle({
  checked,
  month,
  onChange,
}: {
  checked: boolean;
  month: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="mt-5 rounded-[1.1rem] bg-white/8 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[1.02rem] leading-snug">
          Monatliche Betreuung
          <span className="mt-1 block text-[0.92rem] text-white/60">
            {month} · optional
          </span>
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={cn(
            "relative inline-flex h-11 w-14 shrink-0 items-center justify-center rounded-full",
            "focus-visible:ring-2 focus-visible:ring-[#9FD0F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14161C] focus-visible:outline-none",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "relative h-7 w-12 rounded-full transition-colors duration-200 motion-reduce:transition-none",
              checked ? "bg-[#2F7D4A]" : "bg-white/25",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-6 rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none",
                checked && "translate-x-5",
              )}
            />
          </span>
          <span className="sr-only">Monatliche Betreuung {checked ? "gewählt" : "nicht gewählt"}</span>
        </button>
      </div>
    </div>
  );
}

export function CareAndOwnership() {
  return (
    <div className="mt-10 space-y-4 rounded-[1.6rem] bg-white p-7 md:p-8">
      <div>
        <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
          Was nach der Einrichtung dazugehört
        </p>
        <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
          Bei Websites ist die monatliche Betreuung optional. Wird sie gewählt,
          deckt sie Hosting, Sicherheitsupdates, Backups und die vereinbarten
          Inhaltsänderungen ab.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-[1.05rem] text-[#3A3D45]">
          {websiteCare.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="border-t border-black/10 pt-4">
        <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
          Ihre Website: übergeben oder weiter betreuen
        </p>
        <p className="mt-3 text-[1.08rem] leading-relaxed text-[#3A3D45]">
          {websiteOwnership} Für interne Systeme und den Assistenten gilt die
          Laufzeit, die im jeweiligen Angebot steht.
        </p>
      </div>
    </div>
  );
}
