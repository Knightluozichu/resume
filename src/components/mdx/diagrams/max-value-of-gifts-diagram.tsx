"use client";

import { useMemo, useState } from "react";

interface CellPoint {
  row: number;
  col: number;
}

interface StepData extends CellPoint {
  gift: number;
  fromTop: number | null;
  fromLeft: number | null;
  bestPrev: "start" | "top" | "left";
  dp: number;
  rowDp: number[];
  path: CellPoint[];
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const GRID = [
  [1, 3, 1, 5],
  [2, 2, 4, 2],
  [5, 0, 2, 3],
];

const STEPS: StepData[] = [
  {
    row: 0,
    col: 0,
    gift: 1,
    fromTop: null,
    fromLeft: null,
    bestPrev: "start",
    dp: 1,
    rowDp: [1, 0, 0, 0],
    path: [{ row: 0, col: 0 }],
    decision: "起点初始化",
    proof: "左上角没有前驱，最大价值就是当前礼物 1。",
    action: "dp[0] = 1",
    codeLine: 1,
  },
  {
    row: 0,
    col: 1,
    gift: 3,
    fromTop: null,
    fromLeft: 1,
    bestPrev: "left",
    dp: 4,
    rowDp: [1, 4, 0, 0],
    path: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ],
    decision: "第一行只能从左来",
    proof: "不存在上方格子，不能把 fromTop 当成 0 开一条新路。",
    action: "dp[1] = 3 + 1 = 4",
    codeLine: 4,
  },
  {
    row: 0,
    col: 2,
    gift: 1,
    fromTop: null,
    fromLeft: 4,
    bestPrev: "left",
    dp: 5,
    rowDp: [1, 4, 5, 0],
    path: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ],
    decision: "继续沿第一行累计",
    proof: "第一行没有分叉，每个格子都只能接左边的最优值。",
    action: "dp[2] = 1 + 4 = 5",
    codeLine: 4,
  },
  {
    row: 0,
    col: 3,
    gift: 5,
    fromTop: null,
    fromLeft: 5,
    bestPrev: "left",
    dp: 10,
    rowDp: [1, 4, 5, 10],
    path: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
    ],
    decision: "第一行收尾",
    proof: "到 (0,3) 的唯一合法来源仍是左边。",
    action: "dp[3] = 5 + 5 = 10",
    codeLine: 4,
  },
  {
    row: 1,
    col: 0,
    gift: 2,
    fromTop: 1,
    fromLeft: null,
    bestPrev: "top",
    dp: 3,
    rowDp: [3, 4, 5, 10],
    path: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
    ],
    decision: "第一列只能从上来",
    proof: "不存在左侧格子，滚动数组里的 dp[0] 仍代表上方旧值。",
    action: "dp[0] = 2 + 1 = 3",
    codeLine: 3,
  },
  {
    row: 1,
    col: 1,
    gift: 2,
    fromTop: 4,
    fromLeft: 3,
    bestPrev: "top",
    dp: 6,
    rowDp: [3, 6, 5, 10],
    path: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
    ],
    decision: "上方更优",
    proof: "到 (1,1) 的最后一步只能来自上或左，取 max(4, 3)。",
    action: "dp[1] = 2 + 4 = 6",
    codeLine: 5,
  },
  {
    row: 1,
    col: 2,
    gift: 4,
    fromTop: 5,
    fromLeft: 6,
    bestPrev: "left",
    dp: 10,
    rowDp: [3, 6, 10, 10],
    path: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ],
    decision: "左侧更优",
    proof: "滚动数组中 dp[2] 是上方旧值 5，dp[1] 是本行左侧新值 6。",
    action: "dp[2] = 4 + 6 = 10",
    codeLine: 5,
  },
  {
    row: 1,
    col: 3,
    gift: 2,
    fromTop: 10,
    fromLeft: 10,
    bestPrev: "top",
    dp: 12,
    rowDp: [3, 6, 10, 12],
    path: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 1, col: 3 },
    ],
    decision: "两边并列",
    proof: "上方和左侧都是 10，任选一条都能得到同样的最优值。",
    action: "dp[3] = 2 + 10 = 12",
    codeLine: 5,
  },
  {
    row: 2,
    col: 0,
    gift: 5,
    fromTop: 3,
    fromLeft: null,
    bestPrev: "top",
    dp: 8,
    rowDp: [8, 6, 10, 12],
    path: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ],
    decision: "第一列继续向下",
    proof: "第一列只有向下路径，不能从左侧越界进入。",
    action: "dp[0] = 5 + 3 = 8",
    codeLine: 3,
  },
  {
    row: 2,
    col: 1,
    gift: 0,
    fromTop: 6,
    fromLeft: 8,
    bestPrev: "left",
    dp: 8,
    rowDp: [8, 8, 10, 12],
    path: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
    ],
    decision: "左侧更优",
    proof: "当前礼物是 0，也要保留到达该格的最大前缀收益。",
    action: "dp[1] = 0 + 8 = 8",
    codeLine: 5,
  },
  {
    row: 2,
    col: 2,
    gift: 2,
    fromTop: 10,
    fromLeft: 8,
    bestPrev: "top",
    dp: 12,
    rowDp: [8, 8, 12, 12],
    path: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
    decision: "上方更优",
    proof: "上方旧值 10 大于本行左侧 8，因此从上方落下。",
    action: "dp[2] = 2 + 10 = 12",
    codeLine: 5,
  },
  {
    row: 2,
    col: 3,
    gift: 3,
    fromTop: 12,
    fromLeft: 12,
    bestPrev: "top",
    dp: 15,
    rowDp: [8, 8, 12, 15],
    path: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 1, col: 3 },
      { row: 2, col: 3 },
    ],
    decision: "返回右下角",
    proof: "最后一格的 dp 值就是从左上走到右下能拿到的最大礼物价值。",
    action: "return 15",
    codeLine: 6,
  },
];

