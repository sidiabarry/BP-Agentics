"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import styles from "./ablaeufe-story.module.css";

export type StoryFocus = "alle" | "a" | "b" | "c";

const tones = ["ink", "signal", "paper"] as const;

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function Switcher({ focus }: { focus: StoryFocus }) {
  const items: { id: StoryFocus; href: string; label: string }[] = [
    { id: "a", href: "/leistungen/ablaeufe?entwurf=a", label: "A · Drei Pakete" },
    { id: "b", href: "/leistungen/ablaeufe?entwurf=b", label: "B · Eine Fläche" },
    { id: "c", href: "/leistungen/ablaeufe?entwurf=c", label: "C · Eine Frage" },
    { id: "alle", href: "/leistungen/ablaeufe?entwurf=alle", label: "Alle drei" },
  ];

  return (
    <div className={styles.switcher}>
      <p className={styles.switchLabel}>Drei Formen, derselbe Ablauf</p>
      <div className={styles.switchRow}>
        {items.map((item) => (
          <Button
            key={item.id}
            asChild
            variant="outline"
            size="sm"
            className={
              focus === item.id
                ? "border-[#14161C] bg-[#14161C] text-[#F3EFE6] hover:bg-[#14161C] hover:text-[#F3EFE6]"
                : "border-[#14161C]/15 bg-transparent text-[#14161C] hover:bg-[#14161C]/5"
            }
          >
            <Link href={item.href} aria-current={focus === item.id ? "page" : undefined}>
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

function ProblemFigure({ open }: { open: boolean }) {
  if (!open) {
    return (
      <div className={styles.slip} aria-hidden="true">
        <div className={styles.slipTop}>
          <span>Termin</span>
          <span className={styles.slipId}>Do 9:00</span>
        </div>
        <p className={styles.slipPlace}>Frau Keller</p>
        <p className={styles.slipMeta}>Rückruf</p>
      </div>
    );
  }

  return (
    <div className={styles.pair} aria-hidden="true">
      <div className={styles.slip}>
        <div className={styles.slipTop}>
          <span>Notiz</span>
          <span className={styles.slipId}>Do 9:00</span>
        </div>
        <p className={styles.slipPlace}>Frau Keller · Rückruf</p>
      </div>
      <div className={`${styles.slip} ${styles.slipAsk}`}>
        <div className={styles.slipTop}>
          <span>Büro</span>
          <span>noch einmal</span>
        </div>
        <p className={styles.slipPlace}>Uhrzeit?</p>
      </div>
    </div>
  );
}

function OfferFigure({ open, price }: { open: boolean; price: string }) {
  return (
    <div className={styles.plate} aria-hidden="true">
      <p className={styles.plateLabel}>Datenbasis + 1 Prozessmodul</p>
      <p className={styles.platePrice}>{price}</p>
      {open ? <p className={styles.plateLine}>Do 9:00 · Frau Keller · einmal</p> : null}
    </div>
  );
}

function ReasonFigure({ open }: { open: boolean }) {
  return (
    <div className={styles.ledger} aria-hidden="true">
      <p className={styles.kept}>
        <span>Do 9:00 · Frau Keller</span>
        <span>einmal</span>
      </p>
      {open ? (
        <p className={styles.dropped}>
          <span>Do 9:00 · Frau Keller</span>
          <span>noch einmal</span>
          <span className={styles.strike} />
        </p>
      ) : null}
    </div>
  );
}

function VariantA({ price }: { price: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const packs = [
    {
      kicker: "Problem",
      question: "Was für ein Problem haben Sie?",
      short: "Dieselbe Angabe liegt zweimal vor.",
      full: "Dieselbe Angabe liegt zweimal vor. Sie notieren Do 9:00, Frau Keller und Rückruf, und das Büro fragt die Uhrzeit noch einmal.",
    },
    {
      kicker: "Angebot",
      question: "Was verkaufen wir?",
      short: "Datenbasis und ein Prozessmodul.",
      full: `Datenbasis und ein Prozessmodul, zusammen ${price}. Eine monatliche Betreuung ist in diesem Einstieg nicht enthalten. Die Datenbasis ist keine kaufmännische Software. Weitere Module kommen nur, wenn sie im Angebot stehen.`,
    },
    {
      kicker: "Grund",
      question: "Warum brauchen Sie das?",
      short: "Büro und unterwegs arbeiten mit derselben Zeile.",
      full: "Büro und unterwegs arbeiten mit derselben Zeile. Do 9:00, Frau Keller, Rückruf wird nicht noch einmal getippt. Programme, die bei Ihnen zuverlässig laufen, bleiben.",
    },
  ] as const;

  return (
    <div className={styles.packs} data-variant="a">
      {packs.map((pack, index) => {
        const isOpen = open === index;
        return (
          <Card
            key={pack.kicker}
            data-open={isOpen ? "true" : "false"}
            className={`${styles.pack} ${styles[tones[index]]} ring-0 shadow-none`}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setOpen(index);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") {
                setOpen((current) => (current === index ? null : current));
              }
            }}
          >
            <h2 className={styles.question}>
              <button
                type="button"
                className={styles.hit}
                aria-expanded={isOpen}
                onClick={() => {
                  if (canHover()) return;
                  setOpen((current) => (current === index ? null : index));
                }}
                onFocus={() => setOpen(index)}
              >
                <Badge className={styles.kicker}>{pack.kicker}</Badge>
                <span className={styles.ask}>{pack.question}</span>
              </button>
            </h2>
            <p className={styles.body}>{isOpen ? pack.full : pack.short}</p>
            <div className={styles.figure}>
              {index === 0 ? <ProblemFigure open={isOpen} /> : null}
              {index === 1 ? <OfferFigure open={isOpen} price={price} /> : null}
              {index === 2 ? <ReasonFigure open={isOpen} /> : null}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function VariantB({ price }: { price: string }) {
  const [one, setOne] = useState(false);

  return (
    <section className={styles.stage} data-variant="b" data-one={one ? "true" : "false"}>
      <p className={styles.stageKicker}>{one ? "Eine Zeile" : "Zweimal dieselbe Angabe"}</p>
      <div className={styles.stageField}>
        <div className={styles.fact}>
          <span className={styles.factWhere}>{one ? "Notiz und Büro" : "Notiz"}</span>
          <span className={styles.factLine}>Do 9:00 · Frau Keller · Rückruf</span>
        </div>
        {one ? null : (
          <div className={styles.fact}>
            <span className={styles.factWhere}>Büro fragt</span>
            <span className={styles.factLine}>Do 9:00 · Frau Keller · Rückruf</span>
          </div>
        )}
      </div>
      <p className={styles.stageBody}>
        {one
          ? "Das Büro arbeitet mit dieser Zeile weiter. Sie wird nicht noch einmal getippt."
          : "Die Notiz hat die Uhrzeit schon. Das Büro fragt sie trotzdem noch einmal."}
      </p>
      {one ? (
        <p className={styles.stagePrice}>
          Datenbasis und ein Prozessmodul, zusammen {price}. Ohne monatliche Betreuung, keine
          kaufmännische Software.
        </p>
      ) : null}
      <Button
        type="button"
        variant="outline"
        className={styles.stageButton}
        aria-pressed={one}
        onClick={() => setOne((value) => !value)}
      >
        {one ? "Die doppelte Angabe zeigen" : "Zur gemeinsamen Zeile"}
      </Button>
    </section>
  );
}

const steps = [
  {
    question: "Was für ein Problem haben Sie?",
    body: "Sie notieren Do 9:00, Frau Keller und Rückruf. Dieselbe Uhrzeit fragt das Büro noch einmal, weil es die Notiz nicht hat.",
    fact: "Do 9:00 · Frau Keller · Rückruf",
    factWhere: "steht schon, und wird noch einmal gefragt",
  },
  {
    question: "Was verkaufen wir?",
    body: "Datenbasis und ein Prozessmodul. Eine monatliche Betreuung ist darin nicht enthalten. Die Datenbasis ist keine kaufmännische Software. Weitere Module kommen nur, wenn sie im Angebot stehen.",
    fact: "",
    factWhere: "",
  },
  {
    question: "Warum brauchen Sie das?",
    body: "Notiz und Büro arbeiten mit derselben Zeile. Do 9:00, Frau Keller, Rückruf wird nicht noch einmal getippt. Programme, die bei Ihnen zuverlässig laufen, bleiben.",
    fact: "Do 9:00 · Frau Keller · Rückruf",
    factWhere: "eine Zeile für Notiz und Büro",
  },
] as const;

function VariantC({ price }: { price: string }) {
  const [step, setStep] = useState(0);
  const current = steps[step];

  return (
    <section className={styles.guide} data-variant="c" aria-live="polite">
      <p className={styles.guideCount}>
        {step + 1} von {steps.length}
      </p>
      <h2 className={styles.guideQuestion}>{current.question}</h2>
      <p className={styles.guideBody}>{current.body}</p>
      {step === 1 ? <p className={styles.guidePrice}>{price}</p> : null}
      {current.fact ? (
        <p className={styles.guideFact}>
          <span>{current.factWhere}</span>
          {current.fact}
        </p>
      ) : null}
      <div className={styles.guideNav}>
        <Button
          type="button"
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
        >
          Zurück
        </Button>
        {step < steps.length - 1 ? (
          <Button
            type="button"
            className="bg-[#198BE8] text-white hover:bg-[#1576C4]"
            onClick={() => setStep((value) => value + 1)}
          >
            Weiter
          </Button>
        ) : (
          <Button type="button" variant="outline" onClick={() => setStep(0)}>
            Von vorn
          </Button>
        )}
      </div>
    </section>
  );
}

function QuietClose({ note }: { note: string }) {
  return (
    <>
      <p className={styles.note}>{note}</p>
      <p className={styles.aside}>
        Wie ein Bestellweg in einem Laden aussehen kann, zeigt die Kundengeschichte{" "}
        <Link
          href="/referenzen/feinkost-kreta"
          className="text-[#198BE8] underline-offset-4 hover:underline"
        >
          Projekt Feinkost Kreta
        </Link>
        .
      </p>
    </>
  );
}

export function AblaeufeStory({
  price,
  note,
  focus,
  children,
}: {
  price: string;
  note: string;
  focus: StoryFocus;
  children?: ReactNode;
}) {
  const show = (id: StoryFocus) => focus === "alle" || focus === id;

  return (
    <div className={styles.path}>
      <Switcher focus={focus} />
      <div className={focus === "alle" ? styles.board : undefined}>
        {show("a") ? (
          <div className={styles.slot} id="entwurf-a">
            {focus === "alle" ? <p className={styles.slotLabel}>A · Drei Pakete</p> : null}
            <VariantA price={price} />
          </div>
        ) : null}
        {show("b") ? (
          <div className={styles.slot} id="entwurf-b">
            {focus === "alle" ? <p className={styles.slotLabel}>B · Eine Fläche</p> : null}
            <VariantB price={price} />
          </div>
        ) : null}
        {show("c") ? (
          <div className={styles.slot} id="entwurf-c">
            {focus === "alle" ? <p className={styles.slotLabel}>C · Eine Frage</p> : null}
            <VariantC price={price} />
          </div>
        ) : null}
      </div>
      <QuietClose note={note} />
      {children ? <div className={styles.follow}>{children}</div> : null}
    </div>
  );
}
