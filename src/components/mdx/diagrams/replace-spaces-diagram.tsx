"use client";

import { useState } from "react";

interface Step {
  title: string;
  p1: number;
  p2: number;
  chars: string[];
  highlights: number[];
  description: string;
  action: string;
  copyArrow?: { from: number; to: number };
}

const STEPS: Step[] = [
  {
    title: "步骤 0：初始化双指针",
    p1: 12,
    p2: 16,
    chars: ["W", "e", " ", "a", "r", "e", " ", "h", "a", "p", "p", "y", ".", "", "", "", ""],
    highlights: [],
    description: "双指针初始化。P1 指向原字符串末尾字符 '.'，P2 指向根据空格数扩容后的新末尾（追加 4 个空位）。",
    action: "准备从后往前扫描并复制"
  },
  {
    title: "步骤 1：逆序复制 'happy.'",
    p1: 6,
    p2: 10,
    chars: ["W", "e", " ", "a", "r", "e", " ", "h", "a", "p", "p", "h", "a", "p", "p", "y", "."],
    highlights: [11, 12, 13, 14, 15, 16],
    description: "从后往前复制 'happy.' 到新位置。P1 指针移动到第一个空格（索引 6），P2 移动到索引 10。",
    action: "P1 遇到空格，准备在此处逆序写入第一个 '%20'",
    copyArrow: { from: 7, to: 11 }
  },
  {
    title: "步骤 2：替换第一个空格为 '%20'",
    p1: 5,
    p2: 7,
    chars: ["W", "e", " ", "a", "r", "e", " ", "h", "%", "2", "0", "h", "a", "p", "p", "y", "."],
    highlights: [8, 9, 10],
    description: "在 P2 处逆序写入字符 '0'、'2'、'%'。完成写入后，P1 向左移动 1 格，P2 向左移动 3 格。",
    action: "写入完毕，继续逆序扫描字符"
  },
  {
    title: "步骤 3：逆序复制 'are'",
    p1: 2,
    p2: 4,
    chars: ["W", "e", " ", "a", "r", "a", "r", "e", "%", "2", "0", "h", "a", "p", "p", "y", "."],
    highlights: [5, 6, 7],
    description: "从后往前复制 'are' 复制到新位置。P1 指向第二个空格（索引 2），P2 移动到索引 4。",
    action: "P1 再次遇到空格，准备写入第二个 '%20'",
    copyArrow: { from: 3, to: 5 }
  },
  {
    title: "步骤 4：替换第二个空格为 '%20'",
    p1: 1,
    p2: 1,
    chars: ["W", "e", "%", "2", "0", "a", "r", "e", "%", "2", "0", "h", "a", "p", "p", "y", "."],
    highlights: [2, 3, 4],
    description: "在 P2 处逆序写入 '0'、'2'、'%'。写入完成后，P1 向左移动 1 格，P2 向左移动 3 格，此时两指针在索引 1 重合。",
    action: "写入完毕，继续复制剩余字符"
  },
  {
    title: "步骤 5：复制剩余字符 'We'",
    p1: -1,
    p2: -1,
    chars: ["W", "e", "%", "2", "0", "a", "r", "e", "%", "2", "0", "h", "a", "p", "p", "y", "."],
    highlights: [0, 1],
    description: "逆序复制剩余的 'We'。P1 递减至 -1，遍历结束，所有空格成功替换为 '%20'。",
    action: "替换完成！原位修改后的字符串为 'We%20are%20happy.'"
  }
];

