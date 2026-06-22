"use client";

import { useState } from "react";

interface StepInfo {
  title: string;
  action: string;
  s1: string[];
  s2: string[];
  output: string;
  explanationLines: string[];
  transfer?: boolean;
  highlightS1Push?: boolean;
  highlightS2Pop?: boolean;
}

const STEPS: StepInfo[] = [
  {
    title: "初始状态",
    action: "初始化队列",
    s1: [],
    s2: [],
    output: "-",
    explanationLines: [
      "输入栈和输出栈均为空，",
      "队列处于初始空状态。"
    ],
  },
  {
    title: "入队 A 和 B",
    action: "Enqueue 'A', 'B'",
    s1: ["A", "B"],
    s2: [],
    output: "-",
    explanationLines: [
      "1. 依次将 'A', 'B' 入队。",
      "2. 元素直接压入 Stack 1 (输入栈)。",
      "此时 Stack 1 栈顶为 'B'。"
    ],
    highlightS1Push: true,
  },
  {
    title: "入队 C",
    action: "Enqueue 'C'",
    s1: ["A", "B", "C"],
    s2: [],
    output: "-",
    explanationLines: [
      "1. 将新元素 'C' 入队。",
      "2. 压入 Stack 1 栈顶。",
      "此时 Stack 1 内部为 [A, B, C]。"
    ],
    highlightS1Push: true,
  },
  {
    title: "转移至 Stack 2",
    action: "Transfer S1 ➔ S2",
    s1: [],
    s2: ["C", "B", "A"],
    output: "-",
    explanationLines: [
      "1. 触发出队，但 Stack 2 为空！",
      "2. 必须将 Stack 1 所有元素逐个",
      "   弹出并压入 Stack 2 中。",
      "3. 顺序被逆转，'A' 变为 Stack 2 栈顶。"
    ],
    transfer: true,
  },
  {
    title: "出队 A",
    action: "Dequeue A",
    s1: [],
    s2: ["C", "B"],
    output: "A",
    explanationLines: [
      "1. 从 Stack 2 栈顶弹出 'A'。",
      "2. 'A' 作为出队结果返回。",
      "符合先进先出 (FIFO) 规则。"
    ],
    highlightS2Pop: true,
  },
  {
    title: "入队 D",
    action: "Enqueue 'D'",
    s1: ["D"],
    s2: ["C", "B"],
    output: "A",
    explanationLines: [
      "1. 新元素 'D' 入队。",
      "2. 直接压入 Stack 1 (输入栈)。",
      "Stack 2 保持不变。"
    ],
    highlightS1Push: true,
  },
  {
    title: "出队 B",
    action: "Dequeue B",
    s1: ["D"],
    s2: ["C"],
    output: "B",
    explanationLines: [
      "1. 再次触发出队操作。",
      "2. 此时 Stack 2 非空！",
      "3. 直接从 Stack 2 弹出栈顶 'B'。"
    ],
    highlightS2Pop: true,
  },
  {
    title: "出队 C, D",
    action: "Dequeue C & D",
    s1: [],
    s2: [],
    output: "C, 然后 D",
    explanationLines: [
      "1. 弹出 Stack 2 栈顶 'C'，Stack 2 变空。",
      "2. 再次出队，Stack 2 为空，",
      "   将 Stack 1 中的 'D' 转移至 Stack 2，",
      "   再从 Stack 2 弹出 'D'。完成！"
    ],
    transfer: true,
  }
];

