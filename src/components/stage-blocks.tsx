import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StageCard({
  kicker,
  title,
  children,
  footer,
  tone = "white",
  className,
}: {
  kicker?: string;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  tone?: "white" | "ink" | "blue" | "cream";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col rounded-[1.6rem] p-5 md:p-7",
        tone === "white" && "bg-white text-[#14161C]",
        tone === "cream" && "bg-[#EDE7DA] text-[#14161C]",
        tone === "ink" && "bg-[#14161C] text-[#F3EFE6]",
        tone === "blue" && "bg-[#198BE8] text-white",
        className,
      )}
    >
      {kicker ? (
        <p
          className={cn(
            "text-sm tracking-[0.16em] uppercase",
            tone === "ink" && "text-[#9FD0F8]",
            tone === "blue" && "text-white/80",
            (tone === "white" || tone === "cream") && "text-[#198BE8]",
          )}
        >
          {kicker}
        </p>
      ) : null}
      {title ? (
        <h3 className="mt-3 min-h-0 text-[1.25rem] leading-snug font-semibold tracking-[-0.03em] md:min-h-[3.4rem] md:text-[1.5rem]">
          {title}
        </h3>
      ) : null}
      {children ? (
        <div
          className={cn(
            "mt-3 flex-1 text-[1.05rem] leading-relaxed",
            tone === "ink" && "text-white/75",
            tone === "blue" && "text-white/90",
            (tone === "white" || tone === "cream") && "text-[#3A3D45]",
          )}
        >
          {children}
        </div>
      ) : null}
      {footer ? <div className="mt-5">{footer}</div> : null}
    </article>
  );
}

export function StagePanel({
  kicker,
  title,
  body,
  visual,
  tone = "white",
  className,
}: {
  kicker: string;
  title: string;
  body: string;
  visual: ReactNode;
  tone?: "white" | "ink";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden rounded-[1.8rem]",
        tone === "ink" ? "bg-[#14161C] text-[#F3EFE6]" : "bg-white text-[#14161C]",
        className,
      )}
    >
      <div className="flex h-[11.5rem] shrink-0 items-stretch justify-stretch overflow-hidden md:h-[12.5rem]">
        {visual}
      </div>
      <div className="flex flex-1 flex-col px-5 py-5">
        <p
          className={cn(
            "text-sm tracking-[0.16em] uppercase",
            tone === "ink" ? "text-[#9FD0F8]" : "text-[#198BE8]",
          )}
        >
          {kicker}
        </p>
        <h3 className="mt-2 min-h-0 text-[1.25rem] leading-snug font-semibold tracking-[-0.03em] md:min-h-[3.4rem] md:text-[1.35rem]">
          {title}
        </h3>
        <p
          className={cn(
            "mt-3 min-h-0 text-[1.05rem] leading-relaxed md:min-h-[6.8rem]",
            tone === "ink" ? "text-white/72" : "text-[#3A3D45]",
          )}
        >
          {body}
        </p>
      </div>
    </article>
  );
}

export function StageGrid({
  children,
  cols = 3,
  className,
}: {
  children: ReactNode;
  cols?: 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-stretch gap-4",
        cols === 2 ? "md:grid-cols-2" : "lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StageSteps({
  heading,
  items,
}: {
  heading?: string;
  items: readonly { title: string; body: string }[];
}) {
  return (
    <section className="mt-12" aria-label={heading ?? "Ablauf"}>
      {heading ? (
        <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          {heading}
        </h2>
      ) : null}
      <ol className="mt-6 grid gap-4 lg:grid-cols-4">
        {items.map((item, index) => (
          <li
            key={item.title}
            className="flex h-full min-w-0 flex-col rounded-[1.4rem] bg-white p-5"
          >
            <p className="text-[1.6rem] leading-none font-semibold tracking-[-0.04em] text-[#198BE8]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 min-h-[3.2rem] text-lg leading-snug font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-[1.02rem] leading-relaxed text-[#3A3D45]">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function StageLimit({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="mt-10 rounded-[1.6rem] border border-black/10 bg-white p-6 md:p-7">
      <p className="text-sm tracking-[0.16em] text-[#198BE8] uppercase">Grenze</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-3 text-[1.05rem] leading-relaxed text-[#3A3D45]">
        {children}
      </div>
    </aside>
  );
}
