"use client";

import { FormEvent, useRef, useState, type ReactNode } from "react";
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
  const [sending, setSending] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
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
      requestAnimationFrame(() => {
        errorRef.current?.focus();
        nameRef.current?.focus();
      });
      return;
    }

    setSending(true);
    const draft = mailToTermin(payload);
    try {
      const response = await fetch("/api/termin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const result = (await response.json()) as { mailto: string };
        setMailto(result.mailto);
      } else {
        setMailto(draft);
      }
    } catch {
      setMailto(draft);
    }
    setStatus("done");
    setMessage(
      "Es ist kein Termin gebucht. Ein E-Mail-Entwurf ist vorbereitet. Schicken Sie ihn, damit wir den Wunsch sehen.",
    );
    setSending(false);
  }

  if (status === "done") {
    return (
      <div className="rounded-[2rem] bg-[#14161C] p-8 text-[#F3EFE6]">
        <h2 className="text-3xl font-semibold">E-Mail-Entwurf ist bereit</h2>
        <p className="mt-4 text-[1.1rem] leading-relaxed text-white/80">{message}</p>
        <Button
          asChild
          className="mt-8 h-13 rounded-full bg-[#0C5A9A] px-6 text-white hover:bg-[#0A4A80]"
        >
          <a href={mailto}>E-Mail-Entwurf öffnen</a>
        </Button>
      </div>
    );
  }

  const errorId = "termin-form-error";

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="name" label="Vor- und Nachname" required>
          <Input
            ref={nameRef}
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={status === "error" || undefined}
            aria-describedby={status === "error" ? errorId : undefined}
            className="h-12 text-[1.05rem]"
          />
        </Field>
        <Field id="phone" label="Telefon" required>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={status === "error" || undefined}
            aria-describedby={status === "error" ? errorId : undefined}
            className="h-12 text-[1.05rem]"
          />
        </Field>
      </div>
      <Field id="company" label="Betrieb" required>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          required
          aria-required="true"
          aria-invalid={status === "error" || undefined}
          aria-describedby={status === "error" ? errorId : undefined}
          className="h-12 text-[1.05rem]"
        />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="date" label="Wunschdatum" required>
          <Input
            id="date"
            name="date"
            type="date"
            required
            aria-required="true"
            aria-invalid={status === "error" || undefined}
            aria-describedby={status === "error" ? errorId : undefined}
            className="h-12 text-[1.05rem]"
          />
        </Field>
        <Field id="time" label="Uhrzeit" required>
          <Input
            id="time"
            name="time"
            type="time"
            required
            aria-required="true"
            aria-invalid={status === "error" || undefined}
            aria-describedby={status === "error" ? errorId : undefined}
            className="h-12 text-[1.05rem]"
          />
        </Field>
      </div>
      <Field id="note" label="Woran hakt es gerade? (optional)">
        <Textarea id="note" name="note" rows={4} className="text-[1.05rem]" />
      </Field>
      {status === "error" ? (
        <p
          ref={errorRef}
          id={errorId}
          tabIndex={-1}
          className="rounded-xl bg-[#F8D7D0] px-4 py-3 text-[#7A2E1F]"
          role="alert"
        >
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={sending}
        className="h-13 rounded-full bg-[#0C5A9A] px-8 text-[1.08rem] text-white hover:bg-[#0A4A80]"
      >
        {sending ? "Entwurf wird vorbereitet…" : "E-Mail-Entwurf öffnen"}
      </Button>
      <p className="text-[#5C5F66]">
        Das Formular bucht keinen Termin. Es öffnet einen vorausgefüllten
        E-Mail-Entwurf. Wer kürzer schreiben will, nutzt Kontakt oder WhatsApp.
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
        {required ? (
          <span className="text-[#0C5A9A]" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </Label>
      {children}
    </div>
  );
}
