import { NextRequest, NextResponse } from "next/server";
import { site } from "@/lib/site";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

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

  if (!name || !phone || !company || !date || !time) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return NextResponse.json(
      { error: "E-Mail-Versand ist nicht konfiguriert." },
      { status: 503 },
    );
  }

  const receivedAt = berlinStamp();
  const message = [
    "Neuer Terminwunsch von der Website.",
    "",
    `Name: ${name}`,
    `Telefon: ${phone}`,
    `Betrieb: ${company}`,
    `Wunschtermin: ${date} um ${time} Uhr`,
    note ? `Notiz: ${note}` : "Notiz: —",
    `Eingegangen: ${receivedAt} (Europe/Berlin)`,
  ].join("\n");

  const payload = {
    access_key: accessKey,
    from_name: "BP Agentics Website",
    subject: `Neuer Terminwunsch: ${company}`,
    email: site.email,
    to: site.email,
    name,
    phone,
    company,
    date,
    time,
    note,
    message,
    botcheck: "",
  };

  let upstream: Response;
  try {
    upstream = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return NextResponse.json(
      { error: "E-Mail-Dienst nicht erreichbar." },
      { status: 502 },
    );
  }

  let result: { success?: boolean; message?: string } = {};
  try {
    result = (await upstream.json()) as { success?: boolean; message?: string };
  } catch {
    result = {};
  }

  if (!upstream.ok || result.success === false) {
    return NextResponse.json(
      { error: "Die Anfrage konnte nicht zugestellt werden." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
