"use client";

import { useMemo, useState } from "react";

interface StepData {
  title: string;
  phase: string;
  direction: string;
  top: number;
  bottom: number;
  left: number;
  right: number;
  highlighted: number[];
  output: number[];
  compare: string;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const MATRIX = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

const STEPS: StepData[] = [
  {
    title: "初始化四边界",
    phase: "setup",
    direction: "准备",
    top: 0,
    bottom: 3,
    left: 0,
    right: 3,
    highlighted: [],
    output: [],
    compare: "top=0 bottom=3 left=0 right=3",
    decision: "候选区是整张矩阵",
    proof: "四个边界围出当前还没有打印的区域，每一轮只处理外圈。",
    action: "进入 while 循环",
    codeLine: 1,
  },
  {
    title: "打印上边",
    phase: "top edge",
    direction: "→",
    top: 0,
    bottom: 3,
    left: 0,
    right: 3,
    highlighted: [0, 1, 2, 3],
    output: [1, 2, 3, 4],
    compare: "row=top, col=left..right",
    decision: "输出 1,2,3,4",
    proof: "上边已经全部打印，下一轮不能再碰第 0 行。",
    action: "top++，上边界下移",
    codeLine: 2,
  },
  {
    title: "打印右边",
    phase: "right edge",
    direction: "↓",
    top: 1,
    bottom: 3,
    left: 0,
    right: 3,
    highlighted: [7, 11, 15],
    output: [1, 2, 3, 4, 8, 12, 16],
    compare: "col=right, row=top..bottom",
    decision: "输出 8,12,16",
    proof: "右边已经全部打印，下一轮不能再碰第 3 列。",
    action: "right--，右边界左移",
    codeLine: 3,
  },
  {
    title: "检查并打印下边",
    phase: "bottom edge",
    direction: "←",
    top: 1,
    bottom: 3,
    left: 0,
    right: 2,
    highlighted: [14, 13, 12],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13],
    compare: "top <= bottom",
    decision: "可以打印下边",
    proof: "如果是单行矩阵，此处 top 已经越过 bottom，必须跳过这一边。",
    action: "bottom--，下边界上移",
    codeLine: 4,
  },
  {
    title: "检查并打印左边",
    phase: "left edge",
    direction: "↑",
    top: 1,
    bottom: 2,
    left: 0,
    right: 2,
    highlighted: [8, 4],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5],
    compare: "left <= right",
    decision: "可以打印左边",
    proof: "如果是单列矩阵，此处 left 已经越过 right，必须跳过这一边。",
    action: "left++，左边界右移",
    codeLine: 6,
  },
  {
    title: "进入内圈上边",
    phase: "inner top",
    direction: "→",
    top: 1,
    bottom: 2,
    left: 1,
    right: 2,
    highlighted: [5, 6],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7],
    compare: "row=1, col=1..2",
    decision: "输出 6,7",
    proof: "外圈已被剥掉，四边界围出的候选区缩成 2x2。",
    action: "top++",
    codeLine: 2,
  },
  {
    title: "进入内圈右边",
    phase: "inner right",
    direction: "↓",
    top: 2,
    bottom: 2,
    left: 1,
    right: 2,
    highlighted: [10],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11],
    compare: "col=2, row=2..2",
    decision: "输出 11",
    proof: "内圈右边只有一个格子，打印后右边界继续收缩。",
    action: "right--",
    codeLine: 3,
  },
  {
    title: "内圈下边碰撞检查",
    phase: "inner bottom",
    direction: "←",
    top: 2,
    bottom: 2,
    left: 1,
    right: 1,
    highlighted: [9],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10],
    compare: "top <= bottom",
    decision: "仍可打印最后一格",
    proof: "当前还有一行未打印，输出 10 后 bottom 上移，矩阵遍历完成。",
    action: "bottom--",
    codeLine: 4,
  },
  {
    title: "完成",
    phase: "done",
    direction: "结束",
    top: 2,
    bottom: 1,
    left: 1,
    right: 1,
    highlighted: [],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10],
    compare: "top > bottom",
    decision: "循环终止",
    proof: "上下边界已经交叉，没有未打印区域。",
    action: "返回 result",
    codeLine: 7,
  },
];

