"use client";

import { useState } from "react";

interface StepData {
  step: number;
  title: string;
  action: string;
  description: string;
  array: number[];
  leftIndex: number;
  rightIndex: number;
  highlightIndices: number[];
  swapHappened: boolean;
  leftScanPath?: number[]; // indices left pointer scanned through in this step
  rightScanPath?: number[]; // indices right pointer scanned through in this step
}

const STEPS: StepData[] = [
  {
    step: 0,
    title: "步骤 0：初始化双指针",
    action: "初始化 left = 0, right = 6",
    description: "初始化头尾指针。左指针 <code>left</code> 设在首元素索引 0（值 2），右指针 <code>right</code> 设在尾元素索引 6（值 3）。算法开始向中间逼近扫描。",
    array: [2, 4, 5, 7, 8, 1, 3],
    leftIndex: 0,
    rightIndex: 6,
    highlightIndices: [],
    swapHappened: false,
  },
  {
    step: 1,
    title: "步骤 1：扫描定位待换元素",
    action: "扫描：left 停在偶数 2，right 停在奇数 3",
    description: "<code>left</code> 检查当前元素，发现 <code>2</code> 是偶数，不符合『奇数在前』规则，立即停止；<code>right</code> 检查当前元素，发现 <code>3</code> 是奇数，不符合『偶数在后』规则，也停止。此时 <code>left < right</code>，它们指向的元素需要被对调位置。",
    array: [2, 4, 5, 7, 8, 1, 3],
    leftIndex: 0,
    rightIndex: 6,
    highlightIndices: [0, 6],
    swapHappened: false,
  },
  {
    step: 2,
    title: "步骤 2：对调首尾不合规元素",
    action: "交换：swap(array[0], array[6])",
    description: "将首尾的不合规元素对调位置。交换后数组变成 <code>[3, 4, 5, 7, 8, 1, 2]</code>，奇数 3 成功来到前端，偶数 2 成功去往尾端。",
    array: [3, 4, 5, 7, 8, 1, 2],
    leftIndex: 0,
    rightIndex: 6,
    highlightIndices: [0, 6],
    swapHappened: true,
  },
  {
    step: 3,
    title: "步骤 3：收缩指针并再次扫描停止",
    action: "指针移动：left -> 1, right -> 5",
    description: "执行 <code>left++</code> 后左指针移到索引 1（值 4，为偶数停止）；执行 <code>right--</code> 后右指针移到索引 5（值 1，为奇数停止）。两指针再次满足 <code>left < right</code> 并且均停在错位元素上。",
    array: [3, 4, 5, 7, 8, 1, 2],
    leftIndex: 1,
    rightIndex: 5,
    highlightIndices: [1, 5],
    swapHappened: false,
  },
  {
    step: 4,
    title: "步骤 4：对调第二组不合规元素",
    action: "交换：swap(array[1], array[5])",
    description: "对调 <code>left</code> 和 <code>right</code> 指向的值（<code>4</code> 和 <code>1</code>）。交换后数组变成 <code>[3, 1, 5, 7, 8, 4, 2]</code>。此时，奇数 1 前移，偶数 4 后移。",
    array: [3, 1, 5, 7, 8, 4, 2],
    leftIndex: 1,
    rightIndex: 5,
    highlightIndices: [1, 5],
    swapHappened: true,
  },
  {
    step: 5,
    title: "步骤 5：扫描相遇，算法终止",
    action: "扫描越界：left 指向 8 (idx 4), right 指向 7 (idx 3)",
    description: "指针继续收缩扫描：<br/>• <code>left</code> 从 1 向右移动，遇到 5(奇)、7(奇) 均跳过，最后停在偶数 8（索引 4）；<br/>• <code>right</code> 从 5 向左移动，遇到 8(偶) 跳过，最后停在奇数 7（索引 3）。<br/>此时 <code>left >= right</code>（<code>4 >= 3</code>），代表指针交错。没有未检查的元素，算法宣告结束。",
    array: [3, 1, 5, 7, 8, 4, 2],
    leftIndex: 4,
    rightIndex: 3,
    highlightIndices: [],
    swapHappened: false,
    leftScanPath: [1, 2, 3, 4],
    rightScanPath: [5, 4, 3],
  },
];

