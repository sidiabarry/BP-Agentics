"use client";

import Link from "next/link";
import "./sharpen-three";
import { WerkstattSection as Inner } from "./werkstatt-section";

export function WerkstattSection() {
  return (
    <>
      <Inner />
      <p className="relative z-[1] mt-0 px-[max(5vw,1.5rem)] pb-2">
        <Link
          href="/preise"
          className="text-[1.02rem] font-semibold text-[#198BE8] hover:underline"
        >
          Alle Preise und Pakete
        </Link>
      </p>
    </>
  );
}
