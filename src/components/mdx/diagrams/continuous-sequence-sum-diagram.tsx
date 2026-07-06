"use client";

import { useMemo, useState } from "react";

interface StepData {
  left: number;
  right: number;
  sum: number;
  window: number[];
  found: string[];
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const VALUES = [1, 2, 3, 4, 5, 6, 7, 8];
const TARGET = 15;

const STEPS: StepData[] = [
  {
    left: 1,
    right: 1,
    sum: 0,
    window: [],
    found: [],
    decision: "sum < target",
    proof: "窗口和偏小，正数序列中只能扩张右端来增大 sum。",
    action: "sum += 1, right++",
    codeLine: 2,
  },
  {
    left: 1,
    right: 4,
    sum: 6,
    window: [1, 2, 3],
    found: [],
    decision: "继续扩张",
    proof: "1+2+3=6 仍小于 15，右端继续前进。",
    action: "sum += 4, right++",
    codeLine: 2,
  },
  {
    left: 1,
    right: 6,
    sum: 15,
    window: [1, 2, 3, 4, 5],
    found: ["[1,2,3,4,5]"],
    decision: "命中第一组",
    proof: "窗口 [1..5] 和为 15，记录答案后不能直接扩张，先缩左边继续找下一组。",
    action: "record, sum -= 1, left++",
    codeLine: 4,
  },
  {
    left: 2,
    right: 6,
    sum: 14,
    window: [2, 3, 4, 5],
    found: ["[1,2,3,4,5]"],
    decision: "sum < target",
    proof: "缩掉 1 后 sum=14 偏小，右端扩张到 6。",
    action: "sum += 6, right++",
    codeLine: 2,
  },
  {
    left: 2,
    right: 7,
    sum: 20,
    window: [2, 3, 4, 5, 6],
    found: ["[1,2,3,4,5]"],
    decision: "sum > target",
    proof: "窗口和偏大，正数序列中只能移走左端来减小 sum。",
    action: "sum -= 2, left++",
    codeLine: 3,
  },
  {
    left: 3,
    right: 7,
    sum: 18,
    window: [3, 4, 5, 6],
    found: ["[1,2,3,4,5]"],
    decision: "继续收缩",
    proof: "18 仍大于 15，继续移走左端 3。",
    action: "sum -= 3, left++",
    codeLine: 3,
  },
  {
    left: 4,
    right: 7,
    sum: 15,
    window: [4, 5, 6],
    found: ["[1,2,3,4,5]", "[4,5,6]"],
    decision: "命中第二组",
    proof: "窗口 [4..6] 和为 15，记录后继续缩左边避免卡住。",
    action: "record, sum -= 4, left++",
    codeLine: 4,
  },
  {
    left: 5,
    right: 7,
    sum: 11,
    window: [5, 6],
    found: ["[1,2,3,4,5]", "[4,5,6]"],
    decision: "继续搜索直到 left > target/2",
    proof: "每个值最多进窗口一次、出窗口一次，因此整体是 O(n)。",
    action: "continue / finish",
    codeLine: 5,
  },
];

const CODE_LINES = [
  "while left <= target / 2:",
  "  if sum < target: add right; right++",
  "  else if sum > target: remove left; left++",
  "  else: record window",
  "        remove left; left++",
  "return result",
];

export function ContinuousSequenceSumDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const windowSet = useMemo(() => new Set(step.window), [step.window]);

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
                连续正数序列：滑动窗口找所有和
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>target</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {TARGET}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.left}-${item.right}-${index}`}
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
              <div className="mb-3 grid grid-cols-[repeat(8,minmax(30px,1fr))] gap-2 text-center font-mono text-xs font-semibold text-secondary">
                {VALUES.map((value) => (
                  <div key={value}>{value}</div>
                ))}
              </div>

              <div className="grid grid-cols-[repeat(8,minmax(30px,1fr))] gap-2">
                {VALUES.map((value) => {
                  const isLeft = value === step.left;
                  const isRightNext = value === step.right;
                  const inWindow = windowSet.has(value);

                  return (
                    <div
                      key={value}
                      className={`relative flex min-h-16 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        inWindow
                          ? "border-success/70 bg-success/10 text-success"
                          : isRightNext
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border bg-bg text-secondary"
                      }`}
                    >
                      {isLeft ? (
                        <span className="absolute -top-5 text-[10px] font-bold uppercase text-accent">
                          left
                        </span>
                      ) : null}
                      {isRightNext ? (
                        <span className="absolute -bottom-5 text-[10px] font-bold uppercase text-accent">
                          next
                        </span>
                      ) : null}
                      <span className="text-lg font-bold">{value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <StateCard label="left" value={String(step.left)} />
                <StateCard label="right next" value={String(step.right)} />
                <StateCard label="sum" value={String(step.sum)} />
              </div>

              <section className="mt-4 rounded-card border border-border bg-bg p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                  recorded answers
                </p>
                <div className="mt-3 flex min-h-9 flex-wrap gap-2">
                  {step.found.length ? (
                    step.found.map((answer) => (
                      <span
                        key={answer}
                        className="rounded-control border border-success/70 bg-success/10 px-2 py-1 font-mono text-sm font-bold text-success"
                      >
                        {answer}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-secondary">尚未命中</span>
                  )}
                </div>
              </section>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                window judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  sum = {step.sum}
                </p>
                <p className="rounded-control border border-success px-2 py-1 text-xs font-semibold text-success">
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
                  sum == target 后要先记录，再移走 left，不能只 right++。
                </p>
                <p className="text-secondary">
                  只有全为正数时，扩张增大、收缩减小的单调判断才成立。
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
        面试白板法：正数窗口的和只随右扩变大、左缩变小，所以每个值最多进出一次。
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
