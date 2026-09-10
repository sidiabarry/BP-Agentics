"use client";

import { useId, useState, type KeyboardEvent } from "react";
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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const offer = catalogOffers.find((item) => item.id === selectedId) ?? catalogOffers[0];
  const familyOffers = offersInFamily(family);
  const familyMeta = offerFamilies.find((item) => item.id === family) ?? offerFamilies[0];
  const multi = familyOffers.length > 1;

  function selectFamily(next: OfferFamilyId) {
    if (next === family) return;
    const first = offersInFamily(next)[0];
    setFamily(next);
    setSelectedId(first.id);
    setCareOn(false);
    setFocusedNode(first.structure[0]?.id ?? "");
    setDetailsOpen(false);
  }

  function selectOffer(id: OfferId) {
    if (id === selectedId) return;
    const next = catalogOffers.find((item) => item.id === id);
    if (!next) return;
    setSelectedId(id);
    setCareOn(false);
    setFocusedNode(next.structure[0]?.id ?? "");
  }

  return (
    <div className="lg:rounded-[2rem] lg:border lg:border-black/10 lg:bg-[#EDE7DA] lg:p-6">
      <FamilyTabs family={family} onChange={selectFamily} />

      {multi ? (
        <>
          <div className="mt-6 lg:hidden">
            <MobilePackageCards
              offers={familyOffers}
              selectedId={selectedId}
              onSelect={selectOffer}
            />
          </div>
          <div className="mt-5 hidden lg:block">
            <PackageCards
              offers={familyOffers}
              selectedId={selectedId}
              onSelect={selectOffer}
            />
          </div>
        </>
      ) : null}

      <div className="mt-5 flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1.7fr)_minmax(20rem,1fr)] lg:items-start lg:gap-5">
        <CostCard
          offer={offer}
          careOn={careOn}
          onCareChange={setCareOn}
          className="lg:col-start-2 lg:row-start-1"
        />
        <div className="lg:col-start-1 lg:row-start-1">
          <button
            type="button"
            aria-expanded={detailsOpen}
            aria-controls="paket-detail"
            onClick={() => setDetailsOpen((open) => !open)}
            className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-white px-5 text-[1.12rem] font-semibold text-[#198BE8] shadow-[0_10px_28px_-20px_rgba(20,22,28,0.55)] lg:hidden focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {detailsOpen ? "Paketdetails schließen" : "Paketdetails ansehen"}
          </button>
          <div
            id="paket-detail"
            className={cn("scroll-mt-24 max-lg:mt-4", !detailsOpen && "max-lg:hidden")}
          >
            <DetailPanel
              offer={offer}
              focusedId={focusedNode}
              onFocusNode={setFocusedNode}
              familyHref={familyMeta.href}
              familyLinkLabel={familyMeta.linkLabel}
              showLead={!multi}
            />
          </div>
        </div>
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
        className="grid w-full grid-cols-3 rounded-[1.2rem] bg-white p-1.5 shadow-[0_12px_32px_-24px_rgba(20,22,28,0.55)] lg:rounded-full"
      >
        {offerFamilies.map((item) => {
          const on = item.id === family;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-label={item.label}
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
                "inline-flex min-h-13 min-w-0 items-center justify-center px-1 text-center text-[1.12rem] leading-none font-semibold tracking-[-0.02em] whitespace-nowrap lg:rounded-full lg:px-3 lg:text-[1.05rem]",
                "rounded-[0.9rem] transition-colors duration-200 motion-reduce:transition-none",
                "focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-offset-2 focus-visible:outline-none",
                on ? "bg-[#14161C] text-[#F3EFE6]" : "text-[#3A3D45] hover:bg-[#F3EFE6]",
              )}
            >
              <span className="lg:hidden">{item.shortLabel}</span>
              <span className="hidden lg:inline">{item.label}</span>
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
      className="grid items-stretch gap-3 lg:grid-cols-3"
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
              "relative flex h-full flex-col rounded-[1.4rem] border bg-white p-5 text-left",
              "transition-[border-color,box-shadow,background-color] duration-200 motion-reduce:transition-none",
              "focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-offset-2 focus-visible:outline-none",
              on
                ? "border-[#2F7D4A] bg-[#F4FBF6] shadow-[0_16px_36px_-20px_rgba(47,125,74,0.55)]"
                : "border-black/10 hover:border-black/20",
            )}
          >
            {on ? (
              <span aria-hidden="true" className="absolute inset-y-3 left-0 w-1 rounded-full bg-[#2F7D4A]" />
            ) : null}
            {offer.badge ? (
              <span className="text-sm text-[#198BE8]">{offer.badge}</span>
            ) : null}
            <span className={cn("flex items-start justify-between gap-3", offer.badge && "mt-1")}>
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

function MobilePackageCards({
  offers,
  selectedId,
  onSelect,
}: {
  offers: CatalogOffer[];
  selectedId: OfferId;
  onSelect: (id: OfferId) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Pakete" className="flex flex-col gap-4">
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
              "relative w-full overflow-hidden rounded-[1.6rem] border-2 bg-white px-5 py-5 text-left",
              "shadow-[0_16px_36px_-24px_rgba(20,22,28,0.45)]",
              "transition-[border-color,background-color,box-shadow] duration-200 motion-reduce:transition-none",
              "focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-offset-2 focus-visible:outline-none",
              on
                ? "border-[#2F7D4A] bg-[#F4FBF6] shadow-[0_18px_40px_-20px_rgba(47,125,74,0.45)]"
                : "border-transparent",
            )}
          >
            {on ? (
              <span aria-hidden="true" className="absolute inset-y-4 left-0 w-1.5 rounded-full bg-[#2F7D4A]" />
            ) : null}
            <span className="flex items-start justify-between gap-3">
              <span>
                {on ? (
                  <span className="mb-1.5 inline-block rounded-full bg-[#2F7D4A] px-2.5 py-0.5 text-[0.78rem] font-semibold tracking-[0.04em] text-white uppercase">
                    Gewählt
                  </span>
                ) : null}
                <span className="block text-[1.28rem] leading-snug font-semibold tracking-[-0.03em]">
                  {offer.name}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2",
                  on ? "border-[#2F7D4A] bg-[#2F7D4A] text-white" : "border-black/15 bg-white",
                )}
              >
                {on ? (
                  <svg viewBox="0 0 12 12" className="size-3.5" fill="none" aria-hidden="true">
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
            <span className="mt-3 block text-[2.1rem] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap">
              {offer.once}
            </span>
            <span className="mt-2 block text-[1.05rem] text-[#5C5F66]">einmalige Erstellung</span>
            <span className="mt-3 block text-[1.08rem] leading-relaxed text-[#3A3D45]">
              {offer.body}
            </span>
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
  const target = group?.querySelector<HTMLButtonElement>(
    `#${event.currentTarget.id.replace(selectedId, next.id)}`,
  );
  target?.focus();
}

function DetailPanel({
  offer,
  focusedId,
  onFocusNode,
  familyHref,
  familyLinkLabel,
  showLead,
}: {
  offer: CatalogOffer;
  focusedId: string;
  onFocusNode: (id: string) => void;
  familyHref: string;
  familyLinkLabel: string;
  showLead: boolean;
}) {
  return (
    <div className="rounded-[1.6rem] bg-white p-5 shadow-[0_16px_36px_-24px_rgba(20,22,28,0.4)] md:p-7">
      {showLead ? (
        <p className="mb-5 text-[1.12rem] leading-relaxed text-[#3A3D45] md:text-[1.08rem]">{offer.body}</p>
      ) : null}
      <ul>
        {offer.differences.map((item) => (
          <li
            key={item}
            className="border-t border-black/8 py-2.5 text-[1.08rem] first:border-t-0 first:pt-0 md:py-2 md:text-[1.02rem]"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-black/8 pt-5">
        <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">Aufbau</p>
        <h3 className="mt-2 text-[1.5rem] leading-snug font-semibold tracking-[-0.02em] md:text-[1.55rem]">
          {offer.structureTitle}
        </h3>
        <p className="mt-2 text-[1.08rem] leading-relaxed text-[#5C5F66] md:text-[1.02rem]">
          {offer.structureCaption}
        </p>
        <ol className="mt-5">
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
                    "absolute top-2.5 left-0 size-4 rounded-full border-2 bg-white",
                    on ? "border-[#2F7D4A]" : "border-black/25",
                  )}
                />
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onFocusNode(node.id)}
                  className={cn(
                    "inline-flex min-h-13 items-center rounded-md py-1 text-left text-[1.12rem] font-semibold tracking-[-0.02em] lg:min-h-11 lg:text-[1.05rem]",
                    "focus-visible:ring-2 focus-visible:ring-[#198BE8] focus-visible:ring-offset-2 focus-visible:outline-none",
                    on ? "text-[#14161C]" : "text-[#3A3D45]",
                  )}
                >
                  {node.label}
                </button>
                {node.hint ? (
                  <p className="pb-3 text-[1.02rem] leading-relaxed text-[#5C5F66] md:text-[0.95rem]">
                    {node.hint}
                  </p>
                ) : (
                  <div className={last ? "" : "pb-3"} />
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
      <p className="mt-5 text-[1.02rem]">
        <Link
          href={familyHref}
          className="font-semibold text-[#198BE8] underline-offset-4 hover:underline"
        >
          {familyLinkLabel}
        </Link>
      </p>
    </div>
  );
}

function CostCard({
  offer,
  careOn,
  onCareChange,
  className,
}: {
  offer: CatalogOffer;
  careOn: boolean;
  onCareChange: (value: boolean) => void;
  className?: string;
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
    <aside
      className={cn(
        "relative w-full rounded-[1.6rem] bg-[#14161C] p-6 text-[#F3EFE6] shadow-[0_22px_48px_-24px_rgba(20,22,28,0.75)] lg:sticky lg:top-24",
        className,
      )}
    >
      <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">Kosten</p>
      <h3 className="mt-2 text-[1.55rem] leading-snug font-semibold lg:text-[1.45rem]">{offer.name}</h3>
      <div aria-live="polite">
        <p className="mt-3 text-[2.55rem] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap lg:text-4xl">
          {offer.once}
        </p>
        <p className="mt-1 text-[1.05rem] text-white/70">einmalige Erstellung</p>
        <p className="mt-3 text-[1.12rem]">
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
        <p className="mt-4 text-[1.05rem] leading-relaxed text-white/70">
          Einrichtung und monatliche Betreuung gehören bei diesem Angebot zusammen.
        </p>
      ) : null}

      {offer.care === "none" ? (
        <p className="mt-4 text-[1.05rem] leading-relaxed text-white/70">
          Eine monatliche Betreuung ist in diesem Einstieg nicht enthalten.
        </p>
      ) : null}

      {offer.care === "optional" ? (
        <Accordion type="single" collapsible className="mt-4 border-t border-white/10 pt-1">
          <AccordionItem value="betreuung" className="border-white/10">
            <AccordionTrigger className="min-h-12 text-[1.08rem] text-[#F3EFE6] hover:no-underline hover:text-white **:data-[slot=accordion-trigger-icon]:text-white/70">
              Was die Betreuung umfasst
            </AccordionTrigger>
            <AccordionContent className="text-[0.95rem] leading-relaxed text-white/75 [&_a]:text-[#9FD0F8]">
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
        className="mt-6 inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[#2F7D4A] px-5 text-center text-[1.15rem] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(47,125,74,0.9)] transition-colors hover:bg-[#276840] focus-visible:ring-2 focus-visible:ring-[#9FD0F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14161C] focus-visible:outline-none"
      >
        {offer.inquiryLabel}
      </Link>
      <p className="mt-3 text-[1rem] leading-relaxed text-white/55">
        Sie senden einen Terminwunsch. Der Termin wird anschließend persönlich
        bestätigt.
      </p>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-white/40">{PRICE_NOTE}</p>
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
    <div className="mt-5 rounded-[1.2rem] bg-white/10 px-4 py-3.5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[1.08rem] leading-snug">
          Monatliche Betreuung
          <span className="mt-1 block text-[1rem] text-white/60">
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
