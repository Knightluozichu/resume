"use client";

import { useState } from "react";

interface StepData {
  title: string;
  preVal: number;
  preIndex: number;
  inIndex: number;
  preRange: [number, number];
  inRange: [number, number];
  renderedNodes: number[];
  renderedEdges: [number, number][];
  activeNode: number;
  activeEdge: [number, number] | null;
  action: string;
  description: string;
}

const PREORDER = [1, 2, 4, 7, 3, 5, 6, 8];
const INORDER = [4, 7, 2, 1, 5, 3, 8, 6];

const STEPS: StepData[] = [
  {
    title: "步骤 0：确定根节点 1 并划分左右子树",
    preVal: 1,
    preIndex: 0,
    inIndex: 3,
    preRange: [0, 7],
    inRange: [0, 7],
    renderedNodes: [1],
    renderedEdges: [],
    activeNode: 1,
    activeEdge: null,
    action: "重建左子树：Preorder [1, 3], Inorder [0, 2]",
    description:
      "在前序遍历中，首个元素 <strong>1</strong> 必然是整棵树的根节点。在中序遍历中找到 <strong>1</strong>（索引为 3）。由此可将中序划分为：左子树 <code>[4, 7, 2]</code>（长度为 3），右子树 <code>[5, 3, 8, 6]</code>（长度为 4）。",
  },
  {
    title: "步骤 1：重建左子节点 2 并划分",
    preVal: 2,
    preIndex: 1,
    inIndex: 2,
    preRange: [1, 3],
    inRange: [0, 2],
    renderedNodes: [1, 2],
    renderedEdges: [],
    activeNode: 2,
    activeEdge: [1, 2],
    action: "重建左子树：Preorder [2, 3], Inorder [0, 1]",
    description:
      "在左子树前序范围 <code>[1, 3]</code> 中，首个元素 <strong>2</strong> 为当前子树的根节点，将其连接为 1 的左子节点。在中序 <code>[0, 2]</code> 中定位 <strong>2</strong>（索引为 2）。其右侧无元素，说明它只有左子树 <code>[4, 7]</code>。",
  },
  {
    title: "步骤 2：重建左子节点 4",
    preVal: 4,
    preIndex: 2,
    inIndex: 0,
    preRange: [2, 3],
    inRange: [0, 1],
    renderedNodes: [1, 2, 4],
    renderedEdges: [[1, 2]],
    activeNode: 4,
    activeEdge: [2, 4],
    action: "重建右子树：Preorder [3, 3], Inorder [1, 1]",
    description:
      "在当前前序范围 <code>[2, 3]</code> 中，首个元素 <strong>4</strong> 为根节点，连为 2 的左子节点。在中序 <code>[0, 1]</code> 中定位 <strong>4</strong>（索引 0）。其左侧无元素，右侧 <code>[7]</code> 构成其右子树。",
  },
  {
    title: "步骤 3：重建右子节点 7 并回溯",
    preVal: 7,
    preIndex: 3,
    inIndex: 1,
    preRange: [3, 3],
    inRange: [1, 1],
    renderedNodes: [1, 2, 4, 7],
    renderedEdges: [
      [1, 2],
      [2, 4],
    ],
    activeNode: 7,
    activeEdge: [4, 7],
    action: "开始重建右半部分：Preorder [4, 7], Inorder [4, 7]",
    description:
      "前序范围 <code>[3, 3]</code> 仅有 <strong>7</strong>。在中序定位 <strong>7</strong>（索引 1）。其左右子树皆为空，即 7 是叶子节点，连接为 4 的右子节点。至此，根节点 1 的整个左子树已完全重建完毕，开始处理右半部分。",
  },
  {
    title: "步骤 4：重建右子节点 3 并划分",
    preVal: 3,
    preIndex: 4,
    inIndex: 5,
    preRange: [4, 7],
    inRange: [4, 7],
    renderedNodes: [1, 2, 4, 7, 3],
    renderedEdges: [
      [1, 2],
      [2, 4],
      [4, 7],
    ],
    activeNode: 3,
    activeEdge: [1, 3],
    action: "重建左子树：Preorder [5, 5], Inorder [4, 4]",
    description:
      "回到根节点 1 的右子树范围。前序 <code>[4, 7]</code> 的第一个元素是 <strong>3</strong>，连为 1 的右子节点。在中序 <code>[4, 7]</code> 中定位 <strong>3</strong>（索引 5）。划分为：左子树 <code>[5]</code>，右子树 <code>[8, 6]</code>。",
  },
  {
    title: "步骤 5：重建左子节点 5",
    preVal: 5,
    preIndex: 5,
    inIndex: 4,
    preRange: [5, 5],
    inRange: [4, 4],
    renderedNodes: [1, 2, 4, 7, 3, 5],
    renderedEdges: [
      [1, 2],
      [2, 4],
      [4, 7],
      [1, 3],
    ],
    activeNode: 5,
    activeEdge: [3, 5],
    action: "重建右子树：Preorder [6, 7], Inorder [6, 7]",
    description:
      "前序范围 <code>[5, 5]</code> 只有 <strong>5</strong>。在中序定位 <strong>5</strong>（索引 4）。其左右子树为空，即 5 为叶子节点，连接为 3 的左子节点。接着返回重建 3 的右子树。",
  },
  {
    title: "步骤 6：重建右子节点 6 并划分",
    preVal: 6,
    preIndex: 6,
    inIndex: 7,
    preRange: [6, 7],
    inRange: [6, 7],
    renderedNodes: [1, 2, 4, 7, 3, 5, 6],
    renderedEdges: [
      [1, 2],
      [2, 4],
      [4, 7],
      [1, 3],
      [3, 5],
    ],
    activeNode: 6,
    activeEdge: [3, 6],
    action: "重建左子树：Preorder [7, 7], Inorder [6, 6]",
    description:
      "前序范围 <code>[6, 7]</code> 的首元素是 <strong>6</strong>，连为 3 的右子节点。在中序 <code>[6, 7]</code> 定位 <strong>6</strong>（索引 7）。其右侧为空，左侧 <code>[8]</code> 构成其左子树。",
  },
  {
    title: "步骤 7：重建左子节点 8（完成）",
    preVal: 8,
    preIndex: 7,
    inIndex: 6,
    preRange: [7, 7],
    inRange: [6, 6],
    renderedNodes: [1, 2, 4, 7, 3, 5, 6, 8],
    renderedEdges: [
      [1, 2],
      [2, 4],
      [4, 7],
      [1, 3],
      [3, 5],
      [3, 6],
    ],
    activeNode: 8,
    activeEdge: [6, 8],
    action: "算法结束：二叉树已完全重建",
    description:
      "前序范围 <code>[7, 7]</code> 仅有 <strong>8</strong>。在中序定位 <strong>8</strong>（索引 6）。8 为叶子节点，连为 6 的左子节点。至此，所有数组元素处理完毕，整棵二叉树重建成功！",
  },
];

