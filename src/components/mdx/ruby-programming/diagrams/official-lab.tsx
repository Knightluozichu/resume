"use client";

import { useState } from "react";

export interface RubyOfficialCase {
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

export function RubyOfficialLab({
  cases,
  caption,
  tone = "cyan",
  initial = 0,
}: {
  cases: ReadonlyArray<RubyOfficialCase>;
  caption: string;
  tone?: keyof typeof activeClasses;
  initial?: number;
}) {
  const [selected, setSelected] = useState(initial);
  function resetExperiment() {
    setSelected(initial);
  }

  const item = cases[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className={`grid grid-cols-2 gap-2 ${cases.length > 4 ? "sm:grid-cols-5" : "sm:grid-cols-4"}`}>
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
        {item.alert ? <div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">{item.alert}</div> : null}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}
