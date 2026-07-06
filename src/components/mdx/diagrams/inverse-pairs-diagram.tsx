"use client";

import { useMemo, useState } from "react";

interface StepData {
  phase: string;
  left: number[];
  right: number[];
  i: number;
  j: number;
  merged: number[];
  added: number;
  total: number;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const ORIGINAL = [1, 3, 2, 3, 1];

const STEPS: StepData[] = [
  {
    phase: "split",
    left: [1, 3, 2],
    right: [3, 1],
    i: -1,
    j: -1,
    merged: [],
    added: 0,
    total: 0,
    decision: "先分治，不暴力枚举",
    proof: "把数组切成左右两段，递归先解决段内逆序对，再在合并时统计跨段逆序对。",
    action: "mergeCount(0, 4)",
    codeLine: 1,
  },
  {
    phase: "left half",
    left: [1, 3],
    right: [2],
    i: 1,
    j: 0,
    merged: [1, 2],
    added: 1,
    total: 1,
    decision: "左段剩余都大于右值",
    proof: "左段有序，3 > 2，因此从 3 到左段末尾的 1 个元素都和 2 构成逆序对。",
    action: "count += 1",
    codeLine: 4,
  },
  {
    phase: "right half",
    left: [3],
    right: [1],
    i: 0,
    j: 0,
    merged: [1],
    added: 1,
    total: 2,
    decision: "右半内部产生 1 对",
    proof: "3 > 1，右半段 [3,1] 自身贡献一个逆序对。",
    action: "count += 1",
    codeLine: 4,
  },
  {
    phase: "final merge",
    left: [1, 2, 3],
    right: [1, 3],
    i: 0,
    j: 0,
    merged: [1],
    added: 0,
    total: 2,
    decision: "相等不计数",
    proof: "逆序对要求严格大于。left[i] <= right[j] 时先取左值，避免重复元素被误算。",
    action: "take left 1",
    codeLine: 3,
  },
  {
    phase: "final merge",
    left: [1, 2, 3],
    right: [1, 3],
    i: 1,
    j: 0,
    merged: [1, 1],
    added: 2,
    total: 4,
    decision: "一次加剩余长度",
    proof: "2 > 1，且左段剩余 [2,3] 都大于右值 1，所以跨段逆序对一次加 2。",
    action: "count += mid - i + 1 = 2",
    codeLine: 4,
  },
  {
    phase: "done",
    left: [1, 2, 3],
    right: [1, 3],
    i: 2,
    j: 1,
    merged: [1, 1, 2, 3, 3],
    added: 0,
    total: 4,
    decision: "排序与计数同时闭环",
    proof: "合并后数组有序，计数包含左半、右半、跨半三部分，总逆序对为 4。",
    action: "return 4",
    codeLine: 6,
  },
];

const CODE_LINES = [
  "count = mergeCount(left) + mergeCount(right)",
  "while i <= mid and j <= r:",
  "  if nums[i] <= nums[j]: take left",
  "  else:",
  "    count += mid - i + 1",
  "    take right",
  "return count",
];

export function InversePairsDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const originalMarkers = useMemo(() => {
    if (currentStep === 0) return new Set<number>();
    if (currentStep <= 2) return new Set([1, 2, 3, 4].slice(0, currentStep + 1));
    return new Set([1, 2, 3, 4]);
  }, [currentStep]);

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
                数组逆序对：归并时批量计数
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>count</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.total}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.phase}-${index}`}
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                original sample
              </p>
              <div className="mt-3 grid grid-cols-[repeat(5,minmax(40px,1fr))] gap-2">
                {ORIGINAL.map((value, index) => (
                  <div
                    key={`${value}-${index}`}
                    className={`relative flex min-h-14 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                      originalMarkers.has(index)
                        ? "border-warning bg-warning/10 text-warning"
                        : "border-border bg-bg text-primary"
                    }`}
                  >
                    <span className="text-xs font-semibold text-secondary">
                      [{index}]
                    </span>
                    <span className="text-lg font-bold">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <MergeLane
                  title="left sorted"
                  values={step.left}
                  pointer={step.i}
                  pointerLabel="i"
                />
                <MergeLane
                  title="right sorted"
                  values={step.right}
                  pointer={step.j}
                  pointerLabel="j"
                />
              </div>

              <section className="mt-4 rounded-card border border-border bg-bg p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                    merged buffer
                  </p>
                  <p className="rounded-control border border-border px-2 py-1 text-xs font-semibold text-secondary">
                    {step.phase}
                  </p>
                </div>
                <div className="mt-3 flex min-h-12 flex-wrap gap-2">
                  {step.merged.length ? (
                    step.merged.map((value, index) => (
                      <span
                        key={`${value}-${index}`}
                        className="rounded-control border border-success/70 bg-success/10 px-3 py-2 font-mono text-sm font-bold text-success"
                      >
                        {value}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-secondary">
                      等待子数组合并结果
                    </span>
                  )}
                </div>
              </section>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <StateCard label="this step" value={`+${step.added}`} />
                <StateCard label="total" value={String(step.total)} />
                <StateCard label="sample answer" value="4" />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                merge judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  {comparisonText(step)}
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
                  不是每次发现逆序只加 1，而是加左段剩余长度。
                </p>
                <p className="text-secondary">
                  相等元素不能计入逆序对，比较分支应使用 nums[i] &lt;= nums[j]。
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
        面试白板法：先让左右段有序，再用一次合并同时完成排序和跨段逆序对统计。
      </figcaption>
    </figure>
  );
}

function MergeLane({
  title,
  values,
  pointer,
  pointerLabel,
}: {
  title: string;
  values: number[];
  pointer: number;
  pointerLabel: string;
}) {
  return (
    <section className="rounded-card border border-border bg-bg p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
        {title}
      </p>
      <div className="mt-3 flex min-h-14 flex-wrap gap-2">
        {values.map((value, index) => (
          <span
            key={`${title}-${value}-${index}`}
            className={`relative rounded-control border px-3 py-2 font-mono text-sm font-bold ${
              index === pointer
                ? "border-accent bg-accent/10 text-accent"
                : index > pointer && pointer >= 0
                  ? "border-warning/70 bg-warning/10 text-warning"
                  : "border-border text-primary"
            }`}
          >
            {value}
            {index === pointer ? (
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-accent">
                {pointerLabel}
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </section>
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

function comparisonText(step: StepData) {
  if (step.i < 0 || step.j < 0) return "divide array";
  return `${step.left[step.i]} ? ${step.right[step.j]}`;
}
