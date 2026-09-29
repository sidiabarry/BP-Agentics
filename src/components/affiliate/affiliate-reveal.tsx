"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type AffiliateRevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export function AffiliateReveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  id,
}: AffiliateRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
          return;
        }
        setArmed(true);
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        "affiliate-reveal",
        armed && "is-armed",
        visible && "is-in",
        className,
      )}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
