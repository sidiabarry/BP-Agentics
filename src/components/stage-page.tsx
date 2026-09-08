import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { type Crumb } from "@/components/doc-page";
import { Button } from "@/components/ui/button";
import { breadcrumbList, webPageNode } from "@/lib/json-ld";
import { cta } from "@/lib/offers";
import { cn } from "@/lib/utils";

export type StageNext = {
  kicker?: string;
  title: string;
  body: string;
  chips?: readonly string[];
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export function StagePage({
  crumbs,
  kicker,
  title,
  lead,
  tone = "cream",
  visual,
  prelude,
  children,
  appendix,
  related,
  next,
  extraJsonLd = [],
  reviewed,
}: {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  lead: string;
  tone?: "cream" | "ink";
  visual?: ReactNode;
  prelude?: ReactNode;
  children?: ReactNode;
  appendix?: ReactNode;
  related?: { href: string; label: string }[];
  next?: StageNext | null;
  extraJsonLd?: Record<string, unknown>[];
  reviewed?: string;
}) {
  const trail = [{ name: "Startseite", path: "/" }, ...crumbs];
  const path = crumbs[crumbs.length - 1]?.path ?? "/";
  const ink = tone === "ink";

  return (
    <div id="inhalt" className="bg-[#F3EFE6]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            webPageNode({
              path,
              name: title,
              description: lead,
            }),
            breadcrumbList(trail),
            ...extraJsonLd,
          ],
        }}
      />
      <header
        className={cn(
          ink ? "bg-[#14161C] text-[#F3EFE6]" : "bg-[#F3EFE6] text-[#14161C]",
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-6xl px-5 pt-8 pb-12 md:px-8 md:pb-16",
            visual && "lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-end lg:gap-12",
          )}
        >
          <div className="min-w-0">
            <nav
              aria-label="Brotkrumen"
              className={cn("text-sm", ink ? "text-white/55" : "text-[#5C5F66]")}
            >
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {trail.map((item, index) => (
                  <li key={item.path} className="flex items-center gap-2">
                    {index > 0 ? <span aria-hidden="true">/</span> : null}
                    {index === trail.length - 1 ? (
                      <span className={ink ? "text-[#F3EFE6]" : "text-[#14161C]"}>
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.path}
                        className="underline-offset-4 hover:underline"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            {kicker ? (
              <p
                className={cn(
                  "mt-8 text-sm tracking-[0.2em] uppercase",
                  ink ? "text-[#9FD0F8]" : "text-[#198BE8]",
                )}
              >
                {kicker}
              </p>
            ) : null}
            <h1 className="mt-3 max-w-[18ch] text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] md:text-6xl">
              {title}
            </h1>
            <p
              className={cn(
                "mt-5 max-w-[38rem] text-[1.18rem] leading-relaxed",
                ink ? "text-white/75" : "text-[#3A3D45]",
              )}
            >
              {lead}
            </p>
            {reviewed ? (
              <p className={cn("mt-3 text-sm", ink ? "text-white/50" : "text-[#5C5F66]")}>
                Zuletzt geprüft:{" "}
                <time dateTime={reviewed}>
                  {new Date(`${reviewed}T12:00:00`).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </p>
            ) : null}
          </div>
          {visual ? (
            <div className="mt-10 min-w-0 lg:mt-0">{visual}</div>
          ) : null}
        </div>
      </header>

      {prelude}

      {children ? (
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">{children}</div>
      ) : null}

      {appendix}

      {related && related.length > 0 ? (
        <nav
          aria-label="Weiterlesen"
          className="mx-auto max-w-6xl px-5 pt-10 pb-4 md:px-8"
        >
          <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">
            Weiterlesen
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full border border-black/12 bg-white px-4 py-2 text-[0.98rem] text-[#14161C] transition hover:border-[#198BE8] hover:text-[#198BE8]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {next ? <StageNext step={next} /> : null}
    </div>
  );
}

function StageAction({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <Link href={href}>{children}</Link>;
}

function StageNext({ step }: { step: StageNext }) {
  const primary = step.primary ?? { href: cta.href, label: cta.primary };
  return (
    <section
      className="mx-auto max-w-6xl px-5 pt-8 pb-20 md:px-8"
      aria-labelledby="stage-naechster-schritt"
    >
      <div className="rounded-[2rem] bg-[#14161C] px-6 py-8 text-[#F3EFE6] md:px-10 md:py-10">
        <p className="text-sm tracking-[0.16em] text-[#9FD0F8] uppercase">
          {step.kicker ?? "Nächster Schritt"}
        </p>
        <h2
          id="stage-naechster-schritt"
          className="mt-3 max-w-[20ch] text-[1.6rem] leading-snug font-semibold tracking-[-0.03em] md:text-[2rem]"
        >
          {step.title}
        </h2>
        <p className="mt-3 max-w-[40rem] text-[1.08rem] leading-relaxed text-white/75">
          {step.body}
        </p>
        {step.chips && step.chips.length > 0 ? (
          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {step.chips.map((chip) => (
              <li
                key={chip}
                className="flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-white/8 px-3 py-3 text-center text-[0.95rem] leading-snug"
              >
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            className="h-12 rounded-full bg-[#198BE8] px-6 text-white hover:bg-[#1576C4]"
          >
            <StageAction href={primary.href}>{primary.label}</StageAction>
          </Button>
          {step.secondary ? (
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/20 bg-transparent px-6 text-[#F3EFE6] hover:bg-white/8"
            >
              <StageAction href={step.secondary.href}>{step.secondary.label}</StageAction>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
