"use client";

import { useMemo, useState } from "react";

interface StepData {
  scanIndex: number;
  jokers: number;
  gap: number;
  consumed: number;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
  duplicate: boolean;
  valid: boolean | null;
}

const CARDS = [0, 0, 1, 3, 5];

const STEPS: StepData[] = [
  {
    scanIndex: 0,
    jokers: 1,
    gap: 0,
    consumed: 0,
    decision: "统计大小王",
    proof: "排序后 0 在最前面，第一张 0 是可补缺口资源。",
    action: "jokers = 1",
    codeLine: 1,
    duplicate: false,
    valid: null,
  },
  {
    scanIndex: 1,
    jokers: 2,
    gap: 0,
    consumed: 0,
    decision: "继续统计 0",
    proof: "两个 0 可以填两个缺口，但不能替代非零重复。",
    action: "jokers = 2",
    codeLine: 1,
    duplicate: false,
    valid: null,
  },
  {
    scanIndex: 2,
    jokers: 2,
    gap: 1,
    consumed: 1,
    decision: "发现缺口 2",
    proof: "1 到 3 中间缺 2，需要消耗 1 张大小王。",
    action: "gap += 3 - 1 - 1 = 1",
    codeLine: 3,
    duplicate: false,
    valid: null,
  },
  {
    scanIndex: 3,
    jokers: 2,
    gap: 2,
    consumed: 2,
    decision: "发现缺口 4",
    proof: "3 到 5 中间缺 4，再消耗 1 张大小王，总缺口等于 2。",
    action: "gap += 5 - 3 - 1 = 1",
    codeLine: 3,
    duplicate: false,
    valid: null,
  },
  {
    scanIndex: 4,
    jokers: 2,
    gap: 2,
    consumed: 2,
    decision: "缺口可被填满",
    proof: "gap=2 且 jokers=2，最小非零 1 到最大 5 的跨度为 4，可以组成 1,2,3,4,5。",
    action: "return true",
    codeLine: 4,
    duplicate: false,
    valid: true,
  },
  {
    scanIndex: 3,
    jokers: 1,
    gap: 0,
    consumed: 0,
    decision: "反例：非零重复",
    proof: "样例 [0,1,2,2,5] 中 2 重复，0 只能补缺口，不能消掉重复牌。",
    action: "return false",
    codeLine: 2,
    duplicate: true,
    valid: false,
  },
];

const DUPLICATE_EXAMPLE = [0, 1, 2, 2, 5];

const CODE_LINES = [
  "count sorted zeros as jokers",
  "if arr[i] == arr[i + 1]: return false",
  "gap += arr[i + 1] - arr[i] - 1",
  "return gap <= jokers and max - min <= 4",
];

