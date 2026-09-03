export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 56"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M8 6h22c8 0 14 5 14 13 0 5-3 9-8 11 6 2 10 7 10 13 0 8-7 13-16 13H8V6Z"
        fill="#1A365D"
      />
      <circle cx="18" cy="18" r="2.2" fill="#F3EFE6" />
      <circle cx="28" cy="18" r="2.2" fill="#F3EFE6" />
      <circle cx="23" cy="28" r="2.2" fill="#F3EFE6" />
      <path
        d="M18 18h10M18 18l5 10M28 18l-5 10"
        stroke="#F3EFE6"
        strokeWidth="1.6"
      />
      <path
        d="M42 6h16c10 0 16 6 16 16 0 9-6 16-16 16H50v18H42V6Z"
        fill="#4A5568"
      />
      <path
        d="M58 14c4 2 6 5 6 9s-2 7-6 9c-4-2-6-5-6-9s2-7 6-9Z"
        fill="#1A365D"
      />
      <circle cx="56" cy="21" r="1.4" fill="#F3EFE6" />
      <circle cx="61" cy="23" r="1.4" fill="#F3EFE6" />
      <circle cx="58" cy="27" r="1.4" fill="#F3EFE6" />
      <path
        d="M56 21l5 2M56 21l2 6M61 23l-3 4"
        stroke="#F3EFE6"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function Wordmark({
  invert = false,
  compact = false,
}: {
  invert?: boolean;
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="h-9 w-12 shrink-0" />
      <span className="leading-tight">
        <span
          className={`block text-[0.72rem] font-semibold tracking-[0.18em] ${
            invert ? "text-white" : "text-[#1A365D]"
          }`}
        >
          BP AGENTICS
        </span>
        {!compact ? (
          <span
            className={`block text-[0.62rem] tracking-[0.22em] uppercase ${
              invert ? "text-white/70" : "text-[#6B7280]"
            }`}
          >
            Hagen
          </span>
        ) : null}
      </span>
    </span>
  );
}
