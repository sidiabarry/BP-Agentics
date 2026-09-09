import Link from "next/link";
import { cta } from "@/lib/offers";

export function MobileDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-4 md:hidden">
      <Link
        href={cta.href}
        className="pointer-events-auto flex h-14 items-center justify-center rounded-full bg-[#E07A5F] text-[1.08rem] font-semibold text-[#14161C] shadow-[0_12px_40px_-8px_rgba(224,122,95,0.8)]"
      >
        {cta.short}
      </Link>
    </div>
  );
}