export function PartitionArrayDiagram() {
  const [currentStep, setCurrentStep] = useState(0);

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const stepData = STEPS[currentStep];

  const VIEW_W = 600;
  const VIEW_H = 260;

  const BOX_W = 55;
  const BOX_H = 55;
  const BOX_GAP = 12;
  const TOTAL_W = 7 * BOX_W + 6 * BOX_GAP;
  const START_X = (VIEW_W - TOTAL_W) / 2;
  const BOX_Y = 80;

  const getBoxX = (idx: number) => START_X + idx * (BOX_W + BOX_GAP);

  const isOdd = (val: number) => (val & 1) !== 0;

  // Colors mapping the review design theme
  const colTextPrimary = "var(--text-primary)";
  const colTextSecondary = "var(--text-secondary)";
  const colBorder = "var(--border)";
  const colBgElevated = "var(--bg-elevated)";
  const colAccent = "var(--accent)"; // typically purple/blue for current focus
  const colSuccess = "var(--success)"; // green for swapped/success
  const colWarning = "var(--warning)"; // yellow/orange for odd numbers or pointers

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[620px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        {/* Title and Stepper Header */}
        <div className="mb-4 flex flex-col justify-between border-b border-border pb-3 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-sm font-bold text-primary">相向双指针分区模拟</h4>
            <p className="text-xs text-secondary mt-0.5">调整数组顺序使奇数在前、偶数在后</p>
          </div>
          <div className="mt-2 flex items-center gap-2 sm:mt-0">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex h-7 items-center justify-center rounded border border-border bg-button px-2.5 text-xs font-medium text-primary transition hover:bg-button-hover disabled:opacity-40"
            >
              上一步
            </button>
            <span className="text-xs font-mono text-secondary">
              {currentStep} / {STEPS.length - 1}
            </span>
            <button
              onClick={nextStep}
              disabled={currentStep === STEPS.length - 1}
              className="flex h-7 items-center justify-center rounded border border-border bg-button px-2.5 text-xs font-medium text-primary transition hover:bg-button-hover disabled:opacity-40"
            >
              下一步
            </button>
          </div>
        </div>

        {/* Interactive SVG Diagram */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="mx-auto block h-auto w-full"
          style={{ maxWidth: "100%" }}
        >
          {/* Legend */}
          <g transform={`translate(${START_X}, 30)`} fontSize="11" fontWeight="500">
            <rect width="12" height="12" rx="2" fill={colBgElevated} stroke={colBorder} strokeWidth="1.5" />
            <text x="18" y="10" fill={colTextSecondary}>偶数 (Even)</text>

            <rect x="100" width="12" height="12" rx="2" fill={colWarning} fillOpacity="0.1" stroke={colWarning} strokeWidth="1.5" />
            <text x="118" y="10" fill={colTextSecondary}>奇数 (Odd)</text>

            <rect x="200" width="12" height="12" rx="2" fill={colBgElevated} stroke={colAccent} strokeWidth="2.5" />
            <text x="218" y="10" fill={colTextSecondary}>当前指针项</text>

            {stepData.swapHappened && (
              <>
                <rect x="310" width="12" height="12" rx="2" fill={colSuccess} fillOpacity="0.1" stroke={colSuccess} strokeWidth="2" />
                <text x="328" y="10" fill={colTextSecondary}>交换成功</text>
              </>
            )}
          </g>

          {/* Array Boxes */}
          {stepData.array.map((val, idx) => {
            const x = getBoxX(idx);
            const isLeft = idx === stepData.leftIndex;
            const isRight = idx === stepData.rightIndex;
            const isTarget = isLeft || isRight;
            const isOddVal = isOdd(val);
            
            // Choose border & background color depending on state
            let boxBg = colBgElevated;
            let boxStroke = colBorder;
            let boxStrokeWidth = 1.5;
            let boxBgOpacity = 1;

            if (isTarget) {
              boxStroke = colAccent;
              boxStrokeWidth = 2.5;
              if (stepData.swapHappened) {
                boxStroke = colSuccess;
                boxBg = colSuccess;
                boxBgOpacity = 0.15;
              }
            } else if (stepData.highlightIndices.includes(idx)) {
              boxStroke = colAccent;
              boxStrokeWidth = 2;
            } else if (isOddVal) {
              boxStroke = colWarning;
              boxBg = colWarning;
              boxBgOpacity = 0.1;
            }

            // Dim everything else in step 5 to show completion
            const isFaded = currentStep === 5 && !isTarget;
            const opacityVal = isFaded ? 0.35 : 1;

            return (
              <g key={`box-${idx}`} opacity={opacityVal} style={{ transition: "all 0.3s ease" }}>
                {/* Index label above box */}
                <text
                  x={x + BOX_W / 2}
                  y={BOX_Y - 8}
                  textAnchor="middle"
                  fontSize="10px"
                  fontFamily="monospace"
                  fill={colTextSecondary}
                >
                  [{idx}]
                </text>

                {/* Array Box */}
                <rect
                  x={x}
                  y={BOX_Y}
                  width={BOX_W}
                  height={BOX_H}
                  rx="8"
                  fill={boxBg}
                  fillOpacity={boxBgOpacity}
                  stroke={boxStroke}
                  strokeWidth={boxStrokeWidth}
                />

                {/* Box Value */}
                <text
                  x={x + BOX_W / 2}
                  y={BOX_Y + BOX_H / 2 + 6}
                  textAnchor="middle"
                  fontSize="18px"
                  fontWeight="bold"
                  fill={isTarget && !stepData.swapHappened ? colAccent : isTarget && stepData.swapHappened ? colSuccess : colTextPrimary}
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Left Pointer (pointing up from below) */}
          {(() => {
            const showLeft = stepData.leftIndex >= 0 && stepData.leftIndex < 7;
            if (!showLeft) return null;
            const pointerX = getBoxX(stepData.leftIndex) + BOX_W / 2;
            const pointerY = BOX_Y + BOX_H + 12;
            const isCrossing = stepData.leftIndex >= stepData.rightIndex;
            const pointerColor = isCrossing ? colWarning : colAccent;
            return (
              <g transform={`translate(${pointerX}, ${pointerY})`} style={{ transition: "transform 0.3s ease" }}>
                {/* Up Arrow */}
                <path d="M 0 0 L 0 15 M -4 6 L 0 0 L 4 6" fill="none" stroke={pointerColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="0" y="30" textAnchor="middle" fontSize="11px" fontWeight="bold" fill={pointerColor}>
                  left
                </text>
                <text x="0" y="42" textAnchor="middle" fontSize="9px" fontFamily="monospace" fill={colTextSecondary}>
                  idx={stepData.leftIndex}
                </text>
              </g>
            );
          })()}

          {/* Right Pointer (pointing up from below) */}
          {(() => {
            const showRight = stepData.rightIndex >= 0 && stepData.rightIndex < 7;
            if (!showRight) return null;
            const pointerX = getBoxX(stepData.rightIndex) + BOX_W / 2;
            const pointerY = BOX_Y + BOX_H + 12;
            const isCrossing = stepData.leftIndex >= stepData.rightIndex;
            const pointerColor = isCrossing ? colWarning : colAccent;
            // Shift right label downwards slightly if pointers overlap to prevent text clashing
            const overlap = stepData.leftIndex === stepData.rightIndex;
            const textYOffset = overlap ? 25 : 0;
            return (
              <g transform={`translate(${pointerX}, ${pointerY})`} style={{ transition: "transform 0.3s ease" }}>
                {/* Up Arrow */}
                <path d="M 0 0 L 0 15 M -4 6 L 0 0 L 4 6" fill="none" stroke={pointerColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="0" y={30 + textYOffset} textAnchor="middle" fontSize="11px" fontWeight="bold" fill={pointerColor}>
                  right
                </text>
                <text x="0" y={42 + textYOffset} textAnchor="middle" fontSize="9px" fontFamily="monospace" fill={colTextSecondary}>
                  idx={stepData.rightIndex}
                </text>
              </g>
            );
          })()}

          {/* Swap visual arc */}
          {stepData.swapHappened && (
            <path
              d={`M ${getBoxX(stepData.leftIndex) + BOX_W / 2} ${BOX_Y} Q ${(getBoxX(stepData.leftIndex) + getBoxX(stepData.rightIndex) + BOX_W) / 2} ${BOX_Y - 40} ${getBoxX(stepData.rightIndex) + BOX_W / 2} ${BOX_Y}`}
              fill="none"
              stroke={colSuccess}
              strokeWidth="2.5"
              strokeDasharray="4 3"
              opacity="0.8"
            />
          )}

          {/* Boundary crossing/相遇 notice line */}
          {currentStep === 5 && (
            <g>
              {/* Highlight the boundary division */}
              <line
                x1={(getBoxX(3) + getBoxX(4) + BOX_W) / 2}
                y1={BOX_Y - 20}
                x2={(getBoxX(3) + getBoxX(4) + BOX_W) / 2}
                y2={BOX_Y + BOX_H + 10}
                stroke={colWarning}
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <rect
                x={(getBoxX(3) + getBoxX(4) + BOX_W) / 2 - 40}
                y={BOX_Y + BOX_H / 2 - 10}
                width="80"
                height="20"
                rx="4"
                fill="var(--bg)"
                stroke={colWarning}
                strokeWidth="1"
              />
              <text
                x={(getBoxX(3) + getBoxX(4) + BOX_W) / 2}
                y={BOX_Y + BOX_H / 2 + 4}
                textAnchor="middle"
                fontSize="10px"
                fontWeight="700"
                fill={colWarning}
              >
                交错相遇点
              </text>
            </g>
          )}
        </svg>

        {/* Step Explanation Panel */}
        <div className="mt-4 rounded border border-border bg-secondary-bg p-3.5">
          <div className="flex items-center gap-1.5 font-bold text-xs text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span>{stepData.action}</span>
          </div>
          <p
            className="mt-2 text-xs leading-relaxed text-secondary"
            dangerouslySetInnerHTML={{ __html: stepData.description }}
          />
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {stepData.title}：观察 left 和 right 指针相向移动，以及定位偶数和奇数后的对调。
      </figcaption>
    </figure>
  );
}
