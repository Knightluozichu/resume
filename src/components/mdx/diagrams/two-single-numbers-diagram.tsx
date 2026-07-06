"use client";

import { useMemo, useState } from "react";

interface StepData {
  index: number;
  value: number | null;
  phase: "xor" | "mask" | "group" | "done";
  xorAll: number;
  mask: number | null;
  groupOne: number[];
  groupZero: number[];
  a: number;
  b: number;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const NUMS = [4, 1, 4, 6, 3, 1];

const STEPS: StepData[] = [
  {
    index: 0,
    value: 4,
    phase: "xor",
    xorAll: 4,
    mask: null,
    groupOne: [],
    groupZero: [],
    a: 0,
    b: 0,
    decision: "全局异或开始",
    proof: "重复数字最终会成对抵消，第一遍先把两个单独数字压成 xorAll。",
    action: "xorAll = 0 ^ 4 = 4",
    codeLine: 1,
  },
  {
    index: 1,
    value: 1,
    phase: "xor",
    xorAll: 5,
    mask: null,
    groupOne: [],
    groupZero: [],
    a: 0,
    b: 0,
    decision: "继续累积差分",
    proof: "异或可交换，不关心输入顺序。",
    action: "xorAll = 4 ^ 1 = 5",
    codeLine: 1,
  },
  {
    index: 2,
    value: 4,
    phase: "xor",
    xorAll: 1,
    mask: null,
    groupOne: [],
    groupZero: [],
    a: 0,
    b: 0,
    decision: "重复值抵消",
    proof: "第二个 4 与第一个 4 抵消，xorAll 剩下尚未配对的贡献。",
    action: "xorAll = 5 ^ 4 = 1",
    codeLine: 1,
  },
  {
    index: 3,
    value: 6,
    phase: "xor",
    xorAll: 7,
    mask: null,
    groupOne: [],
    groupZero: [],
    a: 0,
    b: 0,
    decision: "单独值进入差分",
    proof: "6 是两个目标之一，会留在最终 xorAll 中。",
    action: "xorAll = 1 ^ 6 = 7",
    codeLine: 1,
  },
  {
    index: 4,
    value: 3,
    phase: "xor",
    xorAll: 4,
    mask: null,
    groupOne: [],
    groupZero: [],
    a: 0,
    b: 0,
    decision: "另一个单独值进入",
    proof: "3 与 6 的差分位会用于后续分组。",
    action: "xorAll = 7 ^ 3 = 4",
    codeLine: 1,
  },
  {
    index: 5,
    value: 1,
    phase: "xor",
    xorAll: 7,
    mask: null,
    groupOne: [],
    groupZero: [],
    a: 0,
    b: 0,
    decision: "第一遍结束",
    proof: "1 和 1 抵消后，xorAll = 6 ^ 3 = 7。",
    action: "xorAll = 4 ^ 1 = 7",
    codeLine: 1,
  },
  {
    index: 5,
    value: null,
    phase: "mask",
    xorAll: 7,
    mask: 1,
    groupOne: [],
    groupZero: [],
    a: 0,
    b: 0,
    decision: "提取最低差分位",
    proof: "xorAll 的某个 1 位说明两个目标在该位不同；mask=1 可把 6 和 3 分开。",
    action: "mask = xorAll & -xorAll = 1",
    codeLine: 2,
  },
  {
    index: 0,
    value: 4,
    phase: "group",
    xorAll: 7,
    mask: 1,
    groupOne: [],
    groupZero: [4],
    a: 0,
    b: 4,
    decision: "按 mask 分组",
    proof: "4 的最低位是 0，进入 zero 组。",
    action: "b = 0 ^ 4 = 4",
    codeLine: 4,
  },
  {
    index: 1,
    value: 1,
    phase: "group",
    xorAll: 7,
    mask: 1,
    groupOne: [1],
    groupZero: [4],
    a: 1,
    b: 4,
    decision: "one 组累积",
    proof: "1 的最低位是 1，进入 one 组；重复的 1 稍后会在同组抵消。",
    action: "a = 0 ^ 1 = 1",
    codeLine: 3,
  },
  {
    index: 2,
    value: 4,
    phase: "group",
    xorAll: 7,
    mask: 1,
    groupOne: [1],
    groupZero: [4, 4],
    a: 1,
    b: 0,
    decision: "重复值同组抵消",
    proof: "两个 4 的 mask 位相同，所以一定进入同一组并互相消掉。",
    action: "b = 4 ^ 4 = 0",
    codeLine: 4,
  },
  {
    index: 3,
    value: 6,
    phase: "group",
    xorAll: 7,
    mask: 1,
    groupOne: [1],
    groupZero: [4, 4, 6],
    a: 1,
    b: 6,
    decision: "目标 6 被隔离",
    proof: "6 的最低位是 0，和 3 会落入不同组。",
    action: "b = 0 ^ 6 = 6",
    codeLine: 4,
  },
  {
    index: 4,
    value: 3,
    phase: "group",
    xorAll: 7,
    mask: 1,
    groupOne: [1, 3],
    groupZero: [4, 4, 6],
    a: 2,
    b: 6,
    decision: "目标 3 进另一组",
    proof: "3 的最低位是 1，和 6 分开；组内仍继续异或。",
    action: "a = 1 ^ 3 = 2",
    codeLine: 3,
  },
  {
    index: 5,
    value: 1,
    phase: "group",
    xorAll: 7,
    mask: 1,
    groupOne: [1, 3, 1],
    groupZero: [4, 4, 6],
    a: 3,
    b: 6,
    decision: "one 组抵消完成",
    proof: "两个 1 抵消后，one 组只剩 3；zero 组只剩 6。",
    action: "a = 2 ^ 1 = 3",
    codeLine: 3,
  },
  {
    index: 5,
    value: null,
    phase: "done",
    xorAll: 7,
    mask: 1,
    groupOne: [1, 3, 1],
    groupZero: [4, 4, 6],
    a: 3,
    b: 6,
    decision: "返回两个单独数字",
    proof: "差分位把两个目标分到不同组，重复数字保持同组抵消。",
    action: "return [3, 6]",
    codeLine: 5,
  },
];

const CODE_LINES = [
  "for x in nums: xorAll ^= x",
  "mask = xorAll & -xorAll",
  "if x & mask: a ^= x",
  "else: b ^= x",
  "return [a, b]",
];

export function TwoSingleNumbersDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const groupOneCounts = useMemo(() => countValues(step.groupOne), [step.groupOne]);
  const groupZeroCounts = useMemo(
    () => countValues(step.groupZero),
    [step.groupZero],
  );

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
                两个只出现一次：xorAll 找分组位
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>xorAll</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.xorAll}
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
              <div className="mb-3 grid grid-cols-[repeat(6,minmax(36px,1fr))] gap-2 text-center font-mono text-xs font-semibold text-secondary">
                {NUMS.map((_, index) => (
                  <div key={index}>[{index}]</div>
                ))}
              </div>

              <div className="grid grid-cols-[repeat(6,minmax(36px,1fr))] gap-2">
                {NUMS.map((value, index) => {
                  const isCurrent = index === step.index && step.value !== null;
                  const bitOne = (value & (step.mask ?? 1)) !== 0;
                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex min-h-16 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isCurrent
                          ? "border-accent bg-accent/10 text-accent"
                          : step.phase === "group"
                            ? bitOne
                              ? "border-success/70 bg-success/10 text-success"
                              : "border-warning/70 bg-warning/10 text-warning"
                            : "border-border bg-bg text-primary"
                      }`}
                    >
                      {isCurrent ? (
                        <span className="absolute -top-5 text-[10px] font-bold uppercase text-accent">
                          scan
                        </span>
                      ) : null}
                      <span className="text-lg font-bold">{value}</span>
                      <span className="text-[10px] font-semibold text-secondary">
                        {toBinary(value)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <GroupCard
                  title="mask bit = 1"
                  values={step.groupOne}
                  counts={groupOneCounts}
                  result={step.a}
                  tone="success"
                />
                <GroupCard
                  title="mask bit = 0"
                  values={step.groupZero}
                  counts={groupZeroCounts}
                  result={step.b}
                  tone="warning"
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <StateCard label="xorAll" value={`${step.xorAll} (${toBinary(step.xorAll)})`} />
                <StateCard
                  label="mask"
                  value={step.mask === null ? "?" : `${step.mask} (${toBinary(step.mask)})`}
                />
                <StateCard label="answer" value={step.phase === "done" ? "[3, 6]" : "pending"} />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                xor grouping judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  {step.value === null ? "derive mask" : `x = ${step.value}`}
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
                  分组位必须来自 xorAll 的 1 位，否则两个目标可能落进同一组。
                </p>
                <p className="text-secondary">
                  mask = xorAll & -xorAll 取最低差分位，重复值会自然保持同组抵消。
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
        面试白板法：先用全局异或得到两个目标的差分，再用差分位把它们分到两组分别对消。
      </figcaption>
    </figure>
  );
}

function GroupCard({
  title,
  values,
  counts,
  result,
  tone,
}: {
  title: string;
  values: number[];
  counts: Map<number, number>;
  result: number;
  tone: "success" | "warning";
}) {
  const toneClass =
    tone === "success"
      ? "border-success/70 bg-success/10 text-success"
      : "border-warning/70 bg-warning/10 text-warning";

  return (
    <section className={`rounded-card border p-3 ${toneClass}`}>
      <p className="text-xs font-semibold text-secondary">{title}</p>
      <div className="mt-3 flex min-h-10 flex-wrap gap-2">
        {values.length ? (
          values.map((value, index) => (
            <span
              key={`${title}-${value}-${index}`}
              className="rounded-control border border-border bg-bg px-2 py-1 font-mono text-sm font-bold text-primary"
            >
              {value}
            </span>
          ))
        ) : (
          <span className="text-sm text-secondary">等待分组</span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-secondary">
        {[1, 3, 4, 6].map((value) => (
          <span key={value} className="font-mono">
            {value}x{counts.get(value) ?? 0}
          </span>
        ))}
      </div>
      <p className="mt-3 font-mono text-lg font-bold text-primary">
        xor = {result}
      </p>
    </section>
  );
}

function StateCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-border bg-bg p-3 text-center">
      <p className="text-xs font-semibold text-secondary">{label}</p>
      <p className="mt-1 font-mono text-sm font-bold text-primary sm:text-base">
        {value}
      </p>
    </div>
  );
}

function countValues(values: number[]) {
  const counts = new Map<number, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

function toBinary(value: number) {
  return value.toString(2).padStart(3, "0");
}
