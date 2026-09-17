import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const tradeSlugs = new Set([
  "dachdecker",
  "shk-haustechnik",
  "elektrotechnik",
  "kaeltetechnik",
  "spedition-container",
  "galabau",
  "metallbau",
  "nutzfahrzeuge",
]);

export function proxy(request: NextRequest) {
  const gewerk = request.nextUrl.searchParams.get("gewerk");
  if (!gewerk || !tradeSlugs.has(gewerk)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL(`/${gewerk}`, request.url), 308);
}

export const config = {
  matcher: "/gewerke",
};
