"use client";

import { useMemo, useState } from "react";

interface StepData {
  index: number;
  value: number;
  current: number;
  best: number;
  start: number;
  bestStart: number;
  bestEnd: number;
  compare: string;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const NUMS = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

const STEPS: StepData[] = [
  {
    index: 0,
    value: -2,
    current: -2,
    best: -2,
    start: 0,
    bestStart: 0,
    bestEnd: 0,
    compare: "init with nums[0]",
    decision: "首元初始化",
    proof: "题目要求非空子数组，全负数组也必须返回某个元素，不能初始化为 0。",
    action: "current = best = -2",
    codeLine: 1,
  },
  {
    index: 1,
    value: 1,
    current: 1,
    best: 1,
    start: 1,
    bestStart: 1,
    bestEnd: 1,
    compare: "max(1, -2 + 1)",
    decision: "从当前重启",
    proof: "前缀 current=-2 是负债，接上它只会让 1 变差。",
    action: "current = 1, best = 1",
    codeLine: 3,
  },
  {
    index: 2,
    value: -3,
    current: -2,
    best: 1,
    start: 1,
    bestStart: 1,
    bestEnd: 1,
    compare: "max(-3, 1 + -3)",
    decision: "延续但不刷新 best",
    proof: "接上当前段得到 -2，虽然变差，但仍比单独 -3 更好。",
    action: "current = -2, best = 1",
    codeLine: 3,
  },
  {
    index: 3,
    value: 4,
    current: 4,
    best: 4,
    start: 3,
    bestStart: 3,
    bestEnd: 3,
    compare: "max(4, -2 + 4)",
    decision: "从当前重启",
    proof: "负前缀不值得延续，直接从 4 开新段。",
    action: "current = 4, best = 4",
    codeLine: 3,
  },
  {
    index: 4,
    value: -1,
    current: 3,
    best: 4,
    start: 3,
    bestStart: 3,
    bestEnd: 3,
    compare: "max(-1, 4 + -1)",
    decision: "延续当前段",
    proof: "4 + -1 = 3，虽然下降，但仍比重启成 -1 更好。",
    action: "current = 3, best = 4",
    codeLine: 3,
  },
  {
    index: 5,
    value: 2,
    current: 5,
    best: 5,
    start: 3,
    bestStart: 3,
    bestEnd: 5,
    compare: "max(2, 3 + 2)",
    decision: "延续并刷新 best",
    proof: "当前段 [4,-1,2] 的和达到 5，超过历史最优。",
    action: "current = 5, best = 5",
    codeLine: 4,
  },
  {
    index: 6,
    value: 1,
    current: 6,
    best: 6,
    start: 3,
    bestStart: 3,
    bestEnd: 6,
    compare: "max(1, 5 + 1)",
    decision: "继续刷新 best",
    proof: "当前段 [4,-1,2,1] 的和达到 6。",
    action: "current = 6, best = 6",
    codeLine: 4,
  },
  {
    index: 7,
    value: -5,
    current: 1,
    best: 6,
    start: 3,
    bestStart: 3,
    bestEnd: 6,
    compare: "max(-5, 6 + -5)",
    decision: "延续但 best 不变",
    proof: "接上 -5 后 current 只剩 1，不足以刷新 best。",
    action: "current = 1, best = 6",
    codeLine: 3,
  },
  {
    index: 8,
    value: 4,
    current: 5,
    best: 6,
    start: 3,
    bestStart: 3,
    bestEnd: 6,
    compare: "max(4, 1 + 4)",
    decision: "延续但 best 不变",
    proof: "最后得到 current=5，仍低于历史最优 6。",
    action: "return 6",
    codeLine: 5,
  },
];

const CODE_LINES = [
  "current = nums[0], best = nums[0]",
  "for i from 1 to n - 1:",
  "  extend = current + nums[i]",
  "  current = max(nums[i], extend)",
  "  best = max(best, current)",
  "return best",
];

export function MaxSubarrayDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const bestIndices = useMemo(() => {
    const set = new Set<number>();
    for (let i = step.bestStart; i <= step.bestEnd; i += 1) set.add(i);
    return set;
  }, [step.bestStart, step.bestEnd]);

  const currentIndices = useMemo(() => {
    const set = new Set<number>();
    for (let i = step.start; i <= step.index; i += 1) set.add(i);
    return set;
  }, [step.start, step.index]);

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
                连续子数组最大和：延续还是重启
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>best</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.best}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.index}-${index}`}
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
              <div className="mb-3 grid grid-cols-[repeat(9,minmax(28px,1fr))] gap-2 text-center font-mono text-xs font-semibold text-secondary">
                {NUMS.map((_, index) => (
                  <div key={index}>[{index}]</div>
                ))}
              </div>

              <div className="grid grid-cols-[repeat(9,minmax(28px,1fr))] gap-2">
                {NUMS.map((value, index) => {
                  const isScan = index === step.index;
                  const isBest = bestIndices.has(index);
                  const isCurrent = currentIndices.has(index);

                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex min-h-14 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isScan
                          ? "border-accent bg-accent/10 text-accent"
                          : isBest
                            ? "border-success/70 bg-success/10 text-success"
                            : isCurrent
                              ? "border-border bg-bg text-primary"
                              : "border-border bg-bg text-secondary opacity-55"
                      }`}
                    >
                      <span className="text-lg font-bold">{value}</span>
                      {isScan ? (
                        <span className="absolute -top-5 text-[10px] font-bold text-accent">
                          scan
                        </span>
                      ) : null}
                      <span className="text-[10px] font-semibold text-secondary">
                        {isBest ? "best" : isCurrent ? "current" : "历史"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StateCard label="current" value={String(step.current)} />
                <StateCard label="best" value={String(step.best)} />
                <StateCard
                  label="best range"
                  value={`[${step.bestStart}, ${step.bestEnd}]`}
                />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">状态定义</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  current 是必须包含当前位置的最大和
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">转移选择</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  接上前段，或从当前重启
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">边界陷阱</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  全负数组不能用 0 初始化
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                current judgment
              </p>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <p className="font-mono text-lg font-bold text-accent sm:text-xl">
                  {step.compare}
                </p>
                <p
                  className={`rounded-control border px-2 py-1 text-xs font-semibold ${
                    step.best === step.current
                      ? "border-success text-success"
                      : "border-border text-secondary"
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
                  只有 current 为负债时，后续元素才应该摆脱它。
                </p>
                <p className="text-secondary">
                  若把 best/current 初始化为 0，全负数组会错误返回 0。
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
        面试白板法：每到一个新元素，只比较“接上前段”和“从这里重启”，用 current 压缩局部状态，用 best 保存全局答案。
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
