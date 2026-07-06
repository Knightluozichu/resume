"use client";

import { useMemo, useState } from "react";

interface StepData {
  left: number;
  right: number;
  mid: number;
  value: number;
  diff: number;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
  found: boolean;
}

const NUMS = [-3, -1, 1, 3, 5];

const STEPS: StepData[] = [
  {
    left: 0,
    right: 4,
    mid: 2,
    value: 1,
    diff: -1,
    decision: "nums[mid] < mid",
    proof: "f(2)=1-2=-1，当前值落后于下标；若要追上，只能去右半边。",
    action: "left = mid + 1",
    codeLine: 4,
    found: false,
  },
  {
    left: 3,
    right: 4,
    mid: 3,
    value: 3,
    diff: 0,
    decision: "nums[mid] == mid",
    proof: "f(3)=0，说明下标和值在这里相交，直接返回 3。",
    action: "return 3",
    codeLine: 3,
    found: true,
  },
];

const CODE_LINES = [
  "left = 0, right = n - 1",
  "while left <= right:",
  "  mid = left + (right - left) / 2",
  "  if nums[mid] == mid: return mid",
  "  if nums[mid] < mid: left = mid + 1",
  "  else: right = mid - 1",
  "return -1",
];

export function ValueEqualIndexDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const activeRange = useMemo(() => {
    const set = new Set<number>();
    for (let index = step.left; index <= step.right; index += 1) set.add(index);
    return set;
  }, [step.left, step.right]);

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
                值等于下标：二分找 f(i)=0
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>answer</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.found ? step.mid : "?"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.mid}-${index}`}
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
              <div className="mb-3 grid grid-cols-[repeat(5,minmax(44px,1fr))] gap-2 text-center font-mono text-xs font-semibold text-secondary">
                {NUMS.map((_, index) => (
                  <div key={index}>i={index}</div>
                ))}
              </div>

              <div className="grid grid-cols-[repeat(5,minmax(44px,1fr))] gap-2">
                {NUMS.map((value, index) => {
                  const isMid = index === step.mid;
                  const isActive = activeRange.has(index);
                  const diff = value - index;
                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex min-h-24 flex-col items-center justify-center rounded-control border p-2 font-mono transition-all ${
                        isMid
                          ? step.found
                            ? "border-success bg-success/10 text-success"
                            : "border-accent bg-accent/10 text-accent"
                          : isActive
                            ? "border-border bg-bg text-primary"
                            : "border-border bg-bg text-secondary opacity-35"
                      }`}
                    >
                      {isMid ? (
                        <span className="absolute -top-5 text-[10px] font-bold uppercase text-accent">
                          mid
                        </span>
                      ) : null}
                      <span className="text-lg font-bold">{value}</span>
                      <span className="mt-1 text-[10px] font-semibold text-secondary">
                        f={diff}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StateCard label="left" value={String(step.left)} />
                <StateCard label="mid" value={String(step.mid)} />
                <StateCard label="right" value={String(step.right)} />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">f(i) &lt; 0</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  值太小，向右找
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">f(i) = 0</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  命中答案
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">f(i) &gt; 0</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  值太大，向左找
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                binary judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  {step.value} - {step.mid} = {step.diff}
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
                  二分成立依赖有序数组；乱序时 f(i) 不再能指导方向。
                </p>
                <p className="text-secondary">
                  若有重复值，f(i) 不一定严格递增，找任意命中仍可二分，找边界需额外处理。
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
        面试白板法：把“值等于下标”改写成 f(i)=nums[i]-i，利用符号决定二分方向。
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
