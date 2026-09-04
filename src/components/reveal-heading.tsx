"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type RevealHeadingProps = {
  children: string;
  className?: string;
};

export function RevealHeading({ children, className }: RevealHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
          return;
        }
        setArmed(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.trim().split(/\s+/);

  return (
    <h2
      ref={ref}
      className={cn(armed && "reveal-armed", revealed && "reveal-heading-on", className)}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            className="reveal-word"
            style={{ "--i": index } as CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </h2>
  );
}
