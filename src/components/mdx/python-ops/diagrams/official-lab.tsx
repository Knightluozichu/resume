"use client";

import { useState } from "react";

export interface PythonOpsCase {
  label: string;
  target: string;
  action: string;
  evidence: string;
  invariant: string;
}

const active = {
  cyan: "border-cyan-500 bg-cyan-500/15",
  emerald: "border-emerald-500 bg-emerald-500/15",
  amber: "border-amber-500 bg-amber-500/15",
} as const;

export function PythonOpsOfficialLab({
  title,
  caption,
  cases,
  tone = "cyan",
  initial = 0,
}: {
  title: string;
  caption: string;
  cases: ReadonlyArray<PythonOpsCase>;
  tone?: keyof typeof active;
  initial?: number;
}) {
  const [selected, setSelected] = useState(initial);
  const item = cases[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
          <strong className="text-sm text-primary">{title}</strong>
          <span className="text-xs text-secondary">
            {selected + 1} / {cases.length}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {cases.map((entry, index) => (
            <button
              key={entry.label}
              type="button"
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
              className={`min-h-14 break-words border px-2 py-2 text-xs leading-5 text-primary ${
                selected === index
                  ? active[tone]
                  : "border-border bg-bg"
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <Cell label="目标 / 输入" value={item.target} />
          <span className="self-center text-center text-secondary" aria-hidden="true">
            →
          </span>
          <Cell label="动作 / 控制" value={item.action} />
          <span className="self-center text-center text-secondary" aria-hidden="true">
            →
          </span>
          <Cell label="证据 / 结果" value={item.evidence} />
        </div>

        <div className="mt-3 border border-border bg-bg p-3 text-sm leading-6 text-primary">
          <span className="mr-2 text-xs text-secondary">必须保持</span>
          {item.invariant}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-28 border border-border bg-bg p-3">
      <span className="text-xs text-secondary">{label}</span>
      <strong className="mt-2 block break-words text-sm leading-6 text-primary">
        {value}
      </strong>
    </div>
  );
}
