export function AffiliatePreview() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.15rem] bg-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between gap-2 bg-[#0B1A27] px-3 py-2.5 text-white">
        <span className="text-[0.72rem] font-semibold tracking-[-0.02em]">
          Merchant-Programm
        </span>
        <span className="rounded-full bg-[#198BE8] px-2 py-0.5 text-[0.58rem] font-semibold">
          ADCELL
        </span>
      </div>
      <ul className="grid min-h-0 flex-1 grid-rows-3 divide-y divide-[#E4EAF0]">
        {[
          ["Feed", "Programm, Feeds, Konditionen"],
          ["Publisher", "Qualität statt Masse"],
          ["Reporting", "Zahlen aus ADCELL"],
        ].map(([label, line]) => (
          <li
            key={label}
            className="grid grid-cols-[5.4rem_minmax(0,1fr)] items-center px-3 py-2"
          >
            <span className="text-[0.62rem] tracking-[0.12em] text-[#0B5EA8] uppercase">
              {label}
            </span>
            <span className="text-[0.72rem] leading-snug font-medium text-[#14161C]">
              {line}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
