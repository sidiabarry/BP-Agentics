"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { cn } from "@/lib/utils";

const PROFILE_HREF =
  "https://www.provenexpert.com/bp-agentics/?utm_source=seals&utm_campaign=embedded-proseal&utm_medium=profile&utm_content=8b0237cd-48c0-4b6f-bb5f-86aa0b8c2045";

const EMPTY_SEAL = "Noch keine Bewertungen";

const PRO_SEAL_OPTIONS = {
  widgetId: "8b0237cd-48c0-4b6f-bb5f-86aa0b8c2045",
  language: "de-DE",
  usePageLanguage: false,
  bannerColor: "#097E92",
  textColor: "#FFFFFF",
  showBackPage: false,
  showReviews: true,
  hideDate: true,
  hideName: false,
  googleStars: true,
  displayReviewerLastName: false,
  embeddedSelector: "#proSealWidget",
};

declare global {
  interface Window {
    provenExpert?: {
      proSeal: (options: typeof PRO_SEAL_OPTIONS) => void;
    };
  }
}

function loadProSeal() {
  const mount = document.getElementById("proSealWidget");
  if (!mount || !window.provenExpert?.proSeal) return;
  mount.replaceChildren();
  window.provenExpert.proSeal(PRO_SEAL_OPTIONS);
}

export function ProSeal() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const read = () => {
      const text = host.innerText || host.textContent || "";
      if (text.includes(EMPTY_SEAL)) {
        host.replaceChildren();
        setVisible(false);
        return;
      }
      const compact = text.replace(/\s+/g, " ").trim();
      if (compact.length > 12) setVisible(true);
    };

    const observer = new MutationObserver(read);
    observer.observe(host, { childList: true, subtree: true, characterData: true });
    const late = window.setTimeout(read, 4000);
    return () => {
      observer.disconnect();
      window.clearTimeout(late);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn("max-w-[26rem]", visible ? "mt-8" : "hidden")}
      aria-hidden={visible ? undefined : true}
    >
      <noscript>
        <a
          href={PROFILE_HREF}
          target="_blank"
          rel="noopener noreferrer"
          title="Customer reviews & experiences for BP Agentics"
          className="pe-pro-seal-more-infos font-semibold text-[#198BE8] underline-offset-4 hover:underline"
        >
          More info
        </a>
      </noscript>
      <div id="proSealWidget" />
      <Script
        id="proSeal"
        src="https://s.provenexpert.net/seals/proseal-v2.js"
        strategy="lazyOnload"
        onReady={loadProSeal}
      />
    </div>
  );
}
