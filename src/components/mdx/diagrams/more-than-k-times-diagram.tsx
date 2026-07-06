"use client";

import { useMemo, useState } from "react";

interface Candidate {
  value: number;
  count: number;
}

interface StepData {
  index: number;
  value: number | null;
  candidates: Candidate[];
  cancelled: number[];
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
  verifying: boolean;
}

const NUMS = [1, 2, 3, 1, 2, 1, 1, 3, 1];
const K = 3;
const THRESHOLD = Math.floor(NUMS.length / K);

const STEPS: StepData[] = [
  {
    index: 0,
    value: 1,
    candidates: [{ value: 1, count: 1 }],
    cancelled: [],
    decision: "候选桶未满",
    proof: "k=3，所以最多保留 2 个候选；遇到 1 时直接放入。",
    action: "candidates[1] = 1",
    codeLine: 2,
    verifying: false,
  },
  {
    index: 1,
    value: 2,
    candidates: [
      { value: 1, count: 1 },
      { value: 2, count: 1 },
    ],
    cancelled: [],
    decision: "填满 k-1 个桶",
    proof: "候选池大小达到 2，后面再遇到新值就要触发抵消。",
    action: "candidates[2] = 1",
    codeLine: 2,
    verifying: false,
  },
  {
    index: 2,
    value: 3,
    candidates: [],
    cancelled: [1, 2, 3],
    decision: "满桶遇到新值",
    proof: "1、2、3 三个不同值组成一组互相抵消；超过 n/3 的真高频不会被完全抵掉。",
    action: "decrement all, remove zeros",
    codeLine: 4,
    verifying: false,
  },
  {
    index: 3,
    value: 1,
    candidates: [{ value: 1, count: 1 }],
    cancelled: [1, 2, 3],
    decision: "重新收集候选",
    proof: "抵消后候选池为空，当前 1 成为新的可能高频值。",
    action: "candidates[1] = 1",
    codeLine: 2,
    verifying: false,
  },
  {
    index: 4,
    value: 2,
    candidates: [
      { value: 1, count: 1 },
      { value: 2, count: 1 },
    ],
    cancelled: [1, 2, 3],
    decision: "第二个候选入桶",
    proof: "候选池仍未超过 k-1，先保留 2 作为可能候选。",
    action: "candidates[2] = 1",
    codeLine: 2,
    verifying: false,
  },
  {
    index: 5,
    value: 1,
    candidates: [
      { value: 1, count: 2 },
      { value: 2, count: 1 },
    ],
    cancelled: [1, 2, 3],
    decision: "命中已有候选",
    proof: "再次遇到 1，增加它的净票数。",
    action: "candidates[1]++",
    codeLine: 1,
    verifying: false,
  },
  {
    index: 6,
    value: 1,
    candidates: [
      { value: 1, count: 3 },
      { value: 2, count: 1 },
    ],
    cancelled: [1, 2, 3],
    decision: "主导候选拉开差距",
    proof: "候选计数只是净优势，不等于真实出现次数；最终仍要验证。",
    action: "candidates[1]++",
    codeLine: 1,
    verifying: false,
  },
  {
    index: 7,
    value: 3,
    candidates: [{ value: 1, count: 2 }],
    cancelled: [1, 2, 3, 2, 3],
    decision: "再次满桶抵消",
    proof: "3 未命中且候选池已满，于是所有候选减一；2 的计数归零被删除。",
    action: "1:3->2, 2:1->0",
    codeLine: 4,
    verifying: false,
  },
  {
    index: 8,
    value: 1,
    candidates: [{ value: 1, count: 3 }],
    cancelled: [1, 2, 3, 2, 3],
    decision: "留下候选 1",
    proof: "第一遍只证明 1 可能超过 n/k，不能直接返回。",
    action: "candidates[1]++",
    codeLine: 1,
    verifying: false,
  },
  {
    index: 8,
    value: null,
    candidates: [{ value: 1, count: 5 }],
    cancelled: [1, 2, 3, 2, 3],
    decision: "二次统计通过",
    proof: "1 的真实出现次数为 5，5 > n/k = 3，因此答案是 [1]。",
    action: "verify 5 > 3",
    codeLine: 6,
    verifying: true,
  },
];

const CODE_LINES = [
  "if x in candidates: candidates[x]++",
  "else if size < k - 1: candidates[x] = 1",
  "else:",
  "  for each candidate: count--",
  "  remove zero-count candidates",
  "verify real frequency of candidates",
  "return freq * k > n",
];

export function MoreThanKTimesDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const candidateValues = useMemo(
    () => new Set(step.candidates.map((candidate) => candidate.value)),
    [step.candidates],
  );

  const cancelledCounts = useMemo(() => {
    const map = new Map<number, number>();
    for (const value of step.cancelled) map.set(value, (map.get(value) ?? 0) + 1);
    return map;
  }, [step.cancelled]);

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
                超过 n/k：k-1 个候选桶抵消
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

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
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
                  const isCurrent = index === step.index && step.value !== null;
                  const isCandidate = candidateValues.has(value);
                  const isScanned = index <= step.index;

                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex min-h-14 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isCurrent
                          ? "border-accent bg-accent/10 text-accent"
                          : isCandidate && isScanned
                            ? "border-success/70 bg-success/10 text-success"
                            : isScanned
                              ? "border-border bg-bg text-secondary opacity-55"
                              : "border-border bg-bg text-primary"
                      }`}
                    >
                      <span className="text-lg font-bold">{value}</span>
                      {isCurrent ? (
                        <span className="absolute -top-5 text-[10px] font-bold text-accent">
                          scan
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[0, 1].map((slot) => {
                  const candidate = step.candidates[slot];
                  return (
                    <section
                      key={slot}
                      className={`rounded-card border p-4 ${
                        candidate
                          ? "border-success/70 bg-success/10"
                          : "border-border bg-bg"
                      }`}
                    >
                      <p className="text-xs font-semibold text-secondary">
                        candidate bucket {slot + 1}
                      </p>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <p className="font-mono text-2xl font-bold text-primary">
                          {candidate ? candidate.value : "-"}
                        </p>
                        <p className="rounded-control border border-border px-2 py-1 font-mono text-sm font-semibold text-secondary">
                          count {candidate ? candidate.count : 0}
                        </p>
                      </div>
                    </section>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <StateCard label="bucket limit" value="k - 1 = 2" />
                <StateCard label="threshold" value={`> ${THRESHOLD}`} />
                <StateCard
                  label={step.verifying ? "answer" : "cancelled"}
                  value={step.verifying ? "[1]" : String(step.cancelled.length)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                candidate judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  {step.value === null ? "verify candidates" : `x = ${step.value}`}
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
                  第一遍得到的是候选，不是真实频次；必须二次统计验证。
                </p>
                <p className="text-secondary">
                  满桶遇到新值时，不加入新值，只让所有候选统一减一。
                </p>
              </div>
            </section>

            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                cancelled groups
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {[1, 2, 3].map((value) => (
                  <span
                    key={value}
                    className="rounded-control border border-border px-2 py-1 font-mono text-secondary"
                  >
                    {value} x {cancelledCounts.get(value) ?? 0}
                  </span>
                ))}
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
        面试白板法：用 k-1 个桶压缩高频候选，抵消阶段只削弱净优势，最后用真实频次过滤答案。
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
