"use client";

import { useState } from "react";

export type DecisionStage = {
  label: string;
  mechanism: string;
  failure: string;
  evidence: string;
};

type ChapterDecisionLabProps = {
  title: string;
  prompt: string;
  stages: readonly DecisionStage[];
  conclusion: string;
};

type ChapterEvidenceProps = {
  title: string;
  stages: readonly DecisionStage[];
};

export function ChapterMechanismMap({ title, stages }: ChapterEvidenceProps) {
  return (
    <figure className="not-prose my-8 rounded-card border border-border bg-elevated p-4">
      <p className="text-xs font-medium text-accent">机制总览</p>
      <h2 className="mt-1 text-lg font-semibold text-primary">{title}</h2>
      <ol className="mt-4 grid gap-3 md:grid-cols-3">
        {stages.map((stage, index) => (
          <li
            key={stage.label}
            className="relative rounded-control border border-border bg-bg p-4"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              {index + 1}
            </span>
            <p className="mt-3 text-sm font-semibold text-primary">
              {stage.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {stage.mechanism}
            </p>
            {index < stages.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-lg font-bold text-accent md:block"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-sm leading-relaxed text-secondary">
        先按顺序建立机制，再进入实验切换阶段并检查失效证据。
      </figcaption>
    </figure>
  );
}

export function ChapterFailureMatrix({ title, stages }: ChapterEvidenceProps) {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-warning">失效—证据矩阵</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">{title}</h2>
      </div>
      <div className="grid gap-3 p-4">
        {stages.map((stage) => (
          <div
            key={stage.label}
            className="grid gap-2 rounded-control border border-border bg-bg p-4 md:grid-cols-[0.55fr_1fr_1fr]"
          >
            <p className="text-sm font-semibold text-primary">{stage.label}</p>
            <div>
              <p className="text-xs font-medium text-warning">典型失效</p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                {stage.failure}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-accent">核验证据</p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                {stage.evidence}
              </p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="px-4 pb-4 text-sm leading-relaxed text-secondary">
        每个判断都必须能落到观测、测试或产物，不能只凭代码表面推测。
      </figcaption>
    </figure>
  );
}

export function ChapterDecisionLab({
  title,
  prompt,
  stages,
  conclusion,
}: ChapterDecisionLabProps) {
  const [activeStage, setActiveStage] = useState(0);
  const [failureVisible, setFailureVisible] = useState(false);
  const active = stages[activeStage];

  const reset = () => {
    setActiveStage(0);
    setFailureVisible(false);
  };

  return (
    <section
      aria-label={`${title}实验`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">章级决策实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            {prompt}
          </p>
        </div>
        <button
          type="button"
          aria-label={`重置${title}实验`}
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="text-xs font-medium text-secondary">选择推理阶段</p>
          <div className="mt-3 grid gap-2">
            {stages.map((stage, index) => {
              const selected = index === activeStage;
              return (
                <button
                  key={stage.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setActiveStage(index);
                    setFailureVisible(false);
                  }}
                  className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                    selected
                      ? "border-accent bg-bg font-semibold text-primary"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  <span className="mr-2 text-xs text-accent">{index + 1}</span>
                  {stage.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4">
          <div
            role="status"
            className="rounded-control border border-border bg-bg p-4"
          >
            <p className="text-xs font-medium text-accent">
              当前阶段 · {active.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {active.mechanism}
            </p>
          </div>

          <div className="mt-3 rounded-control border border-border p-4">
            <p className="text-xs font-medium text-secondary">可核验证据</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {active.evidence}
            </p>
          </div>

          <button
            type="button"
            aria-pressed={failureVisible}
            onClick={() => setFailureVisible((value) => !value)}
            className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${
              failureVisible
                ? "border-warning bg-bg text-primary"
                : "border-border text-secondary hover:border-warning hover:text-primary"
            }`}
          >
            {failureVisible ? "收起失效模式" : "检查这一阶段怎样失效"}
          </button>

          {failureVisible && (
            <div className="mt-3 rounded-control border border-warning bg-bg p-4">
              <p className="text-xs font-medium text-warning">失效模式</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">
                {active.failure}
              </p>
            </div>
          )}

          <p className="mt-4 border-l-4 border-accent pl-4 text-sm leading-relaxed text-secondary">
            {conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}
