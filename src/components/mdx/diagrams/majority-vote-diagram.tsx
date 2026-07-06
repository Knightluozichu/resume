"use client";

import { useMemo, useState } from "react";

interface StepData {
  index: number;
  value: number | null;
  candidate: number | null;
  count: number;
  compare: string;
  decision: string;
  proof: string;
  action: string;
  eliminated: number[];
  active: number[];
  verifiedCount: number | null;
  codeLine: number;
}

const NUMS = [1, 2, 3, 2, 2, 2, 5, 4, 2];
const MAJORITY = 2;

const STEPS: StepData[] = [
  {
    index: 0,
    value: 1,
    candidate: 1,
    count: 1,
    compare: "count == 0",
    decision: "换候选",
    proof: "没有未抵消票时，当前数字先成为候选。",
    action: "candidate = 1, count = 1",
    eliminated: [],
    active: [0],
    verifiedCount: null,
    codeLine: 3,
  },
  {
    index: 1,
    value: 2,
    candidate: 1,
    count: 0,
    compare: "2 != candidate(1)",
    decision: "异号抵消",
    proof: "一个候选票和一个反对票成对删除，不改变真正多数元素的净优势。",
    action: "count--，1 与 2 抵消",
    eliminated: [0, 1],
    active: [],
    verifiedCount: null,
    codeLine: 5,
  },
  {
    index: 2,
    value: 3,
    candidate: 3,
    count: 1,
    compare: "count == 0",
    decision: "换候选",
    proof: "上一组已抵消干净，新的未抵消段从 3 开始。",
    action: "candidate = 3, count = 1",
    eliminated: [0, 1],
    active: [2],
    verifiedCount: null,
    codeLine: 3,
  },
  {
    index: 3,
    value: 2,
    candidate: 3,
    count: 0,
    compare: "2 != candidate(3)",
    decision: "异号抵消",
    proof: "3 与 2 配对删除，候选库存再次归零。",
    action: "count--，3 与 2 抵消",
    eliminated: [0, 1, 2, 3],
    active: [],
    verifiedCount: null,
    codeLine: 5,
  },
  {
    index: 4,
    value: 2,
    candidate: 2,
    count: 1,
    compare: "count == 0",
    decision: "换候选",
    proof: "抵消后剩下的新段从 2 开始，2 暂时成为候选。",
    action: "candidate = 2, count = 1",
    eliminated: [0, 1, 2, 3],
    active: [4],
    verifiedCount: null,
    codeLine: 3,
  },
  {
    index: 5,
    value: 2,
    candidate: 2,
    count: 2,
    compare: "2 == candidate(2)",
    decision: "同号加票",
    proof: "同候选值增加候选库存，抵消能力变强。",
    action: "count++",
    eliminated: [0, 1, 2, 3],
    active: [4, 5],
    verifiedCount: null,
    codeLine: 4,
  },
  {
    index: 6,
    value: 5,
    candidate: 2,
    count: 1,
    compare: "5 != candidate(2)",
    decision: "异号抵消",
    proof: "用一个 5 抵消一个未抵消的 2，2 的净优势仍然存在。",
    action: "count--",
    eliminated: [0, 1, 2, 3, 5, 6],
    active: [4],
    verifiedCount: null,
    codeLine: 5,
  },
  {
    index: 7,
    value: 4,
    candidate: 2,
    count: 0,
    compare: "4 != candidate(2)",
    decision: "异号抵消",
    proof: "4 再抵消一个 2，库存归零，但前面被删除的配对不影响多数结论。",
    action: "count--",
    eliminated: [0, 1, 2, 3, 4, 5, 6, 7],
    active: [],
    verifiedCount: null,
    codeLine: 5,
  },
  {
    index: 8,
    value: 2,
    candidate: 2,
    count: 1,
    compare: "count == 0",
    decision: "留下最终候选",
    proof: "最后未抵消的候选是 2，但第一遍只证明它可能是多数。",
    action: "candidate = 2, count = 1",
    eliminated: [0, 1, 2, 3, 4, 5, 6, 7],
    active: [8],
    verifiedCount: null,
    codeLine: 3,
  },
  {
    index: 8,
    value: null,
    candidate: 2,
    count: 1,
    compare: "verify(2) = 5 > 9 / 2",
    decision: "校验通过",
    proof: "输入可能没有多数元素，所以必须第二遍完整计数；这里 2 出现 5 次，超过一半。",
    action: "return 2",
    eliminated: [0, 1, 2, 3, 4, 5, 6, 7],
    active: [8],
    verifiedCount: 5,
    codeLine: 6,
  },
];

const CODE_LINES = [
  "candidate = 0, count = 0",
  "for x in nums:",
  "  if count == 0: candidate = x; count = 1",
  "  else if x == candidate: count++",
  "  else: count--",
  "verify = count(candidate)",
  "return verify * 2 > n ? candidate : -1",
];

export function MajorityVoteDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const eliminatedSet = useMemo(
    () => new Set(step.eliminated),
    [step.eliminated],
  );
  const activeSet = useMemo(() => new Set(step.active), [step.active]);

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
                超过一半的数字：摩尔投票抵消
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>majority</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                &gt; n/2
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-2">
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
                  const isCurrent = index === step.index && step.value !== null;
                  const isEliminated = eliminatedSet.has(index);
                  const isActive = activeSet.has(index);
                  const isMajority = value === MAJORITY;

                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex min-h-14 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isCurrent
                          ? "border-accent bg-accent/10 text-accent"
                          : isActive
                            ? "border-success/70 bg-success/10 text-success"
                            : isEliminated
                              ? "border-border bg-bg text-secondary opacity-35"
                              : isMajority
                                ? "border-success/50 bg-success/5 text-primary"
                                : "border-border bg-bg text-primary"
                      }`}
                    >
                      <span className="text-lg font-bold">{value}</span>
                      {isCurrent ? (
                        <span className="absolute -top-5 text-[10px] font-bold text-accent">
                          scan
                        </span>
                      ) : null}
                      {isEliminated ? (
                        <span className="text-[10px] font-semibold text-secondary">
                          抵消
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-secondary">
                          {value === step.candidate ? "候选" : "其他"}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StateCard
                  label="candidate"
                  value={step.candidate === null ? "-" : String(step.candidate)}
                />
                <StateCard label="count" value={String(step.count)} />
                <StateCard
                  label="verify"
                  value={
                    step.verifiedCount === null ? "待校验" : `${step.verifiedCount}/9`
                  }
                />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">不变量</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  不同数字成对删除，不改多数优势
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">第一遍</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  只找可能候选，不保证存在
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">第二遍</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  完整计数，确认是否超过一半
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
                    step.verifiedCount !== null
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
                verification trap
              </p>
              <div className="mt-3 grid gap-2 text-sm leading-6">
                <p className="text-primary">
                  第一遍结束的 candidate 只是“可能多数”。
                </p>
                <p className="text-secondary">
                  像 [1,2,3,4] 这种输入也会留下候选，所以必须第二遍计数。
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
        面试白板法：用 candidate/count 模拟成对抵消，第一遍压缩候选，第二遍验证是否真的超过一半。
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
