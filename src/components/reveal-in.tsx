"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealInProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: "kicker" | "lead" | "rise" | "card" | "price";
  delay?: number;
  id?: string;
};

export function RevealIn({
  as: Tag = "div",
  children,
  className,
  variant = "rise",
  delay = 0,
  id,
}: RevealInProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          observer.disconnect();
          return;
        }
        setArmed(true);
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        "reveal-in",
        `reveal-in-${variant}`,
        armed && "reveal-armed",
        on && "reveal-in-on",
        className,
      )}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
