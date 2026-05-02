"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = { question: string; answer: string };

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border border-border rounded-lg bg-white">
      {items.map((it, i) => {
        const expanded = open === i;
        const id = `acc-${i}`;
        return (
          <div key={i}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={id}
              onClick={() => setOpen(expanded ? null : i)}
              className="w-full flex items-center justify-between text-left px-5 py-4 font-semibold text-primary"
            >
              <span>{it.question}</span>
              <ChevronDown
                size={20}
                aria-hidden
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
            {expanded && (
              <div id={id} className="px-5 pb-4 text-muted">
                {it.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