export function ReplaceSpacesDiagram() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const CELL_W = 18;
  const CELL_H = 26;
  const GAP = 3;
  const START_X = 18;
  const START_Y = 100;

  const getCellCenter = (idx: number) => {
    const x = START_X + idx * (CELL_W + GAP) + CELL_W / 2;
    const y = START_Y + CELL_H / 2;
    return { x, y };
  };

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[580px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 560 320"
          role="img"
          aria-label="替换空格双指针算法步骤可视化。原字符串为 'We are happy.'，通过双指针从后往前原位替换空格为 '%20'。"
          className="mx-auto block h-auto w-full"
        >
          {/* SVG Marker for Arrow */}
          <defs>
            <marker
              id="copy-arrow-marker"
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
          <text
            x="190"
            y="25"
            textAnchor="middle"
            fontSize="14px"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            双指针原位替换空格 (We are happy.)
          </text>

          {/* Indices */}
          {Array.from({ length: 17 }).map((_, i) => {
            const pos = getCellCenter(i);
            return (
              <text
                key={`idx-${i}`}
                x={pos.x}
                y="85"
                textAnchor="middle"
                fontSize="9px"
                fontWeight="600"
                fill="var(--text-secondary)"
              >
                {i}
              </text>
            );
          })}

          {/* Cells */}
          {step.chars.map((char, i) => {
            const isP1 = i === step.p1;
            const isP2 = i === step.p2;
            const isHighlight = step.highlights.includes(i);
            const isEmpty = char === "";

            const x = START_X + i * (CELL_W + GAP);
            const y = START_Y;

            let strokeColor = "var(--border)";
            let fillColor = "var(--bg-elevated)";
            let textColor = "var(--text-primary)";
            let strokeWidth = 1;

            if (isP1) {
              strokeColor = "var(--warning)";
              strokeWidth = 1.5;
            }
            if (isP2) {
              strokeColor = "var(--accent)";
              strokeWidth = 1.5;
            }

            if (isHighlight) {
              fillColor = "var(--accent)";
              textColor = "var(--bg)"; // high contrast text
            }

            return (
              <g key={`cell-${i}`} className="transition-all duration-300">
                <rect
                  x={x}
                  y={y}
                  width={CELL_W}
                  height={CELL_H}
                  rx="3"
                  fill={fillColor}
                  fillOpacity={isHighlight ? 0.15 : 1}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
                <text
                  x={x + CELL_W / 2}
                  y={y + CELL_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight={isHighlight || isP1 || isP2 ? "700" : "500"}
                  fill={isHighlight ? "var(--accent)" : isP1 ? "var(--warning)" : isP2 ? "var(--accent)" : isEmpty ? "var(--text-secondary)" : textColor}
                >
                  {isEmpty ? "_" : char}
                </text>
              </g>
            );
          })}

          {/* P1 Pointer Arrow */}
          {step.p1 >= 0 && (
            <g
              style={{
                transform: `translateX(${step.p1 * (CELL_W + GAP)}px)`,
                transition: "transform 0.3s ease-in-out"
              }}
            >
              {/* Pointer text */}
              <text
                x={START_X + CELL_W / 2}
                y="45"
                textAnchor="middle"
                fontSize="10px"
                fontWeight="700"
                fill="var(--warning)"
              >
                P1
              </text>
              {/* Pointer line */}
              <line
                x1={START_X + CELL_W / 2}
                y1="50"
                x2={START_X + CELL_W / 2}
                y2="72"
                stroke="var(--warning)"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              {/* Pointer Arrowhead */}
              <path
                d={`M ${START_X + CELL_W / 2 - 3} 68 L ${START_X + CELL_W / 2} 73 L ${START_X + CELL_W / 2 + 3} 68`}
                fill="none"
                stroke="var(--warning)"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* P2 Pointer Arrow */}
          {step.p2 >= 0 && (
            <g
              style={{
                transform: `translateX(${step.p2 * (CELL_W + GAP)}px)`,
                transition: "transform 0.3s ease-in-out"
              }}
            >
              {/* Pointer line */}
              <line
                x1={START_X + CELL_W / 2}
                y1="132"
                x2={START_X + CELL_W / 2}
                y2="154"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              {/* Pointer Arrowhead */}
              <path
                d={`M ${START_X + CELL_W / 2 - 3} 138 L ${START_X + CELL_W / 2} 133 L ${START_X + CELL_W / 2 + 3} 138`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              {/* Pointer text */}
              <text
                x={START_X + CELL_W / 2}
                y="166"
                textAnchor="middle"
                fontSize="10px"
                fontWeight="700"
                fill="var(--accent)"
              >
                P2
              </text>
            </g>
          )}

          {/* Copy Action Arc */}
          {step.copyArrow && (
            <path
              d={`M ${getCellCenter(step.copyArrow.from).x} 95 Q ${(getCellCenter(step.copyArrow.from).x + getCellCenter(step.copyArrow.to).x) / 2} 65 ${getCellCenter(step.copyArrow.to).x} 95`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              markerEnd="url(#copy-arrow-marker)"
              className="transition-all duration-300"
            />
          )}

          {/* Right Info Panel */}
          <g>
            <rect
              x="380"
              y="55"
              width="165"
              height="210"
              rx="8"
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            <text
              x="395"
              y="78"
              fontSize="12px"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              运行状态 (Step {currentStep})
            </text>
            <line
              x1="395"
              y1="86"
              x2="530"
              y2="86"
              stroke="var(--border)"
              strokeWidth="1"
            />

            {/* P1 State */}
            <text
              x="395"
              y="108"
              fontSize="10px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              源指针 P1:
            </text>
            <text
              x="465"
              y="108"
              fontSize="10px"
              fontWeight="700"
              fill={step.p1 >= 0 ? "var(--warning)" : "var(--text-secondary)"}
            >
              {step.p1 >= 0 ? `索引 ${step.p1}` : "结束 (-1)"}
            </text>

            {/* P2 State */}
            <text
              x="395"
              y="126"
              fontSize="10px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              新指针 P2:
            </text>
            <text
              x="465"
              y="126"
              fontSize="10px"
              fontWeight="700"
              fill={step.p2 >= 0 ? "var(--accent)" : "var(--text-secondary)"}
            >
              {step.p2 >= 0 ? `索引 ${step.p2}` : "结束 (-1)"}
            </text>

            <line
              x1="395"
              y1="138"
              x2="530"
              y2="138"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Step Detail Description */}
            <text
              x="395"
              y="156"
              fontSize="10px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              当前操作说明:
            </text>

            {/* Wrap description into multiple lines manually since SVG doesn't support text wrapping */}
            <foreignObject x="395" y="164" width="138" height="60">
              <div className="text-[9.5px] leading-relaxed text-primary font-medium">
                {step.description}
              </div>
            </foreignObject>

            <line
              x1="395"
              y1="228"
              x2="530"
              y2="228"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Current Decision/Action */}
            <text
              x="395"
              y="244"
              fontSize="10px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              下一步动作:
            </text>
            <text
              x="395"
              y="256"
              fontSize="9px"
              fontWeight="700"
              fill="var(--accent)"
            >
              {step.action}
            </text>
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
        {step.title}：{step.description}
      </figcaption>
    </figure>
  );
}
