"use client";

import { useState } from "react";

export interface MasteringRustCase {
  label: string;
  input: string;
  rule: string;
  evidence: string;
  invariant: string;
}

const active = {
  cyan: "border-cyan-500 bg-cyan-500/15",
  amber: "border-amber-500 bg-amber-500/15",
  emerald: "border-emerald-500 bg-emerald-500/15",
} as const;

export function MasteringRustOfficialLab({
  title,
  caption,
  cases,
  tone = "cyan",
  initial = 0,
}: {
  title: string;
  caption: string;
  cases: ReadonlyArray<MasteringRustCase>;
  tone?: keyof typeof active;
  initial?: number;
}) {
  const [selected, setSelected] = useState(Math.min(initial, cases.length - 1));
  function resetExperiment() {
    setSelected(Math.min(initial, cases.length - 1));
  }

  const item = cases[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
          <strong className="text-sm text-primary">{title}</strong>
          <span className="text-xs text-secondary">{selected + 1} / {cases.length}</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {cases.map((entry, index) => (
            <button
              key={entry.label}
              type="button"
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
              className={`min-h-16 break-words border px-2 py-2 text-xs leading-5 text-primary ${selected === index ? active[tone] : "border-border bg-bg"}`}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <Cell label="目标 / 输入" value={item.input} />
          <span className="self-center text-center text-secondary" aria-hidden="true">→</span>
          <Cell label="类型 / 规则" value={item.rule} />
          <span className="self-center text-center text-secondary" aria-hidden="true">→</span>
          <Cell label="测试 / 证据" value={item.evidence} />
        </div>

        <div className="mt-3 border border-border bg-bg p-3 text-sm leading-6 text-primary">
          <span className="mr-2 text-xs text-secondary">必须保持</span>
          {item.invariant}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-28 border border-border bg-bg p-3">
      <span className="text-xs text-secondary">{label}</span>
      <strong className="mt-2 block break-words text-sm leading-6 text-primary">{value}</strong>
    </div>
  );
}
