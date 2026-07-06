"use client";

import { useMemo, useState } from "react";

interface StepData {
  left: number;
  right: number;
  sum: number;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
  found: boolean;
}

const NUMS = [1, 2, 4, 7, 11, 15];
const TARGET = 15;

const STEPS: StepData[] = [
  {
    left: 0,
    right: 5,
    sum: 16,
    decision: "sum > target",
    proof: "1 + 15 = 16 偏大。数组有序，右端 15 已经太大，必须把 right 左移。",
    action: "right--",
    codeLine: 5,
    found: false,
  },
  {
    left: 0,
    right: 4,
    sum: 12,
    decision: "sum < target",
    proof: "1 + 11 = 12 偏小。左端 1 太小，只有 left 右移才可能增大和。",
    action: "left++",
    codeLine: 4,
    found: false,
  },
  {
    left: 1,
    right: 4,
    sum: 13,
    decision: "sum < target",
    proof: "2 + 11 = 13 仍然偏小，继续抬高左端。",
    action: "left++",
    codeLine: 4,
    found: false,
  },
  {
    left: 2,
    right: 4,
    sum: 15,
    decision: "sum == target",
    proof: "4 + 11 = 15，夹逼区间内找到一组合法答案。",
    action: "return [4, 11]",
    codeLine: 3,
    found: true,
  },
];

const CODE_LINES = [
  "left = 0, right = n - 1",
  "while left < right:",
  "  sum = nums[left] + nums[right]",
  "  if sum == target: return pair",
  "  if sum < target: left++",
  "  else: right--",
  "return []",
];

export function TwoNumbersWithSumDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const activeRange = useMemo(() => {
    const set = new Set<number>();
    for (let index = step.left; index <= step.right; index += 1) set.add(index);
    return set;
  }, [step.left, step.right]);

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
                和为 S：双指针夹逼
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>target</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {TARGET}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.left}-${item.right}`}
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
                  const isLeft = index === step.left;
                  const isRight = index === step.right;
                  const isActive = activeRange.has(index);
                  const isAnswer = step.found && (isLeft || isRight);

                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex min-h-20 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isAnswer
                          ? "border-success bg-success/10 text-success"
                          : isLeft || isRight
                            ? "border-accent bg-accent/10 text-accent"
                            : isActive
                              ? "border-border bg-bg text-primary"
                              : "border-border bg-bg text-secondary opacity-35"
                      }`}
                    >
                      {isLeft ? (
                        <span className="absolute -top-5 text-[10px] font-bold uppercase text-accent">
                          left
                        </span>
                      ) : null}
                      {isRight ? (
                        <span className="absolute -bottom-5 text-[10px] font-bold uppercase text-accent">
                          right
                        </span>
                      ) : null}
                      <span className="text-lg font-bold">{value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <StateCard label="left value" value={String(NUMS[step.left])} />
                <StateCard label="right value" value={String(NUMS[step.right])} />
                <StateCard label="sum" value={String(step.sum)} />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">sum 偏小</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  left 右移增大和
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">sum 命中</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  返回一组答案
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">sum 偏大</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  right 左移减小和
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                two pointer judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  {NUMS[step.left]} + {NUMS[step.right]} = {step.sum}
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
                  双指针夹逼依赖数组有序；未排序时方向判断不成立。
                </p>
                <p className="text-secondary">
                  若题目要求全部解，命中后不能直接返回，需要继续收缩并处理重复值。
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
        面试白板法：利用有序数组的单调性，让 left/right 每次移动都能排除一整侧不可能组合。
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
