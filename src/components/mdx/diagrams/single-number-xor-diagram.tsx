"use client";

import { useMemo, useState } from "react";

interface StepData {
  index: number;
  value: number;
  xor: number;
  paired: number[];
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const NUMS = [2, 4, 1, 2, 1];

const STEPS: StepData[] = [
  {
    index: 0,
    value: 2,
    xor: 2,
    paired: [],
    decision: "累积第一个值",
    proof: "x 从 0 开始，0 ^ 2 = 2。",
    action: "x = 0 ^ 2 = 2",
    codeLine: 1,
  },
  {
    index: 1,
    value: 4,
    xor: 6,
    paired: [],
    decision: "唯一值暂时混在结果中",
    proof: "4 是最终答案，但第一遍还不能确定；累积器保存的是所有未抵消贡献。",
    action: "x = 2 ^ 4 = 6",
    codeLine: 1,
  },
  {
    index: 2,
    value: 1,
    xor: 7,
    paired: [],
    decision: "继续异或",
    proof: "异或可交换，输入顺序不会影响最终结果。",
    action: "x = 6 ^ 1 = 7",
    codeLine: 1,
  },
  {
    index: 3,
    value: 2,
    xor: 5,
    paired: [2],
    decision: "2 成对抵消",
    proof: "两个 2 的贡献合并为 0，累积器里不再需要记住 2。",
    action: "x = 7 ^ 2 = 5",
    codeLine: 1,
  },
  {
    index: 4,
    value: 1,
    xor: 4,
    paired: [2, 1],
    decision: "1 成对抵消",
    proof: "两个 1 抵消后，只剩没有配对的 4。",
    action: "return 4",
    codeLine: 2,
  },
];

const CODE_LINES = [
  "for num in nums: x ^= num",
  "return x",
];

export function SingleNumberXorDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const pairedSet = useMemo(() => new Set(step.paired), [step.paired]);

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
                只出现一次：一个 XOR 累积器
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>x</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.xor}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)]">
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
              <div className="mb-3 grid grid-cols-[repeat(5,minmax(44px,1fr))] gap-2 text-center font-mono text-xs font-semibold text-secondary">
                {NUMS.map((_, index) => (
                  <div key={index}>[{index}]</div>
                ))}
              </div>

              <div className="grid grid-cols-[repeat(5,minmax(44px,1fr))] gap-2">
                {NUMS.map((value, index) => {
                  const isCurrent = index === step.index;
                  const isScanned = index <= step.index;
                  const isPaired = pairedSet.has(value);

                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex min-h-16 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isCurrent
                          ? "border-accent bg-accent/10 text-accent"
                          : isScanned && isPaired
                            ? "border-success/70 bg-success/10 text-success opacity-60"
                            : isScanned
                              ? "border-border bg-bg text-primary"
                              : "border-border bg-bg text-secondary opacity-45"
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

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StateCard label="x decimal" value={String(step.xor)} />
                <StateCard label="x binary" value={toBinary(step.xor)} />
                <StateCard
                  label="paired out"
                  value={step.paired.length ? step.paired.join(", ") : "-"}
                />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">自反</p>
                <p className="mt-1 text-sm font-medium text-primary">a ^ a = 0</p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">零元</p>
                <p className="mt-1 text-sm font-medium text-primary">a ^ 0 = a</p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">空间</p>
                <p className="mt-1 text-sm font-medium text-primary">O(1)</p>
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
                  num = {step.value}
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
                  该方法只适用于其他数字恰好出现两次。
                </p>
                <p className="text-secondary">
                  若有多个单独值或某个数出现三次，XOR 会给出混合结果而不是答案。
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
        面试白板法：用一个 XOR 累积器让所有成对值消失，最后留下唯一未配对数字。
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

function toBinary(value: number) {
  return value.toString(2).padStart(3, "0");
}
