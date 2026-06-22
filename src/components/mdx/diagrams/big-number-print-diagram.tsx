"use client";

import { useState } from "react";

interface Step {
  title: string;
  slots: (string | null)[];
  activeIdx: number | null;
  stack: string[];
  console: string[];
  description: string;
  action: string;
}

const STEPS: Step[] = [
  {
    title: "步骤 0：进入递归 (Start)",
    slots: [null, null, null],
    activeIdx: 0,
    stack: ["dfs(0)"],
    console: ["(等待输出...)"],
    description: "算法启动，从最高位开始确定。调用 `dfs(0)`，当前字符数组槽位全空为 `[_, _, _]`。",
    action: "在索引 0 处分配字符"
  },
  {
    title: "步骤 1：第一层分配 (Assign 0)",
    slots: ["0", null, null],
    activeIdx: 1,
    stack: ["dfs(0)", "dfs(1)"],
    console: ["(等待输出...)"],
    description: "在索引 0 处填入 `'0'`，调用下一层 `dfs(1)` 确定十位数。当前字符数组状态为 `[0, _, _]`。",
    action: "在索引 1 处分配字符"
  },
  {
    title: "步骤 2：第二层分配 (Assign 1)",
    slots: ["0", "1", null],
    activeIdx: 2,
    stack: ["dfs(0)", "dfs(1)", "dfs(2)"],
    console: ["(等待输出...)"],
    description: "在索引 1 处填入 `'1'`，继续调用下一层 `dfs(2)` 确定个位数。当前状态为 `[0, 1, _]`。",
    action: "在索引 2 处分配字符"
  },
  {
    title: "步骤 3：触底基线条件 & 去前导零输出",
    slots: ["0", "1", "9"],
    activeIdx: null,
    stack: ["dfs(0)", "dfs(1)", "dfs(2)", "dfs(3) (Base)"],
    console: ["...", "18", "19 (新输出)"],
    description: "在最低位填入 `'9'`，进入 `dfs(3)`。由于达到递归深度 3（$n=3$），触发基线条件。定位首个非零字符，去除前导零 `'0'`，输出 `'19'`。",
    action: "触发回溯，返回上一层 dfs(2)"
  },
  {
    title: "步骤 4：回溯并分配新值 (Assign 2)",
    slots: ["0", "2", null],
    activeIdx: 2,
    stack: ["dfs(0)", "dfs(1)", "dfs(2)"],
    console: ["...", "18", "19"],
    description: "低位回溯，清除 `'9'`。在 `dfs(1)` 层中将索引 1 更新为 `'2'`。随后重新调用 `dfs(2)` 填入低位字符。当前状态 `[0, 2, _]`。",
    action: "向下递归填入最低位"
  },
  {
    title: "步骤 5：无前导零满位生成",
    slots: ["1", "0", "0"],
    activeIdx: null,
    stack: ["dfs(0)", "dfs(1)", "dfs(2)", "dfs(3) (Base)"],
    console: ["...", "99", "100 (新输出)"],
    description: "当最高位递增至 `'1'`，后续位依次填入 `'0'`、`'0'` 并进入 `dfs(3)` 基线条件时，无前导零，首位即有效位，直接输出 `'100'`。",
    action: "回溯并继续搜索，直到所有全排列结束"
  }
];

