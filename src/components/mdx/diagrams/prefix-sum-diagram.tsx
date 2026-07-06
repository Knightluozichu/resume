"use client";

import { useMemo, useState } from "react";

interface StepData {
  index: number;
  value: number | null;
  current: number;
  prefix: Array<number | null>;
  query: [number, number] | null;
  answer: number | null;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const NUMS = [2, -1, 3, 4, -2];

const STEPS: StepData[] = [
  {
    index: 0,
    value: 2,
    current: 2,
    prefix: [2, null, null, null, null],
    query: null,
    answer: null,
    decision: "写入第一个前缀",
    proof: "prefix[0] 表示 nums[0] 的累计和。",
    action: "current = 0 + 2 = 2",
    codeLine: 1,
  },
  {
    index: 1,
    value: -1,
    current: 1,
    prefix: [2, 1, null, null, null],
    query: null,
    answer: null,
    decision: "允许负数",
    proof: "前缀和不要求数组为正，只要加法累计即可。",
    action: "current = 2 + (-1) = 1",
    codeLine: 1,
  },
  {
    index: 2,
    value: 3,
    current: 4,
    prefix: [2, 1, 4, null, null],
    query: null,
    answer: null,
    decision: "继续递推",
    proof: "prefix[i] 只依赖 prefix[i-1] 和 nums[i]。",
    action: "prefix[2] = 4",
    codeLine: 1,
  },
  {
    index: 3,
    value: 4,
    current: 8,
    prefix: [2, 1, 4, 8, null],
    query: null,
    answer: null,
    decision: "累计到下标 3",
    proof: "到这里，0..3 的和已经被缓存为 8。",
    action: "prefix[3] = 8",
    codeLine: 1,
  },
  {
    index: 4,
    value: -2,
    current: 6,
    prefix: [2, 1, 4, 8, 6],
    query: null,
    answer: null,
    decision: "前缀表完成",
    proof: "每个前缀只写一次，后续区间查询不再扫描原数组。",
    action: "prefix[4] = 6",
    codeLine: 1,
  },
  {
    index: 4,
    value: null,
    current: 6,
    prefix: [2, 1, 4, 8, 6],
    query: [1, 3],
    answer: 6,
    decision: "区间差分查询",
    proof: "sum(1,3)=prefix[3]-prefix[0]=8-2=6，对应 -1+3+4。",
    action: "return 6",
    codeLine: 3,
  },
];

const CODE_LINES = [
  "for value in nums: current += value; prefix.push(current)",
  "if left == 0: return prefix[right]",
  "return prefix[right] - prefix[left - 1]",
];

export function PrefixSumDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const querySet = useMemo(() => {
    const set = new Set<number>();
    if (!step.query) return set;
    for (let index = step.query[0]; index <= step.query[1]; index += 1) {
      set.add(index);
    }
    return set;
  }, [step.query]);

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
                前缀和：一次预处理，多次区间差分
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>current</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.current}
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
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                nums
              </p>
              <div className="grid grid-cols-[repeat(5,minmax(44px,1fr))] gap-2">
                {NUMS.map((value, index) => {
                  const isScan = index === step.index && step.value !== null;
                  const inQuery = querySet.has(index);
                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex min-h-16 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isScan
                          ? "border-accent bg-accent/10 text-accent"
                          : inQuery
                            ? "border-success/70 bg-success/10 text-success"
                            : "border-border bg-bg text-primary"
                      }`}
                    >
                      {isScan ? (
                        <span className="absolute -top-5 text-[10px] font-bold uppercase text-accent">
                          scan
                        </span>
                      ) : null}
                      <span className="text-lg font-bold">{value}</span>
                      <span className="text-[10px] font-semibold text-secondary">
                        [{index}]
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="mb-3 mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                prefix
              </p>
              <div className="grid grid-cols-[repeat(5,minmax(44px,1fr))] gap-2">
                {step.prefix.map((value, index) => {
                  const isRight = step.query?.[1] === index;
                  const isBeforeLeft = step.query ? step.query[0] - 1 === index : false;
                  return (
                    <div
                      key={index}
                      className={`flex min-h-16 flex-col items-center justify-center rounded-control border font-mono ${
                        isRight
                          ? "border-success bg-success/10 text-success"
                          : isBeforeLeft
                            ? "border-warning bg-warning/10 text-warning"
                            : value !== null
                              ? "border-border bg-bg text-primary"
                              : "border-border bg-bg text-secondary opacity-40"
                      }`}
                    >
                      <span className="text-lg font-bold">
                        {value === null ? "-" : value}
                      </span>
                      <span className="text-[10px] font-semibold text-secondary">
                        p[{index}]
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StateCard label="query" value="[1,3]" />
                <StateCard label="formula" value="p[3]-p[0]" />
                <StateCard label="answer" value={step.answer === null ? "-" : String(step.answer)} />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                prefix judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  {step.action}
                </p>
                <p className="rounded-control border border-success px-2 py-1 text-xs font-semibold text-success">
                  {step.decision}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-primary">
                {step.proof}
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
                  不要只保存总和；必须保存每个前缀点才能 O(1) 查询区间。
                </p>
                <p className="text-secondary">
                  l=0 时没有 prefix[l-1]，需要单独返回 prefix[r]。
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
        面试白板法：把从 0 到 i 的累计和缓存下来，任意区间都用两个边界相减恢复。
      </figcaption>
    </figure>
  );
}

function StateCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-border bg-bg p-3 text-center">
      <p className="text-xs font-semibold text-secondary">{label}</p>
      <p className="mt-1 font-mono text-base font-bold text-primary">{value}</p>
    </div>
  );
}
