"use client";

import { useState } from "react";

export type CodingInterviewCase = {
  label: string;
  fields: readonly (readonly [string, string])[];
  alert?: string;
};

type CodingInterviewLabProps = {
  cases: readonly CodingInterviewCase[];
  caption: string;
};

export function CodingInterviewLab({ cases, caption }: CodingInterviewLabProps) {
  const [active, setActive] = useState(0);
  function resetExperiment() {
    setActive(0);
  }

  const selected = cases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label={caption}>
          {cases.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`border px-3 py-2 text-sm font-medium ${active === index ? "border-accent bg-accent/10 text-primary" : "border-border bg-bg text-secondary"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {selected.fields.map(([key, value]) => (
            <div key={key} className="border border-border bg-bg p-3">
              <p className="m-0 text-xs font-semibold text-accent">{key}</p>
              <p className="mb-0 mt-1 text-sm text-secondary">{value}</p>
            </div>
          ))}
        </div>
        {selected.alert ? (
          <p className="mb-0 mt-3 border-l-4 border-warning bg-warning/5 p-3 text-sm text-secondary">
            {selected.alert}
          </p>
        ) : null}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}