export function BigNumberPrintDiagram() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[580px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 540 320"
          role="img"
          aria-label="大数打印全排列回溯递归步骤可视化。"
          className="mx-auto block h-auto w-full"
        >
          {/* Header Marker definitions */}
          <defs>
            <marker
              id="stack-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 2 L 6 5 L 0 8 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* Title */}
          <text
            x="175"
            y="25"
            textAnchor="middle"
            fontSize="13px"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            递归全排列生成大数可视化 (n=3)
          </text>

          {/* 1. Slots section */}
          <g>
            <text
              x="20"
              y="52"
              fontSize="10px"
              fontWeight="700"
              fill="var(--accent)"
            >
              1. 字符数组槽位 (Slots)
            </text>

            {[0, 1, 2].map((idx) => {
              const x = 20 + idx * 52;
              const y = 62;
              const width = 42;
              const height = 36;
              const val = step.slots[idx];
              const isActive = step.activeIdx === idx;

              let strokeColor = "var(--border)";
              let strokeWidth = 1;
              if (isActive) {
                strokeColor = "var(--accent)";
                strokeWidth = 2;
              }

              return (
                <g key={`slot-${idx}`}>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx="6"
                    fill="var(--bg)"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                  />
                  <text
                    x={x + width / 2}
                    y={y + height / 2 + 5}
                    textAnchor="middle"
                    fontSize="16px"
                    fontWeight="700"
                    fill={val !== null ? "var(--text-primary)" : "var(--text-secondary)"}
                  >
                    {val !== null ? val : "_"}
                  </text>
                  <text
                    x={x + width / 2}
                    y={y + height + 13}
                    textAnchor="middle"
                    fontSize="8px"
                    fontWeight="600"
                    fill="var(--text-secondary)"
                  >
                    {`idx: ${idx}`}
                  </text>
                </g>
              );
            })}
          </g>

          {/* 2. Recursion stack trace */}
          <g>
            <text
              x="20"
              y="142"
              fontSize="10px"
              fontWeight="700"
              fill="var(--warning)"
            >
              2. 递归调用栈 (Call Stack)
            </text>

            <g>
              {step.stack.map((frame, idx) => {
                const x = 20 + idx * 76;
                const y = 152;
                const width = 64;
                const height = 22;
                const isTop = idx === step.stack.length - 1;

                let strokeColor = "var(--border)";
                let fillColor = "var(--bg)";
                let textColor = "var(--text-secondary)";
                if (isTop) {
                  strokeColor = "var(--warning)";
                  fillColor = "var(--warning)";
                  textColor = "var(--warning)";
                }

                return (
                  <g key={`frame-${idx}`}>
                    {idx > 0 && (
                      <line
                        x1={x - 12}
                        y1={y + height / 2}
                        x2={x - 2}
                        y2={y + height / 2}
                        stroke="var(--text-secondary)"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                        markerEnd="url(#stack-arrow)"
                      />
                    )}
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx="4"
                      fill={fillColor}
                      fillOpacity={isTop ? 0.15 : 1}
                      stroke={strokeColor}
                      strokeWidth={isTop ? 1.5 : 1}
                    />
                    <text
                      x={x + width / 2}
                      y={y + height / 2 + 3.5}
                      textAnchor="middle"
                      fontSize="9px"
                      fontWeight="700"
                      fill={textColor}
                    >
                      {frame}
                    </text>
                  </g>
                );
              })}
            </g>
          </g>

          {/* 3. Output stream */}
          <g>
            <text
              x="20"
              y="204"
              fontSize="10px"
              fontWeight="700"
              fill="var(--success)"
            >
              3. 控制台输出流 (Console Output)
            </text>

            <rect
              x="20"
              y="214"
              width="310"
              height="80"
              rx="6"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            {/* Terminal head */}
            <rect
              x="20"
              y="214"
              width="310"
              height="15"
              rx="6"
              fill="var(--border)"
              fillOpacity="0.3"
            />
            <circle cx="28" cy="221.5" r="2.5" fill="var(--danger)" fillOpacity="0.7" />
            <circle cx="35" cy="221.5" r="2.5" fill="var(--warning)" fillOpacity="0.7" />
            <circle cx="42" cy="221.5" r="2.5" fill="var(--success)" fillOpacity="0.7" />
            <text
              x="175"
              y="225"
              textAnchor="middle"
              fontSize="8px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              bash - print-numbers
            </text>

            {/* Terminal output content */}
            <g>
              {step.console.map((line, idx) => {
                const isHighlight = line.includes("新输出");
                return (
                  <text
                    key={`console-${idx}`}
                    x="30"
                    y={244 + idx * 16}
                    fontFamily="monospace"
                    fontSize="9.5px"
                    fontWeight={isHighlight ? "700" : "500"}
                    fill={isHighlight ? "var(--success)" : "var(--text-primary)"}
                  >
                    {line}
                  </text>
                );
              })}
            </g>
          </g>

          {/* 4. Right side Info/Monitor panel */}
          <g>
            <rect
              x="355"
              y="35"
              width="165"
              height="260"
              rx="8"
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            <text
              x="370"
              y="58"
              fontSize="11px"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              运行状态面板
            </text>
            <text
              x="505"
              y="58"
              textAnchor="end"
              fontSize="9px"
              fontWeight="700"
              fill="var(--accent)"
            >
              Step {currentStep}
            </text>
            <line
              x1="370"
              y1="66"
              x2="505"
              y2="66"
              stroke="var(--border)"
              strokeWidth="1"
            />

            {/* Depth info */}
            <text
              x="370"
              y="84"
              fontSize="9.5px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              递归树深度:
            </text>
            <text
              x="505"
              y="84"
              textAnchor="end"
              fontSize="9.5px"
              fontWeight="700"
              fill="var(--warning)"
            >
              {step.stack.length - 1} / 3
            </text>

            {/* Active pointer index */}
            <text
              x="370"
              y="100"
              fontSize="9.5px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              当前聚焦槽位:
            </text>
            <text
              x="505"
              y="100"
              textAnchor="end"
              fontSize="9.5px"
              fontWeight="700"
              fill={step.activeIdx !== null ? "var(--accent)" : "var(--text-secondary)"}
            >
              {step.activeIdx !== null ? `idx ${step.activeIdx}` : "无 (触底)"}
            </text>

            <line
              x1="370"
              y1="110"
              x2="505"
              y2="110"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Step Description */}
            <text
              x="370"
              y="126"
              fontSize="9.5px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              详细描述:
            </text>

            <foreignObject x="370" y="132" width="135" height="100">
              <div className="text-[9px] leading-relaxed text-primary font-medium">
                {step.description}
              </div>
            </foreignObject>

            <line
              x1="370"
              y1="238"
              x2="505"
              y2="238"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Next Action */}
            <text
              x="370"
              y="254"
              fontSize="9.5px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              后续动作:
            </text>
            <foreignObject x="370" y="260" width="135" height="30">
              <div className="text-[9px] font-bold text-accent">
                {step.action}
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* Stepper Controls */}
        <div className="mt-4 flex items-center justify-between px-1">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-control border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            上一步 (Prev)
          </button>

          {/* Progress indicators */}
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
        {step.title}：在 $n=3$ 的情况下，通过递归回溯全排列，逐位拼接并处理大数。
      </figcaption>
    </figure>
  );
}
