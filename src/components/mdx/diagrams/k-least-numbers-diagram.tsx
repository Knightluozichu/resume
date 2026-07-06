"use client";

import { useMemo, useState } from "react";

interface StepData {
  index: number;
  value: number | null;
  heap: number[];
  rejected: number[];
  selected: number[];
  compare: string;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const NUMS = [4, 5, 1, 6, 2, 7, 3, 8];
const K = 4;

const STEPS: StepData[] = [
  {
    index: 0,
    value: 4,
    heap: [4],
    rejected: [],
    selected: [0],
    compare: "heap.size < k",
    decision: "直接入堆",
    proof: "候选池还没满，先把 4 放进去。",
    action: "push(4)",
    codeLine: 2,
  },
  {
    index: 1,
    value: 5,
    heap: [5, 4],
    rejected: [],
    selected: [0, 1],
    compare: "heap.size < k",
    decision: "直接入堆",
    proof: "候选池大小为 2，小于 k=4，继续收集。",
    action: "push(5)",
    codeLine: 2,
  },
  {
    index: 2,
    value: 1,
    heap: [5, 4, 1],
    rejected: [],
    selected: [0, 1, 2],
    compare: "heap.size < k",
    decision: "直接入堆",
    proof: "候选池仍未满，不需要淘汰。",
    action: "push(1)",
    codeLine: 2,
  },
  {
    index: 3,
    value: 6,
    heap: [6, 5, 1, 4],
    rejected: [],
    selected: [0, 1, 2, 3],
    compare: "heap.size < k",
    decision: "填满候选池",
    proof: "前 4 个数先构成临时 Top-K，堆顶 6 是候选里最大的。",
    action: "push(6)",
    codeLine: 2,
  },
  {
    index: 4,
    value: 2,
    heap: [5, 4, 1, 2],
    rejected: [3],
    selected: [0, 1, 2, 4],
    compare: "2 < heap.top(6)",
    decision: "替换堆顶",
    proof: "2 比当前候选中最大的 6 更小，所以 6 不可能属于最小 4 个。",
    action: "pop(6), push(2)",
    codeLine: 4,
  },
  {
    index: 5,
    value: 7,
    heap: [5, 4, 1, 2],
    rejected: [3, 5],
    selected: [0, 1, 2, 4],
    compare: "7 >= heap.top(5)",
    decision: "直接淘汰",
    proof: "7 比候选池最大的 5 还大，不可能进入最小 4 个。",
    action: "skip(7)",
    codeLine: 5,
  },
  {
    index: 6,
    value: 3,
    heap: [4, 3, 1, 2],
    rejected: [1, 3, 5],
    selected: [0, 2, 4, 6],
    compare: "3 < heap.top(5)",
    decision: "替换堆顶",
    proof: "3 挤掉候选池里最大的 5，候选池变成 1、2、3、4。",
    action: "pop(5), push(3)",
    codeLine: 4,
  },
  {
    index: 7,
    value: 8,
    heap: [4, 3, 1, 2],
    rejected: [1, 3, 5, 7],
    selected: [0, 2, 4, 6],
    compare: "8 >= heap.top(4)",
    decision: "直接淘汰",
    proof: "8 不比候选池最大值 4 小，不能改变前 4 小集合。",
    action: "skip(8)",
    codeLine: 5,
  },
  {
    index: 7,
    value: null,
    heap: [4, 3, 1, 2],
    rejected: [1, 3, 5, 7],
    selected: [0, 2, 4, 6],
    compare: "heap = {1,2,3,4}",
    decision: "得到答案集合",
    proof: "最大堆只保证集合正确，不保证输出有序；若题目要求有序，再额外排序这 k 个数。",
    action: "return heap items",
    codeLine: 6,
  },
];

const CODE_LINES = [
  "if k <= 0: return []",
  "for x in nums:",
  "  if heap.size < k: push(x)",
  "  else if x < heap.top():",
  "    popTop(); push(x)",
  "  else: skip(x)",
  "return heap items",
];

export function KLeastNumbersDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const selectedSet = useMemo(() => new Set(step.selected), [step.selected]);
  const rejectedSet = useMemo(() => new Set(step.rejected), [step.rejected]);

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
                最小的 K 个数：最大堆维护候选池
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>k</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {K}
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
              <div className="mb-3 grid grid-cols-[repeat(8,minmax(34px,1fr))] gap-2 text-center font-mono text-xs font-semibold text-secondary">
                {NUMS.map((_, index) => (
                  <div key={index}>[{index}]</div>
                ))}
              </div>

              <div className="grid grid-cols-[repeat(8,minmax(34px,1fr))] gap-2">
                {NUMS.map((value, index) => {
                  const isCurrent = index === step.index && step.value !== null;
                  const isSelected = selectedSet.has(index);
                  const isRejected = rejectedSet.has(index);

                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex min-h-14 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isCurrent
                          ? "border-accent bg-accent/10 text-accent"
                          : isSelected
                            ? "border-success/70 bg-success/10 text-success"
                            : isRejected
                              ? "border-border bg-bg text-secondary opacity-35"
                              : "border-border bg-bg text-primary"
                      }`}
                    >
                      <span className="text-lg font-bold">{value}</span>
                      {isCurrent ? (
                        <span className="absolute -top-5 text-[10px] font-bold text-accent">
                          scan
                        </span>
                      ) : null}
                      <span className="text-[10px] font-semibold text-secondary">
                        {isRejected ? "淘汰" : isSelected ? "候选" : "未扫"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
                <section className="rounded-card border border-border bg-bg p-3">
                  <p className="text-xs font-semibold text-secondary">
                    max heap candidates
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.heap.map((value, index) => (
                      <span
                        key={`${value}-${index}`}
                        className={`rounded-control border px-3 py-2 font-mono text-sm font-bold ${
                          index === 0
                            ? "border-accent text-accent"
                            : "border-border text-primary"
                        }`}
                      >
                        {value}
                        {index === 0 ? " top" : ""}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="rounded-card border border-border bg-bg p-3">
                  <p className="text-xs font-semibold text-secondary">
                    complexity
                  </p>
                  <p className="mt-2 font-mono text-sm font-bold text-primary">
                    O(n log k)
                  </p>
                  <p className="mt-1 text-xs text-secondary">
                    空间 O(k)，适合 k 小或数据流。
                  </p>
                </section>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">不变量</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  堆里始终保留当前最小 k 个候选
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">堆顶含义</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  候选池中最大的数，最容易被淘汰
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">方法取舍</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  快选平均 O(n)，但会改动输入
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
                    currentStep === STEPS.length - 1
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
                interview choice
              </p>
              <div className="mt-3 grid gap-2 text-sm leading-6">
                <p className="text-primary">
                  数据量大、k 小、输入流式更新：优先最大堆。
                </p>
                <p className="text-secondary">
                  可改动数组且只要无序前 k 个：可讲快速选择，平均 O(n)。
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
        面试白板法：用大小为 k 的最大堆保留候选池，堆顶代表当前候选里最大的数，遇到更小值才替换。
      </figcaption>
    </figure>
  );
}
