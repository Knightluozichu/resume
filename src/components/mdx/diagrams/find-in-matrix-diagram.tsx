"use client";

import { Fragment, useMemo, useState } from "react";

interface StepInfo {
  row: number;
  col: number;
  val: number;
  compare: string;
  decision: string;
  proof: string;
  action: string;
  activeRows: [number, number];
  activeCols: [number, number];
  codeLine: number;
}

const MATRIX = [
  [1, 2, 8, 9],
  [2, 4, 9, 12],
  [4, 7, 10, 13],
  [6, 8, 11, 15],
];

const TARGET = 7;

const STEPS: StepInfo[] = [
  {
    row: 0,
    col: 3,
    val: 9,
    compare: "9 > 7",
    decision: "目标更小",
    proof: "当前列向下只会更大，所以整列都不可能是 7。",
    action: "删除第 3 列，col--",
    activeRows: [0, 3],
    activeCols: [0, 3],
    codeLine: 5,
  },
  {
    row: 0,
    col: 2,
    val: 8,
    compare: "8 > 7",
    decision: "目标更小",
    proof: "第 2 列从 8 往下递增，9、10、11 都比 7 大。",
    action: "删除第 2 列，col--",
    activeRows: [0, 3],
    activeCols: [0, 2],
    codeLine: 5,
  },
  {
    row: 0,
    col: 1,
    val: 2,
    compare: "2 < 7",
    decision: "目标更大",
    proof: "当前行左侧不会超过 2，所以第 0 行剩余部分都太小。",
    action: "删除第 0 行，row++",
    activeRows: [0, 3],
    activeCols: [0, 1],
    codeLine: 6,
  },
  {
    row: 1,
    col: 1,
    val: 4,
    compare: "4 < 7",
    decision: "目标更大",
    proof: "第 1 行剩余候选是 2、4，都比 7 小。",
    action: "删除第 1 行，row++",
    activeRows: [1, 3],
    activeCols: [0, 1],
    codeLine: 6,
  },
  {
    row: 2,
    col: 1,
    val: 7,
    compare: "7 == 7",
    decision: "命中目标",
    proof: "当前格正好等于 target，算法立即返回 true。",
    action: "返回 true",
    activeRows: [2, 3],
    activeCols: [0, 1],
    codeLine: 4,
  },
];

const CODE_LINES = [
  "row = 0, col = cols - 1",
  "while row < rows && col >= 0:",
  "  cur = matrix[row][col]",
  "  if cur == target: return true",
  "  if cur > target: col--",
  "  else: row++",
  "return false",
];

const cellKey = (row: number, col: number) => `${row}-${col}`;

export function FindInMatrixDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const visitedCells = useMemo(() => {
    const cells = new Set<string>();
    for (let i = 0; i < currentStep; i += 1) {
      cells.add(cellKey(STEPS[i].row, STEPS[i].col));
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
                二维数组中的查找：从右上角做排除
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

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.row}-${item.col}`}
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
              <div className="mb-3 grid grid-cols-[36px_repeat(4,minmax(44px,1fr))] gap-2 text-center text-xs font-semibold text-secondary">
                <div />
                {[0, 1, 2, 3].map((col) => (
                  <div key={col} className="font-mono">
                    c{col}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[36px_repeat(4,minmax(44px,1fr))] gap-2">
                {MATRIX.map((rowValues, row) => (
                  <Fragment key={`matrix-row-${row}`}>
                    <div
                      key={`row-${row}`}
                      className="flex min-h-12 items-center justify-center font-mono text-xs font-semibold text-secondary"
                    >
                      r{row}
                    </div>
                    {rowValues.map((value, col) => {
                      const isCurrent = row === step.row && col === step.col;
                      const isVisited = visitedCells.has(cellKey(row, col));
                      const isActive =
                        row >= step.activeRows[0] &&
                        row <= step.activeRows[1] &&
                        col >= step.activeCols[0] &&
                        col <= step.activeCols[1];
                      const isTarget = isCurrent && value === TARGET;

                      return (
                        <div
                          key={cellKey(row, col)}
                          className={`relative flex min-h-12 items-center justify-center rounded-control border font-mono text-base font-bold transition-all ${
                            isCurrent
                              ? isTarget
                                ? "border-success bg-success/10 text-success"
                                : "border-accent bg-accent/10 text-accent"
                              : isVisited
                                ? "border-border bg-bg text-secondary opacity-45"
                                : isActive
                                  ? "border-border bg-bg text-primary"
                                  : "border-border bg-bg text-secondary opacity-25"
                          }`}
                        >
                          {value}
                          {isCurrent ? (
                            <span className="absolute -right-1.5 -top-1.5 rounded-control border border-border bg-bg px-1 py-0.5 text-[10px] font-semibold text-primary">
                              cur
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">不变量</p>
                <p className="mt-1 text-sm font-medium text-primary">
                  候选区只会向左或向下收缩
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">当前位置</p>
                <p className="mt-1 font-mono text-sm font-semibold text-primary">
                  row={step.row}, col={step.col}
                </p>
              </div>
              <div className="rounded-card border border-border bg-elevated p-3">
                <p className="text-xs font-semibold text-secondary">候选边界</p>
                <p className="mt-1 font-mono text-sm font-semibold text-primary">
                  r[{step.activeRows.join("..")}] c[
                  {step.activeCols.join("..")}]
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
                <p className="font-mono text-2xl font-bold text-accent">
                  {step.compare}
                </p>
                <p
                  className={`rounded-control border px-2 py-1 text-xs font-semibold ${
                    step.val === TARGET
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
                why this corner
              </p>
              <div className="mt-3 grid gap-2 text-sm leading-6">
                <p className="text-primary">
                  右上角同时具备两个方向：向左变小，向下变大。
                </p>
                <p className="text-secondary">
                  所以每次比较都有唯一决策：大了删列，小了删行。
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
        面试白板法：先锁定右上角，再用“当前列全大”或“当前行全小”证明每一步删除都是安全的。
      </figcaption>
    </figure>
  );
}