const NODES_COORD: Record<number, { x: number; y: number }> = {
  1: { x: 180, y: 140 },
  2: { x: 100, y: 190 },
  3: { x: 260, y: 190 },
  4: { x: 60, y: 240 },
  5: { x: 220, y: 240 },
  6: { x: 300, y: 240 },
  7: { x: 100, y: 285 },
  8: { x: 260, y: 285 },
};

const ALL_EDGES: [number, number][] = [
  [1, 2],
  [1, 3],
  [2, 4],
  [4, 7],
  [3, 5],
  [3, 6],
  [6, 8],
];

export function RebuildBinaryTreeDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep] || STEPS[0];

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const getRangeRect = (start: number, end: number, y: number) => {
    const startX = 90 + start * 26 - 3;
    const width = (end - start + 1) * 26 - 2 + 6;
    return { x: startX, y: y - 3, width, height: 28 };
  };

  const preorderRangeRect = getRangeRect(
    step.preRange[0],
    step.preRange[1],
    12,
  );
  const inorderRangeRect = getRangeRect(step.inRange[0], step.inRange[1], 62);

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[580px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 540 320"
          role="img"
          aria-label="重建二叉树算法步骤可视化"
          className="mx-auto block h-auto w-full"
        >
          {/* Defs for markers */}
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

          {/* Active Range Highlights behind arrays */}
          <rect
            x={preorderRangeRect.x}
            y={preorderRangeRect.y}
            width={preorderRangeRect.width}
            height={preorderRangeRect.height}
            rx={4}
            fill="var(--accent)"
            fillOpacity={0.06}
            stroke="var(--accent)"
            strokeWidth={1.2}
            strokeDasharray="3 3"
            className="transition-all duration-300"
          />
          <rect
            x={inorderRangeRect.x}
            y={inorderRangeRect.y}
            width={inorderRangeRect.width}
            height={inorderRangeRect.height}
            rx={4}
            fill="var(--success)"
            fillOpacity={0.05}
            stroke="var(--success)"
            strokeWidth={1.2}
            strokeDasharray="3 3"
            className="transition-all duration-300"
          />

          {/* Preorder Array */}
          <text
            x={15}
            y={28}
            fontSize="10px"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            前序 (Pre)
          </text>
          {PREORDER.map((val, idx) => {
            const isRoot = step.preIndex === idx;
            const inRange = idx >= step.preRange[0] && idx <= step.preRange[1];
            const xPos = 90 + idx * 26;

            let bgColor = "var(--bg-elevated)";
            let strokeColor = "var(--border)";
            let textColor = "var(--text-primary)";
            let strokeWidth = 1;

            if (isRoot) {
              bgColor = "var(--warning)";
              strokeColor = "var(--warning)";
              textColor = "#ffffff"; // high contrast white on warning yellow/orange
              strokeWidth = 2;
            } else if (!inRange) {
              textColor = "var(--text-secondary)";
            }

            return (
              <g key={`pre-${idx}`} className="transition-all duration-200">
                <rect
                  x={xPos}
                  y={12}
                  width={22}
                  height={22}
                  rx={3}
                  fill={bgColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  opacity={inRange || isRoot ? 1 : 0.25}
                />
                <text
                  x={xPos + 11}
                  y={26}
                  textAnchor="middle"
                  fontSize="10px"
                  fontWeight="700"
                  fill={textColor}
                  opacity={inRange || isRoot ? 1 : 0.25}
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Inorder Array */}
          <text
            x={15}
            y={78}
            fontSize="10px"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            中序 (In)
          </text>
          {INORDER.map((val, idx) => {
            const isRoot = step.inIndex === idx;
            const inRange = idx >= step.inRange[0] && idx <= step.inRange[1];
            const xPos = 90 + idx * 26;

            let bgColor = "var(--bg-elevated)";
            let strokeColor = "var(--border)";
            let textColor = "var(--text-primary)";
            let strokeWidth = 1;

            if (isRoot) {
              bgColor = "var(--warning)";
              strokeColor = "var(--warning)";
              textColor = "#ffffff";
              strokeWidth = 2;
            } else if (!inRange) {
              textColor = "var(--text-secondary)";
            }

            return (
              <g key={`in-${idx}`} className="transition-all duration-200">
                <rect
                  x={xPos}
                  y={62}
                  width={22}
                  height={22}
                  rx={3}
                  fill={bgColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  opacity={inRange || isRoot ? 1 : 0.25}
                />
                <text
                  x={xPos + 11}
                  y={76}
                  textAnchor="middle"
                  fontSize="10px"
                  fontWeight="700"
                  fill={textColor}
                  opacity={inRange || isRoot ? 1 : 0.25}
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Background Skeleton of the complete binary tree (Premium feature) */}
          <g>
            {ALL_EDGES.map(([p, c], idx) => {
              const pCoord = NODES_COORD[p];
              const cCoord = NODES_COORD[c];
              if (!pCoord || !cCoord) return null;
              return (
                <line
                  key={`skeleton-edge-${idx}`}
                  x1={pCoord.x}
                  y1={pCoord.y}
                  x2={cCoord.x}
                  y2={cCoord.y}
                  stroke="var(--border)"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  opacity={0.15}
                />
              );
            })}
            {Object.entries(NODES_COORD).map(([idStr, coord]) => {
              const id = parseInt(idStr, 10);
              return (
                <circle
                  key={`skeleton-node-${id}`}
                  cx={coord.x}
                  cy={coord.y}
                  r={12}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  opacity={0.15}
                />
              );
            })}
          </g>

          {/* Render Actual Built Edges */}
          {ALL_EDGES.map(([p, c], idx) => {
            const isRendered = step.renderedEdges.some(
              ([rp, rc]) => rp === p && rc === c,
            );
            const isActive =
              step.activeEdge &&
              step.activeEdge[0] === p &&
              step.activeEdge[1] === c;

            if (!isRendered && !isActive) return null;

            const pCoord = NODES_COORD[p];
            const cCoord = NODES_COORD[c];
            if (!pCoord || !cCoord) return null;

            const strokeColor = isActive ? "var(--accent)" : "var(--success)";
            const strokeWidth = isActive ? 2.5 : 1.5;

            return (
              <line
                key={`edge-${idx}`}
                x1={pCoord.x}
                y1={pCoord.y}
                x2={cCoord.x}
                y2={cCoord.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Render Actual Built Nodes */}
          {Object.entries(NODES_COORD).map(([idStr, coord]) => {
            const id = parseInt(idStr, 10);
            const isRendered = step.renderedNodes.includes(id);
            const isActive = step.activeNode === id;

            if (!isRendered && !isActive) return null;

            let strokeColor = "var(--success)";
            let strokeWidth = 1.5;
            let fillOpacity = 1;
            let bgColor = "var(--bg-elevated)";

            if (isActive) {
              strokeColor = "var(--accent)";
              strokeWidth = 2.5;
              bgColor = "var(--accent)";
              fillOpacity = 0.15;
            }

            return (
              <g key={`node-${id}`} className="transition-all duration-300">
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={12}
                  fill={isActive ? strokeColor : bgColor}
                  fillOpacity={isActive ? fillOpacity : 1}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
                <text
                  x={coord.x}
                  y={coord.y + 3.5}
                  textAnchor="middle"
                  fontSize="10px"
                  fontWeight="800"
                  fill={isActive ? "var(--accent)" : "var(--text-primary)"}
                >
                  {id}
                </text>
              </g>
            );
          })}

          {/* Right Execution Detail Panel */}
          <g>
            <rect
              x={365}
              y={12}
              width={160}
              height={295}
              rx={6}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            {/* Title */}
            <text
              x={380}
              y={32}
              fontSize="11px"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              执行状态 (Step {currentStep})
            </text>
            <line
              x1={380}
              y1={40}
              x2={510}
              y2={40}
              stroke="var(--border)"
              strokeWidth={1}
            />

            {/* Current Root */}
            <text
              x={380}
              y={56}
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              当前根节点 (Root):
            </text>
            <text
              x={470}
              y={56}
              fontSize="9px"
              fontWeight="700"
              fill="var(--warning)"
            >
              {step.preVal}
            </text>

            {/* Sub-arrays */}
            <text
              x={380}
              y={72}
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              前序范围 (Pre):
            </text>
            <text
              x={455}
              y={72}
              fontSize="8.5px"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              [{step.preRange[0]}, {step.preRange[1]}]
            </text>

            <text
              x={380}
              y={88}
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              中序范围 (In):
            </text>
            <text
              x={455}
              y={88}
              fontSize="8.5px"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              [{step.inRange[0]}, {step.inRange[1]}]
            </text>

            <line
              x1={380}
              y1={98}
              x2={510}
              y2={98}
              stroke="var(--border)"
              strokeWidth={1}
              strokeDasharray="2 2"
            />

            {/* Current Action Description */}
            <text
              x={380}
              y={114}
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              步骤解析:
            </text>
            <foreignObject x={380} y={120} width={130} height={120}>
              <div
                className="text-[9px] leading-normal text-primary font-medium overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </foreignObject>

            <line
              x1={380}
              y1={248}
              x2={510}
              y2={248}
              stroke="var(--border)"
              strokeWidth={1}
              strokeDasharray="2 2"
            />

            {/* Next Step Action */}
            <text
              x={380}
              y={262}
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              下一步递归:
            </text>
            <foreignObject x={380} y={268} width={130} height={32}>
              <div className="text-[8.5px] leading-tight text-accent font-bold">
                {step.action}
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* Navigation Buttons and Dots */}
        <div className="mt-4 flex items-center justify-between px-1">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-control border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            上一步 (Prev)
          </button>

          {/* Dots */}
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
        {step.title}
      </figcaption>
    </figure>
  );
}