const CODE_LINES = [
  "if empty: return []",
  "while top <= bottom && left <= right:",
  "  print top row; top++",
  "  print right col; right--",
  "  if top <= bottom: print bottom row; bottom--",
  "  if left <= right: print left col; left++",
  "return result",
];

const flatIndex = (row: number, col: number) => row * MATRIX[0].length + col;

export function SpiralMatrixDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const visited = useMemo(() => {
    const cells = new Set<number>();
    for (let i = 0; i <= currentStep; i += 1) {
      for (const index of STEPS[i].highlighted) {
        cells.add(index);
      }
    }
    return cells;
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
                顺时针打印矩阵：四边界逐层收缩
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>direction</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.direction}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={item.title}
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
              <div className="grid grid-cols-[32px_repeat(4,minmax(42px,1fr))] gap-2 text-center text-xs font-semibold text-secondary">
                <div />
                {[0, 1, 2, 3].map((col) => (
                  <div key={col} className="font-mono">
                    c{col}
                  </div>
                ))}
                {MATRIX.map((rowValues, row) => (
                  <div key={`row-${row}`} className="contents">
                    <div className="flex min-h-12 items-center justify-center font-mono">
                      r{row}
                    </div>
                    {rowValues.map((value, col) => {
                      const index = flatIndex(row, col);
                      const isCurrent = step.highlighted.includes(index);
                      const isVisited = visited.has(index);
                      const insideBounds =
                        row >= step.top &&
                        row <= step.bottom &&
                        col >= step.left &&
                        col <= step.right;

                      return (
                        <div
                          key={index}
                          className={`relative flex min-h-12 items-center justify-center rounded-control border font-mono text-base font-bold transition-all ${
                            isCurrent
                              ? "border-accent bg-accent/10 text-accent"
                              : isVisited
                                ? "border-success/60 bg-success/10 text-success"
                                : insideBounds
                                  ? "border-border bg-bg text-primary"
                                  : "border-border bg-bg text-secondary opacity-35"
                          }`}
                        >
                          {value}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-4">
                <BoundaryPill label="top" value={step.top} />
                <BoundaryPill label="bottom" value={step.bottom} />
                <BoundaryPill label="left" value={step.left} />
                <BoundaryPill label="right" value={step.right} />
              </div>

              <div className="mt-4 rounded-card border border-border bg-bg p-3">
                <p className="text-xs font-semibold text-secondary">
                  output
                </p>
                <p className="mt-2 break-words font-mono text-sm leading-6 text-primary">
                  [{step.output.join(", ")}]
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">不变量</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  边界内才是未打印区域
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">方向顺序</p>
                <p className="mt-1 font-mono text-sm font-semibold text-primary">
                  → ↓ ← ↑
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">关键防御</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  下边和左边前再检查
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
                boundary trap
              </p>
              <div className="mt-3 grid gap-2 text-sm leading-6">
                <p className="text-primary">
                  打印上边后，单行矩阵可能已经结束。
                </p>
                <p className="text-secondary">
                  打印右边后，单列矩阵可能已经结束，所以第 3、4 步必须在循环内部再判断。
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
        面试白板法：把矩阵看成四条边界围出的候选区，每打印一条边就收缩一次，并在可能碰撞的位置补充检查。
      </figcaption>
    </figure>
  );
}

function BoundaryPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-control border border-border bg-bg px-3 py-2 text-center">
      <p className="text-xs font-semibold text-secondary">{label}</p>
      <p className="mt-1 font-mono text-sm font-bold text-primary">{value}</p>
    </div>
  );
}
