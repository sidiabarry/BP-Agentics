import type { ComponentProps } from "react";
import Link from "next/link";

export function AffiliateAction({
  href,
  children,
  ...rest
}: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
