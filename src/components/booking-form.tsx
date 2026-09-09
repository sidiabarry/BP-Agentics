"use client";

import { cloneElement, FormEvent, isValidElement, useRef, useState, type ReactElement } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mailToTermin, site } from "@/lib/site";
import { cta, offerInquiryNote } from "@/lib/offers";

type Status = "idle" | "sending" | "error" | "done";

const SUCCESS =
  "Vielen Dank. Ihr Terminwunsch ist eingegangen. Der Termin ist noch nicht bestätigt. Ich melde mich unter der angegebenen Nummer zur Abstimmung.";
const MISSING =
  "Bitte ergänzen Sie Name, Betrieb, Telefonnummer, Wunschdatum und Uhrzeit.";
const SEND_ERROR =
  "Ihr Terminwunsch konnte nicht übermittelt werden. Ihre Eingaben bleiben erhalten. Versuchen Sie es erneut oder schreiben Sie direkt per E-Mail.";
const RATE_LIMIT =
  "Es gab gerade mehrere Sendeversuche. Bitte versuchen Sie es später erneut oder nutzen Sie die angegebene E-Mail-Adresse.";

export function BookingForm() {
  const searchParams = useSearchParams();
  const notePrefill =
    offerInquiryNote(searchParams.get("paket") ?? "", searchParams.get("betreuung") === "1") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [mailto, setMailto] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      company: String(data.get("company") || "").trim(),
      date: String(data.get("date") || "").trim(),
      time: String(data.get("time") || "").trim(),
      note: String(data.get("note") || "").trim(),
      botcheck: String(data.get("botcheck") || "").trim(),
    };

    const missing = !payload.name
      ? "name"
      : !payload.company
        ? "company"
        : !payload.phone
          ? "phone"
          : !payload.date
            ? "date"
            : !payload.time
              ? "time"
              : null;

    if (missing) {
      setStatus("error");
      setFieldError(missing);
      setMessage(MISSING);
      setMailto("");
      form.querySelector<HTMLElement>(`#${missing}`)?.focus();
      return;
    }

    setFieldError(null);
    setStatus("sending");
    setMailto("");

    let response: Response;
    try {
      response = await fetch("/api/termin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      setStatus("error");
      setMessage(SEND_ERROR);
      setMailto(mailToTermin(payload));
      return;
    }

    if (!response.ok) {
      let apiError = "";
      try {
        const json = (await response.json()) as { error?: string };
        apiError = json.error ?? "";
      } catch {
        /* response had no JSON body */
      }

      setStatus("error");
      if (response.status === 429) {
        setMessage(RATE_LIMIT);
      } else if (response.status === 503) {
        setMessage(
          apiError ||
            "E-Mail-Versand ist nicht konfiguriert. Bitte schreiben Sie uns direkt per E-Mail.",
        );
      } else {
        setMessage(
          apiError
            ? `Terminwunsch konnte nicht übermittelt werden: ${apiError}`
            : SEND_ERROR,
        );
      }
      setMailto(mailToTermin(payload));
      return;
    }

    setStatus("done");
    setMessage(SUCCESS);
  }

  if (status === "done") {
    return (
      <div className="rounded-[2rem] bg-[#14161C] p-8 text-[#F3EFE6]" role="status">
        <h2 className="text-3xl font-semibold">Terminwunsch eingegangen</h2>
        <p className="mt-4 text-[1.1rem] leading-relaxed text-white/80">{message}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="relative grid gap-5" noValidate>
      <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="botcheck">Website</label>
        <input
          id="botcheck"
          name="botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="name" label="Vor- und Nachname" required error={fieldError === "name"}>
          <Input id="name" name="name" autoComplete="name" className="h-12 text-[1.05rem]" aria-invalid={fieldError === "name"} />
        </Field>
        <Field id="company" label="Betrieb" required error={fieldError === "company"}>
          <Input id="company" name="company" autoComplete="organization" className="h-12 text-[1.05rem]" aria-invalid={fieldError === "company"} />
        </Field>
      </div>
      <Field id="phone" label="Telefonnummer für die Terminabstimmung" required error={fieldError === "phone"}>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" className="h-12 text-[1.05rem]" aria-invalid={fieldError === "phone"} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="date" label="Gewünschtes Datum" required error={fieldError === "date"}>
          <Input id="date" name="date" type="date" className="h-12 text-[1.05rem]" aria-invalid={fieldError === "date"} />
        </Field>
        <Field id="time" label="Gewünschte Uhrzeit" required error={fieldError === "time"}>
          <Input id="time" name="time" type="time" className="h-12 text-[1.05rem]" aria-invalid={fieldError === "time"} />
        </Field>
      </div>
      <Field id="note" label="Worum geht es? (optional)">
        <Textarea
          id="note"
          name="note"
          rows={4}
          className="text-[1.05rem]"
          defaultValue={notePrefill}
          placeholder="Zum Beispiel eine Website oder ein Ablauf, der leichter werden soll."
        />
      </Field>
      {status === "error" ? (
        <p className="rounded-xl bg-[#F8D7D0] px-4 py-3 text-[#7A2E1F]" role="alert">
          {message}{" "}
          {mailto ? (
            <a className="underline" href={mailto}>
              Nachricht per E-Mail vorausfüllen
            </a>
          ) : null}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={status === "sending"}
        className="h-13 rounded-full bg-[#198BE8] px-8 text-[1.08rem] text-white hover:bg-[#1576C4]"
      >
        {status === "sending" ? "Terminwunsch wird gesendet …" : cta.submit}
      </Button>
      <p className="text-[#5C5F66]">
        Sie senden einen Terminwunsch. Der Termin wird anschließend persönlich bestätigt.
        Bei Fragen:{" "}
        <a className="text-[#198BE8] underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: boolean;
  children: ReactElement<{ required?: boolean; "aria-required"?: string }>;
}) {
  const input =
    required && isValidElement(children)
      ? cloneElement(children, { required: true, "aria-required": "true" })
      : children;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[1.02rem]">
        {label}
        {required ? <span className="text-[#198BE8]"> *</span> : null}
      </Label>
      {input}
      {error ? (
        <p className="text-sm text-[#7A2E1F]">Bitte dieses Feld ergänzen.</p>
      ) : null}
    </div>
  );
}
