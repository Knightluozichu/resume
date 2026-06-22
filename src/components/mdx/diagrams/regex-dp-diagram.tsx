"use client";

import { useState } from "react";

interface Step {
  title: string;
  action: string;
  description: string;
  formula: string;
  activeCell: [number, number]; // [row, col]
  dependencyCells: [number, number][]; // cells this state depends on
  gridValues: (string | null)[][];
}

const STEPS: Step[] = [
  {
    title: "步骤 0：初始化基石",
    action: "下一步：匹配 s=\"\" 与 p=\"c*\"",
    description: "<strong>初始化基石状态 dp[0][0] = true</strong>。这代表空字符串 s 与空模式串 p 相互匹配，是所有状态转移的递推起点。",
    formula: "dp[0][0] = true",
    activeCell: [0, 0],
    dependencyCells: [],
    gridValues: [
      ["T", null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null]
    ]
  },
  {
    title: "步骤 1：空串匹配星号通配符",
    action: "下一步：匹配 s=\"a\" 与 p=\"c*a\"",
    description: "<strong>匹配空串与 'c*' 通配符</strong>。由于 p[1] = '*'，代表前驱字符 'c' 出现 0 次（即丢弃 'c*'）。因此匹配状态取决于 dp[0][0]，即 dp[0][2] = dp[0][0] = true。",
    formula: "dp[0][2] = dp[0][0] = true (匹配 0 次)",
    activeCell: [0, 2],
    dependencyCells: [[0, 0]],
    gridValues: [
      ["T", "F", "T", null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null]
    ]
  },
  {
    title: "步骤 2：单字符精准匹配",
    action: "下一步：匹配 s=\"aa\" 与 p=\"c*a*\"",
    description: "<strong>源字符 s[0]='a' 与模式字符 p[2]='a' 匹配</strong>。根据规则，当字符相同时，其匹配状态由左上方前驱状态决定，即 dp[1][3] = dp[0][2] = true。",
    formula: "dp[1][3] = dp[0][2] = true",
    activeCell: [1, 3],
    dependencyCells: [[0, 2]],
    gridValues: [
      ["T", "F", "T", "F", "T", "F"],
      ["F", "F", "F", "T", null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null]
    ]
  },
  {
    title: "步骤 3：星号通配符多字符匹配",
    action: "下一步：匹配 s=\"aab\" 与 p=\"c*a*b\"",
    description: "<strong>匹配 s[1]='a' 与 p[3]='*' (前驱为 'a')</strong>。由于当前源字符与星号前驱相同，且缩短源串后的状态 dp[1][4] = true，我们可以让 '*' 匹配多次，转移方程为 dp[2][4] = dp[1][4] = true。",
    formula: "dp[2][4] = dp[1][4] = true (匹配 1 次及以上)",
    activeCell: [2, 4],
    dependencyCells: [[1, 4]],
    gridValues: [
      ["T", "F", "T", "F", "T", "F"],
      ["F", "F", "F", "T", "T", "F"],
      ["F", "F", "F", "F", "T", null],
      [null, null, null, null, null, null]
    ]
  },
  {
    title: "步骤 4：字符匹配 & 完成匹配",
    action: "整个字符串匹配成功！",
    description: "<strong>源字符 s[2]='b' 与模式字符 p[4]='b' 匹配</strong>。当前字符相同，状态从左上方转移：dp[3][5] = dp[2][4] = true。右下角 dp[M][N] 最终为 true，表示完全匹配。",
    formula: "dp[3][5] = dp[2][4] = true (最终匹配状态)",
    activeCell: [3, 5],
    dependencyCells: [[2, 4]],
    gridValues: [
      ["T", "F", "T", "F", "T", "F"],
      ["F", "F", "F", "T", "T", "F"],
      ["F", "F", "F", "F", "T", "F"],
      ["F", "F", "F", "F", "F", "T"]
    ]
  }
];

