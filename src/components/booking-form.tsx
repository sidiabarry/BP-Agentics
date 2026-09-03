"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mailToTermin } from "@/lib/site";

type Status = "idle" | "error" | "done";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [mailto, setMailto] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      company: String(data.get("company") || "").trim(),
      date: String(data.get("date") || "").trim(),
      time: String(data.get("time") || "").trim(),
      note: String(data.get("note") || "").trim(),
    };

    if (!payload.name || !payload.phone || !payload.company || !payload.date || !payload.time) {
      setStatus("error");
      setMessage("Bitte Name, Telefon, Betrieb, Datum und Uhrzeit ausfüllen.");
      return;
    }

    const response = await fetch("/api/termin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Die Anfrage ist nicht durchgegangen. Schreiben Sie uns direkt per E-Mail.");
      setMailto(mailToTermin(payload));
      return;
    }

    const result = (await response.json()) as { mailto: string };
    setMailto(result.mailto);
    setStatus("done");
    setMessage(
      "Terminwunsch ist aufgenommen. Öffnen Sie Ihre E-Mail, um ihn an uns zu schicken, oder rufen Sie die vorausgefüllte Nachricht auf.",
    );
  }

  if (status === "done") {
    return (
      <div className="rounded-[2rem] bg-[#14161C] p-8 text-[#F3EFE6]">
        <h2 className="text-3xl font-semibold">Wir haben den Wunschtermin.</h2>
        <p className="mt-4 text-[1.1rem] leading-relaxed text-white/80">{message}</p>
        <Button
          asChild
          className="mt-8 h-13 rounded-full bg-[#5B54E6] px-6 text-white"
        >
          <a href={mailto}>E-Mail jetzt öffnen</a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="name" label="Vor- und Nachname" required>
          <Input id="name" name="name" autoComplete="name" className="h-12 text-[1.05rem]" />
        </Field>
        <Field id="phone" label="Telefon" required>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className="h-12 text-[1.05rem]" />
        </Field>
      </div>
      <Field id="company" label="Betrieb" required>
        <Input id="company" name="company" autoComplete="organization" className="h-12 text-[1.05rem]" />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="date" label="Wunschdatum" required>
          <Input id="date" name="date" type="date" className="h-12 text-[1.05rem]" />
        </Field>
        <Field id="time" label="Uhrzeit" required>
          <Input id="time" name="time" type="time" className="h-12 text-[1.05rem]" />
        </Field>
      </div>
      <Field id="note" label="Woran hakt es gerade? (optional)">
        <Textarea id="note" name="note" rows={4} className="text-[1.05rem]" />
      </Field>
      {status === "error" ? (
        <p className="rounded-xl bg-[#F8D7D0] px-4 py-3 text-[#7A2E1F]" role="alert">
          {message}{" "}
          {mailto ? (
            <a className="underline" href={mailto}>
              Nachricht vorausfüllen
            </a>
          ) : null}
        </p>
      ) : null}
      <Button
        type="submit"
        className="h-13 rounded-full bg-[#5B54E6] px-8 text-[1.08rem] text-white hover:bg-[#4A44D4]"
      >
        Terminwunsch senden
      </Button>
      <p className="text-[#5C5F66]">
        Keine Faxnummer, kein Pflichtfeld zur Umsatzgröße. Nur das, was wir für den
        Vor-Ort-Termin brauchen.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[1.02rem]">
        {label}
        {required ? <span className="text-[#5B54E6]"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}
