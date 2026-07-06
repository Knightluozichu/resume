"use client";

import { useState, useEffect } from "react";

interface NodePosition {
  x: number;
  y: number;
}

interface Step {
  title: string;
  action: string;
  description: string;
  activeNodeId: string | null;
  completedNodes: string[];
  swappedPairs: [string, string] | null;
  nodePositions: Record<string, NodePosition>;
  logs: string[];
}

const POSITIONS = {
  // Step 0 Original layout
  original: {
    N8: { x: 270, y: 45 },
    N6: { x: 150, y: 110 },
    N10: { x: 390, y: 110 },
    N5: { x: 90, y: 175 },
    N7: { x: 210, y: 175 },
    N9: { x: 330, y: 175 },
    N11: { x: 450, y: 175 },
  },
  // Step 1 - Left and Right subtrees under 8 swapped (N6 <-> N10)
  swap8: {
    N8: { x: 270, y: 45 },
    N10: { x: 150, y: 110 },
    N6: { x: 390, y: 110 },
    N9: { x: 90, y: 175 }, // Moves with parent N10
    N11: { x: 210, y: 175 }, // Moves with parent N10
    N5: { x: 330, y: 175 }, // Moves with parent N6
    N7: { x: 450, y: 175 }, // Moves with parent N6
  },
  // Step 3 - Children of N10 (N9 <-> N11) swapped
  swap10: {
    N8: { x: 270, y: 45 },
    N10: { x: 150, y: 110 },
    N6: { x: 390, y: 110 },
    N11: { x: 90, y: 175 }, // Swapped
    N9: { x: 210, y: 175 }, // Swapped
    N5: { x: 330, y: 175 },
    N7: { x: 450, y: 175 },
  },
  // Step 5 - Children of N6 (N5 <-> N7) swapped
  swap6: {
    N8: { x: 270, y: 45 },
    N10: { x: 150, y: 110 },
    N6: { x: 390, y: 110 },
    N11: { x: 90, y: 175 },
    N9: { x: 210, y: 175 },
    N7: { x: 330, y: 175 }, // Swapped
    N5: { x: 450, y: 175 }, // Swapped
  },
};

