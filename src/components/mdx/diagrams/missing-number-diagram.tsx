"use client";

import { useMemo, useState } from "react";

interface StepData {
  phase: "range" | "array" | "done";
  label: string;
  value: number | null;
  ans: number;
  rangeDone: number[];
  arrayDone: number[];
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const RANGE = [0, 1, 2, 3, 4];
const NUMS = [3, 0, 1, 4];

const STEPS: StepData[] = [
  {
    phase: "range",
    label: "i = 0",
    value: 0,
    ans: 0,
    rangeDone: [0],
    arrayDone: [],
    decision: "先放入完整域",
    proof: "缺失范围是 [0,n]，所以 0 也必须参与异或。",
    action: "ans = 0 ^ 0 = 0",
    codeLine: 1,
  },
  {
    phase: "range",
    label: "i = 1",
    value: 1,
    ans: 1,
    rangeDone: [0, 1],
    arrayDone: [],
    decision: "完整域继续入账",
    proof: "先把理论上应该出现的 0..n 全部放进 ans。",
    action: "ans = 0 ^ 1 = 1",
    codeLine: 1,
  },
  {
    phase: "range",
    label: "i = 2",
    value: 2,
    ans: 3,
    rangeDone: [0, 1, 2],
    arrayDone: [],
    decision: "缺失值也先入账",
    proof: "2 虽然不会在数组中出现，但完整域阶段必须包含它。",
    action: "ans = 1 ^ 2 = 3",
    codeLine: 1,
  },
  {
    phase: "range",
    label: "i = 3",
    value: 3,
    ans: 0,
    rangeDone: [0, 1, 2, 3],
    arrayDone: [],
    decision: "异或可交换",
    proof: "顺序不影响结果，成对值最终都会抵消。",
    action: "ans = 3 ^ 3 = 0",
    codeLine: 1,
  },
  {
    phase: "range",
    label: "i = 4",
    value: 4,
    ans: 4,
    rangeDone: [0, 1, 2, 3, 4],
    arrayDone: [],
    decision: "完整域完成",
    proof: "此时 ans 保存的是完整区间的异或结果，下一阶段用数组实际值抵消。",
    action: "ans = 0 ^ 4 = 4",
    codeLine: 1,
  },
  {
    phase: "array",
    label: "num = 3",
    value: 3,
    ans: 7,
    rangeDone: [0, 1, 2, 3, 4],
    arrayDone: [3],
    decision: "用实际值抵消",
    proof: "数组里出现的 3 会和完整域里的 3 成对消掉。",
    action: "ans = 4 ^ 3 = 7",
    codeLine: 2,
  },
  {
    phase: "array",
    label: "num = 0",
    value: 0,
    ans: 7,
    rangeDone: [0, 1, 2, 3, 4],
    arrayDone: [3, 0],
    decision: "0 也要扫描",
    proof: "0 ^ x = x，但它仍代表数组确认存在 0。",
    action: "ans = 7 ^ 0 = 7",
    codeLine: 2,
  },
  {
    phase: "array",
    label: "num = 1",
    value: 1,
    ans: 6,
    rangeDone: [0, 1, 2, 3, 4],
    arrayDone: [3, 0, 1],
    decision: "继续抵消实际值",
    proof: "完整域里的 1 和数组里的 1 成对消失。",
    action: "ans = 7 ^ 1 = 6",
    codeLine: 2,
  },
  {
    phase: "array",
    label: "num = 4",
    value: 4,
    ans: 2,
    rangeDone: [0, 1, 2, 3, 4],
    arrayDone: [3, 0, 1, 4],
    decision: "只剩缺失值",
    proof: "0、1、3、4 都出现了两次并抵消，唯一没有配对的是 2。",
    action: "ans = 6 ^ 4 = 2",
    codeLine: 2,
  },
  {
    phase: "done",
    label: "return ans",
    value: null,
    ans: 2,
    rangeDone: [0, 1, 2, 3, 4],
    arrayDone: [3, 0, 1, 4],
    decision: "返回缺失数字",
    proof: "异或对消模型成立的前提是数字域为 [0,n] 且只缺一个数。",
    action: "return 2",
    codeLine: 3,
  },
];

const CODE_LINES = [
  "for i from 0 to n: ans ^= i",
  "for num in nums: ans ^= num",
  "return ans",
];

export function MissingNumberDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const rangeSet = useMemo(() => new Set(step.rangeDone), [step.rangeDone]);
  const arraySet = useMemo(() => new Set(step.arrayDone), [step.arrayDone]);

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
                缺失数字：完整域与数组逐步异或
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>ans</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.ans}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
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
              <XorLane
                title="complete domain [0,n]"
                values={RANGE}
                doneSet={rangeSet}
                active={step.phase === "range" ? step.value : null}
              />
              <XorLane
                title="actual nums"
                values={NUMS}
                doneSet={arraySet}
                active={step.phase === "array" ? step.value : null}
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StateCard label="current" value={step.label} />
                <StateCard label="binary ans" value={toBinary(step.ans)} />
                <StateCard label="missing" value="2" />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">对消规则</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  a ^ a = 0
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">单位元</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  a ^ 0 = a
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">前提</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  [0,n] 只缺一个数
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                xor judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  {step.label}
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
                  循环必须覆盖 0..n，不是 1..n。
                </p>
                <p className="text-secondary">
                  若输入有重复或缺多个数，异或仍会产出数字，但不代表正确答案。
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
        面试白板法：完整域出现一次，数组实际值再出现一次，成对数字抵消后只留下缺失值。
      </figcaption>
    </figure>
  );
}

function XorLane({
  title,
  values,
  doneSet,
  active,
}: {
  title: string;
  values: number[];
  doneSet: Set<number>;
  active: number | null;
}) {
  return (
    <section className="mb-4 rounded-card border border-border bg-bg p-3 last:mb-0">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
        {title}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value, index) => {
          const isDone = doneSet.has(value);
          const isActive = active === value;
          return (
            <span
              key={`${title}-${value}-${index}`}
              className={`relative rounded-control border px-3 py-2 font-mono text-sm font-bold ${
                isActive
                  ? "border-accent bg-accent/10 text-accent"
                  : isDone
                    ? "border-success/70 bg-success/10 text-success"
                    : "border-border text-primary"
              }`}
            >
              {value}
              {isActive ? (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase text-accent">
                  xor
                </span>
              ) : null}
            </span>
          );
        })}
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

function toBinary(value: number) {
  return value.toString(2).padStart(3, "0");
}