export function QueueWithTwoStacksDiagram() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  // Stack tubes configuration
  const TUBE_W = 66;
  const TUBE_H = 150;
  const TUBE_Y = 90;
  const BOTTOM_Y = TUBE_Y + TUBE_H; // 240

  const S1_X = 85;
  const S2_X = 205;

  const ELEM_W = 52;
  const ELEM_H = 30;
  const ELEM_GAP = 5;

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[580px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 540 320"
          role="img"
          aria-label="两个栈实现队列的步骤可视化。演示入队压入Stack 1，出队从Stack 2弹出，以及Stack 2为空时，将Stack 1全部转移到Stack 2的步骤。"
          className="mx-auto block h-auto w-full"
        >
          {/* SVG Arrow Marker Definition */}
          <defs>
            <marker
              id="arrow-head"
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
            x="270"
            y="25"
            textAnchor="middle"
            fontSize="15px"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            双栈模拟队列 (Queue with Two Stacks)
          </text>

          {/* Draw Stack 1 Tube */}
          <g>
            {/* Tube Semi-transparent Background */}
            <rect
              x={S1_X - TUBE_W / 2}
              y={TUBE_Y}
              width={TUBE_W}
              height={TUBE_H}
              fill="var(--bg-elevated)"
              fillOpacity="0.2"
            />
            {/* Tube Walls */}
            <path
              d={`M ${S1_X - TUBE_W / 2} ${TUBE_Y} L ${S1_X - TUBE_W / 2} ${BOTTOM_Y} L ${S1_X + TUBE_W / 2} ${BOTTOM_Y} L ${S1_X + TUBE_W / 2} ${TUBE_Y}`}
              fill="none"
              stroke="var(--border)"
              strokeWidth="2.5"
            />
            {/* Tube Label */}
            <text
              x={S1_X}
              y={BOTTOM_Y + 20}
              textAnchor="middle"
              fontSize="12px"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              Stack 1 (输入栈)
            </text>
            <text
              x={S1_X}
              y={BOTTOM_Y + 36}
              textAnchor="middle"
              fontSize="10px"
              fill="var(--text-secondary)"
            >
              用于 push 入队
            </text>
          </g>

          {/* Draw Stack 2 Tube */}
          <g>
            {/* Tube Semi-transparent Background */}
            <rect
              x={S2_X - TUBE_W / 2}
              y={TUBE_Y}
              width={TUBE_W}
              height={TUBE_H}
              fill="var(--bg-elevated)"
              fillOpacity="0.2"
            />
            {/* Tube Walls */}
            <path
              d={`M ${S2_X - TUBE_W / 2} ${TUBE_Y} L ${S2_X - TUBE_W / 2} ${BOTTOM_Y} L ${S2_X + TUBE_W / 2} ${BOTTOM_Y} L ${S2_X + TUBE_W / 2} ${TUBE_Y}`}
              fill="none"
              stroke="var(--border)"
              strokeWidth="2.5"
            />
            {/* Tube Label */}
            <text
              x={S2_X}
              y={BOTTOM_Y + 20}
              textAnchor="middle"
              fontSize="12px"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              Stack 2 (输出栈)
            </text>
            <text
              x={S2_X}
              y={BOTTOM_Y + 36}
              textAnchor="middle"
              fontSize="10px"
              fill="var(--text-secondary)"
            >
              用于 pop 出队
            </text>
          </g>

          {/* Elements inside Stack 1 */}
          {step.s1.map((item, idx) => {
            const isTop = idx === step.s1.length - 1;
            const itemY = BOTTOM_Y - (idx + 1) * (ELEM_H + ELEM_GAP);
            
            let rectFill = "var(--bg-elevated)";
            let rectStroke = "var(--border)";
            let textFill = "var(--text-primary)";

            if (isTop && step.highlightS1Push) {
              rectFill = "var(--accent)";
              rectStroke = "var(--accent)";
              textFill = "var(--bg)"; // high contrast text
            }

            return (
              <g key={`s1-elem-${idx}`}>
                <rect
                  x={S1_X - ELEM_W / 2}
                  y={itemY}
                  width={ELEM_W}
                  height={ELEM_H}
                  rx="4"
                  fill={rectFill}
                  fillOpacity={isTop && step.highlightS1Push ? 0.15 : 1}
                  stroke={rectStroke}
                  strokeWidth="1.5"
                />
                <text
                  x={S1_X}
                  y={itemY + ELEM_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="13px"
                  fontWeight="600"
                  fill={isTop && step.highlightS1Push ? "var(--accent)" : textFill}
                >
                  {item}
                </text>
              </g>
            );
          })}

          {/* Elements inside Stack 2 */}
          {step.s2.map((item, idx) => {
            const isTop = idx === step.s2.length - 1;
            const itemY = BOTTOM_Y - (idx + 1) * (ELEM_H + ELEM_GAP);

            let rectFill = "var(--bg-elevated)";
            let rectStroke = "var(--border)";
            let textFill = "var(--text-primary)";

            if (isTop && step.highlightS2Pop) {
              rectFill = "var(--warning)";
              rectStroke = "var(--warning)";
              textFill = "var(--bg)"; // high contrast
            }

            return (
              <g key={`s2-elem-${idx}`}>
                <rect
                  x={S2_X - ELEM_W / 2}
                  y={itemY}
                  width={ELEM_W}
                  height={ELEM_H}
                  rx="4"
                  fill={rectFill}
                  fillOpacity={isTop && step.highlightS2Pop ? 0.15 : 1}
                  stroke={rectStroke}
                  strokeWidth="1.5"
                />
                <text
                  x={S2_X}
                  y={itemY + ELEM_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="13px"
                  fontWeight="600"
                  fill={isTop && step.highlightS2Pop ? "var(--warning)" : textFill}
                >
                  {item}
                </text>
              </g>
            );
          })}

          {/* Motion path curves showing elements moving from Stack 1 top to Stack 2 top during transfer */}
          {step.transfer && (
            <g>
              <path
                d={`M ${S1_X} ${TUBE_Y - 10} Q ${(S1_X + S2_X) / 2} ${TUBE_Y - 50} ${S2_X} ${TUBE_Y - 10}`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeDasharray="4,4"
                markerEnd="url(#arrow-head)"
              />
              <text
                x={(S1_X + S2_X) / 2}
                y={TUBE_Y - 35}
                textAnchor="middle"
                fontSize="10px"
                fontWeight="700"
                fill="var(--accent)"
              >
                转移 (Reverse)
              </text>
            </g>
          )}

          {/* Execution details panel on the right side */}
          <g>
            {/* Background Card */}
            <rect
              x="285"
              y="55"
              width="230"
              height="215"
              rx="8"
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            {/* Header */}
            <text
              x="300"
              y="78"
              fontSize="13px"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              执行详情 (Step {currentStep})
            </text>
            <line
              x1="300"
              y1="87"
              x2="500"
              y2="87"
              stroke="var(--border)"
              strokeWidth="1"
            />

            {/* Step Action */}
            <text
              x="300"
              y="108"
              fontSize="11px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              当前操作:
            </text>
            <text
              x="360"
              y="108"
              fontSize="11px"
              fontWeight="700"
              fill="var(--accent)"
            >
              {step.action}
            </text>

            {/* Stack 1 Details */}
            <text
              x="300"
              y="126"
              fontSize="11px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              Stack 1:
            </text>
            <text
              x="360"
              y="126"
              fontSize="11px"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              [{step.s1.join(", ")}]
            </text>

            {/* Stack 2 Details */}
            <text
              x="300"
              y="144"
              fontSize="11px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              Stack 2:
            </text>
            <text
              x="360"
              y="144"
              fontSize="11px"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              [{step.s2.join(", ")}]
            </text>

            {/* Output Details */}
            <text
              x="300"
              y="162"
              fontSize="11px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              本次输出:
            </text>
            <text
              x="360"
              y="162"
              fontSize="11px"
              fontWeight="700"
              fill={step.output !== "-" ? "var(--success)" : "var(--text-primary)"}
            >
              {step.output}
            </text>

            {/* Divider */}
            <line
              x1="300"
              y1="175"
              x2="500"
              y2="175"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Explanation Lines */}
            <text
              x="300"
              y="194"
              fontSize="11px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              执行说明:
            </text>
            {step.explanationLines.map((line, i) => (
              <text
                key={`expl-line-${i}`}
                x="300"
                y={210 + i * 14}
                fontSize="10.5px"
                fontWeight="500"
                fill="var(--text-primary)"
              >
                {line}
              </text>
            ))}
          </g>
        </svg>

        {/* Buttons & Indicators */}
        <div className="mt-4 flex items-center justify-between px-1">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-control border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            上一步 (Prev)
          </button>

          {/* Progress dots */}
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={`dot-${i}`}
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
        利用两个栈的 LIFO 特性实现 FIFO 队列。新元素进入输入栈，出队时如输出栈为空，则将输入栈元素全部翻转倒入输出栈。
      </figcaption>
    </figure>
  );
}