export function StraightCardsDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];
  const cards = step.duplicate ? DUPLICATE_EXAMPLE : CARDS;

  const gapCards = useMemo(() => {
    if (step.duplicate) return new Set<number>();
    const set = new Set<number>();
    if (step.scanIndex >= 2) set.add(2);
    if (step.scanIndex >= 3) set.add(4);
    return set;
  }, [step.duplicate, step.scanIndex]);

  const prevStep = () => setCurrentStep((value) => Math.max(0, value - 1));
  const nextStep = () =>
    setCurrentStep((value) => Math.min(STEPS.length - 1, value + 1));

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-5xl">
      <div className="overflow-hidden rounded-card border border-border bg-bg">
        <div className="border-b border-border bg-elevated px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                interview whiteboard
              </p>
              <h3 className="mt-1 text-base font-semibold text-primary">
                扑克牌顺子：0 补缺口，不补重复
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>jokers</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.jokers}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.scanIndex}-${index}`}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={`h-8 min-w-8 rounded-control border px-2 font-mono text-xs font-semibold transition-colors ${
                    index === currentStep
                      ? "border-accent bg-accent text-bg"
                      : index < currentStep
                        ? "border-success text-success hover:border-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                  aria-label={`跳到第 ${index + 1} 步`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="rounded-card border border-border bg-elevated p-3 sm:p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                sorted cards
              </p>
              <div className="grid grid-cols-[repeat(5,minmax(44px,1fr))] gap-2">
                {cards.map((value, index) => {
                  const isScan = index === step.scanIndex;
                  const isJoker = value === 0;
                  const isDuplicate =
                    step.duplicate && value === 2 && (index === 2 || index === 3);
                  return (
                    <div
                      key={`${value}-${index}`}
                      className={`relative flex min-h-20 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isDuplicate
                          ? "border-danger bg-danger/10 text-danger"
                          : isScan
                            ? "border-accent bg-accent/10 text-accent"
                            : isJoker
                              ? "border-warning/70 bg-warning/10 text-warning"
                              : "border-border bg-bg text-primary"
                      }`}
                    >
                      {isScan ? (
                        <span className="absolute -top-5 text-[10px] font-bold uppercase text-accent">
                          scan
                        </span>
                      ) : null}
                      <span className="text-2xl font-bold">
                        {value === 0 ? "J" : value}
                      </span>
                      <span className="text-[10px] font-semibold text-secondary">
                        {isJoker ? "joker" : "card"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <section className="mt-5 rounded-card border border-border bg-bg p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                  gap slots
                </p>
                <div className="mt-3 grid grid-cols-[repeat(5,minmax(36px,1fr))] gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div
                      key={value}
                      className={`rounded-control border px-2 py-3 text-center font-mono text-sm font-bold ${
                        gapCards.has(value)
                          ? "border-warning bg-warning/10 text-warning"
                          : "border-border text-primary"
                      }`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </section>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <StateCard label="gap" value={String(step.gap)} />
                <StateCard label="joker used" value={String(step.consumed)} />
                <StateCard
                  label="result"
                  value={step.valid === null ? "checking" : step.valid ? "true" : "false"}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                straight judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  gap = {step.gap}
                </p>
                <p
                  className={`rounded-control border px-2 py-1 text-xs font-semibold ${
                    step.valid === false
                      ? "border-danger text-danger"
                      : "border-success text-success"
                  }`}
                >
                  {step.decision}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-primary">
                {step.proof}
              </p>
              <p className="mt-2 text-sm font-semibold text-accent">
                {step.action}
              </p>
            </section>

            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                pseudo code cursor
              </p>
              <ol className="mt-3 space-y-1 font-mono text-xs leading-6">
                {CODE_LINES.map((line, index) => (
                  <li
                    key={line}
                    className={`grid grid-cols-[24px_minmax(0,1fr)] rounded-control px-2 ${
                      index === step.codeLine
                        ? "bg-accent/10 text-accent"
                        : "text-secondary"
                    }`}
                  >
                    <span>{index + 1}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                interview trap
              </p>
              <div className="mt-3 grid gap-2 text-sm leading-6">
                <p className="text-primary">
                  0 只能补缺失牌面，不能让两个相同非零牌同时存在。
                </p>
                <p className="text-secondary">
                  排序只是把缺口显性化；真正判断是重复失败与 gap &lt;= jokers。
                </p>
              </div>
            </section>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="rounded-control border border-border bg-bg px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent disabled:pointer-events-none disabled:opacity-35"
              >
                上一步
              </button>
              <span className="font-mono text-xs text-secondary">
                {currentStep + 1} / {STEPS.length}
              </span>
              <button
                type="button"
                onClick={nextStep}
                disabled={currentStep === STEPS.length - 1}
                className="rounded-control border border-border bg-bg px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent disabled:pointer-events-none disabled:opacity-35"
              >
                下一步
              </button>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        面试白板法：先排序，再把 0 当作补缺口预算；遇到非零重复立即失败。
      </figcaption>
    </figure>
  );
}

function StateCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-border bg-bg p-3 text-center">
      <p className="text-xs font-semibold text-secondary">{label}</p>
      <p className="mt-1 font-mono text-lg font-bold text-primary">{value}</p>
    </div>
  );
}