const STEPS: Step[] = [
  {
    title: "步骤 0：初始化原二叉树",
    action: "mirrorTree(root)",
    description:
      "<strong>初始化二叉树</strong>：我们从根节点开始执行镜像操作。算法访问根节点 <code>8</code>。当前根节点 <code>8</code> 被标为当前活动节点 (Active)。",
    activeNodeId: "N8",
    completedNodes: [],
    swappedPairs: null,
    nodePositions: POSITIONS.original,
    logs: [
      "mirrorTree(root) called",
      "Current node: 8",
      "Preorder traversal starting...",
    ],
  },
  {
    title: "步骤 1：交换根节点 8 的左右子树",
    action: "swap(root.left, root.right)",
    description:
      "<strong>第一步交换</strong>：交换根节点 <code>8</code> 的左子树（根为 <code>6</code>）和右子树（根为 <code>10</code>）。注意：子树内部的叶子节点随父节点一起移动。此时 <code>10</code> 移到左侧，<code>6</code> 移到右侧。",
    activeNodeId: "N8",
    completedNodes: ["N8"],
    swappedPairs: ["N6", "N10"],
    nodePositions: POSITIONS.swap8,
    logs: [
      "In-place swap(root.left, root.right)",
      "Left subtree (6) <-> Right subtree (10)",
      "Root 8 swap completed!",
    ],
  },
  {
    title: "步骤 2：移动指针至左子节点 10",
    action: "mirrorTree(root.left)",
    description:
      "<strong>递归左子树</strong>：由于交换了子树，原右子树 <code>10</code> 现在成为了新的左子树。我们将当前活动节点指针移动到节点 <code>10</code>，准备镜像它的子树。",
    activeNodeId: "N10",
    completedNodes: ["N8"],
    swappedPairs: null,
    nodePositions: POSITIONS.swap8,
    logs: [
      "Recursive call: mirrorTree(10)",
      "Current node: 10",
      "Prepare to swap its children",
    ],
  },
  {
    title: "步骤 3：交换节点 10 的左右孩子 (9 和 11)",
    action: "swap(node10.left, node10.right)",
    description:
      "<strong>第二步交换</strong>：交换节点 <code>10</code> 的左右孩子节点 <code>9</code> 和 <code>11</code>。交换后，左孩子变成 <code>11</code>，右孩子变成 <code>9</code>。节点 <code>10</code> 镜像完毕。",
    activeNodeId: "N10",
    completedNodes: ["N8", "N10"],
    swappedPairs: ["N9", "N11"],
    nodePositions: POSITIONS.swap10,
    logs: [
      "In-place swap(node10.left, node10.right)",
      "Left child (9) <-> Right child (11)",
      "Node 10 swap completed!",
    ],
  },
  {
    title: "步骤 4：移动指针至右子节点 6",
    action: "mirrorTree(root.right)",
    description:
      "<strong>递归右子树</strong>：接下来，我们将当前活动节点指针移动到右子树根节点 <code>6</code>，开始对其左右子树进行镜像操作。",
    activeNodeId: "N6",
    completedNodes: ["N8", "N10"],
    swappedPairs: null,
    nodePositions: POSITIONS.swap10,
    logs: [
      "Recursive call: mirrorTree(6)",
      "Current node: 6",
      "Prepare to swap its children",
    ],
  },
  {
    title: "步骤 5：交换节点 6 的左右孩子 (5 和 7)",
    action: "swap(node6.left, node6.right)",
    description:
      "<strong>第三步交换</strong>：交换节点 <code>6</code> 的左右孩子节点 <code>5</code> 和 <code>7</code>。交换后，左孩子变成 <code>7</code>，右孩子变成 <code>5</code>。节点 <code>6</code> 镜像完毕。",
    activeNodeId: "N6",
    completedNodes: ["N8", "N10", "N6"],
    swappedPairs: ["N5", "N7"],
    nodePositions: POSITIONS.swap6,
    logs: [
      "In-place swap(node6.left, node6.right)",
      "Left child (5) <-> Right child (7)",
      "Node 6 swap completed!",
    ],
  },
  {
    title: "步骤 6：镜像完成！所有节点翻转完毕",
    action: "Return mirrored tree",
    description:
      "<strong>镜像完成</strong>：所有非空子节点的左右孩子均已原地交换。遍历结束，算法最终返回翻转后的树根节点 <code>8</code>。所有节点以绿色高亮表示已完成。",
    activeNodeId: null,
    completedNodes: ["N8", "N10", "N6", "N5", "N7", "N9", "N11"],
    swappedPairs: null,
    nodePositions: POSITIONS.swap6,
    logs: [
      "Traversed all subtrees.",
      "All leaves reached and verified.",
      "mirrorTree execution success!",
      "Finished!",
    ],
  },
];

