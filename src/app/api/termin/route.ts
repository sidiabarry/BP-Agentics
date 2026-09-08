import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

const FROM = "BP Agentics <termin@send.bpagentics.com>";

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function berlinStamp() {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function asText(value: unknown) {
  return String(value ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fromAddress() {
  const override = process.env.RESEND_FROM?.trim();
  if (override) return override;
  return FROM;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  if (asText(body.botcheck)) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte später erneut versuchen." },
      { status: 429 },
    );
  }

  const name = asText(body.name);
  const phone = asText(body.phone);
  const company = asText(body.company);
  const date = asText(body.date);
  const time = asText(body.time);
  const note = asText(body.note);
  const visitorEmail = asText(body.email);

  if (!name || !phone || !company || !date || !time) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "E-Mail-Versand ist nicht konfiguriert." },
      { status: 503 },
    );
  }

  const receivedAt = berlinStamp();
  const noteLine = note || "—";
  const text = [
    "Neuer Terminwunsch von der Website.",
    "",
    `Name: ${name}`,
    `Telefon: ${phone}`,
    `Betrieb: ${company}`,
    `Wunschtermin: ${date} um ${time} Uhr`,
    `Notiz: ${noteLine}`,
    `Eingegangen: ${receivedAt} (Europe/Berlin)`,
  ].join("\n");

  const html = `
    <p>Neuer Terminwunsch von der Website.</p>
    <table>
      <tr><td>Name</td><td>${escapeHtml(name)}</td></tr>
      <tr><td>Telefon</td><td>${escapeHtml(phone)}</td></tr>
      <tr><td>Betrieb</td><td>${escapeHtml(company)}</td></tr>
      <tr><td>Wunschtermin</td><td>${escapeHtml(date)} um ${escapeHtml(time)} Uhr</td></tr>
      <tr><td>Notiz</td><td>${escapeHtml(noteLine)}</td></tr>
      <tr><td>Eingegangen</td><td>${escapeHtml(receivedAt)} (Europe/Berlin)</td></tr>
    </table>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: site.email,
    subject: `Neuer Terminwunsch: ${company}`,
    text,
    html,
    ...(visitorEmail ? { replyTo: visitorEmail } : {}),
  });

  if (error) {
    return NextResponse.json(
      { error: "Die Anfrage konnte nicht zugestellt werden." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
