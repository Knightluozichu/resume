"use client";

import { useState } from "react";

interface StepInfo {
  row: number;
  col: number;
  val: number;
  comparison: string;
  conclusion: string;
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

const MATRIX = [
  [1,  2,  8,  9],
  [2,  4,  9, 12],
  [4,  7, 10, 13],
  [6,  8, 11, 15]
];

const TARGET = 7;

const STEPS: StepInfo[] = [
  {
    row: 0,
    col: 3,
    val: 9,
    comparison: "9 > 7",
    conclusion: "9 > 7，目标值较小，排除第 3 列",
    rowStart: 0,
    rowEnd: 3,
    colStart: 0,
    colEnd: 3
  },
  {
    row: 0,
    col: 2,
    val: 8,
    comparison: "8 > 7",
    conclusion: "8 > 7，目标值较小，排除第 2 列",
    rowStart: 0,
    rowEnd: 3,
    colStart: 0,
    colEnd: 2
  },
  {
    row: 0,
    col: 1,
    val: 2,
    comparison: "2 < 7",
    conclusion: "2 < 7，目标值较大，排除第 0 行",
    rowStart: 0,
    rowEnd: 3,
    colStart: 0,
    colEnd: 1
  },
  {
    row: 1,
    col: 1,
    val: 4,
    comparison: "4 < 7",
    conclusion: "4 < 7，目标值较大，排除第 1 行",
    rowStart: 1,
    rowEnd: 3,
    colStart: 0,
    colEnd: 1
  },
  {
    row: 2,
    col: 1,
    val: 7,
    comparison: "7 == 7",
    conclusion: "7 == 7，找到目标值，查找成功！",
    rowStart: 2,
    rowEnd: 3,
    colStart: 0,
    colEnd: 1
  }
];

export function FindInMatrixDiagram() {
  const [currentStep, setCurrentStep] = useState(0);

  const GRID_X = 40;
  const GRID_Y = 55;
  const CELL_W = 46;
  const CELL_H = 46;
  const GAP = 8;

  const step = STEPS[currentStep];

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  // Helper to determine center coordinate of a cell
  const getCellCenter = (r: number, c: number) => {
    const x = GRID_X + c * (CELL_W + GAP) + CELL_W / 2;
    const y = GRID_Y + r * (CELL_H + GAP) + CELL_H / 2;
    return { x, y };
  };

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[580px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 540 320"
          role="img"
          aria-label="二维数组中的查找步骤可视化。在行列递增矩阵中查找 7。从右上角开始比较，根据大小排除行或列。"
          className="mx-auto block h-auto w-full"
        >
          {/* SVG Arrow Marker Definition */}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Title */}
          <text x="270" y="25" textAnchor="middle" fontSize="15px" fontWeight="700" fill="var(--text-primary)">
            二维数组中的查找 (Target = 7)
          </text>

          {/* Column Indices */}
          {[0, 1, 2, 3].map((c) => {
            const pos = getCellCenter(0, c);
            return (
              <text key={`col-idx-${c}`} x={pos.x} y="44" textAnchor="middle" fontSize="10px" fontWeight="600" fill="var(--text-secondary)">
                c={c}
              </text>
            );
          })}

          {/* Row Indices */}
          {[0, 1, 2, 3].map((r) => {
            const pos = getCellCenter(r, 0);
            return (
              <text key={`row-idx-${r}`} x="22" y={pos.y + 3.5} textAnchor="middle" fontSize="10px" fontWeight="600" fill="var(--text-secondary)">
                r={r}
              </text>
            );
          })}

          {/* Cells Grid */}
          {MATRIX.map((rowArr, r) =>
            rowArr.map((v, c) => {
              const isActive = r === step.row && c === step.col;
              // A cell is eliminated if it is outside the active boundaries of the current step
              const isEliminated =
                r < step.rowStart ||
                r > step.rowEnd ||
                c < step.colStart ||
                c > step.colEnd;

              const isFound = isActive && v === TARGET;

              const x = GRID_X + c * (CELL_W + GAP);
              const y = GRID_Y + r * (CELL_H + GAP);

              let strokeColor = "var(--border)";
              let fillColor = "var(--bg-elevated)";
              let textColor = "var(--text-primary)";
              let strokeWidth = 1.5;

              if (isActive) {
                strokeColor = isFound ? "var(--success)" : "var(--accent)";
                fillColor = isFound ? "var(--success)" : "var(--accent)";
                textColor = "var(--bg)"; // high contrast text color
                strokeWidth = 2;
              } else if (isEliminated) {
                textColor = "var(--text-secondary)";
              }

              return (
                <g key={`cell-${r}-${c}`} opacity={isEliminated && !isActive ? 0.25 : 1}>
                  <rect
                    x={x}
                    y={y}
                    width={CELL_W}
                    height={CELL_H}
                    rx="6"
                    fill={fillColor}
                    fillOpacity={isActive ? 0.15 : 1}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    className="transition-all duration-300"
                  />
                  <text
                    x={x + CELL_W / 2}
                    y={y + CELL_H / 2 + 4.5}
                    textAnchor="middle"
                    fontSize="13px"
                    fontWeight={isActive ? "700" : "500"}
                    fill={isActive ? (isFound ? "var(--success)" : "var(--accent)") : textColor}
                    className="transition-colors duration-300"
                  >
                    {v}
                  </text>
                </g>
              );
            })
          )}

          {/* Paths / Arrows */}
          {Array.from({ length: currentStep }).map((_, i) => {
            const idx = i + 1;
            const prev = STEPS[idx - 1];
            const curr = STEPS[idx];
            const p1 = getCellCenter(prev.row, prev.col);
            const p2 = getCellCenter(curr.row, curr.col);

            let sx = p1.x, sy = p1.y, ex = p2.x, ey = p2.y;
            // Shorten the arrow line segment so it doesn't overlap text inside cells
            if (p1.x === p2.x) {
              sy = p1.y + 15;
              ey = p2.y - 15;
            } else {
              sx = p1.x - 15;
              ex = p2.x + 15;
            }

            return (
              <line
                key={`arrow-${idx}`}
                x1={sx}
                y1={sy}
                x2={ex}
                y2={ey}
                stroke="var(--accent)"
                strokeWidth="2"
                strokeDasharray="1 1"
                markerEnd="url(#arrow)"
              />
            );
          })}

          {/* Right Info Panel */}
          <g>
            {/* Background Card */}
            <rect
              x="290"
              y="55"
              width="225"
              height="210"
              rx="8"
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            {/* Header */}
            <text x="305" y="80" fontSize="13px" fontWeight="700" fill="var(--text-primary)">
              查找进度 (Step {currentStep})
            </text>
            <line x1="305" y1="90" x2="500" y2="90" stroke="var(--border)" strokeWidth="1" />

            {/* Details */}
            <text x="305" y="112" fontSize="11px" fontWeight="600" fill="var(--text-secondary)">
              当前坐标:
            </text>
            <text x="365" y="112" fontSize="11px" fontWeight="700" fill="var(--text-primary)">
              r={step.row}, c={step.col}
            </text>

            <text x="305" y="132" fontSize="11px" fontWeight="600" fill="var(--text-secondary)">
              当前数值:
            </text>
            <text x="365" y="132" fontSize="11px" fontWeight="700" fill={step.val === TARGET ? "var(--success)" : "var(--text-primary)"}>
              {step.val}
            </text>

            <text x="305" y="152" fontSize="11px" fontWeight="600" fill="var(--text-secondary)">
              对比式子:
            </text>
            <text x="365" y="152" fontSize="11px" fontWeight="700" fill="var(--accent)">
              {step.comparison}
            </text>

            {/* Range Bounds */}
            <text x="305" y="180" fontSize="11px" fontWeight="600" fill="var(--text-secondary)">
              搜索范围:
            </text>
            <text x="305" y="196" fontSize="10px" fontWeight="600" fill="var(--text-secondary)">
              行: [{step.rowStart}, {step.rowEnd}] | 列: [{step.colStart}, {step.colEnd}]
            </text>

            {/* Divider */}
            <line x1="305" y1="210" x2="500" y2="210" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2" />

            {/* Action / Conclusion */}
            <text x="305" y="232" fontSize="11px" fontWeight="600" fill="var(--text-secondary)">
              执行决策:
            </text>
            <text x="305" y="248" fontSize="11px" fontWeight="700" fill={step.val === TARGET ? "var(--success)" : "var(--text-primary)"}>
              {step.conclusion}
            </text>
          </g>
        </svg>

        {/* Buttons Controls */}
        <div className="mt-4 flex items-center justify-between px-1">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-control border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            上一步 (Prev)
          </button>
          
          {/* Progress Indicators */}
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-6 bg-accent"
                    : i < currentStep
                    ? "w-2 bg-success"
                    : "w-2 bg-border"
                }`}
                aria-label={`跳转到步骤 ${i}`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === STEPS.length - 1}
            className="rounded-control border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            下一步 (Next)
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        指针初始在右上角 (0,3)=9。由于 9 &gt; 7，排除最后一列。指针逐步向左或向下逼近，直到在 (2,1) 找到 7。
      </figcaption>
    </figure>
  );
}
