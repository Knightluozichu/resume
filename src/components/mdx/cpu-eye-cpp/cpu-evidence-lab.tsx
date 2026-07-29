"use client";

import { useState } from "react";

export interface CpuEvidenceStage {
  label: string;
  layer: string;
  evidence: string;
  falsifier: string;
}

interface CpuEvidenceLabProps {
  title: string;
  question: string;
  stages: readonly CpuEvidenceStage[];
}

export function CpuEvidenceLab({
  title,
  question,
  stages,
}: CpuEvidenceLabProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  return (
    <figure
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cpu-evidence-chain"
    >
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-accent">
              可证伪的 CPU 证据链
            </p>
            <h3 className="mt-1 text-base font-semibold text-primary">{title}</h3>
            <p className="mt-1 text-sm text-secondary">{question}</p>
          </div>
          <button
            type="button"
            className="rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary transition-colors hover:text-primary"
            onClick={() => setActiveIndex(0)}
          >
            重置实验
          </button>
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)]">
        <div className="border-b border-border p-4 md:border-r md:border-b-0">
          <ol className="space-y-2" aria-label="证据层级">
            {stages.map((stage, index) => {
              const selected = index === activeIndex;
              return (
                <li key={stage.label}>
                  <button
                    type="button"
                    className={`w-full rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                      selected
                        ? "border-accent bg-accent/10 text-primary"
                        : "border-border bg-surface text-secondary hover:text-primary"
                    }`}
                    aria-pressed={selected}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="mr-2 font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {stage.label}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="p-5" aria-live="polite">
          <div className="grid gap-3 sm:grid-cols-3">
            <section className="rounded-control border border-border bg-surface p-3">
              <p className="text-xs font-semibold text-accent">解释层</p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {active.layer}
              </p>
            </section>
            <section className="rounded-control border border-border bg-surface p-3">
              <p className="text-xs font-semibold text-success">应看到的证据</p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {active.evidence}
              </p>
            </section>
            <section className="rounded-control border border-border bg-surface p-3">
              <p className="text-xs font-semibold text-warning">反证操作</p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {active.falsifier}
              </p>
            </section>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-secondary">
            {stages.map((stage, index) => (
              <span
                key={stage.label}
                className={`h-1.5 flex-1 rounded-full ${
                  index <= activeIndex ? "bg-accent" : "bg-border"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-secondary">
            通过条件：结论必须同时写清适用前提、可重复观测和一个能推翻它的实验。
          </p>
        </div>
      </div>
      <figcaption className="border-t border-border px-5 py-3 text-sm text-secondary">
        切换层级，检查同一个结论是否从语言语义一直追到机器与运行证据；任何一层不成立，都要收窄结论。
      </figcaption>
    </figure>
  );
}
