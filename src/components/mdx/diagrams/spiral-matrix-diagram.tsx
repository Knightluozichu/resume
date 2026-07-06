"use client";

import React, { useState, useCallback } from "react";

/* ───────── Constants ───────── */
const ROWS = 4;
const COLS = 4;
const CELL = 48;
const GAP = 4;
const GRID_X = 60;
const GRID_Y = 50;
const GRID_W = COLS * CELL + (COLS - 1) * GAP;
const GRID_H = ROWS * CELL + (ROWS - 1) * GAP;

const MATRIX = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

interface StepData {
  label: string;
  description: string;
  top: number;
  bottom: number;
  left: number;
  right: number;
  highlighted: number[]; // flat indices highlighted this step
  output: number[]; // cumulative output
}

const STEPS: StepData[] = [
  {
    label: "初始化",
    description:
      "设定四个边界指针：top=0, bottom=3, left=0, right=3。输出为空。",
    top: 0,
    bottom: 3,
    left: 0,
    right: 3,
    highlighted: [],
    output: [],
  },
  {
    label: "上边 →",
    description:
      "遍历 top 行（第 0 行）从 left 到 right：1, 2, 3, 4。然后 top 缩减为 1。",
    top: 0,
    bottom: 3,
    left: 0,
    right: 3,
    highlighted: [0, 1, 2, 3],
    output: [1, 2, 3, 4],
  },
  {
    label: "右边 ↓",
    description:
      "遍历 right 列（第 3 列）从 top 到 bottom：8, 12, 16。然后 right 缩减为 2。",
    top: 1,
    bottom: 3,
    left: 0,
    right: 3,
    highlighted: [7, 11, 15],
    output: [1, 2, 3, 4, 8, 12, 16],
  },
  {
    label: "下边 ←",
    description:
      "遍历 bottom 行（第 3 行）从 right 到 left：15, 14, 13。然后 bottom 缩减为 2。",
    top: 1,
    bottom: 3,
    left: 0,
    right: 2,
    highlighted: [14, 13, 12],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13],
  },
  {
    label: "左边 ↑",
    description:
      "遍历 left 列（第 0 列）从 bottom 到 top：9, 5。然后 left 缩减为 1。",
    top: 1,
    bottom: 2,
    left: 0,
    right: 2,
    highlighted: [8, 4],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5],
  },
  {
    label: "内层上边 →",
    description:
      "遍历 top 行（第 1 行）从 left 到 right：6, 7。然后 top 缩减为 2。",
    top: 1,
    bottom: 2,
    left: 1,
    right: 2,
    highlighted: [5, 6],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7],
  },
  {
    label: "内层右边 ↓",
    description:
      "遍历 right 列（第 2 列）从 top 到 bottom：11。然后 right 缩减为 1。",
    top: 2,
    bottom: 2,
    left: 1,
    right: 2,
    highlighted: [10],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11],
  },
  {
    label: "内层下边 ←",
    description:
      "遍历 bottom 行（第 2 行）从 right 到 left：10。然后 bottom 缩减为 1。",
    top: 2,
    bottom: 2,
    left: 1,
    right: 1,
    highlighted: [9],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10],
  },
  {
    label: "完成 ✓",
    description:
      "所有 16 个元素已按顺时针顺序打印完毕。top > bottom，循环终止。",
    top: 2,
    bottom: 1,
    left: 1,
    right: 1,
    highlighted: [],
    output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10],
  },
];

function cellX(col: number) {
  return GRID_X + col * (CELL + GAP);
}
function cellY(row: number) {
  return GRID_Y + row * (CELL + GAP);
}

