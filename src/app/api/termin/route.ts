import { NextRequest, NextResponse } from "next/server";
import { mailToTermin } from "@/lib/site";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const company = String(body.company ?? "").trim();
  const date = String(body.date ?? "").trim();
  const time = String(body.time ?? "").trim();
  const note = String(body.note ?? "").trim();

  if (!name || !phone || !company || !date || !time) {
    return NextResponse.json(
      { error: "Pflichtfelder fehlen" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    mailto: mailToTermin({ name, phone, company, date, time, note }),
  });
}
