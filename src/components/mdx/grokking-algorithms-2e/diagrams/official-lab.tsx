"use client";

import { useState } from "react";

export interface GrokkingAlgorithmsCase {
  label: string;
  fields: ReadonlyArray<readonly [string, string]>;
  alert?: string;
}

const activeClasses = {
  cyan: "border-cyan-500 bg-cyan-500/15 text-primary",
  emerald: "border-emerald-500 bg-emerald-500/15 text-primary",
  violet: "border-violet-500 bg-violet-500/15 text-primary",
  amber: "border-amber-500 bg-amber-500/15 text-primary",
  rose: "border-rose-500 bg-rose-500/15 text-primary",
} as const;

export function GrokkingAlgorithmsLab({
  cases,
  caption,
  tone = "cyan",
  initial = 0,
}: {
  cases: ReadonlyArray<GrokkingAlgorithmsCase>;
  caption: string;
  tone?: keyof typeof activeClasses;
  initial?: number;
}) {
  const [selected, setSelected] = useState(initial);
  const item = cases[selected];
  const selectorColumns =
    cases.length > 4
      ? "sm:grid-cols-3 lg:grid-cols-6"
      : "sm:grid-cols-4";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className={`grid grid-cols-2 gap-2 ${selectorColumns}`}>
          {cases.map((entry, index) => (
            <button
              key={entry.label}
              type="button"
              onClick={() => setSelected(index)}
              className={`min-h-12 border px-2 text-xs ${selected === index ? activeClasses[tone] : "border-border bg-bg text-secondary"}`}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {item.fields.map(([title, value]) => (
            <div key={title} className="border border-border bg-bg p-4">
              <span className="text-xs text-secondary">{title}</span>
              <strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong>
            </div>
          ))}
        </div>
        {item.alert ? (
          <div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">
            {item.alert}
          </div>
        ) : null}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}