/* ───────── Component ───────── */
export function SpiralMatrixDiagram() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  const prev = useCallback(() => setStep((p) => Math.max(0, p - 1)), []);
  const next = useCallback(
    () => setStep((p) => Math.min(STEPS.length - 1, p + 1)),
    [],
  );

  // Collect all previously visited cells
  const visited = new Set<number>();
  for (let i = 0; i <= step; i++) {
    for (const idx of STEPS[i].highlighted) visited.add(idx);
  }

  return (
    <figure style={{ margin: "1.5rem 0" }}>
      <svg
        viewBox="0 0 540 320"
        style={{
          width: "100%",
          maxWidth: 640,
          display: "block",
          margin: "0 auto",
        }}
        role="img"
        aria-label="顺时针打印矩阵动画示意图"
      >
        {/* ── Grid cells ── */}
        {MATRIX.flatMap((row, r) =>
          row.map((val, c) => {
            const flatIdx = r * COLS + c;
            const isHighlighted = s.highlighted.includes(flatIdx);
            const isVisited = visited.has(flatIdx);
            const cx = cellX(c);
            const cy = cellY(r);
            return (
              <g key={flatIdx}>
                <rect
                  x={cx}
                  y={cy}
                  width={CELL}
                  height={CELL}
                  rx={6}
                  fill={
                    isHighlighted
                      ? "var(--accent, #6366f1)"
                      : isVisited
                        ? "var(--success, #22c55e)"
                        : "var(--card, #1e1e2e)"
                  }
                  opacity={isHighlighted ? 1 : isVisited ? 0.3 : 0.6}
                  stroke={
                    isHighlighted
                      ? "var(--accent, #6366f1)"
                      : "var(--border, #333)"
                  }
                  strokeWidth={isHighlighted ? 2.5 : 1}
                />
                <text
                  x={cx + CELL / 2}
                  y={cy + CELL / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={14}
                  fontWeight={isHighlighted ? 700 : 500}
                  fill={isHighlighted ? "#fff" : "var(--text-primary, #e0e0e0)"}
                  fontFamily="var(--font-mono, monospace)"
                >
                  {val}
                </text>
              </g>
            );
          }),
        )}

        {/* ── Boundary indicators ── */}
        {step < STEPS.length - 1 && (
          <>
            {/* top boundary */}
            <line
              x1={cellX(s.left) - 6}
              y1={cellY(s.top) - 6}
              x2={cellX(s.right) + CELL + 6}
              y2={cellY(s.top) - 6}
              stroke="var(--accent, #6366f1)"
              strokeWidth={2}
              strokeDasharray="4 2"
            />
            <text
              x={cellX(s.right) + CELL + 12}
              y={cellY(s.top) - 2}
              fontSize={10}
              fill="var(--accent, #6366f1)"
              fontFamily="var(--font-mono, monospace)"
            >
              top={s.top}
            </text>

            {/* bottom boundary */}
            <line
              x1={cellX(s.left) - 6}
              y1={cellY(s.bottom) + CELL + 6}
              x2={cellX(s.right) + CELL + 6}
              y2={cellY(s.bottom) + CELL + 6}
              stroke="var(--warning, #f59e0b)"
              strokeWidth={2}
              strokeDasharray="4 2"
            />
            <text
              x={cellX(s.right) + CELL + 12}
              y={cellY(s.bottom) + CELL + 10}
              fontSize={10}
              fill="var(--warning, #f59e0b)"
              fontFamily="var(--font-mono, monospace)"
            >
              bot={s.bottom}
            </text>

            {/* left boundary */}
            <line
              x1={cellX(s.left) - 6}
              y1={cellY(s.top) - 6}
              x2={cellX(s.left) - 6}
              y2={cellY(s.bottom) + CELL + 6}
              stroke="var(--success, #22c55e)"
              strokeWidth={2}
              strokeDasharray="4 2"
            />
            <text
              x={cellX(s.left) - 10}
              y={cellY(s.bottom) + CELL + 22}
              fontSize={10}
              fill="var(--success, #22c55e)"
              textAnchor="end"
              fontFamily="var(--font-mono, monospace)"
            >
              L={s.left}
            </text>

            {/* right boundary */}
            <line
              x1={cellX(s.right) + CELL + 6}
              y1={cellY(s.top) - 6}
              x2={cellX(s.right) + CELL + 6}
              y2={cellY(s.bottom) + CELL + 6}
              stroke="var(--error, #ef4444)"
              strokeWidth={2}
              strokeDasharray="4 2"
            />
            <text
              x={cellX(s.right) + CELL + 12}
              y={cellY(s.bottom) + CELL + 22}
              fontSize={10}
              fill="var(--error, #ef4444)"
              fontFamily="var(--font-mono, monospace)"
            >
              R={s.right}
            </text>
          </>
        )}

        {/* ── Console output ── */}
        <text
          x={GRID_X}
          y={GRID_Y + GRID_H + 36}
          fontSize={11}
          fill="var(--text-secondary, #888)"
          fontFamily="var(--font-mono, monospace)"
        >
          Output:
        </text>
        <text
          x={GRID_X + 52}
          y={GRID_Y + GRID_H + 36}
          fontSize={11}
          fill="var(--text-primary, #e0e0e0)"
          fontFamily="var(--font-mono, monospace)"
        >
          {s.output.length ? `[${s.output.join(", ")}]` : "[]"}
        </text>

        {/* ── Step label ── */}
        <text
          x={GRID_X}
          y={GRID_Y + GRID_H + 54}
          fontSize={12}
          fontWeight={600}
          fill="var(--accent, #6366f1)"
        >
          Step {step}/{STEPS.length - 1}: {s.label}
        </text>

        {/* ── Description ── */}
        {s.description.length <= 60 ? (
          <text
            x={GRID_X}
            y={GRID_Y + GRID_H + 72}
            fontSize={10.5}
            fill="var(--text-secondary, #888)"
          >
            {s.description}
          </text>
        ) : (
          <>
            <text
              x={GRID_X}
              y={GRID_Y + GRID_H + 70}
              fontSize={10.5}
              fill="var(--text-secondary, #888)"
            >
              {s.description.slice(0, 55)}
            </text>
            <text
              x={GRID_X}
              y={GRID_Y + GRID_H + 83}
              fontSize={10.5}
              fill="var(--text-secondary, #888)"
            >
              {s.description.slice(55)}
            </text>
          </>
        )}
      </svg>

      {/* ── Navigation controls ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginTop: 8,
        }}
      >
        <button
          onClick={prev}
          disabled={step === 0}
          aria-label="上一步"
          style={{
            padding: "4px 14px",
            borderRadius: 6,
            border: "1px solid var(--border, #333)",
            background: "var(--card, #1e1e2e)",
            color: "var(--text-primary, #e0e0e0)",
            cursor: step === 0 ? "not-allowed" : "pointer",
            opacity: step === 0 ? 0.4 : 1,
            fontSize: 13,
          }}
        >
          ◀ Prev
        </button>

        {/* Step dots */}
        <div style={{ display: "flex", gap: 5 }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`跳转到第 ${i} 步`}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background:
                  i === step ? "var(--accent, #6366f1)" : "var(--border, #444)",
                transition: "background 0.2s",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={step === STEPS.length - 1}
          aria-label="下一步"
          style={{
            padding: "4px 14px",
            borderRadius: 6,
            border: "1px solid var(--border, #333)",
            background: "var(--card, #1e1e2e)",
            color: "var(--text-primary, #e0e0e0)",
            cursor: step === STEPS.length - 1 ? "not-allowed" : "pointer",
            opacity: step === STEPS.length - 1 ? 0.4 : 1,
            fontSize: 13,
          }}
        >
          Next ▶
        </button>
      </div>
    </figure>
  );
}
