import Link from "next/link";

const jumps = [
  { href: "/leistungen", label: "Was ich baue" },
  { href: "/#referenzen", label: "Was schon läuft" },
  { href: "/preise", label: "Was es kostet" },
] as const;

export function JumpBar() {
  return (
    <nav
      aria-label="Direkt zu"
      className="border-y border-black/8 bg-[#F3EFE6] px-5 py-4 md:px-8"
    >
      <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
        {jumps.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-12 items-center justify-center rounded-2xl bg-[#14161C] px-5 text-[1.08rem] font-medium text-[#F3EFE6] transition hover:bg-black"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