export function RegexDpDiagram() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const gridX = 65;
  const gridY = 60;
  const cellW = 40;
  const cellH = 40;

  const cols = ["", "c", "*", "a", "*", "b"];
  const rows = ["", "a", "a", "b"];

  const getCellCenter = (r: number, c: number) => {
    return {
      x: gridX + c * cellW + cellW / 2,
      y: gridY + r * cellH + cellH / 2,
    };
  };

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[600px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        {/* SVG Visualization */}
        <svg
          viewBox="0 0 540 280"
          role="img"
          aria-label="正则表达式动态规划状态转移可视化"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="arrow-accent"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent)" />
            </marker>
            <marker
              id="arrow-warning"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* Grid Headers: Columns (Pattern p) */}
          <text x={gridX - 25} y={32} fontSize="11px" fontWeight="700" fill="var(--text-secondary)">
            s \ p
          </text>

          {cols.map((char, colIdx) => {
            const isHighlightCol = step.activeCell[1] === colIdx;
            return (
              <g key={`col-header-${colIdx}`}>
                {/* Index */}
                <text
                  x={gridX + colIdx * cellW + cellW / 2}
                  y={18}
                  textAnchor="middle"
                  fontSize="9px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                  opacity="0.6"
                >
                  {colIdx}
                </text>
                {/* Char */}
                <text
                  x={gridX + colIdx * cellW + cellW / 2}
                  y={38}
                  textAnchor="middle"
                  fontSize="12px"
                  fontWeight="700"
                  fill={isHighlightCol ? "var(--accent)" : "var(--text-primary)"}
                >
                  {char === "" ? '""' : char}
                </text>
              </g>
            );
          })}

          {/* Grid Headers: Rows (String s) */}
          {rows.map((char, rowIdx) => {
            const isHighlightRow = step.activeCell[0] === rowIdx;
            return (
              <g key={`row-header-${rowIdx}`}>
                {/* Index */}
                <text
                  x={gridX - 42}
                  y={gridY + rowIdx * cellH + cellH / 2 + 3}
                  textAnchor="middle"
                  fontSize="9px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                  opacity="0.6"
                >
                  {rowIdx}
                </text>
                {/* Char */}
                <text
                  x={gridX - 22}
                  y={gridY + rowIdx * cellH + cellH / 2 + 4}
                  textAnchor="middle"
                  fontSize="12px"
                  fontWeight="700"
                  fill={isHighlightRow ? "var(--accent)" : "var(--text-primary)"}
                >
                  {char === "" ? '""' : char}
                </text>
              </g>
            );
          })}

          {/* DP Grid Cells */}
          {rows.map((_, r) =>
            cols.map((_, c) => {
              const val = step.gridValues[r][c];
              const isActive = step.activeCell[0] === r && step.activeCell[1] === c;
              const isDependency = step.dependencyCells.some(([dr, dc]) => dr === r && dc === c);

              let rectStroke = "var(--border)";
              let rectStrokeWidth = 1.0;
              let rectFill = "var(--bg-elevated)";

              if (isActive) {
                rectStroke = "var(--accent)";
                rectStrokeWidth = 2.5;
                rectFill = "rgba(var(--accent-rgb), 0.08)";
              } else if (isDependency) {
                rectStroke = "var(--warning)";
                rectStrokeWidth = 2.0;
                rectFill = "rgba(var(--warning-rgb), 0.05)";
              }

              return (
                <g key={`cell-${r}-${c}`}>
                  <rect
                    x={gridX + c * cellW}
                    y={gridY + r * cellH}
                    width={cellW}
                    height={cellH}
                    fill={rectFill}
                    stroke={rectStroke}
                    strokeWidth={rectStrokeWidth}
                    rx={isActive || isDependency ? 4 : 0}
                    className="transition-all duration-300"
                  />
                  {val && (
                    <text
                      x={gridX + c * cellW + cellW / 2}
                      y={gridY + r * cellH + cellH / 2 + 4}
                      textAnchor="middle"
                      fontSize="12px"
                      fontWeight="800"
                      fill={val === "T" ? "var(--success)" : "var(--text-secondary)"}
                    >
                      {val}
                    </text>
                  )}
                  {!val && (
                    <circle
                      cx={gridX + c * cellW + cellW / 2}
                      cy={gridY + r * cellH + cellH / 2}
                      r={1.5}
                      fill="var(--text-secondary)"
                      opacity="0.3"
                    />
                  )}
                </g>
              );
            })
          )}

          {/* Dependency Arrows */}
          {step.dependencyCells.map(([dr, dc], arrowIdx) => {
            const from = getCellCenter(dr, dc);
            const to = getCellCenter(step.activeCell[0], step.activeCell[1]);

            // Draw curved line for horizontal matching (Step 1: dp[0][0] -> dp[0][2])
            if (dr === to.y && dr === step.activeCell[0]) {
              const controlY = from.y + 18; // Bend downwards to avoid header overlap
              return (
                <path
                  key={`arrow-${arrowIdx}`}
                  d={`M ${from.x + 10} ${from.y} Q ${(from.x + to.x) / 2} ${controlY} ${to.x - 12} ${to.y}`}
                  fill="none"
                  stroke="var(--warning)"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  markerEnd="url(#arrow-warning)"
                  className="transition-all duration-300"
                />
              );
            }

            // Regular straight diagonal or vertical arrow
            const angle = Math.atan2(to.y - from.y, to.x - from.x);
            const offset = 14;
            const startX = from.x + offset * Math.cos(angle);
            const startY = from.y + offset * Math.sin(angle);
            const endX = to.x - (offset + 2) * Math.cos(angle);
            const endY = to.y - (offset + 2) * Math.sin(angle);

            return (
              <line
                key={`arrow-${arrowIdx}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="var(--warning)"
                strokeWidth={2}
                markerEnd="url(#arrow-warning)"
                className="transition-all duration-300"
              />
            );
          })}

          {/* Right Detail Panel */}
          <g>
            <rect
              x={325}
              y={20}
              width={195}
              height={240}
              rx={6}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            {/* Panel Title */}
            <text x={340} y={42} fontSize="11px" fontWeight="700" fill="var(--text-primary)">
              调试终端 (Terminal)
            </text>
            <line x1={340} y1={49} x2={505} y2={49} stroke="var(--border)" strokeWidth={1} />

            {/* Description */}
            <foreignObject x={340} y={56} width="165" height="116">
              <div className="text-[10px] leading-relaxed text-primary font-medium select-none">
                <div className="text-[10.5px] font-bold text-accent mb-1">{step.title}</div>
                <div className="mb-1 text-[9px] font-mono bg-bg rounded px-1 py-0.5 inline-block text-secondary border border-border">
                  {step.formula}
                </div>
                <div dangerouslySetInnerHTML={{ __html: step.description }} />
              </div>
            </foreignObject>

            <line
              x1={340}
              y1={178}
              x2={505}
              y2={178}
              stroke="var(--border)"
              strokeWidth={1}
              strokeDasharray="2 2"
            />

            {/* Next Action */}
            <text x={340} y={196} fontSize="10px" fontWeight="600" fill="var(--text-secondary)">
              当前操作状态:
            </text>
            <foreignObject x={340} y={204} width="165" height="50">
              <div className="text-[10px] font-bold text-success leading-tight">
                {step.action}
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* Control Buttons */}
        <div className="mt-4 flex items-center justify-between px-1">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-control border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            上一步 (Prev)
          </button>

          {/* Step dots */}
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
                aria-label={`跳转到第 ${i} 步`}
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
        {step.title}：{step.formula}
      </figcaption>
    </figure>
  );
}
