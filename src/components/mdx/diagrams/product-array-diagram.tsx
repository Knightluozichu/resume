"use client";

import { useState } from "react";

interface StepData {
  phase: "left" | "right" | "done";
  index: number;
  left: number;
  right: number;
  ans: number[];
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const NUMS = [1, 2, 3, 4];

const STEPS: StepData[] = [
  {
    phase: "left",
    index: 0,
    left: 1,
    right: 1,
    ans: [1, 1, 1, 1],
    decision: "写入左侧空积",
    proof: "B[0] 左侧没有元素，左积为 1。",
    action: "ans[0] = 1; left *= 1",
    codeLine: 1,
  },
  {
    phase: "left",
    index: 1,
    left: 1,
    right: 1,
    ans: [1, 1, 1, 1],
    decision: "写入 A[0]",
    proof: "B[1] 左侧只有 A[0]=1，因此左积仍为 1。",
    action: "ans[1] = 1; left *= 2",
    codeLine: 1,
  },
  {
    phase: "left",
    index: 2,
    left: 2,
    right: 1,
    ans: [1, 1, 2, 1],
    decision: "左积继续推进",
    proof: "B[2] 左侧是 1*2，先写入 2。",
    action: "ans[2] = 2; left *= 3",
    codeLine: 1,
  },
  {
    phase: "left",
    index: 3,
    left: 6,
    right: 1,
    ans: [1, 1, 2, 6],
    decision: "左向遍历完成",
    proof: "B[3] 左侧是 1*2*3=6，ans 暂时只保存左侧乘积。",
    action: "ans[3] = 6; left *= 4",
    codeLine: 1,
  },
  {
    phase: "right",
    index: 3,
    left: 24,
    right: 1,
    ans: [1, 1, 2, 6],
    decision: "右侧空积回填",
    proof: "B[3] 右侧没有元素，乘以 right=1 后仍为 6。",
    action: "ans[3] *= 1; right *= 4",
    codeLine: 3,
  },
  {
    phase: "right",
    index: 2,
    left: 24,
    right: 4,
    ans: [1, 1, 8, 6],
    decision: "乘上右侧 A[3]",
    proof: "B[2] 左积是 2，右积是 4，结果为 8。",
    action: "ans[2] *= 4; right *= 3",
    codeLine: 3,
  },
  {
    phase: "right",
    index: 1,
    left: 24,
    right: 12,
    ans: [1, 12, 8, 6],
    decision: "右积继续推进",
    proof: "B[1] 左积是 1，右侧 3*4=12。",
    action: "ans[1] *= 12; right *= 2",
    codeLine: 3,
  },
  {
    phase: "right",
    index: 0,
    left: 24,
    right: 24,
    ans: [24, 12, 8, 6],
    decision: "答案完成",
    proof: "B[0] 右侧 2*3*4=24，最终数组为 [24,12,8,6]。",
    action: "return ans",
    codeLine: 4,
  },
];

const CODE_LINES = [
  "for i from 0 to n - 1: ans[i] = left; left *= A[i]",
  "right = 1",
  "for i from n - 1 downto 0: ans[i] *= right; right *= A[i]",
  "return ans",
];

export function ProductArrayDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

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
                构建乘积数组：左积先写，右积回填
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>{step.phase}</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                i={step.index}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.phase}-${item.index}-${index}`}
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
                input A
              </p>
              <div className="grid grid-cols-[repeat(4,minmax(44px,1fr))] gap-2">
                {NUMS.map((value, index) => (
                  <Cell
                    key={`${index}-${value}`}
                    value={String(value)}
                    label={`A[${index}]`}
                    active={index === step.index}
                    tone={index === step.index ? "accent" : "default"}
                  />
                ))}
              </div>

              <p className="mb-3 mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                answer B
              </p>
              <div className="grid grid-cols-[repeat(4,minmax(44px,1fr))] gap-2">
                {step.ans.map((value, index) => (
                  <Cell
                    key={index}
                    value={String(value)}
                    label={`B[${index}]`}
                    active={index === step.index}
                    tone={
                      index === step.index
                        ? step.phase === "left"
                          ? "warning"
                          : "success"
                        : "default"
                    }
                  />
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StateCard label="left product" value={String(step.left)} />
                <StateCard label="right product" value={String(step.right)} />
                <StateCard label="current B[i]" value={String(step.ans[step.index])} />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                product judgment
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
                  不要用总积除以 A[i]，含 0 时会失效，题目也常禁止除法。
                </p>
                <p className="text-secondary">
                  左向写 ans[i] 前先用旧 left，右向回填后再把 A[i] 乘进 right。
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
        面试白板法：每个 B[i] 拆成左侧乘积和右侧乘积，绕开除法和 0 的陷阱。
      </figcaption>
    </figure>
  );
}

function Cell({
  value,
  label,
  active,
  tone,
}: {
  value: string;
  label: string;
  active: boolean;
  tone: "accent" | "warning" | "success" | "default";
}) {
  const toneClass =
    tone === "accent"
      ? "border-accent bg-accent/10 text-accent"
      : tone === "warning"
        ? "border-warning/70 bg-warning/10 text-warning"
        : tone === "success"
          ? "border-success/70 bg-success/10 text-success"
          : "border-border bg-bg text-primary";

  return (
    <div
      className={`relative flex min-h-16 flex-col items-center justify-center rounded-control border font-mono ${toneClass}`}
    >
      {active ? (
        <span className="absolute -top-5 text-[10px] font-bold uppercase text-accent">
          focus
        </span>
      ) : null}
      <span className="text-lg font-bold">{value}</span>
      <span className="text-[10px] font-semibold text-secondary">{label}</span>
    </div>
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