export function MirrorBinaryTreeDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stepCount = STEPS.length;
  const stepData = STEPS[currentStep];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= stepCount - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, stepCount]);

  const prevStep = () => {
    setIsPlaying(false);
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    setIsPlaying(false);
    if (currentStep < stepCount - 1) setCurrentStep(currentStep + 1);
  };

  const togglePlay = () => {
    if (currentStep === stepCount - 1 && !isPlaying) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const resetStep = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const staticEdges = [
    { from: { x: 270, y: 45 }, to: { x: 150, y: 110 } },
    { from: { x: 270, y: 45 }, to: { x: 390, y: 110 } },
    { from: { x: 150, y: 110 }, to: { x: 90, y: 175 } },
    { from: { x: 150, y: 110 }, to: { x: 210, y: 175 } },
    { from: { x: 390, y: 110 }, to: { x: 330, y: 175 } },
    { from: { x: 390, y: 110 }, to: { x: 450, y: 175 } },
  ];

  const nodes = [
    { id: "N8", val: 8 },
    { id: "N6", val: 6 },
    { id: "N10", val: 10 },
    { id: "N5", val: 5 },
    { id: "N7", val: 7 },
    { id: "N9", val: 9 },
    { id: "N11", val: 11 },
  ];

  // Helper to determine node rendering colors
  const getNodeStyles = (nodeId: string) => {
    const isActive = stepData.activeNodeId === nodeId;
    const isCompleted = stepData.completedNodes.includes(nodeId);

    let stroke = "var(--border)";
    let fill = "var(--bg-elevated)";
    let strokeWidth = 1.5;

    if (isActive) {
      stroke = "var(--accent)";
      strokeWidth = 2.5;
      fill = "rgba(100, 150, 255, 0.08)";
    } else if (isCompleted) {
      stroke = "var(--success)";
      strokeWidth = 2;
      fill = "rgba(63, 185, 127, 0.15)";
    }

    return { stroke, fill, strokeWidth };
  };

  // Find active node coordinates for active arrow rendering
  const activeNodePos = stepData.activeNodeId
    ? stepData.nodePositions[stepData.activeNodeId]
    : null;

  return (
    <figure className="my-6">
      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <svg
          viewBox="0 0 540 280"
          className="w-full h-auto select-none rounded bg-elevated"
          style={{ maxHeight: "360px" }}
        >
          <defs>
            {/* Arrow marker for pointer */}
            <marker
              id="ptr-arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="10"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 0 L 5 10 z" fill="var(--accent)" />
            </marker>
            {/* Marker for swap curves */}
            <marker
              id="swap-arrow-end"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--warning)" />
            </marker>
            <marker
              id="swap-arrow-start"
              viewBox="0 0 10 10"
              refX="2"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 8 1.5 L 0 5 L 8 8.5 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* STATIC TREE EDGES (lines connect layout slots) */}
          {staticEdges.map((edge, idx) => (
            <line
              key={`edge-${idx}`}
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              stroke="var(--border)"
              strokeWidth={1.5}
              strokeDasharray={currentStep === 6 ? "0" : "none"}
              className="transition-all duration-300 opacity-60"
            />
          ))}

          {/* SWAP ARROWS (Rotation Indicators) */}
          {stepData.swappedPairs && (
            <g className="animate-pulse">
              {stepData.swappedPairs[0] === "N6" &&
              stepData.swappedPairs[1] === "N10" ? (
                // Level 1 Subtree swap indicator
                <path
                  d="M 170 95 Q 270 65 370 95"
                  fill="none"
                  stroke="var(--warning)"
                  strokeWidth={2}
                  strokeDasharray="4,4"
                  markerStart="url(#swap-arrow-start)"
                  markerEnd="url(#swap-arrow-end)"
                />
              ) : stepData.swappedPairs[0] === "N9" &&
                stepData.swappedPairs[1] === "N11" ? (
                // Left side children swap indicator (under N10)
                <path
                  d="M 105 160 Q 150 145 195 160"
                  fill="none"
                  stroke="var(--warning)"
                  strokeWidth={1.8}
                  strokeDasharray="3,3"
                  markerStart="url(#swap-arrow-start)"
                  markerEnd="url(#swap-arrow-end)"
                />
              ) : stepData.swappedPairs[0] === "N5" &&
                stepData.swappedPairs[1] === "N7" ? (
                // Right side children swap indicator (under N6)
                <path
                  d="M 345 160 Q 390 145 435 160"
                  fill="none"
                  stroke="var(--warning)"
                  strokeWidth={1.8}
                  strokeDasharray="3,3"
                  markerStart="url(#swap-arrow-start)"
                  markerEnd="url(#swap-arrow-end)"
                />
              ) : null}
            </g>
          )}

          {/* MOVING TREE NODES */}
          {nodes.map((node) => {
            const pos = stepData.nodePositions[node.id];
            const { stroke, fill, strokeWidth } = getNodeStyles(node.id);

            return (
              <g
                key={node.id}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={15}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                />
                <text
                  x={0}
                  y={4}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {node.val}
                </text>
                <text
                  x={18}
                  y={-8}
                  fontSize="8px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                  opacity={0.6}
                >
                  {node.id}
                </text>
              </g>
            );
          })}

          {/* POINTER ARROW (Active node pointer) */}
          {activeNodePos && (
            <g
              style={{
                transform: `translate(${activeNodePos.x}px, ${activeNodePos.y - 34}px)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <text
                x={0}
                y={-4}
                textAnchor="middle"
                fontSize="9px"
                fontWeight="800"
                fill="var(--accent)"
              >
                root
              </text>
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={10}
                stroke="var(--accent)"
                strokeWidth={2}
                markerEnd="url(#ptr-arrow)"
              />
            </g>
          )}

          {/* CONSOLE LOGGER */}
          <g>
            <rect
              x={15}
              y={200}
              width={220}
              height={70}
              rx={5}
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={25}
              y={213}
              fontSize="8.5px"
              fontWeight="800"
              fill="var(--text-secondary)"
            >
              调用栈输出 (Call Stack Output)
            </text>
            <line
              x1={25}
              y1={217}
              x2={225}
              y2={217}
              stroke="var(--border)"
              strokeWidth={0.8}
            />

            {stepData.logs.map((log, lIdx) => {
              let logColor = "var(--text-primary)";
              if (log.includes("completed") || log.includes("success")) {
                logColor = "var(--success)";
              } else if (log.includes("In-place") || log.includes("swap")) {
                logColor = "var(--warning)";
              } else if (
                log.includes("Recursive") ||
                log.includes("mirrorTree")
              ) {
                logColor = "var(--accent)";
              }
              return (
                <text
                  key={`log-${lIdx}`}
                  x={25}
                  y={228 + lIdx * 10}
                  fontSize="7.5px"
                  fontFamily="var(--font-mono)"
                  fill={logColor}
                >
                  {`> ${log}`}
                </text>
              );
            })}
          </g>

          {/* STEP EXPLANATION TEXT */}
          <foreignObject x={250} y={200} width={275} height={70}>
            <div
              className="text-[10px] sm:text-[11px] leading-relaxed overflow-y-auto h-[65px] pr-1"
              style={{ color: "var(--text-primary)" }}
              dangerouslySetInnerHTML={{
                __html: stepData.description,
              }}
            />
          </foreignObject>
        </svg>

        {/* Action Controls */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              title="上一步"
              className="flex items-center justify-center rounded border border-border bg-bg p-1.5 text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              title={isPlaying ? "暂停" : "自动播放"}
              className="flex items-center justify-center rounded border border-border bg-bg p-1.5 text-primary transition hover:bg-hover"
            >
              {isPlaying ? (
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 19V5h-4v14h4zm-6 0V5H8v14h4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 5v14l11-7z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === stepCount - 1}
              title="下一步"
              className="flex items-center justify-center rounded border border-border bg-bg p-1.5 text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button
              onClick={resetStep}
              title="重置"
              className="flex items-center justify-center rounded border border-border bg-bg p-1.5 text-primary transition hover:bg-hover"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17"
                />
              </svg>
            </button>
          </div>

          {/* Stepper dots */}
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-4 bg-accent"
                    : i < currentStep
                      ? "w-1.5 bg-success"
                      : "w-1.5 bg-border"
                }`}
                aria-label={`跳转到第 ${i} 步`}
              />
            ))}
          </div>

          <div className="text-xs font-semibold text-secondary">
            {currentStep + 1} / {stepCount} 步
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary font-medium">
        动画：{stepData.title}
      </figcaption>
    </figure>
  );
}