const CODE_LINES = [
  "dp = Array(cols).fill(0)",
  "for i from 0 to rows - 1:",
  "  for j from 0 to cols - 1:",
  "    fromTop = i > 0 ? dp[j] : -inf",
  "    fromLeft = j > 0 ? dp[j - 1] : -inf",
  "    dp[j] = grid[i][j] + max(fromTop, fromLeft)",
  "return dp[cols - 1]",
];

export function MaxValueOfGiftsDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const computedKeys = useMemo(() => {
    const keys = new Set<string>();
    for (const item of STEPS.slice(0, currentStep + 1)) {
      keys.add(keyOf(item));
    }
    return keys;
  }, [currentStep]);

  const pathKeys = useMemo(
    () => new Set(step.path.map((point) => keyOf(point))),
    [step.path],
  );

  const prevKey =
    step.bestPrev === "top"
      ? `${step.row - 1}-${step.col}`
      : step.bestPrev === "left"
        ? `${step.row}-${step.col - 1}`
        : null;

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
                礼物最大价值：每格只看上方与左方
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>answer</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {STEPS[STEPS.length - 1].dp}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.row}-${item.col}-${index}`}
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
              <div className="grid gap-2">
                {GRID.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid grid-cols-[repeat(4,minmax(56px,1fr))] gap-2"
                  >
                    {row.map((gift, colIndex) => {
                      const cellKey = `${rowIndex}-${colIndex}`;
                      const isCurrent =
                        rowIndex === step.row && colIndex === step.col;
                      const isBestPrev = prevKey === cellKey;
                      const isComputed = computedKeys.has(cellKey);
                      const isPath = pathKeys.has(cellKey);
                      const dpValue =
                        STEPS.find(
                          (item) =>
                            item.row === rowIndex && item.col === colIndex,
                        )?.dp ?? null;

                      return (
                        <div
                          key={cellKey}
                          className={`relative flex min-h-[76px] flex-col justify-between rounded-control border p-2 transition-all ${
                            isCurrent
                              ? "border-accent bg-accent/10 text-accent"
                              : isBestPrev
                                ? "border-success bg-success/10 text-success"
                                : isPath
                                  ? "border-success/70 bg-success/10 text-success"
                                  : isComputed
                                    ? "border-border bg-bg text-primary"
                                    : "border-border bg-bg text-secondary opacity-50"
                          }`}
                        >
                          <div>
                            <span className="block font-mono text-xs font-semibold text-secondary">
                              ({rowIndex},{colIndex})
                            </span>
                            {isCurrent ? (
                              <span className="mt-0.5 block text-[10px] font-bold uppercase text-accent">
                                scan
                              </span>
                            ) : null}
                          </div>
                          <div>
                            <p className="font-mono text-lg font-bold">
                              gift {gift}
                            </p>
                            <p className="mt-1 font-mono text-xs font-semibold text-secondary">
                              dp {isComputed && dpValue !== null ? dpValue : "-"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {step.rowDp.map((value, index) => (
                  <div
                    key={index}
                    className={`rounded-card border p-3 text-center ${
                      index === step.col
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-bg text-primary"
                    }`}
                  >
                    <p className="text-xs font-semibold text-secondary">
                      dp[{index}]
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <StateCard
                label="fromTop"
                value={step.fromTop === null ? "-inf" : String(step.fromTop)}
              />
              <StateCard
                label="fromLeft"
                value={step.fromLeft === null ? "-inf" : String(step.fromLeft)}
              />
              <StateCard label="dp[i][j]" value={String(step.dp)} />
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                transition judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-base font-bold text-accent sm:text-lg">
                  {step.gift} + max(
                  {step.fromTop === null ? "-inf" : step.fromTop},{" "}
                  {step.fromLeft === null ? "-inf" : step.fromLeft})
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
                  第一行/第一列不能从不存在的方向转移，越界前驱应视为不可达。
                </p>
                <p className="text-secondary">
                  一维压缩时，dp[j] 是上方旧值，dp[j-1] 是本行左侧新值。
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
        面试白板法：每个格子只保留“到这里为止”的最优值；空间压缩后，当前数组同时承载上方旧状态和左侧新状态。
      </figcaption>
    </figure>
  );
}

function StateCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-border bg-elevated p-3 text-center">
      <p className="text-xs font-semibold text-secondary">{label}</p>
      <p className="mt-1 font-mono text-lg font-bold text-primary">{value}</p>
    </div>
  );
}

function keyOf(point: CellPoint) {
  return `${point.row}-${point.col}`;
}
